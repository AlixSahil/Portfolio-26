import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { LuArrowUpRight, LuX, LuPlus, LuExternalLink } from 'react-icons/lu';
import { FaGithub } from 'react-icons/fa6';
import { projects } from '../../data/portfolio.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import { Reveal, RevealItem } from '../ui/Reveal.jsx';
import ProjectPreview from '../ui/ProjectPreview.jsx';
import TechBadge from '../ui/TechBadge.jsx';
import { getLenis } from '../../hooks/useSmoothScroll.js';
import { trackSpotlight } from '../../hooks/spotlight.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';

function ContextTag({ project }) {
  return (
    <span className="context-tag">
      {project.contextLogo && (
        <span className="context-logo">
          <img src={project.contextLogo} alt="" width="20" height="20" loading="lazy" decoding="async" />
        </span>
      )}
      {project.context}
    </span>
  );
}

function ProjectLinks({ project, onOpen, compact = false }) {
  return (
    <div className="project-links">
      <button type="button" className={`btn btn-secondary${compact ? ' btn-sm' : ''}`} onClick={() => onOpen(project)}>
        <LuPlus aria-hidden="true" />
        Case study
        <span className="sr-only">: {project.title}</span>
      </button>
      {project.demo && (
        <a className={`btn btn-ghost${compact ? ' btn-sm' : ''}`} href={project.demo} target="_blank" rel="noopener noreferrer">
          Live site
          <LuArrowUpRight aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {project.repo && (
        <a className={`btn btn-ghost${compact ? ' btn-sm' : ''}`} href={project.repo} target="_blank" rel="noopener noreferrer">
          <FaGithub aria-hidden="true" />
          Code
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

// Large alternating case-study row with parallax on the preview.
function FeaturedProject({ project, index, onOpen }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  return (
    <article ref={ref} className={`featured${index % 2 ? ' featured--flip' : ''}`} aria-labelledby={`p-${project.slug}`}>
      <Reveal className="featured-media">
        <button type="button" className="media-button" onClick={() => onOpen(project)} aria-label={`Open ${project.title} case study`}>
          <motion.div className="media-parallax" style={reduced ? undefined : { y }}>
            <ProjectPreview project={project} variant="featured" />
          </motion.div>
          <span className="media-cta" aria-hidden="true">
            View case study <LuArrowUpRight />
          </span>
        </button>
      </Reveal>

      <Reveal stagger className="featured-body">
        <RevealItem as="p" className="project-meta">
          <span className="project-num">{String(index + 1).padStart(2, '0')}</span>
          {project.category}
        </RevealItem>
        <RevealItem as="h3" id={`p-${project.slug}`} className="featured-title">
          {project.title}
          <span>{project.subtitle}</span>
        </RevealItem>
        <RevealItem as="p" className="featured-desc">
          {project.description}
        </RevealItem>
        <RevealItem as="dl" className="featured-facts">
          <div>
            <dt>Problem</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>My contribution</dt>
            <dd>{project.contribution[0]}</dd>
          </div>
        </RevealItem>
        <RevealItem as="ul" className="tech-row" aria-label="Technology stack">
          {project.technologies.map(t => (
            <li key={t}>
              <TechBadge name={t} size="sm" />
            </li>
          ))}
        </RevealItem>
        <RevealItem className="featured-foot">
          <ContextTag project={project} />
          <ProjectLinks project={project} onOpen={onOpen} />
        </RevealItem>
      </Reveal>
    </article>
  );
}

function BentoProject({ project, index, onOpen, large }) {
  return (
    <RevealItem
      as="article"
      className={`card bento-card spotlight${large ? ' bento-card--large' : ''}`}
      onPointerMove={trackSpotlight}
      aria-labelledby={`p-${project.slug}`}
    >
      <button type="button" className="media-button bento-media" onClick={() => onOpen(project)} aria-label={`Open ${project.title} case study`}>
        <ProjectPreview project={project} variant={large ? 'featured' : 'card'} />
      </button>
      <div className="bento-body">
        <p className="project-meta">
          <span className="project-num">{String(index + 1).padStart(2, '0')}</span>
          {project.category}
        </p>
        <h3 id={`p-${project.slug}`} className="bento-title">
          {project.title}
          <span>{project.subtitle}</span>
        </h3>
        <p className="bento-desc">{project.description}</p>
        <ul className="tech-row" aria-label="Technology stack">
          {project.technologies.slice(0, large ? 6 : 4).map(t => (
            <li key={t}>
              <TechBadge name={t} size="sm" />
            </li>
          ))}
          {!large && project.technologies.length > 4 && <li className="tech-more">+{project.technologies.length - 4}</li>}
        </ul>
        <div className="bento-foot">
          <ContextTag project={project} />
          <ProjectLinks project={project} onOpen={onOpen} compact />
        </div>
      </div>
    </RevealItem>
  );
}

function CaseStudyDialog({ project, onClose }) {
  const dialogRef = useRef(null);
  const scrollRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!project || !dialog) return undefined;
    if (!dialog.open) dialog.showModal();
    scrollRef.current?.scrollTo(0, 0);
    closeRef.current?.focus();
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.classList.add('is-locked');
    return () => {
      lenis?.start();
      document.documentElement.classList.remove('is-locked');
    };
  }, [project]);

  const requestClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  }, []);

  if (!project) return null;

  return (
    <dialog
      ref={dialogRef}
      className="case-dialog"
      aria-labelledby="case-title"
      onClose={onClose}
      onClick={event => {
        // Click on the backdrop (the <dialog> element itself, outside the panel) closes it.
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div className="case-panel" ref={scrollRef} data-lenis-prevent>
        <header className="case-head">
          <div>
            <p className="project-meta">{project.category}</p>
            <h2 id="case-title" className="case-title">
              {project.title}
            </h2>
            <p className="case-subtitle">{project.subtitle}</p>
          </div>
          <button ref={closeRef} type="button" className="icon-btn case-close" onClick={requestClose} aria-label="Close case study">
            <LuX aria-hidden="true" />
          </button>
        </header>

        <ProjectPreview project={project} variant="dialog" />

        <div className="case-grid">
          <section className="case-block case-block--wide">
            <h3>Overview</h3>
            <p>{project.description}</p>
          </section>
          <section className="case-block">
            <h3>The problem</h3>
            <p>{project.problem}</p>
          </section>
          <section className="case-block">
            <h3>My contribution</h3>
            <ul className="case-list">
              {project.contribution.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="case-block">
            <h3>Key features</h3>
            <ul className="chip-list">
              {project.features.map(f => (
                <li key={f} className="chip">
                  {f}
                </li>
              ))}
            </ul>
          </section>
          <section className="case-block">
            <h3>Technology</h3>
            <ul className="tech-row">
              {project.technologies.map(t => (
                <li key={t}>
                  <TechBadge name={t} size="sm" />
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="case-foot">
          <ContextTag project={project} />
          <div className="project-links">
            {project.demo && (
              <a className="btn btn-primary" href={project.demo} target="_blank" rel="noopener noreferrer">
                Visit live site
                <LuExternalLink aria-hidden="true" />
              </a>
            )}
            {project.repo && (
              <a className="btn btn-secondary" href={project.repo} target="_blank" rel="noopener noreferrer">
                <FaGithub aria-hidden="true" />
                View code
              </a>
            )}
            {!project.demo && !project.repo && <p className="case-note">Internal business application, so there is no public demo.</p>}
          </div>
        </footer>
      </div>
    </dialog>
  );
}

export default function Work() {
  const [selected, setSelected] = useState(null);
  const featured = projects.filter(p => p.featured);
  const more = projects.filter(p => !p.featured);

  return (
    <section id="work" className="section section--work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="Selected work"
          id="work-title"
          title={<>Systems built around <em>real</em> business workflows.</>}
          intro="Production platforms and enterprise applications, from a live e-commerce storefront to internal tools used across plant operations. Open any project for the full case study."
        />

        <div className="featured-list">
          {featured.map((project, i) => (
            <FeaturedProject key={project.slug} project={project} index={i} onOpen={setSelected} />
          ))}
        </div>

        <div className="subhead">
          <h3 className="subhead-title">Enterprise applications</h3>
          <p className="subhead-note">Aditya Birla Group · Hindalco</p>
        </div>

        <Reveal stagger className="bento">
          {more.map((project, i) => (
            <BentoProject key={project.slug} project={project} index={featured.length + i} onOpen={setSelected} large={i === 0} />
          ))}
        </Reveal>
      </div>

      <CaseStudyDialog key={selected?.slug} project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
