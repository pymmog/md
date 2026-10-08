import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Outline } from "./components/Outline.tsx";
import { StatusBar } from "./components/StatusBar.tsx";
import {
  Toolbar,
  type CopyKind,
  type DownloadKind,
  type ViewMode,
} from "./components/Toolbar.tsx";
import {
  MarkdownEditor,
  type EditorHandle,
  type VimModeLabel,
} from "./editor/MarkdownEditor.tsx";
import type { FormatAction } from "./editor/format.ts";
import { copyRichHtml, copyText } from "./clipboard.ts";
import { exportHtmlDocument, firstHeadingTitle } from "./export/html.ts";
import { countDoc } from "./markdown/counts.ts";
import { renderMarkdown, type OutlineItem } from "./markdown/render.ts";
import { MarkdownPreview } from "./preview/MarkdownPreview.tsx";
import sample from "./sample.md?raw";
import {
  loadDraft,
  loadVimEnabled,
  saveDraft,
  saveVimEnabled,
} from "./storage.ts";
import { useTheme } from "./theme/useTheme.ts";

function initialDoc(): string {
  return loadDraft() ?? sample;
}

function downloadFile(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function syncScroll(source: HTMLElement, target: HTMLElement): void {
  const maxSource = source.scrollHeight - source.clientHeight;
  const maxTarget = target.scrollHeight - target.clientHeight;
  if (maxSource <= 0 || maxTarget <= 0) {
    return;
  }
  target.scrollTop = (source.scrollTop / maxSource) * maxTarget;
}

export function App() {
  const { pref, resolved, setPref } = useTheme();
  const [doc, setDoc] = useState(initialDoc);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [vimEnabled, setVimEnabled] = useState(loadVimEnabled);
  const [split, setSplit] = useState(0.5);
  const [line, setLine] = useState(1);
  const [col, setCol] = useState(1);
  const [vimMode, setVimMode] = useState<VimModeLabel | null>(null);
  const [copied, setCopied] = useState<CopyKind | null>(null);
  const [isMac] = useState(() => /\bMac\b/.test(navigator.userAgent));

  const editorRef = useRef<EditorHandle>(null);
  const previewEl = useRef<HTMLElement | null>(null);
  const panesRef = useRef<HTMLDivElement>(null);
  const syncLock = useRef<"editor" | "preview" | null>(null);
  const copiedTimer = useRef<number | undefined>(undefined);

  const rendered = useMemo(() => renderMarkdown(doc), [doc]);
  const counts = useMemo(() => countDoc(doc), [doc]);

  useEffect(() => {
    const id = window.setTimeout(() => saveDraft(doc), 300);
    return () => window.clearTimeout(id);
  }, [doc]);

  useEffect(() => {
    saveVimEnabled(vimEnabled);
  }, [vimEnabled]);

  const onCursor = useCallback((nextLine: number, nextCol: number) => {
    setLine(nextLine);
    setCol(nextCol);
  }, []);

  const onVimMode = useCallback((mode: VimModeLabel | null) => {
    setVimMode(mode);
  }, []);

  const onEditorScroll = useCallback((scrollDOM: HTMLElement) => {
    const preview = previewEl.current;
    if (!preview || syncLock.current === "preview") {
      return;
    }
    syncLock.current = "editor";
    syncScroll(scrollDOM, preview);
    requestAnimationFrame(() => {
      syncLock.current = null;
    });
  }, []);

  const onPreviewScroll = useCallback((el: HTMLElement) => {
    const editorScroll = editorRef.current?.getScrollDOM();
    if (!editorScroll || syncLock.current === "editor") {
      return;
    }
    syncLock.current = "preview";
    syncScroll(el, editorScroll);
    requestAnimationFrame(() => {
      syncLock.current = null;
    });
  }, []);

  const onPreviewReady = useCallback((el: HTMLElement) => {
    previewEl.current = el;
  }, []);

  const onFormat = useCallback((action: FormatAction) => {
    editorRef.current?.applyFormat(action);
  }, []);

  const onJump = useCallback((item: OutlineItem) => {
    editorRef.current?.scrollToLine(item.line);
    const heading = previewEl.current?.querySelector(
      `[id="${CSS.escape(item.id)}"]`,
    );
    heading?.scrollIntoView({ block: "start" });
  }, []);

  const onCopy = useCallback(
    async (kind: CopyKind) => {
      const ok =
        kind === "markdown"
          ? await copyText(doc)
          : await copyRichHtml(rendered.html);
      if (!ok) {
        return;
      }
      setCopied(kind);
      window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopied(null), 1500);
    },
    [doc, rendered.html],
  );

  const onOpen = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".md,.markdown,.txt,text/markdown,text/plain";
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) {
        return;
      }
      void file.text().then((text) => setDoc(text));
    });
    input.click();
  }, []);

  const onDownload = useCallback(
    (kind: DownloadKind) => {
      if (kind === "markdown") {
        downloadFile("document.md", doc, "text/markdown;charset=utf-8");
        return;
      }
      const title = firstHeadingTitle(rendered.html, "Markdown");
      const html = exportHtmlDocument({
        html: rendered.html,
        title,
        theme: resolved,
      });
      downloadFile("document.html", html, "text/html;charset=utf-8");
    },
    [doc, rendered.html, resolved],
  );

  const onReset = useCallback(() => {
    if (!window.confirm("Replace the current document with the sample?")) {
      return;
    }
    setDoc(sample);
  }, []);

  const onDividerPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const panes = panesRef.current;
      if (!panes) {
        return;
      }
      const rect = panes.getBoundingClientRect();
      const pointerId = event.pointerId;
      event.currentTarget.setPointerCapture(pointerId);

      const onMove = (move: PointerEvent) => {
        const ratio = (move.clientX - rect.left) / rect.width;
        setSplit(Math.min(0.8, Math.max(0.2, ratio)));
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [],
  );

  const showEditor = viewMode !== "preview";
  const showPreview = viewMode !== "editor";
  const showDivider = viewMode === "split";

  return (
    <div className="app">
      <Toolbar
        viewMode={viewMode}
        themePref={pref}
        vimEnabled={vimEnabled}
        copied={copied}
        isMac={isMac}
        onFormat={onFormat}
        onViewMode={setViewMode}
        onTheme={setPref}
        onVim={setVimEnabled}
        onCopy={(kind) => {
          void onCopy(kind);
        }}
        onOpen={onOpen}
        onDownload={onDownload}
        onReset={onReset}
      />
      <div className="workspace">
        <Outline items={rendered.outline} onJump={onJump} />
        <div
          className="panes"
          data-mode={viewMode}
          ref={panesRef}
          style={
            viewMode === "split"
              ? {
                  gridTemplateColumns: `${split}fr 6px ${1 - split}fr`,
                }
              : undefined
          }
        >
          {showEditor ? (
            <section className="pane editor-pane" aria-label="Markdown source">
              <MarkdownEditor
                ref={editorRef}
                doc={doc}
                vimEnabled={vimEnabled}
                dark={resolved === "dark"}
                onDocChange={setDoc}
                onCursor={onCursor}
                onVimMode={onVimMode}
                onScroll={onEditorScroll}
              />
            </section>
          ) : null}
          {showDivider ? (
            <div
              className="divider"
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize editor"
              onPointerDown={onDividerPointerDown}
            />
          ) : null}
          {showPreview ? (
            <section className="pane preview-wrap" aria-label="Preview">
              <MarkdownPreview
                html={rendered.html}
                onScroll={onPreviewScroll}
                onReady={onPreviewReady}
              />
            </section>
          ) : null}
        </div>
      </div>
      <StatusBar counts={counts} line={line} col={col} vimMode={vimMode} />
    </div>
  );
}
