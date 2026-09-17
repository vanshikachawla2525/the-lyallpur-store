import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          (p.punjabiName && p.punjabiName.toLowerCase().includes(query.toLowerCase())) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const popularSearches = ['Chana Barfi', 'Motichoor Laddu', 'Atta Panjiri', 'Gachak', 'Punjabi Mathi', 'Kaju Barfi'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-[#FAF7F2] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E8DCCF] overflow-hidden"
        >
          {/* Search Header Input */}
          <div className="p-4 sm:p-6 border-b border-[#E7D7C7] bg-white flex items-center gap-3">
            <Search className="w-5 h-5 text-[#9E0B14] flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sweets, gachak, cookies, mathi, gift boxes..."
              className="w-full text-sm sm:text-base text-[#24130C] focus:outline-none bg-transparent placeholder-[#9E8C7E]"
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#6B574C] hover:bg-[#F2E7D8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-[#8C7667] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Popular Sweet Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-[#4A3428] border border-[#E2D4C3] hover:border-[#9E0B14] hover:text-[#9E0B14] transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-serif text-lg text-[#3E271B]">No delicacies found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-[#8C7667] mt-1">Try searching for Laddu, Barfi, Panjiri, or Gachak.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#8C7667] uppercase tracking-wider mb-2">
                  Found {results.length} results
                </p>
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="p-3 bg-white rounded-xl border border-[#E6D9CA] hover:border-[#9E0B14] transition-all flex items-center gap-4 cursor-pointer group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-grow overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-semibold text-[#9E0B14]">
                          {product.category}
                        </span>
                        {product.isPureDesiGhee && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#FAF0D4] text-[#865E12] font-semibold">
                            Desi Ghee
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-sm font-bold text-[#24130C] group-hover:text-[#9E0B14] transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#7B6658] truncate">
                        {product.description}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-serif text-sm font-bold text-[#9E0B14] block">
                        ₹{product.price}
                      </span>
                      <span className="text-[10px] text-[#8C7667]">
                        {product.defaultWeight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
