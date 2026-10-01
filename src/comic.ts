import { assetVersion, escapeXml } from "./assets";
import { PanelCache } from "./cache";
import { readComic } from "./parse";
import { renderPanel } from "./layout";
import { normalizeOptions } from "./syntax";
import { renderMermaid, namespaceDiagram } from "./diagram";
import type { Comic, Panel } from "./model";

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
export interface PanelResult extends RenderResult {
  index: number;
}
export interface PanelsResult extends RenderResult {
  panels: PanelResult[];
}
let fontEpoch = 0;
let outputEpoch = 0;
document.fonts.addEventListener("loadingdone", (event) => {
  if (event.fontfaces.length) fontEpoch++;
});
interface Context {
  comic: Comic;
  options: RenderOptions;
  width: number;
  font: string;
  format: "compact" | "phone";
}
interface Layout {
  markup: string;
  height: number;
  hit: boolean;
}
function prepare(
  source: string,
  options: RenderOptions,
  defaultFormat: "compact" | "phone",
): Context {
  options = normalizeOptions(options) as RenderOptions;
  const comic = readComic(source);
  const width = options.width ?? 720;
  const format = options.panelFormat ?? defaultFormat;
  if (format !== "compact" && format !== "phone")
    throw new Error("컷비율은 기본 또는 모바일이어야 합니다.");
  if (!Number.isFinite(width) || width < 480 || width > 2400)
    throw new Error("너비는 480~2400 사이여야 합니다.");
  const font = options.font ?? "Malgun Gothic, Apple SD Gothic Neo, sans-serif";
  if (typeof font !== "string" || font.length > 300 || /[<>]/.test(font))
    throw new Error("올바른 글꼴 이름이 필요합니다.");
  return { comic, options, width, font, format };
}
function cacheKey(panel: Panel, context: Context) {
  const { comic, width, font, options, format } = context;
  return JSON.stringify({
    panel,
    members: panel.actors.map((actor) => [actor.id, comic.cast[actor.id]]),
    width,
    font,
    fontEpoch,
    fontVersion: options.fontVersion,
    assetVersion,
    layoutVersion: panel.diagram ? 3 : 2,
    format,
  });
}
function failure(error: unknown): PanelsResult {
  return {
    svg: "",
    width: 0,
    height: 0,
    diagnostics: [error instanceof Error ? error.message : "렌더링 실패"],
    panels: [],
  };
}
function compose(
  context: Context,
  layouts: Layout[],
  cache: PanelCache,
): PanelsResult {
  const { comic, width, font } = context;
  const fragments: string[] = [];
  const panels: PanelResult[] = [];
  const outputId = `cg-${Date.now().toString(36)}-${++outputEpoch}-${Math.random().toString(36).slice(2, 9)}`;
  const makeSvg = (content: string, height: number, title: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(title)}"><title>${escapeXml(title)}</title><rect width="100%" height="100%" fill="#f5f7fb"/><g font-family="${escapeXml(font)}" fill="#303341"><text x="24" y="42" font-size="24" font-weight="700">${escapeXml(title)}</text>${content}</g></svg>`;
  let y = 68;
  for (const [index, layout] of layouts.entries()) {
    const { markup, height, hit } = layout;
    const placed = (suffix: string) =>
      comic.panels[index].diagram
        ? namespaceDiagram(
            {
              svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="width:${width}px!important;height:${height}px!important;max-width:none!important;max-height:none!important">${markup}</svg>`,
              width,
              height,
            },
            `${outputId}-${suffix}-${index}`,
          )
        : markup;
    fragments.push(
      `<g data-panel="${index}" transform="translate(0 ${y})">${placed("whole")}</g>`,
    );
    panels.push({
      index,
      svg: makeSvg(
        `<g data-panel="${index}" transform="translate(0 68)">${placed("panel")}</g>`,
        height + 92,
        `${comic.title} · ${index + 1}/${comic.panels.length}`,
      ),
      width,
      height: height + 92,
      diagnostics: [],
      cache: { hits: hit ? 1 : 0, misses: hit ? 0 : 1, bytes: cache.bytes },
    });
    y += height + 24;
  }
  return {
    svg: makeSvg(fragments.join(""), y, comic.title),
    width,
    height: y,
    diagnostics: [],
    panels,
    cache: {
      hits: layouts.filter((layout) => layout.hit).length,
      misses: layouts.filter((layout) => !layout.hit).length,
      bytes: cache.bytes,
    },
  };
}
function render(
  source: string,
  options: RenderOptions,
  cache: PanelCache,
  defaultFormat: "compact" | "phone" = "compact",
): PanelsResult {
  try {
    const context = prepare(source, options, defaultFormat);
    const diagramIndex = context.comic.panels.findIndex(
      (panel) => panel.diagram,
    );
    if (diagramIndex >= 0)
      throw new Error(
        `컷 ${diagramIndex + 1}.다이어그램: 만화그리기비동기(renderComicAsync) 또는 컷그리기비동기(renderPanelsAsync)를 await로 호출하세요.`,
      );
    const layouts = context.comic.panels.map((panel) => {
      const key = cacheKey(panel, context);
      const existing = cache.get(key);
      const layout =
        existing ??
        renderPanel(
          panel,
          context.comic.cast,
          context.width,
          context.font,
          context.format,
        );
      if (!existing) cache.set(key, layout);
      return { ...layout, hit: !!existing };
    });
    return compose(context, layouts, cache);
  } catch (error) {
    return failure(error);
  }
}
async function renderAsync(
  source: string,
  options: RenderOptions,
  cache: PanelCache,
  defaultFormat: "compact" | "phone" = "compact",
): Promise<PanelsResult> {
  try {
    const context = prepare(source, options, defaultFormat);
    if (context.comic.panels.some((panel) => panel.diagram))
      await document.fonts.ready;
    const layouts: Layout[] = [];
    for (const [index, panel] of context.comic.panels.entries()) {
      const key = cacheKey(panel, context);
      const existing = cache.get(key);
      if (existing) {
        layouts.push({ ...existing, hit: true });
        continue;
      }
      let diagram;
      if (panel.diagram) {
        try {
          diagram = await renderMermaid(panel.diagram.source, context.font);
        } catch (error) {
          throw new Error(
            `컷 ${index + 1}.다이어그램: ${error instanceof Error ? error.message : "Mermaid 렌더링 실패"}`,
          );
        }
      }
      const layout = renderPanel(
        panel,
        context.comic.cast,
        context.width,
        context.font,
        context.format,
        diagram,
      );
      cache.set(key, layout);
      layouts.push({ ...layout, hit: false });
    }
    return compose(context, layouts, cache);
  } catch (error) {
    return failure(error);
  }
}
export function createRenderer(maxCacheBytes = 2_000_000) {
  const cache = new PanelCache(maxCacheBytes);
  return {
    render: (source: string, options: RenderOptions = {}) =>
      render(source, options, cache),
    renderPanels: (source: string, options: RenderOptions = {}) =>
      render(source, options, cache, "phone"),
    renderAsync: (source: string, options: RenderOptions = {}) =>
      renderAsync(source, options, cache),
    renderPanelsAsync: (source: string, options: RenderOptions = {}) =>
      renderAsync(source, options, cache, "phone"),
    clearCache: () => cache.clear(),
  };
}
const defaultRenderer = createRenderer();
export const renderComic = defaultRenderer.render;
export const renderPanels = defaultRenderer.renderPanels;
export const renderComicAsync = defaultRenderer.renderAsync;
export const renderPanelsAsync = defaultRenderer.renderPanelsAsync;
