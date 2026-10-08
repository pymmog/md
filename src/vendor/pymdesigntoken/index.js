/**
 * PymDesignToken
 * Generated from tokens/tokens.json by scripts/build.mjs. Do not edit by hand.
 */
export const primitive = {
  "color": {
    "forest": "#19382B",
    "moss": "#47634D",
    "sage": "#CAD8C5",
    "oat": "#F3EFE6",
    "beige": "#DCCCB1",
    "brown": "#8B6549",
    "forest-dark": "#101E18",
    "surface-dark": "#1B2D23",
    "moss-deep": "#425E49",
    "hairline-light": "rgba(25, 56, 43, 0.18)",
    "hairline-dark": "rgba(202, 216, 197, 0.24)"
  },
  "space": {
    "8": "8px",
    "16": "16px",
    "24": "24px",
    "48": "48px",
    "96": "96px"
  },
  "radius": {
    "card": "2px",
    "control": "4px",
    "pill": "999px"
  },
  "fontFamily": {
    "sans": "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif",
    "mono": "var(--font-geist-mono, \"Geist Mono\"), \"Geist Mono\", ui-monospace, \"SFMono-Regular\", Menlo, Consolas, monospace"
  },
  "fontSize": {
    "display": "64px",
    "title": "36px",
    "heading": "22px",
    "body": "16px",
    "ui": "14px",
    "caption": "12px",
    "eyebrow": "11px"
  },
  "fontWeight": {
    "regular": 400,
    "medium": 500,
    "semibold": 600
  },
  "lineHeight": {
    "display": 0.95,
    "title": 1.05,
    "heading": 1.2,
    "body": 1.5,
    "ui": 1.25,
    "caption": 1.4,
    "eyebrow": 1.35
  },
  "letterSpacing": {
    "display": "-0.04em",
    "title": "-0.03em",
    "heading": "-0.02em",
    "wordmark": "-0.03em",
    "ui": "-0.01em",
    "normal": "0em",
    "caption": "0.02em",
    "eyebrow": "0.14em"
  },
  "shadow": {
    "none": "none"
  },
  "focus": {
    "width": "2px",
    "offset": "2px"
  }
};

export const semantic = {
  "light": {
    "bg": "#F3EFE6",
    "surface": "#F3EFE6",
    "text": "#19382B",
    "text-muted": "#47634D",
    "text-muted-accessible": "#425E49",
    "text-on-light": "#19382B",
    "border": "rgba(25, 56, 43, 0.18)",
    "accent": "#19382B",
    "accent-contrast": "#F3EFE6",
    "button-primary-bg": "#19382B",
    "button-primary-text": "#F3EFE6",
    "button-primary-border": "#19382B",
    "button-secondary-bg": "transparent",
    "button-secondary-text": "#19382B",
    "button-secondary-border": "#19382B",
    "status-bg": "#8B6549",
    "status-text": "#F3EFE6",
    "status-dot": "#DCCCB1",
    "focus": "#19382B",
    "ticker-bg": "#CAD8C5",
    "ticker-text": "#19382B",
    "surface-warm": "#DCCCB1",
    "surface-play": "#CAD8C5"
  },
  "dark": {
    "bg": "#101E18",
    "surface": "#1B2D23",
    "text": "#F3EFE6",
    "text-muted": "#CAD8C5",
    "text-muted-accessible": "#425E49",
    "text-on-light": "#19382B",
    "border": "rgba(202, 216, 197, 0.24)",
    "accent": "#CAD8C5",
    "accent-contrast": "#101E18",
    "button-primary-bg": "#CAD8C5",
    "button-primary-text": "#101E18",
    "button-primary-border": "#CAD8C5",
    "button-secondary-bg": "transparent",
    "button-secondary-text": "#F3EFE6",
    "button-secondary-border": "#F3EFE6",
    "status-bg": "#8B6549",
    "status-text": "#F3EFE6",
    "status-dot": "#DCCCB1",
    "focus": "#CAD8C5",
    "ticker-bg": "#1B2D23",
    "ticker-text": "#CAD8C5",
    "surface-warm": "#DCCCB1",
    "surface-play": "#47634D"
  }
};

export const typeStyle = {
  "display": {
    "fontFamily": "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif",
    "fontSize": "64px",
    "fontWeight": 500,
    "lineHeight": 0.95,
    "letterSpacing": "-0.04em"
  },
  "title": {
    "fontFamily": "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif",
    "fontSize": "36px",
    "fontWeight": 500,
    "lineHeight": 1.05,
    "letterSpacing": "-0.03em"
  },
  "heading": {
    "fontFamily": "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif",
    "fontSize": "22px",
    "fontWeight": 500,
    "lineHeight": 1.2,
    "letterSpacing": "-0.02em"
  },
  "wordmark": {
    "fontFamily": "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif",
    "fontSize": "22px",
    "fontWeight": 600,
    "lineHeight": 1.2,
    "letterSpacing": "-0.03em"
  },
  "body": {
    "fontFamily": "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif",
    "fontSize": "16px",
    "fontWeight": 400,
    "lineHeight": 1.5,
    "letterSpacing": "0em"
  },
  "ui": {
    "fontFamily": "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif",
    "fontSize": "14px",
    "fontWeight": 500,
    "lineHeight": 1.25,
    "letterSpacing": "-0.01em"
  },
  "caption": {
    "fontFamily": "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif",
    "fontSize": "12px",
    "fontWeight": 400,
    "lineHeight": 1.4,
    "letterSpacing": "0.02em"
  },
  "eyebrow": {
    "fontFamily": "var(--font-geist-mono, \"Geist Mono\"), \"Geist Mono\", ui-monospace, \"SFMono-Regular\", Menlo, Consolas, monospace",
    "fontSize": "11px",
    "fontWeight": 500,
    "lineHeight": 1.35,
    "letterSpacing": "0.14em"
  }
};

export const tokens = { primitive, semantic, typeStyle };

export default tokens;

