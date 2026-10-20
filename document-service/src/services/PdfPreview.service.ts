import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);

export class PdfPreviewService {
  async convert(buffer: Buffer, extension: "docx" | "xlsx"): Promise<Buffer> {
    const directory = await mkdtemp(join(tmpdir(), "indeportes-preview-"));
    const sourcePath = join(directory, `documento.${extension}`);
    const profilePath = pathToFileURL(join(directory, "profile")).href;

    try {
      await writeFile(sourcePath, buffer);
      await execFileAsync(
        "soffice",
        [
          "--headless",
          `-env:UserInstallation=${profilePath}`,
          "--convert-to",
          "pdf",
          "--outdir",
          directory,
          sourcePath,
        ],
        { timeout: 60_000, maxBuffer: 1024 * 1024 },
      );

      return await readFile(join(directory, "documento.pdf"));
    } catch (error) {
      console.error("Error al convertir el documento para vista previa:", error);
      throw new Error(
        "No se pudo crear la vista previa PDF. Verifica que la plantilla se pueda abrir en Word o Excel.",
      );
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }
}
