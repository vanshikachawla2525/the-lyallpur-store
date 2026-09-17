import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Star,
  Sparkles,
  Filter,
  Check,
  Search,
} from 'lucide-react';
import { Product, CategoryType } from '../types';
import { OptimizedImage } from './OptimizedImage';
import { ProductGridCinematicSkeleton } from './CinematicSkeletonLoader';

interface ShopSectionProps {
  products: Product[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onAddToCart: (product: Product, weight: string, price: number, quantity: number) => void;
  onBuyNow: (product: Product, weight: string, price: number, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  isHeroEmbedded?: boolean;
}

interface CompactProductCardProps {
  product: Product;
  index: number;
  currentWeight: string;
  currentPrice: number;
  currentQty: number;
  isAdded?: boolean;
  onSelectProduct: (product: Product) => void;
  onWeightChange: (productId: string, weight: string) => void;
  onQuantityChange: (productId: string, delta: number) => void;
  onAdd: (product: Product, e: React.MouseEvent) => void;
  onBuy: (product: Product, e: React.MouseEvent) => void;
}

// Compact Product Card with High-Contrast CTAs & Layout Shift Prevention
const CompactProductCard: React.FC<CompactProductCardProps> = ({
  product,
  currentWeight,
  currentPrice,
  currentQty,
  isAdded,
  onSelectProduct,
  onWeightChange,
  onAdd,
}) => {
  return (
    <div
      className="bg-white rounded-xl sm:rounded-2xl border border-[#E6D8C8] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#9E0B14]/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer w-full will-change-transform"
      onClick={() => onSelectProduct(product)}
    >
      {/* Top Image Stage with Layout Shift Prevention */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#F5EFEB] overflow-hidden">
        <OptimizedImage
          src={product.image}
          alt={product.name}
          aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
          imgClassName="group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-md bg-[#9E0B14] text-white shadow-xs">
            {product.badge}
          </span>
        )}

        {product.isPureDesiGhee && (
          <span className="absolute top-2.5 right-2.5 z-10 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-full bg-[#FAF0D4] text-[#825B0E] border border-[#E2C98F]">
            Desi Ghee
          </span>
        )}

        {/* Added to Cart Feedback Toast */}
        <AnimatePresence>
          {isAdded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 bottom-0 z-20 bg-[#240609]/95 text-[#FCE8B6] text-[11px] sm:text-xs py-1.5 text-center font-bold flex items-center justify-center gap-1.5 shadow"
            >
              <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Added to Cart</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 md:p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Product Category & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#9E0B14] font-bold truncate">
              {product.subcategory || product.category}
            </span>
            <div className="flex items-center text-[11px] font-bold text-[#8F7432]">
              <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37] mr-0.5" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-sm sm:text-lg md:text-xl font-bold text-[#2A160E] group-hover:text-[#9E0B14] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Shop Placement: Price + Weight Selector + High Contrast Add to Cart Button */}
        <div className="mt-3 pt-2.5 border-t border-[#F2E8DC] space-y-2.5" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between gap-1.5">
            {/* Weight Pills */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto hide-scrollbar">
              {product.weights.map((w) => (
                <button
                  key={w.weight}
                  type="button"
                  onClick={() => onWeightChange(product.id, w.weight)}
                  className={`px-2 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                    currentWeight === w.weight
                      ? 'bg-[#9E0B14] text-white border-[#9E0B14] shadow-xs ring-1 ring-[#9E0B14]'
                      : 'bg-[#FAF7F2] text-[#4A3428] border-[#DECFC0] hover:border-[#9E0B14]'
                  }`}
                >
                  {w.weight}
                </button>
              ))}
            </div>

            {/* Price */}
            <span className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#9E0B14] whitespace-nowrap">
              ₹{currentPrice * currentQty}
            </span>
          </div>

          {/* High-Contrast Quick Add Button */}
          <button
            id={`btn-add-${product.id}`}
            type="button"
            onClick={(e) => onAdd(product, e)}
            className="w-full py-2.5 px-3 rounded-lg bg-[#FAF2E6] hover:bg-[#9E0B14] text-[#9E0B14] hover:text-white border-2 border-[#9E0B14] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  isHeroEmbedded = false,
}) => {
  const [productWeights, setProductWeights] = useState<Record<string, string>>({});
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  const [recentlyAdded, setRecentlyAdded] = useState<Record<string, boolean>>({});
  const [onlyDesiGhee, setOnlyDesiGhee] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHydrating, setIsHydrating] = useState(false);

  // Subtle smooth skeleton hydration simulation on category change to prevent layout shift
  useEffect(() => {
    setIsHydrating(true);
    const t = setTimeout(() => setIsHydrating(false), 260);
    return () => clearTimeout(t);
  }, [selectedCategory, onlyDesiGhee]);

  const categoriesList: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Delicacies' },
    { id: 'sweets', label: 'Pure Desi Ghee Mithai' },
    { id: 'gachak', label: 'Gur Gachak & Rewri' },
    { id: 'namkeen', label: 'Savouries / Namkeen' },
    { id: 'mathi', label: 'Mathi & Khasta' },
    { id: 'cookies', label: 'Bakery & Cookies' },
    { id: 'gifting', label: 'Gift Boxes' },
  ];

  const categoryTitlesMap: Record<string, { title: string; subtitle: string }> = {
    all: {
      title: 'Mithai & Delicacies',
      subtitle: 'Pure Desi Ghee Heritage Since 1975',
    },
    sweets: {
      title: 'Pure Desi Ghee Mithai',
      subtitle: 'Crafted with Fresh Bilona Ghee in Ludhiana',
    },
    gachak: {
      title: 'Gur Gachak & Rewri',
      subtitle: 'Winter Heritage Recipe with Organic Jaggery',
    },
    namkeen: {
      title: 'Savouries & Namkeen',
      subtitle: 'Crisp, Aromatic Punjabi Tea-Time Snacks',
    },
    mathi: {
      title: 'Mathi & Khasta',
      subtitle: 'Spiced Flaky Confections & Crisps',
    },
    cookies: {
      title: 'Bakery & Cookies',
      subtitle: 'Baked Fresh Daily with Cardamom & Pistachio',
    },
    gifting: {
      title: 'Gift Boxes & Hampers',
      subtitle: 'Luxurious Rigid Velvet & Tin Gift Boxes',
    },
  };

  const currentCategoryInfo = categoryTitlesMap[selectedCategory] || {
    title: 'Mithai & Delicacies',
    subtitle: 'Pure Desi Ghee Heritage Since 1975',
  };

  const handleWeightChange = (productId: string, weight: string) => {
    setProductWeights((prev) => ({ ...prev, [productId]: weight }));
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setProductQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const getProductPrice = (product: Product): number => {
    const selectedWeight = productWeights[product.id] || product.defaultWeight;
    const match = product.weights.find((w) => w.weight === selectedWeight);
    return match ? match.price : product.price;
  };

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const weight = productWeights[product.id] || product.defaultWeight;
    const price = getProductPrice(product);
    const qty = productQuantities[product.id] || 1;

    onAddToCart(product, weight, price, qty);

    setRecentlyAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setRecentlyAdded((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const handleBuy = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const weight = productWeights[product.id] || product.defaultWeight;
    const price = getProductPrice(product);
    const qty = productQuantities[product.id] || 1;
    onBuyNow(product, weight, price, qty);
  };

  // Filter products according to category, search, and pure desi ghee
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      if (onlyDesiGhee && !p.isPureDesiGhee) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchPunjabi = p.punjabiName?.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        if (!matchName && !matchPunjabi && !matchDesc) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategory, onlyDesiGhee, searchQuery, sortBy]);

  const content = (
    <div className={isHeroEmbedded ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
      {/* Category Filter Pills (Shop Page Only) */}
      {!isHeroEmbedded && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 hide-scrollbar"
        >
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-cat-${cat.id}`}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm tracking-wider uppercase font-bold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-[#9E0B14] text-white font-bold shadow-md scale-105'
                    : 'bg-white text-[#4A3428] border border-[#E0D2C2] hover:border-[#9E0B14] hover:text-[#9E0B14]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>
      )}

      {/* Category Heading Header */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        className="mb-6 sm:mb-8 text-center sm:text-left pb-4 border-b border-[#E6D8C8]"
      >
        <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-widest text-[#9E0B14] uppercase mb-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>{currentCategoryInfo.subtitle}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#24130C] tracking-tight leading-tight">
          {currentCategoryInfo.title}
        </h2>
      </motion.div>

      {/* Filter & Search Controls (Shop Page Only) */}
      {!isHeroEmbedded && (
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#E5D7C7] shadow-xs mb-7 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-bold text-[#4A3428] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyDesiGhee}
                onChange={(e) => setOnlyDesiGhee(e.target.checked)}
                className="w-4 h-4 rounded text-[#9E0B14] focus:ring-[#9E0B14] border-[#C8B8A6] accent-[#9E0B14]"
              />
              <span className="text-[#801015]">100% Pure Desi Ghee</span>
            </label>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8C7667]" />
              <input
                type="text"
                placeholder="Search delicacy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#D5C5B5] bg-[#FAF7F2] focus:outline-none focus:border-[#9E0B14] w-48 sm:w-56 text-[#24130C]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs text-[#826F62]">
            <span className="flex items-center gap-1 font-bold">
              <Filter className="w-3 h-3 text-[#9E0B14]" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-[#FAF7F2] border border-[#D5C5B5] rounded-lg px-2.5 py-1 text-[#3E271B] focus:outline-none focus:border-[#9E0B14] font-medium"
            >
              <option value="featured">Featured Heritage</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <span className="font-bold text-[#9E0B14] ml-1">
              {filteredProducts.length} items
            </span>
          </div>
        </div>
      )}

      {/* Dynamic Hydration Skeleton vs Product Cards */}
      {isHydrating ? (
        <ProductGridCinematicSkeleton count={4} />
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E7DACB] shadow-xs">
          <p className="font-serif text-lg text-[#4A3428] font-bold">No sweets match this filter.</p>
          <button
            type="button"
            onClick={() => {
              onSelectCategory('all');
              setOnlyDesiGhee(false);
              setSearchQuery('');
            }}
            className="mt-3 px-5 py-2 text-xs uppercase tracking-widest font-bold text-white bg-[#9E0B14] hover:bg-[#800910] rounded-lg transition-colors cursor-pointer shadow"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6">
          {filteredProducts.map((product, index) => {
            const currentWeight = productWeights[product.id] || product.defaultWeight;
            const currentPrice = getProductPrice(product);
            const currentQty = productQuantities[product.id] || 1;
            const isAdded = recentlyAdded[product.id];

            return (
              <CompactProductCard
                key={product.id}
                product={product}
                index={index}
                currentWeight={currentWeight}
                currentPrice={currentPrice}
                currentQty={currentQty}
                isAdded={isAdded}
                onSelectProduct={onSelectProduct}
                onWeightChange={handleWeightChange}
                onQuantityChange={handleQuantityChange}
                onAdd={handleAdd}
                onBuy={handleBuy}
              />
            );
          })}
        </div>
      )}
    </div>
  );

  if (isHeroEmbedded) {
    return <div id="hero-shop-products">{content}</div>;
  }

  return (
    <section id="shop-section" className="pt-6 sm:pt-8 pb-20 bg-[#FAF7F2] min-h-screen">
      {content}
    </section>
  );
};
