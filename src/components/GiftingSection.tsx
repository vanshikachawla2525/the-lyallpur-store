import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Sparkles, CheckCircle2, ArrowRight, HeartHandshake, Award } from 'lucide-react';
import { giftingHamperImg } from '../data/products';
import { GiftBox3D } from './GiftBox3D';

export const GiftingSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: 'Wedding Gifting',
    quantity: '50-100 Boxes',
    customNotes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const giftingOptions = [
    {
      title: 'Royal Wedding Invitations',
      desc: 'Silk-lined, gold-foiled wooden chests adorned with rich Kaju Barfi, Chana Barfi, and roasted dry fruits.',
      badge: 'Bespoke Crest Embossing',
    },
    {
      title: 'Diwali & Festive Celebrations',
      desc: 'Vibrant celebratory packaging curated with handcrafted Motichoor laddus, Panjiri, and Gur Gachak.',
      badge: 'Festive Limited Editions',
    },
    {
      title: 'Corporate Executive Hampers',
      desc: 'Sophisticated corporate gifting with custom logo ribbons, thank-you cards, and premium assorted sweets & savouries.',
      badge: 'Corporate Bulk Logistics',
    },
    {
      title: 'Baby Shower & Anniversaries',
      desc: 'Pastel and gold bespoke gift boxes commemorating life’s golden milestones with wholesome sweet blessings.',
      badge: 'Custom Assortments',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="gifting-section" className="py-24 bg-[#FAF7F2] relative border-b border-[#EADECF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Big Font Spring Pop-Up */}
        <motion.div
          initial={{ opacity: 0, scale: 0.65, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 240, damping: 18 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF0D4] border border-[#E5CCA0] text-[#865E12] text-xs uppercase tracking-widest font-semibold mb-3">
            <Gift className="w-4 h-4 text-[#D4AF37]" />
            Bespoke Celebration Packaging
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#24130C] tracking-tight leading-tight">
            Festive & Corporate Gifting
          </h2>
          <div className="w-20 h-[2px] bg-[#D4AF37] mx-auto my-5" />
          <p className="text-[#655245] text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            In Punjabi culture, every blessing is sealed with sweet shagun. Our master craftsmen design custom gold-foiled gift boxes tailored for royal weddings, distinguished corporate milestones, and sacred festivities.
          </p>
        </motion.div>

        {/* 3D Interactive Scroll-triggered Gift Box Experience */}
        <GiftBox3D />

        {/* Hero Gifting Showcase Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#DECFC0] mb-16 bg-[#20060A]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:h-[480px]">
              <img
                src={giftingHamperImg}
                alt="Lyallpur Luxury Gifting Box"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/50 lg:from-transparent to-transparent" />
            </div>

            <div className="lg:col-span-6 p-8 sm:p-12 text-white">
              <span className="text-xs uppercase tracking-widest text-[#E8D09E] font-medium block mb-2">
                The Heritage Collection
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold mb-4 leading-snug text-[#FAF7F2]">
                Curated Luxury Sweet Chests
              </h3>
              <p className="text-sm sm:text-base text-[#DDCFC0] font-light leading-relaxed mb-6">
                Each gift hamper contains our finest signature recipes prepared in pure desi ghee, vacuum-sealed to preserve crisp texture and aroma. Customize with your family crest, corporate insignia, or personalized calligraphed cards.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs text-[#E8D19F] mb-8 border-t border-[#D4AF37]/30 pt-6">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span>Custom Box Debossing</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
                  <span>Pan-India Doorstep Dispatch</span>
                </div>
              </div>

              <a
                href="#gifting-enquiry"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#9E0B14] hover:bg-[#7D0910] text-white text-xs uppercase tracking-widest font-semibold rounded-md shadow-md transition-colors"
              >
                <span>Customize Your Hamper</span>
                <ArrowRight className="w-4 h-4 text-[#FEE6AA]" />
              </a>
            </div>
          </div>
        </div>

        {/* 4 Gifting Occasion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {giftingOptions.map((opt, i) => (
            <div
              key={opt.title}
              className="bg-white p-6 rounded-xl border border-[#E6DACB] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-[#FAF0D4] text-[#865E12] text-[10px] uppercase tracking-wider font-semibold mb-3">
                  {opt.badge}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#24130C] mb-2">
                  {opt.title}
                </h4>
                <p className="text-xs text-[#6B564A] font-light leading-relaxed">
                  {opt.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F2E8DC] text-xs text-[#9E0B14] font-semibold flex items-center justify-between">
                <span>Handcrafted by Order</span>
                <span>Est. 1975</span>
              </div>
            </div>
          ))}
        </div>

        {/* Luxury Enquiry Form */}
        <div id="gifting-enquiry" className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E2D2C0] shadow-xl p-8 sm:p-12 relative">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#9E0B14]">
              Concierge Desk
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#24130C] mt-1">
              Request Gifting Catalogue & Quote
            </h3>
            <p className="text-xs sm:text-sm text-[#705B4E] mt-1">
              Our gifting team will connect within 2 hours with customized box designs and bulk tariff options.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <CheckCircle2 className="w-12 h-12 text-[#9E0B14] mx-auto mb-4" />
              <h4 className="font-serif text-2xl font-bold text-[#24130C]">
                Enquiry Successfully Received
              </h4>
              <p className="text-sm text-[#5C473C] max-w-md mx-auto mt-2">
                Thank you, {formData.name}. Our Gifting Concierge in Ludhiana has received your details for {formData.occasion}. We will contact you via WhatsApp / Phone at {formData.phone} shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 px-6 py-2 border border-[#9E0B14] text-[#9E0B14] text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#9E0B14] hover:text-white transition-colors"
              >
                Send Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jasleen Kaur"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#D5C5B5] bg-[#FAF7F2] focus:outline-none focus:border-[#9E0B14]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#D5C5B5] bg-[#FAF7F2] focus:outline-none focus:border-[#9E0B14]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                    Occasion *
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#D5C5B5] bg-[#FAF7F2] focus:outline-none focus:border-[#9E0B14]"
                  >
                    <option value="Wedding Gifting">Wedding Gifting / Shagun</option>
                    <option value="Corporate Diwali">Corporate Diwali Hampers</option>
                    <option value="Executive Employee Gifts">Executive Employee Gifts</option>
                    <option value="Anniversary & Birthday">Anniversary & Milestone</option>
                    <option value="Lohri & Baisakhi">Lohri & Baisakhi Special</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                    Quantity Required
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#D5C5B5] bg-[#FAF7F2] focus:outline-none focus:border-[#9E0B14]"
                  >
                    <option value="25-50 Boxes">25 – 50 Boxes</option>
                    <option value="50-100 Boxes">50 – 100 Boxes</option>
                    <option value="100-250 Boxes">100 – 250 Boxes</option>
                    <option value="250-500 Boxes">250 – 500 Boxes</option>
                    <option value="500+ Boxes">500+ Large Corporate Consignment</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                    Custom Packaging & Sweets Preferences
                  </label>
                  <textarea
                    rows={3}
                    value={formData.customNotes}
                    onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                    placeholder="Tell us about your desired sweet combinations (e.g. Chana Barfi, Roasted Kalakand, Dry Fruits) and branding..."
                    className="w-full text-xs p-3 rounded-lg border border-[#D5C5B5] bg-[#FAF7F2] focus:outline-none focus:border-[#9E0B14]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 px-6 bg-[#9E0B14] hover:bg-[#7D0910] text-white text-xs uppercase tracking-widest font-semibold rounded-md shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Gifting Catalogue & Tariff</span>
                <ArrowRight className="w-4 h-4 text-[#FEE6AA]" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
