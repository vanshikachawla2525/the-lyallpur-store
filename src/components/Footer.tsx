import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, Sparkles, CheckCircle2, Instagram, Facebook, Youtube } from 'lucide-react';
import { LyallpurLogo } from './LyallpurLogo';
import { CategoryType } from '../types';

interface FooterProps {
  onNavigate: (tab: string, category?: CategoryType) => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onReplayIntro }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1C0508] text-[#E8D6C0] relative overflow-hidden border-t border-[#3D1016]">
      {/* Decorative Gold Crest Border */}
      <div className="h-1 bg-gradient-to-r from-[#801015] via-[#D4AF37] to-[#801015]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#3E161C]">
          {/* Brand Bio & Official Logo */}
          <div className="lg:col-span-4 space-y-4">
            <LyallpurLogo size="md" className="drop-shadow-lg" />
            <p className="font-serif italic text-sm text-[#FCE8B6] font-medium">
              “Sweet Blessings for a Brighter Tomorrow”
            </p>
            <p className="text-xs text-[#CDB8A3] leading-relaxed font-light">
              Founded in 1975 in Ludhiana by Sh. Surinder Kharbanda. Revered for pure desi ghee confections, heirloom Chana Barfi, winter gachak, and festive wedding shagun.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[#D4AF37]">
              <a href="#" className="p-2 rounded-full bg-[#2E0B10] hover:bg-[#D4AF37] hover:text-[#20060A] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#2E0B10] hover:bg-[#D4AF37] hover:text-[#20060A] transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#2E0B10] hover:bg-[#D4AF37] hover:text-[#20060A] transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 mt-2 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                Replay Haveli Door Opening Experience
              </button>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FAF7F2]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#C4B19F]">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  All Specialities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'sweets')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Pure Desi Ghee Sweets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'gachak')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Winter Gur Gachak
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'namkeen')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Punjabi Savouries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gifting')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Wedding & Corporate Gifting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  The Kharbanda Legacy
                </button>
              </li>
            </ul>
          </div>

          {/* Store Showrooms */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FAF7F2]">
              Our Showrooms
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C4B19F]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Model Town Flagship:</strong> Main Market, Ludhiana (8 AM – 10 PM)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Deep Nagar:</strong> Near Civil Lines, Ludhiana
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">South City:</strong> Canal Road Galleria, Ludhiana
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Ghumar Mandi:</strong> Aarti Chowk, Ludhiana
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter & Customer Care */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FAF7F2]">
              Blessings & Updates
            </h4>
            <p className="text-xs text-[#C5B3A2]">
              Receive festive announcements, new seasonal gachak arrivals, and exclusive sweet blessings.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-[#2E0B10] border border-[#D4AF37] text-xs text-[#FCE8B6] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Subscribed to Lyallpur festive updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full text-xs px-3 py-2 bg-[#2D0A10] border border-[#D4AF37]/30 rounded-l-md text-white placeholder-[#8F7766] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-[#9E0B14] hover:bg-[#7D0910] text-white rounded-r-md transition-colors cursor-pointer flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 text-xs space-y-1 text-[#D2BFAC]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+91 161 240 2200 / +91 98140 00000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>orders@lyallpursweets.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A89481] gap-4">
          <p>© {new Date().getFullYear()} Lyallpur Sweets. Crafted with Pure Desi Ghee Since 1975.</p>
          <div className="flex items-center gap-6">
            <span>FSSAI Lic. 12115801000124</span>
            <span>Worldwide Nitrogen Fresh Export</span>
            <span>Terms & Freshness Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
