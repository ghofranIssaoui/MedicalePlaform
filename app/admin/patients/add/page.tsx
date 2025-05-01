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

export default function AddPatientPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  
  // This would be connected to a real form submission in a production app
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to patients list
    router.push("/admin/patients")
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/patients">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Add New Patient</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Enter the patient's basic personal information
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
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="patient@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(555) 123-4567" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select required>
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
                    <Label htmlFor="ssn">SSN (Last 4 digits)</Label>
                    <Input id="ssn" placeholder="XXXX" maxLength={4} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select>
                      <SelectTrigger id="maritalStatus">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Enter full address" rows={3} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter city" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="Enter state" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input id="zipCode" placeholder="Enter zip code" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="Enter country" defaultValue="United States" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Emergency Contact</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border p-4 rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyName">Name</Label>
                      <Input id="emergencyName" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyRelationship">Relationship</Label>
                      <Input id="emergencyRelationship" placeholder="E.g., Spouse, Parent" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Phone Number</Label>
                      <Input id="emergencyPhone" placeholder="(555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyEmail">Email (Optional)</Label>
                      <Input id="emergencyEmail" type="email" placeholder="email@example.com" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/admin/patients")}>
                  Cancel
                </Button>
                <Button onClick={() => setActiveTab("medical")}>
                  Next: Medical History
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="medical">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
                <CardDescription>
                  Enter the patient's medical history and health information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select>
                      <SelectTrigger id="bloodType">
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a+">A+</SelectItem>
                        <SelectItem value="a-">A-</SelectItem>
                        <SelectItem value="b+">B+</SelectItem>
                        <SelectItem value="b-">B-</SelectItem>
                        <SelectItem value="ab+">AB+</SelectItem>
                        <SelectItem value="ab-">AB-</SelectItem>
                        <SelectItem value="o+">O+</SelectItem>
                        <SelectItem value="o-">O-</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" type="number" placeholder="175" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" type="number" placeholder="70" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bmi">BMI (Auto-calculated)</Label>
                    <Input id="bmi" placeholder="Calculated from height and weight" disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Allergies</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                    {["Penicillin", "Latex", "Peanuts", "Shellfish", "Eggs", "Dairy"].map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-2">
                        <Checkbox id={`allergy-${allergy.toLowerCase()}`} />
                        <label
                          htmlFor={`allergy-${allergy.toLowerCase()}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {allergy}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Other Allergies</Label>
                    <Button type="button" variant="outline" size="sm" className="h-8">
                      <Plus className="h-4 w-4 mr-1" /> Add Allergy
                    </Button>
                  </div>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-start gap-4 p-4 border rounded-md">
                      <div className="flex-1">
                        <Input placeholder="Enter allergy" />
                      </div>
                      <Button type="button" variant="ghost" size="icon" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Medical Conditions</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                    {[
                      "Diabetes",
                      "Hypertension",
                      "Asthma",
                      "Heart Disease",
                      "Cancer",
                      "Arthritis",
                      "Depression",
                      "Anxiety",
                      "COPD",
                    ].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox id={`condition-${condition.toLowerCase().replace(/\s+/g, "-")}`} />
                        <label
                          htmlFor={`condition-${condition.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Current Medications</Label>
                    <Button type="button" variant="outline" size="sm" className="h-8">
                      <Plus className="h-4 w-4 mr-1" /> Add Medication
                    </Button>
                  </div>
                  <div className="space-y-4 pt-2">
                    {[1, 2].map((index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border rounded-md">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`medication-${index}`}>Medication Name</Label>
                            <Input id={`medication-${index}`} placeholder="Enter medication name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`dosage-${index}`}>Dosage</Label>
                            <Input id={`dosage-${index}`} placeholder="E.g., 10mg" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`frequency-${index}`}>Frequency</Label>
                            <Input id={`frequency-${index}`} placeholder="E.g., Twice daily" />
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
                  <Label htmlFor="surgicalHistory">Surgical History</Label>
                  <Textarea
                    id="surgicalHistory"
                    placeholder="Enter any past surgeries and dates"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="familyHistory">Family Medical History</Label>
                  <Textarea
                    id="familyHistory"
                    placeholder="Enter relevant family medical history"
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("personal")}>
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
                  Configure the patient's account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="johnsmith" required />
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
                    <Switch id="email-verified" defaultChecked />
                    <Label htmlFor="email-verified">Email Verified</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Insurance Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                      <Select>
                        <SelectTrigger id="insuranceProvider">
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bluecross">Blue Cross Blue Shield</SelectItem>
                          <SelectItem value="aetna">Aetna</SelectItem>
                          <SelectItem value="cigna">Cigna</SelectItem>
                          <SelectItem value="united">UnitedHealthcare</SelectItem>
                          <SelectItem value="medicare">Medicare</SelectItem>
                          <SelectItem value="medicaid">Medicaid</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="none">None/Self-Pay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="policyNumber">Policy Number</Label>
                      <Input id="policyNumber" placeholder="Enter policy number" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="groupNumber">Group Number</Label>
                      <Input id="groupNumber" placeholder="Enter group number" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="policyHolder">Policy Holder (if not self)</Label>
                      <Input id="policyHolder" placeholder="Enter policy holder name" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Communication Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-notifications" defaultChecked />
                      <label
                        htmlFor="email-notifications"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email Notifications
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sms-notifications" defaultChecked />
                      <label
                        htmlFor="sms-notifications"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        SMS Notifications
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="appointment-reminders" defaultChecked />
                      <label
                        htmlFor="appointment-reminders"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Appointment Reminders
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketing-emails" />
                      <label
                        htmlFor="marketing-emails"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Marketing Emails
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Admin Notes (Internal Only)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any internal notes about this patient"
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("medical")}>
                  Previous
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Account..." : "Create Patient Account"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
