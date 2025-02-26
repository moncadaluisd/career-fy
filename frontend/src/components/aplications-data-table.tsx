import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Building2, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
// Application type definition
type Application = {
  id: string;
  company: string;
  position: string;
  date: string;
  status: "Applied" | "Interview" | "Rejected" | "Offer";
  cv: string;
};

// Sample data
const applications: Application[] = [
  {
    id: "1",
    company: "Acme Inc",
    position: "Frontend Developer",
    date: "2024-02-25",
    status: "Applied",
    cv: "Software Engineer CV",
  },
  {
    id: "2",
    company: "Globex Corp",
    position: "Full Stack Engineer",
    date: "2024-02-24",
    status: "Interview",
    cv: "Full Stack Developer CV",
  },
  {
    id: "3",
    company: "Hooli",
    position: "Senior React Developer",
    date: "2024-02-23",
    status: "Rejected",
    cv: "Tech Lead CV",
  },
  {
    id: "4",
    company: "Initech",
    position: "Software Engineer",
    date: "2024-02-22",
    status: "Offer",
    cv: "Software Engineer CV",
  },
  // Add more sample data here...
];

export const columns: ColumnDef<Application>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "company",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("company")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Applied
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toLocaleDateString();
    },
  },
  {
    accessorKey: "cv",
    header: "CV Used",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge
          variant={
            status === "Offer"
              ? "success"
              : status === "Rejected"
              ? "destructive"
              : status === "Interview"
              ? "warning"
              : "secondary"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function ApplicationsDataTable() {
  return <DataTable columns={columns} data={applications} />;
}

