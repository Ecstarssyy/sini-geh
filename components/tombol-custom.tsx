import { ArrowRight } from "lucide-react";
import React from "react";

function TombolCustom() {
  return (
    <div className="hover:scale-110 transition-all hover:cursor-pointer  p-2 text-[#583028] flex items-center gap-4 bg-white rounded-full w-fit">
      <p className="font-bold text-lg pl-3">Baca Selengkapnya</p>
      <div className="bg-[#583028] w-fit rounded-full p-1">
        <ArrowRight color="white" />
      </div>
    </div>
  );
}

export default TombolCustom;
