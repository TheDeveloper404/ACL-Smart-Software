import type { ReactNode } from 'react';

interface PageHeroProps {
  idx: string;
  title: ReactNode;
  sub?: string;
  centered?: boolean;
}

export default function PageHero({ idx, title, sub, centered }: PageHeroProps) {
  return (
    <header className={`page-hero${centered ? ' page-hero-centered' : ''}`}>
      <div className="grid-bg" aria-hidden="true" />
      <div className="wrap">
        <div className="page-hero-idx">{idx}</div>
        <h1>{title}</h1>
        {sub && <p className="page-hero-sub">{sub}</p>}
      </div>
    </header>
  );
}
