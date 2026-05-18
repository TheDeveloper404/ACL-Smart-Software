'use client';
import Link from 'next/link';

function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={() => window.history.replaceState(null, '', '/#footer')}>
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="footer" id="footer" role="contentinfo">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="ACL Smart Software — acasă">
              <div className="brand-mark" style={{ width: 36, height: 36, fontSize: 13, fontFamily: 'var(--font-mono)', letterSpacing: '-0.05em' }} aria-hidden="true">&gt;_</div>
              <div className="brand-name"><span className="brand-acl">ACL</span> <span className="sub">Smart Software</span></div>
            </Link>
            <p>Companie software independentă. Construim produse care cresc business-uri — nu doar livrabile pe deadline.</p>
          </div>

          <div className="footer-col">
            <h5>Servicii</h5>
            <ul>
              <li><Link href="/servicii/software-custom">Software custom</Link></li>
              <li><Link href="/servicii/aplicatii-web">Aplicații web</Link></li>
              <li><Link href="/servicii/aplicatii-mobile">Aplicații mobile</Link></li>
              <li><Link href="/servicii/ai-ml">AI / Machine Learning</Link></li>
              <li><Link href="/servicii/cloud-devops">Cloud & DevOps</Link></li>
              <li><Link href="/servicii">Toate serviciile →</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Companie</h5>
            <ul>
              <li><Link href="/servicii">Servicii</Link></li>
              <li><Link href="/portofoliu">Portofoliu</Link></li>
              <li><Link href="/echipa">Echipă</Link></li>
              <li><Link href="/insights">Perspective</Link></li>
              <li><Link href="/cariere">Cariere</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li>Email: <a href="mailto:office@acl-smartsoftware.ro">office@acl-smartsoftware.ro</a></li>
              <li>Telefon: <a href="tel:+40758154490">0758 154 490</a></li>
              <li>Adresa: Str. Horea 2/31, Petroșani</li>
              <li>Date firmă: CUI 51219715</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 <span className="brand-acl">ACL</span> SMART SOFTWARE SRL · TOATE DREPTURILE REZERVATE</span>
          <div className="legal">
            <LegalLink href="/politica-confidentialitate">Politică de confidențialitate</LegalLink>
            <LegalLink href="/termeni">Termeni și condiții</LegalLink>
            <LegalLink href="/cookies">Cookies</LegalLink>
            <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer">ANPC</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
