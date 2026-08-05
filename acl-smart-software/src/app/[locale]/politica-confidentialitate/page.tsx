import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { localeAlternates } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';

// Pagină legală, doar RO — canonical indică mereu spre versiunea RO, ca să evităm conținut
// duplicat între aceasta și /en/politica-confidentialitate (identice).
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Politică de confidențialitate — ACL Smart Software',
    description: 'Cum colectăm, folosim și protejăm datele tale personale.',
    alternates: localeAlternates('/politica-confidentialitate', locale, { enAvailable: false }),
  };
}

export default async function PoliticaConfidentialitatePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PageHero
        idx="LEGAL"
        title={<>Politică de <em>confidențialitate</em></>}
        sub="Cum colectăm, folosim și protejăm datele tale personale."
        centered
      />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

            <div>
              <h3 style={{ marginBottom: 12 }}>1. Cine suntem</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                ACL Smart Software SRL, cu sediul în Str. Horea 2/31, Petroșani, Hunedoara, CUI 51219715, J2025007081009 — denumit în continuare „ACL”, „noi” sau „compania”.
                Puteți lua legătura cu noi la <a href="mailto:office@acl-smartsoftware.ro" style={{ color: 'var(--accent)' }}>office@acl-smartsoftware.ro</a>.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>2. Ce date colectăm</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Prin formularul de contact colectăm: nume, adresă de email, denumire companie (opțional), buget estimat și descrierea proiectului.
                Nu colectăm date sensibile și nu procesăm date ale minorilor.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>3. De ce le colectăm (scopul)</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Datele transmise prin formular sunt folosite exclusiv pentru a răspunde solicitării tale și pentru a stabili o discuție despre proiect.
                Nu folosim datele pentru marketing automat fără acordul tău explicit.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>4. Temeiul juridic</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Prelucrarea se bazează pe interesul legitim (GDPR Art. 6(1)(f)) de a răspunde solicitărilor primite și, acolo unde este cazul, pe consimțământul tău explicit.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>5. Cât timp păstrăm datele</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Datele de contact se păstrează maxim 24 de luni de la ultima comunicare, după care sunt șterse. Datele din contracte se păstrează conform obligațiilor legale (10 ani).
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>6. Drepturile tale</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Conform GDPR ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție. Pentru orice solicitare, scrie-ne la{' '}
                <a href="mailto:office@acl-smartsoftware.ro" style={{ color: 'var(--accent)' }}>office@acl-smartsoftware.ro</a>.
                Ai și dreptul de a depune plângere la ANSPDCP (<a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>dataprotection.ro</a>).
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>7. Cookies</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Site-ul folosește un cookie tehnic pentru salvarea preferințelor de temă (culoare, mod luminos/întunecat). Nu folosim cookie-uri de tracking sau analytics de la terți.
                Detalii în <Link href="/cookies" style={{ color: 'var(--accent)' }}>Politica Cookies</Link>.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>8. Modificări</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Această politică poate fi actualizată. Data ultimei revizuiri: <strong>mai 2026</strong>.
              </p>
            </div>

          </div>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
