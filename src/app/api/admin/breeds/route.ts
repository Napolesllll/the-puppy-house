// src/app/api/admin/breeds/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { CreateBreedInput } from '@/types/admin';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');

    const breeds = await prisma.breed.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: {
        category: true,
        prices: true,
        images: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(breeds);
  } catch (error) {
    console.error('Error fetching breeds:', error);
    return NextResponse.json(
      { error: 'Error al obtener razas' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateBreedInput = await request.json();

    const {
      name,
      description,
      image,
      desde,
      categoryId,
      malePrice,
      femalePrice,
      images = [],
    } = body;

    if (!name || !description || !categoryId) {
      return NextResponse.json(
        { error: 'Nombre, descripción y categoría son requeridos' },
        { status: 400 }
      );
    }

    const slug = generateSlug(name);

    const existingBreed = await prisma.breed.findUnique({
      where: { slug },
    });

    if (existingBreed) {
      return NextResponse.json(
        { error: 'Una raza con este nombre ya existe' },
        { status: 409 }
      );
    }

    const breed = await prisma.breed.create({
      data: {
        name,
        description,
        image,
        desde,
        slug,
        categoryId,
        prices: {
          create: {
            malePrice,
            femalePrice,
          },
        },
        images: {
          createMany: {
            data: images.map((url, index) => ({
              url,
              order: index,
            })),
          },
        },
      },
      include: {
        prices: true,
        images: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json(breed, { status: 201 });
  } catch (error) {
    console.error('Error creating breed:', error);
    return NextResponse.json(
      { error: 'Error al crear raza' },
      { status: 500 }
    );
  }
}
