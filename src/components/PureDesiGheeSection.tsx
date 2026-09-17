import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { desiGheeImg } from '../data/products';

export const PureDesiGheeSection: React.FC = () => {
  const hallmarks = [
    { title: 'PURE', desc: '100% pure cow & buffalo Bilona desi ghee, free from adulterants.' },
    { title: 'TRADITIONAL', desc: 'Slow-simmered in thick brass kadhais over controlled gentle heat.' },
    { title: 'AUTHENTIC', desc: 'Ancestral recipes preserved uncompromised for over 50 years.' },
    { title: 'CRAFTED', desc: 'Handcrafted daily by master halwais in our Ludhiana workshops.' },
  ];

  return (
    <section className="py-24 bg-[#F5EFEB] border-y border-[#E6D8C6] relative overflow-hidden">
      {/* Background Decorative Floral Accents */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Close-up Food Photography with Gold Inset Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src={desiGheeImg}
                alt="Crafted with Pure Desi Ghee at Lyallpur Sweets"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[500px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Gold Heritage Seal in Bottom Corner */}
              <div className="absolute bottom-6 left-6 bg-[#240609]/90 backdrop-blur-md border border-[#D4AF37] px-4 py-2.5 rounded-lg text-white shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37] bg-[#D4AF37]/20 flex items-center justify-center text-[#FEE6AA] font-serif font-bold text-xs">
                  LP
                </div>
                <div>
                  <p className="text-xs font-serif font-bold text-[#FDE8B3] uppercase tracking-wider">
                    Pure Desi Ghee
                  </p>
                  <p className="text-[11px] text-[#E0D1C1]">Since 1975 • Zero Palm Oil</p>
                </div>
              </div>
            </div>

            {/* Decorative Offset Gold Frame */}
            <div className="absolute -inset-3 -z-10 border border-[#D4AF37]/40 rounded-2xl hidden sm:block" />
          </motion.div>

          {/* Right Column: Refined Storytelling & Hallmarks */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0D4] border border-[#E4CA92] text-[#865E12] text-xs uppercase tracking-widest font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              The Essence of Lyallpur
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#24130C] tracking-tight leading-tight mb-6">
              Crafted with <br />
              <span className="italic text-[#9E0B14] font-display">Pure Desi Ghee</span>
            </h2>

            {/* Animated Golden Stroke Line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent mb-6"
            />

            <p className="text-base sm:text-lg text-[#5D4A3E] font-light leading-relaxed mb-8">
              Every delicacy reflects the richness of tradition, bringing authentic flavour and indulgence to every bite. We hold that true Indian sweets cannot be rushed; only the slow, patient stirring of pure ghee over gentle flames unlocks the rich nutty aromas that define memorable gatherings.
            </p>

            {/* 4 Refined Hallmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[#DECFC0]">
              {hallmarks.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="bg-white/80 p-4 rounded-xl border border-[#E8DCCF] shadow-sm"
                >
                  <div className="flex items-center gap-2 text-[#9E0B14] font-serif font-bold text-sm tracking-wider mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>{h.title}</span>
                  </div>
                  <p className="text-xs text-[#6B564A] leading-relaxed">
                    {h.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
