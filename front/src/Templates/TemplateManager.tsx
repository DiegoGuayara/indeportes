import { useEffect, useState } from "react";
import {
  createTemplate,
  deleteTemplate,
  getTemplateById,
  getTemplates,
  type Template,
} from "../services/templateApi";

type TemplateForm = {
  name: string;
  description: string;
};

const initialForm: TemplateForm = {
  name: "",
  description: "",
};

export function TemplateManager() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [form, setForm] = useState<TemplateForm>(initialForm);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadTemplates = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getTemplates();
      setTemplates(data);
    } catch (error) {
      setError("No se pudieron cargar las plantillas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTemplates();
  }, []);

  const handleInputChange = (field: keyof TemplateForm, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleCreateTemplate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim() || !templateFile) {
      setError("El nombre y el archivo .docx son obligatorios");
      return;
    }

    if (!templateFile.name.endsWith(".docx")) {
      setError("Solo puedes guardar plantillas .docx");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await createTemplate({
        name: form.name,
        description: form.description || undefined,
        file: templateFile,
      });

      setForm(initialForm);
      setTemplateFile(null);
      await loadTemplates();
    } catch (error) {
      setError("No se pudo crear la plantilla");
    } finally {
      setSaving(false);
    }
  };

  const handleSelectTemplate = async (id: number) => {
    setError("");

    try {
      const template = await getTemplateById(id);
      setSelectedTemplate(template);
    } catch (error) {
      setError("No se pudo cargar el detalle de la plantilla");
    }
  };

  const handleDeleteTemplate = async (id: number) => {
    setError("");

    try {
      await deleteTemplate(id);
      setSelectedTemplate((currentTemplate) =>
        currentTemplate?.id === id ? null : currentTemplate,
      );
      await loadTemplates();
    } catch (error) {
      setError("No se pudo eliminar la plantilla");
    }
  };

  return (
    <section className="flex flex-col gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold">Plantillas guardadas</h2>
        <p className="mt-1 text-sm text-slate-600">
          Administra los registros de plantillas que se guardan en MySQL.
        </p>
      </div>

      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={handleCreateTemplate}
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="name">
            Nombre
          </label>
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            id="name"
            type="text"
            value={form.name}
            onChange={(event) => handleInputChange("name", event.target.value)}
            placeholder="Certificado deportivo"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="templateFile"
          >
            Archivo Word
          </label>
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            id="templateFile"
            type="file"
            accept=".docx"
            onChange={(event) =>
              setTemplateFile(event.target.files?.[0] ?? null)
            }
          />
          {templateFile && (
            <p className="text-xs text-slate-500">{templateFile.name}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="description"
          >
            Descripción
          </label>
          <textarea
            className="min-h-20 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            id="description"
            value={form.description}
            onChange={(event) =>
              handleInputChange("description", event.target.value)
            }
            placeholder="Uso o detalle de la plantilla"
          />
        </div>

        <div className="flex justify-end sm:col-span-2">
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            type="submit"
            disabled={saving}
          >
            {saving ? "Guardando..." : "Crear plantilla"}
          </button>
        </div>
      </form>

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="border-t border-slate-100 pt-5">
        {loading ? (
          <p className="text-sm text-slate-600">Cargando plantillas...</p>
        ) : templates.length === 0 ? (
          <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Todavía no hay plantillas guardadas.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {templates.map((template) => (
              <article
                className="flex flex-col gap-3 rounded-md border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                key={template.id}
              >
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {template.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {template.filePath}
                  </p>
                  {template.description && (
                    <p className="mt-1 text-sm text-slate-500">
                      {template.description}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    type="button"
                    onClick={() => void handleSelectTemplate(template.id)}
                  >
                    Ver
                  </button>
                  <button
                    className="rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
                    type="button"
                    onClick={() => void handleDeleteTemplate(template.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedTemplate && (
        <div className="rounded-md bg-slate-50 p-4">
          <h3 className="font-semibold">Detalle de plantilla</h3>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-slate-700">ID</dt>
              <dd className="text-slate-600">{selectedTemplate.id}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700">Archivo</dt>
              <dd className="text-slate-600">{selectedTemplate.filePath}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700">Campos</dt>
              <dd className="text-slate-600">
                {selectedTemplate.fields?.length ?? 0}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700">Documentos</dt>
              <dd className="text-slate-600">
                {selectedTemplate.documents?.length ?? 0}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </section>
  );
}
