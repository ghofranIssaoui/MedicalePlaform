// app/api/admin/patient/[id]/route.ts
import { connectDB } from "@/lib/db";
import  Patient from "@/models/client";
import { NextRequest, NextResponse } from "next/server";

// حذف مريض حسب ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  await Patient.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Patient deleted" });
}
