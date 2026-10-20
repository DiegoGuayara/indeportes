import { prisma } from "../lib/prisma.js";
import type { UserRole } from "../../generated/prisma/client.js";

export class UserRepository {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  findAll() {
    return prisma.user.findMany({
      orderBy: [{ role: "asc" }, { name: "asc" }],
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
      },
    });
  }

  countActiveAdmins() {
    return prisma.user.count({ where: { role: "ADMIN", active: true } });
  }

  create(data: {
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
  }) {
    return prisma.user.create({ data });
  }

  updateAccess(id: number, active: boolean) {
    return prisma.user.update({ where: { id }, data: { active } });
  }
}
