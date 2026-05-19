# Panel Architecture

## Objetivo
Estructura base del panel interno para evolucionar desde POC a entorno productivo sin exponer datos sensibles.

## Capas principales
- `app/panel/*`: vistas del panel (dashboard, reportes, alertas, usuarios, configuracion, health).
- `app/api/*`: endpoints internos (`/api/health`, `/api/panel-auth/*`, etc.).
- `components/panel/*`: UI reutilizable (layout, sidebar, cards, tablas, estados, controles).
- `services/*`: servicios de soporte (auditoria, export stubs, cache stubs, notificaciones stubs).
- `src/lib/panel/*`: helpers transversales (permisos, manejo de errores, estado de sistema).
- `types/*`: contratos de tipos compartidos para modulos nuevos.

## Seguridad
- Login por cookie para panel (`bm_panel_auth`, `bm_panel_role`, `bm_panel_user`).
- Middleware protege rutas privadas y valida permisos por rol.
- Errores para usuario final son seguros y no exponen stack trace.
- Logs de auditoria nunca guardan password, token ni secretos.

## Operacion y soporte
- Endpoint tecnico: `/api/health`.
- Pantalla tecnica: `/panel/health`.
- Modo mantenimiento: controlado por `PANEL_MAINTENANCE_MODE=true`.
- Configuracion critica reportada como "configurada/no configurada" sin mostrar valores.

## Evolucion pendiente
- Reemplazar autenticacion temporal por SSO/LDAP.
- Persistir auditoria en base/log pipeline.
- Implementar exportaciones reales (Excel/PDF/CSV).
- Conectar notificaciones reales (Email/Teams/WhatsApp/API externa/interna).
- Implementar cache distribuido (ej: Redis).
