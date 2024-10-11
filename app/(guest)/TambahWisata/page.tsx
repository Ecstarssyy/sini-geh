// App.js
import { CalendarForm } from "@/components/calender";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import React from "react";
import { Label } from "recharts";

function App() {
  return (
    <div className="flex  bg-[#255346] ">
      <div className="w-40 bg-green-200 ">
        <aside className="bg-[#CFFFE5] h-full w-64 p-6">
          <ul className="space-y-4">
            <li className="font-bold text-black">Dashboard</li>
            <li className="text-black">
              <a href="">Atur Wisata</a>
            </li>
            <li className="mt-auto text-black">
              <a href="./">LogOut</a>
            </li>
          </ul>
        </aside>
      </div>
      <div className="bg-[#255346] p-6 rounded-md w-80 px-20">
        <h1 className="  text-white text-lg font-semibold mb-4">
          Tambah Wisata
        </h1>
        <div className=" mb-4">
          <label className="block text-white mb-2">Gambar Wisata</label>
          <button className="bg-[#DAF1DF] text-black py-1 px-7 pl-5 rounded-full">
            + Upload
          </button>
        </div>
        <div className=" mb-4">
          <label className="block mb-2">Nama Wisata</label>
          <input
            type="text"
            className="w-[130px] bg-[#DAF1DF] text-black py-1 px-7 rounded-full"
            value="Museum"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Kategori</label>
          <input
            type="text"
            className="w-[130px] bg-[#DAF1DF] text-black py-1 px-7 rounded-full"
            value="Sejarah"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Rating</label>
          <RadioGroup/> 
          <div className="flex items-center">
            <input
              type="text"
              className="w-24 p-2 rounded bg-green-200 text-green-900 mr-2"
              value="4.5"
            />
            <i className="fas fa-star text-yellow-500"></i>
            <i className="fas fa-star text-yellow-500"></i>
            <i className="fas fa-star text-yellow-500"></i>
            <i className="fas fa-star text-yellow-500"></i>
            <i className="fas fa-star-half-alt text-yellow-500"></i>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Harga Wisata</label>
          <input
            type="text"
            className="w-[150px] bg-[#DAF1DF] text-black py-1 px-7 rounded-xl"
            value="Rp. 10,000 - 17,000"
          />
        </div>
        <div className=" mb-4">
          <label className="block mb-2">Deskripsi</label>
          <textarea className="w-[280px] bg-[#DAF1DF] text-black py-1 px-7 rounded-xl">
            Hal sendiri
          </textarea>
        </div>
        <div className=" mb-4">
          <label className="block mb-2">Alamat</label>
          <input
            type="text"
            className="w-[150px] bg-[#DAF1DF] text-black py-1 px-7 rounded-xl"
            value="Jln. Blok A"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Jam Kerja</label>
          <div className="flex">
            <select className="w-[140px] bg-[#DAF1DF] text-black py-1 px-6 rounded-xl">
              <option>08:00 AM</option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>01:00 PM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>
              <option>05:00 PM</option>
              <option>06:00 PM</option>
              <option>07:00 PM</option>
            </select>
            <div className="px-3"> TO </div>
            <select className="w-[140px] bg-[#DAF1DF] text-black py-1 px-6 rounded-xl">
              <option>03:00 PM</option>
              <option>04:00 PM</option>
              <option>05:00 PM</option>
              <option>06:00 PM</option>
              <option>07:00 PM</option>
              <option>08:00 PM</option>
              <option>09:00 PM</option>
              <option>10:00 PM</option>
              <option>11:00 PM</option>
              <option>12:00 AM</option>
            </select>
          </div>
        </div>
        <div className=" mb-4">
          <label className="block mb-2">Hari Kerja</label>
          <CalendarForm />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Link Gmaps</label>
          <input
            type="text"
            className="w-[150px] bg-[#DAF1DF] text-black py-1 px-6 rounded-xl"
            value="https://"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Review</label>
          <div className="flex items-center mb-2">
            <button className="bg-[#DAF1DF] text-black w-[150px] py-1 rounded-full">
              + Tambah Review
            </button>
            </div>
            <textarea className="w-full p-2 rounded bg-green-200 text-green-900"></textarea>
          </div>
        <button className="  bg-green-700 text-green-100  py-2 px-4 rounded">
          Kirim
        </button>
      </div>
    </div>
  );
}

export default App;
