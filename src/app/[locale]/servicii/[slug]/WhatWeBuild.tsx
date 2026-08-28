'use client';

import { useState } from 'react';

interface Item { title: string; desc: string; }

export default function WhatWeBuild({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const item = items[active];

  return (
    <div className="wtb-layout">
      <div className="wtb-tabs">
        {items.map((it, i) => (
          <button
            key={i}
            className={`wtb-tab${active === i ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="wtb-tab-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="wtb-tab-label">{it.title}</span>
          </button>
        ))}
      </div>
      <div className="wtb-panel">
        <div className="wtb-panel-num" aria-hidden="true">
          {String(active + 1).padStart(2, '0')}
        </div>
        <h3 className="wtb-panel-title">{item.title}</h3>
        <p className="wtb-panel-desc">{item.desc}</p>
      </div>
    </div>
  );
}
