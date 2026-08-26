import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";
import type { Extension } from "@codemirror/state";

const markdownHighlight = HighlightStyle.define([
  { tag: tags.heading, color: "var(--syn-heading)", fontWeight: "700" },
  { tag: tags.strong, fontWeight: "700" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: "var(--accent)" },
  { tag: tags.url, color: "var(--syn-literal)" },
  { tag: tags.monospace, color: "var(--syn-string)" },
  { tag: tags.comment, color: "var(--syn-comment)", fontStyle: "italic" },
  { tag: tags.keyword, color: "var(--syn-keyword)" },
  { tag: tags.string, color: "var(--syn-string)" },
  { tag: tags.number, color: "var(--syn-number)" },
  { tag: tags.bool, color: "var(--syn-literal)" },
  { tag: tags.processingInstruction, color: "var(--syn-punctuation)" },
  { tag: tags.meta, color: "var(--syn-punctuation)" },
  { tag: tags.atom, color: "var(--syn-literal)" },
]);

export function editorTheme(dark: boolean): Extension {
  return [
    syntaxHighlighting(markdownHighlight),
    EditorView.theme(
      {
        "&": {
          height: "100%",
          fontSize: "14px",
          backgroundColor: "var(--bg)",
          color: "var(--fg)",
        },
        ".cm-scroller": {
          fontFamily:
            'ui-monospace, "SF Mono", "Cascadia Code", "Cascadia Mono", "JetBrains Mono", Menlo, Consolas, monospace',
          lineHeight: "1.55",
        },
        ".cm-content": {
          caretColor: "var(--accent)",
          padding: "16px 0",
        },
        ".cm-gutters": {
          backgroundColor: "var(--bg-sunken)",
          color: "var(--fg-muted)",
          borderRight: "1px solid var(--border)",
        },
        ".cm-lineNumbers .cm-gutterElement": {
          fontVariantNumeric: "tabular-nums",
          minWidth: "2.4ch",
        },
        ".cm-activeLine": {
          backgroundColor: "var(--bg-elevated)",
        },
        ".cm-activeLineGutter": {
          backgroundColor: "var(--bg-elevated)",
          color: "var(--fg)",
        },
        "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
          {
            backgroundColor: "var(--selection)",
          },
        ".cm-cursor, .cm-dropCursor": {
          borderLeftColor: "var(--accent)",
        },
        ".cm-matchingBracket": {
          backgroundColor: "var(--selection)",
        },
        ".cm-searchMatch": {
          backgroundColor: "var(--selection)",
        },
      },
      { dark },
    ),
  ];
}
