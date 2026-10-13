import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export class WordService {
  private readonly tagRegex = /\{\{\s*([\p{L}\p{N}_.-]+)\s*\}\}/gu;
  private readonly loopRegex =
    /\{\{#\s*([\p{L}\p{N}_.-]+)\s*\}\}([\s\S]*?)\{\{\/\s*\1\s*\}\}/gu;

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

  findTemplateFields = (buffer: Buffer): string[] => {
    const zip = new PizZip(buffer);
    const xmlFileNames = Object.keys(zip.files).filter((fileName) =>
      /^word\/(document|header\d+|footer\d+)\.xml$/.test(fileName),
    );

    const documentText = xmlFileNames
      .map((fileName) =>
        this.getTextFromWordXml(zip.file(fileName)?.asText() ?? ""),
      )
      .join("\n");

    const fields = new Set<string>();

    const documentTextWithoutLoops = documentText.replace(
      this.loopRegex,
      (_loop, groupName: string, loopContent: string) => {
        const loopFields = loopContent.matchAll(this.tagRegex);

        for (const field of loopFields) {
          if (field[1]) {
            fields.add(`${groupName}.${field[1]}`);
          }
        }

        return "";
      },
    );

    const simpleFields = documentTextWithoutLoops.matchAll(this.tagRegex);

    for (const field of simpleFields) {
      if (field[1]) {
        fields.add(field[1]);
      }
    }

    return [...fields];
  };

  generateDocument(buffer: Buffer, values: Record<string, unknown>): Buffer {
    const zip = new PizZip(buffer);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: {
        start: "{{",
        end: "}}",
      },
      nullGetter: () => "",
    });

    doc.render(values);

    return doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });
  }
}
