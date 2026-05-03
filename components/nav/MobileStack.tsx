"use client";

import { useEffect, useRef, useState } from "react";
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
 *
 * Détection active via scrollTop (pas IntersectionObserver) :
 * les blocs sont N×svh donc l'IO ne dépasse jamais 0.5 de ratio.
 */
export function MobileStack({ onSlideChange }: Props) {
  const [active, setActive] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const sections = Array.from(
      main.querySelectorAll<HTMLElement>("[data-mobile-slide]")
    );
    if (sections.length === 0) return;

    const onScroll = () => {
      const triggerY = main.clientHeight * 0.3; // 30% du haut
      const scrollY = main.scrollTop;
      let idx = 0;
      for (const s of sections) {
        if (s.offsetTop <= scrollY + triggerY) {
          idx = Number(s.getAttribute("data-mobile-slide"));
        }
      }
      setActive((prev) => (prev !== idx ? (onSlideChange?.(idx), idx) : prev));
    };

    main.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => main.removeEventListener("scroll", onScroll);
  }, [onSlideChange]);

  return (
    <main
      ref={mainRef}
      className="md:hidden relative snap-y snap-proximity overflow-y-scroll overflow-x-hidden h-svh w-full scrollbar-hide overscroll-y-contain"
    >
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
