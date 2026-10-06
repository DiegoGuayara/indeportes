import type { Request, Response } from "express";
import { TemplateService } from "../services/Template.service.js";
import { TemplateRepository } from "../repository/Template.Repository.js";

export class TemplateController {
  private readonly templateService: TemplateService;

  constructor() {
    const templateRepository = new TemplateRepository();
    this.templateService = new TemplateService(templateRepository);
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
      const { name, description, filePath } = req.body;

      const template = await this.templateService.create({
        name,
        description,
        filePath,
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
