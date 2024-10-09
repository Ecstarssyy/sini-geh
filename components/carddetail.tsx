import Image from "next/image";
import React from "react";

type CardProps = {
  imgUrl: string;
  caption: string;
};

function CardDetail({ imgUrl, caption }: CardProps) {
  return (
    <div className="bg-gradient-to-r from-[#E76824] to-[#4D2B28] rounded-xl p-4 flex flex-col h-64">
      <Image
        src={imgUrl}
        className="rounded-xl h-[70%] object-cover"
        width={1080}
        height={1080}
        alt="Gambar Geprek"
      />
      <p className="text-white font-bold text-center my-auto text-xl font-belanosima">
        {caption}
      </p>
    </div>
  );
}

export default CardDetail;
