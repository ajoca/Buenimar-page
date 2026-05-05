"use client";

import { useAuth } from "@/src/contexts/AuthContext";

type TopbarProps = {
  onMenuClick: () => void;
};

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { session } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-700 lg:hidden"
          aria-label="Abrir menu"
        >
          =
        </button>
        <div>
          <p className="text-sm font-semibold text-slate-900">Panel de Operaciones</p>
          <p className="text-xs text-slate-500">Arquitectura preparada para ID Retail</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-slate-800">{session?.username || "Sin sesion"}</p>
          <p className="text-xs uppercase text-slate-500">{session?.role || "rol"}</p>
        </div>
        <form action="/api/panel-auth/logout" method="post">
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Salir
          </button>
        </form>
      </div>
    </header>
  );
}
