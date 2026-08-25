'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OSModalProps {
  app: string | null;
  onClose: () => void;
}

const projects = [
  {
    name: 'LIKHA SURVIVAL',
    status: 'IN DEVELOPMENT',
    category: 'GAME DEVELOPMENT',
    description:
      'A first-person survival experience built around exploration, crafting, resource management, and long-term survival.',
    stack: ['UNITY', 'C#', '3D', 'GAME SYSTEMS'],
    access: 'PRIVATE',
  },
  {
    name: 'LIKHA DIGITAL',
    status: 'ACTIVE',
    category: 'WEB DEVELOPMENT',
    description:
      'A digital solutions platform focused on modern websites, AI-assisted development, and digital experiences.',
    stack: ['REACT', 'NEXT.JS', 'TAILWIND', 'AI'],
    access: 'PUBLIC',
    href: 'https://likhadigital.com.au/',
  },
  {
    name: 'VICTOR OS',
    status: 'ACTIVE',
    category: 'PORTFOLIO SYSTEM',
    description:
      'An interactive operating-system-inspired portfolio interface combining web development, animation, and immersive UI.',
    stack: ['NEXT.JS', 'REACT', 'MOTION', 'THREE.JS'],
    access: 'PUBLIC',
  },
  {
    name: 'LAE CITY HOTEL',
    status: 'ACTIVE',
    category: 'HOSPITALITY WEBSITE',
    description:
      'A simple and modern website for a hotel and restaurant in Lae City, Papua New Guinea, built with a focus on user experience and design.',
    stack: ['HTML', 'CSS', 'JAVASCRIPT', 'BOOTSTRAP'],
    access: 'PUBLIC',
    href: 'https://laecityhotel.com/',
  },
  {
    name: 'HOTEL MOROBE',
    status: 'ACTIVE',
    category: 'HOSPITALITY WEBSITE',
    description:
      'A simple and modern website for a hotel and restaurant in Lae City, Papua New Guinea, built with a focus on user experience and design.',
    stack: ['HTML', 'CSS', 'JAVASCRIPT', 'BOOTSTRAP'],
    access: 'PUBLIC',
    href: 'https://hotelmorobe.com/',
  },
];

function ProjectsContent() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const wheelLock = useRef(false);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = projectsRef.current;

    if (!container) return;

    // Ignore mostly-horizontal trackpad scrolling.
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      return;
    }

    event.preventDefault();

    // Prevent one mouse-wheel gesture from jumping through
    // multiple project groups.
    if (wheelLock.current) return;

    wheelLock.current = true;

    const direction = event.deltaY > 0 ? 1 : -1;

    container.scrollBy({
      left: direction * container.clientWidth,
      behavior: 'smooth',
    });

    setTimeout(() => {
      wheelLock.current = false;
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-[0.3em] text-blue-400">PROJECT DATABASE</span>

          <span className="h-px flex-1 bg-white/10" />

          <span className="font-mono text-[10px] text-gray-500">
            {projects.length.toString().padStart(2, '0')} RECORDS
          </span>
        </div>

        <p className="mt-3 max-w-2xl font-mono text-xs leading-relaxed text-gray-500">
          ACTIVE DEVELOPMENT SYSTEMS AND SELECTED DIGITAL PROJECTS.
        </p>
      </div>

      {/* Project Carousel */}
      <div
        ref={projectsRef}
        onWheel={handleWheel}
        className="flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto overflow-y-hidden pb-3"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15 + index * 0.1,
              duration: 0.4,
            }}
            whileHover={{
              y: -5,
            }}
            className="group relative w-full flex-shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-orange-500/30 hover:bg-white/[0.05] md:w-[calc((100%-2rem)/3)]"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-32 w-32 rounded-full bg-orange-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            {/* Project Header */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest text-gray-600">
                PROJECT_{String(index + 1).padStart(2, '0')}
              </span>

              <span className="flex items-center gap-2 font-mono text-[9px] text-orange-400">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />

                {project.status}
              </span>
            </div>

            {/* Project Name */}
            <h3 className="mt-6 font-mono text-lg font-bold tracking-wider text-white">
              {project.name}
            </h3>

            {/* Category */}
            <p className="mt-2 font-mono text-[9px] tracking-[0.2em] text-blue-400">
              {project.category}
            </p>

            {/* Description */}
            <p className="mt-5 text-xs leading-relaxed text-gray-500">{project.description}</p>

            {/* Stack */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-white/10 bg-black/30 px-2 py-1 font-mono text-[8px] tracking-wider text-gray-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="mt-6 h-px w-full bg-gradient-to-r from-orange-500/30 via-white/10 to-transparent" />

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between">
              <span className="font-mono text-[8px] text-gray-600">
                ACCESS LEVEL: {project.access}
              </span>

              {project.access === 'PUBLIC' && project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[9px] text-gray-500 transition-colors hover:text-orange-400"
                >
                  OPEN →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll Indicator */}
      {projects.length > 3 && (
        <div className="flex items-center justify-center gap-3">
          <span className="font-mono text-[8px] tracking-[0.2em] text-gray-700">SCROLL</span>

          <span className="text-[10px] text-gray-600">◀</span>

          <div className="flex gap-1">
            {Array.from({
              length: Math.ceil(projects.length / 3),
            }).map((_, index) => (
              <span key={index} className="h-1 w-4 rounded-full bg-white/10" />
            ))}
          </div>

          <span className="text-[10px] text-gray-600">▶</span>

          <span className="font-mono text-[8px] tracking-[0.2em] text-gray-700">PROJECTS</span>
        </div>
      )}

      {/* Terminal */}
      <div className="rounded-lg border border-white/5 bg-black/30 px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="text-orange-500">&gt;</span>

          <span className="text-gray-500">PROJECT DATABASE ONLINE</span>

          <span className="ml-auto text-gray-700">VICTOR_OS // PROJECTS</span>
        </div>
      </div>
    </div>
  );
}

function LikhaContent() {
  const systems = [
    'FIRST-PERSON MOVEMENT',
    'PLAYER LOOK',
    'SPRINT / CROUCH / JUMP',
    'INVENTORY SYSTEM',
    'EQUIPMENT SYSTEM',
    'BACKPACK SYSTEM',
    'WORLD EXPLORATION',
    'SURVIVAL FRAMEWORK',
  ];

  return (
    <div className="space-y-6">
      {/* Hero / Game Identity */}
      <div className="relative overflow-hidden rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/[0.08] via-transparent to-blue-500/[0.05] p-6">
        <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded border border-orange-500/30 bg-orange-500/10 px-2 py-1 font-mono text-[9px] tracking-widest text-orange-400">
              IN DEVELOPMENT
            </span>

            <span className="font-mono text-[9px] tracking-widest text-gray-600">
              PROJECT_ID: LKHA-001
            </span>
          </div>

          <h2 className="mt-5 font-mono text-3xl font-bold tracking-[0.15em] text-white md:text-4xl">
            LIKHA SURVIVAL
          </h2>

          <p className="mt-3 max-w-2xl font-mono text-xs leading-relaxed text-gray-500">
            A first-person survival game focused on exploration, resource management, immersion, and
            long-term survival.
          </p>
        </div>
      </div>

      {/* Telemetry */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ['ENGINE', 'UNITY'],
          ['LANGUAGE', 'C#'],
          ['VIEW', 'FIRST PERSON'],
          ['STATUS', 'BUILDING'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
            <p className="font-mono text-[8px] tracking-[0.2em] text-gray-600">{label}</p>

            <p className="mt-2 font-mono text-xs font-bold text-gray-300">{value}</p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Systems */}
        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.2em] text-blue-400">CORE SYSTEMS</span>

            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="mt-5 space-y-2">
            {systems.map((system, index) => (
              <motion.div
                key={system}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.15 + index * 0.04,
                }}
                className="flex items-center gap-3 rounded border border-white/5 bg-black/20 px-3 py-2"
              >
                <span className="font-mono text-[8px] text-gray-700">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-orange-500/80 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />

                <span className="font-mono text-[9px] text-gray-400">{system}</span>

                <span className="ml-auto font-mono text-[8px] text-green-500/70">ONLINE</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.2em] text-orange-400">
              DESIGN DIRECTION
            </span>

            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <p className="font-mono text-[9px] text-gray-600">INSPIRATION</p>

              <p className="mt-2 font-mono text-xs text-gray-400">
                RUST / DAYZ / MIST SURVIVAL / ARMA
              </p>
            </div>

            <div>
              <p className="font-mono text-[9px] text-gray-600">DESIGN PHILOSOPHY</p>

              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                Immersive survival without unnecessary complexity. Every system should contribute to
                exploration, preparation, risk, and survival.
              </p>
            </div>

            <div>
              <p className="font-mono text-[9px] text-gray-600">LONG TERM OBJECTIVE</p>

              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                Build a persistent survival experience that can continue evolving through new
                systems, environments, and gameplay mechanics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Development progress */}
      <div className="rounded-xl border border-white/10 bg-black/30 p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs tracking-[0.2em] text-blue-400">
            DEVELOPMENT FRAMEWORK
          </span>

          <span className="font-mono text-[9px] text-orange-400">ACTIVE BUILD</span>
        </div>

        <div className="mt-5">
          <div className="flex justify-between font-mono text-[9px]">
            <span className="text-gray-600">CORE FOUNDATION</span>

            <span className="text-gray-400">IN PROGRESS</span>
          </div>

          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '22%' }}
              transition={{
                duration: 1,
                delay: 0.3,
              }}
              className="h-full rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]"
            />
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="rounded-lg border border-white/5 bg-black/40 px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="text-orange-500">&gt;</span>

          <span className="text-gray-500">LIKHA SURVIVAL FRAMEWORK ONLINE</span>

          <span className="ml-auto hidden text-gray-700 sm:inline">BUILD // LKHA-001</span>
        </div>
      </div>
    </div>
  );
}

function AILabContent() {
  const experiments = [
    {
      name: 'AI WEB DEVELOPMENT',
      status: 'ACTIVE',
      description:
        'Using AI-assisted development to rapidly prototype, build, debug, and refine modern web applications.',
    },
    {
      name: 'PROMPT ENGINEERING',
      status: 'ACTIVE',
      description:
        'Designing structured prompts and workflows for reliable AI-assisted problem solving and content generation.',
    },
    {
      name: 'GENERATIVE AI & MEDIA',
      status: 'RESEARCH',
      description:
        'Exploring generative workflows for synthetic media, automated editing, text-to-content pipelines, and creative iteration.',
    },
    {
      name: 'AUTOMATION',
      status: 'RESEARCH',
      description:
        'Building workflows that combine AI with software tools to reduce repetitive development and research tasks.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Lab Header */}
      <div className="relative overflow-hidden rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.08] via-transparent to-orange-500/[0.04] p-6">
        <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="rounded border border-blue-400/30 bg-blue-400/10 px-2 py-1 font-mono text-[9px] tracking-widest text-blue-400">
              EXPERIMENTAL
            </span>

            <span className="font-mono text-[9px] tracking-widest text-gray-600">
              AI-LAB // 001
            </span>
          </div>

          <h2 className="mt-5 font-mono text-3xl font-bold tracking-[0.15em] text-white">AI LAB</h2>

          <p className="mt-3 max-w-2xl font-mono text-xs leading-relaxed text-gray-500">
            An experimental workspace for AI-assisted development, prompt engineering, automation,
            and creative systems.
          </p>
        </div>
      </div>

      {/* Lab Status */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ['MODE', 'EXPERIMENTAL'],
          ['AI ASSIST', 'ONLINE'],
          ['WORKFLOW', 'HYBRID'],
          ['STATUS', 'ACTIVE'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
            <p className="font-mono text-[8px] tracking-[0.2em] text-gray-600">{label}</p>

            <p className="mt-2 font-mono text-xs font-bold text-gray-300">{value}</p>
          </div>
        ))}
      </div>

      {/* Experiments */}
      <div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-[0.2em] text-blue-400">
            ACTIVE EXPERIMENTS
          </span>

          <span className="h-px flex-1 bg-white/10" />

          <span className="font-mono text-[9px] text-gray-600">04 MODULES</span>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.name}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1 + index * 0.08,
              }}
              whileHover={{
                y: -3,
              }}
              className="group rounded-xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-blue-400/30"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] text-gray-700">
                  LAB_{String(index + 1).padStart(2, '0')}
                </span>

                <span className="flex items-center gap-2 font-mono text-[8px] text-blue-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(56,189,248,0.7)]" />

                  {experiment.status}
                </span>
              </div>

              <h3 className="mt-5 font-mono text-sm font-bold tracking-wider text-gray-200">
                {experiment.name}
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-gray-500">{experiment.description}</p>

              <div className="mt-5 h-px bg-gradient-to-r from-blue-400/30 via-white/10 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="rounded-xl border border-white/10 bg-black/30 p-5">
        <p className="font-mono text-[9px] tracking-[0.25em] text-orange-400">SYSTEM PHILOSOPHY</p>

        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-gray-500">
          AI is treated as a development multiplier rather than a replacement for engineering
          judgment. Ideas are explored quickly, tested, refined, and converted into working systems.
        </p>
      </div>

      {/* Terminal */}
      <div className="rounded-lg border border-white/5 bg-black/40 px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="text-blue-400">&gt;</span>

          <span className="text-gray-500">AI LAB SYSTEMS ONLINE</span>

          <span className="ml-auto hidden text-gray-700 sm:inline">NEURAL_INTERFACE // ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

function TechStackContent() {
  const categories = [
    {
      name: 'FRONTEND',
      color: 'orange',
      technologies: [
        ['REACT', 85],
        ['NEXT.JS', 88],
        ['TAILWIND CSS', 90],
        ['JAVASCRIPT', 90],
        ['HTML / CSS', 95],
      ],
    },
    {
      name: 'BACKEND',
      color: 'blue',
      technologies: [
        ['PHP', 85],
        ['LARAVEL', 72],
        ['NODE.JS', 78],
        ['MYSQL', 95],
        ['REST APIs', 82],
      ],
    },
    {
      name: 'GAME DEVELOPMENT',
      color: 'orange',
      technologies: [
        ['UNITY', 80],
        ['C#', 78],
        ['3D DEVELOPMENT', 72],
        ['GAME SYSTEMS', 75],
      ],
    },
    {
      name: 'TOOLS / WORKFLOW',
      color: 'blue',
      technologies: [
        ['GIT / GITHUB', 85],
        ['AI TOOLS', 90],
        ['LINUX / WINDOWS', 95],
        ['NETWORKING', 95],
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/[0.07] via-transparent to-blue-500/[0.05] p-6">
        <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative">
          <span className="font-mono text-[9px] tracking-[0.3em] text-orange-400">
            SYSTEM CAPABILITIES
          </span>

          <h2 className="mt-4 font-mono text-3xl font-bold tracking-[0.15em] text-white">
            TECH STACK
          </h2>

          <p className="mt-3 max-w-2xl font-mono text-xs leading-relaxed text-gray-500">
            Technologies, frameworks, tools, and development systems used across web, game, AI, and
            infrastructure projects.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category, categoryIndex) => (
          <div
            key={category.name}
            className="rounded-xl border border-white/10 bg-white/[0.025] p-5"
          >
            <div className="flex items-center gap-3">
              <span
                className={
                  category.color === 'orange'
                    ? 'font-mono text-xs tracking-[0.2em] text-orange-400'
                    : 'font-mono text-xs tracking-[0.2em] text-blue-400'
                }
              >
                {category.name}
              </span>

              <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="mt-5 space-y-4">
              {category.technologies.map(([technology, level], index) => (
                <div key={technology}>
                  <div className="flex justify-between font-mono text-[9px]">
                    <span className="text-gray-400">{technology}</span>

                    <span className="text-gray-600">{level}%</span>
                  </div>

                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${level}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.1 + categoryIndex * 0.1 + index * 0.05,
                      }}
                      className={
                        category.color === 'orange'
                          ? 'h-full rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]'
                          : 'h-full rounded-full bg-blue-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Development Philosophy */}
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ['BUILD', 'Turn ideas into working systems.'],
          ['LEARN', 'Continuously explore new technologies.'],
          ['ADAPT', 'Choose the right tool for the problem.'],
        ].map(([title, description]) => (
          <div key={title} className="rounded-lg border border-white/10 bg-black/30 p-4">
            <p className="font-mono text-[10px] tracking-[0.2em] text-orange-400">{title}</p>

            <p className="mt-2 text-xs leading-relaxed text-gray-500">{description}</p>
          </div>
        ))}
      </div>

      {/* Terminal */}
      <div className="rounded-lg border border-white/5 bg-black/40 px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="text-orange-500">&gt;</span>

          <span className="text-gray-500">DEVELOPMENT ENVIRONMENT READY</span>

          <span className="ml-auto hidden text-gray-700 sm:inline">STACK // ONLINE</span>
        </div>
      </div>
    </div>
  );
}

function ContactContent() {
  const channels = [
    {
      label: 'EMAIL',
      value: 'victor.tansingco@hotmail.com',
      href: 'mailto:victor.tansingco@hotmail.com',
      action: 'SEND MESSAGE',
    },
    {
      label: 'GITHUB',
      value: 'github.com/bharacuda187',
      href: 'https://github.com/bharacuda187',
      action: 'OPEN GITHUB',
    },
    {
      label: 'LINKEDIN',
      value: 'linkedin.com/in/victor-atilano-tan-singco',
      href: 'https://www.linkedin.com/in/victor-atilano-tan-singco/',
      action: 'OPEN PROFILE',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.08] via-transparent to-orange-500/[0.04] p-6">
        <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />

            <span className="font-mono text-[9px] tracking-[0.3em] text-blue-400">
              COMMUNICATION SYSTEM
            </span>
          </div>

          <h2 className="mt-5 font-mono text-3xl font-bold tracking-[0.15em] text-white">
            CONTACT
          </h2>

          <p className="mt-3 max-w-2xl font-mono text-xs leading-relaxed text-gray-500">
            Establish a communication channel for projects, collaborations, development work, or
            simply saying hello.
          </p>
        </div>
      </div>

      {/* Connection status */}
      <div className="rounded-xl border border-green-500/20 bg-green-500/[0.03] p-4">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />

          <span className="font-mono text-[9px] tracking-[0.2em] text-green-400">
            COMMUNICATION CHANNELS AVAILABLE
          </span>

          <span className="ml-auto hidden font-mono text-[8px] text-gray-600 sm:inline">
            CONNECTION: SECURE
          </span>
        </div>
      </div>

      {/* Channels */}
      <div className="space-y-3">
        {channels.map((channel, index) => (
          <motion.div
            key={channel.label}
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.1 + index * 0.1,
            }}
            className="group rounded-xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-blue-400/30 hover:bg-white/[0.04]"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="font-mono text-[9px] tracking-[0.2em] text-gray-600">
                  {channel.label}
                </p>

                <p className="mt-2 font-mono text-sm text-gray-300">{channel.value}</p>
              </div>

              <motion.a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-blue-400/20 bg-blue-400/5 px-4 py-2 font-mono text-[9px] tracking-wider text-blue-400 transition hover:border-blue-400/40 hover:bg-blue-400/10"
              >
                {channel.action} →
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Direct message */}
      <div className="rounded-xl border border-white/10 bg-black/30 p-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-[0.2em] text-orange-400">
            DIRECT TRANSMISSION
          </span>

          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="mt-5 space-y-3">
          <input
            type="text"
            placeholder="YOUR NAME"
            className="w-full rounded-lg border border-white/10 bg-white/[0.025] px-4 py-3 font-mono text-xs text-gray-300 outline-none placeholder:text-gray-700 focus:border-orange-500/40"
          />

          <input
            type="email"
            placeholder="YOUR EMAIL"
            className="w-full rounded-lg border border-white/10 bg-white/[0.025] px-4 py-3 font-mono text-xs text-gray-300 outline-none placeholder:text-gray-700 focus:border-orange-500/40"
          />

          <textarea
            rows={4}
            placeholder="TRANSMISSION MESSAGE..."
            className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.025] px-4 py-3 font-mono text-xs text-gray-300 outline-none placeholder:text-gray-700 focus:border-orange-500/40"
          />

          <button
            type="button"
            className="w-full rounded-lg border border-orange-500/30 bg-orange-500/10 py-3 font-mono text-[10px] tracking-[0.2em] text-orange-400 transition hover:border-orange-500/60 hover:bg-orange-500/15"
          >
            TRANSMIT MESSAGE →
          </button>
        </div>
      </div>

      {/* Terminal */}
      <div className="rounded-lg border border-white/5 bg-black/40 px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="text-blue-400">&gt;</span>

          <span className="text-gray-500">COMMUNICATION SYSTEM READY</span>

          <span className="ml-auto hidden text-gray-700 sm:inline">SIGNAL // STANDBY</span>
        </div>
      </div>
    </div>
  );
}

function DefaultContent({ app }: { app: string }) {
  return (
    <div className="flex min-h-[350px] items-center justify-center">
      <div className="text-center font-mono">
        <p className="text-xs tracking-[0.3em] text-gray-500">MODULE ONLINE</p>

        <h2 className="mt-4 text-3xl font-bold tracking-widest text-white">{app}</h2>

        <p className="mt-4 text-sm text-gray-500">SYSTEM CONTENT WILL LOAD HERE</p>
      </div>
    </div>
  );
}

export default function OSModal({ app, onClose }: OSModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!app) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [app, onClose]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = modalContentRef.current;

    if (!container) return;

    /*
     * Projects has its own horizontal wheel system.
     * Let the ProjectsContent handler handle it.
     */
    if (app === 'PROJECTS') return;

    event.preventDefault();

    container.scrollTop += event.deltaY;
  };

  return (
    <AnimatePresence>
      {app && (
        <div className="fixed inset-0 z-[9999] isolate">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
          />

          {/* Modal positioning */}
          <div
            className="
              absolute
              inset-0
              flex
              items-start
              justify-center
              overflow-hidden
              px-3
              pb-3
              pt-20
              sm:px-5
              sm:pb-5
              sm:pt-24
              md:px-8
              md:pb-8
              md:pt-28
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 25,
                filter: 'blur(4px)',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
                y: 15,
                filter: 'blur(3px)',
              }}
              transition={{
                duration: 0.25,
                ease: 'easeOut',
              }}
              className="
                relative
                flex
                h-full
                w-full
                max-w-[1200px]
                flex-col
                overflow-hidden
                rounded-xl
                border
                border-orange-500/30
                bg-black/95
                shadow-[0_0_80px_rgba(249,115,22,0.12)]
                sm:rounded-2xl
                md:h-auto
                md:max-h-[calc(100dvh-160px)]
              "
            >
              {/* Top HUD line */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 z-40 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80" />

              {/* Header */}
              <div
                className="
                  relative
                  z-30
                  flex
                  h-14
                  shrink-0
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  bg-black
                  px-4
                  sm:px-6
                "
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]" />

                  <span className="truncate font-mono text-xs tracking-[0.18em] text-orange-400 sm:text-sm sm:tracking-[0.2em]">
                    {app}
                  </span>

                  <span className="hidden font-mono text-[9px] tracking-widest text-gray-600 md:inline">
                    SYSTEM MODULE
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    ml-4
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.02]
                    font-mono
                    text-lg
                    leading-none
                    text-gray-500
                    transition
                    hover:border-orange-500/40
                    hover:bg-orange-500/10
                    hover:text-orange-400
                    active:scale-95
                  "
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Scrollable content */}
              <div
                ref={modalContentRef}
                onWheel={handleWheel}
                className="
                  min-h-0
                  flex-1
                  overflow-x-hidden
                  overflow-y-auto
                  overscroll-contain
                  scroll-smooth
                  [scrollbar-width:thin]
                  [scrollbar-color:rgba(249,115,22,0.35)_transparent]
                "
              >
                <div className="p-4 sm:p-6 md:p-8">
                  {app === 'PROJECTS' ? (
                    <ProjectsContent />
                  ) : app === 'LIKHA SURVIVAL' ? (
                    <LikhaContent />
                  ) : app === 'AI LAB' ? (
                    <AILabContent />
                  ) : app === 'TECH STACK' ? (
                    <TechStackContent />
                  ) : app === 'CONTACT' ? (
                    <ContactContent />
                  ) : (
                    <DefaultContent app={app} />
                  )}
                </div>
              </div>

              {/* Bottom HUD line */}
              <div className="pointer-events-none absolute bottom-0 left-0 z-40 h-px w-full bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

              {/* Corner accents */}
              <div className="pointer-events-none absolute left-2 top-2 z-50 h-4 w-4 border-l border-t border-orange-500/60 sm:left-3 sm:top-3" />

              <div className="pointer-events-none absolute right-2 top-2 z-50 h-4 w-4 border-r border-t border-orange-500/60 sm:right-3 sm:top-3" />

              <div className="pointer-events-none absolute bottom-2 left-2 z-50 h-4 w-4 border-b border-l border-blue-400/50 sm:bottom-3 sm:left-3" />

              <div className="pointer-events-none absolute bottom-2 right-2 z-50 h-4 w-4 border-b border-r border-blue-400/50 sm:bottom-3 sm:right-3" />
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}