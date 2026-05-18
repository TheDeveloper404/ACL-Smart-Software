import { CASES } from '@/data';
import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import PortofoliuGrid from './PortofoliuGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portofoliu — Proiecte Software Livrate | ACL Smart Software',
  description: 'Studii de caz reale: software custom, aplicații web și mobile, AI, Cloud & DevOps pentru companii din România și UE. Metrici, stack-uri și lecții din producție.',
  alternates: { canonical: 'https://acl-smartsoftware.ro/portofoliu' },
  openGraph: {
    title: 'Portofoliu — Proiecte Software Livrate',
    description: 'Studii de caz reale cu metrici, stack-uri și lecții din producție.',
    url: 'https://acl-smartsoftware.ro/portofoliu',
    type: 'website',
  },
};

export default function PortofoliuPage() {
  return (
    <>
      <PageHero
        idx="PORTOFOLIU"
        title={<>Proiecte <em>realizate</em>. Rezultate <em>măsurabile</em>.</>}
        sub="Studii de caz reale — cu metrici, cu stack-uri și cu lecții. Pentru fiecare proiect arătăm ce am construit, cum și ce a ieșit."
      />
      <PortofoliuGrid cases={CASES} />
      <ContactStrip />
    </>
  );
}
