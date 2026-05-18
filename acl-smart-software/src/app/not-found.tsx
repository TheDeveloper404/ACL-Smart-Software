import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Pagina nu există | ACL Smart Software',
};

export default function NotFound() {
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
        Pagina nu există.
      </h1>
      <p style={{ color: 'var(--fg-muted)', fontSize: 17, maxWidth: '44ch', lineHeight: 1.6 }}>
        Fie ai nimerit un link greșit, fie pagina a fost mutată. Nu e nicio problemă — hai înapoi la ceva real.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
        <Link href="/" className="btn btn-primary">
          Înapoi acasă <span className="arrow">→</span>
        </Link>
        <Link href="/servicii" className="btn">
          Servicii
        </Link>
        <Link href="/#contact" className="btn">
          Contact
        </Link>
      </div>
    </div>
  );
}
