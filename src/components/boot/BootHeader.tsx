'use client';

import { motion } from 'motion/react';

export default function BootHeader() {
  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -20,
        filter: 'blur(10px)',
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      transition={{
        duration: 0.8,
      }}
      className="font-mono"
    >
      <p className="text-xl tracking-widest text-orange-500">VICTOR OS v1.0</p>

      <p className="mt-3 tracking-wide text-gray-400">BOOT SEQUENCE INITIATED</p>
    </motion.header>
  );
}
