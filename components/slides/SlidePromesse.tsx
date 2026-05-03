"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CornerCross } from "@/components/ui/CornerCross";

type Props = { active?: boolean };

export function SlidePromesse({ active = true }: Props) {
  return (
    <section className="relative h-svh md:h-screen w-full md:w-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden snap-start">
      <CornerCross position="tl" />
      <CornerCross position="br" />

      <div className="absolute top-12 md:top-16 left-6 md:left-[10%]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow num="02" label="La promesse" />
        </motion.div>
      </div>

      {/* Phrase centrale unique */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-[14%]">
        <h2
          className="font-display italic font-light text-[var(--color-ink)] text-center leading-[1.05] max-w-5xl"
          style={{ fontSize: "clamp(2.2rem, 7vw, 6rem)" }}
        >
          <AnimatedText
            text="Tu as été fait roi."
            splitBy="word"
            charDelay={0.08}
            delay={0.3}
            inView={active}
          />
          <br />
          <span className="text-[var(--color-gold)]">
            <AnimatedText
              text="Il est temps de régner."
              splitBy="word"
              charDelay={0.08}
              delay={0.9}
              inView={active}
            />
          </span>
        </h2>
      </div>

      {/* Mention auteur en bas, très discrète */}
      <motion.p
        className="absolute bottom-12 md:bottom-12 left-6 md:left-[10%] right-6 md:right-[10%] text-center text-[var(--color-mute)]"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <span className="eyebrow">
          Formation fondée sur la base des enseignements de l&apos;Apôtre Yves Castanou
        </span>
      </motion.p>
    </section>
  );
}
