import DataTable from "@/components/panel/DataTable";
import EmptyState from "@/components/panel/EmptyState";
import PageHeader from "@/components/panel/PageHeader";
import StatusBadge from "@/components/panel/StatusBadge";
import type { PanelUser } from "@/src/lib/panel/types";

const userColumns = [
  {
    key: "displayName",
    label: "Nombre",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
    label: "Rol",
    render: (row: PanelUser) => <StatusBadge label={row.role} severity="low" />,
  },
  {
    key: "status",
    label: "Estado",
  },
];

export default function PanelUsuariosPage() {
  const rows: PanelUser[] = [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usuarios"
        description="Gestion de usuarios internos del panel. Sin backend activo por el momento."
        actions={
          <button
            type="button"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Nuevo usuario
          </button>
        }
      />

      <DataTable columns={userColumns} rows={rows} rowKey={(row) => row.id} />

      <EmptyState
        title="Sin usuarios sincronizados"
        message="Los perfiles se cargaran desde la autenticacion central cuando este disponible."
      />
    </div>
  );
}
