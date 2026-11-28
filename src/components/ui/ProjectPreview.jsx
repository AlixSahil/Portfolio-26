import React, { useId, useState } from 'react';

// Animated app-icon glyphs (one per project), drawn on a 32×32 grid. Classes on inner
// parts drive each glyph's micro-animation in CSS.
export const projectGlyphs = {
  // Shayvera Food: shopping bag with a swaying leaf and a twinkle
  ecommerce: (
    <>
      <path d="M8.5 12h15l-1.3 12.6a2.2 2.2 0 0 1-2.2 2H12a2.2 2.2 0 0 1-2.2-2Z" />
      <path d="M12.5 12v-1.8a3.5 3.5 0 0 1 7 0V12" />
      <path className="pv-leaf pv-fill" d="M16 23.6c-3.3-.9-4.5-4.4-2.2-7.6 3.1.9 4.2 4.4 2.2 7.6Z" />
      <path className="pv-spark pv-accent" d="M26 4.2v3.6M24.2 6h3.6" />
    </>
  ),
  // BEAT 2.0: a field-sales route marching toward a map pin
  platform: (
    <>
      <circle cx="8" cy="24" r="2.2" />
      <path className="pv-route" d="M10.2 23.4c4-1.2 2.5-6.4 6.8-6.4 3.2 0 3.6 2.6 5 2.6" />
      <g className="pv-pin">
        <path d="M22 4.5a5 5 0 0 1 5 5c0 3.8-5 8.5-5 8.5s-5-4.7-5-8.5a5 5 0 0 1 5-5Z" />
        <circle className="pv-fill" cx="22" cy="9.5" r="1.7" />
      </g>
    </>
  ),
  // Aarambh ("beginning"): a sun rising over the horizon
  aarambh: uid => (
    <>
      <defs>
        <clipPath id={`${uid}-horizon`}>
          <rect x="0" y="0" width="32" height="21" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}-horizon)`}>
        <circle className="pv-sun pv-fill" cx="16" cy="21" r="6" />
      </g>
      <path className="pv-rays" d="M16 12.5V10M10 15l-1.8-1.8M22 15l1.8-1.8M8.2 17.8l-2.4-1M23.8 17.8l2.4-1" />
      <path d="M5 21h22" />
      <path d="M10 25.5h12" opacity="0.7" />
    </>
  ),
  // ICMS: a calibration gauge whose needle sweeps and settles
  icms: (
    <>
      <path d="M6 22a10 10 0 0 1 20 0" />
      <path d="M8.9 14.9l1.4 1.4M16 12v2M23.1 14.9l-1.4 1.4" opacity="0.75" />
      <path className="pv-needle" d="M16 22l5-6" />
      <circle className="pv-fill" cx="16" cy="22" r="2.1" />
      <path d="M10 26.5h12" opacity="0.7" />
    </>
  ),
  // Smart Inventory Tracker: a stock crate with a live-tracking ping
  inventory: (
    <>
      <g className="pv-crate">
        <path d="M16 5.5l9 4.5-9 4.5-9-4.5Z" />
        <path d="M7 10v10.5l9 4.5 9-4.5V10M16 14.5V25" />
        <path d="M11.5 7.75l9 4.5" opacity="0.6" />
      </g>
      <circle className="pv-ping pv-accent" cx="26" cy="5" r="2.2" />
      <circle className="pv-fill" cx="26" cy="5" r="2.2" />
    </>
  )
};

export function ProjectGlyph({ tone, size = 'md' }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const glyph = projectGlyphs[tone];
  return (
    <span className={`pv-logo pv-logo--${size}`} aria-hidden="true">
      <svg className="pv-glyph" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        {typeof glyph === 'function' ? glyph(`pv${uid}`) : glyph}
      </svg>
    </span>
  );
}

const Line = ({ w = 100, strong = false }) => (
  <span className={`sk-line${strong ? ' sk-line--strong' : ''}`} style={{ width: `${w}%` }} />
);

// Tone-specific interface composition. Purely illustrative — abstract blocks plus the
// project's real module names, never invented numbers.
function Composition({ project }) {
  const [a, b, c] = project.features;
  switch (project.tone) {
    case 'ecommerce':
      return (
        <div className="cmp cmp-shop">
          <div className="cmp-products">
            {[0, 1, 2, 3].map(i => (
              <span className="cmp-product" key={i}>
                <span className="cmp-product-img" />
                <Line w={70} />
                <Line w={40} strong />
              </span>
            ))}
          </div>
          <div className="cmp-checkout">
            <span className="cmp-label">{a}</span>
            <span className="cmp-pill">{b}</span>
          </div>
        </div>
      );
    case 'platform':
      return (
        <div className="cmp cmp-route">
          <svg className="cmp-map" viewBox="0 0 200 110" preserveAspectRatio="none" aria-hidden="true">
            <path className="cmp-map-route" d="M12 92 C 50 90, 46 40, 92 46 S 140 86, 188 18" />
            <circle className="cmp-map-node" cx="12" cy="92" r="3.5" />
            <circle className="cmp-map-node" cx="92" cy="46" r="3.5" />
            <circle className="cmp-map-node cmp-map-node--end" cx="188" cy="18" r="4.5" />
          </svg>
          <div className="cmp-rows">
            {[a, b, c].map(label => (
              <span className="cmp-row" key={label}>
                <span className="cmp-dot" />
                <span className="cmp-label">{label}</span>
              </span>
            ))}
          </div>
        </div>
      );
    case 'aarambh':
      return (
        <div className="cmp cmp-steps">
          <span className="cmp-label">16-step onboarding</span>
          <div className="cmp-stepper">
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i} className={`cmp-step${i < 9 ? ' is-done' : ''}${i === 9 ? ' is-current' : ''}`} />
            ))}
          </div>
          <div className="cmp-rows">
            {[c, d(project)].map(label => (
              <span className="cmp-row" key={label}>
                <span className="cmp-dot" />
                <span className="cmp-label">{label}</span>
              </span>
            ))}
          </div>
        </div>
      );
    case 'icms':
      return (
        <div className="cmp cmp-gauge">
          <svg className="cmp-dial" viewBox="0 0 120 70" aria-hidden="true">
            <path className="cmp-dial-track" d="M10 64a50 50 0 0 1 100 0" />
            <path className="cmp-dial-fill" d="M10 64a50 50 0 0 1 82-38" />
          </svg>
          <div className="cmp-rows">
            {[a, b, c].map(label => (
              <span className="cmp-row" key={label}>
                <span className="cmp-dot" />
                <span className="cmp-label">{label}</span>
              </span>
            ))}
          </div>
        </div>
      );
    case 'inventory':
    default:
      return (
        <div className="cmp cmp-stock">
          <div className="cmp-bars">
            {[62, 84, 38, 72, 22, 90, 56].map((h, i) => (
              <span key={i} className={`cmp-bar${h < 30 ? ' is-low' : ''}`} style={{ height: `${h}%` }} />
            ))}
          </div>
          <span className="cmp-pill">{a}</span>
        </div>
      );
  }
}

const d = project => project.features[3] || project.features[0];

// Project preview: a real screenshot when `project.image` is provided, otherwise an
// illustrated app window built from the project's own modules.
export default function ProjectPreview({ project, variant = 'card' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = project.image && !imageFailed;

  return (
    <div className={`pp pp--${variant}`} data-tone={project.tone}>
      <div className="pp-backdrop" aria-hidden="true" />
      <div className="pp-window" role="img" aria-label={`${project.title} interface preview`}>
        <div className="pp-bar" aria-hidden="true">
          <span className="pp-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="pp-url">{project.windowLabel}</span>
        </div>
        {showImage ? (
          <img
            className="pp-image"
            src={project.image}
            alt=""
            loading="lazy"
            decoding="async"
            width="1280"
            height="800"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="pp-body" aria-hidden="true">
            <div className="pp-side">
              <ProjectGlyph tone={project.tone} size="sm" />
              <Line w={80} />
              <Line w={60} />
              <Line w={70} />
              <Line w={50} />
            </div>
            <div className="pp-main">
              <div className="pp-head">
                <Line w={46} strong />
                <Line w={28} />
              </div>
              <Composition project={project} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
