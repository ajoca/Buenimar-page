"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const panelLinks = [
  { href: "/panel/dashboard", label: "Dashboard" },
  { href: "/panel/reportes", label: "Reportes" },
  { href: "/panel/alertas", label: "Alertas" },
  { href: "/panel/usuarios", label: "Usuarios" },
  { href: "/panel/configuracion", label: "Configuracion" },
];

type SidebarProps = {
  mobileOpen: boolean;
  onNavigate: () => void;
};

export default function Sidebar({ mobileOpen, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-800 bg-black text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="border-b border-slate-800 px-5 py-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Buenimar</p>
        <h2 className="mt-2 text-xl font-bold text-red-500">Panel Privado</h2>
      </div>

      <nav className="space-y-1 p-3">
        {panelLinks.map((link) => {
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
