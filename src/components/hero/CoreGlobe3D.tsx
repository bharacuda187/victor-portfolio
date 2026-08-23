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
  const targetScale = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    // Modal is open — don't spend frames animating the globe.
    if (modalOpen) return;

    if (!meshRef.current) return;

    meshRef.current.rotation.y += delta * (active ? 0.18 : 0.08);

    const scale = active ? 1 : 0.25;

    targetScale.current.set(scale, scale, scale);

    meshRef.current.scale.lerp(targetScale.current, 0.12);
  });

  return (
    <mesh ref={meshRef} scale={active ? 1 : 0.25}>
      <sphereGeometry args={[1, 32, 32]} />

      <meshStandardMaterial
        color={active ? '#fb923c' : '#38bdf8'}
        wireframe
        transparent
        opacity={active ? 0.9 : 0.6}
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
    <motion.div
      className="pointer-events-none fixed top-8 left-1/2 z-10 -translate-x-1/2"
      initial={false}
      animate={
        active
          ? {
              opacity: 1,
              x: -380,
              y: 400,
            }
          : {
              opacity: 0,
              x: 0,
              y: 0,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 20,
      }}
    >
      {/* Floating motion */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        {/* IMPORTANT:
            This container is NEVER scaled.
            R3F can therefore measure its real size.
        */}
        <div className="relative h-80 w-80 md:h-96 md:w-96">
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

          {/* Soft glow */}
          <motion.div
            animate={{
              scale: active ? 1 : 0.25,
              opacity: active ? 1 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 20,
            }}
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-orange-500/25 blur-3xl"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
