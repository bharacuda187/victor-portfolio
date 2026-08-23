'use client';

import { motion } from 'motion/react';

interface CoreHUDProps {
  active: boolean;
}

export default function CoreHUD({ active }: CoreHUDProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}

      animate={{
        opacity: active ? 1 : 0,
      }}

      transition={{
        duration: 1,
      }}

      className="fixed top-1/2 left-[15%] z-30 translate-y-40 font-mono text-xs text-gray-400"
    >
      <p className="text-orange-500">CORE SYSTEM</p>

      <p>
        STATUS:
        <span className="text-blue-400">ONLINE</span>
      </p>

      <p>
        ENERGY:
        <span className="text-orange-400">98%</span>
      </p>

      <p>BUILD: VT-2026.08</p>
    </motion.div>
  );
}
