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
      }}
      className="fixed top-8 left-1/2 z-50 -translate-x-1/2"
    >
      <motion.div
        animate={{
          width: expanded ? 760 : 230,
        }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 22,
        }}
        onClick={toggleNavbar}
        className="flex h-14 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/10 px-5 shadow-xl backdrop-blur-xl"
      >
        <AnimatePresence mode="popLayout">
          {/* COLLAPSED */}
          {!expanded && (
            <motion.div
              key="collapsed"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
              }}
              transition={{
                duration: 0.3,
              }}
              className="flex items-center gap-2 font-mono whitespace-nowrap"
            >
              <motion.span
                className="h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.9)]"
                animate={{
                  opacity: [1, 0.45, 1],
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <span className="text-sm">VICTOR OS</span>

              <span className="text-gray-600">//</span>

              <span className="text-blue-400">MENU</span>

              <motion.span
                animate={{
                  x: [0, 3, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="ml-1 text-[10px] text-gray-500"
              >
                →
              </motion.span>
            </motion.div>
          )}

          {/* EXPANDED */}
          {expanded && (
            <motion.div
              key="expanded"
              initial={{
                opacity: 0,
                scaleX: 0.7,
              }}
              animate={{
                opacity: 1,
                scaleX: 1,
              }}
              exit={{
                opacity: 0,
                scaleX: 0.7,
              }}
              transition={{
                duration: 0.35,
              }}
              onClick={(event) => event.stopPropagation()}
              className="flex items-center gap-4 font-mono text-sm"
            >
              <NavItem label="HOME" onClick={onHomeClick} />

              <NavItem label="PROFILE" onClick={onProfileClick} />

              <NavItem label="STACK" onClick={onStackClick} />

              <NavItem label="PROJECTS" onClick={onProjectsClick} />

              <NavItem label="CONTACT" onClick={onContactClick} />
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
      onClick={onClick}
      whileHover={{
        scale: 1.08,
      }}
      className="rounded-full px-3 py-1 text-xs text-gray-300 transition hover:bg-white/10"
    >
      {label}
    </motion.button>
  );
}
