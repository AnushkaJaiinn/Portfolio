"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = ['home', 'about', 'services', 'portfolio', 'social-profiles', 'journey', 'testimonial', 'contact'];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // Custom smooth scroll function to prevent double-scroll
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update URL hash without triggering scroll
      window.history.pushState(null, '', `#${targetId}`);
    }
    
    // Close mobile menu if open
    setMenuOpen(false);
  };

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
    <>
      <header className="fixed top-0 left-0 w-full z-[100] bg-anushka-50/95 backdrop-blur-lg shadow-md border-b border-anushka-200/30">
        <nav className="container mx-auto px-4 sm:px-6 py-3 md:py-4 flex justify-between items-center">
          <a 
            href="#home" 
            onClick={(e) => handleSmoothScroll(e, 'home')}
            className="text-3xl font-bold font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent"
          >
            Anushka Jain
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <li key={link}>
                <a 
                  href={`#${link}`}
                  onClick={(e) => handleSmoothScroll(e, link)}
                  className={`capitalize pb-1 border-b-2 transition-colors duration-300 font-medium ${activeSection === link ? 'border-anushka-500 text-anushka-600' : 'border-transparent text-gray-700 hover:border-anushka-400 hover:text-anushka-600'}`}
                >
                  {link === 'social-profiles' ? 'Social' : link}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md bg-purple-100 hover:bg-purple-200 text-purple-600 z-[150]"
            onClick={() => {
              console.log('Hamburger clicked, current state:', menuOpen);
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay - Completely separate from header */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[120] bg-black/50" onClick={() => setMenuOpen(false)}>
          {/* Menu Panel */}
          <div 
            className="fixed left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-anushka-500 to-rose-500 p-6 text-white">
              <h2 className="text-2xl font-bold">Menu</h2>
            </div>
            
            {/* Menu Items */}
            <ul className="p-4">
              {navLinks.map(link => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    onClick={(e) => handleSmoothScroll(e, link)}
                    className={`block py-3 px-4 mb-2 capitalize rounded-lg font-medium transition-colors ${
                      activeSection === link 
                        ? 'bg-anushka-500 text-white' 
                        : 'text-gray-700 hover:bg-anushka-100'
                    }`}
                  >
                    {link === 'social-profiles' ? 'Social' : link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
