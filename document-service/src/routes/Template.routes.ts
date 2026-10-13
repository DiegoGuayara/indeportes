import { Router } from "express";
import multer from "multer";
import { TemplateController } from "../controller/Template_controller.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
});
const templateController = new TemplateController();

router.get("/", templateController.getAll.bind(templateController));
router.get("/:id", templateController.getById.bind(templateController));
router.post(
  "/",
  upload.single("template"),
  templateController.create.bind(templateController),
);
router.delete("/:id", templateController.delete.bind(templateController));

export default router;
