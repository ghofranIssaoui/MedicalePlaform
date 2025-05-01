import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Calendar, Video, CreditCard } from "lucide-react";
import { useEffect } from "react";
import { DoctorType } from "@/types/doctor";

export default async function DoctorProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`http://localhost:3000/api/doctors/${params.id}`);

  if (!res.ok) {
    return <div>Doctor not found</div>;
  }

  const doctor: DoctorType = await res.json();
  // ! This would be fetched from the database in a real application
  // const doctorr = {

  //   name: "Dr. Sarah Johnson",
  //   specialty: "Cardiology",
  //   subSpecialty: "Interventional Cardiology",
  //   location: "New York Medical Center, New York, NY",
  //   rating: 4.8,
  //   reviews: 124,
  //   image: "/doctor2.png?height=300&width=300",
  //   about:
  //     "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in interventional cardiology and has performed over 1,000 cardiac catheterizations and stent placements.",
  //   education: [
  //     { degree: "MD", institution: "Harvard Medical School", year: "2005" },
  //     { degree: "Residency in Internal Medicine", institution: "Massachusetts General Hospital", year: "2008" },
  //     { degree: "Fellowship in Cardiology", institution: "Johns Hopkins Hospital", year: "2011" },
  //   ],
  //   languages: ["English", "Spanish"],
  //   insurances: ["Blue Cross Blue Shield", "Aetna", "Cigna", "UnitedHealthcare"],
  //   availableDates: [
  //     { date: "Today", slots: ["10:00 AM", "2:30 PM"] },
  //     { date: "Tomorrow", slots: ["9:00 AM", "11:30 AM", "3:00 PM"] },
  //     { date: "Wed, Mar 5", slots: ["10:00 AM", "1:00 PM", "4:30 PM"] },
  //   ],
  //   consultationFee: 150,
  // }
  // const doctor = await createDoctor(doctorr);
  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-[150px] h-[150px] rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={doctor.image || "/placeholder.svg"}
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

          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-4 pt-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p>{doctor.about}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((language) => (
                    <Badge key={language} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Insurance Accepted</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.insurances.map((insurance) => (
                    <Badge key={insurance} variant="outline">
                      {insurance}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="experience" className="space-y-4 pt-4">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Education & Training
                </h2>
                <div className="space-y-4">
                  {doctor.education.map((edu, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-blue-500 pl-4 py-1"
                    >
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-muted-foreground">
                        {edu.institution}, {edu.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-2">Patient Reviews</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {doctor.rating}
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(doctor.rating)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {doctor.reviews} reviews
                    </div>
                  </div>
                  <div className="flex-1">
                    {/* This would be a breakdown of ratings by star count */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-8">5 ★</span>
                        <div className="h-2 bg-gray-200 rounded-full flex-1">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                        <span className="text-sm w-8">75%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-8">4 ★</span>
                        <div className="h-2 bg-gray-200 rounded-full flex-1">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: "20%" }}
                          ></div>
                        </div>
                        <span className="text-sm w-8">20%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-8">3 ★</span>
                        <div className="h-2 bg-gray-200 rounded-full flex-1">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: "5%" }}
                          ></div>
                        </div>
                        <span className="text-sm w-8">5%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-8">2 ★</span>
                        <div className="h-2 bg-gray-200 rounded-full flex-1">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                        <span className="text-sm w-8">0%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-8">1 ★</span>
                        <div className="h-2 bg-gray-200 rounded-full flex-1">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                        <span className="text-sm w-8">0%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sample reviews */}
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">John D.</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Visited for: Heart Checkup - 2 months ago
                      </p>
                      <p>
                        Dr. Johnson was very thorough and took the time to
                        explain everything to me. I felt very comfortable and
                        well-cared for during my visit.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">Maria S.</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < 4 ? "text-yellow-500" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Visited for: Consultation - 3 weeks ago
                      </p>
                      <p>
                        Great doctor with excellent bedside manner. The wait
                        time was a bit long, but the quality of care made up for
                        it.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="location" className="pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-2">
                  Practice Location
                </h2>
                <div className="bg-slate-100 h-[300px] rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Map would be displayed here
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    New York Medical Center
                  </h3>
                  <p className="text-muted-foreground">
                    123 Medical Plaza, New York, NY 10001
                  </p>
                  <p className="text-muted-foreground">Phone: (212) 555-1234</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Book an Appointment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
                  <span>Consultation Fee</span>
                </div>
                <span className="font-semibold">${doctor.consultationFee}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">Select Date & Time</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {doctor.availableDates.map((dateObj, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-white border rounded-lg p-2 cursor-pointer hover:border-blue-500">
                        <div className="font-medium">{dateObj.date}</div>
                        <div className="text-xs text-muted-foreground">
                          {dateObj.slots.length} slots
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">
                    Available Time Slots
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {doctor.availableDates[0].slots.map((slot, index) => (
                      <div
                        key={index}
                        className="text-center border rounded-lg p-2 cursor-pointer hover:border-blue-500"
                      >
                        <div className="text-sm">{slot}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Video className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">Consultation Type</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 flex flex-col items-center">
                    <Video className="h-5 w-5 mb-1" />
                    <span className="text-sm">Video Call</span>
                  </div>
                  <div className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 flex flex-col items-center">
                    <MapPin className="h-5 w-5 mb-1" />
                    <span className="text-sm">In-Person</span>
                  </div>
                </div>
              </div>

              <Link href="/doctors/appointements">
                <CardTitle className="hover:underline cursor-pointer">
                  Book an Appointment
                </CardTitle>
              </Link>

              <div className="text-xs text-center text-muted-foreground">
                <Clock className="h-3 w-3 inline mr-1" />
                Appointments typically last 30 minutes
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
