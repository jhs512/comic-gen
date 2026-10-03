/*! Comic Gen browser SDK v0.7.2
*/
function W(e, r = 0) {
  return [...e.querySelectorAll("g[data-panel]")].map((c, l) => {
    if (c.getAttribute("data-panel") !== String(l + r))
      throw new TypeError("만화의 컷 순서가 올바르지 않습니다.");
    const g = c.querySelector("rect");
    if (!g) throw new TypeError("만화에 컷 프레임이 없습니다.");
    let w = new DOMMatrix();
    for (let y = g; y && y !== e.documentElement; y = y.parentElement) {
      let d = new DOMMatrix();
      const T = y.getAttribute("transform") ?? "", B = /(matrix|translate|scale|rotate|skewX|skewY)\(([^)]*)\)/g;
      let N = T;
      for (const z of T.matchAll(B)) {
        const E = z[2].trim().split(/[\s,]+/).map(Number);
        if (!E.length || E.some((O) => !Number.isFinite(O)))
          throw new TypeError("만화의 컷 변환이 올바르지 않습니다.");
        const [v, A = 0, k = 0] = E;
        switch (z[1]) {
          case "matrix":
            if (E.length !== 6)
              throw new TypeError("올바른 컷 행렬이 필요합니다.");
            d = d.multiply(new DOMMatrix(E));
            break;
          case "translate":
            d = d.translate(v, A);
            break;
          case "scale":
            d = d.scale(v, E[1] ?? v);
            break;
          case "rotate":
            d = d.translate(A, k).rotate(v).translate(-A, -k);
            break;
          case "skewX":
            d = d.skewX(v);
            break;
          case "skewY":
            d = d.skewY(v);
            break;
        }
        N = N.replace(z[0], "");
      }
      if (N.trim()) throw new TypeError("지원하지 않는 컷 변환입니다.");
      w = d.multiply(w);
    }
    const a = Number(g.getAttribute("x") ?? 0), n = Number(g.getAttribute("y") ?? 0), s = Number(g.getAttribute("width")), m = Number(g.getAttribute("height"));
    if (![a, n, s, m].every(Number.isFinite) || s <= 0 || m <= 0)
      throw new TypeError("만화의 컷 크기가 올바르지 않습니다.");
    const i = [
      [a, n],
      [a + s, n],
      [a, n + m],
      [a + s, n + m]
    ].map(([y, d]) => w.transformPoint(new DOMPoint(y, d))), h = Math.min(...i.map((y) => y.x)), M = Math.min(...i.map((y) => y.y));
    return {
      x: h,
      y: M,
      width: Math.max(...i.map((y) => y.x)) - h,
      height: Math.max(...i.map((y) => y.y)) - M
    };
  });
}
function ie(e, r, c, l, g, w, a, n) {
  let s = 0, m = !1, i = 0;
  const h = () => {
    const o = e.getBoundingClientRect(), f = getComputedStyle(e);
    return {
      x: o.x + e.clientLeft + (parseFloat(f.paddingLeft) || 0),
      y: o.y + e.clientTop + (parseFloat(f.paddingTop) || 0)
    };
  }, M = () => {
    const o = r.getBoundingClientRect(), f = o.width / l;
    return c.map((b) => ({
      x: o.x + b.x * f,
      y: o.y + b.y * f,
      width: b.width * f,
      height: b.height * f
    }));
  };
  let y = 0;
  const d = () => {
    g.disabled = s === 0, w.disabled = s === c.length - 1, (document.activeElement === g && g.disabled || document.activeElement === w && w.disabled) && e.focus();
    const o = `${s + 1} / ${c.length}컷`;
    a.textContent !== o && (a.textContent = o), y !== s && (y = s, n?.());
  }, T = () => {
    if (m) return;
    if (e.scrollLeft === 0 && e.scrollTop === 0) {
      s = 0, d();
      return;
    }
    const o = h(), f = e.clientWidth - (parseFloat(getComputedStyle(e).paddingLeft) || 0) - (parseFloat(getComputedStyle(e).paddingRight) || 0), b = e.clientHeight - (parseFloat(getComputedStyle(e).paddingTop) || 0) - (parseFloat(getComputedStyle(e).paddingBottom) || 0);
    let x = -1, C = 1 / 0;
    M().forEach((L, Y) => {
      const G = Math.max(
        0,
        Math.min(L.x + L.width, o.x + f) - Math.max(L.x, o.x)
      ) * Math.max(
        0,
        Math.min(L.y + L.height, o.y + b) - Math.max(L.y, o.y)
      ), q = Math.hypot(
        Math.max(L.x - o.x, 0, o.x - L.x - L.width),
        Math.max(L.y - o.y, 0, o.y - L.y - L.height)
      );
      (G > x || G === x && q < C) && (x = G, C = q, s = Y);
    }), d();
  }, B = () => {
    cancelAnimationFrame(i), m = !0;
    const o = e.scrollLeft, f = e.scrollTop;
    i = requestAnimationFrame(() => {
      i = requestAnimationFrame(() => {
        m = !1, (e.scrollLeft !== o || e.scrollTop !== f) && T();
      });
    });
  }, N = (o, f = s) => {
    if (s = Math.max(0, Math.min(c.length - 1, f + o)), s === f) {
      d();
      return;
    }
    const b = M()[s], x = h();
    e.scrollTo({
      left: e.scrollLeft + b.x - x.x,
      top: e.scrollTop + b.y - x.y,
      behavior: "instant"
    }), B(), d();
  }, z = () => N(-1), E = () => N(1), v = (o) => {
    o.target !== e || o.altKey || o.ctrlKey || o.metaKey || o.shiftKey || (o.key === "ArrowLeft" || o.key === "ArrowRight") && (o.preventDefault(), N(o.key === "ArrowLeft" ? -1 : 1));
  }, A = /* @__PURE__ */ new Set();
  let k, O = !1;
  const $ = (o) => {
    if (A.add(o.pointerId), O = !1, A.size !== 1 || !o.isPrimary || o.button !== 0) {
      k = void 0;
      return;
    }
    k = {
      id: o.pointerId,
      x: o.clientX,
      y: o.clientY,
      moved: !1
    };
  }, P = (o) => {
    k?.id === o.pointerId && Math.hypot(o.clientX - k.x, o.clientY - k.y) > 8 && (k.moved = !0);
  }, D = (o) => {
    O = A.size === 1 && k?.id === o.pointerId && !k.moved, A.delete(o.pointerId), k = void 0;
  }, I = (o) => {
    o ? A.delete(o.pointerId) : A.clear(), k = void 0, O = !1;
  }, V = (o) => {
    const f = O;
    if (O = !1, !f || o.detail > 1 || o.ctrlKey || o.metaKey || o.altKey || o.shiftKey || o.target !== r)
      return;
    const b = M(), x = b.findIndex(
      (C) => o.clientX >= C.x && o.clientX <= C.x + C.width && o.clientY >= C.y && o.clientY <= C.y + C.height
    );
    x >= 0 && (e.focus({ preventScroll: !0 }), N(
      o.clientX < b[x].x + b[x].width / 2 ? -1 : 1,
      x
    ));
  }, F = (o) => {
    e.contains(o.target) || I(o);
  };
  return r.draggable = !1, g.addEventListener("click", z), w.addEventListener("click", E), e.addEventListener("scroll", T), e.addEventListener("keydown", v), e.addEventListener("pointerdown", $), e.addEventListener("pointermove", P), e.addEventListener("pointerup", D), e.addEventListener("pointercancel", I), e.addEventListener("click", V), document.addEventListener("pointerup", F), document.addEventListener("pointercancel", F), d(), {
    get currentIndex() {
      return s;
    },
    goTo: (o) => N(o - s),
    capturePosition: () => {
      const o = h(), f = r.getBoundingClientRect(), b = f.width / l;
      return { x: (o.x - f.x) / b, y: (o.y - f.y) / b };
    },
    restorePosition: (o) => {
      const f = e.scrollLeft, b = e.scrollTop, x = r.getBoundingClientRect(), C = h(), L = x.width / l;
      e.scrollTo({
        left: e.scrollLeft + x.x + o.x * L - C.x,
        top: e.scrollTop + x.y + o.y * L - C.y,
        behavior: "instant"
      }), (e.scrollLeft !== f || e.scrollTop !== b) && B(), d();
    },
    reset: () => {
      cancelAnimationFrame(i), m = !1, s = 0, I(), d();
    },
    dispose: () => {
      cancelAnimationFrame(i), g.removeEventListener("click", z), w.removeEventListener("click", E), e.removeEventListener("scroll", T), e.removeEventListener("keydown", v), e.removeEventListener("pointerdown", $), e.removeEventListener("pointermove", P), e.removeEventListener("pointerup", D), e.removeEventListener("pointercancel", I), e.removeEventListener("click", V), document.removeEventListener("pointerup", F), document.removeEventListener("pointercancel", F), I();
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
`, Z = "http://www.w3.org/2000/svg", _ = /^#[\p{L}_][\p{L}\p{N}_:.-]*$/u, re = /* @__PURE__ */ new Set([
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
function J(e) {
  if (!e || typeof e.svg != "string" || !e.svg || e.svg.length > 64e6 || !Number.isFinite(e.width) || e.width <= 0 || e.width > 1e6 || !Number.isFinite(e.height) || e.height <= 0 || e.height > 1e6 || e.diagnostics !== void 0 && (!Array.isArray(e.diagnostics) || e.diagnostics.length))
    throw new TypeError("완성된 코믹젠 렌더 결과가 필요합니다.");
  if (/<!DOCTYPE|<!ENTITY|<\?/i.test(e.svg))
    throw new TypeError("정적 코믹젠 SVG만 뷰어에 전달하세요.");
  const r = new DOMParser().parseFromString(e.svg, "image/svg+xml"), c = r.documentElement, l = (c.getAttribute("viewBox") ?? `0 0 ${e.width} ${e.height}`).trim().split(/[\s,]+/).map(Number);
  if (c.localName !== "svg" || c.namespaceURI !== Z || r.querySelector("parsererror") || l.length !== 4 || l[0] !== 0 || l[1] !== 0 || l[2] !== e.width || l[3] !== e.height || Number(c.getAttribute("width")) !== e.width || Number(c.getAttribute("height")) !== e.height)
    throw new TypeError("만화 SVG와 렌더 결과의 크기가 일치해야 합니다.");
  for (const g of [c, ...c.querySelectorAll("*")]) {
    if (g.namespaceURI !== Z || !ce.has(g.localName))
      throw new TypeError("외부 리소스나 실행 가능한 SVG는 지원하지 않습니다.");
    for (const w of g.attributes) {
      const a = w.localName.toLowerCase(), n = w.value;
      if (a.startsWith("on") || a === "base" && w.namespaceURI === "http://www.w3.org/XML/1998/namespace" || a === "href" && !_.test(n))
        throw new TypeError(
          "외부 링크나 이벤트가 포함된 SVG는 지원하지 않습니다."
        );
      if (a === "style" && /@|javascript\s*:|vbscript\s*:|expression\s*\(|[\\<>]/i.test(n))
        throw new TypeError("정적 코믹젠 SVG 스타일만 지원합니다.");
      if (re.has(a) && /[\\<>@]/.test(n))
        throw new TypeError("정적 코믹젠 SVG 색상과 참조만 지원합니다.");
      for (const s of n.matchAll(/url\s*\(([^)]*)\)/gi)) {
        const m = s[1].trim().replace(/^(['"])(.*)\1$/, "$2");
        if (!_.test(m))
          throw new TypeError("SVG의 외부 리소스는 지원하지 않습니다.");
      }
    }
  }
  return r;
}
function Q(e) {
  const r = J(e);
  if (!Array.isArray(e.panels) || e.panels.length < 1 || e.panels.length > 30)
    throw new TypeError("만화에는 실제 렌더된 1~30개의 컷이 필요합니다.");
  const c = [], l = e.panels.map((n, s) => {
    if (n.index !== s)
      throw new TypeError("만화의 개별 컷 순서가 일치해야 합니다.");
    const m = W(J(n), s);
    if (m.length !== 1 || ![m[0].x, m[0].y, m[0].width, m[0].height].every(
      Number.isFinite
    ) || m[0].width <= 0 || m[0].height <= 0 || m[0].x < 0 || m[0].y < 0 || m[0].x + m[0].width > n.width + 1 || m[0].y + m[0].height > n.height + 1)
      throw new TypeError("개별 컷 SVG에는 한 개의 컷 프레임이 필요합니다.");
    return c.push(m[0]), { ...n };
  }), g = W(r);
  if (g.length !== l.length || g.some(
    (n) => ![n.x, n.y, n.width, n.height].every(Number.isFinite) || n.width <= 0 || n.height <= 0 || n.x < 0 || n.y < 0 || n.x + n.width > e.width + 1 || n.y + n.height > e.height + 1
  ))
    throw new TypeError("만화의 컷 프레임과 렌더 결과가 일치해야 합니다.");
  const w = r.documentElement.getAttribute("aria-label") ?? r.documentElement.querySelector("title")?.textContent ?? "만화", a = l.map((n, s) => {
    const m = g[s], i = c[s], h = Math.max(
      m.width / i.width,
      m.height / i.height
    );
    return { width: n.width * h, height: n.height * h };
  });
  return {
    result: { ...e, panels: l },
    title: w,
    bounds: g,
    panelWidth: Math.max(...a.map((n) => n.width)),
    panelHeight: Math.max(...a.map((n) => n.height))
  };
}
const H = /* @__PURE__ */ Symbol.for("comic-gen.viewer.document-state.v1");
function U() {
  const e = document;
  return e[H] || Object.defineProperty(e, H, {
    value: { bodyLocks: /* @__PURE__ */ new WeakMap(), nextId: 0 }
  }), e[H];
}
function ee() {
  const e = U();
  let r = e.styles;
  if (r)
    r.element.isConnected || document.head.append(r.element);
  else {
    const l = document.createElement("style");
    l.dataset.comicGenViewerStyles = "", l.textContent = ne, document.head.append(l), r = { element: l, count: 0 }, e.styles = r;
  }
  r.count++;
  let c = !1;
  return () => {
    c || (c = !0, --r.count === 0 && (r.element.remove(), e.styles = void 0));
  };
}
function ae() {
  const e = U().bodyLocks, r = document.body;
  let c = e.get(r);
  c || (c = {
    count: 0,
    value: r.style.getPropertyValue("overflow"),
    priority: r.style.getPropertyPriority("overflow")
  }, e.set(r, c), r.style.setProperty("overflow", "hidden", "important")), c.count++;
  let l = !1;
  return () => {
    l || (l = !0, --c.count === 0 && (c.value ? r.style.setProperty("overflow", c.value, c.priority) : r.style.removeProperty("overflow"), e.delete(r)));
  };
}
function te(e, r, c, l) {
  const g = document.createElement("img"), w = URL.createObjectURL(new Blob([e], { type: "image/svg+xml" }));
  Object.assign(g, {
    src: w,
    width: r,
    height: c,
    alt: l,
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
  const l = (t, p) => {
    if (t.zoom !== void 0 && (!Number.isFinite(t.zoom) || t.zoom <= 0 || t.zoom > 10))
      throw new RangeError("zoom must be greater than 0 and at most 10.");
    if (t.panelIndex !== void 0 && (!Number.isInteger(t.panelIndex) || t.panelIndex < 0 || p !== void 0 && t.panelIndex >= p))
      throw new RangeError("panelIndex must identify an existing panel.");
    if (t.preventOverflow !== void 0 && typeof t.preventOverflow != "boolean")
      throw new TypeError("preventOverflow must be a boolean.");
  }, g = (t, p) => {
    l(t, p);
    for (const u of [
      "closeOnBackdrop",
      "closeOnEmptyArea",
      "closeOnEscape",
      "showCloseButton"
    ])
      if (t[u] !== void 0 && typeof t[u] != "boolean")
        throw new TypeError(`${u} must be a boolean.`);
    if (t.onChange !== void 0 && typeof t.onChange != "function")
      throw new TypeError("onChange must be a function.");
  };
  g(e);
  const w = () => i?.open && E ? Object.freeze({
    zoom: Number(d.value),
    preventOverflow: T.checked,
    panelIndex: v?.currentIndex ?? 0
  }) : null;
  let a, n = !1;
  const s = () => {
    if (n) return;
    const t = w(), p = JSON.stringify(t);
    p !== a && (a = p, r.onChange?.(t));
  }, m = (t) => {
    const p = String(t);
    if (![...d.options].some((u) => u.value === p)) {
      const u = document.createElement("option");
      u.value = p, u.textContent = `${Math.round(t * 100)}%`, u.dataset.customZoom = "", d.append(u);
    }
    d.value = p;
  };
  let i, h, M, y, d, T, B, N, z, E, v, A, k, O, $, P, D = !1;
  const I = () => {
    if (!i?.open || !E) return;
    const t = v?.capturePosition();
    h.dataset.preventOverflow = String(T.checked);
    const p = E.result;
    let u = p.width * Number(d.value);
    if (T.checked) {
      const S = getComputedStyle(h), X = Math.max(
        0,
        h.clientWidth - (parseFloat(S.paddingLeft) || 0) - (parseFloat(S.paddingRight) || 0)
      ), R = Math.max(
        0,
        h.clientHeight - (parseFloat(S.paddingTop) || 0) - (parseFloat(S.paddingBottom) || 0)
      );
      u = Math.min(
        u,
        X * p.width / E.panelWidth,
        R * p.width / E.panelHeight
      );
    }
    M.style.width = `${Math.max(0, u)}px`, t && Number.isFinite(t.x) && Number.isFinite(t.y) && v?.restorePosition(t);
  }, V = () => {
    v?.dispose(), v = void 0, k?.(), k = void 0, M?.replaceChildren(), E = void 0, O?.(), O = void 0;
    const t = a !== void 0 && a !== "null", p = P;
    P = void 0;
    const u = [
      ...document.querySelectorAll("dialog[open]")
    ].find((S) => S !== i);
    p?.isConnected && (!u || u.contains(p)) && p.focus({ preventScroll: !0 }), t && s();
  }, F = () => {
    i?.open && i.close(), V();
  }, o = (t) => {
    t.preventDefault(), r.closeOnEscape !== !1 && F();
  }, f = () => {
    i?.open || V();
  };
  let b = !1, x;
  const C = (t) => {
    if (t.target !== i) return !1;
    const p = i.getBoundingClientRect();
    return t.clientX < p.left || t.clientX > p.right || t.clientY < p.top || t.clientY > p.bottom;
  }, L = (t) => {
    if (t.target !== h) return !1;
    const p = h.getBoundingClientRect();
    return t.clientX >= p.left + h.clientLeft && t.clientX < p.left + h.clientLeft + h.clientWidth && t.clientY >= p.top + h.clientTop && t.clientY < p.top + h.clientTop + h.clientHeight;
  }, Y = (t) => {
    x = t.button === 0 && t.isPrimary && L(t) ? { x: t.clientX, y: t.clientY } : void 0, b = t.button === 0 && C(t);
  }, G = (t) => {
    const p = b && C(t) && r.closeOnBackdrop === !0 || !!(x && L(t) && r.closeOnEmptyArea === !0 && Math.hypot(t.clientX - x.x, t.clientY - x.y) <= 8);
    x = void 0, b = !1, p && F();
  }, q = () => {
    I(), s();
  }, j = (t) => {
    if (t.key !== "Tab" || !i?.open) return;
    const u = [
      ...i.querySelectorAll(
        "button:not(:disabled), input, select, [tabindex='0']"
      )
    ].filter((R) => !R.hidden), S = u[0], X = u[u.length - 1];
    (!t.shiftKey && document.activeElement === X || t.shiftKey && document.activeElement === S) && (t.preventDefault(), (t.shiftKey ? X : S).focus());
  }, oe = () => {
    if (i) return;
    $ = ee();
    const t = `comic-gen-viewer-${++U().nextId}`;
    i = document.createElement("dialog"), i.className = "comic-viewer", i.dataset.comicGenViewer = "", i.setAttribute("aria-labelledby", `${t}-title`), i.setAttribute("aria-describedby", `${t}-help`), i.innerHTML = `<div class="comic-viewer-toolbar"><h2 class="comic-viewer-title" id="${t}-title"></h2><button type="button" autofocus>닫기</button><div class="comic-viewer-controls"><label class="comic-viewer-checkbox"><input type="checkbox" checked>화면 넘침 방지</label><label>보기 크기 <select><option value="1">100%</option><option value="1.5">150%</option><option value="2">200%</option></select></label><div class="comic-viewer-navigation"><button type="button" class="comic-previous" aria-label="이전 컷">←</button><span class="comic-position" role="status" aria-live="polite"></span><button type="button" class="comic-next" aria-label="다음 컷">→</button></div></div></div><p class="comic-viewer-help" id="${t}-help">화면 넘침 방지는 한 컷의 너비·높이를 화면에 맞춥니다. 다음 컷은 아래로 스크롤해 읽습니다. 컷 왼쪽은 이전, 오른쪽은 다음 컷입니다. 읽기 영역에서 ←/→ 키로도 이동합니다.</p><div class="comic-viewer-viewport" tabindex="0" role="region" aria-label="만화 읽기 영역"><div class="comic-viewer-artwork"></div></div>`, y = i.querySelector("h2"), h = i.querySelector(".comic-viewer-viewport"), M = i.querySelector(".comic-viewer-artwork"), d = i.querySelector("select"), T = i.querySelector('input[type="checkbox"]'), B = i.querySelector(".comic-previous"), N = i.querySelector(".comic-next"), z = i.querySelector(".comic-position"), c = i.querySelector("button"), d.addEventListener("change", q), T.addEventListener("change", q), i.querySelector("button").addEventListener("click", F), i.addEventListener("pointerdown", Y), i.addEventListener("click", G), i.addEventListener("cancel", o), i.addEventListener("close", f), i.addEventListener("keydown", j), document.body.append(i), A = new ResizeObserver(I), A.observe(h);
  };
  return {
    get isOpen() {
      return !!i?.open;
    },
    get state() {
      return w();
    },
    setView: (t) => {
      if (!i?.open || !E)
        throw new Error("Open the viewer before setting its view.");
      l(t, E.result.panels.length), n = !0, t.zoom !== void 0 && m(t.zoom), t.preventOverflow !== void 0 && (T.checked = t.preventOverflow), I(), t.panelIndex !== void 0 && v?.goTo(t.panelIndex), n = !1, s();
    },
    open: (t, p = {}) => {
      if (D) throw new Error("폐기한 만화 뷰어는 다시 열 수 없습니다.");
      const u = Q(t), S = { ...e, ...p };
      g(S, u.result.panels.length);
      const X = S.trigger ?? (i?.open ? P : document.activeElement instanceof HTMLElement ? document.activeElement : void 0);
      oe(), v?.dispose(), k?.(), n = !0, r = S, a = void 0, b = !1, x = void 0, E = u, P = X, y.textContent = u.title, d.querySelectorAll("[data-custom-zoom]").forEach((K) => K.remove()), m(S.zoom ?? 1), T.checked = S.preventOverflow ?? !0, c.hidden = S.showCloseButton === !1;
      const R = te(
        u.result.svg,
        u.result.width,
        u.result.height,
        u.title
      );
      if (k = R.revoke, M.replaceChildren(R.image), v = ie(
        h,
        R.image,
        u.bounds,
        u.result.width,
        B,
        N,
        z,
        s
      ), !i.open) {
        O = ae();
        try {
          i.showModal();
        } catch (K) {
          throw n = !1, V(), K;
        }
      }
      I(), h.scrollTo(0, 0), v.reset(), v.goTo(S.panelIndex ?? 0), (c.hidden ? h : c).focus({
        preventScroll: !0
      }), n = !1, s();
    },
    close: F,
    destroy: () => {
      D || (D = !0, F(), A?.disconnect(), i && (d.removeEventListener("change", q), T.removeEventListener("change", q), i.querySelector("button").removeEventListener("click", F), i.removeEventListener("pointerdown", Y), i.removeEventListener("click", G), i.removeEventListener("cancel", o), i.removeEventListener("close", f), i.removeEventListener("keydown", j), i.remove()), $?.(), $ = void 0);
    }
  };
}
function le(e, r, c = {}) {
  const l = Q(r), g = ee(), w = se(c), a = document.createElement("button");
  a.type = "button", a.className = "comic-card", a.dataset.comicGenCard = "", a.setAttribute("aria-haspopup", "dialog"), a.setAttribute("aria-label", `${l.title} · 만화 읽기`);
  const n = document.createElement("span");
  n.className = "comic-card-thumbnail", n.setAttribute("aria-hidden", "true");
  const s = l.result.panels[0], m = te(
    s.svg,
    s.width,
    s.height,
    `${l.title} · 1/${l.result.panels.length}`
  );
  n.append(m.image);
  const i = document.createElement("span");
  i.className = "comic-card-copy";
  const h = document.createElement("strong");
  h.textContent = l.title;
  const M = document.createElement("span");
  M.textContent = `${l.result.panels.length}컷 · 만화 읽기 ↗`, i.append(h, M), a.append(n, i);
  const y = () => w.open(l.result, { trigger: a });
  a.addEventListener("click", y), e.replaceChildren(a);
  let d = !1;
  return () => {
    d || (d = !0, a.removeEventListener("click", y), w.destroy(), m.revoke(), a.remove(), g());
  };
}
export {
  se as createComicViewer,
  le as mountComicCard,
  se as 만화뷰어만들기,
  le as 만화카드붙이기
};
