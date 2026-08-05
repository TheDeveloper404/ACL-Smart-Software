import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { POSTS } from '@/data';
import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import InsightsGrid from './InsightsGrid';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbDocument, localeAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

const jsonLd = breadcrumbDocument([
  { name: 'Acasă', path: '/' },
  { name: 'Perspective', path: '/insights' },
]);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'ro') return {};
  return {
    title: 'Perspective — Articole Tehnice despre Software, AI & Arhitectură',
    description: 'Articole tehnice, perspective din producție și ghiduri practice de la echipa ACL Smart Software. AI, arhitectură, DevOps, mobile — fără SEO bait.',
    alternates: localeAlternates('/insights', locale, { enAvailable: false }),
    openGraph: {
      title: 'Perspective — Articole Tehnice despre Software & AI',
      description: 'Scriem despre ce învățăm în proiecte reale. AI, arhitectură, DevOps, mobile.',
      url: 'https://acl-smartsoftware.ro/insights',
      type: 'website',
    },
  };
}

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'ro') notFound();
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        idx="PERSPECTIVE"
        title={<>Articole pentru <em>oameni tehnici</em><br />și cei care îi conduc.</>}
        sub="Scriem despre ce învățăm — în proiecte reale, la prețul greu. Fără content marketing, fără SEO bait. Doar lucruri folositoare."
      />
      <InsightsGrid posts={POSTS} />
      <ContactStrip />
    </>
  );
}
