"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CornerCross } from "@/components/ui/CornerCross";

type Props = { active?: boolean };

export function SlideFormat({ active = true }: Props) {
  const stats = [
    { value: 12, label: "modules" },
    { value: 24, label: "sessions" },
    { value: 12, label: "heures de formation", suffix: "h", prefix: "~" },
  ];

  return (
    <section className="relative h-svh md:h-screen w-full md:w-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden snap-start">
      <CornerCross position="tr" />
      <CornerCross position="bl" />

      <div className="absolute top-12 md:top-16 left-6 md:left-[10%]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Eyebrow num="05" label="Le format" />
        </motion.div>
      </div>

      {/* 3 chiffres horizontaux */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-[14%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-end">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="font-display italic font-light text-[var(--color-ink)] tabular-nums"
                style={{ fontSize: "clamp(4.5rem, 11vw, 10rem)", lineHeight: 1 }}
              >
                <Counter
                  target={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                  active={active}
                  duration={1400}
                />
              </div>
              <p className="mt-4 md:mt-6 eyebrow text-[var(--color-mute)]">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Phrase finale */}
        <motion.p
          className="mt-16 md:mt-24 text-center font-display italic font-light text-[var(--color-mute)] mx-auto max-w-xl"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", lineHeight: 1.3 }}
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.8 }}
        >
          « Une formation dense, pensée pour les dirigeants. »
        </motion.p>
      </div>
    </section>
  );
}
