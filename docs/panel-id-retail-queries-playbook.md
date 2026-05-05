# Panel ID Retail - Playbook de conexion y consultas

## 1) Como ver ahora el panel creado
1. Ejecutar el proyecto en local con npm run dev.
2. Abrir /login.
3. Configurar variables temporales de acceso de panel en .env.local:
- PANEL_AUTH_USERNAME
- PANEL_AUTH_PASSWORD
4. Ingresar y navegar:
- /panel/dashboard
- /panel/reportes
- /panel/alertas
- /panel/usuarios
- /panel/configuracion

Nota: si no estan PANEL_AUTH_USERNAME y PANEL_AUTH_PASSWORD, el login mostrara autenticacion pendiente de configuracion.

## 2) Que pedir cuando te entreguen acceso a ID Retail
Solicitar al proveedor o administrador:
1. Motor de datos: sqlserver, postgres, mysql, oracle, mongodb o API.
2. Host y puerto.
3. Nombre de base (o cluster/db para NoSQL).
4. Usuario de solo lectura para analitica.
5. Password del usuario de solo lectura.
6. Esquema(s) donde estan las tablas.
7. Si requiere VPN, IP allowlist o red privada.
8. Volumen de datos esperado y ventana historica.
9. Si existe API intermedia y su documentacion.
10. Zona horaria oficial de operacion.

## 3) Activacion tecnica en este proyecto
1. Definir DATA_PROVIDER en entorno:
- sqlserver
- postgres
- mysql
- oracle
- mongodb
- external_api
2. Completar variables DATABASE_* o API_BASE_URL segun corresponda.
3. Implementar el adaptador correspondiente en src/lib/database/adapters/<proveedor>.ts.
4. Mapear respuestas reales en:
- /api/dashboard/summary
- /api/alerts
- /api/reports
- /api/users
5. Mantener contratos de salida para no romper frontend.

## 4) Plan de consultas para Dashboard (sin asumir tablas reales)
Objetivo: construir KPIs sin inventar datos, solo desde fuente real.

### 4.1 Mapeo de entidades
Antes de escribir queries, documentar equivalencias:
- ventas
- pedidos
- clientes
- productos
- stock
- cuentas por cobrar
- entregas/logistica

Crear un diccionario tecnico:
- tabla_origen
- columna_origen
- significado
- transformacion

### 4.2 Consultas base sugeridas
Las consultas de abajo son plantillas. Reemplazar placeholders por nombres reales.

#### Ventas del dia
```sql
-- TEMPLATE SQL
SELECT
  CAST(<fecha_venta> AS DATE) AS dia,
  SUM(<importe_total>) AS total_ventas
FROM <schema>.<tabla_ventas>
WHERE CAST(<fecha_venta> AS DATE) = CAST(CURRENT_TIMESTAMP AS DATE)
GROUP BY CAST(<fecha_venta> AS DATE);
```

#### Pedidos pendientes
```sql
SELECT
  COUNT(*) AS pedidos_pendientes
FROM <schema>.<tabla_pedidos>
WHERE <estado_pedido> IN ('pendiente', 'en_preparacion');
```

#### Stock critico
```sql
SELECT
  COUNT(*) AS items_criticos
FROM <schema>.<tabla_stock>
WHERE <stock_actual> <= <stock_minimo>;
```

#### Cobranza vencida
```sql
SELECT
  COUNT(*) AS documentos_vencidos,
  SUM(<saldo_pendiente>) AS saldo_total
FROM <schema>.<tabla_cobranzas>
WHERE <fecha_vencimiento> < CURRENT_DATE
  AND <saldo_pendiente> > 0;
```

#### Entregas demoradas
```sql
SELECT
  COUNT(*) AS entregas_demoradas
FROM <schema>.<tabla_entregas>
WHERE <estado_entrega> NOT IN ('entregado')
  AND <fecha_compromiso> < CURRENT_DATE;
```

## 5) Plan de consultas para Alertas (rojas)
Todas las alertas operativas deben salir visualmente en rojo en el panel cuando entren al estado critico.

### 5.1 Modelo minimo de alerta en backend
Campos sugeridos:
- id
- title
- message
- severity (critical, medium, low)
- createdAt
- source

### 5.2 Reglas de alerta sugeridas
1. Stock critico: stock_actual <= stock_minimo.
2. Pedido demorado: fecha_compromiso vencida sin entrega.
3. Cobranza vencida: saldo > 0 con vencimiento pasado.
4. Integracion caida: sin sincronizacion en ventana definida.
5. Error de proceso: job fallido o inconsistencia de datos.

### 5.3 Query plantilla para alertas criticas
```sql
SELECT
  <id_evento> AS id,
  <titulo_alerta> AS title,
  <detalle_alerta> AS message,
  'critical' AS severity,
  <fecha_evento> AS createdAt,
  <origen_evento> AS source
FROM <vista_o_tabla_alertas>
WHERE <condicion_critica> = 1;
```

## 6) Plan de consultas para Reportes
### 6.1 Reportes recomendados para primera etapa
1. Ventas por periodo y canal.
2. Pedidos por estado.
3. Quiebres y cobertura de stock.
4. Cobranza por antiguedad.
5. Entregas en tiempo vs demoradas.

### 6.2 Recomendacion tecnica
1. Crear vistas SQL para cada reporte (o pipeline en API).
2. Estandarizar filtros de fecha, sucursal y estado.
3. Evitar consultas pesadas en tiempo real sin indices.
4. Agregar paginacion en endpoints grandes.

## 7) Orden recomendado de implementacion
1. Confirmar proveedor y conectividad.
2. Implementar adapter de salud en /api/health.
3. Conectar dashboard summary con 3-5 KPIs iniciales.
4. Conectar alertas criticas en rojo.
5. Conectar reportes con filtros y exportacion.
6. Conectar usuarios/permisos desde fuente central.

## 8) Seguridad y operacion
1. Nunca exponer credenciales en frontend.
2. Mantener credenciales solo en variables de entorno.
3. Usuario de base en modo solo lectura.
4. Sanitizar errores en API; no devolver stack sensible.
5. Implementar logs tecnicos sin password/token.
6. Definir timeout y retry para consultas externas.

## 9) Archivos que vas a tocar cuando llegue el acceso real
1. src/lib/database/config.ts
2. src/lib/database/adapters/<proveedor>.ts
3. app/api/dashboard/summary/route.ts
4. app/api/alerts/route.ts
5. app/api/reports/route.ts
6. app/api/users/route.ts
7. services/dashboardService.ts, services/alertsService.ts, services/reportsService.ts, services/usersService.ts

## 10) Criterios de listo para produccion
1. /api/health responde conectado=true.
2. Dashboard muestra indicadores reales sin datos inventados.
3. Alertas criticas se ven en rojo con severidad correcta.
4. Reportes responden con filtros estables.
5. Manejo de errores sin exposicion sensible.
6. Permisos por rol aplicados en backend.
