import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cariere — Joburi Software Remote | ACL Smart Software',
  description: 'Joburi în software 100% remote. CIM sau B2B, 25 zile concediu, buget €1.500/an pentru învățare. Fără bullshit corporate.',
  alternates: { canonical: 'https://acl-smartsoftware.ro/cariere' },
  openGraph: {
    title: 'Cariere — Joburi Software Petroșani & Remote',
    description: 'Salarii transparente, 25 zile concediu, buget €1.500/an pentru învățare.',
    url: 'https://acl-smartsoftware.ro/cariere',
    type: 'website',
  },
};

const BENEFITS = [
  {
    title: 'Salariu transparent',
    desc: 'Grilă publică pe niveluri. Creșteri pe an, nu pe „te place șeful".',
  },
  {
    title: 'Remote sau hybrid',
    desc: 'Birou modern în Petroșani când vrei contact uman. Remote când vrei să te concentrezi.',
  },
  {
    title: '25 zile concediu',
    desc: 'Plus 5 zile „bug days" (zile libere când n-ai chef). Plus sărbătorile legale.',
  },
];

const INTERVIEW_STEPS = [
  {
    step: 'STEP 01',
    title: 'Discuție 30 min',
    desc: 'Tu povestești ce ai făcut, noi povestim cum lucrăm. Fără capcane, fără puzzle-uri.',
  },
  {
    step: 'STEP 02',
    title: 'Tehnic 1.5h',
    desc: 'Code review pe un task real plătit, discutăm decizii. Niciun whiteboard, niciun „inversează un BST".',
  },
  {
    step: 'STEP 03',
    title: 'Discuție finală',
    desc: 'Vorbim deschis despre proiecte, așteptări și condiții. Tu decizi dacă te potrivești la fel ca noi.',
  },
];

export default function CarierePage() {
  return (
    <>
      <PageHero
        idx="CARIERE"
        title={<>Cariere care <em>contează</em>.<br />Cod care ajunge în producție.</>}
        sub="Lucrăm puțin, dar serios. Fără standup-uri inutile, fără ședințe care puteau fi un email, fără PowerPoint-uri. Salarii transparente, code ownership real."
      />

      <section className="section">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 24 }}>
            <div className="label-col">
              <div className="idx">/ CANDIDATURĂ SPONTANĂ</div>
              <div className="eyebrow">Fără rol deschis acum</div>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 44px)' }}>
              100% remote. <em>CIM sau B2B</em>.
            </h2>
          </div>

          <div
            style={{
              padding: '48px 40px',
              border: '1px solid var(--hairline)',
              borderRadius: 16,
              background: 'var(--bg-card)',
            }}
          >
            <p style={{ fontSize: 18, lineHeight: 1.7, margin: 0, maxWidth: '64ch' }}>
              Momentan nu avem un rol deschis anunțat public — dar asta nu înseamnă că nu ne
              interesează oamenii buni. Dacă scrii cod care ajunge în producție și te regăsești
              în felul în care lucrăm, scrie-ne. Citim fiecare mesaj și răspundem, chiar și
              atunci când răspunsul e &bdquo;nu acum&rdquo;.
            </p>
            <p style={{ fontSize: 15, color: 'var(--fg-muted)', lineHeight: 1.7, marginTop: 20, maxWidth: '64ch' }}>
              Spune-ne pe scurt ce ai construit, cu ce tehnologii lucrezi și ce fel de proiecte
              te interesează. Un link către GitHub sau ceva ce ai livrat spune mai mult decât
              un CV de trei pagini.
            </p>
            <a
              href="mailto:office@acl-smartsoftware.ro?subject=Candidatur%C4%83%20spontan%C4%83"
              className="btn btn-primary"
              style={{ marginTop: 32, display: 'inline-flex' }}
            >
              Trimite-ne un mesaj <span className="arrow">→</span>
            </a>
          </div>

          <div className="benefits-grid">
            {BENEFITS.map((b) => (
              <div key={b.title} className="benefit-card">
                <div className="benefit-label">/ BENEFICII</div>
                <h4 className="benefit-title">{b.title}</h4>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="interview-box">
            <div className="interview-eyebrow">/ PROCES INTERVIU</div>
            <h3 className="interview-heading">Trei pași. Maxim 10 zile.</h3>
            <div className="interview-steps">
              {INTERVIEW_STEPS.map((s) => (
                <div key={s.step} className="interview-step">
                  <div className="step-num">{s.step}</div>
                  <h4 className="step-title">{s.title}</h4>
                  <p className="step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
