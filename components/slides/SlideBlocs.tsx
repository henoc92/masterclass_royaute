"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { blocs } from "@/lib/data/blocs";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CornerCross } from "@/components/ui/CornerCross";

type Props = {
  active?: boolean;
  /** Index forcé (utile pour le système de sub-slides desktop) */
  forcedIndex?: number;
  onIndexChange?: (i: number) => void;
};

function BlocCard({ bloc }: { bloc: (typeof blocs)[number] }) {
  return (
    <div className="text-center max-w-3xl">
      <div
        className="font-display italic text-[var(--color-gold)]"
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1 }}
      >
        {bloc.roman}
      </div>
      <span className="block h-px w-20 bg-[var(--color-gold)] mx-auto mt-6 md:mt-10" />
      <h3
        className="mt-6 md:mt-10 font-display italic text-[var(--color-ink)]"
        style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", lineHeight: 1.05 }}
      >
        {bloc.title}
      </h3>
      <p className="mt-4 md:mt-6 eyebrow text-[var(--color-mute)]">{bloc.modules}</p>
      <p
        className="mt-4 md:mt-6 font-display italic text-[var(--color-mute)]"
        style={{ fontSize: "clamp(1rem, 1.8vw, 1.4rem)", lineHeight: 1.45 }}
      >
        {bloc.subtitle}
      </p>
    </div>
  );
}

export function SlideBlocs({ active = true, forcedIndex, onIndexChange }: Props) {
  const [internal, setInternal] = useState(0);
  const idx = forcedIndex ?? internal;
  const bloc = blocs[idx];

  const setIdx = (i: number) => {
    if (forcedIndex === undefined) setInternal(i);
    onIndexChange?.(i);
  };

  // — Carrousel mobile : swipe horizontal natif —
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripActive, setStripActive] = useState(0);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      if (i !== stripActive && i >= 0 && i < blocs.length) {
        setStripActive(i);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [stripActive]);

  // Auto-peek à la première visite mobile (1 seule fois par session)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!active) return;
    if (sessionStorage.getItem("blocs-peek")) return;
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    sessionStorage.setItem("blocs-peek", "1");
    const el = stripRef.current;
    if (!el) return;
    const t = setTimeout(() => {
      el.scrollTo({ left: el.clientWidth * 0.32, behavior: "smooth" });
      setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 800);
    }, 1200);
    return () => clearTimeout(t);
  }, [active]);

  const scrollToBloc = (i: number) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * i, behavior: "smooth" });
  };

  return (
    <section className="relative h-svh md:h-screen w-full md:w-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden snap-start">
      <CornerCross position="tl" />
      <CornerCross position="tr" />

      <div className="absolute top-12 md:top-16 left-6 md:left-[10%] z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Eyebrow num="03" label="Le parcours" />
        </motion.div>
      </div>

      {/* — DESKTOP — carte centrale unique avec navigation par numéros romains — */}
      <div className="hidden md:flex flex-1 items-center justify-center px-[14%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={bloc.roman}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <BlocCard bloc={bloc} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* — MOBILE — carrousel snap horizontal natif — */}
      <div
        ref={stripRef}
        className="md:hidden flex-1 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {blocs.map((b) => (
          <div
            key={b.roman}
            className="snap-center shrink-0 w-screen flex items-center justify-center px-6"
          >
            <BlocCard bloc={b} />
          </div>
        ))}
      </div>

      {/* Indicateurs — desktop : romains cliquables ; mobile : dots du carrousel */}
      <div className="hidden md:flex absolute bottom-16 left-0 right-0 justify-center gap-8">
        {blocs.map((b, i) => (
          <button
            key={b.roman}
            type="button"
            onClick={() => setIdx(i)}
            className={`font-display italic transition-colors duration-300 ${
              i === idx
                ? "text-[var(--color-gold)]"
                : "text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]"
            }`}
            aria-label={`Bloc ${b.roman} — ${b.title}`}
          >
            <span className="text-lg">{b.roman}</span>
          </button>
        ))}
      </div>

      {/* Mobile dots */}
      <div className="md:hidden absolute bottom-20 left-0 right-0 flex justify-center items-center gap-2.5">
        {blocs.map((b, i) => (
          <button
            key={b.roman}
            type="button"
            onClick={() => scrollToBloc(i)}
            aria-label={`Aller au bloc ${b.roman}`}
            className={`h-1.5 rounded-full transition-all duration-400 ${
              i === stripActive
                ? "w-6 bg-[var(--color-gold)]"
                : "w-1.5 bg-[var(--color-ink-faint)]"
            }`}
          />
        ))}
      </div>

      {/* Mention swipe — mobile uniquement, première visite */}
      <p className="md:hidden absolute bottom-10 left-0 right-0 text-center eyebrow text-[var(--color-mute)] pointer-events-none">
        ← Glisse pour voir les 4 blocs →
      </p>
    </section>
  );
}
