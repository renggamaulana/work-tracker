'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { HiCube } from 'react-icons/hi';
import { IoDocument } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
// import { HiMiniRectangleGroup } from 'react-icons/hi2';
import React from 'react';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string): string => {
    if (path === '/') {
      return pathname === '/' ? 'bg-gray-900 font-semibold' : '';
    }
    return pathname?.startsWith(path) ? 'bg-gray-900 font-semibold' : '';
  };

  return (
    <>
      <div className="mb-8">
        <Link href="/" className="text-2xl font-bold text-center block">
          Penjualan Barang
        </Link>
      </div>

      <nav>
        <ul>
          <li className="mb-2">
            <Link
              href="/"
              className={`flex items-center p-2 hover:bg-gray-800 hover:font-semibold transition duration-300 rounded-xl gap-3 ${isActive(
                '/'
              )}`}
            >
              <IoMdHome />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/worklogs"
              className={`flex items-center p-2 hover:bg-gray-800 hover:font-semibold transition duration-300 rounded-xl gap-3 ${isActive(
                '/worklogs'
              )}`}
            >
              <IoDocument />
              <span>Work Logs</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
