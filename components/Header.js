'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Shop', href: '#shop' },
  { name: 'Media', href: '#media' },
];

const NavLink = ({ href, children, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });
    }
    if (onClick) onClick();
  };
  return (
    <a
      href={href}
      onClick={handleClick}
      className="font-skia text-sm tracking-[0.25em] uppercase px-5 py-2 text-wine-800 hover:text-gold-400 transition-colors duration-300"
    >
      {children}
    </a>
  );
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
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-cream/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center h-20">
        <a href="#home" className="flex items-center gap-3">
          <Image
            src="/VergiLogo.png"
            alt="Verji"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="font-skia-title text-xl tracking-[0.2em] text-wine-800 uppercase">
            Verji
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink key={link.name} href={link.href}>
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-wine-800 p-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 8h16M4 16h16'}
              />
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <motion.div
          className="md:hidden bg-cream/95 backdrop-blur-md border-t border-wine-100 pb-6 pt-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col items-center gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                {link.name}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
