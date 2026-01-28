// src/app/api/admin/breeds/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { UpdateBreedInput } from '@/types/admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const breed = await prisma.breed.findUnique({
      where: { id },
      include: {
        category: true,
        prices: true,
        images: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!breed) {
      return NextResponse.json(
        { error: 'Raza no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(breed);
  } catch (error) {
    console.error('Error fetching breed:', error);
    return NextResponse.json(
      { error: 'Error al obtener raza' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: UpdateBreedInput = await request.json();

    const {
      name,
      description,
      image,
      desde,
      malePrice,
      femalePrice,
      images,
    } = body;

    const updateData: any = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (image) updateData.image = image;
    if (desde !== undefined) updateData.desde = desde;

    // Actualizar precios si se proporcionan
    if (malePrice !== undefined || femalePrice !== undefined) {
      updateData.prices = {
        update: {
          where: {
            breedId: id,
          },
          data: {
            ...(malePrice !== undefined && { malePrice }),
            ...(femalePrice !== undefined && { femalePrice }),
          },
        },
      };
    }

    // Reemplazar imágenes si se proporcionan
    if (images && Array.isArray(images)) {
      updateData.images = {
        deleteMany: {},
        createMany: {
          data: images.map((url, index) => ({
            url,
            order: index,
          })),
        },
      };
    }

    const breed = await prisma.breed.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        prices: true,
        images: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json(breed);
  } catch (error) {
    console.error('Error updating breed:', error);
    return NextResponse.json(
      { error: 'Error al actualizar raza' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.breed.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Raza eliminada correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting breed:', error);
    return NextResponse.json(
      { error: 'Error al eliminar raza' },
      { status: 500 }
    );
  }
}
