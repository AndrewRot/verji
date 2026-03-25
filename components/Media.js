'use client';

import { motion } from 'framer-motion';

const reviews = [
  {
    quote: 'An exquisite alternative to traditional wine. Verji has a permanent place on our menu.',
    name: 'Alice Waters',
    company: 'Chez Panisse',
  },
  {
    quote: "The most refreshing non-alcoholic drink I've had this year. A true game-changer.",
    name: 'Amanda Cuz',
    company: 'CNN',
  },
  {
    quote: 'Perfectly balanced and endlessly sippable. Verji is a revelation.',
    name: 'Jane Smith',
    company: 'Bon Appetit',
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};

export default function Media() {
  return (
    <motion.section
      id="media"
      className="w-full bg-cream py-24 px-4"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeIn} className="text-center mb-16">
          <p className="font-skia text-sm tracking-[0.3em] uppercase text-gold-400 mb-4">
            Press & Praise
          </p>
          <h2 className="font-skia-title text-4xl md:text-5xl tracking-wide text-wine-800 mb-6">
            Rave Reviews
          </h2>
          <div className="w-16 h-px bg-wine-300 mx-auto" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={{ animate: { transition: { staggerChildren: 0.12 } } }}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="text-center px-8 py-10 border border-wine-100 rounded-sm bg-white/40 backdrop-blur-sm"
            >
              <svg className="w-8 h-8 text-wine-200 mx-auto mb-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>
              <p className="font-skia text-base text-wine-700 leading-relaxed tracking-wide mb-6 italic">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="w-8 h-px bg-gold-400 mx-auto mb-4" />
              <p className="font-skia-title text-sm tracking-[0.15em] text-wine-800 uppercase">
                {review.name}
              </p>
              <p className="font-skia text-xs tracking-wider text-wine-400 mt-1">
                {review.company}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
