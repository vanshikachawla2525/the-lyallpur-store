import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/products';
import { CategoryType } from '../types';

interface CategoryExperienceProps {
  onSelectCategory: (category: CategoryType) => void;
}

export const CategoryExperience: React.FC<CategoryExperienceProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-24 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#9E0B14] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Heritage Chapters
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#24130C] tracking-tight">
            Confectionery Collections
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-4 mb-4" />
          <p className="text-[#6C564A] text-base font-light">
            Every creation at Lyallpur represents an authentic chapter of Punjab’s rich culinary heritage.
          </p>
        </div>

        {/* Editorial Category Panels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES_DATA.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative h-80 sm:h-96 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-[#E8DC CE]"
            >
              {/* Background Photography with Gentle Scale */}
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Dynamic Atmospheric Tint Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#20060A]/95 via-[#20060A]/55 to-[#20060A]/20 group-hover:from-[#35090F]/95 group-hover:via-[#35090F]/60 transition-colors duration-500" />

              {/* Gold Accent Corner Border on Hover */}
              <div className="absolute inset-4 border border-[#D4AF37]/30 rounded-lg pointer-events-none group-hover:border-[#D4AF37]/80 transition-colors duration-500" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
                {/* Subtitle / Chapter label */}
                <span className="text-xs uppercase tracking-widest text-[#E8D09E] font-medium mb-1">
                  {cat.subtitle}
                </span>

                {/* Major Category Name */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 group-hover:text-[#FDE8B3] transition-colors">
                  {cat.name}
                </h3>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-[#E2D2C2] font-light line-clamp-2 mb-4 group-hover:text-white transition-colors">
                  {cat.tagline}
                </p>

                {/* Interactive Animated Gold Line & Arrow CTA */}
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  <span>Explore Chapter</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 text-[#FEE6AA]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
