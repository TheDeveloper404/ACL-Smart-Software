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
          onClick={() => setOpen(open === i ? null : i)}
        >
          <dt className="faq-q">
            {item.q}
            <span className="toggle" aria-hidden="true">+</span>
          </dt>
          <dd className="faq-a">{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}
