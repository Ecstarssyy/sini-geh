import React from "react";

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 bg-gradient-to-b from-[#E76824] to-[#4D2B28] w-[370px] py-4 px-8 text-white rounded-3xl animate-pulse">
      {/* Bagian atas */}
      <div className="flex justify-between">
        <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
        <div className="flex border border-white w-fit rounded-md p-1 gap-1">
          <div className="h-4 w-4 bg-yellow-400 rounded-full"></div>
          <div className="h-4 w-8 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Gambar */}
      <div className="w-full h-48 bg-gray-300 rounded-xl mt-2"></div>

      {/* Lokasi dan Harga */}
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-4 w-4 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Deskripsi Singkat */}
      <div className="h-12 bg-gray-300 rounded mt-2"></div>

      {/* Tombol */}
      <div className="h-10 w-full bg-gray-400 rounded mt-2"></div>
    </div>
  );
}

export default SkeletonCard;
