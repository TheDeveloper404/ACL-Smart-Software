'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export default function MotionSurface({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) {
      element.dataset.motionVisible = 'true';
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.motionVisible = String(entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div className={`motion-surface ${className}`} ref={ref} data-motion-visible="false">{children}</div>;
}
