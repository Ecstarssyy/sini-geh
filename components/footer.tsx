import { Globe, Instagram, Phone, Youtube } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <div className="bg-gradient-to-b from-[#E76824] to-[#4D2B28] w-full mt-4 rounded-t-xl flex gap-6 pl-16 py-4 text-justify justify-between pb-16 font-belanosima">
      <div className="w-[30%]">
        <p className="text-white font-bold text-3xl">MENGAN PAI</p>
        <p className="text-white">
          Temukan berbagai kuliner di Bandar Lampung lengkap dengan rating,
          lokasi, jam buka, harga, dan ulasan di Mengan Pai
        </p>
      </div>
      <div className="w-[20%]">
        <p className="text-white font-bold text-3xl">Menu</p>
        <ul>
          <li>
            <p className="text-white">Beranda</p>
            <p className="text-white">Rekomendasi</p>
          </li>
        </ul>
      </div>
      <div className="w-[20%]">
        <p className="text-white font-bold text-3xl">Kontak Kami</p>
        <ul>
          <li className="flex gap-1 text-white">
            <Instagram />
            @mengan.Pai
          </li>
          <li className="flex gap-1 text-white">
            <Youtube />
            Mengan Pai
          </li>
          <li className="flex gap-1 text-white">
            <Phone />
            082212345678
          </li>
          <li className="flex gap-1 text-white">
            <Globe />
            www.menganpai.com
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
