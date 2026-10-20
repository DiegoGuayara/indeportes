import { useEffect, useRef, useState } from "react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from "pdfjs-dist";

type PdfPreviewPanelProps = {
  url: string | null;
  loading: boolean;
  error: string;
};

export function PdfPreviewPanel({ url, loading, error }: PdfPreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [renderError, setRenderError] = useState("");

  useEffect(() => {
    let active = true;
    setPdf(null);
    setPageNumber(1);
    setRenderError("");

    if (!url) return;

    let loadingTask: PDFDocumentLoadingTask | null = null;
    void (async () => {
      try {
        const [pdfjs, worker] = await Promise.all([
          import("pdfjs-dist"),
          import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
        ]);
        if (!active) return;

        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
        loadingTask = pdfjs.getDocument({ url });
        const document = await loadingTask.promise;
        if (active) setPdf(document);
      } catch {
        if (active) setRenderError("No se pudo abrir el PDF de la vista previa.");
      }
    })();

    return () => {
      active = false;
      void loadingTask?.destroy();
    };
  }, [url]);

  useEffect(() => {
    if (!pdf || !containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    let renderTask: RenderTask | null = null;
    let active = true;

    const renderPage = async () => {
      renderTask?.cancel();

      try {
        const page = await pdf.getPage(pageNumber);
        if (!active) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const fitScale = Math.max(0.1, (container.clientWidth - 24) / baseViewport.width);
        const viewport = page.getViewport({ scale: fitScale * zoom });
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const context = canvas.getContext("2d");

        if (!context) throw new Error("No se pudo preparar el visor PDF");

        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        renderTask = page.render({ canvas, canvasContext: context, viewport });
        await renderTask.promise;
        if (active) setRenderError("");
      } catch (renderFailure) {
        if (active && !(renderFailure instanceof Error && renderFailure.name === "RenderingCancelledException")) {
          setRenderError("No se pudo mostrar esta página del PDF.");
        }
      }
    };

    const observer = new ResizeObserver(() => void renderPage());
    observer.observe(container);
    void renderPage();

    return () => {
      active = false;
      observer.disconnect();
      renderTask?.cancel();
    };
  }, [pdf, pageNumber, zoom]);

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
      {renderError && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {renderError}
        </p>
      )}

      {pdf ? (
        <div className="overflow-hidden rounded-md border border-slate-300 bg-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 bg-white p-2">
            <div className="flex items-center gap-2">
              <button
                className="rounded border border-slate-300 px-3 py-2 text-sm disabled:opacity-40"
                type="button"
                onClick={() => setPageNumber((page) => Math.max(1, page - 1))}
                disabled={pageNumber <= 1}
                aria-label="Página anterior"
              >
                Anterior
              </button>
              <span className="text-sm text-slate-700">
                {pageNumber} / {pdf.numPages}
              </span>
              <button
                className="rounded border border-slate-300 px-3 py-2 text-sm disabled:opacity-40"
                type="button"
                onClick={() => setPageNumber((page) => Math.min(pdf.numPages, page + 1))}
                disabled={pageNumber >= pdf.numPages}
                aria-label="Página siguiente"
              >
                Siguiente
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="h-9 w-9 rounded border border-slate-300 text-lg disabled:opacity-40"
                type="button"
                onClick={() => setZoom((current) => Math.max(0.75, current - 0.25))}
                disabled={zoom <= 0.75}
                aria-label="Alejar"
              >
                −
              </button>
              <span className="min-w-12 text-center text-sm text-slate-700">
                {Math.round(zoom * 100)}%
              </span>
              <button
                className="h-9 w-9 rounded border border-slate-300 text-lg disabled:opacity-40"
                type="button"
                onClick={() => setZoom((current) => Math.min(2, current + 0.25))}
                disabled={zoom >= 2}
                aria-label="Acercar"
              >
                +
              </button>
            </div>
          </div>
          <div ref={containerRef} className="max-h-[70vh] min-h-80 overflow-auto p-3">
            <canvas
              ref={canvasRef}
              className="mx-auto block bg-white shadow"
              aria-label={`Página ${pageNumber} de la vista previa`}
            />
          </div>
        </div>
      ) : (
        <div className="flex min-h-48 items-center justify-center rounded-md border border-dashed border-slate-300 bg-white px-4 text-center text-sm text-slate-500">
          {loading ? "Preparando el documento..." : "La vista previa aparecerá aquí."}
        </div>
      )}
    </section>
  );
}
