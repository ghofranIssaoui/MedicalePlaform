import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Calendar, CreditCard, Video } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold">
            MediConnect
          </Link>
          {/* <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/doctors"
              className="text-sm font-medium hover:underline"
            >
              Find Doctors
            </Link>
            <Link
              href="/specialties"
              className="text-sm font-medium hover:underline"
            >
              Specialties
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline">
              About Us
            </Link>
          </nav> */}
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Find the right doctor and book an appointment in minutes
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect with qualified healthcare professionals for in-person or
                virtual consultations. Easy scheduling, secure payments, and
                personalized care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/doctors">
                  <Button size="lg" className="w-full sm:w-auto">
                    Find a Doctor
                  </Button>
                </Link>
                <Link href="/auth/signup?type=doctor">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Join as a Doctor
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/12.png?height=400&width=600"
                alt="Doctor consultation"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Find a Doctor</h3>
                <p className="text-muted-foreground">
                  Search by specialty, location, or availability to find the
                  right doctor for you.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Book Appointment</h3>
                <p className="text-muted-foreground">
                  Select a convenient time slot from the doctor's available
                  schedule.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Pay Online</h3>
                <p className="text-muted-foreground">
                  Secure payment processing for your consultation fees.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Video className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Virtual Consultation
                </h3>
                <p className="text-muted-foreground">
                  Connect with your doctor via Google Meet or Zoom for your
                  appointment.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">
              Popular Specialties
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Browse through our most sought-after medical specialties and find
              the right healthcare professional for your needs.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Cardiology",
                "Dermatology",
                "Orthopedics",
                "Pediatrics",
                "Neurology",
                "Psychiatry",
                "Gynecology",
                "Ophthalmology",
              ].map((specialty) => (
                <Link
                  key={specialty}
                  href={`/doctors?specialty=${specialty}`}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <h3 className="font-medium">{specialty}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 bg-slate-50">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold mb-4">MediConnect</h3>
              <p className="text-sm text-muted-foreground">
                Connecting patients with healthcare professionals for better,
                more accessible care.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">For Patients</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/doctors"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Find a Doctor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/appointments"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    My Appointments
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">For Doctors</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/signup?type=doctor"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Join as a Doctor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/doctor/dashboard"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Doctor Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/doctor/help"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} MediConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
