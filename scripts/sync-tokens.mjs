#!/usr/bin/env node
/**
 * Re-copy the vendored PymDesignToken snapshot from a local clone.
 * The token repo is private, so this app does not depend on it.
 *
 * Usage:
 *   node scripts/sync-tokens.mjs <path-to-PymDesignToken> [ref]
 *
 * ref is a commit, branch, or tag. It defaults to c9d05c0.
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const repo = process.argv[2];
const ref = process.argv[3] ?? "c9d05c0";

if (!repo) {
  console.error(
    "Usage: node scripts/sync-tokens.mjs <path-to-PymDesignToken> [ref]",
  );
  process.exit(1);
}

const outDir = resolve("src/vendor/pymdesigntoken");
mkdirSync(outDir, { recursive: true });

const resolved = execFileSync("git", ["-C", repo, "rev-parse", ref], {
  encoding: "utf8",
}).trim();

function show(path) {
  try {
    return execFileSync("git", ["-C", repo, "show", `${resolved}:${path}`]);
  } catch {
    return null;
  }
}

const copies = [
  ["dist/tokens.css", "tokens.css"],
  ["dist/components.css", "components.css"],
  ["dist/index.js", "index.js"],
  ["dist/index.d.ts", "index.d.ts"],
];

for (const [from, to] of copies) {
  const content = show(from);
  if (!content) {
    console.error(`Missing ${from} at ${resolved}`);
    process.exit(1);
  }
  writeFileSync(resolve(outDir, to), content);
}

const tokensJson = show("dist/tokens.json") ?? show("tokens/tokens.json");
if (tokensJson) {
  writeFileSync(resolve(outDir, "tokens.json"), tokensJson);
}

const readmePath = resolve(outDir, "README.md");
const readme = readFileSync(readmePath, "utf8").replace(
  /Source commit: `[0-9a-f]+`/,
  `Source commit: \`${resolved}\``,
);
writeFileSync(readmePath, readme);
writeFileSync(resolve(outDir, "SOURCE"), `${resolved}\n`);

console.log(`Vendored PymDesignToken ${resolved} into ${outDir}`);
