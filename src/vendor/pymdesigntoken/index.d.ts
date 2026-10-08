/**
 * PymDesignToken
 * Generated from tokens/tokens.json by scripts/build.mjs. Do not edit by hand.
 */
export declare const primitive: {
  readonly color: {
    readonly forest: "#19382B";
    readonly moss: "#47634D";
    readonly sage: "#CAD8C5";
    readonly oat: "#F3EFE6";
    readonly beige: "#DCCCB1";
    readonly brown: "#8B6549";
    readonly "forest-dark": "#101E18";
    readonly "surface-dark": "#1B2D23";
    readonly "moss-deep": "#425E49";
    readonly "hairline-light": "rgba(25, 56, 43, 0.18)";
    readonly "hairline-dark": "rgba(202, 216, 197, 0.24)";
  };
  readonly space: {
    readonly "8": "8px";
    readonly "16": "16px";
    readonly "24": "24px";
    readonly "48": "48px";
    readonly "96": "96px";
  };
  readonly radius: {
    readonly card: "2px";
    readonly control: "4px";
    readonly pill: "999px";
  };
  readonly fontFamily: {
    readonly sans: "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif";
    readonly mono: "var(--font-geist-mono, \"Geist Mono\"), \"Geist Mono\", ui-monospace, \"SFMono-Regular\", Menlo, Consolas, monospace";
  };
  readonly fontSize: {
    readonly display: "64px";
    readonly title: "36px";
    readonly heading: "22px";
    readonly body: "16px";
    readonly ui: "14px";
    readonly caption: "12px";
    readonly eyebrow: "11px";
  };
  readonly fontWeight: {
    readonly regular: 400;
    readonly medium: 500;
    readonly semibold: 600;
  };
  readonly lineHeight: {
    readonly display: 0.95;
    readonly title: 1.05;
    readonly heading: 1.2;
    readonly body: 1.5;
    readonly ui: 1.25;
    readonly caption: 1.4;
    readonly eyebrow: 1.35;
  };
  readonly letterSpacing: {
    readonly display: "-0.04em";
    readonly title: "-0.03em";
    readonly heading: "-0.02em";
    readonly wordmark: "-0.03em";
    readonly ui: "-0.01em";
    readonly normal: "0em";
    readonly caption: "0.02em";
    readonly eyebrow: "0.14em";
  };
  readonly shadow: {
    readonly none: "none";
  };
  readonly focus: {
    readonly width: "2px";
    readonly offset: "2px";
  };
};

export declare const semantic: {
  readonly light: {
    readonly bg: "#F3EFE6";
    readonly surface: "#F3EFE6";
    readonly text: "#19382B";
    readonly "text-muted": "#47634D";
    readonly "text-muted-accessible": "#425E49";
    readonly "text-on-light": "#19382B";
    readonly border: "rgba(25, 56, 43, 0.18)";
    readonly accent: "#19382B";
    readonly "accent-contrast": "#F3EFE6";
    readonly "button-primary-bg": "#19382B";
    readonly "button-primary-text": "#F3EFE6";
    readonly "button-primary-border": "#19382B";
    readonly "button-secondary-bg": "transparent";
    readonly "button-secondary-text": "#19382B";
    readonly "button-secondary-border": "#19382B";
    readonly "status-bg": "#8B6549";
    readonly "status-text": "#F3EFE6";
    readonly "status-dot": "#DCCCB1";
    readonly focus: "#19382B";
    readonly "ticker-bg": "#CAD8C5";
    readonly "ticker-text": "#19382B";
    readonly "surface-warm": "#DCCCB1";
    readonly "surface-play": "#CAD8C5";
  };
  readonly dark: {
    readonly bg: "#101E18";
    readonly surface: "#1B2D23";
    readonly text: "#F3EFE6";
    readonly "text-muted": "#CAD8C5";
    readonly "text-muted-accessible": "#425E49";
    readonly "text-on-light": "#19382B";
    readonly border: "rgba(202, 216, 197, 0.24)";
    readonly accent: "#CAD8C5";
    readonly "accent-contrast": "#101E18";
    readonly "button-primary-bg": "#CAD8C5";
    readonly "button-primary-text": "#101E18";
    readonly "button-primary-border": "#CAD8C5";
    readonly "button-secondary-bg": "transparent";
    readonly "button-secondary-text": "#F3EFE6";
    readonly "button-secondary-border": "#F3EFE6";
    readonly "status-bg": "#8B6549";
    readonly "status-text": "#F3EFE6";
    readonly "status-dot": "#DCCCB1";
    readonly focus: "#CAD8C5";
    readonly "ticker-bg": "#1B2D23";
    readonly "ticker-text": "#CAD8C5";
    readonly "surface-warm": "#DCCCB1";
    readonly "surface-play": "#47634D";
  };
};

export declare const typeStyle: {
  readonly display: {
    readonly fontFamily: "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif";
    readonly fontSize: "64px";
    readonly fontWeight: 500;
    readonly lineHeight: 0.95;
    readonly letterSpacing: "-0.04em";
  };
  readonly title: {
    readonly fontFamily: "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif";
    readonly fontSize: "36px";
    readonly fontWeight: 500;
    readonly lineHeight: 1.05;
    readonly letterSpacing: "-0.03em";
  };
  readonly heading: {
    readonly fontFamily: "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif";
    readonly fontSize: "22px";
    readonly fontWeight: 500;
    readonly lineHeight: 1.2;
    readonly letterSpacing: "-0.02em";
  };
  readonly wordmark: {
    readonly fontFamily: "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif";
    readonly fontSize: "22px";
    readonly fontWeight: 600;
    readonly lineHeight: 1.2;
    readonly letterSpacing: "-0.03em";
  };
  readonly body: {
    readonly fontFamily: "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif";
    readonly fontSize: "16px";
    readonly fontWeight: 400;
    readonly lineHeight: 1.5;
    readonly letterSpacing: "0em";
  };
  readonly ui: {
    readonly fontFamily: "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif";
    readonly fontSize: "14px";
    readonly fontWeight: 500;
    readonly lineHeight: 1.25;
    readonly letterSpacing: "-0.01em";
  };
  readonly caption: {
    readonly fontFamily: "var(--font-geist-sans, \"Geist Sans\"), \"Geist\", ui-sans-serif, system-ui, sans-serif";
    readonly fontSize: "12px";
    readonly fontWeight: 400;
    readonly lineHeight: 1.4;
    readonly letterSpacing: "0.02em";
  };
  readonly eyebrow: {
    readonly fontFamily: "var(--font-geist-mono, \"Geist Mono\"), \"Geist Mono\", ui-monospace, \"SFMono-Regular\", Menlo, Consolas, monospace";
    readonly fontSize: "11px";
    readonly fontWeight: 500;
    readonly lineHeight: 1.35;
    readonly letterSpacing: "0.14em";
  };
};

export declare const tokens: {
  readonly primitive: typeof primitive;
  readonly semantic: typeof semantic;
  readonly typeStyle: typeof typeStyle;
};

export default tokens;

