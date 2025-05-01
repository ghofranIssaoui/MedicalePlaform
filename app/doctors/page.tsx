"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Calendar } from "lucide-react";
import { DoctorType } from "@/types/doctor";
import { useSearchParams } from "next/navigation";

export default function DoctorsPage() {
  const searchParams = useSearchParams();

  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [rating, setRating] = useState("");
  const [doctors, setDoctors] = useState<DoctorType[]>([]);

  const applyFilters = async () => {
    const query = new URLSearchParams();
    if (specialty) query.append("specialty", specialty);
    if (location) query.append("location", location);
    if (availability) query.append("availability", availability);
    if (rating) query.append("rating", rating);

    const res = await fetch(`/api/doctors?${query.toString()}`, {
      cache: "no-store",
    });
    const data = await res.json();
      console.log("Résultat API:", data);
    setDoctors(data);
    
  };
  type Props = {
    searchParams: {
      specialty?: string;
    };
  };  

  // Initialiser specialty depuis l'URL
  useEffect(() => {
    const initialSpecialty = searchParams.get("specialty") || "";
    setSpecialty(initialSpecialty);
  }, [searchParams]);

  // Charger la liste des médecins quand les filtres changent
  useEffect(() => {
    applyFilters();
  }, [specialty, location, availability, rating]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Find a Doctor</h1>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="font-medium mb-4">Filter Results</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Specialty
                </label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Location
                </label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city or zip code"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Availability
                </label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="this-week">This week</SelectItem>
                    <SelectItem value="next-week">Next week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Rating</label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any rating</SelectItem>
                    <SelectItem value="4plus">4+ stars</SelectItem>
                    <SelectItem value="4.5plus">4.5+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {doctors.length} doctors
            </p>
          </div>

          <div className="space-y-4">
            {doctors.map((doctor) => (
              <Card key={doctor._id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-[150px] h-[150px] relative">
                      <img
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold">{doctor.name}</h3>
                          <p className="text-muted-foreground">
                            {doctor.specialty}
                          </p>
                          <div className="flex items-center mt-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm text-muted-foreground">
                              {doctor.location}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">
                              {doctor.rating} ({doctor.reviews} reviews)
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="text-sm">
                            <Calendar className="h-4 w-4 inline mr-1 text-blue-500" />
                            {doctor.availableDates[0]?.date?.toString()}
                          </div>
                          <Link href={`/doctors/${doctor._id}`}>
                            <Button className="w-full">View Profile</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
