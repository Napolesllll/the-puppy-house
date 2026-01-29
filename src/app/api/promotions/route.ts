// src/app/api/promotions/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const promotions = await prisma.promotion.findMany({
      where: {
        isActive: true,
        endDate: {
          gte: new Date(), // Solo promociones que no han expirado
        },
      },
      include: {
        breed: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: [
        { isFeatured: "desc" }, // Destacadas primero
        { startDate: "desc" }, // Más recientes primero
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