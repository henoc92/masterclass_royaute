"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { blocs } from "@/lib/data/blocs";
import { modules, type Module } from "@/lib/data/modules";
import { moduleIconMap } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CornerCross } from "@/components/ui/CornerCross";

type Props = {
  active?: boolean;
  forcedIndex?: number;
  onIndexChange?: (i: number) => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

// — Cellule module : icon + numéro + titre + thème —
function ModuleCell({
  module: m,
  delay = 0,
  compact = false,
}: {
  module: Module;
  delay?: number;
  compact?: boolean;
}) {
  const Icon = moduleIconMap[m.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className="flex flex-col"
    >
      <div className="text-[var(--color-ink)] mb-3 md:mb-4">
        <Icon size={compact ? 28 : 36} strokeWidth={1.1} />
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <span
          className="font-display italic text-[var(--color-gold)] tabular-nums"
          style={{ fontSize: compact ? "0.95rem" : "1.05rem" }}
        >
          {m.num}
        </span>
        <span className="eyebrow text-[var(--color-ink-faint)]">|</span>
        <h4
          className="font-display italic text-[var(--color-ink)] flex-1"
          style={{ fontSize: compact ? "0.95rem" : "1.1rem", lineHeight: 1.15 }}
        >
          {m.title}
        </h4>
      </div>
      <p className="font-display italic text-[var(--color-mute)] text-xs md:text-sm leading-snug pr-2">
        {m.theme}
      </p>
    </motion.div>
  );
}

// — Bloc I — Grille 2×2 (Fondation) —
function MatrixFondation({ active }: { active: boolean }) {
  const ms = modules.filter((m) => m.blocNum === 1);
  return (
    <div className="grid grid-cols-2 gap-x-8 md:gap-x-14 gap-y-8 md:gap-y-12 max-w-3xl">
      {ms.map((m, i) => (
        <ModuleCell key={m.num} module={m} delay={active ? 0.15 + i * 0.12 : 0} />
      ))}
    </div>
  );
}

// — Bloc II — Escalier ascendant (Exigences) —
function MatrixExigences({ active }: { active: boolean }) {
  const ms = modules.filter((m) => m.blocNum === 2);
  return (
    <div className="relative w-full max-w-5xl">
      <div className="grid grid-cols-4 gap-3 md:gap-6 items-end">
        {ms.map((m, i) => {
          const elevation = ["mt-12", "mt-8", "mt-4", "mt-0"][i];
          return (
            <motion.div
              key={m.num}
              initial={{ opacity: 0, y: 30 }}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.18, ease: EASE }}
              className={`flex flex-col items-start ${elevation}`}
            >
              <ModuleCell module={m} delay={0} compact />
            </motion.div>
          );
        })}
      </div>
      {/* Ligne d'escalier ascendante */}
      <motion.svg
        className="absolute -top-4 left-0 w-full h-12 pointer-events-none hidden md:block"
        viewBox="0 0 100 14"
        preserveAspectRatio="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 0.5 } : {}}
        transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
      >
        <motion.path
          d="M 4 12 L 26 12 L 26 8 L 50 8 L 50 5 L 74 5 L 74 2 L 96 2"
          stroke="var(--color-gold)"
          strokeWidth="0.4"
          fill="none"
        />
      </motion.svg>
    </div>
  );
}

// — Bloc III — 2 colonnes (Sagesse) —
function MatrixSagesse({ active }: { active: boolean }) {
  const ms = modules.filter((m) => m.blocNum === 3);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-10 md:gap-y-0 max-w-4xl items-start relative">
      {ms.map((m, i) => (
        <ModuleCell key={m.num} module={m} delay={active ? 0.2 + i * 0.18 : 0} />
      ))}
      {/* Filet vertical central */}
      <motion.span
        className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-[var(--color-gold)]/30 -translate-x-1/2 origin-top"
        initial={{ scaleY: 0 }}
        animate={active ? { scaleY: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
      />
    </div>
  );
}

// — Bloc IV — Empilement vertical (Gloire) —
function MatrixGloire({ active }: { active: boolean }) {
  const ms = modules.filter((m) => m.blocNum === 4);
  return (
    <div className="flex flex-col gap-8 md:gap-10 max-w-2xl relative">
      {ms.map((m, i) => (
        <div key={m.num}>
          <ModuleCell module={m} delay={active ? 0.2 + i * 0.2 : 0} />
          {i === 0 && (
            <motion.span
              className="block h-px bg-[var(--color-gold)]/30 mt-8 md:mt-10 origin-left"
              initial={{ scaleX: 0 }}
              animate={active ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const matrices = [MatrixFondation, MatrixExigences, MatrixSagesse, MatrixGloire];

export function SlideBlocs({ active = true, forcedIndex, onIndexChange }: Props) {
  const [internal, setInternal] = useState(0);
  const idx = forcedIndex ?? internal;
  const bloc = blocs[idx];
  const Matrix = matrices[idx];

  const setIdx = (i: number) => {
    if (forcedIndex === undefined) setInternal(i);
    onIndexChange?.(i);
  };

  // Carrousel mobile —
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripActive, setStripActive] = useState(0);
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      if (i !== stripActive && i >= 0 && i < blocs.length) setStripActive(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [stripActive]);

  const scrollToBloc = (i: number) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * i, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-svh md:h-screen w-full md:w-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden snap-start">
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

      {/* — DESKTOP — bloc actif avec sa matrice — */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center px-[10%] pt-24 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={bloc.roman}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="w-full flex flex-col items-center"
          >
            {/* Header bloc */}
            <div className="text-center mb-10 md:mb-14">
              <span
                className="font-display italic text-[var(--color-gold)]"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}
              >
                {bloc.roman}
              </span>
              <h3
                className="mt-3 font-display italic text-[var(--color-ink)]"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.05 }}
              >
                {bloc.title}
              </h3>
              <p className="mt-3 eyebrow text-[var(--color-mute)]">
                {bloc.modules} · {bloc.subtitle}
              </p>
            </div>

            <Matrix active={active} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* — MOBILE — carrousel snap horizontal des 4 blocs avec leurs matrices — */}
      <div
        ref={stripRef}
        className="md:hidden flex-1 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-20"
        style={{ scrollbarWidth: "none" }}
      >
        {blocs.map((b, blocIdx) => {
          const M = matrices[blocIdx];
          const isActive = active && stripActive === blocIdx;
          return (
            <article
              key={b.roman}
              className="snap-center shrink-0 w-screen flex flex-col px-6 pb-20"
            >
              <div className="mb-8">
                <span className="font-display italic text-[var(--color-gold)] text-2xl">
                  {b.roman}
                </span>
                <h3
                  className="mt-1 font-display italic text-[var(--color-ink)]"
                  style={{ fontSize: "1.9rem", lineHeight: 1.1 }}
                >
                  {b.title}
                </h3>
                <p className="mt-2 eyebrow text-[var(--color-mute)]">
                  {b.modules} · {b.subtitle}
                </p>
              </div>
              <div className="flex-1 flex items-center">
                <M active={isActive} />
              </div>
            </article>
          );
        })}
      </div>

      {/* Indicateurs desktop — numéros romains cliquables */}
      <div className="hidden md:flex absolute bottom-8 left-0 right-0 justify-center gap-8">
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

      {/* Indicateurs mobile — dots */}
      <div className="md:hidden absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2.5">
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
    </section>
  );
}
