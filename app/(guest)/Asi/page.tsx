import React from 'react';
import backgroundImage from './mantai.jpg'; // Pastikan path gambar sudah benar

function BackgroundSection() {
  return (
    <div
      style={{
        backgroundImage:
          'url(https://asset.kompas.com/crops/H7yCdCIVeOO_5NSoFljLeSsrxoY=/0x0:780x390/750x500/data/photo/2019/01/11/15632785941.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
      }}
    />
  );
}

function Page() {
  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        backgroundColor: 'white',
        backgroundImage: `url(${backgroundImage})`, // Menggunakan gambar lokal sebagai background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="text-black text-4xl">Ini Landing Page</h1>
    </div>
  );
}

export default Page;
