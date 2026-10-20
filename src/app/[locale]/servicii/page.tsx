import ServicesExplorer from '@/components/sections/ServicesExplorer';
import { IntegrationMarquee } from '@/components/sections/Integrations';
import { getServices } from '@/data';
import ContactStrip from '@/components/sections/ContactStrip';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbDocument, localeAlternates, localePath, socialMetadata } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

const COPY = {
  ro: {
    title: 'Soluții — AI, automatizări și produse digitale',
    description: 'Site-uri, portaluri si SaaS, integrari API si asistenti AI pentru cereri, programari si magazine online. Consultanta, audit si mentenanta.',
    idx: 'SOLUȚII',
    hero: <>Construim software.<br /><em>Conectăm aplicații.</em></>,
    sub: 'Legăm plățile, facturarea, calendarul și magazinul tău, ca datele să circule singure. Plus site-uri, portaluri și asistenți AI.',
  },
  en: {
    title: 'Solutions — AI, automation and digital products',
    description: 'Websites, portals and SaaS, API integrations and AI assistants for enquiries, appointments and online stores. Consultation, audit and maintenance.',
    idx: 'SOLUTIONS',
    hero: <>We build software.<br /><em>We connect applications.</em></>,
    sub: 'We connect your payments, invoicing, calendar and store so data moves on its own. Plus websites, portals and AI assistants.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = locale === 'en' ? COPY.en : COPY.ro;
  return { title: t.title, description: t.description, alternates: localeAlternates('/servicii', locale),
    ...socialMetadata(locale, t.title, t.description, '/servicii') };
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = locale === 'en' ? COPY.en : COPY.ro;
  return <>
    <JsonLd data={breadcrumbDocument([{ name: locale === 'en' ? 'Home' : 'Acasă', path: localePath(locale, '/') },
      { name: locale === 'en' ? 'Solutions' : 'Soluții', path: localePath(locale, '/servicii') }])} />
    <header className="services-hero"><div className="wrap"><p className="eyebrow">{t.idx}</p><h1>{t.hero}</h1><p className="services-hero-intro">{t.sub}</p><IntegrationMarquee locale={locale} /></div></header>
    <section className="section services-list-section"><div className="wrap"><ServicesExplorer services={getServices(locale)} locale={locale} /></div></section>
    <ContactStrip />
  </>;
}
