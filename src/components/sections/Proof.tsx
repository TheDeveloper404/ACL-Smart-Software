import { Fragment } from 'react';
import { Link } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
import { getCases } from '@/data';
import { REVIEWS } from '@/data/reviews';

const COPY = {
  ro: { idx: '01 / DOVADĂ', eyebrow: 'Ce am livrat', all: 'Tot portofoliul' },
  en: { idx: '01 / PROOF', eyebrow: 'What we shipped', all: 'Full portfolio' },
};

export default async function Proof() {
  const locale = await getLocale();
  const t = COPY[locale as keyof typeof COPY] ?? COPY.ro;
  // Cele două scurte, pentru un bloc discret pe homepage (cea lungă rămâne pe /despre-noi).
  const reviews = (REVIEWS[locale as keyof typeof REVIEWS] ?? REVIEWS.ro).slice(1, 3);
  const live = getCases(locale).filter((c) => c.link);

  if (reviews.length === 0 && live.length === 0) return null;

  return (
    <section className="section proof" id="dovada">
      <div className="wrap">
        <div className="proof-head">
          <div className="label-col">
            <span className="idx">{t.idx}</span>
            <span className="eyebrow">{t.eyebrow}</span>
          </div>
          {live.length > 0 && (
            <p className="proof-live">
              {live.map((c, i) => (
                <Fragment key={c.slug}>
                  {i > 0 && <span className="sep">·</span>}
                  <a href={c.link} target="_blank" rel="noopener noreferrer">{c.label} ↗</a>
                </Fragment>
              ))}
            </p>
          )}
        </div>

        {reviews.length > 0 && (
          <ul className="proof-quotes">
            {reviews.map((r) => (
              <li className="proof-quote" key={r.name + r.quote.slice(0, 24)}>
                <p>{r.quote}</p>
                <span className="proof-quote-by">{r.name} · {r.role}</span>
              </li>
            ))}
          </ul>
        )}

        <Link href="/portofoliu" className="proof-all">{t.all} →</Link>
      </div>
    </section>
  );
}
