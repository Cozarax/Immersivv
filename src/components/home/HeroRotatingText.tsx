import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const texts = ['React', 'TypeScript', 'Node.js', 'Next.js', 'JavaScript'];

const colors: Record<string, string> = {
  React: '#61DAFB',
  TypeScript: '#3178C6',
  'Node.js': '#339933',
  'Next.js': '#AAAAAA',
  JavaScript: '#F7DF1E',
};

const INTERVAL = 4000;
const widthSpring = { type: 'spring', damping: 30, stiffness: 400 } as const;
const colorTransition = { duration: 0.4 } as const;
const charSpring = { type: 'spring', damping: 24, stiffness: 350 } as const;

interface HeroRotatingTextProps {
  showBorder?: boolean;
  className?: string;
}

export default function HeroRotatingText({ showBorder = true, className = 'px-4 py-3' }: HeroRotatingTextProps) {
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
      {/* Ghost invisible pour mesurer la largeur cible */}
      <span
        ref={ghostRef}
        aria-hidden="true"
        className="invisible absolute whitespace-nowrap px-4 py-3 font-display font-semibold pointer-events-none"
      >
        {currentText}
      </span>

      <motion.span
        className={`inline-flex items-center overflow-hidden rounded-md font-display font-semibold ${className}`}
        animate={
          width !== undefined
            ? {
                width,
                boxShadow: showBorder ? `0 0 0 3px ${currentColor}` : '0 0 0 0px transparent',
                color: currentColor,
              }
            : {
                boxShadow: showBorder ? `0 0 0 3px ${currentColor}` : '0 0 0 0px transparent',
                color: currentColor,
              }
        }
        transition={{
          width: widthSpring,
          boxShadow: colorTransition,
          color: colorTransition,
        }}
      >
        {/*
          popLayout : l'élément sortant passe en position absolute immédiatement,
          l'entrant démarre sans attendre la fin de l'exit — supprime le freeze
          causé par mode="wait" qui bloquait jusqu'à la fin du spring de sortie
        */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={index}
            className="flex whitespace-nowrap"
            aria-label={currentText}
          >
            {chars.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
                transition={{ ...charSpring, delay: i * 0.022 }}
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
