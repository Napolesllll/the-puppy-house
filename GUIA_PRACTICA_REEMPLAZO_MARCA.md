# 🚀 GUÍA PRÁCTICA DE REEMPLAZO DE MARCA

## Cómo ejecutar los cambios paso a paso

---

## 📋 TABLA DE REEMPLAZOS DIRECTOS

### Plantilla para rellenar (PERSONALIZA ESTOS VALORES)

```javascript
// ========================================
// 🎯 VALORES A REEMPLAZAR
// ========================================

ANTIGUA_MARCA = "Mascoticas";
ANTIGUA_MARCA_COMPLETA = "Mascoticas Medellín";
ANTIGUA_UBICACION = "Bucaramanga, Medellín";
ANTIGUA_MARCA_UBICACION = "Mascoticas Bucaramanga Medellin";
ANTIGUO_EMAIL = "info@mascoticastmedellin.com";
ANTIGUO_DOMINIO = "https://mascoticasbucaramangamedellin.com";
ANTIGUO_DOMINIO_SIMPLE = "https://mascoticastmedellin.com";
ANTIGUA_CARPETA_CLOUDINARY = "mascoticas-med";
ANTIGUO_TWITTER = "@MascoticanMedellin";

// NUEVOS VALORES (COMPLETA ESTOS)
NUEVA_MARCA = "???"; // Ej: "PetVibe", "DogLove"
NUEVA_MARCA_COMPLETA = "???"; // Ej: "PetVibe Medellín"
NUEVA_UBICACION = "???"; // Ej: "Medellín, Colombia"
NUEVA_EMAIL = "???"; // Ej: "info@petvibe.com"
NUEVO_DOMINIO = "???"; // Ej: "https://petvibe.com"
NUEVA_CARPETA_CLOUDINARY = "???"; // Ej: "petvibe-med"
NUEVO_TWITTER = "???"; // Ej: "@PetVibeMed"
NUEVO_FACEBOOK = "???"; // Ej: "petvibemedellin"
NUEVO_INSTAGRAM = "???"; // Ej: "petvibemedellin"
NUEVA_BASE_DATOS = "???"; // Ej: "petvibe_med"
```

---

## 📝 REEMPLAZOS POR ARCHIVO

### 1. ✅ **package.json**

**Ubicación:** Raíz del proyecto

**Cambio:**

```json
// ANTES:
{
  "name": "mascoticas-medellin",
  ...
}

// DESPUÉS:
{
  "name": "nueva-marca-medellin",  // Personaliza aquí
  ...
}
```

---

### 2. ✅ **src/app/layout.tsx** (ARCHIVO CRÍTICO)

**Ubicación:** Línea 10 y referencias en metadatos

**Cambio 1 - Variable URL (LÍNEA 10):**

```typescript
// ANTES:
const SITE_URL = "https://mascoticasbucaramangamedellin.com";

// DESPUÉS:
const SITE_URL = "https://tu-nuevo-dominio.com";
```

**Cambio 2 - Título por defecto (LÍNEA 17):**

```typescript
// ANTES:
"Mascoticas Medellín - Venta de Cachorros de Raza Pura | Criadero Certificado";

// DESPUÉS:
"[TU_MARCA] Medellín - [TU_DESCRIPCIÓN_SERVICIO]";
```

**Cambio 3 - Template título (LÍNEA 18):**

```typescript
// ANTES:
template: "%s | Mascoticas Medellín",

// DESPUÉS:
template: "%s | [TU_MARCA]",
```

**Cambio 4 - Creator/Publisher (LÍNEAS 39-40):**

```typescript
// ANTES:
creator: "Mascoticas Medellín - Criadero Certificado",
publisher: "Mascoticas Medellín",

// DESPUÉS:
creator: "[TU_MARCA] - [TU_DESCRIPCIÓN]",
publisher: "[TU_MARCA]",
```

**Cambio 5 - Open Graph (LÍNEA 62):**

```typescript
// ANTES:
siteName: "Mascoticas Medellín",

// DESPUÉS:
siteName: "[TU_MARCA]",
```

**Cambio 6 - Twitter (LÍNEAS 80-82):**

```typescript
// ANTES:
site: "@MascoticanMedellin",
creator: "@MascoticanMedellin",
title: "Mascoticas Medellín - Cachorros de Raza Pura",

// DESPUÉS:
site: "@[TU_TWITTER_HANDLE]",
creator: "@[TU_TWITTER_HANDLE]",
title: "[TU_MARCA] - [TU_DESCRIPCIÓN]",
```

**Cambio 7 - Organization Schema (LÍNEAS 102-105):**

```typescript
// ANTES:
name: "Mascoticas Medellín",
alternateName: "Mascoticas",
logo: `${SITE_URL}/logo-mascoticas.png`,

// DESPUÉS:
name: "[TU_MARCA]",
alternateName: "[TU_ALIAS_CORTO]",
logo: `${SITE_URL}/logo-[tu_nombre].png`,
```

**Cambio 8 - Email de contacto (LÍNEA 126):**

```typescript
// ANTES:
email: "info@mascoticastmedellin.com",

// DESPUÉS:
email: "info@[tu_dominio].com",
```

**Cambio 9 - Website Schema (LÍNEAS 210-212):**

```typescript
// ANTES:
name: "Mascoticas Medellín",
description: "Sitio web oficial de Mascoticas Medellín - Criadero de cachorros...",

// DESPUÉS:
name: "[TU_MARCA]",
description: "[TU_DESCRIPCIÓN_LARGA]",
```

**Cambio 10 - Google Analytics página (LÍNEA 303):**

```typescript
// ANTES:
page_title: 'Mascoticas Medellín',

// DESPUÉS:
page_title: '[TU_MARCA]',
```

**Cambio 11 - Open Graph meta (LÍNEA 341):**

```typescript
// ANTES:
<meta property="og:site_name" content="Mascoticas Medellín" />

// DESPUÉS:
<meta property="og:site_name" content="[TU_MARCA]" />
```

---

### 3. ✅ **src/lib/cloudinary.ts**

**Ubicación:** Línea 18

**Cambio:**

```typescript
// ANTES:
folder: string = "mascoticas-med";

// DESPUÉS:
folder: string = "tu-nueva-marca-med";
```

---

### 4. ✅ **src/components/SEO/LocalBusinessSchema.tsx**

**Cambio 1 - Nombre negocio (LÍNEA 10):**

```typescript
// ANTES:
name = "Mascoticas Bucaramanga Medellin",

// DESPUÉS:
name = "[TU_MARCA] [TU_UBICACIÓN]",
```

**Cambio 2 - Dirección (LÍNEA 11):**

```typescript
// ANTES:
address = "Bello, Bucaramanga, Antioquia, Colombia",

// DESPUÉS:
address = "[TU_CALLE], [TU_CIUDAD], [TU_ESTADO], [TU_PAÍS]",
```

**Cambio 3 - Email (LÍNEA 13):**

```typescript
// ANTES:
email = "info@mascoticastmedellin.com",

// DESPUÉS:
email = "info@[tu_dominio].com",
```

**Cambio 4 - URL (LÍNEA 29):**

```typescript
// ANTES:
url: "https://mascoticastmedellin.com",

// DESPUÉS:
url: "[TU_NUEVO_DOMINIO]",
```

**Cambios 5-6 - Redes sociales (LÍNEAS 35-36):**

```typescript
// ANTES:
"https://www.facebook.com/mascoticastmedellin",
"https://www.instagram.com/mascoticastmedellin",

// DESPUÉS:
"https://www.facebook.com/[tu_facebook]",
"https://www.instagram.com/[tu_instagram]",
```

---

### 5. ✅ **src/components/Nav.tsx**

**Cambio 1 - Alt de imagen (LÍNEA 107):**

```tsx
// ANTES:
alt = "Logo Mascoticas";

// DESPUÉS:
alt = "Logo [TU_MARCA]";
```

**Cambio 2 - Texto visual (LÍNEA 280):**

```tsx
// ANTES:
// DESPUÉS:
Mascoticas[TU_MARCA];
```

---

### 6. ✅ **src/components/Footer.tsx**

**Cambio 1 - Texto footer (LÍNEA 149):**

```tsx
// ANTES:
<span className="text-red-400 font-semibold text-xs">MASCOTICAS MEDELLÍN</span>

// DESPUÉS:
<span className="text-red-400 font-semibold text-xs">[TU_MARCA_EN_MAYÚSCULAS]</span>
```

**Cambio 2 - Alt logo footer (LÍNEA 176):**

```tsx
// ANTES:
alt = "Logo Mascoticas";

// DESPUÉS:
alt = "Logo [TU_MARCA]";
```

---

### 7. ✅ **src/components/LoadingScreen.tsx**

**Cambio 1 - Alt imagen (LÍNEA 163):**

```tsx
// ANTES:
alt = "Mascoticas";

// DESPUÉS:
alt = "[TU_MARCA]";
```

**Cambio 2 - Texto (LÍNEA 186):**

```tsx
// ANTES:
// DESPUÉS:
Mascoticas[TU_MARCA];
```

---

### 8. ✅ **src/components/HomeHero.tsx**

**Cambio 1 - Aria label (LÍNEA 117):**

```tsx
// ANTES:
aria-label="Bienvenida a Mascoticas"

// DESPUÉS:
aria-label="Bienvenida a [TU_MARCA]"
```

**Cambio 2 - Texto (LÍNEA 201):**

```tsx
// ANTES:
// DESPUÉS:
Mascoticas[TU_MARCA];
```

**Cambio 3 - Alt imagen (LÍNEA 232):**

```tsx
// ANTES:
alt = "Mascoticas - Especialistas en adopción de mascotas";

// DESPUÉS:
alt = "[TU_MARCA] - [TU_DESCRIPCIÓN]";
```

---

### 9. ✅ **src/components/SobreNosotros.tsx**

**Cambio único (LÍNEA 81):**

```tsx
// ANTES:
En Mascoticas nos apasiona ayudar a las personas a encontrar a su mejor amigo peludo.

// DESPUÉS:
En [TU_MARCA] nos apasiona [TU_MISIÓN]
```

---

### 10. ✅ **src/components/OptimizedImage.tsx**

**Cambios (LÍNEAS 42-43):**

```tsx
// ANTES:
`${breedName} - ${alt} - Mascoticas Medellín criadero certificado``${alt} - Mascoticas Medellín cachorros de raza pura`
// DESPUÉS:
`${breedName} - ${alt} - [TU_MARCA] [TU_DESCRIPCIÓN]``${alt} - [TU_MARCA] [TU_DESCRIPCIÓN]`;
```

---

### 11. ✅ **src/components/SEO/BreedPageSEO.tsx**

**Cambio (LÍNEA 28):**

```tsx
// ANTES:
title: `${breedName} en Medellín - Cachorros de Raza ${categoryText} | Mascoticas`,

// DESPUÉS:
title: `${breedName} en Medellín - Cachorros de Raza ${categoryText} | [TU_MARCA]`,
```

---

### 12. ✅ **src/app/admin/page.tsx**

**Cambio (LÍNEA 49):**

```tsx
// ANTES:
<h1 className="text-2xl font-bold text-white">Mascoticas Admin</h1>

// DESPUÉS:
<h1 className="text-2xl font-bold text-white">[TU_MARCA] Admin</h1>
```

---

### 13. ✅ **src/app/admin/categories/page.tsx**

**Cambio (LÍNEA 58):**

```typescript
// ANTES:
formDataUpload.append("folder", "mascoticas-med/categories");

// DESPUÉS:
formDataUpload.append("folder", "tu-nueva-marca-med/categories");
```

---

### 14. ✅ **src/app/admin/breeds/page.tsx**

**Cambios (LÍNEAS 157, 198):**

```typescript
// ANTES:
formDataUpload.append("folder", "mascoticas-med/breeds");
formDataUpload.append("folder", "mascoticas-med/breeds/gallery");

// DESPUÉS:
formDataUpload.append("folder", "tu-nueva-marca-med/breeds");
formDataUpload.append("folder", "tu-nueva-marca-med/breeds/gallery");
```

---

### 15. ✅ **src/app/admin/promotions/page.tsx**

**Cambio (LÍNEA 137):**

```typescript
// ANTES:
formDataUpload.append("folder", "mascoticas-med/promotions");

// DESPUÉS:
formDataUpload.append("folder", "tu-nueva-marca-med/promotions");
```

---

### 16. ✅ **.env**

**Comentario de referencia (LÍNEA 2):**

```
# ANTES:
#DATABASE_URL="postgresql://postgres:Nuizmosca10@localhost:5432/mascoticas_med"

# DESPUÉS:
#DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/nueva_base_datos"
```

---

### 17. ✅ **public/LOGO.png**

**Acción:**

1. Guardar el nuevo logo como `LOGO.png` en la carpeta `/public`
2. Reemplazar el archivo actual
3. **Dimensiones recomendadas:** 150-200px de ancho

---

### 18. ✅ **public/favicon.ico**

**Acción:**

1. Guardar nuevo favicon en `/public/favicon.ico`
2. Reemplazar el archivo actual
3. **Dimensiones:** 32x32 píxeles mínimo

---

### 19. ✅ **public/site.webmanifest**

**Cambio:**

```json
// ANTES:
{
  "name": "Mascoticas Medellín",
  "short_name": "Mascoticas",
  ...
}

// DESPUÉS:
{
  "name": "[TU_MARCA]",
  "short_name": "[ALIAS_CORTO]",
  ...
}
```

---

## 📊 BÚSQUEDA Y REEMPLAZO MASIVO (OPCIONAL)

Si quieres usar Find & Replace en VS Code, aquí están los patrones:

### Patrón 1: Marca completa

```
Buscar:    Mascoticas Medellín
Reemplazar: [TU_MARCA_COMPLETA]
Archivos:  *.tsx, *.ts, *.json
```

### Patrón 2: Marca simple

```
Buscar:    Mascoticas
Reemplazar: [TU_MARCA]
Archivos:  *.tsx, *.ts (excepto node_modules)
```

### Patrón 3: Carpeta Cloudinary

```
Buscar:    mascoticas-med
Reemplazar: tu-nueva-marca-med
Archivos:  *.ts, *.tsx
```

### Patrón 4: Email

```
Buscar:    info@mascoticastmedellin.com
Reemplazar: info@[tu_dominio].com
Archivos:  *.tsx, *.ts, *.md
```

### Patrón 5: Dominio

```
Buscar:    mascoticasbucaramangamedellin.com
Reemplazar: [tu_nuevo_dominio]
Archivos:  *.tsx, *.ts, *.md
```

---

## ✅ CHECKLIST DE VERIFICACIÓN DESPUÉS DE CAMBIOS

### Después de cada cambio, verifica:

- [ ] El archivo se guardó correctamente
- [ ] No hay errores de sintaxis (revisar problemas en VS Code)
- [ ] Los comentarios son claros y mantenibles

### Antes de hacer deploy:

- [ ] Todas las rutas de Cloudinary apuntan a la nueva carpeta
- [ ] El dominio en `layout.tsx` es correcto
- [ ] El email de contacto es válido
- [ ] Los logos están reemplazados
- [ ] Las redes sociales son las correctas
- [ ] SEO Schema se ve correcto en Google's Structured Data Test
- [ ] Open Graph se ve bien en Facebook Debugger

---

## 🎯 ORDEN RECOMENDADO DE CAMBIOS

1. **Primero:** package.json (es lo más pequeño)
2. **Luego:** src/app/layout.tsx (es lo más crítico)
3. **Después:** src/lib/cloudinary.ts
4. **Continuamos:** SEO components (LocalBusinessSchema, etc)
5. **Componentes:** Nav, Footer, HomeHero, etc
6. **Admin panel:** categories, breeds, promotions
7. **Assets:** Logo, favicon
8. **Base de datos:** .env y migraciones (si necesarias)
9. **Final:** Documentación

---

## ⚠️ ERRORES COMUNES A EVITAR

❌ **NO hagas esto:**

- Cambiar nombres de variables internas (ej: "breeds", "categories")
- Cambiar rutas API sin razón
- Reemplazar en archivos node_modules
- Cambiar la estructura de carpetas
- Olvidar reemplazar el logo

✅ **SÍ haz esto:**

- Mantén consistencia en todos los cambios
- Verifica cada cambio después de hacerlo
- Haz backup antes de empezar
- Prueba en local antes de deploy
- Documenta los cambios realizados

---

**Última actualización:** 1 de Febrero de 2026
