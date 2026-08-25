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
    icon: '📁',
  },
  {
    name: 'LIKHA SURVIVAL',
    icon: '🎮',
  },
  {
    name: 'AI LAB',
    icon: '🧠',
  },
  {
    name: 'TECH STACK',
    icon: '💻',
  },
  {
    name: 'CONTACT',
    icon: '📡',
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
          VICTOR OS EDGE DOCK
      ========================================================= */}
      <div className="fixed top-1/2 left-0 z-40 -translate-y-1/2">
        {/* =======================================================
            DOCK PANEL
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
          <div className="overflow-hidden rounded-r-2xl border border-l-0 border-white/10 bg-black/75 py-5 shadow-2xl backdrop-blur-2xl">
            {/* ===================================================
                HEADER
            =================================================== */}
            <div className="px-5">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.9)]" />

                <span className="font-mono text-[11px] tracking-[0.28em] text-white">
                  VICTOR OS
                </span>
              </div>

              <div className="mt-1.5 pl-5 font-mono text-[8px] tracking-[0.2em] text-gray-600">
                APPLICATION DOCK
              </div>
            </div>

            {/* Divider */}
            <div className="mx-4 my-4 h-px bg-white/10" />

            {/* ===================================================
                APPLICATIONS
            =================================================== */}
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
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-xl transition-all duration-300 group-hover:border-orange-500/30 group-hover:bg-orange-500/5">
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

            {/* ===================================================
                STATUS
            =================================================== */}
            <div className="mx-4 mt-4 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2 font-mono text-[8px] tracking-[0.18em] text-gray-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                SYSTEM ONLINE
              </div>
            </div>
          </div>
        </motion.div>

        {/* =======================================================
            EDGE HANDLE
            ALWAYS STAYS AT THE SCREEN EDGE
        ======================================================= */}
        <motion.button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-label={expanded ? 'Collapse application dock' : 'Open application dock'}
          whileHover={{
            width: 42,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="absolute top-1/2 left-0 flex h-24 w-9 -translate-y-1/2 items-center justify-center rounded-r-xl border border-l-0 border-white/10 bg-black/80 shadow-xl backdrop-blur-xl transition-colors hover:border-orange-500/30"
        >
          <motion.span
            animate={{
              rotate: expanded ? 180 : 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="font-mono text-xl text-gray-500 transition-colors hover:text-orange-500"
          >
            ›
          </motion.span>
        </motion.button>
      </div>

      {/* =========================================================
          APPLICATION WINDOW
      ========================================================= */}
      {activeApp && <OSModal app={activeApp} onClose={closeApp} />}
    </>
  );
}
