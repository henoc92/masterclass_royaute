"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CornerCross } from "@/components/ui/CornerCross";
import { CrownShield } from "@/components/ui/Icons";

type Props = { active?: boolean };

export function SlideHero({ active = true }: Props) {
  return (
    <section className="relative h-svh md:h-screen w-full md:w-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden snap-start">
      <CornerCross position="tl" variant="ink" />
      <CornerCross position="tr" variant="ink" />
      <CornerCross position="bl" variant="ink" />
      <CornerCross position="br" variant="ink" />

      {/* Eyebrow */}
      <div className="absolute top-12 md:top-16 left-6 md:left-[10%]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow num="01" label="Masterclass" />
        </motion.div>
      </div>

      {/* Titre monumental — typographie EST le hero, couronne en signe d'autorité */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-[10%]">
        <motion.div
          className="text-[var(--color-ink)] mb-3 md:mb-5"
          initial={{ opacity: 0, y: -10, scale: 0.92 }}
          animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <CrownShield size={56} strokeWidth={1.1} className="md:[&]:w-[72px] md:[&]:h-[72px]" />
        </motion.div>
        <h1
          className="font-display italic font-light text-[var(--color-ink)] leading-[0.92]"
          style={{ fontSize: "clamp(4.5rem, 18vw, 15rem)" }}
        >
          <AnimatedText text="Royauté." inView={active} delay={0.4} charDelay={0.04} />
        </h1>

        <motion.p
          className="mt-6 md:mt-10 font-display italic font-light text-[var(--color-mute)] max-w-md md:max-w-2xl"
          style={{ fontSize: "clamp(1.1rem, 2.4vw, 2.2rem)", lineHeight: 1.25 }}
          initial={{ opacity: 0, y: 14 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Impacter et diriger
          <br />
          en milieu hostile
        </motion.p>
      </div>

      {/* Mention bas-centre — séparée de l'indicateur slide en bas-droite */}
      <motion.div
        className="absolute bottom-16 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[var(--color-mute)]"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <span className="eyebrow">
          <span className="md:hidden">↓ Défile pour explorer</span>
          <span className="hidden md:inline">Glisse pour explorer →</span>
        </span>
      </motion.div>
    </section>
  );
}
