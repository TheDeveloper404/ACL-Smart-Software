import Hero from '@/components/sections/Hero';
import ServicesPreview from '@/components/sections/ServicesPreview';
import About from '@/components/sections/About';
import Process from '@/components/sections/Process';
import Tech from '@/components/sections/Tech';
import Contact from '@/components/sections/Contact';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import ScrollToHash from '@/components/ui/ScrollToHash';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://acl-smartsoftware.ro' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://acl-smartsoftware.ro/#organization',
      name: 'ACL Smart Software SRL',
      url: 'https://acl-smartsoftware.ro',
      logo: 'https://acl-smartsoftware.ro/og-image.png',
      email: 'office@acl-smartsoftware.ro',
      telephone: '+40758154490',
      foundingDate: '2025',
      description: 'Studio software independent din Petroșani. Construim software custom, aplicații web și mobile, AI & ML, Cloud & DevOps.',
      sameAs: [],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://acl-smartsoftware.ro/#localbusiness',
      name: 'ACL Smart Software SRL',
      url: 'https://acl-smartsoftware.ro',
      telephone: '+40758154490',
      email: 'office@acl-smartsoftware.ro',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Str. Horea 2/31',
        addressLocality: 'Petroșani',
        addressRegion: 'Hunedoara',
        addressCountry: 'RO',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 45.4103,
        longitude: 23.3700,
      },
      priceRange: '€€',
      openingHours: 'Mo-Fr 09:00-18:00',
      currenciesAccepted: 'RON, EUR',
      paymentAccepted: 'Transfer bancar',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://acl-smartsoftware.ro/#website',
      url: 'https://acl-smartsoftware.ro',
      name: 'ACL Smart Software',
      publisher: { '@id': 'https://acl-smartsoftware.ro/#organization' },
      inLanguage: 'ro-RO',
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollToHash />
      <Hero />
      <RevealOnScroll>
        <About />
      </RevealOnScroll>
      <RevealOnScroll>
        <ServicesPreview />
      </RevealOnScroll>
      <RevealOnScroll>
        <Process />
      </RevealOnScroll>
      <RevealOnScroll>
        <Tech />
      </RevealOnScroll>
      <RevealOnScroll>
        <Contact />
      </RevealOnScroll>
    </>
  );
}
