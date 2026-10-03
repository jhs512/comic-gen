import { assetVersion, escapeXml } from "./assets";
import { PanelCache } from "./cache";
import { readComic } from "./parse";
import { renderPanel } from "./layout";
import { normalizeOptions } from "./syntax";

export interface RenderOptions {
  너비?: number;
  글꼴?: string;
  글꼴버전?: string;
  컷비율?: "기본" | "모바일" | "compact" | "phone";
  width?: number;
  font?: string;
  fontVersion?: string;
  panelFormat?: "compact" | "phone" | "기본" | "모바일";
}
export interface RenderResult {
  svg: string;
  width: number;
  height: number;
  diagnostics: string[];
  cache?: { hits: number; misses: number; bytes: number };
}
let fontEpoch = 0;
export interface PanelResult extends RenderResult {
  index: number;
}
export interface PanelsResult extends RenderResult {
  panels: PanelResult[];
}
document.fonts.addEventListener("loadingdone", (event) => {
  if (event.fontfaces.length) fontEpoch++;
});

function render(
  source: string,
  options: RenderOptions,
  cache: PanelCache,
  defaultFormat: "compact" | "phone" = "compact",
): PanelsResult {
  try {
    options = normalizeOptions(options) as RenderOptions;
    const comic = readComic(source);
    const width = options.width ?? 720;
    const format = options.panelFormat ?? defaultFormat;
    if (format !== "compact" && format !== "phone")
      throw new Error("panelFormat은 compact 또는 phone이어야 합니다.");
    if (!Number.isFinite(width) || width < 480 || width > 2400)
      throw new Error("너비는 480~2400 사이여야 합니다.");
    const font =
      options.font ?? "Malgun Gothic, Apple SD Gothic Neo, sans-serif";
    if (typeof font !== "string" || font.length > 300 || /[<>]/.test(font))
      throw new Error("올바른 글꼴 이름이 필요합니다.");
    const fragments: string[] = [];
    const panels: PanelResult[] = [];
    const makeSvg = (content: string, svgHeight: number, title: string) =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${svgHeight}" viewBox="0 0 ${width} ${svgHeight}" role="img" aria-label="${escapeXml(title)}"><title>${escapeXml(title)}</title><rect width="100%" height="100%" fill="#f5f7fb"/><g font-family="${escapeXml(font)}" fill="#303341"><text x="24" y="42" font-size="24" font-weight="700">${escapeXml(title)}</text>${content}</g></svg>`;
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
        layoutVersion: 3,
        format,
      });
      const existing = cache.get(key);
      const { markup, height } =
        existing ?? renderPanel(panel, comic.cast, width, font, format);
      if (existing) hits++;
      else {
        misses++;
        cache.set(key, { markup, height });
      }
      fragments.push(
        `<g data-panel="${index}" transform="translate(0 ${y})">${markup}</g>`,
      );
      panels.push({
        index,
        svg: makeSvg(
          `<g data-panel="${index}" transform="translate(0 68)">${markup}</g>`,
          height + 92,
          `${comic.title} · ${index + 1}/${comic.panels.length}`,
        ),
        width,
        height: height + 92,
        diagnostics: [],
        cache: {
          hits: existing ? 1 : 0,
          misses: existing ? 0 : 1,
          bytes: cache.bytes,
        },
      });
      y += height + 24;
    }
    const height = y;
    const svg = makeSvg(fragments.join(""), height, comic.title);
    return {
      svg,
      width,
      height,
      diagnostics: [],
      cache: { hits, misses, bytes: cache.bytes },
      panels,
    };
  } catch (error) {
    return {
      svg: "",
      width: 0,
      height: 0,
      diagnostics: [error instanceof Error ? error.message : "렌더링 실패"],
      panels: [],
    };
  }
}

export function createRenderer(maxCacheBytes = 2_000_000) {
  const cache = new PanelCache(maxCacheBytes);
  return {
    render: (source: string, options: RenderOptions = {}) =>
      render(source, options, cache),
    renderPanels: (source: string, options: RenderOptions = {}) =>
      render(source, options, cache, "phone"),
    clearCache: () => cache.clear(),
  };
}
const defaultRenderer = createRenderer();
export const renderComic = defaultRenderer.render;
export const renderPanels = defaultRenderer.renderPanels;

