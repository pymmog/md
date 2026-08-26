const DRAFT_KEY = "md.draft";
const THEME_KEY = "md.theme";
const VIM_KEY = "md.vimOn";

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode or quota. Editing still works for the session.
  }
}

export function loadDraft(): string | null {
  return read(DRAFT_KEY);
}

export function saveDraft(doc: string): void {
  write(DRAFT_KEY, doc);
}

export function loadThemePref(): "light" | "dark" | "system" {
  const raw = read(THEME_KEY);
  if (raw === "light" || raw === "dark" || raw === "system") {
    return raw;
  }
  return "system";
}

export function saveThemePref(pref: "light" | "dark" | "system"): void {
  write(THEME_KEY, pref);
}

export function loadVimEnabled(): boolean {
  return read(VIM_KEY) !== "0";
}

export function saveVimEnabled(enabled: boolean): void {
  write(VIM_KEY, enabled ? "1" : "0");
}
