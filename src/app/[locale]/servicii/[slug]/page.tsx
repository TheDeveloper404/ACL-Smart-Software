import { notFound } from 'next/navigation';
import { offerPrice } from '@/lib/offer';
import { Link } from '@/i18n/navigation';
import type { ReactNode } from 'react';
import { SERVICES, getCases, getServiceBySlug } from '@/data';
import ContactStrip from '@/components/sections/ContactStrip';
import FaqAccordion from './FaqAccordion';
import AuditCoverage from '@/components/sections/AuditCoverage';
import { FlowStrip, IntegrationCatalog, StackCatalog, type FlowStep } from '@/components/sections/Integrations';
import MotionSurface from '@/components/ui/MotionSurface';
import JsonLd from '@/components/seo/JsonLd';
import { BASE, ORG_ID, ORGANIZATION_NODE, breadcrumbJsonLd, localeAlternates, localePath, socialMetadata } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

const TITLE_DISPLAY: Record<string, Record<string, ReactNode>> = {
  ro: {
    'produse':        <>Site-uri, portaluri <em>și SaaS</em></>,
    'ai':             <>Integrări API <em>și asistenți AI</em></>,
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
    cta: 'Discutăm proiectul →', pkgCta: 'Cere ofertă', build: 'Cu ce', buildEm: 'construim', flows: 'Cum arată', flowsEm: 'în practică',
    faq: 'Întrebări', faqEm: 'frecvente', area: 'România',
    packages: 'Pachete', packagesEm: 'și livrabile', includes: 'Include', deliverable: 'Primești', from: 'de la',
    quoteNote: 'Prețul se stabilește în funcție de complexitate, după ce clarificăm câteva detalii.',
  },
  en: {
    back: '← Solutions', startingPrice: 'Starting price', timeline: 'Timeline', model: 'Model', term: 'Term',
    cta: 'Let’s talk about your project →', pkgCta: 'Request a quote', build: 'What we', buildEm: 'build with', flows: 'How it works', flowsEm: 'in practice',
    faq: 'Frequently asked', faqEm: 'questions', area: 'Romania',
    packages: 'Packages', packagesEm: '& deliverables', includes: 'Includes', deliverable: 'You get', from: 'from',
    quoteNote: 'The price depends on complexity and is set once we clarify a few details.',
  },
};

// Câte trei exemple concrete per categorie, în locul descrierilor generale.
const DETAIL_FLOWS: Record<string, Record<string, { title: string; steps: FlowStep[] }[]>> = {
  ro: {
    ai: [
      { title: 'De la plată la factură', steps: [{ tool: 'Stripe', text: 'Plata e confirmată în site' }, { tool: 'SmartBill', text: 'Factura se emite automat' }, { tool: 'Email', text: 'Factura ajunge la client' }] },
      { title: 'De la mesaj la programare', steps: [{ tool: 'WhatsApp', text: '„Aș vrea o programare vineri”' }, { tool: 'AI', text: 'Află serviciul și ora potrivită' }, { tool: 'Google Calendar', text: 'Programarea e salvată' }] },
      { title: 'Ajutor direct în magazin', steps: [{ tool: 'WooCommerce', text: '„Caut un cadou până în 200 lei”' }, { tool: 'AI', text: 'Caută în catalog și în stoc' }, { tool: 'Răspuns', text: 'Produse recomandate, cu link de comandă' }] },
    ],
    produse: [
      { title: 'Site de prezentare', steps: [{ tool: 'Google', text: 'Clientul te găsește' }, { tool: 'Site', text: 'Vede ce faci, pe telefon sau desktop' }, { tool: 'Formular', text: 'Cererea lui ajunge pe email' }] },
      { title: 'Portal pentru utilizatori', steps: [{ tool: 'Cont', text: 'Utilizatorul se autentifică' }, { tool: 'Cerere', text: 'Trimite o cerere sau un document' }, { tool: 'Admin', text: 'Echipa o vede și răspunde' }] },
      { title: 'Produs SaaS', steps: [{ tool: 'Înregistrare', text: 'Clientul își face cont' }, { tool: 'Stripe', text: 'Plătește abonamentul' }, { tool: 'Acces', text: 'Folosește produsul imediat' }] },
    ],
    consultanta: [
      { title: 'Audit de securitate', steps: [{ tool: 'Perimetru', text: 'Stabilim ce verificăm' }, { tool: 'OWASP', text: 'Testăm autentificarea, accesul și datele' }, { tool: 'Raport', text: 'Probleme cu dovezi și priorități' }] },
      { title: 'Mentenanță', steps: [{ tool: 'Actualizări', text: 'Verificări periodice' }, { tool: 'Erori', text: 'Remediate în limita pachetului' }, { tool: 'Progres', text: 'Știi ce s-a făcut' }] },
      { title: 'Consultanță', steps: [{ tool: 'Obiective', text: 'Utilizatori, buget, priorități' }, { tool: 'Analiză', text: 'Ideea sau aplicația existentă' }, { tool: 'Plan', text: 'Ce construim și în ce ordine' }] },
    ],
  },
  en: {
    ai: [
      { title: 'From payment to invoice', steps: [{ tool: 'Stripe', text: 'Payment confirmed on the website' }, { tool: 'SmartBill', text: 'Invoice issued automatically' }, { tool: 'Email', text: 'The invoice reaches the customer' }] },
      { title: 'From message to appointment', steps: [{ tool: 'WhatsApp', text: '“I’d like an appointment on Friday”' }, { tool: 'AI', text: 'Finds the right service and time' }, { tool: 'Google Calendar', text: 'The appointment is saved' }] },
      { title: 'Help inside your store', steps: [{ tool: 'WooCommerce', text: '“Looking for a gift under €40”' }, { tool: 'AI', text: 'Searches the catalog and stock' }, { tool: 'Reply', text: 'Recommended products, with an order link' }] },
    ],
    produse: [
      { title: 'Company website', steps: [{ tool: 'Google', text: 'A customer finds you' }, { tool: 'Website', text: 'Sees what you do, on mobile or desktop' }, { tool: 'Form', text: 'Their request reaches your email' }] },
      { title: 'User portal', steps: [{ tool: 'Account', text: 'The user signs in' }, { tool: 'Request', text: 'Sends a request or a document' }, { tool: 'Admin', text: 'Your team sees it and replies' }] },
      { title: 'SaaS product', steps: [{ tool: 'Sign-up', text: 'The customer creates an account' }, { tool: 'Stripe', text: 'Pays the subscription' }, { tool: 'Access', text: 'Uses the product right away' }] },
    ],
    consultanta: [
      { title: 'Security audit', steps: [{ tool: 'Scope', text: 'We agree what to check' }, { tool: 'OWASP', text: 'We test authentication, access and data' }, { tool: 'Report', text: 'Issues with evidence and priorities' }] },
      { title: 'Maintenance', steps: [{ tool: 'Updates', text: 'Periodic checks' }, { tool: 'Bugs', text: 'Fixed within the package' }, { tool: 'Progress', text: 'You know what was done' }] },
      { title: 'Consultation', steps: [{ tool: 'Goals', text: 'Users, budget, priorities' }, { tool: 'Review', text: 'The idea or existing application' }, { tool: 'Plan', text: 'What to build, and in what order' }] },
    ],
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
  const flows = (en ? DETAIL_FLOWS.en : DETAIL_FLOWS.ro)[slug] ?? [];
  const packageGroups = slug === 'ai' ? [
    { title: en ? 'API integrations and automation' : 'Integrări API și automatizări', packages: svc.packages.slice(0, 1) },
    { title: en ? 'AI assistants' : 'Asistenți AI', packages: svc.packages.slice(1) },
  ] : [{ title: '', packages: svc.packages }];

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
    <div className="service-detail-page">
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
              <p className="svc-hero-tagline">{svc.tagline}</p>
              <p className="svc-hero-desc">{svc.longDesc}</p>
            </div>
            <div className="svc-pricing-card">
              <div className="from">{slug === 'ai' ? (en ? 'Implementation' : 'Implementare') : slug === 'consultanta' ? (en ? 'Security audit from' : 'Audit de securitate de la') : copy.startingPrice}</div>
              <div className="price">{slug === 'consultanta' ? svc.packages[0].from : svc.pricing.from}</div>
              {slug !== 'ai' && <div className="meta">
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
              </div>}
              <Link href="/#contact" className="cta">
                {copy.cta}
              </Link>
              <p className="svc-price-note">{slug === 'ai' ? copy.quoteNote : en ? 'Indicative starting price. Final scope and recurring costs are agreed separately.' : 'Preț de pornire orientativ. Scopul final și costurile recurente se stabilesc separat.'}</p>
            </div>
          </div>
        </div>
      </header>

      {slug === 'consultanta' && <AuditCoverage locale={locale} />}



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
                <div className="pkg-summary">
                  <div className="pkg-card-head">{group.title ? <h4>{pkg.name}</h4> : <h3>{pkg.name}</h3>}</div>
                  <p className="pkg-deliverable">{pkg.deliverable}</p>
                  {offerPrice(pkg.from) ? <>
                    <div className="pkg-price"><span className="pkg-from">{copy.from}</span> {pkg.from}</div>
                    <p className="pkg-duration">{pkg.duration}</p>
                    <Link href="/#contact" className="pkg-cta">{copy.pkgCta} <span aria-hidden="true">→</span></Link>
                  </> : <>
                    <Link href="/#contact" className="pkg-price pkg-quote">{pkg.from} <span aria-hidden="true">→</span></Link>
                    <p className="pkg-duration">{copy.quoteNote}</p>
                  </>}
                </div>
                <div className="pkg-includes">
                  <p className="pkg-label">{copy.includes}</p>
                  <ul>{pkg.includes.map((it) => <li key={it}>{it}</li>)}</ul>
                  <p className="pkg-model">{pkg.model}</p>
                  <p className="pkg-price-scope">{pkg.priceNote}</p>
                </div>
              </article>
            ))}
          </div>
          </div>)}
        </div>
      </section>

      {slug === 'ai' && <section className="svc-section integration-explainer" aria-labelledby="integration-explainer-title"><div className="wrap">
        <div className="svc-section-head"><div className="idx">02</div><h2 id="integration-explainer-title">{en ? 'What we' : 'Cu ce'} <em>{en ? 'connect' : 'ne integrăm'}</em></h2></div>
        <IntegrationCatalog locale={locale} />
        <MotionSurface className="integration-examples">{flows.map(flow => <div className="integration-example" key={flow.title}>
          <h3>{flow.title}</h3><FlowStrip steps={flow.steps} />
        </div>)}</MotionSurface>
      </div></section>}

      {slug === 'produse' && <section className="svc-section" aria-labelledby="stack-title"><div className="wrap">
        <div className="svc-section-head"><div className="idx">02</div><h2 id="stack-title">{copy.build} <em>{copy.buildEm}</em></h2></div>
        <StackCatalog locale={locale} />
      </div></section>}

      {slug !== 'ai' && <section className="svc-section" aria-labelledby="flows-title"><div className="wrap">
        <div className="svc-section-head"><div className="idx">{slug === 'produse' ? '03' : '02'}</div><h2 id="flows-title">{copy.flows} <em>{copy.flowsEm}</em></h2></div>
        <MotionSurface className="integration-examples">{flows.map(flow => <div className="integration-example" key={flow.title}>
          <h3>{flow.title}</h3><FlowStrip steps={flow.steps} />
        </div>)}</MotionSurface>
      </div></section>}

      {slug === 'ai' && <section className="svc-section" aria-labelledby="integration-projects-title"><div className="wrap">
        <div className="svc-section-head"><div className="idx">03</div><h2 id="integration-projects-title">{en ? 'Integrations from' : 'Integrări din'} <em>{en ? 'our portfolio' : 'portofoliul nostru'}</em></h2></div>
        <div className="integration-projects">{getCases(locale).filter(project => ['flotapro', 'itcustom'].includes(project.slug)).map(project => <article key={project.slug}>
          <p className="eyebrow">{project.label}</p><h3>{project.title}</h3><p>{project.desc}</p>
          <Link href={`/portofoliu#proiect-${project.slug}`} className="text-link">{en ? 'View the project' : 'Vezi proiectul'} →</Link>
        </article>)}</div>
      </div></section>}

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
    </div>
  );
}
