import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/client";
import { Doctor } from "@/models/doctor";

export async function POST(req: NextRequest) {
    await connectDB();

    const { name, password } = await req.json();

    const existingUser = await Doctor.findOne({ name });

    if (!existingUser) {
        return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
    }

    const role = existingUser.role || "doctor";

    const token = jwt.sign(
        { id: existingUser._id, role },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );

    const response = NextResponse.json({ message: "Connecté", role , id: existingUser._id, name: existingUser.name, phone: existingUser.phone, address: existingUser.address, image: existingUser.image }, { status: 200 });

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
