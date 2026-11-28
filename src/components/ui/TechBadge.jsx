import React from 'react';
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiHtml5, SiCss, SiTailwindcss,
  SiNodedotjs, SiExpress, SiNestjs, SiDjango, SiFastapi, SiPostgresql, SiMysql, SiMongodb,
  SiFirebase, SiPrisma, SiDocker, SiNginx, SiGit, SiGithub, SiPython, SiOpenjdk, SiC,
  SiClaude, SiGithubcopilot, SiN8N, SiScikitlearn, SiKeras, SiPandas, SiWordpress,
  SiRazorpay, SiJquery
} from 'react-icons/si';
import {
  LuDatabase, LuBraces, LuWorkflow, LuServer, LuTerminal, LuBot, LuSparkles, LuBlocks,
  LuFileText, LuBrainCircuit, LuCodeXml
} from 'react-icons/lu';

// [icon, brand colour on hover]. Vendors whose marks are trademark-restricted (Oracle,
// OpenAI) and abstract concepts use a neutral line icon instead. null colour = stays ink.
const ICONS = {
  React: [SiReact, '#61DAFB'],
  'Next.js': [SiNextdotjs, null],
  JavaScript: [SiJavascript, '#F0DB4F'],
  TypeScript: [SiTypescript, '#3178C6'],
  HTML5: [SiHtml5, '#E34F26'],
  CSS3: [SiCss, '#2f8fe0'],
  'Tailwind CSS': [SiTailwindcss, '#06B6D4'],
  'Node.js': [SiNodedotjs, '#5FA04E'],
  Express: [SiExpress, null],
  NestJS: [SiNestjs, '#E0234E'],
  Django: [SiDjango, '#44B78B'],
  FastAPI: [SiFastapi, '#009688'],
  Oracle: [LuDatabase, '#E0533D'],
  'Oracle Database': [LuDatabase, '#E0533D'],
  PostgreSQL: [SiPostgresql, '#5b82e8'],
  MySQL: [SiMysql, '#4479A1'],
  MongoDB: [SiMongodb, '#47A248'],
  Firebase: [SiFirebase, '#FFCA28'],
  Prisma: [SiPrisma, null],
  'REST APIs': [LuBraces, null],
  ORDS: [LuWorkflow, '#E0533D'],
  Docker: [SiDocker, '#2496ED'],
  nginx: [SiNginx, '#009639'],
  VPS: [LuServer, null],
  Git: [SiGit, '#F05032'],
  GitHub: [SiGithub, null],
  Python: [SiPython, '#4B8BBE'],
  Java: [SiOpenjdk, '#E76F00'],
  C: [SiC, '#A8B9CC'],
  SQL: [LuDatabase, null],
  'PL/SQL': [LuTerminal, '#E0533D'],
  Claude: [SiClaude, '#D97757'],
  ChatGPT: [LuBot, '#10A37F'],
  'GitHub Copilot': [SiGithubcopilot, null],
  'Google Antigravity': [LuSparkles, '#4285F4'],
  n8n: [SiN8N, '#EA4B71'],
  'Scikit-learn': [SiScikitlearn, '#F7931E'],
  Keras: [SiKeras, '#D00000'],
  Pandas: [SiPandas, '#E70488'],
  MiniSom: [LuBrainCircuit, null],
  'Oracle APEX': [LuBlocks, '#E0533D'],
  WordPress: [SiWordpress, '#3c9ad6'],
  Razorpay: [SiRazorpay, '#3395FF'],
  'Tally ERP': [LuFileText, null],
  jQuery: [SiJquery, '#3a9ae0']
};

export function TechIcon({ name, className = 'tech-icon' }) {
  const [Icon] = ICONS[name] || [LuCodeXml];
  return <Icon className={className} aria-hidden="true" focusable="false" />;
}

// Badge with a monochrome icon that picks up the brand colour on hover.
export default function TechBadge({ name, size = 'md' }) {
  const brand = (ICONS[name] || [])[1];
  return (
    <span className={`tech-badge tech-badge--${size}`} style={brand ? { '--brand': brand } : undefined}>
      <TechIcon name={name} />
      {name}
    </span>
  );
}
