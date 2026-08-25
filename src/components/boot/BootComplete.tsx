'use client';

import { motion } from 'motion/react';

export default function BootComplete() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 15,
        filter: 'blur(6px)',
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      transition={{
        duration: 0.35,
        ease: 'easeOut',
      }}
      className="mt-16 font-mono"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="tracking-widest text-blue-400"
      >
        SYSTEM AUTHENTICATION
      </motion.p>

      <div className="mt-5 space-y-2 text-gray-400">
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08, duration: 0.2 }}
        >
          SECURITY CHECK........
          <span className="text-orange-500">PASS</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.14, duration: 0.2 }}
        >
          USER PROFILE.........
          <span className="text-orange-500">VERIFIED</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          INTERFACE MODULE.....
          <span className="text-orange-500">LOADED</span>
        </motion.p>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: 0.25,
          duration: 0.25,
          ease: 'easeOut',
        }}
        className="mt-6 h-px w-full origin-left bg-orange-500/70"
      />

      <motion.h2
        initial={{
          opacity: 0,
          scale: 0.96,
          filter: 'blur(4px)',
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
        }}
        transition={{
          delay: 0.32,
          duration: 0.25,
          ease: 'easeOut',
        }}
        className="mt-7 text-4xl font-bold tracking-tight text-white md:text-6xl"
      >
        SYSTEM ONLINE
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.42,
          duration: 0.2,
        }}
        className="mt-3 text-orange-500"
      >
        WELCOME TO VICTOR OS
      </motion.p>

      <motion.p
        animate={{
          opacity: [0.25, 1, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.7,
          ease: 'easeInOut',
        }}
        className="mt-5 text-blue-400"
      >
        INITIALIZING INTERFACE...
      </motion.p>
    </motion.section>
  );
}