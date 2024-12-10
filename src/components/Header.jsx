import React from 'react'
import { Link } from 'react-router';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-pastelBlue">
      <Link to='/' className="text-xl font-bold text-gray-800">Nesbeer.</Link>
      <nav>
        <Link to='/works' className="px-4 underline text-gray-700 hover:text-gray-900">
          Works
        </Link>
      </nav>
    </header >
  );
}

export default Header
