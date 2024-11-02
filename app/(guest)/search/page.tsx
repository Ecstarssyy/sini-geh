"use client";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { Globe, Instagram, Phone, Youtube } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useState } from "react";

export default function Search() {
  const touristPlaces = [
    {
      id: 1,
      name: "Museum Lampung",
      image: "/images/Museum-Lampung.jpg",
    },
    {
      id: 2,
      name: "Gigi Hiu",
      image: "/images/Gigi-Hiu.jpg",
    },
    {
      id: 3,
      name: "Bukit Sakura",
      image: "/images/Bukit-Sakura.jpeg",
    },
    {
      id: 4,
      name: "Way Kambas",
      image: "/images/Way-Kambas.jpg",
    },
    {
      id: 5,
      name: "Pulau Pahawang",
      image: "/images/Pahawang.jpg",
    },
    {
      id: 6,
      name: "Bukit Aslan",
      image: "/images/Bukit-Aslan.jpg",
    },
    {
      id: 7,
      name: "Skibidi",
      image: "",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = touristPlaces.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(touristPlaces.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-[url(/images/background.jpg)] bg-cover">
      <div className="w-full flex justify-center p-14 min-h-screen">
        <div
          className="rounded-[50px] p-4 shadow-lg w-[980px] mb-4"
          style={{ backgroundColor: "rgba(218, 241, 223, 1)" }}
        >
          <p className="text-3xl text-black mb-4 ">
            Hasil pencarian berdasarkan...
          </p>

          <div className="grid grid-cols-3 gap-4 max-6">
            {currentItems.map((place) => (
              <div key={place.id}>
                <div className="overflow-hidden py-4">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-40 object-cover rounded-[18px]"
                  />
                </div>
                <div className="flex justify-center">
                  <button className="bg-[#255346] text-white py-2 px-4 rounded-full justify-between">
                    {place.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination text-black flex justify-center items-center mt-4">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span className="mx-4">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        <div
          className="rounded-[50px] p-6 shadow-lg ml-5"
          style={{ width: "230px", backgroundColor: "rgba(218, 241, 223, 1)" }}
        >
          <h2 className="text-[28px] text-center text-black font-bold mb-2">
            Top 5 Wisata
          </h2>
          <ol className="text-black list-decimal pl-5">
            <li>ITERA</li>
            <li>Gigi Hiu</li>
            <li>Pahawang</li>
            <li>Bukit Sakura</li>
            <li>Museum</li>
          </ol>
          <h2 className="text-black font-bold mt-4 mb-2">Kategori :</h2>
          <ul className="text-black list-disc pl-5">
            <li>Pantai</li>
            <li>Pegunungan</li>
            <li>Tanah Tandus</li>
            <li>Bukit</li>
            <li>Taman</li>
          </ul>
        </div>
      </div>

      <div className="">
        <div className="mt-8">
          <h2 className="text-xl font-bold">Rekomendasi Lainnya:</h2>
          <div className="flex justify-between mt-4 p-5">
            <div className="w-1/4">
              <Image
                src="/images/Pahawang.jpg"
                alt="Pantai"
                width={1080}
                height={1080}
                className="w-full rounded-lg h-64 bg-cover "
              />
              <p className="text-center mt-2 bg-[#255346] rounded-full border-white border-2">
                Pahawang
              </p>
            </div>
            <div className="flex justify-between mt-4 p-5"></div>
            <div className="w-1/4">
              <Image
                src="/images/Way-Kambas.jpg"
                alt="Pantai"
                width={1080}
                height={1080}
                className="w-full rounded-lg h-64 bg-cover "
              />
              <p className="text-center mt-2 bg-[#255346] rounded-full border-white border-2">
                Taman Way Kambas
              </p>
            </div>
            <div className="flex justify-between mt-4 p-5"></div>
            <div className="w-1/4">
              <Image
                src="/images/Gigi-Hiu.jpg"
                alt="Pantai"
                width={1080}
                height={1080}
                className="w-full rounded-lg h-64 bg-cover "
              />
              <p className="text-center mt-2 bg-[#255346] rounded-full border-white border-2">
                Gigi hiu
              </p>
            </div>
            <div className="flex justify-between mt-4 p-5"></div>
            <div className="w-1/4">
              <Image
                src="/images/Bukit-Sakura.jpeg"
                alt="Bukit Sakera"
                width={1080}
                height={1080}
                className="w-full rounded-lg h-64 bg-cover "
              />
              <p className="text-center mt-2 bg-[#255346] rounded-full border-white border-2">
                Bukit Sakera
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[#DAF1DF] p-4 text-center text-[#0f3d3e] mt-8">
        <div className="bg-gradient-to-b text-[#0f3d3e] bg-[#DAF1DF] w-full mt-4 rounded-t-xl flex gap-6 pl-16 py-4 text-justify justify-between pb-16 font-belanosima">
          <div className="w-[30%]">
            <p className="text-black font-bold text-3xl">SINI GEH</p>
            <p className="text-black">
              Temukan berbagai lokasi wisata di Bandar Lampung lengkap dengan
              rating, lokasi, jam buka, harga, dan ulasan di SiniGeh
            </p>
          </div>
          <div className="w-[20%]">
            <p className="text-black font-bold text-3xl">Kontak Kami</p>
            <ul>
              <li className="flex gap-1 text-Black">
                <Instagram />
                @Sini.Geh
              </li>
              <li className="flex gap-1 text-Black">
                <Youtube />
                Sini Geh
              </li>
              <li className="flex gap-1 text-Black">
                <Phone />
                08123456789
              </li>
              <li className="flex gap-1 text-Black">
                <Globe />
                www.sinigeh.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}