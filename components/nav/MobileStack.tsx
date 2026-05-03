"use client";

import { useEffect, useState } from "react";
import { SlideHero } from "@/components/slides/SlideHero";
import { SlidePromesse } from "@/components/slides/SlidePromesse";
import { SlideBlocs } from "@/components/slides/SlideBlocs";
import { SlideModules } from "@/components/slides/SlideModules";
import { SlideFormat } from "@/components/slides/SlideFormat";
import { SlideCTA } from "@/components/slides/SlideCTA";

type Props = {
  onSlideChange?: (slideIdx: number) => void;
};

/**
 * Mobile : scroll vertical natif avec snap CSS.
 * Chaque section = 100svh (sauf modules + CTA qui peuvent dépasser).
 * Détection de la slide active via IntersectionObserver pour activer les animations.
 */
export function MobileStack({ onSlideChange }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-mobile-slide]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const i = Number(entry.target.getAttribute("data-mobile-slide"));
            setActive(i);
            onSlideChange?.(i);
          }
        });
      },
      { threshold: [0.5, 0.7] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onSlideChange]);

  return (
    <main className="md:hidden snap-y snap-mandatory overflow-y-scroll h-svh w-full scrollbar-hide">
      <div data-mobile-slide="0">
        <SlideHero active={active === 0} />
      </div>
      <div data-mobile-slide="1">
        <SlidePromesse active={active === 1} />
      </div>
      <div data-mobile-slide="2">
        <SlideBlocs active={active === 2} />
      </div>
      <div data-mobile-slide="3">
        <SlideModules active={active === 3} />
      </div>
      <div data-mobile-slide="4">
        <SlideFormat active={active === 4} />
      </div>
      <div data-mobile-slide="5">
        <SlideCTA active={active === 5} />
      </div>
    </main>
  );
}
