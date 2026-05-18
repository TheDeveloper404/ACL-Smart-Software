import Link from 'next/link';
import { SERVICES } from '@/data';

const BADGES: Record<string, string> = {
  'aplicatii-web':   'Cel mai cerut',
  'software-custom': '#1 Enterprise',
  'ai-ml':           'Trending 2026',
};

export default function ServicesPreview() {
  return (
    <section className="section" id="servicii">
      <div className="wrap">
        <div className="section-head">
          <div className="label-col">
            <div className="idx">02 / SERVICII</div>
            <div className="eyebrow">Ce facem</div>
          </div>
          <h2>Acoperim tot ciclul. <em>De la idee la producție</em>, fără intermediari.</h2>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Link key={s.slug} href={`/servicii/${s.slug}`} className="service-card">
              <span className="service-arrow" aria-hidden="true">↗</span>
              <div className="svc-card-top">
                <div className="num">/ {String(i + 1).padStart(2, '0')}</div>
                {BADGES[s.slug] && <span className="svc-badge">{BADGES[s.slug]}</span>}
              </div>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
              <div className="tags">
                {s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="/servicii" className="btn btn-ghost">
            Toate serviciile, în detaliu <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
