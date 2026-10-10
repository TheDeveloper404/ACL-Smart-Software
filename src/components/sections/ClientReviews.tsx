'use client';

import type { Review } from '@/data/reviews';
import { initialsOf } from '@/data/reviews';
import { QuotesIcon } from '@phosphor-icons/react/dist/ssr/Quotes';
import useRovingTabs from '@/components/ui/useRovingTabs';

export default function ClientReviews({ reviews, locale }: { reviews: Review[]; locale: string }) {
  const { active, setActive, refs, onKeyDown } = useRovingTabs(reviews.length);
  const en = locale === 'en';
  if (!reviews.length) return null;
  return <div className="client-reviews">
    <div className="review-selectors" role="tablist" aria-label={en ? 'Client testimonials' : 'Recenziile clienților'}>
      {reviews.map((review, i) => <button key={review.name} id={`review-tab-${i}`} type="button" role="tab"
        aria-selected={active === i} aria-controls={`review-panel-${i}`} tabIndex={active === i ? 0 : -1}
        ref={element => { refs.current[i] = element; }} onClick={() => setActive(i)} onKeyDown={event => onKeyDown(event, i)}
        className={active === i ? 'review-selector is-active' : 'review-selector'}>
        <span className="review-initials" aria-hidden="true">{review.initials ?? initialsOf(review.name)}</span>
        <span><strong>{review.name}</strong><small>{review.role}</small></span><span className="review-selector-index" aria-hidden="true">0{i + 1}</span>
      </button>)}
    </div>
    {reviews.map((review, i) => <div key={review.name} id={`review-panel-${i}`} role="tabpanel" aria-labelledby={`review-tab-${i}`} tabIndex={0} hidden={active !== i} className="review-spotlight">
      <QuotesIcon className="review-quote-icon" size={42} weight="fill" aria-hidden="true" />
      <blockquote>{review.quote}</blockquote>{review.context && <p className="review-collaboration">{review.context}</p>}<div className="review-byline"><strong>{review.name}</strong><span>{review.role}</span></div>
    </div>)}
  </div>;
}
