import React from 'react';
import { motion } from 'motion/react';

// Single 2-in-a-row Product Card Cinematic Skeleton
export const ProductCardSkeleton: React.FC<{ index?: number }> = ({ index = 0 }) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E6D8C8] overflow-hidden shadow-xs flex flex-col justify-between w-full relative">
      {/* Aspect ratio image stage skeleton */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-gradient-to-br from-[#F5EEE6] via-[#EDE2D5] to-[#F5EEE6] overflow-hidden">
        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF9F0]/60 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: (index % 4) * 0.15,
          }}
        />

        {/* Top Badges Skeleton */}
        <div className="absolute top-2.5 left-2.5 w-14 h-4 rounded bg-[#E4D5C5]/80" />
        <div className="absolute top-2.5 right-2.5 w-16 h-4 rounded-full bg-[#E8DCB8]/80 border border-[#D4AF37]/30" />
      </div>

      {/* Details skeleton */}
      <div className="p-3 sm:p-4 md:p-5 flex-grow flex flex-col justify-between space-y-3">
        <div>
          {/* Subcategory & Star Rating skeleton */}
          <div className="flex items-center justify-between mb-2">
            <div className="w-20 h-3 rounded bg-[#EADCCF]" />
            <div className="w-10 h-3 rounded bg-[#F0E4CE]" />
          </div>

          {/* Title skeleton */}
          <div className="space-y-1.5 mb-2">
            <div className="w-3/4 h-4 sm:h-5 rounded bg-[#DFCFC1]" />
            <div className="w-1/2 h-3 rounded bg-[#EDE2D7]" />
          </div>
        </div>

        {/* Weight pills & price + button skeleton */}
        <div className="pt-2.5 border-t border-[#F2E8DC] space-y-2.5">
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-10 h-5 rounded bg-[#EDE3D8]" />
              <div className="w-10 h-5 rounded bg-[#EDE3D8]" />
            </div>
            <div className="w-14 h-5 rounded bg-[#DDCBB9]" />
          </div>

          <div className="w-full h-8 sm:h-9 rounded-lg bg-gradient-to-r from-[#F0E6D8] via-[#E6D7C4] to-[#F0E6D8]" />
        </div>
      </div>
    </div>
  );
};

// 2-in-a-Row Product Grid Cinematic Skeleton
export const ProductGridCinematicSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} index={i} />
      ))}
    </div>
  );
};

// Big Hero Showcase Cinematic Skeleton
export const HeroCinematicSkeleton: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl xl:max-w-6xl mx-auto h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-[0_24px_70px_rgba(0,0,0,0.85)] bg-[#200407]">
      {/* Inner antique gold border */}
      <div className="absolute inset-3 border border-[#D4AF37]/20 rounded-xl sm:rounded-2xl pointer-events-none z-20" />

      {/* Sweeping shimmer wave */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent pointer-events-none z-10"
        animate={{ x: ['-100%', '200%'] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Top Badge Skeleton */}
      <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-20">
        <div className="w-36 sm:w-48 h-6 sm:h-8 rounded-full bg-[#3D0C13] border border-[#D4AF37]/30 animate-pulse" />
      </div>

      {/* Center Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 rounded-full bg-[#D4AF37]/10 blur-2xl" />
      </div>

      {/* Bottom Overlay Skeleton */}
      <div className="absolute bottom-6 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
        <div className="space-y-2 max-w-xl w-full">
          <div className="w-2/3 h-7 sm:h-10 rounded-lg bg-[#3D0C13] border border-[#D4AF37]/20 animate-pulse" />
          <div className="w-1/3 h-4 sm:h-5 rounded bg-[#2D070C] animate-pulse" />
        </div>

        <div className="flex items-center gap-3">
          <div className="w-20 h-9 rounded-lg bg-[#3D0C13] border border-[#D4AF37]/20 animate-pulse" />
          <div className="w-28 h-9 rounded-lg bg-[#5A0F17] border border-[#D4AF37]/30 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
