'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, Navigation, Info, ArrowRight } from 'lucide-react';
import { mockTaxi, mockRoutes } from '@/data/mock/routes.mock';

export default function SelectRoutePage() {
  const router = useRouter();
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const selectedRoute = mockRoutes.find((r) => r.id === selectedRouteId);

  const handleConfirmPay = () => {
    if (!selectedRoute) return;
    // Add micro-interaction delay or navigate directly
    router.push('/');
  };

  return (
    <div className="min-h-screen pb-36 bg-[#FCFAF7] text-[#1A2A3A]">
      {/* HEADER SECTION */}
      <header className="sticky top-0 bg-[#FCFAF7]/90 backdrop-blur-md z-20 px-5 py-4 border-b border-[#F0ECE6] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#EAE6DF] active:bg-[#DFD9CE] transition-colors duration-150 touch-sm"
          >
            <ArrowLeft size={20} className="text-[#1A2A3A]" />
          </Link>
          <div>
            <h1 className="text-[19px] font-extrabold text-[#7D5A2B] leading-tight uppercase tracking-tight">
              Select Route
            </h1>
            <p className="text-[10px] font-bold text-[#8A8073] tracking-[1.5px] uppercase mt-0.5">
              Route Options
            </p>
          </div>
        </div>
        <div className="bg-[#1A2A3A] text-white px-3 py-1.5 rounded-lg text-[13px] font-bold tracking-wider shadow-sm">
          {mockTaxi.plateNumber}
        </div>
      </header>

      <div className="px-5 pt-5 stagger-children">
        {/* ACTIVE TAXI CARD */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-white rounded-2xl border border-[#EDEAE4] p-4 flex items-center justify-between mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center gap-3.5">
            {/* Minibus Tan Icon */}
            <div className="w-12 h-12 rounded-xl bg-[#F5EFE6] flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7D5A2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Custom Minibus Icon */}
                <rect x="3" y="10" width="18" height="9" rx="2" />
                <path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
                <circle cx="7" cy="19" r="2.5" fill="#7D5A2B" />
                <circle cx="17" cy="19" r="2.5" fill="#7D5A2B" />
                <line x1="12" y1="10" x2="12" y2="15" />
              </svg>
            </div>
            <div>
              <h2 className="text-[17px] font-extrabold text-[#1A2A3A] leading-tight">
                {mockTaxi.model}
              </h2>
              <p className="text-[13px] text-[#8A8073] mt-0.5 font-medium">
                Plate: <span className="font-bold">{mockTaxi.plateNumber}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-[#E0F2F1] text-[#00695C] px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase">
            <CheckCircle2 size={13} strokeWidth={2.5} />
            Active
          </div>
        </motion.div>

        {/* SECTION LABEL */}
        <h3 className="text-[11px] font-extrabold tracking-[2px] text-[#8A8073] uppercase mb-3.5">
          Available Routes
        </h3>

        {/* ROUTE LIST */}
        <div className="flex flex-col gap-3.5 mb-6">
          {mockRoutes.map((route, idx) => {
            const isSelected = selectedRouteId === route.id;
            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
                onClick={() => setSelectedRouteId(route.id)}
                className={`bg-white rounded-2xl border p-4.5 flex items-center justify-between cursor-pointer transition-all duration-200 select-none shadow-[0_2px_8px_rgba(0,0,0,0.01)] ${
                  isSelected
                    ? 'border-[#FFC107] ring-1 ring-[#FFC107]'
                    : 'border-[#EDEAE4] hover:border-[#D1CDC3]'
                }`}
              >
                <div className="flex-1">
                  {/* Route text */}
                  <h4 className="text-[16px] font-extrabold text-[#1A2A3A] flex items-center gap-2 mb-2 leading-tight">
                    {route.routeFrom} <span className="text-[#8A8073] font-normal">→</span> {route.routeTo}
                  </h4>

                  {/* Route info */}
                  <div className="flex items-center gap-4 text-[#8A8073]">
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold">
                      <Clock size={14} className="text-[#8A8073]" />
                      <span>~{route.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold">
                      <Navigation size={14} className="text-[#8A8073] rotate-45" />
                      <span>{route.distance}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-2.5">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-[20px] font-black text-[#7D5A2B] leading-none">
                      {route.price}
                    </span>
                    <span className="text-[11px] font-bold text-[#8A8073]">ETB</span>
                  </div>
                  {/* Circular Radio */}
                  <div
                    className={`w-[20px] h-[20px] rounded-full border flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? 'border-[#FFC107]'
                        : 'border-[#D1CDC3]'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-[10px] h-[10px] rounded-full bg-[#FFC107]" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* INCENTIVE BOX */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
          className="bg-[#EDF3FB] border border-[#D9E6F6] rounded-2xl p-4.5 flex items-start gap-3.5 mb-10"
        >
          <div className="w-9 h-9 rounded-full bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info size={18} className="text-[#3B82F6]" />
          </div>
          <div>
            <h5 className="text-[14px] font-extrabold text-[#1E3A8A] leading-tight">
              Digital Payment Incentive
            </h5>
            <p className="text-[12px] text-[#3B82F6]/90 mt-1 font-semibold leading-relaxed">
              Pay via TaxiPay wallet and get 2% cashback on every trip in Addis Ababa.
            </p>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM STICKY PANEL */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[428px] bg-white border-t border-[#F0ECE6] px-5 pt-4 pb-6 z-20 flex flex-col gap-4 shadow-[0_-4px_24px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold text-[#8A8073] uppercase tracking-wider block mb-0.5">
              Total Fare
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-[24px] font-black text-[#7D5A2B] leading-none">
                {selectedRoute ? selectedRoute.price : '--'}
              </span>
              <span className="text-[12px] font-bold text-[#8A8073]">ETB</span>
            </div>
          </div>

          {/* Passenger/Driver Avatar Stack + Yellow Indicator */}
          <div className="flex items-center">
            <div className="flex -space-x-2">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Avatar 1"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Avatar 2"
              />
            </div>
            <div className="h-8 w-8 rounded-full ring-2 ring-white bg-[#FFC107] text-[#1A2A3A] font-extrabold text-[11px] flex items-center justify-center -ml-2 z-10 shadow-sm">
              +12
            </div>
          </div>
        </div>

        {/* CTA BUTTON */}
        <button
          onClick={handleConfirmPay}
          disabled={!selectedRoute}
          className={`w-full h-14 rounded-2xl font-extrabold text-[16px] flex items-center justify-center gap-2 transition-all duration-200 ${
            selectedRoute
              ? 'bg-[#FFC107] text-[#1A2A3A] active:scale-[0.99] hover:bg-[#FFB300] cursor-pointer shadow-[0_4px_12px_rgba(255,193,7,0.2)]'
              : 'bg-[#F2EFEA] text-[#BFB8AE] cursor-not-allowed'
          }`}
        >
          Confirm & Pay
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
