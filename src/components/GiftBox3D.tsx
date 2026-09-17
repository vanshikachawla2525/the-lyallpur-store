import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gift, RotateCw, CheckCircle, Eye } from 'lucide-react';
import {
  chanaBarfiImg,
  motichoorLadduImg,
  heroSweetsImg,
  gachakImg,
  dhodaBarfiImg,
  desiGheeImg,
} from '../data/products';

interface SweetInBox {
  id: string;
  name: string;
  punjabi: string;
  tag: string;
  img: string;
  desc: string;
  pureDesiGhee: boolean;
}

export const GiftBox3D: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSweet, setActiveSweet] = useState<SweetInBox | null>(null);

  // 6 Handcrafted Signature Sweets placed within the velvet compartments
  const boxSweets: SweetInBox[] = [
    {
      id: 'chana-barfi',
      name: 'Chana Barfi',
      punjabi: 'ਚਨਾ ਬਰਫ਼ੀ',
      tag: '100% Pure Desi Ghee',
      img: chanaBarfiImg || dhodaBarfiImg,
      desc: 'Slow-simmered chickpea flour roasted to golden perfection in Bilona cow ghee.',
      pureDesiGhee: true,
    },
    {
      id: 'kesar-motichoor',
      name: 'Kashmiri Kesar Motichoor',
      punjabi: 'ਕੇਸਰ ਮੋਤੀਚੂਰ',
      tag: 'Kashmiri Saffron Pearls',
      img: motichoorLadduImg || heroSweetsImg,
      desc: 'Tiny bespoke besan pearls steeped in pure saffron syrup and green cardamom.',
      pureDesiGhee: true,
    },
    {
      id: 'kaju-katli',
      name: 'Royal Kaju Katli',
      punjabi: 'ਕਾਜੂ ਕਤਲੀ',
      tag: 'Goan Cashews & Silver Vark',
      img: heroSweetsImg,
      desc: 'Hand-ground premium Goan cashew fudge adorned with pure certified silver leaf.',
      pureDesiGhee: false,
    },
    {
      id: 'gur-gachak',
      name: 'Winter Gur Khasta Gachak',
      punjabi: 'ਗੁੜ ਖਸਤਾ ਗੱਚਕ',
      tag: 'Winter Sugarcane Jaggery',
      img: gachakImg,
      desc: 'Crunchy heritage brittle crafted with cold-pressed jaggery and roasted sesame.',
      pureDesiGhee: true,
    },
    {
      id: 'dhoda-barfi',
      name: 'Special Dhoda Barfi',
      punjabi: 'ਸਪੈਸ਼ਲ ਢੋਡਾ',
      tag: 'Sprouted Wheat & Nuts',
      img: dhodaBarfiImg,
      desc: 'Iconic Punjabi fudge enriched with roasted cashews, almonds, and caramelized milk.',
      pureDesiGhee: true,
    },
    {
      id: 'khasta-mathi',
      name: 'Desi Ghee Khasta Mathi',
      punjabi: 'ਦੇਸੀ ਘਿਓ ਮੱਠੀ',
      tag: 'Savouries Balance',
      img: desiGheeImg || heroSweetsImg,
      desc: 'Flaky savoury crispies infused with ajwain and crushed black peppercorns.',
      pureDesiGhee: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
      }}
      onViewportEnter={() => {
        // Automatically open the gift box upon scrolling into view
        const timer = setTimeout(() => setIsOpen(true), 400);
        return () => clearTimeout(timer);
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative max-w-5xl mx-auto mb-16 px-4"
    >
      {/* Container Frame with Royal Heritage Velvet Texture */}
      <div className="relative bg-gradient-to-b from-[#240609] via-[#1A0306] to-[#2B080D] rounded-3xl p-5 sm:p-8 md:p-10 border-2 border-[#D4AF37]/60 shadow-[0_30px_80px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Soft Background Ambient Light Glow & Golden Sparkle Shimmers */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.22)_0%,transparent_70%)] pointer-events-none" />

        {/* Decorative Corner Filigrees */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />

        {/* Header Ribbon & Title */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FEE6AA] text-xs uppercase tracking-widest font-semibold mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Interactive 3D Gift Chest
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#FAF7F2] tracking-tight">
            The Lyallpur Royal Shagun Box
          </h3>
          <p className="text-xs sm:text-sm text-[#E0CEBF] font-light max-w-xl mx-auto mt-1.5">
            Crafted with rigid imperial crimson boards, metallic gold foil inlay, and 6 partitioned compartments displaying our authentic confections.
          </p>
        </div>

        {/* Active Sweet Spotlight Toast */}
        <AnimatePresence>
          {activeSweet && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="relative z-30 max-w-md mx-auto mb-6 bg-[#FAF7F2] text-[#24130C] rounded-xl p-3.5 border-2 border-[#D4AF37] shadow-xl flex items-center gap-3.5"
            >
              <img
                src={activeSweet.img}
                alt={activeSweet.name}
                className="w-14 h-14 rounded-lg object-cover border border-[#D4AF37] shadow-sm flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#9E0B14] truncate">
                    {activeSweet.name}
                  </h4>
                  <span className="text-[10px] uppercase font-semibold text-[#8B6C24] bg-[#FAF0D4] px-1.5 py-0.5 rounded border border-[#E2CD98]">
                    {activeSweet.punjabi}
                  </span>
                </div>
                <p className="text-xs text-[#5D473C] mt-0.5 line-clamp-2">
                  {activeSweet.desc}
                </p>
              </div>
              <button
                onClick={() => setActiveSweet(null)}
                className="text-[#9E0B14] hover:text-[#5E050B] text-xs font-bold px-1.5 py-1"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= 3D REALISTIC & FANCY ANIMATED GIFT BOX ================= */}
        <div
          className="relative mx-auto w-full max-w-[620px] h-[370px] sm:h-[430px] flex items-center justify-center select-none"
          style={{ perspective: '1400px' }}
        >
          {/* Main 3D Box Chassis */}
          <div
            className="relative w-[310px] sm:w-[440px] md:w-[480px] h-[240px] sm:h-[280px] bg-[#32080D] rounded-2xl border-4 border-[#D4AF37] shadow-[0_35px_80px_rgba(0,0,0,0.85)] flex flex-col justify-end p-3.5 sm:p-4 transition-all duration-700"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(18deg)',
            }}
          >
            {/* Realistic Gold Inset Corner Filigrees on Box Chassis */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

            {/* Front Metallic Plaque */}
            <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3D6] to-[#D4AF37] text-[#240609] text-[10px] sm:text-[11px] font-serif font-bold uppercase tracking-widest shadow-xl border border-[#8C6D23] z-20 whitespace-nowrap">
              ★ The Royal Shagun Box • Estd. 1975 ★
            </div>

            {/* ================= INNER VELVET COMPARTMENTS (6 DELICACIES) ================= */}
            <div className="w-full h-full bg-[#1F0306] rounded-xl p-2.5 sm:p-3 border border-[#D4AF37]/40 shadow-inner grid grid-cols-3 gap-2 sm:gap-2.5 overflow-hidden relative">
              {/* Partition Gold Separators */}
              <div className="absolute inset-x-0 top-1/2 h-[1.5px] bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/60 to-[#D4AF37]/20 pointer-events-none" />
              <div className="absolute inset-y-0 left-1/3 w-[1.5px] bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37]/60 to-[#D4AF37]/20 pointer-events-none" />
              <div className="absolute inset-y-0 left-2/3 w-[1.5px] bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37]/60 to-[#D4AF37]/20 pointer-events-none" />

              {/* 6 High-Definition Mithai Pictures revealed realistically inside */}
              {boxSweets.map((sweet, index) => (
                <motion.div
                  key={sweet.id}
                  initial={false}
                  animate={
                    isOpen
                      ? {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          filter: 'brightness(1.04)',
                        }
                      : {
                          opacity: 0,
                          y: 20,
                          scale: 0.88,
                          filter: 'brightness(0.6)',
                        }
                  }
                  transition={{
                    duration: 0.65,
                    delay: isOpen ? 0.2 + index * 0.08 : 0,
                    ease: 'easeOut',
                  }}
                  onClick={() => setActiveSweet(sweet)}
                  className="bg-gradient-to-b from-[#2B070C] to-[#1D0306] rounded-lg p-1.5 sm:p-2 border border-[#D4AF37]/50 flex flex-col items-center justify-between relative overflow-hidden shadow-md group cursor-pointer hover:border-[#D4AF37] hover:scale-105 transition-all"
                  title="Click to view sweet details"
                >
                  {/* Fluted Gold Tart Liner simulation */}
                  <div className="relative w-full aspect-square rounded-md overflow-hidden border border-[#D4AF37]/40 bg-[#160204]">
                    <img
                      src={sweet.img}
                      alt={sweet.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-1">
                      <span className="text-[8px] sm:text-[9px] text-[#FEE6AA] font-semibold flex items-center gap-0.5">
                        <Eye className="w-2.5 h-2.5" /> Inspect
                      </span>
                    </div>
                  </div>

                  <div className="text-center w-full mt-1">
                    <h5 className="font-serif text-[10px] sm:text-[11px] font-bold text-white group-hover:text-[#FEE6AA] transition-colors truncate">
                      {sweet.name}
                    </h5>
                    <p className="text-[8px] sm:text-[9px] text-[#E0CEBF] font-serif truncate">
                      {sweet.punjabi}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ================= 3D REALISTIC HINGED LID ================= */}
            <motion.div
              initial={false}
              animate={
                isOpen
                  ? {
                      rotateX: -126,
                      y: -85,
                      z: 40,
                      boxShadow: '0 -25px 50px rgba(0,0,0,0.7)',
                    }
                  : {
                      rotateX: 0,
                      y: 0,
                      z: 0,
                      boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
                    }
              }
              transition={{
                duration: 1.15,
                ease: [0.22, 1, 0.36, 1], // Realistic luxury weighted damper curve
              }}
              style={{
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
              }}
              className="absolute inset-0 bg-gradient-to-br from-[#8C0E16] via-[#65080E] to-[#430409] rounded-2xl border-4 border-[#D4AF37] z-30 flex items-center justify-center p-6 cursor-pointer overflow-hidden"
              onClick={() => setIsOpen(!isOpen)}
              title="Click to toggle unboxing"
            >
              {/* Rich Velvet Fabric Sheen Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />

              {/* Realistic Satin Gold Cross Ribbons with Metallic Reflection */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-9 sm:w-12 bg-gradient-to-r from-[#B8860B] via-[#FFE299] to-[#B8860B] shadow-lg flex items-center justify-center">
                <div className="w-[1.5px] h-full bg-[#70500D]/40" />
              </div>
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-9 sm:h-12 bg-gradient-to-b from-[#B8860B] via-[#FFE299] to-[#B8860B] shadow-lg flex items-center justify-center">
                <div className="h-[1.5px] w-full bg-[#70500D]/40" />
              </div>

              {/* Embossed Filigree Gold Corners on Lid */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#FFE299]" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#FFE299]" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#FFE299]" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#FFE299]" />

              {/* Center Golden Medallion Crest */}
              <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FFF4DB] via-[#E4C98D] to-[#BF973E] border-2 border-[#FFE8A3] shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center text-center p-2">
                <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-[#730C12] mb-0.5 drop-shadow-sm" />
                <span className="text-[9px] sm:text-[10px] font-serif font-bold text-[#4B060B] uppercase tracking-wider leading-none">
                  Lyallpur
                </span>
                <span className="text-[7px] text-[#7A1218] uppercase tracking-widest mt-0.5">
                  Estd. 1975
                </span>
              </div>

              {/* Lid Label Callout when closed */}
              {!isOpen && (
                <div className="absolute bottom-3.5 text-center w-full z-20">
                  <span className="text-[11px] sm:text-xs text-[#FDE8B3] uppercase tracking-widest font-semibold drop-shadow-md bg-[#180306]/70 px-3 py-1 rounded-full border border-[#D4AF37]/40">
                    Tap to Unbox Delicacies
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Interactive Bottom Control Buttons */}
        <div className="text-center mt-6 relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-6 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#F3CE65] text-[#240609] font-serif font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isOpen ? 'rotate-180' : ''} transition-transform duration-500`} />
            <span>{isOpen ? 'Close Gift Box' : 'Open & Unbox Shagun Box'}</span>
          </button>

          <span className="text-xs text-[#E0CEBF]/80 hidden sm:inline">
            Click on any delicacy inside to inspect tasting notes
          </span>
        </div>
      </div>
    </motion.div>
  );
};
