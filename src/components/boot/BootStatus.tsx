'use client';

import { motion } from 'motion/react';
import ProgressBar from './ProgressBar';

interface BootStatusProps {
  progress: number;
  bootComplete: boolean;
}

export default function BootStatus({ progress, bootComplete }: BootStatusProps) {
  return (
    <div className="mt-12 font-mono">
      {!bootComplete && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        >
          <ProgressBar progress={progress} />
        </motion.div>
      )}
    </div>
  );
}
