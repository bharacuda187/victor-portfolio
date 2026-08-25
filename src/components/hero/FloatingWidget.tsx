'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function FloatingWidget() {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      {/* =====================================================
          MOBILE FLOATING SYSTEM BUTTON
      ===================================================== */}

      <motion.div
        drag
        dragMomentum={false}
        whileTap={{ scale: 0.92 }}
        className="fixed right-4 bottom-20 z-50 md:hidden"
      >
        <AnimatePresence mode="wait">
          {!expanded ? (
            /* =================================================
               COLLAPSED ASSISTIVE TOUCH
            ================================================= */

            <motion.button
              key="collapsed"
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={() => setExpanded(true)}
              className="
                relative
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-orange-500/40
                bg-black/70
                backdrop-blur-xl
                shadow-[0_0_20px_rgba(249,115,22,0.25)]
              "
              aria-label="Open system status"
            >
              {/* OUTER RING */}

              <motion.span
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="
                  absolute
                  inset-1
                  rounded-full
                  border
                  border-dashed
                  border-blue-400/50
                "
              />

              {/* CORE */}

              <motion.span
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [0.85, 1, 0.85],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="
                  h-3
                  w-3
                  rounded-full
                  bg-orange-500
                  shadow-[0_0_12px_rgba(249,115,22,0.9)]
                "
              />
            </motion.button>
          ) : (
            /* =================================================
               EXPANDED SYSTEM PANEL
            ================================================= */

            <motion.div
              key="expanded"
              initial={{
                opacity: 0,
                scale: 0.85,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.85,
                y: 10,
              }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                w-[210px]
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-black/75
                font-mono
                backdrop-blur-xl
                shadow-[0_0_30px_rgba(0,0,0,0.5)]
              "
            >
              {/* =================================================
                  SYSTEM TAB HEADER
              ================================================= */}

              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 py-2">
                <div className="flex items-center gap-2">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-orange-500
                      shadow-[0_0_8px_rgba(249,115,22,0.8)]
                    "
                  />

                  <span className="text-[9px] tracking-[0.2em] text-gray-400 uppercase">
                    SYSTEM // STATUS
                  </span>
                </div>

                <button
                  onClick={() => setExpanded(false)}
                  className="
                    text-[10px]
                    tracking-widest
                    text-gray-500
                    transition
                    hover:text-orange-500
                  "
                  aria-label="Collapse system status"
                >
                  −
                </button>
              </div>

              {/* =================================================
                  STATUS
              ================================================= */}

              <div className="p-3">

                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [0.9, 1, 0.9],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-blue-400
                      shadow-[0_0_10px_rgba(96,165,250,0.8)]
                    "
                  />

                  <span className="text-sm font-semibold tracking-[0.15em] text-blue-400 uppercase">
                    ONLINE
                  </span>
                </div>

                {/* DIVIDER */}

                <div className="my-2 h-px bg-gradient-to-r from-orange-500/50 via-blue-400/20 to-transparent" />

                {/* STACK */}

                <div className="flex items-center justify-between">
                  <span className="text-[8px] tracking-widest text-gray-500 uppercase">
                    STACK
                  </span>

                  <span className="text-[9px] tracking-wider text-gray-300">
                    NEXT.JS • UNITY
                  </span>
                </div>
              </div>

              {/* BOTTOM ACCENT */}

              <div className="h-px w-full bg-gradient-to-r from-orange-500 via-blue-400/50 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* =====================================================
          DESKTOP VERSION
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          filter: 'blur(6px)',
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        }}
        transition={{
          duration: 0.7,
          delay: 2.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          absolute
          right-10
          bottom-10
          z-20
          hidden
          w-[230px]
          overflow-hidden
          rounded-xl
          border
          border-white/10
          bg-black/60
          font-mono
          backdrop-blur-xl
          md:block
        "
      >
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />

            <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">
              SYSTEM // STATUS
            </span>
          </div>

          <span className="text-[8px] tracking-widest text-blue-400">
            01
          </span>
        </div>

        {/* CONTENT */}

        <div className="p-4">
          <div className="flex items-center gap-2">
            <motion.span
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                h-2
                w-2
                rounded-full
                bg-blue-400
                shadow-[0_0_10px_rgba(96,165,250,0.8)]
              "
            />

            <span className="text-base font-semibold tracking-[0.15em] text-blue-400 uppercase">
              ONLINE
            </span>
          </div>

          <div className="my-2 h-px bg-gradient-to-r from-orange-500/50 via-blue-400/20 to-transparent" />

          <div className="flex items-center justify-between">
            <span className="text-[9px] tracking-widest text-gray-500 uppercase">
              STACK
            </span>

            <span className="text-[10px] tracking-wider text-gray-300">
              NEXT.JS • UNITY
            </span>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-orange-500 via-blue-400/50 to-transparent" />
      </motion.div>
    </>
  );
}