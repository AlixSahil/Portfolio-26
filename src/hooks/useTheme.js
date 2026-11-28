import { useCallback, useEffect, useState } from 'react';

const KEY = 'theme';

function readTheme() {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

// Dark-first theme with an optional light mode. The initial value is applied by an inline
// script in index.html before first paint (no flash); this hook keeps it in sync.
export default function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f5f4f0' : '#0a0a0b');
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* storage unavailable (private mode) — theme still applies for this visit */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    root.classList.add('theme-switching');
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
    window.setTimeout(() => root.classList.remove('theme-switching'), 400);
  }, []);

  return [theme, toggle];
}
