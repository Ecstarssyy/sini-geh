"use client";

import CardKuliner from "@/components/card-kuliner";
import Pagination from "@/components/pagination";
import React from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center py-2">
        <div className="relative w-96 mt-6 bg-[#FFE274] rounded-sm font-belanosima">
          {/* Input Search */}
          <Input
            type="text"
            placeholder="Kamu orang mau makan apa hari ini?"
            className="pr-10" // Menambahkan padding untuk ikon di kiri
          />

          {/* Search Icon */}
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <MagnifyingGlassIcon
              onClick={() => router.push("/rekomendasi")}
              className="h-5 w-5 text-gray-400 hover:cursor-pointer"
            />
          </span>
        </div>

        <div className="justify-center py-10">
          <h1 className="font-belanosima text-[50px] text-black-800 font-bold text-2xl mb-2 text-center">
            BAKSO
          </h1>
          <h2 className="font-belanosima text-black-200 font-semi-bold text-2xl mb-5 text-center">
            Berikut rekomendasinya....
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-20 justify-center items-center py-2 ">
        <CardKuliner />
        <CardKuliner />
        <CardKuliner />
      </div>

      <div className="flex flex-wrap gap-20 justify-center items-center py-8 ">
        <CardKuliner />
        <CardKuliner />
        <CardKuliner />
      </div>

      <Pagination />
    </div>
  );
}

export default Page;
