'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, FileText, Scan, Users, AlertTriangle, TrendingUp } from 'lucide-react';

// CVI-compliant alert types using semantic tokens
const alertTypes = [
  { icon: AlertTriangle, label: 'Raskused tuumteemaga', description: 'Tase <60% üle 5+ katse', tokenVar: 'var(--alert-error)' },
  { icon: TrendingUp, label: 'Kiire pakkumine', description: '3+ vale <5s each', tokenVar: 'var(--alert-warning)' },
  { icon: FileText, label: 'Arvutusviga', description: 'Korduv arvutusviga', tokenVar: 'var(--alert-info)' },
  { icon: Clock, label: 'Kaasamatus', description: '7+ päeva passiivne', tokenVar: 'var(--alert-success)' },
  { icon: Users, label: 'Platoo', description: '15+ katset, areng puudub', tokenVar: 'var(--alert-accent)' },
  { icon: Scan, label: 'Veamuster', description: 'Sama viga 3+ korda', tokenVar: 'var(--alert-primary)' },
];

const teacherTools = [
  'Loo eksam',
  'Prindi tööleht',
  'Skanni käsikirja',
  'Genereeri vanema kiri',
  'Ekspordi PDF',
  'Loo raport',
];

// Heatmap level labels for accessibility
const heatmapLevelLabels = [
  'Madal',
  'Alla keskmise',
  'Keskmine',
  'Üle keskmise',
  'Kõrge',
];

export function TeacherSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heatmapRef = useRef<HTMLDivElement>(null);
  const alertCardsRef = useRef<HTMLDivElement[]>([]);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelector('.section-title'),
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

    alertCardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'cubic-bezier(0, 0, 0.2, 1)',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.08,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const students = 22;
  const skills = 9;

  const getCellLevel = (row: number, col: number) => {
    return (row * 13 + col * 7) % 5;
  };

  return (
    <section ref={sectionRef} id="opetajale" className="relative py-24 md:py-32 lg:py-40 bg-surface overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas pointer-events-none" />

      {/* Teacher Tools Marquee */}
      <div className="relative w-full overflow-hidden py-6 border-y border-border">
        <div className="flex items-center gap-8 animate-marquee">
          {[...teacherTools, ...teacherTools].map((tool, i) => (
            <span key={i} className="text-text-secondary/60 text-sm uppercase tracking-wider whitespace-nowrap font-mono">
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Title */}
        <div className="section-title text-center mb-16 mt-12">
          <span className="inline-block text-secondary text-sm uppercase tracking-widest mb-4 font-mono">
            Õpetajatele
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            MATx Õpetaja
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-4">
            Säästa 10 tundi nädalas. MATx Õpetaja automatiseerib töölehtede koostamise: 60 sekundit → 4 sekundit.
          </p>
        </div>

        {/* Interactive Heatmap */}
        <div ref={heatmapRef} className="mb-16">
          <div className="relative mx-auto max-w-4xl bg-elevated rounded-xl p-6 border border-border overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-semibold text-text-primary">
                Klassi soorituskaart
              </h3>
              <span className="text-text-secondary text-sm font-mono">22 õpilast · 9 oskust</span>
            </div>

            {/* Heatmap Grid */}
            <div className="relative overflow-x-auto">
              <div
                className="grid gap-1"
                style={{
                  gridTemplateColumns: `repeat(${skills}, minmax(0, 1fr))`,
                  minWidth: '500px',
                }}
                role="grid"
                aria-label="Klassi soorituskaart: 22 õpilast, 9 oskust"
              >
                {Array.from({ length: students }).map((_, row) =>
                  Array.from({ length: skills }).map((_, col) => {
                    const level = getCellLevel(row, col) + 1;
                    const isHovered = hoveredCell?.row === row && hoveredCell?.col === col;
                    const isFocused = focusedCell?.row === row && focusedCell?.col === col;
                    const isActive = isHovered || isFocused;

                    return (
                      <button
                        key={`${row}-${col}`}
                        type="button"
                        className={`aspect-square rounded-sm transition-transform focus:outline-none heatmap-cell-${level}`}
                        style={{
                          opacity: isActive ? 1 : 0.6,
                          transform: isActive ? 'scale(1.3)' : 'scale(1)',
                        }}
                        onMouseEnter={() => setHoveredCell({ row, col })}
                        onMouseLeave={() => setHoveredCell(null)}
                        onFocus={() => setFocusedCell({ row, col })}
                        onBlur={() => setFocusedCell(null)}
                        aria-label={`Õpilane ${row + 1}, Oskus ${col + 1}: ${heatmapLevelLabels[level - 1]}`}
                        role="gridcell"
                      />
                    );
                  })
                )}
              </div>
            </div>

            {/* Legend with text labels (not color alone) */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="text-xs text-text-secondary">Madal</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div key={level} className={`w-6 h-3 rounded-sm heatmap-cell-${level}`} style={{ opacity: 0.6 }} />
                ))}
              </div>
              <span className="text-xs text-text-secondary">Kõrge</span>
            </div>

            {/* Hover/Focus tooltip */}
            {(hoveredCell || focusedCell) && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${(((hoveredCell?.col ?? focusedCell?.col ?? 0) + 0.5) / skills) * 100}% ${(((hoveredCell?.row ?? focusedCell?.row ?? 0) + 0.5) / students) * 100}%, rgba(30, 90, 138, 0.1), transparent 30%)`,
                }}
              />
            )}
          </div>
        </div>

        {/* Alert Types */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-display font-semibold text-text-primary">
              6 automaatset hoiatustüüpi
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {alertTypes.map((alert, index) => (
              <div
                key={alert.label}
                ref={(el) => {
                  if (el) alertCardsRef.current[index] = el;
                }}
                className="bg-elevated rounded-xl p-4 text-center border border-border hover:border-primary/30 transition-colors group"
              >
                <div
                  className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `color-mix(in srgb, ${alert.tokenVar} 12.5%, transparent)` }}
                >
                  <alert.icon className="w-5 h-5" style={{ color: alert.tokenVar }} />
                </div>
                <div className="text-sm font-medium text-text-primary mb-1">
                  {alert.label}
                </div>
                <span className="text-xs text-text-secondary font-mono">{alert.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-4xl font-display font-bold text-text-primary mb-1">10h</div>
            <div className="text-text-secondary text-sm">säästetud nädalas</div>
          </div>

          <div className="card p-6 text-center">
            <FileText className="w-8 h-8 text-secondary mx-auto mb-3" />
            <div className="text-3xl font-display font-bold text-text-primary mb-1">60s → 4s</div>
            <div className="text-text-secondary text-sm">töölehe loomine</div>
          </div>

          <div className="card p-6 text-center">
            <Users className="w-8 h-8 text-secondary mx-auto mb-3" />
            <div className="text-4xl font-display font-bold text-text-primary mb-1">22</div>
            <div className="text-text-secondary text-sm">õpilast ühes vaates</div>
          </div>
        </div>
      </div>
    </section>
  );
}
