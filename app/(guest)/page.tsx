"use client";
import Navbarberanda from "@/components/navbarberanda";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Lock, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search-bar";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full p-0 flex flex-col justify-center items-center relative">
      <Image
        className="absolute inset-0 w-full h-full object-cover object-[top_50%] md:object-[center_-100%] z-[-1]"
        src="/images/bg-motif.png"
        width={1080}
        height={1080}
        alt="motif background"
      />

      <div className=" relative flex flex-col justify-center items-center w-full">
        <div className="flex flex-col items-center font-belanosima ">
          <p className="font-bold text-4xl md:text-5xl text-center mb-4">
            <span className="text-[#a15841] text-5xl md:text-6xl">The</span>{" "}
            only thing
            <br />
            you{" "}
            <span className="text-[#FFC805] text-5xl md:text-6xl">Need</span>
          </p>
          <p className="text-lg md:text-xl mt-2">to know about Balam's food</p>
        </div>

        <SearchBar/>
      </div>

      {/* footer */}
      <div className="w-full relative md:mt-10 lg:mt-24">
        {/* Setengah lingkaran kuning */}
        <div className="bg-gradient-to-b from-[#E76824] to-[#4D2B28] text-white w-[100%] h-fit rounded-xl px-8 mt-16 py-8 md:pt-24 lg:pt-16 pb-4 relative">
          <div className="flex justify-center gap-2 md:gap-8 ">
            {/* Gambar makanan di tengah */}
            <div className="w-fit md:absolute md:bottom-24 lg:bottom-16 md:transform md:left-1/2 md:-translate-x-1/2 ">
              <Image
                src="/images/food.png" // Ganti dengan path gambar makanan kamu
                alt="Gambar Makanan"
                width={1080}
                height={1080}
                className="rounded-full w-32 md:w-48"
              />
            </div>

            <div className="w-fit md:absolute md:bottom-28 lg:bottom-20 md:transform md:left-1 md:px-32 ">
              <Image
                src="/images/food.png" // Ganti dengan path gambar makanan kamu
                alt="Gambar Makanan"
                width={1080}
                height={1080}
                className="rounded-full w-32 md:w-36"
              />
            </div>
            <div className="w-fit md:absolute md:bottom-28 lg:bottom-20 md:transform md:right-1 md:px-32">
              <Image
                src="/images/food.png" // Ganti dengan path gambar makanan kamu
                alt="Gambar Makanan"
                width={1080}
                height={1080}
                className="rounded-full w-32 md:w-36"
              />
            </div>
          </div>
          <p className="text-2xl font-belanosima text-center">Mengan Pai</p>
          <p className="font-belanosima text-center">
            Temukan berbagai kuliner di Bandar Lampung lengkap dengan rating,
            lokasi, jam buka, dan ulasan di Mengan Pai
          </p>
        </div>

        <div className="absolute -top-16 transform -left-10 px-32 z-[-1] hidden">
          <Image
            src="/images/kokicewe.png" // Ganti dengan path gambar makanan kamu
            alt="Gambar Makanan"
            width={1080}
            height={1080}
            className=" w-[300px]"
          />
        </div>

        <div className="absolute -top-16 transform right-4 z-[-1] hidden">
          <Image
            src="/images/kokicowo.png" // Ganti dengan path gambar makanan kamu
            alt="Gambar Makanan"
            width={1080}
            height={1080}
            className=" w-[450px]"
          />
        </div>
      </div>
    </div>
  );
}
