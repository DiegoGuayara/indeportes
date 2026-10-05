import express from "express";
import cors from "cors";
import multer from "multer";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
const app = express();
const PORT = process.env.PORT || 10101;
const upload = multer({ storage: multer.memoryStorage() });
const decodeXmlText = (text) => text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
const getTextFromWordXml = (xml) => {
    const textNodes = xml.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g);
    return [...textNodes].map((match) => decodeXmlText(match[1] ?? "")).join("");
};
const findTemplateFields = (buffer) => {
    const zip = new PizZip(buffer);
    const xmlFileNames = Object.keys(zip.files).filter((fileName) => /^word\/(document|header\d+|footer\d+)\.xml$/.test(fileName));
    const documentText = xmlFileNames
        .map((fileName) => getTextFromWordXml(zip.file(fileName)?.asText() ?? ""))
        .join("\n");
    const matches = documentText.matchAll(/{{\s*([a-zA-Z0-9_.-]+)\s*}}/g);
    return [...new Set([...matches].map((match) => match[1]))];
};
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send(`Document Service está corriendo en el puerto ${PORT}`);
});
app.post("/documents/analyze", upload.single("template"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No se envió ningun documento" });
    }
    const fields = findTemplateFields(req.file.buffer);
    res.json({ fields });
});
app.post("/documents/generate", upload.single("template"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No se envió ningun documento" });
    }
    if (!req.body.values) {
        return res.status(400).json({ message: "No se enviaron los valores" });
    }
    try {
        const values = JSON.parse(req.body.values);
        const zip = new PizZip(req.file.buffer);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            delimiters: {
                start: "{{",
                end: "}}",
            },
        });
        doc.render(values);
        const buffer = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        res.setHeader("Content-Disposition", 'attachment; filename="documento-generado.docx"');
        res.send(buffer);
    }
    catch (error) {
        res.status(500).json({
            message: "No se pudo generar el documento",
        });
    }
});
app.listen(PORT, () => {
    console.log("Document Service está corriendo en el puerto " + PORT);
});
//# sourceMappingURL=App.js.map