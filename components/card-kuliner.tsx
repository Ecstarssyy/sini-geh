import { DollarSign, MapPin, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import TombolCustom from "./tombol-custom";

function CardKuliner() {
  return (
    <div className="flex flex-col gap-3 bg-gradient-to-b from-[#E76824] to-[#4D2B28] w-[350px] py-4 px-8 text-white rounded-3xl">
      {/* Atas */}
      <div className="flex justify-between items-center ">
        <p className="font-bold text-2xl">BAKSO</p>
        <div className="flex border border-white w-fit rounded-md p-1 gap-1">
          <Star className="text-yellow-400 fill-yellow-400" />
          <p>4.3</p>
        </div>
      </div>

      {/* Gambar */}
      <Image
        className="w-full rounded-xl outline outline-white outline-4"
        src="https://assets.unileversolutions.com/recipes-v2/245281.jpg"
        width={2100}
        height={1080}
        alt="Bakso"
      />

      {/* Lokasi dan Harga */}
      <div className="flex justify-between ">
        <div className="flex">
          <MapPin color="white" />
          <p>Belwis</p>
        </div>

        <div className=" flex">
          <DollarSign className="text-white" />
          <DollarSign className="text-white" />
          <DollarSign className="text-white/50" />
          <DollarSign className="text-white/50" />
          <DollarSign className="text-white/50" />
        </div>
      </div>

      {/* Deskripsi Singkat */}
      <p className="text-justify line-clamp-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et qui sit
        modi, cumque minima veritatis laboriosam recusandae at perspiciatis
        asperiores quis dolorum molestiae necessitatibus fuga incidunt fugit
        debitis corporis voluptas laudantium vero blanditiis fugiat iste alias
        quasi. Voluptatem, fugiat! Est?
      </p>

      {/* Tombol Custom */}
      <div className="w-full flex justify-center items-center">
        <TombolCustom />
      </div>
    </div>
  );
}

export default CardKuliner;
