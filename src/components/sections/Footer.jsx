import React from 'react';
import { LuArrowUp } from 'react-icons/lu';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { navItems, profile } from '../../data/portfolio.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <nav aria-label="Footer">
            <ul className="footer-nav">
              {navItems.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer-social">
            <a className="icon-btn" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <FaGithub aria-hidden="true" />
            </a>
            <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <a className="icon-btn" href="#top" aria-label="Back to top">
              <LuArrowUp aria-hidden="true" />
            </a>
          </div>
        </div>
        <p className="footer-wordmark" aria-hidden="true">
          {profile.name}
        </p>
        <div className="footer-bottom">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>Designed & built by {profile.firstName} · React + Vite</p>
        </div>
      </div>
    </footer>
  );
}
