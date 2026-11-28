import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { navItems } from './data/portfolio.js';
import useSmoothScroll from './hooks/useSmoothScroll.js';
import useActiveSection from './hooks/useActiveSection.js';
import useTheme from './hooks/useTheme.js';
import Header from './components/sections/Header.jsx';
import Hero from './components/sections/Hero.jsx';
import Marquee from './components/sections/Marquee.jsx';
import About from './components/sections/About.jsx';
import Work from './components/sections/Work.jsx';
import Experience from './components/sections/Experience.jsx';
import Skills from './components/sections/Skills.jsx';
import Credentials from './components/sections/Credentials.jsx';
import Contact from './components/sections/Contact.jsx';
import Footer from './components/sections/Footer.jsx';
import BackToTop from './components/ui/BackToTop.jsx';

const sectionIds = navItems.map(item => item.id);

export default function App() {
  useSmoothScroll();
  const activeSection = useActiveSection(sectionIds);
  const [theme, toggleTheme] = useTheme();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Header activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
