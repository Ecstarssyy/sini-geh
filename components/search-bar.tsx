"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface SearchFormValues {
  query: string;
}

function SearchBar() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SearchFormValues>();

  const onSubmit = (data: SearchFormValues) => {
    if (data.query) {
      router.push(`/kuliner/${encodeURIComponent(data.query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-[80%] md:w-[60%] mt-6 bg-[#FFE274] rounded-sm font-belanosima"
    >
      {/* Input Search */}
      <Input
        type="text"
        placeholder="Kamu orang mau makan apa hari ini?"
        {...register("query")}
        className="pr-10 py-8 text-base md:text-xl" // Menambahkan padding untuk ikon di kiri
      />

      {/* Search Icon */}
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 cursor-pointer" />
      </button>
    </form>
  );
}

export default SearchBar;
