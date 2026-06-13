'use client';

import { LinkedAccountCard } from '@/components/cards/linked-account.card';
import { mockLinkedAccounts } from '@/data/mock';
import { formatCurrency } from '@/helpers/number.helper';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WalletPage() {
    const router = useRouter();

    const totalBalance = mockLinkedAccounts.reduce((sum, acc) => sum + acc.spent, 0);

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted"
                    >
                        <ArrowLeft className="w-5 h-5 text-foreground" />
                    </button>
                    <h1 className="text-base font-semibold text-foreground">My Wallet</h1>
                    <div className="w-10" />
                </div>
            </div>

            {/* Total Balance Card */}
            <div className="p-4">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-5 border border-primary/20 mb-6">
                    <p className="text-xs text-muted-foreground mb-1">Total Spent (All Time)</p>
                    <p className="text-3xl font-bold text-foreground">{formatCurrency(totalBalance)}</p>
                    <p className="text-xs text-muted-foreground mt-2">Across all payment methods</p>
                </div>

                {/* Accounts List */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Linked Accounts
                    </h2>

                </div>

                <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                    {mockLinkedAccounts.map((account, i) => (
                        <LinkedAccountCard
                            key={account.provider}
                            provider={account.provider}
                            phoneNumber={account.maskedNumber}
                            spent={account.spent}
                            isPrimary={account.isPrimary}
                            isLast={i === mockLinkedAccounts.length - 1}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}