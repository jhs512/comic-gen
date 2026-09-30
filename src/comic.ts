import { assetVersion, escapeXml } from "./assets";
import { PanelCache } from "./cache";
import { readComic } from "./parse";
import { renderPanel } from "./layout";

export interface RenderOptions {
  width?: number;
  font?: string;
  fontVersion?: string;
}
export interface RenderResult {
  svg: string;
  width: number;
  height: number;
  diagnostics: string[];
  cache?: { hits: number; misses: number; bytes: number };
}
let fontEpoch = 0;
document.fonts.addEventListener("loadingdone", (event) => {
  if (event.fontfaces.length) fontEpoch++;
});

function render(
  source: string,
  options: RenderOptions,
  cache: PanelCache,
): RenderResult {
  try {
    const comic = readComic(source);
    const width = options.width ?? 720;
    if (!Number.isFinite(width) || width < 480 || width > 2400)
      throw new Error("너비는 480~2400 사이여야 합니다.");
    const font =
      options.font ?? "Malgun Gothic, Apple SD Gothic Neo, sans-serif";
    if (typeof font !== "string" || font.length > 300 || /[<>]/.test(font))
      throw new Error("올바른 글꼴 이름이 필요합니다.");
    const fragments: string[] = [];
    let hits = 0,
      misses = 0;
    let y = 68;
    for (const [index, panel] of comic.panels.entries()) {
      const members = panel.actors.map((actor) => [
        actor.id,
        comic.cast[actor.id],
      ]);
      const key = JSON.stringify({
        panel,
        members,
        width,
        font,
        fontEpoch,
        fontVersion: options.fontVersion,
        assetVersion,
        layoutVersion: 1,
      });
      const existing = cache.get(key);
      const { markup, height } =
        existing ?? renderPanel(panel, comic.cast, width, font);
      if (existing) hits++;
      else {
        misses++;
        cache.set(key, { markup, height });
      }
      fragments.push(
        `<g data-panel="${index}" transform="translate(0 ${y})">${markup}</g>`,
      );
      y += height + 24;
    }
    const height = y;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(comic.title)}"><title>${escapeXml(comic.title)}</title><rect width="100%" height="100%" fill="#f5f7fb"/><g font-family="${escapeXml(font)}" fill="#303341"><text x="24" y="42" font-size="24" font-weight="700">${escapeXml(comic.title)}</text>${fragments.join("")}</g></svg>`;
    return {
      svg,
      width,
      height,
      diagnostics: [],
      cache: { hits, misses, bytes: cache.bytes },
    };
  } catch (error) {
    return {
      svg: "",
      width: 0,
      height: 0,
      diagnostics: [error instanceof Error ? error.message : "렌더링 실패"],
    };
  }
}

export function createRenderer(maxCacheBytes = 2_000_000) {
  const cache = new PanelCache(maxCacheBytes);
  return {
    render: (source: string, options: RenderOptions = {}) =>
      render(source, options, cache),
    clearCache: () => cache.clear(),
  };
}
export const renderComic = createRenderer().render;
