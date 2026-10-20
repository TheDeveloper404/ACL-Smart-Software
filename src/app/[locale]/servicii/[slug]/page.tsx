import { notFound } from 'next/navigation';
import { offerPrice } from '@/lib/offer';
import { Link } from '@/i18n/navigation';
import type { ReactNode } from 'react';
import { SERVICES, getCases, getServiceBySlug } from '@/data';
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
    'ai':             <>Integrari API <em>si asistenti AI</em></>,
    'consultanta':    <>Consultanță, audit <em>și mentenanță</em></>,
  },
  en: {
    'produse':        <>Websites, portals <em>and SaaS</em></>,
    'ai':             <>API integrations <em>and AI assistants</em></>,
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
  const en = locale === 'en';
  const packageGroups = slug === 'ai' ? [
    { title: en ? 'API integrations and automation' : 'Integrari API si automatizari', packages: svc.packages.slice(0, 1) },
    { title: en ? 'AI assistants' : 'Asistenti AI', packages: svc.packages.slice(1) },
  ] : [{ title: '', packages: svc.packages }];

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
          <Link href={`/servicii#solution-${svc.slug}`} className="svc-back">{copy.back}</Link>
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
              <div className="from">{slug === 'ai' ? (en ? 'Implementation' : 'Implementare') : slug === 'consultanta' ? (en ? 'Security audit from' : 'Audit de securitate de la') : copy.startingPrice}</div>
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
              <p className="svc-price-note">{slug === 'ai' ? (en ? 'We check existing solutions before quoting the implementation. Subscriptions and recurring costs are identified separately.' : 'Verificam solutiile existente inainte sa estimam implementarea. Abonamentele si costurile recurente sunt identificate separat.') : en ? 'Indicative starting price. Final scope and recurring costs are agreed separately.' : 'Preț de pornire orientativ. Scopul final și costurile recurente se stabilesc separat.'}</p>
            </div>
          </div>
        </div>
      </header>

      {slug === 'consultanta' && <AuditCoverage locale={locale} />}

      {slug === 'ai' && <section className="svc-section integration-explainer" aria-labelledby="integration-explainer-title"><div className="wrap">
        <div className="section-heading"><div><p className="eyebrow">{en ? 'Two different roles' : 'Doua roluri diferite'}</p>
          <h2 id="integration-explainer-title">{en ? 'What APIs do.' : 'Ce face API-ul.'}<br /><em>{en ? 'What AI does.' : 'Ce face AI-ul.'}</em></h2></div>
          <p>{en ? 'A solution can use both. We choose the tools around the steps you need to complete.' : 'O solutie le poate folosi pe ambele. Alegem instrumentele in functie de pasii pe care vrei sa ii rezolvi.'}</p></div>
        <dl className="integration-roles">
          <div><dt>{en ? 'API integrations and automation' : 'Integrari API si automatizari'}</dt><dd>{en ? 'An API lets applications exchange data and perform actions. Automation runs the agreed steps when an event occurs, such as a confirmed payment.' : 'API-ul permite aplicatiilor sa schimbe date si sa execute actiuni. Automatizarea porneste pasii stabiliti cand apare un eveniment, cum ar fi o plata confirmata.'}</dd></div>
          <div><dt>{en ? 'AI assistants' : 'Asistenti AI'}</dt><dd>{en ? 'AI interprets what the customer writes, asks for missing details and responds using the information available. Connected tools carry out the agreed actions.' : 'AI-ul interpreteaza ce scrie clientul, cere detaliile lipsa si raspunde folosind informatiile disponibile. Instrumentele conectate executa actiunile stabilite.'}</dd></div>
        </dl>
        <div className="integration-example"><h3>{en ? 'Example: from a message to a booking' : 'Exemplu: de la mesaj la programare'}</h3>
          <ol className="integration-flow">
            <li><span>01 / {en ? 'Customer' : 'Client'}</span><p>{en ? 'I would like an appointment on Friday afternoon.' : 'As dori o programare vineri dupa-amiaza.'}</p></li>
            <li><span>02 / AI</span><p>{en ? 'Identifies the service and asks for the details needed to book.' : 'Identifica serviciul dorit si cere detaliile necesare programarii.'}</p></li>
            <li><span>03 / API</span><p>{en ? 'Checks available slots and saves the appointment after confirmation.' : 'Verifica intervalele disponibile si salveaza programarea dupa confirmare.'}</p></li>
          </ol>
        </div>
      </div></section>}

      <section className="svc-section">
        <div className="wrap">
          <div className="svc-section-head">
            <div className="idx">01</div>
            <h2>{slug === 'ai' ? (en ? 'Three services.' : 'Trei servicii.') : copy.packages} <em>{slug === 'ai' ? (en ? 'Clear deliverables.' : 'Livrabile clare.') : copy.packagesEm}</em></h2>
          </div>
          {packageGroups.map(group => <div className="svc-offer-group" key={group.title}>
          {group.title && <h3 className="svc-offer-group-title">{group.title}</h3>}
          <div className="pkg-grid">
            {group.packages.map((pkg) => (
              <article className="pkg-card rise" id={pkg.id} key={pkg.id}>
                <div className="pkg-card-head">
                  {group.title ? <h4>{pkg.name}</h4> : <h3>{pkg.name}</h3>}
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
          </div>)}
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

      {slug === 'ai' && <section className="svc-section" aria-labelledby="integration-projects-title"><div className="wrap">
        <div className="svc-section-head"><div className="idx">04</div><h2 id="integration-projects-title">{en ? 'Integrations from' : 'Integrari din'} <em>{en ? 'our portfolio' : 'portofoliul nostru'}</em></h2></div>
        <div className="integration-projects">{getCases(locale).filter(project => ['flotapro', 'itcustom'].includes(project.slug)).map(project => <article key={project.slug}>
          <p className="eyebrow">{project.label}</p><h3>{project.title}</h3><p>{project.desc}</p>
          <Link href={`/portofoliu#proiect-${project.slug}`} className="text-link">{en ? 'View the project' : 'Vezi proiectul'} →</Link>
        </article>)}</div>
      </div></section>}

      <section className="svc-section">
        <div className="wrap">
          <div className="svc-section-head">
            <div className="idx">{slug === 'ai' ? '05' : '04'}</div>
            <h2>{copy.faq} <em>{copy.faqEm}</em></h2>
          </div>
          <FaqAccordion items={svc.faq} />
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
