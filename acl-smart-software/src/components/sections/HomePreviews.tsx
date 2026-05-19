import Link from 'next/link';

export default function HomePreviews() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div className="label-col">
            <div className="idx">04 / EXPLOREAZĂ</div>
            <div className="eyebrow">Vezi mai mult</div>
          </div>
          <h2>Patru pagini, <em>o singură poveste</em>.</h2>
        </div>
        <div className="home-preview-grid">
          <Link href="/portofoliu" className="home-preview-card">
            <div className="num">/ PORTOFOLIU</div>
            <h3>Studii de caz reale. Rezultate măsurate, nu vagi.</h3>
            <p>De la platforme de dispatching la copilot-i AI pentru avocați — cu metrici concrete și stack-uri vizibile.</p>
            <span className="more">Vezi portofoliul <span>→</span></span>
          </Link>
          <Link href="/echipa" className="home-preview-card">
            <div className="num">/ ECHIPĂ</div>
            <h3>O echipă mică. Zero outsourcing pe ascuns.</h3>
            <p>Cine suntem, ce facem, cum gândim. Tot ce contează despre oamenii care îți vor scrie codul.</p>
            <span className="more">Cunoaște echipa <span>→</span></span>
          </Link>
          <Link href="/insights" className="home-preview-card">
            <div className="num">/ PERSPECTIVE</div>
            <h3>Articole pentru oameni tehnici și cei care îi conduc.</h3>
            <p>Lecții reale din proiecte reale. Fără content marketing, doar lucruri pe care le-am învățat la prețul greu.</p>
            <span className="more">Citește perspectivele <span>→</span></span>
          </Link>
          <Link href="/cariere" className="home-preview-card">
            <div className="num">/ CARIERE</div>
            <h3>Roluri deschise. 100% remote.</h3>
            <p>Lucrăm puțin, dar serios. Fără standup-uri inutile, fără ședințe care puteau fi un email.</p>
            <span className="more">Vezi rolurile <span>→</span></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
