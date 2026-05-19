"use client";

import { useMemo, useState } from "react";

type RefreshControlsProps = {
  onRefresh: () => Promise<void>;
  initialLastUpdate?: string | null;
};

export default function RefreshControls({ onRefresh, initialLastUpdate = null }: RefreshControlsProps) {
  const [lastUpdate, setLastUpdate] = useState<string | null>(initialLastUpdate);
  const [refreshMs, setRefreshMs] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshLabel = useMemo(() => {
    if (!lastUpdate) {
      return "Sin actualizaciones";
    }

    return new Date(lastUpdate).toLocaleString("es-UY");
  }, [lastUpdate]);

  async function handleRefresh() {
    setIsRefreshing(true);
    setError(null);

    try {
      await onRefresh();
      setLastUpdate(new Date().toISOString());
    } catch {
      setError("No se pudo actualizar la vista. Reintentá en unos segundos.");
    } finally {
      setIsRefreshing(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Refresco de datos</p>
          <p className="mt-1 text-sm text-slate-700">Ultima actualizacion: {refreshLabel}</p>
          <p className="text-xs text-slate-500">
            TODO: activar auto-refresh real con polling cuando la API productiva este disponible.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Auto-refresh
            <select
              className="ml-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
              value={refreshMs}
              onChange={(event) => setRefreshMs(Number(event.target.value))}
            >
              <option value={0}>Desactivado</option>
              <option value={60000}>1 min</option>
              <option value={300000}>5 min</option>
              <option value={900000}>15 min</option>
            </select>
          </label>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isRefreshing ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </div>

      {error ? <p className="mt-3 text-sm font-medium text-red-700">{error}</p> : null}
    </div>
  );
}
