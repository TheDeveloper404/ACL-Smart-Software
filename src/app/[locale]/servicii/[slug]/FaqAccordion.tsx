'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <dl className="faq-list">
      {items.map((item, i) => (
        <div
          key={i}
          className="faq-item"
          data-open={open === i ? 'true' : undefined}
        >
          <dt className="faq-q">
            <button type="button" aria-expanded={open === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpen(open === i ? null : i)}>
            {item.q}
            <span className="toggle" aria-hidden="true">+</span>
            </button>
          </dt>
          <dd id={`faq-answer-${i}`} className="faq-a" hidden={open !== i}>{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}
