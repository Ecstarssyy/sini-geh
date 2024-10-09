"use client";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
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
    <div className="w-full flex justify-center p-14 bg-[url(/images/background.jpg)] min-h-screen">
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
                <button className="bg-green-800 text-white py-2 px-4 rounded-full justify-between">
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
  );
}
