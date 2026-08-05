import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import type { ReactNode } from 'react';
import { SERVICES, getServiceBySlug } from '@/data';
import ContactStrip from '@/components/sections/ContactStrip';
import FaqAccordion from './FaqAccordion';
import WhatWeBuild from './WhatWeBuild';
import JsonLd from '@/components/seo/JsonLd';
import { BASE, ORG_ID, ORGANIZATION_NODE, breadcrumbJsonLd, localeAlternates, localePath } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

const TITLE_DISPLAY: Record<string, Record<string, ReactNode>> = {
  ro: {
    'software-custom':   <>Dezvoltare <em>Software</em> la comandă</>,
    'aplicatii-web':     <>Aplicații <em>Web</em> și Creare <em>website-uri</em></>,
    'aplicatii-mobile':  <>Aplicații <em>Mobile</em></>,
    'ai-ml':             <><em>AI</em> / Machine Learning</>,
    'cloud-devops':      <>Cloud <em>& DevOps</em></>,
    'integrari-api':     <>Integrări <em>& API-uri</em></>,
    'consultanta-it':    <>Consultanță <em>IT</em></>,
    'mentenanta-suport': <>Mentenanță <em>& Suport</em></>,
  },
  en: {
    'software-custom':   <>Custom <em>Software</em> Development</>,
    'aplicatii-web':     <>Web <em>Apps</em> & Website <em>Development</em></>,
    'aplicatii-mobile':  <><em>Mobile</em> Apps</>,
    'ai-ml':             <><em>AI</em> / Machine Learning</>,
    'cloud-devops':      <>Cloud <em>& DevOps</em></>,
    'integrari-api':     <>Integrations <em>& APIs</em></>,
    'consultanta-it':    <>IT <em>Consulting</em></>,
    'mentenanta-suport': <>Maintenance <em>& Support</em></>,
  },
};

const COPY = {
  ro: {
    back: '← Servicii', startingPrice: 'Preț de pornire', timeline: 'Timeline', model: 'Model', term: 'Termen',
    cta: 'Discutăm proiectul →', build: 'Ce', buildEm: 'construim', fit: 'Cui se', fitEm: 'potrivește',
    faq: 'Întrebări', faqEm: 'frecvente', area: 'România',
  },
  en: {
    back: '← Services', startingPrice: 'Starting price', timeline: 'Timeline', model: 'Model', term: 'Term',
    cta: 'Let’s talk about your project →', build: 'What we', buildEm: 'build', fit: 'Who it’s', fitEm: 'for',
    faq: 'Frequently asked', faqEm: 'questions', area: 'Romania',
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
  const url = `${BASE}${localePath(locale, `/servicii/${slug}`)}`;
  const suffix = locale === 'en' ? ' — Software Services | ACL Smart Software' : ' — Servicii Software | ACL Smart Software';
  return {
    title: `${svc.title}${suffix}`,
    description: svc.short,
    alternates: localeAlternates(`/servicii/${slug}`, locale),
    openGraph: {
      title: `${svc.title} — ACL Smart Software`,
      description: svc.short,
      url,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const svc = getServiceBySlug(locale, slug);
  if (!svc) notFound();
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.ro;
  const titleDisplay = TITLE_DISPLAY[locale] ?? TITLE_DISPLAY.ro;

  const allTechItems = svc.technologies.flatMap(cat => cat.items);
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
        { name: locale === 'en' ? 'Services' : 'Servicii', path: localePath(locale, '/servicii') },
        { name: svc.title, path: localePath(locale, `/servicii/${slug}`) },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <header className="svc-detail-hero">
        <div className="grid-bg" aria-hidden="true" />
        <div className="wrap">
          <Link href="/servicii" className="svc-back">{copy.back}</Link>
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
              <div className="from">{copy.startingPrice}</div>
              <div className="price">{svc.pricing.from}</div>
              <div className="meta">
                <div className="meta-row">
                  <span className="k">{copy.timeline}</span>
                  <span className="v">{svc.timeline}</span>
                </div>
                <div className="meta-row">
                  <span className="k">{copy.model}</span>
                  <span className="v">{svc.pricing.model}</span>
                </div>
                <div className="meta-row">
                  <span className="k">{copy.term}</span>
                  <span className="v">{svc.pricing.duration}</span>
                </div>
              </div>
              <Link href="/#contact" className="cta">
                {copy.cta}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="svc-section">
        <div className="wrap">
          <div className="svc-section-head">
            <div className="idx">01</div>
            <h2>{copy.build} <em>{copy.buildEm}</em></h2>
          </div>
          <WhatWeBuild items={svc.whatWeBuild} />
        </div>
      </section>

      <section className="svc-section">
        <div className="wrap">
          <div className="svc-section-head">
            <div className="idx">02</div>
            <h2>{copy.fit} <em>{copy.fitEm}</em></h2>
          </div>
          <div className="audience-list">
            {svc.audience.map((a, i) => (
              <div key={a.title} className="audience-item">
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
            <div className="idx">03</div>
            <h2>{copy.faq} <em>{copy.faqEm}</em></h2>
          </div>
          <FaqAccordion items={svc.faq} />
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
