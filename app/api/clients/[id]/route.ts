import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Patient from '@/models/client';

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // 1) unwrap the params promise
  const { id } = await context.params;
  try {
    await connectDB();
    const patient = await Patient.findById(id).lean();

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error('❌ Error fetching patient by ID:', error);
    return NextResponse.json({ error: 'Failed to fetch patient' }, { status: 500 });
  }
}
