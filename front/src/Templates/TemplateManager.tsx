import { useEffect, useState } from "react";
import {
  createTemplate,
  deleteTemplate,
  generateDocumentFromTemplate,
  getTemplateById,
  getTemplates,
  type Template,
  type TemplateField,
} from "../services/templateApi";

type TemplateForm = {
  name: string;
  description: string;
};

const initialForm: TemplateForm = {
  name: "",
  description: "",
};

type RepeatingValues = Record<string, Array<Record<string, string>>>;

const getFieldGroupName = (fieldName: string) => fieldName.split(".")[0] ?? "";

const getFieldNameInGroup = (fieldName: string) =>
  fieldName.split(".")[1] ?? fieldName;

const formatGroupLabel = (groupName: string) =>
  groupName.replaceAll("_", " ").replaceAll("-", " ");

const getSimpleFields = (fields: TemplateField[] = []) =>
  fields.filter((field) => !field.name.includes("."));

const getRepeatingGroups = (fields: TemplateField[] = []) =>
  fields.reduce<Record<string, TemplateField[]>>((groups, field) => {
    if (!field.name.includes(".")) {
      return groups;
    }

    const groupName = getFieldGroupName(field.name);
    groups[groupName] = [...(groups[groupName] ?? []), field];

    return groups;
  }, {});

const buildEmptyGroupRow = (fields: TemplateField[]) =>
  fields.reduce<Record<string, string>>((row, field) => {
    row[getFieldNameInGroup(field.name)] = "";
    return row;
  }, {});

export function TemplateManager() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [form, setForm] = useState<TemplateForm>(initialForm);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [templateValues, setTemplateValues] = useState<Record<string, string>>(
    {},
  );
  const [repeatingValues, setRepeatingValues] = useState<RepeatingValues>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
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
      const simpleFields = getSimpleFields(template.fields);
      const repeatingGroups = getRepeatingGroups(template.fields);

      setSelectedTemplate(template);
      setTemplateValues(
        simpleFields.reduce<Record<string, string>>((values, field) => {
          values[field.name] = "";
          return values;
        }, {}),
      );
      setRepeatingValues(
        Object.entries(repeatingGroups).reduce<RepeatingValues>(
          (values, [groupName, fields]) => {
            values[groupName] = [buildEmptyGroupRow(fields)];
            return values;
          },
          {},
        ),
      );
    } catch (error) {
      setError("No se pudo cargar el detalle de la plantilla");
    }
  };

  const handleTemplateValueChange = (field: string, value: string) => {
    setTemplateValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleRepeatingValueChange = (
    groupName: string,
    rowIndex: number,
    fieldName: string,
    value: string,
  ) => {
    setRepeatingValues((currentValues) => ({
      ...currentValues,
      [groupName]: (currentValues[groupName] ?? []).map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              [fieldName]: value,
            }
          : row,
      ),
    }));
  };

  const handleAddRepeatingRow = (groupName: string, fields: TemplateField[]) => {
    setRepeatingValues((currentValues) => ({
      ...currentValues,
      [groupName]: [
        ...(currentValues[groupName] ?? []),
        buildEmptyGroupRow(fields),
      ],
    }));
  };

  const handleRemoveRepeatingRow = (groupName: string, rowIndex: number) => {
    setRepeatingValues((currentValues) => {
      const rows = currentValues[groupName] ?? [];

      return {
        ...currentValues,
        [groupName]:
          rows.length <= 1 ? rows : rows.filter((_, index) => index !== rowIndex),
      };
    });
  };

  const handleGenerateFromTemplate = async () => {
    if (!selectedTemplate) {
      setError("Selecciona una plantilla primero");
      return;
    }

    setGenerating(true);
    setError("");

    try {
      const blob = await generateDocumentFromTemplate(
        selectedTemplate.id,
        {
          ...templateValues,
          ...repeatingValues,
        },
      );
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${selectedTemplate.name}-generado.docx`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      const updatedTemplate = await getTemplateById(selectedTemplate.id);
      setSelectedTemplate(updatedTemplate);
      await loadTemplates();
    } catch (error) {
      setError("No se pudo generar el documento desde la plantilla");
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteTemplate = async (id: number) => {
    setError("");

    try {
      await deleteTemplate(id);
      setSelectedTemplate((currentTemplate) =>
        currentTemplate?.id === id ? null : currentTemplate,
      );
      setTemplateValues({});
      setRepeatingValues({});
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
                    Usar
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
        <div className="flex flex-col gap-5 rounded-md bg-slate-50 p-4">
          <div>
            <h3 className="font-semibold">Usar plantilla</h3>
            <p className="mt-1 text-sm text-slate-600">
              Llena los campos detectados y genera un documento desde la
              plantilla guardada.
            </p>
          </div>

          {(selectedTemplate.fields?.length ?? 0) > 0 ? (
            <div className="flex flex-col gap-5">
              {getSimpleFields(selectedTemplate.fields).length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {getSimpleFields(selectedTemplate.fields).map((field) => (
                    <div className="flex flex-col gap-2" key={field.id}>
                      <label
                        className="text-sm font-medium text-slate-700"
                        htmlFor={`template-field-${field.id}`}
                      >
                        {field.label}
                      </label>
                      <input
                        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        id={`template-field-${field.id}`}
                        type="text"
                        value={templateValues[field.name] ?? ""}
                        onChange={(event) =>
                          handleTemplateValueChange(
                            field.name,
                            event.target.value,
                          )
                        }
                        placeholder={`Escribe ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {Object.entries(getRepeatingGroups(selectedTemplate.fields)).map(
                ([groupName, fields]) => (
                  <div
                    className="flex flex-col gap-4 rounded-md border border-slate-200 bg-white p-4"
                    key={groupName}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="font-semibold capitalize">
                          {formatGroupLabel(groupName)}
                        </h4>
                        <p className="text-sm text-slate-600">
                          Agrega las filas que necesites para esta lista.
                        </p>
                      </div>
                      <button
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                        type="button"
                        onClick={() => handleAddRepeatingRow(groupName, fields)}
                      >
                        Agregar fila
                      </button>
                    </div>

                    {(repeatingValues[groupName] ?? []).map(
                      (row, rowIndex) => (
                        <div
                          className="rounded-md border border-slate-200 p-3"
                          key={`${groupName}-${rowIndex}`}
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-700">
                              Fila {rowIndex + 1}
                            </p>
                            <button
                              className="rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:text-slate-400"
                              type="button"
                              disabled={
                                (repeatingValues[groupName] ?? []).length <= 1
                              }
                              onClick={() =>
                                handleRemoveRepeatingRow(groupName, rowIndex)
                              }
                            >
                              Quitar
                            </button>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            {fields.map((field) => {
                              const fieldName = getFieldNameInGroup(field.name);

                              return (
                                <div
                                  className="flex flex-col gap-2"
                                  key={field.id}
                                >
                                  <label
                                    className="text-sm font-medium text-slate-700"
                                    htmlFor={`${groupName}-${rowIndex}-${fieldName}`}
                                  >
                                    {field.label}
                                  </label>
                                  <input
                                    className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    id={`${groupName}-${rowIndex}-${fieldName}`}
                                    type="text"
                                    value={row[fieldName] ?? ""}
                                    onChange={(event) =>
                                      handleRepeatingValueChange(
                                        groupName,
                                        rowIndex,
                                        fieldName,
                                        event.target.value,
                                      )
                                    }
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ),
              )}
            </div>
          ) : (
            <p className="rounded-md bg-white px-3 py-2 text-sm text-slate-600">
              Esta plantilla no tiene campos detectados.
            </p>
          )}

          <div className="flex justify-end border-b border-slate-200 pb-5">
            <button
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              type="button"
              disabled={generating || (selectedTemplate.fields?.length ?? 0) === 0}
              onClick={() => void handleGenerateFromTemplate()}
            >
              {generating ? "Generando..." : "Generar documento"}
            </button>
          </div>

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
