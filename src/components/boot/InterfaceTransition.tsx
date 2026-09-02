'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';

interface InterfaceTransitionProps {
  active: boolean;
  onEnter: () => void;
}

const radialLines = Array.from({ length: 16 }, (_, index) => index * 22.5);

const telemetry = [
  { label: 'CORE TEMP', value: '032.4°', position: 'top-[8%] left-[4%]' },
  { label: 'VECTOR', value: '014.82°', position: 'top-[8%] right-[4%]' },
  { label: 'POWER', value: '98.7%', position: 'bottom-[10%] left-[4%]' },
  { label: 'SIGNAL', value: '99.2%', position: 'bottom-[10%] right-[4%]' },
];

export default function InterfaceTransition({ active, onEnter }: InterfaceTransitionProps) {
  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => {
      onEnter();
    }, 1600);

    return () => clearTimeout(timer);
  }, [active, onEnter]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:50px_50px] opacity-30" />

          {/* Secondary micro grid */}
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(249,115,22,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px)] [background-size:10px_10px] opacity-10" />

          {/* Global scanline */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.025)_50%,transparent_100%)]"
            animate={{
              y: ['-100%', '100%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Reactor */}
          <motion.div
            className="relative z-10 h-[min(90vw,620px)] w-[min(90vw,620px)] font-mono"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: [0.8, 1, 1, 1.08],
              filter: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'],
            }}
            transition={{
              duration: 1.6,
              ease: 'easeInOut',
              times: [0, 0.25, 0.75, 1],
            }}
          >
            {/* Ambient core glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl"
              animate={{
                scale: [0.8, 1.2, 0.9, 1.5],
                opacity: [0.3, 0.7, 0.3, 0],
              }}
              transition={{
                duration: 1.6,
                ease: 'easeInOut',
              }}
            />

            {/* Radial mechanical lines */}
            {radialLines.map((angle, index) => (
              <motion.div
                key={angle}
                className="absolute top-1/2 left-1/2 h-px w-[46%] origin-left"
                style={{
                  rotate: angle,
                }}
                initial={{
                  scaleX: 0,
                  opacity: 0,
                }}
                animate={{
                  scaleX: [0, 1, 0.82],
                  opacity: [0, 0.45, 0],
                }}
                transition={{
                  delay: index * 0.025,
                  duration: 1.4,
                  ease: 'easeOut',
                }}
              >
                <div
                  className={`h-full w-full ${
                    index % 3 === 0 ? 'bg-orange-500/40' : 'bg-blue-400/20'
                  }`}
                />
              </motion.div>
            ))}

            {/* Outer reactor ring */}
            <motion.div
              className="absolute top-1/2 left-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/10"
              animate={{
                rotate: -360,
                opacity: [0, 1, 0],
              }}
              transition={{
                rotate: {
                  duration: 1.6,
                  ease: 'linear',
                },
                opacity: {
                  duration: 1.6,
                  ease: 'easeInOut',
                },
              }}
            />

            {/* Outer segmented ring */}
            <motion.div
              className="absolute top-1/2 left-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-orange-500/30"
              animate={{
                rotate: 360,
                scale: [0.85, 1, 1.05],
                opacity: [0, 1, 0],
              }}
              transition={{
                rotate: {
                  duration: 1.4,
                  ease: 'linear',
                },
                scale: {
                  duration: 1.6,
                  ease: 'easeOut',
                },
                opacity: {
                  duration: 1.6,
                },
              }}
            />

            {/* Technical arc */}
            <motion.div
              className="absolute top-1/2 left-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-transparent border-t-orange-500/20 border-l-orange-500/70"
              animate={{
                rotate: 360,
                opacity: [0, 1, 0],
              }}
              transition={{
                rotate: {
                  duration: 1.2,
                  ease: 'linear',
                },
                opacity: {
                  duration: 1.6,
                },
              }}
            />

            {/* Blue counter arc */}
            <motion.div
              className="absolute top-1/2 left-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-transparent border-r-blue-400/60 border-b-blue-400/20"
              animate={{
                rotate: -360,
                opacity: [0, 1, 0],
              }}
              transition={{
                rotate: {
                  duration: 1,
                  ease: 'linear',
                },
                opacity: {
                  duration: 1.6,
                },
              }}
            />

            {/* Inner ring */}
            <motion.div
              className="absolute top-1/2 left-1/2 h-[57%] w-[57%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-dashed border-orange-500/30"
              animate={{
                rotate: 360,
                scale: [0.7, 1, 1.15],
                opacity: [0, 1, 0],
              }}
              transition={{
                rotate: {
                  duration: 0.9,
                  ease: 'linear',
                },
                scale: {
                  duration: 1.6,
                },
                opacity: {
                  duration: 1.6,
                },
              }}
            />

            {/* Reactor ticks */}
            {Array.from({ length: 32 }).map((_, index) => {
              const angle = index * 11.25;

              return (
                <motion.div
                  key={index}
                  className="absolute top-1/2 left-1/2 h-1 w-3 origin-left"
                  style={{
                    rotate: angle,
                    transformOrigin: '0 50%',
                  }}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: [0, index % 4 === 0 ? 0.9 : 0.35, 0],
                  }}
                  transition={{
                    delay: 0.25 + index * 0.015,
                    duration: 1.2,
                  }}
                >
                  <div
                    className={`h-px w-full ${
                      index % 4 === 0 ? 'bg-orange-500' : 'bg-blue-400/50'
                    }`}
                  />
                </motion.div>
              );
            })}

            {/* Energy nodes */}
            {[0, 90, 180, 270].map((angle, index) => (
              <motion.div
                key={angle}
                className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]"
                animate={{
                  rotate: 360,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2 + index * 0.1,
                  repeat: 0,
                  ease: 'linear',
                }}
                style={{
                  transformOrigin: `${Math.cos((angle * Math.PI) / 180) * 210}px ${
                    Math.sin((angle * Math.PI) / 180) * 210
                  }px`,
                }}
              />
            ))}

            {/* Crosshair */}
            <div className="absolute top-1/2 left-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="absolute top-0 left-1/2 h-7 w-px -translate-x-1/2 bg-orange-500/50"
                animate={{
                  scaleY: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                }}
              />

              <motion.div
                className="absolute bottom-0 left-1/2 h-7 w-px -translate-x-1/2 bg-orange-500/50"
                animate={{
                  scaleY: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.1,
                }}
              />

              <motion.div
                className="absolute top-1/2 left-0 h-px w-7 -translate-y-1/2 bg-orange-500/50"
                animate={{
                  scaleX: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.15,
                }}
              />

              <motion.div
                className="absolute top-1/2 right-0 h-px w-7 -translate-y-1/2 bg-orange-500/50"
                animate={{
                  scaleX: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.2,
                }}
              />
            </div>

            {/* Central reactor */}
            <motion.div
              className="absolute top-1/2 left-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-orange-500/60 bg-black/80 backdrop-blur-sm"
              animate={{
                scale: [0.8, 1, 1.08, 1.25],
                boxShadow: [
                  '0 0 15px rgba(249,115,22,0.05)',
                  '0 0 45px rgba(249,115,22,0.25)',
                  '0 0 80px rgba(249,115,22,0.4)',
                  '0 0 120px rgba(249,115,22,0)',
                ],
              }}
              transition={{
                duration: 1.6,
                ease: 'easeOut',
              }}
            >
              {/* Core ring */}
              <motion.div
                className="absolute inset-3 rounded-full border border-blue-400/40"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 1,
                  ease: 'linear',
                }}
              />

              <motion.div
                className="absolute inset-6 rounded-full border border-orange-500/60"
                animate={{
                  scale: [0.85, 1.05, 0.85],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
              />

              {/* Energy core */}
              <motion.div
                className="absolute h-10 w-10 rounded-full bg-orange-500 shadow-[0_0_25px_rgba(249,115,22,1),0_0_70px_rgba(249,115,22,0.5)]"
                animate={{
                  scale: [0.5, 1, 0.7, 1.4, 0],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 1.6,
                  ease: 'easeInOut',
                }}
              />

              <motion.span
                className="relative z-10 text-3xl font-bold text-white"
                animate={{
                  scale: [0.8, 1, 1.2, 0],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.6,
                  ease: 'easeInOut',
                }}
              >
                V
              </motion.span>
            </motion.div>

            {/* Scanner sweep */}
            <motion.div
              className="pointer-events-none absolute top-1/2 left-1/2 h-[92%] w-px origin-bottom bg-gradient-to-t from-orange-500/80 via-orange-500/20 to-transparent"
              initial={{
                rotate: 0,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.4,
                ease: 'linear',
              }}
            />

            {/* Telemetry */}
            {telemetry.map((item, index) => (
              <motion.div
                key={item.label}
                className={`absolute ${item.position} text-[8px] tracking-[0.25em] text-gray-600`}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  delay: 0.4 + index * 0.08,
                  duration: 1.1,
                }}
              >
                <div>{item.label}</div>

                <div
                  className={`mt-1 ${index % 2 === 0 ? 'text-orange-500/70' : 'text-blue-400/70'}`}
                >
                  {item.value}
                </div>
              </motion.div>
            ))}

            {/* System labels */}
            <motion.div
              className="absolute top-[3%] left-1/2 -translate-x-1/2 text-[8px] tracking-[0.4em] text-gray-600"
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.4,
              }}
            >
              V-CORE // 01
            </motion.div>

            <motion.div
              className="absolute bottom-[3%] left-1/2 -translate-x-1/2 text-[8px] tracking-[0.35em] text-orange-500/70"
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: 0.4,
                duration: 1.2,
              }}
            >
              CORE SYNCHRONIZED
            </motion.div>

            {/* Corner brackets */}
            <div className="absolute top-2 left-2 h-8 w-8 border-t border-l border-orange-500/40" />
            <div className="absolute top-2 right-2 h-8 w-8 border-t border-r border-orange-500/40" />
            <div className="absolute bottom-2 left-2 h-8 w-8 border-b border-l border-orange-500/40" />
            <div className="absolute right-2 bottom-2 h-8 w-8 border-r border-b border-orange-500/40" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
