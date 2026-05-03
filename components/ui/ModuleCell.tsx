"use client";

import { motion } from "framer-motion";
import { type Module } from "@/lib/data/modules";
import { moduleIconMap } from "@/components/ui/Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  module: Module;
  delay?: number;
  /** Affiche les sessions sous le module (mode PDF complet) */
  withSessions?: boolean;
  /** Variation compacte pour mobile / matrices denses */
  compact?: boolean;
};

/**
 * Cellule module — picto + numéro + titre + thème + (optionnel) sessions inline.
 * Reproduit le format des cellules du PDF Masterclass Royauté.
 */
export function ModuleCell({
  module: m,
  delay = 0,
  withSessions = true,
  compact = false,
}: Props) {
  const Icon = moduleIconMap[m.icon];
  const iconSize = compact ? 28 : 36;
  const titleSize = compact ? "1rem" : "1.15rem";
  const themeSize = compact ? "0.78rem" : "0.88rem";
  const sessionSize = compact ? "0.72rem" : "0.82rem";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className="flex flex-col"
    >
      <div className="text-[var(--color-ink)] mb-3 md:mb-4">
        <Icon size={iconSize} strokeWidth={1.1} />
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span
          className="font-display italic text-[var(--color-gold)] tabular-nums"
          style={{ fontSize: compact ? "0.95rem" : "1.05rem" }}
        >
          {m.num}
        </span>
        <span className="text-[var(--color-ink-faint)]">|</span>
        <h4
          className="font-display italic text-[var(--color-ink)] flex-1"
          style={{ fontSize: titleSize, lineHeight: 1.15 }}
        >
          {m.title}
        </h4>
      </div>

      <p
        className="font-display italic text-[var(--color-mute)] leading-snug pr-2 mb-3"
        style={{ fontSize: themeSize }}
      >
        {m.theme}
      </p>

      {withSessions && (
        <ul className="space-y-2.5">
          {m.sessions.map((s) => (
            <li key={s.num} className="flex gap-3 leading-snug" style={{ fontSize: sessionSize }}>
              <span className="text-[var(--color-gold)] tabular-nums shrink-0 font-medium">
                {s.num}
              </span>
              <p className="text-[var(--color-ink)] flex-1">
                <span className="font-medium">{s.title}</span>{" "}
                <span className="text-[var(--color-mute)]">
                  {s.lead && `${s.lead} `}
                  {s.points.join(" · ")}.
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
