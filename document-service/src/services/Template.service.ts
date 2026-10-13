import { TemplateRepository } from "../repository/Template.Repository.js";
import { WordService } from "./Word.service.js";

export class TemplateService {
  constructor(
    private readonly templateRepository: TemplateRepository,
    private readonly wordService: WordService,
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

  async create(data: {
    name: string;
    description?: string;
    file: Express.Multer.File;
  }) {
    if (!data.name || data.name.trim() === "") {
      throw new Error("El nombre de la plantilla es obligatorio");
    }

    if (!data.file.originalname.endsWith(".docx")) {
      throw new Error("Solo se permiten plantillas .docx");
    }

    const fields = this.wordService.findTemplateFields(data.file.buffer);
    const fileName = `${Date.now()}-${data.file.originalname}`;
    const filePath = await this.templateRepository.saveTemplateFile(
      fileName,
      data.file.buffer,
    );

    return await this.templateRepository.create({
      name: data.name,
      ...(data.description ? { description: data.description } : {}),
      filePath,
      fields,
    });
  }

  async generateDocument(id: number, values: Record<string, unknown>) {
    const template = await this.templateRepository.findById(id);

    if (!template) {
      throw new Error("La plantilla no existe");
    }

    const templateBuffer = await this.templateRepository.readTemplateFile(
      template.filePath,
    );
    const documentBuffer = this.wordService.generateDocument(
      templateBuffer,
      values,
    );

    const fileName = `${Date.now()}-${template.name}-generado.docx`;
    const filePath = await this.templateRepository.saveGeneratedDocumentFile(
      fileName,
      documentBuffer,
    );

    await this.templateRepository.createGeneratedDocument({
      templateId: template.id,
      filePath,
    });

    return documentBuffer;
  }

  async delete(id: number) {
    const template = await this.templateRepository.findById(id);

    if (!template) {
      throw new Error("La plantilla no existe");
    }

    return await this.templateRepository.delete(id);
  }
}
