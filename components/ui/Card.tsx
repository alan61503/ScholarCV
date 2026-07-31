import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-surface border border-border-subtle/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`p-6 md:p-8 pb-4 border-b border-border-subtle/70 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`p-6 md:p-8 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }: CardProps) {
  return (
    <h3
      className={`text-xl font-bold text-foreground font-serif tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function SectionEyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[11px] font-bold uppercase tracking-[0.15em] text-accent-700 dark:text-accent-400 ${className}`}>
      {children}
    </p>
  );
}
