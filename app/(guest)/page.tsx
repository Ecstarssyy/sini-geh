
'use client';
import { useState } from "react";
import { LockIcon } from "lucide-react";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  return (
    <div
      className="w-full h-screen flex flex-col justify-between items-center bg-[url(/images/background.jpg)] bg-cover bg-center bg-no-repeat"
    >
      {/* Top Right Button */}
      <div className="absolute top-4 right-4">
        <button
          className="px-3 py-2 bg-[#235347] text-black rounded-md hover:bg-[#DAF1DE]"
          onClick={() => router.push('/login')}
        >
          <span className="flex items-center">
            <LockIcon className="text-black" />
            Admin Login
          </span>
        </button>

       
      </div>

      <div className="rounded-md flex-col bg-[#DAF1DE] mt-8 w-[870px] h-[430px] flex items-center justify-center py-3">
        <h2 className="font-bold text-black justify-center text-center text-4xl">
          Selamat Datang Di Website Sini Geh!
        </h2>
      </div>

      {/* Text Above Search Bar */}
      <div className="text-white font-bold text-center mb-100 text-2xl">
        Cari tempat wisata mu disini!
      </div>

      {/* Search Bar */}
      <div className="w-full flex justify-center mb-32">
        <div className="relative w-[900px] flex bg-[#235347] rounded-full py-1 items-center border border-white border-[1px]">
          <SearchIcon className="absolute left-3 text-white" />
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-white bg-transparent border-none focus:outline-none rounded-full"
            placeholder="Search"
          />
        </div>
      </div>
    
    </div>
  );
}
