'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const faqItems = [
  {
    question: 'Kui palju maksab MATx koolile?',
    answer: 'Pilootkatsetuse perioodil: 100% tasuta, kogu rahastus Targa Tuleviku Fondi poolt. Ei mingit kaasrahastamist ega varjatud kulusid. Pärast pilootkatsetust jätkub MATx põhikoolidele mõistliku hinnaga SaaS-litsentsi mudelil.',
    category: 'hind',
  },
  {
    question: 'Kuidas mõjub see õpetaja tööajale?',
    answer: 'Netoajakulu väheneb, mitte suureneb. Automatiseeritud: parandamine ja analüüsimine (eemaldab pühapäevaõhtused), diferentseeritud töölehtede koostamine (60 sekund → 4 sekund), klassi ülevaated automaatselt uuenev. Prognoositud netosääst: 2 tundi nädalas.',
    category: 'tööaeg',
  },
  {
    question: 'Kuidas on garanteeritud andmeturve ja GDPR?',
    answer: 'Isikuku päringuid ei koguta. Õpilased saavad anonüümsed identifikaatorid. Krüpteering: RSA-4096 + ML-DSA-65 hübriid-allkirjastamine, RFC 3161 ajatemplid, 18-aastane säilitus. EU AI Act: MATx on täielikult kooskõlas.',
    category: 'turvalisus',
  },
  {
    question: 'Kas see sobib ebaühtlaste tasemetega klassi?',
    answer: 'Jah, just see on meie tuumväärtus. Tugevamad õpilased: Olympiad-stiilis ülesanded. Keskmine tase: ZPD sihtimine (70% tuttav, 30% uus). Väiksema ettevalmistusega: ilma surveeta lünkade täitmine. Klassis 28 õpilast käsitletakse 28 individuaalset õpiteed.',
    category: 'diferentseerimine',
  },
  {
    question: 'Millised on konkreetsed liitumise sammud?',
    answer: '1. Täida vorm (1 minut) → 2. Võta vastu 15-minutiline infovestlus → 3. Allkirjasta digitaalne toetuskiri Targa Tuleviku Fondi taotluseks → 4. Sügisene pilootkatsetus algab: August 2026. Meie tiim toetab samm-sammult.',
    category: 'liitumine',
  },
];

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      gsap.fromTo(
        item,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
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
    <section ref={sectionRef} id="kkk" className="relative py-24 md:py-32 bg-surface overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-sm uppercase tracking-widest mb-4 font-mono">
            Korduma kippuvad küsimused
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">
            KKK
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className="card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-surface/50 transition-colors focus-ring-target min-h-[44px]"
              >
                <span className="text-lg font-display font-semibold text-text-primary pr-4">
                  {item.question}
                </span>
                <span className={`text-primary transition-transform ${openIndex === index ? 'rotate-45' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-text-secondary leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-4">
            Teil on muid küsimusi?
          </p>
          <a
            href="mailto:andri@matx.ee"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors focus-ring-target rounded-md min-h-[44px] px-2"
            style={{ textDecoration: 'underline' }}
          >
            <span>andri@matx.ee</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
