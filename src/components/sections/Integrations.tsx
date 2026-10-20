import MotionSurface from '@/components/ui/MotionSurface';

// Aplicațiile afișate pe pagina Soluții. Lista e o promisiune comercială: păstrează doar ce livrăm.
const HUB_TOOLS = [
  { name: 'n8n', ro: 'Automatizări', en: 'Automation', top: '14%', left: '14%' },
  { name: 'Stripe', ro: 'Plăți', en: 'Payments', top: '38%', left: '14%' },
  { name: 'WhatsApp Business', ro: 'Mesaje', en: 'Messages', top: '62%', left: '14%' },
  { name: 'WooCommerce', ro: 'Magazin online', en: 'Online store', top: '86%', left: '14%' },
  { name: 'Make', ro: 'Automatizări', en: 'Automation', top: '14%', left: '86%' },
  { name: 'SmartBill', ro: 'Facturare', en: 'Invoicing', top: '38%', left: '86%' },
  { name: 'Google Calendar', ro: 'Programări', en: 'Appointments', top: '62%', left: '86%' },
  { name: 'OpenAI · Claude', ro: 'AI', en: 'AI', top: '86%', left: '86%' },
];

const HUB_WIRES = [49, 133, 217, 301].flatMap(y => [`M112 ${y}C260 ${y} 260 175 400 175`, `M688 ${y}C540 ${y} 540 175 400 175`]);

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

export interface FlowStep { tool: string; text: string }

export function IntegrationHub({ locale }: { locale: string }) {
  const en = locale === 'en';
  return <MotionSurface className="integration-hub">
    <div className="integration-map">
      <svg className="industry-connections" viewBox="0 0 800 350" preserveAspectRatio="none" aria-hidden="true">
        {HUB_WIRES.map((d, i) => <g key={d}>
          <path d={d} className="industry-wire" />
          <path d={d} className="industry-packet" pathLength={1} style={{ animationDelay: `${i * -0.75}s` }} />
        </g>)}
      </svg>
      <span className="industry-hub" aria-hidden="true"><strong>ACL</strong><span>Smart Software</span></span>
      <ul className="integration-nodes" aria-label={en ? 'Applications we connect' : 'Aplicații pe care le conectăm'}>
        {HUB_TOOLS.map(tool => <li key={tool.name} style={{ top: tool.top, left: tool.left }}>
          <strong>{tool.name}</strong><span>{en ? tool.en : tool.ro}</span>
        </li>)}
      </ul>
    </div>
  </MotionSurface>;
}

export function IntegrationCatalog({ locale }: { locale: string }) {
  const en = locale === 'en';
  return <div className="integration-catalog">
    {(en ? CATALOG.en : CATALOG.ro).map(group => <div className="integration-group" key={group.title}>
      <h3>{group.title}</h3>
      <ul>{group.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
    </div>)}
    <p className="integration-catalog-note">{en ? 'Using another application? If it has an API or a connector, we check it and connect it.' : 'Folosești altă aplicație? Dacă are API sau un conector, o verificăm și o conectăm.'}</p>
  </div>;
}

export function FlowStrip({ steps, label }: { steps: FlowStep[]; label?: string }) {
  return <ol className="flow-strip" aria-label={label}>
    {steps.map(step => <li key={step.tool + step.text}><span className="flow-strip-tool">{step.tool}</span><span className="flow-strip-text">{step.text}</span></li>)}
  </ol>;
}
