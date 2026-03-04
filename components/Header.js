'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Shop', href: '#shop' },
  { name: 'Contact', href: '#contact' },

];

const NavLink = ({ href, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });
    }
  };
  return <a href={href} onClick={handleClick} className="px-4 py-2 hover:text-gray-500 transition-colors">{children}</a>;
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        <div className="text-2xl font-bold">Verji</div>
        <div className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} /></svg>
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white/90 backdrop-blur-sm pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navLinks.map((link) => (
            <NavLink key={link.name} href={link.href}>
              <div className="block px-4 py-2 text-center" onClick={() => setIsOpen(false)}>{link.name}</div>
            </NavLink>
          ))}
        </motion.div>
      )}
    </header>
  );
}
