export type ResolvedTheme = "light" | "dark";

export type Palette = {
  bg: string;
  "bg-elevated": string;
  "bg-sunken": string;
  fg: string;
  "fg-muted": string;
  border: string;
  accent: string;
  "accent-fg": string;
  danger: string;
  "code-bg": string;
  selection: string;
  "syn-keyword": string;
  "syn-string": string;
  "syn-comment": string;
  "syn-number": string;
  "syn-literal": string;
  "syn-heading": string;
  "syn-punctuation": string;
};

export const palettes: Record<ResolvedTheme, Palette> = {
  light: {
    bg: "oklch(0.975 0.008 95)",
    "bg-elevated": "oklch(0.995 0.004 95)",
    "bg-sunken": "oklch(0.945 0.012 95)",
    fg: "oklch(0.28 0.025 260)",
    "fg-muted": "oklch(0.5 0.02 260)",
    border: "oklch(0.86 0.018 95)",
    accent: "oklch(0.5 0.11 230)",
    "accent-fg": "oklch(0.99 0.004 95)",
    danger: "oklch(0.55 0.19 25)",
    "code-bg": "oklch(0.95 0.012 95)",
    selection: "oklch(0.5 0.11 230 / 0.18)",
    "syn-keyword": "oklch(0.48 0.16 300)",
    "syn-string": "oklch(0.45 0.12 150)",
    "syn-comment": "oklch(0.55 0.02 260)",
    "syn-number": "oklch(0.52 0.13 55)",
    "syn-literal": "oklch(0.46 0.1 220)",
    "syn-heading": "oklch(0.42 0.11 230)",
    "syn-punctuation": "oklch(0.56 0.03 260)",
  },
  dark: {
    bg: "oklch(0.22 0.018 260)",
    "bg-elevated": "oklch(0.26 0.02 260)",
    "bg-sunken": "oklch(0.18 0.016 260)",
    fg: "oklch(0.93 0.012 95)",
    "fg-muted": "oklch(0.72 0.02 260)",
    border: "oklch(0.36 0.02 260)",
    accent: "oklch(0.78 0.09 230)",
    "accent-fg": "oklch(0.2 0.02 260)",
    danger: "oklch(0.72 0.15 25)",
    "code-bg": "oklch(0.19 0.016 260)",
    selection: "oklch(0.78 0.09 230 / 0.28)",
    "syn-keyword": "oklch(0.8 0.13 300)",
    "syn-string": "oklch(0.8 0.11 150)",
    "syn-comment": "oklch(0.64 0.02 260)",
    "syn-number": "oklch(0.82 0.11 55)",
    "syn-literal": "oklch(0.8 0.08 220)",
    "syn-heading": "oklch(0.84 0.07 230)",
    "syn-punctuation": "oklch(0.68 0.03 260)",
  },
};

export function paletteToCss(palette: Palette): string {
  const body = Object.entries(palette)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join("\n");
  return `:root {\n${body}\n}\n`;
}

export function applyPalette(theme: ResolvedTheme): void {
  const root = document.documentElement;
  const palette = palettes[theme];
  for (const [name, value] of Object.entries(palette)) {
    root.style.setProperty(`--${name}`, value);
  }
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}
