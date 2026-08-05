'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from '@/i18n/navigation';

export default function ScrollReset() {
  // `usePathname` din `@/i18n/navigation` întoarce calea FĂRĂ prefixul de locale, deci nu se
  // schimbă la switch RO↔EN. Nu e suficient totuși doar ca dependență în `useEffect`: Next.js
  // (Turbopack) "reconectează" efectele segmentului de rută la orice navigare client-side —
  // inclusiv un switch de limbă pe aceeași pagină — deci efectul TOT rulează din nou, chiar
  // dacă `pathname` n-a variat. De asta comparăm explicit cu ultima cale reținută într-un ref
  // și sărim peste scroll-to-top dacă nu s-a schimbat cu adevărat pagina.
  const pathname = usePathname();
  const lastPathname = useRef(pathname);

  useEffect(() => {
    if (lastPathname.current === pathname) return;
    lastPathname.current = pathname;
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
}
