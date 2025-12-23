# Guía de Optimización de Imágenes

## ⚠️ Imágenes que necesitan optimización

### Imagen crítica (muy pesada):
- **Buenimar.png** - 17MB → Necesita conversión urgente a WebP

### Recomendaciones:

## Opción 1: Usar herramientas online (Más fácil)

1. **Squoosh.app** (Recomendado - Google)
   - Ir a: https://squoosh.app/
   - Arrastrar `Buenimar.png`
   - Configurar:
     - Formato: WebP
     - Calidad: 85-90%
   - Descargar como `Buenimar.webp`

2. **TinyPNG** (Para PNG más pequeñas)
   - Ir a: https://tinypng.com/
   - Subir imágenes PNG de marcas
   - Descargar versiones comprimidas

## Opción 2: Usar herramientas de línea de comandos

### Instalar cwebp (Windows):
```powershell
# Descargar desde: https://developers.google.com/speed/webp/download
# O usar npm:
npm install -g cwebp-bin
```

### Convertir Buenimar.png:
```powershell
cwebp -q 85 public/img/Buenimar.png -o public/img/Buenimar.webp
```

### Convertir todas las marcas:
```powershell
Get-ChildItem public/img/marcas/*.png | ForEach-Object {
    $output = $_.FullName -replace '\.png$', '.webp'
    cwebp -q 85 $_.FullName -o $output
}
```

## Opción 3: Usar sharp (Node.js)

```javascript
// optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Convertir Buenimar.png
sharp('public/img/Buenimar.png')
  .webp({ quality: 85 })
  .toFile('public/img/Buenimar.webp');

// Convertir todas las marcas
const marcasDir = 'public/img/marcas';
fs.readdirSync(marcasDir)
  .filter(file => file.endsWith('.png'))
  .forEach(file => {
    const input = path.join(marcasDir, file);
    const output = path.join(marcasDir, file.replace('.png', '.webp'));
    sharp(input)
      .webp({ quality: 85 })
      .toFile(output);
  });
```

## Después de convertir:

1. Reemplazar en `HeroSlider.tsx`:
```tsx
<img src="/img/Buenimar.webp" alt="Buenimar Distribuciones" />
```

2. Si quieres soporte para navegadores antiguos, usar `<picture>`:
```tsx
<picture>
  <source srcSet="/img/Buenimar.webp" type="image/webp" />
  <img src="/img/Buenimar.png" alt="Buenimar Distribuciones" />
</picture>
```

## Tamaños esperados después de optimización:
- Buenimar.png: 17MB → ~500-800KB (WebP)
- Marcas PNG: 20-50KB → ~15-30KB (WebP)

## ✅ Beneficios:
- ⚡ Carga 10-20x más rápida
- 📱 Mejor experiencia en móviles
- 🎯 Mejor SEO (Page Speed)
- 💾 Menos ancho de banda

## 🔴 Prioridad:
**URGENTE:** Convertir Buenimar.png a WebP (17MB es demasiado para web)
