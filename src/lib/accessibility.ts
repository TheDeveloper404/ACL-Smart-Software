export const A11Y_KEY = 'acl-a11y-v1';
export interface A11yPrefs { reduceMotion: boolean; largeText: boolean; highContrast: boolean; }
export const DEFAULT_A11Y: A11yPrefs = { reduceMotion: false, largeText: false, highContrast: false };

export function normalizeA11y(value: unknown): A11yPrefs {
  const stored = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return { reduceMotion: stored.reduceMotion === true, largeText: stored.largeText === true, highContrast: stored.highContrast === true };
}

export function applyA11y(prefs: A11yPrefs) {
  document.body.dataset.reduceMotion = String(prefs.reduceMotion);
  document.body.dataset.largeText = String(prefs.largeText);
  document.body.dataset.highContrast = String(prefs.highContrast);
}
