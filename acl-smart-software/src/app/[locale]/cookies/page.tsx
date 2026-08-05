import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import type { Metadata } from 'next';
import { localeAlternates } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';

// Pagină legală, doar RO — accesibilă și sub /en (nu are sens dublat conținutul), dar
// canonical indică mereu spre /cookies: /en/cookies și /cookies afișează exact același
// text, iar fără asta ar fi conținut duplicat în ochii Google.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Politică Cookies — ACL Smart Software',
    description: 'Informații despre cookie-urile folosite pe site-ul ACL Smart Software.',
    alternates: localeAlternates('/cookies', locale, { enAvailable: false }),
  };
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PageHero
        idx="LEGAL"
        title={<>Politică <em>Cookies</em></>}
        sub="Ce cookie-uri folosim și de ce."
        centered
      />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

            <div>
              <h3 style={{ marginBottom: 12 }}>Ce sunt cookie-urile</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Cookie-urile sunt fișiere text mici stocate în browserul tău când vizitezi un site web. Ele permit site-ului să rețină preferințele tale și să funcționeze corect la vizitele ulterioare.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>Cookie-urile pe care le folosim</h3>
              <div style={{ overflowX: 'auto', marginTop: 8 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--hairline)' }}>
                      <th style={{ textAlign: 'left', padding: '10px 16px 10px 0', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>Nume</th>
                      <th style={{ textAlign: 'left', padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>Tip</th>
                      <th style={{ textAlign: 'left', padding: '10px 0', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>Scop</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--hairline)' }}>
                      <td style={{ padding: '12px 16px 12px 0', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>acl-tweaks-v2</td>
                      <td style={{ padding: '12px 16px', color: 'var(--fg-muted)' }}>Local Storage</td>
                      <td style={{ padding: '12px 0', color: 'var(--fg-muted)' }}>Reține preferințele de temă (culoare accent, mod luminos/întunecat). Nu este transmis serverului.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>Cookie-uri de la terți</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Nu folosim cookie-uri de tracking, analytics sau publicitate de la terți (Google Analytics, Facebook Pixel etc.).
                Site-ul nu transmite date despre comportamentul tău către nicio platformă externă.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>Cum poți controla cookie-urile</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Poți șterge preferințele salvate oricând din setările browserului (Application → Local Storage → acl-tweaks-v2).
                Ștergerea nu afectează funcționarea site-ului — vei reveni la tema implicită.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>Contact</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Întrebări despre cookie-uri:{' '}
                <a href="mailto:office@acl-smartsoftware.ro" style={{ color: 'var(--accent)' }}>office@acl-smartsoftware.ro</a>.
              </p>
            </div>

          </div>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
