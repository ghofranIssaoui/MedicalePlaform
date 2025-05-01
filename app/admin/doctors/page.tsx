import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Download,
  UserCog,
  Filter,
  MoreHorizontal,
  Calendar,
  Mail,
  Phone,
  FileText,
  Star,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminDoctorsPage() {
  // This would be fetched from the database in a real application
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "dr.johnson@example.com",
      phone: "(555) 123-4567",
      specialty: "Cardiology",
      rating: 4.8,
      reviews: 124,
      status: "active",
      appointments: 245,
      verified: true,
      joinDate: "Jan 15, 2023",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      email: "dr.chen@example.com",
      phone: "(555) 234-5678",
      specialty: "Dermatology",
      rating: 4.9,
      reviews: 89,
      status: "active",
      appointments: 178,
      verified: true,
      joinDate: "Mar 10, 2023",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "dr.rodriguez@example.com",
      phone: "(555) 345-6789",
      specialty: "Pediatrics",
      rating: 4.7,
      reviews: 156,
      status: "active",
      appointments: 312,
      verified: true,
      joinDate: "Feb 5, 2023",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      email: "dr.wilson@example.com",
      phone: "(555) 456-7890",
      specialty: "Orthopedics",
      rating: 4.6,
      reviews: 112,
      status: "active",
      appointments: 198,
      verified: true,
      joinDate: "Apr 20, 2023",
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      email: "dr.thompson@example.com",
      phone: "(555) 567-8901",
      specialty: "Neurology",
      rating: 4.9,
      reviews: 78,
      status: "pending",
      appointments: 0,
      verified: false,
      joinDate: "Mar 1, 2025",
    },
    {
      id: 6,
      name: "Dr. Robert Garcia",
      email: "dr.garcia@example.com",
      phone: "(555) 678-9012",
      specialty: "Psychiatry",
      rating: 4.8,
      reviews: 94,
      status: "inactive",
      appointments: 145,
      verified: true,
      joinDate: "May 12, 2023",
    },
    {
      id: 7,
      name: "Dr. Jennifer Lee",
      email: "dr.lee@example.com",
      phone: "(555) 789-0123",
      specialty: "Gynecology",
      rating: 4.7,
      reviews: 103,
      status: "active",
      appointments: 267,
      verified: true,
      joinDate: "Jun 8, 2023",
    },
    {
      id: 8,
      name: "Dr. David Miller",
      email: "dr.miller@example.com",
      phone: "(555) 890-1234",
      specialty: "Ophthalmology",
      rating: 4.5,
      reviews: 87,
      status: "pending",
      appointments: 0,
      verified: false,
      joinDate: "Mar 5, 2025",
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Doctors</h1>
          <p className="text-muted-foreground">
            Manage doctor profiles and accounts
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/admin/doctors/add">
            <Button>
              <UserCog className="h-4 w-4 mr-2" />
              Add Doctor
            </Button>
          </Link>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle>Doctor Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Doctors</p>
              <p className="text-2xl font-bold">124</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Doctors</p>
              <p className="text-2xl font-bold">112</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Approval</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Rating</p>
              <p className="text-2xl font-bold">4.7</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search doctors..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="dermatology">Dermatology</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="psychiatry">Psychiatry</SelectItem>
              <SelectItem value="gynecology">Gynecology</SelectItem>
              <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
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
              <TableHead>Name</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Appointments</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {doctor.name}
                    {doctor.verified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm">
                      <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      {doctor.email}
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      {doctor.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{doctor.rating}</span>
                    <span className="text-muted-foreground ml-1">
                      ({doctor.reviews})
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      doctor.status === "active"
                        ? "outline"
                        : doctor.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                    className={
                      doctor.status === "active"
                        ? "text-green-500 bg-green-50"
                        : doctor.status === "pending"
                        ? "text-yellow-500 bg-yellow-50"
                        : ""
                    }
                  >
                    {doctor.status}
                  </Badge>
                </TableCell>
                <TableCell>{doctor.appointments}</TableCell>
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
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" />
                        View Schedule
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {doctor.status === "pending" && (
                        <DropdownMenuItem className="text-green-500">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Doctor
                        </DropdownMenuItem>
                      )}
                      {doctor.status === "active" && (
                        <DropdownMenuItem className="text-red-500">
                          <XCircle className="h-4 w-4 mr-2" />
                          Deactivate Account
                        </DropdownMenuItem>
                      )}
                      {doctor.status === "inactive" && (
                        <DropdownMenuItem className="text-green-500">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Reactivate Account
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
  );
}
