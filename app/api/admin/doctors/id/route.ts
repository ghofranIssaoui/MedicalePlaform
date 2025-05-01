// app/api/admin/doctor/[id]/route.ts
import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Doctor } from "@/models/doctor";

// ✅ Get one doctor by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const doctor = await Doctor.findById(params.id);
  return NextResponse.json(doctor);
}

// ✅ Update doctor by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  await connectDB();
  const updated = await Doctor.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json({ message: "Doctor updated", doctor: updated });
}

// ✅ Delete doctor by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  await Doctor.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Doctor deleted" });
}
