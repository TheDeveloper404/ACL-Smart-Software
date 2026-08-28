'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from '@/i18n/navigation';

/**
 * Efect vizual foarte discret la navigarea între pagini: conținutul din `<main>` reintră cu un
 * fade scurt (~180ms).
 *
 * NU refacem subarborele (fără `key={pathname}`): conținutul se schimbă în loc, iar noi doar
 * re-declanșăm animația CSS pe același `<div>` stabil — altfel `RevealOnScroll` ar clipi la
 * fiecare back mid-page, iar formularele client s-ar reseta.
 *
 * `usePathname` din `@/i18n/navigation` nu include prefixul de locale — un switch RO↔EN nu
 * re-animează (corect). Respectă `prefers-reduced-motion` (animația e anulată din CSS).
 */
export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;
    el.classList.remove('route-transition-run');
    void el.offsetWidth; // forțează reflow → repornește animația
    el.classList.add('route-transition-run');
  }, [pathname]);

  return (
    <div ref={ref} className="route-transition">
      {children}
    </div>
  );
}
