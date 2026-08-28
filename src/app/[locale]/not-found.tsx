import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: '404 — Pagina nu există | ACL Smart Software',
};

const COPY = {
  ro: {
    title: 'Pagina nu există.',
    body: 'Fie ai nimerit un link greșit, fie pagina a fost mutată. Nu e nicio problemă — hai înapoi la ceva real.',
    home: 'Înapoi acasă',
    services: 'Servicii',
    contact: 'Contact',
  },
  en: {
    title: 'This page doesn’t exist.',
    body: 'Either the link was wrong, or the page moved. No harm done — let’s get you back to something real.',
    home: 'Back home',
    services: 'Services',
    contact: 'Contact',
  },
};

export default async function NotFound() {
  const locale = await getLocale();
  const t = COPY[locale as keyof typeof COPY] ?? COPY.ro;

  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px var(--pad-x)',
      gap: 24,
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>
        404
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
        {t.title}
      </h1>
      <p style={{ color: 'var(--fg-muted)', fontSize: 17, maxWidth: '44ch', lineHeight: 1.6 }}>
        {t.body}
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
        <Link href="/" className="btn btn-primary">
          {t.home} <span className="arrow">→</span>
        </Link>
        <Link href="/servicii" className="btn">
          {t.services}
        </Link>
        <Link href="/#contact" className="btn">
          {t.contact}
        </Link>
      </div>
    </div>
  );
}
