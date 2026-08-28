import { Link } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';

const COPY = {
  ro: {
    eyebrow: 'Hai să vorbim',
    h2: <>Ai un proiect <em>în minte</em>?<br />Răspundem în 24h.</>,
    cta: 'Începe un proiect',
  },
  en: {
    eyebrow: 'Let’s talk',
    h2: <>Got a project <em>in mind</em>?<br />We reply within 24h.</>,
    cta: 'Start a project',
  },
};

export default async function ContactStrip() {
  const locale = await getLocale();
  const t = COPY[locale as keyof typeof COPY] ?? COPY.ro;

  return (
    <section className="contact-strip" aria-label="Contact CTA">
      <div className="wrap contact-strip-inner">
        <div>
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.h2}</h2>
        </div>
        <div className="contact-strip-actions">
          <Link href="/#contact" className="btn btn-primary btn-cta">
            {t.cta} <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
