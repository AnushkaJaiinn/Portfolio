'use client';
import React, { useState, useEffect } from 'react';
import { Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden" style={{backgroundImage: `linear-gradient(rgba(253, 242, 248, 0.9), rgba(254, 247, 240, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")`}}>
      <div className="container mx-auto px-6 text-center text-gray-700 relative py-12">
          <div className="flex justify-center gap-6 mb-6">
               <a href="https://www.linkedin.com/in/anushka-jain-408b81211/" target="_blank" rel="noopener noreferrer" className="text-anushka-600 hover:text-anushka-700 transition-all duration-300 transform hover:scale-110"><Linkedin size={28}/></a>
               <a href="https://www.youtube.com/@realwithjain" target="_blank" rel="noopener noreferrer" className="text-anushka-600 hover:text-anushka-700 transition-all duration-300 transform hover:scale-110"><Youtube size={28}/></a>
               <a href="https://twitter.com/YOUR_TWITTER" target="_blank" rel="noopener noreferrer" className="text-anushka-600 hover:text-anushka-700 transition-all duration-300 transform hover:scale-110"><Twitter size={28}/></a>
               <a href="https://instagram.com/anushkajaiinn/" target="_blank" rel="noopener noreferrer" className="text-anushka-600 hover:text-anushka-700 transition-all duration-300 transform hover:scale-110"><Instagram size={28}/></a>
          </div>
          <p className="text-gray-600">&copy; {currentYear} Anushka Jain. All rights reserved.</p>
      </div>
    </footer>
  );
}
