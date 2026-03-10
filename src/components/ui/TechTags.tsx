import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const colors: Record<string, string> = {
  React: '#61DAFB',
  TypeScript: '#3178C6',
  'Node.js': '#339933',
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
      className="inline-flex items-center font-mono text-xs px-3 py-1 cursor-default overflow-hidden"
      animate={{ borderColor: active ? color : 'var(--border)' }}
      style={{ borderWidth: 1, borderStyle: 'solid', borderRadius: 0 }}
      transition={{ layout: { duration: 0.25, ease: [0.32, 0.72, 0, 1] }, borderColor: { duration: 0.25 } }}
    >
      <AnimatePresence mode="popLayout">
        {active && (
          <motion.span
            key="icon"
            initial={{ opacity: 0, width: 0, marginRight: 0 }}
            animate={{ opacity: 1, width: 14, marginRight: 6 }}
            exit={{ opacity: 0, width: 0, marginRight: 0 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="shrink-0 flex items-center"
            style={{ overflow: 'hidden', color }}
          >
            {icons[label]}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.span
        animate={{ color: active ? color : 'var(--ink-3)' }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
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
