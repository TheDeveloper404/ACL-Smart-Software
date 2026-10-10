import { Link } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
import ConnectedProcess from '@/components/ui/ConnectedProcess';

export default async function Hero() {
  const locale = await getLocale();
  const en = locale === 'en';
  return (
    <section className="hero" id="top">
      <div className="wrap hero-connected">
        <div className="hero-copy">
          <p className="eyebrow">{en ? 'Connected processes. Real outcomes.' : 'Procese conectate. Rezultate reale.'}</p>
          <h1>{en ? 'We build' : 'Construim'}<br />software.<br /><em>{en ? 'We connect processes.' : 'Conectăm procese.'}</em></h1>
          <p className="hero-sub">{en ? 'Web applications, AI and systems that work together.' : 'Aplicații web, AI și sisteme care lucrează împreună.'}</p>
          <div className="hero-cta-row">
            <Link href="/#contact" className="btn btn-primary">{en ? 'Discuss your project' : 'Discută proiectul'} <span aria-hidden="true">→</span></Link>
            <Link href="#proiecte" className="text-link">{en ? 'See our work' : 'Vezi proiectele'} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <ConnectedProcess locale={locale} />
      </div>
    </section>
  );
}
