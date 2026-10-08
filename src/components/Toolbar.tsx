import type { FormatAction } from "../editor/format.ts";
import type { ThemePref } from "../theme/useTheme.ts";

export type ViewMode = "split" | "editor" | "preview";
export type CopyKind = "markdown" | "richtext";
export type DownloadKind = "markdown" | "html";

type ToolbarProps = {
  viewMode: ViewMode;
  themePref: ThemePref;
  vimEnabled: boolean;
  copied: CopyKind | null;
  isMac: boolean;
  onFormat: (action: FormatAction) => void;
  onViewMode: (mode: ViewMode) => void;
  onTheme: (pref: ThemePref) => void;
  onVim: (enabled: boolean) => void;
  onCopy: (kind: CopyKind) => void;
  onOpen: () => void;
  onDownload: (kind: DownloadKind) => void;
  onReset: () => void;
};

export function Toolbar({
  viewMode,
  themePref,
  vimEnabled,
  copied,
  isMac,
  onFormat,
  onViewMode,
  onTheme,
  onVim,
  onCopy,
  onOpen,
  onDownload,
  onReset,
}: ToolbarProps) {
  const mod = isMac ? "⌘" : "Ctrl+";

  return (
    <header className="toolbar">
      <div className="toolbar-brand">md</div>

      <div className="toolbar-group" role="group" aria-label="Inline">
        <button
          type="button"
          title={`Bold (${mod}B)`}
          onClick={() => onFormat({ kind: "wrap", before: "**", after: "**" })}
        >
          B
        </button>
        <button
          type="button"
          title={`Italic (${mod}I)`}
          onClick={() => onFormat({ kind: "wrap", before: "*", after: "*" })}
        >
          I
        </button>
        <button
          type="button"
          title={`Strikethrough (${mod}Shift+X)`}
          onClick={() => onFormat({ kind: "wrap", before: "~~", after: "~~" })}
        >
          S
        </button>
        <button
          type="button"
          title={`Inline code (${mod}E)`}
          onClick={() => onFormat({ kind: "wrap", before: "`", after: "`" })}
        >
          {"<>"}
        </button>
      </div>

      <div className="toolbar-group" role="group" aria-label="Blocks">
        <button
          type="button"
          title="Heading 1"
          onClick={() => onFormat({ kind: "heading", level: 1 })}
        >
          H1
        </button>
        <button
          type="button"
          title="Heading 2"
          onClick={() => onFormat({ kind: "heading", level: 2 })}
        >
          H2
        </button>
        <button
          type="button"
          title="Heading 3"
          onClick={() => onFormat({ kind: "heading", level: 3 })}
        >
          H3
        </button>
        <button
          type="button"
          title="Bullet list"
          onClick={() => onFormat({ kind: "prefix", prefix: "- " })}
        >
          •
        </button>
        <button
          type="button"
          title="Numbered list"
          onClick={() => onFormat({ kind: "prefix", prefix: "1. " })}
        >
          1.
        </button>
        <button
          type="button"
          title="Task list"
          onClick={() => onFormat({ kind: "prefix", prefix: "- [ ] " })}
        >
          ☐
        </button>
        <button
          type="button"
          title="Quote"
          onClick={() => onFormat({ kind: "prefix", prefix: "> " })}
        >
          “
        </button>
        <button
          type="button"
          title="Code fence"
          onClick={() => onFormat({ kind: "fence" })}
        >
          {"```"}
        </button>
        <button
          type="button"
          title={`Link (${mod}K)`}
          onClick={() => onFormat({ kind: "link" })}
        >
          Link
        </button>
        <button
          type="button"
          title="Image"
          onClick={() => onFormat({ kind: "image" })}
        >
          Img
        </button>
        <button
          type="button"
          title="Table"
          onClick={() => onFormat({ kind: "table" })}
        >
          Tbl
        </button>
      </div>

      <div className="toolbar-group" role="group" aria-label="View">
        <button
          type="button"
          aria-pressed={viewMode === "editor"}
          onClick={() => onViewMode("editor")}
        >
          Editor
        </button>
        <button
          type="button"
          aria-pressed={viewMode === "split"}
          onClick={() => onViewMode("split")}
        >
          Split
        </button>
        <button
          type="button"
          aria-pressed={viewMode === "preview"}
          onClick={() => onViewMode("preview")}
        >
          Preview
        </button>
      </div>

      <div className="toolbar-group" role="group" aria-label="Theme">
        <label className="toolbar-select">
          Theme
          <select
            value={themePref}
            onChange={(event) => {
              const value = event.target.value;
              if (value === "light" || value === "dark" || value === "system") {
                onTheme(value);
              }
            }}
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <button
          type="button"
          aria-pressed={vimEnabled}
          title="Toggle Vim keybindings"
          onClick={() => onVim(!vimEnabled)}
        >
          Vim
        </button>
      </div>

      <div className="toolbar-spacer" />

      <div className="toolbar-group" role="group" aria-label="File">
        <button type="button" onClick={() => onCopy("markdown")}>
          {copied === "markdown" ? "Copied" : "Copy MD"}
        </button>
        <button type="button" onClick={() => onCopy("richtext")}>
          {copied === "richtext" ? "Copied" : "Copy rich text"}
        </button>
        <button type="button" onClick={onOpen}>
          Open
        </button>
        <button type="button" onClick={() => onDownload("markdown")}>
          .md
        </button>
        <button type="button" onClick={() => onDownload("html")}>
          .html
        </button>
        <button type="button" onClick={onReset}>
          Sample
        </button>
      </div>
    </header>
  );
}
