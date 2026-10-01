export interface DiagramSvg {
  svg: string;
  width: number;
  height: number;
}

export const mermaidVersion = "11.17.2";
export const mermaidModuleUrl =
  "https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.esm.min.mjs";
export const mermaidRuntimeUrl =
  "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.5.0/cdn/comic-gen.mermaid.js";
export const maxDiagramSourceLength = 20_000;

interface MermaidApi {
  initialize(config: Record<string, unknown>): void;
  render(
    id: string,
    source: string,
    container: Element,
  ): Promise<{ svg: string }>;
}

const svgNamespace = "http://www.w3.org/2000/svg";
const instance = Math.random().toString(36).slice(2);
let serial = 0;
let rendering: Promise<unknown> = Promise.resolve();

// Only static SVG paint is retained. In particular, no CSS animations,
// layout rules, font imports, or selectors survive into the comic document.
const paintProperties = [
  "fill",
  "fill-opacity",
  "fill-rule",
  "stroke",
  "stroke-width",
  "stroke-opacity",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "color",
  "opacity",
  "font-family",
  "font-size",
  "font-style",
  "font-weight",
  "font-variant",
  "text-anchor",
  "dominant-baseline",
  "alignment-baseline",
  "baseline-shift",
  "letter-spacing",
  "word-spacing",
  "text-decoration",
  "visibility",
  "marker-start",
  "marker-mid",
  "marker-end",
  "clip-path",
  "mask",
  "filter",
  "paint-order",
] as const;
const paintPropertySet = new Set<string>(paintProperties);
const allowedTags = new Set([
  "svg",
  "g",
  "defs",
  "marker",
  "clippath",
  "mask",
  "pattern",
  "lineargradient",
  "radialgradient",
  "stop",
  "path",
  "rect",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "text",
  "tspan",
  "textpath",
  "title",
  "desc",
  "use",
  "filter",
  "fegaussianblur",
  "feoffset",
  "feblend",
  "fecolormatrix",
  "fecomponenttransfer",
  "fefunca",
  "fefuncb",
  "fefuncg",
  "fefuncr",
  "femerge",
  "femergenode",
  "feflood",
  "fecomposite",
]);
const allowedAttributes = new Set([
  "id",
  "class",
  "style",
  "xmlns",
  "xmlns:xlink",
  "xml:space",
  "role",
  "viewbox",
  "preserveaspectratio",
  "width",
  "height",
  "x",
  "y",
  "x1",
  "y1",
  "x2",
  "y2",
  "dx",
  "dy",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "d",
  "points",
  "transform",
  "pathlength",
  "refx",
  "refy",
  "markerwidth",
  "markerheight",
  "markerunits",
  "orient",
  "clippathunits",
  "maskunits",
  "maskcontentunits",
  "patternunits",
  "patterncontentunits",
  "patterntransform",
  "gradientunits",
  "gradienttransform",
  "offset",
  "stop-color",
  "stop-opacity",
  "spreadmethod",
  "href",
  "xlink:href",
  "textlength",
  "lengthadjust",
  "vector-effect",
  "filterunits",
  "primitiveunits",
  "in",
  "in2",
  "result",
  "stddeviation",
  "mode",
  "type",
  "values",
  "operator",
  "k1",
  "k2",
  "k3",
  "k4",
  "slope",
  "intercept",
  "amplitude",
  "exponent",
  "tablevalues",
  ...paintProperties,
]);

function inspectSource(source: string): void {
  if (!source.trim() || source.length > maxDiagramSourceLength)
    throw new Error(`Mermaid 원문은 1~${maxDiagramSourceLength}자여야 합니다.`);
  // Decode entities for inspection only; never parse the source as active HTML.
  const textarea = document.createElement("textarea");
  textarea.innerHTML = source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inspected = textarea.value;
  if (/%%\s*\{|^\s*---\s*(?:\r?\n|$)/m.test(inspected))
    throw new Error(
      "Mermaid 원문 안의 설정 지시문과 frontmatter는 지원하지 않습니다.",
    );
  if (
    /<(?:\s*\/?\s*(?:script|style|img|image|svg|foreignobject|iframe|object|embed|link|a|html|body|div|span|p|br|b|i|em|strong|input|video|audio|canvas|math)\b|[!?])/i.test(
      inspected,
    ) ||
    /<[a-z][^>]*\s+[a-z_:][\w:.-]*\s*=/i.test(inspected)
  )
    throw new Error(
      "Mermaid 원문에는 HTML 대신 일반 텍스트 라벨을 사용해 주세요.",
    );
  if (
    /@\s*\{/.test(inspected) ||
    /(?:^|[;\r\n])\s*(?:click|links?|style|classDef|linkStyle|cssClass)\s/i.test(
      inspected,
    ) ||
    /(?:\b(?:img|image|icon)\s*:|url\s*\(|@import|javascript\s*:|vbscript\s*:|data\s*:\s*[a-z]+\/)/i.test(
      inspected,
    )
  )
    throw new Error(
      "Mermaid 노드 메타데이터(@{}), 이미지·링크·CSS 선언과 외부 리소스는 지원하지 않습니다.",
    );
}

function safeFont(font: string): string {
  if (
    typeof font !== "string" ||
    !font.trim() ||
    font.length > 300 ||
    /[^\p{L}\p{N}\s,'"_\-]/u.test(font)
  )
    throw new Error("다이어그램에 사용할 올바른 글꼴 이름이 필요합니다.");
  return font;
}

interface MermaidRuntime {
  api: MermaidApi;
  document: Document;
  dispose(): void;
}

async function loadMermaid(container: HTMLElement): Promise<MermaidRuntime> {
  // A module imported by the parent window still sees an AMD loader such as
  // Monaco's `define`. Execute the trusted external bridge in its own realm;
  // do not temporarily replace the host loader while asynchronous imports run.
  const frame = document.createElement("iframe");
  frame.title = "Mermaid 렌더링";
  frame.tabIndex = -1;
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText =
    "all:initial!important;display:block!important;width:20000px!important;height:20000px!important;border:0!important;";
  container.append(frame);
  const runtimeDocument = frame.contentDocument;
  const runtimeWindow = frame.contentWindow as
    (Window & { __comicGenMermaid?: MermaidApi }) | null;
  if (!runtimeDocument?.body || !runtimeWindow) {
    frame.remove();
    throw new Error("Mermaid 격리 문서를 만들지 못했습니다.");
  }
  const script = runtimeDocument.createElement("script");
  script.type = "module";
  script.src = mermaidRuntimeUrl;
  try {
    const api = await new Promise<MermaidApi>((resolve, reject) => {
      const timer = window.setTimeout(() => {
        cleanup();
        reject(new Error("Mermaid 모듈을 불러오는 시간이 초과되었습니다."));
      }, 30_000);
      const cleanup = () => {
        window.clearTimeout(timer);
        script.onload = null;
        script.onerror = null;
        runtimeWindow.removeEventListener("comic-gen-mermaid-ready", ready);
        runtimeWindow.removeEventListener("comic-gen-mermaid-error", failed);
      };
      const ready = () => {
        cleanup();
        const api = runtimeWindow.__comicGenMermaid;
        if (
          typeof api?.initialize !== "function" ||
          typeof api?.render !== "function"
        )
          reject(new Error("Mermaid 모듈을 불러오지 못했습니다."));
        else resolve(api);
      };
      const failed = () => {
        cleanup();
        reject(new Error("Mermaid 모듈을 불러오지 못했습니다."));
      };
      // A module load event may precede its top-level await completion.
      runtimeWindow.addEventListener("comic-gen-mermaid-ready", ready);
      runtimeWindow.addEventListener("comic-gen-mermaid-error", failed);
      script.onload = () => {
        if (runtimeWindow.__comicGenMermaid) ready();
      };
      script.onerror = failed;
      runtimeDocument.head.append(script);
    });
    return { api, document: runtimeDocument, dispose: () => frame.remove() };
  } catch (error) {
    frame.remove();
    throw error;
  }
}

function parseSvg(markup: string): SVGSVGElement {
  const doc = new DOMParser().parseFromString(markup, "image/svg+xml");
  if (
    doc.querySelector("parsererror") ||
    doc.documentElement.localName !== "svg"
  )
    throw new Error("Mermaid가 올바른 SVG를 만들지 못했습니다.");
  return doc.documentElement as unknown as SVGSVGElement;
}

function fragmentUrls(
  value: string,
  ids: Set<string>,
  computed = false,
): string | undefined {
  let valid = true;
  const rewritten = value.replace(
    /url\(\s*(["']?)(.*?)\1\s*\)/gi,
    (_match, _quote, url: string) => {
      let fragment = url.trim();
      if (computed && !fragment.startsWith("#")) {
        const hash = fragment.lastIndexOf("#");
        fragment = hash >= 0 ? fragment.slice(hash) : "";
      }
      if (!fragment.startsWith("#") || !ids.has(fragment.slice(1))) {
        valid = false;
        return "";
      }
      return `url(${fragment})`;
    },
  );
  if (/url\s*\(/i.test(rewritten.replace(/url\(#[^)]*\)/g, ""))) valid = false;
  return valid ? rewritten : undefined;
}

function safeDeclarations(
  style: CSSStyleDeclaration,
  ids: Set<string>,
): string {
  const output = document.createElement("span").style;
  for (const property of paintProperties) {
    const value = fragmentUrls(style.getPropertyValue(property), ids);
    if (value)
      output.setProperty(property, value, style.getPropertyPriority(property));
  }
  if (style.getPropertyValue("display") === "none") output.display = "none";
  return output.cssText;
}

function selectors(selectorText: string): string[] {
  const output: string[] = [];
  let start = 0,
    depth = 0,
    quote = "";
  for (let index = 0; index < selectorText.length; index++) {
    const character = selectorText[index];
    if (quote) {
      if (character === quote && selectorText[index - 1] !== "\\") quote = "";
    } else if (character === "'" || character === '"') quote = character;
    else if (character === "(" || character === "[") depth++;
    else if (character === ")" || character === "]") depth--;
    else if (character === "," && depth === 0) {
      output.push(selectorText.slice(start, index).trim());
      start = index + 1;
    }
  }
  output.push(selectorText.slice(start).trim());
  return output;
}

function safeStyles(css: string, rootId: string, ids: Set<string>): string {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  const output: string[] = [];
  const prefix = `#${rootId}`;
  for (const rule of sheet.cssRules) {
    // Static export intentionally ignores keyframes and other at-rules.
    if (!(rule instanceof CSSStyleRule)) continue;
    const scoped = selectors(rule.selectorText).every(
      (selector) =>
        selector === prefix ||
        selector.startsWith(prefix + " ") ||
        selector.startsWith(prefix + ">") ||
        selector.startsWith(prefix + ":"),
    );
    if (!scoped) throw new Error("Mermaid SVG에 범위 밖 스타일이 있습니다.");
    const declarations = safeDeclarations(rule.style, ids);
    if (declarations) output.push(`${rule.selectorText}{${declarations}}`);
  }
  return output.join("\n");
}

function sanitizeSvg(markup: string): SVGSVGElement {
  if (markup.length > 2_000_000)
    throw new Error("Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요.");
  const svg = parseSvg(markup);
  const elements = [svg, ...svg.querySelectorAll("*")];
  if (elements.length > 10_000)
    throw new Error(
      "Mermaid SVG 요소가 너무 많습니다. 다이어그램을 나누어 주세요.",
    );
  const ids = new Set(elements.map((element) => element.id).filter(Boolean));
  const rootId = svg.id;
  // Sandbox renderers may emit absolute marker URLs referring to the parent
  // document. Normalize known local fragments before any SVG reaches live DOM.
  for (const element of elements) {
    for (const attribute of [...element.attributes]) {
      if (/url\s*\(/i.test(attribute.value)) {
        const value = fragmentUrls(attribute.value, ids, true);
        if (value === undefined) element.removeAttributeNode(attribute);
        else element.setAttribute(attribute.name, value);
      }
    }
  }
  for (const element of elements) {
    const tag = element.localName.toLowerCase();
    if (
      element.namespaceURI !== svgNamespace ||
      (!allowedTags.has(tag) && tag !== "style")
    ) {
      // Links are kept as plain diagram content; their interaction is removed.
      if (tag === "a") element.replaceWith(...element.childNodes);
      else element.remove();
      continue;
    }
    if (tag === "style") {
      element.textContent = safeStyles(element.textContent ?? "", rootId, ids);
      continue;
    }
    for (const attribute of [...element.attributes]) {
      const name = attribute.name.toLowerCase();
      const value = attribute.value;
      if (
        !allowedAttributes.has(name) &&
        !name.startsWith("aria-") &&
        !name.startsWith("data-")
      ) {
        element.removeAttributeNode(attribute);
      } else if (name === "href" || name === "xlink:href") {
        if (!value.startsWith("#") || !ids.has(value.slice(1)))
          element.removeAttributeNode(attribute);
      } else if (name === "style") {
        const style = document.createElement("span").style;
        style.cssText = value;
        element.setAttribute("style", safeDeclarations(style, ids));
      } else if (paintPropertySet.has(name)) {
        const safe = fragmentUrls(value, ids);
        if (safe === undefined) element.removeAttributeNode(attribute);
        else element.setAttribute(attribute.name, safe);
      }
    }
  }
  return svg;
}

function sandboxSvg(markup: string): string {
  if (markup.length > 3_000_000)
    throw new Error("Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요.");
  const encoded = markup.match(
    /\bsrc="data:text\/html;charset=UTF-8;base64,([^"]+)"/i,
  )?.[1];
  if (!encoded) throw new Error("Mermaid 격리 문서에서 SVG를 읽지 못했습니다.");
  const bytes = Uint8Array.from(atob(encoded), (character) =>
    character.charCodeAt(0),
  );
  const html = new TextDecoder().decode(bytes);
  const doc = new DOMParser().parseFromString(html, "text/html");
  const svg = doc.querySelector("svg");
  if (!svg) throw new Error("Mermaid 격리 문서에서 SVG를 읽지 못했습니다.");
  return svg.outerHTML;
}

function dimensions(svg: SVGSVGElement): { width: number; height: number } {
  const box = (svg.getAttribute("viewBox") ?? "")
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  const width =
    box.length === 4
      ? box[2]
      : Number.parseFloat(svg.getAttribute("width") ?? "");
  const height =
    box.length === 4
      ? box[3]
      : Number.parseFloat(svg.getAttribute("height") ?? "");
  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0 ||
    width > 20_000 ||
    height > 20_000 ||
    width * height > 160_000_000
  )
    throw new Error(
      "Mermaid 다이어그램 크기가 너무 큽니다. 다이어그램을 나누어 주세요.",
    );
  if (box.length !== 4 || box.some((value) => !Number.isFinite(value)))
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  return { width, height };
}

/** Render only on demand; the ordinary synchronous comic renderer never imports Mermaid. */
export async function renderMermaid(
  source: string,
  font: string,
): Promise<DiagramSvg> {
  if (typeof document === "undefined" || !document.body)
    throw new Error("Mermaid 렌더링에는 브라우저 문서가 필요합니다.");
  inspectSource(source);
  font = safeFont(font);
  const pending = rendering.then(async () => {
    // Loading the actual characters also covers split Korean web-font subsets.
    await Promise.all([
      document.fonts.load(`18px ${font}`, source),
      document.fonts.load(`bold 18px ${font}`, source),
      document.fonts.load(`italic 18px ${font}`, source),
    ]);
    await document.fonts.ready;
    const id = `comic-gen-mermaid-${instance}-${++serial}`;
    const container = document.createElement("div");
    container.dataset.comicDiagramTemporary = "";
    container.style.cssText =
      "all:initial!important;display:block!important;position:fixed!important;left:-100000px!important;top:0!important;width:20000px!important;pointer-events:none!important;opacity:0!important;";
    // Mermaid's supported sandbox renderer resolves global selectors inside an
    // iframe. Loaded host FontFaces can be shared without copying host CSS.
    const loadedFonts = [...document.fonts].filter(
      (face) => face.status === "loaded",
    );
    let runtime: MermaidRuntime | undefined;
    let runtimeContainer: HTMLElement | undefined;
    const observer = new MutationObserver(() => {
      const frame = runtimeContainer?.querySelector("iframe");
      const frameDocument = frame?.contentDocument;
      if (!frame || !frameDocument) return;
      frame.style.cssText =
        "all:initial!important;display:block!important;width:20000px!important;height:20000px!important;border:0!important;";
      for (const face of loadedFonts) frameDocument.fonts.add(face);
    });
    document.body.append(container);
    try {
      runtime = await loadMermaid(container);
      for (const face of loadedFonts) runtime.document.fonts.add(face);
      runtimeContainer = runtime.document.createElement("div");
      runtimeContainer.style.cssText = "width:20000px;";
      runtime.document.body.append(runtimeContainer);
      observer.observe(runtimeContainer, { childList: true, subtree: true });
      const mermaid = runtime.api;
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "sandbox",
        suppressErrorRendering: true,
        maxTextSize: maxDiagramSourceLength,
        maxEdges: 500,
        htmlLabels: false,
        fontFamily: font,
        theme: "neutral",
        themeVariables: { fontFamily: font, fontSize: "18px" },
        flowchart: { htmlLabels: false, useMaxWidth: false },
        class: { htmlLabels: false, useMaxWidth: false },
        sequence: {
          useMaxWidth: false,
          actorFontFamily: font,
          noteFontFamily: font,
          messageFontFamily: font,
        },
        secure: [
          "secure",
          "securityLevel",
          "startOnLoad",
          "maxTextSize",
          "maxEdges",
          "suppressErrorRendering",
          "htmlLabels",
          "theme",
          "themeCSS",
          "themeVariables",
          "fontFamily",
          "altFontFamily",
        ],
      });
      const result = await mermaid.render(id, source, runtimeContainer);
      observer.disconnect();
      const svg = sanitizeSvg(sandboxSvg(result.svg));
      const size = dimensions(svg);
      // Mermaid removes its measurement DOM. This safe copy lets the browser
      // resolve diagram-scoped CSS without any host selectors before export.
      const shadow = container.attachShadow({ mode: "closed" });
      shadow.append(document.importNode(svg, true));
      const mounted = shadow.firstElementChild as SVGSVGElement;
      const elements = [mounted, ...mounted.querySelectorAll("*")];
      const ids = new Set(
        elements.map((element) => element.id).filter(Boolean),
      );
      const styles = elements.map((element) => {
        if (element.localName === "style") return "";
        const computed = getComputedStyle(element);
        const output = document.createElement("span").style;
        for (const property of paintProperties) {
          const value = fragmentUrls(
            computed.getPropertyValue(property),
            ids,
            true,
          );
          if (value) output.setProperty(property, value, "important");
        }
        if (computed.display === "none")
          output.setProperty("display", "none", "important");
        return output.cssText;
      });
      elements.forEach((element, index) => {
        if (element.localName === "style") element.remove();
        else {
          element.setAttribute("style", styles[index]);
          element.removeAttribute("class");
        }
      });
      mounted.style.removeProperty("visibility");
      // Responsive host selectors apply to outer comic SVGs. Keep this nested
      // diagram at the natural dimensions used by the board's scaling transform.
      mounted.style.setProperty("width", `${size.width}px`, "important");
      mounted.style.setProperty("height", `${size.height}px`, "important");
      mounted.style.setProperty("max-width", "none", "important");
      mounted.style.setProperty("max-height", "none", "important");
      const markup = new XMLSerializer().serializeToString(mounted);
      if (markup.length > 2_000_000)
        throw new Error(
          "Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요.",
        );
      return { svg: markup, ...size };
    } finally {
      observer.disconnect();
      runtime?.document.getElementById(id)?.remove();
      runtime?.document.getElementById(`d${id}`)?.remove();
      runtime?.document.getElementById(`i${id}`)?.remove();
      runtime?.dispose();
      container.remove();
    }
  });
  // A syntax/import failure must not poison subsequent render requests.
  rendering = pending.catch(() => undefined);
  return pending;
}

/** Reassign IDs per SVG placement, including a complete comic containing cached diagrams. */
export function namespaceDiagram(diagram: DiagramSvg, prefix: string): string {
  if (!/^[A-Za-z][A-Za-z0-9_-]{0,120}$/.test(prefix))
    throw new Error("다이어그램 SVG 식별자 접두사가 올바르지 않습니다.");
  const svg = parseSvg(diagram.svg);
  const elements = [svg, ...svg.querySelectorAll("*")];
  const scopes = new Map<Element, Map<string, string>>();
  let serial = 0;
  const scopedIds = (element: Element): Map<string, string> => {
    const root =
      element.localName === "svg" ? element : element.closest("svg")!;
    let ids = scopes.get(root);
    if (!ids) {
      ids = new Map();
      scopes.set(root, ids);
    }
    return ids;
  };
  for (const element of elements) {
    if (!element.id) continue;
    const ids = scopedIds(element);
    if (ids.has(element.id))
      throw new Error("다이어그램 SVG 식별자가 중복됩니다.");
    ids.set(element.id, `${prefix}-${serial++}`);
  }
  for (const element of elements) {
    const ids = scopedIds(element);
    for (const attribute of [...element.attributes]) {
      if (attribute.name === "id")
        element.setAttribute("id", ids.get(attribute.value)!);
      else if (
        attribute.localName === "href" &&
        attribute.value.startsWith("#")
      ) {
        const replacement = ids.get(attribute.value.slice(1));
        if (replacement)
          element.setAttribute(attribute.name, `#${replacement}`);
      } else if (
        attribute.name === "aria-labelledby" ||
        attribute.name === "aria-describedby"
      ) {
        element.setAttribute(
          attribute.name,
          attribute.value
            .split(/\s+/)
            .map((id) => ids.get(id) ?? id)
            .join(" "),
        );
      } else if (/url\(/i.test(attribute.value)) {
        element.setAttribute(
          attribute.name,
          attribute.value.replace(
            /url\(\s*(["']?)#([^"')\s]+)\1\s*\)/gi,
            (original, _quote, id: string) =>
              ids.has(id) ? `url(#${ids.get(id)})` : original,
          ),
        );
      }
    }
  }
  return new XMLSerializer().serializeToString(svg);
}
