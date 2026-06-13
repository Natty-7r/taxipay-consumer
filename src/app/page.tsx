'use client';
import { PaymentAccountCard } from '@/components/cards/payment-account.card';
import { RecentActivityCard } from '@/components/cards/recent-activity.card';
import { TotalSpentCard } from '@/components/cards/total-spent.card';
import { HomeHeader } from '@/components/layout/home-header';
import { mockCurrentAccount, mockRecentActivities, mockTotalSpent, mockUser } from '@/data/mock';

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