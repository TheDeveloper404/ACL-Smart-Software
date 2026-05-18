import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termeni și condiții — ACL Smart Software',
  description: 'Termenii și condițiile de utilizare a site-ului ACL Smart Software.',
};

export default function TermeniPage() {
  return (
    <>
      <PageHero
        idx="LEGAL"
        title={<>Termeni și <em>condiții</em></>}
        sub="Termenii care guvernează utilizarea site-ului și a serviciilor noastre."
        centered
      />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

            <div>
              <h3 style={{ marginBottom: 12 }}>1. Acceptarea termenilor</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Prin accesarea site-ului acl-smartsoftware.ro accepți prezentele Termeni și Condiții. Dacă nu ești de acord, te rugăm să nu folosești site-ul.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>2. Proprietatea intelectuală</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Tot conținutul de pe acest site — texte, design, cod, grafice — aparține ACL Smart Software SRL și este protejat de legislația privind drepturile de autor.
                Reproducerea fără acord scris este interzisă.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>3. Limitarea răspunderii</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Site-ul este furnizat „ca atare". ACL Smart Software nu garantează disponibilitatea neîntreruptă și nu răspunde pentru daune indirecte rezultate din utilizarea site-ului.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>4. Link-uri externe</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Site-ul poate conține link-uri către site-uri terțe. ACL Smart Software nu răspunde pentru conținutul acestora și nu controlează politicile lor de confidențialitate.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>5. Contracte de prestări servicii</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Relația comercială dintre ACL Smart Software și clienți este guvernată de contractele individuale semnate de ambele părți, nu de prezentele Termeni de utilizare a site-ului.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>6. Legea aplicabilă</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Prezentele Termeni sunt guvernate de legislația română. Eventualele litigii se vor soluționa pe cale amiabilă sau, în lipsa unui acord, de instanțele competente din România.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>7. Contact</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Pentru orice întrebare referitoare la acești termeni, ne poți scrie la{' '}
                <a href="mailto:office@acl-smartsoftware.ro" style={{ color: 'var(--accent)' }}>office@acl-smartsoftware.ro</a>.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: 12 }}>8. Modificări</h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                ACL Smart Software își rezervă dreptul de a modifica acești termeni. Data ultimei revizuiri: <strong>mai 2026</strong>.
              </p>
            </div>

          </div>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
