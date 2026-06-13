'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Car, Compass, Map, SlidersHorizontal, Truck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Transaction {
  id: string;
  from: string;
  to: string;
  plateNumber: string;
  time: string;
  dateLabel: string; // 'TODAY', 'YESTERDAY', 'THIS WEEK'
  amount: number;
  status: 'SUCCESS' | 'FAILED';
  provider: 'TeleBirr' | 'M-Pesa' | 'CBE';
  iconType: 'car' | 'truck' | 'map' | 'compass';
}

const mockTransactions: Transaction[] = [
  {
    id: 't1',
    from: 'Bole',
    to: 'Megenagna',
    plateNumber: 'AA-12345',
    time: '09:45 AM',
    dateLabel: 'TODAY',
    amount: 120,
    status: 'SUCCESS',
    provider: 'TeleBirr',
    iconType: 'car'
  },
  {
    id: 't2',
    from: 'Piazza',
    to: 'Mexico',
    plateNumber: 'AA-87212',
    time: '08:20 AM',
    dateLabel: 'TODAY',
    amount: 85,
    status: 'FAILED',
    provider: 'TeleBirr',
    iconType: 'truck'
  },
  {
    id: 't3',
    from: 'Airport',
    to: 'Kazanchis',
    plateNumber: 'AA-99100',
    time: '10:15 PM',
    dateLabel: 'YESTERDAY',
    amount: 250,
    status: 'SUCCESS',
    provider: 'M-Pesa',
    iconType: 'map'
  },
  {
    id: 't4',
    from: 'CMC',
    to: 'Tor Hailoch',
    plateNumber: 'AA-00234',
    time: 'Oct 24, 04:30 PM',
    dateLabel: 'THIS WEEK',
    amount: 320,
    status: 'SUCCESS',
    provider: 'CBE',
    iconType: 'compass'
  }
];

const PROVIDERS = ['All', 'TeleBirr', 'M-Pesa', 'CBE'];

export default function HistoryPage() {
  const router = useRouter();
  const [selectedProvider, setSelectedProvider] = useState<string>('All');
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  // Filter transactions based on active pill selection
  const filteredTransactions = mockTransactions.filter((tx) => {
    if (selectedProvider === 'All') return true;
    return tx.provider.toLowerCase() === selectedProvider.toLowerCase();
  });

  // Group by dateLabel for rendering sections
  const groupedTransactions = filteredTransactions.reduce<Record<string, Transaction[]>>((acc, tx) => {
    if (!acc[tx.dateLabel]) {
      acc[tx.dateLabel] = [];
    }
    acc[tx.dateLabel].push(tx);
    return acc;
  }, {});

  // Maintain sequence order of sections
  const sectionKeys = ['TODAY', 'YESTERDAY', 'THIS WEEK'].filter(
    (key) => groupedTransactions[key] && groupedTransactions[key].length > 0
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'car':
        return <Car className="text-[#855C1B]" size={20} />;
      case 'truck':
        return <Truck className="text-[#855C1B]" size={20} />;
      case 'map':
        return <Map className="text-[#855C1B]" size={20} />;
      case 'compass':
        return <Compass className="text-[#855C1B]" size={20} />;
      default:
        return <Car className="text-[#855C1B]" size={20} />;
    }
  };

  return (
    <div className="min-h-screen pb-32 bg-[#FCFAF7] text-[#1A2A3A]">
      {/* HEADER */}
      <header className="sticky top-0 bg-[#FCFAF7]/90 backdrop-blur-md z-20 px-5 py-4 border-b border-[#F0ECE6] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#EAE6DF] active:bg-[#DFD9CE] transition-colors duration-150 touch-sm -ml-2"
          >
            <ArrowLeft size={20} className="text-[#1A2A3A]" />
          </Link>
          <h1 className="text-[17px] font-extrabold text-[#1A2A3A]">
            Transaction History
          </h1>
        </div>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="w-10 h-10 rounded-full bg-white border border-[#EDEAE4] flex items-center justify-center hover:bg-[#FAF8F5] transition-colors duration-150 shadow-sm touch-sm"
        >
          <SlidersHorizontal size={17} className="text-[#1A2A3A]" />
        </button>
      </header>

      {/* FILTER PILLS */}
      <div className="px-5 pt-4">
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {PROVIDERS.map((provider) => {
            const isSelected = selectedProvider === provider;
            return (
              <button
                key={provider}
                onClick={() => setSelectedProvider(provider)}
                className={`px-5 py-3 rounded-full text-[13px] font-bold border transition-all duration-150 flex-shrink-0 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.01)] ${isSelected
                  ? 'bg-[#FFC107] border-[#FFC107] text-[#1A2A3A] font-extrabold'
                  : 'bg-[#FAF3E8] border-[#EDE6D8] text-[#8A8073] hover:bg-[#FAF8F5]'
                  }`}
              >
                {provider}
              </button>
            );
          })}
        </div>
      </div>

      {/* TRANSACTION SECTIONS */}
      <div className="px-5 pt-5 flex flex-col gap-6">
        <AnimatePresence mode="popLayout">
          {sectionKeys.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-12 flex flex-col items-center gap-2"
            >
              <span className="text-[14px] font-bold text-[#8A8073]">No transactions found</span>
              <span className="text-[11px] text-[#BFB8AE] font-semibold">Try changing your provider filters.</span>
            </motion.div>
          ) : (
            sectionKeys.map((sectionKey) => (
              <motion.div
                key={sectionKey}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col gap-3"
              >
                {/* DATE SEGMENT TITLE */}
                <h3 className="text-[11px] font-extrabold text-[#8A8073] uppercase tracking-wider pl-1">
                  {sectionKey}
                </h3>

                {/* ITEMS */}
                <div className="flex flex-col gap-3">
                  {groupedTransactions[sectionKey].map((tx) => (
                    <motion.div
                      key={tx.id}
                      layout
                      whileTap={{ scale: 0.99 }}
                      onClick={() => router.push(`/receipt?routeId=r1`)}
                      className="bg-white rounded-2xl border border-[#EDEAE4] p-4 flex items-center justify-between cursor-pointer hover:border-[#D1CDC3] transition-all duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Rounded square icon placeholder */}
                        <div className="w-[46px] h-[46px] rounded-xl bg-[#FCF6EC] border border-[#F2E8D7] flex items-center justify-center flex-shrink-0">
                          {getIcon(tx.iconType)}
                        </div>

                        <div>
                          <h4 className="text-[14px] font-extrabold text-[#1A2A3A] leading-tight">
                            {tx.from} → {tx.to}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-[#8A8073]">
                            {/* Small car glyph */}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <rect x="3" y="10" width="18" height="9" rx="2" />
                              <path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
                            </svg>
                            <span>{tx.plateNumber}</span>
                            <span>•</span>
                            <span>{tx.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex flex-col items-end gap-1.5">
                        <span className="text-[14px] font-black text-[#1A2A3A] leading-none">
                          {tx.amount} ETB
                        </span>

                        {/* SUCCESS / FAILED Pill badge */}
                        <span
                          className={`text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded ${tx.status === 'SUCCESS'
                            ? 'bg-[#EBFBF5] text-[#10B981]'
                            : 'bg-[#FDF2F2] text-[#EF4444]'
                            }`}
                        >
                          {tx.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {/* LOAD MORE BUTTON */}
        {sectionKeys.length > 0 && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => alert('Loading more activities...')}
            className="w-full py-4 rounded-xl border border-[#EDEAE4] hover:bg-[#F9F7F4] text-[#8A8073] font-bold text-[13px] text-center bg-transparent cursor-pointer transition-colors duration-150 mt-1"
          >
            Load More Activities
          </motion.button>
        )}
      </div>

    </div>
  );
}
