"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  startWhenVisible?: boolean;
  active?: boolean;
};

/**
 * Compteur "slot machine" qui s'incrémente de 0 jusqu'à `target` avec un easing out quart.
 * Inspiré du preloader Bennet (01234567890 → 100).
 */
export function Counter({
  target,
  duration = 1400,
  prefix = "",
  suffix = "",
  className = "",
  startWhenVisible = true,
  active = true,
}: Props) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? target : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const triggered = useRef(false);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const shouldStart = startWhenVisible ? inView : true;
    if (!shouldStart || triggered.current) return;
    triggered.current = true;

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, startWhenVisible, active, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
