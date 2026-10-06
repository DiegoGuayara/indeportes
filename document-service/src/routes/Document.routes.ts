import { Router } from "express";
import multer from "multer";
import { DocumentController } from "../controller/Document.controller.js";
import { WordService } from "../services/Word.service.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

const wordService = new WordService();

const documentController = new DocumentController(wordService);

router.post(
  "/analyze",
  upload.single("document"),
  documentController.analyze.bind(documentController),
);

router.post(
  "/generate",
  upload.single("template"),
  documentController.generate.bind(documentController),
);

export default router;
