import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import {
  heroSweetsImg,
  dhodaBarfiImg,
  motichoorLadduImg,
  gachakImg,
} from '../data/products';
import { CategoryType, Product } from '../types';
import { ShopSection } from './ShopSection';

interface HeroSectionProps {
  products: Product[];
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  onAddToCart: (product: Product, weight: string, price: number, quantity: number) => void;
  onBuyNow: (product: Product, weight: string, price: number, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onShopClick?: (category?: CategoryType) => void;
  onStoryClick?: () => void;
}

interface BigSlide {
  id: string;
  name: string;
  punjabiName: string;
  tagline: string;
  image: string;
  price: string;
  category: CategoryType;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
}) => {
  // 3 Signature Pictures for the One Big Horizontal Showcase
  const bigSlides: BigSlide[] = [
    {
      id: 'chana-dhoda',
      name: 'Pure Desi Ghee Chana & Dhoda Barfi',
      punjabiName: 'ਚਨਾ ਤੇ ਢੋਡਾ ਬਰਫ਼ੀ • ੧੦੦% ਦੇਸੀ ਘਿਓ',
      tagline: '100% Pure Desi Ghee • Slow Simmered',
      image: dhodaBarfiImg,
      price: 'From ₹220',
      category: 'sweets',
    },
    {
      id: 'kesar-laddu',
      name: 'Kashmiri Kesar Motichoor Laddu',
      punjabiName: 'ਸ਼ਾਹੀ ਮੋਤੀਚੂਰ ਲੱਡੂ • ਕੇਸਰ ਮੋਤੀ',
      tagline: 'Royal Celebrations • Melt in Mouth',
      image: motichoorLadduImg || heroSweetsImg,
      price: 'From ₹190',
      category: 'sweets',
    },
    {
      id: 'gur-gachak',
      name: 'Winter Gur Khasta Gachak & Til Rewri',
      punjabiName: 'ਗੁੜ ਖਸਤਾ ਗੱਚਕ ਤੇ ਤਿਲ ਰਿਓੜੀ',
      tagline: 'Winter Heritage • Organic Jaggery & Sesame',
      image: gachakImg || heroSweetsImg,
      price: 'From ₹170',
      category: 'gachak',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically scroll & show 2-3 pictures in the same big size
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bigSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [bigSlides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + bigSlides.length) % bigSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bigSlides.length);
  };

  const handleSlideSelect = (category: CategoryType) => {
    onSelectCategory(category);
    const el = document.getElementById('hero-shop-products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-[#180306] text-white overflow-hidden -mt-20 pt-28 pb-16 sm:pb-24">
      {/* Background Atmospheric Lighting & Deep Maroon Glow */}
      <div className="absolute inset-0 opacity-45 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(190,18,29,0.5),rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Majestic Hero Headline with Big Spring Pop-Up */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.62, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.85,
              type: 'spring',
              stiffness: 240,
              damping: 18,
            }}
          >
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-[#FAF7F2] leading-[1.08] drop-shadow-2xl">
              The Taste of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDE8B3] via-[#D4AF37] to-[#F3CE65] font-display italic font-normal">
                Royal Celebrations
              </span>
            </h1>
          </motion.div>
        </div>

        {/* ================= ONLY ONE BIG ANIMATED POP PICTURE (HORIZONTAL LAYOUT AUTO-SCROLLING 3 PICTURES) ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
          className="relative w-full max-w-5xl xl:max-w-6xl mx-auto h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#D4AF37]/65 shadow-[0_24px_70px_rgba(0,0,0,0.85)] bg-[#200407]"
        >
          {/* Inner Antique Gold Filigree Accent Frame */}
          <div className="absolute inset-3 border border-[#D4AF37]/35 rounded-xl sm:rounded-2xl pointer-events-none z-20" />

          {/* Left / Right Carousel Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#180306]/80 hover:bg-[#9E0B14] border border-[#D4AF37]/60 text-[#FEE6AA] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xl backdrop-blur-md active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#180306]/80 hover:bg-[#9E0B14] border border-[#D4AF37]/60 text-[#FEE6AA] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xl backdrop-blur-md active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Horizontal Sliding Track of Big Pictures in the Exact Same Big Size */}
          <div
            className="flex w-full h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {bigSlides.map((slide) => (
              <div
                key={slide.id}
                className="w-full h-full flex-shrink-0 relative overflow-hidden cursor-pointer"
                onClick={() => handleSlideSelect(slide.category)}
              >
                {/* Crisp Hero Image with zero lag */}
                <img
                  src={slide.image}
                  alt={slide.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {/* Rich Atmospheric Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#140204]/95 via-[#140204]/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#140204]/70 via-transparent to-[#140204]/30" />

                {/* Top Badge: Tagline */}
                <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-20">
                  <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#9E0B14]/95 border border-[#D4AF37]/60 text-[#FEE6AA] text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg backdrop-blur-md">
                    {slide.tagline}
                  </span>
                </div>

                {/* Bottom Overlay: Big Title, Punjabi Script, Price, and CTA */}
                <div className="absolute bottom-6 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
                  <div className="max-w-xl">
                    <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                      {slide.name}
                    </h2>
                    <p className="text-xs sm:text-base text-[#EAD8CA] font-serif mt-1 drop-shadow">
                      {slide.punjabiName}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <span className="text-xs sm:text-sm md:text-base font-serif font-bold text-[#FCE8B6] bg-[#140204]/90 px-3.5 py-1.5 rounded-lg border border-[#D4AF37]/50 shadow-md">
                      {slide.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSlideSelect(slide.category);
                      }}
                      className="px-4 py-2 bg-[#9E0B14] hover:bg-[#BE121D] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg shadow-lg border border-[#D4AF37]/40 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>Shop Below</span>
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicator Progress Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-[#180306]/70 px-3 py-1 rounded-full border border-[#D4AF37]/30 backdrop-blur-xs">
            {bigSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>

      {/* ================= PRODUCTS TO SHOP IN HERO SECTION (JUST BELOW ANIMATION IN A POPUP WAY) ================= */}
        <motion.div
          id="hero-shop-products-section"
          initial={{ opacity: 0, scale: 0.92, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.85,
            delay: 0.35,
            type: 'spring',
            bounce: 0.28,
          }}
          className="mt-10 sm:mt-14 bg-[#FAF7F2] text-[#2A160E] rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 border-2 border-[#D4AF37]/50 shadow-[0_25px_70px_rgba(0,0,0,0.65)]"
        >
          <ShopSection
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
            onSelectProduct={onSelectProduct}
            isHeroEmbedded={true}
          />
        </motion.div>
      </div>
    </section>
  );
};
