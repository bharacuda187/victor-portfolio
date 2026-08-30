'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import DesktopBackground from './DesktopBackground';
import DesktopIcons from './DesktopIcons';
import FloatingWidget from './FloatingWidget';
import Typewriter from './Typewriter';

type GLTFResult = GLTF & {
  nodes: {
    Sphere_0: THREE.Mesh;
    Sphere_1: THREE.Mesh;
    Sphere_2: THREE.Mesh;
  };
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial;
    ['Material.002']: THREE.MeshStandardMaterial;
    ['Material.003']: THREE.MeshStandardMaterial;
  };
};

interface CyberOrbProps {
  active: boolean;
  onClick: () => void;
}

interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
}

interface ChatApiResponse {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
  error?: string;
}

function CyberOrb({ active, onClick }: CyberOrbProps) {
  const { nodes } = useGLTF('/media/robobit.glb') as unknown as GLTFResult;

  const MODEL_CONFIG = {
    rotation: [Math.PI / -2.5, 0, 0] as [number, number, number],
    position: [0, 0, 0] as [number, number, number],
    scale: 1.2,
  };

  const ORBIT_CONFIG = {
    rotateSpeed: 0.9,
    dampingFactor: 0.08,
    zoomSpeed: 0.6,
    minDistance: 2.5,
    maxDistance: 5,
  };

  return (
    <group
      scale={MODEL_CONFIG.scale}
      rotation={MODEL_CONFIG.rotation}
      position={MODEL_CONFIG.position}
      dispose={null}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <mesh geometry={nodes.Sphere_0.geometry}>
        <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.5} />
      </mesh>

      <mesh geometry={nodes.Sphere_1.geometry}>
        <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.3} />
      </mesh>

      <mesh geometry={nodes.Sphere_2.geometry}>
        <meshStandardMaterial color="#030303" metalness={0.1} roughness={0.1} />
      </mesh>

      <OrbitControls
        enableRotate
        enableZoom={active}
        enablePan={false}
        enableDamping
        dampingFactor={ORBIT_CONFIG.dampingFactor}
        rotateSpeed={ORBIT_CONFIG.rotateSpeed}
        zoomSpeed={ORBIT_CONFIG.zoomSpeed}
        minDistance={ORBIT_CONFIG.minDistance}
        maxDistance={ORBIT_CONFIG.maxDistance}
      />
    </group>
  );
}

useGLTF.preload('/media/robobit.glb');

interface HeroSectionProps {
  onProfileClick: () => void;
  profileActive: boolean;
}

export default function HeroSection({ onProfileClick, profileActive }: HeroSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm CORE, Victor's digital assistant. What would you like to know about Victor, his work, projects, or technical experience?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  /*
   * Show the greeting after the hero finishes initializing.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  /*
   * Automatically scroll to the newest message.
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [messages, isTyping]);

  /*
   * Send a message to the Cloudflare Worker.
   */
  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isTyping) return;

    setMessages((current) => [
      ...current,
      {
        role: 'user',
        content: trimmedMessage,
      },
    ]);

    setMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      const data = (await response.json()) as ChatApiResponse;

      if (!response.ok) {
        throw new Error(data.error || 'CORE request failed.');
      }

      const aiMessage = data.choices?.[0]?.message?.content?.trim();

      if (!aiMessage) {
        throw new Error('CORE returned an empty response.');
      }

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: aiMessage,
        },
      ]);
    } catch (error) {
      console.error('CORE request failed:', error);

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            "I'm having trouble connecting to my AI core right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-screen shrink-0 overflow-hidden bg-black text-white"
    >
      <DesktopBackground />

      <DesktopIcons onModalChange={setModalOpen} />

      {/* =========================================================
          HERO CONTENT
      ========================================================= */}

      <div className="relative z-10 flex h-full items-start justify-center px-4 pt-24 md:items-center md:px-12 md:pt-0">
        <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-12">
          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div className="text-center font-mono md:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-[10px] tracking-[0.2em] text-blue-400 uppercase sm:text-xs md:text-sm"
            >
              <Typewriter text="SYS.INIT // CORE_ARCHIVE" delay={0.3} />
            </motion.p>

            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.95,
                filter: 'blur(10px)',
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: 0.9,
                delay: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-white uppercase sm:text-4xl md:mt-6 md:text-6xl"
            >
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 20px rgba(249,115,22,0.3)',
                    '0 0 40px rgba(249,115,22,0.6)',
                    '0 0 20px rgba(249,115,22,0.3)',
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                DIGITAL WORKSPACE
                <br />& EXPERIMENTS
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 1.9,
              }}
              className="mt-4 text-sm font-semibold tracking-wider text-orange-500 uppercase sm:text-base md:mt-6 md:text-xl"
            >
              FULL STACK & SYSTEMS ARCHITECTURE
            </motion.p>

            <motion.p
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
                delay: 2.15,
              }}
              className="mt-2 text-[9px] tracking-widest text-gray-400 sm:text-xs md:mt-3 md:text-sm"
            >
              WEB APPLICATIONS • GAME ENGINES • INFRASTRUCTURE
            </motion.p>
          </div>

          {/* =====================================================
              RIGHT SIDE: CORE
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: 'blur(10px)',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            }}
            transition={{
              duration: 0.9,
              delay: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center rounded-lg p-2 font-mono sm:max-w-sm sm:p-4 md:max-w-md md:p-6"
          >
            {/* =================================================
                OUTER RETICLES
            ================================================= */}

            <motion.div
              className="absolute h-40 w-40 rounded-full border border-dashed border-blue-400/60 sm:h-48 sm:w-48"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <motion.div
              className="absolute h-32 w-32 rounded-full border border-orange-500/40 sm:h-36 sm:w-36"
              animate={{ rotate: -360 }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* =================================================
                CORE CONTAINER
            ================================================= */}

            <div className="relative z-10 h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96">
              {/* =================================================
                  AI GREETING
              ================================================= */}

              {showGreeting && !aiOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                    scale: 0.92,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute -top-8 left-1/2 z-30 w-64 -translate-x-1/2 rounded-lg border border-orange-500/40 bg-black/90 p-4 font-mono text-xs text-gray-200 shadow-[0_0_30px_rgba(249,115,22,0.15)] backdrop-blur-md sm:-top-4 sm:w-72"
                >
                  <div className="mb-2 flex items-center gap-2 text-[9px] tracking-[0.2em] text-orange-500 uppercase">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
                    CORE ASSISTANT
                  </div>

                  <p className="leading-relaxed">
                    Hey! Welcome to Victor&apos;s digital workspace.
                  </p>

                  <p className="mt-2 text-gray-400">I&apos;m here if you need anything.</p>

                  <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-r border-b border-orange-500/40 bg-black/90" />
                </motion.div>
              )}

              {/* =================================================
                  ROBOT
              ================================================= */}

              <div className="absolute inset-0 z-10">
                <Canvas
                  frameloop={profileActive ? 'never' : 'always'}
                  camera={{
                    position: [0, 0, 4],
                    fov: 40,
                  }}
                  dpr={[1, 1.5]}
                  gl={{
                    antialias: true,
                    alpha: true,
                  }}
                >
                  <ambientLight intensity={0.8} />

                  <directionalLight position={[3, 3, 3]} intensity={2} />

                  <CyberOrb active={!profileActive} onClick={() => setAiOpen(true)} />

                  <Environment preset="city" />
                </Canvas>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =========================================================
          CORE CHAT PANEL
          Fixed to viewport so conversation can NEVER resize Hero.
      ========================================================= */}

      {aiOpen && (
        <motion.div
          onWheel={(event) => {
            event.stopPropagation();
          }}
          initial={{
            opacity: 0,
            y: 12,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 12,
            scale: 0.96,
          }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed inset-x-3 top-[calc(50%+2rem)] z-[100] flex max-h-[calc(100dvh-6rem)] w-auto -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-orange-500/30 bg-black/95 font-mono shadow-[0_0_50px_rgba(249,115,22,0.12)] backdrop-blur-xl sm:inset-x-auto sm:top-1/2 sm:right-6 sm:max-h-[calc(100dvh-3rem)] sm:w-[380px] md:right-8"
        >
          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-orange-500 uppercase">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
                CORE ASSISTANT
              </div>

              <div className="mt-1 text-[9px] tracking-widest text-gray-500 uppercase">
                {isTyping ? 'PROCESSING' : 'ONLINE'}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAiOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded border border-white/10 text-gray-500 transition hover:border-orange-500/40 hover:text-orange-500"
              aria-label="Close AI assistant"
            >
              ×
            </button>
          </div>

          {/* =====================================================
              CONVERSATION
          ===================================================== */}

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5">
            {messages.map((msg, index) => (
              <motion.div
                key={`${msg.role}-${index}`}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className={
                  msg.role === 'assistant'
                    ? 'rounded-lg border border-white/5 bg-white/[0.03] p-3'
                    : 'ml-8 rounded-lg border border-orange-500/20 bg-orange-500/[0.05] p-3'
                }
              >
                <div
                  className={
                    msg.role === 'assistant'
                      ? 'mb-1 text-[8px] tracking-[0.2em] text-blue-400 uppercase'
                      : 'mb-1 text-[8px] tracking-[0.2em] text-orange-500 uppercase'
                  }
                >
                  {msg.role === 'assistant' ? 'CORE' : 'YOU'}
                </div>

                <div className="text-xs leading-relaxed break-words text-gray-300">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,

                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">{children}</strong>
                      ),

                      em: ({ children }) => <em className="text-gray-200">{children}</em>,

                      ul: ({ children }) => (
                        <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>
                      ),

                      li: ({ children }) => <li className="pl-1">{children}</li>,

                      code: ({ children }) => (
                        <code className="rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-orange-300">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </motion.div>
            ))}

            {/* =================================================
                TYPING INDICATOR
            ================================================= */}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border border-white/5 bg-white/[0.03] p-3"
              >
                <div className="mb-1 text-[8px] tracking-[0.2em] text-blue-400 uppercase">CORE</div>

                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />

                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"
                    style={{
                      animationDelay: '150ms',
                    }}
                  />

                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"
                    style={{
                      animationDelay: '300ms',
                    }}
                  />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* =====================================================
              INPUT
          ===================================================== */}

          <div className="shrink-0 border-t border-white/10 p-3">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isTyping}
                placeholder={isTyping ? 'CORE PROCESSING...' : 'Ask me something...'}
                className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-gray-600 disabled:cursor-wait"
              />

              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!message.trim() || isTyping}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-orange-500 text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Send message"
              >
                →
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <FloatingWidget />
    </section>
  );
}
