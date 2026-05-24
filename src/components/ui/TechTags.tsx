import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const colors: Record<string, string> = {
  'React': '#61DAFB',
  'TypeScript': '#3178C6',
  'Node.js': '#339933',
  'Next.js': '#AAAAAA',
  'JavaScript': '#F7DF1E',
  'PostgreSQL': '#336791',
  'Tailwind CSS': '#06B6D4',
  'Prisma': '#5A67D8',
  'GraphQL': '#E10098',
  'Git': '#F05032',
  'Astro': '#FF5D01',
  'Vite': '#646CFF',
  'Figma': '#F24E1E',
  'Three.js': '#049EF4',
  'GSAP': '#88CE02',
};

const icons: Record<string, JSX.Element> = {
  React: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  ),
  TypeScript: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" opacity="0.15"/>
      <path d="M5 12h5M7.5 9.5v5M13 14.5c.5.5 1.2.5 1.5.5.8 0 1.5-.4 1.5-1.2 0-.8-.7-1-1.5-1.3-.8-.3-1.5-.6-1.5-1.3 0-.7.7-1.2 1.5-1.2.5 0 1 .2 1.5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  'Node.js': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M12 2v20M3 7l9 5 9-5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  'Next.js': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M9 8.5L16.5 16M9 8.5v7M9 8.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  JavaScript: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 16c0 1.1.9 2 2 2s2-.9 2-2V10M16 10v4c0 1.1-.9 2-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  PostgreSQL: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  'Tailwind CSS': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 6C9 6 7 7.5 6 10.5c1.5-2 3.25-2.75 5.25-2.25.57.14 1 .57 1.46 1.04C13.74 10.4 15.25 12 18 12c3 0 5-1.5 6-4.5-1.5 2-3.25 2.75-5.25 2.25-.57-.14-1-.57-1.46-1.04C16.26 7.6 14.75 6 12 6zM6 13.5C3 13.5 1 15 0 18c1.5-2 3.25-2.75 5.25-2.25.57.14 1 .57 1.46 1.04C7.74 17.9 9.25 19.5 12 19.5c3 0 5-1.5 6-4.5-1.5 2-3.25 2.75-5.25 2.25-.57-.14-1-.57-1.46-1.04C10.26 15.1 8.75 13.5 6 13.5z" fill="currentColor"/>
    </svg>
  ),
  Prisma: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M3 19.5L12 2l9 17.5H3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M3 19.5L12 13l9 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  GraphQL: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 21.5,7.5 21.5,16.5 12,22 2.5,16.5 2.5,7.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="12" cy="2" r="1.5" fill="currentColor"/>
      <circle cx="21.5" cy="7.5" r="1.5" fill="currentColor"/>
      <circle cx="21.5" cy="16.5" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="22" r="1.5" fill="currentColor"/>
      <circle cx="2.5" cy="16.5" r="1.5" fill="currentColor"/>
      <circle cx="2.5" cy="7.5" r="1.5" fill="currentColor"/>
    </svg>
  ),
  Git: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="18" cy="10" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6 8v8M6 8c0-2 2-4 4-4h2c2 0 4 1.5 4 4v0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Astro: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M9 17.5c-1.5.5-4 .5-5-1.5 1 .5 2.5.5 3.5-.5l4-8 4 8c1 1 2.5 1 3.5.5-1 2-3.5 2-5 1.5L12 20l-3-2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  Vite: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h7l-2 8 11-12h-7l2-8z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  Figma: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="9" height="7" rx="2" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="5" y="9" width="9" height="7" rx="2" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="5" y="16" width="4.5" height="6" rx="2.25" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="16" cy="12.5" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  'Three.js': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 19h20L12 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M7 13.5L12 8l5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  GSAP: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M15 12h-5v-2.5M10 12v2.5c0 1.1.9 2 2 2h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

interface TechTagProps {
  label: string;
  active: boolean;
  onUserEnter: () => void;
  onUserLeave: () => void;
}

function TechTag({ label, active, onUserEnter, onUserLeave }: TechTagProps) {
  const color = colors[label] ?? 'var(--accent)';

  return (
    <motion.span
      layout
      onHoverStart={onUserEnter}
      onHoverEnd={onUserLeave}
      className="inline-flex items-center font-mono text-xs px-3 py-1 cursor-default"
      style={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: color,
        borderRadius: 0,
        color,
      }}
      transition={{ layout: { duration: 0.25, ease: [0.32, 0.72, 0, 1] } }}
    >
      <AnimatePresence mode="popLayout">
        {active && icons[label] && (
          <motion.span
            key="icon"
            initial={{ opacity: 0, width: 0, marginRight: 0 }}
            animate={{ opacity: 1, width: 14, marginRight: 6 }}
            exit={{ opacity: 0, width: 0, marginRight: 0 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="shrink-0 flex items-center"
            style={{ overflow: 'hidden' }}
          >
            {icons[label]}
          </motion.span>
        )}
      </AnimatePresence>
      <span>{label}</span>
    </motion.span>
  );
}

export default function TechTags({ tags }: { tags: string[] }) {
  const [autoIndex, setAutoIndex] = useState<number | null>(null);
  const [userIndex, setUserIndex] = useState<number | null>(null);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUserHovering = useRef(false);
  const lastAutoIndex = useRef<number | null>(null);
  const scheduleNextRef = useRef<() => void>(() => {});

  const scheduleNext = useCallback(() => {
    const delay = 1800 + Math.random() * 1200;
    autoRef.current = setTimeout(() => {
      if (isUserHovering.current) return;
      let idx: number;
      do { idx = Math.floor(Math.random() * tags.length); } while (idx === lastAutoIndex.current && tags.length > 1);
      lastAutoIndex.current = idx;
      setAutoIndex(idx);
      autoRef.current = setTimeout(() => {
        setAutoIndex(null);
        scheduleNextRef.current();
      }, 1000);
    }, delay);
  }, [tags.length]);

  useEffect(() => {
    scheduleNextRef.current = scheduleNext;
  });

  useEffect(() => {
    scheduleNext();
    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
  }, [scheduleNext]);

  const handleUserEnter = (idx: number) => {
    isUserHovering.current = true;
    if (autoRef.current) clearTimeout(autoRef.current);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    setAutoIndex(null);
    setUserIndex(idx);
  };

  const handleUserLeave = () => {
    isUserHovering.current = false;
    setUserIndex(null);
    resumeRef.current = setTimeout(scheduleNext, 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {tags.map((tag, i) => (
        <TechTag
          key={tag}
          label={tag}
          active={userIndex === i || (userIndex === null && autoIndex === i)}
          onUserEnter={() => handleUserEnter(i)}
          onUserLeave={handleUserLeave}
        />
      ))}
    </div>
  );
}
