"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = ['home', 'about', 'services', 'portfolio', 'journey', 'testimonial', 'contact'];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    navLinks.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      navLinks.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
  <header className="fixed top-0 left-0 w-full z-50 bg-anushka-50/95 backdrop-blur-lg shadow-md border-b border-anushka-200/30 overflow-x-hidden">
      <nav className="container mx-auto px-4 sm:px-6 py-3 md:py-4 flex justify-between items-center">
        <Link href="#home" className="text-3xl font-bold font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent">Anushka Jain</Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <li key={link}>
              <Link href={`#${link}`} className={`capitalize pb-1 border-b-2 transition-colors duration-300 font-medium ${activeSection === link ? 'border-anushka-500 text-anushka-600' : 'border-transparent text-gray-700 hover:border-anushka-400 hover:text-anushka-600'}`}>
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(prev => !prev)}
            className="p-2 rounded-md bg-anushka-100/40 hover:bg-anushka-200/60 focus:outline-none focus:ring-2 focus:ring-anushka-400 text-anushka-600"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed left-0 right-0 top-16 bottom-0 z-40 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/35 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          className={`absolute left-0 top-0 h-full w-72 max-w-[85vw] isolate
                      bg-gradient-to-r from-anushka-50/90 via-white/60 to-anushka-50/20 backdrop-blur-md
                      border-r border-anushka-200 shadow-xl
                      transform transition-transform duration-300 ease-out
                      ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          role="dialog"
          aria-label="Mobile navigation"
        >
          <div className={`absolute inset-0 bg-white/70 backdrop-blur-2xl backdrop-saturate-150 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`} />
          <div className="relative h-full">
            <div className={`absolute inset-3 rounded-r-2xl bg-anushka-50/10 backdrop-blur-xl border border-anushka-200/10 shadow-lg transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}/>
            <ul className="relative z-10 flex flex-col items-start py-6 px-6 space-y-2 text-left bg-white/90 backdrop-blur-xl border border-anushka-200/40 shadow-2xl">
              {navLinks.map(link => (
                <li key={link} className="w-full">
                  <Link
                    href={`#${link}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block w-full py-3 capitalize border-b border-anushka-100/50 font-medium
                               ${activeSection === link ? 'text-anushka-600 font-semibold' : 'text-gray-700 hover:text-anushka-600'}`}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
