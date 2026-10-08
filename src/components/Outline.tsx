import type { OutlineItem } from "../markdown/render.ts";

type OutlineProps = {
  items: OutlineItem[];
  onJump: (item: OutlineItem) => void;
};

export function Outline({ items, onJump }: OutlineProps) {
  return (
    <nav className="outline" aria-label="Headings">
      <h2 className="outline-title pym-eyebrow">Outline</h2>
      {items.length === 0 ? (
        <p className="outline-empty">No headings yet</p>
      ) : (
        <ol className="outline-list">
          {items.map((item) => (
            <li key={`${item.line}-${item.id}`} className={`outline-l${item.level}`}>
              <button type="button" onClick={() => onJump(item)}>
                {item.text || "(empty)"}
              </button>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
