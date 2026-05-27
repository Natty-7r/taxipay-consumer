'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Navigation,
  Info,
  ArrowRight,
} from 'lucide-react';

import { mockTaxi, mockRoutes } from '@/data/mock/routes.mock';

export default function SelectRoutePage() {
  const router = useRouter();

  const [selectedRouteId, setSelectedRouteId] =
    useState<string | null>(null);

  const selectedRoute = mockRoutes.find(
    (route) => route.id === selectedRouteId
  );

  const handleConfirmPay = () => {
    if (!selectedRoute) return;

    router.push(`/review?routeId=${selectedRouteId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-36 text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/90 px-5 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 hover:bg-surface-muted active:bg-border-hover"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-[19px] font-extrabold uppercase tracking-tight text-accent-text">
              Select Route
            </h1>

            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[1.5px] text-foreground-muted">
              Route Options
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-secondary px-3 py-1.5 text-[13px] font-bold tracking-wider text-secondary-foreground shadow-sm">
          {mockTaxi.plateNumber}
        </div>
      </header>

      <div className="px-5 pt-5">
        {/* ACTIVE TAXI CARD */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex items-center justify-between rounded-2xl border border-border-strong bg-surface p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-muted">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-accent-text"
                strokeWidth="2"
              >
                <rect x="3" y="10" width="18" height="9" rx="2" />
                <path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
                <circle cx="7" cy="19" r="2.5" fill="currentColor" />
                <circle cx="17" cy="19" r="2.5" fill="currentColor" />
              </svg>
            </div>

            <div>
              <h2 className="text-[17px] font-extrabold">
                {mockTaxi.model}
              </h2>

              <p className="mt-0.5 text-[13px] font-medium text-foreground-muted">
                Plate:{' '}
                <span className="font-bold">
                  {mockTaxi.plateNumber}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-success-foreground">
            <CheckCircle2 size={13} strokeWidth={2.5} />
            Active
          </div>
        </motion.div>

        {/* SECTION TITLE */}
        <h3 className="mb-3.5 text-[11px] font-extrabold uppercase tracking-[2px] text-foreground-muted">
          Available Routes
        </h3>

        {/* ROUTES */}
        <div className="mb-6 flex flex-col gap-3.5">
          {mockRoutes.map((route, idx) => {
            const isSelected = selectedRouteId === route.id;

            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.08,
                }}
                onClick={() => setSelectedRouteId(route.id)}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border bg-surface p-[18px] transition-all duration-200 ${
                  isSelected
                    ? 'border-primary ring-1 ring-ring'
                    : 'border-border-strong hover:border-border-hover'
                }`}
              >
                <div className="flex-1">
                  <h4 className="mb-2 flex items-center gap-2 text-[16px] font-extrabold">
                    {route.routeFrom}

                    <span className="font-normal text-foreground-muted">
                      →
                    </span>

                    {route.routeTo}
                  </h4>

                  <div className="flex items-center gap-4 text-foreground-muted">
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold">
                      <Clock size={14} />
                      <span>~{route.estimatedTime}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[12px] font-semibold">
                      <Navigation size={14} className="rotate-45" />
                      <span>{route.distance}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2.5">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-[20px] font-black text-accent-text">
                      {route.price}
                    </span>

                    <span className="text-[11px] font-bold text-foreground-muted">
                      ETB
                    </span>
                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      isSelected
                        ? 'border-primary'
                        : 'border-border-hover'
                    }`}
                  >
                    {isSelected && (
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* INFO BOX */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.3,
          }}
          className="mb-10 flex items-start gap-3.5 rounded-2xl border border-info-border bg-info-soft p-[18px]"
        >
          <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-info/10">
            <Info size={18} className="text-info" />
          </div>

          <div>
            <h5 className="text-[14px] font-extrabold text-info-foreground">
              Digital Payment Incentive
            </h5>

            <p className="mt-1 text-[12px] font-semibold leading-relaxed text-info">
              Pay via TaxiPay wallet and get 2% cashback on every trip.
            </p>
          </div>
        </motion.div>
      </div>

      {/* FOOTER */}
      <div className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-[428px] -translate-x-1/2 flex-col gap-4 border-t border-border bg-surface px-5 pb-6 pt-4 shadow-[0_-4px_24px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between">
          <div>
            <span className="mb-0.5 block text-[11px] font-extrabold uppercase tracking-wider text-foreground-muted">
              Total Fare
            </span>

            <div className="flex items-baseline gap-1">
              <span className="text-[24px] font-black text-accent-text">
                {selectedRoute ? selectedRoute.price : '--'}
              </span>

              <span className="text-[12px] font-bold text-foreground-muted">
                ETB
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="-space-x-2 flex">
              <img
                className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                alt=""
              />

              <img
                className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                alt=""
              />
            </div>

            <div className="-ml-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-extrabold text-primary-foreground ring-2 ring-white">
              +12
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirmPay}
          disabled={!selectedRoute}
          className={`flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-[16px] font-extrabold transition-all duration-200 ${
            selectedRoute
              ? 'bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(255,193,7,0.2)] hover:bg-primary-hover active:scale-[0.99]'
              : 'cursor-not-allowed bg-muted text-foreground-soft'
          }`}
        >
          Confirm & Pay

          <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}