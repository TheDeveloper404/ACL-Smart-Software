import Image from 'next/image';
import type { Case } from '@/types';
import MotionSurface from '@/components/ui/MotionSurface';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';
import { projectAnchor } from '@/lib/project-selection';

interface Props { cases: Case[]; labels?: { done: string; link: string }; }
const DEFAULT_LABELS = { done: 'Realizat', link: 'Vezi proiectul' };

export default function PortofoliuGrid({ cases, labels = DEFAULT_LABELS }: Props) {
  return <section className="section"><div className="wrap"><MotionSurface className="cases">
    {cases.map(c => <article key={c.slug} className="case" id={projectAnchor(c.slug)} data-slug={c.slug}>
      <div className="case-img">{c.image && <Image src={c.image} alt={c.title} fill sizes="(max-width: 760px) 90vw, 46vw" style={{ objectFit: 'cover', objectPosition: 'top center' }} />}
        <span className="case-done-badge">{labels.done}</span></div>
      <div className="case-body"><div className="case-meta"><span>{c.tag}</span><span className="dot" aria-hidden="true" /><span>{c.year}</span></div>
        <h3>{c.title}</h3><p>{c.desc}</p>
        {c.results.length > 0 && <div className="case-result">{c.results.map(result => <div key={result.l}><div className="r-num">{result.n}</div><div className="r-lbl">{result.l}</div></div>)}</div>}
        {c.link && <a href={c.link} target="_blank" rel="noopener noreferrer" className="read-more" aria-label={`${labels.link}: ${c.label}`}>
          {labels.link}<ArrowUpRightIcon size={18} aria-hidden="true" /></a>}
      </div>
    </article>)}
  </MotionSurface></div></section>;
}
