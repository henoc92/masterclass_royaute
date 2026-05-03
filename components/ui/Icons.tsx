/**
 * Bibliothèque d'icônes — hybride Lucide React (standards) + custom SVG (signatures).
 * Chaque icône est choisie pour matcher l'intention du texte du module.
 */

import {
  KeyRound,
  Wind,
  Heart,
  Music,
  Bird,
  Flame,
  Shield,
  ScrollText,
  Volume2,
  Mountain,
  Anchor,
  Compass,
  Handshake,
  Scale,
  Sprout,
  Clock,
  BookOpen as LucideBookOpen,
  Blocks as LucideBlocks,
  type LucideProps,
} from "lucide-react";

type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

// — Helper : wrap simple Lucide —
const wrap = (
  Component: React.ComponentType<LucideProps>
): React.FC<IconProps> => {
  const Wrapped: React.FC<IconProps> = ({ size = 32, className = "", strokeWidth = 1.2 }) => (
    <Component size={size} strokeWidth={strokeWidth} className={className} aria-hidden />
  );
  return Wrapped;
};

// — Picto modules (Lucide alignés avec le texte) —

/** 01 Introduction à la Royauté → clé du royaume */
export const IconKey = wrap(KeyRound);

/** 02 La Vie est Spirituelle → souffle / vent / esprit (le monde invisible) */
export const IconEyeSpirit = wrap(Wind);

/** 03 Élévation 1 — « Dieu cherche des cœurs » → cœur */
export const IconArrowHeart = wrap(Heart);

/** 04 Élévation 2 — L'exemple de David → harpe (note musicale) */
export const IconHarp = wrap(Music);

/**
 * 05 Marcher avec le Saint-Esprit — composition Bird + Flame
 * Colombe (Saint-Esprit) avec flamme au-dessus (Pentecôte).
 */
export function IconDove({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  const flameSize = Math.round(size * 0.36);
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className="absolute"
        style={{ left: 0, bottom: 0, lineHeight: 0 }}
      >
        <Bird size={Math.round(size * 0.85)} strokeWidth={strokeWidth} />
      </span>
      <span className="absolute" style={{ right: 0, top: 0, lineHeight: 0 }}>
        <Flame size={flameSize} strokeWidth={strokeWidth + 0.2} fill="none" />
      </span>
    </span>
  );
}

/**
 * 07 La Parole et les Déclarations — composition ScrollText + Volume2
 * Parchemin (Parole de Dieu) avec ondes sonores (déclarations qui sortent).
 */
export function IconScrollSound({
  size = 32,
  className = "",
  strokeWidth = 1.2,
}: IconProps) {
  const soundSize = Math.round(size * 0.4);
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="absolute" style={{ left: 0, top: 0, lineHeight: 0 }}>
        <ScrollText size={Math.round(size * 0.82)} strokeWidth={strokeWidth} />
      </span>
      <span
        className="absolute"
        style={{ right: 0, bottom: 0, lineHeight: 0 }}
      >
        <Volume2 size={soundSize} strokeWidth={strokeWidth + 0.2} />
      </span>
    </span>
  );
}

/**
 * 08 Foi, Persévérance et Puissance — composition Mountain + Anchor
 * Montagne (traversée, épreuve) ancrée (persévérance, espérance qui tient bon).
 */
export function IconMountainAnchor({
  size = 32,
  className = "",
  strokeWidth = 1.2,
}: IconProps) {
  const anchorSize = Math.round(size * 0.42);
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="absolute" style={{ left: 0, top: 0, lineHeight: 0 }}>
        <Mountain size={Math.round(size * 0.85)} strokeWidth={strokeWidth} />
      </span>
      <span
        className="absolute"
        style={{ right: 0, bottom: 0, lineHeight: 0 }}
      >
        <Anchor size={anchorSize} strokeWidth={strokeWidth + 0.2} />
      </span>
    </span>
  );
}

/** 09 Vision, Sagesse et Conseil → boussole */
export const IconCompass = wrap(Compass);

/** 10 Choisir ses Collaborateurs → poignée de main */
export const IconTeam = wrap(Handshake);

/** 11 Gestion de la Gloire (1) — argent, honneurs → balance */
export const IconScale = wrap(Scale);

/** 12 Gestion de la Gloire (2) — fidélité, humilité, racine des grâces → pousse / racine */
export const IconColumnRoots = wrap(Sprout);

/**
 * 06 Protéger son Cœur — composition Shield + Heart
 * Le bouclier protège le cœur, double symbolisme respecté.
 */
export function IconShieldHeart({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  const heartSize = Math.round(size * 0.42);
  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Shield size={size} strokeWidth={strokeWidth} className="absolute" />
      <Heart
        size={heartSize}
        strokeWidth={strokeWidth + 0.2}
        fill="none"
        className="absolute"
        style={{ marginTop: Math.round(size * 0.06) }}
      />
    </span>
  );
}

// — Picto utilitaires —
export const ClockIcon = wrap(Clock);
export const BookOpen = wrap(LucideBookOpen);
export const Blocks = wrap(LucideBlocks);

// — Logo couronne + blason — CUSTOM (signature, fidèle au PDF p1) —
export function CrownShield({ size = 48, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 16 L4 8 L9 12 L12 5 L16 11 L20 5 L23 12 L28 8 L27 16 Z" />
      <path d="M5 16 L27 16" />
      <path d="M16 3 L16 7 M14 5 L18 5" />
      <path d="M19 14 L19 24 L23 26 L23 14" opacity="0.6" />
      <path d="M19 18 L23 18" opacity="0.4" />
    </svg>
  );
}

// — Escalier + lumière — CUSTOM (clôture symbolique PDF p7) —
export function StairsLight({ size = 32, className = "", strokeWidth = 1.2 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 27 L5 22 L11 22 L11 17 L17 17 L17 12 L23 12 L23 7 L28 7" />
      <path d="M25 4 L25 1 M28 5 L30 3 M22 5 L20 3 M27 7 L30 7" opacity="0.7" />
    </svg>
  );
}

/** Map iconKey → composant — utilisé par modules.ts */
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
