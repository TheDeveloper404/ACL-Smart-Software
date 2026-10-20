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
    description: 'Site-uri, portaluri si SaaS, integrari API si asistenti AI pentru cereri, programari si magazine online. Consultanta, audit si mentenanta.',
    idx: 'SOLUȚII',
    hero: <>AI. Automatizări.<br /><em>Produse care îți sunt utile.</em></>,
    sub: 'Ai o aplicație de îmbunătățit, un proces de simplificat sau un produs de construit? Alegem soluția pornind de la ce ai nevoie.',
    guideLabel: 'Alege după nevoie',
    guideTitle: <>Pornim de la problemă.<br /><em>Alegem ce are sens.</em></>,
    guideIntro: 'Nu fiecare proces are nevoie de AI și nu fiecare idee de o aplicație nouă. Iată cum deosebim soluțiile.',
    guide: [{"slug":"ai","need":"Vrei aplicatii conectate sau ajutor pentru clienti","solution":"Integrari API si asistenti AI","detail":"API-ul conecteaza aplicatiile si automatizeaza pasii stabiliti. AI-ul interpreteaza cererile si poarta conversatia cu clientul. O solutie le poate folosi pe ambele."},{"slug":"produse","need":"Ai nevoie de un spațiu digital propriu","solution":"Site, portal sau SaaS","detail":"Un site pentru prezentare, un portal pentru acces și lucru sau SaaS pentru un produs."},{"slug":"consultanta","need":"Ai o idee sau o aplicație de evaluat","solution":"Consultanță sau audit","detail":"Clarificăm funcțiile primei versiuni ori verificăm aplicația existentă înainte de investiții noi."}],
  },
  en: {
    title: 'Solutions — AI, automation and digital products',
    description: 'Websites, portals and SaaS, API integrations and AI assistants for enquiries, appointments and online stores. Consultation, audit and maintenance.',
    idx: 'SOLUTIONS',
    hero: <>AI. Automation.<br /><em>Products that work for you.</em></>,
    sub: 'An application to improve, a process to simplify or a product to build? We choose the solution around what you need.',
    guideLabel: 'Choose by need',
    guideTitle: <>Start with the problem.<br /><em>Choose what makes sense.</em></>,
    guideIntro: 'Not every process needs AI, and not every idea needs a new application. Here is how we distinguish the options.',
    guide: [{"slug":"ai","need":"You need connected applications or help for customers","solution":"API integrations and AI assistants","detail":"APIs connect applications and automate defined steps. AI interprets enquiries and handles the customer conversation. A solution can use both."},{"slug":"produse","need":"You need your own digital space","solution":"Website, portal or SaaS","detail":"A website for presentation, a portal for access and work, or SaaS for a product."},{"slug":"consultanta","need":"You have an idea or an application to assess","solution":"Consultation or audit","detail":"We clarify first-version features or assess an existing application before further investment."}],
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
    <section className="section"><div className="wrap"><ServicesExplorer services={getServices(locale)} locale={locale} /></div></section>
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
