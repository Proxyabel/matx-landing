import './globals.css';
import type { Metadata } from 'next';
import { Public_Sans, Inter, IBM_Plex_Mono } from 'next/font/google';
import { LenisProvider } from '@/components/providers/lenis-provider';

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://matx.ee'),
  title: 'MATx — Adaptiivne matemaatikaõpikeskkond Eesti põhikoolidele',
  description:
    'Adaptiivne matemaatikaõpikeskkond Eesti põhikoolidele. 150+ kureeritud ülesannet, Bayesian Knowledge Tracing mootor, EU AI Act nõuetele vastav.',
  keywords: [
    'matemaatika',
    'Eesti',
    'kool',
    'õppimine',
    'BKT',
    'ülesanded',
    'adaptiivne',
    'põhikool',
  ],
  authors: [{ name: 'MATx' }, { name: 'Andri Suga' }, { name: 'Tom Kristian Abel' }],
  openGraph: {
    title: 'MATx — Adaptiivne matemaatikaõpikeskkond Eesti põhikoolidele',
    description: '150+ kureeritud ülesannet, BKT mootor, EU AI Act nõuetele vastav.',
    url: 'https://matx.ee',
    siteName: 'MATx',
    type: 'website',
    locale: 'et_EE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MATx — Adaptiivne matemaatikaõpikeskkond Eesti põhikoolidele',
    description: '150+ kureeritud ülesannet, BKT mootor, EU AI Act nõuetele vastav.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://matx.ee',
    languages: {
      'et-EE': 'https://matx.ee',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="et" className={`${publicSans.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'MATx',
              description: 'Adaptiivne matemaatikaõpikeskkond Eesti põhikoolidele',
              url: 'https://matx.ee',
              logo: 'https://matx.ee/logo.png',
              foundingDate: '2026',
              founders: [
                { '@type': 'Person', name: 'Andri Suga' },
                { '@type': 'Person', name: 'Tom Kristian Abel' },
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'EE',
                addressLocality: 'Estonia',
              },
              sameAs: [
                'https://twitter.com/matx_ee',
                'https://linkedin.com/company/matx-ee',
                'https://github.com/matx-ee',
              ],
              award: 'FELLIN HÄKK 2026',
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
