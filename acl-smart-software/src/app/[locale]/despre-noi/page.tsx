import { setRequestLocale } from 'next-intl/server';
import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbDocument, localeAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

/**
 * Recenzii reale de la clienți. Lista e goală până primim textele confirmate — secțiunea nu se
 * randează deloc cât timp e goală, ca să nu ajungă niciodată pe site mărturii inventate.
 * Fiecare intrare trebuie să corespundă unui client real, cu acordul lui pentru publicare.
 */
interface Review {
  quote: string;
  name: string;
  role: string;
  /** Inițiale pentru avatar; dacă lipsesc, se derivă din `name`. */
  initials?: string;
}

const REVIEWS: Record<'ro' | 'en', Review[]> = {
  ro: [
    {
      // Mărturie primită în scris, în engleză, de la fondatorul Detalia.ro. Textul de mai jos e
      // varianta condensată (5 fraze) + tradusă a originalului — fără afirmații adăugate.
      quote: 'Ce m-a impresionat cel mai mult nu a fost doar stăpânirea codului — care e excelentă — ci disciplina din jurul lui. Liviu nu doar scrie software; construiește cu fluxuri de lucru bine așezate, structură clară și un nivel de organizare care face colaborarea fără efort. Tot ce am stabilit a fost livrat prompt și exact cum am discutat, iar genul ăsta de predictibilitate e rar. Dincolo de partea tehnică, e pur și simplu un om cu care e o plăcere să lucrezi: deschis și ușor de abordat chiar și pe subiecte complexe. Îl recomand din toată inima pentru orice proiect.',
      name: 'Eduard N.',
      role: 'Fondator, Detalia.ro',
      initials: 'E',
    },
  ],
  en: [
    {
      quote: 'What impressed me most wasn’t just his command of the code — which is excellent — but the discipline around it. Liviu doesn’t just write software; he builds with well-established workflows, clear structure, and a level of organization that makes collaboration effortless. Everything we agreed on was delivered promptly and exactly as discussed, and that kind of reliability is rare. Beyond the technical side, he’s simply a great person to work with: open and easy to communicate with even on complex topics. I recommend him wholeheartedly for any project.',
      name: 'Eduard N.',
      role: 'Founder, Detalia.ro',
      initials: 'E',
    },
  ],
};

const COPY = {
  ro: {
    title: 'Despre noi — ACL Smart Software',
    description: 'ACL Smart Software: firmă independentă de dezvoltare software din Petroșani. Cine suntem, ce ne ghidează și ce spun clienții despre noi.',
    ogTitle: 'Despre noi — ACL Smart Software',
    ogDescription: 'Cine suntem, ce ne ghidează și ce spun clienții despre noi.',
    heroIdx: 'DESPRE NOI',
    heroTitle: <>O echipă mică. <em>Rezultate</em> care contează.</>,
    heroSub: 'Firmă independentă de dezvoltare software din Petroșani — implicare directă în fiecare proiect, de la prima discuție până la predare.',
    storyEyebrow: 'Povestea noastră',
    storyIdx: '01 / POVESTE',
    storyTitle: <>Am pornit din ce <em>ne deranja</em>.</>,
    story: [
      'ACL Smart Software a pornit din aceeași frustrare pe care o vede orice dezvoltator bun: proiecte livrate la limită, cod greu de întreținut, agenții care dispar imediat după go-live. Am construit compania pe ideea opusă — implicare directă, cod curat și responsabilitate pe termen lung pentru tot ce livrăm.',
      'Din 2024 lucrăm cu companii mari și startup-uri deopotrivă, de la audituri tehnice de o zi la platforme SaaS complete construite în câteva luni. Fiecare proiect trece prin aceleași mâini, de la discovery până la handover — nu externalizăm către subcontractori anonimi.',
    ],
    valuesEyebrow: 'Ce ne ghidează',
    valuesIdx: '02 / VALORI',
    valuesTitle: <>Trei principii pe care <em>nu le negociem</em>.</>,
    values: [
      {
        title: 'Transparență totală',
        desc: 'Raportăm onest, inclusiv când estimarea inițială se schimbă. Fără facturi surpriză, fără scope ascuns.',
        proof: 'Board public cu toate task-urile · demo bi-săptămânal',
      },
      {
        title: 'Codul rămâne al tău',
        desc: '100% code ownership, documentație completă, fără lock-in tehnologic sau contractual.',
        proof: 'Repository în contul tău · documentație arhitecturală la predare',
      },
      {
        title: 'Parteneriat, nu tranzacție',
        desc: 'Rămânem alături după lansare, cât timp are sens pentru tine — nu dispărem după ultima factură.',
        proof: 'SLA cu penalizări · reziliere cu 30 de zile notice',
      },
    ],
    reviewsEyebrow: 'Ce spun alții despre noi',
    reviewsIdx: '03 / RECENZII',
    reviewsTitle: <>Cuvântul <em>clienților</em>, nu al nostru.</>,
  },
  en: {
    title: 'About us — ACL Smart Software',
    description: 'ACL Smart Software: an independent software development company based in Romania. Who we are, what guides us, and what clients say about us.',
    ogTitle: 'About us — ACL Smart Software',
    ogDescription: 'Who we are, what guides us, and what clients say about us.',
    heroIdx: 'ABOUT US',
    heroTitle: <>A small team. <em>Results</em> that matter.</>,
    heroSub: 'Independent software development company based in Romania — hands-on involvement in every project, from the first conversation to handover.',
    storyEyebrow: 'Our story',
    storyIdx: '01 / STORY',
    storyTitle: <>We started from what <em>bothered us</em>.</>,
    story: [
      'ACL Smart Software started from the same frustration every good developer has seen: projects delivered right at the deadline, code that’s hard to maintain, agencies that disappear right after go-live. We built the company on the opposite idea — hands-on involvement, clean code, and long-term accountability for everything we ship.',
      'Since 2024 we’ve worked with large companies and startups alike, from one-day technical audits to full SaaS platforms built over a few months. Every project goes through the same hands, from discovery to handover — we don’t outsource to anonymous subcontractors.',
    ],
    valuesEyebrow: 'What guides us',
    valuesIdx: '02 / VALUES',
    valuesTitle: <>Three principles we <em>don’t negotiate</em>.</>,
    values: [
      {
        title: 'Full transparency',
        desc: 'We report honestly, including when the initial estimate changes. No surprise invoices, no hidden scope.',
        proof: 'Public task board · bi-weekly demo',
      },
      {
        title: 'The code stays yours',
        desc: '100% code ownership, complete documentation, no technology or contractual lock-in.',
        proof: 'Repository in your account · architecture docs at handover',
      },
      {
        title: 'Partnership, not a transaction',
        desc: 'We stay involved after launch, for as long as it makes sense for you — we don’t disappear after the last invoice.',
        proof: 'SLA with penalties · 30-day notice termination',
      },
    ],
    reviewsEyebrow: 'What others say about us',
    reviewsIdx: '03 / REVIEWS',
    reviewsTitle: <>Our <em>clients’</em> words, not ours.</>,
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

function initialsOf(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

export default async function DespreNoiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.ro;
  const reviews = REVIEWS[locale as keyof typeof REVIEWS] ?? REVIEWS.ro;

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
            <h2>{copy.storyTitle}</h2>
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
            <h2>{copy.valuesTitle}</h2>
          </div>
          <div className="values-grid">
            {copy.values.map((v, i) => (
              <article className="value-card" key={v.title}>
                <div className="value-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <div className="value-proof">{v.proof}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="label-col">
                <div className="idx">{copy.reviewsIdx}</div>
                <div className="eyebrow">{copy.reviewsEyebrow}</div>
              </div>
              <h2>{copy.reviewsTitle}</h2>
            </div>
            <div className="reviews-grid">
              {reviews.map((r) => (
                <figure className="review-card" key={r.name + r.quote.slice(0, 24)}>
                  <blockquote>{r.quote}</blockquote>
                  <figcaption className="review-author">
                    <span className="review-avatar" aria-hidden="true">{r.initials ?? initialsOf(r.name)}</span>
                    <span>
                      <span className="review-name">{r.name}</span>
                      <span className="review-role">{r.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactStrip />
    </>
  );
}
