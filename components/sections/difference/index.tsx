'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Brain, Target, AlertTriangle, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Õpetaja loodud, mitte AI genereeritud',
    description: '150+ ülesannet Andri Suga poolt loodud — null hallutsinatsiooni risk. AI valib, ei genereeri.',
    stat: '150+',
    statLabel: 'ülesannet',
    color: 'primary',
  },
  {
    icon: AlertTriangle,
    title: '7 veatüüpi',
    description: 'sign_error, magnitude_error, calculation_error, formula_error, procedure_error, rapid_guessing, partial_correct.',
    stat: '7',
    statLabel: 'veatüüpi',
    color: 'secondary',
  },
  {
    icon: Brain,
    title: 'Bayesian Knowledge Tracing',
    description: 'P(L₀)=0.20, P(T)=0.10, P(S)=0.10, P(G)=0.20. Teaduslikult täpne kognitiivne mudel.',
    stat: 'BKT',
    statLabel: 'mootor',
    color: 'accent',
  },
  {
    icon: Target,
    title: 'ZPD sihtimine — Arengutsoonis harjutamine',
    description: 'P(solve) ≈ 0.7 — piisavalt keeruline õppimiseks, mitte nii raske, et loobuda.',
    stat: '0.7',
    statLabel: 'P(solve)',
    color: 'primary',
  },
];

export function DifferenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const comparisonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    );

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'cubic-bezier(0.2, 0, 0, 1)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="erinevus" className="relative py-24 md:py-32 lg:py-40 bg-canvas overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 md:mb-24">
          <span className="inline-block text-primary text-sm uppercase tracking-widest mb-4 font-mono">
            MATx erinevus
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6 leading-tight">
            Me ei oleta. Me modelleerime.
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Mitte lihtsalt õigeid vastuseid — me mõistame, miks õpilane eksib
          </p>
        </div>

        {/* Before/After Comparison */}
        <div ref={comparisonRef} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before MATx */}
            <div className="card p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-alert/20 text-alert text-xs font-medium rounded-bl-lg flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Enne
              </div>
              <h3 className="text-xl font-display font-semibold text-text-primary mb-4">
                Traditsiooniline lähenemine
              </h3>
              <div className="min-h-48 flex items-center justify-center bg-surface/50 rounded-xl border border-border">
                <div className="text-center">
                  <div className="text-6xl font-mono text-text-secondary/40 mb-2">72%</div>
                  <div className="text-text-secondary/60 text-sm">Õiged vastused</div>
                </div>
              </div>
              <p className="text-text-secondary text-sm mt-4">
                Näitab ainult tulemust — mitte põhjust
              </p>
            </div>

            {/* After MATx */}
            <div className="card p-8 text-center relative overflow-hidden border-primary/30">
              <div className="absolute top-0 right-0 px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-bl-lg flex items-center gap-1">
                <Check className="w-3 h-3" />
                Pärast
              </div>
              <h3 className="text-xl font-display font-semibold text-text-primary mb-4">
                MATx BKT analüüs
              </h3>
              <div className="min-h-48 flex items-center justify-center bg-surface/50 rounded-xl border border-primary/20">
                <div className="text-center">
                  <div className="text-2xl mb-2 font-mono">
                    <div className="flex gap-2 justify-center mb-2">
                      <span className="px-2 py-1 rounded bg-primary/20 text-primary">L₀=0.20</span>
                      <span className="px-2 py-1 rounded bg-secondary/20 text-secondary">T=0.10</span>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <span className="px-2 py-1 rounded bg-accent/20 text-accent">S=0.10</span>
                      <span className="px-2 py-1 rounded bg-primary/20 text-primary">G=0.20</span>
                    </div>
                  </div>
                  <div className="text-text-secondary/60 text-sm">BKT parameetrid</div>
                </div>
              </div>
              <p className="text-text-secondary text-sm mt-4">
                Modelleerib iga õpilase teadmiste seisundit
              </p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="card p-8 group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all ${
                  feature.color === 'primary' ? 'bg-primary/20' :
                  feature.color === 'secondary' ? 'bg-secondary/20' :
                  'bg-accent/20'
                }`}>
                  <feature.icon className={`w-6 h-6 ${
                    feature.color === 'primary' ? 'text-primary' :
                    feature.color === 'secondary' ? 'text-secondary' :
                    'text-accent'
                  }`} />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <span className={`text-2xl font-mono font-bold ${
                      feature.color === 'primary' ? 'text-primary' :
                      feature.color === 'secondary' ? 'text-secondary' :
                      'text-accent'
                    }`}>{feature.stat}</span>
                    <span className="text-text-secondary text-sm">{feature.statLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-elevated border border-secondary/20">
            <Check className="w-4 h-4 text-secondary" />
            <span className="text-text-secondary text-sm">
              Kõik ülesanded on testitud Eesti koolides
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
