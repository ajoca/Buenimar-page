import { NextRequest, NextResponse } from "next/server";

import { getPanelSession } from "@/lib/panelAuth";
import { registerAuditEvent } from "@/services/auditService";
import { logTechnicalError } from "@/src/lib/panel/errorHandling";
import type { ApiResponse, PanelSession } from "@/src/lib/panel/types";

export async function GET(request: NextRequest) {
  try {
    const session = getPanelSession(request);

    registerAuditEvent({
      user: session?.username || "anonymous",
      role: session?.role,
      action: "view_module",
      module: "auth",
      success: !!session,
      message: session ? "Consulta de sesion activa" : "Consulta de sesion sin autenticacion",
      errorCode: session ? undefined : "NO_SESSION",
    });

    const payload: ApiResponse<PanelSession | null> = {
      success: !!session,
      message: session ? "Sesion activa" : "No autenticado",
      data: session,
      meta: {
        provider: "not_configured",
        pendingConnection: false,
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(payload, { status: session ? 200 : 401 });
  } catch (error) {
    logTechnicalError({
      error,
      module: "auth",
      user: "anonymous",
      fallbackCode: "SESSION_ROUTE_ERROR",
    });

    return NextResponse.json(
      {
        success: false,
        message: "No se pudo validar la sesion.",
        data: null,
        errorCode: "SESSION_ERROR",
      } as ApiResponse<PanelSession | null>,
      { status: 500 }
    );
  }
}
