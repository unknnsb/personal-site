import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#0f0f0f] border-b border-gray-800 font-mono text-sm">
      <Link
        to="/"
        className="text-gray-300 tracking-widest hover:text-gray-100 transition"
      >
        ~/nes
      </Link>

      <nav className="flex space-x-6">
        <Link
          to="/works"
          className="text-gray-500 hover:text-gray-300 underline underline-offset-4 transition"
        >
          archives
        </Link>
        <Link
          to="/journal"
          className="text-gray-500 hover:text-gray-300 underline underline-offset-4 transition"
        >
          journal
        </Link>
      </nav>
    </header>
  );
};

export default Header;
