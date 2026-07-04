'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, FileText, Eye, CheckCircle, AlertTriangle, Info, Download, Server, Activity } from 'lucide-react';

const compliancePillars = [
  {
    icon: Shield,
    title: 'EU AI Act',
    description: 'Täielik kooskõla',
    color: 'primary',
  },
  {
    icon: Lock,
    title: 'RSA-4096',
    description: 'Krüpteeritud',
    color: 'secondary',
  },
  {
    icon: FileText,
    title: 'RFC 3161',
    description: 'Ajatemplid',
    color: 'accent',
  },
  {
    icon: Eye,
    title: 'Auditeeritav',
    description: 'Kõik otsused',
    color: 'primary',
  },
];

const eventLog = [
  { type: 'success', action: 'Õpilane #4471 lahendas ülesande #12', time: '2 min eest', icon: CheckCircle },
  { type: 'error', action: 'Õpilane #4471: arvutusviga ülesandel #15', time: '5 min eest', icon: AlertTriangle },
  { type: 'info', action: 'BKT mudel uuendatud õpilasele #4471', time: '5 min eest', icon: Info },
  { type: 'success', action: 'Õpilane #4471 saavutas taseme "Oskab"', time: '12 min eest', icon: CheckCircle },
  { type: 'info', action: 'Uus õpilane registreeritud: #4472', time: '15 min eest', icon: Info },
  { type: 'error', action: 'Õpilane #4471: kiire pakkumine (3x <5s)', time: '18 min eest', icon: AlertTriangle },
];

const getEventColor = (type: string) => {
  switch (type) {
    case 'success': return 'var(--color-feedback-success)';
    case 'error': return 'var(--color-feedback-error)';
    case 'info': return 'var(--color-feedback-info)';
    default: return 'var(--color-text-secondary)';
  }
};

export function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLive, setIsLive] = useState(true);

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="usaldus" className="relative py-24 md:py-32 lg:py-40 bg-canvas overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Title */}
        <div className="section-title text-center mb-16">
          <span className="inline-block text-primary text-sm uppercase tracking-widest mb-4 font-mono">
            Usaldus ja turvalisus
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Usaldusväärne infrastruktuur
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Iga AI otsus on krüptograafiliselt allkirjastatud. Avalikult kontrollitav.
          </p>
        </div>

        {/* Trust Score Badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-4 px-8 py-6 rounded-2xl bg-elevated border border-border">
            <div className="text-center">
              <div className="text-5xl font-display font-bold text-primary">A+</div>
              <div className="text-text-secondary text-sm">Usaldusskoor</div>
            </div>
            <div className="w-px h-16 bg-border" />
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-text-primary font-medium text-sm">Süsteem aktiivne</span>
              </div>
              <div className="text-text-secondary text-xs">99.9% uptime · 24/7</div>
            </div>
          </div>
        </div>

        {/* Compliance Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {compliancePillars.map((pillar) => (
            <div key={pillar.title} className="card p-6 text-center group">
              <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform ${
                pillar.color === 'primary' ? 'bg-primary/20' :
                pillar.color === 'secondary' ? 'bg-secondary/20' :
                'bg-accent/20'
              }`}>
                <pillar.icon className={`w-6 h-6 ${
                  pillar.color === 'primary' ? 'text-primary' :
                  pillar.color === 'secondary' ? 'text-secondary' :
                  'text-accent'
                }`} />
              </div>
              <h3 className="text-lg font-display font-semibold text-text-primary mb-1">
                {pillar.title}
              </h3>
              <p className="text-text-secondary text-sm">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Event Log */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-semibold text-text-primary">
              Reaalajas sündmuste logi
            </h3>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-text-secondary" />
              <span className="text-text-secondary text-sm">Eksporditav</span>
            </div>
          </div>

          <div className="bg-elevated rounded-xl border border-border overflow-hidden">
            {eventLog.map((event, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3 hover:bg-surface transition-colors border-b border-border last:border-b-0"
              >
                <event.icon className="w-4 h-4 shrink-0" style={{ color: getEventColor(event.type) }} />
                <span className="text-text-primary text-sm flex-1">{event.action}</span>
                <span className="text-text-secondary text-xs font-mono">{event.time}</span>
              </div>
            ))}
          </div>

          {/* IT Director info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 px-4 py-3 bg-elevated rounded-lg border border-border">
              <Server className="w-5 h-5 text-primary" />
              <div>
                <div className="text-text-primary text-sm font-medium">EU andmekeskus</div>
                <div className="text-text-secondary text-xs">Andmete asukoht auditeeritav</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-elevated rounded-lg border border-border">
              <Activity className="w-5 h-5 text-secondary" />
              <div>
                <div className="text-text-primary text-sm font-medium">SSO / eIDAS</div>
                <div className="text-text-secondary text-xs">Integreeritav kooli süsteemiga</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-elevated rounded-lg border border-border">
              <Shield className="w-5 h-5 text-accent" />
              <div>
                <div className="text-text-primary text-sm font-medium">NIS2 vastavus</div>
                <div className="text-text-secondary text-xs">Võrgu- ja infosüsteemide turvalisus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
