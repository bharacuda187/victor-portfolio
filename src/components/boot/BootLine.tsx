'use client';
import { useEffect } from 'react';
import { motion } from 'motion/react';

interface BootLineProps {
  text: string;
  status: string;
  color?: string;
  delay?: number;
  onFinished?: () => void;
}

export default function BootLine({
  text,
  status,
  color = 'text-white',
  delay = 0,
  onFinished,
}: BootLineProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinished?.();
    }, delay + 200);

    return () => clearTimeout(timer);
  }, [delay, onFinished]);
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay,
        duration: 0.3,
      }}
      className="flex font-mono text-sm"
    >
      <span className="mr-3 text-blue-400">&gt;</span>

      <span className={color}>{text}</span>

      <motion.span
        className="mx-3 text-gray-600"
        initial={{
          width: 0,
        }}
        animate={{
          width: 'auto',
        }}
        transition={{
          delay: delay + 0.1,
          duration: 0.2,
        }}
      >
        ................
      </motion.span>

      <motion.span
        className="text-orange-500"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: delay + 1.3,
        }}
      >
        {status}
      </motion.span>
    </motion.div>
  );
}
