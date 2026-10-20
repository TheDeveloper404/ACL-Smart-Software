import { Link } from '@/i18n/navigation';
import type { Service } from '@/types';
import ServiceIcon from '@/components/ui/ServiceIcon';
import MotionSurface from '@/components/ui/MotionSurface';
import { FlowStrip, type FlowStep } from '@/components/sections/Integrations';
import { offerPrice } from '@/lib/offer';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

// Un exemplu concret per categorie, în locul descrierilor generale.
const FLOWS: Record<string, Record<string, FlowStep[]>> = {
  ro: {
    ai: [{ tool: 'Stripe', text: 'Plata e confirmată în site' }, { tool: 'SmartBill', text: 'Factura se emite automat' }, { tool: 'Email', text: 'Clientul primește factura' }],
    produse: [{ tool: 'Site', text: 'Clienții te găsesc online' }, { tool: 'Portal', text: 'Își fac cont și trimit cereri' }, { tool: 'SaaS', text: 'Plătesc abonament pentru produsul tău' }],
    consultanta: [{ tool: 'Audit', text: 'Verificăm aplicația și securitatea' }, { tool: 'Raport', text: 'Problemele, ordonate după prioritate' }, { tool: 'Mentenanță', text: 'Aplicația rămâne actualizată lunar' }],
  },
  en: {
    ai: [{ tool: 'Stripe', text: 'Payment confirmed on the website' }, { tool: 'SmartBill', text: 'Invoice issued automatically' }, { tool: 'Email', text: 'The customer receives the invoice' }],
    produse: [{ tool: 'Website', text: 'Customers find you online' }, { tool: 'Portal', text: 'They sign up and send requests' }, { tool: 'SaaS', text: 'They subscribe to your product' }],
    consultanta: [{ tool: 'Audit', text: 'We check the application and its security' }, { tool: 'Report', text: 'Issues, ordered by priority' }, { tool: 'Maintenance', text: 'The application stays up to date monthly' }],
  },
};

export default function ServicesExplorer({ services, locale }: { services: Service[]; locale: string }) {
  const en = locale === 'en';
  const flows = en ? FLOWS.en : FLOWS.ro;
  if (!services.length) return <p>{en ? 'Tell us what you need and we will discuss the options.' : 'Spune-ne ce ai nevoie si discutam optiunile.'} <Link href="/#contact">{en ? 'Contact us' : 'Contacteaza-ne'}</Link></p>;
  return <MotionSurface className="solutions-overview">
    {services.map((service, i) => <article key={service.slug} className="services-index-card solution-overview" id={'solution-' + service.slug}>
      <div className="solution-overview-head">
        <div className="solution-overview-top" aria-hidden="true"><span className="solution-index">0{i + 1}</span><ServiceIcon slug={service.slug} size={48} /></div>
        <div className="solution-overview-copy"><h2>{service.title}</h2><p>{service.short}</p></div>
        <Link href={'/servicii/' + service.slug} className="text-link service-detail-link">{en ? 'Explore this service' : 'Vezi detaliile'} <ArrowRightIcon size={20} aria-hidden="true" /></Link>
      </div>
      {flows[service.slug] && <FlowStrip steps={flows[service.slug]} label={en ? 'Example' : 'Exemplu'} />}
      <ul className="solution-packages">{service.packages.map(pkg => <li key={pkg.id}><Link href={'/servicii/' + service.slug + '#' + pkg.id}>
        <span className="solution-package-name">{pkg.name}</span>
        <span className="solution-package-price">{offerPrice(pkg.from) ? <>{en ? 'from ' : 'de la '}<strong>{pkg.from}</strong></> : <><strong>{pkg.from}</strong><small>{en ? 'based on complexity' : 'în funcție de complexitate'}</small></>}</span>
        <ArrowRightIcon size={20} aria-hidden="true" />
      </Link></li>)}</ul>
    </article>)}
  </MotionSurface>;
}
