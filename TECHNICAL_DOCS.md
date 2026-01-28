# 📚 Documentación Técnica: Panel Admin

## 🏗️ Arquitectura

```
src/
├── app/
│   ├── admin/                    # Panel administrativo
│   │   ├── page.tsx             # Dashboard principal
│   │   ├── categories/          # CRUD Categorías
│   │   │   └── page.tsx
│   │   └── breeds/              # CRUD Razas
│   │       └── page.tsx
│   └── api/
│       └── admin/               # Endpoints API
│           ├── categories/
│           │   ├── route.ts     # GET, POST
│           │   └── [id]/route.ts # GET, PATCH, DELETE
│           └── breeds/
│               ├── route.ts     # GET, POST
│               └── [id]/route.ts # GET, PATCH, DELETE
├── lib/
│   ├── prisma.ts               # Instancia Prisma (singleton)
│   └── utils.ts
├── types/
│   └── admin.ts                # Types para admin
├── hooks/
│   └── useBreeds.ts            # Hook para obtener razas
```

---

## 📊 Modelo de Datos Prisma

### Relaciones

```
Category (1) ─────── (N) Breed
Breed    (1) ─────── (1) BreedPrice
Breed    (1) ─────── (N) BreedImage
```

### Tipos Principales

```typescript
// Categoria
{
  id: string (cuid)
  name: string (unique)
  slug: string (unique)
  description?: string
  breeds: Breed[]
}

// Raza
{
  id: string (cuid)
  name: string
  description: string
  slug: string (unique)
  image: string (URL principal)
  desde?: string
  categoryId: string (FK)
  category: Category
  prices: BreedPrice[]
  images: BreedImage[]
}

// Precio
{
  id: string (cuid)
  malePrice: number
  femalePrice: number
  breedId: string (FK, unique)
  breed: Breed
}

// Imagen
{
  id: string (cuid)
  url: string
  order: number
  breedId: string (FK)
  breed: Breed
}
```

---

## 🔌 Endpoints API Detallados

### GET /api/admin/categories

Obtiene todas las categorías con sus razas asociadas.

**Response:**

```json
[
  {
    "id": "clid123...",
    "name": "Razas Pequeñas",
    "slug": "pequenas",
    "description": "...",
    "breeds": [{ "id": "clid456...", "name": "Pomerania" }]
  }
]
```

### POST /api/admin/categories

Crea una nueva categoría.

**Request:**

```json
{
  "name": "Razas Pequeñas",
  "slug": "pequenas",
  "description": "..."
}
```

### GET /api/admin/breeds?categoryId=clid123

Obtiene razas filtradas (opcional por categoría).

**Query Params:**

- `categoryId` (optional): Filtrar por categoría

### POST /api/admin/breeds

Crea una raza con precios e imágenes.

**Request:**

```json
{
  "name": "Pomerania",
  "description": "Energico y leal",
  "image": "/ruta/imagen.jpg",
  "desde": "a partir de",
  "categoryId": "clid123...",
  "malePrice": 3000000,
  "femalePrice": 4000000,
  "images": ["/ruta/img1.jpg", "/ruta/img2.jpg"]
}
```

---

## 🎨 Componentes UI

### AdminDashboard

Dashboard principal con acceso a secciones.

**Props:** Ninguno (utiliza estado local)

### CategoriesAdmin

CRUD completo de categorías con modal editable.

**Features:**

- Listar categorías
- Crear/editar/eliminar
- Validación de slug único
- Prevención de eliminación si hay razas

### BreedsAdmin

CRUD completo de razas con gestión de imágenes.

**Features:**

- Listar razas por categoría
- Crear/editar/eliminar razas
- Gestión de precios macho/hembra
- Agregar múltiples imágenes
- Vista previa de imágenes
- Ordenamiento por categoría

---

## 🎯 Hook useBreeds

```typescript
const {
  breeds, // Array de razas completas
  loading, // boolean
  error, // string | null
  getBreedsByCategory, // (slug: string) => BreedData[]
  groupBreedsByCategory, // () => GroupedBreeds
} = useBreeds();
```

**Uso en componentes:**

```tsx
const { getBreedsByCategory } = useBreeds();
const racaspequenas = getBreedsByCategory("pequenas");
```

---

## 🔐 Validaciones

### Categorías

- ✅ Nombre requerido
- ✅ Slug único en BD
- ✅ No eliminar si tiene razas

### Razas

- ✅ Nombre requerido
- ✅ Descripción requerida
- ✅ Categoría requerida
- ✅ Slug generado automáticamente
- ✅ Precios requeridos
- ✅ URLs de imágenes validadas

---

## 🚀 Migración de breeds.ts

### Pasos:

1. Crear categorías en `/admin/categories`
2. Importar razas en `/admin/breeds`
3. Actualizar BreedSections.tsx para usar `useBreeds()`
4. Eliminar archivo `src/data/breeds.ts`

### Actualización de BreedSections.tsx:

```tsx
"use client";
import { useBreeds } from '@/hooks/useBreeds';

export default function BreedSections() {
  const { groupBreedsByCategory } = useBreeds();
  const breedsByCategory = groupBreedsByCategory();

  return (
    // Renderizar categorías dinámicamente
  );
}
```

---

## ⚡ Performance

- **Queries optimizadas** con select y include de Prisma
- **Lazy loading de imágenes** con Next.js Image
- **Singleton Prisma** en client para reutilizar conexión
- **Debounce en búsquedas** (si se implementa)

---

## 🔄 Flujo de Datos

```
Admin Panel (React)
  ↓
API Routes (Next.js)
  ↓
Prisma ORM
  ↓
PostgreSQL
```

---

## 📦 Dependencias Principales

- **prisma**: ORM
- **@prisma/client**: Cliente Prisma
- **framer-motion**: Animaciones UI
- **lucide-react**: Iconos
- **next**: Framework (App Router)

---

## 🧪 Testing (Futuro)

```bash
# Crear ambiente de test
npm run test

# Con coverage
npm run test:coverage
```

---

## 📝 Checklist de Implementación

- [x] Schema Prisma creado
- [x] API endpoints CRUD
- [x] Panel Admin UI
- [x] Gestión categorías
- [x] Gestión razas
- [x] Hook useBreeds
- [ ] Autenticación admin
- [ ] Rate limiting
- [ ] Validación datos entrantes (Zod)
- [ ] Tests unitarios
- [ ] Migraciones BD en producción

---

## 🤝 Próximas Mejoras

1. **Autenticación Admin** - NextAuth con credenciales
2. **Validación Zod** - Tipado en runtime
3. **Upload de Imágenes** - Subir a Cloudinary/S3
4. **Búsqueda y Filtros** - En panel admin
5. **Analytics** - Razas más vistas
6. **Bulk Import** - CSV con razas

---

**Documentación Técnica Completa ✅**
