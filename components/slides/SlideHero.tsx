"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CornerCross } from "@/components/ui/CornerCross";
import { CrownShield } from "@/components/ui/Icons";

type Props = { active?: boolean };

function useLiveTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function SlideHero({ active = true }: Props) {
  const time = useLiveTime();

  // Léger parallax mouse sur la couronne
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 1 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 1 });
  const crownX = useTransform(sx, [-1, 1], [-8, 8]);
  const crownY = useTransform(sy, [-1, 1], [-6, 6]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section className="relative h-svh md:h-screen w-full md:w-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden snap-start">
      <CornerCross position="tl" variant="ink" />
      <CornerCross position="tr" variant="ink" />
      <CornerCross position="bl" variant="ink" />
      <CornerCross position="br" variant="ink" />

      {/* Eyebrow gauche */}
      <div className="absolute top-12 md:top-16 left-6 md:left-[6%]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow num="01" label="Masterclass" />
        </motion.div>
      </div>

      {/* Heure live — desktop only (mobile : on dégage pour aérer le header) */}
      <motion.div
        className="hidden md:flex absolute top-16 right-[6%] items-center gap-3 text-[var(--color-mute)]"
        initial={{ opacity: 0, y: 10 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="block h-1.5 w-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
        <span className="eyebrow tabular-nums">
          {time ?? "--:--"} · MR
        </span>
      </motion.div>

      {/* Titre monumental + couronne */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-[6%]">
        <motion.div
          className="text-[var(--color-ink)] mb-4 md:mb-7"
          style={{ x: crownX, y: crownY }}
          initial={{ opacity: 0, y: -10, scale: 0.92 }}
          animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <CrownShield size={96} strokeWidth={1} className="md:[&]:w-[120px] md:[&]:h-[120px]" />
        </motion.div>
        <h1
          className="font-display italic text-[var(--color-ink)] leading-[0.92]"
          style={{ fontSize: "clamp(4.5rem, 18vw, 15rem)" }}
        >
          <AnimatedText text="Royauté." inView={active} delay={0.4} charDelay={0.04} />
        </h1>

        <motion.p
          className="mt-6 md:mt-10 font-display italic text-[var(--color-mute)] max-w-md md:max-w-2xl"
          style={{ fontSize: "clamp(1.1rem, 2.4vw, 2.2rem)", lineHeight: 1.25 }}
          initial={{ opacity: 0, y: 14 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Impacter et diriger
          <br />
          en milieu hostile
        </motion.p>
      </div>

      {/* Mention bas-centre */}
      <motion.div
        className="absolute bottom-16 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[var(--color-mute)]"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <span className="eyebrow">
          <span className="md:hidden">↓ Défile pour explorer</span>
          <span className="hidden md:inline">Glisse pour explorer →</span>
        </span>
      </motion.div>
    </section>
  );
}
