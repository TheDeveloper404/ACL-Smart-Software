import Link from 'next/link';
import HeroTerminal from '@/components/ui/HeroTerminal';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="grid-bg" aria-hidden="true" />

      <div className="wrap">
        {/* Rândul 1: h1 stânga, terminal dreapta */}
        <div className="hero-head-grid">
          <h1>
            <span className="h1-line">Nu scriem doar <em>cod</em>.</span>
            <span className="h1-line">Construim produse care</span>
            <span className="h1-line">cresc <em>business-uri</em>.</span>
          </h1>

          <HeroTerminal />
        </div>

        {/* Rândul 2: descriere + CTA centrate */}
        <div className="hero-body-center">
          <p className="hero-sub">
            Cod care rezistă sub presiune. Sisteme care cresc odată cu business-ul tău. Echipă care livrează fără să dispară după go-live.
          </p>
          <div className="hero-cta-row">
            <Link href="/#contact" className="btn btn-primary btn-cta">
              Începe un proiect <span className="arrow">→</span>
            </Link>
            <Link href="/portofoliu" className="btn btn-ghost">
              Vezi ce am construit
            </Link>
          </div>
        </div>

        {/* Rândul 3: statistici centrate */}
        <div className="hero-meta">
          <div className="hero-meta-item">
            <div className="num">10<span className="plus">+</span></div>
            <div className="label">Proiecte livrate</div>
          </div>
          <div className="hero-meta-item">
            <div className="num">6</div>
            <div className="label">Industrii deservite</div>
          </div>
          <div className="hero-meta-item">
            <div className="num">4</div>
            <div className="label">Specialiști în echipă</div>
          </div>
          <div className="hero-meta-item">
            <div className="num">24<span className="plus">h</span></div>
            <div className="label">Răspuns garantat</div>
          </div>
        </div>
      </div>
    </section>
  );
}
