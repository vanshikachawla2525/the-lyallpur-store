import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, User, Menu, X, Phone, MapPin, Sparkles } from 'lucide-react';
import { LyallpurLogo } from './LyallpurLogo';
import { CategoryType } from '../types';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string, category?: CategoryType) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
  onReplayIntro,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; tab: string; category?: CategoryType }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'Shop', tab: 'shop' },
    { label: 'Sweets', tab: 'shop', category: 'sweets' },
    { label: 'Namkeen', tab: 'shop', category: 'namkeen' },
    { label: 'Gachak', tab: 'shop', category: 'gachak' },
    { label: 'Bakery', tab: 'shop', category: 'bakery' },
    { label: 'Gifting', tab: 'gifting' },
    { label: 'Our Story', tab: 'story' },
    { label: 'Our Stores', tab: 'stores' },
  ];

  const handleLinkClick = (tab: string, category?: CategoryType) => {
    onNavigate(tab, category);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Heritage Announcement Ribbon */}
      <div className="bg-[#240609] text-[#E8D19F] text-xs py-1.5 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-4 border-b border-[#D4AF37]/20 z-40 relative">
        <span className="hidden sm:inline-flex items-center gap-1.5 opacity-80">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          Heritage Mithai Since 1975 • Model Town Ludhiana
        </span>
        <span className="text-white/90">
          Pure Desi Ghee Confections • Express All-India Delivery
        </span>
        {onReplayIntro && (
          <button
            onClick={onReplayIntro}
            className="hidden md:inline-block text-[11px] underline text-[#D4AF37] hover:text-[#FFF] ml-3 transition-colors cursor-pointer"
            title="Replay cinematic opening experience"
          >
            Watch Intro
          </button>
        )}
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-[#E6D9CA] py-2'
            : 'bg-transparent py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Hamburger Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isScrolled ? 'text-[#3E1A11] hover:bg-[#F0E6D8]' : 'text-white hover:bg-black/20'
              }`}
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Official Brand Logo */}
          <div
            className="flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            onClick={() => handleLinkClick('home')}
            role="button"
            tabIndex={0}
            aria-label="Lyallpur Sweets Home"
          >
            <LyallpurLogo
              size={isScrolled ? 'sm' : 'md'}
              className="drop-shadow-sm transition-all duration-300"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((link) => {
              const isActive = activeTab === link.tab;
              return (
                <button
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleLinkClick(link.tab, link.category)}
                  className={`relative px-2.5 py-1.5 text-xs xl:text-sm tracking-wider uppercase font-medium transition-colors cursor-pointer ${
                    isScrolled
                      ? isActive
                        ? 'text-[#9E0B14] font-semibold'
                        : 'text-[#382319] hover:text-[#9E0B14]'
                      : isActive
                      ? 'text-[#F9E2AF] font-semibold drop-shadow'
                      : 'text-white/90 hover:text-[#F9E2AF] drop-shadow'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#C59B27]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Search, Account, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Trigger */}
            <button
              id="btn-nav-search"
              onClick={onOpenSearch}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                isScrolled
                  ? 'text-[#382319] hover:text-[#9E0B14] hover:bg-[#F2E8DC]'
                  : 'text-white hover:text-[#FDE8B3] hover:bg-white/10'
              }`}
              aria-label="Search sweets and savouries"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Trigger */}
            <button
              id="btn-nav-account"
              onClick={onOpenAccount}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                isScrolled
                  ? 'text-[#382319] hover:text-[#9E0B14] hover:bg-[#F2E8DC]'
                  : 'text-white hover:text-[#FDE8B3] hover:bg-white/10'
              }`}
              aria-label="Account and Orders"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Cart Drawer Trigger with Badge */}
            <button
              id="btn-nav-cart"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#9E0B14] hover:bg-[#7D0910] text-white shadow-md transition-transform active:scale-95 cursor-pointer flex items-center justify-center"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#240609] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Curated Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#240609]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Top Bar inside mobile menu */}
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
              <LyallpurLogo size="sm" />
              <button
                id="btn-mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-[#E8D19F] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Navigation"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links with Staggered Entrance */}
            <div className="my-auto py-6 space-y-3">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <button
                    onClick={() => handleLinkClick(link.tab, link.category)}
                    className="w-full text-left py-2 text-xl font-serif text-[#FAF7F2] hover:text-[#D4AF37] transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs tracking-widest text-[#D4AF37] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore →
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Bottom Quick Contact & Stores */}
            <div className="border-t border-[#D4AF37]/20 pt-4 space-y-2 text-xs text-[#E5D0B0]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Flagship: Model Town, Ludhiana (8 AM – 10 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Customer Care: +91 161 240 2200</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
