'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import DesktopBackground from './DesktopBackground';
import CoreHUD from './CoreHUD';
import CoreGlobe3D from './CoreGlobe3D';
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
}

function CyberOrb({ active }: CyberOrbProps) {
  const { nodes } = useGLTF('/media/robobit.glb') as unknown as GLTFResult;

  // -------------------------------------------------------------
  // CONFIGURATION & CONTROLS
  // -------------------------------------------------------------
  const MODEL_CONFIG = {
    // Transform controls [X, Y, Z]
    // Pitch (X): Math.PI / 12 (~15deg tilt up), Math.PI / 6 (~30deg tilt up)
    rotation: [Math.PI / -2.5, 0, 0] as [number, number, number],
    position: [0, 0, 0] as [number, number, number],
    scale: 1.2,
  };

  const ORBIT_CONFIG = {
    autoRotate: true,
    autoRotateSpeed: 1.2, // Positive = clockwise, Negative = counter-clockwise
    rotateSpeed: 0.9, // User dragging sensitivity
    dampingFactor: 0.08, // Inertia smooth delay
    zoomSpeed: 0.6,
    minDistance: 2.5,
    maxDistance: 5,
  };

  // Mesh Material Overrides
  const sphere0Props = {
    color: '#f97316',
    metalness: 0.8,
    roughness: 0.5,
  };

  const sphere1Props = {
    color: '#60a5fa',
    metalness: 0.6,
    roughness: 0.3,
  };

  const sphere2Props = {
    color: '#030303',
    metalness: 0.1,
    roughness: 0.1,
  };

  return (
    <group
      scale={MODEL_CONFIG.scale}
      rotation={MODEL_CONFIG.rotation}
      position={MODEL_CONFIG.position}
      dispose={null}
    >
      {/* Mesh 0 - Target Material.001 */}
      <mesh geometry={nodes.Sphere_0.geometry}>
        <meshStandardMaterial
          color={sphere0Props.color}
          metalness={sphere0Props.metalness}
          roughness={sphere0Props.roughness}
        />
      </mesh>

      {/* Mesh 1 - Target Material.002 */}
      <mesh geometry={nodes.Sphere_1.geometry}>
        <meshStandardMaterial
          color={sphere1Props.color}
          metalness={sphere1Props.metalness}
          roughness={sphere1Props.roughness}
        />
      </mesh>

      {/* Mesh 2 - Target Material.003 */}
      <mesh geometry={nodes.Sphere_2.geometry}>
        <meshStandardMaterial
          color={sphere2Props.color}
          metalness={sphere2Props.metalness}
          roughness={sphere2Props.roughness}
        />
      </mesh>

      <OrbitControls
        enableZoom={active}
        enablePan={false}
        enableDamping={active}
        dampingFactor={ORBIT_CONFIG.dampingFactor}
        rotateSpeed={ORBIT_CONFIG.rotateSpeed}
        zoomSpeed={ORBIT_CONFIG.zoomSpeed}
        autoRotate={active}
        autoRotateSpeed={ORBIT_CONFIG.autoRotateSpeed}
        minDistance={ORBIT_CONFIG.minDistance}
        maxDistance={ORBIT_CONFIG.maxDistance}
      />
    </group>
  );
}

useGLTF.preload('/media/robobit.glb');

interface HeroSectionProps {
  onProfileClick: () => void;
  coreActive: boolean;
  profileActive: boolean;
}

export default function HeroSection({
  onProfileClick,
  coreActive,
  profileActive,
}: HeroSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative h-screen w-screen shrink-0 overflow-hidden bg-black text-white"
    >
      <DesktopBackground />

      <CoreHUD active={coreActive} />

      <DesktopIcons onModalChange={setModalOpen} />

      <CoreGlobe3D active={coreActive} modalOpen={modalOpen} profileActive={profileActive} />

      {/* HERO CONTENT */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 md:px-12">
        <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* LEFT SIDE: TEXT CONTENT */}
          <div className="text-center font-mono md:text-left">
            {/* SYSTEM ONLINE */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-xs tracking-[0.25em] text-blue-400 uppercase md:text-sm"
            >
              <Typewriter text="SYS.INIT // CORE_ARCHIVE" delay={0.3} />
            </motion.p>

            {/* MAIN HEADING */}
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
              className="mt-6 text-4xl font-extrabold tracking-tight text-white uppercase md:text-6xl"
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

            {/* ROLE / SUBTITLE */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.9 }}
              className="mt-6 text-xl font-semibold tracking-wider text-orange-500 uppercase"
            >
              FULL STACK & SYSTEMS ARCHITECTURE
            </motion.p>

            {/* TAGS */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.15 }}
              className="mt-3 text-xs tracking-widest text-gray-400 md:text-sm"
            >
              WEB APPLICATIONS • GAME ENGINES • INFRASTRUCTURE
            </motion.p>
          </div>

          {/* RIGHT SIDE: HUD GRAPHIC PLACEHOLDER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex aspect-square w-full max-w-md items-center justify-center justify-self-center rounded-lg p-6 font-mono"
          >
            {/* Animated Orbit / Reticle Ring */}
            <motion.div
              className="absolute h-48 w-48 rounded-full border border-dashed border-blue-400/60"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute h-36 w-36 rounded-full border border-orange-500/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />

            {/* Placeholder Tag Text */}
            <div className="relative z-10 h-96 w-96">
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

                <CyberOrb active={!profileActive} />

                <Environment preset="city" />
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>

      <FloatingWidget />
    </section>
  );
}
