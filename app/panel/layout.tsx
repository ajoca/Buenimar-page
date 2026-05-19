import type { Metadata } from "next";

import MaintenanceNotice from "@/components/panel/MaintenanceNotice";
import PanelLayout from "@/components/panel/PanelLayout";
import { getPanelSystemStatus } from "@/src/lib/panel/systemStatus";

export const metadata: Metadata = {
  title: "Panel Privado",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PanelRootLayout({ children }: { children: React.ReactNode }) {
  const status = getPanelSystemStatus();

  if (status.maintenanceMode) {
    return (
      <MaintenanceNotice
        title="Panel en mantenimiento"
        message="El panel esta temporalmente en mantenimiento mientras se valida la fuente de datos y los servicios internos."
      />
    );
  }

  if (!status.apiConfigured) {
    return (
      <MaintenanceNotice
        title="Panel pendiente de configuracion"
        message="La API/fuente de datos aun no esta configurada. Defini variables de entorno tecnicas antes de habilitar uso operativo."
      />
    );
  }

  return <PanelLayout>{children}</PanelLayout>;
}
