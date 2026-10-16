import { useState } from "react";
import { TemplateManager } from "../Templates/TemplateManager";
import { analyzeDocument, generateDocument } from "../services/documentApi";

const formatFieldLabel = (field: string) =>
  field
    .split(".")
    .at(-1)!
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

type RepeatingValues = Record<string, Array<Record<string, string>>>;

const getFieldGroupName = (field: string) => field.split(".")[0] ?? "";
const getFieldNameInGroup = (field: string) => field.split(".")[1] ?? field;
const getSimpleFields = (fields: string[]) =>
  fields.filter((field) => !field.includes("."));
const getRepeatingGroups = (fields: string[]) =>
  fields.reduce<Record<string, string[]>>((groups, field) => {
    if (!field.includes(".")) {
      return groups;
    }

    const groupName = getFieldGroupName(field);
    groups[groupName] = [...(groups[groupName] ?? []), field];

    return groups;
  }, {});
const buildEmptyGroupRow = (fields: string[]) =>
  fields.reduce<Record<string, string>>((row, field) => {
    row[getFieldNameInGroup(field)] = "";
    return row;
  }, {});

export function Uploader() {
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<string[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [repeatingValues, setRepeatingValues] = useState<RepeatingValues>({});
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!/\.(docx|xlsx)$/i.test(selectedFile.name)) {
      setError("Solo puedes subir documentos .docx o .xlsx");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
    setFields([]);
    setValues({});
    setRepeatingValues({});
  };

  const handleAnalyzeTemplate = async () => {
    if (!file) {
      setError("Selecciona primero una plantilla word");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await analyzeDocument(file);

      if (data.fields.length === 0) {
        setFields([]);
        setValues({});
        setError(
          "No se encontraron campos. Usa marcadores como {{nombre}} o {{numero_identificacion}} sin espacios ni tildes.",
        );
        return;
      }

      setFields(data.fields);
      const simpleFields = getSimpleFields(data.fields);
      const repeatingGroups = getRepeatingGroups(data.fields);

      const initialValues = simpleFields.reduce<Record<string, string>>(
        (acc, field) => {
          acc[field] = "";
          return acc;
        },
        {},
      );

      setValues(initialValues);
      setRepeatingValues(
        Object.entries(repeatingGroups).reduce<RepeatingValues>(
          (acc, [groupName, groupFields]) => {
            acc[groupName] = [buildEmptyGroupRow(groupFields)];
            return acc;
          },
          {},
        ),
      );
    } catch (error) {
      setError("Ocurrió un error enviando el documento");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setValues((currentValues) => ({
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

  const handleAddRepeatingRow = (groupName: string, groupFields: string[]) => {
    setRepeatingValues((currentValues) => ({
      ...currentValues,
      [groupName]: [
        ...(currentValues[groupName] ?? []),
        buildEmptyGroupRow(groupFields),
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

  const handleGenerateDocument = async () => {
    if (!file) {
      setError("Selecciona primero una plantilla word");
      return;
    }

    setGenerating(true);
    setError("");

    try {
      const blob = await generateDocument(file, {
        ...values,
        ...repeatingValues,
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      const extension = file.name.toLowerCase().endsWith(".xlsx")
        ? "xlsx"
        : "docx";
      link.download = `documento-generado.${extension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError("Ocurrió un error generando el documento");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-3 py-6 text-slate-900 sm:px-4 sm:py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 sm:gap-6">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Plantillas Word y Excel
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl">Generador de documentos</h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Sube una plantilla .docx o .xlsx con campos como {"{{nombre}}"} y
            completa los datos para generar el archivo final.
          </p>
        </header>

        <section className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="template"
            >
              Subir plantilla Word o Excel
            </label>

            <input
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              id="template"
              type="file"
              accept=".docx,.xlsx"
              onChange={handleFileChange}
            />
          </div>

          {file && (
              <p className="break-words rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
              Archivo seleccionado:{" "}
              <span className="font-medium text-slate-900">{file.name}</span>
            </p>
          )}

          <div>
            <button
              className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
              type="button"
              onClick={handleAnalyzeTemplate}
              disabled={loading}
            >
              {loading ? "Analizando..." : "Enviar documento"}
            </button>
          </div>

          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
        </section>

        {fields.length > 0 && (
          <section className="flex flex-col gap-5 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div>
              <h2 className="text-xl font-semibold">Campos encontrados</h2>
              <p className="mt-1 text-sm text-slate-600">
                Completa la información que se reemplazará en la plantilla.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {getSimpleFields(fields).length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {getSimpleFields(fields).map((field) => (
                    <div className="flex flex-col gap-2" key={field}>
                      <label
                        className="text-sm font-medium text-slate-700"
                        htmlFor={field}
                      >
                        {formatFieldLabel(field)}
                      </label>

                      <input
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        id={field}
                        type="text"
                        value={values[field] ?? ""}
                        onChange={(event) =>
                          handleInputChange(field, event.target.value)
                        }
                        placeholder={`Escribe ${formatFieldLabel(field).toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {Object.entries(getRepeatingGroups(fields)).map(
                ([groupName, groupFields]) => (
                  <div
                    className="flex flex-col gap-4 rounded-md border border-slate-200 bg-slate-50 p-3 sm:p-4"
                    key={groupName}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold capitalize">
                          {groupName.replaceAll("_", " ")}
                        </h3>
                        <p className="text-sm text-slate-600">
                          Agrega las filas que necesites para esta lista.
                        </p>
                      </div>
                      <button
                        className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                        type="button"
                        onClick={() =>
                          handleAddRepeatingRow(groupName, groupFields)
                        }
                      >
                        Agregar fila
                      </button>
                    </div>

                    {(repeatingValues[groupName] ?? []).map(
                      (row, rowIndex) => (
                        <div
                          className="rounded-md border border-slate-200 bg-white p-3"
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
                            {groupFields.map((field) => {
                              const fieldName = getFieldNameInGroup(field);

                              return (
                                <div
                                  className="flex flex-col gap-2"
                                  key={field}
                                >
                                  <label
                                    className="text-sm font-medium text-slate-700"
                                    htmlFor={`${groupName}-${rowIndex}-${fieldName}`}
                                  >
                                    {formatFieldLabel(field)}
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

            <div className="flex justify-end border-t border-slate-100 pt-5">
              <button
                className="inline-flex w-full items-center justify-center rounded-md bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
                type="button"
                onClick={handleGenerateDocument}
                disabled={generating}
              >
                {generating ? "Generando..." : "Generar documento"}
              </button>
            </div>
          </section>
        )}

        <TemplateManager />
      </div>
    </main>
  );
}
