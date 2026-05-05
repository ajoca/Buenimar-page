"use client";

import { useState } from "react";

import Sidebar from "@/components/panel/Sidebar";
import Topbar from "@/components/panel/Topbar";
import { AuthProvider } from "@/src/contexts/AuthContext";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="flex min-h-screen">
          <Sidebar mobileOpen={mobileOpen} onNavigate={() => setMobileOpen(false)} />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar onMenuClick={() => setMobileOpen((prev) => !prev)} />
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>

        {mobileOpen ? (
          <button
            type="button"
            aria-label="Cerrar menu"
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}
      </div>
    </AuthProvider>
  );
}
