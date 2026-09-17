import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { OpeningSequence } from './components/OpeningSequence';
import { HeroSection } from './components/HeroSection';
import { PureDesiGheeSection } from './components/PureDesiGheeSection';
import { HeritageStoryTimeline } from './components/HeritageStoryTimeline';
import { GlobalPresenceMap } from './components/GlobalPresenceMap';
import { PremiumFoodMoments } from './components/PremiumFoodMoments';
import { ShopSection } from './components/ShopSection';
import { GiftingSection } from './components/GiftingSection';
import { StoresSection } from './components/StoresSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { SEOManager } from './components/SEOManager';
import { PRODUCTS_CATALOGUE } from './data/products';
import { Product, CartItem, CategoryType } from './types';

export default function App() {
  // Cinematic Haveli Entrance: Plays on first visit and can be replayed from navbar
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      // If direct deep link to product or tab, skip intro for instant rendering
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('product') || urlParams.get('tab') || urlParams.get('category')) {
        return false;
      }
      return sessionStorage.getItem('lyallpur_intro_seen') !== 'true';
    } catch {
      return true;
    }
  });

  // URL Hydration for SSR / Static link crawler readiness
  const [activeTab, setActiveTab] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      return tab && ['home', 'shop', 'gifting', 'story', 'stores'].includes(tab) ? tab : 'home';
    } catch {
      return 'home';
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category') as CategoryType;
      return cat || 'all';
    } catch {
      return 'all';
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const prodId = params.get('product');
      if (prodId) {
        const found = PRODUCTS_CATALOGUE.find((p) => p.id === prodId);
        return found || null;
      }
      return null;
    } catch {
      return null;
    }
  });

  // E-commerce Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lyallpur_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Sync URL when tab, category, or selected product changes (SEO deep linking)
  useEffect(() => {
    try {
      const params = new URLSearchParams();
      if (selectedProduct) {
        params.set('product', selectedProduct.id);
      } else {
        if (activeTab !== 'home') {
          params.set('tab', activeTab);
        }
        if (selectedCategory !== 'all') {
          params.set('category', selectedCategory);
        }
      }
      const newQuery = params.toString() ? `?${params.toString()}` : window.location.pathname;
      window.history.replaceState(null, '', newQuery);
    } catch (e) {
      // ignore
    }
  }, [activeTab, selectedCategory, selectedProduct]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lyallpur_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('lyallpur_intro_seen', 'true');
    } catch {
      // ignore
    }
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: string, category?: CategoryType) => {
    setActiveTab(tab);
    if (category) {
      setSelectedCategory(category);
    }
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations: Auto-open Slide-out Cart Drawer on Add
  const handleAddToCart = (product: Product, weight: string, price: number, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === weight
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            selectedWeight: weight,
            unitPrice: price,
            quantity,
          },
        ];
      }
    });

    // Replace page redirects with automatic slide-out cart drawer opening
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product, weight: string, price: number, quantity: number = 1) => {
    handleAddToCart(product, weight, price, quantity);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, weight: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.selectedWeight === weight) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (productId: string, weight: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedWeight === weight)
      )
    );
  };

  const handleOrderCompleted = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#20060A] selection:bg-[#9E0B14] selection:text-[#FFFDF9] font-sans">
      {/* Dynamic SEO & Schema.org JSON-LD Structured Data Engine */}
      <SEOManager
        activeTab={activeTab}
        selectedCategory={selectedCategory}
        selectedProduct={selectedProduct}
        cartCount={totalCartCount}
      />

      {/* 1. Cinematic Door Opening Sequence (First Visit / On Request) */}
      {showIntro && <OpeningSequence onComplete={handleIntroComplete} />}

      {/* 2. Sticky Brand Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onReplayIntro={handleReplayIntro}
      />

      {/* Main View Router with Smooth Subtle Fade-In Transition */}
      <main className="relative min-h-[60vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.36,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {activeTab === 'home' && (
              <HeroSection
                products={PRODUCTS_CATALOGUE}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onShopClick={(cat) => {
                  if (cat) setSelectedCategory(cat);
                }}
              />
            )}

            {activeTab === 'shop' && (
              <ShopSection
                products={PRODUCTS_CATALOGUE}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            )}

            {activeTab === 'gifting' && (
              <div className="pt-4">
                <GiftingSection />
              </div>
            )}

            {activeTab === 'story' && (
              <div className="pt-4">
                <HeritageStoryTimeline />
                <PureDesiGheeSection />
                <PremiumFoodMoments />
                <GlobalPresenceMap />
              </div>
            )}

            {activeTab === 'stores' && (
              <div className="pt-4">
                <StoresSection />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Rich Luxury Footer */}
      <Footer onNavigate={handleNavigate} onReplayIntro={handleReplayIntro} />

      {/* Slide-out Cart Drawer with Instant Checkout CTA */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onStartShopping={() => {
          setIsCartOpen(false);
          setActiveTab('shop');
        }}
      />

      {/* Full Checkout Experience */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Enhanced Product Detail Modal with Multi-angle Gallery, Zoom, and Mobile Sticky Action Bar */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={(p, w, price, q) => {
          handleAddToCart(p, w, price, q);
          setSelectedProduct(null);
          setIsCheckoutOpen(true);
        }}
        allProducts={PRODUCTS_CATALOGUE}
        onSelectRelated={(p) => setSelectedProduct(p)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS_CATALOGUE}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Account & Orders Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />
    </div>
  );
}
