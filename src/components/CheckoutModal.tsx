import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Truck, Lock, CreditCard, Smartphone, Banknote, Building2 } from 'lucide-react';
import { CartItem } from '../types';
import { LyallpurLogo } from './LyallpurLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    landmark: '',
    city: 'Ludhiana',
    state: 'Punjab',
    pincode: '141002',
    deliverySlot: 'morning',
    giftMessage: '',
    paymentMethod: 'upi',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);
  const delivery = subtotal >= 999 ? 0 : 90;
  const total = subtotal + delivery;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `LP-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderPlaced(true);
      onOrderCompleted();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#FAF7F2] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#E8DCCF] overflow-hidden relative max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E7D6C5] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LyallpurLogo size="sm" />
            <div>
              <h2 className="font-serif text-xl font-bold text-[#24130C]">
                Secure Checkout
              </h2>
              <span className="text-xs text-[#8A7668]">Direct from Ludhiana Confectionery</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#4A3428] hover:bg-[#F2E8DC] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-grow">
          {orderPlaced ? (
            <div className="text-center py-12 max-w-lg mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-full bg-[#FAF0D4] border-2 border-[#D4AF37] text-[#865E12] flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <CheckCircle2 className="w-10 h-10 text-[#9E0B14]" />
              </motion.div>

              <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
                Order Confirmed
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#24130C] mt-1 mb-2">
                Sweet Blessings Await!
              </h3>
              <p className="text-sm text-[#5C483D] mb-6 leading-relaxed">
                Thank you, <strong className="text-[#24130C]">{formData.name}</strong>. Your order{' '}
                <strong className="text-[#9E0B14]">{orderId}</strong> has been received by our master halwais at Model Town. We are packing your pure desi ghee selections in aroma-lock containers.
              </p>

              <div className="bg-white p-5 rounded-xl border border-[#EADFCF] text-left text-xs space-y-2 mb-8 shadow-sm">
                <div className="flex justify-between pb-2 border-b border-[#F0E4D5]">
                  <span className="text-[#8C7667]">Order Number:</span>
                  <span className="font-bold text-[#24130C]">{orderId}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0E4D5]">
                  <span className="text-[#8C7667]">Delivery Address:</span>
                  <span className="font-medium text-[#24130C] text-right max-w-xs">{formData.address}, {formData.city}, {formData.state} - {formData.pincode}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0E4D5]">
                  <span className="text-[#8C7667]">Phone Updates:</span>
                  <span className="font-medium text-[#24130C]">{formData.mobile}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#9E0B14] pt-1">
                  <span>Total Amount:</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#9E0B14] hover:bg-[#7D0910] text-white text-xs uppercase tracking-widest font-semibold rounded-md shadow-md transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Delivery Form Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#24130C] mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#9E0B14]" />
                    1. Shipping & Contact Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Gurpreet Singh"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#D5C5B5] bg-white focus:outline-none focus:border-[#9E0B14]"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#D5C5B5] bg-white focus:outline-none focus:border-[#9E0B14]"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="recipient@example.com"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#D5C5B5] bg-white focus:outline-none focus:border-[#9E0B14]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                        Delivery Address (House / Flat / Street) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="House No., Street Name, Colony / Sector"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#D5C5B5] bg-white focus:outline-none focus:border-[#9E0B14]"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#D5C5B5] bg-white focus:outline-none focus:border-[#9E0B14]"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#D5C5B5] bg-white focus:outline-none focus:border-[#9E0B14]"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#D5C5B5] bg-white focus:outline-none focus:border-[#9E0B14]"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.landmark}
                        onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                        placeholder="Near Gurudwara / Market"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#D5C5B5] bg-white focus:outline-none focus:border-[#9E0B14]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#4A3428] block mb-1">
                        Complimentary Gift Note (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.giftMessage}
                        onChange={(e) => setFormData({ ...formData, giftMessage: e.target.value })}
                        placeholder="Add a personalized message printed on luxury gold-embossed card..."
                        className="w-full text-xs p-3 rounded-lg border border-[#D5C5B5] bg-white focus:outline-none focus:border-[#9E0B14]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Selection Options */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#24130C] mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#9E0B14]" />
                    2. Payment Method
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'upi', label: 'Instant UPI / QR', sub: 'GPay, PhonePe, Paytm', icon: Smartphone },
                      { id: 'cards', label: 'Credit / Debit Cards', sub: 'Visa, Mastercard, RuPay', icon: CreditCard },
                      { id: 'netbanking', label: 'Net Banking', sub: 'All Major Indian Banks', icon: Building2 },
                      { id: 'cod', label: 'Cash on Delivery', sub: 'Verified for Ludhiana & NCR', icon: Banknote },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <label
                          key={opt.id}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                            formData.paymentMethod === opt.id
                              ? 'bg-[#FAF0D4]/70 border-[#D4AF37] shadow-xs'
                              : 'bg-white border-[#E5D7C7] hover:border-[#D4AF37]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            checked={formData.paymentMethod === opt.id}
                            onChange={() => setFormData({ ...formData, paymentMethod: opt.id })}
                            className="mt-1 text-[#9E0B14] focus:ring-[#9E0B14]"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 font-semibold text-xs text-[#24130C]">
                              <Icon className="w-3.5 h-3.5 text-[#9E0B14]" />
                              <span>{opt.label}</span>
                            </div>
                            <span className="text-[11px] text-[#8C7667]">{opt.sub}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {/* Architecture Note for Gateway */}
                  <div className="mt-3 p-2.5 rounded-lg bg-[#FAF2DE] border border-[#E9D6AB] text-[11px] text-[#6B4F10] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>Payment provider architecture ready for Razorpay/Stripe production webhook sync.</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E8DCCF] shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#24130C] mb-4 pb-2 border-b border-[#F0E4D5]">
                    Order Summary ({cartItems.length} items)
                  </h3>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2 mb-4">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedWeight}`}
                        className="flex justify-between items-center text-xs pb-2 border-b border-[#F7EFE6]"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold text-[#24130C]">{item.product.name}</p>
                            <span className="text-[#8C7667] text-[11px]">
                              {item.quantity} × {item.selectedWeight}
                            </span>
                          </div>
                        </div>
                        <span className="font-serif font-bold text-[#9E0B14]">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-xs text-[#6B564A] pt-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-[#24130C]">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span>{delivery === 0 ? 'Complimentary' : `₹${delivery}`}</span>
                    </div>
                    <div className="flex justify-between text-[#8A7668]">
                      <span>Vacuum Sealing & Aroma Lock</span>
                      <span>FREE</span>
                    </div>

                    <div className="pt-3 border-t border-[#F0E4D5] flex justify-between items-center">
                      <span className="font-serif text-base font-bold text-[#24130C]">
                        Total Due:
                      </span>
                      <span className="font-serif text-2xl font-bold text-[#9E0B14]">
                        ₹{total}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting || cartItems.length === 0}
                    className="w-full py-3.5 px-4 bg-[#9E0B14] hover:bg-[#7D0910] disabled:bg-gray-400 text-white text-xs uppercase tracking-widest font-semibold rounded-md shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-[#FEE6AA]" />
                    <span>{isSubmitting ? 'Placing Order...' : `Place Order (₹${total})`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-[#8C7667] mt-3">
                    By placing your order, you agree to Lyallpur Sweets terms and fresh delivery policy.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
