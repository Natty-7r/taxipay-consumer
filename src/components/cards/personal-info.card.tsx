'use client';

import { Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';

interface PersonalInfoCardProps {
  firstName: string;
  lastName: string;
  nidNumber?: string;
}

export function PersonalInfoCard({
  firstName,
  lastName,
  nidNumber,
}: PersonalInfoCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyNid = useCallback(async () => {
    if (!nidNumber) return;
    try {
      // Strip display characters for clipboard
      const cleanNid = nidNumber.replace(/[•\s]/g, '');
      await navigator.clipboard.writeText(cleanNid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = nidNumber;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [nidNumber]);

  return (
    <section className="mb-6" aria-label="Personal Information">
      <h2 className="text-[11px] font-bold tracking-[1.2px] text-foreground-muted uppercase mb-3">
        Personal Information
      </h2>

      {/* First Name & Last Name row */}
      <div className="flex gap-3 mb-3">
        <div className="flex-1 bg-surface rounded-xl border border-border px-4 py-3">
          <label className="text-[10px] font-semibold tracking-[0.8px] text-foreground-muted uppercase block mb-1">
            First Name
          </label>
          <p className="text-[15px] font-medium text-foreground">{firstName}</p>
        </div>
        <div className="flex-1 bg-surface rounded-xl border border-border px-4 py-3">
          <label className="text-[10px] font-semibold tracking-[0.8px] text-foreground-muted uppercase block mb-1">
            Last Name
          </label>
          <p className="text-[15px] font-medium text-foreground">{lastName}</p>
        </div>
      </div>

      {/* NID / FAN Number */}
      {nidNumber && (
        <div className="bg-surface rounded-xl border border-border px-4 py-3 flex items-center justify-between">
          <div>
            <label className="text-[10px] font-semibold tracking-[0.8px] text-foreground-muted uppercase block mb-1">
              NID / FAN Number
            </label>
            <p className="text-[15px] font-medium text-foreground tracking-wide">
              {nidNumber}
            </p>
          </div>
          <button
            onClick={handleCopyNid}
            aria-label={copied ? 'Copied NID number' : 'Copy NID number'}
            className="w-9 h-9 min-h-0 min-w-0 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <Copy className="w-4 h-4 text-foreground-muted" />
            )}
          </button>
        </div>
      )}
    </section>
  );
}
