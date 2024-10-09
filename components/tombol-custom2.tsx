import { ArrowRight } from "lucide-react";
import React from "react";

function TombolCustom2() {
  return (
    <div className="hover:scale-110 transition-all hover:cursor-pointer  p-2 text-white flex items-center gap-4 bg-[#4D2B28] rounded-full w-fit drop-shadow-xl">
      <p className="font-bold text-lg pl-3">Rekomendasi Lainnya</p>
      <div className="bg-white w-fit rounded-full p-1">
        <ArrowRight
          color="#4D2B28"
        />
      </div>
    </div>
  );
}

export default TombolCustom2;
