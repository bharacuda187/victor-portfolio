'use client';

import { motion } from 'motion/react';

export default function DesktopBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 2, 0],
        }}

        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}

        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.15),transparent_60%)]"
      />

      {/* Digital Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  );
}
