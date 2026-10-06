import { TemplateRepository } from "../repository/Template.Repository.js";

export class TemplateService {
  constructor(
    private readonly templateRepository:TemplateRepository,
  ) {}

  async getAll() {
    return await this.templateRepository.findAll();
  }

  async getById(id: number) {
    const template = await this.templateRepository.findById(id);

    if (!template) {
      throw new Error("La plantilla no existe");
    }

    return template;
  }

  async create(data: { name: string; description?: string; filePath: string }) {
    if (!data.name || data.name.trim() === "") {
      throw new Error("El nombre de la plantilla es obligatorio");
    }

    if (!data.filePath || data.filePath.trim() === "") {
      throw new Error("La ruta del archivo es obligatoria");
    }

    return await this.templateRepository.create(data);
  }

  async delete(id: number) {
    const template = await this.templateRepository.findById(id);

    if (!template) {
      throw new Error("La plantilla no existe");
    }

    return await this.templateRepository.delete(id);
  }
}
