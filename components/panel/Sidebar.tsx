"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import type { PanelPermission } from "@/src/lib/panel/permissions";
import { useAuth } from "@/src/contexts/AuthContext";

type PanelLink = {
  href: string;
  label: string;
  permission: PanelPermission;
};

const panelLinks: PanelLink[] = [
  { href: "/panel/dashboard", label: "Dashboard", permission: "view_dashboard" },
  { href: "/panel/clientes", label: "Top 50 Clientes", permission: "view_dashboard" },
  { href: "/panel/analisis", label: "Analisis", permission: "view_dashboard" },
  { href: "/panel/reportes", label: "Reportes", permission: "view_reports" },
  { href: "/panel/alertas", label: "Alertas", permission: "view_alerts" },
  { href: "/panel/alertas/reglas", label: "Reglas de alertas", permission: "configure_alerts" },
  { href: "/panel/usuarios", label: "Usuarios", permission: "manage_users" },
  { href: "/panel/configuracion", label: "Configuracion", permission: "manage_settings" },
  { href: "/panel/health", label: "Health check", permission: "manage_settings" },
];

type SidebarProps = {
  mobileOpen: boolean;
  onNavigate: () => void;
};

export default function Sidebar({ mobileOpen, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { canAccessPermission, session } = useAuth();
  const visibleLinks = useMemo(
    () =>
      panelLinks
        .filter((link) => canAccessPermission(link.permission))
        .map((link) => {
          if (link.href === "/panel/reportes" && session?.role === "deposito") {
            return { ...link, label: "Reportes operativos" };
          }

          if (link.href === "/panel/reportes" && session?.role === "contabilidad") {
            return { ...link, label: "Reportes administrativos" };
          }

          if (link.href === "/panel/reportes" && session?.role === "ventas") {
            return { ...link, label: "Reportes comerciales" };
          }

          return link;
        }),
    [canAccessPermission, session?.role]
  );

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-800 bg-black text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="border-b border-slate-800 px-5 py-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Buenimar</p>
        <h2 className="mt-2 text-xl font-bold text-red-500">Panel POC</h2>
      </div>

      <nav className="space-y-1 p-3">
        {visibleLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-red-600 text-white" : "text-slate-200 hover:bg-slate-900"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
