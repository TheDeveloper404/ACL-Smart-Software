import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { SERVICE_BY_SLUG, SERVICES } from '@/data';
import ContactStrip from '@/components/sections/ContactStrip';
import FaqAccordion from './FaqAccordion';
import WhatWeBuild from './WhatWeBuild';
import type { Metadata } from 'next';

const TITLE_DISPLAY: Record<string, ReactNode> = {
  'software-custom':   <>Dezvoltare <em>Software</em> la comandă</>,
  'aplicatii-web':     <>Aplicații <em>Web</em> și Creare <em>website-uri</em></>,
  'aplicatii-mobile':  <>Aplicații <em>Mobile</em></>,
  'ai-ml':             <><em>AI</em> / Machine Learning</>,
  'cloud-devops':      <>Cloud <em>& DevOps</em></>,
  'integrari-api':     <>Integrări <em>& API-uri</em></>,
  'consultanta-it':    <>Consultanță <em>IT</em></>,
  'mentenanta-suport': <>Mentenanță <em>& Suport</em></>,
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICE_BY_SLUG[slug];
  if (!svc) return {};
  const url = `https://acl-smartsoftware.ro/servicii/${slug}`;
  return {
    title: `${svc.title} — Servicii Software | ACL Smart Software`,
    description: svc.short,
    alternates: { canonical: url },
    openGraph: {
      title: `${svc.title} — ACL Smart Software`,
      description: svc.short,
      url,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const svc = SERVICE_BY_SLUG[slug];
  if (!svc) notFound();

  const allTechItems = svc.technologies.flatMap(cat => cat.items);

  return (
    <>
      <header className="svc-detail-hero">
        <div className="grid-bg" aria-hidden="true" />
        <div className="wrap">
          <Link href="/servicii" className="svc-back">← Servicii</Link>
          <div className="svc-hero-grid">
            <div>
              <h1 className="svc-hero-title">
                {TITLE_DISPLAY[svc.slug] ?? svc.title}
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
              <div className="from">Preț de pornire</div>
              <div className="price">{svc.pricing.from}</div>
              <div className="meta">
                <div className="meta-row">
                  <span className="k">Timeline</span>
                  <span className="v">{svc.timeline}</span>
                </div>
                <div className="meta-row">
                  <span className="k">Model</span>
                  <span className="v">{svc.pricing.model}</span>
                </div>
                <div className="meta-row">
                  <span className="k">Termen</span>
                  <span className="v">{svc.pricing.duration}</span>
                </div>
              </div>
              <Link href="/#contact" className="cta">
                Discutăm proiectul →
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="svc-section">
        <div className="wrap">
          <div className="svc-section-head">
            <div className="idx">01</div>
            <h2>Ce <em>construim</em></h2>
          </div>
          <WhatWeBuild items={svc.whatWeBuild} />
        </div>
      </section>

      <section className="svc-section">
        <div className="wrap">
          <div className="svc-section-head">
            <div className="idx">02</div>
            <h2>Cui se <em>potrivește</em></h2>
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
            <h2>Întrebări <em>frecvente</em></h2>
          </div>
          <FaqAccordion items={svc.faq} />
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
