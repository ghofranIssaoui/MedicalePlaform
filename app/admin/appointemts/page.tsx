import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Calendar,
  Clock,
  User,
  UserCog,
  Video,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminAppointmentsPage() {
  // This would be fetched from the database in a real application
  const appointments = [
    {
      id: 1,
      patientName: "John Smith",
      patientId: "P-12345",
      doctorName: "Dr. Sarah Johnson",
      doctorSpecialty: "Cardiology",
      date: "Today",
      time: "10:00 AM",
      type: "video",
      status: "confirmed",
      reason: "Heart checkup",
      payment: "paid",
      amount: 150,
    },
    {
      id: 2,
      patientName: "Emily Johnson",
      patientId: "P-23456",
      doctorName: "Dr. Michael Chen",
      doctorSpecialty: "Dermatology",
      date: "Today",
      time: "2:30 PM",
      type: "in-person",
      status: "confirmed",
      reason: "Annual physical",
      payment: "paid",
      amount: 200,
    },
    {
      id: 3,
      patientName: "Michael Brown",
      patientId: "P-34567",
      doctorName: "Dr. Emily Rodriguez",
      doctorSpecialty: "Pediatrics",
      date: "Tomorrow",
      time: "11:15 AM",
      type: "video",
      status: "confirmed",
      reason: "Follow-up consultation",
      payment: "pending",
      amount: 125,
    },
    {
      id: 4,
      patientName: "Sarah Wilson",
      patientId: "P-45678",
      doctorName: "Dr. James Wilson",
      doctorSpecialty: "Orthopedics",
      date: "Mar 10, 2025",
      time: "9:00 AM",
      type: "in-person",
      status: "confirmed",
      reason: "Chest pain",
      payment: "paid",
      amount: 175,
    },
    {
      id: 5,
      patientName: "Robert Davis",
      patientId: "P-56789",
      doctorName: "Dr. Lisa Thompson",
      doctorSpecialty: "Neurology",
      date: "Feb 28, 2025",
      time: "3:00 PM",
      type: "video",
      status: "completed",
      reason: "Medication review",
      payment: "paid",
      amount: 150,
    },
    {
      id: 6,
      patientName: "Jennifer Lee",
      patientId: "P-67890",
      doctorName: "Dr. Robert Garcia",
      doctorSpecialty: "Psychiatry",
      date: "Feb 25, 2025",
      time: "10:30 AM",
      type: "in-person",
      status: "completed",
      reason: "Blood pressure check",
      payment: "paid",
      amount: 180,
    },
    {
      id: 7,
      patientName: "David Miller",
      patientId: "P-78901",
      doctorName: "Dr. Jennifer Lee",
      doctorSpecialty: "Gynecology",
      date: "Feb 20, 2025",
      time: "1:45 PM",
      type: "video",
      status: "completed",
      reason: "Post-surgery follow-up",
      payment: "paid",
      amount: 160,
    },
    {
      id: 8,
      patientName: "Lisa Anderson",
      patientId: "P-89012",
      doctorName: "Dr. David Miller",
      doctorSpecialty: "Ophthalmology",
      date: "Feb 15, 2025",
      time: "11:00 AM",
      type: "in-person",
      status: "cancelled",
      reason: "Flu symptoms",
      payment: "refunded",
      amount: 140,
      cancellationReason: "Patient requested cancellation",
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">Manage all appointments across the platform</p>
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

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">48</CardTitle>
            <p className="text-muted-foreground">Today's Appointments</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">312</CardTitle>
            <p className="text-muted-foreground">This Week</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">1,245</CardTitle>
            <p className="text-muted-foreground">This Month</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">24</CardTitle>
            <p className="text-muted-foreground">Cancellations (This Month)</p>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Appointments</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

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
              <SelectItem value="all">All Doctors</SelectItem>
              <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
              <SelectItem value="dr-chen">Dr. Michael Chen</SelectItem>
              <SelectItem value="dr-rodriguez">Dr. Emily Rodriguez</SelectItem>
              <SelectItem value="dr-wilson">Dr. James Wilson</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
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
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="font-medium">{appointment.patientName}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{appointment.patientId}</span>
                    <span className="text-xs text-muted-foreground mt-1">{appointment.reason}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <UserCog className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{appointment.doctorName}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{appointment.doctorSpecialty}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {appointment.type === "video" ? (
                      <Video className="h-4 w-4 mr-1 text-blue-500" />
                    ) : (
                      <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                    )}
                    <span className="capitalize">{appointment.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      appointment.status === "confirmed"
                        ? "outline"
                        : appointment.status === "completed"
                          ? "secondary"
                          : "destructive"
                    }
                    className={
                      appointment.status === "confirmed"
                        ? "text-blue-500 bg-blue-50"
                        : appointment.status === "completed"
                          ? "text-green-500 bg-green-50"
                          : ""
                    }
                  >
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      appointment.payment === "paid"
                        ? "outline"
                        : appointment.payment === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                    className={
                      appointment.payment === "paid"
                        ? "text-green-500 bg-green-50"
                        : appointment.payment === "pending"
                          ? "text-yellow-500 bg-yellow-50"
                          : "text-red-500 bg-red-50"
                    }
                  >
                    ${appointment.amount} - {appointment.payment}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {appointment.status === "confirmed" && (
                        <>
                          <DropdownMenuItem>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel Appointment
                          </DropdownMenuItem>
                        </>
                      )}
                      {appointment.status === "completed" && (
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          View Notes
                        </DropdownMenuItem>
                      )}
                      {appointment.status === "cancelled" && (
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Reschedule
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
  )
}
