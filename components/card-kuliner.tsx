import { DollarSign, MapPin, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import TombolCustom from "./tombol-custom";
import Link from "next/link";

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

interface CardKulinerProps {
  data: Kuliner;
}

function CardKuliner({ data }: CardKulinerProps) {
  return (
    <div className="flex flex-col justify-between h-full gap-8 bg-gradient-to-b from-[#E76824] to-[#4D2B28] w-[370px] py-4 px-8 text-white rounded-3xl">
      <div className="flex flex-col gap-2">
        {/* Atas */}
        <div className="flex justify-between ">
          <p className="font-bold text-2xl">{data.name}</p>
          <div className="flex border border-white w-fit h-fit rounded-md p-1 gap-1">
            <Star className="text-yellow-400 fill-yellow-400" />
            <p>{data.qualityRating}</p>
          </div>
        </div>

        {/* Gambar */}
        <Image
          className="w-full h-[200px] rounded-xl outline outline-white outline-4 mt-2"
          src={data.imageUrls[0] || "https://via.placeholder.com/370x220"}
          width={2100}
          height={1080}
          alt={data.name}
        />

        {/* Lokasi dan Harga */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex gap-2">
            <MapPin color="white" />
            <p className="line-clamp-1 w-fit">{data.address}</p>
          </div>

          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <DollarSign
                key={index}
                className={
                  index < data.priceRating ? "text-white" : "text-white/50"
                }
              />
            ))}
          </div>
        </div>

        {/* Deskripsi Singkat */}
        <p className="text-justify line-clamp-4 mt-2 text-white/80">
          {data.description}
        </p>
      </div>

      {/* Tombol Custom */}
      <div className="w-full flex justify-center items-center">
        <Link href={`/detail/${data.id}`}>
          <TombolCustom />
        </Link>
      </div>
    </div>
  );
}

export default CardKuliner;
