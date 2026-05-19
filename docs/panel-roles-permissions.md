# Panel Roles and Permissions

## Roles
- `admin`
- `gerencia`
- `ventas`
- `deposito`
- `contabilidad`

## Permisos
- `view_dashboard`
- `view_reports`
- `view_alerts`
- `manage_users`
- `manage_settings`
- `export_reports`
- `configure_alerts`

## Matriz inicial
| Rol | Permisos |
| --- | --- |
| admin | view_dashboard, view_reports, view_alerts, manage_users, manage_settings, export_reports, configure_alerts |
| gerencia | view_dashboard, view_reports, view_alerts, export_reports, configure_alerts |
| ventas | view_dashboard, view_reports, export_reports |
| deposito | view_dashboard, view_reports |
| contabilidad | view_reports, export_reports |

## Helper
Se implemento `canAccess(userRole, permission)` en `src/lib/panel/permissions.ts`.

Uso principal:
- Sidebar dinamico: muestra opciones segun permisos del rol.
- Middleware: bloquea acceso directo a rutas sin permiso.

## Comportamiento esperado del menu
- `admin`: ve todo.
- `gerencia`: dashboard, reportes, alertas y configuraciones de alertas.
- `ventas`: dashboard y reportes comerciales.
- `deposito`: dashboard y reportes operativos futuros.
- `contabilidad`: reportes administrativos futuros.

## Proximos pasos
- Separar permisos por modulo y accion (view/create/edit/delete/export).
- Administrar permisos desde UI con persistencia backend.
- Agregar pruebas unitarias para matriz y middleware.
