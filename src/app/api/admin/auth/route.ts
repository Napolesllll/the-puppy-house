// src/app/api/admin/auth/route.ts
import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Autenticado" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error en autenticación" },
      { status: 500 }
    );
  }
}
