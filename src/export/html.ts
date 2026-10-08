import previewCss from "../preview/preview.css?raw";
import tokensCss from "../vendor/pymdesigntoken/tokens.css?raw";
import type { ResolvedTheme } from "../theme/useTheme.ts";

const fontCss = `@font-face {
  font-family: "Geist Sans";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-Variable.woff2") format("woff2");
}
@font-face {
  font-family: "Geist";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-Variable.woff2") format("woff2");
}
@font-face {
  font-family: "Geist Mono";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/GeistMono-Variable.woff2") format("woff2");
}
:root {
  --font-geist-sans: "Geist Sans";
  --font-geist-mono: "Geist Mono";
}`;

export function exportHtmlDocument(args: {
  html: string;
  title: string;
  theme: ResolvedTheme;
}): string {
  return `<!doctype html>
<html lang="en" data-theme="${args.theme}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(args.title)}</title>
  <style>
${fontCss}
${tokensCss}
${previewCss}
html { background: var(--pym-bg); color: var(--pym-text); }
body {
  margin: 0 auto;
  max-width: 46rem;
  padding: var(--pym-space-48) var(--pym-space-24) var(--pym-space-96);
  background: var(--pym-bg);
  color: var(--pym-text);
  font-family: var(--pym-font-sans);
}
  </style>
</head>
<body>
  <article class="preview">${args.html}</article>
</body>
</html>
`;
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function firstHeadingTitle(html: string, fallback: string): string {
  const match = html.match(/<h1\b[^>]*>(.*?)<\/h1>/i);
  if (!match) {
    return fallback;
  }
  return match[1].replaceAll(/<[^>]+>/g, "").trim() || fallback;
}
