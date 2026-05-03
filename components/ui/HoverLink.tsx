"use client";

import { type ReactNode } from "react";

type Props = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: "underline" | "echo";
};

/**
 * Lien éditorial avec effet d'underline animé (gauche → droite) ou effet echo (texte dupliqué).
 */
export function HoverLink({
  href,
  onClick,
  children,
  className = "",
  variant = "underline",
}: Props) {
  const baseClasses =
    "group relative inline-block transition-colors duration-300 cursor-pointer";

  const inner =
    variant === "underline" ? (
      <>
        <span className="relative">{children}</span>
        <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-x-100" />
      </>
    ) : (
      <>
        <span className="relative inline-block transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-[2px] group-hover:-translate-y-[1px]">
          {children}
        </span>
        <span className="pointer-events-none absolute inset-0 inline-block opacity-0 transition-all duration-500 ease-[var(--ease-soft)] group-hover:translate-x-[-2px] group-hover:translate-y-[1px] group-hover:opacity-30">
          {children}
        </span>
      </>
    );

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${className}`}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {inner}
    </button>
  );
}
