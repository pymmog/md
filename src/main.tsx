import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { loadThemePref } from "./storage.ts";
import { applyPalette } from "./theme/palettes.ts";
import { resolveTheme } from "./theme/useTheme.ts";
import "./styles.css";

applyPalette(resolveTheme(loadThemePref()));

const root = document.getElementById("root");
if (!root) {
  throw new Error("Missing root element");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
