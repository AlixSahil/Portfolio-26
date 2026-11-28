import React from 'react';
import { LuPanelsTopLeft, LuServer, LuDatabase, LuCloudCog, LuCodeXml, LuSparkles, LuWrench } from 'react-icons/lu';
import { skillGroups, foundations } from '../../data/portfolio.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import { Reveal, RevealItem } from '../ui/Reveal.jsx';
import TechBadge from '../ui/TechBadge.jsx';
import { trackSpotlight } from '../../hooks/spotlight.js';

const groupIcons = {
  frontend: LuPanelsTopLeft,
  backend: LuServer,
  data: LuDatabase,
  devops: LuCloudCog,
  languages: LuCodeXml,
  ai: LuSparkles,
  tools: LuWrench
};

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          index="04"
          eyebrow="Stack"
          id="skills-title"
          title={<>A practical stack for shipping <em>full</em> systems.</>}
          intro="Tools I have used to design, build, deploy and support production software, grouped by where they sit in the system."
        />

        <Reveal stagger className="skills-bento">
          {skillGroups.map(group => {
            const Icon = groupIcons[group.id];
            return (
              <RevealItem as="article" key={group.id} className={`card skill-card skill-card--${group.id} spotlight`} onPointerMove={trackSpotlight}>
                <div className="skill-head">
                  <span className="skill-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="skill-count">{String(group.skills.length).padStart(2, '0')}</span>
                </div>
                <h3>{group.title}</h3>
                <p className="skill-blurb">{group.blurb}</p>
                <ul className="tech-row" aria-label={group.title}>
                  {group.skills.map(skill => (
                    <li key={skill}>
                      <TechBadge name={skill} />
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </Reveal>

        <Reveal className="foundations">
          <p className="foundations-label">Engineering foundations</p>
          <ul>
            {foundations.map(f => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
