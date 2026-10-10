import type { ReactNode } from 'react';

interface PageHeroProps {
  idx: string;
  title: ReactNode;
  sub?: string;
  centered?: boolean;
}

// Câmp decorativ de caractere (fundal „data"), determinist ca serverul și clientul să randeze identic.
const CHARS = '01';
let seed = 7;
const GLYPHS = Array.from({ length: 14 }, () => Array.from({ length: 72 }, () => { seed = (seed * 16807) % 2147483647; return seed % 5 === 0 ? ' ' : CHARS[seed % CHARS.length]; }).join(' ')).join('\n');

export default function PageHero({ idx, title, sub, centered }: PageHeroProps) {
  return (
    <header className={`page-hero${centered ? ' page-hero-centered' : ''}`}>
      <div className="grid-bg" aria-hidden="true" />
      <div className="hero-beam" aria-hidden="true" />
      <pre className="hero-glyphs" aria-hidden="true">{GLYPHS}</pre>
      <div className="wrap">
        <div className="page-hero-idx">{idx}</div>
        <h1>{title}</h1>
        {sub && <p className="page-hero-sub">{sub}</p>}
      </div>
    </header>
  );
}
