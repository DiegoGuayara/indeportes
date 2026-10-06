import Router from "express";
import { TemplateController } from "../controller/Template_controller.js";

const router = Router();
const templateController = new TemplateController();

router.get("/templates", (req, res) =>
  templateController.getAll.bind(templateController),
);
router.get("/template/:id", (req, res) =>
  templateController.getById.bind(templateController),
);
router.post("/Ntemplate", (req, res) =>
  templateController.create.bind(templateController),
);
router.delete("/Dtemplate/:id", (req, res) =>
  templateController.delete.bind(templateController),
);

export default router;
