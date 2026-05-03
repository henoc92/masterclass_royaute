type Props = {
  position: "tl" | "tr" | "bl" | "br";
  variant?: "ink" | "paper" | "gold";
  className?: string;
};

/**
 * Petite croix décorative au coin — touche art direction empruntée à v6.usestate.org.
 * Utilisée parcimonieusement aux 4 coins de l'écran sur certaines slides.
 */
export function CornerCross({ position, variant = "ink", className = "" }: Props) {
  const positionClass = {
    tl: "top-6 left-6",
    tr: "top-6 right-6",
    bl: "bottom-6 left-6",
    br: "bottom-6 right-6",
  }[position];

  const colorClass =
    variant === "gold"
      ? "text-[var(--color-gold)]"
      : variant === "paper"
      ? "text-[var(--color-paper)]"
      : "text-[var(--color-ink)]";

  return (
    <span
      aria-hidden
      className={`absolute pointer-events-none select-none ${positionClass} ${colorClass} ${className}`}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      </svg>
    </span>
  );
}
