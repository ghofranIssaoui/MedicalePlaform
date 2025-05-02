// app/api/appointments/route.ts 
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Appointment from '@/models/appointments';

const ALLOWED_STATUSES = ['pending', 'confirmed', 'cancelled', 'completed'] as const;

export async function POST(req: NextRequest) {
    await connectDB();

    let body: {
        doctor?: string;
        patient?: string;
        date?: string;
        time?: string;
        status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
        meetingLink?: string;
    };

    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json(
        { message: 'Invalid JSON body' },
        { status: 400 }
        );
    }

    const { doctor, patient, date, time, status, meetingLink } = body;

    // Basic validation
    if (!doctor || !patient || !date || !time) {
        return NextResponse.json(
        { message: 'Missing one of required fields: doctor, patient, date, time' },
        { status: 400 }
        );
    }
    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
        return NextResponse.json(
        { message: 'Invalid date format' },
        { status: 400 }
        );
    }
    try {
        const newAppointment = await Appointment.create({
        doctor,
        patient,
        date: appointmentDate,
        time,
        status,
        meetingLink, 
        });

        return NextResponse.json(newAppointment, { status: 201 });
    } catch (err) {
        console.error('Error creating appointment:', err);
        return NextResponse.json(
        { message: 'Could not create appointment' },
        { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const patient = searchParams.get('patient');

    if (!patient) {
        return NextResponse.json(
        { message: 'Missing required query param: patient' },
        { status: 400 }
        );
    }

    try {
        const appointments = await Appointment.find({ patient })
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


export async function PATCH(req: NextRequest) {
    await connectDB();

    let body: {
        id?: string;
        status?: typeof ALLOWED_STATUSES[number];
    };

    try {
        body = await req.json();
    } catch {
        return NextResponse.json(
        { message: 'Invalid JSON body' },
        { status: 400 }
        );
    }

    const { id, status } = body;
    if (!id || !status) {
        return NextResponse.json(
        { message: 'Missing required fields: id and status' },
        { status: 400 }
        );
    }
    if (!ALLOWED_STATUSES.includes(status)) {
        return NextResponse.json(
        { message: `Invalid status. Must be one of: ${ALLOWED_STATUSES.join(', ')}` },
        { status: 400 }
        );
    }

    try {
        const updated = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true }
        ).lean();
        if (!updated) {
        return NextResponse.json(
            { message: 'Appointment not found' },
            { status: 404 }
        );
        }
        return NextResponse.json(updated, { status: 200 });
    } catch (err) {
        console.error('Error updating appointment status:', err);
        return NextResponse.json(
        { message: 'Could not update appointment status' },
        { status: 500 }
        );
    }
}