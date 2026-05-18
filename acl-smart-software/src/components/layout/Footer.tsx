'use client';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';

function MatrixRain({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]()=+-*/\\|;:,.?!@#$%^&~`';
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = drops[i] < 3 ? '#ffffff' : '#aaff44';
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    const timer = setTimeout(onClose, 10000);
    return () => { window.removeEventListener('keydown', handler); clearTimeout(timer); };
  }, [onClose]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, cursor: 'pointer' }} onClick={onClose}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <p style={{ color: '#aaff44', fontFamily: 'monospace', fontSize: 'clamp(18px, 3vw, 32px)', fontWeight: 700, letterSpacing: '0.15em', textShadow: '0 0 20px #aaff44, 0 0 40px #aaff44', margin: 0, textTransform: 'uppercase' }}>
          ai găsit matrixul
        </p>
      </div>
      <p style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: '#aaff44', fontFamily: 'monospace', fontSize: 11, opacity: 0.4, letterSpacing: '0.12em', whiteSpace: 'nowrap', margin: 0 }}>
        CLICK SAU ESC PENTRU A IEȘI
      </p>
    </div>
  );
}

function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={() => window.history.replaceState(null, '', '/#footer')}>
      {children}
    </Link>
  );
}

export default function Footer() {
  const [, setClicks] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAclClick = useCallback(() => {
    setClicks((prev) => {
      const next = prev + 1;
      if (next >= 3) { setShowMatrix(true); return 0; }
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setClicks(0), 1500);
      return next;
    });
  }, []);

  const closeMatrix = useCallback(() => setShowMatrix(false), []);

  return (
    <>
      {showMatrix && <MatrixRain onClose={closeMatrix} />}
      <footer className="footer" id="footer" role="contentinfo">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="brand" aria-label="ACL Smart Software — acasă">
                <div className="brand-mark" style={{ width: 36, height: 36, fontSize: 13, fontFamily: 'var(--font-mono)', letterSpacing: '-0.05em' }} aria-hidden="true">&gt;_</div>
                <div className="brand-name"><span className="brand-acl">ACL</span> <span className="sub">Smart Software</span></div>
              </Link>
              <p>Companie software independentă. Construim produse care cresc business-uri — nu doar livrabile pe deadline.</p>
            </div>

            <div className="footer-col">
              <h5>Servicii</h5>
              <ul>
                <li><Link href="/servicii/software-custom">Software custom</Link></li>
                <li><Link href="/servicii/aplicatii-web">Aplicații web</Link></li>
                <li><Link href="/servicii/aplicatii-mobile">Aplicații mobile</Link></li>
                <li><Link href="/servicii/ai-ml">AI / Machine Learning</Link></li>
                <li><Link href="/servicii/cloud-devops">Cloud & DevOps</Link></li>
                <li><Link href="/servicii">Toate serviciile →</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Companie</h5>
              <ul>
                <li><Link href="/servicii">Servicii</Link></li>
                <li><Link href="/portofoliu">Portofoliu</Link></li>
                <li><Link href="/echipa">Echipă</Link></li>
                <li><Link href="/insights">Perspective</Link></li>
                <li><Link href="/cariere">Cariere</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Contact</h5>
              <ul>
                <li>Email: <a href="mailto:office@acl-smartsoftware.ro">office@acl-smartsoftware.ro</a></li>
                <li>Telefon: <a href="tel:+40758154490">0758 154 490</a></li>
                <li>Adresa: Str. Horea 2/31, Petroșani</li>
                <li>Date firmă: CUI 51219715</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 <span className="brand-acl" style={{ cursor: 'pointer', userSelect: 'none' }} onClick={handleAclClick}>ACL</span> SMART SOFTWARE SRL · TOATE DREPTURILE REZERVATE</span>
            <div className="legal">
              <LegalLink href="/politica-confidentialitate">Politică de confidențialitate</LegalLink>
              <LegalLink href="/termeni">Termeni și condiții</LegalLink>
              <LegalLink href="/cookies">Cookies</LegalLink>
              <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer">ANPC</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
