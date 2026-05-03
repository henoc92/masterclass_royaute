"use client";

import { motion } from "framer-motion";
import { modules } from "@/lib/data/modules";
import { blocs } from "@/lib/data/blocs";
import { ModuleCell } from "@/components/ui/ModuleCell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CornerCross } from "@/components/ui/CornerCross";

const EASE = [0.22, 1, 0.36, 1] as const;

type BlocNum = 1 | 2 | 3 | 4;

type Props = {
  active?: boolean;
  blocNum: BlocNum;
  /** № de slide pour l'eyebrow (03, 04, 05, 06) */
  slideNum: string;
};

/**
 * Slide d'un bloc — matrice spécifique par bloc :
 * - I  Fondation         → grille 2×2
 * - II Exigences          → escalier ascendant
 * - III Sagesse           → 2 colonnes
 * - IV Gloire             → empilement vertical
 */
export function SlideBloc({ active = true, blocNum, slideNum }: Props) {
  const bloc = blocs[blocNum - 1];
  const ms = modules.filter((m) => m.blocNum === blocNum);

  return (
    <section className="relative min-h-svh md:h-screen w-full md:w-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden snap-start">
      <CornerCross position="tl" />
      <CornerCross position="tr" />

      {/* Watermark numéro romain en arrière-plan — signature ART_DIRECTION */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute select-none font-display italic text-[var(--color-ink)] leading-none right-[2%] md:right-[3%] top-1/2 -translate-y-1/2"
        style={{ fontSize: "clamp(20rem, 42vw, 48rem)", opacity: 0.03 }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={active ? { opacity: 0.04, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
      >
        {bloc.roman}
      </motion.span>

      <div className="absolute top-12 md:top-16 left-6 md:left-[6%] z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Eyebrow num={slideNum} label={`Bloc ${bloc.roman} — ${bloc.title}`} />
        </motion.div>
      </div>

      {/* Mini progress des 4 blocs — bas centre */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 text-[var(--color-mute)]"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className="flex items-center gap-3">
            <span
              className={`block h-px transition-all duration-500 ${
                n === blocNum ? "w-6 bg-[var(--color-gold)]" : "w-3 bg-[var(--color-ink-faint)]"
              }`}
            />
            <span className={`eyebrow tabular-nums ${n === blocNum ? "text-[var(--color-gold)]" : ""}`}>
              {n}/4
            </span>
          </span>
        ))}
      </motion.div>

      {/* Header de bloc — pleine largeur, plus discret pour laisser place à la matrice */}
      <div className="px-6 md:px-[6%] pt-24 md:pt-28">
        <motion.div
          className="flex items-baseline gap-4 md:gap-6 pb-5 md:pb-6 border-b border-[var(--color-ink)]/15"
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
        >
          <span
            className="font-display italic text-[var(--color-gold)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}
          >
            {bloc.roman}
          </span>
          <h2
            className="flex-1 font-display italic text-[var(--color-ink)]"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", lineHeight: 1.05 }}
          >
            {bloc.title}
          </h2>
          <span className="hidden md:inline eyebrow text-[var(--color-mute)] tabular-nums shrink-0">
            {bloc.modules}
          </span>
        </motion.div>
        <p className="md:hidden mt-3 eyebrow text-[var(--color-mute)] tabular-nums">
          {bloc.modules}
        </p>
      </div>

      {/* Matrice — change selon le bloc */}
      <div className="flex-1 px-6 md:px-[6%] pt-8 md:pt-10 pb-12 md:pb-16 overflow-y-auto scrollbar-hide">
        {blocNum === 1 && <MatrixFondation modules={ms} active={active} />}
        {blocNum === 2 && <MatrixExigences modules={ms} active={active} />}
        {blocNum === 3 && <MatrixSagesse modules={ms} active={active} />}
        {blocNum === 4 && <MatrixGloire modules={ms} active={active} />}
      </div>
    </section>
  );
}

// — Bloc I — Grille 2×2 — chaque cellule cascade —
function MatrixFondation({ modules: ms, active }: { modules: typeof modules; active: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-8 md:gap-y-12 max-w-6xl mx-auto">
      {ms.map((m, i) => (
        <ModuleCell
          key={m.num}
          module={m}
          delay={active ? 0.45 + i * 0.12 : 0}
          withSessions
        />
      ))}
    </div>
  );
}

// — Bloc II — Escalier ascendant — modules + ligne or qui se trace —
function MatrixExigences({ modules: ms, active }: { modules: typeof modules; active: boolean }) {
  return (
    <div className="relative max-w-6xl mx-auto pt-8 md:pt-12">
      {/* Ligne d'escalier (desktop uniquement, signal visuel) */}
      <motion.svg
        className="absolute -top-2 left-0 w-full h-12 pointer-events-none hidden md:block"
        viewBox="0 0 100 14"
        preserveAspectRatio="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 0.55 } : {}}
        transition={{ duration: 1.6, delay: 0.55, ease: EASE }}
      >
        <motion.path
          d="M 4 12 L 26 12 L 26 9 L 50 9 L 50 6 L 74 6 L 74 3 L 96 3"
          stroke="var(--color-gold)"
          strokeWidth="0.4"
          fill="none"
        />
      </motion.svg>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-y-0 md:gap-x-6 items-end">
        {ms.map((m, i) => {
          // Élévation graduelle du Bloc — chaque module monte un peu plus
          const desktopElevation = ["md:mt-12", "md:mt-8", "md:mt-4", "md:mt-0"][i];
          return (
            <div key={m.num} className={desktopElevation}>
              <ModuleCell
                module={m}
                delay={active ? 0.4 + i * 0.18 : 0}
                withSessions
                compact
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// — Bloc III — 2 colonnes + filet vertical central —
function MatrixSagesse({ modules: ms, active }: { modules: typeof modules; active: boolean }) {
  return (
    <div className="relative max-w-5xl mx-auto pt-6 md:pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-0 gap-x-12 md:gap-x-20">
        {ms.map((m, i) => (
          <ModuleCell
            key={m.num}
            module={m}
            delay={active ? 0.45 + i * 0.18 : 0}
            withSessions
          />
        ))}
      </div>
      {/* Filet vertical central */}
      <motion.span
        className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-[var(--color-gold)]/30 -translate-x-1/2 origin-top"
        initial={{ scaleY: 0 }}
        animate={active ? { scaleY: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
      />
    </div>
  );
}

// — Bloc IV — Empilement vertical + filet horizontal de séparation —
function MatrixGloire({ modules: ms, active }: { modules: typeof modules; active: boolean }) {
  return (
    <div className="flex flex-col gap-10 md:gap-12 max-w-3xl mx-auto pt-4 md:pt-8">
      {ms.map((m, i) => (
        <div key={m.num}>
          <ModuleCell module={m} delay={active ? 0.4 + i * 0.2 : 0} withSessions />
          {i === 0 && (
            <motion.span
              className="block h-px bg-[var(--color-gold)]/40 mt-10 md:mt-12 origin-left"
              initial={{ scaleX: 0 }}
              animate={active ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
