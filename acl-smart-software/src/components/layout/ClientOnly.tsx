'use client';
import dynamic from 'next/dynamic';

const ThemePanel = dynamic(() => import('./ThemePanel'), { ssr: false });
const CookieBanner = dynamic(() => import('./CookieBanner'), { ssr: false });

export default function ClientOnly() {
  return (
    <>
      <ThemePanel />
      <CookieBanner />
    </>
  );
}
