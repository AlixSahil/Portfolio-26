import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LuCopy, LuCheck, LuArrowUpRight, LuPhone, LuMapPin, LuSend, LuDownload } from 'react-icons/lu';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { profile } from '../../data/portfolio.js';
import { Reveal, RevealItem } from '../ui/Reveal.jsx';
import MagneticLink from '../ui/MagneticLink.jsx';

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for non-secure contexts / older browsers.
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(area);
  if (!ok) throw new Error('copy failed');
}

function CopyEmail() {
  const [state, setState] = useState('idle'); // idle | copied | error
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await copyText(profile.email);
      setState('copied');
    } catch {
      setState('error');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('idle'), 2200);
  };

  return (
    <div className="email-block">
      <a className="email-big" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <button type="button" className={`copy-btn is-${state}`} onClick={onCopy} aria-label="Copy email address">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={state}
            className="copy-btn-inner"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {state === 'copied' ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}
            {state === 'copied' ? 'Copied' : state === 'error' ? 'Copy failed' : 'Copy'}
          </motion.span>
        </AnimatePresence>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === 'copied' ? 'Email address copied to clipboard' : state === 'error' ? 'Could not copy. Please copy the address manually.' : ''}
      </span>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const message = String(form.get('message') || '').trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'a visitor'}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus(`Opening your email app… If nothing happens, email ${profile.email} directly.`);
  };

  return (
    <form className="card contact-form" onSubmit={onSubmit}>
      <p className="form-kicker">Or send a quick note</p>
      <div className="field-row">
        <label className="field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Your name" required maxLength={120} />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={200} />
        </label>
      </div>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows="4" placeholder="Tell me about the role or project…" required maxLength={4000} />
      </label>
      <button className="btn btn-primary btn-block" type="submit">
        Send message
        <LuSend aria-hidden="true" />
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact-glow" aria-hidden="true" />
      <div className="container">
        <Reveal stagger className="contact-head">
          <RevealItem as="p" className="eyebrow">
            <span className="eyebrow-index">06</span>
            <span className="eyebrow-rule" aria-hidden="true" />
            Contact
          </RevealItem>
          <RevealItem as="h2" id="contact-title" className="contact-title">
            Have a role or a project in mind? <em>Let&apos;s build it.</em>
          </RevealItem>
          <RevealItem as="p" className="contact-intro">
            Open to full-time roles, freelance projects and good conversations. Reach out on any channel. I usually reply within a day.
          </RevealItem>
        </Reveal>

        <div className="contact-grid">
          <Reveal stagger className="contact-main">
            <RevealItem>
              <CopyEmail />
            </RevealItem>
            <RevealItem className="contact-ctas">
              <MagneticLink className="btn-primary btn-lg" href={`mailto:${profile.email}`}>
                Start a conversation
                <LuArrowUpRight aria-hidden="true" />
              </MagneticLink>
              <a className="btn btn-ghost btn-lg" href={profile.resume} download>
                <LuDownload aria-hidden="true" />
                Download résumé
              </a>
            </RevealItem>
            <RevealItem as="ul" className="contact-channels">
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn aria-hidden="true" />
                  <span>
                    LinkedIn<small>/in/{profile.linkedinHandle}</small>
                  </span>
                  <LuArrowUpRight className="channel-arrow" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub aria-hidden="true" />
                  <span>
                    GitHub<small>@{profile.githubHandle}</small>
                  </span>
                  <LuArrowUpRight className="channel-arrow" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={profile.phoneHref}>
                  <LuPhone aria-hidden="true" />
                  <span>
                    Phone<small>{profile.phone}</small>
                  </span>
                  <LuArrowUpRight className="channel-arrow" aria-hidden="true" />
                </a>
              </li>
              <li>
                <span className="channel-static">
                  <LuMapPin aria-hidden="true" />
                  <span>
                    Location<small>{profile.location}</small>
                  </span>
                </span>
              </li>
            </RevealItem>
          </Reveal>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
