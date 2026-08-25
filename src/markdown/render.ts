import DOMPurify from "dompurify";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import go from "highlight.js/lib/languages/go";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdownLang from "highlight.js/lib/languages/markdown";
import python from "highlight.js/lib/languages/python";
import rust from "highlight.js/lib/languages/rust";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import MarkdownIt from "markdown-it";
import taskLists from "markdown-it-task-lists";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);
hljs.registerLanguage("markdown", markdownLang);
hljs.registerLanguage("md", markdownLang);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("go", go);
hljs.registerLanguage("java", java);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("yml", yaml);
hljs.registerLanguage("sql", sql);

export type OutlineItem = {
  id: string;
  level: 1 | 2 | 3;
  text: string;
  line: number;
};

export type RenderedMarkdown = {
  html: string;
  outline: OutlineItem[];
};

function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return slug.length > 0 ? slug : "heading";
}

function uniqueSlug(base: string, used: Map<string, number>): string {
  const n = used.get(base) ?? 0;
  used.set(base, n + 1);
  return n === 0 ? base : `${base}-${n + 1}`;
}

function highlight(code: string, lang: string): string {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(code, { language: lang, ignoreIllegals: true })
        .value;
    } catch {
      return "";
    }
  }
  return "";
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight,
});

md.use(taskLists, { enabled: false, label: true });

const defaultLinkOpen = md.renderer.rules.link_open;
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  token.attrSet("target", "_blank");
  token.attrSet("rel", "noopener noreferrer");
  if (defaultLinkOpen) {
    return defaultLinkOpen(tokens, idx, options, env, self);
  }
  return self.renderToken(tokens, idx, options);
};

export function renderMarkdown(src: string): RenderedMarkdown {
  const env: Record<string, unknown> = {};
  const tokens = md.parse(src, env);
  const outline: OutlineItem[] = [];
  const used = new Map<string, number>();

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type !== "heading_open") {
      continue;
    }

    const tag = token.tag;
    let level: 1 | 2 | 3;
    if (tag === "h1") {
      level = 1;
    } else if (tag === "h2") {
      level = 2;
    } else if (tag === "h3") {
      level = 3;
    } else {
      continue;
    }

    const inline = tokens[i + 1];
    const text = inline?.content ?? "";
    const id = uniqueSlug(slugify(text), used);
    token.attrSet("id", id);
    const map = token.map;
    const line = map ? map[0] + 1 : 1;
    outline.push({ id, level, text, line });
  }

  const raw = md.renderer.render(tokens, md.options, env);
  const html = DOMPurify.sanitize(raw, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["style", "script"],
    FORBID_ATTR: ["style"],
  });

  return { html, outline };
}
