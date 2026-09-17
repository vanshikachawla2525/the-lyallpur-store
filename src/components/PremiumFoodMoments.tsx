import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Play, Award, Volume2, VolumeX } from 'lucide-react';
import { desiGheeImg, heroSweetsImg, chanaBarfiImg, gachakImg } from '../data/products';

export const PremiumFoodMoments: React.FC = () => {
  const [activeMoment, setActiveMoment] = useState(0);

  const moments = [
    {
      title: 'The Slow Desi Ghee Simmer',
      sub: 'Simmered in pure brass kadhais until rich nutty aromas perfume the air.',
      image: desiGheeImg,
      sensoryTag: 'Pure Aroma',
    },
    {
      title: 'The Golden Motichoor Laddu',
      sub: 'Fragile droplet pearls infused with fragrant saffron, green cardamom, and golden melon seeds.',
      image: heroSweetsImg,
      sensoryTag: 'Melt-in-Mouth Texture',
    },
    {
      title: 'Roasted Chana Barfi & Kalakand',
      sub: 'Hand-roasted gram flour folded with creamy evaporated milk and golden bilona ghee.',
      image: chanaBarfiImg,
      sensoryTag: 'Signature Caramel Notes',
    },
    {
      title: 'The Crisp Winter Gur Gachak Snap',
      sub: 'Crushed roasted peanuts and organic sugarcane jaggery broken with a crisp, brittle crack.',
      image: gachakImg,
      sensoryTag: 'Golden Crunch',
    },
  ];

  return (
    <section className="py-24 bg-[#20060A] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(190,18,29,0.3)_0%,rgba(32,6,10,0.95)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#F3E3BE] text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Cinematic Food Theater
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#FAF7F2]">
            Artisan Food Moments
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto my-4" />
          <p className="text-[#E5D2BA] text-base sm:text-lg font-light leading-relaxed">
            The alchemy of Indian sweetmaking is sensory poetry: the hiss of fresh ghee, the glisten of amber syrups, and the gentle dusting of Iranian pistachio.
          </p>
        </div>

        {/* Cinematic Mainstage Cinema Container */}
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#2E0B10] aspect-[16/9] max-h-[540px] mb-8 group">
          <motion.div
            key={activeMoment}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full relative"
          >
            <img
              src={moments[activeMoment].image}
              alt={moments[activeMoment].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Cinematic Film Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#20060A] via-[#20060A]/30 to-black/40" />

            {/* Stage Title and Sensory Highlights */}
            <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-xl">
                <span className="inline-block px-3 py-1 rounded bg-[#D4AF37] text-[#240609] text-[11px] font-bold uppercase tracking-wider mb-2">
                  {moments[activeMoment].sensoryTag}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-2 leading-tight">
                  {moments[activeMoment].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#F0DFCD] font-light leading-relaxed">
                  {moments[activeMoment].sub}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-[#E8D19F] uppercase tracking-widest font-semibold">
                  0{activeMoment + 1} / 0{moments.length}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Moments Thumbnail Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {moments.map((m, idx) => {
            const isActive = activeMoment === idx;
            return (
              <button
                key={m.title}
                onClick={() => setActiveMoment(idx)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-[#3A1017] border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]'
                    : 'bg-[#28090E]/80 border-[#D4AF37]/20 hover:border-[#D4AF37]/60'
                }`}
              >
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-semibold mb-1">
                  Moment 0{idx + 1}
                </span>
                <h4 className="font-serif text-sm font-bold text-white line-clamp-1 mb-1">
                  {m.title}
                </h4>
                <p className="text-[11px] text-[#CBB5A1] line-clamp-1">
                  {m.sensoryTag}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
