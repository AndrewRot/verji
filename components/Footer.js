'use client';

import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Verji</h3>
            <p className="text-sm">123 Vineyard Lane, Napa Valley, CA 94558</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Connected</h3>
            <form className="flex">
              <input type="email" placeholder="Your email" className="w-full px-4 py-2 rounded-l-md text-gray-800" />
              <button type="submit" className="bg-green-600 px-4 py-2 rounded-r-md">Subscribe</button>
            </form>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-400"><Facebook /></a>
              <a href="#" className="hover:text-green-400"><Instagram /></a>
              <a href="#" className="hover:text-green-400"><Twitter /></a>
              <a href="#" className="hover:text-green-400"><Youtube /></a>
              <a href="#" className="hover:text-green-400"><Linkedin /></a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-8 border-t border-gray-700 pt-8">
          <p>&copy; {new Date().getFullYear()} Verji. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
