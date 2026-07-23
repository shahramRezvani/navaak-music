'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/theme-store';

/** Applies the saved theme on first client render. Renders nothing. */
export default function ThemeInit() {
  const init = useThemeStore((s) => s.init);
  useEffect(() => {
    init();
  }, [init]);
  return null;
}
