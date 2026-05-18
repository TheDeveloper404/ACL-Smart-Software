export default function About() {
  const industries = ['Corporate / Enterprise', 'Startup-uri', 'Logistică', 'E-commerce & Retail', 'Educație', 'Imobiliare'];
  return (
    <section className="section" id="despre">
      <div className="wrap">
        <div className="section-head">
          <div className="label-col">
            <div className="idx">01 / DESPRE</div>
            <div className="eyebrow">Cine suntem</div>
          </div>
          <h2>
            <span className="h2-line">O companie mică.</span>
            <span className="h2-line">Cu <em>standarde MARI</em>.</span>
          </h2>
        </div>

        <div className="about">
          <div className="about-text">
            <p>
              <strong className="brand-acl">ACL</strong> Smart Software — nu suntem cea mai mare echipă. Suntem cei care se implică cel mai mult.
            </p>
            <p className="about-text-lg">
              Lucrăm cu corporații, cu startup-uri și cu toate dimensiunile intermediare. Ne place când proiectul are constrângeri reale: termene scurte, sisteme legacy, integrări complicate, decizii grele. Acolo aducem cea mai multă valoare.
            </p>
            <p className="about-text-lg">
              Nu suntem o agenție care livrează și pleacă. Construim parteneriate pe ani, nu pe sprint-uri.
            </p>
          </div>

          <div className="about-stats">
            <div className="about-stat">
              <div className="big">2024<span className="accent">.</span></div>
              <div className="lbl">Înființare</div>
              <div className="stat-desc">De la prima linie de cod, am ales să construim lucruri care durează — nu să livrăm și să plecăm.</div>
            </div>
            <div className="about-stat">
              <div className="big">100<span className="accent">%</span></div>
              <div className="lbl">Cod ownership</div>
              <div className="stat-desc">Tot ce construim rămâne al tău — repository, documentație, infrastructură.</div>
            </div>
            <div className="about-stat">
              <div className="big">8</div>
              <div className="lbl">Servicii oferite</div>
              <div className="stat-desc">De la web și mobile la AI, Cloud și consultanță tehnică — acoperim întreg ciclul.</div>
            </div>
            <div className="about-stat">
              <div className="big">RO<span className="accent">·</span>EU</div>
              <div className="lbl">Acoperire</div>
              <div className="stat-desc">Lucrăm cu clienți din România și Europa, remote sau on-site după nevoie.</div>
            </div>
          </div>
        </div>

        <div className="industries-row">
          <span className="lbl">Industrii →</span>
          {industries.map((ind) => (
            <span className="industry-chip" key={ind}>{ind}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
