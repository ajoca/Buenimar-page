# Runbook operativo - Dia 1 de conexion ID Retail

## Objetivo
Ejecutar la primera conexion real del panel privado con la fuente de datos de ID Retail de forma controlada, segura y auditable.

Este procedimiento evita cambios improvisados y permite que cualquier integrante del equipo pueda ejecutar la integracion.

## Alcance
Incluye:
- validacion de acceso tecnico
- configuracion del provider
- prueba de salud
- activacion progresiva de endpoints
- validacion visual de dashboard y alertas (rojas)
- rollback seguro

No incluye:
- alta de infraestructura nueva
- tuning de performance avanzado
- cambios en web publica

## Prerrequisitos (antes del Dia 1)
1. Acceso al repositorio y rama main.
2. Acceso a Vercel del proyecto.
3. Datos tecnicos de conexion confirmados.
4. Usuario de base con permisos de solo lectura.
5. Ventana de trabajo coordinada con negocio.

## Datos que deben estar confirmados
- motor: sqlserver, postgres, mysql, oracle, mongodb o external_api
- host
- puerto
- nombre de base
- usuario
- password
- SSL si/no
- VPN o red privada requerida
- zona horaria oficial

## Checklist minuto a minuto

### Min 0-5: Inicio y seguridad
1. Confirmar ventana de trabajo y responsable tecnico.
2. Confirmar que no hay deploys paralelos.
3. Confirmar que credenciales no se comparten por chat publico.
4. Crear canal de seguimiento (ticket o documento de bitacora).

### Min 5-10: Validar estado inicial
1. Ejecutar proyecto local:
```bash
npm run dev
```
2. Verificar que el panel abre en:
- /login
- /panel/dashboard
- /panel/alertas
3. Verificar que /api/health responde pendiente de configuracion.

### Min 10-15: Configurar variables
Configurar en entorno local (y luego en Vercel):
```env
DATA_PROVIDER=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_SSL=
API_BASE_URL=
AUTH_SECRET=
```

Reglas:
1. No commitear credenciales.
2. No imprimir password en logs.
3. Guardar evidencia de quien cargo variables y cuando.

### Min 15-25: Implementar adaptador real
1. Editar archivo del adaptador correspondiente:
- src/lib/database/adapters/sqlserver.ts
- src/lib/database/adapters/postgres.ts
- src/lib/database/adapters/mysql.ts
- src/lib/database/adapters/oracle.ts
- src/lib/database/adapters/mongodb.ts
- src/lib/database/adapters/externalApi.ts

2. Completar metodos:
- getHealth
- getDashboardSummary
- getAlerts
- getReports
- getUsers

3. Mantener contrato de salida existente (ApiResponse<T>).

### Min 25-35: Probar salud y conectividad
1. Ejecutar:
```bash
npm run build
```
2. Probar endpoint:
- /api/health

Resultado esperado:
- success=true (o al menos provider configurado y conectado)
- sin exponer datos sensibles

Si falla:
1. Revisar red/VPN.
2. Revisar puerto y SSL.
3. Revisar permisos del usuario.
4. Revisar firewall/IP allowlist.

### Min 35-50: Activar dashboard con consultas base
Implementar consultas reales en /api/dashboard/summary para indicadores iniciales.

Prioridad minima (fase 1):
1. Ventas del dia.
2. Pedidos pendientes.
3. Stock critico.
4. Cobranza vencida.

Reglas:
1. No inventar datos.
2. Si una consulta falla, devolver estado controlado, no romper toda la respuesta.
3. Registrar error tecnico interno sin exponer SQL al cliente.

### Min 50-65: Activar alertas en rojo
1. Implementar /api/alerts con severidad:
- critical
- medium
- low

2. Para critical:
- deben verse en rojo en UI.
- deben incluir mensaje operativo accionable.

3. Validar visualmente /panel/alertas:
- tarjetas criticas destacadas en rojo
- filtros de severidad y fecha funcionales

### Min 65-75: Activar reportes base
1. Implementar /api/reports con lista real de configuraciones/reportes disponibles.
2. No habilitar exportacion final si no esta validada.
3. Mantener boton de exportacion con comportamiento controlado.

### Min 75-85: Validacion funcional integral
Validar en panel:
1. /panel/dashboard carga datos reales.
2. /panel/alertas muestra criticidad correcta.
3. /panel/reportes responde sin errores.
4. /panel/usuarios sigue estable aunque no tenga ABM real.

Validar en API:
1. /api/health
2. /api/dashboard/summary
3. /api/alerts
4. /api/reports
5. /api/users

### Min 85-95: Seguridad y observabilidad
1. Revisar logs para asegurar que no haya credenciales expuestas.
2. Confirmar uso de usuario read-only.
3. Confirmar manejo de errores sanitizado.
4. Confirmar timeouts y retries razonables.

### Min 95-105: Deploy a entorno objetivo
1. Commit sin secretos.
2. Push a rama definida.
3. Deploy en Vercel.
4. Cargar variables en Vercel (Settings > Environment Variables).
5. Re-deploy.

### Min 105-120: Cierre y handover
1. Documentar resultado final.
2. Registrar pendientes tecnicos.
3. Registrar consultas implementadas y fuentes utilizadas.
4. Definir siguiente iteracion (performance, nuevos KPIs, alertas adicionales).

## Criterios de exito
1. /api/health operativo con provider correcto.
2. Dashboard con datos reales sin datos inventados.
3. Alertas criticas visibles en rojo y con mensaje claro.
4. Sin secretos en repositorio o logs.
5. Web publica sin regresiones.

## Plan de rollback
Si la conexion real falla o degrada el panel:
1. Revertir commit del adaptador real.
2. Volver a modo pending response.
3. Re-deploy inmediato.
4. Mantener panel operativo en modo placeholder.
5. Abrir incidente tecnico con evidencia de error.

## Evidencia minima a guardar
1. Captura de /api/health (sin secretos).
2. Captura de /panel/dashboard.
3. Captura de /panel/alertas con criticidad roja.
4. Hash del commit desplegado.
5. Registro horario de inicio/fin.

## Referencias relacionadas
- docs/panel-database-setup.md
- docs/panel-id-retail-queries-playbook.md
