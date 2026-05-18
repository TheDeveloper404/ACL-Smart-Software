import Link from 'next/link';
import { SERVICES } from '@/data';
import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicii Software — Dezvoltare Web, Mobile, AI & DevOps',
  description: 'Software custom, aplicații web și mobile, AI & ML, Cloud & DevOps, integrări API, consultanță IT și mentenanță. Prețuri transparente, echipă din Petroșani.',
  alternates: { canonical: 'https://acl-smartsoftware.ro/servicii' },
  openGraph: {
    title: 'Servicii Software — ACL Smart Software',
    description: 'Software custom, aplicații web și mobile, AI & ML, Cloud & DevOps. Prețuri transparente.',
    url: 'https://acl-smartsoftware.ro/servicii',
    type: 'website',
  },
};

export default function ServiciiPage() {
  return (
    <>
      <PageHero
        idx="SERVICII"
        title={<>Opt servicii. <em>Un singur scop</em> — produsul tău să meargă.</>}
        sub="De la software custom la mentenanță 24/7, acoperim întreg ciclul unui produs digital. Click pe orice serviciu pentru detalii, tehnologii și preț de pornire."
      />
      <section className="section">
        <div className="wrap">
          <div className="services-index-grid">
            {SERVICES.map((s, i) => (
              <Link key={s.slug} href={`/servicii/${s.slug}`} className="services-index-card">
                <span className="svc-idx-arrow" aria-hidden="true">↗</span>
                <div className="num">/ {String(i + 1).padStart(2, '0')}</div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <div className="tags">
                  {s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
                <div className="price-from">de la <b>{s.pricing.from}</b> · {s.pricing.duration}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
