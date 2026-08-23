'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface InterfaceTransitionProps {
  active: boolean;
  onEnter: () => void;
}

export default function InterfaceTransition({ active, onEnter }: InterfaceTransitionProps) {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    if (!active) {
      setShowLogo(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, [active]);

  const enterInterface = () => {
    onEnter();

    setTimeout(() => {
      const hero = document.getElementById('hero');

      if (hero) {
        hero.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }
    }, 800);
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Digital grid */}
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:50px_50px] opacity-30" />

          {/* Scanline */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]"
            animate={{
              y: ['-100%', '100%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <AnimatePresence mode="wait">
            {!showLogo ? (
              <motion.div
                key="welcome"
                className="relative z-10 text-center font-mono"
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
                exit={{
                  opacity: 0,
                  y: -140,
                  filter: 'blur(8px)',
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
              >
                <p className="text-sm tracking-[0.35em] text-blue-400">ACCESS GRANTED</p>

                <h1 className="mt-5 text-4xl font-bold tracking-[0.15em] text-white md:text-6xl">
                  WELCOME, VISITOR
                </h1>

                <motion.p
                  className="mt-6 text-sm tracking-[0.25em] text-orange-500"
                  animate={{
                    opacity: [0.35, 1, 0.35],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  LOADING INTERFACE...
                </motion.p>
              </motion.div>
            ) : (
              <motion.button
                key="logo"
                type="button"
                onClick={enterInterface}
                className="group relative z-10 flex flex-col items-center font-mono outline-none"
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  filter: 'blur(12px)',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 1.2,
                  ease: 'easeOut',
                }}
                whileHover={{
                  scale: 1.06,
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                {/* Logo core */}
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-orange-500/60">
                  <div className="absolute inset-3 rounded-full border border-blue-400/40" />

                  <div className="absolute inset-0 rounded-full border border-orange-500/20 transition-all duration-500 group-hover:scale-125 group-hover:border-orange-500/50" />

                  <span className="text-4xl font-bold tracking-tight text-white">V</span>
                </div>

                <span className="mt-6 text-lg tracking-[0.35em] text-white">VICTOR OS</span>

                <span className="mt-3 text-xs tracking-[0.3em] text-orange-500 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                  ENTER SYSTEM
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
