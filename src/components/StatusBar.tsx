import type { VimModeLabel } from "../editor/MarkdownEditor.tsx";
import type { DocCounts } from "../markdown/counts.ts";

type StatusBarProps = {
  counts: DocCounts;
  line: number;
  col: number;
  vimMode: VimModeLabel | null;
};

export function StatusBar({ counts, line, col, vimMode }: StatusBarProps) {
  const reading =
    counts.minutes === 0
      ? "0 min"
      : counts.minutes === 1
        ? "1 min"
        : `${counts.minutes} min`;

  return (
    <footer className="status">
      <span>
        Ln {line}, Col {col}
      </span>
      <span>
        {counts.words} {counts.words === 1 ? "word" : "words"}
      </span>
      <span>{counts.chars} chars</span>
      <span>{reading}</span>
      {vimMode ? (
        <span className="vim-chip" data-mode={vimMode}>
          {vimMode}
        </span>
      ) : null}
    </footer>
  );
}
