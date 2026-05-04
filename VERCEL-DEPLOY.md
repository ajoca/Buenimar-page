# 🚀 Guía de Deploy en Vercel - Buenimar

## ✅ Estado Actual

El proyecto está **100% listo para Vercel** con:
- ✅ Almacenamiento en la nube con **Vercel Blob Storage** (sin dependencias locales)
- ✅ 5 carpetas privadas configuradas (Conaprole, Schneck, La Especialista, Pagnifique, Almena)
- ✅ Credenciales de acceso definidas
- ✅ Build compilado exitosamente (19 páginas estáticas + 6 rutas dinámicas)
- ✅ Middleware de autenticación funcional
- ✅ `.env` excluido de GitHub (seguro vía variables de Vercel)

---

## 📋 Paso 1: Preparar el Repositorio GitHub

### 1.1 Crear el repo (si no existe)
```bash
# En tu carpeta del proyecto
git init
git add .
git commit -m "Initial commit: Buenimar con Vercel Blob Storage"
git branch -M main
git remote add origin https://github.com/tu-usuario/buenimar-multi.git
git push -u origin main
```

**Verifica que estos archivos estén en GitHub:**
- ✅ `vercel.json` (configuración)
- ✅ `.env.example` (referencia, SIN valores secretos)
- ✅ `.gitignore` (incluye `.env*` para proteger secretos)

### 1.2 Estructura correcta de .gitignore
```
.env.local          # ← Protege contraseñas locales
.env.local.*        # ← Protege todas las variantes locales
.env                # ← Por seguridad
```

---

## 🔐 Paso 2: Configurar en Vercel Dashboard

### 2.1 Conectar Proyecto
1. Ir a [https://vercel.com/new](https://vercel.com/new)
2. Importar repo de GitHub
3. Seleccionar `buenimar-multi`
4. Click en "Import"

### 2.2 Configurar Variables de Entorno
En "Environment Variables", añadir **exactamente estos 3 valores**:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `PRIVATE_PRICES_USERNAME` | `distribuidores` | Usuario para login privado |
| `PRIVATE_PRICES_PASSWORD` | `Buenimar2026!` | Contraseña para login privado |
| `PRIVATE_PRICES_SESSION_SECRET` | `bm-session-key-2026-confidencial` | Token de sesión (secreto) |

⚠️ **IMPORTANTE**: Vercel genera automáticamente `BLOB_READ_WRITE_TOKEN` al crear Blob Storage. No la añadas manualmente.

### 2.3 Habilitar Vercel Blob Storage
1. En Vercel Dashboard → Tu Proyecto → "Storage"
2. Click en "Create" → "Blob"
3. Nombra: `buenimar-storage` (o similar)
4. Click "Create"
5. Automáticamente se añade `BLOB_READ_WRITE_TOKEN` a env vars ✅

### 2.4 Hacer Deploy
1. Click en "Deploy"
2. Esperar ~2-3 minutos (compilación + upload)
3. Ver mensaje: "Congratulations! Your project has been successfully deployed"

---

## 🌐 Credenciales de Acceso

### Para los Vendedores:
```
URL: https://tu-dominio.vercel.app/precios/login
Usuario: distribuidores
Contraseña: Buenimar2026!
```

### Cambiar Credenciales Después
Simplemente edita en Vercel Dashboard:
1. Settings → Environment Variables
2. Modifica `PRIVATE_PRICES_USERNAME` o `PRIVATE_PRICES_PASSWORD`
3. Click "Save"
4. Click "Deploy" nuevamente (redeploy)

---

## 📦 ¿Qué Incluye este Deploy?

### Sección Privada (/precios)
- **Dashboard**: Muestra 5 carpetas disponibles
- **Conaprole**: Ver, descargar y subir PDFs
- **Schneck**: Ver, descargar y subir PDFs
- **La Especialista**: Ver, descargar y subir PDFs
- **Pagnifique**: Ver, descargar y subir PDFs
- **Almena**: Ver, descargar y subir PDFs

### Almacenamiento
Todos los archivos se guardan en **Vercel Blob Storage** (no en el servidor).
- ✅ Persistente entre deploys
- ✅ Escalable automáticamente
- ✅ Included en Vercel (sin costo adicional)

### Seguridad
- 🔐 Solo accesible con login/contraseña
- 🔐 Archivos guardados como "private" (no listables públicamente)
- 🔐 Sesión de 24 horas
- 🔐 Logout disponible

---

## 🧪 Testeo Local Antes de Deploy

### Crear .env.local (local only, NO lo commits)
```bash
# .env.local
PRIVATE_PRICES_USERNAME=distribuidores
PRIVATE_PRICES_PASSWORD=Buenimar2026!
PRIVATE_PRICES_SESSION_SECRET=bm-session-key-2026-confidencial
```

### Correr en desarrollo
```bash
npm run dev
# Ir a http://localhost:3000/precios/login
# Login con: distribuidores / Buenimar2026!
```

### Probar Upload de PDF
1. Login correctamente
2. Seleccionar carbeta (ej: Conaprole)
3. Subir un PDF de prueba
4. Debe aparecer en la lista

---

## 🔧 Troubleshooting

### ❌ Error: "BLOB_READ_WRITE_TOKEN not found"
**Solución**: Verificar que Blob Storage esté creado en Vercel Dashboard → Storage

### ❌ Error: "Invalid login"
**Solución**: Verificar las variables de entorno en Vercel Dashboard (sin espacios, values exactos)

### ❌ Los PDFs desaparecen después de deploy
**Solución**: Ya no ocurre - ahora usas Vercel Blob Storage (antes usaba /public que no persiste)

### ❌ Build falla en Vercel
**Solución**: Ejecutar `npm run build` a nivel local. Si compila localmente, compilará en Vercel.

---

## 📄 Archivos Importantes para Deploy

```
📦 Buenimar-multi/
├── vercel.json ✅ (configuración del deploy)
├── .env.example ✅ (referencia de variables, sin secretos)
├── .gitignore ✅ (excluye .env.local y secretos)
├── lib/
│   ├── privateCatalogs.ts ✅ (usa @vercel/blob)
│   └── privateAuth.ts ✅ (credenciales)
├── app/
│   ├── precios/ ✅ (área privada)
│   └── api/private-*/ ✅ (rutas de autenticación)
└── middleware.ts ✅ (protección de rutas)
```

---

## 🎯 Próximos Pasos Opcionales

1. **Agregar Más Carpetas**: Editar `PRIVATE_CATALOG_FOLDERS` en `lib/privateCatalogs.ts`
2. **Cambiar Credenciales**: Editar en Vercel Dashboard → Environment Variables
3. **Personalizar Logos**: Agregar imágenes a `/public/archivos/img%20catalogos/`
4. **Conectar Dominio Personalizado**: Vercel Dashboard → Settings → Domains

---

## ⚡ Resumen de Cambios

### Instalado
- `@vercel/blob` - Almacenamiento en la nube

### Modificado
- `lib/privateCatalogs.ts` - Ahora usa Blob Storage (no fs local)
- `app/precios/page.tsx` - Token: `export const dynamic = "force-dynamic"`
- `app/precios/[folder]/page.tsx` - Token: `export const dynamic = "force-dynamic"`
- `app/api/private-catalogs/upload/route.ts` - Removed: `export const runtime = "nodejs"`

### Creado
- `vercel.json` - Configuración para Vercel
- `.env.example` - Template de environment variables

---

## 📞 Soporte

Si tienes dudas:
1. Revisar `.env.example` para variable correcta
2. Verificar Vercel Dashboard → Function Logs si hay errores
3. Confirmar que BLOB_READ_WRITE_TOKEN esté en Vercel Settings

🎉 **¡Todo listo! Solo necesitas hacer push a GitHub y conectar en Vercel.**
