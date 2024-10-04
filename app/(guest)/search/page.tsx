import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="w-full justify-center pd-14 bg-[url(/img/bgrd.png)] bg-cover">
      <header className="bg-[#a0d6b4] p-4 text-center header text-4xl text-[#0f3d3e]"></header>
      <div className="p-10">
        <div className="w-full flex items-center justify-center">
          <Image
            src="/img/Museum.png"
            width={1080}
            height={1080}
            alt="Museum Lampung "
            className=" rounded-lg justify-center w-[800px] h-[500px]"
          />
        </div>
        <div className="bg-[#a0d6b4] p-4 rounded-lg shadow-lg justin  ">
          <div className="mt-4">
            <h1 className="text-2xl font-bold">Museum</h1>
            <div className="flex items-center">
              <div className="text-yellow-500 flex">
                <Star className="fill-yellow-500 text-black" />
                <Star className="fill-yellow-500 text-black" />
                <Star className="fill-yellow-500 text-black" />
                <Star className="fill-yellow-500 text-black" />
                <Star className="fill-yellow-500 text-black" />
              </div>
              <span className="ml-2">5.0</span>
            </div>
            <div></div>
            <p className="text-lg mt-2">Rp. 10.000</p>
            <div className="flex rounded bg-[#0f3d3e] py-4">
              <div className="w-75%]">
                <p className="mt-2">
                  Museum Lampung adalah salah satu tempat kunjungan wisata
                  sejarah sekaligus sarana pendidikan bagi masyarakat Lampung.
                  Terletak di pusat kota, museum ini menyimpan berbagai koleksi
                  benda bersejarah dan budaya Lampung.
                </p>
                <p className="mt-2">
                  Alamat: Jl. Z.A. Pagar Alam No.64, Gedong Meneng, Kec.
                  Rajabasa, Kota Bandar Lampung, Lampung 35141
                </p>
                <p className="mt-2">Jam Buka: 08:00 - 14:00</p>
                <p className="mt-2">Hari Kerja: Senin - Minggu</p>
              </div>
              <div className="mt-4 flex flex-col justify-between items-center w-[25%] gap-4">
                <Image
                  src="/img/map1.png"
                  alt="map"
                  width={1080}
                  height={1080}
                  className="w-full rounded-lg h-64 bg-cover "
                />
                <button className="  bg-green-600 rounded-full border-black border-2">
                  Rute di Peta
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-[#a0d6b4] p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">REVIEW</h2>
          <div className="mt-4">
            <div className="bg-[#0f3d3e] p-4 rounded-lg mb-4">
              <p className="font-bold">Budiwawan</p>
              <p>Ini bagus budi</p>
            </div>
            <div className="bg-[#0f3d3e] p-4 rounded-lg">
              <p className="font-bold">Budiwawan</p>
              <p>Ini bagus budi</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold">Rekomendasi Lainnya:</h2>
          <div className="flex justify-between mt-4 p-5">
            <div className="w-1/4">
              <Image
                src="/img/pahawang.png"
                alt="Pantai"
                width={1080}
                height={1080}
                className="w-full rounded-lg h-64 bg-cover "
              />
              <p className="text-center mt-2 bg-green-600 rounded-full border-white border-2">
                Pahawang
              </p>
            </div>
            <div className="flex justify-between mt-4 p-5"></div>
            <div className="w-1/4">
              <Image
                src="/img/tamangajah.png"
                alt="Pantai"
                width={1080}
                height={1080}
                className="w-full rounded-lg h-64 bg-cover "
              />
              <p className="text-center mt-2 bg-green-600 rounded-full border-white border-2">
                Taman Way Kambas
              </p>
            </div>
            <div className="flex justify-between mt-4 p-5"></div>
            <div className="w-1/4">
              <Image
                src="/img/gigihiu.png"
                alt="Pantai"
                width={1080}
                height={1080}
                className="w-full rounded-lg h-64 bg-cover "
              />
              <p className="text-center mt-2 bg-green-600 rounded-full border-white border-2">
                Gigi hiu
              </p>
            </div>
            <div className="flex justify-between mt-4 p-5"></div>
            <div className="w-1/4">
              <Image
                src="/img/bukitsakera.png"
                alt="Bukit Sakera"
                width={1080}
                height={1080}
                className="w-full rounded-lg h-64 bg-cover "
              />
              <p className="text-center mt-2 bg-green-600 rounded-full border-white border-2">
                Bukit Sakera
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#a0d6b4] p-4 text-center text-[#0f3d3e] mt-8">
        <p className="header text-2xl">SiniGeh</p>
        <p>Deskripsi Website</p>
      </footer>
    </div>
  );
};

export default Home;
