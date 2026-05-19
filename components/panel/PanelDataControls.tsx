"use client";

import { useMemo, useState } from "react";

import RefreshControls from "@/components/panel/RefreshControls";
import { requestExportStub, type ExportFormat } from "@/services/exportService";
import { useAuth } from "@/src/contexts/AuthContext";

type PanelDataControlsProps = {
  module: "dashboard" | "reports" | "alerts";
};

export default function PanelDataControls({ module }: PanelDataControlsProps) {
  const { session, canAccessPermission } = useAuth();
  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const canExport = canAccessPermission("export_reports");

  const title = useMemo(() => {
    if (module === "dashboard") return "Datos de dashboard";
    if (module === "reports") return "Datos de reportes";
    return "Datos de alertas";
  }, [module]);

  async function handleExport(format: ExportFormat) {
    const payload = await requestExportStub({
      format,
      module,
      requestedBy: session?.username || "anonymous",
      role: session?.role,
    });

    setExportMessage(payload.message);
  }

  async function handleRefresh() {
    // TODO: reemplazar por refetch real de APIs del panel.
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-600">Exportacion y refresco preparados para integracion productiva.</p>
        </div>

        {canExport ? (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
              onClick={() => handleExport("excel")}
            >
              Exportar Excel
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
              onClick={() => handleExport("pdf")}
            >
              Exportar PDF
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
              onClick={() => handleExport("csv")}
            >
              Descargar CSV
            </button>
          </div>
        ) : (
          <p className="text-xs font-medium text-slate-500">Sin permiso de exportacion para este rol.</p>
        )}
      </div>

      <RefreshControls onRefresh={handleRefresh} />

      {exportMessage ? <p className="text-xs font-medium text-emerald-700">{exportMessage}</p> : null}
    </section>
  );
}
