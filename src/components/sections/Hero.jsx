import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { LuArrowRight, LuArrowDown, LuDownload } from 'react-icons/lu';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { profile, experience, education } from '../../data/portfolio.js';
import MagneticLink from '../ui/MagneticLink.jsx';
import { EASE } from '../ui/Reveal.jsx';
import useReducedMotion from '../../hooks/useReducedMotion.js';

// Headline lines are revealed from behind a mask, one after another.
const headline = [
  { text: 'Software that' },
  { text: 'real businesses' },
  { text: 'run on.', accent: true }
];

const lineVariants = {
  hidden: { y: '110%' },
  visible: i => ({ y: '0%', transition: { duration: 1, ease: EASE, delay: 0.05 + i * 0.08 } })
};

// The intro paragraph is the Largest Contentful Paint element, so it slides in without
// starting transparent — it counts as painted on the very first frame.
const slideUp = delay => ({
  initial: { y: 14 },
  animate: { y: 0 },
  transition: { duration: 0.7, ease: EASE, delay }
});

const fadeUp = delay => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay }
});

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Subtle parallax: ambient light drifts slower than the page, copy lifts and fades.
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  const current = experience[0];
  const previous = experience[1];
  const degree = education[0];

  return (
    <section id="top" className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <motion.div className="hero-grid" style={reduced ? undefined : { y: gridY }} />
        <motion.div className="hero-glow" style={reduced ? undefined : { y: glowY }}>
          <span className="glow glow-a" />
          <span className="glow glow-b" />
        </motion.div>
        <div className="hero-noise" />
      </div>

      <motion.div className="container hero-inner" style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}>
        <div className="hero-top">
          <motion.p className="status-pill" {...fadeUp(0)}>
            <span className="status-dot" aria-hidden="true" />
            {profile.availability}
          </motion.p>
          <motion.p className="hero-identity" {...fadeUp(0.08)}>
            <span>{profile.name}</span>
            <span className="hero-identity-sep" aria-hidden="true">/</span>
            <span>{profile.role}</span>
          </motion.p>
        </div>

        <h1 id="hero-title" className="hero-title" aria-label="Software that real businesses run on.">
          {headline.map((line, i) => (
            <span className="line-mask" key={line.text} aria-hidden="true">
              <motion.span className={`line${line.accent ? ' line--accent' : ''}`} custom={i} variants={lineVariants} initial="hidden" animate="visible">
                {line.accent ? <em>{line.text}</em> : line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="hero-bottom">
          <div className="hero-lead">
            <motion.p className="hero-intro" {...slideUp(0.1)}>
              I&apos;m {profile.firstName}, a full-stack software developer building enterprise applications, REST APIs,
              automation platforms and AI-powered tools, from database schema to deployment.
            </motion.p>

            <motion.div className="hero-actions" {...fadeUp(0.35)}>
              <MagneticLink className="btn-primary btn-lg" href="#work">
                Explore my work
                <LuArrowRight aria-hidden="true" />
              </MagneticLink>
              <MagneticLink className="btn-secondary btn-lg" href="#contact">
                Let&apos;s connect
              </MagneticLink>
              <a className="btn btn-ghost btn-lg" href={profile.resume} download>
                <LuDownload aria-hidden="true" />
                Résumé
              </a>
            </motion.div>

            <motion.div className="hero-social" {...fadeUp(0.45)}>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedinIn aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </div>

          <motion.dl className="hero-meta" {...fadeUp(0.45)}>
            <div>
              <dt>Currently</dt>
              <dd>
                {current.role}
                <span>{current.company}</span>
              </dd>
            </div>
            <div>
              <dt>Previously</dt>
              <dd>
                {previous.role}
                <span>{previous.company}</span>
              </dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>
                {degree.short}
                <span>BIT Mesra</span>
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>
                Ranchi
                <span>Jharkhand, India</span>
              </dd>
            </div>
          </motion.dl>
        </div>
      </motion.div>

      <motion.a className="scroll-cue" href="#about" aria-label="Scroll to About" {...fadeUp(0.9)}>
        <span className="scroll-cue-line" aria-hidden="true" />
        <LuArrowDown aria-hidden="true" />
      </motion.a>
    </section>
  );
}
