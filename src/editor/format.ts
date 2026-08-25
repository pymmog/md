import type { ChangeSpec } from "@codemirror/state";
import { EditorSelection } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";

export type FormatAction =
  | { kind: "wrap"; before: string; after: string }
  | { kind: "prefix"; prefix: string }
  | { kind: "heading"; level: 1 | 2 | 3 }
  | { kind: "fence" }
  | { kind: "link" }
  | { kind: "image" }
  | { kind: "table" };

export function applyFormat(view: EditorView, action: FormatAction): boolean {
  switch (action.kind) {
    case "wrap":
      wrapSelection(view, action.before, action.after);
      return true;
    case "prefix":
      togglePrefix(view, action.prefix);
      return true;
    case "heading":
      setHeading(view, action.level);
      return true;
    case "fence":
      insertFence(view);
      return true;
    case "link":
      insertLink(view, "link");
      return true;
    case "image":
      insertLink(view, "image");
      return true;
    case "table":
      insertSnippet(view, "| Column | Column |\n| --- | --- |\n|  |  |\n");
      return true;
    default: {
      const _exhaustive: never = action;
      void _exhaustive;
      return false;
    }
  }
}

function wrapSelection(view: EditorView, before: string, after: string): void {
  const sel = view.state.selection.main;
  const text = view.state.sliceDoc(sel.from, sel.to);
  const insert = before + text + after;
  view.dispatch({
    changes: { from: sel.from, to: sel.to, insert },
    selection: EditorSelection.range(
      sel.from + before.length,
      sel.from + before.length + text.length,
    ),
  });
  view.focus();
}

function togglePrefix(view: EditorView, prefix: string): void {
  const sel = view.state.selection.main;
  const fromLine = view.state.doc.lineAt(sel.from);
  const toLine = view.state.doc.lineAt(sel.to);
  const lines = [];
  for (let n = fromLine.number; n <= toLine.number; n++) {
    lines.push(view.state.doc.line(n));
  }
  const allPrefixed = lines.every((line) => line.text.startsWith(prefix));
  const changes: ChangeSpec[] = lines.map((line) =>
    allPrefixed
      ? { from: line.from, to: line.from + prefix.length, insert: "" }
      : { from: line.from, insert: prefix },
  );
  view.dispatch({ changes });
  view.focus();
}

function setHeading(view: EditorView, level: 1 | 2 | 3): void {
  const sel = view.state.selection.main;
  const line = view.state.doc.lineAt(sel.from);
  const hashes = "#".repeat(level);
  const stripped = line.text.replace(/^#{1,6}\s+/, "");
  const already = line.text.startsWith(`${hashes} `);
  const next = already ? stripped : `${hashes} ${stripped}`;
  view.dispatch({
    changes: { from: line.from, to: line.to, insert: next },
  });
  view.focus();
}

function insertFence(view: EditorView): void {
  const sel = view.state.selection.main;
  const text = view.state.sliceDoc(sel.from, sel.to);
  const insert = "```\n" + text + "\n```";
  const cursor = sel.from + 4;
  view.dispatch({
    changes: { from: sel.from, to: sel.to, insert },
    selection: EditorSelection.range(cursor, cursor + text.length),
  });
  view.focus();
}

function insertLink(view: EditorView, mode: "link" | "image"): void {
  const sel = view.state.selection.main;
  const text = view.state.sliceDoc(sel.from, sel.to);
  const bang = mode === "image" ? "!" : "";
  if (text.length > 0) {
    const insert = `${bang}[${text}](url)`;
    const urlFrom = sel.from + bang.length + text.length + 3;
    view.dispatch({
      changes: { from: sel.from, to: sel.to, insert },
      selection: EditorSelection.range(urlFrom, urlFrom + 3),
    });
  } else {
    const insert = `${bang}[text](url)`;
    const textFrom = sel.from + bang.length + 1;
    view.dispatch({
      changes: { from: sel.from, insert },
      selection: EditorSelection.range(textFrom, textFrom + 4),
    });
  }
  view.focus();
}

function insertSnippet(view: EditorView, insert: string): void {
  const pos = view.state.selection.main.from;
  view.dispatch({
    changes: { from: pos, insert },
    selection: EditorSelection.cursor(pos + insert.length),
  });
  view.focus();
}
