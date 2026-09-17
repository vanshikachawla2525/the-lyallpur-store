import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Star,
  ShoppingBag,
  Zap,
  Check,
  Truck,
  Maximize2,
  ZoomIn,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Product } from '../types';
import { OptimizedImage } from './OptimizedImage';
import {
  desiGheeImg,
  giftingBoxImg,
  craftMomentImg,
} from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, weight: string, price: number, quantity: number) => void;
  onBuyNow: (product: Product, weight: string, price: number, quantity: number) => void;
  allProducts: Product[];
  onSelectRelated: (product: Product) => void;
}

interface GalleryAngle {
  id: string;
  label: string;
  tag: string;
  image: string;
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
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);

  // Interactive Zoom Lens State
  const [isZooming, setIsZooming] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const [isModalZoomOpen, setIsModalZoomOpen] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Gallery Angles / Multi-angle images
  const galleryAngles: GalleryAngle[] = [
    {
      id: 'platter',
      label: 'Master Platter',
      tag: 'Fresh Confection',
      image: product.image,
    },
    {
      id: 'texture',
      label: 'Desi Ghee Texture',
      tag: '100% Cow Ghee',
      image: product.isPureDesiGhee ? desiGheeImg : product.image,
    },
    {
      id: 'packaging',
      label: 'Royal Gift Box',
      tag: 'Embossed Tin',
      image: giftingBoxImg,
    },
    {
      id: 'ingredients',
      label: 'Handcrafted Heritage',
      tag: 'Brass Kadhai',
      image: craftMomentImg,
    },
  ];

  const currentActiveImage = galleryAngles[activeAngleIndex]?.image || product.image;

  // Price calculation
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
    setTimeout(() => setAddedNotice(false), 2400);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedWeight, unitPrice, quantity);
  };

  // Mouse Move on Main Image for Smooth Magnifying Lens
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomCoords({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 pb-24 sm:pb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FAF7F2] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#E8DCCF] overflow-hidden relative max-h-[92vh] flex flex-col"
        >
          {/* Top Header Bar with Close Button */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-white/90 backdrop-blur-md border-b border-[#E8DCCF]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9E0B14]" />
              <span className="text-xs uppercase tracking-widest font-bold text-[#9E0B14]">
                The Lyallpur Store Heritage Collection
              </span>
            </div>

            <button
              id="btn-close-product-modal"
              onClick={onClose}
              className="p-2 rounded-full bg-[#F5EEE6] hover:bg-[#9E0B14] text-[#331C13] hover:text-white border border-[#E0D0C0] transition-colors shadow-xs cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Container */}
          <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Column: Interactive Product Media Gallery with Multi-Angle Thumbnails & Hover Zoom */}
              <div className="md:col-span-6 space-y-3 sm:space-y-4">
                {/* Main Image Stage with Hover Zoom Lens */}
                <div
                  ref={imageContainerRef}
                  onMouseEnter={() => setIsZooming(true)}
                  onMouseLeave={() => setIsZooming(false)}
                  onMouseMove={handleMouseMove}
                  onClick={() => setIsModalZoomOpen(true)}
                  className="relative rounded-2xl overflow-hidden border border-[#E2D4C3] bg-white shadow-md aspect-square cursor-crosshair group select-none"
                >
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3.5 left-3.5 z-20 px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md bg-[#9E0B14] text-white shadow">
                      {product.badge}
                    </span>
                  )}

                  {product.isPureDesiGhee && (
                    <span className="absolute top-3.5 right-3.5 z-20 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#FAF0D4] text-[#825B0E] border border-[#E2C98F] shadow-xs">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      Pure Desi Ghee
                    </span>
                  )}

                  {/* Zoom Hint Icon */}
                  <div className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium flex items-center gap-1 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3 h-3" />
                    <span className="hidden sm:inline">Hover / Tap to Zoom</span>
                  </div>

                  {/* Active Main Image with Zoom scale */}
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={currentActiveImage}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      style={{
                        transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                        transform: isZooming ? 'scale(2.2)' : 'scale(1)',
                        transition: isZooming ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
                      }}
                      className="w-full h-full object-cover object-center will-change-transform"
                    />
                  </div>
                </div>

                {/* Multi-angle Thumbnail Selection Bar */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B564A] block">
                    Product Perspectives ({galleryAngles.length} Views)
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {galleryAngles.map((angle, idx) => (
                      <button
                        key={angle.id}
                        type="button"
                        onClick={() => setActiveAngleIndex(idx)}
                        className={`relative rounded-xl overflow-hidden border p-1 transition-all duration-200 text-left cursor-pointer flex flex-col items-center bg-white ${
                          activeAngleIndex === idx
                            ? 'border-[#9E0B14] ring-2 ring-[#9E0B14]/30 shadow-md'
                            : 'border-[#E2D4C3] hover:border-[#9E0B14]/60 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#F5EFEB] mb-1">
                          <img
                            src={angle.image}
                            alt={angle.label}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[9px] font-bold text-[#2A160E] truncate w-full text-center">
                          {angle.label}
                        </span>
                        <span className="text-[8px] text-[#8C7667] truncate w-full text-center hidden sm:block">
                          {angle.tag}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Added to Cart Feedback Toast */}
                <AnimatePresence>
                  {addedNotice && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-[#240609] text-[#FCE8B6] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg border border-[#D4AF37]/40"
                    >
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span>Added {quantity} × {product.name} ({selectedWeight}) to your Lyallpur Cart!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column: Details, Ingredients, & High-Contrast Purchasing CTAs */}
              <div className="md:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase tracking-widest text-[#9E0B14] font-bold">
                      {product.subcategory || product.category}
                    </span>
                    <span className="text-xs text-[#8A7668]">•</span>
                    <div className="flex items-center text-xs text-[#8F7432] font-semibold">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37] mr-1" />
                      <span>{product.rating}</span>
                      <span className="text-[#8A7668] ml-1">({product.reviewsCount} verified reviews)</span>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#24130C] leading-tight">
                    {product.name}
                  </h1>

                  {product.punjabiName && (
                    <p className="text-sm text-[#8C7667] font-serif mt-0.5">
                      {product.punjabiName}
                    </p>
                  )}

                  {/* Price Block */}
                  <div className="my-4 py-3 px-4 rounded-xl bg-white border border-[#EADECF] flex items-baseline justify-between shadow-xs">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#8A7668] block">
                        Price for {selectedWeight}:
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-3xl font-bold text-[#9E0B14]">
                          ₹{totalPrice}
                        </span>
                        <span className="text-[11px] text-[#6C5648]">Inclusive of all taxes</span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-md bg-[#FAF2E6] text-[#801015] border border-[#E5D2BA] text-xs font-semibold">
                      In Stock • Daily Fresh Batch
                    </span>
                  </div>

                  <p className="text-sm text-[#5D4A3E] leading-relaxed font-normal mb-5">
                    {product.description}
                  </p>

                  {/* Weight Selector */}
                  <div className="mb-5">
                    <label className="text-xs uppercase tracking-wider font-bold text-[#4A3428] block mb-2">
                      Choose Package Weight:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.weights.map((w) => (
                        <button
                          key={w.weight}
                          type="button"
                          onClick={() => setSelectedWeight(w.weight)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                            selectedWeight === w.weight
                              ? 'bg-[#9E0B14] text-white border-[#9E0B14] shadow-md ring-2 ring-[#9E0B14]/20'
                              : 'bg-white text-[#4A3428] border-[#D8C7B5] hover:border-[#9E0B14] hover:bg-[#FAF6F0]'
                          }`}
                        >
                          <span>{w.weight}</span>
                          <span className={selectedWeight === w.weight ? 'text-[#FCE8B6]' : 'text-[#801015]'}>
                            (₹{w.price})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="mb-6 flex items-center gap-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#4A3428]">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-[#D5C5B5] rounded-lg bg-white shadow-xs">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3.5 py-1.5 text-sm text-[#4A3428] hover:bg-[#F2E7D8] font-bold cursor-pointer transition-colors rounded-l-lg"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 text-sm font-bold text-[#24130C] min-w-[32px] text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3.5 py-1.5 text-sm text-[#4A3428] hover:bg-[#F2E7D8] font-bold cursor-pointer transition-colors rounded-r-lg"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* High-Contrast Action CTAs */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      id="btn-modal-add-cart"
                      type="button"
                      onClick={handleAdd}
                      className="py-3.5 px-4 rounded-xl bg-white hover:bg-[#9E0B14] text-[#9E0B14] hover:text-white border-2 border-[#9E0B14] text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      id="btn-modal-buy-now"
                      type="button"
                      onClick={handleBuy}
                      className="py-3.5 px-4 rounded-xl bg-[#9E0B14] hover:bg-[#800910] text-white border-2 border-[#9E0B14] text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-[#FEE6AA]" />
                      <span>Buy Now</span>
                    </button>
                  </div>

                  {/* Authentic Product Details */}
                  <div className="space-y-2 pt-4 border-t border-[#E8DCCF] text-xs text-[#6B564A]">
                    {product.ingredients && product.ingredients.length > 0 && (
                      <div className="flex items-start gap-1.5">
                        <strong className="text-[#3A2216] flex-shrink-0">Ingredients: </strong>
                        <span>{product.ingredients.join(', ')}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-1.5">
                      <strong className="text-[#3A2216] flex-shrink-0">Shelf Life: </strong>
                      <span>{product.shelfLife}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <strong className="text-[#3A2216] flex-shrink-0">Storage: </strong>
                      <span>{product.storage}</span>
                    </div>
                  </div>

                  {/* Delivery Promise */}
                  <div className="mt-4 p-3 bg-white rounded-xl border border-[#E8DCCF] flex items-center gap-3 text-xs text-[#5A4538] shadow-xs">
                    <Truck className="w-4 h-4 text-[#9E0B14] flex-shrink-0" />
                    <span>Dispatched fresh daily from Model Town, Ludhiana with vacuum-sealed safety packaging.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products Recommendation */}
            {relatedProducts.length > 0 && (
              <div className="mt-10 pt-6 border-t border-[#E8DCCF]">
                <h3 className="font-serif text-lg font-bold text-[#24130C] mb-3 flex items-center gap-2">
                  <span>Frequently Paired Specialities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectRelated(rel)}
                      className="bg-white p-3 rounded-xl border border-[#E6D9CA] hover:border-[#9E0B14] cursor-pointer transition-all flex items-center gap-3 group shadow-xs hover:shadow-md"
                    >
                      <img
                        src={rel.image}
                        alt={rel.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover rounded-lg flex-shrink-0 border border-[#EAE0D4]"
                      />
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-serif font-bold text-[#24130C] group-hover:text-[#9E0B14] truncate">
                          {rel.name}
                        </h4>
                        <span className="text-xs font-bold text-[#9E0B14] block mt-0.5">
                          ₹{rel.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Persistent Mobile Sticky Action Bar (Anchored at bottom for mobile screens) */}
          <div className="sm:hidden sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5D7C7] p-3 shadow-[0_-8px_20px_rgba(0,0,0,0.12)] flex items-center justify-between gap-3">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase font-bold text-[#8A7668] truncate">
                {selectedWeight}
              </span>
              <span className="font-serif text-lg font-bold text-[#9E0B14] leading-tight">
                ₹{totalPrice}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-grow justify-end">
              <button
                type="button"
                onClick={handleAdd}
                className="py-2.5 px-3 rounded-lg bg-[#FAF2E6] text-[#9E0B14] border border-[#9E0B14] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>

              <button
                type="button"
                onClick={handleBuy}
                className="py-2.5 px-4 rounded-lg bg-[#9E0B14] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-[#FEE6AA]" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
