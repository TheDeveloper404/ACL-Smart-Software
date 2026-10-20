import ServicesExplorer from '@/components/sections/ServicesExplorer';
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
    hero: <>Construim software.<br /><em>Conectam aplicatii.</em></>,
    sub: 'Site-uri, aplicatii web si SaaS. Integrari care elimina pasii manuali. Asistenti AI pentru clienti. Consultanta si suport pentru ce ai deja.',
  },
  en: {
    title: 'Solutions — AI, automation and digital products',
    description: 'Websites, portals and SaaS, API integrations and AI assistants for enquiries, appointments and online stores. Consultation, audit and maintenance.',
    idx: 'SOLUTIONS',
    hero: <>We build software.<br /><em>We connect applications.</em></>,
    sub: 'Websites, web applications and SaaS. Integrations that remove manual steps. AI assistants for customers. Consultation and support for what you already have.',
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
    <header className="services-hero"><div className="wrap"><p className="eyebrow">{t.idx}</p><h1>{t.hero}</h1><p className="services-hero-intro">{t.sub}</p></div></header>
    <section className="section services-list-section"><div className="wrap"><ServicesExplorer services={getServices(locale)} locale={locale} /></div></section>
    <ContactStrip />
  </>;
}
