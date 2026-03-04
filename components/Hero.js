'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';
import ProductModal from './ProductModal';

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export default function Hero({ products }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log('products:', products);

  if (!products || products.length === 0) {
    return (
      <section id="home" className="relative flex flex-col items-center justify-center w-full h-screen bg-gray-50 overflow-hidden">
        <div className="text-center z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to Verji</h1>
          <p className="text-lg text-gray-600">Please add products to your Sanity CMS to see them here.</p>
        </div>
      </section>
    );
  }

  const productIndex = wrap(0, products.length, page);
  const product = products[productIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const openModal = () => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="relative flex flex-col items-center justify-center w-full h-screen bg-gray-50 overflow-hidden">
      <h1 className="absolute text-9xl font-bold text-gray-200 select-none">Verji</h1>

      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 200 : -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -200 : 200 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x);
              if (swipe > 50) {
                paginate(offset.x > 0 ? -1 : 1);
              }
            }}
            className="relative flex flex-col items-center justify-center cursor-pointer"
            onClick={openModal}
          >
            {product.image && (
              <motion.img
                src={urlFor(product.image).height(600).url()}
                alt={product.name}
                className="z-10 object-contain h-[60vh] drop-shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
            <div className="absolute bottom-1/4 transform translate-y-1/2 w-64 h-auto bg-white/50 backdrop-blur-md rounded-lg p-4 shadow-lg text-center">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.ingredients.join(', ')}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute z-20 top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4">
        <button onClick={() => paginate(-1)} className="p-2 bg-white/50 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={() => paginate(1)} className="p-2 bg-white/50 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <ProductModal product={selectedProduct} onClose={closeModal} />
    </section>
  );
}
