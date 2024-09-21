"use client";
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
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex justify-between w-full">
          <div className="bg-[#E4B0A0] flex items-center font-belanosima flex-col text-center justify-center p-5">
            <Star size={48} />
            <p>
              Inpo nya detail
              <br />
              banget!
            </p>
          </div>
          <Image
            src="/images/logo.png"
            className="w-32"
            width={500}
            height={500}
            alt="Logo Mengan Pai"
          />
          <div className="bg-[#AB8500] flex items-center font-belanosima flex-col text-center justify-center p-5">
            <ThumbsUp size={48} />
            Rekomendasi
            <br />
            disini aja!
          </div>
        </div>

        <div className="flex flex-col items-center font-belanosima ">
          <p className="font-bold text-5xl text-center">
            <span className="text-[#FD7E56] text-6xl">The</span> only thing
            <br />
            you <span className="text-[#FFC805] text-6xl">Need</span>
          </p>
          <p className="text-xl mt-2">to know about Balam's food</p>
        </div>

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

        {/* <Input  className="font-belanosima" placeholder="Kamu orang mau makan apa hari ini?"/> */}

        {/* Setengah lingkaran kuning */}
        <div className="absolute bottom-0 w-[40%] h-[30%] bg-yellow-500 rounded-t-full"></div>

        {/* Gambar makanan di tengah */}
        <div className="absolute bottom-0 transform ">
          <Image
            src="/images/food.png" // Ganti dengan path gambar makanan kamu
            alt="Gambar Makanan"
            width={300}
            height={300}
            className="rounded-full w-64"
          />
        </div>
      </div>
    </>
  );
}
