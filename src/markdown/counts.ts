export type DocCounts = {
  words: number;
  chars: number;
  minutes: number;
};

export function countDoc(text: string): DocCounts {
  const chars = text.length;
  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  const minutes = words === 0 ? 0 : Math.max(1, Math.round(words / 220));
  return { words, chars, minutes };
}
