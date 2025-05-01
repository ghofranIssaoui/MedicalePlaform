import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  User,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function DoctorAppointmentsPage() {
  // This would be fetched from the database in a real application
  const upcomingAppointments = [
    {
      id: 1,
      patientName: "John Smith",
      patientAge: 45,
      date: "Today",
      time: "10:00 AM",
      type: "video",
      status: "confirmed",
      reason: "Heart checkup",
    },
    {
      id: 2,
      patientName: "Emily Johnson",
      patientAge: 32,
      date: "Today",
      time: "2:30 PM",
      type: "in-person",
      status: "confirmed",
      reason: "Annual physical",
    },
    {
      id: 3,
      patientName: "Michael Brown",
      patientAge: 58,
      date: "Tomorrow",
      time: "11:15 AM",
      type: "video",
      status: "confirmed",
      reason: "Follow-up consultation",
    },
    {
      id: 4,
      patientName: "Sarah Wilson",
      patientAge: 29,
      date: "Mar 10, 2025",
      time: "9:00 AM",
      type: "in-person",
      status: "confirmed",
      reason: "Chest pain",
    },
  ];

  const pastAppointments = [
    {
      id: 5,
      patientName: "Robert Davis",
      patientAge: 52,
      date: "Feb 28, 2025",
      time: "3:00 PM",
      type: "video",
      status: "completed",
      reason: "Medication review",
    },
    {
      id: 6,
      patientName: "Jennifer Lee",
      patientAge: 41,
      date: "Feb 25, 2025",
      time: "10:30 AM",
      type: "in-person",
      status: "completed",
      reason: "Blood pressure check",
    },
    {
      id: 7,
      patientName: "David Miller",
      patientAge: 63,
      date: "Feb 20, 2025",
      time: "1:45 PM",
      type: "video",
      status: "completed",
      reason: "Post-surgery follow-up",
    },
  ];

  const cancelledAppointments = [
    {
      id: 8,
      patientName: "Lisa Anderson",
      patientAge: 37,
      date: "Feb 15, 2025",
      time: "11:00 AM",
      type: "in-person",
      status: "cancelled",
      reason: "Flu symptoms",
      cancellationReason: "Patient requested cancellation",
    },
    {
      id: 9,
      patientName: "Thomas Wilson",
      patientAge: 48,
      date: "Feb 10, 2025",
      time: "2:00 PM",
      type: "video",
      status: "cancelled",
      reason: "Headache consultation",
      cancellationReason: "Doctor unavailable",
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Appointments</h1>
          <p className="text-muted-foreground">
            Manage your upcoming and past appointments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input type="date" className="w-auto" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="in-person">In-person</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {upcomingAppointments.length}
            </CardTitle>
            <p className="text-muted-foreground">Upcoming Appointments</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {pastAppointments.length}
            </CardTitle>
            <p className="text-muted-foreground">Completed</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {cancelledAppointments.length}
            </CardTitle>
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
          {upcomingAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center p-6">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          {appointment.patientName}
                          <span className="text-sm text-muted-foreground">
                            ({appointment.patientAge} years)
                          </span>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.reason}
                        </p>
                      </div>
                      <Badge
                        variant={
                          appointment.status === "confirmed"
                            ? "outline"
                            : "secondary"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="text-sm">{appointment.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                      <div className="flex items-center">
                        {appointment.type === "video" ? (
                          <Video className="h-4 w-4 mr-1 text-blue-500" />
                        ) : (
                          <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                        )}
                        <span className="text-sm capitalize">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    {appointment.type === "video" && (
                      <Button>
                        <Video className="h-4 w-4 mr-2" />
                        Start Call
                      </Button>
                    )}
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Patient Records
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-500 hover:text-red-500 hover:bg-red-50"
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

        <TabsContent value="past" className="space-y-4">
          {pastAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center p-6">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          {appointment.patientName}
                          <span className="text-sm text-muted-foreground">
                            ({appointment.patientAge} years)
                          </span>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.reason}
                        </p>
                      </div>
                      <Badge
                        variant="success"
                        className="bg-green-100 text-green-800 hover:bg-green-100"
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="text-sm">{appointment.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                      <div className="flex items-center">
                        {appointment.type === "video" ? (
                          <Video className="h-4 w-4 mr-1 text-blue-500" />
                        ) : (
                          <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                        )}
                        <span className="text-sm capitalize">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Notes
                    </Button>
                    <Button>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Follow Up
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {cancelledAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center p-6">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          {appointment.patientName}
                          <span className="text-sm text-muted-foreground">
                            ({appointment.patientAge} years)
                          </span>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.reason}
                        </p>
                      </div>
                      <Badge variant="destructive">{appointment.status}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="text-sm">{appointment.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                      <div className="flex items-center">
                        {appointment.type === "video" ? (
                          <Video className="h-4 w-4 mr-1 text-blue-500" />
                        ) : (
                          <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                        )}
                        <span className="text-sm capitalize">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-red-500">
                      <span className="font-medium">Cancellation reason:</span>{" "}
                      {appointment.cancellationReason}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button>
                      <Calendar className="h-4 w-4 mr-2" />
                      Reschedule
                    </Button>
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
