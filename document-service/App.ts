import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/Auth.routes.js";
import documentRoutes from "./src/routes/Document.routes.js";
import templateRoutes from "./src/routes/Template.routes.js";
import { authenticate } from "./src/middleware/Auth.middleware.js";
import { authService } from "./src/services/Auth.service.js";

const app = express();
app.set("trust proxy", 1);

const PORT = process.env.PORT || 10101;

const allowedOrigins = (process.env.FRONTEND_URL ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origen no autorizado"));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const changesData = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method);
  const origin = req.get("origin");
  if (changesData && origin && !allowedOrigins.includes(origin)) {
    res.status(403).json({ message: "Origen no autorizado" });
    return;
  }
  next();
});

app.get("/", (req, res) => {
  res.send(`Document Service está corriendo en el puerto ${PORT}`);
});

app.use("/auth", authRoutes);
app.use("/templates", authenticate, templateRoutes);
app.use("/documents", authenticate, documentRoutes);

async function start() {
  await authService.bootstrapInitialAdmin();
  app.listen(PORT, () => {
    console.log(`Document Service está corriendo en el puerto ${PORT}`);
  });
}

void start().catch((error: unknown) => {
  console.error("No se pudo iniciar el servicio:", error);
  process.exitCode = 1;
});
