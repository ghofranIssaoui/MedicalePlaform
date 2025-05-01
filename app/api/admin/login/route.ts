import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // معلومات الادمين
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"; // لازم تحطهم في .env

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ message: "Email ou mot de passe administrateur incorrect." }, { status: 401 });
    }

    // ✅ المعلومات صحيحة، نصنع توكن
    const token = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" }
    );

    const response = NextResponse.json({
      message: "Admin connecté",
      role: "admin"
    });

    // نعمل set للكوكي
    response.cookies.set({
      name: "access_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60, // 2 ساعات
      path: "/",
    });

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
}
