'use client';

import { useState } from 'react';

interface Value { title: string; desc: string; proof: string; }

export default function ValuesAccordion({ values }: { values: Value[] }) {
  const [active, setActive] = useState(0);
  const value = values[active];
  return <div className="values-layout">
    <div className="values-accordion">{values.map((v, i) => <div className={`value-item${active === i ? ' is-open' : ''}`} key={v.title}>
      <h3><button type="button" className="value-toggle" aria-expanded={active === i} aria-controls={`value-panel-${i}`} onClick={() => setActive(i)}><span className="value-num">{String(i + 1).padStart(2, '0')}</span><span className="value-title">{v.title}</span><span className="value-sign" aria-hidden="true" /></button></h3>
      <div className="value-panel" id={`value-panel-${i}`} hidden={active !== i}><p>{v.desc}</p></div>
    </div>)}</div>
    <div className="values-visual glass" key={active}>
      <span className="values-visual-num" aria-hidden="true">{String(active + 1).padStart(2, '0')}</span>
      <ul>{value.proof.split(' · ').map((p, i) => <li key={p} style={{ animationDelay: `${i * .12}s` }}>{p}</li>)}</ul>
    </div>
  </div>;
}
