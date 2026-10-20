import { Router } from "express";
import multer from "multer";
import { DocumentController } from "../controller/Document.controller.js";
import { ExcelService } from "../services/Excel.service.js";
import { WordService } from "../services/Word.service.js";
import { PdfPreviewService } from "../services/PdfPreview.service.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

const wordService = new WordService();
const excelService = new ExcelService();

const pdfPreviewService = new PdfPreviewService();
const documentController = new DocumentController(wordService, excelService, pdfPreviewService);

router.post(
  "/analyze",
  upload.single("template"),
  documentController.analyze.bind(documentController),
);

router.post(
  "/generate",
  upload.single("template"),
  documentController.generate.bind(documentController),
);

router.post(
  "/preview",
  upload.single("template"),
  documentController.preview.bind(documentController),
);

export default router;
