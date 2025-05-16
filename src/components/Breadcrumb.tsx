'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const pathnames = pathname?.split('/').filter((x) => x);

  const toTitleCase = (str: string): string => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <nav className="text-gray-600 text-sm mb-4">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-gray-500 hover:underline">
            Home
          </Link>
        </li>
        {pathnames?.map((value, index) => {
          const to = `/${pathnames?.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames?.length - 1;

          const isNumber = /^\d+$/.test(value);
          const displayValue = isNumber ? 'Edit' : toTitleCase(value);

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-white">{displayValue}</span>
              ) : (
                <Link href={to} className="text-gray-500 hover:underline">
                  {displayValue}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
