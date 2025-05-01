// app/api/admin/appointments/route.ts
import { connectDB } from "@/lib/db";
import  Appointment  from "@/models/appoinments";
import { NextResponse } from "next/server";

// جلب كل المواعيد مع معلومات الطبيب والمريض
export async function GET() {
  await connectDB();
  const appointments = await Appointment.find()
    .populate("doctor", "fullName specialty") // فقط المعلومات المهمة
    .populate("patient", "fullName email");

  return NextResponse.json(appointments);
}
