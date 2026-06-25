import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import DarkVeil from './components/react-bits/DarkVeil.jsx';
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

const projects = [
  {
    title: 'Enterprise Inventory Management System',
    technologies: ['Oracle APEX', 'Oracle Database', 'PL/SQL'],
    description:
      'Enterprise inventory management platform with inventory tracking, stock monitoring, workflow automation, QR-based processes, dashboards, alerts, and reporting.',
    features: ['Stock monitoring', 'QR workflows', 'Automated alerts', 'Operational dashboards'],
    tone: 'inventory'
  },
  {
    title: 'Employee Survey Management System',
    technologies: ['Oracle APEX', 'Oracle Database', 'Email Automation'],
    description:
      'Department-wise survey platform featuring authentication, email automation, response tracking, reporting, dashboards, and workflow management.',
    features: ['Authentication', 'Response tracking', 'Email automation', 'Department reports'],
    tone: 'survey'
  },
  {
    title: 'Face Recognition Attendance System',
    technologies: ['Python', 'OpenCV', 'Flask', 'SQLite'],
    description:
      'Real-time facial recognition attendance platform with automated attendance tracking and analytics dashboard.',
    features: ['Face recognition', 'Attendance logs', 'Flask dashboard', 'SQLite storage'],
    tone: 'vision'
  },
  {
    title: 'Blockchain Document Verification',
    technologies: ['Solidity', 'IPFS', 'MetaMask'],
    description:
      'Blockchain-powered document verification system ensuring secure and tamper-proof digital verification.',
    features: ['Smart contracts', 'IPFS storage', 'Wallet flow', 'Tamper-proof verification'],
    tone: 'chain'
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
    ux: 'M4 7h16M7 4v6M17 4v6M6 14h5v5H6zM14 14h4v2h-4zM14 19h6',
    layout: 'M4 5h16M4 10h7v9H4zM14 10h6v4h-6zM14 17h6',
    system: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1',
    tools: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-3 3-3-3 3-3Z',
    apex: 'M12 3 3 19h18L12 3ZM12 8v5M12 16h.01',
    cloud: 'M7 18h10a4 4 0 0 0 .4-8 6 6 0 0 0-11.1 1.5A3.5 3.5 0 0 0 7 18Z',
    automation: 'M4 12a8 8 0 0 1 13.7-5.7M20 12a8 8 0 0 1-13.7 5.7M18 4v5h-5M6 20v-5h5',
    award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM9 14l-1 7 4-2 4 2-1-7',
    badge: 'M12 3 19 7v6c0 4-3 7-7 8-4-1-7-4-7-8V7l7-4ZM9 12l2 2 4-5',
    spark: 'M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2ZM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8L19 17Z',
    rocket: 'M14 4c3 0 5-2 6-2 0 1-2 3-2 6 0 5-4 8-8 8l-4 4 1-5-5 1 4-4c0-4 3-8 8-8ZM13 9a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z'
  };

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

function useTypingCycle(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
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
  }, [deleting, letterCount, wordIndex, words]);

  return words[wordIndex].slice(0, letterCount);
}

function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const marker = window.innerHeight * 0.42;
      let current = sectionIds[0];
      let nearestDistance = Number.POSITIVE_INFINITY;

      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - marker);
        if (rect.top <= marker && rect.bottom >= 96 && distance < nearestDistance) {
          current = id;
          nearestDistance = distance;
        }
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        current = sectionIds[sectionIds.length - 1];
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
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

function ProjectVisual({ tone, title }) {
  return (
    <div className={`project-visual ${tone}`} aria-label={`${title} visual preview`}>
      <span />
      <span />
      <span />
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="project-card"
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.985 }}
      viewport={revealViewport}
    >
      <ProjectVisual tone={project.tone} title={project.title} />
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
          <a href="https://github.com/AlixSahil" target="_blank" rel="noreferrer">GitHub</a>
          <a href="#contact">Live Demo</a>
        </div>
      </div>
    </motion.article>
  );
}

function SkillGroup({ group }) {
  return (
    <motion.article
      className="skill-card"
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
      viewport={revealViewport}
    >
      <div className="card-title-row">
        <span className="section-icon"><Icon name={group.icon} /></span>
        <h3>{group.title}</h3>
      </div>
      <div className="skill-list">
        {group.skills.map(skill => (
          <span key={skill}>
            <DecryptedText text={skill} animateOn="view" sequential speed={42} encryptedClassName="encrypted" />
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function App() {
  const typedRole = useTypingCycle(typingRoles);
  const activeSection = useActiveSection(navSectionIds);

  const handleContactSubmit = event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.get('name') || 'Visitor'}`);
    const body = encodeURIComponent(`${form.get('message') || ''}\n\nFrom: ${form.get('name') || ''}\nEmail: ${form.get('email') || ''}`);
    window.location.href = `mailto:alisahil8210@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main id="main">
      <nav className="nav" aria-label="Primary navigation">
        {navItems.map(item => (
          <motion.a
            className={activeSection === item.id ? 'active' : ''}
            href={`#${item.id}`}
            key={item.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            {item.label}
          </motion.a>
        ))}
      </nav>

      <section className="hero" id="home">
        <div className="veil-wrap" aria-hidden="true">
          <DarkVeil
            hueShift={-8}
            noiseIntensity={0.035}
            scanlineIntensity={0.05}
            scanlineFrequency={1.7}
            speed={0.65}
            warpAmount={0.075}
            resolutionScale={0.82}
          />
        </div>
        <div className="rays-wrap" aria-hidden="true">
          <SideRays
            speed={1.65}
            rayColor1="#f3cf61"
            rayColor2="#6fb5ff"
            intensity={1.45}
            spread={1.7}
            origin="top-right"
            tilt={-8}
            saturation={1.25}
            blend={0.68}
            falloff={1.9}
            opacity={0.85}
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

      <section id="about" className="reveal-band">
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
          <DarkVeil hueShift={-12} speed={0.26} warpAmount={0.035} noiseIntensity={0.016} scanlineIntensity={0.02} resolutionScale={0.62} />
        </div>
        <SectionHeading eyebrow="Experience" title="Enterprise software, automation, and applied AI" />
        <motion.div className="timeline" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={revealViewport}>
          {experience.map((item, index) => (
            <ExperienceItem key={item.role} item={item} index={index} />
          ))}
        </motion.div>
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
          <DarkVeil hueShift={-4} speed={0.3} warpAmount={0.04} noiseIntensity={0.02} scanlineIntensity={0.02} resolutionScale={0.62} />
        </div>
        <SectionHeading eyebrow="Certifications" title="Proof points across cloud, automation, and analytics" />
        <motion.div className="cert-grid" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={revealViewport}>
          {certifications.map((certification, index) => (
            <motion.article
              className="cert-card"
              key={certification.title}
              variants={revealUp}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.985 }}
            >
              <div className="cert-topline">
                <span>0{index + 1}</span>
                <span className="section-icon dark-icon"><Icon name={certification.icon} /></span>
              </div>
              <h3>{certification.title}</h3>
            </motion.article>
          ))}
        </motion.div>
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
        </form>
      </section>
    </main>
  );
}
