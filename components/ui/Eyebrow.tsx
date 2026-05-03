type Props = {
  num?: string;
  label: string;
  variant?: "ink" | "gold" | "paper";
  className?: string;
};

/**
 * Eyebrow signature : `№ 01 — LABEL` avec petit filet horizontal.
 */
export function Eyebrow({ num, label, variant = "ink", className = "" }: Props) {
  const colorClass =
    variant === "gold"
      ? "text-[var(--color-gold)]"
      : variant === "paper"
      ? "text-[var(--color-paper)]"
      : "text-[var(--color-mute)]";

  const lineClass =
    variant === "gold"
      ? "bg-[var(--color-gold)]"
      : variant === "paper"
      ? "bg-[var(--color-paper)]"
      : "bg-[var(--color-mute)]";

  return (
    <div className={`inline-flex items-center gap-3 ${colorClass} ${className}`}>
      <span className={`block h-px w-7 ${lineClass} opacity-60`} />
      <span className="eyebrow">
        {num ? `№ ${num} — ` : ""}
        {label}
      </span>
    </div>
  );
}
