import { API_URL, apiFetch } from "./api";

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
  categoryId: number | null;
  category?: TemplateCategory | null;
  filePath: string;
  createdAt: string;
  updatedAt: string;
  fields?: TemplateField[];
  documents?: GeneratedDocument[];
};

export type TemplateCategory = {
  id: number;
  name: string;
  _count?: { templates: number };
};

export type CreateTemplatePayload = {
  name: string;
  description?: string;
  file: File;
  categoryId?: number | null;
};

export const getTemplateCategories = async () => {
  const response = await apiFetch(`${API_URL}/templates/categories`);
  if (!response.ok) throw new Error("No se pudieron cargar las categorías");
  return response.json() as Promise<TemplateCategory[]>;
};

export const createTemplateCategory = async (name: string) => {
  const response = await apiFetch(`${API_URL}/templates/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { message?: string };
    throw new Error(body.message ?? "No se pudo crear la categoría");
  }
  return response.json() as Promise<TemplateCategory>;
};

export const assignTemplateCategory = async (id: number, categoryId: number | null) => {
  const response = await apiFetch(`${API_URL}/templates/${id}/category`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categoryId }),
  });
  if (!response.ok) throw new Error("No se pudo cambiar la categoría del formato");
  return response.json() as Promise<Template>;
};

export const getTemplates = async () => {
  const response = await apiFetch(`${API_URL}/templates`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar las plantillas");
  }

  return response.json() as Promise<Template[]>;
};

export const getTemplateById = async (id: number) => {
  const response = await apiFetch(`${API_URL}/templates/${id}`);

  if (!response.ok) {
    throw new Error("No se pudo cargar la plantilla");
  }

  return response.json() as Promise<Template>;
};

export const createTemplate = async (payload: CreateTemplatePayload) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("template", payload.file);
  if (payload.categoryId !== undefined && payload.categoryId !== null) {
    formData.append("categoryId", String(payload.categoryId));
  }

  if (payload.description) {
    formData.append("description", payload.description);
  }

  const response = await apiFetch(`${API_URL}/templates`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("No se pudo crear la plantilla");
  }

  return response.json() as Promise<Template>;
};

export const deleteTemplate = async (id: number) => {
  const response = await apiFetch(`${API_URL}/templates/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar la plantilla");
  }
};

export const generateDocumentFromTemplate = async (
  id: number,
  values: Record<string, unknown>,
) => {
  const response = await apiFetch(`${API_URL}/templates/${id}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
  });

  if (!response.ok) {
    throw new Error("No se pudo generar el documento desde la plantilla");
  }

  return response.blob();
};

export const previewDocumentFromTemplate = async (
  id: number,
  values: Record<string, unknown>,
  signal: AbortSignal,
) => {
  const response = await apiFetch(`${API_URL}/templates/${id}/preview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
    signal,
  });

  if (!response.ok) {
    throw new Error("No se pudo generar la vista previa");
  }

  return response.blob();
};

