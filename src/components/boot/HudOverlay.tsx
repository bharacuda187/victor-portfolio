'use client';

import { motion } from 'motion/react';

export default function HudOverlay() {
  return (
    <>
      {/* TOP LEFT HUD */}

      <motion.div
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 1,
          duration: 0.6,
        }}
        className="fixed top-6 left-6 font-mono text-xs text-gray-400"
      >
        <p className="text-orange-500">VICTOR OS</p>

        <p>DEVELOPER TERMINAL</p>

        <p>BUILD VT-2026.08</p>
      </motion.div>

      {/* TOP RIGHT HUD */}

      <motion.div
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 1.5,
          duration: 0.6,
        }}
        className="fixed top-6 right-6 text-right font-mono text-xs text-gray-400"
      >
        <p>
          STATUS:
          <span className="text-blue-400"> ONLINE</span>
        </p>

        <p>
          MODE:
          <span className="text-orange-500"> CREATIVE</span>
        </p>

        <p>
          ACCESS:
          <span className="text-blue-400"> AUTHORIZED</span>
        </p>
      </motion.div>

      {/* BOTTOM HUD */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 2,
          duration: 0.6,
        }}
        className="fixed bottom-6 left-6 font-mono text-xs text-gray-500"
      >
        NEXT.JS
        {' • '}
        REACT
        {' • '}
        TAILWIND
        {' • '}
        MOTION
        {' • '}
        UNITY
      </motion.div>
    </>
  );
}
