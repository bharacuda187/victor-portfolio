'use client';

import { motion } from 'motion/react';

export default function LikhaPage() {
  return (
    <section className="relative h-full w-full overflow-hidden bg-black text-white">
      {/* =========================================================
BACKGROUND GRID
========================================================= */}{' '}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `               linear-gradient(rgba(249,115,22,0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96,165,250,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />{' '}
      </div>
      {/* Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
      {/* =========================================================
      SCROLLABLE CONTENT
  ========================================================= */}
      <div
        data-vertical-scroll
        className="relative z-10 h-full overflow-y-auto overscroll-contain px-6 pt-28 pb-24 md:px-12"
      >
        <div className="mx-auto max-w-6xl">
          {/* =====================================================
          HEADER
      ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
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
          >
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-orange-500">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]" />
              PROJECT ARCHIVE // 001
            </div>

            <h1 className="mt-5 text-5xl font-extrabold tracking-tight uppercase md:text-7xl">
              LIKHA
              <br />
              <span className="text-orange-500">SURVIVAL FRAMEWORK</span>
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4 font-mono text-[10px] tracking-[0.2em]">
              <span className="text-orange-500">● IN DEVELOPMENT</span>

              <span className="text-gray-600">GAME DEVELOPMENT</span>

              <span className="text-gray-600">UNITY // C#</span>
            </div>

            <p className="mt-6 max-w-3xl font-mono text-sm leading-7 text-gray-400">
              A first-person survival experience focused on exploration, systems, inventory,
              environmental interaction, and long-term survival mechanics.
            </p>
          </motion.div>

          {/* =====================================================
          PROJECT STATUS
      ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="mt-10 grid gap-3 font-mono text-xs md:grid-cols-4"
          >
            <StatusCard label="ENGINE" value="UNITY" />

            <StatusCard label="LANGUAGE" value="C#" />

            <StatusCard label="PROJECT TYPE" value="SURVIVAL GAME" />

            <StatusCard label="STATUS" value="ACTIVE DEVELOPMENT" active />
          </motion.div>

          {/* =====================================================
          GAMEPLAY RECORDING
      ===================================================== */}
          <section className="mt-14">
            <div className="flex items-end justify-between border-b border-white/10 pb-4">
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-orange-500">
                  DEVELOPMENT FEED // 01
                </div>

                <h2 className="mt-2 text-2xl font-bold uppercase md:text-3xl">
                  Gameplay Recording
                </h2>

                <p className="mt-2 max-w-2xl font-mono text-[9px] tracking-[0.15em] text-gray-600">
                  CURRENT BUILD // FIRST-PERSON SURVIVAL // DEVELOPMENT PREVIEW
                </p>
              </div>

              <div className="hidden font-mono text-[9px] tracking-widest text-gray-600 md:block">
                LIVE BUILD FEED
              </div>
            </div>

            {/* Video Frame */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
              }}
              className="group relative mt-8 overflow-hidden rounded-xl border border-orange-500/20 bg-black shadow-[0_0_60px_rgba(249,115,22,0.05)]"
            >
              {/* Corner Accents */}
              <div className="absolute top-3 left-3 z-20 h-8 w-8 border-t border-l border-orange-500/70" />
              <div className="absolute top-3 right-3 z-20 h-8 w-8 border-t border-r border-blue-400/60" />
              <div className="absolute bottom-3 left-3 z-20 h-8 w-8 border-b border-l border-blue-400/60" />
              <div className="absolute right-3 bottom-3 z-20 h-8 w-8 border-r border-b border-orange-500/70" />

              {/* Browser / Build Header */}
              <div className="flex h-10 items-center gap-3 border-b border-white/10 bg-black/90 px-4">
                <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />

                <span className="font-mono text-[8px] tracking-[0.25em] text-gray-600">
                  LIKHA://GAMEPLAY_BUILD
                </span>

                <span className="ml-auto font-mono text-[8px] tracking-widest text-orange-500">
                  BUILD FEED
                </span>
              </div>

              {/* Video */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <video
                  src="/media/projects/likha/likha-gameplay.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                />

                {/* Scan Line */}
                <motion.div
                  animate={{
                    x: ['-100%', '100%'],
                    opacity: [0, 0.35, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatDelay: 6,
                    ease: 'linear',
                  }}
                  className="pointer-events-none absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"
                />
              </div>

              {/* Video Metadata */}
              <div className="grid border-t border-white/10 md:grid-cols-3">
                <div className="border-b border-white/10 p-4 md:border-r md:border-b-0">
                  <div className="font-mono text-[8px] tracking-[0.25em] text-gray-600">BUILD</div>

                  <div className="mt-2 font-mono text-xs text-orange-500">DEVELOPMENT</div>
                </div>

                <div className="border-b border-white/10 p-4 md:border-r md:border-b-0">
                  <div className="font-mono text-[8px] tracking-[0.25em] text-gray-600">VIEW</div>

                  <div className="mt-2 font-mono text-xs text-gray-300">FIRST PERSON</div>
                </div>

                <div className="p-4">
                  <div className="font-mono text-[8px] tracking-[0.25em] text-gray-600">
                    DEVELOPMENT
                  </div>

                  <div className="mt-2 font-mono text-xs text-green-400">● ACTIVE</div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* =====================================================
          ABOUT LIKHA
      ===================================================== */}
          <div className="mt-16">
            <SectionHeader
              index="02"
              title="ABOUT THE PROJECT"
              subtitle="VISION // DESIGN // DEVELOPMENT"
            />

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <p className="max-w-4xl text-sm leading-8 text-gray-400">
                Likha is a long-term survival game project built around the idea of creating a
                persistent, systems-driven world. The goal is to combine exploration, environmental
                interaction, inventory management, survival mechanics, and responsive first-person
                movement into one cohesive experience.
              </p>

              <p className="mt-5 max-w-4xl text-sm leading-8 text-gray-500">
                The project is being developed from the ground up, with each gameplay system
                designed to become part of a larger survival framework rather than isolated
                mechanics.
              </p>
            </div>
          </div>

          {/* =====================================================
          CURRENT SYSTEMS
      ===================================================== */}
          <div className="mt-16">
            <SectionHeader
              index="03"
              title="CURRENT SYSTEMS"
              subtitle="GAMEPLAY // FRAMEWORK // IMPLEMENTATION"
            />

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <SystemCard
                title="PLAYER"
                status="ONLINE"
                items={[
                  'First-person movement',
                  'Walking / sprinting',
                  'Jumping',
                  'Camera control',
                  'Gravity',
                ]}
              />

              <SystemCard
                title="INVENTORY"
                status="ACTIVE"
                items={[
                  'Inventory architecture',
                  'Equipment system',
                  'Backpack integration',
                  'Universal gear slots',
                  'Item management',
                ]}
              />

              <SystemCard
                title="WORLD"
                status="DEVELOPMENT"
                items={[
                  'Environmental interaction',
                  'Exploration systems',
                  'World structure',
                  'Survival framework',
                  'Future expansion',
                ]}
              />
            </div>
          </div>

          {/* =====================================================
          DEVELOPMENT DIRECTION
      ===================================================== */}
          <div className="mt-16">
            <SectionHeader
              index="04"
              title="DEVELOPMENT DIRECTION"
              subtitle="ROADMAP // EXPANSION // SURVIVAL"
            />

            <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
              <RoadmapRow index="01" title="CORE MOVEMENT" status="COMPLETE" />

              <RoadmapRow index="02" title="INVENTORY & EQUIPMENT" status="ACTIVE" />

              <RoadmapRow index="03" title="WORLD INTERACTION" status="DEVELOPMENT" />

              <RoadmapRow index="04" title="SURVIVAL SYSTEMS" status="PLANNED" />

              <RoadmapRow index="05" title="WORLD EXPANSION" status="PLANNED" last />
            </div>
          </div>

          {/* =====================================================
          FINAL STATUS
      ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="mt-20 border-t border-white/10 pt-10 text-center"
          >
            <div className="font-mono text-[10px] tracking-[0.35em] text-gray-600">
              PROJECT ARCHIVE // 001
            </div>

            <div className="mt-3 font-mono text-xs tracking-[0.25em] text-orange-500">
              ● LIKHA DEVELOPMENT STATUS: ACTIVE
            </div>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500">
              A long-term game development project focused on building a complete survival framework
              from the ground up.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
STATUS CARD
============================================================= */

function StatusCard({
  label,
  value,
  active = false,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-4">
      {' '}
      <div className="font-mono text-[9px] tracking-[0.25em] text-gray-600">{label} </div>
      <div className={`mt-2 ${active ? 'text-green-400' : 'text-gray-300'}`}>
        {active && '● '}
        {value}
      </div>
    </div>
  );
}

/* =============================================================
SECTION HEADER
============================================================= */

function SectionHeader({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      {' '}
      <div className="font-mono text-[10px] tracking-[0.3em] text-orange-500">{index} </div>
      <h2 className="mt-2 text-2xl font-bold tracking-tight uppercase md:text-3xl">{title}</h2>
      <div className="mt-2 font-mono text-[9px] tracking-[0.25em] text-gray-600">{subtitle}</div>
    </div>
  );
}

/* =============================================================
SYSTEM CARD
============================================================= */

function SystemCard({ title, status, items }: { title: string; status: string; items: string[] }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-orange-500/30"
    >
      {' '}
      <div className="flex items-center justify-between">
        {' '}
        <div className="font-mono text-[10px] tracking-[0.25em] text-blue-400">SYSTEM </div>
        <div className="font-mono text-[8px] tracking-widest text-orange-500">● {status}</div>
      </div>
      <h3 className="mt-3 text-lg font-bold uppercase">{title}</h3>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 font-mono text-xs text-gray-400">
            <span className="h-1 w-1 shrink-0 rounded-full bg-orange-500" />
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* =============================================================
ROADMAP ROW
============================================================= */

function RoadmapRow({
  index,
  title,
  status,
  last = false,
}: {
  index: string;
  title: string;
  status: string;
  last?: boolean;
}) {
  const complete = status === 'COMPLETE';
  const active = status === 'ACTIVE';

  return (
    <div
      className={`flex items-center justify-between gap-4 px-5 py-5 ${
        !last ? 'border-b border-white/10' : ''
      }`}
    >
      {' '}
      <div className="flex items-center gap-4">
        {' '}
        <span className="font-mono text-[9px] tracking-widest text-gray-600">{index} </span>
        <span className="font-mono text-xs tracking-wider text-gray-300">{title}</span>
      </div>
      <span
        className={`font-mono text-[8px] tracking-[0.2em] ${
          complete ? 'text-green-400' : active ? 'text-orange-500' : 'text-gray-600'
        }`}
      >
        {complete && '● '}
        {active && '● '}
        {status}
      </span>
    </div>
  );
}
