import type { Extension } from "@codemirror/state";
import { gutter, GutterMarker, type EditorView, type ViewUpdate } from "@codemirror/view";

class LineNumberMarker extends GutterMarker {
  readonly n: string;

  constructor(n: string) {
    super();
    this.n = n;
  }

  eq(other: GutterMarker): boolean {
    return other instanceof LineNumberMarker && this.n === other.n;
  }

  toDOM(): Text {
    return document.createTextNode(this.n);
  }
}

function maxLineNumber(lines: number): number {
  let last = 9;
  while (last < lines) {
    last = last * 10 + 9;
  }
  return last;
}

function labelFor(line: number, current: number): string {
  if (line === current) {
    return String(line);
  }
  return String(Math.abs(current - line));
}

function currentLine(view: EditorView): number {
  return view.state.doc.lineAt(view.state.selection.main.head).number;
}

function spacer(view: EditorView): LineNumberMarker {
  return new LineNumberMarker(String(maxLineNumber(view.state.doc.lines)));
}

export const relativeLineNumbers: Extension = gutter({
  class: "cm-lineNumbers",
  renderEmptyElements: false,
  lineMarker(view, line, others) {
    if (others.some((marker) => marker.toDOM)) {
      return null;
    }
    const lineNo = view.state.doc.lineAt(line.from).number;
    return new LineNumberMarker(labelFor(lineNo, currentLine(view)));
  },
  lineMarkerChange: (update) => update.selectionSet,
  initialSpacer: spacer,
  updateSpacer(marker: GutterMarker, update: ViewUpdate) {
    const next = spacer(update.view);
    return marker instanceof LineNumberMarker && marker.n === next.n
      ? marker
      : next;
  },
});
