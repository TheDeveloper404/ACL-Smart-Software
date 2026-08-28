import { Link } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
import HeroTerminal from '@/components/ui/HeroTerminal';

const COPY = {
  ro: {
    // Împărțirea pe cele 3 linii e calibrată pe lățimea reală a coloanei h1 (~1100px la
    // desktop): „Construim produse care" măsura 1154px și se rupea într-un al 4-lea rând,
    // împingând tot conținutul de sub hero cu ~100px față de EN. Varianta curentă ține
    // ambele limbi pe exact 3 rânduri.
    h1: ['De la idee la ', 'producție', '.', 'Cod care rămâne', '100% ', 'al tău', '.'],
    sub: 'Aplicații web, platforme SaaS și integrări AI — livrate în 6–10 săptămâni, cu staging permanent, board public și zero lock-in.',
    ctaPrimary: 'Discută proiectul (30 min)',
    ctaGhost: 'Vezi ce am livrat',
    stats: [
      { num: '6', plus: '', label: 'Proiecte livrate' },
      { num: '6', plus: '', label: 'Industrii deservite' },
      { num: '6', plus: '+', label: 'Ani experiență medie' },
      { num: '24', plus: 'h', label: 'Răspuns garantat' },
    ],
  },
  en: {
    h1: ['From idea to ', 'production', '.', 'Code that stays', '100% ', 'yours', '.'],
    sub: 'Web apps, SaaS platforms, and AI integrations — shipped in 6–10 weeks, with permanent staging, a public board, and zero lock-in.',
    ctaPrimary: 'Book a 30-min call',
    ctaGhost: 'See what we’ve shipped',
    stats: [
      { num: '6', plus: '', label: 'Projects delivered' },
      { num: '6', plus: '', label: 'Industries served' },
      { num: '6', plus: '+', label: 'Avg. years of experience' },
      { num: '24', plus: 'h', label: 'Guaranteed response' },
    ],
  },
};

export default async function Hero() {
  const locale = await getLocale();
  const t = COPY[locale as keyof typeof COPY] ?? COPY.ro;

  return (
    <section className="hero" id="top">
      <div className="grid-bg" aria-hidden="true" />

      <div className="wrap">
        {/* Rândul 1: h1 stânga, terminal dreapta */}
        <div className="hero-head-grid">
          <h1>
            <span className="h1-line">{t.h1[0]}<em>{t.h1[1]}</em>{t.h1[2]}</span>
            <span className="h1-line">{t.h1[3]}</span>
            <span className="h1-line">{t.h1[4]}<em>{t.h1[5]}</em>{t.h1[6]}</span>
          </h1>

          <HeroTerminal />
        </div>

        {/* Rândul 2: descriere + CTA centrate */}
        <div className="hero-body-center">
          <p className="hero-sub">
            {t.sub}
          </p>
          <div className="hero-cta-row">
            <Link href="/#contact" className="btn btn-primary btn-cta">
              {t.ctaPrimary} <span className="arrow">→</span>
            </Link>
            <Link href="/portofoliu" className="btn btn-ghost">
              {t.ctaGhost}
            </Link>
          </div>
        </div>

        {/* Rândul 3: statistici centrate */}
        <div className="hero-meta">
          {t.stats.map((s) => (
            <div className="hero-meta-item" key={s.label}>
              <div className="num">{s.num}<span className="plus">{s.plus}</span></div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
