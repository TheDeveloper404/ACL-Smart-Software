'use client';

import Image from 'next/image';
import { useState } from 'react';
import { LockKeyIcon } from '@phosphor-icons/react/dist/ssr/LockKey';
import { KeyIcon } from '@phosphor-icons/react/dist/ssr/Key';
import { CodeIcon } from '@phosphor-icons/react/dist/ssr/Code';
import { GearIcon } from '@phosphor-icons/react/dist/ssr/Gear';

const ICONS = [LockKeyIcon, KeyIcon, CodeIcon, GearIcon];
const COPY = {
  ro: {
    heading: 'Ce verificăm în audit',
    items: [
      { title: 'Autentificare', description: 'Analizăm mecanismele de autentificare și protecția conturilor în raport cu cerințele OWASP ASVS convenite pentru proiect.', checks: ['MFA și politici de parolă', 'Protecție împotriva brute force', 'Gestionarea sesiunilor', 'Recuperarea contului'] },
      { title: 'Autorizare', description: 'Verificăm dacă fiecare utilizator poate accesa doar datele și acțiunile permise, inclusiv la nivelul API-ului.', checks: ['Separarea rolurilor și permisiunilor', 'Acces la obiecte și date (IDOR)', 'Izolarea între organizații', 'Validarea permisiunilor pe server'] },
      { title: 'Validarea datelor', description: 'Urmărim datele de la intrare până la afișare și stocare, pentru a identifica punctele vulnerabile.', checks: ['Validarea inputului pe server', 'Injecții și cross-site scripting', 'Încărcarea fișierelor', 'Protecția datelor sensibile'] },
      { title: 'Configurare', description: 'Evaluăm configurația aplicației și expunerea infrastructurii din perimetrul agreat.', checks: ['Secrete și configurarea mediilor', 'Dependențe și componente vulnerabile', 'Headers și gestionarea erorilor', 'Logging și monitorizare'] },
    ],
    note: 'Stabilim perimetrul și nivelul de verificare înainte de audit. Raportul descrie constatările și limitele evaluării; nu reprezintă o certificare OWASP sau o garanție de absență a vulnerabilităților.',
    process: 'Procesul auditului', steps: ['Stabilim scopul', 'Verificăm', 'Documentăm', 'Prioritizăm'],
    descriptions: ['Aplicația, accesul și cerințele de verificare.', 'Analiză tehnică în mediul autorizat.', 'Dovezi, impact și recomandări concrete.', 'Un plan de remediere în ordinea riscului.'],
  },
  en: {
    heading: 'What we verify',
    items: [
      { title: 'Authentication', description: 'We assess authentication mechanisms and account protection against the OWASP ASVS requirements agreed for your project.', checks: ['MFA and password policies', 'Brute force protection', 'Session management', 'Account recovery'] },
      { title: 'Authorization', description: 'We verify that each user can only access permitted data and actions, including at the API layer.', checks: ['Roles and permissions', 'Object-level access (IDOR)', 'Organization isolation', 'Server-side permission checks'] },
      { title: 'Data validation', description: 'We follow data from input to display and storage to identify vulnerable boundaries.', checks: ['Server-side input validation', 'Injection and cross-site scripting', 'File uploads', 'Sensitive data protection'] },
      { title: 'Configuration', description: 'We assess application configuration and infrastructure exposure within the agreed scope.', checks: ['Secrets and environment configuration', 'Vulnerable dependencies', 'Headers and error handling', 'Logging and monitoring'] },
    ],
    note: 'We agree on scope and verification level before the audit. The report records findings and assessment limitations; it is not an OWASP certification or a guarantee of no vulnerabilities.',
    process: 'The audit process', steps: ['Define scope', 'Verify', 'Document', 'Prioritize'],
    descriptions: ['Application, access and verification requirements.', 'Technical assessment in an authorized environment.', 'Evidence, impact and concrete recommendations.', 'A remediation plan ordered by risk.'],
  },
};

export default function AuditCoverage({ locale }: { locale: string }) {
  const t = locale === 'en' ? COPY.en : COPY.ro;
  const [active, setActive] = useState(0);
  const item = t.items[active];
  return <section className="section audit-coverage" aria-label={t.heading}><div className="wrap">
    <div className="audit-panel"><div className="audit-controls" role="group" aria-label={t.heading}>{t.items.map((entry, i) => { const Icon = ICONS[i]; return <button type="button" key={entry.title} aria-pressed={active === i} aria-controls="audit-domain" className={active === i ? 'is-active' : ''} onClick={() => setActive(i)}><Icon size={24} aria-hidden="true" /><span>{entry.title}</span></button>; })}</div>
      <div className="audit-domain" id="audit-domain" aria-live="polite"><h2>{item.title}</h2><p>{item.description}</p><ul>{item.checks.map(check => <li key={check}>{check}</li>)}</ul></div><div className="audit-art"><Image src="/audit-security.png" alt="" fill sizes="(max-width: 880px) 1px, (max-width: 1100px) 220px, 400px" /></div></div>
    <p className="audit-scope-note">{t.note}</p><h3 className="audit-process-title">{t.process}</h3><ol className="audit-steps">{t.steps.map((step, i) => <li key={step}><span className="eyebrow">0{i + 1}</span><h4>{step}</h4><p>{t.descriptions[i]}</p></li>)}</ol>
  </div></section>;
}
