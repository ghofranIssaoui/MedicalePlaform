'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Search, Download, Filter, MoreHorizontal,
  Calendar, Clock, User, UserCog,
  Video, MapPin, FileText, CheckCircle, XCircle
} from 'lucide-react';
import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from '@/components/ui/pagination';
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';

interface PopulatedAppointment {
  _id: string;
  doctor: { name: string; specialty: string };
  patient: { firstName: string; email: string };
  date: string;
  time: string;
  meetingLink?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reason?: string;
  payment?: 'paid' | 'pending' | 'refunded';
  amount?: number;
  cancellationReason?: string;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<PopulatedAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string|null>(null);

  useEffect(() => {
    fetch('/api/admin/appointments')
      .then(res => {
        return res.json() as Promise<PopulatedAppointment[]>;
      })
      .then(setAppointments)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error)   return <Error />;

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">
            Manage all appointments across the platform
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {appointments.filter(a => new Date(a.date).toDateString() === new Date().toDateString()).length}
            </CardTitle>
            <p className="text-muted-foreground">Today's Appointments</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {appointments.filter(a => {
                const now = new Date();
                const week = new Date();
                week.setDate(now.getDate() + 7);
                const ad = new Date(a.date);
                return ad >= now && ad <= week;
              }).length}
            </CardTitle>
            <p className="text-muted-foreground">This Week</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {appointments.filter(a => {
                const now = new Date();
                const ad = new Date(a.date);
                return ad.getMonth() === now.getMonth() && ad.getFullYear() === now.getFullYear();
              }).length}
            </CardTitle>
            <p className="text-muted-foreground">This Month</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {appointments.filter(a => a.status === 'cancelled').length}
            </CardTitle>
            <p className="text-muted-foreground">Cancellations (This Month)</p>
          </CardHeader>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          {['all','today','upcoming','completed','cancelled'].map(val => (
            <TabsTrigger key={val} value={val}>
              {val.charAt(0).toUpperCase() + val.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search appointments..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Doctor" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="all">All Doctors</SelectItem>
              {Array.from(new Set(appointments.map(a => doctorMap[a.doctor]?.name || ''))).map(name => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))} */}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {['confirmed','completed','cancelled'].map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date &amp; Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map(a => {
              console.log(a);
              const type = a.meetingLink ? 'video' : 'in-person';
              return (
                <TableRow key={a._id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="font-medium">{a.patient.firstName}</span>
                      </div>
                      {a.reason && <span className="text-xs text-muted-foreground mt-1">{a.reason}</span>}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <UserCog className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{a.doctor.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{a.doctor.specialty}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{new Date(a.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{a.time}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center">
                      {type === 'video'
                        ? <Video className="h-4 w-4 mr-1 text-blue-500" />
                        : <MapPin className="h-4 w-4 mr-1 text-blue-500" />}
                      <span className="capitalize">{type}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant={
                      a.status === 'confirmed' ? 'outline'
                      : a.status === 'completed' ? 'secondary'
                      : 'destructive'
                    }>
                      {a.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant={
                      a.payment === 'paid' ? 'outline'
                      : a.payment === 'pending' ? 'secondary'
                      : 'destructive'
                    }>
                      ${a.amount || 0} – {a.payment || 'n/a'}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />View Details
                        </DropdownMenuItem>
                        {a.status === 'confirmed' && (
                          <>
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 mr-2" />Mark Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              <XCircle className="h-4 w-4 mr-2" />Cancel Appointment
                            </DropdownMenuItem>
                          </>
                        )}
                        {a.status === 'completed' && (
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />View Notes
                          </DropdownMenuItem>
                        )}
                        {a.status === 'cancelled' && (
                          <DropdownMenuItem>
                            <Calendar className="h-4 w-4 mr-2" />Reschedule
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination (static as before) */}
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
