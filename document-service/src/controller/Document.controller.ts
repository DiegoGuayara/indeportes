import type { Request, Response } from "express";
import { WordService } from "../services/Word.service.js";

export class DocumentController {
  constructor(private readonly wordService: WordService) {}

  async analyze(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      res.status(400).json({
        message: "No se envió ningún documento",
      });
      return;
    }

    try {
      const fields = this.wordService.findTemplateFields(req.file.buffer);

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
      const values = JSON.parse(req.body.values) as Record<string, string>;

      const buffer = this.wordService.generateDocument(req.file.buffer, values);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      );

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="documento-generado.docx"',
      );

      res.send(buffer);
    } catch (error) {
      console.error("Error al generar el documento:", error);

      res.status(500).json({
        message: "No se pudo generar el documento",
      });
    }
  }
}
