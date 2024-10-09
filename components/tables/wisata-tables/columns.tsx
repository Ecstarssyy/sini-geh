'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { User, Wisata } from '@/constants/data';

export const columns: ColumnDef<Wisata>[] = [
  {
    accessorKey: 'no',
    header: 'No.'
  },
  {
    accessorKey: 'namaWisata',
    header: 'Nama Wisata'
  },
  {
    id: 'actions',
    // cell: ({ row }) => <CellAction data={row.original} />
  }
];
