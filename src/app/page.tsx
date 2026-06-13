'use client';
import { LinkedAccountCard } from '@/components/cards/linked-account.card';
import { PaymentAccountCard } from '@/components/cards/payment-account.card';
import { RecentActivityCard } from '@/components/cards/recent-activity.card';
import { TotalSpentCard } from '@/components/cards/total-spent.card';
import { HomeHeader } from '@/components/layout/home-header';
import { mockCurrentAccount, mockLinkedAccounts, mockRecentActivities, mockTotalSpent, mockUser } from '@/data/mock';

export default function HomePage() {
  return (
    <div className="min-h-screen pb-32" style={{ background: 'var(--color-muted)' }}>
      <div className="pt-6 px-5">
        <HomeHeader firstName={mockUser.firstName} />
        <TotalSpentCard amount={mockTotalSpent} />
        <PaymentAccountCard
          provider={mockCurrentAccount.provider}
          phoneNumber={mockCurrentAccount.maskedNumber}
        />
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] font-bold tracking-[1.2px] text-muted-foreground uppercase">My Accounts</h2>
            <button className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
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
        <div className="mb-5">
          <h2 className="text-[11px] font-bold tracking-[1.2px] text-muted-foreground uppercase mb-3">Recent Activity</h2>
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            {mockRecentActivities.map((activity, i) => (
              <RecentActivityCard
                key={activity.id}
                route={activity.route}
                amount={activity.amount}
                date={activity.date}
                time={activity.time}
                provider={activity.provider}
                isLast={i === mockRecentActivities.length - 1}
                isRecent={i === 0}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}