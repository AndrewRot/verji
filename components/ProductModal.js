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
        className="fixed inset-0 z-50 flex items-center justify-center bg-wine-900/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 30, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl mx-4 p-8 sm:p-10 bg-cream border border-wine-100 rounded-sm shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-wine-300 hover:text-wine-700 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              {product.image && (
                <div className="aspect-square bg-ivory/50 border border-wine-100 rounded-sm overflow-hidden">
                  <img
                    src={urlFor(product.image).height(600).url()}
                    alt={product.name}
                    className="object-contain w-full h-full"
                  />
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <p className="font-skia text-xs tracking-[0.3em] uppercase text-gold-400 mb-2">
                Verji Collection
              </p>
              <h2 className="font-skia-title text-2xl sm:text-3xl tracking-[0.1em] text-wine-800 uppercase mb-3">
                {product.name}
              </h2>
              <div className="w-10 h-px bg-wine-200 mb-4" />
              <p className="font-skia text-sm text-wine-600 leading-relaxed tracking-wide mb-5">
                {product.description}
              </p>

              <div className="mb-5">
                <h3 className="font-skia-title text-xs tracking-[0.2em] text-wine-700 uppercase mb-2">
                  Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, i) => (
                    <span
                      key={i}
                      className="font-skia text-xs tracking-wider text-wine-500 px-3 py-1 border border-wine-100 rounded-sm bg-white/50"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <p className="font-skia-title text-2xl tracking-wider text-wine-800 mb-6">
                ${product.price.toFixed(2)}
              </p>

              <button
                onClick={handleCheckout}
                className="w-full px-6 py-3 bg-wine-800 text-cream font-skia text-sm tracking-[0.25em] uppercase rounded-sm hover:bg-wine-700 transition-colors duration-300"
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
