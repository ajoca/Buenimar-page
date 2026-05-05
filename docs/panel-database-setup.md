# Panel privado y capa de datos (ID Retail)

## Objetivo
Esta arquitectura deja preparado el panel privado para conectarse a la fuente de datos de ID Retail cuando se confirme el motor real.

El panel funciona hoy con:
- rutas privadas
- servicios frontend desacoplados
- endpoints API internos con respuestas controladas
- adaptadores de base de datos en modo stub

No se conecta a una base de datos real y no incluye datos de negocio inventados.

## Estructura implementada
### Rutas del panel
- /login
- /panel
- /panel/dashboard
- /panel/reportes
- /panel/alertas
- /panel/usuarios
- /panel/configuracion

### Componentes reutilizables
- components/panel/PanelLayout.tsx
- components/panel/Sidebar.tsx
- components/panel/Topbar.tsx
- components/panel/PageHeader.tsx
- components/panel/MetricCard.tsx
- components/panel/AlertCard.tsx
- components/panel/DataTable.tsx
- components/panel/FilterBar.tsx
- components/panel/DateRangeFilter.tsx
- components/panel/StatusBadge.tsx
- components/panel/EmptyState.tsx
- components/panel/LoadingState.tsx
- components/panel/ErrorState.tsx

### Servicios frontend
- services/dashboardService.ts
- services/alertsService.ts
- services/reportsService.ts
- services/usersService.ts

### API interna
- /api/health
- /api/dashboard/summary
- /api/alerts
- /api/reports
- /api/users

### Capa neutral de base de datos
- src/lib/database/index.ts
- src/lib/database/config.ts
- src/lib/database/types.ts
- src/lib/database/response.ts
- src/lib/database/adapters/sqlserver.ts
- src/lib/database/adapters/postgres.ts
- src/lib/database/adapters/mysql.ts
- src/lib/database/adapters/oracle.ts
- src/lib/database/adapters/mongodb.ts
- src/lib/database/adapters/externalApi.ts

## Como funciona el selector de proveedor
La variable DATA_PROVIDER controla qué adaptador se usa.

Valores soportados:
- sqlserver
- postgres
- mysql
- oracle
- mongodb
- external_api

Si DATA_PROVIDER está vacío o inválido, el backend responde:
- Proveedor de datos no configurado

## Qué falta para conectar ID Retail
Cuando tengan acceso real, completar estos datos:
- motor de base de datos
- host
- puerto
- nombre de base
- usuario de solo lectura
- contraseña del usuario de solo lectura
- si requiere VPN o red privada
- si el acceso es directo a BD o mediante API

## Archivos a modificar cuando se confirme el motor
1. .env (no commitear credenciales)
2. src/lib/database/config.ts (si hay parámetros adicionales)
3. src/lib/database/adapters/<motor>.ts
4. endpoints API que consuman consultas reales
5. servicios frontend para mapear contratos finales

## Buenas prácticas de seguridad
- No exponer credenciales en frontend.
- Toda conexión a datos debe ocurrir solo en backend/API.
- El usuario de base debe ser de solo lectura para el panel analítico.
- Validar variables de entorno antes de conectar.
- No exponer mensajes sensibles al cliente.
- Registrar errores técnicos sin imprimir contraseñas ni tokens.

## Notas de autenticación
El login actual es una base temporal para pruebas de arquitectura.

Pendientes:
- integrar SSO/LDAP/API corporativa
- persistir permisos por rol desde fuente central
- auditoría de acceso y trazabilidad

## Documento operativo adicional
Para el plan detallado de consultas, activación y checklist técnico, revisar:
- docs/panel-id-retail-queries-playbook.md
- docs/panel-day-1-connection-runbook.md
