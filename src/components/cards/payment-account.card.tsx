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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="13" rx="2" stroke="#FFC107" strokeWidth="1.8"/>
              <path d="M3 10h18" stroke="#FFC107" strokeWidth="1.8"/>
              <rect x="6" y="14" width="4" height="2" rx="0.5" fill="#FFC107"/>
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-bold text-foreground">{provider}</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">{phoneNumber}</p>
          </div>
        </div>
        <button className="border border-border rounded-full px-4 py-2 text-[13px] font-semibold text-foreground bg-transparent">
          Change
        </button>
      </div>
    </div>
  );
}