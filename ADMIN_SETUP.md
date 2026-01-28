# 🐾 Guía de Configuración: Panel Admin + Prisma + PostgreSQL

## 📋 Pasos de Configuración

### 1. **Instalar PostgreSQL**

- Descarga PostgreSQL desde: https://www.postgresql.org/download/
- Durante la instalación, anota tu contraseña de `postgres`
- Puerto por defecto: `5432`

### 2. **Crear Base de Datos**

#### Opción A: Usando pgAdmin (GUI)

1. Abre pgAdmin (incluido con PostgreSQL)
2. Servidor → Crear → Servidor
3. General: nombre = "mascoticas"
4. Conexión: Host = localhost, Puerto = 5432, Usuario = postgres
5. Clic derecho en "Databases" → Crear → Base de Datos: "mascoticas_med"

#### Opción B: Usando Terminal (CLI)

```bash
psql -U postgres
CREATE DATABASE mascoticas_med;
\q
```

### 3. **Configurar Variables de Entorno**

Edita `.env.local` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://postgres:TU_CONTRASEÑA@localhost:5432/mascoticas_med"
NEXTAUTH_SECRET="tu-secret-key-aleatorio-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

**Nota:** Reemplaza `TU_CONTRASEÑA` con la contraseña que estableciste al instalar PostgreSQL

### 4. **Ejecutar Migraciones de Prisma**

```bash
# Crear el cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init

# (Opcional) Ver datos en Prisma Studio
npx prisma studio
```

### 5. **Iniciar Aplicación**

```bash
npm run dev
```

Accede a: http://localhost:3000/admin

---

## 🗂️ Estructura de Datos

### Categories

- Grupos de razas (pequeñas, medianas, grandes)
- Cada categoría tiene un slug único

### Breeds

- Información de cada raza
- Relación con Categoría
- Precios por género
- Galería de imágenes

### Prices

- Precio macho y hembra
- Vinculado a cada raza

### Images

- URLs de imágenes adicionales
- Ordenadas por índice

---

## 🔗 Endpoints API Disponibles

### Categorías

- `GET /api/admin/categories` - Listar todas
- `POST /api/admin/categories` - Crear
- `PATCH /api/admin/categories/[id]` - Actualizar
- `DELETE /api/admin/categories/[id]` - Eliminar

### Razas

- `GET /api/admin/breeds` - Listar todas
- `GET /api/admin/breeds?categoryId=id` - Listar por categoría
- `POST /api/admin/breeds` - Crear
- `PATCH /api/admin/breeds/[id]` - Actualizar
- `DELETE /api/admin/breeds/[id]` - Eliminar

---

## 🎨 Funcionalidades del Admin

✅ **Gestión de Categorías**

- Crear, editar y eliminar categorías
- Validación de slug único
- Vista previa de razas por categoría

✅ **Gestión de Razas**

- CRUD completo de razas
- Precios separados por género
- Galería de imágenes dinámicas
- Búsqueda por categoría

✅ **Diseño Consistente**

- Utiliza Tailwind CSS + Framer Motion
- Compatible con diseño actual de la app
- Modo oscuro
- Animaciones fluidas

---

## 📝 Ejemplo: Crear Categoría

```javascript
POST /api/admin/categories
{
  "name": "Razas Pequeñas",
  "slug": "pequenas",
  "description": "Perros pequeños (bajo 5kg)"
}
```

---

## 📝 Ejemplo: Crear Raza

```javascript
POST /api/admin/breeds
{
  "name": "Pomeranias mini cara de oso",
  "description": "Energicos, Curiosos, Leales, Valientes",
  "image": "/razas-pequenas/pomerania.jpg",
  "desde": "a partir de",
  "categoryId": "clid123...",
  "malePrice": 3000000,
  "femalePrice": 4000000,
  "images": [
    "/razas-pequenas/pom1.jpg",
    "/razas-pequenas/pom2.jpg"
  ]
}
```

---

## 🚀 Próximos Pasos

1. Accede a http://localhost:3000/admin
2. Crea categorías (pequeñas, medianas, grandes)
3. Importa razas desde breeds.ts al panel
4. Verifica en http://localhost:3000 que se cargan desde BD
5. Elimina archivo breeds.ts cuando esté todo migrado

---

## 🔧 Troubleshooting

### Error: "ECONNREFUSED" en PORT 5432

- Asegúrate que PostgreSQL está corriendo
- En Windows: Servicios → PostgreSQL → Iniciar

### Error: "Database already exists"

- PostgreSQL ya tiene la DB
- Ejecuta: `npx prisma db push` en lugar de migrate

### Error: "DATABASE_URL not found"

- Verifica que `.env.local` exista en la raíz
- Reinicia el servidor de desarrollo

---

**¡Panel Admin listo para usar! 🎉**
