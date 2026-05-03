"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CornerCross } from "@/components/ui/CornerCross";
import { StairsLight } from "@/components/ui/Icons";

type Props = { active?: boolean };

/**
 * Slide 07 — L'invitation (PDF p7)
 * Clôture éditoriale minimaliste : escalier+lumière + verset Proverbes 24:16 + brand.
 */
export function SlideCTA({ active = true }: Props) {
  return (
    <section className="relative min-h-svh md:h-screen w-full md:w-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden snap-start">
      <CornerCross position="tl" />
      <CornerCross position="tr" />
      <CornerCross position="bl" />
      <CornerCross position="br" />

      <div className="absolute top-12 md:top-16 left-6 md:left-[6%]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Eyebrow num="07" label="L'invitation" />
        </motion.div>
      </div>

      {/* Centre — escalier + verset clôture, tout est visuellement minimal */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-[7%] text-center">
        {/* Pictogramme escalier + lumière */}
        <motion.div
          className="text-[var(--color-ink)] mb-8 md:mb-10"
          initial={{ opacity: 0, y: 14 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <StairsLight size={56} strokeWidth={1.1} />
        </motion.div>

        {/* Verset Proverbes 24:16 — typo monumentale italic */}
        <h2
          className="font-display italic text-[var(--color-ink)] max-w-5xl"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4.8rem)", lineHeight: 1.1 }}
        >
          <AnimatedText
            text="« Le juste tombe sept fois et se relève. »"
            splitBy="word"
            charDelay={0.07}
            delay={0.6}
            inView={active}
            duration={0.85}
          />
        </h2>

        {/* Filet or */}
        <motion.span
          className="block h-px bg-[var(--color-gold)] my-10 md:my-12"
          initial={{ width: 0 }}
          animate={active ? { width: 56 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Attribution */}
        <motion.p
          className="eyebrow text-[var(--color-gold)]"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.7 }}
        >
          Proverbes 24 : 16
        </motion.p>
      </div>

      {/* Brand minimal centré en bas */}
      <motion.footer
        className="px-6 md:px-[7%] pb-10 md:pb-14 flex justify-center"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <span className="eyebrow text-[var(--color-mute)] tracking-[0.3em]">
          Masterclass Royauté
        </span>
      </motion.footer>
    </section>
  );
}
