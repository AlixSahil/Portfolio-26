import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const DEFAULT_GLOW_COLOR = '243, 207, 97';
const MOBILE_BREAKPOINT = 768;

const defaultItems = [
  { label: 'Enterprise', title: 'Modern Apps', description: 'Upgrade, optimize, and ship scalable internal systems.' },
  { label: 'Backend', title: 'REST APIs', description: 'Clean service layers for workflow-heavy business products.' },
  { label: 'Automation', title: 'AI Workflows', description: 'Assistive platforms that remove repetitive operational work.' },
  { label: 'Data', title: 'Dashboards', description: 'Reporting surfaces that turn process data into decisions.' },
  { label: 'Database', title: 'Oracle + SQL', description: 'Reliable data models, PL/SQL logic, and query optimization.' },
  { label: 'Product', title: 'Useful UX', description: 'Interfaces designed for teams who use them every day.' }
];

function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

function createParticleElement(x, y, color) {
  const element = document.createElement('div');
  element.className = 'particle';
  element.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 10px rgba(${color}, 0.75);
    pointer-events: none;
    z-index: 4;
    left: ${x}px;
    top: ${y}px;
  `;
  return element;
}

function ParticleCard({
  children,
  className,
  glowColor,
  particleCount,
  enableTilt,
  clickEffect,
  enableMagnetism,
  disableAnimations,
  style
}) {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
        onComplete: () => particle.remove()
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    Array.from({ length: particleCount }).forEach((_, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const particle = createParticleElement(Math.random() * width, Math.random() * height, glowColor);
        cardRef.current.appendChild(particle);
        particlesRef.current.push(particle);
        gsap.fromTo(particle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25 });
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 120,
          y: (Math.random() - 0.5) * 120,
          opacity: 0.25,
          duration: 1.8 + Math.random() * 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }, index * 90);
      timeoutsRef.current.push(timeoutId);
    });
  }, [glowColor, particleCount]);

  useEffect(() => {
    const element = cardRef.current;
    if (!element || disableAnimations) return undefined;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      gsap.to(element, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.28, ease: 'power2.out' });
    };

    const handleMouseMove = event => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      element.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
      element.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
      element.style.setProperty('--glow-intensity', '1');

      if (enableTilt) {
        gsap.to(element, {
          rotateX: ((y - centerY) / centerY) * -7,
          rotateY: ((x - centerX) / centerX) * 7,
          transformPerspective: 1000,
          duration: 0.12,
          ease: 'power2.out'
        });
      }
      if (enableMagnetism) {
        gsap.to(element, { x: (x - centerX) * 0.035, y: (y - centerY) * 0.035, duration: 0.18, ease: 'power2.out' });
      }
    };

    const handleClick = event => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const ripple = document.createElement('div');
      ripple.className = 'bento-ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      element.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 0.9 },
        { scale: 22, opacity: 0, duration: 0.75, ease: 'power2.out', onComplete: () => ripple.remove() }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, clickEffect, disableAnimations, enableMagnetism, enableTilt]);

  return (
    <article ref={cardRef} className={className} style={style}>
      {children}
    </article>
  );
}

export default function MagicBento({
  items = defaultItems,
  enableStars = true,
  enableBorderGlow = true,
  disableAnimations = false,
  particleCount = 10,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) {
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || shouldDisableAnimations) return undefined;

    const handleMouseMove = event => {
      grid.querySelectorAll('.magic-bento-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
        card.style.setProperty('--glow-intensity', inside ? '1' : '0');
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [shouldDisableAnimations]);

  return (
    <div className="card-grid bento-section" ref={gridRef}>
      {items.map((item, index) => {
        const className = `magic-bento-card ${enableBorderGlow ? 'magic-bento-card--border-glow' : ''}`;
        const content = (
          <>
            <div className="magic-bento-card__header">
              <div className="magic-bento-card__label">{item.label}</div>
              {item.icon ? <span className="magic-bento-card__icon">{item.icon}</span> : null}
            </div>
            <div className="magic-bento-card__content">
              <h3 className="magic-bento-card__title">{item.title}</h3>
              <p className="magic-bento-card__description">{item.description}</p>
            </div>
          </>
        );

        if (!enableStars) {
          return (
            <article className={className} style={{ '--glow-color': glowColor }} key={item.title || index}>
              {content}
            </article>
          );
        }

        return (
          <ParticleCard
            key={item.title || index}
            className={className}
            style={{ '--glow-color': glowColor }}
            glowColor={glowColor}
            particleCount={particleCount}
            enableTilt={enableTilt}
            clickEffect={clickEffect}
            enableMagnetism={enableMagnetism}
            disableAnimations={shouldDisableAnimations}
          >
            {content}
          </ParticleCard>
        );
      })}
    </div>
  );
}
