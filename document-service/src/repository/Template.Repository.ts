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
  }) {
    return await prisma.template.create({
      data,
    });
  }

  async delete(id: number) {
    return await prisma.template.delete({
      where: { id },
    });
  }
}
