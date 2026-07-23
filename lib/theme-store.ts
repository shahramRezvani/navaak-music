'use client';

import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggle: () => void;
  init: () => void;
}

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'dark',
  toggle: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    if (typeof localStorage !== 'undefined') localStorage.setItem('theme', next);
    set({ theme: next });
  },
  init: () => {
    if (typeof localStorage === 'undefined') return;
    const saved = (localStorage.getItem('theme') as Theme | null) ?? 'dark';
    applyTheme(saved);
    set({ theme: saved });
  },
}));
