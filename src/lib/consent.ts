export const CONSENT_KEY = 'acl-cookie-consent';
const CONSENT_EVENT = 'acl-consent-change';
export type ConsentChoice = 'accepted' | 'declined';

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch { return null; }
}

export function saveConsent(choice: ConsentChoice): void {
  try { window.localStorage.setItem(CONSENT_KEY, choice); } catch {}
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function subscribeConsent(listener: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === CONSENT_KEY) listener();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(CONSENT_EVENT, listener);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(CONSENT_EVENT, listener);
  };
}

export function optionalAnalyticsAllowed(): boolean {
  return readConsent() === 'accepted';
}
