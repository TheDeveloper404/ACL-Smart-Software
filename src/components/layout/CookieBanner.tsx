'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

import { readConsent, saveConsent } from '@/lib/consent';

const COPY = {
  ro: {
    aria: 'Consimțământ cookie-uri',
    text: <>Păstrăm preferințele esențiale pentru funcționarea site-ului. Poți accepta sau refuza statisticile opționale de utilizare și performanță. Detalii în{' '}
      <Link href="/politica-confidentialitate">Politica de confidențialitate</Link>{' '}și{' '}
      <Link href="/cookies">Politica de cookie-uri</Link>.</>,
    decline: 'Doar esențiale',
    accept: 'Acceptă tot',
  },
  en: {
    aria: 'Cookie consent',
    text: <>We store essential preferences for the site to work. You can accept or decline optional usage and performance statistics. Details in our{' '}
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
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // localStorage nu există pe server — citirea trebuie să aștepte montarea pe client,
      // deci setState-ul de aici e sincronizarea inițială cu un sistem extern, nu un antipattern.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!readConsent()) setVisible(true);
    } catch {}
  }, []);

  useEffect(() => {
    const element = banner.current;
    if (!visible || !element) return;
    const updateHeight = () => document.documentElement.style.setProperty('--cookie-banner-height', `${element.getBoundingClientRect().height}px`);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--cookie-banner-height');
    };
  }, [visible]);

  function accept() {
    saveConsent('accepted');
    setVisible(false);
  }

  function decline() {
    saveConsent('declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div ref={banner} className="cookie-banner" role="dialog" aria-label={t.aria} aria-modal="false">
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
