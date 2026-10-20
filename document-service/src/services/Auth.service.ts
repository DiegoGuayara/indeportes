import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { UserRole } from "../../generated/prisma/client.js";
import { UserRepository } from "../repository/User.Repository.js";

const passwordRounds = 12;
const tokenLifetime = "8h";

export class AuthError extends Error {}

export type SafeUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
};

export class AuthService {
  constructor(private readonly userRepository = new UserRepository()) {}

  private get jwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
      throw new Error("JWT_SECRET debe tener al menos 32 caracteres");
    }
    return secret;
  }

  private toSafeUser(user: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    active: boolean;
  }): SafeUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
    };
  }

  async bootstrapInitialAdmin() {
    void this.jwtSecret;
    if ((await this.userRepository.countActiveAdmins()) > 0) return;

    const name = process.env.ADMIN_NAME?.trim();
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
      throw new Error(
        "Configura ADMIN_NAME, ADMIN_EMAIL y ADMIN_PASSWORD para crear la cuenta administradora inicial",
      );
    }
    if (password.length < 12) {
      throw new Error("ADMIN_PASSWORD debe tener al menos 12 caracteres");
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error(
        "ADMIN_EMAIL ya pertenece a una cuenta sin rol administrador; revisa la base de datos",
      );
    }

    await this.userRepository.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, passwordRounds),
      role: "ADMIN",
    });
    console.log(`Cuenta administradora inicial creada para ${email}`);
  }

  async login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.userRepository.findByEmail(normalizedEmail);

    if (!user || !user.active || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new AuthError("Correo o contraseña incorrectos");
    }

    const token = jwt.sign({ sub: String(user.id) }, this.jwtSecret, {
      expiresIn: tokenLifetime,
    });
    return { token, user: this.toSafeUser(user) };
  }

  async getSession(token: string): Promise<SafeUser> {
    const payload = jwt.verify(token, this.jwtSecret);
    if (typeof payload === "string" || !payload.sub) {
      throw new AuthError("Sesión inválida");
    }

    const user = await this.userRepository.findById(Number(payload.sub));
    if (!user || !user.active) throw new AuthError("Sesión inválida");
    return this.toSafeUser(user);
  }

  listUsers() {
    return this.userRepository.findAll();
  }

  async createUser(input: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) {
    const name = input.name.trim();
    const email = input.email.trim().toLowerCase();
    if (!name || !email || !input.password) {
      throw new AuthError("Nombre, correo y contraseña son obligatorios");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new AuthError("Escribe un correo válido");
    }
    if (input.password.length < 12) {
      throw new AuthError("La contraseña debe tener al menos 12 caracteres");
    }
    if (input.role !== "ADMIN" && input.role !== "USER") {
      throw new AuthError("El rol seleccionado no es válido");
    }
    if (await this.userRepository.findByEmail(email)) {
      throw new AuthError("Ya existe una cuenta con ese correo");
    }

    const user = await this.userRepository.create({
      name,
      email,
      passwordHash: await bcrypt.hash(input.password, passwordRounds),
      role: input.role,
    });
    return this.toSafeUser(user);
  }

  async setUserAccess(id: number, active: boolean, actingUserId: number) {
    if (!Number.isInteger(id) || id < 1) throw new AuthError("Usuario no válido");
    if (id === actingUserId && !active) {
      throw new AuthError("No puedes desactivar tu propia cuenta");
    }

    const user = await this.userRepository.findById(id);
    if (!user) throw new AuthError("El usuario no existe");

    if (!active && user.role === "ADMIN" && (await this.userRepository.countActiveAdmins()) <= 1) {
      throw new AuthError("Debe permanecer al menos una cuenta administradora activa");
    }

    const updated = await this.userRepository.updateAccess(id, active);
    return this.toSafeUser(updated);
  }
}

export const authService = new AuthService();
