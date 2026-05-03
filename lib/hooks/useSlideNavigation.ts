"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Navigation desktop horizontale slide par slide.
 * - Intercepte molette/trackpad vertical et le redirige en navigation horizontale
 * - Throttle 800ms pour éviter de skipper plusieurs slides
 * - Supporte un index "logique" qui peut inclure des sous-positions (slide 3 = 4 sub-blocs)
 */
export function useSlideNavigation(totalLogical: number, throttleMs = 850) {
  const [logicalIndex, setLogicalIndex] = useState(0);
  const lockRef = useRef(false);
  const lastWheelTime = useRef(0);

  const goTo = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(totalLogical - 1, i));
      if (next === logicalIndex || lockRef.current) return;
      lockRef.current = true;
      setLogicalIndex(next);
      window.setTimeout(() => {
        lockRef.current = false;
      }, throttleMs);
    },
    [logicalIndex, totalLogical, throttleMs]
  );

  const next = useCallback(() => goTo(logicalIndex + 1), [goTo, logicalIndex]);
  const prev = useCallback(() => goTo(logicalIndex - 1), [goTo, logicalIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Ne pas activer la nav horizontale sur mobile/tablette (pointer coarse)
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const onWheel = (e: WheelEvent) => {
      // Le scroll horizontal naturel (trackpad) reste possible mais on intercepte tout
      if (lockRef.current) {
        e.preventDefault();
        return;
      }
      // On considère le delta dominant
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 8) return;

      const now = performance.now();
      if (now - lastWheelTime.current < 80) {
        e.preventDefault();
        return;
      }
      lastWheelTime.current = now;

      e.preventDefault();
      if (delta > 0) next();
      else prev();
    };

    const onKey = (e: KeyboardEvent) => {
      // Ignore si focus sur input/textarea
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;

      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [next, prev]);

  return { logicalIndex, goTo, next, prev, isLocked: () => lockRef.current };
}
