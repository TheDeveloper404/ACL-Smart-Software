import { notFound } from 'next/navigation';
import { offerPrice } from '@/lib/offer';
import { Link } from '@/i18n/navigation';
import type { ReactNode } from 'react';
import { SERVICES, getServiceBySlug } from '@/data';
import ContactStrip from '@/components/sections/ContactStrip';
import FaqAccordion from './FaqAccordion';
import WhatWeBuild from './WhatWeBuild';
import AuditCoverage from '@/components/sections/AuditCoverage';
import JsonLd from '@/components/seo/JsonLd';
import { BASE, ORG_ID, ORGANIZATION_NODE, breadcrumbJsonLd, localeAlternates, localePath, socialMetadata } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

const TITLE_DISPLAY: Record<string, Record<string, ReactNode>> = {
  ro: {
    'produse':        <>Site-uri, portaluri <em>și SaaS</em></>,
    'ai':             <><em>AI</em> în aplicația ta</>,
    'infrastructura': <>Automatizări <em>și integrări</em></>,
    'consultanta':    <>Consultanță, audit <em>și mentenanță</em></>,
  },
  en: {
    'produse':        <>Websites, portals <em>and SaaS</em></>,
    'ai':             <><em>AI</em> in your application</>,
    'infrastructura': <>Automation <em>and integrations</em></>,
    'consultanta':    <>Consultation, audit <em>and maintenance</em></>,
  },
};

const COPY = {
  ro: {
    back: '← Soluții', startingPrice: 'Preț de pornire', timeline: 'Durată estimată', model: 'Colaborare', term: 'Estimare',
    cta: 'Discutăm proiectul →', pkgCta: 'Cere ofertă', build: 'Ce', buildEm: 'construim', fit: 'Cui se', fitEm: 'potrivește',
    faq: 'Întrebări', faqEm: 'frecvente', area: 'România',
    packages: 'Pachete', packagesEm: 'și livrabile', includes: 'Include', deliverable: 'Primești', from: 'de la',
  },
  en: {
    back: '← Solutions', startingPrice: 'Starting price', timeline: 'Timeline', model: 'Model', term: 'Term',
    cta: 'Let’s talk about your project →', pkgCta: 'Request a quote', build: 'What we', buildEm: 'build', fit: 'Who it’s', fitEm: 'for',
    faq: 'Frequently asked', faqEm: 'questions', area: 'Romania',
    packages: 'Packages', packagesEm: '& deliverables', includes: 'Includes', deliverable: 'You get', from: 'from',
  },
};

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const svc = getServiceBySlug(locale, slug);
  if (!svc) return {};
  const suffix = locale === 'en' ? ' — Software Solutions | ACL Smart Software' : ' — Soluții Software | ACL Smart Software';
  return {
    title: { absolute: `${svc.title}${suffix}` },
    description: svc.short,
    alternates: localeAlternates(`/servicii/${slug}`, locale),
    ...socialMetadata(locale, `${svc.title} — ACL Smart Software`, svc.short, `/servicii/${slug}`),
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const svc = getServiceBySlug(locale, slug);
  if (!svc) notFound();
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.ro;
  const titleDisplay = TITLE_DISPLAY[locale] ?? TITLE_DISPLAY.ro;

  const allTechItems = svc.tags;
  const url = `${BASE}${localePath(locale, `/servicii/${slug}`)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_NODE,
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: svc.title,
        description: svc.longDesc,
        url,
        serviceType: svc.title,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'Country', name: copy.area },
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: url,
        },
        // Pachetele productizate, expuse ca OfferCatalog — pot apărea cu preț în SERP.
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: svc.title,
          itemListElement: svc.packages.map((pkg) => ({
            '@type': 'Offer',
            name: pkg.name,
            description: pkg.deliverable,
            ...(offerPrice(pkg.from) ? { priceCurrency: 'EUR', price: offerPrice(pkg.from) } : {}),
            url: `${url}#${pkg.id}`,
          })),
        },
      },
      // FAQ-ul e conținut real, deja afișat pe pagină de FaqAccordion — îl expunem
      // și structurat, ca să poată apărea ca rich result în SERP.
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: svc.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      breadcrumbJsonLd([
        { name: locale === 'en' ? 'Home' : 'Acasă', path: localePath(locale, '/') },
        { name: locale === 'en' ? 'Solutions' : 'Soluții', path: localePath(locale, '/servicii') },
        { name: svc.title, path: localePath(locale, `/servicii/${slug}`) },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <header className={`svc-detail-hero${slug === 'consultanta' ? ' audit-hero' : ''}`}>
        <div className="grid-bg" aria-hidden="true" />
        <div className="wrap">
          <Link href={`/servicii?solutie=${svc.slug}`} className="svc-back">{copy.back}</Link>
          <div className="svc-hero-grid">
            <div>
              <h1 className="svc-hero-title">
                {titleDisplay[svc.slug] ?? svc.title}
              </h1>
              <div className="svc-tech-pills">
                {allTechItems.map(tech => (
                  <span className="svc-tech-pill" key={tech}>{tech}</span>
                ))}
              </div>
              <p className="svc-hero-tagline">{svc.tagline}</p>
              <p className="svc-hero-desc">{svc.longDesc}</p>
              <p className="svc-hero-desc svc-hero-desc-extra">{svc.short}</p>
            </div>
            <div className="svc-pricing-card">
              <div className="from">{slug === 'consultanta' ? (locale === 'en' ? 'Security audit from' : 'Audit de securitate de la') : copy.startingPrice}</div>
              <div className="price">{slug === 'consultanta' ? svc.packages[0].from : svc.pricing.from}</div>
              <div className="meta">
                <div className="meta-row">
                  <span className="k">{copy.timeline}</span>
                  <span className="v">{slug === 'consultanta' ? svc.packages[0].duration : svc.timeline}</span>
                </div>
                <div className="meta-row">
                  <span className="k">{copy.model}</span>
                  <span className="v">{slug === 'consultanta' ? svc.packages[0].model : svc.pricing.model}</span>
                </div>
                <div className="meta-row">
                  <span className="k">{copy.term}</span>
                  <span className="v">{slug === 'consultanta' ? (locale === 'en' ? 'Agreed scope' : 'Perimetru agreat') : svc.pricing.duration}</span>
                </div>
              </div>
              <Link href="/#contact" className="cta">
                {copy.cta}
              </Link>
              <p className="svc-price-note">{locale === 'en' ? 'Indicative starting price. Final scope and recurring costs are agreed separately.' : 'Preț de pornire orientativ. Scopul final și costurile recurente se stabilesc separat.'}</p>
            </div>
          </div>
        </div>
      </header>

      {slug === 'consultanta' && <AuditCoverage locale={locale} />}

      <section className="svc-section">
        <div className="wrap">
          <div className="svc-section-head">
            <div className="idx">01</div>
            <h2>{copy.packages} <em>{copy.packagesEm}</em></h2>
          </div>
          <div className="pkg-grid">
            {svc.packages.map((pkg) => (
              <article className="pkg-card rise" id={pkg.id} key={pkg.id}>
                <div className="pkg-card-head">
                  <h3>{pkg.name}</h3>
                  <div className="pkg-price">{offerPrice(pkg.from) && <span className="pkg-from">{copy.from}</span>} {pkg.from}</div>
                </div>
                <div className="pkg-meta">
                  <span className="pkg-chip">{pkg.duration}</span>
                  <span className="pkg-chip">{pkg.model}</span>
                </div>
                <div className="pkg-includes">
                  <div className="pkg-label">{copy.includes}</div>
                  <ul>
                    {pkg.includes.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
                <p className="pkg-price-scope">{pkg.priceNote}</p>
                <p className="pkg-deliverable">
                  <span className="pkg-label">{copy.deliverable}</span> {pkg.deliverable}
                </p>
                <Link href="/#contact" className="pkg-cta">{copy.pkgCta} <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-section">
        <div className="wrap">
          <div className="svc-section-head">
            <div className="idx">02</div>
            <h2>{copy.build} <em>{copy.buildEm}</em></h2>
          </div>
          <WhatWeBuild items={svc.whatWeBuild} />
        </div>
      </section>

      <section className="svc-section">
        <div className="wrap">
          <div className="svc-section-head">
            <div className="idx">03</div>
            <h2>{copy.fit} <em>{copy.fitEm}</em></h2>
          </div>
          <div className="audience-list">
            {svc.audience.map((a, i) => (
              <div key={a.title} className="audience-item rise">
                <div className="a-num">{String(i + 1).padStart(2, '0')}</div>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-section">
        <div className="wrap">
          <div className="svc-section-head">
            <div className="idx">04</div>
            <h2>{copy.faq} <em>{copy.faqEm}</em></h2>
          </div>
          <FaqAccordion items={svc.faq} />
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
