'use client';

import { ProfileHeader } from '@/components/layout/profile-header';
import { ProfileAvatarCard } from '@/components/cards/profile-avatar.card';
import { VerificationBannerCard } from '@/components/cards/verification-banner.card';
import { PersonalInfoCard } from '@/components/cards/personal-info.card';
import { PaymentHubCard } from '@/components/cards/payment-hub.card';
import { PreferencesSectionCard } from '@/components/cards/preferences-section.card';
import { mockUser, mockLinkedAccounts } from '@/data/mock';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="px-5">
        {/* Header */}
        <ProfileHeader />

        {/* Avatar Section */}
        <ProfileAvatarCard
          firstName={mockUser.firstName}
          lastName={mockUser.lastName}
          avatarUrl={mockUser.avatar}
        />

        {/* Verification Banner */}
        <VerificationBannerCard status="verified" />

        {/* Personal Information */}
        <PersonalInfoCard
          firstName={mockUser.firstName}
          lastName={mockUser.lastName}
          nidNumber={mockUser.nidNumber}
        />

        {/* Linked Payment Hubs */}
        <section className="mb-6" aria-label="Linked Payment Hubs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] font-bold tracking-[1.2px] text-foreground-muted uppercase">
              Linked Payment Hubs
            </h2>
            <button className="text-[13px] font-semibold text-foreground-muted hover:text-foreground/80 transition-colors">
              + Add New
            </button>
          </div>

          {mockLinkedAccounts
            .filter((account) => account.provider !== 'CBE')
            .map((account) => (
              <PaymentHubCard
                key={account.provider}
                provider={account.provider}
                isPrimary={account.isPrimary}
                linkedDate={account.linkedDate}
              />
            ))}
        </section>

        {/* Preferences */}
        <PreferencesSectionCard />

        {/* Delete Account */}
        <div className="text-center pb-6">
          <button className="text-[12px] text-foreground-muted hover:text-foreground-soft transition-colors underline-offset-2 hover:underline">
            Delete TaxiPay Identity Control
          </button>
        </div>
      </div>
    </div>
  );
}
