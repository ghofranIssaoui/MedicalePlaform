// app/api/admin/patient/route.ts
import { connectDB } from "@/lib/db";
import  Patient   from "@/models/client";
import { NextResponse } from "next/server";

// جلب كل المرضى
export async function GET() {
  await connectDB();
  const patients = await Patient.find();
  return NextResponse.json(patients);
}
