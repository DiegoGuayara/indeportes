import type { Request, Response } from "express";
import { ExcelService } from "../services/Excel.service.js";
import { WordService } from "../services/Word.service.js";
import { PdfPreviewService } from "../services/PdfPreview.service.js";

export class DocumentController {
  constructor(
    private readonly wordService: WordService,
    private readonly excelService: ExcelService,
    private readonly pdfPreviewService: PdfPreviewService,
  ) {}

  private getExtension(fileName: string) {
    return fileName.split(".").pop()?.toLowerCase();
  }

  async analyze(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      res.status(400).json({
        message: "No se envió ningún documento",
      });
      return;
    }

    try {
      const extension = this.getExtension(req.file.originalname);

      if (extension !== "docx" && extension !== "xlsx") {
        res.status(400).json({
          message: "Solo se permiten archivos .docx o .xlsx",
        });
        return;
      }

      const fields =
        extension === "xlsx"
          ? await this.excelService.findTemplateFields(req.file.buffer)
          : this.wordService.findTemplateFields(req.file.buffer);

      res.status(200).json({
        fields,
      });
    } catch (error) {
      console.error("Error al analizar el documento:", error);

      res.status(500).json({
        message: "No se pudo analizar el documento",
      });
    }
  }

  async generate(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      res.status(400).json({
        message: "No se envió ningún documento",
      });
      return;
    }

    if (!req.body.values) {
      res.status(400).json({
        message: "No se enviaron los valores",
      });
      return;
    }

    try {
      const extension = this.getExtension(req.file.originalname);

      if (extension !== "docx" && extension !== "xlsx") {
        res.status(400).json({
          message: "Solo se permiten archivos .docx o .xlsx",
        });
        return;
      }

      const values = JSON.parse(req.body.values) as Record<string, unknown>;

      const isExcel = extension === "xlsx";
      const buffer = isExcel
        ? await this.excelService.generateDocument(req.file.buffer, values)
        : this.wordService.generateDocument(req.file.buffer, values);

      res.setHeader(
        "Content-Type",
        isExcel
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="documento-generado.${extension}"`,
      );

      res.send(buffer);
    } catch (error) {
      console.error("Error al generar el documento:", error);

      res.status(500).json({
        message: "No se pudo generar el documento",
      });
    }
  }

  async preview(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      res.status(400).json({ message: "No se envió ningún documento" });
      return;
    }

    try {
      const extension = this.getExtension(req.file.originalname);
      if (extension !== "docx" && extension !== "xlsx") {
        res.status(400).json({ message: "Solo se permiten archivos .docx o .xlsx" });
        return;
      }
      if (!req.body.values) {
        res.status(400).json({ message: "No se enviaron los valores" });
        return;
      }

      const values = JSON.parse(req.body.values) as Record<string, unknown>;
      const documentBuffer = extension === "xlsx"
        ? await this.excelService.generateDocument(req.file.buffer, values)
        : this.wordService.generateDocument(req.file.buffer, values);
      const pdf = await this.pdfPreviewService.convert(documentBuffer, extension);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'inline; filename="vista-previa.pdf"');
      res.setHeader("Cache-Control", "no-store");
      res.send(pdf);
    } catch (error) {
      console.error("Error al generar vista previa del documento:", error);
      res.status(500).json({
        message: error instanceof Error ? error.message : "No se pudo generar la vista previa",
      });
    }
  }
}
