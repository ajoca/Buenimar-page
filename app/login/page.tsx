import type { Metadata } from "next";
import Link from "next/link";

import { getPanelRoleOptions } from "@/lib/panelAuth";

export const metadata: Metadata = {
  title: "Login Panel",
  robots: {
    index: false,
    follow: false,
  },
};

function getMessage(error?: string) {
  if (error === "invalid-credentials") {
    return "Usuario o contrasena incorrectos.";
  }

  if (error === "not-configured") {
    return "Autenticacion pendiente de configuracion. Defini PANEL_AUTH_USERNAME y PANEL_AUTH_PASSWORD.";
  }

  return null;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const next = params?.next?.startsWith("/panel") ? params.next : "/panel/dashboard";
  const message = getMessage(params?.error);
  const roles = getPanelRoleOptions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
        <div className="grid md:grid-cols-2">
          <section className="border-b border-white/10 p-8 md:border-b-0 md:border-r">
            <p className="text-xs uppercase tracking-[0.18em] text-red-300">Buenimar</p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-white">Panel privado de gestion</h1>
            <p className="mt-3 text-sm text-slate-300">
              Arquitectura preparada para conectar ID Retail por base de datos o API, con permisos por rol y rutas protegidas.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-200">
              <li>- Dashboard operativo</li>
              <li>- Reportes exportables</li>
              <li>- Alertas por severidad</li>
              <li>- Gestion de usuarios internos</li>
            </ul>
            <div className="mt-8">
              <Link href="/" className="text-sm font-semibold text-red-300 hover:text-red-200">
                Volver al sitio publico
              </Link>
            </div>
          </section>

          <section className="bg-white p-8 text-slate-900">
            <h2 className="text-2xl font-bold">Ingresar</h2>
            <p className="mt-1 text-sm text-slate-500">Acceso para usuarios internos autorizados.</p>

            {message ? (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{message}</div>
            ) : null}

            <form action="/api/panel-auth/login" method="post" className="mt-6 space-y-4">
              <input type="hidden" name="next" value={next} />

              <label className="block text-sm font-semibold text-slate-700">
                Usuario
                <input
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Contrasena
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Rol operativo
                <select name="role" className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm">
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>

              <button type="submit" className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700">
                Ingresar al panel
              </button>
            </form>

            <p className="mt-4 text-xs text-slate-500">
              TODO: reemplazar autenticacion temporal por SSO/LDAP/API del proveedor.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
