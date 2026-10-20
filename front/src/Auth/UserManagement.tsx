import { useEffect, useState } from "react";
import {
  createUser,
  getUsers,
  setUserAccess,
  type AuthUser,
  type ManagedUser,
  type UserRole,
} from "../services/authApi";

type UserManagementProps = {
  currentUser: AuthUser;
  onBack: () => void;
};

export function UserManagement({ currentUser, onBack }: UserManagementProps) {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("USER");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    try {
      setUsers(await getUsers());
      setError("");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await createUser({ name, email, password, role });
      setName("");
      setEmail("");
      setPassword("");
      setRole("USER");
      setMessage("La cuenta quedó creada y ya puede iniciar sesión.");
      await loadUsers();
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "No se pudo crear el usuario");
    } finally {
      setSaving(false);
    }
  };

  const handleAccessChange = async (user: ManagedUser) => {
    setError("");
    setMessage("");
    try {
      await setUserAccess(user.id, !user.active);
      setMessage(user.active ? "Se retiró el acceso del usuario." : "Se habilitó el acceso del usuario.");
      await loadUsers();
    } catch (accessError) {
      setError(accessError instanceof Error ? accessError.message : "No se pudo actualizar el acceso");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-3 py-6 text-slate-900 sm:px-4 sm:py-10">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Administrar usuarios</h1>
            <p className="mt-1 text-sm text-slate-600">Crea cuentas y controla quién puede entrar al generador.</p>
          </div>
          <button className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50" type="button" onClick={onBack}>
            Volver al generador
          </button>
        </div>

        <form className="grid gap-4 rounded-md border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2" onSubmit={handleCreate}>
          <h2 className="font-semibold sm:col-span-2">Dar acceso a una persona</h2>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Nombre
            <input className="rounded-md border border-slate-300 bg-white px-3 py-2 font-normal" required value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Correo electrónico
            <input className="rounded-md border border-slate-300 bg-white px-3 py-2 font-normal" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Contraseña inicial (mínimo 12 caracteres)
            <input className="rounded-md border border-slate-300 bg-white px-3 py-2 font-normal" type="password" minLength={12} autoComplete="new-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Rol
            <select className="rounded-md border border-slate-300 bg-white px-3 py-2 font-normal" value={role} onChange={(event) => setRole(event.target.value as UserRole)}>
              <option value="USER">Usuario: usa los formatos</option>
              <option value="ADMIN">Administrador: gestiona accesos</option>
            </select>
          </label>
          <div className="flex justify-end sm:col-span-2">
            <button className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:bg-slate-300 sm:w-auto" disabled={saving} type="submit">
              {saving ? "Creando cuenta..." : "Crear usuario"}
            </button>
          </div>
        </form>

        {error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        {message && <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{message}</p>}

        <div className="flex flex-col gap-3">
          <h2 className="font-semibold">Cuentas registradas</h2>
          {loading ? <p className="text-sm text-slate-600">Cargando usuarios...</p> : users.length === 0 ? (
            <p className="text-sm text-slate-600">Aún no hay cuentas.</p>
          ) : users.map((user) => (
            <article className="flex flex-col gap-3 rounded-md border border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between" key={user.id}>
              <div className="min-w-0">
                <p className="break-words font-medium">{user.name}{user.id === currentUser.id ? " (tú)" : ""}</p>
                <p className="break-all text-sm text-slate-600">{user.email}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {user.role === "ADMIN" ? "Administrador" : "Usuario"} · {user.active ? "Acceso activo" : "Acceso retirado"}
                </p>
              </div>
              <button
                className={`rounded-md border px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 ${user.active ? "border-red-200 text-red-700 hover:bg-red-50" : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"}`}
                type="button"
                disabled={user.id === currentUser.id || (user.role === "ADMIN" && user.active && users.filter((item) => item.role === "ADMIN" && item.active).length <= 1)}
                onClick={() => void handleAccessChange(user)}
              >
                {user.active ? "Retirar acceso" : "Dar acceso"}
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
