'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Car, Lock } from 'lucide-react';

import { mockTaxi, mockRoutes } from '@/data/mock/routes.mock';

function ReviewTripContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const routeId = searchParams.get('routeId') || 'r1';

  const route =
    mockRoutes.find((r) => r.id === routeId) || mockRoutes[0];

  const distanceFee = route.id === 'r3' ? 25 : 20;
  const baseFare = route.price - distanceFee;

  const handleConfirmPayment = () => {
    router.push(`/receipt?routeId=${routeId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-12 text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-20 flex items-center border-b border-border bg-background/90 px-5 py-4 backdrop-blur-md">
        <Link
          href="/routes"
          className="-ml-2 mr-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 hover:bg-surface-muted active:bg-border-hover"
        >
          <ArrowLeft size={20} />
        </Link>

        <h1 className="flex-1 pr-8 text-center text-[17px] font-extrabold">
          Review Trip
        </h1>
      </header>

      <div className="px-5 pt-4">
        {/* MAP */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative mb-5 h-44 overflow-hidden rounded-3xl border border-border-strong bg-surface-muted"
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 350 176"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Streets */}
            <path
              d="M-20 40 H400 M-20 90 H400 M-20 140 H400"
              stroke="currentColor"
              className="text-border-hover"
              strokeWidth="2"
            />

            <path
              d="M50 -20 V200 M150 -20 V200 M270 -20 V200"
              stroke="currentColor"
              className="text-border-hover"
              strokeWidth="2"
            />

            <path
              d="M-20 10 L400 160"
              stroke="currentColor"
              className="text-border-hover"
              strokeWidth="1.5"
            />

            <path
              d="M350 -20 L-20 150"
              stroke="currentColor"
              className="text-border-hover"
              strokeWidth="1.5"
            />

            {/* Route */}
            <path
              d="M 90 90 Q 180 110 270 40"
              stroke="currentColor"
              className="text-primary opacity-90"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Start */}
            <circle
              cx="90"
              cy="90"
              r="7"
              fill="currentColor"
              className="text-accent-text"
              stroke="white"
              strokeWidth="2"
            />

            <circle
              cx="90"
              cy="90"
              r="3"
              fill="white"
            />

            {/* End */}
            <rect
              x="264"
              y="34"
              width="12"
              height="12"
              rx="2"
              fill="currentColor"
              className="text-secondary"
              stroke="white"
              strokeWidth="2"
            />

            {/* Label */}
            <g transform="translate(15, 135)">
              <rect
                width="90"
                height="28"
                rx="8"
                fill="white"
                fillOpacity="0.9"
              />

              <text
                x="8"
                y="18"
                fill="currentColor"
                className="text-foreground"
                fontSize="9"
                fontWeight="bold"
                fontFamily="system-ui"
              >
                Addis Ababa
              </text>
            </g>
          </svg>
        </motion.div>

        {/* TRIP CARD */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.08,
          }}
          className="mb-5 rounded-3xl border border-border-strong bg-surface p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-wider text-foreground-muted">
                Estimated Fare
              </span>

              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-black leading-none text-accent-text">
                  {route.price}
                </span>

                <span className="text-[15px] font-bold text-accent-text">
                  ETB
                </span>
              </div>
            </div>

            {/* CAR ICON */}
            <div className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
              <Car
                size={22}
                className="text-accent-text"
                strokeWidth={2}
              />
            </div>
          </div>

          {/* TIMELINE */}
          <div className="mb-5 flex gap-3.5 pl-1">
            <div className="flex flex-shrink-0 flex-col items-center pt-1.5">
              <div className="h-[9px] w-[9px] rounded-full border-2 border-accent-text bg-surface" />

              <div className="my-1 h-9 w-[1.5px] bg-border-strong" />

              <div className="h-[9px] w-[9px] rounded-sm bg-accent-text" />
            </div>

            <div className="flex flex-1 flex-col justify-between py-0.5">
              <div>
                <span className="block text-[11px] font-semibold text-foreground-muted">
                  Pickup
                </span>

                <span className="mt-0.5 block text-[14px] font-bold">
                  {route.routeFrom}
                </span>
              </div>

              <div className="mt-4">
                <span className="block text-[11px] font-semibold text-foreground-muted">
                  Destination
                </span>

                <span className="mt-0.5 block text-[14px] font-bold">
                  {route.routeTo}
                </span>
              </div>
            </div>
          </div>

          {/* TAXI INFO */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="3"
                  y="10"
                  width="18"
                  height="9"
                  rx="2"
                />

                <path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
              </svg>

              <span className="text-[13px] font-bold">
                {mockTaxi.model} ({mockTaxi.plateNumber})
              </span>
            </div>

            <span className="text-[13px] font-bold text-foreground-muted">
              ~{route.estimatedTime} • {route.distance}
            </span>
          </div>
        </motion.div>

        {/* PAYMENT */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.16,
          }}
          className="mb-6"
        >
          <h3 className="mb-2.5 text-[12px] font-bold uppercase tracking-wider text-foreground-muted">
            Payment Method
          </h3>

          <div className="flex items-center justify-between rounded-2xl border border-primary/15 bg-primary/5 p-4 shadow-[0_2px_6px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-3">
              {/* TELEBIRR */}
              <div className="flex h-[34px] w-[42px] flex-shrink-0 flex-col items-center justify-center rounded-lg bg-info-foreground text-[8px] font-black leading-tight tracking-tighter text-white">
                <span>Tele</span>

                <span className="-mt-0.5 text-primary">
                  Birr
                </span>
              </div>

              <div>
                <p className="text-[14px] font-bold">
                  +251 9XX XXX123
                </p>

                <p className="mt-0.5 text-[11px] font-semibold text-foreground-muted">
                  Personal Account
                </p>
              </div>
            </div>

            <button className="px-2 py-1 text-[13px] font-bold text-accent-text transition-colors duration-150 hover:text-secondary">
              Change
            </button>
          </div>
        </motion.div>

        {/* FARE BREAKDOWN */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.24,
          }}
          className="mb-8"
        >
          <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-foreground-muted">
            Fare Breakdown
          </h3>

          <div className="flex flex-col gap-2.5 px-1">
            <div className="flex justify-between text-[14px] font-semibold text-foreground-muted">
              <span>Base Fare</span>

              <span className="font-bold text-foreground">
                {baseFare} ETB
              </span>
            </div>

            <div className="flex justify-between text-[14px] font-semibold text-foreground-muted">
              <span>
                Distance Fee ({route.distance})
              </span>

              <span className="font-bold text-foreground">
                {distanceFee} ETB
              </span>
            </div>

            <div className="my-1 border-t border-border-strong" />

            <div className="flex justify-between text-[15px] font-extrabold">
              <span>Total</span>

              <span className="text-[16px] font-black text-accent-text">
                {route.price} ETB
              </span>
            </div>
          </div>
        </motion.div>

        {/* ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.32,
          }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={handleConfirmPayment}
            className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-success text-white shadow-[0_4px_12px_rgba(16,185,129,0.2)] transition-all duration-200 hover:brightness-95 active:scale-[0.99]"
          >
            Confirm & Pay

            <Lock size={16} strokeWidth={2.5} />
          </button>

          <div className="flex items-center gap-2.5 text-[14px] font-bold text-foreground-muted">
            <Link
              href="/routes"
              className="transition-colors duration-150 hover:text-foreground"
            >
              Edit Trip
            </Link>

            <span>•</span>

            <Link
              href="/"
              className="text-error transition-colors duration-150 hover:brightness-90"
            >
              Cancel
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ReviewTripPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-accent-text" />
        </div>
      }
    >
      <ReviewTripContent />
    </Suspense>
  );
}