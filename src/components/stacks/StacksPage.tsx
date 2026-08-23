'use client';

import { motion } from 'motion/react';

const stackGroups = [
  {
    id: '01',
    title: 'FRONTEND',
    code: 'UI_LAYER',
    color: 'blue',
    items: [
      { name: 'HTML5', status: 'CORE' },
      { name: 'CSS3', status: 'CORE' },
      { name: 'JavaScript', status: 'ACTIVE' },
      { name: 'Bootstrap', status: 'ACTIVE' },
      { name: 'Tailwind CSS', status: 'ACTIVE' },
    ],
  },
  {
    id: '02',
    title: 'BACKEND',
    code: 'SERVER_LAYER',
    color: 'orange',
    items: [
      { name: 'PHP', status: 'CORE' },
      { name: 'Laravel', status: 'ACTIVE' },
      { name: 'MySQL', status: 'CORE' },
      { name: 'Node.js', status: 'ACTIVE' },
    ],
  },
  {
    id: '03',
    title: 'DEVELOPMENT',
    code: 'BUILD_LAYER',
    color: 'blue',
    items: [
      { name: 'Next.js', status: 'ACTIVE' },
      { name: 'Vite', status: 'ACTIVE' },
      { name: 'Git', status: 'CORE' },
      { name: 'GitHub', status: 'ACTIVE' },
      { name: 'Unity', status: 'ACTIVE' },
    ],
  },
  {
    id: '04',
    title: 'INFRASTRUCTURE',
    code: 'SYSTEM_LAYER',
    color: 'orange',
    items: [
      { name: 'Windows', status: 'CORE' },
      { name: 'Linux', status: 'CORE' },
      { name: 'Networking', status: 'CORE' },
      { name: 'MikroTik', status: 'ACTIVE' },
      { name: 'Web Hosting', status: 'ACTIVE' },
    ],
  },
];

export default function StacksPage() {
  return (
    <section className="relative h-screen w-screen overflow-hidden bg-black text-white">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(96,165,250,0.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96,165,250,0.35) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.04] blur-[120px]" />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-6 pt-24 pb-8 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-blue-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
            SYS.ARCHIVE // TECHNOLOGY_STACK
          </div>

          <div className="mt-3 flex items-end justify-between">
            <div>
              <h1 className="font-mono text-4xl font-bold tracking-tight uppercase md:text-6xl">
                SYSTEM
                <span className="text-orange-500"> ARCHITECTURE</span>
              </h1>

              <p className="mt-3 max-w-2xl font-mono text-xs tracking-[0.2em] text-gray-500 uppercase">
                Technologies, frameworks and infrastructure used to build digital systems.
              </p>
            </div>

            <div className="hidden text-right font-mono md:block">
              <p className="text-[9px] tracking-[0.25em] text-gray-600">COMPONENT STATUS</p>
              <p className="mt-1 text-xs tracking-widest text-orange-500">
                ALL SYSTEMS OPERATIONAL
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stack grid */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto pr-1 md:grid-cols-2">
          {stackGroups.map((group, index) => {
            const orange = group.color === 'orange';

            return (
              <motion.div
                key={group.id}
                initial={{
                  opacity: 0,
                  y: 30,
                  scale: 0.97,
                  filter: 'blur(6px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-white/20"
              >
                {/* Corner accents */}
                <div
                  className={`absolute top-2 left-2 h-5 w-5 border-t border-l ${
                    orange ? 'border-orange-500/70' : 'border-blue-400/70'
                  }`}
                />

                <div
                  className={`absolute top-2 right-2 h-5 w-5 border-t border-r ${
                    orange ? 'border-orange-500/40' : 'border-blue-400/40'
                  }`}
                />

                <div
                  className={`absolute bottom-2 left-2 h-5 w-5 border-b border-l ${
                    orange ? 'border-orange-500/40' : 'border-blue-400/40'
                  }`}
                />

                <div
                  className={`absolute right-2 bottom-2 h-5 w-5 border-r border-b ${
                    orange ? 'border-orange-500/70' : 'border-blue-400/70'
                  }`}
                />

                {/* Group header */}
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-2xl font-bold ${
                        orange ? 'text-orange-500' : 'text-blue-400'
                      }`}
                    >
                      {group.id}
                    </span>

                    <div>
                      <h2 className="font-mono text-sm font-bold tracking-[0.2em]">
                        {group.title}
                      </h2>

                      <p className="mt-1 font-mono text-[8px] tracking-[0.25em] text-gray-600">
                        {group.code}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[8px] tracking-widest text-gray-600">
                    {String(group.items.length).padStart(2, '0')} MODULES
                  </span>
                </div>

                {/* Technology list */}
                <div className="space-y-2">
                  {group.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.35 + index * 0.1 + itemIndex * 0.04,
                      }}
                      className="flex items-center justify-between border border-white/[0.06] bg-black/30 px-3 py-2.5"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            orange ? 'bg-orange-500' : 'bg-blue-400'
                          }`}
                        />

                        <span className="font-mono text-xs tracking-wider text-gray-300">
                          {item.name}
                        </span>
                      </div>

                      <span
                        className={`font-mono text-[8px] tracking-[0.2em] ${
                          item.status === 'CORE' ? 'text-orange-500/70' : 'text-blue-400/70'
                        }`}
                      >
                        {item.status}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Scan line */}
                <motion.div
                  animate={{
                    y: ['0%', '100%'],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'linear',
                  }}
                  className={`pointer-events-none absolute left-0 h-px w-full bg-gradient-to-r from-transparent ${
                    orange ? 'via-orange-500/40' : 'via-blue-400/30'
                  } to-transparent`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Footer status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[8px] tracking-[0.2em] text-gray-600"
        >
          <span>ARCHITECTURE // ONLINE</span>
          <span>STACK INTEGRITY 100%</span>
          <span className="hidden md:block">SYS.ID // VATS-STACK</span>
        </motion.div>
      </div>
    </section>
  );
}
