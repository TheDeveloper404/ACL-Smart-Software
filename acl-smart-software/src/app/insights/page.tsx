import { POSTS } from '@/data';
import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import InsightsGrid from './InsightsGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perspective — Articole Tehnice despre Software, AI & Arhitectură',
  description: 'Articole tehnice, perspective din producție și ghiduri practice de la echipa ACL Smart Software. AI, arhitectură, DevOps, mobile — fără SEO bait.',
  alternates: { canonical: 'https://acl-smartsoftware.ro/insights' },
  openGraph: {
    title: 'Perspective — Articole Tehnice despre Software & AI',
    description: 'Scriem despre ce învățăm în proiecte reale. AI, arhitectură, DevOps, mobile.',
    url: 'https://acl-smartsoftware.ro/insights',
    type: 'website',
  },
};

export default function InsightsPage() {
  return (
    <>
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
