import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, MapPin, Award, CheckCircle2 } from 'lucide-react';
import {
  STORY_CHAPTERS,
  craftMomentImg,
  heroSweetsImg,
  gachakImg,
  storeFacadeImg,
  desiGheeImg,
} from '../data/products';

export const HeritageStoryTimeline: React.FC = () => {
  // Pair each historic chapter with authentic heritage photography
  const chapterImages = [
    craftMomentImg, // 1920s: Ancestral roots in Lyallpur & artisanal kadhais
    heroSweetsImg, // 1975: Gokul Road Ludhiana & the iconic Petha
    gachakImg, // 1990s: Model Town flagship & winter gachak legacy
    storeFacadeImg, // 2010s: Third generation retail expansion & hygiene standards
    desiGheeImg, // Today: International exports and pure desi ghee promise
  ];

  return (
    <section id="our-story" className="py-24 bg-[#FAF7F2] relative overflow-hidden border-b border-[#E6D9CA]">
      {/* Background Decorative Floral Accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#9E0B14]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Big Font Spring Pop-Up */}
        <motion.div
          initial={{ opacity: 0, scale: 0.65, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 240, damping: 18 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF0D4] border border-[#E4CA92] text-[#865E12] text-xs uppercase tracking-widest font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            Five Decades of Craftsmanship
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-[#24130C] tracking-tight leading-tight">
            Our Story
          </h2>

          <p className="font-serif italic text-[#9E0B14] text-2xl sm:text-3xl mt-3 font-medium">
            From 1975 to generations beyond.
          </p>

          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-6" />

          <p className="text-base sm:text-lg text-[#5A483E] font-light leading-relaxed max-w-2xl mx-auto">
            Rooted in rich heritage, Lyallpur Sweets traces its origins to our ancestral homeland in Pakistan, where the Kharbanda family first nurtured their sweet-making mastery. Founded formally in 1975 in Ludhiana by Sh. Surinder Kharbanda, our journey began with the iconic Petha on Gokul Road.
          </p>
        </motion.div>

        {/* Grand Visual Alternating Heritage Timeline */}
        <div className="relative">
          {/* Central Golden Thread Line (Hidden on mobile, centered on desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#D4AF37]/30 via-[#D4AF37] to-[#D4AF37]/30 -translate-x-1/2 pointer-events-none" />

          <div className="space-y-16 sm:space-y-24">
            {STORY_CHAPTERS.map((chapter, idx) => {
              const isEven = idx % 2 === 0;
              const image = chapterImages[idx] || craftMomentImg;

              return (
                <div
                  key={chapter.year}
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Central Timeline Milestone Node (Desktop only) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#FAF2DE] border-4 border-[#D4AF37] shadow-xl flex items-center justify-center text-[#825B0E] font-serif font-bold text-xs">
                      {idx + 1}
                    </div>
                  </div>

                  {/* Visual Image Column (Left on even, Right on odd) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`lg:col-span-6 ${
                      isEven ? 'lg:order-1' : 'lg:order-2 lg:col-start-7'
                    }`}
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white group">
                      {/* Year Watermark Stamp */}
                      <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#20060A]/85 backdrop-blur-md border border-[#D4AF37]/60 text-[#FEE6AA] font-serif font-bold text-sm tracking-wider shadow-lg">
                        {chapter.year}
                      </div>

                      {/* Archival Photography with Subtle Scale */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#240609]">
                        <img
                          src={image}
                          alt={`${chapter.year} - ${chapter.title}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                        
                        {/* Antique Gold Inner Border */}
                        <div className="absolute inset-3 border border-[#D4AF37]/30 rounded-lg pointer-events-none group-hover:border-[#D4AF37]/70 transition-colors" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Story Text Narrative Column (Right on even, Left on odd) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                    className={`lg:col-span-6 ${
                      isEven
                        ? 'lg:order-2 lg:col-start-7 lg:pl-6'
                        : 'lg:order-1 lg:pr-6'
                    }`}
                  >
                    <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#E7D6C3] shadow-md hover:shadow-lg transition-shadow">
                      {/* Chapter Pill & Year */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0D4] text-[#865E12] text-[11px] uppercase tracking-wider font-semibold border border-[#E4CA92]">
                          Era {chapter.year}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-[#9E0B14] font-semibold">
                          {chapter.title}
                        </span>
                      </div>

                      {/* Subtitle / Key Historical Figures */}
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#24130C] mb-3 leading-snug">
                        {chapter.subtitle}
                      </h3>

                      {/* Gold Accent Divider */}
                      <div className="w-12 h-[2px] bg-[#D4AF37] mb-4" />

                      {/* Factual Historical Description */}
                      <p className="text-sm sm:text-base text-[#5A483E] font-light leading-relaxed mb-6">
                        {chapter.description}
                      </p>

                      {/* Milestone Hallmarks */}
                      <div className="pt-4 border-t border-[#F0E4D5] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-[#9E0B14] font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                          <span>Lyallpur Heritage Certified</span>
                        </div>
                        <span className="text-[#8C7667] font-serif">Punjab, India</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

