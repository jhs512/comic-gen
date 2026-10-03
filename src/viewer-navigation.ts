export interface PanelBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Read generated panel frames without inserting or executing their SVG. */
export function readPanelBounds(xml: Document, firstIndex = 0): PanelBounds[] {
  return [...xml.querySelectorAll("g[data-panel]")].map((group, index) => {
    if (group.getAttribute("data-panel") !== String(index + firstIndex))
      throw new TypeError("만화의 컷 순서가 올바르지 않습니다.");
    const rect = group.querySelector("rect");
    if (!rect) throw new TypeError("만화에 컷 프레임이 없습니다.");
    let matrix = new DOMMatrix();
    for (
      let node: Element | null = rect;
      node && node !== xml.documentElement;
      node = node.parentElement
    ) {
      let local = new DOMMatrix();
      const transform = node.getAttribute("transform") ?? "";
      const pattern = /(matrix|translate|scale|rotate|skewX|skewY)\(([^)]*)\)/g;
      let remainder = transform;
      for (const match of transform.matchAll(pattern)) {
        const values = match[2]
          .trim()
          .split(/[\s,]+/)
          .map(Number);
        if (!values.length || values.some((value) => !Number.isFinite(value)))
          throw new TypeError("만화의 컷 변환이 올바르지 않습니다.");
        const [a, b = 0, c = 0] = values;
        switch (match[1]) {
          case "matrix":
            if (values.length !== 6)
              throw new TypeError("올바른 컷 행렬이 필요합니다.");
            local = local.multiply(new DOMMatrix(values));
            break;
          case "translate":
            local = local.translate(a, b);
            break;
          case "scale":
            local = local.scale(a, values[1] ?? a);
            break;
          case "rotate":
            local = local.translate(b, c).rotate(a).translate(-b, -c);
            break;
          case "skewX":
            local = local.skewX(a);
            break;
          case "skewY":
            local = local.skewY(a);
            break;
        }
        remainder = remainder.replace(match[0], "");
      }
      if (remainder.trim()) throw new TypeError("지원하지 않는 컷 변환입니다.");
      matrix = local.multiply(matrix);
    }
    const x = Number(rect.getAttribute("x") ?? 0);
    const y = Number(rect.getAttribute("y") ?? 0);
    const width = Number(rect.getAttribute("width"));
    const height = Number(rect.getAttribute("height"));
    if (
      ![x, y, width, height].every(Number.isFinite) ||
      width <= 0 ||
      height <= 0
    )
      throw new TypeError("만화의 컷 크기가 올바르지 않습니다.");
    const points = [
      [x, y],
      [x + width, y],
      [x, y + height],
      [x + width, y + height],
    ].map(([px, py]) => matrix.transformPoint(new DOMPoint(px, py)));
    const left = Math.min(...points.map((point) => point.x));
    const top = Math.min(...points.map((point) => point.y));
    return {
      x: left,
      y: top,
      width: Math.max(...points.map((point) => point.x)) - left,
      height: Math.max(...points.map((point) => point.y)) - top,
    };
  });
}

export function mountPanelNavigation(
  viewport: HTMLElement,
  image: HTMLImageElement,
  panels: PanelBounds[],
  originalWidth: number,
  previous: HTMLButtonElement,
  next: HTMLButtonElement,
  status: HTMLElement,
  onChange?: () => void,
) {
  let current = 0;
  let moving = false;
  let frame = 0;
  const origin = () => {
    const box = viewport.getBoundingClientRect();
    const style = getComputedStyle(viewport);
    return {
      x: box.x + viewport.clientLeft + (parseFloat(style.paddingLeft) || 0),
      y: box.y + viewport.clientTop + (parseFloat(style.paddingTop) || 0),
    };
  };
  const screenPanels = () => {
    const box = image.getBoundingClientRect();
    const scale = box.width / originalWidth;
    return panels.map((panel) => ({
      x: box.x + panel.x * scale,
      y: box.y + panel.y * scale,
      width: panel.width * scale,
      height: panel.height * scale,
    }));
  };
  let announced = 0;
  const announce = () => {
    previous.disabled = current === 0;
    next.disabled = current === panels.length - 1;
    if (
      (document.activeElement === previous && previous.disabled) ||
      (document.activeElement === next && next.disabled)
    )
      viewport.focus();
    const label = `${current + 1} / ${panels.length}컷`;
    if (status.textContent !== label) status.textContent = label;
    if (announced !== current) {
      announced = current;
      onChange?.();
    }
  };
  const onScroll = () => {
    if (moving) return;
    // A tall later cut can make several early cuts fit at once. Reading from
    // the start still begins with the first cut, even if another has more area.
    if (viewport.scrollLeft === 0 && viewport.scrollTop === 0) {
      current = 0;
      announce();
      return;
    }
    const point = origin();
    const visibleWidth =
      viewport.clientWidth -
      (parseFloat(getComputedStyle(viewport).paddingLeft) || 0) -
      (parseFloat(getComputedStyle(viewport).paddingRight) || 0);
    const visibleHeight =
      viewport.clientHeight -
      (parseFloat(getComputedStyle(viewport).paddingTop) || 0) -
      (parseFloat(getComputedStyle(viewport).paddingBottom) || 0);
    const bounds = screenPanels();
    const last = bounds[bounds.length - 1];
    // At the end, two short cuts can be fully visible with equal areas. The
    // reader has reached the final cut even when rounding favors the earlier one.
    if (
      viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 1 &&
      viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - 1 &&
      last.x < point.x + visibleWidth &&
      last.x + last.width > point.x &&
      last.y < point.y + visibleHeight &&
      last.y + last.height > point.y
    ) {
      current = panels.length - 1;
      announce();
      return;
    }
    let largestVisibleArea = -1;
    let nearest = Infinity;
    bounds.forEach((panel, index) => {
      const visibleArea =
        Math.max(
          0,
          Math.min(panel.x + panel.width, point.x + visibleWidth) -
            Math.max(panel.x, point.x),
        ) *
        Math.max(
          0,
          Math.min(panel.y + panel.height, point.y + visibleHeight) -
            Math.max(panel.y, point.y),
        );
      const distance = Math.hypot(
        Math.max(panel.x - point.x, 0, point.x - panel.x - panel.width),
        Math.max(panel.y - point.y, 0, point.y - panel.y - panel.height),
      );
      if (
        visibleArea > largestVisibleArea ||
        (visibleArea === largestVisibleArea && distance < nearest)
      ) {
        largestVisibleArea = visibleArea;
        nearest = distance;
        current = index;
      }
    });
    announce();
  };
  const settle = () => {
    cancelAnimationFrame(frame);
    moving = true;
    const left = viewport.scrollLeft,
      top = viewport.scrollTop;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        moving = false;
        // Reconcile a reader scroll that overlaps a programmatic move, while
        // preserving the explicit cut target when the move alone has settled.
        if (viewport.scrollLeft !== left || viewport.scrollTop !== top)
          onScroll();
      });
    });
  };
  const go = (direction: number, from = current) => {
    current = Math.max(0, Math.min(panels.length - 1, from + direction));
    if (current === from) {
      announce();
      return;
    }
    const panel = screenPanels()[current];
    const point = origin();
    viewport.scrollTo({
      left: viewport.scrollLeft + panel.x - point.x,
      top: viewport.scrollTop + panel.y - point.y,
      behavior: "instant",
    });
    settle();
    announce();
  };
  const back = () => go(-1);
  const forward = () => go(1);
  const keyboard = (event: KeyboardEvent) => {
    if (
      event.target !== viewport ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    )
      return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      go(event.key === "ArrowLeft" ? -1 : 1);
    }
  };
  const pointers = new Set<number>();
  let pointer: { id: number; x: number; y: number; moved: boolean } | undefined;
  let tap = false;
  const down = (event: PointerEvent) => {
    pointers.add(event.pointerId);
    tap = false;
    if (pointers.size !== 1 || !event.isPrimary || event.button !== 0) {
      pointer = undefined;
      return;
    }
    pointer = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      moved: false,
    };
  };
  const move = (event: PointerEvent) => {
    if (
      pointer?.id === event.pointerId &&
      Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > 8
    )
      pointer.moved = true;
  };
  const up = (event: PointerEvent) => {
    tap = Boolean(
      pointers.size === 1 && pointer?.id === event.pointerId && !pointer.moved,
    );
    pointers.delete(event.pointerId);
    pointer = undefined;
  };
  const cancel = (event?: PointerEvent) => {
    if (event) pointers.delete(event.pointerId);
    else pointers.clear();
    pointer = undefined;
    tap = false;
  };
  const click = (event: MouseEvent) => {
    const valid = tap;
    tap = false;
    if (
      !valid ||
      event.detail > 1 ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.shiftKey ||
      event.target !== image
    )
      return;
    const bounds = screenPanels();
    const index = bounds.findIndex(
      (panel) =>
        event.clientX >= panel.x &&
        event.clientX <= panel.x + panel.width &&
        event.clientY >= panel.y &&
        event.clientY <= panel.y + panel.height,
    );
    if (index >= 0) {
      viewport.focus({ preventScroll: true });
      go(
        event.clientX < bounds[index].x + bounds[index].width / 2 ? -1 : 1,
        index,
      );
    }
  };
  const outsideUp = (event: PointerEvent) => {
    if (!viewport.contains(event.target as Node)) cancel(event);
  };
  image.draggable = false;
  previous.addEventListener("click", back);
  next.addEventListener("click", forward);
  viewport.addEventListener("scroll", onScroll);
  viewport.addEventListener("keydown", keyboard);
  viewport.addEventListener("pointerdown", down);
  viewport.addEventListener("pointermove", move);
  viewport.addEventListener("pointerup", up);
  viewport.addEventListener("pointercancel", cancel);
  viewport.addEventListener("click", click);
  document.addEventListener("pointerup", outsideUp);
  document.addEventListener("pointercancel", outsideUp);
  announce();
  return {
    get currentIndex() {
      return current;
    },
    goTo: (index: number) => go(index - current),
    capturePosition: () => {
      const point = origin();
      const box = image.getBoundingClientRect();
      const scale = box.width / originalWidth;
      return { x: (point.x - box.x) / scale, y: (point.y - box.y) / scale };
    },
    restorePosition: (position: { x: number; y: number }) => {
      const left = viewport.scrollLeft,
        top = viewport.scrollTop;
      const box = image.getBoundingClientRect();
      const point = origin();
      const scale = box.width / originalWidth;
      viewport.scrollTo({
        left: viewport.scrollLeft + box.x + position.x * scale - point.x,
        top: viewport.scrollTop + box.y + position.y * scale - point.y,
        behavior: "instant",
      });
      // A ResizeObserver notification often restores the same position. Do not
      // suppress a pending reader scroll event when nothing actually moved.
      if (viewport.scrollLeft !== left || viewport.scrollTop !== top) settle();
      announce();
    },
    reset: () => {
      cancelAnimationFrame(frame);
      moving = false;
      current = 0;
      cancel();
      announce();
    },
    dispose: () => {
      cancelAnimationFrame(frame);
      previous.removeEventListener("click", back);
      next.removeEventListener("click", forward);
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("keydown", keyboard);
      viewport.removeEventListener("pointerdown", down);
      viewport.removeEventListener("pointermove", move);
      viewport.removeEventListener("pointerup", up);
      viewport.removeEventListener("pointercancel", cancel);
      viewport.removeEventListener("click", click);
      document.removeEventListener("pointerup", outsideUp);
      document.removeEventListener("pointercancel", outsideUp);
      cancel();
    },
  };
}
