import { connectDB } from "@/lib/db";
import { DoctorType } from "@/types/doctor";
import { NextResponse } from "next/server";

import { Doctor } from "@/models/doctor";

export async function GET() {
  await connectDB();
  const allDoctors = await Doctor.find();
  return NextResponse.json(allDoctors);
}

export async function PUT(request: Request) {
  const { id, isApproved } = await request.json();
  await connectDB();
  const doctor = await Doctor.findByIdAndUpdate(id, { isApproved });
  return NextResponse.json({ message: "Doctor updated", doctor });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await connectDB();
  await Doctor.findByIdAndDelete(id);
  return NextResponse.json({ message: "Doctor deleted" });
}
