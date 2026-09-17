import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Navigation, Sparkles, Building2, Store } from 'lucide-react';
import { STORE_LOCATIONS, storeModelTownImg } from '../data/products';
import { StoreLocation } from '../types';

export const StoresSection: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<StoreLocation>(STORE_LOCATIONS[0]);

  return (
    <section id="stores-section" className="py-24 bg-[#FAF7F2] border-b border-[#E6DACB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Big Font Spring Pop-Up */}
        <motion.div
          initial={{ opacity: 0, scale: 0.65, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 240, damping: 18 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF0D4] border border-[#E5CCA0] text-[#865E12] text-xs uppercase tracking-widest font-semibold mb-3">
            <Store className="w-4 h-4 text-[#D4AF37]" />
            Architectural Heritage Showrooms
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#24130C] tracking-tight leading-tight">
            Our Flagship & Boutiques
          </h2>
          <div className="w-20 h-[2px] bg-[#D4AF37] mx-auto my-5" />
          <p className="text-[#655245] text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Step into the warmth of Lyallpur. Experience our artisanal sweets freshly simmered, bespoke festive hampers, and authentic Punjabi hospitality in Ludhiana.
          </p>
        </motion.div>

        {/* Major Architectural Showcase Feature */}
        <div className="bg-white rounded-2xl border border-[#E2D4C3] shadow-xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Store Photography */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px]">
              <img
                src={selectedStore.image || storeModelTownImg}
                alt={selectedStore.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />

              {selectedStore.isFlagship && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#9E0B14] text-white text-xs font-semibold uppercase tracking-wider shadow-md">
                  ★ Flagship Showroom
                </div>
              )}
            </div>

            {/* Store Detailed Dossier */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#9E0B14] font-semibold">
                  {selectedStore.city} • Heritage Destination
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#24130C] mt-1 mb-3">
                  {selectedStore.name}
                </h3>
                <p className="text-sm text-[#5D473C] font-light leading-relaxed mb-6">
                  {selectedStore.ambiance}
                </p>

                <div className="space-y-4 pt-4 border-t border-[#F0E4D5] text-xs sm:text-sm text-[#4E392E]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#9E0B14] flex-shrink-0 mt-0.5" />
                    <span>{selectedStore.address}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>{selectedStore.timing}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#9E0B14] flex-shrink-0" />
                    <span className="font-medium text-[#24130C]">{selectedStore.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#F0E4D5] flex items-center justify-between">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`Lyallpur Sweets ${selectedStore.name} Ludhiana`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9E0B14] hover:bg-[#7D0910] text-white text-xs uppercase tracking-wider font-semibold rounded-md shadow transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#FEE6AA]" />
                  <span>Get Directions</span>
                </a>

                <span className="text-xs text-[#8C7667]">Valet & Parking Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STORE_LOCATIONS.map((store) => {
            const isSelected = selectedStore.id === store.id;
            return (
              <button
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className={`p-5 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#9E0B14] shadow-md ring-1 ring-[#9E0B14]'
                    : 'bg-[#FFFDF9] border-[#E5D7C7] hover:border-[#9E0B14] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E0B14]">
                    {store.isFlagship ? '★ Flagship' : 'Boutique'}
                  </span>
                  <Building2 className={`w-4 h-4 ${isSelected ? 'text-[#9E0B14]' : 'text-[#8A7668]'}`} />
                </div>
                <h4 className="font-serif text-base font-bold text-[#24130C] mb-1">
                  {store.name}
                </h4>
                <p className="text-xs text-[#6B564A] truncate">
                  {store.address}
                </p>
                <div className="mt-3 pt-2 border-t border-[#F0E4D5] flex items-center justify-between text-[11px] text-[#8C7667]">
                  <span>{store.timing}</span>
                  <span className="text-[#9E0B14] font-medium">View Store →</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
