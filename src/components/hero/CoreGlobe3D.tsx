'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { motion } from 'motion/react';
import * as THREE from 'three';

interface CoreGlobe3DProps {
  active: boolean;
  modalOpen?: boolean;
  profileActive?: boolean;
}

function Globe({ active, modalOpen }: { active: boolean; modalOpen: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (modalOpen) return;
    if (!meshRef.current) return;

    // Core rotation
    meshRef.current.rotation.y += delta * (active ? 0.22 : 0.08);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />

      <meshStandardMaterial
        color={active ? '#fb923c' : '#38bdf8'}
        wireframe
        transparent
        opacity={active ? 0.75 : 0.35}
      />
    </mesh>
  );
}

export default function CoreGlobe3D({
  active,
  modalOpen = false,
  profileActive = false,
}: CoreGlobe3DProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* =========================================================
          CORE GLOBE
      ========================================================= */}

      <motion.div
        initial={false}
        animate={{
          scale: active ? 1 : 0.92,
          opacity: profileActive ? 0.35 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 20,
        }}
        className="absolute inset-0"
      >
        <Canvas
          camera={{
            position: [0, 0, 3.2],
            fov: 40,
          }}
          gl={{
            alpha: true,
            antialias: true,
          }}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            background: 'transparent',
          }}
        >
          <ambientLight intensity={0.5} />

          <directionalLight position={[5, 5, 5]} intensity={1.2} />

          <Globe active={active} modalOpen={modalOpen} />
        </Canvas>
      </motion.div>

      {/* =========================================================
          CORE GLOW
      ========================================================= */}

      <motion.div
        initial={false}
        animate={{
          scale: active ? 1.05 : 0.95,
          opacity: active ? 0.8 : 0.35,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 20,
        }}
        className="pointer-events-none absolute inset-[12%] rounded-full bg-orange-500/15 blur-3xl"
      />

      {/* =========================================================
          CORE PULSE
      ========================================================= */}

      <motion.div
        animate={{
          scale: active ? [1, 1.04, 1] : [1, 1.02, 1],
          opacity: active ? [0.35, 0.55, 0.35] : [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: active ? 2 : 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute inset-[8%] rounded-full border border-orange-500/20"
      />
    </div>
  );
}
