import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, weight: string, delta: number) => void;
  onRemoveItem: (productId: string, weight: string) => void;
  onProceedToCheckout: () => void;
  onStartShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onStartShopping,
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Slide-out Drawer */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl border-l border-[#E5D7C7] flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#E5D7C7] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#9E0B14]" />
                <h2 className="font-serif text-xl font-bold text-[#24130C]">
                  Your Lyallpur Cart
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF0D4] text-[#825B0E] font-semibold border border-[#E2C98F]">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
                </span>
              </div>

              <button
                id="btn-close-cart-drawer"
                onClick={onClose}
                className="p-2 rounded-full text-[#4A3428] hover:bg-[#F2E7D8] transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-6 py-3 bg-[#FAF2DE] border-b border-[#E8D4A8] text-xs text-[#6B4F10]">
              {amountToFreeShipping > 0 ? (
                <div className="space-y-1.5">
                  <p className="font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Add ₹{amountToFreeShipping} more for complimentary Express All-India shipping!
                  </p>
                  <div className="w-full bg-[#E5D2A6] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#9E0B14] h-full transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="font-semibold text-[#801015] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Complimentary Express Shipping unlocked!
                </p>
              )}
            </div>

            {/* Cart Items List */}
            <div className="p-6 overflow-y-auto flex-grow space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#F5EFEB] border border-[#E0D2C0] flex items-center justify-center mx-auto mb-4 text-[#8C7667]">
                    <ShoppingBag className="w-8 h-8 opacity-40" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2A160E] mb-1">
                    Your collection is empty
                  </h3>
                  <p className="text-xs text-[#786457] max-w-xs mx-auto mb-6">
                    Discover our freshly prepared pure desi ghee confections, gachak, and namkeen.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onStartShopping();
                    }}
                    className="px-6 py-2.5 rounded-md bg-[#9E0B14] hover:bg-[#7D0910] text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer shadow"
                  >
                    Explore Specialities
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedWeight}`}
                    className="bg-white p-4 rounded-xl border border-[#E6D9CA] shadow-sm flex gap-4 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-[#E8DCCF]"
                    />

                    <div className="flex-grow overflow-hidden">
                      <h4 className="font-serif text-sm font-bold text-[#24130C] truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-[#8A7568] block mt-0.5">
                        Weight: {item.selectedWeight}
                      </span>
                      <span className="font-serif text-xs font-bold text-[#9E0B14] mt-1 block">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                    </div>

                    {/* Quantity Selector & Remove */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedWeight)}
                        className="text-[#9E0B14] hover:text-[#7D0910] p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center border border-[#D5C5B5] rounded bg-[#FAF7F2]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedWeight, -1)}
                          className="px-2 py-0.5 text-xs text-[#4A3428] hover:bg-[#EAE0D2] font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold text-[#24130C]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedWeight, 1)}
                          className="px-2 py-0.5 text-xs text-[#4A3428] hover:bg-[#EAE0D2] font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-[#E5D7C7] bg-white space-y-4">
                <div className="space-y-1.5 text-xs text-[#6B564A]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-serif font-bold text-sm text-[#24130C]">
                      ₹{subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard Express Shipping</span>
                    <span>{subtotal >= freeShippingThreshold ? 'FREE' : '₹90'}</span>
                  </div>
                  <div className="flex justify-between text-[#8A7568] text-[11px]">
                    <span>Taxes & Vacuum Fresh Packing</span>
                    <span>Included</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F0E4D5] flex justify-between items-center">
                  <span className="font-serif text-base font-bold text-[#24130C]">
                    Estimated Total
                  </span>
                  <span className="font-serif text-xl font-bold text-[#9E0B14]">
                    ₹{subtotal >= freeShippingThreshold ? subtotal : subtotal + 90}
                  </span>
                </div>

                <button
                  id="btn-proceed-checkout"
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full py-3.5 px-4 bg-[#9E0B14] hover:bg-[#7D0910] text-white text-xs uppercase tracking-widest font-semibold rounded-md shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#FEE6AA]" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C7667]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Secure 256-bit Encrypted Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
