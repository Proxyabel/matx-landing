'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, Award } from 'lucide-react';

const navItems = [
  { label: 'Probleem', href: '#probleem' },
  { label: 'Erinevus', href: '#erinevus' },
  { label: 'Teemad', href: '#teemad' },
  { label: 'Õpitee', href: '#opitee' },
  { label: 'Õpetajale', href: '#opetajale' },
  { label: 'KKK', href: '#kkk' },
];

interface NavigationProps {
  onOpenRegistration?: () => void;
}

export function Navigation({ onOpenRegistration }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { y: -100, opacity: 0 });
    gsap.to(nav, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.5,
      ease: 'power3.out',
    });

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            gsap.to(nav, {
              y: -100,
              opacity: 0.5,
              duration: 0.3,
              ease: 'power2.in',
            });
          } else {
            gsap.to(nav, {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.killTweensOf(nav);
    };
  }, []);

  useEffect(() => {
    const items = menuItemsRef.current.filter(Boolean);

    if (isOpen) {
      gsap.set(items, {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        x: -30,
      });

      gsap.to(items, {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power4.out',
      });
    } else {
      gsap.to(items, {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        x: -30,
        duration: 0.3,
        stagger: 0.04,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  const handleRegistrationClick = () => {
    setIsOpen(false);
    onOpenRegistration?.();
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 py-4 backdrop-blur-md bg-surface/80 border-b border-border"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="inline-flex items-center gap-2 focus-ring-target rounded-md">
          <span className="text-2xl font-display font-bold">
            <span className="text-primary">MAT</span>
            <span className="text-secondary">x</span>
          </span>
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-elevated border border-border">
            <Award className="w-3 h-3 text-warning" />
            <span className="text-xs text-text-secondary">FELLIN HÄKK</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-text-secondary hover:text-text-primary text-sm transition-colors relative group focus-ring-target rounded-md min-h-[44px] flex items-center"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://calendly.com/matx-ee/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors focus-ring-target min-h-[44px] flex items-center"
          >
            Infovestlus
          </a>
          <button
            onClick={handleRegistrationClick}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-primary text-text-inverse hover:bg-primary/90 transition-colors focus-ring-target min-h-[44px]"
          >
            Registreeri kool
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-11 h-11 rounded-lg bg-elevated flex items-center justify-center relative z-50 focus-ring-target"
        >
          <span className="sr-only">Toggle menu</span>
          {isOpen ? (
            <X className="w-5 h-5 text-text-primary" />
          ) : (
            <Menu className="w-5 h-5 text-text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-canvas/95 backdrop-blur-xl z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-start justify-center h-full px-8 md:px-16">
          {navItems.map((item, index) => (
            <div
              key={item.label}
              ref={(el) => {
                if (el) menuItemsRef.current[index] = el;
              }}
              className="overflow-hidden mb-6"
            >
              <a
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl md:text-4xl font-display font-bold text-text-primary hover:text-primary transition-colors focus-ring-target rounded-md"
              >
                {item.label}
              </a>
            </div>
          ))}

          <div
            ref={(el) => {
              if (el) menuItemsRef.current[navItems.length] = el;
            }}
            className="overflow-hidden mt-8 flex flex-col gap-4"
          >
            <button
              onClick={handleRegistrationClick}
              className="px-6 py-3 rounded-lg bg-primary text-text-inverse font-semibold focus-ring-target min-h-[44px]"
            >
              Registreeri kool
            </button>
            <a
              href="https://calendly.com/matx-ee/15min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 rounded-lg border border-border text-text-primary font-semibold hover:bg-surface transition-colors text-center focus-ring-target min-h-[44px]"
            >
              Broneeri infovestlus
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
