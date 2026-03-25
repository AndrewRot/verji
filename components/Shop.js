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
    className="cursor-pointer group text-center"
    onClick={() => onSelect(product)}
    variants={fadeIn}
  >
    <div className="aspect-square w-full overflow-hidden rounded-sm bg-ivory/50 border border-wine-100 group-hover:border-wine-200 transition-all duration-300">
      {product.image && (
        <img
          src={urlFor(product.image).width(400).height(400).url()}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      )}
    </div>
    <h3 className="mt-5 font-skia-title text-base tracking-[0.15em] text-wine-800 uppercase">
      {product.name}
    </h3>
    <p className="mt-1 font-skia text-sm tracking-wider text-wine-500">
      ${product.price.toFixed(2)}
    </p>
  </motion.div>
);

export default function Shop({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <motion.section
      id="shop"
      className="w-full bg-ivory/30 py-24 px-4 sm:px-6 lg:px-8"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeIn} className="text-center mb-16">
          <p className="font-skia text-sm tracking-[0.3em] uppercase text-gold-400 mb-4">
            Our Collection
          </p>
          <h2 className="font-skia-title text-4xl md:text-5xl tracking-wide text-wine-800 mb-6">
            Shop Verji
          </h2>
          <div className="w-16 h-px bg-wine-300 mx-auto" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 gap-x-10"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onSelect={setSelectedProduct}
            />
          ))}
        </motion.div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </motion.section>
  );
}
