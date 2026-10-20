'use client';

import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { LinkedinLogoIcon } from '@phosphor-icons/react/dist/ssr/LinkedinLogo';
import { InstagramLogoIcon } from '@phosphor-icons/react/dist/ssr/InstagramLogo';

export default function Footer() {
  const en = useLocale() === 'en';
  const company = [
    { href: '/', label: en ? 'Home' : 'Acasă' },
    { href: '/despre-noi', label: en ? 'About us' : 'Despre noi' },
    { href: '/servicii', label: en ? 'Solutions' : 'Soluții' },
    { href: '/portofoliu', label: en ? 'Portfolio' : 'Portofoliu' },
  ];
  const solutions = [
    { href: '/servicii/ai', label: en ? 'API integrations and AI assistants' : 'Integrări API și asistenți AI' },
    { href: '/servicii/produse', label: en ? 'Websites, portals and SaaS' : 'Site-uri, portaluri și SaaS' },
    { href: '/servicii/consultanta', label: en ? 'Consultation, audit and maintenance' : 'Consultanță, audit și mentenanță' },
  ];
  return <footer className="footer footer-compact" id="footer"><div className="wrap">
    <div className="footer-grid">
      <div className="footer-brand">
        <Link href="/" className="brand" aria-label={en ? 'ACL Smart Software — home' : 'ACL Smart Software — acasă'}>
          <div className="brand-mark" style={{ width: 36, height: 36, fontSize: 13, fontFamily: 'var(--font-mono)', letterSpacing: '-0.05em' }} aria-hidden="true">&gt;_</div>
          <div className="brand-name"><span className="brand-acl">ACL</span> <span className="sub">Smart Software</span></div>
        </Link>
        <p>{en ? 'AI, automation and custom software.' : 'AI, automatizări și software la comandă.'}</p>
      </div>
      <div className="footer-col"><h5>{en ? 'Solutions' : 'Soluții'}</h5><ul>{solutions.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></div>
      <div className="footer-col"><h5>{en ? 'Company' : 'Companie'}</h5><ul>{company.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></div>
      <div className="footer-col footer-contact"><h5>Contact</h5><ul>
        <li><a href="mailto:office@acl-smartsoftware.ro">office@acl-smartsoftware.ro</a></li>
        <li><a href="tel:+40758154490">0758 154 490</a></li>
        <li>Petroșani, Hunedoara</li><li>CUI 51219715</li>
      </ul></div>
      <div className="footer-col footer-social"><h5>{en ? 'Follow us' : 'Urmărește-ne'}</h5><ul className="footer-socials">
        <li><a href="https://www.linkedin.com/company/acl-smartsoftware/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinLogoIcon size={22} aria-hidden="true" /></a></li>
        <li><a href="https://www.instagram.com/acl_smartsoftware/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramLogoIcon size={22} aria-hidden="true" /></a></li>
      </ul></div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 ACL SMART SOFTWARE SRL · {en ? 'All rights reserved' : 'Toate drepturile rezervate'}</span>
      <div className="legal">
        <Link href="/politica-confidentialitate">{en ? 'Privacy policy' : 'Confidențialitate'}</Link>
        <Link href="/termeni">{en ? 'Terms and conditions' : 'Termeni și condiții'}</Link>
        <Link href="/cookies">{en ? 'Cookie policy' : 'Politică Cookies'}</Link>
        <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer">ANPC</a>
      </div>
    </div>
  </div></footer>;
}
