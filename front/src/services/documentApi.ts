import { API_URL } from "./api";

export type AnalyzeResponse = {
  fields: string[];
};

export const analyzeDocument = async (file: File) => {
  const formData = new FormData();
  formData.append("template", file);

  const response = await fetch(`${API_URL}/documents/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("No se pudo analizar el documento");
  }

  return response.json() as Promise<AnalyzeResponse>;
};

export const generateDocument = async (
  file: File,
  values: Record<string, string>,
) => {
  const formData = new FormData();
  formData.append("template", file);
  formData.append("values", JSON.stringify(values));

  const response = await fetch(`${API_URL}/documents/generate`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("No se pudo generar el documento");
  }

  return response.blob();
};

