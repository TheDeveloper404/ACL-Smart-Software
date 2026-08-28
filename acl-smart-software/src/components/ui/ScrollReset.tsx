'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from '@/i18n/navigation';

const KEY = (path: string) => `acl:scroll:${path}`;

/**
 * Scroll pe navigare client-side:
 *  - navigare înainte (click pe link)  → scroll la top;
 *  - back / forward (butonul browserului) → REVENIRE la poziția de unde ai plecat.
 *
 * `usePathname` din `@/i18n/navigation` întoarce calea FĂRĂ prefixul de locale, deci nu se
 * schimbă la switch RO↔EN. Next.js (Turbopack) "reconectează" efectele segmentului de rută la
 * orice navigare client-side, așa că nu ne bazăm doar pe dependența `pathname` a efectului — ci
 * comparăm explicit cu ultima cale reținută într-un ref.
 *
 * Restaurarea nativă a browserului e dezactivată (`history.scrollRestoration='manual'`, în
 * scriptul blocant din layout), ca să nu se bată cu logica de aici — deci salvăm/restaurăm noi
 * poziția, în `sessionStorage`, pe cheie de path.
 */
export default function ScrollReset() {
  const pathname = usePathname();
  const lastPathname = useRef(pathname);
  const isPop = useRef(false);

  // Marchează navigările back/forward — singurele la care restaurăm în loc să resetăm.
  useEffect(() => {
    const onPop = () => { isPop.current = true; };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Ține minte, în timp real, poziția de scroll a paginii curente (rAF-throttled).
  useEffect(() => {
    let raf = 0;
    const save = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        try { sessionStorage.setItem(KEY(pathname), String(window.scrollY)); } catch {}
      });
    };
    window.addEventListener('scroll', save, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      try { sessionStorage.setItem(KEY(pathname), String(window.scrollY)); } catch {}
      window.removeEventListener('scroll', save);
    };
  }, [pathname]);

  useEffect(() => {
    if (lastPathname.current === pathname) return;
    lastPathname.current = pathname;

    // Ancorele (#...) sunt tratate de ScrollToHash.
    if (window.location.hash) return;

    if (isPop.current) {
      isPop.current = false;
      let y = 0;
      try { y = Number(sessionStorage.getItem(KEY(pathname))) || 0; } catch {}
      window.scrollTo({ top: y, left: 0, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
}
