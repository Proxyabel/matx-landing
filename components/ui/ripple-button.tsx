'use client';

import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function RippleButton({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
}: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ripplesRef = useRef<HTMLDivElement>(null);

  const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    const container = ripplesRef.current;
    if (!button || !container) return;

    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    ripple.className = 'absolute rounded-full pointer-events-none';
    ripple.style.width = `${diameter}px`;
    ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';

    container.appendChild(ripple);

    gsap.fromTo(
      ripple,
      { scale: 0, opacity: 1 },
      {
        scale: 2.5,
        opacity: 0,
        duration: 0.3,
        ease: 'cubic-bezier(0, 0, 0.2, 1)',
        onComplete: () => ripple.remove(),
      }
    );
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    onClick?.();
  };

  const baseStyles =
    'relative overflow-hidden inline-flex items-center justify-center font-medium transition-all focus-ring-target';

  const variants = {
    primary:
      'bg-primary text-text-inverse hover:bg-primary/90',
    secondary:
      'bg-surface text-text-primary border border-border hover:bg-surface/80 hover:border-primary',
    outline:
      'bg-transparent text-primary border-2 border-primary hover:bg-primary/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg min-h-[44px]',
    md: 'px-6 py-3 text-base rounded-xl min-h-[44px]',
    lg: 'px-8 py-4 text-lg rounded-xl min-h-[44px]',
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      <span className="relative z-10">{children}</span>
      <span ref={ripplesRef} className="absolute inset-0 pointer-events-none" />
    </button>
  );
}
