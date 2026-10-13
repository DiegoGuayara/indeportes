import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const source = resolve("generated");
const destination = resolve("dist/generated");

if (!existsSync(source)) {
  console.warn("No se encontró la carpeta generated. Ejecuta npx prisma generate.");
  process.exit(0);
}

mkdirSync(dirname(destination), { recursive: true });
cpSync(source, destination, { recursive: true, force: true });

