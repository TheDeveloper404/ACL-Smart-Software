'use client';
import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

export default function ScrollReset() {
  // `usePathname` din `@/i18n/navigation` întoarce calea FĂRĂ prefixul de locale — spre
  // deosebire de `next/navigation`, care ar schimba valoarea la switch RO↔EN (`/portofoliu`
  // → `/en/portofoliu`) și ar declanșa scroll-to-top + resetul stilului Nav (`is-scrolled`)
  // la fiecare schimbare de limbă, nu doar la navigare reală pe altă pagină.
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
}
