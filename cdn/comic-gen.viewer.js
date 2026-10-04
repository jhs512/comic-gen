/*! Comic Gen browser SDK v0.8.1
*/
function Z(e, r = 0) {
  return [...e.querySelectorAll("g[data-panel]")].map((c, d) => {
    if (c.getAttribute("data-panel") !== String(d + r))
      throw new TypeError("만화의 컷 순서가 올바르지 않습니다.");
    const g = c.querySelector("rect");
    if (!g) throw new TypeError("만화에 컷 프레임이 없습니다.");
    let w = new DOMMatrix();
    for (let y = g; y && y !== e.documentElement; y = y.parentElement) {
      let l = new DOMMatrix();
      const T = y.getAttribute("transform") ?? "", P = /(matrix|translate|scale|rotate|skewX|skewY)\(([^)]*)\)/g;
      let N = T;
      for (const z of T.matchAll(P)) {
        const E = z[2].trim().split(/[\s,]+/).map(Number);
        if (!E.length || E.some((O) => !Number.isFinite(O)))
          throw new TypeError("만화의 컷 변환이 올바르지 않습니다.");
        const [v, A = 0, L = 0] = E;
        switch (z[1]) {
          case "matrix":
            if (E.length !== 6)
              throw new TypeError("올바른 컷 행렬이 필요합니다.");
            l = l.multiply(new DOMMatrix(E));
            break;
          case "translate":
            l = l.translate(v, A);
            break;
          case "scale":
            l = l.scale(v, E[1] ?? v);
            break;
          case "rotate":
            l = l.translate(A, L).rotate(v).translate(-A, -L);
            break;
          case "skewX":
            l = l.skewX(v);
            break;
          case "skewY":
            l = l.skewY(v);
            break;
        }
        N = N.replace(z[0], "");
      }
      if (N.trim()) throw new TypeError("지원하지 않는 컷 변환입니다.");
      w = l.multiply(w);
    }
    const a = Number(g.getAttribute("x") ?? 0), n = Number(g.getAttribute("y") ?? 0), s = Number(g.getAttribute("width")), m = Number(g.getAttribute("height"));
    if (![a, n, s, m].every(Number.isFinite) || s <= 0 || m <= 0)
      throw new TypeError("만화의 컷 크기가 올바르지 않습니다.");
    const i = [
      [a, n],
      [a + s, n],
      [a, n + m],
      [a + s, n + m]
    ].map(([y, l]) => w.transformPoint(new DOMPoint(y, l))), p = Math.min(...i.map((y) => y.x)), M = Math.min(...i.map((y) => y.y));
    return {
      x: p,
      y: M,
      width: Math.max(...i.map((y) => y.x)) - p,
      height: Math.max(...i.map((y) => y.y)) - M
    };
  });
}
function ie(e, r, c, d, g, w, a, n) {
  let s = 0, m = !1, i = 0;
  const p = () => {
    const t = e.getBoundingClientRect(), f = getComputedStyle(e);
    return {
      x: t.x + e.clientLeft + (parseFloat(f.paddingLeft) || 0),
      y: t.y + e.clientTop + (parseFloat(f.paddingTop) || 0)
    };
  }, M = () => {
    const t = r.getBoundingClientRect(), f = t.width / d;
    return c.map((b) => ({
      x: t.x + b.x * f,
      y: t.y + b.y * f,
      width: b.width * f,
      height: b.height * f
    }));
  };
  let y = 0;
  const l = () => {
    g.disabled = s === 0, w.disabled = s === c.length - 1, (document.activeElement === g && g.disabled || document.activeElement === w && w.disabled) && e.focus();
    const t = `${s + 1} / ${c.length}컷`;
    a.textContent !== t && (a.textContent = t), y !== s && (y = s, n?.());
  }, T = () => {
    if (m) return;
    if (e.scrollLeft === 0 && e.scrollTop === 0) {
      s = 0, l();
      return;
    }
    const t = p(), f = e.clientWidth - (parseFloat(getComputedStyle(e).paddingLeft) || 0) - (parseFloat(getComputedStyle(e).paddingRight) || 0), b = e.clientHeight - (parseFloat(getComputedStyle(e).paddingTop) || 0) - (parseFloat(getComputedStyle(e).paddingBottom) || 0), x = M(), k = x[x.length - 1];
    if (e.scrollLeft + e.clientWidth >= e.scrollWidth - 1 && e.scrollTop + e.clientHeight >= e.scrollHeight - 1 && k.x < t.x + f && k.x + k.width > t.x && k.y < t.y + b && k.y + k.height > t.y) {
      s = c.length - 1, l();
      return;
    }
    let B = -1, K = 1 / 0;
    x.forEach((C, G) => {
      const X = Math.max(
        0,
        Math.min(C.x + C.width, t.x + f) - Math.max(C.x, t.x)
      ) * Math.max(
        0,
        Math.min(C.y + C.height, t.y + b) - Math.max(C.y, t.y)
      ), H = Math.hypot(
        Math.max(C.x - t.x, 0, t.x - C.x - C.width),
        Math.max(C.y - t.y, 0, t.y - C.y - C.height)
      );
      (X > B || X === B && H < K) && (B = X, K = H, s = G);
    }), l();
  }, P = () => {
    cancelAnimationFrame(i), m = !0;
    const t = e.scrollLeft, f = e.scrollTop;
    i = requestAnimationFrame(() => {
      i = requestAnimationFrame(() => {
        m = !1, (e.scrollLeft !== t || e.scrollTop !== f) && T();
      });
    });
  }, N = (t, f = s) => {
    if (s = Math.max(0, Math.min(c.length - 1, f + t)), s === f) {
      l();
      return;
    }
    const b = M()[s], x = p();
    e.scrollTo({
      left: e.scrollLeft + b.x - x.x,
      top: e.scrollTop + b.y - x.y,
      behavior: "instant"
    }), P(), l();
  }, z = () => N(-1), E = () => N(1), v = (t) => {
    t.target !== e || t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || (t.key === "ArrowLeft" || t.key === "ArrowRight") && (t.preventDefault(), N(t.key === "ArrowLeft" ? -1 : 1));
  }, A = /* @__PURE__ */ new Set();
  let L, O = !1;
  const $ = (t) => {
    if (A.add(t.pointerId), O = !1, A.size !== 1 || !t.isPrimary || t.button !== 0) {
      L = void 0;
      return;
    }
    L = {
      id: t.pointerId,
      x: t.clientX,
      y: t.clientY,
      moved: !1
    };
  }, q = (t) => {
    L?.id === t.pointerId && Math.hypot(t.clientX - L.x, t.clientY - L.y) > 8 && (L.moved = !0);
  }, D = (t) => {
    O = A.size === 1 && L?.id === t.pointerId && !L.moved, A.delete(t.pointerId), L = void 0;
  }, I = (t) => {
    t ? A.delete(t.pointerId) : A.clear(), L = void 0, O = !1;
  }, V = (t) => {
    const f = O;
    if (O = !1, !f || t.detail > 1 || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey || t.target !== r)
      return;
    const b = M(), x = b.findIndex(
      (k) => t.clientX >= k.x && t.clientX <= k.x + k.width && t.clientY >= k.y && t.clientY <= k.y + k.height
    );
    x >= 0 && (e.focus({ preventScroll: !0 }), N(
      t.clientX < b[x].x + b[x].width / 2 ? -1 : 1,
      x
    ));
  }, F = (t) => {
    e.contains(t.target) || I(t);
  };
  return r.draggable = !1, g.addEventListener("click", z), w.addEventListener("click", E), e.addEventListener("scroll", T), e.addEventListener("keydown", v), e.addEventListener("pointerdown", $), e.addEventListener("pointermove", q), e.addEventListener("pointerup", D), e.addEventListener("pointercancel", I), e.addEventListener("click", V), document.addEventListener("pointerup", F), document.addEventListener("pointercancel", F), l(), {
    get currentIndex() {
      return s;
    },
    goTo: (t) => N(t - s),
    capturePosition: () => {
      const t = p(), f = r.getBoundingClientRect(), b = f.width / d;
      return { x: (t.x - f.x) / b, y: (t.y - f.y) / b };
    },
    restorePosition: (t) => {
      const f = e.scrollLeft, b = e.scrollTop, x = r.getBoundingClientRect(), k = p(), B = x.width / d;
      e.scrollTo({
        left: e.scrollLeft + x.x + t.x * B - k.x,
        top: e.scrollTop + x.y + t.y * B - k.y,
        behavior: "instant"
      }), (e.scrollLeft !== f || e.scrollTop !== b) && P(), l();
    },
    reset: () => {
      cancelAnimationFrame(i), m = !1, s = 0, I(), l();
    },
    dispose: () => {
      cancelAnimationFrame(i), g.removeEventListener("click", z), w.removeEventListener("click", E), e.removeEventListener("scroll", T), e.removeEventListener("keydown", v), e.removeEventListener("pointerdown", $), e.removeEventListener("pointermove", q), e.removeEventListener("pointerup", D), e.removeEventListener("pointercancel", I), e.removeEventListener("click", V), document.removeEventListener("pointerup", F), document.removeEventListener("pointercancel", F), I();
    }
  };
}
const ne = `
.comic-card[data-comic-gen-card] { box-sizing:border-box; display:flex; align-items:center; gap:18px; width:100%; max-width:540px; padding:16px; border:1px solid #dbe3ee; border-radius:16px; background:white; color:#233044; text-align:left; font:14px/1.6 system-ui,sans-serif; cursor:pointer; }
.comic-card[data-comic-gen-card]:hover { background:#f8faff; border-color:#4c64e8; }
.comic-card[data-comic-gen-card]:focus-visible, .comic-viewer[data-comic-gen-viewer] :is(button,input,select,.comic-viewer-viewport):focus-visible { outline:3px solid #8096ff; outline-offset:3px; }
[data-comic-gen-card] .comic-card-thumbnail { display:block; flex:0 0 112px; width:112px; height:96px; overflow:hidden; border-radius:10px; background:#f5f7fb; }
[data-comic-gen-card] .comic-card-thumbnail img { display:block; width:100%; max-width:none; height:auto; margin:0; }
[data-comic-gen-card] .comic-card-copy { display:grid; gap:6px; min-width:0; overflow-wrap:anywhere; }
[data-comic-gen-card] .comic-card-copy strong { font-size:17px; }
[data-comic-gen-card] .comic-card-copy span { color:#526fea; font-size:13px; }
.comic-viewer[data-comic-gen-viewer] { box-sizing:border-box; margin:auto; width:calc(100vw - 48px); max-width:1800px; height:calc(100dvh - 48px); max-height:none; padding:0; border:1px solid #dbe3ee; border-radius:16px; background:#f5f7fb; color:#233044; font:14px/1.6 system-ui,sans-serif; overflow:hidden; }
.comic-viewer[data-comic-gen-viewer][open] { display:flex; flex-direction:column; }
.comic-viewer[data-comic-gen-viewer]::backdrop { background:#162339b3; }
[data-comic-gen-viewer] .comic-viewer-toolbar { flex:none; display:flex; align-items:center; flex-wrap:wrap; gap:12px; padding:16px 20px; background:white; border-bottom:1px solid #dbe3ee; }
[data-comic-gen-viewer] .comic-viewer-title { margin:0 auto 0 0; min-width:0; font-size:18px; color:inherit; letter-spacing:0; overflow-wrap:anywhere; }
[data-comic-gen-viewer] .comic-viewer-controls { display:flex; align-items:center; flex-wrap:wrap; gap:12px; max-width:100%; }
[data-comic-gen-viewer] .comic-viewer-navigation { display:flex; align-items:center; gap:12px; }
[data-comic-gen-viewer] .comic-viewer-controls label { display:flex; align-items:center; gap:8px; margin:0; color:inherit; font-size:13px; white-space:nowrap; }
[data-comic-gen-viewer] .comic-viewer-checkbox input { flex:none; width:16px; height:16px; margin:0; padding:0; accent-color:#526fea; cursor:pointer; }
[data-comic-gen-viewer] :is(button,select) { border:1px solid #dbe3ee; border-radius:8px; background:white; color:#344055; padding:8px 12px; font:inherit; cursor:pointer; }
[data-comic-gen-viewer] button:disabled { opacity:.4; cursor:default; }
[data-comic-gen-viewer] .comic-position { min-width:5rem; text-align:center; font-variant-numeric:tabular-nums; }
[data-comic-gen-viewer] .comic-viewer-help { flex:none; margin:0; padding:8px 20px; font-size:12px; color:#69778b; }
[data-comic-gen-viewer] .comic-viewer-viewport { box-sizing:border-box; flex:1; min-width:0; min-height:0; overflow:auto; overscroll-behavior:contain; padding:16px; }
[data-comic-gen-viewer] .comic-viewer-viewport[data-prevent-overflow="true"] { overflow-x:hidden; overflow-y:auto; }
[data-comic-gen-viewer] .comic-viewer-artwork { margin:0 auto; }
[data-comic-gen-viewer] .comic-viewer-artwork img { display:block; width:100%; max-width:none; height:auto; margin:0; user-select:none; }
@media (max-width:600px) {
  .comic-viewer[data-comic-gen-viewer] { width:100vw; max-width:none; height:100dvh; margin:0; border:0; border-radius:0; }
  [data-comic-gen-viewer] .comic-viewer-toolbar { padding:12px; gap:10px; }
  [data-comic-gen-viewer] .comic-viewer-title { flex-basis:calc(100% - 80px); font-size:16px; }
  [data-comic-gen-viewer] .comic-viewer-controls { width:100%; }
  [data-comic-gen-viewer] .comic-viewer-navigation { flex-basis:100%; justify-content:center; }
  [data-comic-gen-viewer] .comic-viewer-help { padding:8px 12px; }
  [data-comic-gen-viewer] .comic-viewer-viewport { padding:8px; }
  .comic-card[data-comic-gen-card] { gap:12px; padding:12px; }
  [data-comic-gen-card] .comic-card-thumbnail { flex-basis:88px; width:88px; height:80px; }
}
`, _ = "http://www.w3.org/2000/svg", J = /^#[\p{L}_][\p{L}\p{N}_:.-]*$/u, re = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "filter",
  "mask",
  "clip-path",
  "marker-start",
  "marker-mid",
  "marker-end",
  "cursor"
]), ce = /* @__PURE__ */ new Set([
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
  "feTile"
]);
function Q(e) {
  if (!e || typeof e.svg != "string" || !e.svg || e.svg.length > 64e6 || !Number.isFinite(e.width) || e.width <= 0 || e.width > 1e6 || !Number.isFinite(e.height) || e.height <= 0 || e.height > 1e6 || e.diagnostics !== void 0 && (!Array.isArray(e.diagnostics) || e.diagnostics.length))
    throw new TypeError("완성된 코믹젠 렌더 결과가 필요합니다.");
  if (/<!DOCTYPE|<!ENTITY|<\?/i.test(e.svg))
    throw new TypeError("정적 코믹젠 SVG만 뷰어에 전달하세요.");
  const r = new DOMParser().parseFromString(e.svg, "image/svg+xml"), c = r.documentElement, d = (c.getAttribute("viewBox") ?? `0 0 ${e.width} ${e.height}`).trim().split(/[\s,]+/).map(Number);
  if (c.localName !== "svg" || c.namespaceURI !== _ || r.querySelector("parsererror") || d.length !== 4 || d[0] !== 0 || d[1] !== 0 || d[2] !== e.width || d[3] !== e.height || Number(c.getAttribute("width")) !== e.width || Number(c.getAttribute("height")) !== e.height)
    throw new TypeError("만화 SVG와 렌더 결과의 크기가 일치해야 합니다.");
  for (const g of [c, ...c.querySelectorAll("*")]) {
    if (g.namespaceURI !== _ || !ce.has(g.localName))
      throw new TypeError("외부 리소스나 실행 가능한 SVG는 지원하지 않습니다.");
    for (const w of g.attributes) {
      const a = w.localName.toLowerCase(), n = w.value;
      if (a.startsWith("on") || a === "base" && w.namespaceURI === "http://www.w3.org/XML/1998/namespace" || a === "href" && !J.test(n))
        throw new TypeError(
          "외부 링크나 이벤트가 포함된 SVG는 지원하지 않습니다."
        );
      if (a === "style" && /@|javascript\s*:|vbscript\s*:|expression\s*\(|[\\<>]/i.test(n))
        throw new TypeError("정적 코믹젠 SVG 스타일만 지원합니다.");
      if (re.has(a) && /[\\<>@]/.test(n))
        throw new TypeError("정적 코믹젠 SVG 색상과 참조만 지원합니다.");
      for (const s of n.matchAll(/url\s*\(([^)]*)\)/gi)) {
        const m = s[1].trim().replace(/^(['"])(.*)\1$/, "$2");
        if (!J.test(m))
          throw new TypeError("SVG의 외부 리소스는 지원하지 않습니다.");
      }
    }
  }
  return r;
}
function ee(e) {
  const r = Q(e);
  if (!Array.isArray(e.panels) || e.panels.length < 1 || e.panels.length > 30)
    throw new TypeError("만화에는 실제 렌더된 1~30개의 컷이 필요합니다.");
  const c = [], d = e.panels.map((n, s) => {
    if (n.index !== s)
      throw new TypeError("만화의 개별 컷 순서가 일치해야 합니다.");
    const m = Z(Q(n), s);
    if (m.length !== 1 || ![m[0].x, m[0].y, m[0].width, m[0].height].every(
      Number.isFinite
    ) || m[0].width <= 0 || m[0].height <= 0 || m[0].x < 0 || m[0].y < 0 || m[0].x + m[0].width > n.width + 1 || m[0].y + m[0].height > n.height + 1)
      throw new TypeError("개별 컷 SVG에는 한 개의 컷 프레임이 필요합니다.");
    return c.push(m[0]), { ...n };
  }), g = Z(r);
  if (g.length !== d.length || g.some(
    (n) => ![n.x, n.y, n.width, n.height].every(Number.isFinite) || n.width <= 0 || n.height <= 0 || n.x < 0 || n.y < 0 || n.x + n.width > e.width + 1 || n.y + n.height > e.height + 1
  ))
    throw new TypeError("만화의 컷 프레임과 렌더 결과가 일치해야 합니다.");
  const w = r.documentElement.getAttribute("aria-label") ?? r.documentElement.querySelector("title")?.textContent ?? "만화", a = d.map((n, s) => {
    const m = g[s], i = c[s], p = Math.max(
      m.width / i.width,
      m.height / i.height
    );
    return { width: n.width * p, height: n.height * p };
  });
  return {
    result: { ...e, panels: d },
    title: w,
    bounds: g,
    panelWidth: Math.max(...a.map((n) => n.width)),
    panelHeight: Math.max(...a.map((n) => n.height))
  };
}
const U = /* @__PURE__ */ Symbol.for("comic-gen.viewer.document-state.v1");
function j() {
  const e = document;
  return e[U] || Object.defineProperty(e, U, {
    value: { bodyLocks: /* @__PURE__ */ new WeakMap(), nextId: 0 }
  }), e[U];
}
function te() {
  const e = j();
  let r = e.styles;
  if (r)
    r.element.isConnected || document.head.append(r.element);
  else {
    const d = document.createElement("style");
    d.dataset.comicGenViewerStyles = "", d.textContent = ne, document.head.append(d), r = { element: d, count: 0 }, e.styles = r;
  }
  r.count++;
  let c = !1;
  return () => {
    c || (c = !0, --r.count === 0 && (r.element.remove(), e.styles = void 0));
  };
}
function ae() {
  const e = j().bodyLocks, r = document.body;
  let c = e.get(r);
  c || (c = {
    count: 0,
    value: r.style.getPropertyValue("overflow"),
    priority: r.style.getPropertyPriority("overflow")
  }, e.set(r, c), r.style.setProperty("overflow", "hidden", "important")), c.count++;
  let d = !1;
  return () => {
    d || (d = !0, --c.count === 0 && (c.value ? r.style.setProperty("overflow", c.value, c.priority) : r.style.removeProperty("overflow"), e.delete(r)));
  };
}
function oe(e, r, c, d) {
  const g = document.createElement("img"), w = URL.createObjectURL(new Blob([e], { type: "image/svg+xml" }));
  Object.assign(g, {
    src: w,
    width: r,
    height: c,
    alt: d,
    decoding: "async",
    draggable: !1
  });
  let a = !1;
  return {
    image: g,
    revoke: () => {
      a || (a = !0, URL.revokeObjectURL(w));
    }
  };
}
function se(e = {}) {
  e = { ...e };
  let r = {}, c;
  const d = (o, h) => {
    if (o.zoom !== void 0 && (!Number.isFinite(o.zoom) || o.zoom <= 0 || o.zoom > 10))
      throw new RangeError("zoom must be greater than 0 and at most 10.");
    if (o.panelIndex !== void 0 && (!Number.isInteger(o.panelIndex) || o.panelIndex < 0 || h !== void 0 && o.panelIndex >= h))
      throw new RangeError("panelIndex must identify an existing panel.");
    if (o.preventOverflow !== void 0 && typeof o.preventOverflow != "boolean")
      throw new TypeError("preventOverflow must be a boolean.");
  }, g = (o, h) => {
    d(o, h);
    for (const u of [
      "closeOnBackdrop",
      "closeOnEmptyArea",
      "closeOnEscape",
      "showCloseButton"
    ])
      if (o[u] !== void 0 && typeof o[u] != "boolean")
        throw new TypeError(`${u} must be a boolean.`);
    if (o.onChange !== void 0 && typeof o.onChange != "function")
      throw new TypeError("onChange must be a function.");
  };
  g(e);
  const w = () => i?.open && E ? Object.freeze({
    zoom: Number(l.value),
    preventOverflow: T.checked,
    panelIndex: v?.currentIndex ?? 0
  }) : null;
  let a, n = !1;
  const s = () => {
    if (n) return;
    const o = w(), h = JSON.stringify(o);
    h !== a && (a = h, r.onChange?.(o));
  }, m = (o) => {
    const h = String(o);
    if (![...l.options].some((u) => u.value === h)) {
      const u = document.createElement("option");
      u.value = h, u.textContent = `${Math.round(o * 100)}%`, u.dataset.customZoom = "", l.append(u);
    }
    l.value = h;
  };
  let i, p, M, y, l, T, P, N, z, E, v, A, L, O, $, q, D = !1;
  const I = () => {
    if (!i?.open || !E) return;
    const o = v?.capturePosition();
    p.dataset.preventOverflow = String(T.checked);
    const h = E.result;
    let u = h.width * Number(l.value);
    if (T.checked) {
      const S = getComputedStyle(p), Y = Math.max(
        0,
        p.clientWidth - (parseFloat(S.paddingLeft) || 0) - (parseFloat(S.paddingRight) || 0)
      ), R = Math.max(
        0,
        p.clientHeight - (parseFloat(S.paddingTop) || 0) - (parseFloat(S.paddingBottom) || 0)
      );
      u = Math.min(
        u,
        Y * h.width / E.panelWidth,
        R * h.width / E.panelHeight
      );
    }
    M.style.width = `${Math.max(0, u)}px`, o && Number.isFinite(o.x) && Number.isFinite(o.y) && v?.restorePosition(o);
  }, V = () => {
    v?.dispose(), v = void 0, L?.(), L = void 0, M?.replaceChildren(), E = void 0, O?.(), O = void 0;
    const o = a !== void 0 && a !== "null", h = q;
    q = void 0;
    const u = [
      ...document.querySelectorAll("dialog[open]")
    ].find((S) => S !== i);
    h?.isConnected && (!u || u.contains(h)) && h.focus({ preventScroll: !0 }), o && s();
  }, F = () => {
    i?.open && i.close(), V();
  }, t = (o) => {
    o.preventDefault(), r.closeOnEscape !== !1 && F();
  }, f = () => {
    i?.open || V();
  };
  let b = !1, x;
  const k = (o) => {
    if (o.target !== i) return !1;
    const h = i.getBoundingClientRect();
    return o.clientX < h.left || o.clientX > h.right || o.clientY < h.top || o.clientY > h.bottom;
  }, B = (o) => {
    if (o.target !== p) return !1;
    const h = p.getBoundingClientRect();
    return o.clientX >= h.left + p.clientLeft && o.clientX < h.left + p.clientLeft + p.clientWidth && o.clientY >= h.top + p.clientTop && o.clientY < h.top + p.clientTop + p.clientHeight;
  }, K = (o) => {
    x = o.button === 0 && o.isPrimary && B(o) ? { x: o.clientX, y: o.clientY } : void 0, b = o.button === 0 && k(o);
  }, C = (o) => {
    const h = b && k(o) && r.closeOnBackdrop === !0 || !!(x && B(o) && r.closeOnEmptyArea === !0 && Math.hypot(o.clientX - x.x, o.clientY - x.y) <= 8);
    x = void 0, b = !1, h && F();
  }, G = () => {
    I(), s();
  }, X = (o) => {
    if (o.key !== "Tab" || !i?.open) return;
    const u = [
      ...i.querySelectorAll(
        "button:not(:disabled), input, select, [tabindex='0']"
      )
    ].filter((R) => !R.hidden), S = u[0], Y = u[u.length - 1];
    (!o.shiftKey && document.activeElement === Y || o.shiftKey && document.activeElement === S) && (o.preventDefault(), (o.shiftKey ? Y : S).focus());
  }, H = () => {
    if (i) return;
    $ = te();
    const o = `comic-gen-viewer-${++j().nextId}`;
    i = document.createElement("dialog"), i.className = "comic-viewer", i.dataset.comicGenViewer = "", i.setAttribute("aria-labelledby", `${o}-title`), i.setAttribute("aria-describedby", `${o}-help`), i.innerHTML = `<div class="comic-viewer-toolbar"><h2 class="comic-viewer-title" id="${o}-title"></h2><button type="button" autofocus>닫기</button><div class="comic-viewer-controls"><label class="comic-viewer-checkbox"><input type="checkbox" checked>화면 넘침 방지</label><label>보기 크기 <select><option value="1">100%</option><option value="1.5">150%</option><option value="2">200%</option></select></label><div class="comic-viewer-navigation"><button type="button" class="comic-previous" aria-label="이전 컷">←</button><span class="comic-position" role="status" aria-live="polite"></span><button type="button" class="comic-next" aria-label="다음 컷">→</button></div></div></div><p class="comic-viewer-help" id="${o}-help">화면 넘침 방지는 한 컷의 너비·높이를 화면에 맞춥니다. 다음 컷은 아래로 스크롤해 읽습니다. 컷 왼쪽은 이전, 오른쪽은 다음 컷입니다. 읽기 영역에서 ←/→ 키로도 이동합니다.</p><div class="comic-viewer-viewport" tabindex="0" role="region" aria-label="만화 읽기 영역"><div class="comic-viewer-artwork"></div></div>`, y = i.querySelector("h2"), p = i.querySelector(".comic-viewer-viewport"), M = i.querySelector(".comic-viewer-artwork"), l = i.querySelector("select"), T = i.querySelector('input[type="checkbox"]'), P = i.querySelector(".comic-previous"), N = i.querySelector(".comic-next"), z = i.querySelector(".comic-position"), c = i.querySelector("button"), l.addEventListener("change", G), T.addEventListener("change", G), i.querySelector("button").addEventListener("click", F), i.addEventListener("pointerdown", K), i.addEventListener("click", C), i.addEventListener("cancel", t), i.addEventListener("close", f), i.addEventListener("keydown", X), document.body.append(i), A = new ResizeObserver(I), A.observe(p);
  };
  return {
    get isOpen() {
      return !!i?.open;
    },
    get state() {
      return w();
    },
    setView: (o) => {
      if (!i?.open || !E)
        throw new Error("Open the viewer before setting its view.");
      d(o, E.result.panels.length), n = !0, o.zoom !== void 0 && m(o.zoom), o.preventOverflow !== void 0 && (T.checked = o.preventOverflow), I(), o.panelIndex !== void 0 && v?.goTo(o.panelIndex), n = !1, s();
    },
    open: (o, h = {}) => {
      if (D) throw new Error("폐기한 만화 뷰어는 다시 열 수 없습니다.");
      const u = ee(o), S = { ...e, ...h };
      g(S, u.result.panels.length);
      const Y = S.trigger ?? (i?.open ? q : document.activeElement instanceof HTMLElement ? document.activeElement : void 0);
      H(), v?.dispose(), L?.(), n = !0, r = S, a = void 0, b = !1, x = void 0, E = u, q = Y, y.textContent = u.title, l.querySelectorAll("[data-custom-zoom]").forEach((W) => W.remove()), m(S.zoom ?? 1), T.checked = S.preventOverflow ?? !0, c.hidden = S.showCloseButton === !1;
      const R = oe(
        u.result.svg,
        u.result.width,
        u.result.height,
        u.title
      );
      if (L = R.revoke, M.replaceChildren(R.image), v = ie(
        p,
        R.image,
        u.bounds,
        u.result.width,
        P,
        N,
        z,
        s
      ), !i.open) {
        O = ae();
        try {
          i.showModal();
        } catch (W) {
          throw n = !1, V(), W;
        }
      }
      I(), p.scrollTo(0, 0), v.reset(), v.goTo(S.panelIndex ?? 0), (c.hidden ? p : c).focus({
        preventScroll: !0
      }), n = !1, s();
    },
    close: F,
    destroy: () => {
      D || (D = !0, F(), A?.disconnect(), i && (l.removeEventListener("change", G), T.removeEventListener("change", G), i.querySelector("button").removeEventListener("click", F), i.removeEventListener("pointerdown", K), i.removeEventListener("click", C), i.removeEventListener("cancel", t), i.removeEventListener("close", f), i.removeEventListener("keydown", X), i.remove()), $?.(), $ = void 0);
    }
  };
}
function le(e, r, c = {}) {
  const d = ee(r), g = te(), w = se(c), a = document.createElement("button");
  a.type = "button", a.className = "comic-card", a.dataset.comicGenCard = "", a.setAttribute("aria-haspopup", "dialog"), a.setAttribute("aria-label", `${d.title} · 만화 읽기`);
  const n = document.createElement("span");
  n.className = "comic-card-thumbnail", n.setAttribute("aria-hidden", "true");
  const s = d.result.panels[0], m = oe(
    s.svg,
    s.width,
    s.height,
    `${d.title} · 1/${d.result.panels.length}`
  );
  n.append(m.image);
  const i = document.createElement("span");
  i.className = "comic-card-copy";
  const p = document.createElement("strong");
  p.textContent = d.title;
  const M = document.createElement("span");
  M.textContent = `${d.result.panels.length}컷 · 만화 읽기 ↗`, i.append(p, M), a.append(n, i);
  const y = () => w.open(d.result, { trigger: a });
  a.addEventListener("click", y), e.replaceChildren(a);
  let l = !1;
  return () => {
    l || (l = !0, a.removeEventListener("click", y), w.destroy(), m.revoke(), a.remove(), g());
  };
}
export {
  se as createComicViewer,
  le as mountComicCard,
  se as 만화뷰어만들기,
  le as 만화카드붙이기
};
