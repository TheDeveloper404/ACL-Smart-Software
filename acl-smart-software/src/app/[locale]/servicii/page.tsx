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
    title: 'Servicii Software — Pachete cu Preț Fix: Web, SaaS, AI, DevOps',
    description: 'Patru arii, pachete productizate cu scope fix, durată și preț „de la": produse & aplicații la comandă, AI & automatizare, infrastructură & integrări, consultanță & preluare.',
    ogTitle: 'Servicii Software — ACL Smart Software',
    ogDescription: 'Pachete cu scope fix și preț de pornire transparent: produse la comandă, AI & automatizare, infrastructură & integrări, consultanță.',
    heroTitle: <>Patru arii. <em>Pachete cu preț fix</em>, nu „cere ofertă”.</>,
    heroSub: 'Fiecare pachet are scope definit, durată și preț de pornire. Alege aria potrivită și vezi ce include fiecare pachet, ce primești la final și în cât timp.',
    from: 'de la',
  },
  en: {
    title: 'Software Services — Fixed-Price Packages: Web, SaaS, AI, DevOps',
    description: 'Four areas, productized packages with fixed scope, timeline, and a "from" price: custom products & apps, AI & automation, infrastructure & integrations, consulting & takeover.',
    ogTitle: 'Software Services — ACL Smart Software',
    ogDescription: 'Fixed-scope packages with a transparent starting price: custom products, AI & automation, infrastructure & integrations, consulting.',
    heroTitle: <>Four areas. <em>Fixed-price packages</em>, not “request a quote”.</>,
    heroSub: 'Every package has a defined scope, a timeline, and a starting price. Pick the right area and see what each package includes, what you get at the end, and how long it takes.',
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
