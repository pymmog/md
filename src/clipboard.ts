function htmlToPlainText(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent ?? "";
}

/** Puts formatted HTML on the clipboard (e.g. paste into Docs/Word), not raw markup as plain text. */
export async function copyRichHtml(html: string): Promise<boolean> {
  const plain = htmlToPlainText(html);
  const htmlBlob = new Blob([html], { type: "text/html" });
  const plainBlob = new Blob([plain], { type: "text/plain" });

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": htmlBlob,
        "text/plain": plainBlob,
      }),
    ]);
    return true;
  } catch {
    return copyText(plain);
  }
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.append(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    area.remove();
    return ok;
  }
}
