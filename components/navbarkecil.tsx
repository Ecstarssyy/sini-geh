import React from 'react';

function NavbarKecil() {
  return (
    <nav className="bg-[#4D2B28] py-3 px-6 flex items-center justify-between rounded-full w-fit mx-auto mt-6">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="https://path-to-logo/mengan-pai-logo.png" // Replace with the correct path to your logo
          alt="Mengan Pai"
          className="h-10 w-10 mr-4"
        />
        <h1 className="text-white text-lg font-bold">MENGAN PAI</h1>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 ml-8">
        <li>
          <a href="#" className="text-white hover:text-yellow-300 text-lg">
            Beranda
          </a>
        </li>
        <li>
          <a href="#" className="text-yellow-400 font-bold text-lg">
            Rekomendasi
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarKecil;
