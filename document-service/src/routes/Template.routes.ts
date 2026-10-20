import { Router } from "express";
import multer from "multer";
import { TemplateController } from "../controller/Template_controller.js";
import { requireAdmin } from "../middleware/Auth.middleware.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
});
const templateController = new TemplateController();

router.get("/", templateController.getAll.bind(templateController));
router.get("/:id", templateController.getById.bind(templateController));
router.post(
  "/",
  requireAdmin,
  upload.single("template"),
  templateController.create.bind(templateController),
);
router.post("/:id/generate", templateController.generate.bind(templateController));
router.post("/:id/preview", templateController.preview.bind(templateController));
router.delete("/:id", requireAdmin, templateController.delete.bind(templateController));

export default router;
