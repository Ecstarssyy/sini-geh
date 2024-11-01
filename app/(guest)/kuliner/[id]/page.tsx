"use client"; // Pastikan ini ada di bagian atas file untuk mendukung komponen client

import CardDetail from "@/components/carddetail";
import ReviewCard from "@/components/reviewcard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Kuliner {
  id: string;
  name: string;
  address: string;
  description: string;
  gmapsLink: string;
  imageUrls: string[];
  qualityRating: number;
  workingHours: {
    start: string;
    stop: string;
  };
  priceRating: number;
}

const recommendationData = [
  { imgUrl: "/images/geprek.jpg", caption: "Ayam Geprek" },
  { imgUrl: "/images/naspad.jpeg", caption: "Nasi Padang" },
  { imgUrl: "/images/pindang.jpeg", caption: "Pindang" },
  { imgUrl: "/images/seruit.jpeg", caption: "Seruit" },
  { imgUrl: "/images/geprek.jpg", caption: "Ayam Geprek" },
];

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const [data, setData] = useState<Kuliner | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    if (!id) return;

    try {
      const response = await fetch(`/api/kuliner/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result.kuliner); // Menyimpan data kuliner dari respons API
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Kuliner not found</p>;
  }

  return (
    <div>
      <Image
        src={data.imageUrls[0] || "/images/placeholder.jpg"}
        className="rounded-xl w-full h-96 object-cover"
        width={1080}
        height={1080}
        alt={`Gambar ${data.name}`}
      />
      <div className="bg-gradient-to-b from-[#E76824] to-[#4D2B28] w-full mt-4 rounded-xl flex flex-col gap-6 p-4 text-justify">
        <p className="text-white font-bold text-3xl font-belanosima">
          {data.name}
        </p>
        <div className="bg-white rounded-xl p-4 font-belanosima">
          <p>{data.description}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-xl font-belanosima">ALAMAT</p>
          <p>
            <Link
              href={data.gmapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-belanosima"
            >
              {data.address}
            </Link>
          </p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-xl font-belanosima">REVIEW</p>
          <ScrollArea className="h-52">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </ScrollArea>
        </div>
      </div>
      <div>
        <p className="font-bold text-xl py-6 text-center">
          Rekomendasi Lainnya:
        </p>

        <div className="flex gap-4 justify-around">
          <Carousel>
            <CarouselContent>
              {recommendationData.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <CardDetail imgUrl={item.imgUrl} caption={item.caption} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
          data.address
        )}`}
        width="200"
        height="200"
        loading="lazy"
      />
    </div>
  );
}

export default Page;
