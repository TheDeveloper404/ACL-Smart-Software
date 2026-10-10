import { Link } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
import { getServices } from '@/data';
import ServiceIcon from '@/components/ui/ServiceIcon';
import MotionSurface from '@/components/ui/MotionSurface';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';

export default async function ServicesPreview() {
  const locale = await getLocale();
  const en = locale === 'en';
  const needs = en ? ['Add AI to my product', 'Automate repetitive work', 'Build a website or product', 'Plan, assess or maintain my application']
    : ['Vreau AI în produsul meu', 'Vreau să automatizez munca repetitivă', 'Vreau un site sau un produs', 'Vreau un plan, un audit sau mentenanță'];
  return <section className="section services-preview" id="servicii"><div className="wrap">
    <div className="section-heading"><div><p className="eyebrow">{en ? 'Solutions' : 'Soluții'}</p><h2>{en ? 'Start with what' : 'Pornim de la ce'}<br /><em>{en ? 'you need.' : 'ai nevoie.'}</em></h2></div>
      <p>{en ? 'AI, automation and digital products. Choose the direction that matches your situation.' : 'AI, automatizări și produse digitale. Alege direcția care se potrivește situației tale.'}</p></div>
    <MotionSurface className="solutions-preview-grid">{getServices(locale).map((service, i) => <Link key={service.slug} href={`/servicii/${service.slug}`} className="solution-preview">
      <div className="solution-preview-top"><ServiceIcon slug={service.slug} size={30} /><span className="solution-index">0{i + 1}</span></div>
      <p className="solution-need">{needs[i]}</p><h3>{service.title}</h3><p>{service.short}</p>
      <span className="solution-preview-link">{en ? 'Explore the solution' : 'Vezi soluția'} <ArrowUpRightIcon size={18} aria-hidden="true" /></span>
    </Link>)}</MotionSurface>
  </div></section>;
}
