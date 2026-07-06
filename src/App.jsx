import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import {
  SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss, SiTailwindcss,
  SiNodedotjs, SiExpress, SiDjango, SiFastapi, SiPython, SiC,
  SiPostgresql, SiMysql, SiMongodb, SiFirebase, SiGit, SiDocker,
  SiWordpress, SiClaude, SiGithubcopilot, SiN8N, SiOpenjdk, SiGoogle, SiNextdotjs
} from 'react-icons/si';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
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
  { title: 'Backend', icon: 'api', skills: ['Node.js', 'Express', 'Next.js', 'Django', 'FastAPI'] },
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
    title: 'BEAT 2.0 — Distribution & Field-Sales Management Platform',
    technologies: ['React', 'NestJS', 'TypeScript', 'PostgreSQL', 'Docker', 'nginx'],
    description:
      'Modernized a legacy FMCG Distribution & Field-Sales Management Platform by upgrading the existing application architecture, optimizing performance, resolving production bugs, and redesigning the complete user interface. Enhanced core business modules including distributor-to-invoice workflows, DSR dashboards, and Tally ERP integration.',
    features: ['Distribution lifecycle', 'Beat / route management', 'Tally integration', 'Premium UI system'],
    tone: 'platform',
    repo: null,
    demo: null,
    note: 'Minu Marketing Pvt Ltd.',
    companyLogo: '/logos/minu-marketing.jpg'
  },
  {
    title: 'Aarambh — Digital Onboarding System',
    technologies: ['Oracle APEX', 'Oracle Database', 'PL/SQL', 'ORDS', 'TypeUI', 'JavaScript'],
    description:
      'A 16-step digital onboarding workflow automating 22 HR documents — registration, multi-level approvals, and progress tracking behind role-based access.',
    features: ['16-step workflow', 'Role-based access', 'Document management', 'Approval workflows'],
    tone: 'aarambh',
    repo: null,
    demo: null,
    note: 'Aditya Birla Group Hindalco',
    companyLogo: '/logos/hindalco.webp'
  },
  {
    title: 'ICMS — Calibration & Maintenance',
    technologies: ['Oracle APEX', 'Oracle Database', 'PL/SQL', 'REST APIs', 'Tailwind CSS', 'JavaScript'],
    description:
      'Centralized instrument calibration and maintenance tracking with automated scheduling, deviation analysis, and audit-ready reporting.',
    features: ['Calibration tracking', 'Automated scheduling', 'Deviation analysis', 'Audit reporting'],
    tone: 'icms',
    repo: null,
    demo: null,
    note: 'Aditya Birla Group Hindalco',
    companyLogo: '/logos/hindalco.webp'
  },
  {
    title: 'Kund Vaani — Feedback System',
    technologies: ['Oracle APEX', 'Oracle Database', 'SQL', 'PL/SQL', 'TypeUI', 'jQuery'],
    description:
      'Centralized employee feedback platform with automated survey scheduling, custom SQL reporting, and real-time dashboards.',
    features: ['Survey scheduling', 'SQL reporting', 'Real-time dashboards', 'Feedback analytics'],
    tone: 'survey',
    repo: null,
    demo: null,
    note: 'Aditya Birla Group Hindalco',
    companyLogo: '/logos/hindalco.webp'
  },
  {
    title: 'Smart Inventory Tracker',
    technologies: ['Oracle APEX', 'Oracle Database', 'PL/SQL', 'ORDS', 'Tailwind CSS', 'jQuery'],
    description:
      'Real-time inventory tracking with automated alerts and operational dashboards for end-to-end stock visibility.',
    features: ['Real-time alerts', 'Stock dashboards', 'Inventory tracking', 'Operational visibility'],
    tone: 'inventory',
    repo: null,
    demo: null,
    note: 'Aditya Birla Group Hindalco',
    companyLogo: '/logos/hindalco.webp'
  },
  {
    title: 'Event Registration System',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    description:
      'QR-based event registration platform that accelerated on-site check-in and streamlined event operations.',
    features: ['QR registration', 'Fast check-in', 'Firebase backend', 'Responsive UI'],
    tone: 'event',
    repo: null,
    demo: null,
    note: 'Aditya Birla Group Hindalco',
    companyLogo: '/logos/hindalco.webp'
  }
];

// Each cert shows the issuer's real logo (loaded from an authoritative logo service by
// domain). mark/brand render a colored monogram tile as an automatic fallback if the
// logo can't load. To use higher-res official artwork, drop a file in /public/logos and
// point `logo` at it (e.g. logo: '/logos/oracle.svg') — it takes precedence over `domain`.
const certifications = [
  { title: 'Oracle APEX Cloud Developer Professional', issuer: 'Oracle', logo: '/logos/oracle.svg', slug: 'oracle', domain: 'oracle.com', mark: 'O', brand: '#C74634' },
  { title: 'Oracle Cloud Infrastructure 2025 Foundations Associate', issuer: 'Oracle', logo: '/logos/oracle.svg', slug: 'oracle', domain: 'oracle.com', mark: 'O', brand: '#C74634' },
  { title: 'Google IT Automation with Python', issuer: 'Google', logo: '/logos/google.svg', slug: 'google', domain: 'google.com', mark: 'G', brand: '#4285F4' },
  { title: 'Deloitte Data Analytics Job Simulation', issuer: 'Deloitte', logo: '/logos/deloitte.jpeg', slug: 'deloitte', domain: 'deloitte.com', mark: 'D', brand: '#86BC25' },
  { title: 'McKinsey.org Forward Program', issuer: 'McKinsey.org', logo: '/logos/mckinsey.png', slug: 'mckinsey', domain: 'mckinsey.org', mark: 'M', brand: '#00A9CE' }
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
    automation: 'M4 12a8 8 0 0 1 13.7-5.7M20 12a8 8 0 0 1-13.7 5.7M18 4v5h-5M6 20v-5h5',
    bolt: 'M13 2 4 14h6l-1 8 9-12h-6l1-8Z',
    search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 21l-4.35-4.35',
    mail: 'M3.5 6h17a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1ZM3 7.5l9 6 9-6',
    phone: 'M6.5 3h3l1.6 5-2.2 1.3a12 12 0 0 0 5 5l1.3-2.2 5 1.6v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z',
    pin: 'M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12ZM12 12a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z',
    user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 21a7 7 0 0 1 14 0',
    message: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z',
    send: 'M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z'
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

// Distinct, glowing schematic per project — a focal glyph that tells each project's
// story (network hub, onboarding path, calibration gauge, ticket, crates, feedback).
// Gradient/filter ids are tone-prefixed so the six inline SVGs never collide.
const projectArt = {
  inventory: (
    <>
      <defs>
        <radialGradient id="inventory-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3cf61" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f3cf61" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="inventory-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6fb5ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#6fb5ff" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {/* stacked crates */}
      <g stroke="rgba(247,244,236,0.4)" strokeWidth="1.6">
        <rect x="42" y="62" width="36" height="32" rx="4" fill="url(#inventory-box)" />
        <rect x="82" y="62" width="36" height="32" rx="4" fill="url(#inventory-box)" />
        <rect x="62" y="30" width="36" height="32" rx="4" fill="url(#inventory-box)" />
      </g>
      <g stroke="rgba(247,244,236,0.32)" strokeWidth="1.5">
        <line x1="60" y1="62" x2="60" y2="94" />
        <line x1="100" y1="62" x2="100" y2="94" />
        <line x1="80" y1="30" x2="80" y2="62" />
      </g>
      {/* real-time trend line */}
      <polyline points="128,86 148,70 166,78 188,50" fill="none" stroke="#6fb5ff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="128" cy="86" r="3.2" fill="#6fb5ff" />
      <circle cx="148" cy="70" r="3.2" fill="#6fb5ff" />
      <circle cx="166" cy="78" r="3.2" fill="#6fb5ff" />
      {/* glowing alert badge at the peak */}
      <circle cx="188" cy="50" r="18" fill="url(#inventory-halo)" />
      <circle cx="188" cy="50" r="8" fill="#12131a" stroke="#f3cf61" strokeWidth="2.2" />
      <line x1="188" y1="45" x2="188" y2="51" stroke="#f3cf61" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="188" cy="55" r="1.4" fill="#f3cf61" />
    </>
  ),
  survey: (
    <>
      <defs>
        <radialGradient id="survey-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3cf61" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f3cf61" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="survey-bubble" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6fb5ff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6fb5ff" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* feedback speech bubble ("vaani" = voice) */}
      <path
        d="M50 30 h108 a14 14 0 0 1 14 14 v22 a14 14 0 0 1 -14 14 h-70 l-16 16 v-16 h-16 a14 14 0 0 1 -14 -14 v-22 a14 14 0 0 1 14 -14 z"
        fill="url(#survey-bubble)"
        stroke="rgba(247,244,236,0.3)"
        strokeWidth="1.6"
      />
      {/* glowing rating star */}
      <circle cx="78" cy="56" r="19" fill="url(#survey-halo)" />
      <path d="M78 44 L80.8 52.1 L89.4 52.3 L82.6 57.5 L85.1 65.7 L78 60.8 L71 65.7 L73.4 57.5 L66.6 52.3 L75.2 52.1 Z" fill="#f3cf61" />
      {/* response dots + line */}
      <g fill="#6fb5ff">
        <circle cx="112" cy="49" r="3.2" />
        <circle cx="124" cy="49" r="3.2" />
        <circle cx="136" cy="49" r="3.2" />
        <circle cx="148" cy="49" r="3.2" />
      </g>
      <line x1="112" y1="63" x2="152" y2="63" stroke="rgba(247,244,236,0.4)" strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  aarambh: (
    <>
      <defs>
        <radialGradient id="aarambh-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3cf61" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f3cf61" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="aarambh-step" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#6fb5ff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6fb5ff" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* ascending onboarding steps */}
      <g fill="url(#aarambh-step)" stroke="rgba(247,244,236,0.3)" strokeWidth="1.4">
        <rect x="28" y="74" width="34" height="22" rx="4" />
        <rect x="68" y="58" width="34" height="38" rx="4" />
        <rect x="108" y="42" width="34" height="54" rx="4" />
      </g>
      {/* rising dotted path to completion */}
      <path d="M40 70 L84 54 L124 38 L170 32" fill="none" stroke="rgba(247,244,236,0.45)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1.5 6" />
      {/* glowing completion medallion */}
      <circle cx="178" cy="32" r="27" fill="url(#aarambh-halo)" />
      <circle cx="178" cy="32" r="16" fill="#12131a" stroke="#f3cf61" strokeWidth="2.5" />
      <path d="M170 32 l5.5 5.5 l9.5 -12" fill="none" stroke="#f3cf61" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  icms: (
    <>
      <defs>
        <linearGradient id="icms-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6fb5ff" />
          <stop offset="100%" stopColor="#f3cf61" />
        </linearGradient>
        <radialGradient id="icms-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3cf61" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f3cf61" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* gradient gauge arc */}
      <path d="M64 92 A56 56 0 0 1 176 92" fill="none" stroke="url(#icms-arc)" strokeWidth="5" strokeLinecap="round" />
      {/* ticks */}
      <g stroke="rgba(247,244,236,0.45)" strokeWidth="2" strokeLinecap="round">
        <line x1="72" y1="64" x2="78" y2="68" />
        <line x1="120" y1="37" x2="120" y2="45" />
        <line x1="168" y1="64" x2="162" y2="68" />
      </g>
      {/* needle + glow */}
      <circle cx="120" cy="92" r="20" fill="url(#icms-halo)" />
      <line x1="120" y1="92" x2="151" y2="58" stroke="#f3cf61" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="120" cy="92" r="6.5" fill="#12131a" stroke="#f3cf61" strokeWidth="2.5" />
      {/* small gear */}
      <g transform="translate(58,46)" stroke="#6fb5ff" strokeWidth="2" fill="none">
        <circle r="7.5" />
        <g strokeLinecap="round">
          <line x1="0" y1="-12" x2="0" y2="-9" />
          <line x1="0" y1="9" x2="0" y2="12" />
          <line x1="-12" y1="0" x2="-9" y2="0" />
          <line x1="9" y1="0" x2="12" y2="0" />
          <line x1="-8.5" y1="-8.5" x2="-6.4" y2="-6.4" />
          <line x1="6.4" y1="6.4" x2="8.5" y2="8.5" />
        </g>
      </g>
    </>
  ),
  event: (
    <>
      <defs>
        <radialGradient id="event-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3cf61" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f3cf61" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="event-ticket" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6fb5ff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#6fb5ff" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {/* ticket body */}
      <rect x="44" y="34" width="152" height="52" rx="10" fill="url(#event-ticket)" stroke="rgba(247,244,236,0.3)" strokeWidth="1.6" />
      {/* perforation stub divider */}
      <line x1="118" y1="38" x2="118" y2="82" stroke="rgba(247,244,236,0.3)" strokeWidth="1.6" strokeDasharray="3 4" />
      {/* QR block */}
      <g fill="#f3cf61">
        <rect x="58" y="46" width="7" height="7" rx="1" />
        <rect x="69" y="46" width="7" height="7" rx="1" />
        <rect x="58" y="57" width="7" height="7" rx="1" />
      </g>
      <g fill="#6fb5ff">
        <rect x="80" y="46" width="7" height="7" rx="1" />
        <rect x="69" y="57" width="7" height="7" rx="1" />
        <rect x="80" y="57" width="7" height="7" rx="1" />
        <rect x="58" y="68" width="7" height="7" rx="1" />
        <rect x="80" y="68" width="7" height="7" rx="1" />
      </g>
      {/* stub detail lines */}
      <g stroke="rgba(247,244,236,0.4)" strokeWidth="2.4" strokeLinecap="round">
        <line x1="132" y1="48" x2="180" y2="48" />
        <line x1="132" y1="58" x2="170" y2="58" />
      </g>
      {/* glowing scan check */}
      <circle cx="156" cy="72" r="15" fill="url(#event-halo)" />
      <path d="M149 71 l5 5 l9.5 -11.5" fill="none" stroke="#f3cf61" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  platform: (
    <>
      <defs>
        <radialGradient id="platform-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3cf61" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f3cf61" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="platform-link" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6fb5ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6fb5ff" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* glow behind the distribution hub */}
      <circle cx="120" cy="60" r="42" fill="url(#platform-halo)" />
      {/* links out to retailers / routes */}
      <g stroke="url(#platform-link)" strokeWidth="2" strokeLinecap="round">
        <line x1="120" y1="60" x2="50" y2="30" />
        <line x1="120" y1="60" x2="40" y2="82" />
        <line x1="120" y1="60" x2="196" y2="28" />
        <line x1="120" y1="60" x2="204" y2="80" />
        <line x1="120" y1="60" x2="120" y2="102" />
      </g>
      {/* satellite nodes */}
      <g fill="#6fb5ff">
        <circle cx="50" cy="30" r="5.5" />
        <circle cx="40" cy="82" r="5.5" />
        <circle cx="196" cy="28" r="5.5" />
        <circle cx="204" cy="80" r="5.5" />
        <circle cx="120" cy="102" r="5.5" />
      </g>
      {/* central distributor hub */}
      <circle cx="120" cy="60" r="14" fill="#12131a" stroke="#f3cf61" strokeWidth="2.5" />
      <circle cx="120" cy="60" r="5" fill="#f3cf61" />
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
            project.companyLogo ? (
              <span className="card-company">
                <span className="card-company-logo">
                  <img src={project.companyLogo} alt={`${project.note} logo`} loading="lazy" />
                </span>
                <span className="card-company-name">{project.note}</span>
              </span>
            ) : (
              <span className="card-note">{project.note}</span>
            )
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

// [icon, brand colour]. A null icon uses the neutral cube tinted with the given colour
// (for skills whose vendor logo is trademark-restricted, or abstract concepts). Skills
// with no entry at all fall back to the neutral grey cube.
const skillIcons = {
  React: [SiReact, '#61DAFB'],
  JavaScript: [SiJavascript, '#D9AE00'],
  TypeScript: [SiTypescript, '#3178C6'],
  HTML: [SiHtml5, '#E34F26'],
  CSS: [SiCss, '#1572B6'],
  'Tailwind CSS': [SiTailwindcss, '#06B6D4'],
  'Node.js': [SiNodedotjs, '#5FA04E'],
  Express: [SiExpress, '#4B5563'],
  'Next.js': [SiNextdotjs, '#111111'],
  Django: [SiDjango, '#0C4B33'],
  FastAPI: [SiFastapi, '#009688'],
  Python: [SiPython, '#3776AB'],
  Java: [SiOpenjdk, '#E76F00'],
  C: [SiC, '#5A7FA0'],
  SQL: [null, '#DE7C00'],
  'PL/SQL': [null, '#C74634'],
  Oracle: [null, '#C74634'],
  PostgreSQL: [SiPostgresql, '#4169E1'],
  MySQL: [SiMysql, '#00618A'],
  MongoDB: [SiMongodb, '#47A248'],
  Firebase: [SiFirebase, '#D98A00'],
  Git: [SiGit, '#F05032'],
  Docker: [SiDocker, '#2496ED'],
  'Oracle APEX': [null, '#C74634', '/logos/oracle.svg'],
  WordPress: [SiWordpress, '#21759B'],
  VPS: [null, '#4E9A51'],
  Claude: [SiClaude, '#D97757'],
  ChatGPT: [null, '#10A37F'],
  'GitHub Copilot': [SiGithubcopilot, '#6E7681'],
  'Google Antigravity': [SiGoogle, '#4285F4'],
  n8n: [SiN8N, '#EA4B71'],
  OOP: [null, '#7AA5F0'],
  DSA: [null, '#B98BE0'],
  'System Design': [null, '#5FBFA8'],
  SDLC: [null, '#E0A55F'],
  Optimization: [null, '#E0788B']
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
          const imgSrc = entry && entry[2];
          const SkillIcon = entry && entry[0] ? entry[0] : FallbackSkillIcon;
          const color = entry ? entry[1] : '#9c968a';
          return (
            <span key={skill}>
              {imgSrc ? (
                <img className="skill-chip-icon skill-chip-img" src={imgSrc} alt="" aria-hidden="true" />
              ) : (
                <SkillIcon className="skill-chip-icon" style={color ? { color } : undefined} aria-hidden="true" />
              )}
              <DecryptedText text={skill} animateOn="view" sequential speed={42} encryptedClassName="encrypted" />
            </span>
          );
        })}
      </div>
    </motion.article>
  );
}

// Real issuer logo on a light badge tile. Tries the local file in /public/logos first
// (both .svg and .png so any format you drop in just works), then an explicit logo URL,
// then the live favicon service, and finally the colored monogram if nothing loads.
function CertLogo({ cert }) {
  const sources = [];
  if (cert.logo) sources.push(cert.logo);
  if (cert.slug) ['svg', 'png', 'jpg', 'jpeg'].forEach(ext => sources.push(`/logos/${cert.slug}.${ext}`));
  if (cert.domain) sources.push(`https://www.google.com/s2/favicons?domain=${cert.domain}&sz=128`);
  const [idx, setIdx] = useState(0);

  if (idx >= sources.length) {
    return (
      <span className="cert-logo cert-logo--mono" style={{ '--brand': cert.brand }} title={cert.issuer} aria-hidden="true">
        {cert.mark}
      </span>
    );
  }
  return (
    <span className="cert-logo cert-logo--img" title={cert.issuer}>
      <img src={sources[idx]} alt={`${cert.issuer} logo`} loading="lazy" onError={() => setIdx(i => i + 1)} />
    </span>
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
        <CertLogo cert={certification} />
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
  // Spring-smooth the scroll value so the particle motion glides fluidly instead of
  // tracking every raw scroll delta.
  const smoothSceneProgress = useSpring(sceneProgress, { stiffness: 70, damping: 24, mass: 0.4 });
  const [sceneReady, setSceneReady] = useState(false);
  const lenisRef = useSmoothScroll();

  // Mount the 3D scene only when its section approaches; skip only for reduced-motion.
  // Mobile still gets it (with a lighter particle count / dpr — see ScrollScene).
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return undefined;
    if (reducedMotion) return undefined;

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
          Full Stack Software Developer based in Ranchi with an MCA from BIT Mesra, passionate about building scalable
          software that drives business efficiency and digital transformation.
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
          <motion.span variants={revealUp}><span className="fact-icon"><Icon name="code" /></span>Clean Code</motion.span>
          <motion.span variants={revealUp}><span className="fact-icon"><Icon name="bolt" /></span>Quick Learner</motion.span>
          <motion.span variants={revealUp}><span className="fact-icon"><Icon name="chart" /></span>Analytical Thinking</motion.span>
          <motion.span variants={revealUp}><span className="fact-icon"><Icon name="search" /></span>Attention to Detail</motion.span>
        </motion.div>
      </section>

      <section id="experience" className="content-section dark-veil-section">
        <div className="section-veil" aria-hidden="true">
          <DarkVeil hueShift={0} speed={0.24} warpAmount={0.035} noiseIntensity={0.015} scanlineIntensity={0.02} resolutionScale={0.5} brightness={1.5} />
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

      <section id="certifications" className="content-section dark-veil-section">
        <div className="section-veil cert-veil" aria-hidden="true">
          <DarkVeil hueShift={0} speed={0.28} warpAmount={0.04} noiseIntensity={0.02} scanlineIntensity={0.02} resolutionScale={0.5} brightness={1.5} />
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
                <ScrollScene progress={smoothSceneProgress} />
              </Suspense>
            )}
          </div>
          <div className="scene-caption">
            <p className="project-label">In motion</p>
            <h2 id="scene-heading">Software that keeps improving after launch.</h2>
            <p className="scene-tagline">Deploy. Learn. Refine. Repeat.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-copy">
          <p className="project-label">Contact</p>
          <h2>Let's build something useful.</h2>
          <p className="contact-intro">
            Open to full-time roles, freelance projects, and good conversations. Reach out on any channel — I usually reply within a day.
          </p>
          <div className="contact-links">
            <motion.a href="mailto:alisahil8210@gmail.com" whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>
              <span className="contact-icon"><Icon name="mail" /></span>alisahil8210@gmail.com
            </motion.a>
            <motion.a href="tel:+918210672479" whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>
              <span className="contact-icon"><Icon name="phone" /></span>+91 8210672479
            </motion.a>
            <span>
              <span className="contact-icon"><Icon name="pin" /></span>Ranchi, Jharkhand
            </span>
            <motion.a href="https://github.com/AlixSahil" target="_blank" rel="noreferrer" whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>
              <span className="contact-icon"><FaGithub /></span>GitHub
            </motion.a>
            <motion.a href="https://linkedin.com/in/sahilali8210" target="_blank" rel="noreferrer" whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>
              <span className="contact-icon"><FaLinkedinIn /></span>LinkedIn
            </motion.a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <label>
            <span className="field-label"><span className="field-icon"><Icon name="user" /></span>Name</span>
            <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
          </label>
          <label>
            <span className="field-label"><span className="field-icon"><Icon name="mail" /></span>Email</span>
            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label>
            <span className="field-label"><span className="field-icon"><Icon name="message" /></span>Message</span>
            <textarea name="message" rows="5" placeholder="Tell me about your project or role…" required />
          </label>
          <button className="button primary contact-submit" type="submit">
            <span className="btn-label">Send Message</span>
            <Icon name="send" />
          </button>
          <p className="form-status" role="status" aria-live="polite">{contactStatus}</p>
        </form>
      </section>
    </main>
  );
}
