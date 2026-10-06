import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export class WordService {
  private decodeXmlText(text: string): string {
    return text
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");
  }

  private getTextFromWordXml(xml: string): string {
    const textNodes = xml.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g);

    return [...textNodes]
      .map((match) => this.decodeXmlText(match[1] ?? ""))
      .join("");
  }

  findTemplateFields = (buffer: Buffer) => {
    const zip = new PizZip(buffer);
    const xmlFileNames = Object.keys(zip.files).filter((fileName) =>
      /^word\/(document|header\d+|footer\d+)\.xml$/.test(fileName),
    );

    const documentText = xmlFileNames
      .map((fileName) =>
        this.getTextFromWordXml(zip.file(fileName)?.asText() ?? ""),
      )
      .join("\n");

    const matches = documentText.matchAll(/{{\s*([a-zA-Z0-9_.-]+)\s*}}/g);

    return [...new Set([...matches].map((match) => match[1]))];
  };

  generateDocument(buffer: Buffer, values: Record<string, string>): Buffer {
    const zip = new PizZip(buffer);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: {
        start: "{{",
        end: "}}",
      },
    });

    doc.render(values);

    return doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });
  }
}
