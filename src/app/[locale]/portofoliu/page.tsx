import { getCases } from '@/data';
import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import PortofoliuGrid from './PortofoliuGrid';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbDocument, localeAlternates, localePath, socialMetadata } from '@/lib/seo';
import { orderedProjects } from '@/lib/project-selection';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

const COPY = {
  ro: {
    title: 'Portofoliu — Proiecte Software Livrate | ACL Smart Software',
    description: 'Site-uri, portaluri, produse SaaS și comunități online construite de ACL Smart Software. Proiecte reale și nevoile pentru care au fost dezvoltate.',
    ogTitle: 'Portofoliu — Proiecte Software Livrate',
    ogDescription: 'Proiecte reale: site-uri, portaluri și produse digitale.',
    heroTitle: <>Idei devenite<br /><em>produse reale.</em></>,
    heroSub: 'Fiecare proiect pornește de la o nevoie. Iată ce am construit pentru companii, comunități și instituții.',
  },
  en: {
    title: 'Portfolio — Delivered Software Projects | ACL Smart Software',
    description: 'Websites, portals, SaaS products and online communities built by ACL Smart Software. Real projects and the needs they were developed for.',
    ogTitle: 'Portfolio — Delivered Software Projects',
    ogDescription: 'Real projects: websites, portals and digital products.',
    heroTitle: <>Ideas turned into<br /><em>real products.</em></>,
    heroSub: 'Every project starts with a need. Here is what we built for businesses, communities and institutions.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.ro;
  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: localeAlternates('/portofoliu', locale),
    ...socialMetadata(locale, copy.ogTitle, copy.ogDescription, '/portofoliu'),
  };
}

export default async function PortofoliuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.ro;
  const jsonLd = breadcrumbDocument([
    { name: locale === 'en' ? 'Home' : 'Acasă', path: localePath(locale, '/') },
    { name: locale === 'en' ? 'Portfolio' : 'Portofoliu', path: localePath(locale, '/portofoliu') },
  ]);
  return <>
    <JsonLd data={jsonLd} />
    <PageHero idx={locale === 'en' ? 'PORTFOLIO' : 'PORTOFOLIU'} title={copy.heroTitle} sub={copy.heroSub} />
    <PortofoliuGrid cases={orderedProjects(getCases(locale))} labels={locale === 'en' ? { done: 'Delivered', link: 'View project' } : undefined} />
    <ContactStrip />
  </>;
}
