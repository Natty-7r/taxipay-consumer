'use client';

import { HomeHeader } from '@/components/layout/home-header';
import { TotalSpentCard } from '@/components/cards/total-spent.card';
import { PaymentAccountCard } from '@/components/cards/payment-account.card';
import { LinkedAccountCard } from '@/components/cards/linked-account.card';
import { RecentActivityCard } from '@/components/cards/recent-activity.card';
import { FloatingScanButton } from '@/components/buttons/floating-scan-button';
import { BottomNavigation } from '@/components/layout/bottom-navigation';
import { mockUser, mockTotalSpent, mockCurrentAccount, mockLinkedAccounts, mockRecentActivities } from '@/data/mock';

export default function HomePage() {

  return (
    <div className="pb-32">
      <div className="pt-6 px-4">
        <HomeHeader firstName={mockUser.firstName} />
        
        <TotalSpentCard amount={mockTotalSpent} />
        
        <PaymentAccountCard
          provider={mockCurrentAccount.provider}
          phoneNumber={mockCurrentAccount.maskedNumber}
          onPressChange={() => console.log('Change payment method')}
        />
        
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">MY ACCOUNTS</h2>
          <div className="bg-card rounded-2xl p-2 border border-border">
            {mockLinkedAccounts.map((account) => (
              <LinkedAccountCard
                key={account.provider}
                provider={account.provider}
                phoneNumber={account.maskedNumber}
                spent={account.spent}
                isPrimary={account.isPrimary}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">RECENT ACTIVITY</h2>
          <div className="bg-card rounded-2xl p-2 border border-border">
            {mockRecentActivities.map((activity) => (
              <RecentActivityCard
                key={activity.id}
                route={activity.route}
                amount={activity.amount}
                date={activity.date}
                time={activity.time}
                provider={activity.provider}
              />
            ))}
          </div>
        </div>
      </div>
      
      <FloatingScanButton />
      <BottomNavigation />
    </div>
  );
}