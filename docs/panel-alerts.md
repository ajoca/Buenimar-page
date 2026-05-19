# Panel Alerts

## Alcance actual
Se dejo una estructura preparada para alertas configurables sin activar reglas reales todavia.

## Pantallas
- `/panel/alertas`: vista general de alertas y estado operativo.
- `/panel/alertas/reglas`: configuracion visual de reglas (stub).

## Campos previstos para regla
- Nombre de alerta
- Descripcion
- Consulta asociada
- Umbral
- Severidad
- Frecuencia
- Canal de notificacion
- Activa/Inactiva

## Tipos y contratos
- `types/alerts.ts`: `AlertRuleDraft`, severidad y canales.

## Canales preparados (stubs)
- Email
- Microsoft Teams
- WhatsApp/API externa
- Notificacion interna del panel

Implementados como adaptadores stub en `services/notificationAdapters.ts` con TODO para integraciones reales.

## Auditoria
- Eventos de intentos de login exitosos/fallidos y errores tecnicos quedan listos en `services/auditService.ts`.
- Los logs excluyen datos sensibles (password/token/secret/cookie).

## TODO productivos
- Conectar queries reales y scheduler.
- Persistir reglas y ejecuciones.
- Definir retries y escalamiento por severidad.
- Habilitar dashboards de SLA de alertas.
