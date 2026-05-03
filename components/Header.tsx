"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  currentSlide: number;
  totalSlides?: number;
  onJump?: (slideIdx: number) => void;
};

const TOTAL = 7;

const labels = [
  { label: "Royauté", short: "01" },
  { label: "Vue d'ensemble", short: "02" },
  { label: "Fondation", short: "03" },
  { label: "Exigences", short: "04" },
  { label: "Sagesse", short: "05" },
  { label: "Gloire", short: "06" },
  { label: "L'invitation", short: "07" },
];

export function Header({ currentSlide, totalSlides = 6, onJump }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleJump = (i: number) => {
    setOpen(false);
    onJump?.(i);
  };

  return (
    <>
      {/* Header sticky */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-[10%] py-5 flex items-center justify-between mix-blend-difference text-[var(--color-paper)]">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleJump(0)}
          className="font-display italic text-base md:text-lg tracking-tight transition-opacity hover:opacity-70"
        >
          Masterclass · Royauté
        </button>

        {/* Indicateur centre — desktop only */}
        <nav className="hidden md:flex items-center gap-3 text-xs">
          {labels.map((l, i) => (
            <button
              key={l.short}
              type="button"
              onClick={() => handleJump(i)}
              className="eyebrow tabular-nums transition-opacity"
              style={{ opacity: i === currentSlide ? 1 : 0.4 }}
            >
              {l.short}
              {i < totalSlides - 1 && <span className="ml-3 opacity-50">—</span>}
            </button>
          ))}
        </nav>

        {/* Burger seul (CTA s'inscrire retiré) */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 group"
          >
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                open ? "w-5 rotate-45 translate-y-[3.5px]" : "w-5"
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                open ? "w-5 -rotate-45 -translate-y-[3.5px]" : "w-3 group-hover:w-5"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Overlay menu plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[var(--color-ink)] text-[var(--color-paper)] flex flex-col"
          >
            {/* Header overlay (close button) */}
            <div className="px-6 md:px-[10%] py-5 flex items-center justify-between">
              <span className="font-display italic text-base md:text-lg">
                Masterclass · Royauté
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              >
                <span className="block h-px w-5 bg-current rotate-45 translate-y-[3.5px]" />
                <span className="block h-px w-5 bg-current -rotate-45 -translate-y-[3.5px]" />
              </button>
            </div>

            {/* Liens */}
            <nav className="flex-1 flex flex-col justify-center gap-2 px-6 md:px-[14%]">
              {labels.map((l, i) => (
                <motion.button
                  key={l.short}
                  type="button"
                  onClick={() => handleJump(i)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-baseline gap-4 md:gap-8 py-2 md:py-3 text-left transition-colors hover:text-[var(--color-gold)]"
                >
                  <span className="eyebrow opacity-50 tabular-nums">{l.short}</span>
                  <span
                    className="font-display italic font-light"
                    style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", lineHeight: 1.05 }}
                  >
                    {l.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Footer overlay */}
            <div className="px-6 md:px-[10%] py-6 flex justify-between items-baseline text-[var(--color-paper)]/50 eyebrow">
              <span>Masterclass · Royauté</span>
              <span>№ {String(TOTAL).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
