import { Globe, Instagram, Phone, Youtube } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-[#a0d6b4] p-4 text-center text-[#0f3d3e] mt-8">
        <div className="bg-gradient-to-b text-[#0f3d3e] bg-[#a0d6b4] w-full mt-4 rounded-t-xl flex gap-6 pl-16 py-4 text-justify justify-between pb-16 font-belanosima">
          <div className="w-[30%]">
            <p className="text-white font-bold text-3xl">SINI GEH</p>
            <p className="text-white">
              Temukan berbagai lokasi wisata di Bandar Lampung lengkap dengan
              rating, lokasi, jam buka, harga, dan ulasan di SiniGeh
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
                @Sini.Geh
              </li>
              <li className="flex gap-1 text-white">
                <Youtube />
                Sini Geh
              </li>
              <li className="flex gap-1 text-white">
                <Phone />
                08123456789
              </li>
              <li className="flex gap-1 text-white">
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

export default Footer;
