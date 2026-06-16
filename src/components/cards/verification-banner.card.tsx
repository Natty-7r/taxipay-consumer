'use client';

import { Check, Clock, X, BadgeCheck, AlertCircle } from 'lucide-react';

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

  // Helper to render the appropriate status-specific left icon
  const renderLeftIcon = () => {
    switch (status) {
      case 'verified':
        return (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: config.iconColor }}
          >
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
        );
      case 'pending':
        return (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: config.iconColor }}
          >
            <Clock className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
        );
      case 'rejected':
        return (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: config.iconColor }}
          >
            <X className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
        );
      default:
        return (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: config.iconColor }}
          >
            <AlertCircle className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
        );
    }
  };

  return (
    <div
      className="flex items-center gap-3 rounded-2xl px-4 py-3.5 mb-6"
      style={{ backgroundColor: config.bgColor }}
      role="status"
      aria-label={`Identity status: ${config.title}`}
    >
      {renderLeftIcon()}
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
      <BadgeCheck
        className="w-6 h-6 flex-shrink-0"
        style={{ color: config.iconColor }}
      />
    </div>
  );
}
