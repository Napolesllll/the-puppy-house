# 📊 ANÁLISIS COMPLETO DE BRANDING - MASCOTICAS

## Fecha: 1 de Febrero de 2026

## Objetivo: Reemplazar completamente la marca "Mascoticas" sin afectar funcionalidad

---

## 🎯 RESUMEN EJECUTIVO

Se ha identificado **más de 100 referencias** a la marca "Mascoticas Bucaramanga Medellín" distribuidas en:

- ✅ **Configuración de proyecto** (package.json, .env)
- ✅ **Metadatos y SEO** (layout.tsx, schema.org)
- ✅ **Componentes visuales** (Nav, Footer, Logo)
- ✅ **Base de datos** (Cloudinary folders)
- ✅ **Documentación** (README, ADMIN_SETUP, etc)
- ✅ **Assets digitales** (LOGO.png, favicon)

**Buena noticia:** La arquitectura del proyecto está **100% preparada** para soportar un cambio de marca sin afectar la funcionalidad.

---

## 📋 CATEGORIZACIÓN DE CAMBIOS REQUERIDOS

### CATEGORÍA 1: CONFIGURACIÓN Y VARIABLES (Nivel Crítico)

#### 1.1 **package.json** - Identidad del Proyecto

```json
- "name": "mascoticas-medellin" → [NUEVA_MARCA-region]
```

**Archivos afectados:** `package.json`, `package-lock.json`

#### 1.2 **Variables de Entorno - .env**

```
- DATABASE_URL con "mascoticas_med" → [nueva_base_datos]
- Comentario referencial: #DATABASE_URL="postgresql://postgres:Nuizmosca10@localhost:5432/mascoticas_med"
```

**Archivos afectados:** `.env`

#### 1.3 **Configuración Cloudinary - src/lib/cloudinary.ts**

```typescript
- folder: string = 'mascoticas-med' → [NUEVA_MARCA-región]
```

**Archivos afectados:**

- `src/lib/cloudinary.ts`
- `src/app/admin/categories/page.tsx` (línea 58)
- `src/app/admin/breeds/page.tsx` (líneas 157, 198)
- `src/app/admin/promotions/page.tsx` (línea 137)

**Impacto:** Esto afecta la ruta de almacenamiento en Cloudinary, no la funcionalidad.

---

### CATEGORÍA 2: METADATOS Y SEO (Nivel Alto)

#### 2.1 **Layout Principal - src/app/layout.tsx** (Variables)

```typescript
const SITE_URL = "https://mascoticasbucaramangamedellin.com";
```

**Referencias en el archivo:** 45+ menciones indirectas

**Cambios requeridos:**

```typescript
// LÍNEA 10
const SITE_URL = "[NUEVO_DOMINIO]"

// LÍNEA 17 - Título por defecto
"Mascoticas Medellín - Venta de Cachorros..." → [NUEVO_TITULO]

// LÍNEA 18 - Template de título
template: "%s | Mascoticas Medellín" → "%s | [NUEVA_MARCA]"

// LÍNEA 39-40 - Creator y Publisher
creator: "Mascoticas Medellín - Criadero..." → [NUEVA_MARCA]
publisher: "Mascoticas Medellín" → [NUEVA_MARCA]

// LÍNEA 62 - Open Graph siteName
siteName: "Mascoticas Medellín" → [NUEVA_MARCA]

// LÍNEA 64 - Open Graph description
"Mascoticas Medellín - Cachorros..." → [NUEVA_MARCA - Descripción]

// LÍNEA 80-82 - Twitter handles
site: "@MascoticanMedellin" → [@NUEVA_CUENTA]
creator: "@MascoticanMedellin" → [@NUEVA_CUENTA]
title: "Mascoticas Medellín - Cachorros..." → [NUEVA_MARCA - Título]

// LÍNEA 102-105 - Organization Schema
name: "Mascoticas Medellín" → [NUEVA_MARCA]
alternateName: "Mascoticas" → [NUEVO_ALIAS]
logo: `.../logo-mascoticas.png` → `.../logo-[NUEVA_MARCA].png`

// LÍNEA 126 - Email de contacto
email: "info@mascoticastmedellin.com" → [NUEVO_EMAIL]

// LÍNEA 198-199 - Redes sociales (comentadas)
"facebook.com/MascoticanMedellin" → [NUEVA_CUENTA]
"instagram.com/mascoticastmedellin" → [NUEVA_CUENTA]

// LÍNEA 210-212 - Website Schema
name: "Mascoticas Medellín" → [NUEVA_MARCA]
description: "Sitio web oficial de Mascoticas Medellín..." → [NUEVA_DESCRIPCIÓN]

// LÍNEA 303 - Google Analytics
page_title: 'Mascoticas Medellín' → [NUEVA_MARCA]

// LÍNEA 341 - Open Graph
content: "Mascoticas Medellín" → [NUEVA_MARCA]
```

**Archivos afectados:** `src/app/layout.tsx` (384 líneas)

---

#### 2.2 **SEO Local Business - src/components/SEO/LocalBusinessSchema.tsx**

```typescript
// LÍNEA 10
name = "Mascoticas Bucaramanga Medellin" → [NUEVA_MARCA]

// LÍNEA 11
address = "Bello, Bucaramanga, Antioquia, Colombia" → [NUEVA_UBICACIÓN]

// LÍNEA 13
email = "info@mascoticastmedellin.com" → [NUEVO_EMAIL]

// LÍNEA 29
url: "https://mascoticastmedellin.com" → [NUEVO_DOMINIO]

// LÍNEA 35-36
Facebook/Instagram URLs → [NUEVAS_CUENTAS]
```

**Archivos afectados:** `src/components/SEO/LocalBusinessSchema.tsx`

---

#### 2.3 **SEO Páginas de Razas - src/components/SEO/BreedPageSEO.tsx**

```typescript
// LÍNEA 28
title: `${breedName} en Medellín - ... | Mascoticas` → incluir [NUEVA_MARCA]
```

**Archivos afectados:** `src/components/SEO/BreedPageSEO.tsx`

---

### CATEGORÍA 3: COMPONENTES VISUALES Y TEXTOS (Nivel Medio)

#### 3.1 **Navegación - src/components/Nav.tsx**

```tsx
// LÍNEA 107
alt="Logo Mascoticas" → alt="Logo [NUEVA_MARCA]"

// LÍNEA 280
Texto: "Mascoticas" → [NUEVA_MARCA]
```

**Archivos afectados:** `src/components/Nav.tsx` (340 líneas)

---

#### 3.2 **Footer - src/components/Footer.tsx**

```tsx
// LÍNEA 149
<span className="...">MASCOTICAS MEDELLÍN</span> → [NUEVA_MARCA]

// LÍNEA 176
alt="Logo Mascoticas" → alt="Logo [NUEVA_MARCA]"
```

**Archivos afectados:** `src/components/Footer.tsx` (368 líneas)

---

#### 3.3 **Pantalla de Carga - src/components/LoadingScreen.tsx**

```tsx
// LÍNEA 163
alt="Mascoticas" → alt="[NUEVA_MARCA]"

// LÍNEA 186
Texto: "Mascoticas" → [NUEVA_MARCA]
```

**Archivos afectados:** `src/components/LoadingScreen.tsx`

---

#### 3.4 **Home Hero - src/components/HomeHero.tsx**

```tsx
// LÍNEA 117
aria-label="Bienvenida a Mascoticas" → [NUEVO_ARIA_LABEL]

// LÍNEA 201
Texto: "Mascoticas" → [NUEVA_MARCA]

// LÍNEA 232
alt="Mascoticas - Especialistas..." → alt="[NUEVA_MARCA] - ..."
```

**Archivos afectados:** `src/components/HomeHero.tsx`

---

#### 3.5 **Sección Sobre Nosotros - src/components/SobreNosotros.tsx**

```tsx
// LÍNEA 81
"En Mascoticas nos apasiona..." → "En [NUEVA_MARCA] nos apasiona..."
```

**Archivos afectados:** `src/components/SobreNosotros.tsx`

---

#### 3.6 **Imágenes Optimizadas - src/components/OptimizedImage.tsx**

```tsx
// LÍNEA 42-43
`${breedName} - ${alt} - Mascoticas Medellín criadero...`
→ `${breedName} - ${alt} - [NUEVA_MARCA] ...`
```

**Archivos afectados:** `src/components/OptimizedImage.tsx`

---

#### 3.7 **Admin Panel - src/app/admin/page.tsx**

```tsx
// LÍNEA 49
<h1>Mascoticas Admin</h1> → <h1>[NUEVA_MARCA] Admin</h1>
```

**Archivos afectados:** `src/app/admin/page.tsx`

---

### CATEGORÍA 4: ASSETS DIGITALES (Logo, Favicon) (Nivel Crítico)

#### 4.1 **Logo Principal**

```
📁 public/LOGO.png → DEBE SER REEMPLAZADO CON NUEVO LOGO
```

**Dimensiones recomendadas:** 150-200px width (usado en Nav)

**Referencias en código:**

- `src/components/Nav.tsx` - Línea 107
- `src/components/Footer.tsx` - Línea 176
- `src/components/LoadingScreen.tsx` - Línea 162

#### 4.2 **Favicon**

```
📁 public/favicon.ico → Reemplazar
📁 public/site.webmanifest → Actualizar nombres/descripción
```

**Referencias:**

- `src/app/layout.tsx` - Línea 255

---

### CATEGORÍA 5: BASE DE DATOS Y ESTRUCTURA (Nivel Bajo)

#### 5.1 **Nombre de Base de Datos**

```sql
CREATE DATABASE mascoticas_med;
→ CREATE DATABASE [nueva_base_datos];
```

**Donde aparece:**

- `.env` - DATABASE_URL
- `prisma/schema.prisma` - Configuración
- Documentación (README_ADMIN.md, ADMIN_SETUP.md, INDEX.md)

**⚠️ NOTA IMPORTANTE:** Este cambio requiere:

1. Crear nueva base de datos
2. Correr migrations en la nueva BD
3. Backup de datos actuales (si aplica)

---

### CATEGORÍA 6: DOCUMENTACIÓN (Nivel Bajo)

#### 6.1 **Archivos de Documentación**

Los siguientes archivos son **solo informativos** y no afectan funcionalidad:

- `README.md` - Cambiar título y descripción
- `README_ADMIN.md` - Actualizar instrucciones con nueva BD
- `ADMIN_SETUP.md` - Actualizar nombre de BD
- `INDEX.md` - Cambiar título y referencias
- `TECHNICAL_DOCS.md` - Cambiar referencias genéricas
- Otros archivos .md de documentación

**Ejemplo de cambio:**

```markdown
# ÍNDICE COMPLETO - Panel Admin Mascoticas

↓

# ÍNDICE COMPLETO - Panel Admin [NUEVA_MARCA]
```

---

## 🔧 PLAN DE IMPLEMENTACIÓN RECOMENDADO

### FASE 1: PREPARACIÓN (Sin cambios en vivo)

1. **Backup completo** del proyecto actual
2. **Preparar nuevos assets:**
   - Logo PNG (150-200px width)
   - Favicon.ico
   - Favicon.svg (si aplica)
3. **Definir nueva información:**
   - Nombre de marca
   - Dominio nuevo (URL)
   - Email de contacto
   - Redes sociales (handles)
   - Ubicación/dirección
   - Descripción de negocio

### FASE 2: CAMBIOS EN CÓDIGO (1-2 horas)

1. Reemplazar variables de configuración
2. Actualizar componentes visuales
3. Modificar metadatos SEO
4. Cambiar referencias en Cloudinary

### FASE 3: BASE DE DATOS (30 min - si es necesario)

1. Crear nueva BD
2. Ejecutar migrations
3. Migrar datos (si aplica)

### FASE 4: ASSETS (15 min)

1. Reemplazar LOGO.png
2. Reemplazar favicon.ico
3. Actualizar site.webmanifest

### FASE 5: TESTING (1-2 horas)

1. Verificar que todas las páginas carguen correctamente
2. Validar SEO schema en Google's Structured Data Test
3. Revisar redes sociales en Open Graph Debugger
4. Probar admin panel completo

### FASE 6: DOCUMENTACIÓN (1 hora)

1. Actualizar archivos .md
2. Actualizar comentarios en código si hay referencias genéricas

---

## 🗺️ MAPA DE CAMBIOS POR ARCHIVO

```
CRÍTICOS (Funcionalidad + Estética):
├── src/app/layout.tsx ...................... 45+ cambios
├── src/lib/cloudinary.ts .................. 1 cambio
├── package.json ........................... 1 cambio
└── public/LOGO.png ....................... REEMPLAZAR

ALTOS (Estética/SEO):
├── src/components/SEO/LocalBusinessSchema.tsx .. 6 cambios
├── src/components/Nav.tsx ................. 2 cambios
├── src/components/Footer.tsx ............. 2 cambios
├── src/components/LoadingScreen.tsx ...... 2 cambios
├── src/components/HomeHero.tsx ........... 3 cambios
├── src/components/SobreNosotros.tsx ...... 1 cambio
├── src/components/OptimizedImage.tsx ..... 2 cambios
└── src/app/admin/page.tsx ................ 1 cambio

MEDIOS (Administrativos):
├── src/app/admin/categories/page.tsx ..... 1 cambio (Cloudinary)
├── src/app/admin/breeds/page.tsx ......... 2 cambios (Cloudinary)
└── src/app/admin/promotions/page.tsx ..... 1 cambio (Cloudinary)

BAJOS (Documentación/Informativos):
├── .env ................................... 1 comentario
├── README.md ............................. Multiple
├── ADMIN_SETUP.md ........................ Multiple
├── INDEX.md .............................. Multiple
└── Otros archivos .md .................... Multiple
```

---

## ⚙️ DEPENDENCIAS Y CONSIDERACIONES

### ✅ LO QUE SÍ NECESITA CAMBIAR:

1. **URL del sitio** - Para SEO y Open Graph correcto
2. **Logo y favicon** - Identidad visual
3. **Email de contacto** - Comunicaciones correctas
4. **Redes sociales** - URLs actualizadas
5. **Nombre en BD** - Si se requiere
6. **Carpetas Cloudinary** - Para organización de archivos

### ✅ LO QUE NO AFECTA FUNCIONALIDAD:

1. Cambiar el nombre visual de "Mascoticas" en textos
2. Cambiar nombres en metadatos
3. Cambiar descripciones genéricas
4. Actualizar documentación

### ⚠️ PRECAUCIONES:

1. **NO cambiar nombres de variables/funciones** (ej: "breeds", "categories")
2. **NO cambiar rutas API** innecesariamente
3. **NO cambiar estructura de BD** (solo nombre)
4. **HACER BACKUP** antes de cambios en BD

---

## 📊 ESTADÍSTICAS DE CAMBIOS

| Categoría     | Archivos | Cambios  | Complejidad    |
| ------------- | -------- | -------- | -------------- |
| Configuración | 3        | 5        | Baja           |
| Metadatos/SEO | 3        | 15       | Media          |
| Componentes   | 8        | 20       | Baja           |
| Assets        | 2        | 2        | Baja           |
| DB/Infra      | 1        | 1        | Media          |
| Documentación | 6+       | 50+      | Baja           |
| **TOTAL**     | **20+**  | **~90+** | **Baja-Media** |

---

## 🎯 CHECKLIST DE IMPLEMENTACIÓN

- [ ] Backup completo del proyecto
- [ ] Nuevos assets listos (Logo, Favicon)
- [ ] Nueva información de marca definida
- [ ] Actualizar package.json
- [ ] Actualizar .env (si necesario)
- [ ] Actualizar src/app/layout.tsx (variablespales)
- [ ] Actualizar src/lib/cloudinary.ts
- [ ] Actualizar componentes SEO
- [ ] Actualizar componentes visuales
- [ ] Reemplazar assets en /public
- [ ] Crear nueva BD (si aplica)
- [ ] Ejecutar migrations en nueva BD
- [ ] Testing completo
- [ ] Actualizar documentación
- [ ] Deploy a producción

---

## 📞 PREGUNTAS PARA DEFINIR ANTES DE EMPEZAR

1. **¿Cuál es el nombre de la nueva marca?**
2. **¿Cuál es el nuevo dominio?** (ej: www.nuevamarca.com)
3. **¿Qué email se usará para contactos?**
4. **¿Cuáles son las nuevas redes sociales?** (Facebook, Instagram)
5. **¿Cuál es la nueva ubicación/dirección?**
6. **¿Se mantiene la misma BD o se crea nueva?**
7. **¿Los logos son nuevos o adaptaciones?**
8. **¿Se cambia el color principal (actualmente rojo)?**

---

## 🎨 NOTA SOBRE DISEÑO

El proyecto usa **rojo como color principal** (#ff0000, red-500, red-600).
Si la nueva marca tiene otros colores, se requerirá:

- Actualizar Tailwind classes
- Cambiar sombras/gradientes
- Actualizar tema general

Esto requeriría **cambios adicionales** en componentes CSS.

---

**Documento generado:** 1 de Febrero de 2026
**Estado:** Análisis Completo - Listo para Implementación
