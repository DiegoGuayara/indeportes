import { useState } from "react";

type AnalyzeResponse = {
  fields: string[];
};

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
    <main>
      <h1>Generador de documentos</h1>

      <section>
        <label htmlFor="template">Subir plantilla Word</label>

        <input
          id="template"
          type="file"
          accept=".docx"
          onChange={handleFileChange}
        />

        {file && <p>Archivo seleccionado: {file.name}</p>}

        <button
          type="button"
          onClick={handleAnalyzeTemplate}
          disabled={loading}
        >
          {loading ? "Analizando..." : "Enviar documento"}
        </button>

        {error && <p>{error}</p>}
      </section>

      {fields.length > 0 && (
        <section>
          <h2>Campos encontrados</h2>

          {fields.map((field) => (
            <div key={field}>
              <label htmlFor={field}>{field}</label>

              <input
                id={field}
                type="text"
                value={values[field] ?? ""}
                onChange={(event) =>
                  handleInputChange(field, event.target.value)
                }
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleGenerateDocument}
            disabled={generating}
          >
            {generating ? "Generando..." : "Listo"}
          </button>
        </section>
      )}
    </main>
  );
}
