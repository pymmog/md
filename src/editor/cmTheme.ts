import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";
import type { Extension } from "@codemirror/state";

const markdownHighlight = HighlightStyle.define([
  { tag: tags.heading, color: "var(--md-syn-heading)", fontWeight: "500" },
  { tag: tags.strong, fontWeight: "600" },
  { tag: tags.emphasis, color: "var(--md-syn-heading)", fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: "var(--md-syn-link)", textDecoration: "underline" },
  { tag: tags.url, color: "var(--md-syn-string)" },
  { tag: tags.monospace, color: "var(--md-syn-string)" },
  { tag: tags.comment, color: "var(--md-syn-comment)", fontStyle: "italic" },
  { tag: tags.quote, color: "var(--md-syn-comment)", fontStyle: "italic" },
  { tag: tags.keyword, color: "var(--md-syn-keyword)", fontWeight: "500" },
  { tag: tags.string, color: "var(--md-syn-string)" },
  { tag: tags.number, color: "var(--md-syn-number)" },
  { tag: tags.bool, color: "var(--md-syn-literal)" },
  { tag: tags.processingInstruction, color: "var(--md-syn-punctuation)" },
  { tag: tags.meta, color: "var(--md-syn-punctuation)" },
  { tag: tags.atom, color: "var(--md-syn-literal)" },
  { tag: tags.operator, color: "var(--md-syn-punctuation)" },
]);

export function editorTheme(dark: boolean): Extension {
  return [
    syntaxHighlighting(markdownHighlight),
    EditorView.theme(
      {
        "&": {
          height: "100%",
          fontSize: "var(--pym-font-size-ui)",
          backgroundColor: "var(--pym-bg)",
          color: "var(--pym-text)",
          boxShadow: "var(--pym-shadow-none)",
        },
        ".cm-scroller": {
          fontFamily: "var(--pym-font-mono)",
          lineHeight: "var(--pym-leading-body)",
        },
        ".cm-content": {
          caretColor: "var(--pym-accent)",
          padding: "var(--pym-space-16) 0",
        },
        ".cm-gutters": {
          backgroundColor: "var(--pym-surface)",
          color: "var(--pym-text-muted)",
          borderRight: "1px solid var(--pym-border)",
          fontFamily: "var(--pym-font-mono)",
        },
        ".cm-lineNumbers .cm-gutterElement": {
          fontVariantNumeric: "tabular-nums",
          padding: "0 var(--pym-space-8)",
          minWidth: "2.4ch",
        },
        ".cm-activeLine": {
          backgroundColor: "var(--md-active-line)",
        },
        ".cm-activeLineGutter": {
          backgroundColor: "var(--md-active-line)",
          color: "var(--pym-text)",
        },
        "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
          {
            backgroundColor: "var(--md-selection)",
          },
        ".cm-cursor, .cm-dropCursor": {
          borderLeftColor: "var(--pym-accent)",
        },
        ".cm-matchingBracket": {
          backgroundColor: "var(--md-selection)",
          outline: "1px solid var(--pym-accent)",
        },
        "& .cm-searchMatch.cm-searchMatch": {
          backgroundColor: "var(--pym-color-beige)",
          color: "var(--pym-text-on-light)",
        },
        "& .cm-searchMatch.cm-searchMatch-selected": {
          backgroundColor: "var(--pym-color-brown)",
          color: "var(--pym-color-oat)",
        },
        "& .cm-selectionMatch.cm-selectionMatch": {
          backgroundColor: "var(--pym-color-sage)",
          color: "var(--pym-text-on-light)",
        },
        ".cm-panels": {
          backgroundColor: "var(--pym-surface)",
          color: "var(--pym-text)",
          fontFamily: "var(--pym-font-sans)",
        },
        ".cm-panel": {
          borderTop: "1px solid var(--pym-border)",
        },
        ".cm-textfield, .cm-panel input": {
          backgroundColor: "var(--pym-bg)",
          color: "var(--pym-text)",
          border: "1px solid var(--pym-button-secondary-border)",
          borderRadius: "var(--pym-radius-control)",
          fontFamily: "var(--pym-font-mono)",
        },
        ".cm-button": {
          backgroundImage: "none",
          backgroundColor: "var(--pym-button-secondary-bg)",
          color: "var(--pym-button-secondary-text)",
          border: "1px solid var(--pym-button-secondary-border)",
          borderRadius: "var(--pym-radius-control)",
          fontFamily: "var(--pym-font-sans)",
          fontWeight: "var(--pym-weight-medium)",
        },
        ".cm-vim-panel": {
          backgroundColor: "var(--pym-surface)",
          color: "var(--pym-text)",
          fontFamily: "var(--pym-font-mono)",
          borderTop: "1px solid var(--pym-border)",
        },
        ".cm-vim-panel input": {
          color: "var(--pym-text)",
          fontFamily: "var(--pym-font-mono)",
        },
      },
      { dark },
    ),
  ];
}
