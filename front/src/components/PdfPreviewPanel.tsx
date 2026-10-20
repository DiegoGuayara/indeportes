type PdfPreviewPanelProps = {
  url: string | null;
  loading: boolean;
  error: string;
};

export function PdfPreviewPanel({ url, loading, error }: PdfPreviewPanelProps) {
  return (
    <section className="flex flex-col gap-3 border-t border-slate-200 pt-5" aria-live="polite">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-900">Vista previa</h3>
          <p className="text-sm text-slate-600">
            Se actualiza automáticamente al cambiar los datos.
          </p>
        </div>
        {loading && <span className="text-sm text-blue-700">Actualizando...</span>}
      </div>

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {url ? (
        <iframe
          className="h-[70vh] min-h-[480px] w-full rounded-md border border-slate-300 bg-white"
          src={url}
          title="Vista previa del documento"
        />
      ) : (
        <div className="flex min-h-48 items-center justify-center rounded-md border border-dashed border-slate-300 bg-white px-4 text-center text-sm text-slate-500">
          {loading ? "Preparando el documento..." : "La vista previa aparecerá aquí."}
        </div>
      )}
    </section>
  );
}
