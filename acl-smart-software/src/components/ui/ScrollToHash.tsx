'use client';
import { useEffect } from 'react';

export default function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'instant' });
  }, []);
  return null;
}
