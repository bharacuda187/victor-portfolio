'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TypewriterProps {
  text: string;
  delay?: number;
}

export default function Typewriter({ text, delay = 0 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    let interval: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;

        if (i >= text.length) {
          clearInterval(interval);
        }
      }, 70);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="ml-1 inline-block"
      >
        _
      </motion.span>
    </span>
  );
}
