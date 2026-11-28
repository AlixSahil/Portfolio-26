import React, { useState } from 'react';
import { LuGraduationCap, LuArrowUpRight, LuBadgeCheck } from 'react-icons/lu';
import { education, certifications } from '../../data/portfolio.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import { Reveal, RevealItem } from '../ui/Reveal.jsx';
import { trackSpotlight } from '../../hooks/spotlight.js';

// Issuer logo with a neutral icon fallback if the file fails to load.
function IssuerLogo({ src, issuer }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="issuer-logo">
      {failed || !src ? (
        <LuBadgeCheck aria-hidden="true" />
      ) : (
        <img src={src} alt={`${issuer} logo`} width="28" height="28" loading="lazy" decoding="async" onError={() => setFailed(true)} />
      )}
    </span>
  );
}

export default function Credentials() {
  return (
    <section id="credentials" className="section" aria-labelledby="credentials-title">
      <div className="container">
        <SectionHeader
          index="05"
          eyebrow="Credentials"
          id="credentials-title"
          title={<>Education & <em>certifications</em>.</>}
        />

        <div className="credentials-grid">
          <Reveal stagger className="education">
            {education.map(item => (
              <RevealItem as="article" key={item.short} className="card edu-card spotlight" onPointerMove={trackSpotlight}>
                <div className="edu-top">
                  <span className="edu-icon" aria-hidden="true">
                    <LuGraduationCap />
                  </span>
                  <span className="edu-period">{item.period}</span>
                </div>
                <p className="edu-short">{item.short}</p>
                <h3>{item.degree}</h3>
                <p className="edu-school">{item.school}</p>
                <p className="edu-score">{item.score}</p>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal as="ul" stagger className="cert-list" aria-label="Certifications">
            {certifications.map(cert => (
              <RevealItem as="li" key={cert.title} className="cert-row">
                <IssuerLogo src={cert.logo} issuer={cert.issuer} />
                <div className="cert-text">
                  <h3>{cert.title}</h3>
                  <p>
                    {cert.issuer}
                    {cert.year && <span> · {cert.year}</span>}
                  </p>
                </div>
                {cert.url ? (
                  <a className="cert-verify" href={cert.url} target="_blank" rel="noopener noreferrer">
                    Verify
                    <LuArrowUpRight aria-hidden="true" />
                    <span className="sr-only">{cert.title} credential (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="cert-check" aria-hidden="true">
                    <LuBadgeCheck />
                  </span>
                )}
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
