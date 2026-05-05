import { NextRequest, NextResponse } from "next/server";

import { getPanelSession } from "@/lib/panelAuth";
import type { ApiResponse, PanelSession } from "@/src/lib/panel/types";

export async function GET(request: NextRequest) {
  const session = getPanelSession(request);

  const payload: ApiResponse<PanelSession | null> = {
    success: !!session,
    message: session ? "Sesión activa" : "No autenticado",
    data: session,
    meta: {
      provider: "not_configured",
      pendingConnection: false,
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(payload, { status: session ? 200 : 401 });
}
