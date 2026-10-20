import MotionSurface from '@/components/ui/MotionSurface';
import type { Icon } from '@phosphor-icons/react';
import { OpenAiLogoIcon } from '@phosphor-icons/react/dist/ssr/OpenAiLogo';
import { SlackLogoIcon } from '@phosphor-icons/react/dist/ssr/SlackLogo';
import { ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';
import { TruckIcon } from '@phosphor-icons/react/dist/ssr/Truck';
import { EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';
import { SparkleIcon } from '@phosphor-icons/react/dist/ssr/Sparkle';
import { ChatCircleTextIcon } from '@phosphor-icons/react/dist/ssr/ChatCircleText';
import { BrowserIcon } from '@phosphor-icons/react/dist/ssr/Browser';
import { UserCircleIcon } from '@phosphor-icons/react/dist/ssr/UserCircle';
import { FileTextIcon } from '@phosphor-icons/react/dist/ssr/FileText';
import { GaugeIcon } from '@phosphor-icons/react/dist/ssr/Gauge';
import { UserPlusIcon } from '@phosphor-icons/react/dist/ssr/UserPlus';
import { LockOpenIcon } from '@phosphor-icons/react/dist/ssr/LockOpen';
import { TargetIcon } from '@phosphor-icons/react/dist/ssr/Target';
import { ArrowsClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowsClockwise';
import { BugIcon } from '@phosphor-icons/react/dist/ssr/Bug';
import { ChartLineIcon } from '@phosphor-icons/react/dist/ssr/ChartLine';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { ListChecksIcon } from '@phosphor-icons/react/dist/ssr/ListChecks';
import { ShieldCheckIcon } from '@phosphor-icons/react/dist/ssr/ShieldCheck';
import { WrenchIcon } from '@phosphor-icons/react/dist/ssr/Wrench';
import { SquaresFourIcon } from '@phosphor-icons/react/dist/ssr/SquaresFour';
import { CloudIcon } from '@phosphor-icons/react/dist/ssr/Cloud';
import {
  siN8n, siMake, siZapier, siStripe, siWhatsapp, siGmail, siGooglecalendar, siCalendly, siHubspot,
  siWoocommerce, siShopify, siClaude, siNextdotjs, siReact, siTypescript, siNodedotjs, siPostgresql,
  siTailwindcss, siDocker, siCloudflare, siGoogle, siOwasp, type SimpleIcon,
} from 'simple-icons';

// Logo-urile vin din simple-icons; OpenAI și Slack lipsesc de acolo și vin din Phosphor.
const BRANDS: Record<string, SimpleIcon | Icon> = {
  'n8n': siN8n, 'Make': siMake, 'Zapier': siZapier, 'Stripe': siStripe,
  'WhatsApp Business': siWhatsapp, 'WhatsApp': siWhatsapp, 'Gmail': siGmail, 'Slack': SlackLogoIcon,
  'Google Calendar': siGooglecalendar, 'Calendly': siCalendly, 'HubSpot': siHubspot, 'WooCommerce': siWoocommerce,
  'Shopify': siShopify, 'OpenAI': OpenAiLogoIcon, 'Claude': siClaude, 'Google': siGoogle, 'OWASP': siOwasp,
  'Next.js': siNextdotjs, 'React': siReact, 'TypeScript': siTypescript, 'Node.js': siNodedotjs, 'PostgreSQL': siPostgresql,
  'Tailwind CSS': siTailwindcss, 'Docker': siDocker, 'Cloudflare': siCloudflare,
};

// Pictograme generice: aplicații fără logo într-o librărie (SmartBill, curieri) și pașii din fluxuri.
const GENERIC: Record<string, Icon> = {
  'SmartBill': ReceiptIcon, 'Oblio': ReceiptIcon, 'Fan Courier': TruckIcon, 'Sameday': TruckIcon,
  'Email': EnvelopeSimpleIcon, 'AI': SparkleIcon, 'Răspuns': ChatCircleTextIcon, 'Reply': ChatCircleTextIcon,
  'Site': BrowserIcon, 'Website': BrowserIcon, 'Formular': EnvelopeSimpleIcon, 'Form': EnvelopeSimpleIcon,
  'Portal': SquaresFourIcon, 'SaaS': CloudIcon, 'Cont': UserCircleIcon, 'Account': UserCircleIcon,
  'Cerere': FileTextIcon, 'Request': FileTextIcon, 'Admin': GaugeIcon, 'Înregistrare': UserPlusIcon, 'Sign-up': UserPlusIcon,
  'Acces': LockOpenIcon, 'Access': LockOpenIcon, 'Audit': ShieldCheckIcon, 'Perimetru': TargetIcon, 'Scope': TargetIcon,
  'Raport': FileTextIcon, 'Report': FileTextIcon, 'Mentenanță': WrenchIcon, 'Maintenance': WrenchIcon,
  'Actualizări': ArrowsClockwiseIcon, 'Updates': ArrowsClockwiseIcon, 'Erori': BugIcon, 'Bugs': BugIcon,
  'Progres': ChartLineIcon, 'Progress': ChartLineIcon, 'Obiective': TargetIcon, 'Goals': TargetIcon,
  'Analiză': MagnifyingGlassIcon, 'Review': MagnifyingGlassIcon, 'Plan': ListChecksIcon,
};

// Aplicațiile afișate pe pagina Soluții. Lista e o promisiune comercială: păstrează doar ce livrăm.
const MARQUEE_ROWS = [
  ['n8n', 'Make', 'Zapier', 'Stripe', 'SmartBill', 'Oblio', 'WhatsApp Business', 'Gmail', 'Slack'],
  ['Google Calendar', 'Calendly', 'HubSpot', 'WooCommerce', 'Shopify', 'Fan Courier', 'Sameday', 'OpenAI', 'Claude'],
];

const CATALOG = {
  ro: [
    { title: 'Automatizări', tools: ['n8n', 'Make', 'Zapier'] },
    { title: 'Plăți și facturare', tools: ['Stripe', 'SmartBill', 'Oblio'] },
    { title: 'Mesaje', tools: ['WhatsApp Business', 'Gmail', 'Slack'] },
    { title: 'Programări și CRM', tools: ['Google Calendar', 'Calendly', 'HubSpot'] },
    { title: 'Magazine și livrare', tools: ['WooCommerce', 'Shopify', 'Fan Courier', 'Sameday'] },
    { title: 'AI', tools: ['OpenAI', 'Claude'] },
  ],
  en: [
    { title: 'Automation', tools: ['n8n', 'Make', 'Zapier'] },
    { title: 'Payments and invoicing', tools: ['Stripe', 'SmartBill', 'Oblio'] },
    { title: 'Messages', tools: ['WhatsApp Business', 'Gmail', 'Slack'] },
    { title: 'Appointments and CRM', tools: ['Google Calendar', 'Calendly', 'HubSpot'] },
    { title: 'Stores and delivery', tools: ['WooCommerce', 'Shopify', 'Fan Courier', 'Sameday'] },
    { title: 'AI', tools: ['OpenAI', 'Claude'] },
  ],
};

const STACK = {
  ro: [
    { title: 'Interfață', tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
    { title: 'Server și date', tools: ['Node.js', 'PostgreSQL'] },
    { title: 'Plăți și infrastructură', tools: ['Stripe', 'Docker', 'Cloudflare'] },
  ],
  en: [
    { title: 'Interface', tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
    { title: 'Server and data', tools: ['Node.js', 'PostgreSQL'] },
    { title: 'Payments and infrastructure', tools: ['Stripe', 'Docker', 'Cloudflare'] },
  ],
};

export interface FlowStep { tool: string; text: string }

export function BrandIcon({ name, size = 20 }: { name: string; size?: number }) {
  const brand = BRANDS[name];
  if (brand && 'path' in brand) return <svg className="brand-icon" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d={brand.path} /></svg>;
  if (brand) {
    const BrandLogo = brand;
    return <BrandLogo className="brand-icon" size={size} weight="fill" aria-hidden="true" />;
  }
  const Generic = GENERIC[name];
  return Generic ? <Generic className="brand-icon" size={size} aria-hidden="true" /> : null;
}

export function IntegrationMarquee({ locale }: { locale: string }) {
  const en = locale === 'en';
  return <MotionSurface className="logo-marquee">
    <p className="eyebrow">{en ? 'We connect' : 'Ne integrăm cu'}</p>
    {MARQUEE_ROWS.map((row, i) => <div className="logo-marquee-row" key={row[0]} data-reverse={i % 2 === 1 ? 'true' : undefined}>
      <ul className="logo-marquee-track" aria-label={i === 0 ? (en ? 'Applications we connect' : 'Aplicații pe care le conectăm') : undefined}>
        {[...row, ...row].map((tool, j) => <li key={tool + j} aria-hidden={j >= row.length ? 'true' : undefined}><BrandIcon name={tool} size={22} />{tool}</li>)}
      </ul>
    </div>)}
  </MotionSurface>;
}

export function BrandCatalog({ groups, note }: { groups: { title: string; tools: string[] }[]; note?: string }) {
  return <div className="integration-catalog">
    {groups.map(group => <div className="integration-group" key={group.title}>
      <h3>{group.title}</h3>
      <ul>{group.tools.map(tool => <li key={tool}><BrandIcon name={tool} size={18} />{tool}</li>)}</ul>
    </div>)}
    {note && <p className="integration-catalog-note">{note}</p>}
  </div>;
}

export function IntegrationCatalog({ locale }: { locale: string }) {
  const en = locale === 'en';
  return <BrandCatalog groups={en ? CATALOG.en : CATALOG.ro} note={en ? 'Using another application? If it has an API or a connector, we check it and connect it.' : 'Folosești altă aplicație? Dacă are API sau un conector, o verificăm și o conectăm.'} />;
}

export function StackCatalog({ locale }: { locale: string }) {
  return <BrandCatalog groups={locale === 'en' ? STACK.en : STACK.ro} />;
}

export function FlowStrip({ steps, label }: { steps: FlowStep[]; label?: string }) {
  return <ol className="flow-strip" aria-label={label}>
    {steps.map(step => <li key={step.tool + step.text}><span className="flow-strip-tool"><BrandIcon name={step.tool} size={18} />{step.tool}</span><span className="flow-strip-text">{step.text}</span></li>)}
  </ol>;
}
