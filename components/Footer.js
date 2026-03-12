'use client';

import { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error' | 'duplicate'
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
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Verji</h3>
            <p className="text-sm">123 Vineyard Lane, Napa Valley, CA 94558</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Connected</h3>
            {status === 'success' ? (
              <p className="text-green-400 text-sm">{message}</p>
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
                    className="w-full px-4 py-2 rounded-l-md text-gray-800 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-green-600 px-4 py-2 rounded-r-md disabled:opacity-60"
                  >
                    {status === 'loading' ? '...' : 'Subscribe'}
                  </button>
                </form>
                {message && (
                  <p className={`text-sm mt-2 ${status === 'duplicate' ? 'text-yellow-400' : 'text-red-400'}`}>
                    {message}
                  </p>
                )}
              </>
            )}
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
