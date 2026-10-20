import type { NextFunction, Request, Response } from "express";
import type { SafeUser } from "../services/Auth.service.js";
import { authService } from "../services/Auth.service.js";

declare global {
  namespace Express {
    interface Request {
      authUser?: SafeUser;
    }
  }
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.access_token as string | undefined;
  if (!token) {
    res.status(401).json({ message: "Inicia sesión para continuar" });
    return;
  }

  try {
    req.authUser = await authService.getSession(token);
    next();
  } catch {
    res.clearCookie("access_token", cookieClearOptions());
    res.status(401).json({ message: "La sesión venció. Inicia sesión de nuevo" });
  }
}

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.authUser?.role !== "ADMIN") {
    res.status(403).json({ message: "Se requiere una cuenta administradora" });
    return;
  }
  next();
}

export function cookieOptions() {
  const production = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: production,
    sameSite: production ? ("none" as const) : ("lax" as const),
    maxAge: 8 * 60 * 60 * 1000,
    path: "/",
  };
}

export function cookieClearOptions() {
  const { maxAge: _maxAge, ...options } = cookieOptions();
  return options;
}
