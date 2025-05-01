// app/api/clients/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/client";

export async function POST(req: NextRequest) {
  await connectDB();

  const { email, password } = await req.json();

  // نمنع الادمين انه يعمل لوجين من هنا
  if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return NextResponse.json({ message: "Vous ne pouvez pas utiliser cet email pour login standard." }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordCorrect) {
    return NextResponse.json({ message: "Mot de passe incorrect" }, { status: 401 });
  }

  // ديما نضمن نرجع role user إذا مافماش
  const role = existingUser.role || "user";

  const token = jwt.sign(
    { id: existingUser._id, role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  // تحضير الرد مع الكوكي
  const response = NextResponse.json({ message: "Connecté", role });

  response.cookies.set({
    name: "access_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60, // 1h
    path: "/",
  });

  return response;
}
