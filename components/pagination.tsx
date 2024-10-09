import React from "react";

function Pagination() {
  return (
    <nav
      aria-label="page-navigation"
      className="justify-center flex items-center text-center mb-8"
    >
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-amber-800 rounded-s-lg hover:bg-red-300 hover:text-amber-800"
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="font-belanosima flex items-center justify-center  px-3 h-8 leading-tight text-white bg-amber-800 hover:bg-red-300 hover:text-amber-800"
          >
            1
          </a>
        </li>
        <li>
          <a
            href="#"
            className="font-belanosima flex items-center justify-center px-3 h-8 leading-tight text-white bg-amber-800 hover:bg-red-300 hover:text-amber-800"
          >
            2
          </a>
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            className="font-belanosima flex items-center justify-center px-3 h-8 text-white bg-amber-800 hover:bg-red-300 hover:text-amber-800"
          >
            3
          </a>
        </li>
        <li>
          <a
            href="#"
            className="font-belanosima flex items-center justify-center px-3 h-8 leading-tight text-white bg-amber-800 hover:bg-red-300 hover:text-amber-800"
          >
            4
          </a>
        </li>
        <li>
          <a
            href="#"
            className="font-belanosima flex items-center justify-center px-3 h-8 leading-tight text-white bg-amber-800  hover:bg-red-300 hover:text-amber-800"
          >
            5
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-amber-800 border-gray-300 rounded-e-lg hover:bg-red-300 hover:text-amber-800"
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
