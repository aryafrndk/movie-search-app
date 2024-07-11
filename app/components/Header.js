"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const Header = ({ onOpenYearFilter }) => {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center py-4">
      <h1
        className="text-4xl cursor-pointer"
        onClick={() => router.push('/')}
      >
        Movie Search
      </h1>
      <button
        className="bg-black text-white font-bold py-2 px-4 rounded"
        onClick={onOpenYearFilter}
      >
        Select Year
      </button>
    </header>
  );
};

export default Header;
