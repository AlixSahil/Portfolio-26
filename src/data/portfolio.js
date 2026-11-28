// Single source of truth for portfolio content.
// Everything here comes from the existing site and the resume in /public — nothing is
// invented. Where something is unknown (certificate years, credential links, project
// screenshots) the field is left null and the UI simply hides it until you fill it in.

export const profile = {
  name: 'Sahil Ali',
  firstName: 'Sahil',
  role: 'Full-Stack Software Developer',
  location: 'Ranchi, Jharkhand, India',
  locationShort: 'Ranchi, IN',
  email: 'alisahil8210@gmail.com',
  phone: '+91 8210672479',
  phoneHref: 'tel:+918210672479',
  resume: '/Sahil-Ali-Resume.pdf',
  github: 'https://github.com/AlixSahil',
  githubHandle: 'AlixSahil',
  linkedin: 'https://www.linkedin.com/in/sahilali8210',
  linkedinHandle: 'sahilali8210',
  site: 'https://sahil-ali27.netlify.app',
  // From the existing contact copy: "Open to full-time roles, freelance projects, and good conversations."
  availability: 'Open to full-time roles & freelance projects'
};

// Professional positioning — shown in the hero marquee.
export const positioning = [
  'Full-Stack Development',
  'Software Engineering',
  'Application Development',
  'AI Automation',
  'Database & API Development',
  'Deployment & DevOps'
];

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Stack' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' }
];

export const about = {
  statement:
    'Full-stack developer based in Ranchi with an MCA from BIT Mesra, building scalable software that drives business efficiency and digital transformation.',
  paragraphs: [
    'My work sits close to real operational problems: inventory visibility, employee workflows, onboarding, reporting, dashboards and automation. I like building systems that are practical first, then polished enough that teams actually want to use them every day.',
    'I work across modern web technologies, REST APIs, databases and AI-assisted tooling, with a focus on clean architecture, maintainable code and software that can keep improving after launch.'
  ],
  philosophy: [
    {
      title: 'Practical first',
      body: 'Start from the workflow people already run, then remove the manual steps that slow it down.'
    },
    {
      title: 'Polished enough to adopt',
      body: 'Internal tools deserve good UX too. If the team avoids it, it has not shipped.'
    },
    {
      title: 'Built to keep improving',
      body: 'Clean architecture and maintainable code so the system can evolve after launch. Deploy, learn, refine, repeat.'
    }
  ],
  interests: [
    'Enterprise applications',
    'Workflow automation',
    'AI-powered tools',
    'REST API design',
    'Data-driven dashboards',
    'System design'
  ],
  traits: ['Clean code', 'Quick learner', 'Analytical thinking', 'Attention to detail'],
  journey: [
    { period: '2019 – 2022', title: 'BCA', place: 'Techno India University, Kolkata' },
    { period: '2023 – 2025', title: 'MCA', place: 'BIT Mesra' },
    { period: '2024', title: 'AI & ML Intern', place: 'YBI Foundation' },
    { period: '2025 – 2026', title: 'Application Developer', place: 'Aditya Birla Group · Hindalco' },
    { period: '2026 – Now', title: 'Full-Stack Software Developer', place: 'Minu Marketing Pvt. Ltd.' }
  ]
};

// Project previews: drop a real screenshot in /public/projects/<slug>.webp and set
// `image` to render it (it falls back to the illustrated preview if it fails to load).
// `repo` / `demo`: set real URLs to render the buttons. null = button hidden.
export const projects = [
  {
    slug: 'shayvera',
    featured: true,
    title: 'Shayvera Food',
    subtitle: 'Full-stack e-commerce platform',
    category: 'E-commerce · Production',
    context: 'Shayvera Food',
    contextLogo: '/logos/shayvera.svg',
    tone: 'ecommerce',
    windowLabel: 'shayvera.in',
    description:
      'A production-ready B2C e-commerce platform for an Indian food brand: product management, secure checkout, Razorpay payments, inventory, Shiprocket shipping, GST invoicing and a role-based admin dashboard.',
    problem:
      'An Indian food brand needed its own direct-to-consumer storefront that handled the full order lifecycle (catalogue, secure payments, inventory, shipping and GST-compliant invoicing), with an admin side the team could run day to day.',
    contribution: [
      'Developed the storefront, product management and secure checkout with Next.js, React and TypeScript.',
      'Integrated Razorpay payments and Shiprocket shipping into the order flow.',
      'Implemented inventory management and GST invoicing on PostgreSQL with Prisma.',
      'Built a role-based admin dashboard for day-to-day operations.'
    ],
    features: ['Secure checkout', 'Razorpay payments', 'Inventory management', 'Shiprocket & GST invoicing', 'Role-based admin'],
    technologies: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Docker', 'Razorpay'],
    image: null,
    repo: null,
    demo: 'https://shayvera.in/'
  },
  {
    slug: 'beat',
    featured: true,
    title: 'BEAT 2.0',
    subtitle: 'Distribution & field-sales management platform',
    category: 'Enterprise · Modernization',
    context: 'Minu Marketing Pvt. Ltd.',
    contextLogo: '/logos/minu-marketing.jpg',
    tone: 'platform',
    windowLabel: 'BEAT 2.0 · Distribution',
    description:
      'Modernized a legacy FMCG distribution & field-sales management platform: upgraded the application architecture, optimized performance, resolved production bugs and redesigned the complete user interface.',
    problem:
      'A legacy FMCG distribution and field-sales platform was held back by an older architecture, performance issues, open production bugs and a dated interface across its core business modules.',
    contribution: [
      'Upgraded the existing application architecture on React, NestJS, TypeScript and PostgreSQL.',
      'Optimized performance and resolved production bugs.',
      'Redesigned the complete user interface into a consistent, premium UI system.',
      'Enhanced core modules: distributor-to-invoice workflows, DSR dashboards and Tally ERP integration.'
    ],
    features: ['Distribution lifecycle', 'Beat / route management', 'DSR dashboards', 'Tally ERP integration', 'Premium UI system'],
    technologies: ['React', 'NestJS', 'TypeScript', 'PostgreSQL', 'Docker', 'nginx'],
    image: null,
    repo: null,
    demo: null
  },
  {
    slug: 'aarambh',
    featured: false,
    title: 'Aarambh',
    subtitle: 'Digital onboarding system',
    category: 'Enterprise · HR workflow',
    context: 'Aditya Birla Group · Hindalco',
    contextLogo: '/logos/hindalco.webp',
    tone: 'aarambh',
    windowLabel: 'Aarambh · Onboarding',
    description:
      'A 16-step digital onboarding workflow automating 22 HR documents: registration, multi-level approvals and progress tracking behind role-based access.',
    problem:
      'Onboarding a new employee meant moving 22 HR documents through registration and multi-level approvals manually, with limited visibility into where each joiner stood.',
    contribution: [
      'Built the 16-step onboarding workflow covering registration, approvals and progress tracking.',
      'Automated the 22-document HR flow with document management.',
      'Implemented role-based access and multi-level approval workflows in Oracle APEX, PL/SQL and ORDS.'
    ],
    features: ['16-step workflow', 'Role-based access', 'Document management', 'Approval workflows'],
    technologies: ['Oracle APEX', 'Oracle Database', 'PL/SQL', 'ORDS', 'JavaScript'],
    image: null,
    repo: null,
    demo: null
  },
  {
    slug: 'icms',
    featured: false,
    title: 'ICMS',
    subtitle: 'Instrument calibration & maintenance',
    category: 'Enterprise · Compliance',
    context: 'Aditya Birla Group · Hindalco',
    contextLogo: '/logos/hindalco.webp',
    tone: 'icms',
    windowLabel: 'ICMS · Calibration',
    description:
      'Centralized instrument calibration and maintenance tracking with automated scheduling, deviation analysis and audit-ready reporting.',
    problem:
      'Instrument calibration and maintenance had to be scheduled, tracked and evidenced for audits, which needed a single, reliable source of truth.',
    contribution: [
      'Built centralized calibration and maintenance tracking on Oracle APEX and PL/SQL.',
      'Implemented automated scheduling and deviation analysis.',
      'Delivered audit-ready reporting, with REST API integration.'
    ],
    features: ['Calibration tracking', 'Automated scheduling', 'Deviation analysis', 'Audit reporting'],
    technologies: ['Oracle APEX', 'Oracle Database', 'PL/SQL', 'REST APIs', 'Tailwind CSS', 'JavaScript'],
    image: null,
    repo: null,
    demo: null
  },
  {
    slug: 'inventory',
    featured: false,
    title: 'Smart Inventory Tracker',
    subtitle: 'Real-time stock visibility',
    category: 'Enterprise · Operations',
    context: 'Aditya Birla Group · Hindalco',
    contextLogo: '/logos/hindalco.webp',
    tone: 'inventory',
    windowLabel: 'Inventory · Live',
    description:
      'Real-time inventory tracking with automated alerts and operational dashboards for end-to-end stock visibility.',
    problem:
      'Teams needed end-to-end visibility into stock levels and timely alerts when inventory needed attention.',
    contribution: [
      'Built real-time inventory tracking on Oracle APEX, PL/SQL and ORDS.',
      'Implemented automated stock alerts.',
      'Designed operational dashboards for stock visibility.'
    ],
    features: ['Real-time alerts', 'Stock dashboards', 'Inventory tracking', 'Operational visibility'],
    technologies: ['Oracle APEX', 'Oracle Database', 'PL/SQL', 'ORDS', 'Tailwind CSS', 'jQuery'],
    image: null,
    repo: null,
    demo: null
  }
];

export const experience = [
  {
    role: 'Full-Stack Software Developer',
    company: 'Minu Marketing Pvt. Ltd.',
    logo: '/logos/minu-marketing.jpg',
    location: 'Ranchi',
    period: 'Jun 2026 — Present',
    current: true,
    stack: ['React', 'Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Docker'],
    highlights: [
      'Modernizing legacy applications through framework upgrades, performance optimization and security enhancements.',
      'Developing scalable full-stack applications, REST APIs and database-driven solutions.',
      'Building automation platforms and AI-powered solutions to streamline business workflows.'
    ]
  },
  {
    role: 'Application Developer',
    company: 'Aditya Birla Group · Hindalco',
    logo: '/logos/hindalco.webp',
    location: 'Muri, Jharkhand',
    period: 'Apr 2025 — Apr 2026',
    stack: ['Oracle APEX', 'PL/SQL', 'Oracle Database', 'ORDS', 'REST APIs', 'JavaScript'],
    highlights: [
      'Built and maintained enterprise applications across the full SDLC: system design, API development, database optimization, testing, deployment and production support.',
      'Developed workflow automation, employee onboarding, feedback management, inventory tracking, event registration and maintenance management solutions.',
      'Designed data-driven platforms with automated scheduling, real-time dashboards, reporting, alerts, QR-based workflows and process monitoring.'
    ]
  },
  {
    role: 'AI & ML Intern',
    company: 'YBI Foundation',
    logo: null,
    location: 'Remote',
    period: 'Jun 2024 — Jul 2024',
    stack: ['Python', 'Scikit-learn', 'Keras', 'Pandas', 'MiniSom'],
    highlights: [
      'Developed ML models for salary prediction, credit card fraud detection and diabetes classification.',
      'Applied data preprocessing, feature engineering and model evaluation to build end-to-end ML workflows.'
    ]
  }
];

export const achievements = [
  {
    title: 'Letter of Recommendation',
    issuer: 'Aditya Birla Group · Hindalco',
    body: 'For contributions towards enterprise application development and digitalization initiatives.'
  },
  {
    title: 'Role Model Bhoomika Certificate',
    issuer: 'Hindalco',
    body: 'Awarded for ownership, collaboration and impactful contribution during apprenticeship.'
  },
  {
    title: 'First in-house app development',
    issuer: 'Hindalco',
    body: 'Led the first-ever in-house application development initiatives and delivered multiple digitization projects.'
  }
];

export const education = [
  {
    degree: 'Master of Computer Applications',
    short: 'MCA',
    school: 'Birla Institute of Technology, Mesra',
    period: '2023 — 2025',
    score: 'CGPA 8.23'
  },
  {
    degree: 'Bachelor of Computer Applications',
    short: 'BCA',
    school: 'Techno India University, Kolkata',
    period: '2019 — 2022',
    score: 'CGPA 8.39'
  }
];

// year / url: fill in to show the year and a "Verify" credential link.
export const certifications = [
  { title: 'Oracle APEX Cloud Developer Professional', issuer: 'Oracle', logo: '/logos/oracle.svg', year: null, url: null },
  { title: 'Oracle Cloud Infrastructure 2025 Foundations Associate', issuer: 'Oracle', logo: '/logos/oracle.svg', year: null, url: null },
  { title: 'Google IT Automation with Python', issuer: 'Google · Coursera', logo: '/logos/google.svg', year: null, url: null },
  { title: 'Data Analytics Job Simulation', issuer: 'Deloitte', logo: '/logos/deloitte.jpeg', year: null, url: null },
  { title: 'Forward Program', issuer: 'McKinsey.org', logo: '/logos/mckinsey.webp', year: null, url: null }
];

export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    blurb: 'Interfaces that are fast, accessible and consistent.',
    skills: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS']
  },
  {
    id: 'backend',
    title: 'Backend Development',
    blurb: 'Services and business logic that hold up in production.',
    skills: ['Node.js', 'Express', 'NestJS', 'Django', 'FastAPI']
  },
  {
    id: 'devops',
    title: 'DevOps & Deployment',
    blurb: 'Shipping, serving and supporting what gets built.',
    skills: ['Docker', 'nginx', 'VPS', 'Git', 'GitHub']
  },
  {
    id: 'data',
    title: 'Database & API',
    blurb: 'Schemas, queries and the APIs on top of them.',
    skills: ['Oracle', 'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Prisma', 'REST APIs', 'ORDS']
  },
  {
    id: 'languages',
    title: 'Programming Languages',
    blurb: 'The languages I reach for most.',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C', 'SQL', 'PL/SQL']
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    blurb: 'AI-assisted development, automation and applied ML.',
    skills: ['Claude', 'ChatGPT', 'GitHub Copilot', 'Google Antigravity', 'n8n', 'Scikit-learn', 'Keras', 'Pandas']
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    blurb: 'Platforms and integrations used in delivered projects.',
    skills: ['Oracle APEX', 'WordPress', 'Razorpay', 'Tally ERP', 'jQuery']
  }
];

export const foundations = ['Data Structures & Algorithms', 'Object-Oriented Programming', 'System Design', 'SDLC', 'Optimization'];
