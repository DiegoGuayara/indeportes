import ExcelJS from "exceljs";

type RepeatingRow = Record<string, unknown>;

type RepeatingRowPlan = {
  rowNumber: number;
  groupName: string;
  rows: RepeatingRow[];
  removedRows: number;
};

export class ExcelService {
  private readonly tagRegex = /\{\{\s*([\p{L}\p{N}_.-]+)\s*\}\}/gu;

  private loadWorkbook(buffer: Buffer) {
    const workbook = new ExcelJS.Workbook();
    return workbook.xlsx.load(
      buffer as unknown as Parameters<typeof workbook.xlsx.load>[0],
    );
  }

  private getRepeatingRowPlans(
    worksheet: ExcelJS.Worksheet,
    values: Record<string, unknown>,
  ): RepeatingRowPlan[] {
    const plans: RepeatingRowPlan[] = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      const groupNames = new Set<string>();

      row.eachCell({ includeEmpty: false }, (cell) => {
        if (typeof cell.value !== "string") {
          return;
        }

        for (const match of cell.value.matchAll(this.tagRegex)) {
          const fieldName = match[1];
          const separatorIndex = fieldName?.indexOf(".") ?? -1;

          if (fieldName && separatorIndex > 0) {
            groupNames.add(fieldName.slice(0, separatorIndex));
          }
        }
      });

      if (groupNames.size === 0) {
        return;
      }

      if (groupNames.size > 1) {
        throw new Error(
          `La fila ${rowNumber} contiene más de un grupo repetible`,
        );
      }

      const groupName = [...groupNames][0]!;

      if (plans.some((plan) => plan.groupName === groupName)) {
        throw new Error(
          `El grupo "${groupName}" debe tener una sola fila modelo en cada hoja`,
        );
      }

      const groupValue = values[groupName];
      const rows = Array.isArray(groupValue)
        ? (groupValue as RepeatingRow[])
        : [];

      // Keep one blank data row when no records were entered.
      plans.push({
        rowNumber,
        groupName,
        rows: rows.length > 0 ? rows : [{}],
        removedRows: 0,
      });
    });

    return plans;
  }

  private rowHasContent(worksheet: ExcelJS.Worksheet, rowNumber: number) {
    let hasContent = false;

    worksheet.getRow(rowNumber).eachCell({ includeEmpty: false }, (cell) => {
      if (cell.value !== null && cell.value !== undefined && cell.value !== "") {
        hasContent = true;
      }
    });

    return hasContent;
  }

  private stringifyValue(value: unknown) {
    if (value === null || value === undefined) {
      return "";
    }

    if (Array.isArray(value)) {
      return value.join(", ");
    }

    return String(value);
  }

  private fillRepeatingRow(
    worksheet: ExcelJS.Worksheet,
    rowNumber: number,
    groupName: string,
    rowValues: RepeatingRow,
    values: Record<string, unknown>,
  ) {
    worksheet.getRow(rowNumber).eachCell({ includeEmpty: false }, (cell) => {
      if (typeof cell.value !== "string") {
        return;
      }

      cell.value = cell.value.replace(
        this.tagRegex,
        (_tag, fieldPath: string) => {
          const [fieldGroup, ...fieldParts] = fieldPath.split(".");

          if (fieldGroup === groupName && fieldParts.length > 0) {
            return this.stringifyValue(rowValues[fieldParts.join(".")]);
          }

          return this.stringifyValue(values[fieldPath]);
        },
      );
    });
  }

  private adjustFormulaForRowExpansion(
    formula: string,
    plan: RepeatingRowPlan,
    rowOffset: number,
  ) {
    const templateRow = plan.rowNumber + rowOffset;
    const oldLastRow = templateRow + plan.removedRows;
    const newLastRow = templateRow + plan.rows.length - 1;
    const rowDelta = plan.rows.length - 1 - plan.removedRows;
    const cellOrRangeRegex =
      /(?<![A-Za-z0-9_.])(\$?[A-Z]{1,3}\$?)(\d+)(?::(\$?[A-Z]{1,3}\$?)(\d+))?(?![A-Za-z0-9_])(?!\s*\()/gi;

    return formula.replace(
      cellOrRangeRegex,
      (_reference, startColumn: string, startRowText: string, endColumn?: string, endRowText?: string) => {
        let startRow = Number(startRowText);
        let endRow = endRowText === undefined ? undefined : Number(endRowText);

        if (endRow !== undefined) {
          if (startRow <= templateRow && endRow >= templateRow && endRow <= oldLastRow) {
            endRow = newLastRow;
          } else {
            if (startRow > oldLastRow) {
              startRow += rowDelta;
            } else if (startRow > templateRow) {
              startRow = templateRow;
            }

            if (endRow > oldLastRow) {
              endRow += rowDelta;
            } else if (endRow > templateRow) {
              endRow = newLastRow;
            }
          }

          return `${startColumn}${startRow}:${endColumn}${endRow}`;
        }

        if (startRow > oldLastRow) {
          startRow += rowDelta;
        } else if (startRow > templateRow) {
          startRow = newLastRow;
        }

        return `${startColumn}${startRow}`;
      },
    );
  }

  private updateWorksheetFormulas(
    worksheet: ExcelJS.Worksheet,
    plans: RepeatingRowPlan[],
  ) {
    const orderedPlans = [...plans].sort((left, right) => left.rowNumber - right.rowNumber);

    worksheet.eachRow({ includeEmpty: false }, (row) => {
      row.eachCell({ includeEmpty: false }, (cell) => {
        const cellValue = cell.value;

        if (
          typeof cellValue !== "object" ||
          cellValue === null ||
          !("formula" in cellValue) ||
          typeof cellValue.formula !== "string"
        ) {
          return;
        }

        let formula = cellValue.formula;
        let rowOffset = 0;

        for (const plan of orderedPlans) {
          formula = this.adjustFormulaForRowExpansion(formula, plan, rowOffset);
          rowOffset += plan.rows.length - 1 - plan.removedRows;
        }

        cell.value = { ...cellValue, formula };
      });
    });
  }

  async findTemplateFields(buffer: Buffer): Promise<string[]> {
    const workbook = await this.loadWorkbook(buffer);

    const fields = new Set<string>();

    workbook.eachSheet((worksheet) => {
      worksheet.eachRow({ includeEmpty: false }, (row) => {
        row.eachCell({ includeEmpty: false }, (cell) => {
          if (typeof cell.value !== "string") {
            return;
          }

          for (const match of cell.value.matchAll(this.tagRegex)) {
            if (match[1]) {
              fields.add(match[1]);
            }
          }
        });
      });
    });

    return [...fields];
  }

  async generateDocument(
    buffer: Buffer,
    values: Record<string, unknown>,
  ): Promise<Buffer> {
    const workbook = await this.loadWorkbook(buffer);

    workbook.eachSheet((worksheet) => {
      const plans = this.getRepeatingRowPlans(worksheet, values);

      for (const plan of [...plans].sort((left, right) => right.rowNumber - left.rowNumber)) {
        let blankRows = 0;
        let nextRow = plan.rowNumber + 1;

        while (nextRow <= worksheet.rowCount && !this.rowHasContent(worksheet, nextRow)) {
          blankRows += 1;
          nextRow += 1;
        }

        plan.removedRows = blankRows;

        if (blankRows > 0) {
          worksheet.spliceRows(plan.rowNumber + 1, blankRows);
        }

        if (plan.rows.length > 1) {
          worksheet.duplicateRow(plan.rowNumber, plan.rows.length - 1, true);
        }

        plan.rows.forEach((rowValues, index) => {
          this.fillRepeatingRow(
            worksheet,
            plan.rowNumber + index,
            plan.groupName,
            rowValues,
            values,
          );
        });
      }

      worksheet.eachRow({ includeEmpty: false }, (row) => {
        row.eachCell({ includeEmpty: false }, (cell) => {
          if (typeof cell.value !== "string") {
            return;
          }

          cell.value = cell.value.replace(
            this.tagRegex,
            (_tag, fieldName: string) => {
              return this.stringifyValue(values[fieldName]);
            },
          );
        });
      });

      this.updateWorksheetFormulas(worksheet, plans);
    });

    workbook.calcProperties.fullCalcOnLoad = true;
    const output = await workbook.xlsx.writeBuffer();
    return Buffer.from(output);
  }
}
