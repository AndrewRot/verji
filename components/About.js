'use client';

import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};

export default function About() {
  return (
    <motion.section 
      id="about"
      className="w-full min-h-screen bg-white py-20 px-4 md:px-8 lg:px-16 flex items-center"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeIn}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What is Verjus?</h2>
          <p className="text-lg text-gray-700 mb-4">
            Verji is a premium, non-alcoholic beverage crafted from the juice of unripe grapes. It offers a sophisticated, tart flavor profile that serves as a refreshing alternative to wine. Our mission is to provide an elegant and delicious option for any occasion.
          </p>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Perfect For:</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center"><span className="mr-3 text-lg">🥂</span>Fine dining and non-alcoholic pairings</li>
              <li className="flex items-center"><span className="mr-3 text-lg">🎉</span>Celebrating special moments</li>
              <li className="flex items-center"><span className="mr-3 text-lg">🌿</span>Wellness gatherings and mindful drinking</li>
            </ul>
          </div>
        </motion.div>
        <motion.div variants={fadeIn} className="grid grid-cols-2 gap-4 h-full">
            <img src="/placeholder-1.jpg" alt="Lifestyle image 1" className="rounded-lg shadow-lg object-cover w-full h-64" />
            <img src="/placeholder-2.jpg" alt="Lifestyle image 2" className="rounded-lg shadow-lg object-cover w-full h-64 mt-8" />
        </motion.div>
      </div>
    </motion.section>
  );
}
