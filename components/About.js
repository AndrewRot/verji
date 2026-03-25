'use client';

import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};

const features = [
  {
    title: 'Fine Dining',
    description: 'An elegant non-alcoholic pairing for any table setting.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Natural Ingredients',
    description: 'Crafted with botanicals and ingredients sourced from Morocco.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Health-Forward',
    description: 'Promotes wellness with every sip — no alcohol, no compromise.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <motion.section
      id="about"
      className="w-full bg-cream py-24 px-4 md:px-8 lg:px-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div variants={fadeIn} className="text-center mb-16">
          <p className="font-skia text-sm tracking-[0.3em] uppercase text-gold-400 mb-4">
            The Art of Verjus
          </p>
          <h2 className="font-skia-title text-4xl md:text-5xl tracking-wide text-wine-800 mb-6">
            What is Verji?
          </h2>
          <div className="w-16 h-px bg-wine-300 mx-auto mb-8" />
          <p className="font-skia text-lg text-wine-600 leading-relaxed max-w-2xl mx-auto tracking-wide">
            A premium, non-alcoholic beverage crafted from the juice of unripe grapes
            and infused with natural Moroccan botanicals. Verji offers a sophisticated,
            tart flavor profile that serves as a refined alternative to wine.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          variants={{ animate: { transition: { staggerChildren: 0.15 } } }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeIn}
              className="text-center px-6 py-10 border border-wine-100 rounded-sm bg-white/40 backdrop-blur-sm hover:border-wine-200 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-wine-200 text-wine-500 mb-5">
                {feature.icon}
              </div>
              <h3 className="font-skia-title text-lg tracking-[0.12em] text-wine-800 uppercase mb-3">
                {feature.title}
              </h3>
              <p className="font-skia text-sm text-wine-500 leading-relaxed tracking-wide">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
