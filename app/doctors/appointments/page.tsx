'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  User,
  FileText,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Appointment {
  _id: string;
  doctor: string;
  patient: string;
  date: string;
  time: string;
  type: 'video' | 'in-person';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reason: string;
  cancellationReason?: string;
}
function PatientInfo({ patientId }: { patientId: string }) {
  // start as `null`, so we know “not yet loaded”
  const [patientName, setPatientName] = useState<string | null>(null);
    const router = useRouter();

  useEffect(() => {
    let canceled = false;

    fetch(`/api/clients/${patientId}`, {
      credentials: 'include',// ← ensures HttpOnly cookies are sent
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.status === 401) {
          // not logged in or token expired → go to login
          router.push('/auth/login');
          return Promise.reject('unauthorized');
        }
        if (!res.ok) {
          return Promise.reject(`Error ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (canceled) return;

        // Adjust this to match your API shape!
        // If your endpoint returns { patient: { name: "…" } },
        // then do data.patient.name
        const name = `${data.lastName} ${data.firstName}` ;
        setPatientName(name || "Unknown");
      })
      .catch(err => {
        console.error(err);
        if (!canceled) setPatientName("Unknown");
      });

    return () => {
      canceled = true;
    };
  }, [patientId]);

  if (patientName === null) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading patient…
      </p>
    );
  }

  return (
    <h3 className="font-semibold text-lg flex items-center gap-2">
      <User className="h-5 w-5 text-muted-foreground" />
      {patientName}
    </h3>
  );
}

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filterDate, setFilterDate] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'video' | 'in-person'>('all');

  // const patientId = '6813fd941ad72ee76b8c000f';
  const doctorId = '67f7cec1eb20a9e49ab01c34';

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/doctors/appointments?doctor=${doctorId}`);
        const data = await res.json();
        if (!res.ok) {
          setError("Failed to load appointments. Please try again later.");
        } else {
          setAppointments(data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [doctorId]);


  // // fetch all unique doctors once appointments arrive
  // useEffect(() => {
  //   const ids = Array.from(new Set(appointments.map(a => a.patient)));
  //   ids.forEach(id => {
  //       fetch(`/api/clients/${id}`)
  //         .then(res => res.json())
          
  //         .catch(() => {
  //           // swallow errors or you can set some fallback
  //         });
  //   });
  // }, [appointments]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  const filtered = appointments.filter(a => {
    if (filterDate && a.date.split('T')[0] !== filterDate) return false;
    if (filterType !== 'all' && a.type !== filterType) return false;
    return true;
  });

  const upcoming  = filtered.filter(a => a.status === 'pending' || a.status === 'confirmed');
  const past      = filtered.filter(a => a.status === 'completed');
  const cancelled = filtered.filter(a => a.status === 'cancelled');

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Schedule</h1>
          <p className="text-muted-foreground">Manage your upcoming and past appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            className="w-auto"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{upcoming.length}</CardTitle>
            <p className="text-muted-foreground">Upcoming</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{past.length}</CardTitle>
            <p className="text-muted-foreground">Completed</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{cancelled.length}</CardTitle>
            <p className="text-muted-foreground">Cancelled</p>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcoming.map(a => (
            <Card key={a._id}>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center p-6">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <PatientInfo patientId={a.patient} />
                      <Badge variant={a.status === 'confirmed' ? 'outline' : 'secondary'}>
                        {a.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4">
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
                        <span className="text-sm capitalize">{a.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    
                    <Button
                      variant="outline"
                      className="text-red-500 hover:text-red-500 hover:bg-red-50"
                      onClick={async () => {
                        try {
                          const res = await fetch('/api/clients/appointments', {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: a._id, status: 'cancelled' }),
                          });
                          if (!res.ok) {
                            const err = await res.json();
                            setError(err.message || 'Failed to update status');
                          } else {
                            setAppointments(prev =>
                              prev.map(appt =>
                                appt._id === a._id
                                  ? { ...appt, status: 'cancelled' }
                                  : appt
                              )
                            );
                            window.location.reload()
                          }
                        } catch (e: any) {
                          setError(e.message);
                        }
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Past */}
        <TabsContent value="past" className="space-y-4">
          {past.map(a => (
            <Card key={a._id}>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center p-6">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <PatientInfo patientId={a.patient} />
                      <Badge variant="success" className="bg-green-100 text-green-800">
                        {a.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4">
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
                        <span className="text-sm capitalize">{a.type}</span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Notes
                    </Button>
                    <Button>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Follow Up
                    </Button>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Cancelled */}
        <TabsContent value="cancelled" className="space-y-4">
          {cancelled.map(a => (
            <Card key={a._id}>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center p-6">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <PatientInfo patientId={a.patient} />
                      <Badge variant="destructive">{a.status}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-2">
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
                        <span className="text-sm capitalize">{a.type}</span>
                      </div>
                    </div>
                    {a.cancellationReason && (
                      <div className="text-sm text-red-500">
                        <span className="font-medium">Cancellation reason:</span>{' '}
                        {a.cancellationReason}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
