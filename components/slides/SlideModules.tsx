"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { modules, type Session } from "@/lib/data/modules";
import { blocs } from "@/lib/data/blocs";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CornerCross } from "@/components/ui/CornerCross";

function BlocHeader({ blocNum, dense = false }: { blocNum: 1 | 2 | 3 | 4; dense?: boolean }) {
  const bloc = blocs[blocNum - 1];
  return (
    <div className={`flex items-baseline gap-3 ${dense ? "mt-5 mb-3" : "mt-6 mb-4"}`}>
      <span
        className="font-display italic text-[var(--color-gold)]"
        style={{ fontSize: dense ? "0.95rem" : "1.05rem" }}
      >
        {bloc.roman}
      </span>
      <span className="block h-px flex-1 max-w-[3rem] bg-[var(--color-gold)]/50" />
      <span className="eyebrow text-[var(--color-gold)] tracking-[0.18em]">
        {bloc.title}
      </span>
    </div>
  );
}

type Props = { active?: boolean };

function SessionBlock({ session, dense = false }: { session: Session; dense?: boolean }) {
  return (
    <div className={dense ? "" : "grid grid-cols-[3rem_1fr] gap-4"}>
      {!dense && <span className="eyebrow text-[var(--color-gold)] pt-1">{session.num}</span>}
      <div>
        {dense && (
          <div className="flex items-baseline gap-3 mb-1.5">
            <span className="eyebrow text-[var(--color-gold)]">{session.num}</span>
            <p
              className="font-display italic font-light text-[var(--color-ink)]"
              style={{ fontSize: "0.98rem", lineHeight: 1.3 }}
            >
              {session.title}
            </p>
          </div>
        )}
        {!dense && (
          <p
            className="font-display italic font-light text-[var(--color-ink)]"
            style={{ fontSize: "1.15rem", lineHeight: 1.3 }}
          >
            {session.title}
          </p>
        )}

        {session.lead && (
          <p
            className={`mt-2 italic text-[var(--color-mute)] ${
              dense ? "text-xs pl-0" : "text-sm"
            }`}
          >
            {session.lead}
          </p>
        )}

        <ul className="mt-2 space-y-1.5">
          {session.points.map((p, i) => (
            <li
              key={i}
              className={`flex gap-3 text-[var(--color-mute)] ${
                dense ? "text-xs leading-relaxed" : "text-sm leading-relaxed"
              }`}
            >
              <span
                aria-hidden
                className="inline-flex items-center shrink-0 h-[1.625em]"
                style={{ width: "0.85rem" }}
              >
                <span className="block h-px w-full bg-[var(--color-gold)]/70" />
              </span>
              <span className="flex-1">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SlideModules({ active = true }: Props) {
  const [selected, setSelected] = useState(0);
  const current = modules[selected];

  return (
    <section className="relative min-h-svh md:h-screen w-full md:w-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden snap-start">
      <CornerCross position="tl" />
      <CornerCross position="br" />

      <div className="absolute top-12 md:top-16 left-6 md:left-[10%] z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Eyebrow num="04" label="Le programme" />
        </motion.div>
      </div>

      {/* — DESKTOP — split 40/60 */}
      <div className="hidden md:flex flex-1 pt-32 pb-24 px-[10%] gap-12">
        {/* Liste 40% */}
        <div className="w-[40%] overflow-y-auto pr-4 scrollbar-hide">
          <ul className="space-y-1">
            {modules.map((m, i) => {
              const isFirstOfBloc = i === 0 || modules[i - 1].blocNum !== m.blocNum;
              return (
                <li key={m.num}>
                  {isFirstOfBloc && <BlocHeader blocNum={m.blocNum} />}
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    className={`group flex items-baseline gap-3 py-1.5 transition-all duration-300 text-left ${
                      i === selected
                        ? "translate-x-2 text-[var(--color-gold)]"
                        : "text-[var(--color-ink)] hover:translate-x-2 hover:text-[var(--color-gold)]"
                    }`}
                  >
                    <span className="eyebrow opacity-60 tabular-nums">{m.num}</span>
                    <span
                      className="font-display italic font-light"
                      style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.2rem)" }}
                    >
                      {m.title}
                    </span>
                    <span
                      className={`relative inline-block h-px bg-current transition-all duration-500 ${
                        i === selected ? "w-8 ml-2" : "w-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Détail 60% */}
        <div className="flex-1 flex flex-col overflow-y-auto pr-2 scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.num}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <div className="flex items-baseline gap-6">
                <span
                  className="font-display italic font-light text-[var(--color-gold)]"
                  style={{ fontSize: "clamp(4rem, 9vw, 9rem)", lineHeight: 0.9 }}
                >
                  {current.num}
                </span>
                <div className="flex-1">
                  <h3
                    className="font-display italic font-light text-[var(--color-ink)]"
                    style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)", lineHeight: 1.1 }}
                  >
                    {current.title}
                  </h3>
                  <p className="mt-3 font-display italic text-[var(--color-mute)] text-base lg:text-lg">
                    {current.theme}
                  </p>
                </div>
              </div>

              <span className="my-8 block h-px w-16 bg-[var(--color-gold)]" />

              <div className="space-y-8">
                {current.sessions.map((s) => (
                  <SessionBlock key={s.num} session={s} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* — MOBILE — strip swipe horizontal (1 carte par module, pattern app) */}
      <MobileModulesStrip />
    </section>
  );
}

function MobileModulesStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const lastIdx = useRef(0);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      if (i !== lastIdx.current && i >= 0 && i < modules.length) {
        lastIdx.current = i;
        setActiveIdx(i);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (i: number) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * i, behavior: "smooth" });
  };

  const current = modules[activeIdx];
  const bloc = blocs[current.blocNum - 1];

  return (
    <div className="md:hidden flex-1 flex flex-col pt-20 pb-6">
      {/* Bandeau bloc actuel — change avec le swipe */}
      <div className="px-6 mb-4 flex items-baseline gap-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={bloc.roman}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-baseline gap-3 flex-1"
          >
            <span className="font-display italic text-[var(--color-gold)] text-base">
              {bloc.roman}
            </span>
            <span className="block h-px w-7 bg-[var(--color-gold)]/50" />
            <span className="eyebrow text-[var(--color-gold)]">{bloc.title}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Strip horizontal — une carte par module */}
      <div
        ref={stripRef}
        className="flex-1 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {modules.map((m) => (
          <article
            key={m.num}
            className="snap-center shrink-0 w-screen flex flex-col overflow-y-auto px-6 pb-2 scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex items-baseline gap-4 mb-3">
              <span
                className="font-display italic text-[var(--color-gold)] tabular-nums"
                style={{ fontSize: "3.2rem", lineHeight: 0.85 }}
              >
                {m.num}
              </span>
              <h3
                className="font-display italic text-[var(--color-ink)] flex-1"
                style={{ fontSize: "1.35rem", lineHeight: 1.15 }}
              >
                {m.title}
              </h3>
            </div>

            <p className="font-display italic text-[var(--color-mute)] text-sm leading-snug mb-5 pr-2">
              {m.theme}
            </p>

            <span className="block h-px w-12 bg-[var(--color-gold)] mb-5" />

            <div className="space-y-5">
              {m.sessions.map((s) => (
                <SessionBlock key={s.num} session={s} dense />
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Compteur + barre de progression */}
      <div className="px-6 mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => scrollTo(Math.max(0, activeIdx - 1))}
          disabled={activeIdx === 0}
          aria-label="Module précédent"
          className="text-[var(--color-mute)] disabled:opacity-30 transition-opacity"
        >
          ←
        </button>
        <span className="eyebrow text-[var(--color-gold)] tabular-nums shrink-0">
          {String(activeIdx + 1).padStart(2, "0")}
          <span className="text-[var(--color-mute)]"> / 12</span>
        </span>
        <div className="flex-1 h-px bg-[var(--color-ink)]/15 relative overflow-hidden">
          <motion.span
            className="absolute top-0 left-0 h-full bg-[var(--color-gold)]"
            animate={{ width: `${((activeIdx + 1) / modules.length) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <button
          type="button"
          onClick={() => scrollTo(Math.min(modules.length - 1, activeIdx + 1))}
          disabled={activeIdx === modules.length - 1}
          aria-label="Module suivant"
          className="text-[var(--color-mute)] disabled:opacity-30 transition-opacity"
        >
          →
        </button>
      </div>
    </div>
  );
}
