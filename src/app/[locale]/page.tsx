import { setRequestLocale } from 'next-intl/server';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Hero from '@/components/sections/Hero';
import ServicesPreview from '@/components/sections/ServicesPreview';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import JsonLd from '@/components/seo/JsonLd';
import type { Metadata } from 'next';
import { BASE, localeAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localeAlternates('', locale) };
}

function buildJsonLd(locale: string) {
  const isEn = locale === 'en';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASE}/#organization`,
        name: 'ACL Smart Software SRL',
        url: BASE,
        logo: `${BASE}/icon.svg`,
        email: 'office@acl-smartsoftware.ro',
        telephone: '+40758154490',
        description: isEn
          ? 'Software company based in Romania. We build custom software, web apps, AI features, automation and security audits.'
          : 'Firmă de software din Petroșani. Construim software la comandă, aplicații web, AI, automatizări și audituri de securitate.',
        sameAs: [],
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE}/#localbusiness`,
        name: 'ACL Smart Software SRL',
        url: BASE,
        telephone: '+40758154490',
        email: 'office@acl-smartsoftware.ro',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Str. Horea 2/31',
          addressLocality: 'Petroșani',
          addressRegion: 'Hunedoara',
          addressCountry: 'RO',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 45.4103, longitude: 23.3700 },
        priceRange: '€€',
        openingHours: 'Mo-Fr 09:00-18:00',
        currenciesAccepted: 'RON, EUR',
        paymentAccepted: 'Transfer bancar',
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE}/#website`,
        url: BASE,
        name: 'ACL Smart Software',
        publisher: { '@id': `${BASE}/#organization` },
        inLanguage: isEn ? 'en-US' : 'ro-RO',
      },
    ],
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={buildJsonLd(locale)} />
      <Hero />
      <FeaturedProjects />
      <RevealOnScroll>
        <ServicesPreview />
      </RevealOnScroll>
      <RevealOnScroll>
        <Process />
      </RevealOnScroll>
      <RevealOnScroll>
        <Contact />
      </RevealOnScroll>
    </>
  );
}
