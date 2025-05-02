import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Doctor } from '@/models/doctor';

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
  await connectDB();

  try {
    const data : any = await req.json();
    const name = data.name;
    const existing = await Doctor.findOne({ name }).lean();
    if (existing) {
      return NextResponse.json(
        { message: 'name déjà utilisé.' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create and save
    const newDoctor = new Doctor(data);
    const saved=await newDoctor.save();

    return NextResponse.json(
      { message: 'Compte médecin créé avec succès.', doctor: saved },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur signup médecin :', error);
    return NextResponse.json(
      { message: 'Erreur serveur', error },
      { status: 500 }
    );
  }
}
