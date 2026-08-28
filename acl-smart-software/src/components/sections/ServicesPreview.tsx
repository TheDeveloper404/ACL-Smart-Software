import { Link } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
import { getServices } from '@/data';

const COPY = {
  ro: {
    idx: '03 / SERVICII',
    eyebrow: 'Ce facem',
    h2: <>Patru arii. <em>Pachete cu preț fix</em>.</>,
    all: 'Toate pachetele, cu prețuri',
    from: 'de la',
  },
  en: {
    idx: '03 / SERVICES',
    eyebrow: 'What we do',
    h2: <>Four areas. <em>Fixed-price packages</em>.</>,
    all: 'All packages, with pricing',
    from: 'from',
  },
};

export default async function ServicesPreview() {
  const locale = await getLocale();
  const t = COPY[locale as keyof typeof COPY] ?? COPY.ro;
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
                <span className="svc-badge">{s.packages.length} {locale === 'en' ? 'packages' : 'pachete'}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
              <div className="tags">
                {s.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <div className="svc-card-price">{t.from} <b>{s.pricing.from}</b></div>
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
