'use client';

import { useSyncExternalStore } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { optionalAnalyticsAllowed, subscribeConsent } from '@/lib/consent';

const serverConsent = () => false;

export default function ConsentAnalytics() {
  const allowed = useSyncExternalStore(subscribeConsent, optionalAnalyticsAllowed, serverConsent);
  return allowed ? <><Analytics /><SpeedInsights /></> : null;
}
