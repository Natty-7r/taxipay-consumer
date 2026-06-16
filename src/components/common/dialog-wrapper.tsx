'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface DialogWrapperProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    maxWidth?: string;
    maxHeight?: string;
    showHeader?: boolean;
    hideTitle?: boolean;
    className?: string;
}

export function DialogWrapper({
    open,
    onOpenChange,
    title,
    description,
    children,
    hideTitle,
    className,
}: DialogWrapperProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={cn(
                    'max-h-[75vh] overflow-y-auto rounded-lg',
                    'w-[92vw] sm:max-w-4xl',
                    className
                )}
            >
                <DialogHeader className={cn(hideTitle && 'hidden')}>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}