'use client';

import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import telebirrIcon from '@/assets/images/png/telebirr.png';
import mpesaIcon from '@/assets/images/png/mpesa.png';
import cbeIcon from '@/assets/images/png/cbe.png';

interface PaymentHubCardProps {
  provider: string;
  isPrimary?: boolean;
  linkedDate?: string;
  onSettings?: () => void;
  onRemove?: () => void;
  onSetPrimary?: () => void;
}

const PROVIDER_CONFIG: Record<string, { src: any; alt: string; displayName: string }> = {
  TELEBIRR: { src: telebirrIcon, alt: 'TeleBirr', displayName: 'TeleBirr' },
  MPESA: { src: mpesaIcon, alt: 'M-Pesa', displayName: 'M-Pesa' },
  CBE: { src: cbeIcon, alt: 'CBE', displayName: 'CBE' },
};

export function PaymentHubCard({
  provider,
  isPrimary,
  linkedDate,
  onSettings,
  onRemove,
  onSetPrimary,
}: PaymentHubCardProps) {
  const config = PROVIDER_CONFIG[provider];
  const displayName = config?.displayName ?? provider;

  if (isPrimary) {
    return (
      <div className="rounded-2xl border border-primary bg-surface p-4 mb-3">
        {/* Top row: icon, name, primary badge, and three-dots menu */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center flex-shrink-0 bg-surface overflow-hidden relative">
              {config ? (
                <Image
                  src={config.src}
                  alt={config.alt}
                  className="object-cover absolute top-0 left-0 w-full h-full rounded-xl"
                />
              ) : (
                <span className="text-xs font-bold text-foreground">
                  {provider[0]}
                </span>
              )}
            </div>
            <div>
              <span className="text-[14px] font-bold text-foreground block">
                {displayName}
              </span>
              <span className="inline-block text-[9px] font-bold tracking-[0.8px] uppercase px-2 py-0.5 rounded-full bg-primary text-primary-foreground mt-1">
                Primary
              </span>
            </div>
          </div>
          <button
            aria-label={`More options for ${displayName}`}
            className="w-8 h-8 min-h-0 min-w-0 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-foreground-muted" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50">
          <button
            onClick={onSettings}
            className="flex-1 text-center py-2 min-h-0 rounded-xl text-[12px] font-semibold text-foreground bg-[#FAF3E8] hover:bg-[#FAF3E8]/80 transition-colors cursor-pointer"
          >
            Settings
          </button>
          <button
            onClick={onRemove}
            className="flex-1 text-center py-2 min-h-0 rounded-xl text-[12px] font-semibold text-[#EF4444] bg-[#FFF0F0] hover:bg-[#FFF0F0]/80 transition-colors cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  // Non-primary payment hub
  return (
    <div className="rounded-2xl bg-[#FAF3E8] p-4 mb-3 flex items-center justify-between border border-transparent">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl border border-border/40 flex items-center justify-center flex-shrink-0 bg-surface overflow-hidden relative">
          {config ? (
            <Image
              src={config.src}
              alt={config.alt}
              className="object-cover absolute top-0 left-0 w-full h-full rounded-xl"
            />
          ) : (
            <span className="text-xs font-bold text-foreground">
              {provider[0]}
            </span>
          )}
        </div>
        <div>
          <span className="text-[14px] font-bold text-foreground block">
            {displayName}
          </span>
          {linkedDate && (
            <p className="text-[12px] text-foreground-muted mt-0.5">
              Linked: {linkedDate}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onSetPrimary}
        className="text-[12px]  font-bold text-[#7D5A2B] hover:text-[#7D5A2B]/80 transition-colors cursor-pointer min-h-0 min-w-0"
      >
        Set as Primary
      </button>
    </div>
  );
}
