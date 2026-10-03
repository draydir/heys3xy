"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Mesh } from "three";

import { cn } from "@/lib/utils";

interface OrbVisuals {
  color: string;
  opacity: number;
  metalness: number;
  roughness: number;
  distort: number;
  ambient: number;
  directional: number;
}

const orbByTheme: Record<"light" | "dark", OrbVisuals> = {
  dark: {
    color: "#a3a3a3",
    opacity: 0.35,
    metalness: 0.85,
    roughness: 0.2,
    distort: 0.45,
    ambient: 0.35,
    directional: 1.2,
  },
  light: {
    color: "#171717",
    opacity: 0.08,
    metalness: 0.05,
    roughness: 0.85,
    distort: 0.32,
    ambient: 0.85,
    directional: 0.35,
  },
};

interface PulseOrbProps {
  visuals: OrbVisuals;
}

const PulseOrb = ({ visuals }: PulseOrbProps) => {
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
          color={visuals.color}
          attach="material"
          distort={visuals.distort}
          speed={1.6}
          roughness={visuals.roughness}
          metalness={visuals.metalness}
          transparent
          opacity={visuals.opacity}
        />
      </mesh>
    </Float>
  );
};

export const Hero3DBackdrop = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const mode = resolvedTheme === "light" ? "light" : "dark";
  const visuals = useMemo(() => orbByTheme[mode], [mode]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10",
        mode === "dark" ? "opacity-80" : "opacity-100",
      )}
      aria-hidden
    >
      <div
        className={cn(
          "absolute inset-0",
          mode === "light" &&
            "bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,color-mix(in_oklch,var(--foreground)_6%,transparent),transparent_55%)]",
        )}
      />
      <Canvas
        key={mode}
        className="bg-transparent!"
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={visuals.ambient} />
        <directionalLight intensity={visuals.directional} position={[4, 6, 8]} />
        <PulseOrb visuals={visuals} />
      </Canvas>
      <div
        className={cn(
          "absolute inset-0",
          mode === "light" &&
            "bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_78%)]",
        )}
      />
    </div>
  );
};
