"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

const PulseOrb = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.22;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#a3a3a3"
          attach="material"
          distort={0.45}
          speed={2}
          roughness={0.2}
          metalness={0.85}
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
};

export const Hero3DBackdrop = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight intensity={1.2} position={[4, 6, 8]} />
        <PulseOrb />
      </Canvas>
    </div>
  );
};
