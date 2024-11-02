"use client";

import CardKuliner from "@/components/card-kuliner";
import React, { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";
import SearchBar from "@/components/search-bar";
import SkeletonCard from "@/components/skeleton-kuliner-card";
import Pagination from "@/components/pagination";

interface Kuliner {
  id: string;
  address: string;
  gmapsLink: string;
  workingDays: string;
  imageUrls: string[];
  name: string;
  description: string;
  qualityRating: number;
  workingHours: {
    start: string;
    stop: string;
  };
  priceRating: number;
}

function Page({ params }: { params: { name: string } }) {
  const [data, setData] = useState<Kuliner[]>([]);
  const [loading, setLoading] = useState(true);
  const decodedName = decodeURIComponent(params.name);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/kuliner?limit=6&search=${params.name}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result.kuliner); // Menyimpan data kuliner dari respons API
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <SearchBar />

      <div className="justify-center ">
        <h2 className="font-belanosima text-black-200 font-semi-bold text-2xl mb-2 text-center">
          Berikut hasil pencarian....
        </h2>
        <h1 className="font-belanosima text-[50px] text-black-800 font-bold text-2xl text-center">
          {decodedName}
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-20 justify-center items-center py-8 ">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : data.map((item) => <CardKuliner key={item.id} data={item} />)}
      </div>

      <Pagination />
    </div>
  );
}

export default Page;
