'use client';

import { useState, useEffect } from 'react';
import { useTheme, PALETTE_OPTIONS } from './ThemeProvider';

const A11Y_KEY = 'acl-a11y-v1';

interface A11yPrefs {
  reduceMotion: boolean;
  largeText: boolean;
  highContrast: boolean;
}

const DEFAULT_A11Y: A11yPrefs = {
  reduceMotion: false,
  largeText: false,
  highContrast: false,
};

function applyA11y(prefs: A11yPrefs) {
  const b = document.body;
  b.dataset.reduceMotion = prefs.reduceMotion ? 'true' : 'false';
  b.dataset.largeText = prefs.largeText ? 'true' : 'false';
  b.dataset.highContrast = prefs.highContrast ? 'true' : 'false';
}

export default function ThemePanel() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [a11y, setA11yState] = useState<A11yPrefs>(DEFAULT_A11Y);
  const [showWaHint, setShowWaHint] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('acl-wa-hint');
    if (!seen) {
      setShowWaHint(true);
      const t = setTimeout(() => {
        setShowWaHint(false);
        localStorage.setItem('acl-wa-hint', '1');
      }, 5000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(A11Y_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as A11yPrefs;
        setA11yState(parsed);
        applyA11y(parsed);
      }
    } catch {}
  }, []);

  const setA11y = (patch: Partial<A11yPrefs>) => {
    const next = { ...a11y, ...patch };
    setA11yState(next);
    applyA11y(next);
    try { localStorage.setItem(A11Y_KEY, JSON.stringify(next)); } catch {}
  };

  return (
    <>
      {showWaHint && (
        <span className="wa-hint">Hai să vorbim! 👋</span>
      )}
      <a
        className="wa-btn"
        href="https://wa.me/40758154490"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactează-ne pe WhatsApp"
        title="WhatsApp"
        onClick={() => { setShowWaHint(false); localStorage.setItem('acl-wa-hint', '1'); }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <button
        className="theme-panel-toggle"
        onClick={() => setOpen(v => !v)}
        aria-label="Personalizare temă"
        title="Personalizare"
      >
        ⚙
      </button>

      {open && (
        <aside className="theme-panel" role="dialog" aria-label="Personalizare temă">
          <div className="theme-panel-header">
            <span className="theme-panel-title">Personalizare</span>
            <button onClick={() => setOpen(false)} aria-label="Închide">×</button>
          </div>

          <section className="theme-section">
            <div className="theme-section-label">Paletă</div>
            <div className="palette-swatches">
              {PALETTE_OPTIONS.filter(p => p.value === 'lime' || p.value === 'orange').map(p => (
                <button
                  key={p.value}
                  className="palette-swatch"
                  style={{ background: p.hex }}
                  aria-label={p.label}
                  aria-pressed={theme.palette === p.value}
                  onClick={() => setTheme({ palette: p.value })}
                  title={p.label}
                />
              ))}
            </div>
          </section>

          <section className="theme-section">
            <div className="theme-section-label">Mod</div>
            <div className="theme-radio-group">
              <button
                className="theme-radio"
                aria-pressed={theme.mode === 'dark'}
                onClick={() => setTheme({ mode: 'dark' })}
              >
                🌙 Întunecat
              </button>
              <button
                className="theme-radio"
                aria-pressed={theme.mode === 'light'}
                onClick={() => setTheme({ mode: 'light' })}
              >
                ☀️ Luminos
              </button>
            </div>
          </section>

          <section className="theme-section">
            <div className="theme-section-label">Accesibilitate</div>
            <div className="a11y-list">
              <label className="a11y-row">
                <span className="a11y-info">
                  <span className="a11y-name">Fără animații</span>
                  <span className="a11y-desc">Dezactivează tranziții și efecte</span>
                </span>
                <button
                  className={`a11y-toggle${a11y.reduceMotion ? ' is-on' : ''}`}
                  role="switch"
                  aria-checked={a11y.reduceMotion}
                  onClick={() => setA11y({ reduceMotion: !a11y.reduceMotion })}
                >
                  <span className="a11y-thumb" />
                </button>
              </label>
              <label className="a11y-row">
                <span className="a11y-info">
                  <span className="a11y-name">Text mai mare</span>
                  <span className="a11y-desc">Mărește dimensiunea fontului</span>
                </span>
                <button
                  className={`a11y-toggle${a11y.largeText ? ' is-on' : ''}`}
                  role="switch"
                  aria-checked={a11y.largeText}
                  onClick={() => setA11y({ largeText: !a11y.largeText })}
                >
                  <span className="a11y-thumb" />
                </button>
              </label>
              <label className="a11y-row" style={{ borderBottom: 0 }}>
                <span className="a11y-info">
                  <span className="a11y-name">Contrast ridicat</span>
                  <span className="a11y-desc">Intensifică culorile și marginile</span>
                </span>
                <button
                  className={`a11y-toggle${a11y.highContrast ? ' is-on' : ''}`}
                  role="switch"
                  aria-checked={a11y.highContrast}
                  onClick={() => setA11y({ highContrast: !a11y.highContrast })}
                >
                  <span className="a11y-thumb" />
                </button>
              </label>
            </div>
          </section>

        </aside>
      )}

      <style jsx>{`
        .wa-btn {
          position: fixed;
          bottom: 78px; right: 24px;
          z-index: 200;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #25D366;
          color: #fff;
          display: grid; place-items: center;
          box-shadow: 0 4px 16px rgba(37,211,102,0.35);
          transition: transform 0.15s, box-shadow 0.15s;
          overflow: visible;
        }
        .wa-btn:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(37,211,102,0.5); }
        .wa-hint {
          position: fixed;
          bottom: 86px;
          right: 78px;
          white-space: nowrap;
          background: #25D366;
          color: #fff;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 8px;
          z-index: 200;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          animation: wa-hint-in 0.3s ease;
        }
        .wa-hint::after {
          content: '';
          position: absolute;
          right: -6px; top: 50%;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-right: none;
          border-left-color: #25D366;
        }
        @keyframes wa-hint-in {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .theme-panel-toggle {
          position: fixed;
          bottom: 24px; left: 24px;
          z-index: 200;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--hairline-strong);
          display: grid; place-items: center;
          font-size: 18px;
          cursor: pointer;
          transition: transform 0.15s, border-color 0.15s;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .theme-panel-toggle:hover { transform: scale(1.1); border-color: var(--accent); }

        .theme-panel {
          position: fixed;
          bottom: 80px; left: 24px;
          z-index: 200;
          background: var(--bg-card);
          border: 1px solid var(--hairline-strong);
          border-radius: 16px;
          padding: 0;
          width: 260px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.3);
          overflow: hidden;
        }

        .theme-panel-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 18px;
          border-bottom: 1px solid var(--hairline);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--fg-muted);
        }
        .theme-panel-header button {
          font-size: 20px;
          color: var(--fg-muted);
          padding: 0 4px;
          transition: color 0.15s;
        }
        .theme-panel-header button:hover { color: var(--fg); }

        .theme-section { padding: 14px 18px; border-bottom: 1px solid var(--hairline); }
        .theme-section:last-child { border-bottom: 0; }
        .theme-section-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg-faint); margin-bottom: 10px; }

        .palette-swatches { display: flex; gap: 8px; }
        .palette-swatch {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 2px solid transparent;
          transition: transform 0.15s, border-color 0.15s;
          cursor: pointer;
        }
        .palette-swatch[aria-pressed="true"] { border-color: var(--fg); transform: scale(1.15); }
        .palette-swatch:hover { transform: scale(1.1); }

        .theme-radio-group { display: flex; flex-wrap: wrap; gap: 6px; }
        .theme-radio {
          font-size: 12px;
          padding: 6px 10px;
          border: 1px solid var(--hairline-strong);
          border-radius: 6px;
          color: var(--fg-muted);
          background: transparent;
          cursor: pointer;
          transition: all 0.15s;
          font-family: var(--font-body);
        }
        .theme-radio[aria-pressed="true"] { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
        .theme-radio:hover { color: var(--fg); }

        .a11y-list { display: flex; flex-direction: column; }
        .a11y-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid var(--hairline);
          cursor: default;
        }
        .a11y-info { display: flex; flex-direction: column; gap: 2px; }
        .a11y-name { font-size: 12px; color: var(--fg); font-family: var(--font-body); }
        .a11y-desc { font-size: 10px; color: var(--fg-faint); font-family: var(--font-mono); }

        .a11y-toggle {
          width: 36px; height: 20px;
          border-radius: 999px;
          background: var(--hairline-strong);
          border: none;
          position: relative;
          cursor: pointer;
          transition: background 0.2s;
          flex-shrink: 0;
          padding: 0;
        }
        .a11y-toggle.is-on { background: var(--accent); }
        .a11y-thumb {
          position: absolute;
          top: 3px; left: 3px;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: var(--bg-card);
          transition: transform 0.2s;
          display: block;
        }
        .a11y-toggle.is-on .a11y-thumb { transform: translateX(16px); }
      `}</style>
    </>
  );
}
