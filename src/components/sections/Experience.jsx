import React, { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { LuMapPin, LuAward } from 'react-icons/lu';
import { experience, achievements } from '../../data/portfolio.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import { Reveal, RevealItem } from '../ui/Reveal.jsx';
import TechBadge from '../ui/TechBadge.jsx';
import { trackSpotlight } from '../../hooks/spotlight.js';

function Monogram({ name }) {
  const letters = name
    .split(/\s+/)
    .filter(w => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map(w => w[0])
    .join('');
  return <span className="org-logo org-logo--mono">{letters}</span>;
}

export default function Experience() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 75%', 'end 55%'] });

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Experience"
          id="experience-title"
          title={<>Enterprise software, automation and <em>applied</em> AI.</>}
        />

        <div className="timeline" ref={trackRef}>
          <span className="timeline-rail" aria-hidden="true">
            <motion.span className="timeline-progress" style={{ scaleY: scrollYProgress }} />
          </span>
          <ol>
            {experience.map(job => (
              <Reveal as="li" key={job.company} className={`job${job.current ? ' job--current' : ''}`}>
                <span className="job-node" aria-hidden="true" />
                <div className="job-when">
                  <p className="job-period">{job.period}</p>
                  <p className="job-location">
                    <LuMapPin aria-hidden="true" />
                    {job.location}
                  </p>
                  {job.current && <span className="badge-now">Current</span>}
                </div>
                <div className="card job-card spotlight" onPointerMove={trackSpotlight}>
                  <div className="job-head">
                    {job.logo ? (
                      <span className="org-logo">
                        <img src={job.logo} alt="" width="40" height="40" loading="lazy" decoding="async" />
                      </span>
                    ) : (
                      <Monogram name={job.company} />
                    )}
                    <div>
                      <h3 className="job-role">{job.role}</h3>
                      <p className="job-company">{job.company}</p>
                    </div>
                  </div>
                  <ul className="job-points">
                    {job.highlights.map(h => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <ul className="tech-row" aria-label={`Technologies used at ${job.company}`}>
                    {job.stack.map(t => (
                      <li key={t}>
                        <TechBadge name={t} size="sm" />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="subhead">
          <h3 className="subhead-title">Recognition</h3>
          <p className="subhead-note">Achievements</p>
        </div>
        <Reveal as="ul" stagger className="achievements">
          {achievements.map(item => (
            <RevealItem as="li" key={item.title} className="card achievement spotlight" onPointerMove={trackSpotlight}>
              <span className="achievement-icon" aria-hidden="true">
                <LuAward />
              </span>
              <h4>{item.title}</h4>
              <p className="achievement-issuer">{item.issuer}</p>
              <p>{item.body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
