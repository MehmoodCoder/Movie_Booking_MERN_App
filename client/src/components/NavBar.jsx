import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, SearchIcon } from "lucide-react";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-black/80 backdrop-blur-md">
      <Link to="/" className="max-md:flex-1">
        <img src={logo} alt="Logo" className="w-50 h-auto" />
      </Link>

      <div
        className={`max-md:fixed max-md:top-0 max-md:right-0 max-md:bottom-0 max-md:bg-black/90 max-md:z-50 flex max-md:flex-col items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/25 overflow-hidden transition-[width] duration-300 ${isOpen ? "max-md:w-full" : "max-md:w-0"}`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <Link
          onClick={() => {
            (scrollTo(0, 0), setIsOpen(false));
          }}
          to="/"
        >
          Home
        </Link>
        <Link
          onClick={() => {
            (scrollTo(0, 0), setIsOpen(false));
          }}
          to="/movies"
        >
          Movies
        </Link>
        <Link
          onClick={() => {
            (scrollTo(0, 0), setIsOpen(false));
          }}
          to="/"
        >
          Theaters
        </Link>
        <Link
          onClick={() => {
            (scrollTo(0, 0), setIsOpen(false));
          }}
          to="/"
        >
          Releases
        </Link>
        <Link
          onClick={() => {
            (scrollTo(0, 0), setIsOpen(false));
          }}
          to="/favorite"
        >
          Favorites
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
        <button className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
          Login
        </button>
      </div>

      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default Navbar;
