'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Wifi, Server } from 'lucide-react';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
    const router = useRouter();

    useEffect(() => {

        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    const isNetworkError = error.message?.includes('fetch') || error.message?.includes('network');
    const isServerError = error.digest?.startsWith('5');

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
            {/* Animated elements */}
            <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full bg-error/10 flex items-center justify-center animate-shake">
                    <AlertTriangle className="w-12 h-12 text-error" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-error/20 animate-ping" />
            </div>

            {/* Error text */}
            <h1 className="text-6xl font-bold text-error mb-2">500</h1>
            <h2 className="text-xl font-bold text-foreground mb-2">Server Error</h2>

            {/* Error type indicator */}
            <div className="flex items-center gap-2 mb-4">
                {isNetworkError ? (
                    <>
                        <Wifi className="w-4 h-4 text-error" />
                        <span className="text-sm text-muted-foreground">Network Connection Issue</span>
                    </>
                ) : isServerError ? (
                    <>
                        <Server className="w-4 h-4 text-error" />
                        <span className="text-sm text-muted-foreground">Server Unreachable</span>
                    </>
                ) : (
                    <span className="text-sm text-muted-foreground">Something went wrong</span>
                )}
            </div>

            <p className="text-muted-foreground text-center mb-8">
                {isNetworkError
                    ? "Please check your internet connection and try again."
                    : "We're having trouble processing your request. Please try again later."
                }
            </p>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <button
                    onClick={reset}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-medium"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                </button>

                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-card border border-border text-foreground font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                </button>

                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-card border border-border text-muted-foreground font-medium"
                >
                    <Home className="w-4 h-4" />
                    Return to Home
                </Link>
            </div>

            {/* Error details (dev only) */}
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-8 p-4 bg-card rounded-xl border border-border w-full max-w-xs">
                    <p className="text-xs text-muted-foreground font-mono break-all">
                        {error.message}
                    </p>
                    {error.digest && (
                        <p className="text-xs text-muted-foreground font-mono mt-2">
                            Digest: {error.digest}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}