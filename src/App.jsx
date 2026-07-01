import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion, useScroll } from 'motion/react';
import {
  SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss, SiTailwindcss,
  SiNodedotjs, SiExpress, SiDjango, SiFastapi, SiPython, SiC,
  SiPostgresql, SiMysql, SiMongodb, SiFirebase, SiGit, SiDocker,
  SiWordpress, SiClaude, SiGithubcopilot, SiN8N
} from 'react-icons/si';
import useReducedMotion from './hooks/useReducedMotion.js';
import useTilt from './hooks/useTilt.js';
import useSmoothScroll from './hooks/useSmoothScroll.js';
import DarkVeil from './components/react-bits/DarkVeil.jsx';

// three.js is heavy — load the scroll-reactive scene only when its section approaches.
const ScrollScene = lazy(() => import('./components/ScrollScene.jsx'));
import DecryptedText from './components/react-bits/DecryptedText.jsx';
import ScrollReveal from './components/react-bits/ScrollReveal.jsx';
import ScrollVelocity from './components/react-bits/ScrollVelocity.jsx';
import SideRays from './components/react-bits/SideRays.jsx';

const typingRoles = [
  'Full Stack Developer',
  'Software Engineer',
  'AI Enthusiast',
  'Problem Solver',
  'Enterprise Application Developer'
];

const experience = [
  {
    role: 'Full Stack Software Developer',
    company: 'Minu Marketing Pvt. Ltd.',
    period: 'June 2026 - Present',
    highlights: [
      'Modernizing enterprise applications through framework upgrades and performance optimization.',
      'Developing scalable full-stack applications, REST APIs, and database-driven systems.',
      'Building automation platforms and AI-powered business solutions.'
    ]
  },
  {
    role: 'Software Developer Trainee',
    company: 'Aditya Birla Group - Hindalco',
    period: 'April 2025 - April 2026',
    highlights: [
      'Developed enterprise applications across the SDLC.',
      'Built workflow automation systems, onboarding solutions, inventory systems, and feedback platforms.',
      'Delivered event registration platforms, QR-based workflows, dashboards, analytics, reports, and process monitoring tools.'
    ]
  },
  {
    role: 'AI & ML Intern',
    company: 'YBI Foundation',
    period: 'June 2024 - July 2024',
    highlights: [
      'Built Salary Prediction, Credit Card Fraud Detection, and Diabetes Classification projects.',
      'Worked across machine learning workflows, data preprocessing, and model evaluation.',
      'Strengthened practical understanding of applied AI and data-driven decision systems.'
    ]
  }
];

const skillGroups = [
  { title: 'Frontend', icon: 'layout', skills: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { title: 'Backend', icon: 'api', skills: ['Node.js', 'Express', 'Django', 'FastAPI'] },
  { title: 'Languages', icon: 'code', skills: ['Python', 'Java', 'C', 'SQL', 'PL/SQL'] },
  { title: 'Databases', icon: 'db', skills: ['Oracle', 'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'] },
  { title: 'Software Engineering', icon: 'system', skills: ['OOP', 'DSA', 'System Design', 'SDLC', 'Optimization'] },
  { title: 'Tools', icon: 'tools', skills: ['Git', 'Docker', 'Oracle APEX', 'WordPress', 'VPS'] },
  { title: 'AI & Automation', icon: 'ai', skills: ['Claude', 'ChatGPT', 'GitHub Copilot', 'Google Antigravity', 'n8n'] }
];

// repo / demo: fill in real per-project URLs to render the buttons.
// When both are null the card shows a `note` tag instead of faking a link.
const projects = [
  {
    title: 'Enterprise Inventory Management System',
    technologies: ['Oracle APEX', 'Oracle Database', 'PL/SQL'],
    description:
      'Enterprise inventory management platform with inventory tracking, stock monitoring, workflow automation, QR-based processes, dashboards, alerts, and reporting.',
    features: ['Stock monitoring', 'QR workflows', 'Automated alerts', 'Operational dashboards'],
    tone: 'inventory',
    repo: null,
    demo: null,
    note: 'Enterprise · internal'
  },
  {
    title: 'Employee Survey Management System',
    technologies: ['Oracle APEX', 'Oracle Database', 'Email Automation'],
    description:
      'Department-wise survey platform featuring authentication, email automation, response tracking, reporting, dashboards, and workflow management.',
    features: ['Authentication', 'Response tracking', 'Email automation', 'Department reports'],
    tone: 'survey',
    repo: null,
    demo: null,
    note: 'Enterprise · internal'
  },
  {
    title: 'Face Recognition Attendance System',
    technologies: ['Python', 'OpenCV', 'Flask', 'SQLite'],
    description:
      'Real-time facial recognition attendance platform with automated attendance tracking and analytics dashboard.',
    features: ['Face recognition', 'Attendance logs', 'Flask dashboard', 'SQLite storage'],
    tone: 'vision',
    repo: null,
    demo: null,
    note: 'Personal project'
  },
  {
    title: 'Blockchain Document Verification',
    technologies: ['Solidity', 'IPFS', 'MetaMask'],
    description:
      'Blockchain-powered document verification system ensuring secure and tamper-proof digital verification.',
    features: ['Smart contracts', 'IPFS storage', 'Wallet flow', 'Tamper-proof verification'],
    tone: 'chain',
    repo: null,
    demo: null,
    note: 'Personal project'
  }
];

const certifications = [
  { title: 'Oracle APEX Cloud Developer Professional', icon: 'apex' },
  { title: 'Oracle Cloud Infrastructure 2025 Foundations Associate', icon: 'cloud' },
  { title: 'Google IT Automation with Python', icon: 'automation' },
  { title: 'Deloitte Data Analytics Job Simulation', icon: 'chart' }
];

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' }
];
const navSectionIds = navItems.map(item => item.id);

const revealViewport = { once: true, amount: 0.22 };

const revealUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08
    }
  }
};

function Icon({ name }) {
  const paths = {
    code: 'M10 9 6 13l4 4M14 9l4 4-4 4M13 5l-2 16',
    api: 'M6 8h12M6 16h12M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z',
    ai: 'M12 3v3M12 18v3M3 12h3M18 12h3M6.6 6.6l2.1 2.1M15.3 15.3l2.1 2.1M17.4 6.6l-2.1 2.1M8.7 15.3l-2.1 2.1M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z',
    chart: 'M5 19V5M5 19h14M9 16v-5M13 16V8M17 16v-8',
    db: 'M5 7c0-2 14-2 14 0s-14 2-14 0Zm0 0v10c0 2 14 2 14 0V7M5 12c0 2 14 2 14 0',
    layout: 'M4 5h16M4 10h7v9H4zM14 10h6v4h-6zM14 17h6',
    system: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1',
    tools: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-3 3-3-3 3-3Z',
    apex: 'M12 3 3 19h18L12 3ZM12 8v5M12 16h.01',
    cloud: 'M7 18h10a4 4 0 0 0 .4-8 6 6 0 0 0-11.1 1.5A3.5 3.5 0 0 0 7 18Z',
    automation: 'M4 12a8 8 0 0 1 13.7-5.7M20 12a8 8 0 0 1-13.7 5.7M18 4v5h-5M6 20v-5h5'
  };

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

function useTypingCycle(words) {
  const reducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Reduced motion: hold the first role fully typed, no cycling.
    if (reducedMotion) return undefined;

    const word = words[wordIndex];
    const atEnd = letterCount === word.length;
    const atStart = letterCount === 0;
    const delay = atEnd && !deleting ? 1300 : deleting ? 34 : 58;

    const timeout = setTimeout(() => {
      if (atEnd && !deleting) {
        setDeleting(true);
        return;
      }
      if (atStart && deleting) {
        setDeleting(false);
        setWordIndex(index => (index + 1) % words.length);
        return;
      }
      setLetterCount(count => count + (deleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(timeout);
  }, [deleting, letterCount, wordIndex, words, reducedMotion]);

  if (reducedMotion) return words[0];
  return words[wordIndex].slice(0, letterCount);
}

function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    // IntersectionObserver fires only on threshold crossings — no per-scroll-tick
    // getBoundingClientRect layout reads. A thin band ~42% down the viewport marks
    // the "active" section as it passes through.
    const inBand = new Set();
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        });
        const current = sectionIds.find(id => inBand.has(id));
        if (current) setActiveSection(current);
      },
      { rootMargin: '-42% 0px -56% 0px', threshold: 0 }
    );

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Snap to the last section once the page is scrolled to the very bottom (short
    // final sections may never reach the band).
    const handleBottom = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
      }
    };
    window.addEventListener('scroll', handleBottom, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleBottom);
    };
  }, [sectionIds]);

  return activeSection;
}

function SectionHeading({ eyebrow, title }) {
  return (
    <motion.div
      className="section-heading"
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </motion.div>
  );
}

function ExperienceItem({ item, index }) {
  return (
    <motion.article
      className="timeline-item"
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <span className="project-index">0{index + 1}</span>
      <div>
        <p className="project-label">{item.period}</p>
        <h3>{item.role}</h3>
        <p className="company">{item.company}</p>
      </div>
      <ul>
        {item.highlights.map(highlight => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </motion.article>
  );
}

// Distinct, imageless schematic per project so the four cards stop looking identical.
const projectArt = {
  inventory: (
    <>
      <rect x="24" y="30" width="118" height="9" rx="4.5" fill="rgba(247,244,236,0.14)" />
      <rect x="24" y="30" width="84" height="9" rx="4.5" fill="#f3cf61" />
      <rect x="24" y="55" width="118" height="9" rx="4.5" fill="rgba(247,244,236,0.14)" />
      <rect x="24" y="55" width="52" height="9" rx="4.5" fill="#6fb5ff" />
      <rect x="24" y="80" width="118" height="9" rx="4.5" fill="rgba(247,244,236,0.14)" />
      <rect x="24" y="80" width="100" height="9" rx="4.5" fill="#f3cf61" />
      <rect x="168" y="30" width="48" height="48" rx="7" fill="none" stroke="rgba(247,244,236,0.3)" strokeWidth="2" />
      <rect x="176" y="38" width="11" height="11" rx="2" fill="#f3cf61" />
      <rect x="197" y="38" width="11" height="11" rx="2" fill="#f3cf61" />
      <rect x="176" y="59" width="11" height="11" rx="2" fill="#f3cf61" />
      <rect x="197" y="59" width="11" height="11" rx="2" fill="#6fb5ff" />
    </>
  ),
  survey: (
    <>
      <rect x="28" y="66" width="16" height="30" rx="3" fill="#f3cf61" />
      <rect x="52" y="52" width="16" height="44" rx="3" fill="#6fb5ff" />
      <rect x="76" y="40" width="16" height="56" rx="3" fill="#f3cf61" />
      <rect x="100" y="28" width="16" height="68" rx="3" fill="#6fb5ff" />
      <g stroke="rgba(247,244,236,0.4)" strokeWidth="2" fill="none" strokeLinecap="round">
        <rect x="150" y="34" width="13" height="13" rx="3" />
        <line x1="172" y1="40.5" x2="214" y2="40.5" />
        <rect x="150" y="58" width="13" height="13" rx="3" />
        <line x1="172" y1="64.5" x2="206" y2="64.5" />
        <rect x="150" y="82" width="13" height="13" rx="3" />
        <line x1="172" y1="88.5" x2="214" y2="88.5" />
      </g>
      <g stroke="#f3cf61" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M153 40.5 l2.5 3 l4.5 -6" />
        <path d="M153 64.5 l2.5 3 l4.5 -6" />
      </g>
    </>
  ),
  vision: (
    <>
      <g stroke="#6fb5ff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M74 32 h-18 v18" />
        <path d="M166 32 h18 v18" />
        <path d="M74 92 h-18 v-18" />
        <path d="M166 92 h18 v-18" />
      </g>
      <circle cx="104" cy="54" r="3.4" fill="#f3cf61" />
      <circle cx="136" cy="54" r="3.4" fill="#f3cf61" />
      <path d="M104 74 q16 11 32 0" stroke="#f3cf61" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <line x1="56" y1="62" x2="184" y2="62" stroke="rgba(111,181,255,0.45)" strokeWidth="1.5" strokeDasharray="5 5" />
    </>
  ),
  chain: (
    <>
      <g fill="none" strokeWidth="2.5" strokeLinecap="round">
        <rect x="26" y="42" width="46" height="40" rx="8" stroke="#f3cf61" />
        <rect x="97" y="42" width="46" height="40" rx="8" stroke="#6fb5ff" />
        <rect x="168" y="42" width="46" height="40" rx="8" stroke="#f3cf61" />
        <line x1="72" y1="62" x2="97" y2="62" stroke="rgba(247,244,236,0.4)" />
        <line x1="143" y1="62" x2="168" y2="62" stroke="rgba(247,244,236,0.4)" />
      </g>
      <g stroke="rgba(247,244,236,0.34)" strokeWidth="2" strokeLinecap="round">
        <line x1="34" y1="56" x2="58" y2="56" />
        <line x1="34" y1="66" x2="52" y2="66" />
        <line x1="105" y1="56" x2="129" y2="56" />
        <line x1="105" y1="66" x2="123" y2="66" />
      </g>
      <path d="M180 62 l4 5 l8 -10" stroke="#f3cf61" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
};

function ProjectVisual({ tone }) {
  return (
    <div className={`project-visual ${tone}`} aria-hidden="true">
      <svg className="pv-art" viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
        {projectArt[tone]}
      </svg>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const tilt = useTilt(6);
  return (
    <motion.article
      className="project-card tilt-card"
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.985 }}
      viewport={revealViewport}
      style={tilt.style}
      {...tilt.handlers}
    >
      <ProjectVisual tone={project.tone} />
      <div className="project-card-body">
        <span className="project-index">0{index + 1}</span>
        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="tech-list" aria-label={`${project.title} technologies`}>
          {project.technologies.map(tech => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <ul>
          {project.features.map(feature => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="card-actions">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer">View code</a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">Live demo</a>
          )}
          {!project.repo && !project.demo && project.note && (
            <span className="card-note">{project.note}</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// Generic "cube" mark for skills without a brand logo (concepts, un-branded tech).
function FallbackSkillIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3L18.5 8 12 11.7 5.5 8 12 4.3ZM5 9.7l6 3.4v6.6l-6-3.3V9.7Zm14 0v6.7l-6 3.3v-6.6l6-3.4Z" />
    </svg>
  );
}

// [icon, brand colour]. Skills not listed fall back to the neutral cube in the chip colour.
const skillIcons = {
  React: [SiReact, '#61DAFB'],
  JavaScript: [SiJavascript, '#E0B400'],
  TypeScript: [SiTypescript, '#3178C6'],
  HTML: [SiHtml5, '#E34F26'],
  CSS: [SiCss, '#1572B6'],
  'Tailwind CSS': [SiTailwindcss, '#06B6D4'],
  'Node.js': [SiNodedotjs, '#5FA04E'],
  Express: [SiExpress, '#4B5563'],
  Django: [SiDjango, '#0C4B33'],
  FastAPI: [SiFastapi, '#009688'],
  Python: [SiPython, '#3776AB'],
  C: [SiC, '#5A7FA0'],
  PostgreSQL: [SiPostgresql, '#4169E1'],
  MySQL: [SiMysql, '#00618A'],
  MongoDB: [SiMongodb, '#47A248'],
  Firebase: [SiFirebase, '#E8A400'],
  Git: [SiGit, '#F05032'],
  Docker: [SiDocker, '#2496ED'],
  WordPress: [SiWordpress, '#21759B'],
  Claude: [SiClaude, '#D97757'],
  'GitHub Copilot': [SiGithubcopilot, '#4B5563'],
  n8n: [SiN8N, '#EA4B71']
};

function SkillGroup({ group }) {
  const tilt = useTilt(5);
  return (
    <motion.article
      className="skill-card tilt-card"
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
      viewport={revealViewport}
      style={tilt.style}
      {...tilt.handlers}
    >
      <div className="card-title-row">
        <span className="section-icon"><Icon name={group.icon} /></span>
        <h3>{group.title}</h3>
      </div>
      <div className="skill-list">
        {group.skills.map(skill => {
          const entry = skillIcons[skill];
          const SkillIcon = entry ? entry[0] : FallbackSkillIcon;
          const color = entry ? entry[1] : '#9c968a';
          return (
            <span key={skill}>
              <SkillIcon className="skill-chip-icon" style={color ? { color } : undefined} aria-hidden="true" />
              <DecryptedText text={skill} animateOn="view" sequential speed={42} encryptedClassName="encrypted" />
            </span>
          );
        })}
      </div>
    </motion.article>
  );
}

function CertCard({ certification, index }) {
  const tilt = useTilt(5);
  return (
    <motion.article
      className="cert-card tilt-card"
      variants={revealUp}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
      style={tilt.style}
      {...tilt.handlers}
    >
      <div className="cert-topline">
        <span>0{index + 1}</span>
        <span className="section-icon dark-icon"><Icon name={certification.icon} /></span>
      </div>
      <h3>{certification.title}</h3>
    </motion.article>
  );
}

export default function App() {
  const typedRole = useTypingCycle(typingRoles);
  const activeSection = useActiveSection(navSectionIds);
  const reducedMotion = useReducedMotion();
  const navRef = useRef(null);
  const [contactStatus, setContactStatus] = useState('');
  const { scrollYProgress } = useScroll();
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%']
  });
  const sceneRef = useRef(null);
  const { scrollYProgress: sceneProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end']
  });
  const [sceneReady, setSceneReady] = useState(false);
  const lenisRef = useSmoothScroll();

  // Mount the 3D scene only when its section approaches; skip entirely for reduced-motion
  // and small/low-power screens (three.js is heavy).
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return undefined;
    if (reducedMotion || window.innerWidth < 600) return undefined;

    // Warm the three.js chunk during idle time so it's already cached before the section
    // scrolls into view — avoids the download hitch mid-scroll.
    const preload = () => {
      import('./components/ScrollScene.jsx');
    };
    const hasIdle = 'requestIdleCallback' in window;
    const idleId = hasIdle ? window.requestIdleCallback(preload, { timeout: 4000 }) : window.setTimeout(preload, 1800);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSceneReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '900px' }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (hasIdle) window.cancelIdleCallback(idleId);
      else clearTimeout(idleId);
    };
  }, [reducedMotion]);

  const handleNavClick = (event, id) => {
    const lenis = lenisRef.current;
    if (lenis) {
      event.preventDefault();
      lenis.scrollTo(`#${id}`, { offset: -70 });
    }
  };

  // Keep the active pill in view within the horizontally-scrolling mobile nav.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const active = nav.querySelector('a.active');
    if (!active) return;
    const target = active.offsetLeft - (nav.clientWidth - active.clientWidth) / 2;
    nav.scrollTo({ left: Math.max(0, target), behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [activeSection, reducedMotion]);

  const handleContactSubmit = event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.get('name') || 'Visitor'}`);
    const body = encodeURIComponent(`${form.get('message') || ''}\n\nFrom: ${form.get('name') || ''}\nEmail: ${form.get('email') || ''}`);
    window.location.href = `mailto:alisahil8210@gmail.com?subject=${subject}&body=${body}`;
    setContactStatus('Opening your email app… if nothing happens, email alisahil8210@gmail.com directly.');
  };

  return (
    <main id="main">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <nav className="nav" aria-label="Primary navigation" ref={navRef}>
        {navItems.map(item => {
          const isActive = activeSection === item.id;
          return (
            <motion.a
              className={isActive ? 'active' : ''}
              href={`#${item.id}`}
              key={item.id}
              aria-current={isActive ? 'true' : undefined}
              onClick={event => handleNavClick(event, item.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              {isActive && (
                <motion.span
                  className="nav-pill"
                  layoutId="nav-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="nav-label">{item.label}</span>
            </motion.a>
          );
        })}
      </nav>

      <section className="hero" id="home">
        <div className="veil-wrap" aria-hidden="true">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0.02}
            scanlineIntensity={0.02}
            scanlineFrequency={1.7}
            speed={0.5}
            warpAmount={0.08}
            resolutionScale={0.72}
            brightness={1.4}
          />
        </div>
        <div className="rays-wrap" aria-hidden="true">
          <SideRays
            speed={1.5}
            rayColor1="#ffce6a"
            rayColor2="#ffe6b4"
            intensity={1.6}
            spread={1.4}
            origin="top-right"
            tilt={-8}
            saturation={1.2}
            blend={0.5}
            falloff={1.18}
            opacity={0.62}
          />
        </div>

        <div className="hero-content">
          <p className="role">
            <DecryptedText
              text="Full Stack Software Developer"
              animateOn="view"
              sequential
              speed={58}
              revealDirection="center"
              encryptedClassName="encrypted"
            />
          </p>
          <h1 aria-label="Hi, I'm Sahil Ali.">
            Hi, I'm{' '}
            <DecryptedText
              text="Sahil Ali."
              animateOn="view"
              sequential
              speed={92}
              revealDirection="center"
              encryptedClassName="encrypted hero-name-encrypted"
              parentClassName="hero-name"
              showScreenReaderText={false}
            />
          </h1>
          <p className="typing-line" aria-label={`Animated role: ${typedRole}`}>
            {typedRole}
            <span aria-hidden="true">|</span>
          </p>
          <p className="hero-copy">
            I build scalable enterprise applications, automation platforms, AI-powered solutions, REST APIs, and modern web
            applications. I enjoy solving real business problems through clean architecture, intuitive user experiences, and
            efficient software engineering.
          </p>
          <div className="hero-actions">
            <motion.a className="button primary" href="#projects" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>View Projects</motion.a>
            <motion.a className="button secondary" href="/Sahil-Ali-Resume.pdf" download whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>Download Resume</motion.a>
            <motion.a className="button secondary" href="#contact" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>Contact Me</motion.a>
          </div>
        </div>
      </section>

      <ScrollVelocity
        texts={['Enterprise Apps - REST APIs - AI Automation - Dashboards - Oracle APEX - ', 'React - Python - Node.js - PL/SQL - System Design - ']}
        velocity={42}
        className="velocity-text"
        numCopies={5}
      />

      <section id="about" className="reveal-band" aria-labelledby="about-heading">
        <h2 id="about-heading" className="sr-only">About</h2>
        <ScrollReveal baseOpacity={0.04} baseRotation={2} blurStrength={8} textClassName="statement">
          I am a full stack software developer from Ranchi with an MCA from BIT Mesra and a strong foundation in software
          engineering, enterprise application development, automation, and AI-powered business solutions.
        </ScrollReveal>
      </section>

      <section className="content-section about-detail" aria-label="About Sahil Ali">
        <div className="about-copy">
          <p>
            My work sits close to real operational problems: inventory visibility, employee workflows, onboarding, reporting,
            surveys, dashboards, and automation. I like building systems that are practical first, then polished enough that
            teams actually want to use them every day.
          </p>
          <p>
            I work across modern web technologies, REST APIs, databases, and AI-assisted tools, with a focus on clean
            architecture, maintainable code, and scalable software that can keep improving after launch.
          </p>
        </div>
        <motion.div
          className="profile-facts"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <motion.span variants={revealUp}>Ranchi, Jharkhand, India</motion.span>
          <motion.span variants={revealUp}>MCA, BIT Mesra</motion.span>
          <motion.span variants={revealUp}>Enterprise Applications</motion.span>
          <motion.span variants={revealUp}>Automation + AI Systems</motion.span>
        </motion.div>
      </section>

      <section id="experience" className="content-section dark-veil-section">
        <div className="section-veil" aria-hidden="true">
          <DarkVeil hueShift={0} speed={0.24} warpAmount={0.035} noiseIntensity={0.015} scanlineIntensity={0.02} resolutionScale={0.5} brightness={1.1} />
        </div>
        <SectionHeading eyebrow="Experience" title="Enterprise software, automation, and applied AI" />
        <div className="timeline-wrap" ref={timelineRef}>
          <span className="timeline-track" aria-hidden="true" />
          <motion.span className="timeline-fill" style={{ scaleY: timelineProgress }} aria-hidden="true" />
          <motion.div className="timeline" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={revealViewport}>
            {experience.map((item, index) => (
              <ExperienceItem key={item.role} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      <section id="skills" className="content-section light-section">
        <SectionHeading eyebrow="Skills" title="A practical stack for shipping full systems" />
        <motion.div className="skills-grid" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={revealViewport}>
          {skillGroups.map(group => (
            <SkillGroup key={group.title} group={group} />
          ))}
        </motion.div>
      </section>

      <section id="projects" className="content-section light-section">
        <SectionHeading eyebrow="Projects" title="Selected systems built around real business workflows" />
        <motion.div className="project-grid premium-grid" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={revealViewport}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </section>

      <section id="certifications" className="content-section">
        <div className="section-veil cert-veil" aria-hidden="true">
          <DarkVeil hueShift={0} speed={0.28} warpAmount={0.04} noiseIntensity={0.02} scanlineIntensity={0.02} resolutionScale={0.5} brightness={1.1} />
        </div>
        <SectionHeading eyebrow="Certifications" title="Proof points across cloud, automation, and analytics" />
        <motion.div className="cert-grid" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={revealViewport}>
          {certifications.map((certification, index) => (
            <CertCard key={certification.title} certification={certification} index={index} />
          ))}
        </motion.div>
      </section>

      <section className="scene-band" ref={sceneRef} aria-labelledby="scene-heading">
        <div className="scene-sticky">
          <div className="scene-canvas">
            {sceneReady && (
              <Suspense fallback={null}>
                <ScrollScene progress={sceneProgress} />
              </Suspense>
            )}
          </div>
          <div className="scene-caption">
            <p className="project-label">In motion</p>
            <h2 id="scene-heading">Software that keeps improving after launch.</h2>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-copy">
          <p className="project-label">Contact</p>
          <h2>Let's build something useful.</h2>
          <div className="contact-links">
            <motion.a href="mailto:alisahil8210@gmail.com" whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>alisahil8210@gmail.com</motion.a>
            <motion.a href="tel:+918210672479" whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>+91 8210672479</motion.a>
            <span>Ranchi, Jharkhand</span>
            <motion.a href="https://github.com/AlixSahil" target="_blank" rel="noreferrer" whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>GitHub</motion.a>
            <motion.a href="https://linkedin.com/in/sahilali8210" target="_blank" rel="noreferrer" whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>LinkedIn</motion.a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <label>
            Name
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button className="button primary" type="submit">Send Message</button>
          <p className="form-status" role="status" aria-live="polite">{contactStatus}</p>
        </form>
      </section>
    </main>
  );
}
