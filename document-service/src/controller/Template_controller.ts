import type { Request, Response } from "express";
import { TemplateService } from "../services/Template.service.js";
import { TemplateRepository } from "../repository/Template.Repository.js";
import { WordService } from "../services/Word.service.js";

export class TemplateController {
  private readonly templateService: TemplateService;

  constructor() {
    const templateRepository = new TemplateRepository();
    const wordService = new WordService();
    this.templateService = new TemplateService(templateRepository, wordService);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const template = await this.templateService.getAll();

      res.status(200).json(template);
    } catch (error) {
      console.error("Error al obtener las plantillas: ", error);

      res.status(500).json({
        message: "Error al obtener las plantillas",
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        res.status(400).json({
          message: "El ID de la plantilla no es valido",
        });
        return;
      }

      const template = await this.templateService.getById(id);

      res.status(200).json(template);
    } catch (error) {
      console.error("Error al obtener la plantilla: ", error);
      res.status(500).json({
        message: "La plantilla no existe",
      });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;

      if (!req.file) {
        res.status(400).json({
          message: "No se envió ninguna plantilla",
        });
        return;
      }

      const template = await this.templateService.create({
        name,
        description,
        file: req.file,
      });

      res.status(201).json(template);
    } catch (error) {
      console.error("Error al crear la plantilla: ", error);
      res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : "Error al crear la plantilla",
      });
    }
  }

  async generate(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        res.status(400).json({
          message: "El ID de la plantilla no es válido",
        });
        return;
      }

      const values = req.body.values as Record<string, unknown> | undefined;

      if (!values) {
        res.status(400).json({
          message: "No se enviaron los valores",
        });
        return;
      }

      const buffer = await this.templateService.generateDocument(id, values);

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
      console.error("Error al generar documento desde plantilla: ", error);
      res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : "Error al generar documento desde plantilla",
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        res.status(400).json({
          message: "El ID de la plantilla no es válido",
        });
        return;
      }

      await this.templateService.delete(id);

      res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar la plantilla: ", error);
      res.status(500).json({
        message: "Error al eliminar la plantilla",
      });
    }
  }
}
