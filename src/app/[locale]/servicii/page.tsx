import { Suspense } from 'react';
import ServicesExplorer from '@/components/sections/ServicesExplorer';
import { getServices } from '@/data';
import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbDocument, localeAlternates, localePath, socialMetadata } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

const COPY = {
  ro: {
    title: 'Soluții — AI, automatizări și produse digitale',
    description: 'Procesare de documente cu AI, asistenți pentru clienți, integrări API, automatizări, site-uri, portaluri și SaaS. Soluții explicate clar, cu prețuri de pornire publice.',
    idx: 'SOLUȚII',
    hero: <>AI. Automatizări.<br /><em>Produse care îți sunt utile.</em></>,
    sub: 'Ai o aplicație de îmbunătățit, un proces de simplificat sau un produs de construit? Alegem soluția pornind de la ce ai nevoie.',
    guideLabel: 'Alege după nevoie',
    guideTitle: <>Pornim de la problemă.<br /><em>Alegem ce are sens.</em></>,
    guideIntro: 'Nu fiecare proces are nevoie de AI și nu fiecare idee de o aplicație nouă. Iată cum deosebim soluțiile.',
    guide: [{"slug":"ai","need":"Pierzi timp cu documente și mesaje","solution":"AI conectat la datele tale","detail":"Procesează documente, răspunde clienților și face pașii repetitivi în aplicațiile tale."},{"slug":"infrastructura","need":"Muți aceleași date între aplicații","solution":"Integrări API și automatizări","detail":"Conectăm aplicațiile prin API și automatizăm pașii cu reguli clare, fără AI acolo unde nu e nevoie."},{"slug":"produse","need":"Ai nevoie de un spațiu digital propriu","solution":"Site, portal sau SaaS","detail":"Un site pentru prezentare, un portal pentru acces și lucru sau SaaS pentru un produs."},{"slug":"consultanta","need":"Ai o idee sau o aplicație de evaluat","solution":"Consultanță sau audit","detail":"Clarificăm funcțiile primei versiuni ori verificăm aplicația existentă înainte de investiții noi."}],
  },
  en: {
    title: 'Solutions — AI, automation and digital products',
    description: 'AI document processing, customer assistants, API integrations, automation, websites, portals and SaaS. Clearly explained solutions with public starting prices.',
    idx: 'SOLUTIONS',
    hero: <>AI. Automation.<br /><em>Products that work for you.</em></>,
    sub: 'An application to improve, a process to simplify or a product to build? We choose the solution around what you need.',
    guideLabel: 'Choose by need',
    guideTitle: <>Start with the problem.<br /><em>Choose what makes sense.</em></>,
    guideIntro: 'Not every process needs AI, and not every idea needs a new application. Here is how we distinguish the options.',
    guide: [{"slug":"ai","need":"You lose time on documents and messages","solution":"AI connected to your data","detail":"It processes documents, answers customers and handles repetitive steps in your applications."},{"slug":"infrastructura","need":"You move the same data between applications","solution":"API integrations and automation","detail":"We connect applications through APIs and automate steps with clear rules, without AI where it is not needed."},{"slug":"produse","need":"You need your own digital space","solution":"Website, portal or SaaS","detail":"A website for presentation, a portal for access and work, or SaaS for a product."},{"slug":"consultanta","need":"You have an idea or an application to assess","solution":"Consultation or audit","detail":"We clarify first-version features or assess an existing application before further investment."}],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = locale === 'en' ? COPY.en : COPY.ro;
  return { title: t.title, description: t.description, alternates: localeAlternates('/servicii', locale),
    ...socialMetadata(locale, t.title, t.description, '/servicii') };
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = locale === 'en' ? COPY.en : COPY.ro;
  return <>
    <JsonLd data={breadcrumbDocument([{ name: locale === 'en' ? 'Home' : 'Acasă', path: localePath(locale, '/') },
      { name: locale === 'en' ? 'Solutions' : 'Soluții', path: localePath(locale, '/servicii') }])} />
    <PageHero idx={t.idx} title={t.hero} sub={t.sub} />
    <section className="section"><div className="wrap"><Suspense fallback={<p role="status">{locale === 'en' ? 'Loading solutions…' : 'Se încarcă soluțiile…'}</p>}><ServicesExplorer services={getServices(locale)} locale={locale} /></Suspense></div></section>
    <section className="section solutions-guide-section" aria-labelledby="solutions-guide-title"><div className="wrap solutions-guide">
      <div className="solutions-guide-intro"><p className="eyebrow">{t.guideLabel}</p><h2 id="solutions-guide-title">{t.guideTitle}</h2><p>{t.guideIntro}</p></div>
      <dl className="solutions-guide-options">{t.guide.map((item, index) => <div key={item.slug} className="solutions-guide-option">
        <dt><span className="solutions-guide-number" aria-hidden="true">0{index + 1}</span>{item.need}</dt>
        <dd><strong>{item.solution}</strong><p>{item.detail}</p></dd>
      </div>)}</dl>
    </div></section>
    <ContactStrip />
  </>;
}
