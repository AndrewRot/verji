'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';
import ProductModal from './ProductModal';

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};

const ProductCard = ({ product, onSelect }) => (
  <motion.div
    className="cursor-pointer group"
    onClick={() => onSelect(product)}
    variants={fadeIn}
  >
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
      {product.image && (
        <img
          src={urlFor(product.image).width(400).height(400).url()}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      )}
    </div>
    <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
    <p className="mt-1 text-md font-semibold text-gray-700">${product.price.toFixed(2)}</p>
  </motion.div>
);

export default function Shop({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <motion.section 
      id="shop"
      className="w-full min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold text-center mb-12">Shop Verji</motion.h2>
        <motion.div 
          className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 gap-x-8"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onSelect={openModal} />
          ))}
        </motion.div>
      </div>
      {selectedProduct && <ProductModal product={selectedProduct} onClose={closeModal} />}
    </motion.section>
  );
}
