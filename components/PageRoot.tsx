"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import {
  DesktopSlides,
  TOTAL_LOGICAL,
  slideToLogical,
} from "@/components/nav/DesktopSlides";
import { MobileStack } from "@/components/nav/MobileStack";

export function PageRoot() {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [logical, setLogical] = useState(0);
  const desktopGoToRef = useRef<((logical: number) => void) | null>(null);

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const jumpToSlide = useCallback(
    (slideIdx: number) => {
      if (isMobile) {
        const target = document.querySelector<HTMLElement>(
          `[data-mobile-slide="${slideIdx}"]`
        );
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        desktopGoToRef.current?.(slideToLogical(slideIdx));
      }
    },
    [isMobile]
  );

  const handleReady = useCallback((goTo: (logical: number) => void) => {
    desktopGoToRef.current = goTo;
  }, []);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} duration={1800} />
      <CustomCursor />

      <Header currentSlide={currentSlide} onJump={jumpToSlide} />

      {isMobile === false && (
        <DesktopSlides
          loaded={loaded}
          onSlideChange={setCurrentSlide}
          onLogicalChange={setLogical}
          onReady={handleReady}
        />
      )}

      {isMobile === true && <MobileStack onSlideChange={setCurrentSlide} />}

      {/* Indicateur permanent — masqué sur la dernière slide (le footer fait office de signal de fin) */}
      {loaded && currentSlide < 6 && (
        <motion.div
          className="fixed bottom-6 right-6 md:right-[10%] z-30 flex items-center gap-2 md:gap-3 text-[var(--color-mute)] mix-blend-multiply"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="eyebrow">Slide</span>
          <span className="font-display italic text-base text-[var(--color-ink)]">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <span className="eyebrow">/ 07</span>
        </motion.div>
      )}

      {/* Barre de progression */}
      {loaded && (
        <div className="fixed bottom-0 left-0 right-0 z-30 h-px bg-[var(--color-ink)]/10">
          <motion.span
            className="block h-full bg-[var(--color-gold)] origin-left"
            animate={{
              scaleX: isMobile
                ? (currentSlide + 1) / 7
                : (logical + 1) / TOTAL_LOGICAL,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}
    </>
  );
}
