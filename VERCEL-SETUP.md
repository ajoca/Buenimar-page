# Configuración de Vercel para Buenimar Colonia

## Redirecciones de dominio (www vs no-www)

Para que Google siempre use `https://www.buenimarcolonia.com` como URL canónica:

### 1. Ir a Vercel Dashboard
- Abrí tu proyecto en Vercel
- Andá a **Settings** → **Domains**

### 2. Configurar dominios
Agregá ambas versiones:
- `www.buenimarcolonia.com` ← **Marcar como Primary Domain**
- `buenimarcolonia.com` ← Se va a redirigir automáticamente

### 3. Vercel automáticamente va a:
- ✅ Redirigir `http://buenimarcolonia.com` → `https://www.buenimarcolonia.com` (301)
- ✅ Redirigir `https://buenimarcolonia.com` → `https://www.buenimarcolonia.com` (301)
- ✅ Redirigir `http://www.buenimarcolonia.com` → `https://www.buenimarcolonia.com` (301)
- ✅ Forzar HTTPS en todas las conexiones

### 4. Verificar redirecciones
Después de configurar, probá en la terminal:

```bash
curl -I http://buenimarcolonia.com
# Debería dar: HTTP/1.1 308 Permanent Redirect
# Location: https://www.buenimarcolonia.com/

curl -I https://buenimarcolonia.com
# Debería dar: HTTP/1.1 308 Permanent Redirect
# Location: https://www.buenimarcolonia.com/

curl -I https://www.buenimarcolonia.com
# Debería dar: HTTP/1.1 200 OK
```

## Variables de entorno SMTP

En **Settings** → **Environment Variables**, agregá:

```
SMTP_HOST=mail.buenimar.com
SMTP_PORT=465
SMTP_USER=pedidos@buenimar.com
SMTP_PASS=Buenimar2025
MAIL_TO=pedidos@buenimar.com
MAIL_FROM=Web Buenimar <no-reply@buenimar.com>
```

Aplicar a: **Production**, **Preview**, **Development**

## Google Search Console

### 1. Verificar propiedad de dominio
- Agregá una **Domain Property**: `buenimarcolonia.com`
- Esto cubre automáticamente www y no-www

### 2. Solicitar indexación
Inspeccioná estas URLs y solicitá indexación:
- `https://www.buenimarcolonia.com/`
- `https://www.buenimarcolonia.com/empresa`
- `https://www.buenimarcolonia.com/marcas`
- `https://www.buenimarcolonia.com/contacto`

### 3. Verificar favicon
```bash
curl -I https://www.buenimarcolonia.com/favicon.ico
# Debe dar: HTTP/1.1 200 OK
```

## Resultado esperado en Google

Después de 3-7 días:
```
🔴 Buenimar Colonia                    ← favicon + site name
Buenimar Colonia
Distribución y logística con confianza. Más de 100 marcas líderes...
https://www.buenimarcolonia.com        ← URL canónica
```

## Troubleshooting

Si después de 7 días Google sigue mostrando "buenimarcolonia.com":
1. Verificar que las redirecciones 301 funcionen
2. Verificar que el WebSite schema esté en el HTML (View Source)
3. Verificar que el favicon cargue sin errores
4. Solicitar re-indexación en Search Console
