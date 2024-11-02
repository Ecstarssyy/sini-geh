'use client';
import { DeleteIcon, Eye, Link, Pencil } from 'lucide-react';
import React, { useState } from 'react';

function App() {
  const [wisata, setWisata] = useState([
    { id: 1, nama: 'Museum' },
    { id: 2, nama: 'Pahawang' },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const handleConfirmDelete = () => {
    setWisata(wisata.filter((item) => item.id !== idToDelete));
    setIsOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#1D4E3F]">
      {/* Sidebar */}
      <div className="w-64 bg-green-100 p-6">
        <h2 className="text-2xl font-bold mb-6 text-black"><a href="Adminpage">Dashboard</a></h2>
        <ul>
          <li className="mb-4">
            <a href="/Adminpage" className="text-lg font-medium text-black">
              Atur Wisata
            </a>
          </li>
          <li>
            <a href="#" className="text-lg font-medium text-black">
              LogOut
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-20">
        <h2 className="text2xl font-bold text-white mb-3">Atur Wisata</h2>
        <div className='pl-[650px]'>
        <button className="bg-[#CFFFE5] hover:bg-green-700 text-black font-bold py-2 px-4 rounded mb-4 border border-black">
          Tambah Wisata
        </button>
        </div>

        {/* Tabel Wisata */}
        <div className='h-[400px] w-[800px] bg-green-100'>
        <table className="table-auto w-full text-center  border-2 border-black text-[35px]">
          <thead>
            <tr>
              <th className="border-2 px-4 py-2 text-black text-lg">No.</th>
              <th className="border-2 px-4 py-2 text-black text-lg">Nama Wisata</th>
              <th className="border-2 px-4 py-2 text-black text-lg">Edit Wisata</th>
            </tr>
          </thead>
          <tbody>
            {wisata.map((item) => (
              <tr key={item.id} className='py-[10px]'>
                <td className="border-2 px-4 py-[5px] text-black text-lg">{item.id}</td>
                <td className="border-2 px-4 py-[5px] text-black text-lg">{item.nama}</td>
                <td className="border-2 px-4 py-[5px]">
                  <div className='flex items-center justify-evenly'>
                  <button className="mr-2 bg-[#8BB69B] p-[9px] ring-2 ring-black ">
                 <Eye className="text-black size-3.5"/>
                  </button>
                  <button className="mr-2 bg-[#8BB69B] p-[9px] ring-2 ring-black">
                 <Pencil className="text-black size-3.5"/>
                  </button>
                  <button onClick={() => {}} className='bg-[#8BB69B] p-[9px] ring-2 ring-black'>
                <DeleteIcon className="text-black size-3.5"/>
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>

      {/* Modal Delete */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-black">Konfirmasi Hapus</h2>
            <p className="text-black">Apakah Anda yakin ingin menghapus wisata ini?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleConfirmDelete}>
                Hapus
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsOpen(false)}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;