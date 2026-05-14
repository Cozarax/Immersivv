import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const texts = ['React', 'TypeScript', 'Node.js', 'Next.js', 'JavaScript'];

// Même palette que TechTags
const colors: Record<string, string> = {
  React: '#61DAFB',
  TypeScript: '#3178C6',
  'Node.js': '#339933',
  'Next.js': '#AAAAAA',
  JavaScript: '#F7DF1E',
};

const INTERVAL = 4000;
const spring = { type: 'spring', damping: 30, stiffness: 400 } as const;
const colorTransition = { duration: 0.4 } as const;

export default function HeroRotatingText() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const ghostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % texts.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    if (ghostRef.current) {
      setWidth(ghostRef.current.offsetWidth);
    }
  }, [index]);

  const currentText = texts[index];
  const currentColor = colors[currentText] ?? 'var(--accent)';
  const chars = Array.from(currentText);

  return (
    <span className="relative inline-block">
      {/* Ghost : même padding, invisible, hors flux — sert à mesurer la largeur cible */}
      <span
        ref={ghostRef}
        aria-hidden="true"
        className="invisible absolute whitespace-nowrap px-4 py-3 font-display font-semibold pointer-events-none"
      >
        {currentText}
      </span>

      {/* Contour et texte animés vers la couleur de la tech courante */}
      <motion.span
        className="inline-flex items-center overflow-hidden rounded-md px-4 py-3 font-display font-semibold"
        animate={
          width !== undefined
            ? {
                width,
                // ring-1 simulé via boxShadow pour ne pas affecter le box model
                boxShadow: `0 0 0 3px ${currentColor}`,
                color: currentColor,
              }
            : {
                boxShadow: `0 0 0 3px ${currentColor}`,
                color: currentColor,
              }
        }
        transition={{
          width: spring,
          boxShadow: colorTransition,
          color: colorTransition,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            className="flex whitespace-nowrap"
            aria-label={currentText}
          >
            {chars.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                transition={{
                  ...spring,
                  delay: (chars.length - 1 - i) * 0.025,
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}
