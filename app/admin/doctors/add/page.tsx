"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, Plus, Trash2 } from 'lucide-react'
import Link from "next/link"

export default function AddDoctorPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  
  // This would be connected to a real form submission in a production app
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to doctors list
    router.push("/admin/doctors")
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/doctors">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Add New Doctor</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="professional">Professional Details</TabsTrigger>
            <TabsTrigger value="schedule">Availability & Fees</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Enter the doctor's basic personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center mb-4 relative">
                    <Upload className="h-8 w-8 text-slate-400" />
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Upload profile photo</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Select defaultValue="dr">
                      <SelectTrigger id="title">
                        <SelectValue placeholder="Select title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr">Dr.</SelectItem>
                        <SelectItem value="prof">Prof.</SelectItem>
                        <SelectItem value="assoc">Assoc. Prof.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="doctor@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(555) 123-4567" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input id="nationality" placeholder="Enter nationality" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Enter full address" rows={3} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/admin/doctors")}>
                  Cancel
                </Button>
                <Button onClick={() => setActiveTab("professional")}>
                  Next: Professional Details
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
                <CardDescription>
                  Enter the doctor's professional qualifications and experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Primary Specialty</Label>
                    <Select required>
                      <SelectTrigger id="specialty">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="gynecology">Gynecology</SelectItem>
                        <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subSpecialty">Sub-Specialty (Optional)</Label>
                    <Input id="subSpecialty" placeholder="E.g., Interventional Cardiology" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">Medical License Number</Label>
                    <Input id="licenseNumber" placeholder="Enter license number" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseExpiry">License Expiry Date</Label>
                    <Input id="licenseExpiry" type="date" required />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Languages Spoken</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                      {["English", "Spanish", "French", "Mandarin", "Arabic", "Hindi"].map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox id={`language-${language.toLowerCase()}`} />
                          <label
                            htmlFor={`language-${language.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {language}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Education & Training</Label>
                    <Button type="button" variant="outline" size="sm" className="h-8">
                      <Plus className="h-4 w-4 mr-1" /> Add Education
                    </Button>
                  </div>
                  <div className="space-y-4 pt-2">
                    {[1, 2].map((index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border rounded-md">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`degree-${index}`}>Degree/Certification</Label>
                            <Input id={`degree-${index}`} placeholder="E.g., MD, Fellowship" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`institution-${index}`}>Institution</Label>
                            <Input id={`institution-${index}`} placeholder="University/Hospital name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`year-${index}`}>Year Completed</Label>
                            <Input id={`year-${index}`} placeholder="YYYY" />
                          </div>
                        </div>
                        <Button type="button" variant="ghost" size="icon" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about">About / Biography</Label>
                  <Textarea
                    id="about"
                    placeholder="Enter professional biography and experience"
                    rows={5}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("personal")}>
                  Previous
                </Button>
                <Button onClick={() => setActiveTab("schedule")}>
                  Next: Availability & Fees
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Availability & Fees</CardTitle>
                <CardDescription>
                  Set the doctor's availability schedule and consultation fees
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                  <Input id="consultationFee" type="number" placeholder="150" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consultationDuration">Consultation Duration (minutes)</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="consultationDuration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Available Days & Hours</Label>
                  </div>
                  <div className="space-y-4 pt-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="flex items-center gap-4 p-4 border rounded-md">
                        <div className="flex items-center space-x-2 w-32">
                          <Checkbox id={`day-${day.toLowerCase()}`} />
                          <label
                            htmlFor={`day-${day.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {day}
                          </label>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`start-${day.toLowerCase()}`}>Start Time</Label>
                            <Input id={`start-${day.toLowerCase()}`} type="time" defaultValue="09:00" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`end-${day.toLowerCase()}`}>End Time</Label>
                            <Input id={`end-${day.toLowerCase()}`} type="time" defaultValue="17:00" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Consultation Types</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="video-consultation" defaultChecked />
                      <label
                        htmlFor="video-consultation"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Video Consultation
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="in-person" defaultChecked />
                      <label
                        htmlFor="in-person"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        In-Person Consultation
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("professional")}>
                  Previous
                </Button>
                <Button onClick={() => setActiveTab("account")}>
                  Next: Account Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Configure the doctor's account settings and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="dr.johnson" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Temporary Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" required />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Status</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="active-status" defaultChecked />
                    <Label htmlFor="active-status">Account Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="verified-status" defaultChecked />
                    <Label htmlFor="verified-status">Verified Doctor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="featured-status" />
                    <Label htmlFor="featured-status">Featured Doctor</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Insurance & Payment</h3>
                  <div className="space-y-2">
                    <Label>Accepted Insurance</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                      {[
                        "Blue Cross Blue Shield",
                        "Aetna",
                        "Cigna",
                        "UnitedHealthcare",
                        "Medicare",
                        "Medicaid",
                      ].map((insurance) => (
                        <div key={insurance} className="flex items-center space-x-2">
                          <Checkbox id={`insurance-${insurance.toLowerCase().replace(/\s+/g, "-")}`} />
                          <label
                            htmlFor={`insurance-${insurance.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {insurance}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Admin Notes (Internal Only)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any internal notes about this doctor"
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("schedule")}>
                  Previous
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Account..." : "Create Doctor Account"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
