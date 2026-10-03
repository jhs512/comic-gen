/*! Comic Gen browser SDK v0.7.0
*/
function j(e, r = 0) {
  return [...e.querySelectorAll("g[data-panel]")].map((c, l) => {
    if (c.getAttribute("data-panel") !== String(l + r))
      throw new TypeError("만화의 컷 순서가 올바르지 않습니다.");
    const h = c.querySelector("rect");
    if (!h) throw new TypeError("만화에 컷 프레임이 없습니다.");
    let f = new DOMMatrix();
    for (let w = h; w && w !== e.documentElement; w = w.parentElement) {
      let d = new DOMMatrix();
      const T = w.getAttribute("transform") ?? "", B = /(matrix|translate|scale|rotate|skewX|skewY)\(([^)]*)\)/g;
      let N = T;
      for (const z of T.matchAll(B)) {
        const x = z[2].trim().split(/[\s,]+/).map(Number);
        if (!x.length || x.some((F) => !Number.isFinite(F)))
          throw new TypeError("만화의 컷 변환이 올바르지 않습니다.");
        const [v, A = 0, E = 0] = x;
        switch (z[1]) {
          case "matrix":
            if (x.length !== 6)
              throw new TypeError("올바른 컷 행렬이 필요합니다.");
            d = d.multiply(new DOMMatrix(x));
            break;
          case "translate":
            d = d.translate(v, A);
            break;
          case "scale":
            d = d.scale(v, x[1] ?? v);
            break;
          case "rotate":
            d = d.translate(A, E).rotate(v).translate(-A, -E);
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
      f = d.multiply(f);
    }
    const a = Number(h.getAttribute("x") ?? 0), i = Number(h.getAttribute("y") ?? 0), s = Number(h.getAttribute("width")), m = Number(h.getAttribute("height"));
    if (![a, i, s, m].every(Number.isFinite) || s <= 0 || m <= 0)
      throw new TypeError("만화의 컷 크기가 올바르지 않습니다.");
    const o = [
      [a, i],
      [a + s, i],
      [a, i + m],
      [a + s, i + m]
    ].map(([w, d]) => f.transformPoint(new DOMPoint(w, d))), b = Math.min(...o.map((w) => w.x)), M = Math.min(...o.map((w) => w.y));
    return {
      x: b,
      y: M,
      width: Math.max(...o.map((w) => w.x)) - b,
      height: Math.max(...o.map((w) => w.y)) - M
    };
  });
}
function te(e, r, c, l, h, f, a, i) {
  let s = 0, m = !1, o = 0;
  const b = () => {
    const t = e.getBoundingClientRect(), g = getComputedStyle(e);
    return {
      x: t.x + e.clientLeft + (parseFloat(g.paddingLeft) || 0),
      y: t.y + e.clientTop + (parseFloat(g.paddingTop) || 0)
    };
  }, M = () => {
    const t = r.getBoundingClientRect(), g = t.width / l;
    return c.map((y) => ({
      x: t.x + y.x * g,
      y: t.y + y.y * g,
      width: y.width * g,
      height: y.height * g
    }));
  };
  let w = 0;
  const d = () => {
    h.disabled = s === 0, f.disabled = s === c.length - 1, (document.activeElement === h && h.disabled || document.activeElement === f && f.disabled) && e.focus();
    const t = `${s + 1} / ${c.length}컷`;
    a.textContent !== t && (a.textContent = t), w !== s && (w = s, i?.());
  }, T = () => {
    if (m) return;
    if (e.scrollLeft === 0 && e.scrollTop === 0) {
      s = 0, d();
      return;
    }
    const t = b(), g = e.clientWidth - (parseFloat(getComputedStyle(e).paddingLeft) || 0) - (parseFloat(getComputedStyle(e).paddingRight) || 0), y = e.clientHeight - (parseFloat(getComputedStyle(e).paddingTop) || 0) - (parseFloat(getComputedStyle(e).paddingBottom) || 0);
    let k = -1, C = 1 / 0;
    M().forEach((L, D) => {
      const G = Math.max(
        0,
        Math.min(L.x + L.width, t.x + g) - Math.max(L.x, t.x)
      ) * Math.max(
        0,
        Math.min(L.y + L.height, t.y + y) - Math.max(L.y, t.y)
      ), X = Math.hypot(
        Math.max(L.x - t.x, 0, t.x - L.x - L.width),
        Math.max(L.y - t.y, 0, t.y - L.y - L.height)
      );
      (G > k || G === k && X < C) && (k = G, C = X, s = D);
    }), d();
  }, B = () => {
    cancelAnimationFrame(o), m = !0;
    const t = e.scrollLeft, g = e.scrollTop;
    o = requestAnimationFrame(() => {
      o = requestAnimationFrame(() => {
        m = !1, (e.scrollLeft !== t || e.scrollTop !== g) && T();
      });
    });
  }, N = (t, g = s) => {
    if (s = Math.max(0, Math.min(c.length - 1, g + t)), s === g) {
      d();
      return;
    }
    const y = M()[s], k = b();
    e.scrollTo({
      left: e.scrollLeft + y.x - k.x,
      top: e.scrollTop + y.y - k.y,
      behavior: "instant"
    }), B(), d();
  }, z = () => N(-1), x = () => N(1), v = (t) => {
    t.target !== e || t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || (t.key === "ArrowLeft" || t.key === "ArrowRight") && (t.preventDefault(), N(t.key === "ArrowLeft" ? -1 : 1));
  }, A = /* @__PURE__ */ new Set();
  let E, F = !1;
  const R = (t) => {
    if (A.add(t.pointerId), F = !1, A.size !== 1 || !t.isPrimary || t.button !== 0) {
      E = void 0;
      return;
    }
    E = {
      id: t.pointerId,
      x: t.clientX,
      y: t.clientY,
      moved: !1
    };
  }, q = (t) => {
    E?.id === t.pointerId && Math.hypot(t.clientX - E.x, t.clientY - E.y) > 8 && (E.moved = !0);
  }, $ = (t) => {
    F = A.size === 1 && E?.id === t.pointerId && !E.moved, A.delete(t.pointerId), E = void 0;
  }, I = (t) => {
    t ? A.delete(t.pointerId) : A.clear(), E = void 0, F = !1;
  }, V = (t) => {
    const g = F;
    if (F = !1, !g || t.detail > 1 || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey || t.target !== r)
      return;
    const y = M(), k = y.findIndex(
      (C) => t.clientX >= C.x && t.clientX <= C.x + C.width && t.clientY >= C.y && t.clientY <= C.y + C.height
    );
    k >= 0 && (e.focus({ preventScroll: !0 }), N(
      t.clientX < y[k].x + y[k].width / 2 ? -1 : 1,
      k
    ));
  }, O = (t) => {
    e.contains(t.target) || I(t);
  };
  return r.draggable = !1, h.addEventListener("click", z), f.addEventListener("click", x), e.addEventListener("scroll", T), e.addEventListener("keydown", v), e.addEventListener("pointerdown", R), e.addEventListener("pointermove", q), e.addEventListener("pointerup", $), e.addEventListener("pointercancel", I), e.addEventListener("click", V), document.addEventListener("pointerup", O), document.addEventListener("pointercancel", O), d(), {
    get currentIndex() {
      return s;
    },
    goTo: (t) => N(t - s),
    capturePosition: () => {
      const t = b(), g = r.getBoundingClientRect(), y = g.width / l;
      return { x: (t.x - g.x) / y, y: (t.y - g.y) / y };
    },
    restorePosition: (t) => {
      const g = e.scrollLeft, y = e.scrollTop, k = r.getBoundingClientRect(), C = b(), L = k.width / l;
      e.scrollTo({
        left: e.scrollLeft + k.x + t.x * L - C.x,
        top: e.scrollTop + k.y + t.y * L - C.y,
        behavior: "instant"
      }), (e.scrollLeft !== g || e.scrollTop !== y) && B(), d();
    },
    reset: () => {
      cancelAnimationFrame(o), m = !1, s = 0, I(), d();
    },
    dispose: () => {
      cancelAnimationFrame(o), h.removeEventListener("click", z), f.removeEventListener("click", x), e.removeEventListener("scroll", T), e.removeEventListener("keydown", v), e.removeEventListener("pointerdown", R), e.removeEventListener("pointermove", q), e.removeEventListener("pointerup", $), e.removeEventListener("pointercancel", I), e.removeEventListener("click", V), document.removeEventListener("pointerup", O), document.removeEventListener("pointercancel", O), I();
    }
  };
}
const oe = `
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
`, W = "http://www.w3.org/2000/svg", Z = /^#[\p{L}_][\p{L}\p{N}_:.-]*$/u, ne = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "filter",
  "mask",
  "clip-path",
  "marker-start",
  "marker-mid",
  "marker-end",
  "cursor"
]), ie = /* @__PURE__ */ new Set([
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
function _(e) {
  if (!e || typeof e.svg != "string" || !e.svg || e.svg.length > 64e6 || !Number.isFinite(e.width) || e.width <= 0 || e.width > 1e6 || !Number.isFinite(e.height) || e.height <= 0 || e.height > 1e6 || e.diagnostics !== void 0 && (!Array.isArray(e.diagnostics) || e.diagnostics.length))
    throw new TypeError("완성된 코믹젠 렌더 결과가 필요합니다.");
  if (/<!DOCTYPE|<!ENTITY|<\?/i.test(e.svg))
    throw new TypeError("정적 코믹젠 SVG만 뷰어에 전달하세요.");
  const r = new DOMParser().parseFromString(e.svg, "image/svg+xml"), c = r.documentElement, l = (c.getAttribute("viewBox") ?? `0 0 ${e.width} ${e.height}`).trim().split(/[\s,]+/).map(Number);
  if (c.localName !== "svg" || c.namespaceURI !== W || r.querySelector("parsererror") || l.length !== 4 || l[0] !== 0 || l[1] !== 0 || l[2] !== e.width || l[3] !== e.height || Number(c.getAttribute("width")) !== e.width || Number(c.getAttribute("height")) !== e.height)
    throw new TypeError("만화 SVG와 렌더 결과의 크기가 일치해야 합니다.");
  for (const h of [c, ...c.querySelectorAll("*")]) {
    if (h.namespaceURI !== W || !ie.has(h.localName))
      throw new TypeError("외부 리소스나 실행 가능한 SVG는 지원하지 않습니다.");
    for (const f of h.attributes) {
      const a = f.localName.toLowerCase(), i = f.value;
      if (a.startsWith("on") || a === "base" && f.namespaceURI === "http://www.w3.org/XML/1998/namespace" || a === "href" && !Z.test(i))
        throw new TypeError(
          "외부 링크나 이벤트가 포함된 SVG는 지원하지 않습니다."
        );
      if (a === "style" && /@|javascript\s*:|vbscript\s*:|expression\s*\(|[\\<>]/i.test(i))
        throw new TypeError("정적 코믹젠 SVG 스타일만 지원합니다.");
      if (ne.has(a) && /[\\<>@]/.test(i))
        throw new TypeError("정적 코믹젠 SVG 색상과 참조만 지원합니다.");
      for (const s of i.matchAll(/url\s*\(([^)]*)\)/gi)) {
        const m = s[1].trim().replace(/^(['"])(.*)\1$/, "$2");
        if (!Z.test(m))
          throw new TypeError("SVG의 외부 리소스는 지원하지 않습니다.");
      }
    }
  }
  return r;
}
function J(e) {
  const r = _(e);
  if (!Array.isArray(e.panels) || e.panels.length < 1 || e.panels.length > 30)
    throw new TypeError("만화에는 실제 렌더된 1~30개의 컷이 필요합니다.");
  const c = [], l = e.panels.map((i, s) => {
    if (i.index !== s)
      throw new TypeError("만화의 개별 컷 순서가 일치해야 합니다.");
    const m = j(_(i), s);
    if (m.length !== 1 || ![m[0].x, m[0].y, m[0].width, m[0].height].every(
      Number.isFinite
    ) || m[0].width <= 0 || m[0].height <= 0 || m[0].x < 0 || m[0].y < 0 || m[0].x + m[0].width > i.width + 1 || m[0].y + m[0].height > i.height + 1)
      throw new TypeError("개별 컷 SVG에는 한 개의 컷 프레임이 필요합니다.");
    return c.push(m[0]), { ...i };
  }), h = j(r);
  if (h.length !== l.length || h.some(
    (i) => ![i.x, i.y, i.width, i.height].every(Number.isFinite) || i.width <= 0 || i.height <= 0 || i.x < 0 || i.y < 0 || i.x + i.width > e.width + 1 || i.y + i.height > e.height + 1
  ))
    throw new TypeError("만화의 컷 프레임과 렌더 결과가 일치해야 합니다.");
  const f = r.documentElement.getAttribute("aria-label") ?? r.documentElement.querySelector("title")?.textContent ?? "만화", a = l.map((i, s) => {
    const m = h[s], o = c[s], b = Math.max(
      m.width / o.width,
      m.height / o.height
    );
    return { width: i.width * b, height: i.height * b };
  });
  return {
    result: { ...e, panels: l },
    title: f,
    bounds: h,
    panelWidth: Math.max(...a.map((i) => i.width)),
    panelHeight: Math.max(...a.map((i) => i.height))
  };
}
const H = /* @__PURE__ */ Symbol.for("comic-gen.viewer.document-state.v1");
function U() {
  const e = document;
  return e[H] || Object.defineProperty(e, H, {
    value: { bodyLocks: /* @__PURE__ */ new WeakMap(), nextId: 0 }
  }), e[H];
}
function Q() {
  const e = U();
  let r = e.styles;
  if (r)
    r.element.isConnected || document.head.append(r.element);
  else {
    const l = document.createElement("style");
    l.dataset.comicGenViewerStyles = "", l.textContent = oe, document.head.append(l), r = { element: l, count: 0 }, e.styles = r;
  }
  r.count++;
  let c = !1;
  return () => {
    c || (c = !0, --r.count === 0 && (r.element.remove(), e.styles = void 0));
  };
}
function re() {
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
function ee(e, r, c, l) {
  const h = document.createElement("img"), f = URL.createObjectURL(new Blob([e], { type: "image/svg+xml" }));
  Object.assign(h, {
    src: f,
    width: r,
    height: c,
    alt: l,
    decoding: "async",
    draggable: !1
  });
  let a = !1;
  return {
    image: h,
    revoke: () => {
      a || (a = !0, URL.revokeObjectURL(f));
    }
  };
}
function ce(e = {}) {
  e = { ...e };
  let r = {}, c;
  const l = (n, u) => {
    if (n.zoom !== void 0 && (!Number.isFinite(n.zoom) || n.zoom <= 0 || n.zoom > 10))
      throw new RangeError("zoom must be greater than 0 and at most 10.");
    if (n.panelIndex !== void 0 && (!Number.isInteger(n.panelIndex) || n.panelIndex < 0 || u !== void 0 && n.panelIndex >= u))
      throw new RangeError("panelIndex must identify an existing panel.");
    if (n.preventOverflow !== void 0 && typeof n.preventOverflow != "boolean")
      throw new TypeError("preventOverflow must be a boolean.");
  }, h = (n, u) => {
    l(n, u);
    for (const p of [
      "closeOnBackdrop",
      "closeOnEscape",
      "showCloseButton"
    ])
      if (n[p] !== void 0 && typeof n[p] != "boolean")
        throw new TypeError(`${p} must be a boolean.`);
    if (n.onChange !== void 0 && typeof n.onChange != "function")
      throw new TypeError("onChange must be a function.");
  };
  h(e);
  const f = () => o?.open && x ? Object.freeze({
    zoom: Number(d.value),
    preventOverflow: T.checked,
    panelIndex: v?.currentIndex ?? 0
  }) : null;
  let a, i = !1;
  const s = () => {
    if (i) return;
    const n = f(), u = JSON.stringify(n);
    u !== a && (a = u, r.onChange?.(n));
  }, m = (n) => {
    const u = String(n);
    if (![...d.options].some((p) => p.value === u)) {
      const p = document.createElement("option");
      p.value = u, p.textContent = `${Math.round(n * 100)}%`, p.dataset.customZoom = "", d.append(p);
    }
    d.value = u;
  };
  let o, b, M, w, d, T, B, N, z, x, v, A, E, F, R, q, $ = !1;
  const I = () => {
    if (!o?.open || !x) return;
    const n = v?.capturePosition();
    b.dataset.preventOverflow = String(T.checked);
    const u = x.result;
    let p = u.width * Number(d.value);
    if (T.checked) {
      const S = getComputedStyle(b), K = Math.max(
        0,
        b.clientWidth - (parseFloat(S.paddingLeft) || 0) - (parseFloat(S.paddingRight) || 0)
      ), P = Math.max(
        0,
        b.clientHeight - (parseFloat(S.paddingTop) || 0) - (parseFloat(S.paddingBottom) || 0)
      );
      p = Math.min(
        p,
        K * u.width / x.panelWidth,
        P * u.width / x.panelHeight
      );
    }
    M.style.width = `${Math.max(0, p)}px`, n && Number.isFinite(n.x) && Number.isFinite(n.y) && v?.restorePosition(n);
  }, V = () => {
    v?.dispose(), v = void 0, E?.(), E = void 0, M?.replaceChildren(), x = void 0, F?.(), F = void 0;
    const n = a !== void 0 && a !== "null", u = q;
    q = void 0;
    const p = [
      ...document.querySelectorAll("dialog[open]")
    ].find((S) => S !== o);
    u?.isConnected && (!p || p.contains(u)) && u.focus({ preventScroll: !0 }), n && s();
  }, O = () => {
    o?.open && o.close(), V();
  }, t = (n) => {
    n.preventDefault(), r.closeOnEscape !== !1 && O();
  }, g = () => {
    o?.open || V();
  };
  let y = !1;
  const k = (n) => {
    if (n.target !== o) return !1;
    const u = o.getBoundingClientRect();
    return n.clientX < u.left || n.clientX > u.right || n.clientY < u.top || n.clientY > u.bottom;
  }, C = (n) => {
    y = n.button === 0 && k(n);
  }, L = (n) => {
    const u = y && k(n) && r.closeOnBackdrop === !0;
    y = !1, u && O();
  }, D = () => {
    I(), s();
  }, G = (n) => {
    if (n.key !== "Tab" || !o?.open) return;
    const p = [
      ...o.querySelectorAll(
        "button:not(:disabled), input, select, [tabindex='0']"
      )
    ].filter((P) => !P.hidden), S = p[0], K = p[p.length - 1];
    (!n.shiftKey && document.activeElement === K || n.shiftKey && document.activeElement === S) && (n.preventDefault(), (n.shiftKey ? K : S).focus());
  }, X = () => {
    if (o) return;
    R = Q();
    const n = `comic-gen-viewer-${++U().nextId}`;
    o = document.createElement("dialog"), o.className = "comic-viewer", o.dataset.comicGenViewer = "", o.setAttribute("aria-labelledby", `${n}-title`), o.setAttribute("aria-describedby", `${n}-help`), o.innerHTML = `<div class="comic-viewer-toolbar"><h2 class="comic-viewer-title" id="${n}-title"></h2><button type="button" autofocus>닫기</button><div class="comic-viewer-controls"><label class="comic-viewer-checkbox"><input type="checkbox" checked>화면 넘침 방지</label><label>보기 크기 <select><option value="1">100%</option><option value="1.5">150%</option><option value="2">200%</option></select></label><div class="comic-viewer-navigation"><button type="button" class="comic-previous" aria-label="이전 컷">←</button><span class="comic-position" role="status" aria-live="polite"></span><button type="button" class="comic-next" aria-label="다음 컷">→</button></div></div></div><p class="comic-viewer-help" id="${n}-help">화면 넘침 방지는 한 컷의 너비·높이를 화면에 맞춥니다. 다음 컷은 아래로 스크롤해 읽습니다. 컷 왼쪽은 이전, 오른쪽은 다음 컷입니다. 읽기 영역에서 ←/→ 키로도 이동합니다.</p><div class="comic-viewer-viewport" tabindex="0" role="region" aria-label="만화 읽기 영역"><div class="comic-viewer-artwork"></div></div>`, w = o.querySelector("h2"), b = o.querySelector(".comic-viewer-viewport"), M = o.querySelector(".comic-viewer-artwork"), d = o.querySelector("select"), T = o.querySelector('input[type="checkbox"]'), B = o.querySelector(".comic-previous"), N = o.querySelector(".comic-next"), z = o.querySelector(".comic-position"), c = o.querySelector("button"), d.addEventListener("change", D), T.addEventListener("change", D), o.querySelector("button").addEventListener("click", O), o.addEventListener("pointerdown", C), o.addEventListener("click", L), o.addEventListener("cancel", t), o.addEventListener("close", g), o.addEventListener("keydown", G), document.body.append(o), A = new ResizeObserver(I), A.observe(b);
  };
  return {
    get isOpen() {
      return !!o?.open;
    },
    get state() {
      return f();
    },
    setView: (n) => {
      if (!o?.open || !x)
        throw new Error("Open the viewer before setting its view.");
      l(n, x.result.panels.length), i = !0, n.zoom !== void 0 && m(n.zoom), n.preventOverflow !== void 0 && (T.checked = n.preventOverflow), I(), n.panelIndex !== void 0 && v?.goTo(n.panelIndex), i = !1, s();
    },
    open: (n, u = {}) => {
      if ($) throw new Error("폐기한 만화 뷰어는 다시 열 수 없습니다.");
      const p = J(n), S = { ...e, ...u };
      h(S, p.result.panels.length);
      const K = S.trigger ?? (o?.open ? q : document.activeElement instanceof HTMLElement ? document.activeElement : void 0);
      X(), v?.dispose(), E?.(), i = !0, r = S, a = void 0, y = !1, x = p, q = K, w.textContent = p.title, d.querySelectorAll("[data-custom-zoom]").forEach((Y) => Y.remove()), m(S.zoom ?? 1), T.checked = S.preventOverflow ?? !0, c.hidden = S.showCloseButton === !1;
      const P = ee(
        p.result.svg,
        p.result.width,
        p.result.height,
        p.title
      );
      if (E = P.revoke, M.replaceChildren(P.image), v = te(
        b,
        P.image,
        p.bounds,
        p.result.width,
        B,
        N,
        z,
        s
      ), !o.open) {
        F = re();
        try {
          o.showModal();
        } catch (Y) {
          throw i = !1, V(), Y;
        }
      }
      I(), b.scrollTo(0, 0), v.reset(), v.goTo(S.panelIndex ?? 0), (c.hidden ? b : c).focus({
        preventScroll: !0
      }), i = !1, s();
    },
    close: O,
    destroy: () => {
      $ || ($ = !0, O(), A?.disconnect(), o && (d.removeEventListener("change", D), T.removeEventListener("change", D), o.querySelector("button").removeEventListener("click", O), o.removeEventListener("pointerdown", C), o.removeEventListener("click", L), o.removeEventListener("cancel", t), o.removeEventListener("close", g), o.removeEventListener("keydown", G), o.remove()), R?.(), R = void 0);
    }
  };
}
function ae(e, r, c = {}) {
  const l = J(r), h = Q(), f = ce(c), a = document.createElement("button");
  a.type = "button", a.className = "comic-card", a.dataset.comicGenCard = "", a.setAttribute("aria-haspopup", "dialog"), a.setAttribute("aria-label", `${l.title} · 만화 읽기`);
  const i = document.createElement("span");
  i.className = "comic-card-thumbnail", i.setAttribute("aria-hidden", "true");
  const s = l.result.panels[0], m = ee(
    s.svg,
    s.width,
    s.height,
    `${l.title} · 1/${l.result.panels.length}`
  );
  i.append(m.image);
  const o = document.createElement("span");
  o.className = "comic-card-copy";
  const b = document.createElement("strong");
  b.textContent = l.title;
  const M = document.createElement("span");
  M.textContent = `${l.result.panels.length}컷 · 만화 읽기 ↗`, o.append(b, M), a.append(i, o);
  const w = () => f.open(l.result, { trigger: a });
  a.addEventListener("click", w), e.replaceChildren(a);
  let d = !1;
  return () => {
    d || (d = !0, a.removeEventListener("click", w), f.destroy(), m.revoke(), a.remove(), h());
  };
}
export {
  ce as createComicViewer,
  ae as mountComicCard,
  ce as 만화뷰어만들기,
  ae as 만화카드붙이기
};
