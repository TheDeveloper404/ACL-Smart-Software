import Image from 'next/image';
import Link from 'next/link';
import { TEAM } from '@/data';
import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Echipă — Ingineri Seniori din Petroșani | ACL Smart Software',
  description: 'Oamenii din spatele ACL Smart Software. Ingineri seniori, zero outsourcing. Echipa care discută cu tine e echipa care construiește.',
  alternates: { canonical: 'https://acl-smartsoftware.ro/echipa' },
  openGraph: {
    title: 'Echipă — Ingineri Seniori din Petroșani',
    description: 'Zero outsourcing. Echipa care discută cu tine e echipa care construiește.',
    url: 'https://acl-smartsoftware.ro/echipa',
    type: 'website',
  },
};

export default function EchipaPage() {
  const [ceo, ...rest] = TEAM;

  return (
    <>
      <PageHero
        idx="ECHIPĂ"
        title={<>O echipă mică.<br /><em>Zero outsourcing</em><br />pe ascuns.</>}
        sub="Echipa care discută cu tine e echipa care construiește. Fără subcontractori, fără surprize."
      />
      <section className="section">
        <div className="wrap">

          {/* CEO editorial card */}
          <div className="ceo-editorial">
            <div className="ceo-photo-col">
              <div className="ceo-photo-wrap">
                <div className="ceo-photo-fallback" aria-hidden="true">LB</div>
                <Image
                  src="/liviu-bancila.png"
                  alt="Liviu Băncilă — CEO ACL Smart Software"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  priority
                />
              </div>
              <div className="ceo-photo-label">
                <span className="ceo-photo-name">{ceo.name}</span>
                <span className="ceo-photo-role">CEO &amp; Fondator</span>
              </div>
            </div>

            <div className="ceo-content-col">
              <h2 className="ceo-heading">Software-ul smart începe<br />cu oameni <span className="brand-acl">smarter</span>.</h2>
              <p className="ceo-intro">
                Am fondat <strong className="brand-acl">ACL</strong> Smart Software pentru că am văzut prea multe proiecte livrate „pe hârtie", dar care nu au rezolvat nicio problemă reală. Voiam altceva — o companie care se implică, care înțelege businessul clientului și care rămâne alături după go-live.
              </p>
              <p className="ceo-body">
                Lucrăm cu companii de toate dimensiunile — de la startup-uri care validează o idee, până la grupuri industriale care au nevoie să modernizeze sisteme cu zeci de ani în spate. Ce nu se schimbă niciodată: abordarea directă, codul care rămâne 100% al clientului și onestitatea față de termene și costuri.
              </p>

              <blockquote className="ceo-quote">
                „Nu livrăm și plecăm. Construim parteneriate pe ani, nu pe sprint-uri."
              </blockquote>

            </div>
          </div>

          {/* Rest of team — text list */}
          <div className="team-list">
            <div className="team-list-header">
              <span>Echipă</span>
              <span>Rol</span>
              <span>Background</span>
            </div>
            {rest.map((m) => (
              <div key={m.name} className="team-list-row">
                <div className="team-list-name">{m.name}</div>
                <div className="team-list-role">{m.role}</div>
                <div className="team-list-bio">{m.bio}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 80, padding: '56px 40px', border: '1px solid var(--hairline)', borderRadius: 16, background: 'var(--bg-card)', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>Vrei să faci parte din echipă?</h2>
            <p style={{ marginTop: 16, color: 'var(--fg-muted)', maxWidth: '52ch', margin: '16px auto 0' }}>
              Angajăm oameni buni. Mereu. Chiar dacă nu avem un rol deschis acum.
            </p>
            <Link href="/cariere" className="btn btn-primary" style={{ marginTop: 28, display: 'inline-flex' }}>
              Roluri deschise <span className="arrow">→</span>
            </Link>
          </div>

        </div>
      </section>
      <ContactStrip />
    </>
  );
}
