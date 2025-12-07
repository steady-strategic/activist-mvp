// packages/ui/src/index.tsx
import React, { ReactNode } from 'react';

// --- BUTTON ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading,
  style,
  ...props 
}: ButtonProps) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50";
  
  const variants = {
    primary: "text-white shadow-sm hover:opacity-90 active:scale-95",
    // In a real setup, we'd use CSS variables, but for inline styles we rely on the passed style or defaults
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline: "border-2 border-current bg-transparent hover:bg-black/5",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
  };

  // If primary, we assume the parent injects background color via style or class
  const variantClass = variant === 'primary' ? `${variants.primary} bg-[var(--color-primary)]` : variants[variant];

  return (
    <button className={`${baseStyle} ${variantClass} ${className}`} style={style} disabled={isLoading} {...props}>
      {isLoading ? <span className="animate-spin">⏳</span> : children}
    </button>
  );
};

// --- CARD ---
export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

// --- BADGE ---
export const Badge = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${className}`}>
    {children}
  </span>
);
