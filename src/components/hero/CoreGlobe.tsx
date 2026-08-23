'use client';

import { motion } from 'motion/react';

interface CoreGlobeProps {
  active: boolean;
}

export default function CoreGlobe({ active }: CoreGlobeProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.3,
      }}
      animate={
        active
          ? {
              opacity: 1,
              scale: 1,
              x: -500,
              y: 400,
            }
          : {
              opacity: 0,
              scale: 0.2,
              x: 0,
              y: 0,
            }
      }
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}

      className="pointer-events-none fixed top-8 left-1/2 z-40 -translate-x-1/2"
    >
      <motion.div
        animate={{
          rotateY: 360,
        }}

        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}

        style={{
          transformStyle: 'preserve-3d',
        }}

        className="relative h-56 w-56 overflow-hidden rounded-full bg-orange-500/10 shadow-[0_0_100px_rgba(249,115,22,0.8)]"
      >
        {/* Globe Surface */}
        <div className="absolute inset-0 rounded-full border border-orange-400/40" />
        {/* Latitude */}

        <div className="absolute top-1/2 left-0 h-20 w-full -translate-y-1/2 rounded-[50%] border border-orange-400/40" />

        <div className="absolute top-1/3 left-0 h-32 w-full rounded-[50%] border border-orange-400/30" />

        <div className="absolute bottom-1/3 left-0 h-32 w-full rounded-[50%] border border-orange-400/30" />

        {/* Longitude */}

        <motion.div
          animate={{
            rotateY: 360,
          }}

          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}

          className="absolute inset-0 rounded-full border border-orange-400/40"
        />

        {/* Core */}

        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8],
          }}

          transition={{
            duration: 2,
            repeat: Infinity,
          }}

          className="h-5 w-5 rounded-full bg-orange-400 shadow-[0_0_40px_rgba(249,115,22,1)]"
        />
      </motion.div>
    </motion.div>
  );
}
