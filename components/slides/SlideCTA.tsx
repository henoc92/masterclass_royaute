"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CornerCross } from "@/components/ui/CornerCross";

type Props = { active?: boolean };

/**
 * Slide 06 — L'invitation
 * Récap éditorial du parcours, ancré sur Apocalypse 1:6.
 * Pas de formulaire, pas de redondance avec les slides précédentes.
 */
export function SlideCTA({ active = true }: Props) {
  const verbs = ["Préparer", "Former", "Équiper", "Affermir"];

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
          <Eyebrow num="06" label="L'invitation" />
        </motion.div>
      </div>

      {/* Centre : verset fondateur */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-[14%] text-center">
        <motion.span
          className="block h-px bg-[var(--color-gold)] mb-8 md:mb-12"
          initial={{ width: 0 }}
          animate={active ? { width: 48 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        <h2
          className="font-display italic text-[var(--color-ink)] max-w-4xl"
          style={{ fontSize: "clamp(1.5rem, 3.4vw, 3rem)", lineHeight: 1.25 }}
        >
          <AnimatedText
            text="« À celui qui nous a aimés et qui nous a lavés de nos péchés par son sang, et qui nous a faits rois et sacrificateurs de Dieu son Père. »"
            splitBy="word"
            charDelay={0.02}
            delay={0.6}
            inView={active}
            duration={0.8}
          />
        </h2>

        <motion.p
          className="mt-6 md:mt-8 eyebrow text-[var(--color-gold)]"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          Apocalypse 1 : 6
        </motion.p>

        {/* Les 4 verbes du parcours */}
        <motion.div
          className="mt-14 md:mt-20 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:gap-x-5"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.9 }}
        >
          {verbs.map((v, i) => (
            <span key={v} className="flex items-center gap-3 md:gap-5">
              <span
                className="font-display italic text-[var(--color-mute)]"
                style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)" }}
              >
                {v}
              </span>
              {i < verbs.length - 1 && (
                <span className="text-[var(--color-ink-faint)]">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Footer minimal — citation centrée pour éviter tout overlap avec l'indicateur slide */}
      <footer className="border-t border-[var(--color-ink)]/10 px-6 md:px-[14%] py-5 md:py-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-8 text-[var(--color-mute)]">
        <span className="hidden md:block eyebrow">Masterclass · Royauté</span>
        <span
          className="font-display italic text-center"
          style={{ fontSize: "clamp(0.8rem, 1.2vw, 1rem)" }}
        >
          « Le juste tombe sept fois et se relève. » — Proverbes 24 : 16
        </span>
        <span className="hidden md:block" />
      </footer>
    </section>
  );
}
