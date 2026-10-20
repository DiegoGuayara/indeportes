import { useEffect, useRef, useState } from "react";

export type PdfPreviewRequest = (signal: AbortSignal) => Promise<Blob>;

export function usePdfPreview(request: PdfPreviewRequest | null) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!request) {
      setUrl(null);
      setLoading(false);
      setError("");
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
      return;
    }

    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const pdf = await request(controller.signal);
        if (!active) return;

        const nextUrl = URL.createObjectURL(pdf);
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = nextUrl;
        setUrl(nextUrl);
      } catch {
        if (active && !controller.signal.aborted) {
          setError("No se pudo actualizar la vista previa. Intenta de nuevo.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }, 650);

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [request]);

  useEffect(
    () => () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  return { url, loading, error };
}
