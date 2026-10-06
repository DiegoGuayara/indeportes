import { prisma } from "./lib/prisma.js";

async function main() {
  const templates = await prisma.template.findMany();

  console.log("Plantillas encontradas:", templates);
}

main()
  .catch((error) => {
    console.error("Error al conectar con Prisma:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
