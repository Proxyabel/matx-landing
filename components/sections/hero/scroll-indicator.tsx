'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !mouseRef.current) return;

    gsap.set(containerRef.current, { opacity: 0, y: -20 });
    gsap.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 3.2,
      ease: 'power3.out',
    });

    gsap.to(mouseRef.current, {
      y: 8,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    return () => {
      gsap.killTweensOf(containerRef.current);
      gsap.killTweensOf(mouseRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-text-secondary text-sm tracking-wider uppercase">Scroll</span>
      <div className="w-6 h-10 rounded-full border-2 border-text-secondary/50 flex items-start justify-center p-1">
        <div
          ref={mouseRef}
          className="w-1.5 h-3 rounded-full bg-accent"
        />
      </div>
    </div>
  );
}
