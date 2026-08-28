import { getLocale } from 'next-intl/server';

const COPY = {
  ro: {
    idx: '01 / DESPRE',
    eyebrow: 'Cine suntem',
    h2a: 'O companie mică.',
    h2bPre: 'Cu ',
    h2bEm: 'standarde MARI',
    h2bPost: '.',
    p1: <><strong className="brand-acl">ACL</strong> Smart Software — implicare directă în fiecare proiect, de la prima discuție până la predare.</>,
    p2: 'Lucrăm cu companii, ONG-uri și startup-uri. Proiectele cu constrângeri reale — termene scurte, sisteme legacy, integrări complicate, decizii grele — sunt cele unde contează experiența.',
    p3: 'Suport după lansare, cât timp are sens pentru tine. Fără contracte care te țin captiv.',
    stats: [
      { big: '2024', accent: '.', lbl: 'Înființare', desc: 'De la prima linie de cod, am ales să construim lucruri care durează — nu să livrăm și să plecăm.' },
      { big: '100', accent: '%', lbl: 'Cod ownership', desc: 'Tot ce construim rămâne al tău — repository, documentație, infrastructură.' },
      { big: '4', accent: '', lbl: 'Arii de servicii', desc: 'Produse la comandă, AI & automatizare, infrastructură & integrări, consultanță & preluare.' },
      { big: 'RO', accent: '·EU', lbl: 'Acoperire', desc: 'Lucrăm cu clienți din România și Europa, remote sau on-site după nevoie.' },
    ],
    industriesLbl: 'Industrii →',
    industries: ['Corporate / Enterprise', 'Startup-uri', 'Logistică', 'E-commerce & Retail', 'Educație', 'Imobiliare'],
  },
  en: {
    idx: '01 / ABOUT',
    eyebrow: 'Who we are',
    h2a: 'A small company.',
    h2bPre: 'With ',
    h2bEm: 'HIGH standards',
    h2bPost: '.',
    p1: <><strong className="brand-acl">ACL</strong> Smart Software — hands-on involvement in every project, from the first conversation to handover.</>,
    p2: 'We work with companies, non-profits, and startups. Projects with real constraints — tight deadlines, legacy systems, tricky integrations, hard decisions — are where experience matters most.',
    p3: 'Support after launch, for as long as it makes sense for you. No contracts that lock you in.',
    stats: [
      { big: '2024', accent: '.', lbl: 'Founded', desc: 'From the first line of code, we chose to build things that last — not to ship and disappear.' },
      { big: '100', accent: '%', lbl: 'Code ownership', desc: 'Everything we build stays yours — repository, documentation, infrastructure.' },
      { big: '4', accent: '', lbl: 'Service areas', desc: 'Custom products, AI & automation, infrastructure & integrations, consulting & takeover.' },
      { big: 'RO', accent: '·EU', lbl: 'Coverage', desc: 'We work with clients across Romania and Europe, remote or on-site as needed.' },
    ],
    industriesLbl: 'Industries →',
    industries: ['Corporate / Enterprise', 'Startups', 'Logistics', 'E-commerce & Retail', 'Education', 'Real Estate'],
  },
};

export default async function About() {
  const locale = await getLocale();
  const t = COPY[locale as keyof typeof COPY] ?? COPY.ro;

  return (
    <section className="section" id="despre">
      <div className="wrap">
        <div className="section-head">
          <div className="label-col">
            <div className="idx">{t.idx}</div>
            <div className="eyebrow">{t.eyebrow}</div>
          </div>
          <h2>
            <span className="h2-line">{t.h2a}</span>
            <span className="h2-line">{t.h2bPre}<em>{t.h2bEm}</em>{t.h2bPost}</span>
          </h2>
        </div>

        <div className="about">
          <div className="about-text">
            <p>{t.p1}</p>
            <p className="about-text-lg">{t.p2}</p>
            <p className="about-text-lg">{t.p3}</p>
          </div>

          <div className="about-stats">
            {t.stats.map((s) => (
              <div className="about-stat" key={s.lbl}>
                <div className="big">{s.big}<span className="accent">{s.accent}</span></div>
                <div className="lbl">{s.lbl}</div>
                <div className="stat-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="industries-row">
          <span className="lbl">{t.industriesLbl}</span>
          {t.industries.map((ind) => (
            <span className="industry-chip" key={ind}>{ind}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
