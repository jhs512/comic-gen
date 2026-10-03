import {
  mountPanelNavigation,
  readPanelBounds,
  type PanelBounds,
} from "./viewer-navigation";
import { viewerStyles } from "./viewer-styles";

export interface ComicViewerOptions {
  /** The connected element to focus when this reading session closes. */
  trigger?: HTMLElement;
}
interface ComicViewerImage {
  svg: string;
  width: number;
  height: number;
  diagnostics?: readonly string[];
}
export interface ComicViewerPanel extends ComicViewerImage {
  index: number;
}
export interface ComicViewerResult extends ComicViewerImage {
  panels: readonly ComicViewerPanel[];
}
export interface ComicViewer {
  readonly isOpen: boolean;
  open(result: ComicViewerResult, options?: ComicViewerOptions): void;
  close(): void;
  destroy(): void;
}
interface CompletedComic {
  result: ComicViewerResult;
  title: string;
  bounds: PanelBounds[];
  panelWidth: number;
  panelHeight: number;
}
const svgNamespace = "http://www.w3.org/2000/svg";
const internalReference = /^#[\p{L}_][\p{L}\p{N}_:.-]*$/u;
const paintAttributes = new Set([
  "fill",
  "stroke",
  "filter",
  "mask",
  "clip-path",
  "marker-start",
  "marker-mid",
  "marker-end",
  "cursor",
]);
const staticElements = new Set([
  "svg",
  "g",
  "defs",
  "title",
  "desc",
  "path",
  "rect",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "text",
  "tspan",
  "textPath",
  "use",
  "symbol",
  "marker",
  "clipPath",
  "mask",
  "pattern",
  "linearGradient",
  "radialGradient",
  "stop",
  "filter",
  "feGaussianBlur",
  "feOffset",
  "feBlend",
  "feColorMatrix",
  "feComposite",
  "feFlood",
  "feMerge",
  "feMergeNode",
  "feDropShadow",
  "feComponentTransfer",
  "feFuncA",
  "feFuncR",
  "feFuncG",
  "feFuncB",
  "feMorphology",
  "feConvolveMatrix",
  "feDisplacementMap",
  "feTurbulence",
  "feDiffuseLighting",
  "feSpecularLighting",
  "feDistantLight",
  "fePointLight",
  "feSpotLight",
  "feTile",
]);

function readSvg(result: ComicViewerImage): Document {
  if (
    !result ||
    typeof result.svg !== "string" ||
    !result.svg ||
    result.svg.length > 64_000_000 ||
    !Number.isFinite(result.width) ||
    result.width <= 0 ||
    result.width > 1_000_000 ||
    !Number.isFinite(result.height) ||
    result.height <= 0 ||
    result.height > 1_000_000 ||
    (result.diagnostics !== undefined &&
      (!Array.isArray(result.diagnostics) || result.diagnostics.length))
  )
    throw new TypeError("완성된 코믹젠 렌더 결과가 필요합니다.");
  if (/<!DOCTYPE|<!ENTITY|<\?/i.test(result.svg))
    throw new TypeError("정적 코믹젠 SVG만 뷰어에 전달하세요.");
  const xml = new DOMParser().parseFromString(result.svg, "image/svg+xml");
  const root = xml.documentElement;
  const viewBox = (
    root.getAttribute("viewBox") ?? `0 0 ${result.width} ${result.height}`
  )
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  if (
    root.localName !== "svg" ||
    root.namespaceURI !== svgNamespace ||
    xml.querySelector("parsererror") ||
    viewBox.length !== 4 ||
    viewBox[0] !== 0 ||
    viewBox[1] !== 0 ||
    viewBox[2] !== result.width ||
    viewBox[3] !== result.height ||
    Number(root.getAttribute("width")) !== result.width ||
    Number(root.getAttribute("height")) !== result.height
  )
    throw new TypeError("만화 SVG와 렌더 결과의 크기가 일치해야 합니다.");
  for (const element of [root, ...root.querySelectorAll("*")]) {
    if (
      element.namespaceURI !== svgNamespace ||
      !staticElements.has(element.localName)
    )
      throw new TypeError("외부 리소스나 실행 가능한 SVG는 지원하지 않습니다.");
    for (const attribute of element.attributes) {
      const name = attribute.localName.toLowerCase();
      const value = attribute.value;
      if (
        name.startsWith("on") ||
        (name === "base" &&
          attribute.namespaceURI === "http://www.w3.org/XML/1998/namespace") ||
        (name === "href" && !internalReference.test(value))
      )
        throw new TypeError(
          "외부 링크나 이벤트가 포함된 SVG는 지원하지 않습니다.",
        );
      if (
        name === "style" &&
        /@|javascript\s*:|vbscript\s*:|expression\s*\(|[\\<>]/i.test(value)
      )
        throw new TypeError("정적 코믹젠 SVG 스타일만 지원합니다.");
      if (paintAttributes.has(name) && /[\\<>@]/.test(value))
        throw new TypeError("정적 코믹젠 SVG 색상과 참조만 지원합니다.");
      for (const url of value.matchAll(/url\s*\(([^)]*)\)/gi)) {
        const reference = url[1].trim().replace(/^(['"])(.*)\1$/, "$2");
        if (!internalReference.test(reference))
          throw new TypeError("SVG의 외부 리소스는 지원하지 않습니다.");
      }
    }
  }
  return xml;
}

function completedComic(input: ComicViewerResult): CompletedComic {
  const xml = readSvg(input);
  if (
    !Array.isArray(input.panels) ||
    input.panels.length < 1 ||
    input.panels.length > 30
  )
    throw new TypeError("만화에는 실제 렌더된 1~30개의 컷이 필요합니다.");
  const individualBounds: PanelBounds[] = [];
  const panels = input.panels.map((panel, index) => {
    if (panel.index !== index)
      throw new TypeError("만화의 개별 컷 순서가 일치해야 합니다.");
    const frames = readPanelBounds(readSvg(panel), index);
    if (
      frames.length !== 1 ||
      ![frames[0].x, frames[0].y, frames[0].width, frames[0].height].every(
        Number.isFinite,
      ) ||
      frames[0].width <= 0 ||
      frames[0].height <= 0 ||
      frames[0].x < 0 ||
      frames[0].y < 0 ||
      frames[0].x + frames[0].width > panel.width + 1 ||
      frames[0].y + frames[0].height > panel.height + 1
    )
      throw new TypeError("개별 컷 SVG에는 한 개의 컷 프레임이 필요합니다.");
    individualBounds.push(frames[0]);
    return { ...panel };
  });
  const bounds = readPanelBounds(xml);
  if (
    bounds.length !== panels.length ||
    bounds.some(
      (panel) =>
        ![panel.x, panel.y, panel.width, panel.height].every(Number.isFinite) ||
        panel.width <= 0 ||
        panel.height <= 0 ||
        panel.x < 0 ||
        panel.y < 0 ||
        panel.x + panel.width > input.width + 1 ||
        panel.y + panel.height > input.height + 1,
    )
  )
    throw new TypeError("만화의 컷 프레임과 렌더 결과가 일치해야 합니다.");
  const title =
    xml.documentElement.getAttribute("aria-label") ??
    xml.documentElement.querySelector("title")?.textContent ??
    "만화";
  // Map each independent cut's title and margins into the complete composition.
  // This also supports composed horizontal SVGs and transformed panel frames.
  const sizes = panels.map((panel, index) => {
    const whole = bounds[index],
      single = individualBounds[index];
    const scale = Math.max(
      whole.width / single.width,
      whole.height / single.height,
    );
    return { width: panel.width * scale, height: panel.height * scale };
  });
  return {
    result: { ...input, panels },
    title,
    bounds,
    panelWidth: Math.max(...sizes.map((size) => size.width)),
    panelHeight: Math.max(...sizes.map((size) => size.height)),
  };
}

interface ViewerDocumentState {
  styles?: { element: HTMLStyleElement; count: number };
  bodyLocks: WeakMap<
    HTMLElement,
    { count: number; value: string; priority: string }
  >;
  nextId: number;
}
const documentStateKey = Symbol.for("comic-gen.viewer.document-state.v1");
// Compatibility and optional entry files can coexist on one page. Keep their
// shared DOM resources in the document, while importing either entry stays inert.
function documentState(): ViewerDocumentState {
  const owner = document as Document & {
    [documentStateKey]?: ViewerDocumentState;
  };
  if (!owner[documentStateKey])
    Object.defineProperty(owner, documentStateKey, {
      value: { bodyLocks: new WeakMap(), nextId: 0 },
    });
  return owner[documentStateKey]!;
}
function acquireStyles(): () => void {
  const owner = documentState();
  let state = owner.styles;
  if (!state) {
    const element = document.createElement("style");
    element.dataset.comicGenViewerStyles = "";
    element.textContent = viewerStyles;
    document.head.append(element);
    state = { element, count: 0 };
    owner.styles = state;
  } else if (!state.element.isConnected) document.head.append(state.element);
  state.count++;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--state!.count === 0) {
      state!.element.remove();
      owner.styles = undefined;
    }
  };
}
function lockBody(): () => void {
  const bodyLocks = documentState().bodyLocks;
  const body = document.body;
  let lock = bodyLocks.get(body);
  if (!lock) {
    lock = {
      count: 0,
      value: body.style.getPropertyValue("overflow"),
      priority: body.style.getPropertyPriority("overflow"),
    };
    bodyLocks.set(body, lock);
    body.style.setProperty("overflow", "hidden", "important");
  }
  lock.count++;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--lock!.count === 0) {
      if (lock!.value)
        body.style.setProperty("overflow", lock!.value, lock!.priority);
      else body.style.removeProperty("overflow");
      bodyLocks.delete(body);
    }
  };
}
function blobImage(svg: string, width: number, height: number, alt: string) {
  const image = document.createElement("img");
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  Object.assign(image, {
    src: url,
    width,
    height,
    alt,
    decoding: "async",
    draggable: false,
  });
  let revoked = false;
  return {
    image,
    revoke: () => {
      if (!revoked) {
        revoked = true;
        URL.revokeObjectURL(url);
      }
    },
  };
}

/** A renderer-independent viewer for completed synchronous or asynchronous results. */
export function createComicViewer(): ComicViewer {
  let dialog: HTMLDialogElement | undefined;
  let viewport: HTMLElement;
  let artwork: HTMLElement;
  let title: HTMLElement;
  let zoom: HTMLSelectElement;
  let preventOverflow: HTMLInputElement;
  let previous: HTMLButtonElement;
  let next: HTMLButtonElement;
  let status: HTMLElement;
  let comic: CompletedComic | undefined;
  let navigation: ReturnType<typeof mountPanelNavigation> | undefined;
  let resize: ResizeObserver | undefined;
  let revokeImage: (() => void) | undefined;
  let releaseBody: (() => void) | undefined;
  let releaseStyles: (() => void) | undefined;
  let trigger: HTMLElement | undefined;
  let destroyed = false;
  const updateSize = () => {
    if (!dialog?.open || !comic) return;
    const position = navigation?.capturePosition();
    viewport.dataset.preventOverflow = String(preventOverflow.checked);
    const result = comic.result;
    let width = result.width * Number(zoom.value);
    if (preventOverflow.checked) {
      const style = getComputedStyle(viewport);
      const availableWidth = Math.max(
        0,
        viewport.clientWidth -
          (parseFloat(style.paddingLeft) || 0) -
          (parseFloat(style.paddingRight) || 0),
      );
      const availableHeight = Math.max(
        0,
        viewport.clientHeight -
          (parseFloat(style.paddingTop) || 0) -
          (parseFloat(style.paddingBottom) || 0),
      );
      // Individual results include their own title and margins, unlike frame bounds.
      width = Math.min(
        width,
        (availableWidth * result.width) / comic.panelWidth,
        (availableHeight * result.width) / comic.panelHeight,
      );
    }
    artwork.style.width = `${Math.max(0, width)}px`;
    if (position && Number.isFinite(position.x) && Number.isFinite(position.y))
      navigation?.restorePosition(position);
  };
  const endSession = () => {
    navigation?.dispose();
    navigation = undefined;
    revokeImage?.();
    revokeImage = undefined;
    artwork?.replaceChildren();
    comic = undefined;
    releaseBody?.();
    releaseBody = undefined;
    const previousTrigger = trigger;
    trigger = undefined;
    const otherDialog = [
      ...document.querySelectorAll<HTMLDialogElement>("dialog[open]"),
    ].find((element) => element !== dialog);
    if (
      previousTrigger?.isConnected &&
      (!otherDialog || otherDialog.contains(previousTrigger))
    )
      previousTrigger.focus({ preventScroll: true });
  };
  const close = () => {
    if (dialog?.open) dialog.close();
    endSession();
  };
  const cancel = (event: Event) => {
    event.preventDefault();
    close();
  };
  const onClose = () => {
    if (!dialog?.open) endSession();
  };
  const trapTab = (event: KeyboardEvent) => {
    if (event.key !== "Tab" || !dialog?.open) return;
    const controls = [
      ...dialog.querySelectorAll<HTMLElement>(
        "button:not(:disabled), input, select, [tabindex='0']",
      ),
    ];
    const first = controls[0],
      last = controls[controls.length - 1];
    if (
      (!event.shiftKey && document.activeElement === last) ||
      (event.shiftKey && document.activeElement === first)
    ) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    }
  };
  const build = () => {
    if (dialog) return;
    releaseStyles = acquireStyles();
    const id = `comic-gen-viewer-${++documentState().nextId}`;
    dialog = document.createElement("dialog");
    dialog.className = "comic-viewer";
    dialog.dataset.comicGenViewer = "";
    dialog.setAttribute("aria-labelledby", `${id}-title`);
    dialog.setAttribute("aria-describedby", `${id}-help`);
    // This string is static UI. Comic titles use textContent, SVG uses an img Blob.
    dialog.innerHTML = `<div class="comic-viewer-toolbar"><h2 class="comic-viewer-title" id="${id}-title"></h2><button type="button" autofocus>닫기</button><div class="comic-viewer-controls"><label class="comic-viewer-checkbox"><input type="checkbox" checked>화면 넘침 방지</label><label>보기 크기 <select><option value="1">100%</option><option value="1.5">150%</option><option value="2">200%</option></select></label><div class="comic-viewer-navigation"><button type="button" class="comic-previous" aria-label="이전 컷">←</button><span class="comic-position" role="status" aria-live="polite"></span><button type="button" class="comic-next" aria-label="다음 컷">→</button></div></div></div><p class="comic-viewer-help" id="${id}-help">화면 넘침 방지는 한 컷의 너비·높이를 화면에 맞춥니다. 다음 컷은 아래로 스크롤해 읽습니다. 컷 왼쪽은 이전, 오른쪽은 다음 컷입니다. 읽기 영역에서 ←/→ 키로도 이동합니다.</p><div class="comic-viewer-viewport" tabindex="0" role="region" aria-label="만화 읽기 영역"><div class="comic-viewer-artwork"></div></div>`;
    title = dialog.querySelector("h2")!;
    viewport = dialog.querySelector(".comic-viewer-viewport")!;
    artwork = dialog.querySelector(".comic-viewer-artwork")!;
    zoom = dialog.querySelector("select")!;
    preventOverflow = dialog.querySelector('input[type="checkbox"]')!;
    previous = dialog.querySelector(".comic-previous")!;
    next = dialog.querySelector(".comic-next")!;
    status = dialog.querySelector(".comic-position")!;
    zoom.addEventListener("change", updateSize);
    preventOverflow.addEventListener("change", updateSize);
    dialog.querySelector("button")!.addEventListener("click", close);
    dialog.addEventListener("cancel", cancel);
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("keydown", trapTab);
    document.body.append(dialog);
    resize = new ResizeObserver(updateSize);
    resize.observe(viewport);
  };
  return {
    get isOpen() {
      return Boolean(dialog?.open);
    },
    open: (input, options = {}) => {
      if (destroyed) throw new Error("폐기한 만화 뷰어는 다시 열 수 없습니다.");
      const completed = completedComic(input);
      const focus =
        options.trigger ??
        (dialog?.open
          ? trigger
          : document.activeElement instanceof HTMLElement
            ? document.activeElement
            : undefined);
      build();
      navigation?.dispose();
      revokeImage?.();
      comic = completed;
      trigger = focus;
      title.textContent = completed.title;
      zoom.value = "1";
      preventOverflow.checked = true;
      const resource = blobImage(
        completed.result.svg,
        completed.result.width,
        completed.result.height,
        completed.title,
      );
      revokeImage = resource.revoke;
      artwork.replaceChildren(resource.image);
      navigation = mountPanelNavigation(
        viewport,
        resource.image,
        completed.bounds,
        completed.result.width,
        previous,
        next,
        status,
      );
      if (!dialog!.open) {
        releaseBody = lockBody();
        try {
          dialog!.showModal();
        } catch (error) {
          endSession();
          throw error;
        }
      }
      updateSize();
      viewport.scrollTo(0, 0);
      navigation.reset();
      dialog!
        .querySelector<HTMLButtonElement>("button")!
        .focus({ preventScroll: true });
    },
    close,
    destroy: () => {
      if (destroyed) return;
      destroyed = true;
      close();
      resize?.disconnect();
      if (dialog) {
        zoom.removeEventListener("change", updateSize);
        preventOverflow.removeEventListener("change", updateSize);
        dialog.querySelector("button")!.removeEventListener("click", close);
        dialog.removeEventListener("cancel", cancel);
        dialog.removeEventListener("close", onClose);
        dialog.removeEventListener("keydown", trapTab);
        dialog.remove();
      }
      releaseStyles?.();
      releaseStyles = undefined;
    },
  };
}

/** Replace a host container with a preview card; call cleanup before replacing it. */
export function mountComicCard(
  container: HTMLElement,
  input: ComicViewerResult,
): () => void {
  const completed = completedComic(input);
  const releaseStyles = acquireStyles();
  const viewer = createComicViewer();
  const button = document.createElement("button");
  button.type = "button";
  button.className = "comic-card";
  button.dataset.comicGenCard = "";
  button.setAttribute("aria-haspopup", "dialog");
  button.setAttribute("aria-label", `${completed.title} · 만화 읽기`);
  const thumbnail = document.createElement("span");
  thumbnail.className = "comic-card-thumbnail";
  thumbnail.setAttribute("aria-hidden", "true");
  const first = completed.result.panels[0];
  const resource = blobImage(
    first.svg,
    first.width,
    first.height,
    `${completed.title} · 1/${completed.result.panels.length}`,
  );
  thumbnail.append(resource.image);
  const copy = document.createElement("span");
  copy.className = "comic-card-copy";
  const heading = document.createElement("strong");
  heading.textContent = completed.title;
  const caption = document.createElement("span");
  caption.textContent = `${completed.result.panels.length}컷 · 만화 읽기 ↗`;
  copy.append(heading, caption);
  button.append(thumbnail, copy);
  const open = () => viewer.open(completed.result, { trigger: button });
  button.addEventListener("click", open);
  container.replaceChildren(button);
  let disposed = false;
  return () => {
    if (disposed) return;
    disposed = true;
    button.removeEventListener("click", open);
    viewer.destroy();
    resource.revoke();
    button.remove();
    releaseStyles();
  };
}
