"use client";

import { motion } from "framer-motion";
import { type Module } from "@/lib/data/modules";
import { type Bloc } from "@/lib/data/blocs";
import { ModuleCell } from "@/components/ui/ModuleCell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BLOC_THEMES } from "@/lib/blocThemes";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  modules: Module[];
  bloc: Bloc;
  slideNum: string;
  active?: boolean;
  blocNum: 1 | 2 | 3 | 4;
};

/**
 * Mobile : pile snap module-par-module.
 * Une "intro de bloc" plein écran + une carte par module, chacune en
 * snap-start full screen — le scroll s'arrête à chaque module, tous
 * sont garantis visibles.
 */
export function MobileDeckStack({
  modules: ms,
  bloc,
  slideNum,
  active,
  blocNum,
}: Props) {
  const theme = BLOC_THEMES[blocNum];
  const isDark = blocNum !== 1;
  const eyebrowVariant = isDark ? "paper" : "ink";
  const sectionStyle = { backgroundColor: theme.bg, ...theme.cssVars } as React.CSSProperties;

  return (
    <div className="md:hidden">
      {/* — INTRO DU BLOC — 1 page plein écran */}
      <section
        className="snap-start h-svh w-full flex flex-col px-6 pt-20 pb-16 relative"
        style={sectionStyle}
      >
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
        >
          <Eyebrow num={slideNum} label={`Bloc ${bloc.roman}`} variant={eyebrowVariant} />
        </motion.div>

        <div className="flex-1 flex flex-col justify-center">
          <motion.span
            className="font-display italic text-[var(--color-gold)]"
            style={{ fontSize: "clamp(3rem, 18vw, 6rem)", lineHeight: 1 }}
            initial={{ opacity: 0, y: 14 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            {bloc.roman}
          </motion.span>

          <motion.span
            className="block h-px bg-[var(--color-gold)] mt-5 mb-6 origin-left"
            initial={{ width: 0 }}
            animate={active ? { width: 56 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          />

          <motion.h2
            className="font-display italic text-[var(--color-ink)]"
            style={{ fontSize: "clamp(2.2rem, 9vw, 3.5rem)", lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 14 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          >
            {bloc.title}
          </motion.h2>

          <motion.p
            className="mt-4 font-display italic text-[var(--color-mute)]"
            style={{ fontSize: "1rem", lineHeight: 1.4 }}
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            {bloc.subtitle}
          </motion.p>

          <motion.p
            className="mt-3 eyebrow text-[var(--color-mute)] tabular-nums"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {bloc.modules}
          </motion.p>
        </div>

        {/* Mini progress des 4 blocs */}
        <div className="flex items-center justify-center gap-2 mb-2">
          {([1, 2, 3, 4] as const).map((n) => (
            <span
              key={n}
              className="block h-1 rounded-full transition-all duration-500"
              style={{
                width: n === blocNum ? 20 : 6,
                backgroundColor: n === blocNum
                  ? "var(--color-gold)"
                  : "var(--color-ink-faint)",
              }}
            />
          ))}
        </div>

        {/* Hint scroll vers le bas */}
        <motion.div
          className="text-center eyebrow text-[var(--color-mute)]"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          ↓ {ms.length} modules
        </motion.div>
      </section>

      {/* — PAGES MODULES — modules courts (≤2 sessions) regroupés par 2 — */}
      {chunkModules(ms).map((chunk, pageIdx, pages) => (
        <article
          key={chunk.map((m) => m.num).join("-")}
          className="snap-start min-h-svh w-full flex flex-col px-6 pt-14 pb-12 bg-[var(--color-paper)]"
        >
          <div className="mb-6 flex items-baseline gap-3">
            <span className="eyebrow text-[var(--color-gold)] tabular-nums">
              {String(pageIdx + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
            </span>
            <span className="block h-px flex-1 bg-[var(--color-ink-line)]" />
            <span className="eyebrow text-[var(--color-mute)]">Bloc {bloc.roman}</span>
          </div>

          <div className="flex-1 flex flex-col gap-8">
            {chunk.map((m, mi) => (
              <div key={m.num}>
                {mi > 0 && (
                  <span className="block h-px w-12 bg-[var(--color-gold)]/40 mb-7" />
                )}
                <ModuleCell module={m} compact withSessions />
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

/**
 * Groupe les modules courts (≤2 sessions) par 2 sur la même page mobile.
 * Les modules longs (≥3 sessions) gardent leur propre page.
 */
function chunkModules(ms: Module[]): Module[][] {
  const chunks: Module[][] = [];
  let buffer: Module[] = [];
  for (const m of ms) {
    if (m.sessions.length >= 3) {
      if (buffer.length > 0) {
        chunks.push(buffer);
        buffer = [];
      }
      chunks.push([m]);
    } else {
      buffer.push(m);
      if (buffer.length === 2) {
        chunks.push(buffer);
        buffer = [];
      }
    }
  }
  if (buffer.length > 0) chunks.push(buffer);
  return chunks;
}
