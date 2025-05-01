import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  UserCog,
  Calendar,
  CreditCard,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart4,
  PieChart,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Platform overview and management
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Link href="/admin/doctors/add">
            <Button>
              <UserCog className="h-4 w-4 mr-2" />
              Add New Doctor
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Doctors</CardDescription>
            <CardTitle className="text-2xl">124</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>12% increase this month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Patients</CardDescription>
            <CardTitle className="text-2xl">3,542</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>8% increase this month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Appointments (This Month)</CardDescription>
            <CardTitle className="text-2xl">1,245</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>15% increase vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue (This Month)</CardDescription>
            <CardTitle className="text-2xl">$48,295</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-red-500">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span>3% decrease vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Link href="/admin/doctors" className="block">
          <Card className="h-full hover:border-blue-500 transition-colors">
            <CardHeader>
              <UserCog className="h-8 w-8 mb-2 text-blue-500" />
              <CardTitle>Manage Doctors</CardTitle>
              <CardDescription>
                View and manage doctor profiles, specialties, and availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between mb-1">
                  <span>Active doctors:</span>
                  <span className="font-medium">112</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Pending approval:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Inactive:</span>
                  <span className="font-medium">8</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/patients" className="block">
          <Card className="h-full hover:border-blue-500 transition-colors">
            <CardHeader>
              <Users className="h-8 w-8 mb-2 text-blue-500" />
              <CardTitle>Manage Patients</CardTitle>
              <CardDescription>
                View and manage patient accounts and medical records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between mb-1">
                  <span>Active patients:</span>
                  <span className="font-medium">3,245</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>New this month:</span>
                  <span className="font-medium">297</span>
                </div>
                <div className="flex justify-between">
                  <span>With appointments:</span>
                  <span className="font-medium">1,842</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/appointments" className="block">
          <Card className="h-full hover:border-blue-500 transition-colors">
            <CardHeader>
              <Calendar className="h-8 w-8 mb-2 text-blue-500" />
              <CardTitle>Manage Appointments</CardTitle>
              <CardDescription>
                View and manage all appointments across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between mb-1">
                  <span>Today's appointments:</span>
                  <span className="font-medium">48</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>This week:</span>
                  <span className="font-medium">312</span>
                </div>
                <div className="flex justify-between">
                  <span>Cancellations (this month):</span>
                  <span className="font-medium">24</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Appointments Overview</CardTitle>
              <BarChart4 className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
              <p className="text-muted-foreground">
                Appointments chart would be displayed here
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue by Specialty</CardTitle>
              <PieChart className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
              <p className="text-muted-foreground">
                Revenue chart would be displayed here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <UserCog className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">New doctor registered</p>
                <p className="text-sm text-muted-foreground">
                  Dr. Michael Chen (Dermatology) created an account
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Activity className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium">Platform update deployed</p>
                <p className="text-sm text-muted-foreground">
                  Video consultation feature improvements
                </p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-2 rounded-full">
                <CreditCard className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="font-medium">Payment issue resolved</p>
                <p className="text-sm text-muted-foreground">
                  Fixed payment processing for international cards
                </p>
                <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="font-medium">New patient milestone</p>
                <p className="text-sm text-muted-foreground">
                  Platform reached 3,500 registered patients
                </p>
                <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
