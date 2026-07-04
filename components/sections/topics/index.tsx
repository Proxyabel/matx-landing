'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { ChevronLeft, ChevronRight, Percent, Calculator, Variable } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

// CVI-compliant topic colors
const primaryTopics = [
  {
    id: 'abivalemid',
    title: 'Korrutamise abivalemid',
    short: 'Abivalemid',
    icon: Calculator,
    color: '#B45309', // amber-700
    formula: '(a+b)(a-b) = a² - b²',
    competencies: ['Summa ruut', 'Vahe ruut', 'Ruutude vahe'],
    description: 'Korrutamise abivalemite õppimine ja rakendamine. (a+b)², (a-b)², a²-b².',
  },
  {
    id: 'protsendid',
    title: 'Protsentarvutus',
    short: 'Protsendid',
    icon: Percent,
    color: '#0E6F68', // teal-700
    formula: 'p% = p/100',
    competencies: ['Osa leidmine', 'Terviku leidmine', 'Protsendi leidmine'],
    description: 'Protsentide arvutamine: allahindlused, käibemaks, osa/tervik seosed.',
  },
  {
    id: 'vorrandid',
    title: 'Ühe tundmatuga võrrandid',
    short: 'Võrrandid',
    icon: Variable,
    color: '#1E5A8A', // blue-700
    formula: 'ax + b = 0',
    competencies: ['Lihtsad võrrandid', 'Sulgudega võrrandid', 'Murdudega võrrandid'],
    description: 'Lineaarvõrrandite lahendamine: korrastamine, sulgude avamine, murdude käsitlemine.',
  },
];

const expansionTopics = [
  { id: 'defineerimine', title: 'Defineerimine', color: '#0B6FA4' }, // info-700
  { id: 'vorrandi-koostamine', title: 'Võrrandi koostamine', color: '#63A0D6' }, // blue-400
  { id: 'lahendamine', title: 'Võrrandite lahendamine', color: '#B42318' }, // red-600
  { id: 'lineaarne-funktsioon', title: 'Lineaarne funktsioon', color: '#184E78' }, // blue-750
  { id: 'astmed-juured', title: 'Astmed ja juured', color: '#3FA69D' }, // teal-400
];

export function TopicsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;

    Draggable.create(track, {
      type: 'x',
      bounds: {
        minX: -track.scrollWidth + track.parentElement!.clientWidth,
        maxX: 0,
      },
      inertia: true,
      throwResistance: 0.5,
      onDragEnd: function () {
        const progress = Math.abs(this.x / (track.scrollWidth - track.parentElement!.clientWidth));
        const newIndex = Math.round(progress * (primaryTopics.length - 1));
        setActiveIndex(Math.min(newIndex, primaryTopics.length - 1));
      },
    });

    return () => {
      Draggable.get(track)?.kill();
    };
  }, []);

  const scrollTo = (direction: 'prev' | 'next') => {
    if (!trackRef.current) return;
    const newIndex = direction === 'next'
      ? Math.min(activeIndex + 1, primaryTopics.length - 1)
      : Math.max(activeIndex - 1, 0);
    setActiveIndex(newIndex);

    const targetX = -(newIndex / (primaryTopics.length - 1)) * (trackRef.current.scrollWidth - trackRef.current.parentElement!.clientWidth);
    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={sectionRef} id="teemad" className="relative py-24 md:py-32 lg:py-40 bg-surface overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas pointer-events-none" />

      <div className="relative z-10">
        {/* Section Title */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 mb-12 md:mb-16">
          <div className="section-title text-center">
            <span className="inline-block text-primary text-sm uppercase tracking-widest mb-4 font-mono">
              Matemaatika teemad
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
              Kolm olulist teemat
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              Põhjalikum materjal, mida Eesti koolides õpetatakse
            </p>
          </div>
        </div>

        {/* Topics Carousel */}
        <div className="relative">
          {/* Nav Buttons */}
          <button
            onClick={() => scrollTo('prev')}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-elevated border border-border flex items-center justify-center hover:border-primary transition-colors disabled:opacity-30 focus-ring-target"
            disabled={activeIndex === 0}
            aria-label="Eelmine teema"
          >
            <ChevronLeft className="w-6 h-6 text-text-primary" />
          </button>

          <button
            onClick={() => scrollTo('next')}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-elevated border border-border flex items-center justify-center hover:border-primary transition-colors disabled:opacity-30 focus-ring-target"
            disabled={activeIndex === primaryTopics.length - 1}
            aria-label="Järgmine teema"
          >
            <ChevronRight className="w-6 h-6 text-text-primary" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden px-4 md:px-8 lg:px-16">
            <div
              ref={trackRef}
              className="flex gap-6 md:gap-8 cursor-grab active:cursor-grabbing"
              style={{ width: 'max-content' }}
            >
              {primaryTopics.map((topic, index) => (
                <div
                  key={topic.id}
                  className={`flex-shrink-0 w-[320px] md:w-[400px] group ${
                    index === activeIndex ? 'scale-100' : 'scale-95 opacity-70'
                  } transition-all duration-500`}
                >
                  <div className="card h-full p-8 relative overflow-hidden group-hover:border-primary/30 transition-colors">
                    {/* Topic Color Accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: topic.color }}
                    />

                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${topic.color}20` }}
                    >
                      <topic.icon className="w-7 h-7" style={{ color: topic.color }} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                      {topic.title}
                    </h3>

                    {/* Formula Preview */}
                    <div className="bg-elevated rounded-lg p-4 mb-4 border border-border">
                      <code className="font-mono text-lg" style={{ color: topic.color }}>
                        {topic.formula}
                      </code>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {topic.description}
                    </p>

                    {/* Competencies */}
                    <div className="space-y-2">
                      <span className="text-xs text-text-secondary uppercase tracking-wider">Kompetentsid:</span>
                      <div className="flex flex-wrap gap-2">
                        {topic.competencies.map((comp) => (
                          <span
                            key={comp}
                            className="px-3 py-1 rounded-lg text-xs font-medium bg-elevated border border-border text-text-secondary"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {primaryTopics.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  if (trackRef.current) {
                    const targetX = -(index / (primaryTopics.length - 1)) * (trackRef.current.scrollWidth - trackRef.current.parentElement!.clientWidth);
                    gsap.to(trackRef.current, {
                      x: targetX,
                      duration: 0.6,
                      ease: 'power2.out',
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all focus-ring-target min-w-[44px] min-h-[44px] flex items-center justify-center`}
                aria-label={`Mine slaidile ${index + 1}`}
              >
                <span className={`block w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? 'bg-primary w-6'
                    : 'bg-border hover:bg-borderStrong'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Expansion Topics */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 mt-16">
          <div className="text-center mb-6">
            <span className="text-text-secondary text-sm">+ veel 5 teemat arenduses</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {expansionTopics.map((topic) => (
              <div
                key={topic.id}
                className="px-4 py-2 rounded-full bg-elevated border border-border text-text-secondary text-sm hover:border-primary/30 transition-colors cursor-default"
              >
                {topic.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
