'use client';

import { Pencil } from 'lucide-react';

interface ProfileAvatarCardProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  onChangePhoto?: () => void;
}

export function ProfileAvatarCard({
  firstName,
  lastName,
  avatarUrl,
  onChangePhoto,
}: ProfileAvatarCardProps) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative mb-2">
        {/* Avatar circle */}
        <div
          className="w-[88px] h-[88px] rounded-full flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#5C6B1A' }}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-white select-none">
              {initials}
            </span>
          )}
        </div>

        {/* Edit badge */}
        <button
          onClick={onChangePhoto}
          aria-label="Change profile photo"
          className="absolute bottom-0 right-0 w-7 h-7 min-h-0 min-w-0 rounded-full bg-foreground flex items-center justify-center border-2 border-background shadow-sm"
        >
          <Pencil className="w-3 h-3 text-white" />
        </button>
      </div>

      <button
        onClick={onChangePhoto}
        className="text-[13px] font-medium text-foreground hover:text-foreground/80 transition-colors"
      >
        Change Photo
      </button>
    </div>
  );
}
