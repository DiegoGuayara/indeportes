import { useEffect, useState } from "react";
import { Login } from "./Auth/Login";
import { UserManagement } from "./Auth/UserManagement";
import { Uploader } from "./Uploader/Uploader";
import { getCurrentUser, logout, type AuthUser } from "./services/authApi";

export function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [showUserManagement, setShowUserManagement] = useState(false);

  useEffect(() => {
    let active = true;
    void getCurrentUser()
      .then((currentUser) => {
        if (active) setUser(currentUser);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Se limpia la sesión visible aunque el servidor no responda.
    } finally {
      setUser(null);
      setShowUserManagement(false);
    }
  };

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 text-slate-600">
        Verificando sesión...
      </main>
    );
  }

  if (!user) {
    return <Login onAuthenticated={setUser} />;
  }

  return (
    <>
      <header className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-600">
              {user.role === "ADMIN" ? "Administrador" : "Usuario"} · {user.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.role === "ADMIN" && (
              <button
                className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                type="button"
                onClick={() => setShowUserManagement((showing) => !showing)}
              >
                {showUserManagement ? "Volver al generador" : "Administrar usuarios"}
              </button>
            )}
            <button
              className="rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              type="button"
              onClick={() => void handleLogout()}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      {showUserManagement && user.role === "ADMIN" ? (
        <UserManagement
          currentUser={user}
          onBack={() => setShowUserManagement(false)}
        />
      ) : (
        <Uploader isAdmin={user.role === "ADMIN"} />
      )}
    </>
  );
}
