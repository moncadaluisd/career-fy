import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Building2, MoreHorizontal } from "lucide-react";
import { Apply } from "@/interfaces/Apply";

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
import { deleteApply, getApplies } from "@/services/appliesService";
import { LoaderContainer } from "./loader-container";
import { Link } from "react-router";
import { toast } from "sonner";
import React from "react";
import ModalManualJobOffer from "./manual-job-offer";

export const columns: ColumnDef<Apply>[] = [
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
    accessorKey: "name",
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
    accessorKey: "createdAt",
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
            status === "Offer"
              ? "default"
              : status === "Rejected"
              ? "destructive"
              : status === "Interview"
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
    id: "actions",
    cell: function ActionCell({ row }) {
      const queryClient = useQueryClient();

      const mutation = useMutation({
        mutationFn: () => deleteApply(row.original._id as string),
        onSuccess: () => {
          toast.success("Apply deleted");
          queryClient.invalidateQueries({ queryKey: ["applies"] });
        },
        onError: () => {
          toast.error("Error deleting apply");
        },
      });

      const handleDeleteApply = () => {
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
              <Link to={`/apply/${row.original._id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDeleteApply}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function ApplicationsDataTable() {
  const {
    data: applies,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["applies"],
    queryFn: getApplies,
  });

  if (isLoading) return <LoaderContainer />;
  if (isError) return <p>Error al cargar usuarios</p>;

  return (
    <React.Fragment>
      <ModalManualJobOffer onUploadSuccess={() => {
        refetch();
      }} />
      <DataTable columns={columns} data={applies as unknown as Apply[]} />
    </React.Fragment>
  )
}

