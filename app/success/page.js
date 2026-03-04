'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function SuccessPage() {
  useEffect(() => {
    // Here you could potentially clear the cart or perform other post-purchase actions
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Thank you for your purchase!</h1>
      <p className="text-lg text-gray-700 mb-8">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
      <Link href="/" className="px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors">
        Continue Shopping
      </Link>
    </div>
  );
}
