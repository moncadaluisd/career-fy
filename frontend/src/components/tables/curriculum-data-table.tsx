import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, FileText, MoreHorizontal } from "lucide-react";
import { Curriculum } from "@/interfaces/Curriculum";

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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCurriculum, getCurriculums } from "@/services/curriculumService";
import { LoaderContainer } from "../loader-container";
import { Link } from "react-router";
import { toast } from "sonner";
import React, { Suspense } from "react";

export const columns: ColumnDef<Curriculum>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString();
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge
          variant={
            status === "Approved"
              ? "default"
              : status === "Rejected"
              ? "destructive"
              : status === "Reviewing"
              ? "outline"
              : "secondary"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "usedIn",
    header: "Used In",
    cell: ({ row }) => {
      const usedIn = row.getValue("usedIn") as number;
      return <span>{usedIn || 0} application(s)</span>;
    },
  },
  {
    id: "actions",
    cell: function ActionCell({ row }) {
      const queryClient = useQueryClient();

      const mutation = useMutation({
        mutationFn: () => deleteCurriculum(row.original._id as string),
        onSuccess: () => {
          toast.success("Curriculum deleted");
          queryClient.invalidateQueries({ queryKey: ["curriculums"] });
        },
        onError: () => {
          toast.error("Error deleting curriculum");
        },
      });

      const handleDeleteCurriculum = () => {
        mutation.mutate();
      };

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
            <DropdownMenuItem>
              <Link to={`/curriculum/${row.original._id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href={row.original.path} target="_blank" rel="noopener noreferrer">
                Download PDF
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDeleteCurriculum}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function CurriculumDataTable() {
  const {
    data: curriculums,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["curriculums"],
    queryFn: getCurriculums,
  });

  if (isLoading) return <LoaderContainer />;
  if (isError) return <p>Error loading curriculums</p>;

  return (
    <React.Fragment>
      <Suspense fallback={<LoaderContainer />}>
        <DataTable columns={columns} data={curriculums?.data as unknown as Curriculum[]} />
      </Suspense>
    </React.Fragment>
  );
}
