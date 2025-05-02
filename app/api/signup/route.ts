import { connectDB } from "@/lib/db";
import Patient from "@/models/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { firstName, lastName, email, password } = await req.json();

    // ✅ منع استخدام إيميل الأدمن
    if (email === "admin@example.com") {
      return NextResponse.json(
        { message: "Vous ne pouvez pas utiliser cet email." },
        { status: 400 }
      );
    }

    const existingUser = await Patient.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email déjà utilisé." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new Patient({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedDoctor=await newPatient.save();

    return NextResponse.json(
      { message: "Compte créé avec succès" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erreur signup:", error);
    return NextResponse.json(
      { message: "Erreur serveur", error },
      { status: 500 }
    );
  }
}
