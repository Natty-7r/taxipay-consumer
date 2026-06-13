'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import {
  ArrowLeft,
  X,
  Calendar,
  Route,
  Star,
  Send,
  Home,
  Clock,
  Scan,
  CreditCard,
  User,
} from 'lucide-react';

import { mockTaxi, mockRoutes } from '@/data/mock/routes.mock';

const TAG_OPTIONS = [
  'Fast trip',
  'Clean car',
  'Friendly driver',
  'Smooth ride',
  'On time',
];

function FeedbackPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const routeId = searchParams.get('routeId') || 'r1';

  const route =
    mockRoutes.find((r) => r.id === routeId) || mockRoutes[0];

  const [rating, setRating] = useState<number>(0);

  const [selectedTags, setSelectedTags] = useState<string[]>(
    []
  );

  const [comment, setComment] = useState('');

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((t) => t !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    alert('Thank you for your feedback!');

    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background pb-32 text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/90 px-5 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 hover:bg-surface-muted active:bg-border-hover"
          >
            <ArrowLeft size={20} />
          </Link>

          <h1 className="text-[17px] font-extrabold uppercase tracking-tight text-accent-text">
            Rate Your Ride
          </h1>
        </div>

        <Link
          href="/"
          className="touch-sm flex h-9 w-9 items-center justify-center rounded-full border border-border-strong bg-surface shadow-sm transition-colors duration-150 hover:bg-muted"
        >
          <X
            size={16}
            className="text-foreground-muted"
          />
        </Link>
      </header>

      <div className="stagger-children flex flex-col gap-5 px-5 pt-4">
        {/* SUBTITLE */}
        <span className="pl-0.5 text-[14px] font-bold text-foreground-muted">
          Trip to {route.routeTo}
        </span>

        {/* OVERVIEW CARD */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-4 rounded-2xl border border-border-strong bg-surface p-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="rounded bg-primary/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[1px] text-accent-text">
                Plate Number
              </span>

              <h2 className="mt-1.5 text-[18px] font-black leading-none">
                {mockTaxi.plateNumber}
              </h2>
            </div>

            <div className="text-right">
              <span className="rounded bg-muted px-2 py-0.5 text-[9px] font-bold uppercase tracking-[1px] text-accent-text">
                Fare
              </span>

              <h2 className="mt-1.5 text-[18px] font-black leading-none text-accent-text">
                {route.price} ETB
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
            {/* ROUTE */}
            <div className="flex items-start gap-2">
              <Route
                size={16}
                className="mt-0.5 flex-shrink-0 text-accent-text"
              />

              <div>
                <span className="block text-[9px] font-bold uppercase tracking-[0.5px] leading-none text-foreground-muted">
                  Route
                </span>

                <span className="mt-1.5 block text-[12px] font-bold leading-tight">
                  {route.routeFrom} → {route.routeTo}
                </span>
              </div>
            </div>

            {/* DATE */}
            <div className="flex items-start gap-2">
              <Calendar
                size={16}
                className="mt-0.5 flex-shrink-0 text-accent-text"
              />

              <div>
                <span className="block text-[9px] font-bold uppercase tracking-[0.5px] leading-none text-foreground-muted">
                  Date & Time
                </span>

                <span className="mt-1.5 block text-[12px] font-bold leading-tight">
                  Dec 1, 2:30 PM
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RATING */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.08,
          }}
          className="flex flex-col items-center gap-3.5 py-2"
        >
          <h3 className="text-[20px] font-black">
            How was your ride?
          </h3>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = rating >= star;

              return (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="flex h-12 w-12 items-center justify-center transition-transform duration-100 hover:scale-105 active:scale-95"
                >
                  <Star
                    size={36}
                    strokeWidth={1.5}
                    className={`transition-colors duration-150 ${
                      active
                        ? 'fill-primary text-primary'
                        : 'text-border-hover'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* TAGS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.16,
          }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-foreground-muted">
            What did you like most?
          </span>

          <div className="flex flex-wrap justify-center gap-2 px-2">
            {TAG_OPTIONS.map((tag) => {
              const isSelected =
                selectedTags.includes(tag);

              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`touch-sm rounded-full border px-4 py-2.5 text-[13px] font-bold transition-all duration-150 ${
                    isSelected
                      ? 'border-primary bg-primary/15 font-extrabold text-accent-text'
                      : 'border-border-strong bg-transparent text-foreground-muted hover:bg-surface'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* TEXTAREA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.24,
          }}
          className="flex flex-col gap-2.5"
        >
          <div className="flex items-baseline justify-between px-0.5">
            <span className="text-[12px] font-bold text-foreground-muted">
              Share your experience (optional)
            </span>

            <span className="text-[10px] font-bold text-muted-foreground">
              {comment.length}/500
            </span>
          </div>

          <textarea
            maxLength={500}
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Write your feedback here..."
            className="h-32 w-full resize-none rounded-2xl border border-border bg-muted p-4 text-[14px] font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </motion.div>

        {/* ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          className="mt-3 flex flex-col items-center gap-4"
        >
          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-success text-[16px] font-extrabold text-white shadow-[0_4px_12px_rgba(16,185,129,0.2)] transition-all duration-200 hover:brightness-110 active:scale-[0.99]"
          >
            Submit Feedback

            <Send size={16} strokeWidth={2.5} />
          </button>

          {/* SKIP */}
          <Link
            href="/"
            className="py-1 text-[14px] font-extrabold text-accent-text transition-colors duration-150 hover:opacity-80"
          >
            Skip for now
          </Link>
        </motion.div>
      </div>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-[428px] -translate-x-1/2 items-center justify-around border-t border-border bg-surface px-2 pb-6 pt-2.5 shadow-[0_-4px_24px_rgba(0,0,0,0.03)]">
        {/* HOME */}
        <Link
          href="/"
          className="flex min-w-[48px] flex-col items-center gap-1 py-1 text-muted-foreground"
        >
          <Home size={20} strokeWidth={1.8} />

          <span className="text-[9px] font-semibold">
            Home
          </span>
        </Link>

        {/* HISTORY ACTIVE */}
        <div className="flex min-w-[48px] flex-col items-center gap-1 py-1 text-foreground">
          <div className="flex flex-col items-center gap-0.5 rounded-full bg-primary/10 px-3.5 py-1.5">
            <Clock
              size={18}
              strokeWidth={2.5}
              className="text-accent-text"
            />

            <span className="text-[8px] font-black uppercase tracking-wide text-accent-text">
              History
            </span>
          </div>
        </div>

        {/* SCAN */}
        <Link
          href="/routes"
          className="flex min-w-[48px] flex-col items-center gap-1 py-1 text-muted-foreground"
        >
          <Scan size={20} strokeWidth={1.8} />

          <span className="text-[9px] font-semibold">
            Scan
          </span>
        </Link>

        {/* WALLET */}
        <Link
          href="/"
          className="flex min-w-[48px] flex-col items-center gap-1 py-1 text-muted-foreground"
        >
          <CreditCard size={20} strokeWidth={1.8} />

          <span className="text-[9px] font-semibold">
            Wallet
          </span>
        </Link>

        {/* PROFILE */}
        <Link
          href="/"
          className="flex min-w-[48px] flex-col items-center gap-1 py-1 text-muted-foreground"
        >
          <User size={20} strokeWidth={1.8} />

          <span className="text-[9px] font-semibold">
            Profile
          </span>
        </Link>
      </nav>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-accent-text" />
        </div>
      }
    >
      <FeedbackPageContent />
    </Suspense>
  );
}