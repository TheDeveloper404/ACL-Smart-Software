'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useState, useEffect } from 'react';

// `insights` rămâne doar în română (vezi app/[locale]/insights/page.tsx) — marcat `raw`,
// randat ca ancoră simplă spre `/insights` neprefixat, nu ca `Link` din i18n/navigation,
// altfel sub locale `en` ar duce la `/en/insights`, care dă notFound().
const NAV_ITEMS: Record<'ro' | 'en', { id: string; label: string; href: string; raw?: boolean }[]> = {
  ro: [
    { id: 'servicii', label: 'Servicii', href: '/servicii' },
    { id: 'portofoliu', label: 'Portofoliu', href: '/portofoliu' },
    { id: 'insights', label: 'Perspective', href: '/insights' },
  ],
  en: [
    { id: 'servicii', label: 'Services', href: '/servicii' },
    { id: 'portofoliu', label: 'Portfolio', href: '/portofoliu' },
    { id: 'insights', label: 'Insights', href: '/insights', raw: true },
  ],
};

const COPY = {
  ro: { brand: 'ACL Smart Software — acasă', cta: 'Începe un proiect →', open: 'Deschide meniu', close: 'Închide meniu', nav: 'Navigare principală', menu: 'Meniu mobil' },
  en: { brand: 'ACL Smart Software — home', cta: 'Start a project →', open: 'Open menu', close: 'Close menu', nav: 'Main navigation', menu: 'Mobile menu' },
};

export default function Nav() {
  const pathname = usePathname();
  const locale = useLocale() as 'ro' | 'en';
  const items = NAV_ITEMS[locale] ?? NAV_ITEMS.ro;
  const t = COPY[locale] ?? COPY.ro;
  const otherLocale = locale === 'en' ? 'ro' : 'en';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-menu-open' : ''}`} aria-label={t.nav}>
        <div className="nav-inner">
          <Link href="/" className="brand" aria-label={t.brand}>
            <div className="brand-mark" aria-hidden="true">&gt;_</div>
            <div className="brand-name"><span className="brand-acl">ACL</span> <span className="sub">Smart Software</span></div>
          </Link>

          <div className="nav-links">
            {items.map(item => item.raw ? (
              <a
                key={item.id}
                href={item.href}
                className={isActive(item.href) ? 'is-active' : ''}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.id}
                href={item.href}
                className={isActive(item.href) ? 'is-active' : ''}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" className="nav-cta">
              {t.cta}
            </Link>
            <Link href={pathname} locale={otherLocale} className="nav-lang" aria-label={otherLocale === 'en' ? 'Switch to English' : 'Comută pe română'}>
              {otherLocale.toUpperCase()}
            </Link>
          </div>

          <button
            className="nav-mobile-toggle"
            aria-label={menuOpen ? t.close : t.open}
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
        aria-label={t.menu}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-inner">
          {items.map(item => item.raw ? (
            <a
              key={item.id}
              href={item.href}
              className={isActive(item.href) ? 'is-active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.id}
              href={item.href}
              className={isActive(item.href) ? 'is-active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn btn-primary btn-cta" onClick={() => setMenuOpen(false)}>
            {t.cta}
          </Link>
          <Link href={pathname} locale={otherLocale} onClick={() => setMenuOpen(false)}>
            {otherLocale === 'en' ? 'English' : 'Română'}
          </Link>
        </div>
      </div>
    </>
  );
}
