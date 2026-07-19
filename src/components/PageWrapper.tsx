import React from 'react';
import { cn } from '@/lib/utils'; // Assuming they have cn, or I'll just use template literals

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main className={cn('w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </main>
  );
}
