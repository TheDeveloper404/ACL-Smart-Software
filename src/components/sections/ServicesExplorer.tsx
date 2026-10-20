import { Link } from '@/i18n/navigation';
import type { Service } from '@/types';
import ServiceIcon from '@/components/ui/ServiceIcon';
import MotionSurface from '@/components/ui/MotionSurface';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

export default function ServicesExplorer({ services, locale }: { services: Service[]; locale: string }) {
  const en = locale === 'en';
  if (!services.length) return <p>{en ? 'Tell us what you need and we will discuss the options.' : 'Spune-ne ce ai nevoie si discutam optiunile.'} <Link href="/#contact">{en ? 'Contact us' : 'Contacteaza-ne'}</Link></p>;
  return <MotionSurface className="solutions-overview">
    {services.map((service, i) => <article key={service.slug} className="services-index-card solution-overview" id={'solution-' + service.slug}>
      <div className="solution-overview-top" aria-hidden="true"><span className="solution-index">0{i + 1}</span><ServiceIcon slug={service.slug} size={64} /></div>
      <div className="solution-overview-copy"><h2>{service.title}</h2><p>{service.short}</p>
        <Link href={'/servicii/' + service.slug} className="text-link service-detail-link">{en ? 'Explore this service' : 'Vezi ce putem face'} <ArrowRightIcon size={20} aria-hidden="true" /></Link>
      </div>
      <div className="solution-overview-services"><p className="eyebrow">{en ? 'What we offer' : 'Ce iti oferim'}</p>
        <ul>{service.packages.map(pkg => <li key={pkg.id}><Link href={'/servicii/' + service.slug + '#' + pkg.id}>{pkg.name}<ArrowRightIcon size={20} aria-hidden="true" /></Link></li>)}</ul>
      </div>
    </article>)}
  </MotionSurface>;
}
