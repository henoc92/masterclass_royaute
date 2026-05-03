"use client";

import { motion } from "framer-motion";
import { modules } from "@/lib/data/modules";
import { blocs } from "@/lib/data/blocs";
import { ModuleCell } from "@/components/ui/ModuleCell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CornerCross } from "@/components/ui/CornerCross";
import { MobileDeckStack } from "@/components/ui/MobileDeckStack";
import { moduleIconMap } from "@/components/ui/Icons";
import { BLOC_THEMES } from "@/lib/blocThemes";

const EASE = [0.22, 1, 0.36, 1] as const;

type BlocNum = 1 | 2 | 3 | 4;

/**
 * Bande de couleur signature de chaque bloc.
 * Chaque bloc a sa propre orientation pour différenciation visuelle :
 * I  Fondation     → top    (la base)
 * II Exigences     → left   (la verticale, l'élévation)
 * III Sagesse      → right  (la balance, l'autre côté)
 * IV Gloire        → bottom (la culmination)
 */
function BlocFrame({ blocNum, animated = true }: { blocNum: BlocNum; animated?: boolean }) {
  const config = {
    1: { className: "top-0 left-0 right-0 h-[3px]", initial: { scaleX: 0 }, animate: { scaleX: 1 }, origin: "origin-left" },
    2: { className: "top-0 bottom-0 left-0 w-[3px]", initial: { scaleY: 0 }, animate: { scaleY: 1 }, origin: "origin-top" },
    3: { className: "top-0 bottom-0 right-0 w-[3px]", initial: { scaleY: 0 }, animate: { scaleY: 1 }, origin: "origin-top" },
    4: { className: "bottom-0 left-0 right-0 h-[3px]", initial: { scaleX: 0 }, animate: { scaleX: 1 }, origin: "origin-left" },
  }[blocNum];

  return (
    <motion.span
      aria-hidden
      className={`absolute z-20 bg-[var(--color-gold)] ${config.className} ${config.origin}`}
      initial={animated ? config.initial : config.animate}
      animate={config.animate}
      transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
    />
  );
}

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
  const theme = BLOC_THEMES[blocNum];
  const sectionStyle = { ...theme.cssVars } as React.CSSProperties;

  return (
    <section
      className="relative w-full md:w-screen md:h-screen text-[var(--color-ink)] md:overflow-hidden snap-start"
      style={{ backgroundColor: theme.bg, ...sectionStyle }}
    >
      {/* Bande de couleur signature (mobile + desktop) */}
      <BlocFrame blocNum={blocNum} animated={active} />

      {/* — MOBILE — deck of cards module-en-module */}
      <MobileDeckStack
        modules={ms}
        bloc={bloc}
        slideNum={slideNum}
        active={active}
        blocNum={blocNum}
      />

      {/* — DESKTOP — matrice fixe avec watermark + eyebrow + progress */}
      <div className="hidden md:flex md:flex-col md:absolute md:inset-0 md:w-full md:h-full">
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
      <div className="flex-1 px-6 md:px-[6%] pt-8 md:pt-10 pb-20 md:pb-16 md:overflow-y-auto scrollbar-hide">
        {blocNum === 1 && <MatrixFondation modules={ms} active={active} />}
        {blocNum === 2 && <MatrixExigences modules={ms} active={active} />}
        {blocNum === 3 && <MatrixSagesse modules={ms} active={active} />}
        {blocNum === 4 && <MatrixGloire modules={ms} active={active} />}
      </div>
      </div>
    </section>
  );
}

// — Bloc I — 3 colonnes équilibrées (3 modules après merge 03+04) —
function MatrixFondation({ modules: ms, active }: { modules: typeof modules; active: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 md:gap-x-10 gap-y-8 md:gap-y-0 max-w-6xl mx-auto">
      {ms.map((m, i) => (
        <ModuleCell
          key={m.num}
          module={m}
          delay={active ? 0.45 + i * 0.12 : 0}
          withSessions
          compact
        />
      ))}
    </div>
  );
}

// — Bloc II — Escalier ascendant — vraies marches visibles —
function MatrixExigences({ modules: ms, active }: { modules: typeof modules; active: boolean }) {
  // Heights des plateformes (px desktop) — chaque module monte de 24px
  const platforms = [72, 48, 24, 0];

  return (
    <div className="relative max-w-6xl mx-auto pt-6 md:pt-10">
      {/* — DESKTOP — vraies marches visibles avec animation séquentielle */}
      <div className="hidden md:block relative">
        <svg
          className="absolute inset-x-0 -top-2 w-full pointer-events-none"
          style={{ height: "calc(100% + 16px)" }}
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          {/* 4 marches : chaque marche = un riser vertical + une plateforme horizontale */}
          {[0, 1, 2, 3].map((i) => {
            const y = 24 + (3 - i) * 24; // 96, 72, 48, 24 (du plus bas au plus haut)
            const xStart = i * 250;
            const xEnd = (i + 1) * 250;
            const prevY = i === 0 ? null : 24 + (3 - (i - 1)) * 24;
            return (
              <g key={i}>
                {/* Riser vertical (sauf pour le 1er) */}
                {prevY !== null && (
                  <motion.line
                    x1={xStart}
                    y1={prevY}
                    x2={xStart}
                    y2={y}
                    stroke="var(--color-gold)"
                    strokeWidth="2"
                    strokeLinecap="square"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={active ? { pathLength: 1, opacity: 0.55 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.35 + i * 0.35,
                      ease: EASE,
                    }}
                  />
                )}
                {/* Plateforme horizontale */}
                <motion.line
                  x1={xStart}
                  y1={y}
                  x2={xEnd}
                  y2={y}
                  stroke="var(--color-gold)"
                  strokeWidth="2"
                  strokeLinecap="square"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={active ? { pathLength: 1, opacity: 0.55 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + i * 0.35 + (prevY !== null ? 0.25 : 0),
                    ease: EASE,
                  }}
                />
                {/* Marqueur de palier — petit tick au début de la plateforme */}
                <motion.circle
                  cx={xStart + 6}
                  cy={y}
                  r="3"
                  fill="var(--color-gold)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={active ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.7 + i * 0.35,
                    ease: EASE,
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Modules posés sur les marches */}
        <div className="grid grid-cols-4 gap-x-6 items-end relative pt-6">
          {ms.map((m, i) => (
            <div key={m.num} style={{ marginTop: platforms[i] + "px" }}>
              <ModuleCell
                module={m}
                delay={active ? 0.55 + i * 0.35 : 0}
                withSessions
                compact
              />
            </div>
          ))}
        </div>
      </div>

      {/* — MOBILE — empilement vertical avec petits marqueurs de marche */}
      <div className="md:hidden flex flex-col gap-7">
        {ms.map((m, i) => (
          <div key={m.num} className="flex gap-4 items-start">
            <div className="flex flex-col items-center pt-1 shrink-0">
              <span
                className={`block h-2 w-2 rounded-full transition-colors ${
                  active ? "bg-[var(--color-gold)]" : "bg-[var(--color-ink-faint)]"
                }`}
              />
              {i < ms.length - 1 && (
                <motion.span
                  className="block w-px bg-[var(--color-gold)]/50 mt-2 origin-top"
                  style={{ height: "calc(100% + 14px)" }}
                  initial={{ scaleY: 0 }}
                  animate={active ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.2, ease: EASE }}
                />
              )}
            </div>
            <div className="flex-1">
              <ModuleCell
                module={m}
                delay={active ? 0.4 + i * 0.2 : 0}
                withSessions
                compact
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// — Bloc III — 2 colonnes resserrées + filet vertical (densifié) —
function MatrixSagesse({ modules: ms, active }: { modules: typeof modules; active: boolean }) {
  return (
    <div className="relative max-w-3xl mx-auto pt-6 md:pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-0 gap-x-8 md:gap-x-10">
        {ms.map((m, i) => (
          <ModuleCell
            key={m.num}
            module={m}
            delay={active ? 0.45 + i * 0.18 : 0}
            withSessions
            compact
          />
        ))}
      </div>
      <motion.span
        className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-[var(--color-gold)]/30 -translate-x-1/2 origin-top"
        initial={{ scaleY: 0 }}
        animate={active ? { scaleY: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
      />
    </div>
  );
}

// — Bloc IV — Module unique centré, 4 sessions en grille dense (1 module après merge 11+12) —
function MatrixGloire({ modules: ms, active }: { modules: typeof modules; active: boolean }) {
  const m = ms[0];
  if (!m) return null;
  const Icon = moduleIconMap[m.icon];
  return (
    <div className="max-w-5xl mx-auto pt-4 md:pt-6">
      {/* Header module — picto + numéro + titre + thème, layout horizontal */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
        className="flex items-start gap-5 md:gap-8 pb-6 md:pb-8 mb-6 md:mb-10 border-b border-[var(--color-ink-line)]"
      >
        <div className="text-[var(--color-ink)] shrink-0">
          <Icon size={48} strokeWidth={1.1} />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-3 mb-1">
            <span
              className="font-display italic text-[var(--color-gold)] tabular-nums"
              style={{ fontSize: "1.4rem" }}
            >
              {m.num}
            </span>
            <span className="text-[var(--color-ink-faint)]">|</span>
            <h3
              className="font-display italic text-[var(--color-ink)]"
              style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", lineHeight: 1.15 }}
            >
              {m.title}
            </h3>
          </div>
          <p className="font-display italic text-[var(--color-mute)] text-sm md:text-base">
            {m.theme}
          </p>
        </div>
      </motion.div>

      {/* 4 sessions en grille 2×2 — chacune avec son lead + points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-14 gap-y-7 md:gap-y-9">
        {m.sessions.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 12 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.65 + i * 0.12, ease: EASE }}
            className="flex gap-3"
          >
            <span className="eyebrow text-[var(--color-gold)] tabular-nums shrink-0 pt-0.5">
              {s.num}
            </span>
            <div className="flex-1">
              <p
                className="font-display italic text-[var(--color-ink)] mb-2"
                style={{ fontSize: "1rem", lineHeight: 1.3 }}
              >
                {s.title}
              </p>
              {s.lead && (
                <p className="text-xs italic text-[var(--color-mute)] mb-2">{s.lead}</p>
              )}
              <ul className="space-y-1.5">
                {s.points.map((p, pi) => (
                  <li
                    key={pi}
                    className="flex gap-2.5 text-xs leading-relaxed text-[var(--color-mute)]"
                  >
                    <span
                      aria-hidden
                      className="inline-flex items-center shrink-0 h-[1.625em]"
                      style={{ width: "0.7rem" }}
                    >
                      <span className="block h-px w-full bg-[var(--color-gold)]/70" />
                    </span>
                    <span className="flex-1">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// — Ancienne version Bloc IV avec 2 modules (gardée commentée pour référence) —
function _MatrixGloireLegacy({ modules: ms, active }: { modules: typeof modules; active: boolean }) {
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
