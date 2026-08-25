'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

import OSModal from './OSModal';

interface DesktopIconsProps {
  onModalChange: (open: boolean) => void;
}

const apps = [
  {
    name: 'PROJECTS',
    icon: '▣',
  },
  {
    name: 'LIKHA SURVIVAL',
    icon: '◎',
  },
  {
    name: 'AI LAB',
    icon: '◈',
  },
  {
    name: 'TECH STACK',
    icon: '⌘',
  },
  {
    name: 'CONTACT',
    icon: '⌁',
  },
];

export default function DesktopIcons({ onModalChange }: DesktopIconsProps) {
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const openApp = (app: string) => {
    setActiveApp(app);
    onModalChange(true);
  };

  const closeApp = () => {
    setActiveApp(null);
    onModalChange(false);
  };

  return (
    <>
      {/* =========================================================
          VICTOR OS SYSTEM SIDEBAR
      ========================================================= */}

      <div className="fixed top-1/2 left-0 z-40 -translate-y-1/2">
        {/* =======================================================
            MAIN APPLICATION PANEL
        ======================================================= */}

        <motion.div
          initial={false}
          animate={{
            x: expanded ? 0 : -290,
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 28,
          }}
          className="relative w-56"
        >
          <div className="overflow-hidden rounded-r-2xl border border-l-0 border-white/10 bg-black/75 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            <motion.button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Collapse system tab"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: expanded ? 1 : 0,
                scale: expanded ? 1 : 0.8,
              }}
              transition={{
                duration: 0.2,
              }}
              whileHover={{
                scale: 1.15,
                color: '#fb923c',
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="absolute top-4 right-4 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-orange-500/20 bg-orange-500/5 font-mono text-xl leading-none text-orange-500 transition-colors hover:border-orange-500/50 hover:bg-orange-500/10"
            >
              ×
            </motion.button>

            {/* HEADER */}

            <div className="px-5">
              <div className="flex items-center gap-3">
                <motion.span
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    boxShadow: [
                      '0 0 8px rgba(249,115,22,0.4)',
                      '0 0 18px rgba(249,115,22,0.9)',
                      '0 0 8px rgba(249,115,22,0.4)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="h-2.5 w-2.5 rounded-full bg-orange-500"
                />

                <span className="font-mono text-[15px] tracking-[0.28em] text-white">
                  SYSTEM TAB
                </span>
              </div>

              <div className="mt-1.5 pl-5 font-mono text-[8px] tracking-[0.2em] text-gray-600">
                APPLICATIONS
              </div>
            </div>

            {/* DIVIDER */}

            <div className="mx-4 my-4 h-px bg-white/10" />

            {/* APPLICATION LIST */}

            <div className="space-y-1.5 px-3">
              {apps.map((app, index) => (
                <motion.button
                  key={app.name}
                  type="button"
                  onClick={() => openApp(app.name)}
                  initial={false}
                  animate={{
                    opacity: expanded ? 1 : 0,
                    x: expanded ? 0 : -20,
                  }}
                  transition={{
                    duration: 0.25,
                    delay: expanded ? index * 0.04 : 0,
                  }}
                  whileHover={{
                    x: 5,
                    backgroundColor: 'rgba(255,255,255,0.07)',
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] font-mono text-lg text-gray-400 transition-all duration-300 group-hover:border-orange-500/30 group-hover:bg-orange-500/5 group-hover:text-orange-400">
                    {app.icon}
                  </span>

                  <div>
                    <div className="font-mono text-[10px] tracking-[0.15em] text-gray-300 transition-colors group-hover:text-white">
                      {app.name}
                    </div>

                    <div className="mt-1 font-mono text-[7px] tracking-[0.18em] text-gray-700">
                      APPLICATION
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* STATUS */}

            <div className="mx-4 mt-4 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2 font-mono text-[8px] tracking-[0.18em] text-gray-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                SYSTEM ONLINE
              </div>
            </div>
          </div>
        </motion.div>

        {/* =======================================================
            VISIBLE EDGE SIDEBAR
        ======================================================= */}

        <motion.button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-label={expanded ? 'Collapse system applications' : 'Open system applications'}
          initial={false}
          animate={{
            width: expanded ? 2 : 72,
            height: expanded ? 60 : 450,
          }}
          whileHover={{
            width: 82,
          }}
          whileTap={{
            scale: 0.97,
          }}
          transition={{
            type: 'spring',
            stiffness: 280,
            damping: 24,
          }}
          className="group absolute top-1/2 left-0 flex -translate-y-1/2 flex-col items-center justify-center overflow-hidden rounded-r-2xl border border-l-0 border-white/10 bg-black/80 shadow-[0_10px_40px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-colors hover:border-orange-500/40"
        >
          {/* ORANGE EDGE GLOW */}

          <motion.div
            animate={{
              opacity: expanded ? 10 : [0.25, 0.8, 0.25],
            }}
            transition={{
              duration: 2.4,
              repeat: expanded ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-0 bottom-0 left-0 w-[2px] bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.9)]"
          />

          {/* TOP SYSTEM INDICATOR */}

          <div className="mb-4 flex flex-col items-center gap-2">
            <motion.span
              animate={{
                scale: expanded ? 1 : [1, 1.25, 1],
                opacity: expanded ? 1 : [0.45, 1, 0.45],
              }}
              transition={{
                duration: 2,
                repeat: expanded ? 0 : Infinity,
                ease: 'easeInOut',
              }}
              className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]"
            />

            <span className="font-mono text-[6px] tracking-[0.25em] text-gray-700">SYS</span>
          </div>

          {/* MINI APPLICATION GLYPHS */}

          <div className="flex flex-col items-center gap-2">
            {apps.map((app, index) => (
              <motion.span
                key={app.name}
                initial={false}
                animate={{
                  opacity: expanded ? 0 : 0.45,
                  scale: expanded ? 2 : 1,
                }}
                transition={{
                  delay: index * 0.025,
                }}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.025] font-mono text-[11px] text-gray-500 transition-colors group-hover:border-orange-500/20 group-hover:text-gray-300"
              >
                {app.icon}
              </motion.span>
            ))}
          </div>

          {/* VERTICAL LABEL */}

          <span
            className="mt-4 font-mono text-[12px] tracking-[0.3em] text-gray-400 transition-colors group-hover:text-orange-400"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            SYSTEM TAB MENU
          </span>

          {/* ARROW */}

          <motion.span
            animate={{
              rotate: expanded ? 180 : 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="mt-4 font-mono text-lg leading-none text-gray-500 transition-colors group-hover:text-orange-400"
          >
            ›
          </motion.span>

          {/* BOTTOM STATUS */}

          <div className="absolute bottom-3 h-1 w-6 overflow-hidden rounded-full bg-white/5">
            <motion.div
              animate={{
                x: expanded ? 0 : [-12, 12, -12],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="h-full w-3 rounded-full bg-orange-500/70 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
            />
          </div>
        </motion.button>
      </div>

      {/* =========================================================
          APPLICATION WINDOW
      ========================================================= */}

      {activeApp && <OSModal app={activeApp} onClose={closeApp} />}
    </>
  );
}
