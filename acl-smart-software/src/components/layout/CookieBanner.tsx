'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'acl-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
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
    <div className="cookie-banner" role="dialog" aria-label="Consimțământ cookie-uri" aria-modal="false">
      <div className="cookie-banner-inner">
        <div className="cookie-text">
          <p>
            Folosim cookie-uri pentru a îmbunătăți experiența pe site. Prin continuarea navigării, ești de acord cu{' '}
            <Link href="/politica-confidentialitate">Politica de confidențialitate</Link>{' '}și{' '}
            <Link href="/cookies">Politica de cookie-uri</Link>.
          </p>
        </div>
        <div className="cookie-actions">
          <button className="btn btn-ghost cookie-btn-decline" onClick={decline}>
            Doar esențiale
          </button>
          <button className="btn btn-primary cookie-btn-accept" onClick={accept}>
            Acceptă tot
          </button>
        </div>
      </div>
    </div>
  );
}
