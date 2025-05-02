// app/api/admin/appointments/route.ts
import { connectDB } from "@/lib/db";
import  Appointment  from "@/models/appointments";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const appointments = await Appointment.find()
    .populate("doctor", "name specialty") 
    .populate("patient", "firstName email");

  return NextResponse.json(appointments);
}
