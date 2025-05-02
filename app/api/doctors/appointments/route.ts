// app/api/appointments/route.ts 
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Appointment from '@/models/appointments';


export async function GET(req: NextRequest) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const doctor = searchParams.get('doctor');

    if (!doctor) {
        return NextResponse.json(
        { message: 'Missing required query param: doctor' },
        { status: 400 }
        );
    }

    try {
        const appointments = await Appointment.find({ doctor })
        .sort({ date: 1, time: 1 })
        .lean();
        return NextResponse.json(appointments, { status: 200 });
    } catch (err) {
        console.error('Error fetching appointments:', err);
        return NextResponse.json(
        { message: 'Could not fetch appointments' },
        { status: 500 }
        );
    }
}

