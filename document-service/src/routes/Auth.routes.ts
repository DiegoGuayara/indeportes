import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { AuthController } from "../controller/Auth.controller.js";
import { authenticate, requireAdmin } from "../middleware/Auth.middleware.js";

const router = Router();
const controller = new AuthController();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Demasiados intentos. Espera 15 minutos e inténtalo de nuevo." },
});

router.post("/login", loginLimiter, controller.login.bind(controller));
router.post("/logout", controller.logout.bind(controller));
router.get("/me", authenticate, controller.me.bind(controller));
router.get("/users", authenticate, requireAdmin, controller.listUsers.bind(controller));
router.post("/users", authenticate, requireAdmin, controller.createUser.bind(controller));
router.patch("/users/:id/access", authenticate, requireAdmin, controller.setUserAccess.bind(controller));

export default router;
