// src/app/api/admin/promotions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Obtener todas las promociones (admin)
export async function GET() {
  try {
    const promotions = await prisma.promotion.findMany({
      include: {
        breed: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: [
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(promotions);
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return NextResponse.json(
      { error: "Error al obtener promociones" },
      { status: 500 }
    );
  }
}

// POST - Crear nueva promoción
export async function POST(request: NextRequest) {
  try {
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

    // Validaciones
    if (!title || !description || !discount || !image || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes" },
        { status: 400 }
      );
    }

    if (discount < 0 || discount > 100) {
      return NextResponse.json(
        { error: "El descuento debe estar entre 0 y 100" },
        { status: 400 }
      );
    }

    const promotion = await prisma.promotion.create({
      data: {
        title,
        description,
        discount,
        image,
        badge: badge || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive: isActive ?? true,
        isFeatured: isFeatured ?? false,
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

    return NextResponse.json(promotion, { status: 201 });
  } catch (error) {
    console.error("Error creating promotion:", error);
    return NextResponse.json(
      { error: "Error al crear promoción" },
      { status: 500 }
    );
  }
}