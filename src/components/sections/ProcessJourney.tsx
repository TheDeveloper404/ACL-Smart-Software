'use client';

import type { ProcessStep } from '@/types';
import { PROCESS_NOTES } from '@/data/process-notes';
import { CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';
import useRovingTabs from '@/components/ui/useRovingTabs';
import MotionSurface from '@/components/ui/MotionSurface';

export default function ProcessJourney({ steps, locale }: { steps: ProcessStep[]; locale: string }) {
  const { active, setActive, refs, onKeyDown } = useRovingTabs(steps.length);
  const en = locale === 'en';
  const notes = PROCESS_NOTES[en ? 'en' : 'ro'];
  const total = String(steps.length).padStart(2, '0');
  return <MotionSurface className="process-journey process-bento">
    <div className="journey-tabs" role="tablist" aria-label={en ? 'Project stages' : 'Etapele proiectului'}>
      {steps.map((step, i) => <button key={step.n} id={`journey-tab-${step.n}`} type="button" role="tab"
        ref={element => { refs.current[i] = element; }}
        aria-selected={active === i} aria-controls={`journey-panel-${step.n}`} tabIndex={active === i ? 0 : -1}
        onClick={() => setActive(i)} onKeyDown={event => onKeyDown(event, i)}
        className={active === i ? 'journey-tab is-active' : 'journey-tab'}>
        <span className="journey-number">{step.n}</span><span>{step.title}</span>
      </button>)}
    </div>
    {steps.map((step, i) => <div key={step.n} id={`journey-panel-${step.n}`} role="tabpanel"
      aria-labelledby={`journey-tab-${step.n}`} tabIndex={0} hidden={active !== i} className="journey-panel">
      <div className="journey-overview">
        <p className="eyebrow">{en ? 'Selected stage' : 'Etapa selectată'}</p>
        <p className="journey-position"><strong>{step.n}</strong><span>/ {total}</span></p>
        <h3>{step.title}</h3><p className="journey-description">{step.desc}</p>
        <div className="journey-next"><span>{i + 1 < steps.length ? (en ? 'Next stage' : 'Etapa următoare') : (en ? 'After launch' : 'După lansare')}</span>
          <p>{steps[i + 1]?.title ?? (en ? 'One year of free support' : 'Un an de suport gratuit')}</p>
        </div>
      </div>
      <div className="journey-deliver">
        <div className="journey-deliver-head"><strong className="journey-deliver-count">{step.deliver.length}</strong>
          <p className="journey-deliver-label">{en ? 'Deliverables at this stage' : 'Livrabile în această etapă'}</p></div>
        <ul>{step.deliver.map(item => <li key={item}><CheckIcon size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul>
      </div>
      <div className="journey-client"><p className="eyebrow">{en ? 'Your involvement' : 'Implicarea ta'}</p>
        <h4>{en ? 'We work together' : 'Lucrăm împreună'}</h4><p>{notes[step.n].client}</p></div>
      <div className="journey-checkpoint"><p className="eyebrow">{en ? 'What we check' : 'Ce verificăm'}</p>
        <h4>{en ? 'A clear checkpoint' : 'Un reper clar'}</h4><p>{notes[step.n].checkpoint}</p></div>
    </div>)}
    <div className="journey-summary">
      <div className="journey-summary-item"><strong className="journey-stage-count">{steps.length}</strong><p>{en ? 'Stages, from the first conversation to support' : 'Etape, de la prima discuție la suport'}</p></div>
      <div className="journey-summary-item"><strong className="journey-demo-frequency">~2</strong><p>{en ? 'Weeks between demos' : 'Săptămâni între demo-uri'}<span>{en ? 'Progress updates and feedback' : 'Progres și feedback'}</span></p></div>
      <div className="journey-summary-item"><strong className="journey-support-duration">1</strong><p>{en ? 'Year of free support' : 'An de suport gratuit'}<span>{en ? 'Usage help and bug fixes' : 'Ajutor la utilizare și remedieri'}</span></p></div>
    </div>
    <p className="journey-hint">{en ? 'Select a stage to see what happens, what you receive and how you take part.' : 'Alege o etapă ca să vezi ce facem, ce primești și cum te implici.'}</p>
  </MotionSurface>;
}
