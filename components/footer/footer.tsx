import React from "react";
import { Instagram, Mail, Phone, Globe } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#E76824] to-[#4D2B28] text-white py-10 px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
        {/* Mengan Pai Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold font-belanosima">MENGAN PAI</h3>
          <p>
            Temukan berbagai kuliner di Bandar Lampung lengkap dengan rating,
            lokasi, jam buka, harga, dan ulasan di Mengan Pai.
          </p>
        </div>

        {/* Menu Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold font-belanosima">Menu</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="#" className="hover:text-yellow-300">
                Beranda
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                Rekomendasi
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300"></a>
            </li>
          </ul>
        </div>

        {/* Kontak Kami Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold font-belanosima">Kontak Kami</h3>
          <ul className="flex flex-col gap-2">
            {/* Instagram */}
            <li className="flex items-center gap-3">
              <Instagram />
              <a
                href="https://www.instagram.com/mengan.pai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300"
              >
                @mengan.pai
              </a>
            </li>
            {/* Phone */}
            <li className="flex items-center gap-3">
              <Phone />
              <a href="tel:082912345678" className="hover:text-yellow-300">
                0829-1234-5678
              </a>
            </li>
            {/* Email */}
            <li className="flex items-center gap-3">
              <Mail />
              <a
                href="mailto:info@menganpai.com"
                className="hover:text-yellow-300"
              >
                info@menganpai.com
              </a>
            </li>
            {/* Website */}
            <li className="flex items-center gap-3">
              <Globe />
              <a
                href="https://www.menganpai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300"
              >
                www.menganpai.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Copyright Section */}
      <div className="mt-8 border-t border-white pt-4 text-center">
        <p>&copy; 2024 Mengan Pai. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
