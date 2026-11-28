// Cursor-follow highlight for cards: writes the pointer position into CSS custom
// properties that a radial-gradient pseudo-element reads. No React re-render.
export function trackSpotlight(event) {
  if (event.pointerType !== 'mouse') return;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  el.style.setProperty('--my', `${event.clientY - rect.top}px`);
}
