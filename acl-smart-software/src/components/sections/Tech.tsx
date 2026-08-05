import { getLocale } from 'next-intl/server';
import { TECH_ITEMS } from '@/data';

const COPY = {
  ro: { idx: '05 / TEHNOLOGII', eyebrow: 'Stack-ul nostru', h2: <>Folosim ce <em>are sens</em>, nu ce e la modă.</> },
  en: { idx: '05 / TECHNOLOGIES', eyebrow: 'Our stack', h2: <>We use what <em>makes sense</em>, not what’s trendy.</> },
};

export default async function Tech() {
  const locale = await getLocale();
  const t = COPY[locale as keyof typeof COPY] ?? COPY.ro;

  return (
    <section className="tech-section" id="tehnologii">
      <div className="wrap">
        <div className="section-head">
          <div className="label-col">
            <div className="idx">{t.idx}</div>
            <div className="eyebrow">{t.eyebrow}</div>
          </div>
          <h2>{t.h2}</h2>
        </div>
      </div>

      <div className="tech-marquee" aria-hidden="true">
        <div className="tech-track">
          {[...TECH_ITEMS, ...TECH_ITEMS].map((tech, i) => (
            <span className="tech-item" key={i}>{tech}</span>
          ))}
        </div>
      </div>

    </section>
  );
}
