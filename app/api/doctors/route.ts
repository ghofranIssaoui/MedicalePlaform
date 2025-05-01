import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Doctor } from '@/models/doctor';
import { DoctorType } from '@/types/doctor';

export async function GET(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const specialty = url.searchParams.get('specialty');
    const filter = specialty ? { specialty } : {};

    const doctors = await Doctor.find(filter).lean();
    return NextResponse.json(doctors );
  } catch (error) {
    console.error('❌ Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const newDoctor = new Doctor(data);
    const savedDoctor = await newDoctor.save();
    return NextResponse.json(savedDoctor);
  } catch (error) {
    console.error('❌ Error creating doctor:', error);
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}