import { useEffect, useRef } from "react";

type MarkdownPreviewProps = {
  html: string;
  onScroll: (el: HTMLElement) => void;
  onReady: (el: HTMLElement) => void;
};

export function MarkdownPreview({
  html,
  onScroll,
  onReady,
}: MarkdownPreviewProps) {
  const ref = useRef<HTMLElement>(null);
  const onScrollRef = useRef(onScroll);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onScrollRef.current = onScroll;
    onReadyRef.current = onReady;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    onReadyRef.current(el);
    const handle = () => onScrollRef.current(el);
    el.addEventListener("scroll", handle, { passive: true });
    return () => el.removeEventListener("scroll", handle);
  }, []);

  return (
    <article
      className="preview preview-pane"
      ref={ref}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
