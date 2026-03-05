'use client';

import { motion, AnimatePresence } from 'framer-motion';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';
import { loadStripe } from '@stripe/stripe-js';

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // stripePriceId
      body: JSON.stringify({ stripePriceId: product.stripePriceId, quantity: 1 }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 50 }}
          className="relative w-full max-w-2xl p-8 bg-white rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              {product.image && (
                <img
                  src={urlFor(product.image).height(600).url()}
                  alt={product.name}
                  className="object-contain w-full h-full rounded-lg"
                />
              )}
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Ingredients</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {product.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>
              <button
                onClick={handleCheckout}
                className="w-full px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}