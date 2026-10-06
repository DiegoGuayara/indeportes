import { useState } from "react";

type AnalyzeResponse = {
  fields: string[];
};

const formatFieldLabel = (field: string) =>
  field
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export function Uploader() {
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<string[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".docx")) {
      setError("Solo puedes subir documentos .docx");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
    setFields([]);
    setValues({});
  };

  const handleAnalyzeTemplate = async () => {
    if (!file) {
      setError("Selecciona primero una plantilla word");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("template", file);

      const response = await fetch("http://localhost:10101/documents/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("No se pudo analizar el documento");
      }

      const data: AnalyzeResponse = await response.json();

      if (data.fields.length === 0) {
        setFields([]);
        setValues({});
        setError(
          "No se encontraron campos. Usa marcadores como {{nombre}} o {{numero_identificacion}} sin espacios ni tildes.",
        );
        return;
      }

      setFields(data.fields);

      const initialValues = data.fields.reduce<Record<string, string>>(
        (acc, field) => {
          acc[field] = "";
          return acc;
        },
        {},
      );

      setValues(initialValues);
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

  const handleGenerateDocument = async () => {
    if (!file) {
      setError("Selecciona primero una plantilla word");
      return;
    }

    setGenerating(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("template", file);
      formData.append("values", JSON.stringify(values));

      const response = await fetch("http://localhost:10101/documents/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("No se pudo generar el documento");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "documento-generado.docx";
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
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Plantillas Word
          </p>
          <h1 className="text-3xl font-bold">Generador de documentos</h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Sube una plantilla .docx con campos como {"{{nombre}}"} y completa
            los datos para generar el documento final.
          </p>
        </header>

        <section className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="template"
            >
              Subir plantilla Word
            </label>

            <input
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              id="template"
              type="file"
              accept=".docx"
              onChange={handleFileChange}
            />
          </div>

          {file && (
            <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
              Archivo seleccionado:{" "}
              <span className="font-medium text-slate-900">{file.name}</span>
            </p>
          )}

          <div>
            <button
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
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
          <section className="flex flex-col gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-semibold">Campos encontrados</h2>
              <p className="mt-1 text-sm text-slate-600">
                Completa la información que se reemplazará en la plantilla.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
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

            <div className="flex x border-t border-slate-100 pt-5">
              <button
                className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                type="button"
                onClick={handleGenerateDocument}
                disabled={generating}
              >
                {generating ? "Generando..." : "Generar documento"}
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
