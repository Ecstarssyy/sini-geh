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
import {
  CircleUserRound,
  Globe,
  Instagram,
  Phone,
  Star,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const recommendationData = [
  { imgUrl: "/images/geprek.jpg", caption: "Ayam Geprek" },
  { imgUrl: "/images/naspad.jpeg", caption: "Nasi Padang" },
  { imgUrl: "/images/pindang.jpeg", caption: "Pindang" },
  { imgUrl: "/images/seruit.jpeg", caption: "Seruit" },
  { imgUrl: "/images/geprek.jpg", caption: "Ayam Geprek" },
];

function Page() {
  return (
    <div>
      <Image
        src="/images/bakso.jpg"
        className="rounded-xl w-full h-64 object-cover"
        width={1080}
        height={1080}
        alt="Gambar Bakso"
      />
      <div className="bg-gradient-to-b from-[#E76824] to-[#4D2B28] w-full mt-4 rounded-xl flex flex-col gap-6 p-4 text-justify">
        <p className="text-white font-bold text-3xl font-belanosima">
          Bakso Haji Sony
        </p>
        <div className="bg-white rounded-xl p-4 font-belanosima">
          <p>
            Makanan daging bulat dan berkuah atau yang biasa disebut dengan
            bakso, sudah tidak lagi asing di telinga masyarakat Indonesia.
            Pasalnya, makanan yang cocok disantap dalam kondisi cuaca apapun itu
            membuat yang menikmati akan merasa tergugah dengan aroma kuah yang
            dicampur sambal maupun kecap sesuai dengan selera.
          </p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-xl font-belanosima">ALAMAT</p>
          <p>
            <Link
              href="https://maps.app.goo.gl/EsoH6iE77DwgEEbGA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-belanosima"
            >
              Jl. Wolter Monginsidi No.42 A, Durian Payung, Kec. Tj. Karang
              Pusat, Kota Bandar Lampung, Lampung 35214
            </Link>
          </p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-xl font-belanosima">REVIEW</p>
          <ScrollArea className="h-36">
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
              {recommendationData.map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <CardDetail
                      imgUrl={recommendationData[index].imgUrl}
                      caption={recommendationData[index].caption}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Page;
