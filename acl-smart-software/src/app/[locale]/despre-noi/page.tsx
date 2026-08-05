import { Link } from '@/i18n/navigation';
import { setRequestLocale } from 'next-intl/server';
import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbDocument, localeAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

const COPY = {
  ro: {
    title: 'Despre noi — ACL Smart Software',
    description: 'ACL Smart Software: firmă independentă de dezvoltare software din Petroșani. Cine suntem, cum lucrăm și ce ne ghidează în fiecare proiect.',
    ogTitle: 'Despre noi — ACL Smart Software',
    ogDescription: 'Cine suntem, cum lucrăm și ce ne ghidează în fiecare proiect.',
    heroIdx: 'DESPRE NOI',
    heroTitle: <>O echipă mică. <em>Rezultate</em> care contează.</>,
    heroSub: 'Firmă independentă de dezvoltare software din Petroșani — implicare directă în fiecare proiect, de la prima discuție până la predare.',
    storyEyebrow: 'Povestea noastră',
    storyIdx: '01 / POVESTE',
    story: [
      'ACL Smart Software a pornit din aceeași frustrare pe care o vede orice dezvoltator bun: proiecte livrate la limită, cod greu de întreținut, agenții care dispar imediat după go-live. Am construit compania pe ideea opusă — implicare directă, cod curat și responsabilitate pe termen lung pentru tot ce livrăm.',
      'Din 2024 lucrăm cu companii mari și startup-uri deopotrivă, de la audituri tehnice de o zi la platforme SaaS complete construite în câteva luni. Fiecare proiect trece prin aceleași mâini, de la discovery până la handover — nu externalizăm către subcontractori anonimi.',
    ],
    valuesEyebrow: 'Ce ne ghidează',
    valuesIdx: '02 / VALORI',
    values: [
      { title: 'Transparență totală', desc: 'Raportăm onest, inclusiv când estimarea inițială se schimbă. Fără facturi surpriză, fără scope ascuns.' },
      { title: 'Codul rămâne al tău', desc: '100% code ownership, documentație completă, fără lock-in tehnologic sau contractual.' },
      { title: 'Parteneriat, nu tranzacție', desc: 'Rămânem alături după lansare, cât timp are sens pentru tine — nu dispărem după ultima factură.' },
    ],
    processEyebrow: 'Cum lucrăm',
    processIdx: '03 / PROCES',
    processText: 'De la consultanță la mentenanță, fiecare proiect urmează același flux disciplinat — fără pași săriți.',
    processLink: 'Vezi procesul complet →',
  },
  en: {
    title: 'About us — ACL Smart Software',
    description: 'ACL Smart Software: an independent software development company based in Romania. Who we are, how we work, and what guides every project.',
    ogTitle: 'About us — ACL Smart Software',
    ogDescription: 'Who we are, how we work, and what guides every project.',
    heroIdx: 'ABOUT US',
    heroTitle: <>A small team. <em>Results</em> that matter.</>,
    heroSub: 'Independent software development company based in Romania — hands-on involvement in every project, from the first conversation to handover.',
    storyEyebrow: 'Our story',
    storyIdx: '01 / STORY',
    story: [
      'ACL Smart Software started from the same frustration every good developer has seen: projects delivered right at the deadline, code that’s hard to maintain, agencies that disappear right after go-live. We built the company on the opposite idea — hands-on involvement, clean code, and long-term accountability for everything we ship.',
      'Since 2024 we’ve worked with large companies and startups alike, from one-day technical audits to full SaaS platforms built over a few months. Every project goes through the same hands, from discovery to handover — we don’t outsource to anonymous subcontractors.',
    ],
    valuesEyebrow: 'What guides us',
    valuesIdx: '02 / VALUES',
    values: [
      { title: 'Full transparency', desc: 'We report honestly, including when the initial estimate changes. No surprise invoices, no hidden scope.' },
      { title: 'The code stays yours', desc: '100% code ownership, complete documentation, no technology or contractual lock-in.' },
      { title: 'Partnership, not a transaction', desc: 'We stay involved after launch, for as long as it makes sense for you — we don’t disappear after the last invoice.' },
    ],
    processEyebrow: 'How we work',
    processIdx: '03 / PROCESS',
    processText: 'From consulting to maintenance, every project follows the same disciplined flow — no steps skipped.',
    processLink: 'See the full process →',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.ro;
  const url = `https://acl-smartsoftware.ro${locale === 'en' ? '/en' : ''}/despre-noi`;
  return {
    title: copy.title,
    description: copy.description,
    alternates: localeAlternates('/despre-noi', locale),
    openGraph: { title: copy.ogTitle, description: copy.ogDescription, url, type: 'website' },
  };
}

export default async function DespreNoiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.ro;

  const jsonLd = breadcrumbDocument([
    { name: locale === 'en' ? 'Home' : 'Acasă', path: locale === 'en' ? '/en' : '/' },
    { name: locale === 'en' ? 'About us' : 'Despre noi', path: locale === 'en' ? '/en/despre-noi' : '/despre-noi' },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero idx={copy.heroIdx} title={copy.heroTitle} sub={copy.heroSub} />

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="label-col">
              <div className="idx">{copy.storyIdx}</div>
              <div className="eyebrow">{copy.storyEyebrow}</div>
            </div>
          </div>
          <div className="about-text">
            {copy.story.map((p, i) => (
              <p className="about-text-lg" key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="label-col">
              <div className="idx">{copy.valuesIdx}</div>
              <div className="eyebrow">{copy.valuesEyebrow}</div>
            </div>
          </div>
          <div className="audience-list">
            {copy.values.map((v, i) => (
              <div key={v.title} className="audience-item">
                <div className="a-num">{String(i + 1).padStart(2, '0')}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="label-col">
              <div className="idx">{copy.processIdx}</div>
              <div className="eyebrow">{copy.processEyebrow}</div>
            </div>
          </div>
          <p className="about-text-lg" style={{ marginBottom: 24 }}>{copy.processText}</p>
          <Link href="/#proces" className="btn btn-ghost">{copy.processLink}</Link>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
