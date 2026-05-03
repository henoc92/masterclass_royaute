"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CornerCross } from "@/components/ui/CornerCross";
import { ClockIcon, BookOpen, Blocks } from "@/components/ui/Icons";
import { blocs } from "@/lib/data/blocs";

type Props = { active?: boolean };

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "12", label: "modules" },
  { value: "24", label: "sessions" },
  { value: "~12", label: "heures" },
  { value: "4", label: "blocs" },
];

/**
 * Slide 02 — Vue d'ensemble (PDF p2)
 * Stats + verset Apocalypse 1:6 + 4 colonnes parcours.
 */
export function SlideOverview({ active = true }: Props) {
  return (
    <section className="relative min-h-svh md:h-screen w-full md:w-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden snap-start">
      <CornerCross position="tl" />
      <CornerCross position="tr" />
      <CornerCross position="bl" />
      <CornerCross position="br" />

      <div className="absolute top-12 md:top-16 left-6 md:left-[10%]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Eyebrow num="02" label="Vue d'ensemble" />
        </motion.div>
      </div>

      {/* Bloc principal centré — 3 zones empilées : stats / verset / parcours */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-[10%] pt-24 md:pt-28 pb-16 md:pb-24 gap-10 md:gap-16">
        {/* — ZONE 1 — Stats avec horloge */}
        <motion.div
          className="flex items-center gap-4 md:gap-8 pb-6 md:pb-8 border-b border-[var(--color-ink)]/15"
          initial={{ opacity: 0, y: 14 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        >
          <ClockIcon size={28} strokeWidth={1.2} className="shrink-0 text-[var(--color-ink)]" />
          <div className="flex flex-1 flex-wrap items-baseline gap-x-3 md:gap-x-6 gap-y-1">
            {STATS.map((s, i) => (
              <span key={s.label} className="flex items-baseline gap-2">
                <span
                  className="font-medium text-[var(--color-ink)] tabular-nums"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)" }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[var(--color-mute)]"
                  style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}
                >
                  {s.label}
                </span>
                {i < STATS.length - 1 && (
                  <span className="text-[var(--color-ink-faint)] mx-1 md:mx-2">|</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* — ZONE 2 — Verset Apocalypse 1:6 */}
        <motion.div
          className="flex flex-col items-center text-center pb-8 md:pb-10 border-b border-[var(--color-ink)]/15"
          initial={{ opacity: 0, y: 14 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
        >
          <BookOpen size={32} strokeWidth={1.1} className="text-[var(--color-ink)] mb-5 md:mb-6" />
          <p
            className="font-display italic text-[var(--color-ink)] max-w-3xl"
            style={{ fontSize: "clamp(1.05rem, 1.7vw, 1.4rem)", lineHeight: 1.45 }}
          >
            « À celui qui nous a aimés et qui nous a lavés de nos péchés par son sang,
            et qui nous a faits rois et sacrificateurs de Dieu son Père. »{" "}
            <span className="text-[var(--color-mute)] not-italic">— Apocalypse 1 : 6</span>
          </p>
        </motion.div>

        {/* — ZONE 3 — Parcours de formation */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
        >
          <h2
            className="font-display italic text-[var(--color-ink)] text-center"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 1 }}
          >
            Parcours de formation
          </h2>

          <div className="flex justify-center mt-5 md:mt-6 mb-8 md:mb-12 text-[var(--color-ink)]">
            <Blocks size={26} strokeWidth={1.1} />
          </div>

          {/* 4 colonnes blocs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-6 md:gap-y-0">
            {blocs.map((b, i) => (
              <motion.div
                key={b.roman}
                initial={{ opacity: 0, y: 12 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.95 + i * 0.1, ease: EASE }}
                className="relative md:px-4 text-center md:text-left"
              >
                {/* Filet vertical de séparation entre colonnes — desktop only */}
                {i > 0 && (
                  <span className="hidden md:block absolute left-0 top-1 bottom-1 w-px bg-[var(--color-ink)]/15" />
                )}
                <p className="eyebrow text-[var(--color-ink)] mb-2">{b.title}</p>
                <p className="text-[var(--color-mute)] text-xs md:text-sm">{b.modules}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
