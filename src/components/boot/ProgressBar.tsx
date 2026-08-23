'use client';

import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="mt-8">
      <p className="mb-3 font-mono text-gray-400">SYSTEM INITIALIZATION</p>

      <div className="h-3 w-full border border-zinc-700 bg-zinc-900">
        <motion.div
          className="h-full bg-orange-500"
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.1,
          }}
        />
      </div>

      <p className="mt-3 font-mono text-orange-500">{progress}% COMPLETE</p>
    </div>
  );
}
