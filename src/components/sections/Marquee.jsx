import React from 'react';
import { positioning } from '../../data/portfolio.js';

// CSS-only infinite marquee of the professional positioning. Two identical tracks
// loop seamlessly; the duplicate is hidden from assistive tech.
export default function Marquee() {
  const track = hidden => (
    <ul className="marquee-track" aria-hidden={hidden || undefined}>
      {positioning.map(item => (
        <li key={item}>
          {item}
          <span className="marquee-star" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee" role="region" aria-label="Areas of expertise">
      <div className="marquee-inner">
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
