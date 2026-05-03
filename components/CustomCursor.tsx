"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Curseur custom desktop — cercle marine 12px qui suit la souris en lag léger.
 * Grossit à 40px sur les éléments interactifs, devient or sur les liens, blanc avec "View" sur les images.
 * Désactivé sur mobile (pointer: coarse).
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoverState, setHoverState] = useState<"idle" | "link" | "button">("idle");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 400, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("a, button, [role='button']")) {
        setHoverState("button");
      } else {
        setHoverState("idle");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const isHover = hoverState !== "idle";

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[200] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.span
        className="block rounded-full"
        animate={{
          width: isHover ? 40 : 10,
          height: isHover ? 40 : 10,
          x: isHover ? -20 : -5,
          y: isHover ? -20 : -5,
          backgroundColor: isHover ? "rgba(201, 168, 76, 1)" : "rgba(250, 250, 247, 1)",
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
