'use client';
import React from 'react';
import Link from 'next/link';

const NavLink = ({ href, children }) => (
  <li>
    <Link href={href} className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium tracking-wide">
      {children}
    </Link>
  </li>
);

export default NavLink;