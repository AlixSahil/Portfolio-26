import React from 'react';
import { Reveal, RevealItem } from './Reveal.jsx';

export default function SectionHeader({ index, eyebrow, title, intro, id }) {
  return (
    <Reveal as="header" stagger className="section-header">
      <RevealItem as="p" className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        <span className="eyebrow-rule" aria-hidden="true" />
        {eyebrow}
      </RevealItem>
      <RevealItem as="h2" id={id} className="section-title">
        {title}
      </RevealItem>
      {intro && (
        <RevealItem as="p" className="section-intro">
          {intro}
        </RevealItem>
      )}
    </Reveal>
  );
}
