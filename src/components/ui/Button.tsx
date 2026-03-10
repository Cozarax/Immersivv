import React from 'react';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

const variants: Record<string, string> = {
  primary: 'bg-accent text-bg hover:opacity-90',
  secondary: 'border border-accent/50 text-accent hover:border-accent hover:bg-accent/10',
  ghost: 'text-ink-2 hover:text-ink',
};

const sizes: Record<string, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3.5 text-sm',
  lg: 'px-8 py-4 text-sm',
};

export default function Button({
  href,
  variant = 'secondary',
  size = 'md',
  children,
  className = '',
  target,
  rel,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = [
    'inline-flex items-center gap-2 font-sans font-medium transition-all duration-150',
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
