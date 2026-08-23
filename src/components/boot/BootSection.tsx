'use client';

import { motion } from 'motion/react';

interface Props {
  children: React.ReactNode;
}

export default function BootSection({ children }: Props) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        filter: 'blur(10px)',
      }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)',
      }}
      exit={{
        opacity: 0,
        filter: 'blur(10px)',
      }}
      transition={{
        duration: 0.8,
      }}
    >
      {children}
    </motion.section>
  );
}
