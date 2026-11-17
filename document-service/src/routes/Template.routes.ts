import { Router } from "express";
import multer from "multer";
import { TemplateController } from "../controller/Template_controller.js";
import { authenticate, requireAdmin } from "../middleware/Auth.middleware.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
});
const templateController = new TemplateController();

router.get("/", templateController.getAll.bind(templateController));
router.get("/categories", templateController.getCategories.bind(templateController));
router.get("/:id/download", templateController.downloadBlank.bind(templateController));
router.post("/categories", authenticate, requireAdmin, templateController.createCategory.bind(templateController));
router.patch("/:id/category", authenticate, requireAdmin, templateController.assignCategory.bind(templateController));
router.get("/:id", authenticate, requireAdmin, templateController.getById.bind(templateController));
router.post(
  "/",
  authenticate,
  requireAdmin,
  upload.single("template"),
  templateController.create.bind(templateController),
);
router.post("/:id/generate", authenticate, requireAdmin, templateController.generate.bind(templateController));
router.post("/:id/preview", authenticate, requireAdmin, templateController.preview.bind(templateController));
router.delete("/:id", authenticate, requireAdmin, templateController.delete.bind(templateController));

export default router;
