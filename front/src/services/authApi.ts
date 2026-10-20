import { API_URL, apiFetch } from "./api";

export type UserRole = "ADMIN" | "USER";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
};

export type ManagedUser = AuthUser & { createdAt: string };

const readError = async (response: Response, fallback: string) => {
  try {
    const body = (await response.json()) as { message?: string };
    if (body.message) return body.message;
  } catch {
    // La respuesta no contiene JSON.
  }
  return fallback;
};

export async function login(email: string, password: string) {
  const response = await apiFetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error(await readError(response, "No se pudo iniciar sesión"));
  return (await response.json() as { user: AuthUser }).user;
}

export async function getCurrentUser() {
  const response = await apiFetch(`${API_URL}/auth/me`);
  if (!response.ok) throw new Error("No hay una sesión activa");
  return (await response.json() as { user: AuthUser }).user;
}

export async function logout() {
  await apiFetch(`${API_URL}/auth/logout`, { method: "POST" });
}

export async function getUsers() {
  const response = await apiFetch(`${API_URL}/auth/users`);
  if (!response.ok) throw new Error(await readError(response, "No se pudieron cargar los usuarios"));
  return response.json() as Promise<ManagedUser[]>;
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) {
  const response = await apiFetch(`${API_URL}/auth/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(await readError(response, "No se pudo crear el usuario"));
  return (await response.json() as { user: AuthUser }).user;
}

export async function setUserAccess(id: number, active: boolean) {
  const response = await apiFetch(`${API_URL}/auth/users/${id}/access`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ active }),
  });
  if (!response.ok) throw new Error(await readError(response, "No se pudo actualizar el acceso"));
  return (await response.json() as { user: AuthUser }).user;
}
