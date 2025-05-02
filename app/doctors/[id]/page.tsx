// app/doctors/[id]/page.tsx
// "use client";

import { notFound } from 'next/navigation';
import { DoctorType } from '@/types/doctor';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Star,
  Clock,
  Calendar,
} from 'lucide-react';
import BookingForm from './BookingForm';

interface Props {
  params: { id: string };
}

export default async function DoctorProfilePage({ params: { id } }: Props) {
  // fetch doctor data from your API
  const res = await fetch(
    `http://localhost:3000/api/doctors/${id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    // show a 404 if not found
    notFound();
  }

  const doctor: DoctorType = await res.json();

  // TODO: replace with real patientId from your auth/session
  const patientId = '6813fd941ad72ee76b8c000f';

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        {/* ————————————— Left Column: Doctor Info ————————————— */}
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-[150px] h-[150px] rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={doctor.image || '/placeholder.svg'}
                alt={doctor.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold">{doctor.name}</h1>
                <p className="text-lg text-muted-foreground">
                  {doctor.specialty}
                </p>
                {doctor.subSpecialty && (
                  <Badge variant="outline" className="mt-1">
                    {doctor.subSpecialty}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span>
                    {doctor.rating} ({doctor.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-1" />
                  <span className="text-muted-foreground">
                    {doctor.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs: About / Experience / Reviews / Location */}
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4 pt-4">
              <h2 className="text-xl font-semibold">About</h2>
              <p>{doctor.about}</p>

              <h3 className="font-semibold">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>

              <h3 className="font-semibold">Insurance Accepted</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.insurances.map((ins) => (
                  <Badge key={ins} variant="outline">
                    {ins}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">
                Education & Training
              </h2>
              <div className="space-y-4">
                {doctor.education.map((edu, i) => (
                  <div
                    key={i}
                    className="border-l-2 border-blue-500 pl-4 py-1"
                  >
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-muted-foreground">
                      {edu.institution}, {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="pt-4">
              <h2 className="text-xl font-semibold mb-2">
                Patient Reviews
              </h2>
              {/* … your reviews UI … */}
            </TabsContent>

            <TabsContent value="location" className="pt-4">
              <h2 className="text-xl font-semibold mb-2">
                Practice Location
              </h2>
              <div className="bg-slate-100 h-[300px] rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map placeholder</p>
              </div>
              <div>
                <h3 className="font-semibold">New York Medical Center</h3>
                <p className="text-muted-foreground">
                  123 Medical Plaza, New York, NY 10001
                </p>
                <p className="text-muted-foreground">
                  Phone: (212) 555-1234
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* ————————————— Right Column: Booking Form ————————————— */}
        <BookingForm doctor={doctor} patientId={patientId} />
      </div>
    </div>
  );
}
