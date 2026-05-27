'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

import {
  ArrowLeft,
  Copy,
  FileText,
  Code,
  Share2,
  Home,
  Clock,
  CreditCard,
} from 'lucide-react';

import { mockTaxi, mockRoutes } from '@/data/mock/routes.mock';

function ReceiptPageContent() {
  const searchParams = useSearchParams();

  const routeId = searchParams.get('routeId') || 'r1';

  const route =
    mockRoutes.find((r) => r.id === routeId) || mockRoutes[0];

  const pickupLocation =
    route.id === 'r1'
      ? 'Bole, Airport Rd'
      : `${route.routeFrom}, Airport Rd`;

  const destinationLocation =
    route.id === 'r1'
      ? 'Megenagna Square'
      : `${route.routeTo} Square`;

  const serviceFee = 5.0;
  const baseFare = route.price - serviceFee;

  const handleCopyTransactionId = async () => {
    await navigator.clipboard.writeText('TXN-98324-AX77');

    alert('Transaction ID copied!');
  };

  return (
    <div className="min-h-screen bg-background pb-32 text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-20 flex items-center border-b border-border bg-background/90 px-5 py-4 backdrop-blur-md">
        <Link
          href="/"
          className="-ml-2 mr-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 hover:bg-surface-muted active:bg-border-hover"
        >
          <ArrowLeft size={20} />
        </Link>

        <h1 className="flex-1 pr-8 text-center text-[17px] font-extrabold">
          Transaction Details
        </h1>
      </header>

      <div className="flex flex-col gap-4 px-5 pt-4">
        {/* SUCCESS ALERT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3.5 rounded-2xl border border-success/20 bg-success/10 p-4"
        >
          <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full bg-success shadow-[0_2px_8px_rgba(16,185,129,0.2)]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div>
            <h2 className="text-[16px] font-extrabold leading-tight text-success-foreground">
              Payment Successful
            </h2>

            <p className="mt-0.5 text-[12px] font-semibold leading-tight text-success">
              Processed via TeleBirr Wallet
            </p>
          </div>
        </motion.div>

        {/* TRANSACTION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.08,
          }}
          className="flex flex-col gap-3"
        >
          <span className="pl-1 text-[11px] font-extrabold uppercase tracking-wider text-foreground-muted">
            Transaction Identity
          </span>

          <div className="flex flex-col gap-3.5 rounded-2xl border border-border-strong bg-surface p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <div className="flex items-start justify-between">
              <div>
                <span className="mb-1 block text-[11px] font-semibold text-foreground-muted">
                  Transaction ID
                </span>

                <span className="text-[15px] font-extrabold text-accent-text">
                  TXN-98324-AX77
                </span>
              </div>

              <button
                onClick={handleCopyTransactionId}
                className="flex h-8 w-8 items-center justify-center rounded-full text-accent-text transition-colors duration-150 hover:bg-surface-muted active:bg-border"
              >
                <Copy size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-border pt-3.5">
              <div>
                <span className="mb-1 block text-[11px] font-semibold text-foreground-muted">
                  Reference ID
                </span>

                <span className="text-[13px] font-bold">
                  REF_002194
                </span>
              </div>

              <div>
                <span className="mb-1 block text-[11px] font-semibold text-foreground-muted">
                  Payment Method
                </span>

                <div className="flex items-center gap-1.5 text-[13px] font-bold">
                  <CreditCard
                    size={14}
                    className="text-accent-text"
                  />

                  <span>TeleBirr</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-3.5">
              <span className="mb-1 block text-[11px] font-semibold text-foreground-muted">
                Date & Time
              </span>

              <span className="text-[13px] font-bold">
                Oct 24, 2023 • 09:42 AM
              </span>
            </div>
          </div>
        </motion.div>

        {/* TRIP DETAILS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.16,
          }}
          className="flex flex-col gap-3"
        >
          <span className="pl-1 text-[11px] font-extrabold uppercase tracking-wider text-foreground-muted">
            Trip Details
          </span>

          <div className="flex flex-col gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            {/* TIMELINE */}
            <div className="flex gap-3 pl-0.5">
              <div className="flex flex-shrink-0 flex-col items-center pt-1.5">
                <div className="h-[8px] w-[8px] rounded-full border-2 border-accent-text bg-surface" />

                <div className="my-1 h-8 w-[1.5px] bg-primary/20" />

                <div className="h-[8px] w-[8px] rounded-full bg-accent-text" />
              </div>

              <div className="flex flex-col gap-3.5 py-0.5">
                <div>
                  <span className="block text-[11px] font-semibold leading-none text-foreground-muted">
                    From
                  </span>

                  <span className="mt-1 block text-[14px] font-extrabold leading-tight">
                    {pickupLocation}
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] font-semibold leading-none text-foreground-muted">
                    To
                  </span>

                  <span className="mt-1 block text-[14px] font-extrabold leading-tight">
                    {destinationLocation}
                  </span>
                </div>
              </div>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-3 divide-x divide-primary/15 rounded-xl border border-primary/10 bg-surface p-3 text-center">
              <div>
                <span className="mb-1 block text-[10px] font-semibold text-foreground-muted">
                  Plate
                </span>

                <span className="text-[12px] font-extrabold">
                  {mockTaxi.plateNumber}
                </span>
              </div>

              <div>
                <span className="mb-1 block text-[10px] font-semibold text-foreground-muted">
                  Model
                </span>

                <span className="block truncate px-1 text-[12px] font-extrabold">
                  Toyota Hi...
                </span>
              </div>

              <div>
                <span className="mb-1 block text-[10px] font-semibold text-foreground-muted">
                  Merchant
                </span>

                <span className="text-[12px] font-extrabold">
                  Z-Transport
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* COST SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.24,
          }}
          className="flex flex-col gap-3 rounded-2xl border border-border-strong bg-muted p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
        >
          <div className="flex justify-between text-[13px] font-semibold text-foreground-muted">
            <span>Base Fare</span>

            <span className="font-bold text-foreground">
              {baseFare.toFixed(2)} ETB
            </span>
          </div>

          <div className="flex justify-between text-[13px] font-semibold text-foreground-muted">
            <span>Service Fee</span>

            <span className="font-bold text-foreground">
              {serviceFee.toFixed(2)} ETB
            </span>
          </div>

          <div className="my-0.5 border-t border-dashed border-border-hover" />

          <div className="flex items-center justify-between">
            <div>
              <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-wider text-foreground-muted">
                Total Amount
              </span>

              <span className="text-[20px] font-black text-accent-text">
                {route.price.toFixed(2)} ETB
              </span>
            </div>

            <div className="rounded-lg bg-accent-text px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              Paid
            </div>
          </div>
        </motion.div>

        {/* ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          className="mt-2 flex flex-col gap-3"
        >
          <div className="grid grid-cols-2 gap-3">
            {/* PDF */}
            <button
              onClick={() =>
                alert('Receipt PDF download started...')
              }
              className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary text-[13px] font-extrabold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary-hover active:scale-[0.98]"
            >
              <FileText size={16} strokeWidth={2.5} />
              Download PDF
            </button>

            {/* JSON */}
            <button
              onClick={() =>
                alert('JSON exported successfully!')
              }
              className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-secondary text-[13px] font-extrabold text-secondary-foreground shadow-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              <Code size={16} strokeWidth={2.5} />
              Export JSON
            </button>
          </div>

          {/* SHARE */}
          <button
            onClick={() => alert('Share sheet opened...')}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border-strong bg-transparent text-[13px] font-extrabold transition-all duration-200 hover:bg-muted active:scale-[0.98]"
          >
            <Share2 size={16} strokeWidth={2.5} />
            Share Receipt
          </button>

          {/* RATE YOUR RIDE */}
          <Link
            href={`/feedback?routeId=${routeId}`}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-success text-white text-[13px] font-extrabold shadow-sm transition-all duration-200 hover:brightness-95 active:scale-[0.98]"
          >
            Rate Your Ride ⭐
          </Link>
        </motion.div>
      </div>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-[428px] -translate-x-1/2 items-center justify-around border-t border-border bg-surface px-2 pb-6 pt-2.5 shadow-[0_-4px_24px_rgba(0,0,0,0.03)]">
        <Link
          href="/"
          className="flex min-w-[56px] flex-col items-center gap-1 py-1 text-muted-foreground"
        >
          <Home size={22} strokeWidth={1.8} />

          <span className="text-[10px] font-semibold">
            Home
          </span>
        </Link>

        {/* ACTIVE TAB */}
        <div className="flex min-w-[56px] flex-col items-center gap-1 py-1 text-foreground">
          <div className="flex flex-col items-center gap-0.5 rounded-full bg-primary/10 px-4 py-1.5">
            <Clock
              size={20}
              strokeWidth={2.5}
              className="text-accent-text"
            />

            <span className="text-[9px] font-black uppercase tracking-wide text-accent-text">
              History
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="flex min-w-[56px] flex-col items-center gap-1 py-1 text-muted-foreground"
        >
          <CreditCard size={22} strokeWidth={1.8} />

          <span className="text-[10px] font-semibold">
            Wallet
          </span>
        </Link>
      </nav>
    </div>
  );
}

export default function ReceiptPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-accent-text" />
        </div>
      }
    >
      <ReceiptPageContent />
    </Suspense>
  );
}