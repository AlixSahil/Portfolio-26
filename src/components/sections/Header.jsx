import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LuMenu, LuX, LuSun, LuMoon, LuArrowUpRight } from 'react-icons/lu';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { navItems, profile } from '../../data/portfolio.js';
import { getLenis } from '../../hooks/useSmoothScroll.js';
import { EASE } from '../ui/Reveal.jsx';

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="icon-btn-glyph"
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <LuSun aria-hidden="true" /> : <LuMoon aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Header({ activeSection, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const sheetRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile sheet: pause page scrolling, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.classList.add('is-locked');
    const firstLink = sheetRef.current?.querySelector('a');
    firstLink?.focus();
    const button = menuButtonRef.current;
    const sheet = sheetRef.current;

    const onKey = event => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 960) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      lenis?.start();
      document.documentElement.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      // Return focus to the menu button unless a link already moved it to a section.
      const activeEl = document.activeElement;
      if (!activeEl || activeEl === document.body || sheet?.contains(activeEl)) button?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-menu-open' : ''}`}>
        <div className="header-inner">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark" aria-hidden="true">SA</span>
            <span className="brand-name">{profile.name}</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary">
            <ul>
              {navItems.map(item => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className={isActive ? 'is-active' : undefined} aria-current={isActive ? 'location' : undefined}>
                      {isActive && (
                        <motion.span className="nav-indicator" layoutId="nav-indicator" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                      )}
                      <span className="nav-text">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <a className="btn btn-primary btn-sm header-cta" href="#contact">
              Let&apos;s talk
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="icon-btn menu-btn"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(open => !open)}
            >
              {menuOpen ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={sheetRef}
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <nav aria-label="Mobile">
              <ol>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: EASE }}
                  >
                    <a href={`#${item.id}`} onClick={() => setMenuOpen(false)} aria-current={activeSection === item.id ? 'location' : undefined}>
                      <span className="mobile-menu-index">0{i + 1}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ol>
            </nav>
            <motion.div
              className="mobile-menu-foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <a href={`mailto:${profile.email}`} className="mobile-menu-email">
                {profile.email}
                <LuArrowUpRight aria-hidden="true" />
              </a>
              <div className="mobile-menu-social">
                <a className="icon-btn" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                  <FaGithub aria-hidden="true" />
                </a>
                <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                  <FaLinkedinIn aria-hidden="true" />
                </a>
                <a className="btn btn-ghost btn-sm" href={profile.resume} download>
                  Résumé
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
