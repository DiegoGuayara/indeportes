import { useCallback, useState } from "react";
import { TemplateManager } from "../Templates/TemplateManager";
import { PdfPreviewPanel } from "../components/PdfPreviewPanel";
import { usePdfPreview } from "../hooks/usePdfPreview";
import { analyzeDocument, generateDocument, previewDocument } from "../services/documentApi";

const MAX_DOCUMENTS = 10;

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
    if (!field.includes(".")) return groups;
    const groupName = getFieldGroupName(field);
    groups[groupName] = [...(groups[groupName] ?? []), field];
    return groups;
  }, {});
const buildEmptyGroupRow = (fields: string[]) =>
  fields.reduce<Record<string, string>>((row, field) => {
    row[getFieldNameInGroup(field)] = "";
    return row;
  }, {});

function DocumentItem({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [fields, setFields] = useState<string[]>([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [repeatingValues, setRepeatingValues] = useState<RepeatingValues>({});
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const previewRequest = useCallback(
    (signal: AbortSignal) => previewDocument(file, { ...values, ...repeatingValues }, signal),
    [file, values, repeatingValues],
  );
  const preview = usePdfPreview(analyzed && fields.length > 0 ? previewRequest : null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await analyzeDocument(file);
      setFields(result.fields);
      setAnalyzed(true);
      setValues(Object.fromEntries(getSimpleFields(result.fields).map((field) => [field, ""])));
      setRepeatingValues(
        Object.fromEntries(
          Object.entries(getRepeatingGroups(result.fields)).map(([group, groupFields]) => [
            group,
            [buildEmptyGroupRow(groupFields)],
          ]),
        ),
      );
    } catch {
      setError("No se pudo analizar este documento.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError("");
    try {
      const blob = await generateDocument(file, { ...values, ...repeatingValues });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      const extension = file.name.toLowerCase().endsWith(".xlsx") ? "xlsx" : "docx";
      const safeName = file.name.replace(/\.[^.]+$/, "").replace(/[\\/:*?"<>|]/g, "-");
      link.href = url;
      link.download = `${safeName}-generado.${extension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      setError("No se pudo generar este documento.");
    } finally {
      setGenerating(false);
    }
  };

  const updateRepeatingValue = (group: string, rowIndex: number, field: string, value: string) => {
    setRepeatingValues((current) => ({
      ...current,
      [group]: (current[group] ?? []).map((row, index) =>
        index === rowIndex ? { ...row, [field]: value } : row,
      ),
    }));
  };

  return (
    <article className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="break-all text-sm font-medium text-slate-800">{file.name}</p>
        <div className="flex gap-2">
          {!analyzed && (
            <button className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-300" type="button" onClick={() => void handleAnalyze()} disabled={loading}>
              {loading ? "Analizando..." : "Analizar documento"}
            </button>
          )}
          <button className="rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50" type="button" onClick={onRemove}>
            Quitar
          </button>
        </div>
      </div>

      {error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {analyzed && (
        <div className="flex flex-col gap-4 border-t border-slate-100 pt-4">
          <div>
            <h3 className="font-semibold">{fields.length ? "Campos de este documento" : "Documento listo"}</h3>
            {!fields.length && <p className="mt-1 text-sm text-slate-600">No se encontraron marcadores. Puedes descargar una copia del documento.</p>}
          </div>

          {getSimpleFields(fields).length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {getSimpleFields(fields).map((field) => (
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" key={field}>
                  {formatFieldLabel(field)}
                  <input className="rounded-md border border-slate-300 px-3 py-2 font-normal text-slate-900" type="text" value={values[field] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [field]: event.target.value }))} placeholder={`Escribe ${formatFieldLabel(field).toLowerCase()}`} />
                </label>
              ))}
            </div>
          )}

          {Object.entries(getRepeatingGroups(fields)).map(([group, groupFields]) => (
            <section className="flex flex-col gap-3 rounded-md border border-slate-200 bg-slate-50 p-3" key={group}>
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-semibold capitalize">{group.replaceAll("_", " ")}</h4>
                <button className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white" type="button" onClick={() => setRepeatingValues((current) => ({ ...current, [group]: [...(current[group] ?? []), buildEmptyGroupRow(groupFields)] }))}>Agregar fila</button>
              </div>
              {(repeatingValues[group] ?? []).map((row, rowIndex) => (
                <div className="rounded-md bg-white p-3" key={`${group}-${rowIndex}`}>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-700">Fila {rowIndex + 1}</p>
                    <button
                      className="rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-700 disabled:text-slate-400"
                      type="button"
                      disabled={(repeatingValues[group] ?? []).length <= 1}
                      onClick={() => setRepeatingValues((current) => ({
                        ...current,
                        [group]: (current[group] ?? []).filter((_, index) => index !== rowIndex),
                      }))}
                    >
                      Quitar
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {groupFields.map((field) => {
                      const fieldName = getFieldNameInGroup(field);
                      return <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" key={field}>{formatFieldLabel(field)}<input className="rounded-md border border-slate-300 px-3 py-2 font-normal" type="text" value={row[fieldName] ?? ""} onChange={(event) => updateRepeatingValue(group, rowIndex, fieldName, event.target.value)} /></label>;
                    })}
                  </div>
                </div>
              ))}
            </section>
          ))}

          <div className="flex justify-end border-t border-slate-100 pt-4">
            <button className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:bg-slate-300" type="button" onClick={() => void handleGenerate()} disabled={generating}>{generating ? "Generando..." : "Generar documento"}</button>
          </div>
          {fields.length > 0 && <PdfPreviewPanel {...preview} />}
        </div>
      )}
    </article>
  );
}

export function Uploader({ isAdmin }: { isAdmin: boolean }) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";
    const validFiles = selected.filter((file) => /\.(docx|xlsx)$/i.test(file.name));
    if (validFiles.length !== selected.length) setError("Se omitieron archivos que no son .docx o .xlsx.");
    const remaining = MAX_DOCUMENTS - files.length;
    if (validFiles.length > remaining) setError(`Puedes cargar hasta ${MAX_DOCUMENTS} documentos. Se agregaron ${Math.max(remaining, 0)} archivo(s).`);
    setFiles((current) => [...current, ...validFiles.slice(0, Math.max(remaining, 0))]);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-3 py-6 text-slate-900 sm:px-4 sm:py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 sm:gap-6">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Plantillas Word y Excel</p>
          <h1 className="text-2xl font-bold sm:text-3xl">Generador de documentos</h1>
          <p className="max-w-2xl text-sm text-slate-600">Selecciona hasta {MAX_DOCUMENTS} archivos .docx o .xlsx a la vez. Cada documento tendrá sus propios campos y descarga.</p>
        </header>

        <section className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor="templates">Subir documentos Word o Excel
            <input className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-semibold file:text-blue-700" id="templates" type="file" accept=".docx,.xlsx" multiple onChange={handleFilesChange} disabled={files.length >= MAX_DOCUMENTS} />
          </label>
          <p className="text-xs text-slate-500">{files.length} de {MAX_DOCUMENTS} documentos seleccionados.</p>
          {error && <div className="flex items-center justify-between gap-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800"><span>{error}</span><button type="button" onClick={() => setError("")} aria-label="Cerrar aviso">×</button></div>}
        </section>

        {files.map((file, index) => <DocumentItem key={`${file.name}-${file.size}-${index}`} file={file} onRemove={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} />)}
        <TemplateManager isAdmin={isAdmin} />
      </div>
    </main>
  );
}
