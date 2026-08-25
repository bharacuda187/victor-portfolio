'use client';

import { motion } from 'motion/react';

interface ProfilePageProps {
  onHomeClick: () => void;
}

export default function ProfilePage({ onHomeClick }: ProfilePageProps) {
  return (
    <section
      className="relative h-screen w-screen shrink-0 overflow-x-hidden overflow-y-auto bg-black text-white md:overflow-hidden"
      style={{
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
      }}
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-orange-500/5 blur-3xl md:h-96 md:w-96" />

        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl md:h-96 md:w-96" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* =========================================================
          PROFILE CONTENT
      ========================================================= */}

      <div className="relative z-10 flex min-h-full w-full items-start justify-center px-5 pt-28 pb-24 sm:px-8 md:h-full md:items-center md:px-8 md:pt-20 md:pb-0">
        <div className="grid w-full max-w-6xl gap-10 md:grid-cols-[280px_1fr] md:items-center">
          {/* =====================================================
              PROFILE PHOTO
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="mx-auto w-full max-w-[280px]"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-orange-500/30 bg-white/[0.03] shadow-[0_0_40px_rgba(249,115,22,0.05)]">
              {/* Corner accents */}

              <div className="absolute top-3 left-3 z-10 h-6 w-6 border-t border-l border-orange-500/60" />

              <div className="absolute top-3 right-3 z-10 h-6 w-6 border-t border-r border-orange-500/60" />

              <div className="absolute bottom-3 left-3 z-10 h-6 w-6 border-b border-l border-blue-400/50" />

              <div className="absolute right-3 bottom-3 z-10 h-6 w-6 border-r border-b border-blue-400/50" />

              {/* Profile image */}

              <div className="absolute inset-0">
                <img
                  src="/profile.jpg"
                  alt="Victor Atilano Tan Singco"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-black/20" />

                {/* Profile labels */}

                <div className="absolute bottom-5 left-5 z-10 font-mono">
                  <p className="text-[9px] tracking-[0.3em] text-orange-500">PROFILE IMAGE</p>

                  <p className="mt-2 text-[8px] tracking-widest text-gray-300">IDENTITY VERIFIED</p>
                </div>
              </div>

              {/* Scan line */}

              <motion.div
                animate={{
                  y: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="pointer-events-none absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"
              />
            </div>

            {/* Identity status */}

            <div className="mt-3 flex items-center justify-between font-mono text-[8px] text-gray-600">
              <span>IDENTITY // VAS-001</span>

              <span className="text-green-500/70">VERIFIED</span>
            </div>
          </motion.div>

          {/* =====================================================
              PROFILE INFORMATION
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="max-w-3xl"
          >
            {/* Section identifier */}

            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.3em] text-blue-400">
                USER PROFILE
              </span>

              <span className="h-px flex-1 bg-white/10" />

              <span className="hidden font-mono text-[8px] text-gray-600 sm:inline">
                VICTOR_OS // PROFILE
              </span>
            </div>

            {/* Name */}

            <h1 className="mt-5 font-mono text-3xl font-bold tracking-[0.08em] text-white sm:text-4xl md:text-6xl md:tracking-[0.12em]">
              VICTOR ATILANO
              <br />
              <span className="text-orange-500">TAN SINGCO</span>
            </h1>

            {/* Role */}

            <p className="mt-5 font-mono text-sm tracking-[0.2em] text-gray-400">
              FULL STACK DEVELOPER
            </p>

            {/* Description */}

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-gray-500">
              Systems builder focused on creating practical digital experiences, modern web
              applications, interactive interfaces, and immersive game systems.
            </p>

            {/* =================================================
                STATS
            ================================================= */}

            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ['ROLE', 'DEVELOPER'],
                ['FOCUS', 'SYSTEMS'],
                ['WEB', 'FULL STACK'],
                ['GAME', 'UNITY'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.025] p-3">
                  <p className="font-mono text-[8px] tracking-[0.2em] text-gray-600">{label}</p>

                  <p className="mt-2 font-mono text-[9px] font-bold text-gray-300">{value}</p>
                </div>
              ))}
            </div>

            {/* =================================================
                PHILOSOPHY
            ================================================= */}

            <div className="mt-6 rounded-xl border border-orange-500/15 bg-orange-500/[0.025] p-5">
              <p className="font-mono text-[9px] tracking-[0.25em] text-orange-400">
                DEVELOPMENT PHILOSOPHY
              </p>

              <p className="mt-3 text-xs leading-relaxed text-gray-500">
                Build with purpose. Learn continuously. Keep systems practical, immersive, and
                enjoyable to use.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM SYSTEM STATUS
      ========================================================= */}

      <div className="relative z-10 px-5 pb-6 sm:px-8 md:absolute md:right-8 md:bottom-6 md:left-8 md:px-0 md:pb-0">
        <div className="flex items-center gap-3 font-mono text-[8px]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />

          <span className="text-gray-600">PROFILE MODULE ONLINE</span>

          <span className="ml-auto hidden text-gray-700 sm:inline">
            VICTOR_OS // IDENTITY SYSTEM
          </span>
        </div>
      </div>
    </section>
  );
}
