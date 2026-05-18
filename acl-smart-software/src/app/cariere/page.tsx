import { ROLES } from '@/data';
import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cariere — Joburi Software în Petroșani | ACL Smart Software',
  description: 'Joburi în software la Petroșani și remote. Salarii transparente, 25 zile concediu, buget €1.500/an pentru învățare. Fără bullshit corporate.',
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
    title: 'Buget de învățare',
    desc: '€1.500 / an pentru cursuri, conferințe, cărți. Plus o zi / lună de „learning sprint".',
  },
  {
    title: 'Asigurare medicală',
    desc: 'Regina Maria sau Medicover, abonament premium pentru tine și familie.',
  },
  {
    title: '25 zile concediu',
    desc: 'Plus 5 zile „bug days" (zile libere când n-ai chef). Plus sărbătorile legale.',
  },
  {
    title: 'Hardware ales de tine',
    desc: 'Laptop, monitor, scaun, periferice — alegi tu, plătim noi. Reînnoit la 3 ani.',
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
    title: 'Cunoaște echipa',
    desc: 'O zi cu echipa, conversații libere, prânz împreună. Tu decizi dacă te potrivești la fel ca noi.',
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
              <div className="idx">/ ROLURI DESCHISE</div>
              <div className="eyebrow">{ROLES.length} poziții deschise</div>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 44px)' }}>
              Salariile sunt în descriere. <em>Nimic ascuns</em>.
            </h2>
          </div>

          <div className="roles-list">
            {ROLES.map((r) => (
              <a
                key={r.slug}
                href={`mailto:office@acl-smartsoftware.ro?subject=Aplicare ${encodeURIComponent(r.title)}`}
                className="role-row"
              >
                <div>
                  <div className="r-title">{r.title}</div>
                  <div className="r-desc">{r.desc}</div>
                </div>
                <div className="r-meta-col">{r.meta}</div>
                <div className="r-salary">{r.salary}</div>
                <div className="r-arrow">→</div>
              </a>
            ))}
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
