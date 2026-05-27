'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface ScanHeaderProps {
  accountNumber: string;
  accountLogo: any;
  onBack: () => void;
}

export function ScannerHeader({ accountNumber, accountLogo, onBack }: ScanHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 pt-10 px-5">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full glass flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Active account pill */}
        <div className="glass rounded-full px-3 py-2 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
            <Image
              src={accountLogo}
              alt="Account"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-xs font-semibold text-foreground">
            {accountNumber}
          </span>
        </div>

        <div className="w-11" />
      </div>
    </div>
  );
}