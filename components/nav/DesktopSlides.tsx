"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useSlideNavigation } from "@/lib/hooks/useSlideNavigation";
import { SlideHero } from "@/components/slides/SlideHero";
import { SlideOverview } from "@/components/slides/SlideOverview";
import { SlideBloc } from "@/components/slides/SlideBloc";
import { SlideCTA } from "@/components/slides/SlideCTA";
import { BLOC_THEMES } from "@/lib/blocThemes";

// slide index → couleur du rideau de transition
const SLIDE_CURTAIN: Record<number, string> = {
  0: "var(--color-ink)",
  1: "var(--color-ink)",
  2: BLOC_THEMES[1].bg,
  3: BLOC_THEMES[2].bg,
  4: BLOC_THEMES[3].bg,
  5: BLOC_THEMES[4].bg,
  6: "var(--color-ink)",
};

export const SLIDE_COUNT = 7;
export const TOTAL_LOGICAL = 7;

/** Mapping 1:1 — pas de sub-slides, chaque slide est une étape unique */
export function decodeLogical(logical: number) {
  return { slide: Math.max(0, Math.min(SLIDE_COUNT - 1, logical)) };
}

export function slideToLogical(slide: number) {
  return Math.max(0, Math.min(SLIDE_COUNT - 1, slide));
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
  const slide = logicalIndex;

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

  // Rideau coloré — prend la couleur du slide de destination
  const [showCurtain, setShowCurtain] = useState(false);
  const [curtainColor, setCurtainColor] = useState("var(--color-ink)");
  const lastSlide = useRef(0);
  useEffect(() => {
    if (lastSlide.current !== slide) {
      setCurtainColor(SLIDE_CURTAIN[slide] ?? "var(--color-ink)");
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
          <SlideOverview
            active={slide === 1}
            onJumpToBloc={(blocIdx) => goTo(blocIdx + 2)}
          />
        </div>
        <div className="w-screen h-screen shrink-0">
          <SlideBloc active={slide === 2} blocNum={1} slideNum="03" />
        </div>
        <div className="w-screen h-screen shrink-0">
          <SlideBloc active={slide === 3} blocNum={2} slideNum="04" />
        </div>
        <div className="w-screen h-screen shrink-0">
          <SlideBloc active={slide === 4} blocNum={3} slideNum="05" />
        </div>
        <div className="w-screen h-screen shrink-0">
          <SlideBloc active={slide === 5} blocNum={4} slideNum="06" />
        </div>
        <div className="w-screen h-screen shrink-0">
          <SlideCTA active={slide === 6} />
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: showCurtain ? 1 : 0 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        style={{ originX: showCurtain ? 0 : 1, backgroundColor: curtainColor }}
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
