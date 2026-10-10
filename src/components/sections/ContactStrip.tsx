import { Link } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';

const COPY = {
  ro: {
    eyebrow: 'Hai să vorbim',
    h2: <>Ai un proiect în minte? <em>Răspundem în 24h.</em></>,
    cta: 'Începe un proiect',
  },
  en: {
    eyebrow: 'Let’s talk',
    h2: <>Got a project in mind? <em>We reply within 24h.</em></>,
    cta: 'Start a project',
  },
};

export default async function ContactStrip() {
  const locale = await getLocale();
  const t = COPY[locale as keyof typeof COPY] ?? COPY.ro;

  return (
    <section className="contact-strip" aria-label={locale === 'en' ? 'Discuss your project' : 'Discută proiectul'}>
      <div className="wrap contact-strip-inner">
        <h2>{t.h2}</h2>
        <div className="contact-strip-actions">
          <Link href="/#contact" className="btn btn-primary btn-cta">
            {t.cta} <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
