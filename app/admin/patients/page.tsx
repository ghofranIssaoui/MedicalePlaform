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
  UserPlus,
  Filter,
  MoreHorizontal,
  Calendar,
  Mail,
  Phone,
  FileText,
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

export default function AdminPatientsPage() {
  // This would be fetched from the database in a real application
  const patients = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      age: 45,
      gender: "Male",
      lastVisit: "Feb 28, 2025",
      status: "active",
      appointments: 8,
    },
    {
      id: 2,
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "(555) 234-5678",
      age: 32,
      gender: "Female",
      lastVisit: "Mar 2, 2025",
      status: "active",
      appointments: 5,
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "(555) 345-6789",
      age: 58,
      gender: "Male",
      lastVisit: "Jan 15, 2025",
      status: "active",
      appointments: 12,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phone: "(555) 456-7890",
      age: 29,
      gender: "Female",
      lastVisit: "Feb 10, 2025",
      status: "inactive",
      appointments: 3,
    },
    {
      id: 5,
      name: "Robert Davis",
      email: "robert.davis@example.com",
      phone: "(555) 567-8901",
      age: 52,
      gender: "Male",
      lastVisit: "Mar 5, 2025",
      status: "active",
      appointments: 7,
    },
    {
      id: 6,
      name: "Jennifer Lee",
      email: "jennifer.lee@example.com",
      phone: "(555) 678-9012",
      age: 41,
      gender: "Female",
      lastVisit: "Feb 20, 2025",
      status: "active",
      appointments: 4,
    },
    {
      id: 7,
      name: "David Miller",
      email: "david.miller@example.com",
      phone: "(555) 789-0123",
      age: 63,
      gender: "Male",
      lastVisit: "Jan 25, 2025",
      status: "active",
      appointments: 9,
    },
    {
      id: 8,
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      phone: "(555) 890-1234",
      age: 37,
      gender: "Female",
      lastVisit: "Feb 5, 2025",
      status: "inactive",
      appointments: 2,
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Patients</h1>
          <p className="text-muted-foreground">
            Manage patient accounts and information
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/admin/patients/add">
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </Link>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle>Patient Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Patients</p>
              <p className="text-2xl font-bold">3,542</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Patients</p>
              <p className="text-2xl font-bold">3,245</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">New This Month</p>
              <p className="text-2xl font-bold">297</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Appointments</p>
              <p className="text-2xl font-bold">4.2</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
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
              <TableHead>Contact</TableHead>
              <TableHead>Age/Gender</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Appointments</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm">
                      <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      {patient.email}
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      {patient.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {patient.age} / {patient.gender}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    {patient.lastVisit}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      patient.status === "active" ? "outline" : "secondary"
                    }
                    className={
                      patient.status === "active"
                        ? "text-green-500 bg-green-50"
                        : ""
                    }
                  >
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell>{patient.appointments}</TableCell>
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
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" />
                        View Appointments
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        Deactivate Account
                      </DropdownMenuItem>
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
