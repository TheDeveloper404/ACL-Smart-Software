import { getLocale } from 'next-intl/server';
import { STEPS } from '@/data';

const STEPS_EN = [
  { n: '01', title: 'Consulting', desc: 'We understand the problem before the solution. Technical audit, discovery sprint, validation with real users. We never skip this.', deliver: ['Technical audit', 'Roadmap', 'Honest estimate'] },
  { n: '02', title: 'Architecture', desc: 'Stack, flows, data model, UI. Everything that matters gets decided before line 1 of code is written.', deliver: ['Prototypes & UI', 'Database schema', 'Cloud architecture'] },
  { n: '03', title: 'Development', desc: '2-week sprints, a demo at the end of each, fast feedback. Continuous integration from day one. You see progress in real time.', deliver: ['Bi-weekly demo', 'Staging environment', 'Code review'] },
  { n: '04', title: 'Testing', desc: 'Dedicated QA before every launch: unit, integration, end-to-end tests and a security audit. Nothing reaches production untested.', deliver: ['Automated tests', 'Security audit', 'Quality report'] },
  { n: '05', title: 'Launch', desc: 'Going live with a rollback plan, active monitoring, and hands-on support. We’re one message away for the first 30 days.', deliver: ['Production launch', 'Monitoring & alerts', 'Live documentation'] },
  { n: '06', title: 'Maintenance', desc: 'Optimizations, new features, security updates. Your product grows — and we grow with it. Clear SLAs, no surprises.', deliver: ['Dedicated SLA', 'Ongoing roadmap', 'Annual technical audit'] },
];

const COPY = {
  ro: { idx: '03 / PROCES', eyebrow: 'Cum lucrăm', h2: <>Consultanță, arhitectură, dezvoltare, testare, lansare, mentenanță. <em>Zero magie</em>.</>, steps: STEPS },
  en: { idx: '03 / PROCESS', eyebrow: 'How we work', h2: <>Consulting, architecture, development, testing, launch, maintenance. <em>Zero magic</em>.</>, steps: STEPS_EN },
};

export default async function Process() {
  const locale = await getLocale();
  const t = COPY[locale as keyof typeof COPY] ?? COPY.ro;

  return (
    <section className="section process" id="proces">
      <div className="wrap">
        <div className="section-head">
          <div className="label-col">
            <div className="idx">{t.idx}</div>
            <div className="eyebrow">{t.eyebrow}</div>
          </div>
          <h2>{t.h2}</h2>
        </div>
        <div className="process-steps">
          {t.steps.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-num">→ {s.n}</div>
              <div><h3>{s.title}</h3></div>
              <div>
                <p>{s.desc}</p>
                <div className="deliver">
                  {s.deliver.map((d) => <span className="deliver-item" key={d}>{d}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
