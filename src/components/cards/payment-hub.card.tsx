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

  return (
    <div
      className={`rounded-2xl border p-4 mb-3 ${
        isPrimary
          ? 'border-primary/30 bg-primary/[0.03]'
          : 'border-border bg-surface'
      }`}
    >
      {/* Top row: icon, name, badge, menu */}
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
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-foreground">
                {displayName}
              </span>
            </div>
            {isPrimary && (
              <span className="inline-block text-[9px] font-bold tracking-[0.8px] uppercase px-2.5 py-0.5 rounded-full bg-success text-white mt-1">
                Primary
              </span>
            )}
            {!isPrimary && linkedDate && (
              <p className="text-[12px] text-foreground-muted mt-0.5">
                Linked: {linkedDate}
              </p>
            )}
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
      {isPrimary ? (
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50">
          <button
            onClick={onSettings}
            className="text-[13px] font-medium text-foreground px-4 py-1.5 min-h-0 rounded-lg hover:bg-muted transition-colors"
          >
            Settings
          </button>
          <button
            onClick={onRemove}
            className="text-[13px] font-medium text-red-500 px-4 py-1.5 min-h-0 rounded-lg hover:bg-red-50 transition-colors"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end mt-2">
          <button
            onClick={onSetPrimary}
            className="text-[13px] font-semibold text-foreground hover:text-foreground/80 transition-colors"
          >
            Set as Primary
          </button>
        </div>
      )}
    </div>
  );
}
