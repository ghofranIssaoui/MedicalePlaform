import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Video, MapPin } from "lucide-react"

export default function DashboardPage() {
  // This would be fetched from the database in a real application
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "Today",
      time: "10:00 AM",
      type: "video",
      status: "confirmed",
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "Mar 10, 2025",
      time: "2:30 PM",
      type: "in-person",
      status: "confirmed",
    },
  ]

  const pastAppointments = [
    {
      id: 3,
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      date: "Feb 15, 2025",
      time: "11:00 AM",
      type: "video",
      status: "completed",
    },
    {
      id: 4,
      doctorName: "Dr. James Wilson",
      specialty: "Orthopedics",
      date: "Jan 22, 2025",
      time: "3:00 PM",
      type: "in-person",
      status: "completed",
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Patient Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>You have {upcomingAppointments.length} upcoming appointments</CardDescription>
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
          </TabsList>
          <TabsContent value="upcoming" className="pt-4">
            <div className="grid gap-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center p-6">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
                        <p className="text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex flex-wrap gap-4 mt-2">
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
                            <span className="text-sm capitalize">{appointment.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 md:mt-0">
                        {appointment.type === "video" && <Button>Join Call</Button>}
                        <Button variant="outline">Reschedule</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past" className="pt-4">
            <div className="grid gap-4">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center p-6">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
                        <p className="text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex flex-wrap gap-4 mt-2">
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
                            <span className="text-sm capitalize">{appointment.type}</span>
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
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

