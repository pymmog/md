import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { bracketMatching, indentOnInput } from "@codemirror/language";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { Compartment, EditorState, Prec } from "@codemirror/state";
import {
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { getCM, vim } from "@replit/codemirror-vim";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  type Ref,
} from "react";
import { applyFormat, type FormatAction } from "./format.ts";
import { editorTheme } from "./cmTheme.ts";

export type EditorHandle = {
  applyFormat: (action: FormatAction) => void;
  scrollToLine: (line: number) => void;
  focus: () => void;
  getScrollDOM: () => HTMLElement | null;
};

export type VimModeLabel =
  | "NORMAL"
  | "INSERT"
  | "VISUAL"
  | "V-LINE"
  | "V-BLOCK"
  | "EX";

type MarkdownEditorProps = {
  doc: string;
  vimEnabled: boolean;
  dark: boolean;
  onDocChange: (doc: string) => void;
  onCursor: (line: number, col: number) => void;
  onVimMode: (mode: VimModeLabel | null) => void;
  onScroll: (scrollDOM: HTMLElement) => void;
  ref: Ref<EditorHandle>;
};

function readVimMode(view: EditorView): VimModeLabel | null {
  const cm = getCM(view);
  const state = cm?.state.vim;
  if (!state) {
    return null;
  }
  if (state.exMode) {
    return "EX";
  }
  if (state.insertMode) {
    return "INSERT";
  }
  if (state.visualMode && state.visualBlock) {
    return "V-BLOCK";
  }
  if (state.visualMode && state.visualLine) {
    return "V-LINE";
  }
  if (state.visualMode) {
    return "VISUAL";
  }
  return "NORMAL";
}

export function MarkdownEditor({
  doc,
  vimEnabled,
  dark,
  onDocChange,
  onCursor,
  onVimMode,
  onScroll,
  ref,
}: MarkdownEditorProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const vimComp = useRef(new Compartment());
  const themeComp = useRef(new Compartment());
  const onDocChangeRef = useRef(onDocChange);
  const onCursorRef = useRef(onCursor);
  const onVimModeRef = useRef(onVimMode);
  const onScrollRef = useRef(onScroll);
  const initial = useRef({ doc, vimEnabled, dark });

  useEffect(() => {
    onDocChangeRef.current = onDocChange;
    onCursorRef.current = onCursor;
    onVimModeRef.current = onVimMode;
    onScrollRef.current = onScroll;
  });

  useImperativeHandle(ref, () => ({
    applyFormat(action) {
      const view = viewRef.current;
      if (view) {
        applyFormat(view, action);
      }
    },
    scrollToLine(line) {
      const view = viewRef.current;
      if (!view) {
        return;
      }
      const safe = Math.min(Math.max(1, line), view.state.doc.lines);
      const lineObj = view.state.doc.line(safe);
      view.dispatch({
        selection: { anchor: lineObj.from },
        effects: EditorView.scrollIntoView(lineObj.from, { y: "start" }),
      });
      view.focus();
    },
    focus() {
      viewRef.current?.focus();
    },
    getScrollDOM() {
      return viewRef.current?.scrollDOM ?? null;
    },
  }));

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) {
      return;
    }

    const formatKeymap = Prec.low(
      keymap.of([
        {
          key: "Mod-b",
          run: (view) =>
            applyFormat(view, { kind: "wrap", before: "**", after: "**" }),
        },
        {
          key: "Mod-i",
          run: (view) =>
            applyFormat(view, { kind: "wrap", before: "*", after: "*" }),
        },
        {
          key: "Mod-Shift-x",
          run: (view) =>
            applyFormat(view, { kind: "wrap", before: "~~", after: "~~" }),
        },
        {
          key: "Mod-e",
          run: (view) =>
            applyFormat(view, { kind: "wrap", before: "`", after: "`" }),
        },
        {
          key: "Mod-k",
          run: (view) => applyFormat(view, { kind: "link" }),
        },
      ]),
    );

    const { doc: startDoc, dark: startDark, vimEnabled: startVim } =
      initial.current;

    const state = EditorState.create({
      doc: startDoc,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightActiveLine(),
        drawSelection(),
        dropCursor(),
        history(),
        indentOnInput(),
        bracketMatching(),
        highlightSelectionMatches(),
        EditorView.lineWrapping,
        markdown(),
        themeComp.current.of(editorTheme(startDark)),
        vimComp.current.of(startVim ? vim() : []),
        formatKeymap,
        keymap.of([
          ...defaultKeymap,
          ...historyKeymap,
          ...searchKeymap,
          indentWithTab,
        ]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onDocChangeRef.current(update.state.doc.toString());
          }
          if (update.docChanged || update.selectionSet) {
            const pos = update.state.selection.main.head;
            const line = update.state.doc.lineAt(pos);
            onCursorRef.current(line.number, pos - line.from + 1);
          }
          onVimModeRef.current(readVimMode(update.view));
        }),
        EditorView.domEventHandlers({
          paste(event, view) {
            const files = event.clipboardData?.files;
            if (!files || files.length === 0) {
              return false;
            }
            const file = files[0];
            if (!file.type.startsWith("image/")) {
              return false;
            }
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result !== "string") {
                return;
              }
              const pos = view.state.selection.main.from;
              view.dispatch({
                changes: { from: pos, insert: `![](${reader.result})` },
              });
            };
            reader.readAsDataURL(file);
            return true;
          },
        }),
      ],
    });

    const view = new EditorView({ state, parent });
    viewRef.current = view;

    const onScrollDom = () => {
      onScrollRef.current(view.scrollDOM);
    };
    view.scrollDOM.addEventListener("scroll", onScrollDom, { passive: true });

    const pos = view.state.selection.main.head;
    const line = view.state.doc.lineAt(pos);
    onCursorRef.current(line.number, pos - line.from + 1);
    onVimModeRef.current(readVimMode(view));

    return () => {
      view.scrollDOM.removeEventListener("scroll", onScrollDom);
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) {
      return;
    }
    const current = view.state.doc.toString();
    if (current === doc) {
      return;
    }
    view.dispatch({
      changes: { from: 0, to: current.length, insert: doc },
    });
  }, [doc]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) {
      return;
    }
    view.dispatch({
      effects: vimComp.current.reconfigure(vimEnabled ? vim() : []),
    });
    onVimModeRef.current(vimEnabled ? readVimMode(view) : null);
  }, [vimEnabled]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) {
      return;
    }
    view.dispatch({
      effects: themeComp.current.reconfigure(editorTheme(dark)),
    });
  }, [dark]);

  return <div className="editor-host" ref={parentRef} />;
}
