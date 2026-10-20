export const API_URL = import.meta.env.VITE_API_URL ?? "/api";

export const apiFetch = (input: RequestInfo | URL, init: RequestInit = {}) =>
  fetch(input, { ...init, credentials: "include" });
