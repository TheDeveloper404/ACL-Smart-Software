'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { PersonArmsSpreadIcon } from '@phosphor-icons/react/dist/ssr/PersonArmsSpread';
import { WhatsappLogoIcon } from '@phosphor-icons/react/dist/ssr/WhatsappLogo';
import { XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { A11Y_KEY, DEFAULT_A11Y, normalizeA11y, applyA11y, type A11yPrefs } from '@/lib/accessibility';

export default function ThemePanel() {
  const en = useLocale() === 'en';
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULT_A11Y);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const settings = en ? 'Accessibility settings' : 'Setări de accesibilitate';
  useEffect(() => {
    try {
      const stored = normalizeA11y(JSON.parse(localStorage.getItem(A11Y_KEY) || '{}'));
      // Synchronize persisted browser preferences after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPrefs(stored);
      applyA11y(stored);
      localStorage.removeItem('acl-tweaks-v2');
    } catch { applyA11y(DEFAULT_A11Y); }
  }, []);
  useEffect(() => { if (open) close.current?.focus(); }, [open]);
  function dismiss() { setOpen(false); toggle.current?.focus(); }
  function change(key: keyof A11yPrefs) {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    applyA11y(next);
    try { localStorage.setItem(A11Y_KEY, JSON.stringify(next)); } catch {}
  }
  const rows: { key: keyof A11yPrefs; name: string; description: string }[] = [
    { key: 'reduceMotion', name: en ? 'No animations' : 'Fără animații', description: en ? 'Stop motion and transitions' : 'Oprește mișcarea și tranzițiile' },
    { key: 'largeText', name: en ? 'Larger text' : 'Text mai mare', description: en ? 'Increase reading size' : 'Mărește textul pentru citire' },
    { key: 'highContrast', name: en ? 'High contrast' : 'Contrast ridicat', description: en ? 'Emphasize text and borders' : 'Evidențiază textul și marginile' },
  ];
  return <>
    <a className="wa-btn" href="https://wa.me/40758154490" target="_blank" rel="noopener noreferrer" aria-label={en ? 'Contact us on WhatsApp' : 'Contactează-ne pe WhatsApp'}><WhatsappLogoIcon size={25} aria-hidden="true" /></a>
    <button type="button" ref={toggle} className="theme-panel-toggle" aria-label={settings} aria-expanded={open} aria-controls="accessibility-panel" onClick={() => setOpen(!open)}><PersonArmsSpreadIcon size={25} aria-hidden="true" /></button>
    {open && <aside id="accessibility-panel" className="theme-panel" role="dialog" aria-label={settings} onKeyDown={event => { if (event.key === 'Escape') dismiss(); }}><div className="theme-panel-header"><span>{en ? 'Accessibility' : 'Accesibilitate'}</span><button ref={close} type="button" aria-label={en ? 'Close' : 'Închide'} onClick={dismiss}><XIcon size={20} aria-hidden="true" /></button></div><div className="a11y-list">{rows.map(row => <div className="a11y-row" key={row.key}><span className="a11y-info"><span className="a11y-name" id={`pref-${row.key}`}>{row.name}</span><span className="a11y-desc">{row.description}</span></span><button type="button" className={`a11y-toggle${prefs[row.key] ? ' is-on' : ''}`} role="switch" aria-checked={prefs[row.key]} aria-labelledby={`pref-${row.key}`} onClick={() => change(row.key)}><span className="a11y-thumb" /></button></div>)}</div></aside>}
  </>;
}
