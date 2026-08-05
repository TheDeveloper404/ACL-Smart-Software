import { getCases } from '@/data';
import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import PortofoliuGrid from './PortofoliuGrid';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbDocument, localeAlternates, localePath } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

const COPY = {
  ro: {
    title: 'Portofoliu — Proiecte Software Livrate | ACL Smart Software',
    description: 'Studii de caz reale: software custom, aplicații web și mobile, AI, Cloud & DevOps pentru companii din România și UE. Metrici, stack-uri și lecții din producție.',
    ogTitle: 'Portofoliu — Proiecte Software Livrate',
    ogDescription: 'Studii de caz reale cu metrici, stack-uri și lecții din producție.',
    heroTitle: <>Proiecte <em>realizate</em>. Rezultate <em>măsurabile</em>.</>,
    heroSub: 'Studii de caz reale — cu metrici, cu stack-uri și cu lecții. Pentru fiecare proiect arătăm ce am construit, cum și ce a ieșit.',
  },
  en: {
    title: 'Portfolio — Delivered Software Projects | ACL Smart Software',
    description: 'Real case studies: custom software, web and mobile apps, AI, Cloud & DevOps for companies across Romania and the EU. Metrics, tech stacks, and lessons from production.',
    ogTitle: 'Portfolio — Delivered Software Projects',
    ogDescription: 'Real case studies with metrics, tech stacks, and lessons from production.',
    heroTitle: <>Projects <em>delivered</em>. Results <em>measured</em>.</>,
    heroSub: 'Real case studies — with metrics, tech stacks, and lessons learned. For each project, we show what we built, how, and what came out of it.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.ro;
  const url = `https://acl-smartsoftware.ro${locale === 'en' ? '/en' : ''}/portofoliu`;
  return {
    title: copy.title,
    description: copy.description,
    alternates: localeAlternates('/portofoliu', locale),
    openGraph: { title: copy.ogTitle, description: copy.ogDescription, url, type: 'website' },
  };
}

export default async function PortofoliuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.ro;
  const cases = getCases(locale);
  const jsonLd = breadcrumbDocument([
    { name: locale === 'en' ? 'Home' : 'Acasă', path: localePath(locale, '/') },
    { name: locale === 'en' ? 'Portfolio' : 'Portofoliu', path: localePath(locale, '/portofoliu') },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        idx="PORTOFOLIU"
        title={copy.heroTitle}
        sub={copy.heroSub}
      />
      <PortofoliuGrid cases={cases} labels={locale === 'en' ? { done: '✓ Delivered', link: 'View live site →' } : undefined} />
      <ContactStrip />
    </>
  );
}
