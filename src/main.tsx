import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { loadThemePref } from "./storage.ts";
import { applyDocumentTheme, resolveTheme } from "./theme/useTheme.ts";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./styles.css";

const pref = loadThemePref();
applyDocumentTheme(pref, resolveTheme(pref));

const root = document.getElementById("root");
if (!root) {
  throw new Error("Missing root element");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
