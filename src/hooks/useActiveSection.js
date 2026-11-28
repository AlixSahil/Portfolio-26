import { useEffect, useState } from 'react';

// Tracks which section is passing through a thin band ~40% down the viewport.
// IntersectionObserver only fires on threshold crossings — no per-frame layout reads.
export default function useActiveSection(sectionIds) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const inBand = new Set();
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        });
        const current = sectionIds.find(id => inBand.has(id));
        setActive(current || null);
      },
      { rootMargin: '-40% 0px -58% 0px', threshold: 0 }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // The last section is short and may never reach the band — snap to it at the bottom.
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActive(sectionIds[sectionIds.length - 1]);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [sectionIds]);

  return active;
}
