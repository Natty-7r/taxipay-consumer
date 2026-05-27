import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react';

interface IconCardProps {
  src?: string | any;  // Image source (URL or imported image)
  alt?: string;        // Alt text for image
  icon?: ReactNode;    // Fallback icon (Lucide or custom)
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'muted' | 'gradient';
  shape?: 'circle' | 'rounded' | 'square';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const shapeClasses = {
  circle: 'rounded-full',
  rounded: 'rounded-xl',
  square: 'rounded-md',
};

const variantClasses = {
  primary: 'bg-primary/10',
  secondary: 'bg-secondary',
  muted: 'bg-muted',
  gradient: 'bg-gradient-to-br from-primary/20 to-primary/5',
};

export function IconCard({
  src,
  alt = '',
  icon,
  size = 'md',
  variant = 'muted',
  shape = 'rounded',
  className = '',
}: IconCardProps) {
  return (
    <div
      className={`
        flex items-center justify-center flex-shrink-0 relative
        ${sizeClasses[size]}
        ${shapeClasses[shape]}
        border border-border 
        ${className}
      `}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          className={cn('object-cover absolute top-0 left-0 w-full h-full',shapeClasses[shape])}
        />
      ) : icon ? (
        <div className="text-foreground">{icon}</div>
      ) : (
        <div className="w-full h-full bg-muted animate-pulse rounded-inherit" />
      )}
    </div>
  );
}