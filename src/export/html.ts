import previewCss from "../preview/preview.css?raw";
import { paletteToCss, palettes, type ResolvedTheme } from "../theme/palettes.ts";

export function exportHtmlDocument(args: {
  html: string;
  title: string;
  theme: ResolvedTheme;
}): string {
  const tokens = paletteToCss(palettes[args.theme]);
  return `<!doctype html>
<html lang="en" data-theme="${args.theme}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(args.title)}</title>
  <style>
${tokens}
html { color-scheme: ${args.theme}; background: var(--bg); color: var(--fg); }
body {
  margin: 0 auto;
  max-width: 46rem;
  padding: 2.5rem 1.25rem 4rem;
  font-family: ui-sans-serif, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
}
${previewCss}
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
