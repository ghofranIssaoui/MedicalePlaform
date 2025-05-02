// app/api/clients/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/client";

export async function POST(req: NextRequest) {
  await connectDB();

  const { email, password } = await req.json();

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

  const role = existingUser.role || "user";

  const token = jwt.sign(
    { id: existingUser._id, role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  const response = NextResponse.json({ message: "Connecté", role , id: existingUser._id, email: existingUser.email, name: existingUser.name, phone: existingUser.phone, address: existingUser.address, image: existingUser.image }, { status: 200 });

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
