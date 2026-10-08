# Vendored PymDesignToken

Source commit: `c9d05c0`

Copied from the private repo [pymmog/PymDesignToken](https://github.com/pymmog/PymDesignToken) (`dist/` at that commit). This app does not npm-install that repo, because Vercel cannot authenticate to it.

| File | Role |
| --- | --- |
| `tokens.css` | CSS custom properties. Light on `:root`, dark under `[data-theme="dark"]` and `prefers-color-scheme`. |
| `components.css` | `.pym-btn`, `.pym-btn--secondary`, `.pym-badge`, `.pym-eyebrow`, `.pym-hairline`. |
| `index.js` / `index.d.ts` | Typed token exports (`semantic`, `primitive`, `typeStyle`). |
| `tokens.json` | Resolved token values, including contrast notes. |

Refresh from a local clone:

```bash
npm run sync-tokens -- /path/to/PymDesignToken c9d05c0
```

`scripts/sync-tokens.mjs` reads the given git ref with `git show` and re-copies the files above. It updates the source commit line in this README.
