'use client';

import { useEffect, useRef, useState } from 'react';
import { LightbulbIcon } from '@phosphor-icons/react/dist/ssr/Lightbulb';
import { StackIcon } from '@phosphor-icons/react/dist/ssr/Stack';
import { BrowserIcon } from '@phosphor-icons/react/dist/ssr/Browser';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { RocketLaunchIcon } from '@phosphor-icons/react/dist/ssr/RocketLaunch';
import { BrainIcon } from '@phosphor-icons/react/dist/ssr/Brain';

const ICONS = [LightbulbIcon, StackIcon, BrowserIcon, CheckCircleIcon, RocketLaunchIcon, BrainIcon];
const COPY = {
  ro: {
    label: 'De la idee la lansare', hint: 'Explorează fiecare etapă',
    nodes: ['Idee', 'Arhitectură', 'Aplicație web', 'Validare', 'Lansare', 'Automatizare AI'],
    descriptions: [
      'Pornim de la problema reală și definim ce ar însemna un rezultat bun.',
      'Conectăm fluxurile, datele și sistemele într-o arhitectură potrivită proiectului.',
      'Construim incremental. Vezi produsul în lucru și poți da feedback la fiecare demo.',
      'Verificăm fluxurile, permisiunile și comportamentul înainte de lansare.',
      'Punem produsul în producție, cu monitorizare, documentație și plan de revenire.',
      'Automatizăm pașii repetitivi unde AI aduce valoare, cu limite și validare umană.',
    ],
  },
  en: {
    label: 'From idea to launch', hint: 'Explore each stage',
    nodes: ['Idea', 'Architecture', 'Web application', 'Validation', 'Launch', 'AI automation'],
    descriptions: [
      'We start with the real problem and define what a good outcome looks like.',
      'We connect workflows, data and systems in an architecture suited to your project.',
      'We build incrementally. See the product in progress and give feedback at each demo.',
      'We verify workflows, permissions and behaviour before launch.',
      'We ship with monitoring, documentation and a rollback plan.',
      'We automate repetitive tasks where AI adds value, with limits and human verification.',
    ],
  },
};

// These paths visualize the connections between the six selectable workflow stages.
const EDGE_NODES = [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 2]];
const CONNECTIONS = ['M100 87H128Q145 87 145 105V126Q145 144 165 144H195', 'M225 175V196Q225 217 246 217H310', 'M345 252H405', 'M475 252H532', 'M337 285V336Q337 355 316 355H241', 'M180 324V285Q180 270 199 270H290'];

export default function ConnectedProcess({ locale }: { locale: string }) {
  const t = locale === 'en' ? COPY.en : COPY.ro;
  const [active, setActive] = useState(2);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div className={`connected-process${visible ? ' is-visible' : ''}`} ref={root} role="group" aria-label={t.label}>
      <div className="flow-canvas">
        <div className="flow-ambient" aria-hidden="true" />
        <svg className="flow-connections" viewBox="0 0 620 410" aria-hidden="true">
          {CONNECTIONS.map((d, i) => <g key={d} className={EDGE_NODES[i].includes(active) ? 'flow-edge is-linked' : 'flow-edge'}><path d={d} className="flow-wire-base" /><path d={d} className="flow-wire" /><path d={d} className="flow-trace" style={{ animationDelay: `${i * -.7}s` }} /><path d={d} pathLength={1} className="flow-packet" style={{ animationDelay: `${i * -.8}s` }} /></g>)}
        </svg>
        <svg className="flow-connections-mobile" viewBox="0 0 100 360" preserveAspectRatio="none" aria-hidden="true">
          {['M46 50H54', 'M77 100V115H23V130', 'M46 180H54', 'M77 230V245H23V260', 'M46 180H48.5V310H54', 'M54 310H51.5V180H46'].map((d, i) => <g key={d} data-from={EDGE_NODES[i][0]} data-to={EDGE_NODES[i][1]} className={EDGE_NODES[i].includes(active) ? 'flow-edge is-linked' : 'flow-edge'}>
            <path className="flow-wire-base" d={d} vectorEffect="non-scaling-stroke" />
            <path className="flow-wire" d={d} vectorEffect="non-scaling-stroke" />
            <path className="flow-trace" d={d} vectorEffect="non-scaling-stroke" style={{ animationDelay: `${i * -.7}s` }} />
            <path className="flow-packet" d={d} vectorEffect="non-scaling-stroke" pathLength={1} style={{ animationDelay: `${i * -.8}s` }} />
          </g>)}
        </svg>
        {t.nodes.map((label, i) => {
          const Icon = ICONS[i];
          return <button type="button" key={label} className={`flow-node flow-node-${i}${active === i ? ' is-active' : ''}`} aria-pressed={active === i} aria-describedby="flow-description" onClick={() => setActive(i)}><span className="flow-node-index" aria-hidden="true">0{i + 1}</span><span className="flow-node-icon"><Icon size={30} weight="light" aria-hidden="true" /></span><span>{label}</span><span className="flow-node-port port-in" aria-hidden="true" /><span className="flow-node-port port-out" aria-hidden="true" /></button>;
        })}
      </div>
      <div className="flow-caption"><span className="flow-hint">{t.hint}</span><p id="flow-description" aria-live="polite">{t.descriptions[active]}</p></div>
    </div>
  );
}
