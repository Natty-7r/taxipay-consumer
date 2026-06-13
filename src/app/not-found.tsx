'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft, MapPin, Car, Search } from 'lucide-react';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
            {/* Animated elements */}
            <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                    <Search className="w-12 h-12 text-primary" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/20 animate-bounce" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-primary/15 animate-spin" />
            </div>

            {/* Error text */}
            <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
            <h2 className="text-xl font-bold text-foreground mb-2">Page Not Found</h2>
            <p className="text-muted-foreground text-center mb-8">
                Oops! The page you're looking for<br />
                doesn't exist or has been moved.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-card border border-border text-foreground font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                </button>

                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-medium"
                >
                    <Home className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>

            {/* Decorative taxi icons */}
            <div className="absolute bottom-8 left-4 opacity-20">
                <Car className="w-12 h-12 text-foreground" />
            </div>
            <div className="absolute bottom-12 right-6 opacity-15">
                <MapPin className="w-16 h-16 text-primary" />
            </div>
        </div>
    );
}