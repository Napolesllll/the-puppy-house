// src/app/api/admin/promotions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Obtener una promoción
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const promotion = await prisma.promotion.findUnique({
      where: { id },
      include: {
        breed: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!promotion) {
      return NextResponse.json(
        { error: "Promoción no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(promotion);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al obtener promoción" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar promoción completa
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      description,
      discount,
      image,
      badge,
      startDate,
      endDate,
      isActive,
      isFeatured,
      breedId,
    } = body;

    const promotion = await prisma.promotion.update({
      where: { id },
      data: {
        title,
        description,
        discount,
        image,
        badge: badge || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive,
        isFeatured,
        breedId: breedId || null,
      },
      include: {
        breed: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(promotion);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al actualizar promoción" },
      { status: 500 }
    );
  }
}

// PATCH - Actualizar parcialmente (ej: solo isActive)
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validar que la promoción existe primero
    const existingPromo = await prisma.promotion.findUnique({
      where: { id },
    });

    if (!existingPromo) {
      return NextResponse.json(
        { error: "Promoción no encontrada" },
        { status: 404 }
      );
    }

    // Preparar datos a actualizar (validaciones)
    const updateData: any = {};
    
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    if (body.isFeatured !== undefined) updateData.isFeatured = body.isFeatured;
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.discount !== undefined) {
      if (body.discount < 0 || body.discount > 100) {
        return NextResponse.json(
          { error: "El descuento debe estar entre 0 y 100" },
          { status: 400 }
        );
      }
      updateData.discount = body.discount;
    }
    if (body.image !== undefined) updateData.image = body.image;
    if (body.badge !== undefined) updateData.badge = body.badge || null;
    if (body.startDate !== undefined) updateData.startDate = new Date(body.startDate);
    if (body.endDate !== undefined) updateData.endDate = new Date(body.endDate);
    if (body.breedId !== undefined) updateData.breedId = body.breedId || null;

    const promotion = await prisma.promotion.update({
      where: { id },
      data: updateData,
      include: {
        breed: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(promotion);
  } catch (error) {
    console.error("Error updating promotion:", error);
    return NextResponse.json(
      { error: "Error al actualizar promoción", details: (error as any).message },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar promoción
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    await prisma.promotion.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al eliminar promoción" },
      { status: 500 }
    );
  }
}