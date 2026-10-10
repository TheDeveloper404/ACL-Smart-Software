'use client';

import { Link } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { solutionIndex, solutionUrl } from '@/lib/solution-selection';
import type { Service } from '@/types';
import ServiceIcon from '@/components/ui/ServiceIcon';
import useRovingTabs from '@/components/ui/useRovingTabs';
import MotionSurface from '@/components/ui/MotionSurface';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

export default function ServicesExplorer({ services, locale }: { services: Service[]; locale: string }) {
  const searchParams = useSearchParams();
  const selected = solutionIndex(services, searchParams.get('solutie'));
  const { active, setActive, refs, onKeyDown } = useRovingTabs(services.length, {
    active: selected,
    onChange: index => {
      const service = services[index];
      if (service) window.history.replaceState(null, '', solutionUrl(window.location.pathname, searchParams.toString(), window.location.hash, service.slug));
    },
  });
  const en = locale === 'en';
  if (!services.length) return <p>{en ? 'Tell us what you need and we will discuss the options.' : 'Spune-ne ce ai nevoie și discutăm opțiunile.'} <Link href="/#contact">{en ? 'Contact us' : 'Contactează-ne'}</Link></p>;
  return <MotionSurface className="solutions-explorer">
    <div className="solutions-tabs" role="tablist" aria-label={en ? 'Choose a solution' : 'Alege o soluție'}>
      {services.map((service, i) => <button type="button" role="tab" key={service.slug} id={`solution-tab-${service.slug}`}
        ref={element => { refs.current[i] = element; }} tabIndex={active === i ? 0 : -1}
        aria-selected={active === i} aria-controls={`solution-panel-${service.slug}`}
        onClick={() => setActive(i)} onKeyDown={event => onKeyDown(event, i)} className={active === i ? 'solution-tab is-active' : 'solution-tab'}>
        <ServiceIcon slug={service.slug} size={24} /><span>{service.title}</span>
      </button>)}
    </div>
    {services.map((service, i) => <article key={service.slug} className="solution-panel services-index-card" id={`solution-panel-${service.slug}`}
      role="tabpanel" aria-labelledby={`solution-tab-${service.slug}`} tabIndex={0} hidden={active !== i}>
      <p className="eyebrow solution-panel-label">{en ? 'The right tool for your work' : 'Instrumentul potrivit pentru munca ta'}</p><div className="solution-panel-intro"><div>
        <h2>{service.tagline}</h2></div><div><p>{service.short}</p>
        <Link href={`/servicii/${service.slug}`} className="text-link service-detail-link">{en ? 'How it works' : 'Cum funcționează'} <ArrowRightIcon size={18} aria-hidden="true" /></Link></div>
      </div>
      <div className="solution-offers">{service.packages.map(pkg => <div key={pkg.id} className="solution-offer">
        <p className="offer-type">{pkg.model}</p><h3>{pkg.name}</h3><p>{pkg.deliverable}</p><p className="offer-price-scope">{pkg.priceNote}</p>
        <div className="offer-bottom"><span>{/\d/.test(pkg.from) ? (en ? 'From' : 'De la') : (en ? 'Scope-based quote' : 'Preț în funcție de scop')} <strong>{pkg.from}</strong></span>
          <Link href={`/servicii/${service.slug}#${pkg.id}`} aria-label={`${en ? 'Details for' : 'Detalii pentru'} ${pkg.name}`}><ArrowRightIcon size={22} aria-hidden="true" /></Link></div>
      </div>)}</div>
    </article>)}
    <p className="solutions-price-note">{en ? 'Starting prices are indicative. We agree on the scope, timeline and final quote before work starts. Hosting, AI usage and other recurring costs are discussed separately.' : 'Prețurile de pornire sunt orientative. Scopul, termenul și oferta finală se stabilesc înainte de lucru. Găzduirea, utilizarea AI și alte costuri recurente se discută separat.'}</p>
  </MotionSurface>;
}
