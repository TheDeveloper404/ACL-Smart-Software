import { Link } from '@/i18n/navigation';
import { getServices } from '@/data';
import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbDocument, localeAlternates, localePath } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

const COPY = {
  ro: {
    title: 'Servicii Software — Dezvoltare Web, Mobile, AI & DevOps',
    description: 'Software custom, aplicații web și mobile, AI & ML, Cloud & DevOps, integrări API, consultanță IT și mentenanță. Prețuri transparente.',
    ogTitle: 'Servicii Software — ACL Smart Software',
    ogDescription: 'Software custom, aplicații web și mobile, AI & ML, Cloud & DevOps. Prețuri transparente.',
    heroTitle: <>Opt servicii. <em>Un singur scop</em> — produsul tău să meargă.</>,
    heroSub: 'De la software custom la mentenanță 24/7, acoperim întreg ciclul unui produs digital. Click pe orice serviciu pentru detalii, tehnologii și preț de pornire.',
    from: 'de la',
  },
  en: {
    title: 'Software Services — Web, Mobile, AI & DevOps Development',
    description: 'Custom software, web and mobile apps, AI & ML, Cloud & DevOps, API integrations, IT consulting and maintenance. Transparent pricing.',
    ogTitle: 'Software Services — ACL Smart Software',
    ogDescription: 'Custom software, web and mobile apps, AI & ML, Cloud & DevOps. Transparent pricing.',
    heroTitle: <>Eight services. <em>One goal</em> — your product works.</>,
    heroSub: 'From custom software to 24/7 maintenance, we cover the full lifecycle of a digital product. Click any service for details, tech stack, and starting price.',
    from: 'from',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.ro;
  const url = `https://acl-smartsoftware.ro${locale === 'en' ? '/en' : ''}/servicii`;
  return {
    title: copy.title,
    description: copy.description,
    alternates: localeAlternates('/servicii', locale),
    openGraph: { title: copy.ogTitle, description: copy.ogDescription, url, type: 'website' },
  };
}

export default async function ServiciiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.ro;
  const services = getServices(locale);
  const jsonLd = breadcrumbDocument([
    { name: locale === 'en' ? 'Home' : 'Acasă', path: localePath(locale, '/') },
    { name: locale === 'en' ? 'Services' : 'Servicii', path: localePath(locale, '/servicii') },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        idx="SERVICII"
        title={copy.heroTitle}
        sub={copy.heroSub}
      />
      <section className="section">
        <div className="wrap">
          <div className="services-index-grid">
            {services.map((s, i) => (
              <Link key={s.slug} href={`/servicii/${s.slug}`} className="services-index-card">
                <span className="svc-idx-arrow" aria-hidden="true">↗</span>
                <div className="num">/ {String(i + 1).padStart(2, '0')}</div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <div className="tags">
                  {s.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
                <div className="price-from">{copy.from} <b>{s.pricing.from}</b> · {s.pricing.duration}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
