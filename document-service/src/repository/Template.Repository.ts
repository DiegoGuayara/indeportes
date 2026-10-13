import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "../lib/prisma.js";

export class TemplateRepository {
  async findAll() {
    return await prisma.template.findMany({
      include: {
        fields: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number) {
    return await prisma.template.findUnique({
      where: { id },
      include: {
        fields: true,
        documents: true,
      },
    });
  }

  async create(data: {
    name: string;
    description?: string;
    filePath: string;
    fields: string[];
  }) {
    const formatFieldLabel = (field: string) => {
      const fieldName = field.includes(".") ? field.split(".").pop() : field;

      return (fieldName ?? field).replaceAll("_", " ").replaceAll("-", " ");
    };

    return await prisma.template.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        filePath: data.filePath,
        fields: {
          create: data.fields.map((field) => ({
            name: field,
            label: formatFieldLabel(field),
            type: "text",
            required: false,
          })),
        },
      },
      include: {
        fields: true,
      },
    });
  }

  async saveTemplateFile(fileName: string, buffer: Buffer) {
    const folder = path.resolve("storage", "templates");
    const filePath = path.join(folder, fileName);

    await mkdir(folder, { recursive: true });
    await writeFile(filePath, buffer);

    return filePath;
  }

  async readTemplateFile(filePath: string) {
    return await readFile(filePath);
  }

  async saveGeneratedDocumentFile(fileName: string, buffer: Buffer) {
    const folder = path.resolve("storage", "documents");
    const filePath = path.join(folder, fileName);

    await mkdir(folder, { recursive: true });
    await writeFile(filePath, buffer);

    return filePath;
  }

  async createGeneratedDocument(data: { templateId: number; filePath: string }) {
    return await prisma.generatedDocument.create({
      data,
    });
  }

  async delete(id: number) {
    return await prisma.template.delete({
      where: { id },
    });
  }
}
