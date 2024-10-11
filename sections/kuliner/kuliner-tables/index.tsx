"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { Kuliner } from "@/constants/data";
import { columns } from "./columns";
import { GENDER_OPTIONS } from "./use-kuliner-table-filters";

interface KulinerTableProps {
  data: Kuliner[];
  totalData: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  genderFilter: string | null;
  setGenderFilter: (filter: string | null) => void;
  isLoading: boolean;
}

export default function KulinerTable({
  data,
  totalData,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  searchQuery,
  setSearchQuery,
  genderFilter,
  setGenderFilter,
  isLoading,
}: KulinerTableProps) {
  const isAnyFilterActive = !!(searchQuery || genderFilter); // Check if any filter is active

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search component */}
        {/* <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setCurrentPage}
        /> */}

        {/* Reset filter */}
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={() => {
            setSearchQuery("");
            setGenderFilter(null);
            setCurrentPage(1); // Reset to page 1
          }}
        />
      </div>

      {/* Table component */}
      <DataTable
        columns={columns}
        data={data}
        totalItems={totalData}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
      />
    </div>
  );
}
