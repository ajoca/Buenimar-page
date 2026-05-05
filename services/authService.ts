import type { ApiResponse, PanelSession } from "@/src/lib/panel/types";

export async function fetchPanelSession(): Promise<ApiResponse<PanelSession | null>> {
  const response = await fetch("/api/panel-auth/session", {
    cache: "no-store",
    credentials: "include",
  });

  const payload = (await response.json()) as ApiResponse<PanelSession | null>;
  return payload;
}

export async function signOutPanel(): Promise<void> {
  await fetch("/api/panel-auth/logout", {
    method: "POST",
    credentials: "include",
  });
}
