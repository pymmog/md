import { useEffect, useState } from "react";
import { loadThemePref, saveThemePref } from "../storage.ts";

export type ThemePref = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export function resolveTheme(pref: ThemePref): ResolvedTheme {
  if (pref === "light" || pref === "dark") {
    return pref;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** System leaves `data-theme` unset so `tokens.css` follows `prefers-color-scheme`. */
export function applyDocumentTheme(
  pref: ThemePref,
  resolved: ResolvedTheme,
): void {
  const root = document.documentElement;
  if (pref === "system") {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = pref;
  }
  root.style.colorScheme = resolved;
}

export function useTheme(): {
  pref: ThemePref;
  resolved: ResolvedTheme;
  setPref: (pref: ThemePref) => void;
} {
  const [pref, setPrefState] = useState<ThemePref>(() => loadThemePref());
  const [resolved, setResolved] = useState<ResolvedTheme>(() =>
    resolveTheme(pref),
  );

  useEffect(() => {
    saveThemePref(pref);

    const apply = () => {
      const next = resolveTheme(pref);
      setResolved(next);
      applyDocumentTheme(pref, next);
    };

    apply();

    if (pref !== "system") {
      return;
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [pref]);

  return {
    pref,
    resolved,
    setPref: setPrefState,
  };
}
