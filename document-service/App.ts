import "dotenv/config";
import express from "express";
import cors from "cors";
import documentRoutes from "./src/routes/Document.routes.js";
import templateRoutes from "./src/routes/Template.routes.js";

const app = express();

const PORT = process.env.PORT || 10101;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Document Service está corriendo en el puerto ${PORT}`);
});

app.use("/templates", templateRoutes);
app.use("/documents", documentRoutes);

app.listen(PORT, () => {
  console.log(`Document Service está corriendo en el puerto ${PORT}`);
});
