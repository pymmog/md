# A markdown studio

Write on the left. Watch it render on the right. This sample is a tour of what the editor understands. Edit anything.

## Text

**Bold**, *italic*, ***both***, ~~struck~~, and `inline code`.

> Blockquotes nest the way email used to.
>
> — someone on a mailing list

## Lists

- Milk
- Bread
  - sourdough
- Eggs

1. Open the editor
2. Type
3. Copy or download when you are done

- [x] Learn the toolbar
- [ ] Turn on Vim if you want it
- [ ] Paste an image from the clipboard

## Links and images

A link looks like [this](https://github.com/pymmog/md). Images can be a URL or a pasted bitmap, which lands as a data URL.

## Table

| Syntax | Result |
| --- | --- |
| `**bold**` | **bold** |
| `` `code` `` | `code` |

## Code

Fenced blocks pick up language names:

```ts
function greet(name: string): string {
  return `hello, ${name}`;
}
```

```python
from pathlib import Path

def lines(path: Path) -> int:
    return len(path.read_text().splitlines())
```

## Keyboard

| Action | Shortcut |
| --- | --- |
| Bold | Cmd/Ctrl+B |
| Italic | Cmd/Ctrl+I |
| Inline code | Cmd/Ctrl+E |
| Link | Cmd/Ctrl+K |
| Find | Cmd/Ctrl+F |

Toolbar buttons still wrap the selection when Vim is on. Vim keys win over those shortcuts, which is what you want.

## Vim

Toggle **Vim** in the toolbar. `Esc` for normal, `i` for insert, `hjkl` to move, `v` for visual. The status bar shows the mode. The preference survives a reload.

## Theme

Light, dark, or system. Colors are OKLCH tokens, including the syntax highlighting.

## Safety

Raw HTML in markdown is sanitized. This script tag should not run:

<script>document.title = "xss"</script>

Nor this link: <a href="javascript:alert(1)">javascript url</a>

---

Autosave keeps this draft in localStorage. **Sample** in the toolbar restores this document.
