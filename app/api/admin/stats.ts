// app/api/admin/stats/route.ts
import { connectDB } from "@/lib/db";
import { Doctor } from "@/models/doctor";
import  Patient  from "@/models/client";
import  Appointment  from "@/models/appoinments";
import { NextResponse } from "next/server";

// جلب إحصائيات عامة للـ Dashboard
export async function GET() {
  await connectDB();

  const doctorCount = await Doctor.countDocuments();
  const approvedDoctors = await Doctor.countDocuments({ isApproved: true });
  const pendingDoctors = await Doctor.countDocuments({ isApproved: false });

  const patientCount = await Patient.countDocuments();
  const appointmentCount = await Appointment.countDocuments();

  return NextResponse.json({
    totalDoctors: doctorCount,
    approvedDoctors,
    pendingDoctors,
    totalPatients: patientCount,
    totalAppointments: appointmentCount,
  });
}
