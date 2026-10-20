import { Link } from '@/i18n/navigation';
import type { Service } from '@/types';
import ServiceIcon from '@/components/ui/ServiceIcon';
import MotionSurface from '@/components/ui/MotionSurface';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

export default function ServicesExplorer({ services, locale }: { services: Service[]; locale: string }) {
  const en = locale === 'en';
  if (!services.length) return <p>{en ? 'Tell us what you need and we will discuss the options.' : 'Spune-ne ce ai nevoie și discutăm opțiunile.'} <Link href="/#contact">{en ? 'Contact us' : 'Contactează-ne'}</Link></p>;
  return <MotionSurface className="solutions-overview">
    {services.map((service, i) => <article key={service.slug} className="services-index-card solution-overview" id={`solution-${service.slug}`}>
      <div className="solution-overview-top"><ServiceIcon slug={service.slug} size={30} /><span className="solution-index">0{i + 1}</span></div>
      <h2>{service.title}</h2><p>{service.short}</p>
      <ul>{service.packages.map(pkg => <li key={pkg.id}>{pkg.name}</li>)}</ul>
      <Link href={`/servicii/${service.slug}`} className="text-link service-detail-link">{en ? 'Explore the services' : 'Vezi serviciile'} <ArrowRightIcon size={18} aria-hidden="true" /></Link>
    </article>)}
  </MotionSurface>;
}
