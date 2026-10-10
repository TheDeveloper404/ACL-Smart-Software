import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import ClientReviews from '@/components/sections/ClientReviews';
import MotionSurface from '@/components/ui/MotionSurface';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbDocument, localeAlternates, localePath, socialMetadata } from '@/lib/seo';
import { REVIEWS } from '@/data/reviews';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';
import { ChatCircleTextIcon } from '@phosphor-icons/react/dist/ssr/ChatCircleText';
import { EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { KeyIcon } from '@phosphor-icons/react/dist/ssr/Key';
import { BuildingsIcon } from '@phosphor-icons/react/dist/ssr/Buildings';
import { GraduationCapIcon } from '@phosphor-icons/react/dist/ssr/GraduationCap';
import { TruckIcon } from '@phosphor-icons/react/dist/ssr/Truck';
import { WrenchIcon } from '@phosphor-icons/react/dist/ssr/Wrench';
import type { Metadata } from 'next';

const COPY = {
  ro: {
    title: 'Dezvoltare software, AI și automatizări — Despre ACL Smart Software', description: 'ACL Smart Software, companie de dezvoltare software din Petroșani. Construim site-uri, portaluri și produse SaaS, integrăm AI și automatizăm procese.',
    idx: 'DESPRE NOI', hero: <>Oameni implicați.<br /><em>Software cu un scop.</em></>,
    sub: 'Suntem ACL Smart Software. Construim aplicații, adăugăm AI în produse și conectăm procese pentru companii și organizații.',
    storyLabel: 'Cine suntem', storyTitle: <>Lucrăm aproape<br />de <em>problema ta.</em></>,
    story: ["ACL Smart Software este o companie de dezvoltare software din Petroșani, specializată în integrarea AI și automatizări inteligente în aplicații web, portaluri și produse SaaS.","Construim site-uri web, portaluri și aplicații personalizate pentru companii, apoi adăugăm funcții de inteligență artificială care automatizează procesele repetitive și cresc productivitatea.","Lucrăm transparent: înțelegem problema, stabilim funcțiile și bugetul, îți arătăm progresul pe măsură ce dezvoltăm și, la lansare, îți predăm codul, accesurile și instrucțiunile de administrare."],
    workTitle: 'Cu cine lucrăm', workIntro: 'Lucrăm cu persoane fizice și juridice. Proiectele noastre includ companii, organizații și instituții din aceste domenii:', industries: ['Construcții', 'Educație', 'Transport', 'Servicii IT'],
    principlesLabel: 'Colaborarea, explicată', principlesTitle: <>Ce înseamnă asta<br /><em>pentru tine.</em></>,
    principles: [
      { title: 'Știi ce construim și cât costă', desc: 'Stabilim funcțiile, livrabilele și oferta înainte de implementare. Dacă apar cerințe noi, discutăm impactul înainte să extindem proiectul.', proof: 'Scop și ofertă agreate' },
      { title: 'Vezi produsul pe parcurs', desc: 'Îți arătăm versiuni de lucru și discutăm feedbackul. Poți verifica dacă fluxurile sunt potrivite înainte de lansare.', proof: 'Demo-uri și feedback' },
      { title: 'Primești acces și explicații', desc: 'La predare primești codul și accesul la resursele agreate. Dacă vrei să continuăm după lansare, stabilim separat mentenanța.', proof: 'Cod, acces și documentație' },
    ],
    processLink: 'Vezi cele șase etape ale unui proiect', reviewLabel: 'Din partea clienților', reviewTitle: <>Colaborări, în<br /><em>cuvintele lor.</em></>,
  },
  en: {
    title: 'Software Development, AI and Automation — About ACL Smart Software', description: 'ACL Smart Software is a software development company in Romania. We build websites, portals and SaaS products, integrate AI and automate workflows.',
    idx: 'ABOUT US', hero: <>Involved people.<br /><em>Software with a purpose.</em></>,
    sub: 'We are ACL Smart Software. We build applications, add AI to products and connect workflows for businesses and organisations.',
    storyLabel: 'Who we are', storyTitle: <>Close to the problem<br /><em>you need to solve.</em></>,
    story: ["ACL Smart Software is a software development company based in Petroșani, Romania, specialising in AI integration and intelligent automation for web applications, portals and SaaS products.","We build websites, portals and custom applications for businesses, then add artificial intelligence features that automate repetitive processes and improve productivity.","We work transparently: we understand the problem, agree on features and budget, show you progress as we develop and, at launch, hand over the code, access and administration instructions."],
    workTitle: 'Who we work with', workIntro: 'We work with individuals and legal entities. Our projects include businesses, organisations and institutions in these fields:', industries: ['Construction', 'Education', 'Transport', 'IT services'],
    principlesLabel: 'Working together, explained', principlesTitle: <>What this means<br /><em>for you.</em></>,
    principles: [
      { title: 'You know the scope and cost', desc: 'We agree on features, deliverables and the quote before implementation. If new requirements emerge, we discuss their impact before expanding the project.', proof: 'Agreed scope and quote' },
      { title: 'You see the product as it develops', desc: 'We show working versions and discuss your feedback. You can check whether the workflows fit before launch.', proof: 'Demos and feedback' },
      { title: 'You receive access and guidance', desc: 'At handover, you receive the code and access to agreed resources. If you want us to continue after launch, we agree on maintenance separately.', proof: 'Code, access and documentation' },
    ],
    processLink: 'Explore the six project stages', reviewLabel: 'From our clients', reviewTitle: <>Working together,<br /><em>in their words.</em></>,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = locale === 'en' ? COPY.en : COPY.ro;
  return { title: { absolute: t.title }, description: t.description, alternates: localeAlternates('/despre-noi', locale), ...socialMetadata(locale, t.title, t.description, '/despre-noi') };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = locale === 'en' ? COPY.en : COPY.ro;
  const icons = [ChatCircleTextIcon, EyeIcon, KeyIcon];
  const industryIcons = [BuildingsIcon, GraduationCapIcon, TruckIcon, WrenchIcon];
  return <>
    <JsonLd data={breadcrumbDocument([{ name: locale === 'en' ? 'Home' : 'Acasă', path: localePath(locale, '/') }, { name: locale === 'en' ? 'About us' : 'Despre noi', path: localePath(locale, '/despre-noi') }])} />
    <PageHero idx={t.idx} title={t.hero} sub={t.sub} />
    <section className="section about-story"><div className="wrap">
      <div className="section-heading"><div><p className="eyebrow">{t.storyLabel}</p><h2>{t.storyTitle}</h2></div></div>
      <div className="about-story-grid"><div className="story-copy">{t.story.map(p => <p key={p}>{p}</p>)}</div>
        <MotionSurface className="industry-surface">
          <aside className="story-work industry-card">
            <h3>{t.workTitle}</h3><p>{t.workIntro}</p>
            <div className="industry-map">
              <svg className="industry-connections" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
                {['M70 60C160 60 140 150 200 150', 'M330 90C270 90 270 150 200 150', 'M70 210C140 210 140 150 200 150', 'M330 240C270 240 270 150 200 150'].map((d, i) => <g key={d}>
                  <path d={d} className="industry-wire" />
                  <path d={d} className="industry-packet" pathLength={1} style={{ animationDelay: `${i * -1.5}s` }} />
                </g>)}
              </svg>
              <span className="industry-hub" aria-hidden="true"><strong>ACL</strong><span>Smart Software</span></span>
              <ul className="industry-grid">{t.industries.map((industry, i) => {
                const Icon = industryIcons[i];
                return <li key={industry} style={{ animationDelay: `${i * -1.5}s` }}>
                  <span className="industry-node-icon"><Icon size={34} weight="light" aria-hidden="true" /></span>
                  <span>{industry}</span>
                </li>;
              })}</ul>
            </div>
          </aside>
        </MotionSurface>
      </div>
    </div></section>
    <section className="section collaboration-section"><div className="wrap">
      <div className="section-heading"><div><p className="eyebrow">{t.principlesLabel}</p><h2>{t.principlesTitle}</h2></div>
        <Link href="/#proces" className="text-link">{t.processLink}<ArrowUpRightIcon size={18} aria-hidden="true" /></Link></div>
      <MotionSurface className="collaboration-list">{t.principles.map((principle, i) => { const Icon = icons[i]; return <article className="collaboration-item" key={principle.title}>
        <div className="collaboration-symbol"><Icon size={30} weight="light" aria-hidden="true" /><span>0{i + 1}</span></div>
        <div><h3>{principle.title}</h3><p>{principle.desc}</p></div><span className="collaboration-proof">{principle.proof}</span>
      </article>; })}</MotionSurface>
    </div></section>
    <section className="section reviews-section"><div className="wrap">
      <div className="section-heading"><div><p className="eyebrow">{t.reviewLabel}</p><h2>{t.reviewTitle}</h2></div></div>
      <ClientReviews reviews={REVIEWS[locale === 'en' ? 'en' : 'ro']} locale={locale} />
    </div></section>
    <ContactStrip />
  </>;
}
