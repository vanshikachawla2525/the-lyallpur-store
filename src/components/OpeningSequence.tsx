import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OpeningSequenceProps {
  onComplete: () => void;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete }) => {
  // Check user preference for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Stages:
  // 1. 'doors'    : Majestic, long, realistic dark brown traditional wooden doors (completely stationary/unanimated)
  // 2. 'opening'  : The doors slowly and heavily swing outward over 2.8s, revealing golden light & the hero section
  // 3. 'finished' : Seamless handoff into the existing hero section
  const [stage, setStage] = useState<'doors' | 'opening' | 'finished'>(
    prefersReducedMotion ? 'finished' : 'doors'
  );

  const timerRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Sequence timing:
    // 0.0s - 1.4s: Real long dark brown haveli doors stand still, solid, and majestic (not animated)
    // 1.4s - 4.2s: Doors open slowly and grandly over 2.8 seconds (center unlatches, warm golden light pours in)
    // 4.2s: Clean completion and reveal of the hero section
    const t1 = setTimeout(() => {
      setStage('opening');
    }, 1400);

    const t2 = setTimeout(() => {
      setStage('finished');
      onComplete();
    }, 4200);

    timerRef.current = [t1, t2];

    return () => {
      timerRef.current.forEach(clearTimeout);
    };
  }, [onComplete, prefersReducedMotion]);

  if (stage === 'finished') return null;

  const isOpening = stage === 'opening';

  return (
    <AnimatePresence>
      <motion.div
        key="haveli-entrance-root"
        id="haveli-entrance-container"
        className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{
          opacity: isOpening ? [1, 1, 0] : 1,
          transition: {
            duration: isOpening ? 2.8 : 0.4,
            times: [0, 0.88, 1],
            ease: 'easeInOut',
          },
        }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        style={{ perspective: '1600px' }}
      >
        {/* ================= ATMOSPHERIC BACKDROP ================= */}
        {/* Dissolves smoothly as the doors open to reveal the actual hero section behind */}
        <motion.div
          className="absolute inset-0 bg-[#120406] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{
            opacity: isOpening ? [1, 0.7, 0] : 1,
          }}
          transition={{
            duration: 2.8,
            times: [0, 0.45, 1],
            ease: 'easeInOut',
          }}
        />

        {/* WARM GOLDEN LIGHT RADIATING FROM BEHIND THE SLOWLY PARTING DOORS */}
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: isOpening ? [0, 0.95, 0.35, 0] : 0,
            scale: isOpening ? [0.7, 1.5, 2.4] : 0.7,
          }}
          transition={{ duration: 2.8, times: [0, 0.35, 0.75, 1], ease: 'easeOut' }}
        >
          {/* Golden Sunlit Diya Glow */}
          <div className="w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full bg-[radial-gradient(circle,#FFF6DC_0%,#F3CE65_25%,#9E0B14_55%,transparent_75%)] blur-3xl" />
        </motion.div>

        {/* Vertical Center Golden Seam of Light as Doors Unlatch */}
        <motion.div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1.5 sm:w-2 bg-[#FFF4C4] z-30 pointer-events-none shadow-[0_0_25px_#FFE58F,0_0_50px_#D4AF37]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isOpening ? [0, 1, 0] : 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />

        {/* ================= REAL LONG DARK BROWN HAVELI DOORS STAGE ================= */}
        {/* Full viewport height (h-screen) with authentic dark timber depth & 3D perspective */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{ perspective: '1600px' }}
        >
          {/* Authentic Dark Haveli Door Jamb / Stone Surround (grounding the doors in real architecture) */}
          <div className="absolute inset-0 border-x-[8px] sm:border-x-[16px] border-t-[8px] sm:border-t-[16px] border-[#180903] shadow-[inset_0_0_60px_rgba(0,0,0,0.95)] pointer-events-none z-30" />

          {/* Top Heritage Inscription Seal */}
          <div className="absolute top-4 sm:top-6 z-35 flex items-center justify-center pointer-events-none">
            <div className="px-5 py-1.5 rounded-full bg-[#1A0A04]/95 border border-[#8C621E]/60 shadow-2xl backdrop-blur-md flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-[#E5D0A1] font-bold drop-shadow">
                Lyallpur • Estd. 1975
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* LEFT REAL DARK BROWN DOOR (Full height, opens slowly outward to left)     */}
          {/* ========================================================================= */}
          <motion.div
            className="w-1/2 h-full relative border-r-[2px] sm:border-r-[3px] border-[#110501] shadow-[0_0_40px_rgba(0,0,0,0.9)] origin-left"
            style={{
              background:
                'linear-gradient(135deg, #2A1308 0%, #1F0D04 35%, #160702 70%, #100401 100%)',
              transformStyle: 'preserve-3d',
            }}
            initial={{ rotateY: 0, x: 0 }}
            animate={{
              // Opens slowly over 2.8 seconds
              rotateY: isOpening ? [0, -30, -70, -112] : 0,
              x: isOpening ? ['0%', '-15%', '-55%', '-115%'] : '0%',
            }}
            transition={{
              duration: 2.8,
              times: [0, 0.25, 0.65, 1],
              ease: [0.25, 1, 0.35, 1],
            }}
          >
            {/* Real Seasoned Dark Wood Grain Striations */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 6px), repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 3px, transparent 3px, transparent 14px)`,
              }}
            />

            {/* Door Frame Inner Molding */}
            <div className="absolute inset-2 sm:inset-5 border-[3px] sm:border-[4px] border-[#3E1C0B] p-2 sm:p-4 flex flex-col justify-between bg-gradient-to-b from-[#220E05] via-[#1A0A03] to-[#120501] shadow-[inset_0_4px_25px_rgba(0,0,0,0.95)]">
              
              {/* 4 Long Traditional Recessed Beveled Dark Timber Panels */}
              {[1, 2, 3, 4].map((panelIdx) => (
                <div
                  key={panelIdx}
                  className="flex-1 my-1.5 sm:my-2.5 border-2 border-[#331709] rounded-sm bg-[#160702] relative p-2 sm:p-4 flex flex-col justify-between shadow-[inset_3px_3px_10px_rgba(0,0,0,0.9),inset_-2px_-2px_6px_rgba(255,200,120,0.04)] overflow-hidden"
                >
                  {/* Subtle Inner Wood Planks */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 20px, rgba(255,255,255,0.03) 21px, transparent 22px)',
                    }}
                  />

                  {/* Horizontal Iron Reinforced Batten with Heavy Antique Brass Rivets */}
                  <div className="relative z-10 w-full flex items-center justify-around py-1">
                    {[1, 2, 3].map((stud) => (
                      <div
                        key={stud}
                        className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#1E0C04] to-[#0A0301] border border-[#5C3814]/70 flex items-center justify-center shadow-[0_3px_8px_rgba(0,0,0,0.9)]"
                      >
                        {/* 3D Convex Metallic Stud with Specular Highlight */}
                        <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-[#E6CA85] via-[#A87E28] to-[#452D08] shadow-[inset_1px_1px_2px_#FFF,0_2px_4px_rgba(0,0,0,0.8)] border border-[#FFE7A3]/60" />
                      </div>
                    ))}
                  </div>

                  {/* Center Carved Haveli Floral Rosette (on panels 2 and 3) */}
                  {(panelIdx === 2 || panelIdx === 3) && (
                    <div className="relative z-10 my-auto flex items-center justify-center opacity-75">
                      <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full border border-[#5C3B14]/80 flex items-center justify-center bg-[#1D0C04] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)]">
                        <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#8C621E] to-[#3B2207] border border-[#D4AF37]/40 flex items-center justify-center">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#F5DFAB] shadow-sm" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Lower Row of Antique Brass Studs */}
                  <div className="relative z-10 w-full flex items-center justify-around py-1">
                    {[1, 2, 3].map((stud) => (
                      <div
                        key={stud}
                        className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#1E0C04] to-[#0A0301] border border-[#5C3814]/70 flex items-center justify-center shadow-[0_3px_8px_rgba(0,0,0,0.9)]"
                      >
                        <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-[#E6CA85] via-[#A87E28] to-[#452D08] shadow-[inset_1px_1px_2px_#FFF,0_2px_4px_rgba(0,0,0,0.8)] border border-[#FFE7A3]/60" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Heavy Cast-Brass Ring Knocker (Haveli Kunda) on Left Door */}
              <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-20">
                {/* Brass Lion/Rosette Escutcheon Plate */}
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FFE59E] via-[#B88724] to-[#59390B] border-2 border-[#FFF0BF] shadow-[0_6px_16px_rgba(0,0,0,0.95)] flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#200D04] border border-[#D4AF37]" />
                </div>
                {/* Heavy Cast Brass Ring with realistic 3D shadow */}
                <div className="w-12 h-16 sm:w-18 sm:h-24 -mt-3 rounded-b-full border-[6px] sm:border-[8px] border-[#C79629] shadow-[0_12px_28px_rgba(0,0,0,0.95)] bg-transparent" />
              </div>

              {/* Bottom Foundation Threshold Inscription */}
              <div className="h-8 sm:h-11 border border-[#3E1C0B] rounded bg-[#100401] flex items-center justify-center text-[9px] sm:text-xs tracking-[0.22em] text-[#C5A059] font-serif uppercase font-semibold mt-1">
                Ludhiana • Model Town
              </div>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT REAL DARK BROWN DOOR (Full height, opens slowly outward to right)   */}
          {/* ========================================================================= */}
          <motion.div
            className="w-1/2 h-full relative border-l-[2px] sm:border-l-[3px] border-[#110501] shadow-[0_0_40px_rgba(0,0,0,0.9)] origin-right"
            style={{
              background:
                'linear-gradient(225deg, #2A1308 0%, #1F0D04 35%, #160702 70%, #100401 100%)',
              transformStyle: 'preserve-3d',
            }}
            initial={{ rotateY: 0, x: 0 }}
            animate={{
              // Opens slowly over 2.8 seconds
              rotateY: isOpening ? [0, 30, 70, 112] : 0,
              x: isOpening ? ['0%', '15%', '55%', '115%'] : '0%',
            }}
            transition={{
              duration: 2.8,
              times: [0, 0.25, 0.65, 1],
              ease: [0.25, 1, 0.35, 1],
            }}
          >
            {/* Real Seasoned Dark Wood Grain Striations */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 6px), repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 3px, transparent 3px, transparent 14px)`,
              }}
            />

            {/* Vertical Center Overlapping Astragal / Meeting Stile (Zulf) */}
            <div className="absolute top-0 bottom-0 left-0 w-3.5 sm:w-5 bg-gradient-to-r from-[#170602] via-[#2D1407] to-[#120501] border-r border-[#4A260E] z-15 shadow-md flex flex-col justify-around py-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-2.5 sm:w-3.5 h-6 sm:h-8 bg-gradient-to-b from-[#E2C37E] via-[#A87E28] to-[#59390B] rounded-sm border border-[#FFF] shadow-md mx-auto"
                />
              ))}
            </div>

            {/* Door Frame Inner Molding */}
            <div className="absolute inset-2 sm:inset-5 border-[3px] sm:border-[4px] border-[#3E1C0B] p-2 sm:p-4 flex flex-col justify-between bg-gradient-to-b from-[#220E05] via-[#1A0A03] to-[#120501] shadow-[inset_0_4px_25px_rgba(0,0,0,0.95)]">
              
              {/* 4 Long Traditional Recessed Beveled Dark Timber Panels */}
              {[1, 2, 3, 4].map((panelIdx) => (
                <div
                  key={panelIdx}
                  className="flex-1 my-1.5 sm:my-2.5 border-2 border-[#331709] rounded-sm bg-[#160702] relative p-2 sm:p-4 flex flex-col justify-between shadow-[inset_3px_3px_10px_rgba(0,0,0,0.9),inset_-2px_-2px_6px_rgba(255,200,120,0.04)] overflow-hidden"
                >
                  {/* Subtle Inner Wood Planks */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 20px, rgba(255,255,255,0.03) 21px, transparent 22px)',
                    }}
                  />

                  {/* Horizontal Iron Reinforced Batten with Heavy Antique Brass Rivets */}
                  <div className="relative z-10 w-full flex items-center justify-around py-1">
                    {[1, 2, 3].map((stud) => (
                      <div
                        key={stud}
                        className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#1E0C04] to-[#0A0301] border border-[#5C3814]/70 flex items-center justify-center shadow-[0_3px_8px_rgba(0,0,0,0.9)]"
                      >
                        <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-[#E6CA85] via-[#A87E28] to-[#452D08] shadow-[inset_1px_1px_2px_#FFF,0_2px_4px_rgba(0,0,0,0.8)] border border-[#FFE7A3]/60" />
                      </div>
                    ))}
                  </div>

                  {/* Center Carved Haveli Floral Rosette (on panels 2 and 3) */}
                  {(panelIdx === 2 || panelIdx === 3) && (
                    <div className="relative z-10 my-auto flex items-center justify-center opacity-75">
                      <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full border border-[#5C3B14]/80 flex items-center justify-center bg-[#1D0C04] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)]">
                        <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#8C621E] to-[#3B2207] border border-[#D4AF37]/40 flex items-center justify-center">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#F5DFAB] shadow-sm" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Lower Row of Antique Brass Studs */}
                  <div className="relative z-10 w-full flex items-center justify-around py-1">
                    {[1, 2, 3].map((stud) => (
                      <div
                        key={stud}
                        className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#1E0C04] to-[#0A0301] border border-[#5C3814]/70 flex items-center justify-center shadow-[0_3px_8px_rgba(0,0,0,0.9)]"
                      >
                        <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-[#E6CA85] via-[#A87E28] to-[#452D08] shadow-[inset_1px_1px_2px_#FFF,0_2px_4px_rgba(0,0,0,0.8)] border border-[#FFE7A3]/60" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Heavy Cast-Brass Ring Knocker (Haveli Kunda) on Right Door */}
              <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-20">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FFE59E] via-[#B88724] to-[#59390B] border-2 border-[#FFF0BF] shadow-[0_6px_16px_rgba(0,0,0,0.95)] flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#200D04] border border-[#D4AF37]" />
                </div>
                <div className="w-12 h-16 sm:w-18 sm:h-24 -mt-3 rounded-b-full border-[6px] sm:border-[8px] border-[#C79629] shadow-[0_12px_28px_rgba(0,0,0,0.95)] bg-transparent" />
              </div>

              {/* Bottom Foundation Threshold Inscription */}
              <div className="h-8 sm:h-11 border border-[#3E1C0B] rounded bg-[#100401] flex items-center justify-center text-[9px] sm:text-xs tracking-[0.22em] text-[#C5A059] font-serif uppercase font-semibold mt-1">
                Pure Desi Ghee • Since 1975
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
