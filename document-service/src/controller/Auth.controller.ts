import type { Request, Response } from "express";
import { AuthError, authService } from "../services/Auth.service.js";
import { cookieClearOptions, cookieOptions } from "../middleware/Auth.middleware.js";

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };
    if (!email || !password) {
      res.status(400).json({ message: "Correo y contraseña son obligatorios" });
      return;
    }

    try {
      const { token, user } = await authService.login(email, password);
      res.cookie("access_token", token, cookieOptions());
      res.status(200).json({ user });
    } catch (error) {
      if (error instanceof AuthError) {
        res.status(401).json({ message: error.message });
      } else {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "No se pudo iniciar sesión" });
      }
    }
  }

  logout(_req: Request, res: Response): void {
    res.clearCookie("access_token", cookieClearOptions());
    res.status(204).send();
  }

  me(req: Request, res: Response): void {
    res.status(200).json({ user: req.authUser });
  }

  async listUsers(_req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json(await authService.listUsers());
    } catch (error) {
      console.error("Error al consultar usuarios:", error);
      res.status(500).json({ message: "No se pudieron cargar los usuarios" });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await authService.createUser(req.body);
      res.status(201).json({ user });
    } catch (error) {
      if (error instanceof AuthError) {
        res.status(400).json({ message: error.message });
      } else {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "No se pudo crear el usuario" });
      }
    }
  }

  async setUserAccess(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const active = (req.body as { active?: unknown }).active;
      if (typeof active !== "boolean" || !req.authUser) {
        res.status(400).json({ message: "Indica si el acceso debe estar activo" });
        return;
      }
      const user = await authService.setUserAccess(id, active, req.authUser.id);
      res.status(200).json({ user });
    } catch (error) {
      if (error instanceof AuthError) {
        res.status(400).json({ message: error.message });
      } else {
        console.error("Error al actualizar acceso de usuario:", error);
        res.status(500).json({ message: "No se pudo actualizar el acceso" });
      }
    }
  }
}
