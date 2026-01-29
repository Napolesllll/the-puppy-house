# ✅ Actualización de Imágenes en Tiempo Real - Implementación

**Fecha:** 28 de Enero de 2026

## 🎯 Lo que se implementó:

### 1. **Preview de imagen en el modal de edición**

- ✅ Cuando subes una imagen, se ve **inmediatamente** en el preview
- ✅ Muestra con borde rojo indicando que está cargada
- ✅ Overlay al hacer hover para cambiar imagen
- ✅ Feedback visual mientras sube ("Subiendo a Cloudinary...")

### 2. **Actualización en la sección "¡Ofertas Especiales!"**

- ✅ Componente Promotions refresca automáticamente cada 30 segundos
- ✅ Cuando actualizas una promoción en `/admin/promotions`, los cambios se ven en `/`
- ✅ Cache busters para evitar cachés del navegador

## 🔄 Cómo funciona el flujo:

```
Usuario edita promoción
        ↓
Sube nueva imagen
        ↓
Image sube a Cloudinary (via /api/upload)
        ↓
Preview aparece inmediatamente en modal
        ↓
Usuario guarda la promoción (PUT/PATCH)
        ↓
Base de datos actualiza con nueva URL
        ↓
Componente Promotions refresca cada 30s
        ↓
Sección de ofertas muestra imagen actualizada
```

## 📝 Cambios técnicos:

### En `/src/app/admin/promotions/page.tsx`:

1. **handleImageUpload**: Añadido cache buster al precargar imagen
2. **Preview Image**: Con `key={formData.image}` y `?t=${Date.now()}` para evitar cachés
3. **Propiedades**: `unoptimized`, `priority` para carga inmediata

### En `/src/components/Promotions.tsx`:

1. **Fetch automático**: Refresca cada 30 segundos (30000ms)
2. **Cache buster**: `cache: 'no-store'` en fetch
3. **Filtrado**: Solo muestra promociones activas y no expiradas

## ⏱️ Tiempo hasta ver cambios:

- **En el admin**: Inmediato (cuando subes imagen)
- **En la página inicio**: Máximo 30 segundos
- **Primera carga**: 0 segundos

## 🧪 Cómo probar:

1. **Desde `/` (página inicio)**:
   - Ve a sección "¡Ofertas Especiales!"
   - Anota la imagen actual

2. **Ir a `/admin/promotions`**:
   - Edita una promoción
   - Sube una imagen nueva
   - Observa preview con bordes rojo
   - Guarda cambios

3. **Vuelve a `/`**:
   - Espera máximo 30 segundos
   - Refrescar página si no ves cambios
   - ¡Deberías ver la imagen actualizada!

## 🔧 Detalles técnicos:

### Cache busters utilizados:

```tsx
// En preview
src={`${formData.image}?t=${Date.now()}`}

// En fetch
fetch("/api/promotions", { cache: 'no-store' })
```

### Propiedades de Image:

```tsx
<Image
  key={formData.image} // Re-render si cambia
  src={imageUrlWithTimestamp} // URL con timestamp
  unoptimized // No optimizar (imgs de Cloudinary)
  priority // Cargar prioridad
/>
```

## ✨ Beneficios:

- ✅ Feedback inmediato al usuario
- ✅ No hay cachés que confundan
- ✅ Sincronización automática entre admin y home
- ✅ Imagen lista para publicar en segundos
