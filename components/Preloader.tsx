"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  onDone?: () => void;
  duration?: number;
};

/**
 * Preloader cinématique — fond marine plein écran, compteur 0→100 (style bennet/abgd),
 * puis le rideau marine se lève vers le haut pour révéler la slide 1.
 */
export function Preloader({ onDone, duration = 1800 }: Props) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? 100 : 0);
  const [phase, setPhase] = useState<"counting" | "rising" | "gone">("counting");

  useEffect(() => {
    if (reduce) {
      setCount(100);
      setPhase("rising");
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("rising"), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, reduce]);

  useEffect(() => {
    if (phase === "rising") {
      const t = setTimeout(() => {
        setPhase("gone");
        onDone?.();
      }, 1100);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <AnimatePresence>
      {phase !== "gone" && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-ink)]"
          initial={{ y: 0 }}
          animate={phase === "rising" ? { y: "-100%" } : { y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Croix de marque aux coins */}
          <span className="pointer-events-none absolute top-6 left-6 text-[var(--color-paper)]/40 eyebrow">
            № 00
          </span>
          <span className="pointer-events-none absolute top-6 right-6 text-[var(--color-paper)]/40 eyebrow">
            Masterclass · Royauté
          </span>

          {/* Compteur central */}
          <div className="flex items-baseline gap-2 text-[var(--color-paper)]">
            <span
              className="font-display italic font-light tabular-nums"
              style={{ fontSize: "clamp(4rem, 14vw, 12rem)", lineHeight: 1 }}
            >
              {String(count).padStart(2, "0")}
            </span>
            <span className="eyebrow text-[var(--color-gold)]">/ 100</span>
          </div>

          {/* Sous-titre */}
          <motion.p
            className="mt-6 text-[var(--color-paper)]/60 eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Impacter et diriger en milieu hostile
          </motion.p>

          {/* Filet bas */}
          <span className="absolute bottom-6 left-6 right-6 h-px bg-[var(--color-paper)]/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
