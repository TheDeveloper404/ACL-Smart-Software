'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

const STORAGE_KEY = 'acl-cookie-consent';

const COPY = {
  ro: {
    aria: 'Consimțământ cookie-uri',
    text: <>Folosim cookie-uri pentru a îmbunătăți experiența pe site. Prin continuarea navigării, ești de acord cu{' '}
      <Link href="/politica-confidentialitate">Politica de confidențialitate</Link>{' '}și{' '}
      <Link href="/cookies">Politica de cookie-uri</Link>.</>,
    decline: 'Doar esențiale',
    accept: 'Acceptă tot',
  },
  en: {
    aria: 'Cookie consent',
    text: <>We use cookies to improve your experience on the site. By continuing to browse, you agree to our{' '}
      <Link href="/politica-confidentialitate">Privacy Policy</Link>{' '}and{' '}
      <Link href="/cookies">Cookie Policy</Link>.</>,
    decline: 'Essential only',
    accept: 'Accept all',
  },
};

export default function CookieBanner() {
  const locale = useLocale() as 'ro' | 'en';
  const t = COPY[locale] ?? COPY.ro;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      // localStorage nu există pe server — citirea trebuie să aștepte montarea pe client,
      // deci setState-ul de aici e sincronizarea inițială cu un sistem extern, nu un antipattern.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {}
  }, []);

  function accept() {
    try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch {}
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem(STORAGE_KEY, 'declined'); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label={t.aria} aria-modal="false">
      <div className="cookie-banner-inner">
        <div className="cookie-text">
          <p>{t.text}</p>
        </div>
        <div className="cookie-actions">
          <button className="btn btn-ghost cookie-btn-decline" onClick={decline}>
            {t.decline}
          </button>
          <button className="btn btn-primary cookie-btn-accept" onClick={accept}>
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
