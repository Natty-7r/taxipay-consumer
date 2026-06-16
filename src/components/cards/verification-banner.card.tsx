'use client';

import { CheckCircle, ShieldCheck } from 'lucide-react';

type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'none';

interface VerificationBannerCardProps {
  status: VerificationStatus;
}

const STATUS_CONFIG: Record<
  VerificationStatus,
  { title: string; subtitle: string; bgColor: string; textColor: string; iconColor: string }
> = {
  verified: {
    title: 'Verified Identity',
    subtitle: 'Full access to financial services',
    bgColor: 'var(--color-success-soft)',
    textColor: '#1B5E20',
    iconColor: 'var(--color-success)',
  },
  pending: {
    title: 'Verification Pending',
    subtitle: 'Your identity is being verified',
    bgColor: '#FFF8E1',
    textColor: '#E65100',
    iconColor: '#FB8C00',
  },
  rejected: {
    title: 'Verification Failed',
    subtitle: 'Please resubmit your documents',
    bgColor: '#FFEBEE',
    textColor: '#B71C1C',
    iconColor: '#E53935',
  },
  none: {
    title: 'Not Verified',
    subtitle: 'Verify your identity for full access',
    bgColor: '#F5F5F5',
    textColor: '#616161',
    iconColor: '#9E9E9E',
  },
};

export function VerificationBannerCard({ status }: VerificationBannerCardProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div
      className="flex items-center gap-3 rounded-2xl px-4 py-3.5 mb-6"
      style={{ backgroundColor: config.bgColor }}
      role="status"
      aria-label={`Identity status: ${config.title}`}
    >
      <CheckCircle
        className="w-6 h-6 flex-shrink-0"
        style={{ color: config.iconColor }}
        fill={config.iconColor}
        strokeWidth={0}
      />
      <div className="flex-1 min-w-0">
        <p
          className="text-[14px] font-semibold leading-tight"
          style={{ color: config.textColor }}
        >
          {config.title}
        </p>
        <p
          className="text-[12px] leading-tight mt-0.5"
          style={{ color: config.textColor, opacity: 0.7 }}
        >
          {config.subtitle}
        </p>
      </div>
      <ShieldCheck
        className="w-6 h-6 flex-shrink-0"
        style={{ color: config.iconColor }}
      />
    </div>
  );
}
