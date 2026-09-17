import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface SignatureProductsProps {
  products: Product[];
  onAddToCart: (product: Product, weight: string, price: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const SignatureProducts: React.FC<SignatureProductsProps> = ({
  products,
  onAddToCart,
  onSelectProduct,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter only signature or celebrated creations
  const signatureItems = products.filter((p) => p.isSignature || p.isPureDesiGhee);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#FAF7F2] border-b border-[#EADFCF] relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9E0B14]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#9E0B14] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Handcrafted in Ludhiana
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#24130C] tracking-tight">
              Lyallpur’s Signature
            </h2>
            <p className="text-[#685348] text-base mt-2 font-light max-w-xl">
              A curated selection of our most celebrated creations, simmered to golden perfection in pure desi ghee.
            </p>
          </div>

          {/* Navigation Controls for Horizontal Scroll */}
          <div className="flex items-center gap-3">
            <button
              id="btn-signature-prev"
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-[#D5C2AF] text-[#4A3428] hover:border-[#9E0B14] hover:text-[#9E0B14] hover:bg-white transition-colors cursor-pointer shadow-sm"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="btn-signature-next"
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-[#D5C2AF] text-[#4A3428] hover:border-[#9E0B14] hover:text-[#9E0B14] hover:bg-white transition-colors cursor-pointer shadow-sm"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Glide Cards Showcase */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-6 pt-2 hide-scrollbar scroll-smooth snap-x"
        style={{ scrollPaddingLeft: '1rem' }}
      >
        {signatureItems.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
            className="flex-shrink-0 w-[290px] sm:w-[330px] snap-start group cursor-pointer"
            onClick={() => onSelectProduct(product)}
          >
            <div className="bg-white rounded-xl border border-[#E7DACB] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-block px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase rounded bg-[#9E0B14] text-white shadow-sm">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Pure Desi Ghee Stamp */}
              {product.isPureDesiGhee && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-[#FAF0D4] text-[#825B0E] border border-[#E2C98F]">
                    Pure Desi Ghee
                  </span>
                </div>
              )}

              {/* Product Image Container with Sophisticated Lift & Depth */}
              <div className="relative aspect-[4/3] bg-[#F5EFEB] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Content Details */}
              <div className="p-5 flex flex-col flex-grow justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs uppercase tracking-wider text-[#9E0B14] font-medium">
                      {product.subcategory || product.category}
                    </span>
                    <div className="flex items-center text-xs text-[#8F7432] font-semibold">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37] mr-1" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2A160E] group-hover:text-[#9E0B14] transition-colors leading-snug">
                    {product.name}
                  </h3>

                  {product.punjabiName && (
                    <p className="text-xs text-[#8A7568] font-serif mt-0.5 tracking-wide">
                      {product.punjabiName}
                    </p>
                  )}

                  <p className="text-xs text-[#6B574C] mt-2.5 line-clamp-2 leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                {/* Weight Variant & Price + Add to Cart Button */}
                <div className="mt-5 pt-4 border-t border-[#F2E8DC] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#8A7568] uppercase tracking-wider block">
                      {product.defaultWeight}
                    </span>
                    <span className="font-serif text-lg font-bold text-[#2A160E]">
                      ₹{product.price}
                    </span>
                  </div>

                  <button
                    id={`btn-add-sig-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product, product.defaultWeight, product.price);
                    }}
                    className="px-3.5 py-2 rounded bg-[#FAF2E6] hover:bg-[#9E0B14] text-[#801015] hover:text-white border border-[#DFCBB5] hover:border-[#9E0B14] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
