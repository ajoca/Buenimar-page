import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { PANEL_ROLE_COOKIE } from "@/lib/panelAuth";
import { canAccess } from "@/src/lib/panel/permissions";
import type { UserRole } from "@/src/lib/panel/types";

export default async function PanelIndexPage() {
  const cookieStore = await cookies();
  const role = (cookieStore.get(PANEL_ROLE_COOKIE)?.value || "ventas") as UserRole;

  if (canAccess(role, "view_dashboard")) {
    redirect("/panel/dashboard");
  }

  if (canAccess(role, "view_reports")) {
    redirect("/panel/reportes");
  }

  if (canAccess(role, "view_alerts")) {
    redirect("/panel/alertas");
  }

  redirect("/login");
}
