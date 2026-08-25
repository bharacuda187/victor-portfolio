'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

interface DynamicNavbarProps {
  coreActive: boolean;
  setCoreActive: (value: boolean) => void;
  onProfileClick: () => void;
  onHomeClick: () => void;
  onStackClick: () => void;
  onProjectsClick: () => void;
  onContactClick: () => void;
}

export default function DynamicNavbar({
  coreActive,
  setCoreActive,
  onProfileClick,
  onHomeClick,
  onStackClick,
  onProjectsClick,
  onContactClick,
}: DynamicNavbarProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    const nextState = !expanded;

    setExpanded(nextState);
    setCoreActive(nextState);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed top-8 left-1/2 z-50 -translate-x-1/2"
    >
      <motion.div
        initial={false}
        animate={{
          width: expanded ? 720 : 300,
          height: expanded ? 70 : 60,
        }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 24,
        }}
        onClick={toggleNavbar}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-[0_15px_50px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
      >
        {/* =====================================================
            ORANGE GLOWING EDGE
        ===================================================== */}

        <motion.div
          animate={{
            opacity: expanded ? 0.9 : [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: expanded ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 left-1/2 h-[2px] w-1/2 -translate-x-1/2 bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.9)]"
        />

        <motion.div
          animate={{
            opacity: expanded ? 0.5 : 0.2,
          }}
          transition={{
            duration: 0.3,
          }}
          className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.7)]"
        />

        <AnimatePresence mode="wait">
          {/* ===================================================
              COLLAPSED
          =================================================== */}

          {!expanded && (
            <motion.div
              key="collapsed"
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                duration: 0.25,
              }}
              className="flex h-full w-full cursor-pointer items-center justify-center gap-3 px-6 font-mono whitespace-nowrap"
            >
              {/* STATUS LIGHT */}

              <motion.span
                animate={{
                  opacity: [0.45, 1, 0.45],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.9)]"
              />

              <span className="text-sm tracking-[0.2em] text-white">VICTOR OS</span>

              <span className="text-gray-700">//</span>

              <span className="text-xs tracking-[0.25em] text-orange-400">MAIN MENU</span>

              <motion.span
                animate={{
                  x: [0, 4, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="ml-1 text-sm text-gray-500"
              >
                →
              </motion.span>
            </motion.div>
          )}

          {/* ===================================================
              EXPANDED
          =================================================== */}

          {expanded && (
            <motion.div
              key="expanded"
              initial={{
                opacity: 0,
                scaleX: 0.85,
              }}
              animate={{
                opacity: 1,
                scaleX: 1,
              }}
              exit={{
                opacity: 0,
                scaleX: 0.85,
              }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex h-full w-full items-center px-4 font-mono"
            >
              {/* SYSTEM INDICATOR */}

              <div className="mr-3 flex items-center gap-2 border-r border-white/10 pr-4">
                <motion.span
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    boxShadow: [
                      '0 0 7px rgba(249,115,22,0.4)',
                      '0 0 15px rgba(249,115,22,0.9)',
                      '0 0 7px rgba(249,115,22,0.4)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="h-2 w-2 rounded-full bg-orange-500"
                />

                <span className="text-[8px] tracking-[0.2em] text-gray-600">MAIN</span>
              </div>

              {/* NAVIGATION */}

              <div className="flex flex-1 items-center justify-center gap-2">
                <NavItem label="HOME" onClick={onHomeClick} />
                <NavItem label="PROFILE" onClick={onProfileClick} />
                <NavItem label="STACK" onClick={onStackClick} />
                <NavItem label="PROJECTS" onClick={onProjectsClick} />
                <NavItem label="CONTACT" onClick={onContactClick} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function NavItem({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      whileHover={{
        y: -1,
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="relative rounded-lg px-4 py-2 text-[10px] tracking-[0.18em] text-gray-400 transition-colors duration-300 hover:bg-orange-500/5 hover:text-orange-400"
    >
      {label}

      <motion.span
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        whileHover={{
          scaleX: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className="absolute right-2 bottom-1 left-2 h-px origin-center bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
      />
    </motion.button>
  );
}
