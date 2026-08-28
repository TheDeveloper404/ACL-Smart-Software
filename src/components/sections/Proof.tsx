import { Link } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
import { getCases } from '@/data';
import { REVIEWS, initialsOf } from '@/data/reviews';

const COPY = {
  ro: {
    eyebrow: 'Ce am livrat',
    h2: <>Produse <em>live</em>, în producție.</>,
    liveLabel: 'Vezi live →',
    allWork: 'Tot portofoliul',
  },
  en: {
    eyebrow: 'What we shipped',
    h2: <>Products <em>live</em> in production.</>,
    liveLabel: 'View live →',
    allWork: 'Full portfolio',
  },
};

// Cele două case-uri cu cea mai multă substanță de produs, evidențiate pe homepage.
const FEATURED = ['flotapro', 'detalia'];

export default async function Proof() {
  const locale = await getLocale();
  const t = COPY[locale as keyof typeof COPY] ?? COPY.ro;
  const reviews = (REVIEWS[locale as keyof typeof REVIEWS] ?? REVIEWS.ro).slice(0, 2);
  const cases = getCases(locale);
  const featured = FEATURED
    .map((slug) => cases.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  if (reviews.length === 0 && featured.length === 0) return null;

  return (
    <section className="section" id="dovada">
      <div className="wrap">
        <div className="section-head">
          <div className="label-col">
            <div className="eyebrow">{t.eyebrow}</div>
          </div>
          <h2>{t.h2}</h2>
        </div>

        {featured.length > 0 && (
          <div className="proof-cases">
            {featured.map((c) => (
              <article className="proof-case" key={c.slug}>
                <div className="proof-case-top">
                  <span className="proof-case-label">{c.label}</span>
                  <span className="proof-case-year">{c.year}</span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="proof-case-foot">
                  {c.link ? (
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="proof-case-link">
                      {t.liveLabel}
                    </a>
                  ) : <span />}
                  <Link href={`/portofoliu#${c.slug}`} className="proof-case-more">{c.tag}</Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {reviews.length > 0 && (
          <div className="reviews-grid proof-reviews">
            {reviews.map((r) => (
              <figure className="review-card" key={r.name + r.quote.slice(0, 24)}>
                <blockquote>{r.quote}</blockquote>
                <figcaption className="review-author">
                  <span className="review-avatar" aria-hidden="true">{r.initials ?? initialsOf(r.name)}</span>
                  <span>
                    <span className="review-name">{r.name}</span>
                    <span className="review-role">{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="/portofoliu" className="btn btn-ghost">
            {t.allWork} <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
