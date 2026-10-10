import type { LegalDocument } from '@/data/legal';
import { Link } from '@/i18n/navigation';

function LinkedText({ text }: { text: string }) {
  const parts = text.split(/(office@acl-smartsoftware\.ro|dataprotection\.ro)/g);
  return <>{parts.map((part, i) => part === 'office@acl-smartsoftware.ro'
    ? <a key={i} href="mailto:office@acl-smartsoftware.ro">{part}</a>
    : part === 'dataprotection.ro' ? <a key={i} href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">{part}</a>
    : part)}</>;
}

export default function LegalContent({ document, locale, cookies = false }: { document: LegalDocument; locale: string; cookies?: boolean }) {
  const en = locale === 'en';
  return <section className="section"><div className="wrap legal-content">
    <div className="legal-sections">{document.sections.map(section => <section className="legal-section" key={section.title}>
      <h2>{section.title}</h2><p><LinkedText text={section.text} /></p>
    </section>)}</div>
    {cookies && <>
      <table className="legal-table"><caption className="legal-table-caption">{en ? 'Preferences used by the site' : 'Preferințele folosite de site'}</caption>
        <thead><tr><th scope="col">{en ? 'Name' : 'Nume'}</th><th scope="col">{en ? 'Storage' : 'Stocare'}</th><th scope="col">{en ? 'Purpose' : 'Scop'}</th></tr></thead>
        <tbody><tr><td>NEXT_LOCALE</td><td>Cookie</td><td>{en ? 'Selected language' : 'Limba aleasă'}</td></tr>
          <tr><td>acl-a11y-v1</td><td>Local Storage</td><td>{en ? 'Motion, text size and contrast preferences' : 'Preferințe pentru mișcare, text și contrast'}</td></tr>
          <tr><td>acl-cookie-consent</td><td>Local Storage</td><td>{en ? 'Choice saved by the banner' : 'Alegerea salvată de banner'}</td></tr></tbody>
      </table>
      <p className="legal-sources">{en ? 'Provider documentation: ' : 'Documentația furnizorului: '}
        <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Web Analytics</a>{' · '}
        <a href="https://vercel.com/docs/speed-insights/privacy-policy" target="_blank" rel="noopener noreferrer">Speed Insights</a>.
      </p>
    </>}
    <nav className="legal-related" aria-label={en ? 'Legal information' : 'Informații legale'}>
      <Link href="/politica-confidentialitate">{en ? 'Privacy policy' : 'Confidențialitate'}</Link>
      <Link href="/termeni">{en ? 'Terms and conditions' : 'Termeni și condiții'}</Link>
      <Link href="/cookies">{en ? 'Cookie policy' : 'Politică Cookies'}</Link>
    </nav>
  </div></section>;
}
