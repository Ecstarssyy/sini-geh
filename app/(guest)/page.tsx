"use client";
import Navbar from "@/components/navbar";
import Navbarberanda from "@/components/navbarberanda";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <>
        <Image
          className="absolute inset-0 w-full h-full object-cover object-[center_-100%] z-[-1]"
          src="/images/bg-motif.png"
          width={1080}
          height={1080}
          alt="motif background"
        />
      </>
      <div className="w-full flex flex-col justify-center items-center ">
        <Navbarberanda />
        <div className="flex flex-col items-center font-belanosima py-16">
          <p className="font-bold text-5xl text-center">
            <span className="text-[#FD7E56] text-6xl">The</span> only thing
            <br />
            you <span className="text-[#FFC805] text-6xl">Need</span>
          </p>
          <p className="text-xl mt-2">to know about Balam's food</p>
        </div>

        <div className="relative w-[30%] mt-6 bg-[#FFE274] rounded-sm font-belanosima bottom-16">
          {/* Input Search */}
          <Input
            type="text"
            placeholder="Kamu orang mau makan apa hari ini?"
            className="pr-10 h-20 text-xl" // Menambahkan padding untuk ikon di kiri
          />

          {/* Search Icon */}
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <MagnifyingGlassIcon
              onClick={() => router.push("/rekomendasi")}
              className="h-5 w-5 text-gray-400 hover:cursor-pointer"
            />
          </span>
        </div>

        {/* <Input  className="font-belanosima" placeholder="Kamu orang mau makan apa hari ini?"/> */}

        {/* Setengah lingkaran kuning */}
        <div className="bg-gradient-to-b from-[#E76824] to-[#4D2B28] text-white w-[100%] h-[10%] rounded-xl px-8 mt-16 py-32 pb-4">
          <p className="text-2xl font-belanosima text-center">Mengan Pai</p>
          <p className="font-belanosima text-center">
            Temukan berbagai kuliner di Bandar Lampung lengkap dengan rating,
            lokasi, jam buka, dan ulasan di Mengan Pai
          </p>
        </div>

        {/* Gambar makanan di tengah */}
        <div className="absolute bottom-20 transform ">
          <Image
            src="/images/food.png" // Ganti dengan path gambar makanan kamu
            alt="Gambar Makanan"
            width={1080}
            height={1080}
            className="rounded-full w-64"
          />
        </div>
        <div className="absolute bottom-20 transform left-1 px-32 ">
          <Image
            src="/images/food.png" // Ganti dengan path gambar makanan kamu
            alt="Gambar Makanan"
            width={1080}
            height={1080}
            className="rounded-full w-56"
          />
        </div>
        <div className="absolute bottom-20 transform right-1 px-32">
          <Image
            src="/images/food.png" // Ganti dengan path gambar makanan kamu
            alt="Gambar Makanan"
            width={1080}
            height={1080}
            className="rounded-full w-56"
          />
        </div>
        <div className="absolute bottom-30 transform left-1 px-32 z-[-1]">
          <Image
            src="/images/kokicewe.png" // Ganti dengan path gambar makanan kamu
            alt="Gambar Makanan"
            width={1080}
            height={1080}
            className="rounded-full w-96"
          />
        </div>
        <div className="absolute bottom-28 transform right-1 px-32 z-[-1]">
          <Image
            src="/images/kokicowo.png" // Ganti dengan path gambar makanan kamu
            alt="Gambar Makanan"
            width={1080}
            height={1080}
            className="rounded-full w-[500px]"
          />
        </div>
      </div>
    </>
  );
}
