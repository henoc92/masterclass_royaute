"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useSlideNavigation } from "@/lib/hooks/useSlideNavigation";
import { SlideHero } from "@/components/slides/SlideHero";
import { SlidePromesse } from "@/components/slides/SlidePromesse";
import { SlideBlocs } from "@/components/slides/SlideBlocs";
import { SlideModules } from "@/components/slides/SlideModules";
import { SlideFormat } from "@/components/slides/SlideFormat";
import { SlideCTA } from "@/components/slides/SlideCTA";

export const SLIDE_COUNT = 6;
export const TOTAL_LOGICAL = 9;

/**
 * Map index logique (0-8) → {slide: 0-5, bloc: 0-3}
 * 0=Hero, 1=Promesse, 2-5=Blocs (4 sous), 6=Modules, 7=Format, 8=CTA
 */
export function decodeLogical(logical: number) {
  if (logical <= 0) return { slide: 0, bloc: 0 };
  if (logical === 1) return { slide: 1, bloc: 0 };
  if (logical >= 2 && logical <= 5) return { slide: 2, bloc: logical - 2 };
  if (logical === 6) return { slide: 3, bloc: 0 };
  if (logical === 7) return { slide: 4, bloc: 0 };
  return { slide: 5, bloc: 0 };
}

/** Inverse — slideIdx (0-5) → premier index logique correspondant */
export function slideToLogical(slide: number) {
  if (slide <= 1) return slide;
  if (slide === 2) return 2;
  if (slide === 3) return 6;
  if (slide === 4) return 7;
  return 8;
}

function useTransformVw(mv: MotionValue<number>) {
  return useTransform(mv, (v) => `${v}vw`);
}

type Props = {
  loaded: boolean;
  onSlideChange?: (slide: number) => void;
  onLogicalChange?: (logical: number, total: number) => void;
  onReady?: (goTo: (logical: number) => void) => void;
};

export function DesktopSlides({
  loaded,
  onSlideChange,
  onLogicalChange,
  onReady,
}: Props) {
  const { logicalIndex, goTo } = useSlideNavigation(TOTAL_LOGICAL, 850);
  const { slide, bloc } = useMemo(() => decodeLogical(logicalIndex), [logicalIndex]);

  const targetX = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 80, damping: 22, mass: 0.6 });
  const xPct = useTransformVw(x);

  useEffect(() => {
    targetX.set(-slide * 100);
    onSlideChange?.(slide);
  }, [slide, targetX, onSlideChange]);

  useEffect(() => {
    onLogicalChange?.(logicalIndex, TOTAL_LOGICAL);
  }, [logicalIndex, onLogicalChange]);

  useEffect(() => {
    onReady?.(goTo);
  }, [goTo, onReady]);

  // Rideau marine — sweep à chaque changement de slide
  const [showCurtain, setShowCurtain] = useState(false);
  const lastSlide = useRef(0);
  useEffect(() => {
    if (lastSlide.current !== slide) {
      lastSlide.current = slide;
      setShowCurtain(true);
      const t = setTimeout(() => setShowCurtain(false), 700);
      return () => clearTimeout(t);
    }
  }, [slide]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-screen flex"
        style={{ x: xPct, width: `${SLIDE_COUNT * 100}vw` }}
      >
        <div className="w-screen h-screen shrink-0">
          <SlideHero active={slide === 0 && loaded} />
        </div>
        <div className="w-screen h-screen shrink-0">
          <SlidePromesse active={slide === 1} />
        </div>
        <div className="w-screen h-screen shrink-0">
          <SlideBlocs active={slide === 2} forcedIndex={slide === 2 ? bloc : undefined} />
        </div>
        <div className="w-screen h-screen shrink-0">
          <SlideModules active={slide === 3} />
        </div>
        <div className="w-screen h-screen shrink-0">
          <SlideFormat active={slide === 4} />
        </div>
        <div className="w-screen h-screen shrink-0">
          <SlideCTA active={slide === 5} />
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 bg-[var(--color-ink)]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: showCurtain ? 1 : 0 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        style={{ originX: showCurtain ? 0 : 1 }}
      />

      <button
        type="button"
        onClick={() => goTo(logicalIndex - 1)}
        aria-label="Précédent"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center text-[var(--color-mute)] hover:text-[var(--color-gold)] transition-colors duration-300 disabled:opacity-30 disabled:hover:text-[var(--color-mute)]"
        disabled={logicalIndex === 0}
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => goTo(logicalIndex + 1)}
        aria-label="Suivant"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center text-[var(--color-mute)] hover:text-[var(--color-gold)] transition-colors duration-300 disabled:opacity-30 disabled:hover:text-[var(--color-mute)]"
        disabled={logicalIndex >= TOTAL_LOGICAL - 1}
      >
        →
      </button>
    </>
  );
}
