'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollIndicator } from '@/components/sections/hero/scroll-indicator';

const storyBeats = [
  {
    id: 1,
    title: 'Iga neljas ebaõnnestub',
    subtitle: '25% kukub läbi',
    description: 'Eesti matemaatika lõpueksamil kukub läbi 25% õpilastest. See pole lihtsalt number — see on tuhanded lapsed, kes kaotavad usalduse oma võimetesse.',
    stat: '1 in 4',
    statLabel: 'õpilastest kukub läbi',
    color: 'primary',
  },
  {
    id: 2,
    title: '1.9× nõudlus-pakkumise lõhe',
    subtitle: 'Eraõpetajate puudus',
    description: 'Eratundideks on 308 taotlust, kuid ainult 166 saadaval olevat õpetajat. Keskmine hind €22/tund — paljudele kättesaamatu.',
    stat: '€22/h',
    statLabel: 'keskmine tunnihind',
    color: 'accent',
  },
  {
    id: 3,
    title: 'Olemasolevad ei tööta',
    subtitle: 'Vastused, mitte põhjused',
    description: 'PhotoMath, Khan Academy, Opiq — nad näitavad vastust. MATx näitab, MIKS said valesti. Me mõistame veatüüpe.',
    stat: '7',
    statLabel: 'veatüüpi tuvastatud',
    color: 'secondary',
  },
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<HTMLDivElement[]>([]);
  const textRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const beats = beatRefs.current;
    const texts = textRefs.current;

    beats.forEach((beat, index) => {
      if (!beat) return;

      const text = texts[index];
      if (!text) return;

      gsap.set(text.children, { y: 50, opacity: 0 });

      ScrollTrigger.create({
        trigger: beat,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.to(text.children, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(text.children, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="probleem" className="relative bg-surface">
      <div ref={containerRef}>
        {storyBeats.map((beat, index) => (
          <div
            key={beat.id}
            ref={(el) => {
              if (el) beatRefs.current[index] = el;
            }}
            className="relative min-h-screen flex items-center justify-center py-20"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-canvas via-surface to-canvas opacity-50" />

            <div
              ref={(el) => {
                if (el) textRefs.current[index] = el;
              }}
              className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 max-w-5xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text */}
                <div className="text-center lg:text-left">
                  <span className={`inline-block text-sm uppercase tracking-widest mb-4 font-mono ${
                    beat.color === 'primary' ? 'text-primary' :
                    beat.color === 'accent' ? 'text-accent' :
                    'text-secondary'
                  }`}>
                    {beat.subtitle}
                  </span>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6 leading-tight">
                    {beat.title}
                  </h2>

                  <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
                    {beat.description}
                  </p>

                  <div className={`inline-flex items-baseline gap-2 px-6 py-3 rounded-xl border ${
                    beat.color === 'primary'
                      ? 'bg-elevated border-primary/20'
                      : beat.color === 'accent'
                      ? 'bg-elevated border-accent/20'
                      : 'bg-elevated border-secondary/20'
                  }`}>
                    <span className={`text-4xl md:text-5xl font-display font-bold ${
                      beat.color === 'primary' ? 'text-primary' :
                      beat.color === 'accent' ? 'text-accent' :
                      'text-secondary'
                    }`}>
                      {beat.stat}
                    </span>
                    <span className="text-text-secondary text-sm">{beat.statLabel}</span>
                  </div>
                </div>

                {/* Right: Visual */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-md min-h-64 md:min-h-80 rounded-xl bg-elevated border border-border overflow-hidden">
                    <div className={`absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl ${
                      beat.color === 'primary' ? 'bg-primary/15' :
                      beat.color === 'accent' ? 'bg-accent/15' :
                      'bg-secondary/15'
                    }`} />
                    <div className={`absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl ${
                      beat.color === 'primary' ? 'bg-secondary/10' :
                      beat.color === 'accent' ? 'bg-primary/10' :
                      'bg-primary/10'
                    }`} />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-6xl md:text-7xl font-mono font-bold mb-2 ${
                          beat.color === 'primary' ? 'text-primary/30' :
                          beat.color === 'accent' ? 'text-accent/30' :
                          'text-secondary/30'
                        }`}>
                          {beat.stat}
                        </div>
                        <div className="text-text-secondary/40 text-sm uppercase tracking-wider">
                          {beat.statLabel}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {index < storyBeats.length - 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="w-6 h-12 rounded-full border-2 border-text-secondary/30 flex items-start justify-center p-2">
                  <div className="w-1.5 h-3 rounded-full bg-text-secondary/30 animate-bounce" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
