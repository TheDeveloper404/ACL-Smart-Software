import { STEPS } from '@/data';

export default function Process() {
  return (
    <section className="section process" id="proces">
      <div className="wrap">
        <div className="section-head">
          <div className="label-col">
            <div className="idx">03 / PROCES</div>
            <div className="eyebrow">Cum lucrăm</div>
          </div>
          <h2>Cinci pași. <em>Zero magie</em>. Doar disciplină.</h2>
        </div>
        <div className="process-steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-num">→ {s.n}</div>
              <div><h3>{s.title}</h3></div>
              <div>
                <p>{s.desc}</p>
                <div className="deliver">
                  {s.deliver.map((d) => <span className="deliver-item" key={d}>{d}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
