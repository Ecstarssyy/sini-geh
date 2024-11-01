"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PageContainer from "@/components/layout/page-container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import KulinerTable from "../kuliner-tables";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Kuliner } from "@/constants/data";
import { cn } from "@/lib/utils";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Kuliner", link: "/dashboard/kuliner" },
];

export default function KulinerListingPage() {
  const [kuliner, setKuliner] = useState<Kuliner[]>([]);
  const [totalKuliner, setTotalKuliner] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [pageSize, setPageSize] = useState(10); // Page size state
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [genderFilter, setGenderFilter] = useState<string | null>(null); // Filter state
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: pageSize,
          search: searchQuery || undefined,
          gender: genderFilter || undefined,
        };

        const response = await axios.get("/api/kuliner", { params });
        const data = response.data;

        setKuliner(data.kuliner);
        setTotalKuliner(data.totalItems);
      } catch (error) {
        console.error("Error fetching kuliner data:", error);
      } finally {
        setIsLoading(false);
      }
  }

  // Fetch data based on current pagination, search, and filters
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, searchQuery, genderFilter]);

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Kuliner (${totalKuliner})`}
            description="Manage kuliner data"
          />
          <Link
            href="/dashboard/kuliner/new"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        {/* Passing the necessary props to KulinerTable */}
        <KulinerTable
          data={kuliner}
          totalData={totalKuliner}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          isLoading={isLoading}
          onRefresh={fetchData}
        />
      </div>
    </PageContainer>
  );
}
