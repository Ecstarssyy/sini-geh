"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Kuliner } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { format } from "date-fns";

// Fungsi untuk format tanggal
const formatDate = (seconds: number, nanoseconds: number) => {
  const date = new Date(seconds * 1000 + nanoseconds / 1000000);
  return format(date, "dd MMM yyyy");
};

export const columns: ColumnDef<Kuliner>[] = [
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
    header: "NAMA",
  },
  {
    accessorKey: "qualityRating",
    header: "RATING KUALITAS",
  },
  {
    accessorKey: "priceRating",
    header: "RATING HARGA",
  },
  {
    accessorKey: "description",
    header: "DESKRIPSI",
    cell: ({ row }) => {
      const maxLength = 50; // Batas karakter
      const description = row.original.description;
      const truncatedDescription =
        description.length > maxLength
          ? `${description.slice(0, maxLength)}...`
          : description;

      return (
        <p className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
          {truncatedDescription}
        </p>
      );
    },
  },
  {
    accessorKey: "address",
    header: "ALAMAT",
  },
  {
    accessorKey: "workingHours",
    header: "JAM KERJA",
    cell: ({ row }) => (
      <p>
        {row.original.workingHours.start} - {row.original.workingHours.stop}
      </p>
    ),
  },
  {
    accessorKey: "imageUrls",
    header: "GAMBAR",
    cell: ({ row }) => (
      <img
        src={row.original.imageUrls[0]}
        alt={row.original.name}
        style={{ width: "50px", height: "50px", objectFit: "cover" }}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
