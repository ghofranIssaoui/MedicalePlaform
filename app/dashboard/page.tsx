'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, Clock, Video, MapPin } from 'lucide-react';
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';

interface Appointment {
  _id: string;
  doctor: string;   // doctor ID
  patient: string;  // patient ID
  date: string;
  time: string;
  type: 'video' | 'in-person';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  reason: string;
  cancellationReason?: string;
}
interface Doctor {
  name: string;
  specialty: string;
}

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [doctorMap, setDoctorMap] = useState<Record<string, Doctor>>({});

  // TODO: replace with real logged-in patient ID
  const patientId = '6813fd941ad72ee76b8c000f';

  // 1) Load appointments
  useEffect(() => {
  let canceled = false;

  async function load() {
    try {
      const res = await fetch(
        `/api/clients/appointments?patient=${patientId}`,
        {
          credentials: 'include',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // 1) parse JSON once
      const data = await res.json();

      // 2) handle auth failures
      if (res.status === 401) {
        // redirect to login, or set an auth-specific error
        // router.push('/login');
        return;
      }

      // 3) handle any other non-OK
      if (!res.ok) {
        const msg = data.message || data.error || 'Unknown error';
        setError(`Failed to load appointments: ${msg}`);
        return; 
      }

      // 4) success!
      if (!canceled) {
        setAppointments(data);
      }
    } catch (err: any) {
      if (!canceled) {
        setError(err.message);
      }
    } finally {
      if (!canceled) {
        setLoading(false);
      }
    }
  }

  load();

  return () => {
    canceled = true;
  };
}, [patientId]);

  useEffect(() => {
    const ids = Array.from(new Set(appointments.map(a => a.doctor)));
    ids.forEach(id => {
      if (!doctorMap[id]) {
        fetch(`/api/doctors/${id}`)
          .then(res => res.json())
          .then((doc: Doctor) =>
            setDoctorMap(m => ({ ...m, [id]: { name: doc.name, specialty: doc.specialty } }))
          )
          .catch(console.error);
      }
    });
  }, [appointments, doctorMap]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  const upcomingAppointments = appointments.filter(a =>
    a.status === 'pending' || a.status === 'confirmed'
  );
  const pastAppointments = appointments.filter(a => a.status === 'completed');
  const cancelledAppointments = appointments.filter(a => a.status === 'cancelled');

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Patient Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              You have {upcomingAppointments.length} upcoming appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/appointments">
              <Button variant="outline" className="w-full">
                View All
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Medical Records</CardTitle>
            <CardDescription>Access your medical history</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/records">
              <Button variant="outline" className="w-full">
                View Records
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Find a Doctor</CardTitle>
            <CardDescription>Search for specialists near you</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/doctors">
              <Button variant="outline" className="w-full">
                Search
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
            <TabsTrigger value="past">Past Appointments</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled Appointments</TabsTrigger>
          </TabsList>

          {/* Upcoming */}
          <TabsContent value="upcoming" className="pt-4">
            <div className="grid gap-4">
              {upcomingAppointments.map(a => {
                const doc = doctorMap[a.doctor];
                return (
                  <Card key={a._id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center p-6">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {doc ? doc.name : 'Loading…'}
                          </h3>
                          <p className="text-muted-foreground">
                            {doc ? doc.specialty : ''}
                          </p>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                              <span className="text-sm">
                                {new Date(a.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-blue-500" />
                              <span className="text-sm">{a.time}</span>
                            </div>
                            <div className="flex items-center">
                              {a.type === 'video' ? (
                                <Video className="h-4 w-4 mr-1 text-blue-500" />
                              ) : (
                                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                              )}
                              <span className="text-sm capitalize">
                                {a.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                          {a.type === 'video' && <Button>Join Call</Button>}
                          <Button variant="outline">Reschedule</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Past */}
          <TabsContent value="past" className="pt-4">
            <div className="grid gap-4">
              {pastAppointments.map(a => {
                const doc = doctorMap[a.doctor];
                return (
                  <Card key={a._id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center p-6">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {doc ? doc.name : 'Loading…'}
                          </h3>
                          <p className="text-muted-foreground">
                            {doc ? doc.specialty : ''}
                          </p>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                              <span className="text-sm">
                                {new Date(a.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-blue-500" />
                              <span className="text-sm">{a.time}</span>
                            </div>
                            <div className="flex items-center">
                              {a.type === 'video' ? (
                                <Video className="h-4 w-4 mr-1 text-blue-500" />
                              ) : (
                                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                              )}
                              <span className="text-sm capitalize">
                                {a.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <Button variant="outline">View Summary</Button>
                          <Button>Book Again</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Cancelled */}
          <TabsContent value="cancelled" className="pt-4">
            <div className="grid gap-4">
              {cancelledAppointments.map(a => {
                const doc = doctorMap[a.doctor];
                return (
                  <Card key={a._id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center p-6">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {doc ? doc.name : 'Loading…'}
                          </h3>
                          <p className="text-muted-foreground">
                            {doc ? doc.specialty : ''}
                          </p>
                          {a.cancellationReason && (
                            <p className="text-sm text-red-500 mt-1">
                              Reason: {a.cancellationReason}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                              <span className="text-sm">
                                {new Date(a.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-blue-500" />
                              <span className="text-sm">{a.time}</span>
                            </div>
                            <div className="flex items-center">
                              {a.type === 'video' ? (
                                <Video className="h-4 w-4 mr-1 text-blue-500" />
                              ) : (
                                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                              )}
                              <span className="text-sm capitalize">
                                {a.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <Button variant="outline">Reschedule</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
