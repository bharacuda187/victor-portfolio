'use client';

import { motion } from 'motion/react';

export default function DigitalWorkspacePage() {
  return (
    <section className="relative h-full w-full overflow-hidden bg-black text-white">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(96,165,250,0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249,115,22,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />

      {/* Scrollable Content */}
      <div
        data-vertical-scroll
        className="relative z-10 h-full overflow-y-auto overscroll-contain px-6 pt-28 pb-24 md:px-12"
      >
        <div className="mx-auto max-w-6xl">
          {/* =========================================================
              HEADER
          ========================================================= */}
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
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-blue-400">
              <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
              SYSTEM ARCHIVE // 002
            </div>

            <h1 className="mt-5 max-w-5xl text-4xl font-extrabold tracking-tight uppercase md:text-6xl">
              DIGITAL
              <br />
              <span className="text-orange-500">WORKSPACE</span>
            </h1>

            <p className="mt-6 max-w-3xl font-mono text-sm leading-7 text-gray-400">
              A personal digital workspace designed as an interactive interface rather than a
              traditional portfolio. Built to combine web development, system-inspired UI, motion,
              3D visualization, and experimental interaction.
            </p>
          </motion.div>
          {/* =========================================================
              PROJECT STATUS
          ========================================================= */}
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
            className="mt-10 grid gap-3 font-mono text-xs md:grid-cols-3"
          >
            <StatusCard label="PROJECT TYPE" value="PERSONAL DIGITAL WORKSPACE" />

            <StatusCard label="PRIMARY STACK" value="NEXT.JS + TYPESCRIPT" />

            <StatusCard label="STATUS" value="ACTIVE DEVELOPMENT" active />
          </motion.div>
          {/* Divider */}
          <div className="my-12 h-px bg-gradient-to-r from-blue-400/40 via-white/10 to-transparent" />
          {/* =========================================================
              PROJECT CONCEPT
          ========================================================= */}
          <SectionHeader
            index="01"
            title="PROJECT CONCEPT"
            subtitle="IDENTITY // INTERFACE // EXPERIMENTATION"
          />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <InfoPanel
              title="BEYOND A PORTFOLIO"
              items={[
                'Interactive personal workspace',
                'System-inspired visual language',
                'Experimental interface architecture',
                'Project-driven content presentation',
              ]}
            />

            <InfoPanel
              title="DESIGN DIRECTION"
              items={[
                'Dark technical interface',
                'Orange / blue system accents',
                'Motion-driven transitions',
                'Minimal but information-dense UI',
              ]}
            />
          </div>
          {/* =========================================================
              WHY IT EXISTS
          ========================================================= */}
          <div className="mt-16">
            <SectionHeader
              index="02"
              title="WHY IT EXISTS"
              subtitle="PURPOSE // EXPERIENCE // ENGINEERING"
            />

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <p className="max-w-4xl text-sm leading-8 text-gray-400">
                The Digital Workspace was created to demonstrate how a portfolio can become a
                technical project of its own. Instead of presenting projects as static cards, the
                interface treats each area as part of a connected digital environment.
              </p>

              <p className="mt-5 max-w-4xl text-sm leading-8 text-gray-500">
                The system combines frontend engineering, visual design, animation, 3D rendering,
                navigation architecture, and performance considerations into a single interactive
                experience.
              </p>
            </div>
          </div>
          {/* =========================================================
              VISUAL ARCHIVE
          ========================================================= */}

          {/* =========================================================
    LIVE WEB TEMPLATE ARCHIVE
========================================================= */}
          <section className="mt-16">
            <div className="flex items-end justify-between border-b border-white/10 pb-4">
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-orange-500">
                  VISUAL ARCHIVE // 01
                </div>

                <h2 className="mt-2 text-2xl font-bold uppercase md:text-3xl">Previous Web Work</h2>

                <p className="mt-2 max-w-2xl font-mono text-[9px] tracking-[0.15em] text-gray-600">
                  LIVE TEMPLATES // WEB INTERFACES // DIGITAL EXPERIENCES
                </p>
              </div>

              <div className="hidden font-mono text-[9px] tracking-widest text-gray-600 md:block">
                LIVE DATA
              </div>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <LiveTemplate
                title="LIKHA MODERNA"
                category="BUSINESS / CORPORATE"
                description="Responsive business template built with Bootstrap, HTML5, CSS3 and JavaScript."
                src="/samples/likhamoderna/"
                accent="orange"
              />

              <LiveTemplate
                title="LIKHA APEX"
                category="MODERN WEB INTERFACE"
                description="Modern responsive web template focused on visual presentation and frontend interaction."
                src="/samples/likhaapex/"
                accent="blue"
              />

              <LiveTemplate
                title="LIKHA GAMING"
                category="GAMING / DIGITAL"
                description="Gaming-focused website concept featuring a bold visual interface and responsive layout."
                src="/samples/likhagaming/"
                accent="orange"
              />

              <LiveTemplate
                title="LIKHA RESTO"
                category="RESTAURANT / HOSPITALITY"
                description="Restaurant website template designed for menus, branding, content presentation and responsive browsing."
                src="/samples/likharesto/"
                accent="blue"
              />
            </div>
          </section>
          {/* =========================================================
              CURRENT STATE
          ========================================================= */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 border-t border-white/10 pt-10 text-center"
          >
            <div className="font-mono text-[10px] tracking-[0.35em] text-gray-600">
              SYSTEM ARCHIVE // 002
            </div>

            <div className="mt-3 font-mono text-xs tracking-[0.25em] text-green-400">
              ● WORKSPACE STATUS: ACTIVE
            </div>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500">
              A continuously evolving digital environment built to showcase technical capability,
              experimentation, and interactive web development.
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
      <div className="text-[9px] tracking-[0.25em] text-gray-600">{label}</div>

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
      <div className="font-mono text-[10px] tracking-[0.3em] text-blue-400">{index}</div>

      <h2 className="mt-2 text-2xl font-bold tracking-tight uppercase md:text-3xl">{title}</h2>

      <div className="mt-2 font-mono text-[9px] tracking-[0.25em] text-gray-600">{subtitle}</div>
    </div>
  );
}

/* =============================================================
   INFO PANEL
============================================================= */

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-blue-400/30">
      <div className="font-mono text-[10px] tracking-[0.25em] text-orange-500">MODULE</div>

      <h3 className="mt-2 text-lg font-bold uppercase">{title}</h3>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 font-mono text-xs text-gray-400">
            <span className="h-1 w-1 shrink-0 rounded-full bg-blue-400" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
function LiveTemplate({
  title,
  category,
  description,
  src,
  accent,
}: {
  title: string;
  category: string;
  description: string;
  src: string;
  accent: 'orange' | 'blue';
}) {
  const isOrange = accent === 'orange';

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      whileHover={{
        y: -5,
      }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
    >
      {/* Corner Accents */}
      <div
        className={`absolute top-2 left-2 z-30 h-6 w-6 border-t border-l ${
          isOrange ? 'border-orange-500/70' : 'border-blue-400/70'
        }`}
      />

      <div
        className={`absolute top-2 right-2 z-30 h-6 w-6 border-t border-r ${
          isOrange ? 'border-orange-500/40' : 'border-blue-400/40'
        }`}
      />

      <div
        className={`absolute bottom-2 left-2 z-30 h-6 w-6 border-b border-l ${
          isOrange ? 'border-orange-500/40' : 'border-blue-400/40'
        }`}
      />

      <div
        className={`absolute right-2 bottom-2 z-30 h-6 w-6 border-r border-b ${
          isOrange ? 'border-orange-500/70' : 'border-blue-400/70'
        }`}
      />

      {/* Browser Header */}
      <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-black/80 px-4">
        <span className="h-2 w-2 rounded-full bg-red-500/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
        <span className="h-2 w-2 rounded-full bg-green-500/70" />

        <div className="ml-3 flex-1 overflow-hidden">
          <div className="truncate font-mono text-[8px] tracking-[0.2em] text-gray-600">
            VICTOR_OS://ARCHIVE/{title.replaceAll(' ', '_')}
          </div>
        </div>

        <span
          className={`font-mono text-[8px] tracking-widest ${
            isOrange ? 'text-orange-500' : 'text-blue-400'
          }`}
        >
          LIVE
        </span>
      </div>

      {/* Live Website */}
      <div className="relative aspect-video overflow-hidden bg-white">
        <iframe
          src={src}
          title={`${title} live preview`}
          loading="lazy"
          className="h-full w-full border-0"
        />

        {/* Scan Overlay */}
        <motion.div
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.25, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 6,
            ease: 'linear',
          }}
          className={`pointer-events-none absolute top-0 left-0 z-20 h-px w-1/3 bg-gradient-to-r from-transparent ${
            isOrange ? 'via-orange-500/60' : 'via-blue-400/60'
          } to-transparent`}
        />
      </div>

      {/* Metadata */}
      <div className="border-t border-white/10 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              className={`font-mono text-[10px] tracking-[0.25em] ${
                isOrange ? 'text-orange-500' : 'text-blue-400'
              }`}
            >
              TEMPLATE // {title}
            </div>

            <h3 className="mt-2 font-mono text-lg font-bold tracking-wider">{title}</h3>

            <div className="mt-1 font-mono text-[8px] tracking-[0.2em] text-gray-600">
              {category}
            </div>
          </div>

          <div
            className={`font-mono text-[8px] tracking-widest ${
              isOrange ? 'text-orange-500' : 'text-blue-400'
            }`}
          >
            ● ONLINE
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] leading-5 text-gray-500">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {['HTML5', 'CSS3', 'BOOTSTRAP', 'JAVASCRIPT'].map((tech) => (
            <span
              key={tech}
              className="border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[7px] tracking-widest text-gray-500"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Full Demo */}
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-5 inline-flex border px-4 py-2 font-mono text-[8px] tracking-[0.2em] transition ${
            isOrange
              ? 'border-orange-500/30 text-orange-500 hover:bg-orange-500/10'
              : 'border-blue-400/30 text-blue-400 hover:bg-blue-400/10'
          }`}
        >
          OPEN FULL DEMO →
        </a>
      </div>
    </motion.article>
  );
}

/* =============================================================
   PROJECT SCREENSHOT
============================================================= */

function ProjectScreenshot({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
    >
      {/* Corner Accents */}
      <div className="absolute top-2 left-2 z-20 h-6 w-6 border-t border-l border-orange-500/60" />
      <div className="absolute top-2 right-2 z-20 h-6 w-6 border-t border-r border-blue-400/50" />
      <div className="absolute bottom-2 left-2 z-20 h-6 w-6 border-b border-l border-blue-400/50" />
      <div className="absolute right-2 bottom-2 z-20 h-6 w-6 border-r border-b border-orange-500/60" />

      {/* Screenshot */}
      <div className="relative aspect-video overflow-hidden bg-black">
        <img
          src={src}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />

        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

        {/* Scan Line */}
        <motion.div
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'linear',
          }}
          className="pointer-events-none absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"
        />
      </div>

      {/* Metadata */}
      <div className="border-t border-white/10 p-4">
        <div className="font-mono text-[9px] tracking-[0.25em] text-orange-500">{title}</div>

        <p className="mt-2 font-mono text-[10px] leading-5 text-gray-500">{description}</p>
      </div>
    </motion.article>
  );
}
