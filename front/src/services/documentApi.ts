import { API_URL, apiFetch } from "./api";

export type AnalyzeResponse = {
  fields: string[];
};

export const analyzeDocument = async (file: File) => {
  const formData = new FormData();
  formData.append("template", file);

  const response = await apiFetch(`${API_URL}/documents/analyze`, {
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
  values: Record<string, unknown>,
) => {
  const formData = new FormData();
  formData.append("template", file);
  formData.append("values", JSON.stringify(values));

  const response = await apiFetch(`${API_URL}/documents/generate`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("No se pudo generar el documento");
  }

  return response.blob();
};

export const previewDocument = async (
  file: File,
  values: Record<string, unknown>,
  signal: AbortSignal,
) => {
  const formData = new FormData();
  formData.append("template", file);
  formData.append("values", JSON.stringify(values));

  const response = await apiFetch(`${API_URL}/documents/preview`, {
    method: "POST",
    body: formData,
    signal,
  });

  if (!response.ok) {
    throw new Error("No se pudo generar la vista previa");
  }

  return response.blob();
};

