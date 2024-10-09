'use client';
import { useState } from "react";
import { LockIcon } from "lucide-react";
import { SearchIcon } from "lucide-react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div
      className="w-full h-screen flex flex-col justify-between items-center"
      style={{
        backgroundImage:
          "url(https://www.turtlefiji.com/wp-content/uploads/2023/09/Hero-best-tropical-island-vacations-turtle-island-fiji-1024x575-1.jpg)",
        backgroundSize: "cover",
      }}
    >
      {/* Top Right Button */}
      <div className="absolute top-4 right-4">
        <button
          className="px-3 py-2 bg-[#235347] text-black rounded-md hover:bg-[#DAF1DE]"
          onClick={() => setShowLogin(true)}
        >
          <span className="flex items-center">
            <LockIcon className="text-black" />
            Admin Login
          </span>
        </button>

        {/* Login Popup (Initially Hidden) */}
        {showLogin && (
          <div
            className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center"
            onClick={(e) => {
              if (e.target.classList.contains("fixed")) {
                setShowLogin(false);
              }
            }}
          >
            <div className="bg-[#235347] border border-gray-300 rounded-md shadow-md p-4 w-[400px]">
              <h3 className="text-lg font-semibold mb-2 text-center">Admin Login</h3>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-400 rounded-md mb-2"
                placeholder="Username"
              />
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-400 rounded-md mb-2"
                placeholder="Password"
              />
              <button className="px-4 py-2 bg-[#DAF1DE] text-black rounded-md hover:bg-[#235347]">
                Login
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-md flex-col bg-[#DAF1DE] mt-8 w-[870px] h-[430px] flex items-start justify-start py-3">
        <h2 className="font-bold text-black text-center w-full text-xl">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
          commodi magni velit? Ducimus hic ex mollitia, eius voluptate porro.
          Esse sapiente quae quam sint ipsam aliquid facilis recusandae
          pariatur accusamus!
        </h2>
      </div>

      {/* Text Above Search Bar */}
      <div className="text-white font-bold text-center mb-100 text-2xl">
        Cari tempat wisata mu disini!
      </div>

      {/* Search Bar */}
      <div className="w-full flex justify-center mb-32">
        <div className="relative w-[90px] flex bg-[#235347] rounded-full py-1 items-center border border-white border-[1px]">
          <SearchIcon className="absolute left-3 text-white" />
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-white bg-transparent border-none focus:outline-none rounded-full"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
}
