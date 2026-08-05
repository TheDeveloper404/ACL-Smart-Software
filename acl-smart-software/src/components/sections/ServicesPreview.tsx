import { Link } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
import { getServices } from '@/data';

const BADGES: Record<string, Record<string, string>> = {
  ro: { 'aplicatii-web': 'Cel mai cerut', 'software-custom': '#1 Enterprise', 'ai-ml': 'Trending 2026' },
  en: { 'aplicatii-web': 'Most requested', 'software-custom': '#1 Enterprise', 'ai-ml': 'Trending 2026' },
};

const COPY = {
  ro: {
    idx: '02 / SERVICII',
    eyebrow: 'Ce facem',
    h2: <>Acoperim tot ciclul de dezvoltare: <em>consultanță, arhitectură, dezvoltare, testare, lansare și mentenanță</em>.</>,
    all: 'Toate serviciile, în detaliu',
  },
  en: {
    idx: '02 / SERVICES',
    eyebrow: 'What we do',
    h2: <>We cover the full development lifecycle: <em>consulting, architecture, development, testing, launch, and maintenance</em>.</>,
    all: 'All services, in detail',
  },
};

export default async function ServicesPreview() {
  const locale = await getLocale();
  const t = COPY[locale as keyof typeof COPY] ?? COPY.ro;
  const badges = BADGES[locale] ?? BADGES.ro;
  const services = getServices(locale);

  return (
    <section className="section" id="servicii">
      <div className="wrap">
        <div className="section-head">
          <div className="label-col">
            <div className="idx">{t.idx}</div>
            <div className="eyebrow">{t.eyebrow}</div>
          </div>
          <h2>{t.h2}</h2>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/servicii/${s.slug}`} className="service-card">
              <span className="service-arrow" aria-hidden="true">↗</span>
              <div className="svc-card-top">
                <div className="num">/ {String(i + 1).padStart(2, '0')}</div>
                {badges[s.slug] && <span className="svc-badge">{badges[s.slug]}</span>}
              </div>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
              <div className="tags">
                {s.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="/servicii" className="btn btn-ghost">
            {t.all} <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
