import CardKuliner from "@/components/card-kuliner";
import TombolCustom2 from "@/components/tombol-custom2";
import React from "react";
import Image from "next/image";

function Page() {
  return (
    <div> 
      <div className="bg-gradient-to-l from-[#E76824] to-[#4D2B28] rounded-3xl pl-4 flex justify-between items-center shadow-lg">
      {/* Text Content */}
      <div className="text-left">
        <h2 className="text-yellow-400 font-bold text-2xl mb-2">
          Nih rekomendasi kuliner yang ada di sekitar Bandar Lampung...
        </h2>
        <button className="bg-white text-[#4D2B28] font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-100 transition-all">
          Jelajahi Kuliner Lainnya →
        </button>
      </div>

      {/* Image */}
      <div className="rounded-xl overflow-hidden drop-shadow-xl">
        <img
          src="/images/kuliner.png "
        />
      </div>
    </div>
  
      <div className="flex flex-wrap gap-20 justify-center items-center py-8 ">
        <CardKuliner />
        <CardKuliner />
        <CardKuliner />
      </div>

      <div className="flex w-full justify-center items-center mb-6">
        <TombolCustom2 />
      </div>
    </div>
  );
}

export default Page;
