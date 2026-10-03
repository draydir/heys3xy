"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

const Hero3DBackdrop = dynamic(
  () => import("@/components/hero-3d-backdrop").then((mod) => mod.Hero3DBackdrop),
  { ssr: false },
);
import { TeslaGridLogo } from "@/components/tesla-grid-logo";

export const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden px-4 py-16"
      aria-labelledby="hero-heading"
    >
      <Hero3DBackdrop />

      <motion.div
        className="flex flex-col items-center gap-8 text-center"
        initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
        animate={
          loaded
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 0.92, filter: "blur(12px)" }
        }
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="rounded-md border border-border/60 bg-background/40 p-4 backdrop-blur-sm">
          <TeslaGridLogo size="lg" />
        </div>

        <motion.h1
          id="hero-heading"
          className="select-none bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text font-mono text-[clamp(4.5rem,22vw,14rem)] font-bold leading-none tracking-tighter text-transparent"
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ delay: 0.25, duration: 0.9 }}
        >
          #7399
        </motion.h1>

        <motion.p
          className="max-w-md text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
        >
          Seven · three · nine · nine — the keypad spells what the domain whispers.
        </motion.p>
      </motion.div>

      {!loaded ? (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center bg-background/90"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            className="font-mono text-2xl text-muted-foreground"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            7399
          </motion.span>
        </motion.div>
      ) : null}
    </section>
  );
};
