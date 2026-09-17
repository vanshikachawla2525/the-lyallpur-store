import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, Zap, ShieldCheck, Clock, Check, Sparkles, Truck } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, weight: string, price: number, quantity: number) => void;
  onBuyNow: (product: Product, weight: string, price: number, quantity: number) => void;
  allProducts: Product[];
  onSelectRelated: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  allProducts,
  onSelectRelated,
}) => {
  if (!product) return null;

  const [selectedWeight, setSelectedWeight] = useState(product.defaultWeight);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // Price for weight
  const currentWeightObj = product.weights.find((w) => w.weight === selectedWeight);
  const unitPrice = currentWeightObj ? currentWeightObj.price : product.price;
  const totalPrice = unitPrice * quantity;

  // Related products from same category
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAdd = () => {
    onAddToCart(product, selectedWeight, unitPrice, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedWeight, unitPrice, quantity);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-[#FAF7F2] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#E8DCCF] overflow-hidden relative max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            id="btn-close-product-modal"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-[#9E0B14] text-[#331C13] hover:text-white border border-[#E0D0C0] transition-colors shadow-md cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div className="overflow-y-auto p-6 sm:p-8 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Product Gallery / Photography */}
              <div className="md:col-span-6 space-y-4">
                <div className="relative rounded-xl overflow-hidden border border-[#E5D7C7] bg-white shadow-md aspect-square">
                  {product.badge && (
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded bg-[#9E0B14] text-white shadow">
                      {product.badge}
                    </span>
                  )}

                  {product.isPureDesiGhee && (
                    <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full bg-[#FAF0D4] text-[#825B0E] border border-[#E2C98F]">
                      Pure Desi Ghee
                    </span>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Subtle Added Toast inside modal */}
                <AnimatePresence>
                  {addedNotice && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-[#240609] text-[#FCE8B6] rounded-lg text-xs font-medium flex items-center justify-center gap-2 shadow"
                    >
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span>Added {quantity} × {product.name} ({selectedWeight}) to your cart.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column: Details, Ingredients, & Purchasing */}
              <div className="md:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase tracking-widest text-[#9E0B14] font-semibold">
                      {product.subcategory || product.category}
                    </span>
                    <span className="text-xs text-[#8A7668]">•</span>
                    <div className="flex items-center text-xs text-[#8F7432] font-semibold">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37] mr-1" />
                      <span>{product.rating}</span>
                      <span className="text-[#8A7668] ml-1">({product.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#24130C] leading-snug">
                    {product.name}
                  </h2>

                  {product.punjabiName && (
                    <p className="text-sm text-[#8C7667] font-serif mt-0.5">
                      {product.punjabiName}
                    </p>
                  )}

                  <div className="my-4 pb-4 border-b border-[#EADECF]">
                    <span className="text-xs text-[#8A7668] block">Price for {selectedWeight}:</span>
                    <span className="font-serif text-3xl font-bold text-[#9E0B14]">
                      ₹{totalPrice}
                    </span>
                    <span className="text-xs text-[#6C5648] ml-2">Inclusive of all taxes</span>
                  </div>

                  <p className="text-sm text-[#5D4A3E] leading-relaxed font-light mb-6">
                    {product.description}
                  </p>

                  {/* Weight Selector */}
                  <div className="mb-6">
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-2">
                      Select Package Weight:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.weights.map((w) => (
                        <button
                          key={w.weight}
                          onClick={() => setSelectedWeight(w.weight)}
                          className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                            selectedWeight === w.weight
                              ? 'bg-[#9E0B14] text-white border-[#9E0B14] shadow-sm'
                              : 'bg-white text-[#4A3428] border-[#D8C7B5] hover:border-[#9E0B14]'
                          }`}
                        >
                          {w.weight} (₹{w.price})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="mb-6 flex items-center gap-4">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#4A3428]">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-[#D5C5B5] rounded-md bg-white">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1 text-sm text-[#4A3428] hover:bg-[#F2E7D8] font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-sm font-semibold text-[#24130C]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-1 text-sm text-[#4A3428] hover:bg-[#F2E7D8] font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* CTAs: Add to Cart and Buy Now */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      id="btn-modal-add-cart"
                      onClick={handleAdd}
                      className="py-3 px-4 rounded-md bg-[#FAF2E6] hover:bg-[#9E0B14] text-[#801015] hover:text-white border border-[#DFCBB5] hover:border-[#9E0B14] text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      id="btn-modal-buy-now"
                      onClick={handleBuy}
                      className="py-3 px-4 rounded-md bg-[#9E0B14] hover:bg-[#7D0910] text-white text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-[#FEE6AA]" />
                      <span>Buy Now</span>
                    </button>
                  </div>

                  {/* Authentic Product Details */}
                  <div className="space-y-2.5 pt-4 border-t border-[#E8DCCF] text-xs text-[#6B564A]">
                    {product.ingredients && product.ingredients.length > 0 && (
                      <div>
                        <strong className="text-[#3A2216]">Ingredients: </strong>
                        <span>{product.ingredients.join(', ')}</span>
                      </div>
                    )}
                    <div>
                      <strong className="text-[#3A2216]">Shelf Life: </strong>
                      <span>{product.shelfLife}</span>
                    </div>
                    <div>
                      <strong className="text-[#3A2216]">Storage: </strong>
                      <span>{product.storage}</span>
                    </div>
                  </div>

                  {/* Delivery Promise */}
                  <div className="mt-4 p-3 bg-white rounded-lg border border-[#E8DCCF] flex items-center gap-3 text-xs text-[#5A4538]">
                    <Truck className="w-4 h-4 text-[#9E0B14] flex-shrink-0" />
                    <span>Dispatched fresh daily from Model Town, Ludhiana with vacuum seal preservation.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products Recommendation */}
            {relatedProducts.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[#E8DCCF]">
                <h3 className="font-serif text-xl font-bold text-[#24130C] mb-4">
                  You May Also Cherish
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectRelated(rel)}
                      className="bg-white p-3 rounded-lg border border-[#E6D9CA] hover:border-[#9E0B14] cursor-pointer transition-all flex items-center gap-3 group"
                    >
                      <img
                        src={rel.image}
                        alt={rel.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-serif font-bold text-[#24130C] group-hover:text-[#9E0B14] truncate">
                          {rel.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#801015]">
                          ₹{rel.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
