// app/doctors/[id]/BookingForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CreditCard } from 'lucide-react';
import { DoctorType } from '@/types/doctor';
import { toast } from 'react-toastify';

interface Props {
    doctor: DoctorType;
    patientId: string;
}

export default function BookingForm({ doctor, patientId }: Props) {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentSlots =
        doctor.availableDates.find((d) => d.date === selectedDate)
        ?.slots || [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedSlot) {
        toast.error('Please select date and time');
        return;
        }

        setIsSubmitting(true);
        try {
        const res = await fetch('/api/clients/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            doctor: doctor._id,
            patient: patientId,
            date: selectedDate,
            time: selectedSlot,
            }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Booking failed');

        // toast.success('Appointment booked!');
        router.push(`/doctors/appointments`);
        } catch (err: any) {
        toast.error(err.message);
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <Card>
            <CardHeader>
            <CardTitle>Book an Appointment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
            {/* Fee */}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
                <span>Consultation Fee</span>
                </div>
                <span className="font-semibold">
                ${doctor.consultationFee}
                </span>
            </div>

            {/* Date picker */}
            <div className="space-y-2">
                <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                <span className="font-medium">Select Date</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                {doctor.availableDates.map((d, i) => (
                    <button
                    key={i}
                    type="button"
                    onClick={() => {
                        setSelectedDate(d.date);
                        setSelectedSlot('');
                    }}
                    className={`text-center border rounded-lg p-2 cursor-pointer hover:border-blue-500 ${
                        d.date === selectedDate
                        ? 'bg-blue-100 border-blue-500'
                        : 'bg-white'
                    }`}
                    >
                    <div className="font-medium">{d.date}</div>
                    <div className="text-xs text-muted-foreground">
                        {d.slots.length} slots
                    </div>
                    </button>
                ))}
                </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
                <div className="space-y-2">
                <h4 className="text-sm font-medium">
                    Available Time Slots
                </h4>
                <div className="grid grid-cols-3 gap-2">
                    {currentSlots.map((slot, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`text-center border rounded-lg p-2 cursor-pointer hover:border-blue-500 ${
                        slot === selectedSlot
                            ? 'bg-blue-100 border-blue-500'
                            : 'bg-white'
                        }`}
                    >
                        <div className="text-sm">{slot}</div>
                    </button>
                    ))}
                </div>
                </div>
            )}

            {/* Submit */}
            <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Booking…' : 'Book Appointment'}
                </Button>
            </div>

            {/* Footer note */}
            <div className="text-xs text-center text-muted-foreground">
                <Clock className="h-3 w-3 inline mr-1" />
                24/7 Online Booking — Appointments last ~30 minutes
            </div>
            </CardContent>
        </Card>
        </form>
    );
}
