import React from 'react';

const App = () => {
  return (
    <div className="flex">
      <aside className="bg-[#CFFFE5] h-screen w-64 p-6">
        <ul className="space-y-4">
          <li className="font-bold text-black">Dashboard</li>
          <li className="text-black"><a href="">Atur Wisata</a></li>
          <li className="mt-auto text-black"><a href="./">LogOut</a></li>
        </ul>
      </aside>
      <main className="bg-[#1D4E3F] flex-1 h-screen flex items-center justify-center ">
        <div className="bg-[#CFFFE5] p-8 rounded-3xl shadow-md">
          <h1 className="text-2xl font-semibold text-center text-black">
            Selamat Datang di Admin Panel Sini Geh
          </h1>
        </div>
      </main>
    </div>
  );
};

export default App;