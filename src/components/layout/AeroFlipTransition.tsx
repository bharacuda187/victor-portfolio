'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface AeroFlipTransitionProps {
  flipped: boolean;
  front: ReactNode;
  back: ReactNode;
}

export default function AeroFlipTransition({ flipped, front, back }: AeroFlipTransitionProps) {
  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{
        perspective: '1800px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* HERO */}
      <motion.div
        className={`absolute inset-0 h-full w-full ${
          flipped ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
        animate={{
          scale: flipped ? 1.2 : 1,
          z: flipped ? -500 : 0,
          rotateY: flipped ? -8 : 0,
          opacity: flipped ? 0 : 1,
        }}
        transition={{
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
      >
        {front}
      </motion.div>

      {/* PROFILE */}
      <motion.div
        className={`absolute inset-0 h-full w-full ${
          flipped ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={false}
        animate={{
          scale: flipped ? 1 : 1.18,
          z: flipped ? 0 : 500,
          rotateY: flipped ? 0 : 8,
          opacity: flipped ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
      >
        {back}
      </motion.div>

      {/* SUBTLE DEPTH FADE */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-50 bg-black"
        initial={false}
        animate={{
          opacity: flipped ? 0 : 0.04,
        }}
        transition={{
          duration: 0.35,
        }}
      />
    </div>
  );
}
