interface PaymentAccountCardProps {
  provider: string;
  phoneNumber: string;
}

export function PaymentAccountCard({ provider, phoneNumber }: PaymentAccountCardProps) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
      <p className="text-xs font-medium text-muted-foreground mb-3">PAYING WITH</p>
      <div>
        <p className="font-semibold text-foreground text-lg">{provider}</p>
        <p className="text-sm text-muted-foreground mt-1">{phoneNumber}</p>
      </div>
    </div>
  );
}