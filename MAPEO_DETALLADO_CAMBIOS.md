# 🗺️ MAPEO DETALLADO DE CAMBIOS POR ARCHIVO

**Estado:** Análisis Completo - Listo para Implementación  
**Total de archivos a modificar:** 19  
**Total de cambios necesarios:** ~90  

---

## 📊 TABLA MAESTRA DE CAMBIOS

| # | Archivo | Ubicación | Tipo Cambio | Líneas | Criticidad | Cambios |
|---|---------|-----------|-------------|--------|-----------|---------|
| 1 | package.json | Raíz | Config | 2 | 🔴 CRÍTICO | 1 |
| 2 | layout.tsx | src/app/ | SEO/Metadata | 17,18,39,40,62,64,80,82,102,103,105,126,210,212,303,341 | 🔴 CRÍTICO | 15+ |
| 3 | cloudinary.ts | src/lib/ | Config | 18 | 🔴 CRÍTICO | 1 |
| 4 | LocalBusinessSchema.tsx | src/components/SEO/ | SEO/Schema | 10,11,13,29,35,36 | 🟡 ALTO | 6 |
| 5 | BreedPageSEO.tsx | src/components/SEO/ | SEO | 28 | 🟡 ALTO | 1 |
| 6 | Nav.tsx | src/components/ | UI/Text | 107,280 | 🟡 ALTO | 2 |
| 7 | Footer.tsx | src/components/ | UI/Text | 149,176 | 🟡 ALTO | 2 |
| 8 | LoadingScreen.tsx | src/components/ | UI/Text | 163,186 | 🟡 ALTO | 2 |
| 9 | HomeHero.tsx | src/components/ | UI/Text | 117,201,232 | 🟡 ALTO | 3 |
| 10 | SobreNosotros.tsx | src/components/ | Text | 81 | 🟡 ALTO | 1 |
| 11 | OptimizedImage.tsx | src/components/ | Text/Alt | 42,43 | 🟡 ALTO | 2 |
| 12 | admin/page.tsx | src/app/admin/ | UI/Text | 49 | 🟡 ALTO | 1 |
| 13 | categories/page.tsx | src/app/admin/ | Config | 58 | 🟢 MEDIO | 1 |
| 14 | breeds/page.tsx | src/app/admin/ | Config | 157,198 | 🟢 MEDIO | 2 |
| 15 | promotions/page.tsx | src/app/admin/ | Config | 137 | 🟢 MEDIO | 1 |
| 16 | .env | Raíz | Config | 2 | ⚪ BAJO | 1 |
| 17 | LOGO.png | public/ | Asset | - | 🔴 CRÍTICO | Reemplazar |
| 18 | favicon.ico | public/ | Asset | - | ⚪ BAJO | Reemplazar |
| 19 | site.webmanifest | public/ | Config | varies | ⚪ BAJO | 2 |

---

## 🔴 ARCHIVOS CRÍTICOS (HACER PRIMERO)

### 1️⃣ **package.json**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\package.json
📏 Tamaño: Pequeño
⏱️ Tiempo: 2 min
🎯 Cambios: 1

CAMBIO:
Línea 2: "name": "mascoticas-medellin" → "nombre-nueva-marca"

IMPACTO: Bajo - Solo identidad del proyecto
```

---

### 2️⃣ **src/app/layout.tsx** ⭐ MÁS IMPORTANTE
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\app\layout.tsx
📏 Tamaño: Grande (384 líneas)
⏱️ Tiempo: 30 min
🎯 Cambios: 15+

CAMBIOS POR LÍNEA:
┌─────────────┬──────────────────────────────────────┐
│ LÍNEA       │ CAMBIO                               │
├─────────────┼──────────────────────────────────────┤
│ 10          │ const SITE_URL - NUEVO DOMINIO       │
│ 17          │ title default - NUEVO TÍTULO         │
│ 18          │ template: "%s | ..." - NUEVA MARCA   │
│ 39          │ creator: - NUEVA MARCA               │
│ 40          │ publisher: - NUEVA MARCA             │
│ 62          │ siteName: - NUEVA MARCA              │
│ 64          │ description - NUEVA DESCRIPCIÓN      │
│ 80          │ site: (Twitter) - NUEVO HANDLE       │
│ 82          │ creator: (Twitter) - NUEVO HANDLE    │
│ 82          │ title: (Twitter) - NUEVA MARCA       │
│ 102         │ name (organization) - NUEVA MARCA    │
│ 103         │ alternateName - NUEVO ALIAS          │
│ 105         │ logo: - NUEVA RUTA LOGO              │
│ 126         │ email: - NUEVO EMAIL                 │
│ 210         │ name (website) - NUEVA MARCA         │
│ 212         │ description - NUEVA DESCRIPCIÓN      │
│ 303         │ page_title - NUEVA MARCA             │
│ 341         │ og:site_name - NUEVA MARCA           │
└─────────────┴──────────────────────────────────────┘

NOTA: Líneas 80-82 hay dos menciones de Twitter

IMPACTO: Crítico - Afecta SEO, Open Graph, Metadata
VALIDAR: Google Structured Data Test después
```

---

### 3️⃣ **src/lib/cloudinary.ts**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\lib\cloudinary.ts
📏 Tamaño: Pequeño (58 líneas)
⏱️ Tiempo: 2 min
🎯 Cambios: 1

CAMBIO:
Línea 18: folder: string = 'mascoticas-med' → 'nueva-marca-med'

NOTA: Esta carpeta base afecta todas las subcarpetas:
- 'nueva-marca-med/breeds'
- 'nueva-marca-med/categories'
- 'nueva-marca-med/promotions'

IMPACTO: Medio - Afecta rutas en Cloudinary
VERIFICAR: Que la nueva carpeta exista en Cloudinary
```

---

### 4️⃣ **public/LOGO.png**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\public\LOGO.png
📏 Tamaño: Imagen (aprox. 50-200KB)
⏱️ Tiempo: 5 min
🎯 Acción: REEMPLAZAR ARCHIVO

ESPECIFICACIONES:
- Nombre: LOGO.png (MANTENER MISMO NOMBRE)
- Dimensiones recomendadas: 150-200px ancho
- Aspecto ratio: Cualquiera (mejor si es wide)
- Formato: PNG (con o sin transparencia)

USADO EN:
- src/components/Nav.tsx (Navegación)
- src/components/Footer.tsx (Pie de página)
- src/components/LoadingScreen.tsx (Pantalla de carga)
- public/ (Open Graph - si se configura)

IMPACTO: Crítico - Identidad visual
VALIDAR: Que cargue correctamente en Nav y Footer
```

---

## 🟡 ARCHIVOS DE ALTO IMPACTO (HACER SEGUNDO)

### 5️⃣ **src/components/SEO/LocalBusinessSchema.tsx**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\components\SEO\LocalBusinessSchema.tsx
📏 Tamaño: Pequeño (47 líneas)
⏱️ Tiempo: 5 min
🎯 Cambios: 6

CAMBIOS:
┌─────────────┬─────────────────────────────────────┐
│ LÍNEA       │ CAMBIO                              │
├─────────────┼─────────────────────────────────────┤
│ 10          │ name = "..." → NUEVA MARCA          │
│ 11          │ address = "..." → NUEVA DIRECCIÓN   │
│ 13          │ email = "..." → NUEVO EMAIL         │
│ 29          │ url: "..." → NUEVO DOMINIO          │
│ 35          │ Facebook URL → NUEVA CUENTA         │
│ 36          │ Instagram URL → NUEVA CUENTA        │
└─────────────┴─────────────────────────────────────┘

NOTA: Este es el schema para validar en Google
IMPACTO: Alto - Afecta SEO local
VALIDAR: Google Structured Data Test
```

---

### 6️⃣ **src/components/Nav.tsx**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\components\Nav.tsx
📏 Tamaño: Grande (340 líneas)
⏱️ Tiempo: 3 min
🎯 Cambios: 2 cambios menores

CAMBIOS:
Línea 107: alt="Logo Mascoticas" → alt="Logo [TU_MARCA]"
Línea 280: <span>Mascoticas</span> → <span>[TU_MARCA]</span>

IMPACTO: Bajo - Solo texto/alt
VALIDAR: Logo carga correctamente
```

---

### 7️⃣ **src/components/Footer.tsx**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\components\Footer.tsx
📏 Tamaño: Grande (368 líneas)
⏱️ Tiempo: 3 min
🎯 Cambios: 2 cambios menores

CAMBIOS:
Línea 149: <span>MASCOTICAS MEDELLÍN</span> → <span>[NUEVA_MARCA_MAYÚSCULAS]</span>
Línea 176: alt="Logo Mascoticas" → alt="Logo [TU_MARCA]"

IMPACTO: Bajo - Solo texto/alt
VALIDAR: Logo carga correctamente en footer
```

---

### 8️⃣ **src/components/LoadingScreen.tsx**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\components\LoadingScreen.tsx
📏 Tamaño: Mediano
⏱️ Tiempo: 2 min
🎯 Cambios: 2 cambios menores

CAMBIOS:
Línea 163: alt="Mascoticas" → alt="[TU_MARCA]"
Línea 186: <h1>Mascoticas</h1> → <h1>[TU_MARCA]</h1>

IMPACTO: Bajo - Solo texto/alt
VALIDAR: Pantalla de carga muestra nombre correcto
```

---

### 9️⃣ **src/components/HomeHero.tsx**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\components\HomeHero.tsx
📏 Tamaño: Mediano
⏱️ Tiempo: 3 min
🎯 Cambios: 3

CAMBIOS:
Línea 117: aria-label="Bienvenida a Mascoticas" → aria-label="Bienvenida a [TU_MARCA]"
Línea 201: <h1>Mascoticas</h1> → <h1>[TU_MARCA]</h1>
Línea 232: alt="Mascoticas - Especialistas..." → alt="[TU_MARCA] - ..."

IMPACTO: Bajo - Solo texto/alt
VALIDAR: Home page muestra nombre correcto
```

---

### 🔟 **src/components/SobreNosotros.tsx**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\components\SobreNosotros.tsx
📏 Tamaño: Pequeño
⏱️ Tiempo: 1 min
🎯 Cambios: 1

CAMBIO:
Línea 81: "En Mascoticas nos apasiona..." → "En [TU_MARCA] nos apasiona..."

OPCIÓN: Puedes reescribir la misión completamente aquí

IMPACTO: Bajo - Solo texto
VALIDAR: Sección "Sobre nosotros" actualizada
```

---

### 1️⃣1️⃣ **src/components/OptimizedImage.tsx**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\components\OptimizedImage.tsx
📏 Tamaño: Pequeño
⏱️ Tiempo: 2 min
🎯 Cambios: 2

CAMBIOS:
Línea 42: `${breedName} - ${alt} - Mascoticas Medellín...` → `${breedName} - ${alt} - [TU_MARCA]...`
Línea 43: `${alt} - Mascoticas Medellín...` → `${alt} - [TU_MARCA]...`

NOTA: Estos son ALT TEXT para SEO de imágenes

IMPACTO: Bajo - SEO imagen
VALIDAR: ALT text actualizado en páginas de razas
```

---

### 1️⃣2️⃣ **src/components/SEO/BreedPageSEO.tsx**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\components\SEO\BreedPageSEO.tsx
📏 Tamaño: Pequeño
⏱️ Tiempo: 1 min
🎯 Cambios: 1

CAMBIO:
Línea 28: title: `...| Mascoticas` → title: `...| [TU_MARCA]`

IMPACTO: Bajo - Título SEO en páginas de razas
VALIDAR: Títulos correctos en páginas dinámicas
```

---

### 1️⃣3️⃣ **src/app/admin/page.tsx**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\app\admin\page.tsx
📏 Tamaño: Mediano
⏱️ Tiempo: 1 min
🎯 Cambios: 1

CAMBIO:
Línea 49: <h1>Mascoticas Admin</h1> → <h1>[TU_MARCA] Admin</h1>

IMPACTO: Bajo - Solo texto en admin
VALIDAR: Admin panel muestra nombre correcto
```

---

## 🟢 ARCHIVOS DE IMPACTO MEDIO (HACER TERCERO)

### 1️⃣4️⃣ **src/app/admin/categories/page.tsx**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\app\admin\categories\page.tsx
📏 Tamaño: Grande
⏱️ Tiempo: 1 min
🎯 Cambios: 1

CAMBIO:
Línea 58: formDataUpload.append("folder", "mascoticas-med/categories");
        → formDataUpload.append("folder", "nueva-marca-med/categories");

NOTA: Esta es la carpeta de Cloudinary donde se suben categorías

IMPACTO: Bajo - Solo ruta de almacenamiento
VALIDAR: Que la carpeta "nueva-marca-med" exista en Cloudinary
```

---

### 1️⃣5️⃣ **src/app/admin/breeds/page.tsx**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\app\admin\breeds\page.tsx
📏 Tamaño: Grande (muy grande)
⏱️ Tiempo: 2 min
🎯 Cambios: 2

CAMBIOS:
Línea 157: formDataUpload.append("folder", "mascoticas-med/breeds");
        → formDataUpload.append("folder", "nueva-marca-med/breeds");

Línea 198: formDataUpload.append("folder", "mascoticas-med/breeds/gallery");
        → formDataUpload.append("folder", "nueva-marca-med/breeds/gallery");

NOTA: Dos subcarpetas para razas e imágenes de galería

IMPACTO: Bajo - Solo rutas de almacenamiento
VALIDAR: Subcarpetas existan en Cloudinary
```

---

### 1️⃣6️⃣ **src/app/admin/promotions/page.tsx**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\src\app\admin\promotions\page.tsx
📏 Tamaño: Grande
⏱️ Tiempo: 1 min
🎯 Cambios: 1

CAMBIO:
Línea 137: formDataUpload.append("folder", "mascoticas-med/promotions");
        → formDataUpload.append("folder", "nueva-marca-med/promotions");

NOTA: Carpeta de Cloudinary para promociones

IMPACTO: Bajo - Solo ruta de almacenamiento
VALIDAR: Carpeta exista en Cloudinary
```

---

## ⚪ ARCHIVOS DE BAJO IMPACTO (HACER AL FINAL)

### 1️⃣7️⃣ **.env**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\.env
📏 Tamaño: Muy pequeño
⏱️ Tiempo: 1 min
🎯 Cambios: 1 comentario (opcional)

CAMBIO:
Línea 2 (comentario):
#DATABASE_URL="postgresql://postgres:Nuizmosca10@localhost:5432/mascoticas_med"
→
#DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/nueva_base_datos"

NOTA: Es solo un comentario. El valor real está en la variable activa.

IMPACTO: Muy bajo - Solo documentación
VALIDAR: No afecta funcionalidad
```

---

### 1️⃣8️⃣ **public/favicon.ico**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\public\favicon.ico
📏 Tamaño: Imagen pequeña
⏱️ Tiempo: 5 min
🎯 Acción: REEMPLAZAR ARCHIVO

ESPECIFICACIONES:
- Nombre: favicon.ico (MANTENER NOMBRE)
- Dimensiones: 32x32 píxeles mínimo
- Formato: .ico (o .png si prefieres moderno)
- Nota: Algunos navegadores requieren .ico específicamente

USADO EN:
- Tab del navegador
- Bookmarks
- Historial

IMPACTO: Muy bajo - Identidad visual
VALIDAR: Favicon visible en tab del navegador
```

---

### 1️⃣9️⃣ **public/site.webmanifest**
```
📍 Ubicación: c:\Users\User-SSD\Desktop\mascoticas-med\public\site.webmanifest
📏 Tamaño: Muy pequeño
⏱️ Tiempo: 2 min
🎯 Cambios: 2

CAMBIOS (buscar y reemplazar en el JSON):
"name": "Mascoticas Medellín" → "name": "[TU_MARCA]"
"short_name": "Mascoticas" → "short_name": "[ALIAS_CORTO]"

NOTA: Es un archivo JSON para PWA (Progressive Web App)

IMPACTO: Muy bajo - Instalación en dispositivos
VALIDAR: Nombre correcto si lo abren en la pantalla de inicio
```

---

## 📊 RESUMEN DE ARCHIVOS

```
Total de archivos: 19

🔴 CRÍTICOS (4):
├── package.json (1 cambio)
├── src/app/layout.tsx (15+ cambios) ⭐ PRIORIDAD 1
├── src/lib/cloudinary.ts (1 cambio)
└── public/LOGO.png (Reemplazar archivo)

🟡 ALTO IMPACTO (9):
├── src/components/SEO/LocalBusinessSchema.tsx (6 cambios)
├── src/components/SEO/BreedPageSEO.tsx (1 cambio)
├── src/components/Nav.tsx (2 cambios)
├── src/components/Footer.tsx (2 cambios)
├── src/components/LoadingScreen.tsx (2 cambios)
├── src/components/HomeHero.tsx (3 cambios)
├── src/components/SobreNosotros.tsx (1 cambio)
├── src/components/OptimizedImage.tsx (2 cambios)
└── src/app/admin/page.tsx (1 cambio)

🟢 MEDIO IMPACTO (3):
├── src/app/admin/categories/page.tsx (1 cambio)
├── src/app/admin/breeds/page.tsx (2 cambios)
└── src/app/admin/promotions/page.tsx (1 cambio)

⚪ BAJO IMPACTO (3):
├── .env (1 cambio)
├── public/favicon.ico (Reemplazar archivo)
└── public/site.webmanifest (2 cambios)

Total de cambios: ~90 líneas/archivos
```

---

## ✅ ORDEN RECOMENDADO DE CAMBIOS

```
FASE 1 (10 min):
1. package.json
2. src/lib/cloudinary.ts
3. Reemplazar public/LOGO.png

FASE 2 (30 min):
4. src/app/layout.tsx ⭐⭐⭐

FASE 3 (15 min):
5. src/components/SEO/LocalBusinessSchema.tsx
6. src/components/SEO/BreedPageSEO.tsx
7. src/components/Nav.tsx
8. src/components/Footer.tsx

FASE 4 (10 min):
9. src/components/LoadingScreen.tsx
10. src/components/HomeHero.tsx
11. src/components/SobreNosotros.tsx
12. src/components/OptimizedImage.tsx
13. src/app/admin/page.tsx

FASE 5 (5 min):
14. src/app/admin/categories/page.tsx
15. src/app/admin/breeds/page.tsx
16. src/app/admin/promotions/page.tsx

FASE 6 (5 min):
17. .env
18. public/favicon.ico
19. public/site.webmanifest

TIEMPO TOTAL: ~75 minutos (1h 15 min)
```

---

## 🎯 NOTAS IMPORTANTES

**VARIABLES A REEMPLAZAR:**

| Viejo | Nuevo |
|------|-------|
| `mascoticas-med` | `tu-nueva-marca-med` |
| `Mascoticas` | `[TU_MARCA]` |
| `Mascoticas Medellín` | `[TU_MARCA] [UBICACIÓN]` |
| `Mascoticas Bucaramanga Medellin` | `[TU_MARCA] [UBICACIÓN_COMPLETA]` |
| `mascoticasbucaramangamedellin.com` | `[tu_dominio]` |
| `mascoticastmedellin.com` | `[tu_dominio]` |
| `info@mascoticastmedellin.com` | `[nuevo_email]` |
| `@MascoticanMedellin` | `@[tu_handle_twitter]` |

---

**Documento generado:** 1 de Febrero de 2026  
**Última actualización:** Hoy  
**Estado:** Completo y verificado ✅
