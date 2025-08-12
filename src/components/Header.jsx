import React from "react";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Brand */}
      <div className="text-2xl font-bold italic text-gray-900">SubStyler</div>

      {/* Search bar */}
      <div className="flex items-center w-full max-w-xl bg-gray-100 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="What subtitle style are you looking for?"
          className="bg-transparent flex-1 outline-none text-gray-700"
        />
        <select className="bg-transparent outline-none text-gray-500 text-sm mr-2">
          <option>Styles</option>
          <option>Languages</option>
        </select>
        <button className="bg-pink-500 text-white p-2 rounded-full">
          <Search size={18} />
        </button>
      </div>

      {/* Nav links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
        <a href="#">Explore</a>
        <a href="#">Find Talent</a>
        <a href="#">Get Hired</a>
        <a href="#">Blog</a>
        <a href="#" className="font-semibold">Sign Up</a>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-full">
          Log In
        </button>
      </nav>
    </header>
  );
}
