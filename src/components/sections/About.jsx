import React from 'react';
import { LuGraduationCap, LuArrowUpRight } from 'react-icons/lu';
import { about, education, certifications } from '../../data/portfolio.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import { Reveal, RevealItem } from '../ui/Reveal.jsx';
import { trackSpotlight } from '../../hooks/spotlight.js';

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader index="01" eyebrow="About" id="about-title" title={<>Practical software for <em>real</em> operational problems.</>} />

        <div className="about-grid">
          <div className="about-main">
            <Reveal as="p" className="about-statement">
              {about.statement}
            </Reveal>

            <Reveal className="about-copy">
              {about.paragraphs.map(p => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>

            <Reveal as="ul" stagger className="philosophy" aria-label="Development philosophy">
              {about.philosophy.map((item, i) => (
                <RevealItem as="li" key={item.title} className="card philosophy-card spotlight" onPointerMove={trackSpotlight}>
                  <span className="philosophy-index">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </RevealItem>
              ))}
            </Reveal>
          </div>

          <aside className="about-aside">
            <Reveal className="card info-card">
              <h3 className="info-title">Journey</h3>
              <ol className="journey">
                {about.journey.map((step, i) => (
                  <li key={step.title} className={i === about.journey.length - 1 ? 'is-current' : undefined}>
                    <span className="journey-period">{step.period}</span>
                    <span className="journey-title">{step.title}</span>
                    <span className="journey-place">{step.place}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal className="card info-card">
              <h3 className="info-title">Technical interests</h3>
              <ul className="chip-list">
                {about.interests.map(item => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="info-title info-title--spaced">How I work</h3>
              <ul className="chip-list">
                {about.traits.map(item => (
                  <li key={item} className="chip chip--quiet">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="card info-card info-card--row">
              <span className="info-icon" aria-hidden="true">
                <LuGraduationCap />
              </span>
              <div>
                <p className="info-kicker">Education & certifications</p>
                <p className="info-strong">
                  {education[0].short}, BIT Mesra · {certifications.length} certifications
                </p>
              </div>
              <a className="info-link" href="#credentials" aria-label="View education and certifications">
                <LuArrowUpRight aria-hidden="true" />
              </a>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
