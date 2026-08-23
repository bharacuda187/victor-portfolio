'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import BootLine from './BootLine';

interface BootConsoleProps {
  stage: number;
  onComplete: () => void;
}

export default function BootConsole({ stage, onComplete }: BootConsoleProps) {
  const [visibleLines, setVisibleLines] = useState(0);

  const systemCheck = [
    ['CPU CORE', 'ONLINE'],
    ['MEMORY MODULE', 'VERIFIED'],
    ['NETWORK INTERFACE', 'CONNECTED'],
    ['AI ENGINE', 'ONLINE'],
    ['CREATIVE CORE', 'READY'],
  ];

  const profileLoading = [
    ['DEVELOPER PROFILE', 'FOUND'],
    ['EXPERIENCE DATABASE', 'LOADED'],
    ['TECHNOLOGY STACK', 'VERIFIED'],
  ];

  const systemInformation = [
    ['SYSTEM NAME', 'VICTOR OS'],
    ['BUILD', 'VT-2026.08'],
    ['FRAMEWORK', 'NEXT.JS'],
    ['UI ENGINE', 'MOTION + TAILWIND'],
    ['GAME DEVELOPMENT', 'UNITY'],
    ['BACKEND CORE', 'LARAVEL + NODE.JS'],
    ['DATABASE', 'MYSQL'],
  ];

  const getCurrentLines = () => {
    if (stage === 0) return systemCheck;

    if (stage === 1) return profileLoading;

    if (stage === 2) return systemInformation;

    return [];
  };

  useEffect(() => {
    setVisibleLines(0);

    const lines = getCurrentLines();

    if (lines.length === 0) return;

    let count = 0;

    const timer = setInterval(() => {
      count++;

      setVisibleLines(count);

      if (count >= lines.length) {
        clearInterval(timer);

        if (stage !== 3) {
          setTimeout(() => {
            onComplete();
          }, 1500);
        }
      }
    }, 100);

    return () => clearInterval(timer);
  }, [stage]);

  useEffect(() => {
    if (stage === 3) {
      const timer = setTimeout(() => {
        onComplete();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [stage]);

  const renderLines = (lines: string[][]) => {
    return lines.slice(0, visibleLines).map(([text, status], index) => (
      <BootLine
        key={text}

        text={text}

        status={status}

        delay={0}
      />
    ));
  };

  return (
    <div className="mt-12 min-h-[360px] font-mono">
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.section
            key="system"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}
          >
            <p className="mb-5 text-blue-400">[ SYSTEM CHECK ]</p>

            {renderLines(systemCheck)}
          </motion.section>
        )}

        {stage === 1 && (
          <motion.section
            key="profile"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}
          >
            <p className="mb-5 text-blue-400">[ PROFILE LOADING ]</p>

            {renderLines(profileLoading)}
          </motion.section>
        )}

        {stage === 2 && (
          <motion.section
            key="information"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}
          >
            <p className="mb-5 text-blue-400">[ SYSTEM INFORMATION ]</p>

            {renderLines(systemInformation)}
          </motion.section>
        )}

        {stage === 3 && (
          <motion.section
            key="ready"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <p className="mb-5 text-blue-400">SYSTEM READY</p>

            <BootLine text="SECURITY CHECK" status="PASS" delay={0} />

            <BootLine text="USER PROFILE" status="VERIFIED" delay={0.2} />

            <BootLine text="INTERFACE MODULE" status="LOADED" delay={0.4} />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
