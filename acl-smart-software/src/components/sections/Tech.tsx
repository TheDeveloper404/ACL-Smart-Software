import { TECH_ITEMS, TECH_CATEGORIES } from '@/data';

export default function Tech() {
  return (
    <section className="tech-section" id="tehnologii">
      <div className="wrap">
        <div className="section-head">
          <div className="label-col">
            <div className="idx">05 / TEHNOLOGII</div>
            <div className="eyebrow">Stack-ul nostru</div>
          </div>
          <h2>Folosim ce <em>are sens</em>, nu ce e la modă.</h2>
        </div>
      </div>

      <div className="tech-marquee" aria-hidden="true">
        <div className="tech-track">
          {[...TECH_ITEMS, ...TECH_ITEMS].map((t, i) => (
            <span className="tech-item" key={i}>{t}</span>
          ))}
        </div>
      </div>

    </section>
  );
}
