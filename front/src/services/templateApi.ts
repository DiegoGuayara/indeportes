import { API_URL } from "./api";

export type TemplateField = {
  id: number;
  templateId: number;
  name: string;
  label: string;
  type: string;
  required: boolean;
};

export type GeneratedDocument = {
  id: number;
  templateId: number;
  filePath: string;
  createdAt: string;
};

export type Template = {
  id: number;
  name: string;
  description: string | null;
  filePath: string;
  createdAt: string;
  updatedAt: string;
  fields?: TemplateField[];
  documents?: GeneratedDocument[];
};

export type CreateTemplatePayload = {
  name: string;
  description?: string;
  file: File;
};

export const getTemplates = async () => {
  const response = await fetch(`${API_URL}/templates`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar las plantillas");
  }

  return response.json() as Promise<Template[]>;
};

export const getTemplateById = async (id: number) => {
  const response = await fetch(`${API_URL}/templates/${id}`);

  if (!response.ok) {
    throw new Error("No se pudo cargar la plantilla");
  }

  return response.json() as Promise<Template>;
};

export const createTemplate = async (payload: CreateTemplatePayload) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("template", payload.file);

  if (payload.description) {
    formData.append("description", payload.description);
  }

  const response = await fetch(`${API_URL}/templates`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("No se pudo crear la plantilla");
  }

  return response.json() as Promise<Template>;
};

export const deleteTemplate = async (id: number) => {
  const response = await fetch(`${API_URL}/templates/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar la plantilla");
  }
};

