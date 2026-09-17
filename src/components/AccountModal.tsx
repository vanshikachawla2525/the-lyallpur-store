import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Package, Clock, Phone, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { LyallpurLogo } from './LyallpurLogo';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'rewards'>('orders');

  if (!isOpen) return null;

  const mockPastOrders = [
    {
      id: 'LP-829415',
      date: '12 Sep 2024',
      items: 'Desi Ghee Chana Barfi (500g), Pure Desi Ghee Motichoor Laddu (1kg)',
      status: 'Delivered',
      total: 1040,
    },
    {
      id: 'LP-774102',
      date: '18 Aug 2024',
      items: 'Winter Gur Til Gachak (400g), Masala Namak Para (400g)',
      status: 'Delivered',
      total: 510,
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#FAF7F2] w-full max-w-xl rounded-2xl shadow-2xl border border-[#E8DCCF] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#E7D6C5] bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF0D4] border border-[#E5CCA0] flex items-center justify-center text-[#865E12]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-[#24130C]">
                  Lyallpur Privileges Club
                </h2>
                <span className="text-xs text-[#8A7668]">Gurpreet Singh • Model Town Member</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#4A3428] hover:bg-[#F2E8DC] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#E8DCCF] bg-[#FAF7F2] px-6 pt-3 gap-6 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-[#9E0B14] text-[#9E0B14]'
                  : 'border-transparent text-[#6B574C] hover:text-[#9E0B14]'
              }`}
            >
              Sweet Orders
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-[#9E0B14] text-[#9E0B14]'
                  : 'border-transparent text-[#6B574C] hover:text-[#9E0B14]'
              }`}
            >
              Saved Addresses
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'rewards'
                  ? 'border-[#9E0B14] text-[#9E0B14]'
                  : 'border-transparent text-[#6B574C] hover:text-[#9E0B14]'
              }`}
            >
              Heritage Points (320)
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 max-h-[50vh] overflow-y-auto">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {mockPastOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-white rounded-xl border border-[#E6DACB] shadow-sm space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-[#F0E4D5]">
                      <div>
                        <span className="font-bold text-[#24130C] font-serif text-sm mr-2">
                          {order.id}
                        </span>
                        <span className="text-[#8C7667]">{order.date}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E5F7E8] text-[#1B6D2F] font-semibold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3 h-3" />
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[#5A483E] leading-relaxed">{order.items}</p>
                    <div className="flex justify-between items-center pt-2 text-[#24130C] font-semibold">
                      <span>Total Paid:</span>
                      <span className="font-serif text-[#9E0B14] font-bold">₹{order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white p-5 rounded-xl border border-[#E6DACB] text-xs space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#9E0B14] mt-0.5" />
                  <div>
                    <span className="font-bold text-[#24130C] block">Primary Delivery Address</span>
                    <p className="text-[#655245] mt-0.5">
                      House 142, Model Town Main Road, Near Krishna Mandir, Ludhiana, Punjab - 141002
                    </p>
                    <span className="text-[11px] text-[#8C7667] mt-1 block">Phone: +91 98765 43210</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <div className="bg-white p-6 rounded-xl border border-[#E6DACB] text-center">
                <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                <h3 className="font-serif text-xl font-bold text-[#24130C]">
                  320 Heritage Shagun Points
                </h3>
                <p className="text-xs text-[#6B574C] mt-1 mb-4 max-w-sm mx-auto">
                  Earn points on every pure desi ghee mithai purchase. Redeemable for complimentary boxes of Chana Barfi and festive gift chests.
                </p>
                <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded bg-[#FAF0D4] text-[#865E12]">
                  Eligible for 10% loyalty discount on next order
                </span>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-[#E8DCCF] bg-white text-center text-xs text-[#7B6658]">
            Need personal assistance? Call Model Town Flagship:{' '}
            <strong className="text-[#24130C]">+91 161 240 2200</strong>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
