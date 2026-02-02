# 🚀 GUÍA DE EJECUCIÓN PASO A PASO

**Método:** Usar VS Code Find & Replace (Método más eficiente)  
**Tiempo estimado:** 45 minutos  
**Dificultad:** ⭐ Muy fácil

---

## 🎯 ANTES DE EMPEZAR

### Paso 0: Preparación

```bash
# 1. Abre el proyecto en VS Code
# 2. Asegúrate de que Git esté inicializado
git status

# 3. Crea una rama para estos cambios
git checkout -b feat/cambio-marca-2026

# 4. Verifica que todo esté bien
npm install
npm run build  # Opcional, pero bueno para verificar
```

---

## 📋 INFORMACIÓN A REEMPLAZAR

**DEFINE ESTOS VALORES ANTES DE EMPEZAR:**

```javascript
// Completa estas variables
const miMarca = "AQUÍ_EL_NOMBRE_DE_TU_MARCA"; // Ej: "PetVibe"
const miDominio = "AQUÍ_TU_DOMINIO"; // Ej: "https://petvibe.com"
const miEmail = "AQUÍ_TU_EMAIL"; // Ej: "info@petvibe.com"
const miUbicacion = "AQUÍ_TU_UBICACIÓN"; // Ej: "Medellín, Colombia"
const miTwitter = "AQUÍ_TU_TWITTER"; // Ej: "@PetVibeMed"
const miFacebook = "AQUÍ_TU_FACEBOOK"; // Ej: "petvibemedellin"
const miInstagram = "AQUÍ_TU_INSTAGRAM"; // Ej: "petvibemedellin"
const miCarpetaCloudinary = "AQUÍ_CARPETA_NUEVA"; // Ej: "petvibe-med"
```

---

## 🎬 PROCESO PASO A PASO

### PASO 1: Find & Replace #1 - Carpeta Cloudinary (2 min)

**Buscar:** `mascoticas-med`  
**Reemplazar por:** `[TU_CARPETA_CLOUDINARY]`

**Instrucciones:**

```
1. Abre VS Code (Ctrl+Shift+H para Find & Replace)
2. En el campo "Find" escribe: mascoticas-med
3. En el campo "Replace" escribe: tu-nueva-marca-med
4. Click en "Match Case" ✓ (importante)
5. Click en "Replace All" (button derecha)
6. Verifica que reemplazó en estos archivos:
   ✓ src/lib/cloudinary.ts (línea 18)
   ✓ src/app/admin/categories/page.tsx (línea 58)
   ✓ src/app/admin/breeds/page.tsx (líneas 157, 198)
   ✓ src/app/admin/promotions/page.tsx (línea 137)
   ✓ package.json (nombre del proyecto)
```

**Resultado esperado:** ~7 reemplazos

---

### PASO 2: Find & Replace #2 - Dominio antiguo (3 min)

**Buscar:** `mascoticasbucaramangamedellin.com`  
**Reemplazar por:** `[TU_DOMINIO_SIN_HTTPS://]`

**Instrucciones:**

```
1. Abre Find & Replace (Ctrl+Shift+H)
2. Busca: mascoticasbucaramangamedellin.com
3. Reemplaza por: tu-nuevo-dominio.com
4. Match Case ✓
5. Replace All
6. Verifica que reemplazó en:
   ✓ src/app/layout.tsx (línea 10)
   ✓ Archivos .md de documentación
```

**Resultado esperado:** 5+ reemplazos

---

### PASO 3: Find & Replace #3 - Dominio alternativo (2 min)

**Buscar:** `mascoticastmedellin.com`  
**Reemplazar por:** `[TU_DOMINIO_SIN_HTTPS://]`

**Instrucciones:**

```
1. Abre Find & Replace (Ctrl+Shift+H)
2. Busca: mascoticastmedellin.com
3. Reemplaza por: tu-nuevo-dominio.com
4. Match Case ✓
5. Replace All
6. Verifica cambios en:
   ✓ src/components/SEO/LocalBusinessSchema.tsx (línea 29)
```

**Resultado esperado:** 2-3 reemplazos

---

### PASO 4: Find & Replace #4 - Email antiguo (2 min)

**Buscar:** `info@mascoticastmedellin.com`  
**Reemplazar por:** `[TU_EMAIL]`

**Instrucciones:**

```
1. Abre Find & Replace (Ctrl+Shift+H)
2. Busca: info@mascoticastmedellin.com
3. Reemplaza por: info@tu-dominio.com
4. Match Case ✓
5. Replace All
6. Verifica en:
   ✓ src/app/layout.tsx (línea 126)
   ✓ src/components/SEO/LocalBusinessSchema.tsx (línea 13)
```

**Resultado esperado:** 3-4 reemplazos

---

### PASO 5: Find & Replace #5 - Handle de Twitter (2 min)

**Buscar:** `@MascoticanMedellin`  
**Reemplazar por:** `@[TU_TWITTER_HANDLE]`

**Instrucciones:**

```
1. Abre Find & Replace (Ctrl+Shift+H)
2. Busca: @MascoticanMedellin
3. Reemplaza por: @tu_handle_twitter
4. Match Case ✓
5. Replace All
6. Verifica en:
   ✓ src/app/layout.tsx (líneas 80, 82)
```

**Resultado esperado:** 3 reemplazos

---

### PASO 6: Find & Replace #6 - Redes sociales Facebook (2 min)

**Buscar:** `mascoticastmedellin` (en URLs)  
**Reemplazar por:** `[TU_FACEBOOK_USER]`

**Instrucciones:**

```
1. Abre Find & Replace (Ctrl+Shift+H)
2. Busca: facebook.com/mascoticastmedellin
3. Reemplaza por: facebook.com/tu_usuario_facebook
4. Match Case NO ✓ (case insensitive)
5. Replace All
6. Verifica en:
   ✓ src/components/SEO/LocalBusinessSchema.tsx (línea 35)
   ✓ src/app/layout.tsx (línea 198 - comentada)
```

**Resultado esperado:** 2 reemplazos

---

### PASO 7: Find & Replace #7 - Redes sociales Instagram (2 min)

**Busca las URLs de Instagram de Mascoticas y reemplázalas**

**Instrucciones:**

```
1. Abre Find & Replace (Ctrl+Shift+H)
2. Busca: instagram.com/mascoticastmedellin
3. Reemplaza por: instagram.com/tu_usuario_instagram
4. Match Case NO ✓
5. Replace All
6. Verifica en:
   ✓ src/components/SEO/LocalBusinessSchema.tsx (línea 36)
   ✓ src/app/layout.tsx (línea 199 - comentada)
```

**Resultado esperado:** 2 reemplazos

---

### PASO 8: Find & Replace #8 - Marca completa (5 min)

**Buscar:** `Mascoticas Medellín`  
**Reemplazar por:** `[TU_MARCA] [UBICACIÓN]`

**Instrucciones:**

```
1. Abre Find & Replace (Ctrl+Shift+H)
2. Busca: Mascoticas Medellín
3. Reemplaza por: PetVibe Medellín (o tu marca)
4. Match Case ✓
5. IMPORTANTE: Revisa cada reemplazo manualmente
   - Algunos pueden necesitar ajustes
   - Aceptar o rechazar cada uno
6. Click en Replace All o Replace individual
7. Verifica en múltiples archivos:
   ✓ src/app/layout.tsx (muchos)
   ✓ src/components/Footer.tsx
   ✓ src/components/NAV.tsx
   ✓ etc
```

**Resultado esperado:** 20+ reemplazos

---

### PASO 9: Find & Replace #9 - Marca simple (5 min)

**Buscar:** `Mascoticas`  
**Reemplazar por:** `[TU_MARCA]`

**ADVERTENCIA:** Este término es más común. Ser cuidadoso.

**Instrucciones:**

```
1. Abre Find & Replace (Ctrl+Shift+H)
2. Busca: Mascoticas
3. Match Case ✓ (mayúscula importante)
4. NO hagas Replace All automático
5. Usa "Replace" individual para:
   - Revisar cada match
   - Evitar reemplazos errados
   - Aceptar solo los que correspondan
6. Verifica cambios lógicos:
   ✓ "Mascoticas" en títulos → [TU_MARCA]
   ✓ "Mascoticas" en alt text → [TU_MARCA]
   ✓ "Mascoticas" en comentarios → puede saltarse
```

**Resultado esperado:** 25+ reemplazos (siendo selectivo)

---

### PASO 10: Cambio a Dirección (3 min)

**Búsqueda manual:** `Bello, Bucaramanga`

**Instrucciones:**

```
1. Abre Find & Replace (Ctrl+Shift+H)
2. Busca: Bello, Bucaramanga, Antioquia, Colombia
3. Reemplaza por: [TU_UBICACIÓN_COMPLETA]
4. Match Case NO ✓
5. Replace All
6. Verifica en:
   ✓ src/components/SEO/LocalBusinessSchema.tsx (línea 11)
```

**Resultado esperado:** 1 reemplazo

---

### PASO 11: Cambio a Ubicación en Títulos (2 min)

**Búsqueda:** `Medellín` (en títulos específicos)

**Instrucciones:**

```
1. IMPORTANTE: NO cambies todos los "Medellín"
2. Solo cambia en contexto de marca:
   - "Mascoticas Medellín" → ya hecho en paso 8
   - Otros "Medellín" pueden quedarse igual
3. Usa Find en específico en:
   ✓ src/app/layout.tsx
   ✓ src/components/SEO/
4. Verifica manualmente cada caso
```

**Resultado esperado:** 0 cambios (ya fueron reemplazados)

---

## 🎨 CAMBIOS MANUALES (ARCHIVOS ESPECÍFICOS)

### Manual 1: layout.tsx - Variables críticas

**Archivo:** `src/app/layout.tsx`

```typescript
// LÍNEA 10 - CAMBIO CRÍTICO
const SITE_URL = "https://mascoticasbucaramangamedellin.com";
↓
const SITE_URL = "https://tu-nuevo-dominio.com";
```

**Verifica que esté hecho**

---

### Manual 2: site.webmanifest

**Archivo:** `public/site.webmanifest`

Abre el archivo y edita manualmente:

```json
{
  "name": "Mascoticas Medellín",
  ↓
  "name": "[TU_MARCA]",

  "short_name": "Mascoticas",
  ↓
  "short_name": "[ALIAS_CORTO]",
}
```

---

### Manual 3: .env (Opcional)

**Archivo:** `.env`

Si quieres actualizar el comentario:

```bash
# Antes:
#DATABASE_URL="postgresql://postgres:Nuizmosca10@localhost:5432/mascoticas_med"

# Después:
#DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/nueva_base_datos"
```

---

## 🖼️ CAMBIO DE ASSETS

### Asset 1: Logo

```
1. Prepara tu nuevo LOGO.png (150-200px ancho)
2. Renómbralo como: LOGO.png
3. Abre carpeta: public/
4. Reemplaza el archivo LOGO.png antiguo
5. Verifica que sea PNG
```

### Asset 2: Favicon

```
1. Prepara tu nuevo favicon (32x32px)
2. Renómbralo como: favicon.ico
3. Abre carpeta: public/
4. Reemplaza el archivo favicon.ico antiguo
```

---

## ✅ VERIFICACIÓN POST-CAMBIOS

### Test 1: Compilación

```bash
npm run build
```

**Resultado esperado:** ✓ Build exitoso sin errores

---

### Test 2: Ejecución local

```bash
npm run dev
# Abre: http://localhost:3000
```

**Checklist visual:**

- [ ] Logo aparece en navegación
- [ ] Nombre de marca es correcto en página
- [ ] Footer muestra nombre correcto
- [ ] Favicon en tab es nuevo
- [ ] No hay errores en consola

---

### Test 3: Admin panel

```
1. Ve a http://localhost:3000/admin
2. Verifica:
   - [ ] Título muestra "[TU_MARCA] Admin"
   - [ ] Puedes crear categorías
   - [ ] Puedes crear razas
   - [ ] Puedes crear promociones
   - [ ] Las imágenes suben correctamente
```

---

### Test 4: SEO Validation

**Google Structured Data Test:**

```
1. Ve a: https://search.google.com/structured-data
2. Pega tu URL: http://localhost:3000
3. Verifica:
   - [ ] No hay errores
   - [ ] Organización schema correcto
   - [ ] Nombre de marca es nuevo
```

---

### Test 5: Meta Verification

**Facebook Open Graph Debugger:**

```
1. Ve a: https://developers.facebook.com/tools/debug/
2. Pega URL: http://localhost:3000
3. Verifica:
   - [ ] og:title correcto
   - [ ] og:site_name es nueva marca
   - [ ] Imagen carga
```

---

## 🐛 TROUBLESHOOTING

### Problema 1: Errores de compilación

```
Error: ...

Solución:
1. Revisa que no haya sintaxis rota en layout.tsx
2. Verifica comillas, paréntesis
3. Abre el archivo y revisa manualmente
```

---

### Problema 2: Logo no carga

```
Solución:
1. Verifica que LOGO.png esté en /public
2. Verifica que sea .png (no .jpg)
3. Reinicia servidor: npm run dev
```

---

### Problema 3: Favicon no actualiza

```
Solución:
1. Vacía cache del navegador (Ctrl+Shift+R)
2. Abre en incógnito
3. Verifica favicon.ico en /public
```

---

### Problema 4: Redes sociales no validan

```
Solución:
1. Verifica URLs sean válidas
2. Usa URLs completas: https://facebook.com/usuario
3. No uses caracteres especiales sin escapar
```

---

## 💾 GIT COMMIT

Una vez que todo funciona:

```bash
# Ver cambios
git status

# Agregar todos
git add .

# Commit
git commit -m "chore: cambio de marca a [TU_MARCA]"

# Ver log
git log --oneline -3

# Push (si tienes remoto)
git push origin feat/cambio-marca-2026
```

---

## 🚀 DEPLOYMENT

### Si usas Vercel:

```bash
# El deployment es automático al hacer push a main
git push origin main
```

### Si usas servidor propio:

```bash
# Build para producción
npm run build

# Copia los archivos a tu servidor
# Reinicia la aplicación
```

---

## 📝 LISTA FINAL DE CONTROL

Marca cada elemento antes de completar:

- [ ] Backup hecho (git branch)
- [ ] Find & Replace #1: mascoticas-med ✓
- [ ] Find & Replace #2: mascoticasbucaramanga... ✓
- [ ] Find & Replace #3: mascoticastmedellin.com ✓
- [ ] Find & Replace #4: info@mascoticast... ✓
- [ ] Find & Replace #5: @MascoticanMedellin ✓
- [ ] Find & Replace #6: Facebook URLs ✓
- [ ] Find & Replace #7: Instagram URLs ✓
- [ ] Find & Replace #8: "Mascoticas Medellín" ✓
- [ ] Find & Replace #9: "Mascoticas" ✓
- [ ] Find & Replace #10: Ubicación ✓
- [ ] Manual: layout.tsx SITE_URL ✓
- [ ] Manual: site.webmanifest ✓
- [ ] Logo reemplazado ✓
- [ ] Favicon reemplazado ✓
- [ ] npm run build ✓
- [ ] npm run dev local test ✓
- [ ] Admin panel funciona ✓
- [ ] Google Schema Test valida ✓
- [ ] Git commit hecho ✓

---

## ✨ ¡COMPLETADO!

Una vez marques todo, ¡tu proyecto tendrá completamente nueva marca!

Próximos pasos:

1. Continúa con testing
2. Notifica a tu equipo
3. Haz deploy a producción
4. Monitorea que todo funcione

**¡Felicidades! Tu proyecto ha sido rebranded exitosamente! 🎉**

---

**Documento generado:** 1 de Febrero de 2026  
**Método:** VS Code Find & Replace  
**Tiempo total:** ~45 minutos  
**Dificultad:** ⭐ Muy fácil
