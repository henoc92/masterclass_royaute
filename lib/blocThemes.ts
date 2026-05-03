export const BLOC_THEMES = {
  1: {
    bg:      "var(--color-paper)",
    cssVars: {},
  },
  2: {
    bg:      "#0A1628",
    cssVars: {
      "--color-ink":       "#FAFAF7",
      "--color-mute":      "#7A8FA8",
      "--color-ink-soft":  "rgba(250,250,247,0.6)",
      "--color-ink-faint": "rgba(250,250,247,0.25)",
      "--color-ink-line":  "rgba(250,250,247,0.12)",
      "--color-gold":      "#C9A84C",
    },
  },
  3: {
    bg:      "#111A11",
    cssVars: {
      "--color-ink":       "#FAFAF7",
      "--color-mute":      "#6A8A6A",
      "--color-ink-soft":  "rgba(250,250,247,0.6)",
      "--color-ink-faint": "rgba(250,250,247,0.25)",
      "--color-ink-line":  "rgba(250,250,247,0.12)",
      "--color-gold":      "#D4B86A",
    },
  },
  4: {
    bg:      "#1A1000",
    cssVars: {
      "--color-ink":       "#FAFAF7",
      "--color-mute":      "#9A8060",
      "--color-ink-soft":  "rgba(250,250,247,0.6)",
      "--color-ink-faint": "rgba(250,250,247,0.25)",
      "--color-ink-line":  "rgba(250,250,247,0.12)",
      "--color-gold":      "#C9A84C",
    },
  },
} as const satisfies Record<1 | 2 | 3 | 4, { bg: string; cssVars: Record<string, string> }>;
