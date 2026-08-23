'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

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
      {/* Desktop Applications */}
      <div className="absolute top-1/2 left-10 z-20 grid -translate-y-1/2 gap-6">
        {apps.map((app, index) => (
          <motion.button
            key={app.name}
            type="button"
            onClick={() => openApp(app.name)}
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.15,
            }}
            whileHover={{
              scale: 1.1,
              y: -5,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="group flex w-36 cursor-pointer flex-col items-center rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
          >
            <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
              {app.icon}
            </div>

            <p className="mt-3 text-center font-mono text-xs text-gray-300">{app.name}</p>
          </motion.button>
        ))}
      </div>

      {/* Application Window */}
      <OSModal app={activeApp} onClose={closeApp} />
    </>
  );
}
