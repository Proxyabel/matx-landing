'use client';

import { AnimatedWordReveal, AnimatedCharacterReveal, MATxLogoAnimation } from './animated-headline';
import { ScrollIndicator } from './scroll-indicator';
import { Award, GraduationCap, BookOpen, Users } from 'lucide-react';

interface HeroSectionProps {
  onOpenRegistration: () => void;
}

export function HeroSection({ onOpenRegistration }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-canvas">
      {/* CVI-compliant blueprint grid background (replaces 3D particles) */}
      <div className="absolute inset-0 hero-blueprint-bg" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-canvas/40 to-canvas pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 py-24 md:py-32 lg:py-40 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Achievement Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border">
              <Award className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-text-primary">FELLIN HÄKK 2026 — I koht</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border">
              <GraduationCap className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-text-primary">Presidendi Häkaton 2026</span>
            </div>
          </div>

          {/* Logo */}
          <div className="mb-6">
            <div className="text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight">
              <MATxLogoAnimation delay={0.3} />
            </div>
          </div>

          {/* Main Headline */}
          <AnimatedWordReveal
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-text-primary tracking-tight mb-6"
            stagger={0.08}
            delay={0.6}
          >
            Matemaatika selgeks — teaduslikel alustel
          </AnimatedWordReveal>

          {/* Sub-headline */}
          <div className="mb-10">
            <AnimatedCharacterReveal
              className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
              delay={1.8}
            >
              Andmepõhine õpitee iga õpilase jaoks. Valmistatud Eesti õpetajate poolt, Eesti õppekavaks.
            </AnimatedCharacterReveal>
          </div>

          {/* Dual CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onOpenRegistration}
              className="btn-primary min-w-[240px] sm:min-w-[280px] px-8 py-4 text-lg rounded-xl font-semibold focus-ring-target min-h-[44px]"
            >
              Registreeri kool pilootkatsetuseks
            </button>

            <a
              href="https://calendly.com/matx-ee/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary min-w-[240px] sm:min-w-[280px] px-8 py-4 text-lg rounded-xl font-semibold group focus-ring-target min-h-[44px]"
            >
              Broneeri 15-min infovestlus
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Trust Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-text-secondary text-sm md:text-base">150+ ülesannet</span>
            </div>
            <div className="w-px h-6 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-secondary">7</span>
              </div>
              <span className="text-text-secondary text-sm md:text-base">veatüüpi tuvastamist</span>
            </div>
            <div className="w-px h-6 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-text-secondary text-sm md:text-base">EU AI Act auditeeritav</span>
            </div>
          </div>

          {/* Clarification text */}
          <p className="mt-8 text-text-secondary/70 text-sm max-w-2xl mx-auto">
            MATx on AI-toega adaptiivne matemaatikaõpikeskkond Eesti põhikoolidele. Me ei asenda õpetajat — me anname teile andmepõhise tööriista, mis näitab täpselt millised teemad vajavad kordamist.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
