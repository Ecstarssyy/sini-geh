import CardKuliner from "@/components/card-kuliner";
import TombolCustom2 from "@/components/tombol-custom2";
import React from "react";

function Page() {
  return (
    <div> 
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
