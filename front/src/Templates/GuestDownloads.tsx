import { useEffect, useMemo, useState } from "react";
import { downloadBlankTemplate, getTemplates, type Template } from "../services/templateApi";

export function GuestDownloads({ onBack }: { onBack: () => void }) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    void getTemplates()
      .then((data) => { if (active) setTemplates(data); })
      .catch(() => { if (active) setError("No se pudieron cargar los formatos."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const normalizedSearch = search.trim().toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const visibleTemplates = useMemo(() => templates.filter((template) =>
    `${template.name} ${template.description ?? ""} ${template.category?.name ?? ""}`
      .toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .includes(normalizedSearch)), [templates, normalizedSearch]);

  const groups = useMemo(() => {
    const result = new Map<string, Template[]>();
    for (const template of visibleTemplates) {
      const category = template.category?.name ?? "Sin categoría";
      result.set(category, [...(result.get(category) ?? []), template]);
    }
    return [...result.entries()];
  }, [visibleTemplates]);

  const handleDownload = async (template: Template) => {
    setDownloadingId(template.id);
    setError("");
    try {
      const blob = await downloadBlankTemplate(template.id);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${template.name}.${template.fileType ?? "docx"}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError(`No se pudo descargar “${template.name}”.`);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Indeportes Quindío</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Descargar formatos</h1>
            <p className="mt-2 text-sm text-slate-600">Descarga el formato en blanco y diligéncialo en Word o Excel.</p>
          </div>
          <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" type="button" onClick={onBack}>Iniciar sesión</button>
        </header>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Buscar formatos
          <input className="rounded-md border border-slate-300 bg-white px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nombre o categoría..." />
        </label>

        {error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        {loading ? <p className="text-sm text-slate-600">Cargando formatos...</p> : groups.length === 0 ? (
          <p className="rounded-lg bg-white p-5 text-sm text-slate-600">No hay formatos disponibles.</p>
        ) : groups.map(([category, items]) => (
          <section className="flex flex-col gap-3" key={category}>
            <h2 className="border-b border-slate-300 pb-2 text-sm font-semibold uppercase tracking-wide text-slate-600">{category} <span className="font-normal">({items.length})</span></h2>
            {items.map((template) => (
              <article className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between" key={template.id}>
                <div>
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">Formato {(template.fileType ?? "docx").toUpperCase()}</p>
                  {template.description && <p className="mt-1 text-sm text-slate-500">{template.description}</p>}
                </div>
                <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60" type="button" disabled={downloadingId !== null} onClick={() => void handleDownload(template)}>
                  {downloadingId === template.id ? "Descargando..." : "Descargar formato"}
                </button>
              </article>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
