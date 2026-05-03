/**
 * Bibliothèque d'icônes line-art — style éditorial du PDF Masterclass Royauté.
 * Chaque icône utilise `currentColor` pour hériter de la couleur du parent.
 * Format : viewBox 32×32, stroke-width 1.1.
 */

type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

const baseProps = (size: number, className: string, sw: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: sw,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true,
});

// — Logo couronne + blason —
export function CrownShield({ size = 48, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      {/* Couronne */}
      <path d="M7 14 L5 7 L10 11 L13 5 L16 11 L19 5 L22 11 L27 7 L25 14 Z" />
      <path d="M7 14 L25 14" />
      {/* Croix sommet */}
      <path d="M19 3 L19 7 M17.5 4.5 L20.5 4.5" />
      {/* Blason discret en superposition */}
      <path d="M16 16 L16 26 L20 28 L20 16 Z" opacity="0.55" />
    </svg>
  );
}

// — Horloge —
export function ClockIcon({ size = 24, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 9 L16 16 L21 19" />
    </svg>
  );
}

// — Livre ouvert (verset) —
export function BookOpen({ size = 24, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <path d="M5 8 C9 7 13 8 16 10 C19 8 23 7 27 8 L27 24 C23 23 19 24 16 26 C13 24 9 23 5 24 Z" />
      <path d="M16 10 L16 26" />
    </svg>
  );
}

// — Blocs (parcours) —
export function Blocks({ size = 24, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <rect x="5" y="14" width="9" height="13" rx="0.5" />
      <rect x="18" y="14" width="9" height="13" rx="0.5" />
      <rect x="5" y="5" width="9" height="9" rx="0.5" />
      <rect x="18" y="5" width="9" height="9" rx="0.5" />
      <circle cx="9.5" cy="9.5" r="1" />
      <circle cx="22.5" cy="9.5" r="1" />
      <circle cx="9.5" cy="20.5" r="1" />
      <circle cx="22.5" cy="20.5" r="1" />
    </svg>
  );
}

// — Escalier + lumière (clôture) —
export function StairsLight({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <path d="M5 27 L5 23 L11 23 L11 19 L17 19 L17 15 L23 15 L23 11 L27 11" />
      {/* Rayons de lumière au sommet */}
      <path d="M25 9 L25 6 M28 8 L30 6.5 M22 8 L20 6.5 M27 11 L29 11" opacity="0.7" />
    </svg>
  );
}

// — 01 Clé (Introduction à la Royauté) —
export function IconKey({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <circle cx="9" cy="13" r="5" />
      <circle cx="9" cy="13" r="1.6" />
      <path d="M14 13 L27 13 M22 13 L22 17 M26 13 L26 16" />
    </svg>
  );
}

// — 02 Œil + souffle (La Vie est Spirituelle) —
export function IconEyeSpirit({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <path d="M5 16 C9 11 14 9 17 9 C20 9 23 11 26 16 C23 21 20 23 17 23 C14 23 9 21 5 16 Z" />
      <circle cx="16" cy="16" r="3" />
      {/* Souffle/vent */}
      <path d="M27 9 C29 9 30 10.5 28 12 M27 23 C29 23 30 21.5 28 20" opacity="0.7" />
    </svg>
  );
}

// — 03 Flèche ascendante + cœur (Élévation 1) —
export function IconArrowHeart({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <path d="M14 25 C7 21 8 12 14 12 C16 12 17 13 17.5 14 C18 13 19 12 21 12 C26 12 28 19 22 24" />
      {/* Flèche montante */}
      <path d="M22 11 L22 4 M22 4 L19 7 M22 4 L25 7" />
    </svg>
  );
}

// — 04 Harpe (David) —
export function IconHarp({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <path d="M9 5 C20 5 24 13 24 27" />
      <path d="M9 5 L9 27 L24 27" />
      <path d="M12 8 L12 27 M15 11 L15 27 M18 15 L18 27 M21 19 L21 27" opacity="0.6" />
    </svg>
  );
}

// — 05 Colombe + flamme (Saint-Esprit) —
export function IconDove({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <path d="M6 18 C6 12 11 9 17 11 C20 12 22 11 24 14 C22 17 19 17 17 16 L17 21 L13 21 L13 18 C9 21 6 21 6 18 Z" />
      <circle cx="20" cy="13" r="0.8" fill="currentColor" />
      {/* Flamme au-dessus */}
      <path d="M16 6 C15 8 16 9 17 8 C18 9 19 8 18 6 C17 7 17 7 16 6 Z" opacity="0.7" />
    </svg>
  );
}

// — 06 Bouclier + cœur (Protéger son Cœur) —
export function IconShieldHeart({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <path d="M16 4 L25 7 L25 17 C25 22 21 26 16 28 C11 26 7 22 7 17 L7 7 Z" />
      <path d="M16 23 C12 20 12 16 14 15 C15 14.5 16 15 16 16 C16 15 17 14.5 18 15 C20 16 20 20 16 23 Z" />
    </svg>
  );
}

// — 07 Parchemin + son (Parole et Déclarations) —
export function IconScrollSound({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <path d="M8 6 L20 6 L20 22 L23 22 C24 22 25 21 25 20 L25 8 C25 7 24 6 23 6" />
      <path d="M8 6 C7 6 6 7 6 8 L6 22 C6 25 9 25 9 22 L9 10 L18 10" />
      <path d="M11 14 L17 14 M11 17 L17 17" opacity="0.7" />
      {/* Ondes son */}
      <path d="M27 12 C29 14 29 18 27 20" opacity="0.6" />
    </svg>
  );
}

// — 08 Montagne + ancre (Foi, Persévérance) —
export function IconMountainAnchor({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <path d="M3 25 L12 11 L17 18 L22 12 L29 25 Z" />
      <path d="M11 14 L13 12 L11 10" opacity="0.6" />
      {/* Ancre */}
      <circle cx="20" cy="22" r="1.6" />
      <path d="M20 23.6 L20 27 M17 27 L23 27 M17 25 C17 26 18 27 20 27 M23 25 C23 26 22 27 20 27" />
    </svg>
  );
}

// — 09 Boussole (Vision, Sagesse) —
export function IconCompass({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 8 L18.5 14 L16 24 L13.5 14 Z" />
      <circle cx="16" cy="16" r="1.2" fill="currentColor" />
      <path d="M16 5 L16 3 M16 29 L16 27 M5 16 L3 16 M29 16 L27 16" opacity="0.5" />
    </svg>
  );
}

// — 10 Réseau / poignée de main (Collaborateurs) —
export function IconTeam({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16" cy="6" r="2.5" />
      <circle cx="24" cy="9" r="2.5" />
      <path d="M16 8.5 L8 11.5 M16 8.5 L24 11.5 M8 11.5 L24 11.5" opacity="0.5" />
      {/* Poignée de main au centre */}
      <path d="M11 19 L14 22 L18 22 L21 19 M14 22 L14 25 M18 22 L18 25" />
      <path d="M11 19 C9 20 8 23 11 25 M21 19 C23 20 24 23 21 25" />
    </svg>
  );
}

// — 11 Balance (Gestion de la Gloire 1) —
export function IconScale({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <path d="M16 5 L16 27 M11 27 L21 27" />
      <path d="M5 12 L16 9 L27 12" />
      {/* Plateau gauche */}
      <path d="M3 12 L7 12 L9 18 L1 18 Z M2 18 C2 21 8 21 8 18" />
      {/* Plateau droit */}
      <path d="M23 12 L27 12 L29 18 L21 18 Z M22 18 C22 21 28 21 28 18" />
    </svg>
  );
}

// — 12 Colonne + racines (Fidélité, Humilité) —
export function IconColumnRoots({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...baseProps(size, className, strokeWidth)}>
      <path d="M9 4 L23 4 L21 6 L21 18 L23 20 L9 20 L11 18 L11 6 Z" />
      <path d="M13 6 L13 18 M16 6 L16 18 M19 6 L19 18" opacity="0.5" />
      {/* Racines */}
      <path d="M16 20 L16 26 M16 22 C13 22 11 25 10 28 M16 22 C19 22 21 25 22 28 M16 24 C14 24 13 26 12 28 M16 24 C18 24 19 26 20 28" />
    </svg>
  );
}

/** Map iconKey → composant */
export const moduleIconMap = {
  key: IconKey,
  eyeSpirit: IconEyeSpirit,
  arrowHeart: IconArrowHeart,
  harp: IconHarp,
  dove: IconDove,
  shieldHeart: IconShieldHeart,
  scrollSound: IconScrollSound,
  mountainAnchor: IconMountainAnchor,
  compass: IconCompass,
  team: IconTeam,
  scale: IconScale,
  columnRoots: IconColumnRoots,
} as const;

export type ModuleIconKey = keyof typeof moduleIconMap;
