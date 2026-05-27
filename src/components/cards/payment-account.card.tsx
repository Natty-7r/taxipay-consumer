import { CreditCard, ChevronRight } from 'lucide-react';

interface PaymentAccountCardProps {
  provider: string;
  phoneNumber: string;
}

export function PaymentAccountCard({ provider, phoneNumber }: PaymentAccountCardProps) {
  return (
    <div className="mb-5">
      <h2 className="text-[11px] font-bold tracking-[1.2px] text-muted-foreground uppercase mb-3">Paying With</h2>
      <div className="bg-card rounded-2xl border border-border p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-secondary)' }}>
            <CreditCard className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <p className="text-[15px] font-bold text-foreground">{provider}</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">{phoneNumber}</p>
          </div>
        </div>
        <button className="border border-border rounded-full px-4 py-2 text-[13px] font-semibold text-foreground bg-transparent">
          Change
          <ChevronRight className="w-3 h-3 inline ml-1" />
        </button>
      </div>
    </div>
  );
}