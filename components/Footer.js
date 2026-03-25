'use client';

import { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setMessage('Thanks for subscribing!');
      } else if (res.status === 422) {
        setStatus('duplicate');
        setMessage(data.error);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <footer className="bg-wine-900 text-cream/80 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand column */}
          <div>
            <h3 className="font-skia-title text-lg tracking-[0.2em] text-cream uppercase mb-4">
              Verji
            </h3>
            <p className="font-skia text-sm tracking-wide text-cream/50 leading-relaxed">
              A premium verjus beverage crafted with natural Moroccan ingredients.
            </p>
            <p className="font-skia text-sm tracking-wide text-cream/40 mt-3">
              123 Vineyard Lane, Napa Valley, CA 94558
            </p>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="font-skia-title text-sm tracking-[0.25em] text-cream uppercase mb-4">
              Stay Connected
            </h3>
            {status === 'success' ? (
              <p className="font-skia text-sm tracking-wide text-gold-300">{message}</p>
            ) : (
              <>
                <form className="flex" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading'}
                    className="w-full px-4 py-2.5 bg-wine-800 border border-wine-700 rounded-l-sm font-skia text-sm tracking-wide text-cream placeholder-cream/30 focus:outline-none focus:border-gold-400 transition-colors disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-5 py-2.5 bg-gold-400 text-wine-900 rounded-r-sm font-skia text-sm tracking-[0.15em] uppercase hover:bg-gold-300 transition-colors disabled:opacity-60"
                  >
                    {status === 'loading' ? '...' : 'Join'}
                  </button>
                </form>
                {message && (
                  <p className={`font-skia text-xs tracking-wide mt-2 ${status === 'duplicate' ? 'text-gold-300' : 'text-wine-300'}`}>
                    {message}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Social column */}
          <div>
            <h3 className="font-skia-title text-sm tracking-[0.25em] text-cream uppercase mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-5">
              <a href="#" className="text-cream/40 hover:text-gold-300 transition-colors duration-300"><Facebook size={18} /></a>
              <a href="#" className="text-cream/40 hover:text-gold-300 transition-colors duration-300"><Instagram size={18} /></a>
              <a href="#" className="text-cream/40 hover:text-gold-300 transition-colors duration-300"><Twitter size={18} /></a>
              <a href="#" className="text-cream/40 hover:text-gold-300 transition-colors duration-300"><Youtube size={18} /></a>
              <a href="#" className="text-cream/40 hover:text-gold-300 transition-colors duration-300"><Linkedin size={18} /></a>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-wine-800">
          <p className="font-skia text-xs tracking-[0.2em] text-cream/30 uppercase">
            &copy; {new Date().getFullYear()} Verji. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
