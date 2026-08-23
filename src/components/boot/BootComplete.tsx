'use client';

import { motion } from 'motion/react';

export default function BootComplete() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
        filter: 'blur(10px)',
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      transition={{
        duration: 1,
      }}
      className="mt-16 font-mono"
    >
      <p className="tracking-widest text-blue-400">SYSTEM READY</p>

      <div className="mt-6 space-y-3 text-gray-400">
        <p>
          SECURITY CHECK........
          <span className="text-orange-500">PASS</span>
        </p>

        <p>
          USER PROFILE.........
          <span className="text-orange-500">VERIFIED</span>
        </p>

        <p>
          INTERFACE MODULE.....
          <span className="text-orange-500">LOADED</span>
        </p>
      </div>

      <motion.h2
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 1,
        }}
        className="mt-10 text-4xl font-bold text-white md:text-6xl"
      >
        ACCESS GRANTED
      </motion.h2>

      <p className="mt-4 text-orange-500">WELCOME, VISITOR</p>

      <motion.p
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
        }}
        className="mt-6 text-blue-400"
      >
        LOADING INTERFACE...
      </motion.p>
    </motion.section>
  );
}
