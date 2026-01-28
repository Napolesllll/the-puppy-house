-- Archivo SQL para crear la BD manualmente (opcional)
-- Ejecutar en pgAdmin o con: psql -U postgres -f prisma/init.sql

CREATE DATABASE mascoticas_med;

-- Conectar a la base de datos
\c mascoticas_med;

-- Las tablas las crea Prisma automáticamente con 'prisma migrate dev'
-- Este archivo es solo de referencia
