'use client';

import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import ProductModal from './ProductModal';

// Each product gets a distinct liquid color palette
const liquidPalettes = [
  { light: '#E8A0B0', mid: '#D4708A', dark: '#A63D55', highlight: '#F2C4D0' }, // Rose blush
  { light: '#D4A87A', mid: '#C48A5A', dark: '#8B5E3C', highlight: '#E8CDB0' }, // Golden amber
  { light: '#C9A0C9', mid: '#A870A8', dark: '#7A4D7A', highlight: '#DFC4DF' }, // Lavender
  { light: '#A8C4A0', mid: '#7AA870', dark: '#4D7A45', highlight: '#C4DFC0' }, // Sage green
  { light: '#E0B8B8', mid: '#C98A8A', dark: '#9E5A5A', highlight: '#F0D4D4' }, // Dusty rose
  { light: '#B8C8D8', mid: '#8AA0C0', dark: '#5A7098', highlight: '#D4E0F0' }, // Slate blue
];

function BottleSvg({ palette, uid }) {
  return (
    <svg
      viewBox="0 0 200 600"
      className="w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${uid}-glassShine`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0.08" />
          <stop offset="25%" stopColor="white" stopOpacity="0.25" />
          <stop offset="40%" stopColor="white" stopOpacity="0.05" />
          <stop offset="70%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0.03" />
        </linearGradient>

        <linearGradient id={`${uid}-liquidFill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.highlight} stopOpacity="0.5" />
          <stop offset="30%" stopColor={palette.light} stopOpacity="0.6" />
          <stop offset="70%" stopColor={palette.mid} stopOpacity="0.7" />
          <stop offset="100%" stopColor={palette.dark} stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id={`${uid}-glassBody`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E8E8E8" stopOpacity="0.3" />
          <stop offset="20%" stopColor="#F8F8F8" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="80%" stopColor="#F0F0F0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#D8D8D8" stopOpacity="0.35" />
        </linearGradient>

        <linearGradient id={`${uid}-neckGrad`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E0E0E0" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#F5F5F5" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#D0D0D0" stopOpacity="0.4" />
        </linearGradient>

        <radialGradient id={`${uid}-bottleShadow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>

        <clipPath id={`${uid}-bottleBodyClip`}>
          <path d="
            M 75 195
            C 55 210, 42 250, 40 290
            L 38 480
            C 38 510, 50 530, 60 535
            L 140 535
            C 150 530, 162 510, 162 480
            L 160 290
            C 158 250, 145 210, 125 195
            Z
          " />
        </clipPath>

        {/* Label paper background gradient — cylindrical falloff */}
        <linearGradient id={`${uid}-labelBg`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F5F0E8" stopOpacity="0.0" />
          <stop offset="12%" stopColor="#F5F0E8" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#FFFCF7" stopOpacity="0.7" />
          <stop offset="88%" stopColor="#F5F0E8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0.0" />
        </linearGradient>

        {/* Cylindrical shading overlay for label zone */}
        <linearGradient id={`${uid}-cylShade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.15" />
          <stop offset="20%" stopColor="#000" stopOpacity="0.03" />
          <stop offset="50%" stopColor="#000" stopOpacity="0" />
          <stop offset="80%" stopColor="#000" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Shadow ellipse */}
      <ellipse cx="100" cy="555" rx="70" ry="12" fill={`url(#${uid}-bottleShadow)`} />

      {/* Bottle body */}
      <path
        d="
          M 75 195
          C 55 210, 42 250, 40 290
          L 38 480
          C 38 510, 50 530, 60 535
          L 140 535
          C 150 530, 162 510, 162 480
          L 160 290
          C 158 250, 145 210, 125 195
          Z
        "
        fill={`url(#${uid}-glassBody)`}
        stroke="#D0D0D0"
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />

      {/* Liquid */}
      <g clipPath={`url(#${uid}-bottleBodyClip)`}>
        <rect x="35" y="240" width="130" height="300" fill={`url(#${uid}-liquidFill)`} />
        <ellipse cx="100" cy="242" rx="60" ry="6" fill={palette.highlight} fillOpacity="0.35" />
      </g>

      {/* ===== LABEL ZONE — background paper + gold rules + text ===== */}
      {/* Label background paper */}
      <rect x="42" y="335" width="116" height="130" fill={`url(#${uid}-labelBg)`} />

      {/* Gold border lines */}
      <line x1="55" y1="343" x2="145" y2="343" stroke="#C5A028" strokeWidth="0.6" strokeOpacity="0.6" />
      <line x1="55" y1="457" x2="145" y2="457" stroke="#C5A028" strokeWidth="0.6" strokeOpacity="0.6" />

      {/* "VERJI" text on label beneath where logo will be overlaid */}
      <text
        x="100"
        y="452"
        textAnchor="middle"
        fontFamily="'Skia Extended Black', Skia, Georgia, serif"
        fontSize="9"
        fontWeight="900"
        letterSpacing="4"
        fill="#4A1C27"
        fillOpacity="0.7"
      >
        VERJI
      </text>

      {/* Cylindrical shading over the label zone */}
      <rect x="42" y="335" width="116" height="130" fill={`url(#${uid}-cylShade)`} />

      {/* Glass reflection overlay — on top of label */}
      <path
        d="
          M 75 195
          C 55 210, 42 250, 40 290
          L 38 480
          C 38 510, 50 530, 60 535
          L 140 535
          C 150 530, 162 510, 162 480
          L 160 290
          C 158 250, 145 210, 125 195
          Z
        "
        fill={`url(#${uid}-glassShine)`}
      />

      {/* Edge highlights */}
      <line x1="52" y1="230" x2="46" y2="490" stroke="white" strokeWidth="1.5" strokeOpacity="0.2" strokeLinecap="round" />
      <line x1="150" y1="230" x2="154" y2="480" stroke="white" strokeWidth="0.8" strokeOpacity="0.1" strokeLinecap="round" />

      {/* Neck */}
      <path
        d="
          M 82 85
          L 82 170
          C 80 180, 76 190, 75 195
          L 125 195
          C 124 190, 120 180, 118 170
          L 118 85
          Z
        "
        fill={`url(#${uid}-neckGrad)`}
        stroke="#D0D0D0"
        strokeWidth="0.6"
        strokeOpacity="0.4"
      />
      <line x1="90" y1="90" x2="88" y2="185" stroke="white" strokeWidth="1" strokeOpacity="0.15" />

      {/* Lip */}
      <rect x="80" y="72" width="40" height="16" rx="3" ry="3" fill="#E8E0D0" stroke="#C8C0B0" strokeWidth="0.6" />

      {/* Foil cap */}
      <rect x="78" y="65" width="44" height="12" rx="4" ry="4" fill={palette.dark} fillOpacity="0.85" stroke={palette.dark} strokeWidth="0.5" strokeOpacity="0.6" />
      <rect x="82" y="67" width="20" height="3" rx="1.5" fill="white" fillOpacity="0.15" />

      {/* Base */}
      <ellipse cx="100" cy="535" rx="52" ry="6" fill="#E0E0E0" fillOpacity="0.25" stroke="#C8C8C8" strokeWidth="0.5" strokeOpacity="0.3" />
      <ellipse cx="100" cy="530" rx="25" ry="4" fill="#F0F0F0" fillOpacity="0.15" />
    </svg>
  );
}

function WineBottle({ palette, className }) {
  const uid = useId().replace(/:/g, '');

  // Logo position as percentages of the bottle container.
  // SVG viewBox is 200x600. Label zone center: x=100 (50%), y≈385 (64.2%).
  // Logo occupies roughly x: 30%-70%, y: 58%-72% of the viewBox.
  const logoStyle = {
    position: 'absolute',
    top: '66%',
    left: '50%',
    width: '38%',
    transform: 'translate(-50%, -50%) perspective(300px) rotateY(0deg)',
    // CSS mask creates the cylindrical light-falloff on the logo itself
    WebkitMaskImage:
      'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.8) 25%, black 40%, black 60%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0.3) 90%, transparent 100%)',
    maskImage:
      'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.8) 25%, black 40%, black 60%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0.3) 90%, transparent 100%)',
    pointerEvents: 'none',
  };

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: '200/600' }}>
      <BottleSvg palette={palette} uid={uid} />
      {/* Logo overlaid on the label zone with cylindrical wrap mask */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/VergiLogo.png"
        alt=""
        style={logoStyle}
        draggable={false}
      />
    </div>
  );
}

// Dot indicators
function CarouselDots({ total, current, onSelect }) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`rounded-full transition-all duration-500 ${
            i === current
              ? 'w-8 h-2 bg-wine-600'
              : 'w-2 h-2 bg-wine-300 hover:bg-wine-400'
          }`}
        />
      ))}
    </div>
  );
}

export default function Hero({ products }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!products || products.length === 0) {
    return (
      <section
        id="home"
        className="relative flex flex-col items-center justify-center w-full min-h-screen bg-cream overflow-hidden"
      >
        <div className="text-center z-10">
          <h1 className="font-skia-title text-4xl tracking-wider text-wine-800 mb-4">
            Welcome to Verji
          </h1>
          <p className="font-skia text-lg text-wine-400 tracking-wide">
            Products coming soon.
          </p>
        </div>
      </section>
    );
  }

  const productIndex = wrap(0, products.length, page);
  const product = products[productIndex];
  const palette = liquidPalettes[productIndex % liquidPalettes.length];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const goToSlide = (index) => {
    const diff = index - productIndex;
    if (diff !== 0) setPage([page + diff, diff > 0 ? 1 : -1]);
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center w-full min-h-screen bg-cream overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 50% 55%, ${palette.light}20, transparent)`,
          transition: 'background 0.8s ease',
        }}
      />

      {/* Carousel */}
      <div className="relative z-10 flex items-center justify-center w-full h-full pt-24 pb-16">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 120 : -120, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction > 0 ? -120 : 120, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(e, { offset }) => {
              if (Math.abs(offset.x) > 50) {
                paginate(offset.x > 0 ? -1 : 1);
              }
            }}
            className="flex flex-col items-center cursor-pointer select-none"
            onClick={() => setSelectedProduct(product)}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <WineBottle
                palette={palette}
                className="h-[50vh] sm:h-[55vh] md:h-[60vh] drop-shadow-lg"
              />
            </motion.div>

            <motion.div
              className="mt-8 text-center max-w-sm px-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="font-skia-title text-2xl sm:text-3xl tracking-[0.15em] text-wine-800 uppercase">
                {product.name}
              </h2>
              {product.ingredients && (
                <p className="mt-2 font-skia text-sm tracking-wider text-wine-400">
                  {product.ingredients.join(' · ')}
                </p>
              )}
              <p className="mt-4 font-skia text-xs tracking-[0.3em] uppercase text-gold-400">
                Tap to explore
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      {products.length > 1 && (
        <div className="absolute z-20 top-1/2 -translate-y-1/2 flex justify-between w-full px-4 sm:px-8">
          <button
            onClick={() => paginate(-1)}
            className="p-3 rounded-full border border-wine-200 text-wine-400 hover:text-wine-700 hover:border-wine-400 transition-all duration-300 bg-cream/50 backdrop-blur-sm"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className="p-3 rounded-full border border-wine-200 text-wine-400 hover:text-wine-700 hover:border-wine-400 transition-all duration-300 bg-cream/50 backdrop-blur-sm"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Dots */}
      {products.length > 1 && (
        <div className="absolute bottom-8 z-20">
          <CarouselDots
            total={products.length}
            current={productIndex}
            onSelect={goToSlide}
          />
        </div>
      )}

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
