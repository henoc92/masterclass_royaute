"use client";

import { useEffect, useState } from "react";
import { SlideHero } from "@/components/slides/SlideHero";
import { SlideOverview } from "@/components/slides/SlideOverview";
import { SlideBloc } from "@/components/slides/SlideBloc";
import { SlideCTA } from "@/components/slides/SlideCTA";

type Props = {
  onSlideChange?: (slideIdx: number) => void;
};

/**
 * Mobile : scroll vertical natif avec snap CSS.
 * 7 slides en mapping 1:1 avec le PDF de référence.
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
        <SlideOverview
          active={active === 1}
          onJumpToBloc={(blocIdx) => {
            const target = document.querySelector<HTMLElement>(
              `[data-mobile-slide="${blocIdx + 2}"]`
            );
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      </div>
      <div data-mobile-slide="2">
        <SlideBloc active={active === 2} blocNum={1} slideNum="03" />
      </div>
      <div data-mobile-slide="3">
        <SlideBloc active={active === 3} blocNum={2} slideNum="04" />
      </div>
      <div data-mobile-slide="4">
        <SlideBloc active={active === 4} blocNum={3} slideNum="05" />
      </div>
      <div data-mobile-slide="5">
        <SlideBloc active={active === 5} blocNum={4} slideNum="06" />
      </div>
      <div data-mobile-slide="6">
        <SlideCTA active={active === 6} />
      </div>
    </main>
  );
}
