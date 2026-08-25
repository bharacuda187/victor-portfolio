'use client';

import { motion } from 'motion/react';

const projects = [
  {
    id: '01',
    name: 'LIKHA',
    category: 'GAME DEVELOPMENT',
    status: 'IN DEVELOPMENT',
    description:
      'A first-person survival experience focused on exploration, systems, inventory, environmental interaction, and long-term survival mechanics.',
    stack: ['UNITY', 'C#', 'GAME SYSTEMS'],
    accent: 'orange',
  },
  {
    id: '02',
    name: 'DIGITAL WORKSPACE',
    category: 'WEB DEVELOPMENT',
    status: 'ACTIVE',
    description:
      'A futuristic personal digital workspace combining web development, system interfaces, interactive 3D elements, and experimental UI.',
    stack: ['NEXT.JS', 'TAILWIND', 'MOTION', 'THREE.JS'],
    accent: 'blue',
  },
  {
    id: '03',
    name: 'IT SYSTEMS',
    category: 'INFRASTRUCTURE',
    status: 'OPERATIONAL',
    description:
      'Network, server, infrastructure, and systems administration work focused on reliable digital environments.',
    stack: ['LINUX', 'WINDOWS', 'MIKROTIK', 'NETWORKING'],
    accent: 'orange',
  },
];

interface ProjectsPageProps {
  onLikhaClick: () => void;
  onITSystemsClick: () => void;
  onDigitalWorkspaceClick: () => void;
}

export default function ProjectsPage({
  onLikhaClick,
  onITSystemsClick,
  onDigitalWorkspaceClick,
}: ProjectsPageProps) {
  return (
    <section className="relative h-screen w-screen overflow-hidden bg-black text-white">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
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
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.035] blur-[140px]" />

      {/* Main container */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-6 pt-32 pb-8 md:px-10 md:pt-32">
        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: -25,
            filter: 'blur(8px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-7"
        >
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-blue-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
            SYS.ARCHIVE // PROJECT_DATABASE
          </div>

          <div className="mt-3 flex items-end justify-between">
            <div>
              <h1 className="font-mono text-4xl font-bold tracking-tight uppercase md:text-6xl">
                PROJECT
                <span className="text-orange-500"> ARCHIVE</span>
              </h1>

              <p className="mt-3 max-w-2xl font-mono text-xs tracking-[0.18em] text-gray-500 uppercase">
                Selected systems, experiments and digital builds.
              </p>
            </div>

            <div className="hidden text-right font-mono md:block">
              <p className="text-[9px] tracking-[0.25em] text-gray-600">DATABASE STATUS</p>

              <p className="mt-1 text-xs tracking-widest text-orange-500">
                {String(projects.length).padStart(2, '0')} PROJECTS INDEXED
              </p>
            </div>
          </div>
        </motion.div>

        {/* PROJECT LIST */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
          {projects.map((project, index) => {
            const orange = project.accent === 'orange';

            return (
              <motion.article
                key={project.id}
                initial={{
                  opacity: 0,
                  x: 40,
                  filter: 'blur(6px)',
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.15 + index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 md:p-5"
              >
                {/* Corner accents */}
                <div
                  className={`absolute top-2 left-2 h-6 w-6 border-t border-l ${
                    orange ? 'border-orange-500/70' : 'border-blue-400/70'
                  }`}
                />

                <div
                  className={`absolute top-2 right-2 h-6 w-6 border-t border-r ${
                    orange ? 'border-orange-500/40' : 'border-blue-400/40'
                  }`}
                />

                <div
                  className={`absolute bottom-2 left-2 h-6 w-6 border-b border-l ${
                    orange ? 'border-orange-500/40' : 'border-blue-400/40'
                  }`}
                />

                <div
                  className={`absolute right-2 bottom-2 h-6 w-6 border-r border-b ${
                    orange ? 'border-orange-500/70' : 'border-blue-400/70'
                  }`}
                />

                <div className="grid gap-5 md:grid-cols-[190px_1fr_auto] md:items-center">
                  {/* PROJECT ID */}
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden border border-white/[0.07] bg-black/50">
                    <div
                      className={`absolute h-20 w-20 rounded-full border ${
                        orange ? 'border-orange-500/20' : 'border-blue-400/20'
                      }`}
                    />

                    <div
                      className={`absolute h-12 w-12 rounded-full border border-dashed ${
                        orange ? 'border-orange-500/30' : 'border-blue-400/30'
                      }`}
                    />

                    <span
                      className={`relative z-10 font-mono text-3xl font-bold ${
                        orange ? 'text-orange-500/70' : 'text-blue-400/70'
                      }`}
                    >
                      {project.id}
                    </span>

                    <span className="absolute bottom-2 left-2 font-mono text-[7px] tracking-[0.2em] text-gray-600">
                      VISUAL_FEED
                    </span>
                  </div>

                  {/* PROJECT INFO */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-mono text-2xl font-bold tracking-wider">
                        {project.name}
                      </h2>

                      <span
                        className={`font-mono text-[8px] tracking-[0.2em] ${
                          orange ? 'text-orange-500' : 'text-blue-400'
                        }`}
                      >
                        ● {project.status}
                      </span>
                    </div>

                    <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-gray-600">
                      {project.category}
                    </p>

                    <p className="mt-4 max-w-2xl font-mono text-xs leading-relaxed text-gray-400">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[8px] tracking-widest text-gray-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ACTION */}
                  <motion.button
                    type="button"
                    onClick={
                      project.id === '01'
                        ? onLikhaClick
                        : project.id === '02'
                          ? onDigitalWorkspaceClick
                          : project.id === '03'
                            ? onITSystemsClick
                            : undefined
                    }
                    whileHover={{
                      scale: 1.05,
                      x: -3,
                    }}
                    className={`border px-4 py-2 font-mono text-[9px] tracking-[0.2em] whitespace-nowrap transition ${
                      orange
                        ? 'border-orange-500/30 text-orange-500 hover:bg-orange-500/10'
                        : 'border-blue-400/30 text-blue-400 hover:bg-blue-400/10'
                    }`}
                  >
                    VIEW PROJECT →
                  </motion.button>
                </div>

                {/* Scan line */}
                <motion.div
                  animate={{
                    x: ['-100%', '100%'],
                    opacity: [0, 0.4, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: 'linear',
                  }}
                  className={`pointer-events-none absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent ${
                    orange ? 'via-orange-500/50' : 'via-blue-400/40'
                  } to-transparent`}
                />
              </motion.article>
            );
          })}
        </div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[8px] tracking-[0.2em] text-gray-600"
        >
          <span>PROJECT DATABASE // ONLINE</span>
          <span>ARCHIVE INTEGRITY 100%</span>
          <span className="hidden md:block">SYS.ID // VATS-PROJECTS</span>
        </motion.div>
      </div>
    </section>
  );
}
