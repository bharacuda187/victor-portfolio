'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import InterfaceTransition from './InterfaceTransition';
import HorizontalScroll from '../layout/HorizontalScroll';
import HeroSection from '../hero/HeroSection';
import AeroFlipTransition from '../layout/AeroFlipTransition';
import ProfilePage from '../profile/ProfilePage';
import StacksPage from '../stacks/StacksPage';
import DynamicNavbar from '../hero/DynamicNavbar';
import ProjectsPage from '../projects/ProjectsPage';
import ITSystemsPage from '../content/ITSystemsPage';
import DigitalWorkspacePage from '../content/DigitalWorkspacePage';
import ContactPage from '../content/ContactPage';
import LikhaPage from '../content/LikhaPage';

type ActivePage =
  | 'home'
  | 'profile'
  | 'stacks'
  | 'projects'
  | 'likha'
  | 'it-systems'
  | 'digital-workspace'
  | 'contact';

const systemChecks = ['CORE ENGINE', 'NEURAL INTERFACE', 'NETWORK LINK', 'DISPLAY MATRIX'];

export default function BootSequence() {
  const [bootComplete, setBootComplete] = useState(false);
  const [interfaceEntered, setInterfaceEntered] = useState(false);
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [coreActive, setCoreActive] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setPhase(1);
      }, 500),

      setTimeout(() => {
        setPhase(2);
      }, 1200),

      setTimeout(() => {
        setPhase(3);
      }, 2000),

      setTimeout(() => {
        setPhase(4);
      }, 2800),

      setTimeout(() => {
        setPhase(5);
      }, 3500),

      setTimeout(() => {
        setProgress(100);
      }, 3900),

      setTimeout(() => {
        setBootComplete(true);
      }, 4700),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (phase === 0) {
      setProgress(0);
    }

    if (phase === 1) {
      setProgress(18);
    }

    if (phase === 2) {
      setProgress(42);
    }

    if (phase === 3) {
      setProgress(64);
    }

    if (phase === 4) {
      setProgress(82);
    }

    if (phase === 5) {
      setProgress(94);
    }
  }, [phase]);

  const goHome = () => {
    setActivePage('home');
  };

  const goProfile = () => {
    setActivePage('profile');
  };

  const goStacks = () => {
    setActivePage('stacks');
  };

  const goProjects = () => {
    setActivePage('projects');
  };

  const goLikha = () => {
    setActivePage('likha');
  };

  const goITSystems = () => {
    setActivePage('it-systems');
  };

  const goDigitalWorkspace = () => {
    setActivePage('digital-workspace');
  };

  const goContact = () => {
    setActivePage('contact');
  };

  const isBackPage = activePage !== 'home';

  return (
    <>
      <AnimatePresence>
        {!interfaceEntered && (
          <motion.main
            initial={{ opacity: 1 }}
            animate={{
              opacity: bootComplete ? 0 : 1,
            }}
            transition={{
              duration: 0.7,
              ease: 'easeInOut',
            }}
            className="fixed inset-0 z-[999] flex min-h-screen items-center justify-center overflow-hidden bg-black text-white"
          >
            {/* =====================================================
BACKGROUND GRID
===================================================== */}

            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                  backgroundSize: '60px 60px',
                }}
              />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08),transparent_55%)]" />

              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.025)_50%)] bg-[length:100%_4px]" />
            </div>

            {/* =====================================================
            SCANNING LINE
        ===================================================== */}

            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: '100vh' }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="pointer-events-none absolute right-0 left-0 z-10 h-px bg-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.5)]"
            />

            {/* =====================================================
            MAIN SPLASH
        ===================================================== */}

            <div className="relative z-20 w-full max-w-5xl px-8">
              {/* TOP SYSTEM BAR */}

              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{
                  opacity: phase >= 1 ? 1 : 0,
                  y: phase >= 1 ? 0 : -15,
                }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[9px] tracking-[0.25em] text-gray-600"
              >
                <span>// VICTOR SYSTEMS</span>

                <span>
                  SYS_ID: <span className="text-orange-500">VT-01</span>
                </span>
              </motion.div>

              {/* =================================================
              MAIN LOGO
          ================================================= */}

              <div className="relative">
                <AnimatePresence>
                  {phase >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6 }}
                      className="mb-5 h-px w-24 origin-left bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -30,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    opacity: phase >= 1 ? 1 : 0,
                    x: phase >= 1 ? 0 : -30,
                    filter: phase >= 1 ? 'blur(0px)' : 'blur(8px)',
                  }}
                  transition={{
                    duration: 0.7,
                  }}
                  className="font-mono text-[11px] tracking-[0.45em] text-orange-500"
                >
                  DIGITAL OPERATING ENVIRONMENT
                </motion.div>

                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 20,
                    filter: 'blur(12px)',
                  }}
                  animate={{
                    opacity: phase >= 2 ? 1 : 0,
                    y: phase >= 2 ? 0 : 20,
                    filter: phase >= 2 ? 'blur(0px)' : 'blur(12px)',
                  }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeOut',
                  }}
                  className="relative mt-3 font-mono text-6xl font-bold tracking-[-0.06em] text-white sm:text-8xl"
                >
                  <span className="relative">
                    VICTOR
                    <span className="text-orange-500"> OS</span>
                    {/* GLITCH LAYER */}
                    <motion.span
                      animate={{
                        opacity: [0, 0, 0.8, 0, 0.5, 0],
                        x: [0, -5, 4, -2, 3, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 2.5,
                      }}
                      className="absolute inset-0 text-orange-500"
                    >
                      VICTOR OS
                    </motion.span>
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: phase >= 2 ? 1 : 0,
                  }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-3 font-mono text-[9px] tracking-[0.35em] text-gray-600"
                >
                  WEB DEVELOPMENT • IT SYSTEMS • DIGITAL SOLUTIONS
                </motion.div>
              </div>

              {/* =================================================
              SYSTEM CHECKS
          ================================================= */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: phase >= 3 ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                className="mt-14 grid max-w-xl grid-cols-2 gap-x-8 gap-y-3"
              >
                {systemChecks.map((item, index) => {
                  const active = phase >= 3 + index * 0.4;

                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: active ? 1 : 0.25,
                        x: active ? 0 : -10,
                      }}
                      transition={{ duration: 0.35 }}
                      className="flex items-center gap-3 font-mono text-[8px] tracking-[0.2em]"
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          active
                            ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.9)]'
                            : 'bg-gray-700'
                        }`}
                      />

                      <span className={active ? 'text-gray-300' : 'text-gray-700'}>{item}</span>

                      {active && <span className="ml-auto text-orange-500">ONLINE</span>}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* =================================================
              PROGRESS
          ================================================= */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: phase >= 3 ? 1 : 0,
                }}
                className="mt-10 max-w-xl"
              >
                <div className="mb-2 flex justify-between font-mono text-[7px] tracking-[0.2em] text-gray-600">
                  <span>CORE INITIALIZATION</span>

                  <span className="text-orange-500">{progress.toString().padStart(3, '0')}%</span>
                </div>

                <div className="h-[2px] w-full overflow-hidden bg-white/10">
                  <motion.div
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeOut',
                    }}
                    className="h-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]"
                  />
                </div>
              </motion.div>

              {/* =================================================
              FINAL MESSAGE
          ================================================= */}

              <AnimatePresence>
                {phase >= 5 && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="mt-8 flex items-center gap-3 font-mono text-[9px] tracking-[0.25em]"
                  >
                    <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]" />

                    <span className="text-gray-400">SYSTEM READY</span>

                    <span className="text-orange-500">// ACCESS GRANTED</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* =================================================
              FOOTER
          ================================================= */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: phase >= 1 ? 1 : 0,
                }}
                className="mt-16 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[7px] tracking-[0.2em] text-gray-700"
              >
                <span>VERSION 1.0.26</span>

                <span>PHILIPPINES // EARTH</span>

                <span>SECURE CONNECTION</span>
              </motion.div>
            </div>

            {/* =====================================================
            CORNER HUD
        ===================================================== */}

            <div className="pointer-events-none absolute top-6 left-6 h-10 w-10 border-t border-l border-orange-500/40" />

            <div className="pointer-events-none absolute top-6 right-6 h-10 w-10 border-t border-r border-orange-500/40" />

            <div className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 border-b border-l border-orange-500/40" />

            <div className="pointer-events-none absolute right-6 bottom-6 h-10 w-10 border-r border-b border-orange-500/40" />
          </motion.main>
        )}
      </AnimatePresence>

      {/* =========================================================
      TRANSITION INTO DESKTOP
  ========================================================= */}

      <InterfaceTransition
        active={bootComplete && !interfaceEntered}
        onEnter={() => setInterfaceEntered(true)}
      />

      {/* =========================================================
      MAIN DESKTOP
  ========================================================= */}

      {interfaceEntered && (
        <div className="relative h-screen w-screen overflow-hidden">
          <HorizontalScroll>
            <AeroFlipTransition
              flipped={isBackPage}
              front={<HeroSection onProfileClick={goProfile} profileActive={false} />}
              back={
                <>
                  {activePage === 'profile' && <ProfilePage onHomeClick={goHome} />}

                  {activePage === 'stacks' && <StacksPage />}

                  {activePage === 'projects' && (
                    <ProjectsPage
                      onITSystemsClick={goITSystems}
                      onDigitalWorkspaceClick={goDigitalWorkspace}
                      onLikhaClick={goLikha}
                    />
                  )}

                  {activePage === 'likha' && <LikhaPage />}

                  {activePage === 'it-systems' && <ITSystemsPage />}

                  {activePage === 'digital-workspace' && <DigitalWorkspacePage />}

                  {activePage === 'contact' && <ContactPage />}
                </>
              }
            />
          </HorizontalScroll>

          {/* ONE PERSISTENT NAVBAR */}

          <DynamicNavbar
            coreActive={coreActive}
            setCoreActive={setCoreActive}
            onHomeClick={goHome}
            onProfileClick={goProfile}
            onStackClick={goStacks}
            onProjectsClick={goProjects}
            onContactClick={goContact}
          />
        </div>
      )}
    </>
  );
}
