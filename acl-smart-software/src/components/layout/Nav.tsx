'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { id: 'servicii', label: 'Servicii', href: '/servicii' },
  { id: 'portofoliu', label: 'Portofoliu', href: '/portofoliu' },
  { id: 'echipa', label: 'Echipă', href: '/echipa' },
  { id: 'insights', label: 'Perspective', href: '/insights' },
  { id: 'cariere', label: 'Cariere', href: '/cariere' },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu after navigation completes (pathname change = new page loaded)
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-menu-open' : ''}`} aria-label="Navigare principală">
        <div className="nav-inner">
          <Link href="/" className="brand" aria-label="ACL Smart Software — acasă">
            <div className="brand-mark" aria-hidden="true">&gt;_</div>
            <div className="brand-name"><span className="brand-acl">ACL</span> <span className="sub">Smart Software</span></div>
          </Link>

          <div className="nav-links">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className={isActive(item.href) ? 'is-active' : ''}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" className="nav-cta">
              Începe un proiect →
            </Link>
          </div>

          <button
            className="nav-mobile-toggle"
            aria-label={menuOpen ? 'Închide meniu' : 'Deschide meniu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-label="Meniu mobil"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-inner">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.id}
              href={item.href}
              className={isActive(item.href) ? 'is-active' : ''}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn btn-primary btn-cta" onClick={() => setMenuOpen(false)}>
            Începe un proiect →
          </Link>
        </div>
      </div>
    </>
  );
}
