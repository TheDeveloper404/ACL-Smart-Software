'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Theme, Palette, Mode, FontPair, Density } from '@/types';

const DEFAULT_THEME: Theme = {
  palette: 'lime',
  mode: 'light',
  fontPair: 'grotesk',
  density: 'comfortable',
};

const STORAGE_KEY = 'acl-tweaks-v2';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (patch: Partial<Theme>) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Theme>;
        setThemeState(prev => ({ ...prev, ...parsed }));
      }
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const body = document.body;
    body.dataset.palette = theme.palette;
    body.dataset.mode = theme.mode;
    body.dataset.font = theme.fontPair;
    body.dataset.density = theme.density;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } catch {}
  }, [theme, mounted]);

  const setTheme = useCallback((patch: Partial<Theme>) => {
    setThemeState(prev => ({ ...prev, ...patch }));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export const PALETTE_OPTIONS: { value: Palette; label: string; hex: string }[] = [
  { value: 'lime', label: 'Lime', hex: '#c8ff3a' },
  { value: 'blue', label: 'Blue', hex: '#4a8bff' },
  { value: 'orange', label: 'Orange', hex: '#ff8c42' },
  { value: 'violet', label: 'Violet', hex: '#a26bff' },
];

export const FONT_OPTIONS: { value: FontPair; label: string }[] = [
  { value: 'grotesk', label: 'Space Grotesk + Inter' },
  { value: 'geist', label: 'Geist' },
  { value: 'serif', label: 'Instrument Serif + Inter' },
  { value: 'plex', label: 'IBM Plex Sans' },
];
