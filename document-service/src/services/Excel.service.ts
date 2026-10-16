import ExcelJS from "exceljs";

export class ExcelService {
  private readonly tagRegex = /\{\{\s*([\p{L}\p{N}_.-]+)\s*\}\}/gu;

  async findTemplateFields(buffer: Buffer): Promise<string[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

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
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    workbook.eachSheet((worksheet) => {
      worksheet.eachRow({ includeEmpty: false }, (row) => {
        row.eachCell({ includeEmpty: false }, (cell) => {
          if (typeof cell.value !== "string") {
            return;
          }

          cell.value = cell.value.replace(
            this.tagRegex,
            (_tag, fieldName: string) => {
              const value = values[fieldName];

              if (value === null || value === undefined) {
                return "";
              }

              if (Array.isArray(value)) {
                return value.join(", ");
              }

              return String(value);
            },
          );
        });
      });
    });

    const output = await workbook.xlsx.writeBuffer();
    return Buffer.from(output);
  }
}
