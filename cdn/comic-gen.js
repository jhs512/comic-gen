/*! Comic Gen browser SDK v0.3.0
Bundled yaml license:
Copyright Eemeli Aro <eemeli@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.

*/
const fi = "1", Qt = {
  client: {
    color: "#9fcdfa",
    faceY: 0,
    body: '<circle r="56" fill="#badcff"/><path d="M-24 -58h48" fill="none"/>'
  },
  server: {
    color: "#efb970",
    faceY: 0,
    body: '<rect x="-52" y="-54" width="104" height="108" rx="22" fill="#ffe0a8"/><path d="M-34 -36h42M-34 -27h26"/><circle cx="30" cy="-33" r="3" fill="#7bb79b"/>'
  },
  database: {
    color: "#b4a0ed",
    faceY: 5,
    body: '<path d="M-52 -39v79c0 23 104 23 104 0v-79" fill="#daccff"/><ellipse cy="-39" rx="52" ry="18" fill="#ece4ff"/><path d="M-52 24c0 23 104 23 104 0" fill="none"/>'
  }
}, zt = {
  neutral: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-10 17q10 7 20 0" fill="none"/>',
  happy: '<path d="M-25 -2q8 -12 16 0m18 0q8 -12 16 0M-13 16q13 18 26 0" fill="none"/>',
  confused: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-24 -17l13 -5m21 1 14 4M-8 18q8 -6 16 0" fill="none"/>',
  sad: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-12 23q12 -14 24 0" fill="none"/>',
  angry: '<path d="M-25 -16l15 6m20 0 15 -6M-10 20h20" fill="none"/><circle cx="-17" cy="-1" r="3"/><circle cx="17" cy="-1" r="3"/>'
}, Xt = {
  wave: '<g data-hand="wave"><circle cx="-65" cy="-22" r="12" fill="white"/><path d="M-77 -42l-4 -8m15 2v-10m13 17 5 -7" fill="none"/></g>',
  point: '<g data-hand="point"><circle cx="-65" cy="0" r="11" fill="white"/><path d="M-77 0h-13" fill="none"/></g>'
}, de = {
  request: '<rect x="-18" y="-13" width="36" height="26" rx="4" fill="#f9f0cd"/><path d="M-18 -13L0 1l18 -14" fill="none"/>',
  data: '<path d="M-16 -12v23c0 10 32 10 32 0v-23" fill="#daccff"/><ellipse cy="-12" rx="16" ry="6" fill="#ece4ff"/>',
  key: '<circle cx="-10" r="9" fill="#ffe0a8"/><path d="M0 0h21m-5 0v8m-8 -8v6" fill="none"/>'
};
function R(s) {
  return s.replace(
    /[&<>"']/g,
    (e) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;"
    })[e]
  );
}
class Us {
  constructor(e = 2e6) {
    if (this.maxBytes = e, !Number.isFinite(e) || e < 0)
      throw new Error("캐시 크기는 0 이상의 숫자여야 합니다.");
  }
  maxBytes;
  entries = /* @__PURE__ */ new Map();
  size = 0;
  get bytes() {
    return this.size;
  }
  get(e) {
    const t = this.entries.get(e);
    return t && (this.entries.delete(e), this.entries.set(e, t)), t;
  }
  set(e, t) {
    const n = this.entries.get(e);
    n && (this.size -= n.bytes, this.entries.delete(e));
    const i = (e.length + t.markup.length) * 2;
    if (!(i > this.maxBytes)) {
      for (; this.size + i > this.maxBytes && this.entries.size; ) {
        const r = this.entries.keys().next().value;
        this.size -= this.entries.get(r).bytes, this.entries.delete(r);
      }
      this.entries.set(e, { ...t, bytes: i }), this.size += i;
    }
  }
  clear() {
    this.entries.clear(), this.size = 0;
  }
}
const kt = /* @__PURE__ */ Symbol.for("yaml.alias"), dt = /* @__PURE__ */ Symbol.for("yaml.document"), te = /* @__PURE__ */ Symbol.for("yaml.map"), Zt = /* @__PURE__ */ Symbol.for("yaml.pair"), H = /* @__PURE__ */ Symbol.for("yaml.scalar"), be = /* @__PURE__ */ Symbol.for("yaml.seq"), V = /* @__PURE__ */ Symbol.for("yaml.node.type"), we = (s) => !!s && typeof s == "object" && s[V] === kt, Qe = (s) => !!s && typeof s == "object" && s[V] === dt, Me = (s) => !!s && typeof s == "object" && s[V] === te, _ = (s) => !!s && typeof s == "object" && s[V] === Zt, T = (s) => !!s && typeof s == "object" && s[V] === H, _e = (s) => !!s && typeof s == "object" && s[V] === be;
function C(s) {
  if (s && typeof s == "object")
    switch (s[V]) {
      case te:
      case be:
        return !0;
    }
  return !1;
}
function M(s) {
  if (s && typeof s == "object")
    switch (s[V]) {
      case kt:
      case te:
      case H:
      case be:
        return !0;
    }
  return !1;
}
const es = (s) => (T(s) || C(s)) && !!s.anchor, ne = /* @__PURE__ */ Symbol("break visit"), Vs = /* @__PURE__ */ Symbol("skip children"), Ie = /* @__PURE__ */ Symbol("remove node");
function $e(s, e) {
  const t = Ys(e);
  Qe(s) ? fe(null, s.contents, t, Object.freeze([s])) === Ie && (s.contents = null) : fe(null, s, t, Object.freeze([]));
}
$e.BREAK = ne;
$e.SKIP = Vs;
$e.REMOVE = Ie;
function fe(s, e, t, n) {
  const i = Js(s, e, t, n);
  if (M(i) || _(i))
    return Gs(s, n, i), fe(s, i, t, n);
  if (typeof i != "symbol") {
    if (C(e)) {
      n = Object.freeze(n.concat(e));
      for (let r = 0; r < e.items.length; ++r) {
        const o = fe(r, e.items[r], t, n);
        if (typeof o == "number")
          r = o - 1;
        else {
          if (o === ne)
            return ne;
          o === Ie && (e.items.splice(r, 1), r -= 1);
        }
      }
    } else if (_(e)) {
      n = Object.freeze(n.concat(e));
      const r = fe("key", e.key, t, n);
      if (r === ne)
        return ne;
      r === Ie && (e.key = null);
      const o = fe("value", e.value, t, n);
      if (o === ne)
        return ne;
      o === Ie && (e.value = null);
    }
  }
  return i;
}
function Ys(s) {
  return typeof s == "object" && (s.Collection || s.Node || s.Value) ? Object.assign({
    Alias: s.Node,
    Map: s.Node,
    Scalar: s.Node,
    Seq: s.Node
  }, s.Value && {
    Map: s.Value,
    Scalar: s.Value,
    Seq: s.Value
  }, s.Collection && {
    Map: s.Collection,
    Seq: s.Collection
  }, s) : s;
}
function Js(s, e, t, n) {
  if (typeof t == "function")
    return t(s, e, n);
  if (Me(e))
    return t.Map?.(s, e, n);
  if (_e(e))
    return t.Seq?.(s, e, n);
  if (_(e))
    return t.Pair?.(s, e, n);
  if (T(e))
    return t.Scalar?.(s, e, n);
  if (we(e))
    return t.Alias?.(s, e, n);
}
function Gs(s, e, t) {
  const n = e[e.length - 1];
  if (C(n))
    n.items[s] = t;
  else if (_(n))
    s === "key" ? n.key = t : n.value = t;
  else if (Qe(n))
    n.contents = t;
  else {
    const i = we(n) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${i} parent`);
  }
}
const Hs = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, Ws = (s) => s.replace(/[!,[\]{}]/g, (e) => Hs[e]);
class K {
  constructor(e, t) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, K.defaultYaml, e), this.tags = Object.assign({}, K.defaultTags, t);
  }
  clone() {
    const e = new K(this.yaml, this.tags);
    return e.docStart = this.docStart, e;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const e = new K(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: K.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, K.defaultTags);
        break;
    }
    return e;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(e, t) {
    this.atNextDocument && (this.yaml = { explicit: K.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, K.defaultTags), this.atNextDocument = !1);
    const n = e.trim().split(/[ \t]+/), i = n.shift();
    switch (i) {
      case "%TAG": {
        if (n.length !== 2 && (t(0, "%TAG directive should contain exactly two parts"), n.length < 2))
          return !1;
        const [r, o] = n;
        return this.tags[r] = o, !0;
      }
      case "%YAML": {
        if (this.yaml.explicit = !0, n.length !== 1)
          return t(0, "%YAML directive should contain exactly one part"), !1;
        const [r] = n;
        if (r === "1.1" || r === "1.2")
          return this.yaml.version = r, !0;
        {
          const o = /^\d+\.\d+$/.test(r);
          return t(6, `Unsupported YAML version ${r}`, o), !1;
        }
      }
      default:
        return t(0, `Unknown directive ${i}`, !0), !1;
    }
  }
  /**
   * Resolves a tag, matching handles to those defined in %TAG directives.
   *
   * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
   *   `'!local'` tag, or `null` if unresolvable.
   */
  tagName(e, t) {
    if (e === "!")
      return "!";
    if (e[0] !== "!")
      return t(`Not a valid tag: ${e}`), null;
    if (e[1] === "<") {
      const o = e.slice(2, -1);
      return o === "!" || o === "!!" ? (t(`Verbatim tags aren't resolved, so ${e} is invalid.`), null) : (e[e.length - 1] !== ">" && t("Verbatim tags must end with a >"), o);
    }
    const [, n, i] = e.match(/^(.*!)([^!]*)$/s);
    i || t(`The ${e} tag has no suffix`);
    const r = this.tags[n];
    if (r)
      try {
        return r + decodeURIComponent(i);
      } catch (o) {
        return t(String(o)), null;
      }
    return n === "!" ? e : (t(`Could not resolve tag: ${e}`), null);
  }
  /**
   * Given a fully resolved tag, returns its printable string form,
   * taking into account current tag prefixes and defaults.
   */
  tagString(e) {
    for (const [t, n] of Object.entries(this.tags))
      if (e.startsWith(n))
        return t + Ws(e.substring(n.length));
    return e[0] === "!" ? e : `!<${e}>`;
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], n = Object.entries(this.tags);
    let i;
    if (e && n.length > 0 && M(e.contents)) {
      const r = {};
      $e(e.contents, (o, l) => {
        M(l) && l.tag && (r[l.tag] = !0);
      }), i = Object.keys(r);
    } else
      i = [];
    for (const [r, o] of n)
      r === "!!" && o === "tag:yaml.org,2002:" || (!e || i.some((l) => l.startsWith(o))) && t.push(`%TAG ${r} ${o}`);
    return t.join(`
`);
  }
}
K.defaultYaml = { explicit: !1, version: "1.2" };
K.defaultTags = { "!!": "tag:yaml.org,2002:" };
function ts(s) {
  if (/[\x00-\x19\s,[\]{}]/.test(s)) {
    const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(s)}`;
    throw new Error(t);
  }
  return !0;
}
function ss(s) {
  const e = /* @__PURE__ */ new Set();
  return $e(s, {
    Value(t, n) {
      n.anchor && e.add(n.anchor);
    }
  }), e;
}
function ns(s, e) {
  for (let t = 1; ; ++t) {
    const n = `${s}${t}`;
    if (!e.has(n))
      return n;
  }
}
function Qs(s, e) {
  const t = [], n = /* @__PURE__ */ new Map();
  let i = null;
  return {
    onAnchor: (r) => {
      t.push(r), i ?? (i = ss(s));
      const o = ns(e, i);
      return i.add(o), o;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const r of t) {
        const o = n.get(r);
        if (typeof o == "object" && o.anchor && (T(o.node) || C(o.node)))
          o.node.anchor = o.anchor;
        else {
          const l = new Error("Failed to resolve repeated object (this should not happen)");
          throw l.source = r, l;
        }
      }
    },
    sourceObjects: n
  };
}
function ue(s, e, t, n) {
  if (n && typeof n == "object")
    if (Array.isArray(n))
      for (let i = 0, r = n.length; i < r; ++i) {
        const o = n[i], l = ue(s, n, String(i), o);
        l === void 0 ? delete n[i] : l !== o && (n[i] = l);
      }
    else if (n instanceof Map)
      for (const i of Array.from(n.keys())) {
        const r = n.get(i), o = ue(s, n, i, r);
        o === void 0 ? n.delete(i) : o !== r && n.set(i, o);
      }
    else if (n instanceof Set)
      for (const i of Array.from(n)) {
        const r = ue(s, n, i, i);
        r === void 0 ? n.delete(i) : r !== i && (n.delete(i), n.add(r));
      }
    else
      for (const [i, r] of Object.entries(n)) {
        const o = ue(s, n, i, r);
        o === void 0 ? delete n[i] : o !== r && (n[i] = o);
      }
  return s.call(e, t, n);
}
function U(s, e, t) {
  if (Array.isArray(s))
    return s.map((n, i) => U(n, String(i), t));
  if (s && typeof s.toJSON == "function") {
    if (!t || !es(s))
      return s.toJSON(e, t);
    const n = { aliasCount: 0, count: 1, res: void 0 };
    t.anchors.set(s, n), t.onCreate = (r) => {
      n.res = r, delete t.onCreate;
    };
    const i = s.toJSON(e, t);
    return t.onCreate && t.onCreate(i), i;
  }
  return typeof s == "bigint" && !t?.keep ? Number(s) : s;
}
class St {
  constructor(e) {
    Object.defineProperty(this, V, { value: e });
  }
  /** Create a copy of this node.  */
  clone() {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (e.range = this.range.slice()), e;
  }
  /** A plain JavaScript representation of this node. */
  toJS(e, { mapAsMap: t, maxAliasCount: n, onAnchor: i, reviver: r } = {}) {
    if (!Qe(e))
      throw new TypeError("A document argument is required");
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: e,
      keep: !0,
      mapAsMap: t === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof n == "number" ? n : 100
    }, l = U(this, "", o);
    if (typeof i == "function")
      for (const { count: a, res: c } of o.anchors.values())
        i(c, a);
    return typeof r == "function" ? ue(r, { "": l }, "", l) : l;
  }
}
class Nt extends St {
  constructor(e) {
    super(kt), this.source = e, Object.defineProperty(this, "tag", {
      set() {
        throw new Error("Alias nodes cannot have tags");
      }
    });
  }
  /**
   * Resolve the value of this alias within `doc`, finding the last
   * instance of the `source` anchor before this node.
   */
  resolve(e, t) {
    if (t?.maxAliasCount === 0)
      throw new ReferenceError("Alias resolution is disabled");
    let n;
    t?.aliasResolveCache ? n = t.aliasResolveCache : (n = [], $e(e, {
      Node: (r, o) => {
        (we(o) || es(o)) && n.push(o);
      }
    }), t && (t.aliasResolveCache = n));
    let i;
    for (const r of n) {
      if (r === this)
        break;
      r.anchor === this.source && (i = r);
    }
    if (i && t) {
      const { anchors: r, doc: o, maxAliasCount: l } = t;
      let a = r.get(i);
      if (a || (U(i, null, t), a = r.get(i)), a?.res === void 0) {
        const c = "This should not happen: Alias anchor was not resolved?";
        throw new ReferenceError(c);
      }
      if (l >= 0 && (a.count += 1, a.aliasCount === 0 && (a.aliasCount = Ue(o, i, r)), a.count * a.aliasCount > l)) {
        const c = "Excessive alias count indicates a resource exhaustion attack";
        throw new ReferenceError(c);
      }
    }
    return i;
  }
  toJSON(e, t) {
    if (!t)
      return { source: this.source };
    const n = this.resolve(t.doc, t);
    if (!n) {
      const i = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(i);
    }
    return t.anchors.get(n).res;
  }
  toString(e, t, n) {
    const i = `*${this.source}`;
    if (e) {
      if (ts(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
        const r = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(r);
      }
      if (e.implicitKey)
        return `${i} `;
    }
    return i;
  }
}
function Ue(s, e, t) {
  if (we(e)) {
    const n = e.resolve(s), i = t && n && t.get(n);
    return i ? i.count * i.aliasCount : 0;
  } else if (C(e)) {
    let n = 0;
    for (const i of e.items) {
      const r = Ue(s, i, t);
      r > n && (n = r);
    }
    return n;
  } else if (_(e)) {
    const n = Ue(s, e.key, t), i = Ue(s, e.value, t);
    return Math.max(n, i);
  }
  return 1;
}
const is = (s) => !s || typeof s != "function" && typeof s != "object";
class v extends St {
  constructor(e) {
    super(H), this.value = e;
  }
  toJSON(e, t) {
    return t?.keep ? this.value : U(this.value, e, t);
  }
  toString() {
    return String(this.value);
  }
}
v.BLOCK_FOLDED = "BLOCK_FOLDED";
v.BLOCK_LITERAL = "BLOCK_LITERAL";
v.PLAIN = "PLAIN";
v.QUOTE_DOUBLE = "QUOTE_DOUBLE";
v.QUOTE_SINGLE = "QUOTE_SINGLE";
const zs = "tag:yaml.org,2002:";
function Xs(s, e, t) {
  if (e) {
    const n = t.filter((r) => r.tag === e), i = n.find((r) => !r.format) ?? n[0];
    if (!i)
      throw new Error(`Tag ${e} not found`);
    return i;
  }
  return t.find((n) => n.identify?.(s) && !n.format);
}
function Te(s, e, t) {
  if (Qe(s) && (s = s.contents), M(s))
    return s;
  if (_(s)) {
    const d = t.schema[te].createNode?.(t.schema, null, t);
    return d.items.push(s), d;
  }
  (s instanceof String || s instanceof Number || s instanceof Boolean || typeof BigInt < "u" && s instanceof BigInt) && (s = s.valueOf());
  const { aliasDuplicateObjects: n, onAnchor: i, onTagObj: r, schema: o, sourceObjects: l } = t;
  let a;
  if (n && s && typeof s == "object") {
    if (a = l.get(s), a)
      return a.anchor ?? (a.anchor = i(s)), new Nt(a.anchor);
    a = { anchor: null, node: null }, l.set(s, a);
  }
  e?.startsWith("!!") && (e = zs + e.slice(2));
  let c = Xs(s, e, o.tags);
  if (!c) {
    if (s && typeof s.toJSON == "function" && (s = s.toJSON()), !s || typeof s != "object") {
      const d = new v(s);
      return a && (a.node = d), d;
    }
    c = s instanceof Map ? o[te] : Symbol.iterator in Object(s) ? o[be] : o[te];
  }
  r && (r(c), delete t.onTagObj);
  const g = c?.createNode ? c.createNode(t.schema, s, t) : typeof c?.nodeClass?.from == "function" ? c.nodeClass.from(t.schema, s, t) : new v(s);
  return e ? g.tag = e : c.default || (g.tag = c.tag), a && (a.node = g), g;
}
function Je(s, e, t) {
  let n = t;
  for (let i = e.length - 1; i >= 0; --i) {
    const r = e[i];
    if (typeof r == "number" && Number.isInteger(r) && r >= 0) {
      const o = [];
      o[r] = n, n = o;
    } else
      n = /* @__PURE__ */ new Map([[r, n]]);
  }
  return Te(n, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: s,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const Ae = (s) => s == null || typeof s == "object" && !!s[Symbol.iterator]().next().done;
class rs extends St {
  constructor(e, t) {
    super(e), Object.defineProperty(this, "schema", {
      value: t,
      configurable: !0,
      enumerable: !1,
      writable: !0
    });
  }
  /**
   * Create a copy of this collection.
   *
   * @param schema - If defined, overwrites the original's schema
   */
  clone(e) {
    const t = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return e && (t.schema = e), t.items = t.items.map((n) => M(n) || _(n) ? n.clone(e) : n), this.range && (t.range = this.range.slice()), t;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(e, t) {
    if (Ae(e))
      this.add(t);
    else {
      const [n, ...i] = e, r = this.get(n, !0);
      if (C(r))
        r.addIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(n, Je(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`);
    }
  }
  /**
   * Removes a value from the collection.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    const [t, ...n] = e;
    if (n.length === 0)
      return this.delete(t);
    const i = this.get(t, !0);
    if (C(i))
      return i.deleteIn(n);
    throw new Error(`Expected YAML collection at ${t}. Remaining path: ${n}`);
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    const [n, ...i] = e, r = this.get(n, !0);
    return i.length === 0 ? !t && T(r) ? r.value : r : C(r) ? r.getIn(i, t) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!_(t))
        return !1;
      const n = t.value;
      return n == null || e && T(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
    });
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   */
  hasIn(e) {
    const [t, ...n] = e;
    if (n.length === 0)
      return this.has(t);
    const i = this.get(t, !0);
    return C(i) ? i.hasIn(n) : !1;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    const [n, ...i] = e;
    if (i.length === 0)
      this.set(n, t);
    else {
      const r = this.get(n, !0);
      if (C(r))
        r.setIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(n, Je(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`);
    }
  }
}
const Zs = (s) => s.replace(/^(?!$)(?: $)?/gm, "#");
function Q(s, e) {
  return /^\n+$/.test(s) ? s.substring(1) : e ? s.replace(/^(?! *$)/gm, e) : s;
}
const ie = (s, e, t) => s.endsWith(`
`) ? Q(t, e) : t.includes(`
`) ? `
` + Q(t, e) : (s.endsWith(" ") ? "" : " ") + t, os = "flow", pt = "block", Ve = "quoted";
function ze(s, e, t = "flow", { indentAtStart: n, lineWidth: i = 80, minContentWidth: r = 20, onFold: o, onOverflow: l } = {}) {
  if (!i || i < 0)
    return s;
  i < r && (r = 0);
  const a = Math.max(1 + r, 1 + i - e.length);
  if (s.length <= a)
    return s;
  const c = [], g = {};
  let d = i - e.length;
  typeof n == "number" && (n > i - Math.max(2, r) ? c.push(0) : d = i - n);
  let u, y, w = !1, f = -1, p = -1, h = -1;
  t === pt && (f = xt(s, f, e.length), f !== -1 && (d = f + a));
  for (let m; m = s[f += 1]; ) {
    if (t === Ve && m === "\\") {
      switch (p = f, s[f + 1]) {
        case "x":
          f += 3;
          break;
        case "u":
          f += 5;
          break;
        case "U":
          f += 9;
          break;
        default:
          f += 1;
      }
      h = f;
    }
    if (m === `
`)
      t === pt && (f = xt(s, f, e.length)), d = f + e.length + a, u = void 0;
    else {
      if (m === " " && y && y !== " " && y !== `
` && y !== "	") {
        const k = s[f + 1];
        k && k !== " " && k !== `
` && k !== "	" && (u = f);
      }
      if (f >= d)
        if (u)
          c.push(u), d = u + a, u = void 0;
        else if (t === Ve) {
          for (; y === " " || y === "	"; )
            y = m, m = s[f += 1], w = !0;
          const k = f > h + 1 ? f - 2 : p - 1;
          if (g[k])
            return s;
          c.push(k), g[k] = !0, d = k + a, u = void 0;
        } else
          w = !0;
    }
    y = m;
  }
  if (w && l && l(), c.length === 0)
    return s;
  o && o();
  let b = s.slice(0, c[0]);
  for (let m = 0; m < c.length; ++m) {
    const k = c[m], S = c[m + 1] || s.length;
    k === 0 ? b = `
${e}${s.slice(0, S)}` : (t === Ve && g[k] && (b += `${s[k]}\\`), b += `
${e}${s.slice(k + 1, S)}`);
  }
  return b;
}
function xt(s, e, t) {
  let n = e, i = e + 1, r = s[i];
  for (; r === " " || r === "	"; )
    if (e < i + t)
      r = s[++e];
    else {
      do
        r = s[++e];
      while (r && r !== `
`);
      n = e, i = e + 1, r = s[i];
    }
  return n;
}
const Xe = (s, e) => ({
  indentAtStart: e ? s.indent.length : s.indentAtStart,
  lineWidth: s.options.lineWidth,
  minContentWidth: s.options.minContentWidth
}), Ze = (s) => /^(%|---|\.\.\.)/m.test(s);
function en(s, e, t) {
  if (!e || e < 0)
    return !1;
  const n = e - t, i = s.length;
  if (i <= n)
    return !1;
  for (let r = 0, o = 0; r < i; ++r)
    if (s[r] === `
`) {
      if (r - o > n)
        return !0;
      if (o = r + 1, i - o <= n)
        return !1;
    }
  return !0;
}
function Le(s, e) {
  const t = JSON.stringify(s);
  if (e.options.doubleQuotedAsJSON)
    return t;
  const { implicitKey: n } = e, i = e.options.doubleQuotedMinMultiLineLength, r = e.indent || (Ze(s) ? "  " : "");
  let o = "", l = 0;
  for (let a = 0, c = t[a]; c; c = t[++a])
    if (c === " " && t[a + 1] === "\\" && t[a + 2] === "n" && (o += t.slice(l, a) + "\\ ", a += 1, l = a, c = "\\"), c === "\\")
      switch (t[a + 1]) {
        case "u":
          {
            o += t.slice(l, a);
            const g = t.substr(a + 2, 4);
            switch (g) {
              case "0000":
                o += "\\0";
                break;
              case "0007":
                o += "\\a";
                break;
              case "000b":
                o += "\\v";
                break;
              case "001b":
                o += "\\e";
                break;
              case "0085":
                o += "\\N";
                break;
              case "00a0":
                o += "\\_";
                break;
              case "2028":
                o += "\\L";
                break;
              case "2029":
                o += "\\P";
                break;
              default:
                g.substr(0, 2) === "00" ? o += "\\x" + g.substr(2) : o += t.substr(a, 6);
            }
            a += 5, l = a + 1;
          }
          break;
        case "n":
          if (n || t[a + 2] === '"' || t.length < i)
            a += 1;
          else {
            for (o += t.slice(l, a) + `

`; t[a + 2] === "\\" && t[a + 3] === "n" && t[a + 4] !== '"'; )
              o += `
`, a += 2;
            o += r, t[a + 2] === " " && (o += "\\"), a += 1, l = a + 1;
          }
          break;
        default:
          a += 1;
      }
  return o = l ? o + t.slice(l) : t, n ? o : ze(o, r, Ve, Xe(e, !1));
}
function mt(s, e) {
  if (e.options.singleQuote === !1 || e.implicitKey && s.includes(`
`) || /[ \t]\n|\n[ \t]/.test(s))
    return Le(s, e);
  const t = e.indent || (Ze(s) ? "  " : ""), n = "'" + s.replace(/'/g, "''").replace(/\n+/g, `$&
${t}`) + "'";
  return e.implicitKey ? n : ze(n, t, os, Xe(e, !1));
}
function he(s, e) {
  const { singleQuote: t } = e.options;
  let n;
  if (t === !1)
    n = Le;
  else {
    const i = s.includes('"'), r = s.includes("'");
    i && !r ? n = mt : r && !i ? n = Le : n = t ? mt : Le;
  }
  return n(s, e);
}
let gt;
try {
  gt = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  gt = /\n+(?!\n|$)/g;
}
function Ye({ comment: s, type: e, value: t }, n, i, r) {
  const { blockQuote: o, commentString: l, lineWidth: a } = n.options;
  if (!o || /\n[\t ]+$/.test(t))
    return he(t, n);
  const c = n.indent || (n.forceBlockIndent || Ze(t) ? "  " : ""), g = o === "literal" ? !0 : o === "folded" || e === v.BLOCK_FOLDED ? !1 : e === v.BLOCK_LITERAL ? !0 : !en(t, a, c.length);
  if (!t)
    return g ? `|
` : `>
`;
  let d, u;
  for (u = t.length; u > 0; --u) {
    const S = t[u - 1];
    if (S !== `
` && S !== "	" && S !== " ")
      break;
  }
  let y = t.substring(u);
  const w = y.indexOf(`
`);
  w === -1 ? d = "-" : t === y || w !== y.length - 1 ? (d = "+", r && r()) : d = "", y && (t = t.slice(0, -y.length), y[y.length - 1] === `
` && (y = y.slice(0, -1)), y = y.replace(gt, `$&${c}`));
  let f = !1, p, h = -1;
  for (p = 0; p < t.length; ++p) {
    const S = t[p];
    if (S === " ")
      f = !0;
    else if (S === `
`)
      h = p;
    else
      break;
  }
  let b = t.substring(0, h < p ? h + 1 : p);
  b && (t = t.substring(b.length), b = b.replace(/\n+/g, `$&${c}`));
  let k = (f ? c ? "2" : "1" : "") + d;
  if (s && (k += " " + l(s.replace(/ ?[\r\n]+/g, " ")), i && i()), !g) {
    const S = t.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${c}`);
    let N = !1;
    const O = Xe(n, !0);
    o !== "folded" && e !== v.BLOCK_FOLDED && (O.onOverflow = () => {
      N = !0;
    });
    const $ = ze(`${b}${S}${y}`, c, pt, O);
    if (!N)
      return `>${k}
${c}${$}`;
  }
  return t = t.replace(/\n+/g, `$&${c}`), `|${k}
${c}${b}${t}${y}`;
}
function tn(s, e, t, n) {
  const { type: i, value: r } = s, { actualString: o, implicitKey: l, indent: a, indentStep: c, inFlow: g } = e;
  if (l && r.includes(`
`) || g && /[[\]{},]/.test(r))
    return he(r, e);
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
    return l || g || !r.includes(`
`) ? he(r, e) : Ye(s, e, t, n);
  if (!l && !g && i !== v.PLAIN && r.includes(`
`))
    return Ye(s, e, t, n);
  if (Ze(r)) {
    if (a === "")
      return e.forceBlockIndent = !0, Ye(s, e, t, n);
    if (l && a === c)
      return he(r, e);
  }
  const d = r.replace(/\n+/g, `$&
${a}`);
  if (o) {
    const u = (f) => f.default && f.tag !== "tag:yaml.org,2002:str" && f.test?.test(d), { compat: y, tags: w } = e.doc.schema;
    if (w.some(u) || y?.some(u))
      return he(r, e);
  }
  return l ? d : ze(d, a, os, Xe(e, !1));
}
function Et(s, e, t, n) {
  const { implicitKey: i, inFlow: r } = e, o = typeof s.value == "string" ? s : Object.assign({}, s, { value: String(s.value) });
  let { type: l } = s;
  l !== v.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (l = v.QUOTE_DOUBLE);
  const a = (g) => {
    switch (g) {
      case v.BLOCK_FOLDED:
      case v.BLOCK_LITERAL:
        return i || r ? he(o.value, e) : Ye(o, e, t, n);
      case v.QUOTE_DOUBLE:
        return Le(o.value, e);
      case v.QUOTE_SINGLE:
        return mt(o.value, e);
      case v.PLAIN:
        return tn(o, e, t, n);
      default:
        return null;
    }
  };
  let c = a(l);
  if (c === null) {
    const { defaultKeyType: g, defaultStringType: d } = e.options, u = i && g || d;
    if (c = a(u), c === null)
      throw new Error(`Unsupported default string type ${u}`);
  }
  return c;
}
function as(s, e) {
  const t = Object.assign({
    blockQuote: !0,
    commentString: Zs,
    defaultKeyType: null,
    defaultStringType: "PLAIN",
    directives: null,
    doubleQuotedAsJSON: !1,
    doubleQuotedMinMultiLineLength: 40,
    falseStr: "false",
    flowCollectionPadding: !0,
    indentSeq: !0,
    lineWidth: 80,
    minContentWidth: 20,
    nullStr: "null",
    simpleKeys: !1,
    singleQuote: null,
    trailingComma: !1,
    trueStr: "true",
    verifyAliasOrder: !0
  }, s.schema.toStringOptions, e);
  let n;
  switch (t.collectionStyle) {
    case "block":
      n = !1;
      break;
    case "flow":
      n = !0;
      break;
    default:
      n = null;
  }
  return {
    anchors: /* @__PURE__ */ new Set(),
    doc: s,
    flowCollectionPadding: t.flowCollectionPadding ? " " : "",
    indent: "",
    indentStep: typeof t.indent == "number" ? " ".repeat(t.indent) : "  ",
    inFlow: n,
    options: t
  };
}
function sn(s, e) {
  if (e.tag) {
    const i = s.filter((r) => r.tag === e.tag);
    if (i.length > 0)
      return i.find((r) => r.format === e.format) ?? i[0];
  }
  let t, n;
  if (T(e)) {
    n = e.value;
    let i = s.filter((r) => r.identify?.(n));
    if (i.length > 1) {
      const r = i.filter((o) => o.test);
      r.length > 0 && (i = r);
    }
    t = i.find((r) => r.format === e.format) ?? i.find((r) => !r.format);
  } else
    n = e, t = s.find((i) => i.nodeClass && n instanceof i.nodeClass);
  if (!t) {
    const i = n?.constructor?.name ?? (n === null ? "null" : typeof n);
    throw new Error(`Tag not resolved for ${i} value`);
  }
  return t;
}
function nn(s, e, { anchors: t, doc: n }) {
  if (!n.directives)
    return "";
  const i = [], r = (T(s) || C(s)) && s.anchor;
  r && ts(r) && (t.add(r), i.push(`&${r}`));
  const o = s.tag ?? (e.default ? null : e.tag);
  return o && i.push(n.directives.tagString(o)), i.join(" ");
}
function ge(s, e, t, n) {
  if (_(s))
    return s.toString(e, t, n);
  if (we(s)) {
    if (e.doc.directives)
      return s.toString(e);
    if (e.resolvedAliases?.has(s))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    e.resolvedAliases ? e.resolvedAliases.add(s) : e.resolvedAliases = /* @__PURE__ */ new Set([s]), s = s.resolve(e.doc);
  }
  let i;
  const r = M(s) ? s : e.doc.createNode(s, { onTagObj: (a) => i = a });
  i ?? (i = sn(e.doc.schema.tags, r));
  const o = nn(r, i, e);
  o.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + o.length + 1);
  const l = typeof i.stringify == "function" ? i.stringify(r, e, t, n) : T(r) ? Et(r, e, t, n) : r.toString(e, t, n);
  return o ? T(r) || l[0] === "{" || l[0] === "[" ? `${o} ${l}` : `${o}
${e.indent}${l}` : l;
}
function rn({ key: s, value: e }, t, n, i) {
  const { allNullValues: r, doc: o, indent: l, indentStep: a, options: { commentString: c, indentSeq: g, simpleKeys: d } } = t;
  let u = M(s) && s.comment || null;
  if (d) {
    if (u)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (C(s) || !M(s) && typeof s == "object") {
      const O = "With simple keys, collection cannot be used as a key value";
      throw new Error(O);
    }
  }
  let y = !d && (!s || u && e == null && !t.inFlow || C(s) || (T(s) ? s.type === v.BLOCK_FOLDED || s.type === v.BLOCK_LITERAL : typeof s == "object"));
  t = Object.assign({}, t, {
    allNullValues: !1,
    implicitKey: !y && (d || !r),
    indent: l + a
  });
  let w = !1, f = !1, p = ge(s, t, () => w = !0, () => f = !0);
  if (!y && !t.inFlow && p.length > 1024) {
    if (d)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    y = !0;
  }
  if (t.inFlow) {
    if (r || e == null)
      return w && n && n(), p === "" ? "?" : y ? `? ${p}` : p;
  } else if (r && !d || e == null && y)
    return p = `? ${p}`, u && !w ? p += ie(p, t.indent, c(u)) : f && i && i(), p;
  w && (u = null), y ? (u && (p += ie(p, t.indent, c(u))), p = `? ${p}
${l}:`) : (p = `${p}:`, u && (p += ie(p, t.indent, c(u))));
  let h, b, m;
  M(e) ? (h = !!e.spaceBefore, b = e.commentBefore, m = e.comment) : (h = !1, b = null, m = null, e && typeof e == "object" && (e = o.createNode(e))), t.implicitKey = !1, !y && !u && T(e) && (t.indentAtStart = p.length + 1), f = !1, !g && a.length >= 2 && !t.inFlow && !y && _e(e) && !e.flow && !e.tag && !e.anchor && (t.indent = t.indent.substring(2));
  let k = !1;
  const S = ge(e, t, () => k = !0, () => f = !0);
  let N = " ";
  if (u || h || b) {
    if (N = h ? `
` : "", b) {
      const O = c(b);
      N += `
${Q(O, t.indent)}`;
    }
    S === "" && !t.inFlow ? N === `
` && m && (N = `

`) : N += `
${t.indent}`;
  } else if (!y && C(e)) {
    const O = S[0], $ = S.indexOf(`
`), E = $ !== -1, A = t.inFlow ?? e.flow ?? e.items.length === 0;
    if (E || !A) {
      let I = !1;
      if (E && (O === "&" || O === "!")) {
        let L = S.indexOf(" ");
        O === "&" && L !== -1 && L < $ && S[L + 1] === "!" && (L = S.indexOf(" ", L + 1)), (L === -1 || $ < L) && (I = !0);
      }
      I || (N = `
${t.indent}`);
    }
  } else (S === "" || S[0] === `
`) && (N = "");
  return p += N + S, t.inFlow ? k && n && n() : m && !k ? p += ie(p, t.indent, c(m)) : f && i && i(), p;
}
function on(s, e) {
  (s === "debug" || s === "warn") && console.warn(e);
}
const xe = "<<", z = {
  identify: (s) => s === xe || typeof s == "symbol" && s.description === xe,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new v(Symbol(xe)), {
    addToJSMap: ls
  }),
  stringify: () => xe
}, an = (s, e) => (z.identify(e) || T(e) && (!e.type || e.type === v.PLAIN) && z.identify(e.value)) && s?.doc.schema.tags.some((t) => t.tag === z.tag && t.default);
function ls(s, e, t) {
  const n = cs(s, t);
  if (_e(n))
    for (const i of n.items)
      at(s, e, i);
  else if (Array.isArray(n))
    for (const i of n)
      at(s, e, i);
  else
    at(s, e, n);
}
function at(s, e, t) {
  const n = cs(s, t);
  if (!Me(n))
    throw new Error("Merge sources must be maps or map aliases");
  const i = n.toJSON(null, s, Map);
  for (const [r, o] of i)
    e instanceof Map ? e.has(r) || e.set(r, o) : e instanceof Set ? e.add(r) : Object.prototype.hasOwnProperty.call(e, r) || Object.defineProperty(e, r, {
      value: o,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  return e;
}
function cs(s, e) {
  return s && we(e) ? e.resolve(s.doc, s) : e;
}
function fs(s, e, { key: t, value: n }) {
  if (M(t) && t.addToJSMap)
    t.addToJSMap(s, e, n);
  else if (an(s, t))
    ls(s, e, n);
  else {
    const i = U(t, "", s);
    if (e instanceof Map)
      e.set(i, U(n, i, s));
    else if (e instanceof Set)
      e.add(i);
    else {
      const r = ln(t, i, s), o = U(n, r, s);
      r in e ? Object.defineProperty(e, r, {
        value: o,
        writable: !0,
        enumerable: !0,
        configurable: !0
      }) : e[r] = o;
    }
  }
  return e;
}
function ln(s, e, t) {
  if (e === null)
    return "";
  if (typeof e != "object")
    return String(e);
  if (M(s) && t?.doc) {
    const n = as(t.doc, {});
    n.anchors = /* @__PURE__ */ new Set();
    for (const r of t.anchors.keys())
      n.anchors.add(r.anchor);
    n.inFlow = !0, n.inStringifyKey = !0;
    const i = s.toString(n);
    if (!t.mapKeyWarned) {
      let r = JSON.stringify(i);
      r.length > 40 && (r = r.substring(0, 36) + '..."'), on(t.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`), t.mapKeyWarned = !0;
    }
    return i;
  }
  return JSON.stringify(e);
}
function Ot(s, e, t) {
  const n = Te(s, void 0, t), i = Te(e, void 0, t);
  return new D(n, i);
}
class D {
  constructor(e, t = null) {
    Object.defineProperty(this, V, { value: Zt }), this.key = e, this.value = t;
  }
  clone(e) {
    let { key: t, value: n } = this;
    return M(t) && (t = t.clone(e)), M(n) && (n = n.clone(e)), new D(t, n);
  }
  toJSON(e, t) {
    const n = t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return fs(t, n, this);
  }
  toString(e, t, n) {
    return e?.doc ? rn(this, e, t, n) : JSON.stringify(this);
  }
}
function us(s, e, t) {
  return (e.inFlow ?? s.flow ? fn : cn)(s, e, t);
}
function cn({ comment: s, items: e }, t, { blockItemPrefix: n, flowChars: i, itemIndent: r, onChompKeep: o, onComment: l }) {
  const { indent: a, options: { commentString: c } } = t, g = Object.assign({}, t, { indent: r, type: null });
  let d = !1;
  const u = [];
  for (let w = 0; w < e.length; ++w) {
    const f = e[w];
    let p = null;
    if (M(f))
      !d && f.spaceBefore && u.push(""), Ge(t, u, f.commentBefore, d), f.comment && (p = f.comment);
    else if (_(f)) {
      const b = M(f.key) ? f.key : null;
      b && (!d && b.spaceBefore && u.push(""), Ge(t, u, b.commentBefore, d));
    }
    d = !1;
    let h = ge(f, g, () => p = null, () => d = !0);
    p && (h += ie(h, r, c(p))), d && p && (d = !1), u.push(n + h);
  }
  let y;
  if (u.length === 0)
    y = i.start + i.end;
  else {
    y = u[0];
    for (let w = 1; w < u.length; ++w) {
      const f = u[w];
      y += f ? `
${a}${f}` : `
`;
    }
  }
  return s ? (y += `
` + Q(c(s), a), l && l()) : d && o && o(), y;
}
function fn({ items: s }, e, { flowChars: t, itemIndent: n }) {
  const { indent: i, indentStep: r, flowCollectionPadding: o, options: { commentString: l } } = e;
  n += r;
  const a = Object.assign({}, e, {
    indent: n,
    inFlow: !0,
    type: null
  });
  let c = !1, g = 0;
  const d = [];
  for (let w = 0; w < s.length; ++w) {
    const f = s[w];
    let p = null;
    if (M(f))
      f.spaceBefore && d.push(""), Ge(e, d, f.commentBefore, !1), f.comment && (p = f.comment);
    else if (_(f)) {
      const b = M(f.key) ? f.key : null;
      b && (b.spaceBefore && d.push(""), Ge(e, d, b.commentBefore, !1), b.comment && (c = !0));
      const m = M(f.value) ? f.value : null;
      m ? (m.comment && (p = m.comment), m.commentBefore && (c = !0)) : f.value == null && b?.comment && (p = b.comment);
    }
    p && (c = !0);
    let h = ge(f, a, () => p = null);
    c || (c = d.length > g || h.includes(`
`)), w < s.length - 1 ? h += "," : e.options.trailingComma && (e.options.lineWidth > 0 && (c || (c = d.reduce((b, m) => b + m.length + 2, 2) + (h.length + 2) > e.options.lineWidth)), c && (h += ",")), p && (h += ie(h, n, l(p))), d.push(h), g = d.length;
  }
  const { start: u, end: y } = t;
  if (d.length === 0)
    return u + y;
  if (!c) {
    const w = d.reduce((f, p) => f + p.length + 2, 2);
    c = e.options.lineWidth > 0 && w > e.options.lineWidth;
  }
  if (c) {
    let w = u;
    for (const f of d)
      w += f ? `
${r}${i}${f}` : `
`;
    return `${w}
${i}${y}`;
  } else
    return `${u}${o}${d.join(" ")}${o}${y}`;
}
function Ge({ indent: s, options: { commentString: e } }, t, n, i) {
  if (n && i && (n = n.replace(/^\n+/, "")), n) {
    const r = Q(e(n), s);
    t.push(r.trimStart());
  }
}
function re(s, e) {
  const t = T(e) ? e.value : e;
  for (const n of s)
    if (_(n) && (n.key === e || n.key === t || T(n.key) && n.key.value === t))
      return n;
}
class F extends rs {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(e) {
    super(te, e), this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(e, t, n) {
    const { keepUndefined: i, replacer: r } = n, o = new this(e), l = (a, c) => {
      if (typeof r == "function")
        c = r.call(t, a, c);
      else if (Array.isArray(r) && !r.includes(a))
        return;
      (c !== void 0 || i) && o.items.push(Ot(a, c, n));
    };
    if (t instanceof Map)
      for (const [a, c] of t)
        l(a, c);
    else if (t && typeof t == "object")
      for (const a of Object.keys(t))
        l(a, t[a]);
    return typeof e.sortMapEntries == "function" && o.items.sort(e.sortMapEntries), o;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(e, t) {
    let n;
    _(e) ? n = e : !e || typeof e != "object" || !("key" in e) ? n = new D(e, e?.value) : n = new D(e.key, e.value);
    const i = re(this.items, n.key), r = this.schema?.sortMapEntries;
    if (i) {
      if (!t)
        throw new Error(`Key ${n.key} already set`);
      T(i.value) && is(n.value) ? i.value.value = n.value : i.value = n.value;
    } else if (r) {
      const o = this.items.findIndex((l) => r(n, l) < 0);
      o === -1 ? this.items.push(n) : this.items.splice(o, 0, n);
    } else
      this.items.push(n);
  }
  delete(e) {
    const t = re(this.items, e);
    return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
  }
  get(e, t) {
    const i = re(this.items, e)?.value;
    return (!t && T(i) ? i.value : i) ?? void 0;
  }
  has(e) {
    return !!re(this.items, e);
  }
  set(e, t) {
    this.add(new D(e, t), !0);
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(e, t, n) {
    const i = n ? new n() : t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    t?.onCreate && t.onCreate(i);
    for (const r of this.items)
      fs(t, i, r);
    return i;
  }
  toString(e, t, n) {
    if (!e)
      return JSON.stringify(this);
    for (const i of this.items)
      if (!_(i))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);
    return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), us(this, e, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: e.indent || "",
      onChompKeep: n,
      onComment: t
    });
  }
}
const ke = {
  collection: "map",
  default: !0,
  nodeClass: F,
  tag: "tag:yaml.org,2002:map",
  resolve(s, e) {
    return Me(s) || e("Expected a mapping for this tag"), s;
  },
  createNode: (s, e, t) => F.from(s, e, t)
};
class oe extends rs {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(e) {
    super(be, e), this.items = [];
  }
  add(e) {
    this.items.push(e);
  }
  /**
   * Removes a value from the collection.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   *
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    const t = Pe(e);
    return typeof t != "number" ? !1 : this.items.splice(t, 1).length > 0;
  }
  get(e, t) {
    const n = Pe(e);
    if (typeof n != "number")
      return;
    const i = this.items[n];
    return !t && T(i) ? i.value : i;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(e) {
    const t = Pe(e);
    return typeof t == "number" && t < this.items.length;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   *
   * If `key` does not contain a representation of an integer, this will throw.
   * It may be wrapped in a `Scalar`.
   */
  set(e, t) {
    const n = Pe(e);
    if (typeof n != "number")
      throw new Error(`Expected a valid index, not ${e}.`);
    const i = this.items[n];
    T(i) && is(t) ? i.value = t : this.items[n] = t;
  }
  toJSON(e, t) {
    const n = [];
    t?.onCreate && t.onCreate(n);
    let i = 0;
    for (const r of this.items)
      n.push(U(r, String(i++), t));
    return n;
  }
  toString(e, t, n) {
    return e ? us(this, e, {
      blockItemPrefix: "- ",
      flowChars: { start: "[", end: "]" },
      itemIndent: (e.indent || "") + "  ",
      onChompKeep: n,
      onComment: t
    }) : JSON.stringify(this);
  }
  static from(e, t, n) {
    const { replacer: i } = n, r = new this(e);
    if (t && Symbol.iterator in Object(t)) {
      let o = 0;
      for (let l of t) {
        if (typeof i == "function") {
          const a = t instanceof Set ? l : String(o++);
          l = i.call(t, a, l);
        }
        r.items.push(Te(l, void 0, n));
      }
    }
    return r;
  }
}
function Pe(s) {
  let e = T(s) ? s.value : s;
  return e && typeof e == "string" && (e = Number(e)), typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
const Se = {
  collection: "seq",
  default: !0,
  nodeClass: oe,
  tag: "tag:yaml.org,2002:seq",
  resolve(s, e) {
    return _e(s) || e("Expected a sequence for this tag"), s;
  },
  createNode: (s, e, t) => oe.from(s, e, t)
}, et = {
  identify: (s) => typeof s == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (s) => s,
  stringify(s, e, t, n) {
    return e = Object.assign({ actualString: !0 }, e), Et(s, e, t, n);
  }
}, tt = {
  identify: (s) => s == null,
  createNode: () => new v(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new v(null),
  stringify: ({ source: s }, e) => typeof s == "string" && tt.test.test(s) ? s : e.options.nullStr
}, At = {
  identify: (s) => typeof s == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (s) => new v(s[0] === "t" || s[0] === "T"),
  stringify({ source: s, value: e }, t) {
    if (s && At.test.test(s)) {
      const n = s[0] === "t" || s[0] === "T";
      if (e === n)
        return s;
    }
    return e ? t.options.trueStr : t.options.falseStr;
  }
};
function J({ format: s, minFractionDigits: e, tag: t, value: n }) {
  if (typeof n == "bigint")
    return String(n);
  const i = typeof n == "number" ? n : Number(n);
  if (!isFinite(i))
    return isNaN(i) ? ".nan" : i < 0 ? "-.inf" : ".inf";
  let r = Object.is(n, -0) ? "-0" : JSON.stringify(n);
  if (!s && e && (!t || t === "tag:yaml.org,2002:float") && /^-?\d/.test(r) && !r.includes("e")) {
    let o = r.indexOf(".");
    o < 0 && (o = r.length, r += ".");
    let l = e - (r.length - o - 1);
    for (; l-- > 0; )
      r += "0";
  }
  return r;
}
const hs = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: J
}, ds = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (s) => parseFloat(s),
  stringify(s) {
    const e = Number(s.value);
    return isFinite(e) ? e.toExponential() : J(s);
  }
}, ps = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(s) {
    const e = new v(parseFloat(s)), t = s.indexOf(".");
    return t !== -1 && s[s.length - 1] === "0" && (e.minFractionDigits = s.length - t - 1), e;
  },
  stringify: J
}, st = (s) => typeof s == "bigint" || Number.isInteger(s), vt = (s, e, t, { intAsBigInt: n }) => n ? BigInt(s) : parseInt(s.substring(e), t);
function ms(s, e, t) {
  const { value: n } = s;
  return st(n) && n >= 0 ? t + n.toString(e) : J(s);
}
const gs = {
  identify: (s) => st(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (s, e, t) => vt(s, 2, 8, t),
  stringify: (s) => ms(s, 8, "0o")
}, ys = {
  identify: st,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (s, e, t) => vt(s, 0, 10, t),
  stringify: J
}, bs = {
  identify: (s) => st(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (s, e, t) => vt(s, 2, 16, t),
  stringify: (s) => ms(s, 16, "0x")
}, un = [
  ke,
  Se,
  et,
  tt,
  At,
  gs,
  ys,
  bs,
  hs,
  ds,
  ps
];
function Pt(s) {
  return typeof s == "bigint" || Number.isInteger(s);
}
const Ke = ({ value: s }) => JSON.stringify(s), hn = [
  {
    identify: (s) => typeof s == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (s) => s,
    stringify: Ke
  },
  {
    identify: (s) => s == null,
    createNode: () => new v(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: Ke
  },
  {
    identify: (s) => typeof s == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (s) => s === "true",
    stringify: Ke
  },
  {
    identify: Pt,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (s, e, { intAsBigInt: t }) => t ? BigInt(s) : parseInt(s, 10),
    stringify: ({ value: s }) => Pt(s) ? s.toString() : JSON.stringify(s)
  },
  {
    identify: (s) => typeof s == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (s) => parseFloat(s),
    stringify: Ke
  }
], dn = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(s, e) {
    return e(`Unresolved plain scalar ${JSON.stringify(s)}`), s;
  }
}, pn = [ke, Se].concat(hn, dn), It = {
  identify: (s) => s instanceof Uint8Array,
  // Buffer inherits from Uint8Array
  default: !1,
  tag: "tag:yaml.org,2002:binary",
  /**
   * Returns a Buffer in node and an Uint8Array in browsers
   *
   * To use the resulting buffer as an image, you'll want to do something like:
   *
   *   const blob = new Blob([buffer], { type: 'image/jpeg' })
   *   document.querySelector('#photo').src = URL.createObjectURL(blob)
   */
  resolve(s, e) {
    if (typeof atob == "function") {
      const t = atob(s.replace(/[\n\r]/g, "")), n = new Uint8Array(t.length);
      for (let i = 0; i < t.length; ++i)
        n[i] = t.charCodeAt(i);
      return n;
    } else
      return e("This environment does not support reading binary tags; either Buffer or atob is required"), s;
  },
  stringify({ comment: s, type: e, value: t }, n, i, r) {
    if (!t)
      return "";
    const o = t;
    let l;
    if (typeof btoa == "function") {
      let a = "";
      for (let c = 0; c < o.length; ++c)
        a += String.fromCharCode(o[c]);
      l = btoa(a);
    } else
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (e ?? (e = v.BLOCK_LITERAL), e !== v.QUOTE_DOUBLE) {
      const a = Math.max(n.options.lineWidth - n.indent.length, n.options.minContentWidth), c = Math.ceil(l.length / a), g = new Array(c);
      for (let d = 0, u = 0; d < c; ++d, u += a)
        g[d] = l.substr(u, a);
      l = g.join(e === v.BLOCK_LITERAL ? `
` : " ");
    }
    return Et({ comment: s, type: e, value: l }, n, i, r);
  }
};
function ws(s, e) {
  if (_e(s))
    for (let t = 0; t < s.items.length; ++t) {
      let n = s.items[t];
      if (!_(n)) {
        if (Me(n)) {
          n.items.length > 1 && e("Each pair must have its own sequence indicator");
          const i = n.items[0] || new D(new v(null));
          if (n.commentBefore && (i.key.commentBefore = i.key.commentBefore ? `${n.commentBefore}
${i.key.commentBefore}` : n.commentBefore), n.comment) {
            const r = i.value ?? i.key;
            r.comment = r.comment ? `${n.comment}
${r.comment}` : n.comment;
          }
          n = i;
        }
        s.items[t] = _(n) ? n : new D(n);
      }
    }
  else
    e("Expected a sequence for this tag");
  return s;
}
function $s(s, e, t) {
  const { replacer: n } = t, i = new oe(s);
  i.tag = "tag:yaml.org,2002:pairs";
  let r = 0;
  if (e && Symbol.iterator in Object(e))
    for (let o of e) {
      typeof n == "function" && (o = n.call(e, String(r++), o));
      let l, a;
      if (Array.isArray(o))
        if (o.length === 2)
          l = o[0], a = o[1];
        else
          throw new TypeError(`Expected [key, value] tuple: ${o}`);
      else if (o && o instanceof Object) {
        const c = Object.keys(o);
        if (c.length === 1)
          l = c[0], a = o[l];
        else
          throw new TypeError(`Expected tuple with one key, not ${c.length} keys`);
      } else
        l = o;
      i.items.push(Ot(l, a, t));
    }
  return i;
}
const Lt = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: ws,
  createNode: $s
};
class pe extends oe {
  constructor() {
    super(), this.add = F.prototype.add.bind(this), this.delete = F.prototype.delete.bind(this), this.get = F.prototype.get.bind(this), this.has = F.prototype.has.bind(this), this.set = F.prototype.set.bind(this), this.tag = pe.tag;
  }
  /**
   * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
   * but TypeScript won't allow widening the signature of a child method.
   */
  toJSON(e, t) {
    if (!t)
      return super.toJSON(e);
    const n = /* @__PURE__ */ new Map();
    t?.onCreate && t.onCreate(n);
    for (const i of this.items) {
      let r, o;
      if (_(i) ? (r = U(i.key, "", t), o = U(i.value, r, t)) : r = U(i, "", t), n.has(r))
        throw new Error("Ordered maps must not include duplicate keys");
      n.set(r, o);
    }
    return n;
  }
  static from(e, t, n) {
    const i = $s(e, t, n), r = new this();
    return r.items = i.items, r;
  }
}
pe.tag = "tag:yaml.org,2002:omap";
const Tt = {
  collection: "seq",
  identify: (s) => s instanceof Map,
  nodeClass: pe,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(s, e) {
    const t = ws(s, e), n = [];
    for (const { key: i } of t.items)
      T(i) && (n.includes(i.value) ? e(`Ordered maps must not include duplicate keys: ${i.value}`) : n.push(i.value));
    return Object.assign(new pe(), t);
  },
  createNode: (s, e, t) => pe.from(s, e, t)
};
function ks({ value: s, source: e }, t) {
  return e && (s ? Ss : Ns).test.test(e) ? e : s ? t.options.trueStr : t.options.falseStr;
}
const Ss = {
  identify: (s) => s === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new v(!0),
  stringify: ks
}, Ns = {
  identify: (s) => s === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new v(!1),
  stringify: ks
}, mn = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: J
}, gn = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (s) => parseFloat(s.replace(/_/g, "")),
  stringify(s) {
    const e = Number(s.value);
    return isFinite(e) ? e.toExponential() : J(s);
  }
}, yn = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(s) {
    const e = new v(parseFloat(s.replace(/_/g, ""))), t = s.indexOf(".");
    if (t !== -1) {
      const n = s.substring(t + 1).replace(/_/g, "");
      n[n.length - 1] === "0" && (e.minFractionDigits = n.length);
    }
    return e;
  },
  stringify: J
}, je = (s) => typeof s == "bigint" || Number.isInteger(s);
function nt(s, e, t, { intAsBigInt: n }) {
  const i = s[0];
  if ((i === "-" || i === "+") && (e += 1), s = s.substring(e).replace(/_/g, ""), n) {
    switch (t) {
      case 2:
        s = `0b${s}`;
        break;
      case 8:
        s = `0o${s}`;
        break;
      case 16:
        s = `0x${s}`;
        break;
    }
    const o = BigInt(s);
    return i === "-" ? BigInt(-1) * o : o;
  }
  const r = parseInt(s, t);
  return i === "-" ? -1 * r : r;
}
function Ct(s, e, t) {
  const { value: n } = s;
  if (je(n)) {
    const i = n.toString(e);
    return n < 0 ? "-" + t + i.substr(1) : t + i;
  }
  return J(s);
}
const bn = {
  identify: je,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (s, e, t) => nt(s, 2, 2, t),
  stringify: (s) => Ct(s, 2, "0b")
}, wn = {
  identify: je,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (s, e, t) => nt(s, 1, 8, t),
  stringify: (s) => Ct(s, 8, "0")
}, $n = {
  identify: je,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (s, e, t) => nt(s, 0, 10, t),
  stringify: J
}, kn = {
  identify: je,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (s, e, t) => nt(s, 2, 16, t),
  stringify: (s) => Ct(s, 16, "0x")
};
class me extends F {
  constructor(e) {
    super(e), this.tag = me.tag;
  }
  add(e) {
    let t;
    _(e) ? t = e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? t = new D(e.key, null) : t = new D(e, null), re(this.items, t.key) || this.items.push(t);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(e, t) {
    const n = re(this.items, e);
    return !t && _(n) ? T(n.key) ? n.key.value : n.key : n;
  }
  set(e, t) {
    if (typeof t != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
    const n = re(this.items, e);
    n && !t ? this.items.splice(this.items.indexOf(n), 1) : !n && t && this.items.push(new D(e));
  }
  toJSON(e, t) {
    return super.toJSON(e, t, Set);
  }
  toString(e, t, n) {
    if (!e)
      return JSON.stringify(this);
    if (this.hasAllNullValues(!0))
      return super.toString(Object.assign({}, e, { allNullValues: !0 }), t, n);
    throw new Error("Set items must all have null values");
  }
  static from(e, t, n) {
    const { replacer: i } = n, r = new this(e);
    if (t && Symbol.iterator in Object(t))
      for (let o of t)
        typeof i == "function" && (o = i.call(t, o, o)), r.items.push(Ot(o, null, n));
    return r;
  }
}
me.tag = "tag:yaml.org,2002:set";
const Mt = {
  collection: "map",
  identify: (s) => s instanceof Set,
  nodeClass: me,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (s, e, t) => me.from(s, e, t),
  resolve(s, e) {
    if (Me(s)) {
      if (s.hasAllNullValues(!0))
        return Object.assign(new me(), s);
      e("Set items must all have null values");
    } else
      e("Expected a mapping for this tag");
    return s;
  }
};
function _t(s, e) {
  const t = s[0], n = t === "-" || t === "+" ? s.substring(1) : s, i = (o) => e ? BigInt(o) : Number(o), r = n.replace(/_/g, "").split(":").reduce((o, l) => o * i(60) + i(l), i(0));
  return t === "-" ? i(-1) * r : r;
}
function Es(s) {
  let { value: e } = s, t = (o) => o;
  if (typeof e == "bigint")
    t = (o) => BigInt(o);
  else if (isNaN(e) || !isFinite(e))
    return J(s);
  let n = "";
  e < 0 && (n = "-", e *= t(-1));
  const i = t(60), r = [e % i];
  return e < 60 ? r.unshift(0) : (e = (e - r[0]) / i, r.unshift(e % i), e >= 60 && (e = (e - r[0]) / i, r.unshift(e))), n + r.map((o) => String(o).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const Os = {
  identify: (s) => typeof s == "bigint" || Number.isInteger(s),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (s, e, { intAsBigInt: t }) => _t(s, t),
  stringify: Es
}, As = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (s) => _t(s, !1),
  stringify: Es
}, it = {
  identify: (s) => s instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(s) {
    const e = s.match(it.test);
    if (!e)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, t, n, i, r, o, l] = e.map(Number), a = e[7] ? Number((e[7] + "00").substr(1, 3)) : 0;
    let c = Date.UTC(t, n - 1, i, r || 0, o || 0, l || 0, a);
    const g = e[8];
    if (g && g !== "Z") {
      let d = _t(g, !1);
      Math.abs(d) < 30 && (d *= 60), c -= 6e4 * d;
    }
    return new Date(c);
  },
  stringify: ({ value: s }) => s?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, Kt = [
  ke,
  Se,
  et,
  tt,
  Ss,
  Ns,
  bn,
  wn,
  $n,
  kn,
  mn,
  gn,
  yn,
  It,
  z,
  Tt,
  Lt,
  Mt,
  Os,
  As,
  it
], Dt = /* @__PURE__ */ new Map([
  ["core", un],
  ["failsafe", [ke, Se, et]],
  ["json", pn],
  ["yaml11", Kt],
  ["yaml-1.1", Kt]
]), qt = {
  binary: It,
  bool: At,
  float: ps,
  floatExp: ds,
  floatNaN: hs,
  floatTime: As,
  int: ys,
  intHex: bs,
  intOct: gs,
  intTime: Os,
  map: ke,
  merge: z,
  null: tt,
  omap: Tt,
  pairs: Lt,
  seq: Se,
  set: Mt,
  timestamp: it
}, Sn = {
  "tag:yaml.org,2002:binary": It,
  "tag:yaml.org,2002:merge": z,
  "tag:yaml.org,2002:omap": Tt,
  "tag:yaml.org,2002:pairs": Lt,
  "tag:yaml.org,2002:set": Mt,
  "tag:yaml.org,2002:timestamp": it
};
function lt(s, e, t) {
  const n = Dt.get(e);
  if (n && !s)
    return t && !n.includes(z) ? n.concat(z) : n.slice();
  let i = n;
  if (!i)
    if (Array.isArray(s))
      i = [];
    else {
      const r = Array.from(Dt.keys()).filter((o) => o !== "yaml11").map((o) => JSON.stringify(o)).join(", ");
      throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`);
    }
  if (Array.isArray(s))
    for (const r of s)
      i = i.concat(r);
  else typeof s == "function" && (i = s(i.slice()));
  return t && (i = i.concat(z)), i.reduce((r, o) => {
    const l = typeof o == "string" ? qt[o] : o;
    if (!l) {
      const a = JSON.stringify(o), c = Object.keys(qt).map((g) => JSON.stringify(g)).join(", ");
      throw new Error(`Unknown custom tag ${a}; use one of ${c}`);
    }
    return r.includes(l) || r.push(l), r;
  }, []);
}
const Nn = (s, e) => s.key < e.key ? -1 : s.key > e.key ? 1 : 0;
class jt {
  constructor({ compat: e, customTags: t, merge: n, resolveKnownTags: i, schema: r, sortMapEntries: o, toStringDefaults: l }) {
    this.compat = Array.isArray(e) ? lt(e, "compat") : e ? lt(null, e) : null, this.name = typeof r == "string" && r || "core", this.knownTags = i ? Sn : {}, this.tags = lt(t, this.name, n), this.toStringOptions = l ?? null, Object.defineProperty(this, te, { value: ke }), Object.defineProperty(this, H, { value: et }), Object.defineProperty(this, be, { value: Se }), this.sortMapEntries = typeof o == "function" ? o : o === !0 ? Nn : null;
  }
  clone() {
    const e = Object.create(jt.prototype, Object.getOwnPropertyDescriptors(this));
    return e.tags = this.tags.slice(), e;
  }
}
function En(s, e) {
  const t = [];
  let n = e.directives === !0;
  if (e.directives !== !1 && s.directives) {
    const a = s.directives.toString(s);
    a ? (t.push(a), n = !0) : s.directives.docStart && (n = !0);
  }
  n && t.push("---");
  const i = as(s, e), { commentString: r } = i.options;
  if (s.commentBefore) {
    t.length !== 1 && t.unshift("");
    const a = r(s.commentBefore);
    t.unshift(Q(a, ""));
  }
  let o = !1, l = null;
  if (s.contents) {
    if (M(s.contents)) {
      if (s.contents.spaceBefore && n && t.push(""), s.contents.commentBefore) {
        const g = r(s.contents.commentBefore);
        t.push(Q(g, ""));
      }
      i.forceBlockIndent = !!s.comment, l = s.contents.comment;
    }
    const a = l ? void 0 : () => o = !0;
    let c = ge(s.contents, i, () => l = null, a);
    l && (c += ie(c, "", r(l))), (c[0] === "|" || c[0] === ">") && t[t.length - 1] === "---" ? t[t.length - 1] = `--- ${c}` : t.push(c);
  } else
    t.push(ge(s.contents, i));
  if (s.directives?.docEnd)
    if (s.comment) {
      const a = r(s.comment);
      a.includes(`
`) ? (t.push("..."), t.push(Q(a, ""))) : t.push(`... ${a}`);
    } else
      t.push("...");
  else {
    let a = s.comment;
    a && o && (a = a.replace(/^\n+/, "")), a && ((!o || l) && t[t.length - 1] !== "" && t.push(""), t.push(Q(r(a), "")));
  }
  return t.join(`
`) + `
`;
}
class rt {
  constructor(e, t, n) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, V, { value: dt });
    let i = null;
    typeof t == "function" || Array.isArray(t) ? i = t : n === void 0 && t && (n = t, t = void 0);
    const r = Object.assign({
      intAsBigInt: !1,
      keepSourceTokens: !1,
      logLevel: "warn",
      prettyErrors: !0,
      strict: !0,
      stringKeys: !1,
      uniqueKeys: !0,
      version: "1.2"
    }, n);
    this.options = r;
    let { version: o } = r;
    n?._directives ? (this.directives = n._directives.atDocument(), this.directives.yaml.explicit && (o = this.directives.yaml.version)) : this.directives = new K({ version: o }), this.setSchema(o, n), this.contents = e === void 0 ? null : this.createNode(e, i, n);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const e = Object.create(rt.prototype, {
      [V]: { value: dt }
    });
    return e.commentBefore = this.commentBefore, e.comment = this.comment, e.errors = this.errors.slice(), e.warnings = this.warnings.slice(), e.options = Object.assign({}, this.options), this.directives && (e.directives = this.directives.clone()), e.schema = this.schema.clone(), e.contents = M(this.contents) ? this.contents.clone(e.schema) : this.contents, this.range && (e.range = this.range.slice()), e;
  }
  /** Adds a value to the document. */
  add(e) {
    ae(this.contents) && this.contents.add(e);
  }
  /** Adds a value to the document. */
  addIn(e, t) {
    ae(this.contents) && this.contents.addIn(e, t);
  }
  /**
   * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
   *
   * If `node` already has an anchor, `name` is ignored.
   * Otherwise, the `node.anchor` value will be set to `name`,
   * or if an anchor with that name is already present in the document,
   * `name` will be used as a prefix for a new unique anchor.
   * If `name` is undefined, the generated anchor will use 'a' as a prefix.
   */
  createAlias(e, t) {
    if (!e.anchor) {
      const n = ss(this);
      e.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !t || n.has(t) ? ns(t || "a", n) : t;
    }
    return new Nt(e.anchor);
  }
  createNode(e, t, n) {
    let i;
    if (typeof t == "function")
      e = t.call({ "": e }, "", e), i = t;
    else if (Array.isArray(t)) {
      const p = (b) => typeof b == "number" || b instanceof String || b instanceof Number, h = t.filter(p).map(String);
      h.length > 0 && (t = t.concat(h)), i = t;
    } else n === void 0 && t && (n = t, t = void 0);
    const { aliasDuplicateObjects: r, anchorPrefix: o, flow: l, keepUndefined: a, onTagObj: c, tag: g } = n ?? {}, { onAnchor: d, setAnchors: u, sourceObjects: y } = Qs(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      o || "a"
    ), w = {
      aliasDuplicateObjects: r ?? !0,
      keepUndefined: a ?? !1,
      onAnchor: d,
      onTagObj: c,
      replacer: i,
      schema: this.schema,
      sourceObjects: y
    }, f = Te(e, g, w);
    return l && C(f) && (f.flow = !0), u(), f;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(e, t, n = {}) {
    const i = this.createNode(e, null, n), r = this.createNode(t, null, n);
    return new D(i, r);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    return ae(this.contents) ? this.contents.delete(e) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    return Ae(e) ? this.contents == null ? !1 : (this.contents = null, !0) : ae(this.contents) ? this.contents.deleteIn(e) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(e, t) {
    return C(this.contents) ? this.contents.get(e, t) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    return Ae(e) ? !t && T(this.contents) ? this.contents.value : this.contents : C(this.contents) ? this.contents.getIn(e, t) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(e) {
    return C(this.contents) ? this.contents.has(e) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(e) {
    return Ae(e) ? this.contents !== void 0 : C(this.contents) ? this.contents.hasIn(e) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(e, t) {
    this.contents == null ? this.contents = Je(this.schema, [e], t) : ae(this.contents) && this.contents.set(e, t);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    Ae(e) ? this.contents = t : this.contents == null ? this.contents = Je(this.schema, Array.from(e), t) : ae(this.contents) && this.contents.setIn(e, t);
  }
  /**
   * Change the YAML version and schema used by the document.
   * A `null` version disables support for directives, explicit tags, anchors, and aliases.
   * It also requires the `schema` option to be given as a `Schema` instance value.
   *
   * Overrides all previously set schema options.
   */
  setSchema(e, t = {}) {
    typeof e == "number" && (e = String(e));
    let n;
    switch (e) {
      case "1.1":
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new K({ version: "1.1" }), n = { resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = e : this.directives = new K({ version: e }), n = { resolveKnownTags: !0, schema: "core" };
        break;
      case null:
        this.directives && delete this.directives, n = null;
        break;
      default: {
        const i = JSON.stringify(e);
        throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`);
      }
    }
    if (t.schema instanceof Object)
      this.schema = t.schema;
    else if (n)
      this.schema = new jt(Object.assign(n, t));
    else
      throw new Error("With a null YAML version, the { schema: Schema } option is required");
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json: e, jsonArg: t, mapAsMap: n, maxAliasCount: i, onAnchor: r, reviver: o } = {}) {
    const l = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !e,
      mapAsMap: n === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof i == "number" ? i : 100
    }, a = U(this.contents, t ?? "", l);
    if (typeof r == "function")
      for (const { count: c, res: g } of l.anchors.values())
        r(g, c);
    return typeof o == "function" ? ue(o, { "": a }, "", a) : a;
  }
  /**
   * A JSON representation of the document `contents`.
   *
   * @param jsonArg Used by `JSON.stringify` to indicate the array index or
   *   property name.
   */
  toJSON(e, t) {
    return this.toJS({ json: !0, jsonArg: e, mapAsMap: !1, onAnchor: t });
  }
  /** A YAML representation of the document. */
  toString(e = {}) {
    if (this.errors.length > 0)
      throw new Error("Document with errors cannot be stringified");
    if ("indent" in e && (!Number.isInteger(e.indent) || Number(e.indent) <= 0)) {
      const t = JSON.stringify(e.indent);
      throw new Error(`"indent" option must be a positive integer, not ${t}`);
    }
    return En(this, e);
  }
}
function ae(s) {
  if (C(s))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class vs extends Error {
  constructor(e, t, n, i) {
    super(), this.name = e, this.code = n, this.message = i, this.pos = t;
  }
}
class ve extends vs {
  constructor(e, t, n) {
    super("YAMLParseError", e, t, n);
  }
}
class On extends vs {
  constructor(e, t, n) {
    super("YAMLWarning", e, t, n);
  }
}
const Rt = (s, e) => (t) => {
  if (t.pos[0] === -1)
    return;
  t.linePos = t.pos.map((l) => e.linePos(l));
  const { line: n, col: i } = t.linePos[0];
  t.message += ` at line ${n}, column ${i}`;
  let r = i - 1, o = s.substring(e.lineStarts[n - 1], e.lineStarts[n]).replace(/[\n\r]+$/, "");
  if (r >= 60 && o.length > 80) {
    const l = Math.min(r - 39, o.length - 79);
    o = "…" + o.substring(l), r -= l - 1;
  }
  if (o.length > 80 && (o = o.substring(0, 79) + "…"), n > 1 && /^ *$/.test(o.substring(0, r))) {
    let l = s.substring(e.lineStarts[n - 2], e.lineStarts[n - 1]);
    l.length > 80 && (l = l.substring(0, 79) + `…
`), o = l + o;
  }
  if (/[^ ]/.test(o)) {
    let l = 1;
    const a = t.linePos[1];
    a?.line === n && a.col > i && (l = Math.max(1, Math.min(a.col - i, 80 - r)));
    const c = " ".repeat(r) + "^".repeat(l);
    t.message += `:

${o}
${c}
`;
  }
};
function ye(s, { flow: e, indicator: t, next: n, offset: i, onError: r, parentIndent: o, startOnNewline: l }) {
  let a = !1, c = l, g = l, d = "", u = "", y = !1, w = !1, f = null, p = null, h = null, b = null, m = null, k = null, S = null;
  for (const $ of s)
    switch (w && ($.type !== "space" && $.type !== "newline" && $.type !== "comma" && r($.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), w = !1), f && (c && $.type !== "comment" && $.type !== "newline" && r(f, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), f = null), $.type) {
      case "space":
        !e && (t !== "doc-start" || n?.type !== "flow-collection") && $.source.includes("	") && (f = $), g = !0;
        break;
      case "comment": {
        g || r($, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const E = $.source.substring(1) || " ";
        d ? d += u + E : d = E, u = "", c = !1;
        break;
      }
      case "newline":
        c ? d ? d += $.source : (!k || t !== "seq-item-ind") && (a = !0) : u += $.source, c = !0, y = !0, (p || h) && (b = $), g = !0;
        break;
      case "anchor":
        p && r($, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), $.source.endsWith(":") && r($.offset + $.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), p = $, S ?? (S = $.offset), c = !1, g = !1, w = !0;
        break;
      case "tag": {
        h && r($, "MULTIPLE_TAGS", "A node can have at most one tag"), h = $, S ?? (S = $.offset), c = !1, g = !1, w = !0;
        break;
      }
      case t:
        (p || h) && r($, "BAD_PROP_ORDER", `Anchors and tags must be after the ${$.source} indicator`), k && r($, "UNEXPECTED_TOKEN", `Unexpected ${$.source} in ${e ?? "collection"}`), k = $, c = t === "seq-item-ind" || t === "explicit-key-ind", g = !1;
        break;
      case "comma":
        if (e) {
          m && r($, "UNEXPECTED_TOKEN", `Unexpected , in ${e}`), m = $, c = !1, g = !1;
          break;
        }
      // else fallthrough
      default:
        r($, "UNEXPECTED_TOKEN", `Unexpected ${$.type} token`), c = !1, g = !1;
    }
  const N = s[s.length - 1], O = N ? N.offset + N.source.length : i;
  return w && n && n.type !== "space" && n.type !== "newline" && n.type !== "comma" && (n.type !== "scalar" || n.source !== "") && r(n.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), f && (c && f.indent <= o || n?.type === "block-map" || n?.type === "block-seq") && r(f, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: m,
    found: k,
    spaceBefore: a,
    comment: d,
    hasNewline: y,
    anchor: p,
    tag: h,
    newlineAfterProp: b,
    end: O,
    start: S ?? O
  };
}
function Ce(s) {
  if (!s)
    return null;
  switch (s.type) {
    case "alias":
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      if (s.source.includes(`
`))
        return !0;
      if (s.end) {
        for (const e of s.end)
          if (e.type === "newline")
            return !0;
      }
      return !1;
    case "flow-collection":
      for (const e of s.items) {
        for (const t of e.start)
          if (t.type === "newline")
            return !0;
        if (e.sep) {
          for (const t of e.sep)
            if (t.type === "newline")
              return !0;
        }
        if (Ce(e.key) || Ce(e.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function yt(s, e, t) {
  if (e?.type === "flow-collection") {
    const n = e.end[0];
    n.indent === s && (n.source === "]" || n.source === "}") && Ce(e) && t(n, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function Is(s, e, t) {
  const { uniqueKeys: n } = s.options;
  if (n === !1)
    return !1;
  const i = typeof n == "function" ? n : (r, o) => r === o || T(r) && T(o) && r.value === o.value;
  return e.some((r) => i(r.key, t));
}
const Ft = "All mapping items must start at the same column";
function An({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = r?.nodeClass ?? F, l = new o(t.schema);
  t.atRoot && (t.atRoot = !1);
  let a = n.offset, c = null;
  for (const g of n.items) {
    const { start: d, key: u, sep: y, value: w } = g, f = ye(d, {
      indicator: "explicit-key-ind",
      next: u ?? y?.[0],
      offset: a,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !0
    }), p = !f.found;
    if (p) {
      if (u && (u.type === "block-seq" ? i(a, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in u && u.indent !== n.indent && i(a, "BAD_INDENT", Ft)), !f.anchor && !f.tag && !y) {
        c = f.end, f.comment && (l.comment ? l.comment += `
` + f.comment : l.comment = f.comment);
        continue;
      }
      (f.newlineAfterProp || Ce(u)) && i(u ?? d[d.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else f.found?.indent !== n.indent && i(a, "BAD_INDENT", Ft);
    t.atKey = !0;
    const h = f.end, b = u ? s(t, u, f, i) : e(t, h, d, null, f, i);
    t.schema.compat && yt(n.indent, u, i), t.atKey = !1, Is(t, l.items, b) && i(h, "DUPLICATE_KEY", "Map keys must be unique");
    const m = ye(y ?? [], {
      indicator: "map-value-ind",
      next: w,
      offset: b.range[2],
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !u || u.type === "block-scalar"
    });
    if (a = m.end, m.found) {
      p && (w?.type === "block-map" && !m.hasNewline && i(a, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), t.options.strict && f.start < m.found.offset - 1024 && i(b.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const k = w ? s(t, w, m, i) : e(t, a, y, null, m, i);
      t.schema.compat && yt(n.indent, w, i), a = k.range[2];
      const S = new D(b, k);
      t.options.keepSourceTokens && (S.srcToken = g), l.items.push(S);
    } else {
      p && i(b.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), m.comment && (b.comment ? b.comment += `
` + m.comment : b.comment = m.comment);
      const k = new D(b);
      t.options.keepSourceTokens && (k.srcToken = g), l.items.push(k);
    }
  }
  return c && c < a && i(c, "IMPOSSIBLE", "Map comment with trailing content"), l.range = [n.offset, a, c ?? a], l;
}
function vn({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = r?.nodeClass ?? oe, l = new o(t.schema);
  t.atRoot && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let a = n.offset, c = null;
  for (const { start: g, value: d } of n.items) {
    const u = ye(g, {
      indicator: "seq-item-ind",
      next: d,
      offset: a,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !0
    });
    if (!u.found)
      if (u.anchor || u.tag || d)
        d?.type === "block-seq" ? i(u.end, "BAD_INDENT", "All sequence items must start at the same column") : i(a, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        c = u.end, u.comment && (l.comment = u.comment);
        continue;
      }
    const y = d ? s(t, d, u, i) : e(t, u.end, g, null, u, i);
    t.schema.compat && yt(n.indent, d, i), a = y.range[2], l.items.push(y);
  }
  return l.range = [n.offset, a, c ?? a], l;
}
function Be(s, e, t, n) {
  let i = "";
  if (s) {
    let r = !1, o = "";
    for (const l of s) {
      const { source: a, type: c } = l;
      switch (c) {
        case "space":
          r = !0;
          break;
        case "comment": {
          t && !r && n(l, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const g = a.substring(1) || " ";
          i ? i += o + g : i = g, o = "";
          break;
        }
        case "newline":
          i && (o += a), r = !0;
          break;
        default:
          n(l, "UNEXPECTED_TOKEN", `Unexpected ${c} at node end`);
      }
      e += a.length;
    }
  }
  return { comment: i, offset: e };
}
const ct = "Block collections are not allowed within flow collections", ft = (s) => s && (s.type === "block-map" || s.type === "block-seq");
function In({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = n.start.source === "{", l = o ? "flow map" : "flow sequence", a = r?.nodeClass ?? (o ? F : oe), c = new a(t.schema);
  c.flow = !0;
  const g = t.atRoot;
  g && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let d = n.offset + n.start.source.length;
  for (let p = 0; p < n.items.length; ++p) {
    const h = n.items[p], { start: b, key: m, sep: k, value: S } = h, N = ye(b, {
      flow: l,
      indicator: "explicit-key-ind",
      next: m ?? k?.[0],
      offset: d,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !1
    });
    if (!N.found) {
      if (!N.anchor && !N.tag && !k && !S) {
        p === 0 && N.comma ? i(N.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${l}`) : p < n.items.length - 1 && i(N.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${l}`), N.comment && (c.comment ? c.comment += `
` + N.comment : c.comment = N.comment), d = N.end;
        continue;
      }
      !o && t.options.strict && Ce(m) && i(
        m,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (p === 0)
      N.comma && i(N.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${l}`);
    else if (N.comma || i(N.start, "MISSING_CHAR", `Missing , between ${l} items`), N.comment) {
      let O = "";
      e: for (const $ of b)
        switch ($.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            O = $.source.substring(1);
            break e;
          default:
            break e;
        }
      if (O) {
        let $ = c.items[c.items.length - 1];
        _($) && ($ = $.value ?? $.key), $.comment ? $.comment += `
` + O : $.comment = O, N.comment = N.comment.substring(O.length + 1);
      }
    }
    if (!o && !k && !N.found) {
      const O = S ? s(t, S, N, i) : e(t, N.end, k, null, N, i);
      c.items.push(O), d = O.range[2], ft(S) && i(O.range, "BLOCK_IN_FLOW", ct);
    } else {
      t.atKey = !0;
      const O = N.end, $ = m ? s(t, m, N, i) : e(t, O, b, null, N, i);
      ft(m) && i($.range, "BLOCK_IN_FLOW", ct), t.atKey = !1;
      const E = ye(k ?? [], {
        flow: l,
        indicator: "map-value-ind",
        next: S,
        offset: $.range[2],
        onError: i,
        parentIndent: n.indent,
        startOnNewline: !1
      });
      if (E.found) {
        if (!o && !N.found && t.options.strict) {
          if (k)
            for (const L of k) {
              if (L === E.found)
                break;
              if (L.type === "newline") {
                i(L, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          N.start < E.found.offset - 1024 && i(E.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else S && ("source" in S && S.source?.[0] === ":" ? i(S, "MISSING_CHAR", `Missing space after : in ${l}`) : i(E.start, "MISSING_CHAR", `Missing , or : between ${l} items`));
      const A = S ? s(t, S, E, i) : E.found ? e(t, E.end, k, null, E, i) : null;
      A ? ft(S) && i(A.range, "BLOCK_IN_FLOW", ct) : E.comment && ($.comment ? $.comment += `
` + E.comment : $.comment = E.comment);
      const I = new D($, A);
      if (t.options.keepSourceTokens && (I.srcToken = h), o) {
        const L = c;
        Is(t, L.items, $) && i(O, "DUPLICATE_KEY", "Map keys must be unique"), L.items.push(I);
      } else {
        const L = new F(t.schema);
        L.flow = !0, L.items.push(I);
        const B = (A ?? $).range;
        L.range = [$.range[0], B[1], B[2]], c.items.push(L);
      }
      d = A ? A.range[2] : E.end;
    }
  }
  const u = o ? "}" : "]", [y, ...w] = n.end;
  let f = d;
  if (y?.source === u)
    f = y.offset + y.source.length;
  else {
    const p = l[0].toUpperCase() + l.substring(1), h = g ? `${p} must end with a ${u}` : `${p} in block collection must be sufficiently indented and end with a ${u}`;
    i(d, g ? "MISSING_CHAR" : "BAD_INDENT", h), y && y.source.length !== 1 && w.unshift(y);
  }
  if (w.length > 0) {
    const p = Be(w, f, t.options.strict, i);
    p.comment && (c.comment ? c.comment += `
` + p.comment : c.comment = p.comment), c.range = [n.offset, f, p.offset];
  } else
    c.range = [n.offset, f, f];
  return c;
}
function ut(s, e, t, n, i, r) {
  const o = t.type === "block-map" ? An(s, e, t, n, r) : t.type === "block-seq" ? vn(s, e, t, n, r) : In(s, e, t, n, r), l = o.constructor;
  return i === "!" || i === l.tagName ? (o.tag = l.tagName, o) : (i && (o.tag = i), o);
}
function Ln(s, e, t, n, i) {
  const r = n.tag, o = r ? e.directives.tagName(r.source, (u) => i(r, "TAG_RESOLVE_FAILED", u)) : null;
  if (t.type === "block-seq") {
    const { anchor: u, newlineAfterProp: y } = n, w = u && r ? u.offset > r.offset ? u : r : u ?? r;
    w && (!y || y.offset < w.offset) && i(w, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const l = t.type === "block-map" ? "map" : t.type === "block-seq" ? "seq" : t.start.source === "{" ? "map" : "seq";
  if (!r || !o || o === "!" || o === F.tagName && l === "map" || o === oe.tagName && l === "seq")
    return ut(s, e, t, i, o);
  let a = e.schema.tags.find((u) => u.tag === o && u.collection === l);
  if (!a) {
    const u = e.schema.knownTags[o];
    if (u?.collection === l)
      e.schema.tags.push(Object.assign({}, u, { default: !1 })), a = u;
    else
      return u ? i(r, "BAD_COLLECTION_TYPE", `${u.tag} used for ${l} collection, but expects ${u.collection ?? "scalar"}`, !0) : i(r, "TAG_RESOLVE_FAILED", `Unresolved tag: ${o}`, !0), ut(s, e, t, i, o);
  }
  const c = ut(s, e, t, i, o, a), g = a.resolve?.(c, (u) => i(r, "TAG_RESOLVE_FAILED", u), e.options) ?? c, d = M(g) ? g : new v(g);
  return d.range = c.range, d.tag = o, a?.format && (d.format = a.format), d;
}
function Tn(s, e, t) {
  const n = e.offset, i = Cn(e, s.options.strict, t);
  if (!i)
    return { value: "", type: null, comment: "", range: [n, n, n] };
  const r = i.mode === ">" ? v.BLOCK_FOLDED : v.BLOCK_LITERAL, o = e.source ? Mn(e.source) : [];
  let l = o.length;
  for (let f = o.length - 1; f >= 0; --f) {
    const p = o[f][1];
    if (p === "" || p === "\r")
      l = f;
    else
      break;
  }
  if (l === 0) {
    const f = i.chomp === "+" && o.length > 0 ? `
`.repeat(Math.max(1, o.length - 1)) : "";
    let p = n + i.length;
    return e.source && (p += e.source.length), { value: f, type: r, comment: i.comment, range: [n, p, p] };
  }
  let a = e.indent + i.indent, c = e.offset + i.length, g = 0;
  for (let f = 0; f < l; ++f) {
    const [p, h] = o[f];
    if (h === "" || h === "\r")
      i.indent === 0 && p.length > a && (a = p.length);
    else {
      p.length < a && t(c + p.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), i.indent === 0 && (a = p.length), g = f, a === 0 && !s.atRoot && t(c, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    c += p.length + h.length + 1;
  }
  for (let f = o.length - 1; f >= l; --f)
    o[f][0].length > a && (l = f + 1);
  let d = "", u = "", y = !1;
  for (let f = 0; f < g; ++f)
    d += o[f][0].slice(a) + `
`;
  for (let f = g; f < l; ++f) {
    let [p, h] = o[f];
    c += p.length + h.length + 1;
    const b = h[h.length - 1] === "\r";
    if (b && (h = h.slice(0, -1)), h && p.length < a) {
      const k = `Block scalar lines must not be less indented than their ${i.indent ? "explicit indentation indicator" : "first line"}`;
      t(c - h.length - (b ? 2 : 1), "BAD_INDENT", k), p = "";
    }
    r === v.BLOCK_LITERAL ? (d += u + p.slice(a) + h, u = `
`) : p.length > a || h[0] === "	" ? (u === " " ? u = `
` : !y && u === `
` && (u = `

`), d += u + p.slice(a) + h, u = `
`, y = !0) : h === "" ? u === `
` ? d += `
` : u = `
` : (d += u + h, u = " ", y = !1);
  }
  switch (i.chomp) {
    case "-":
      break;
    case "+":
      for (let f = l; f < o.length; ++f)
        d += `
` + o[f][0].slice(a);
      d[d.length - 1] !== `
` && (d += `
`);
      break;
    default:
      d += `
`;
  }
  const w = n + i.length + e.source.length;
  return { value: d, type: r, comment: i.comment, range: [n, w, w] };
}
function Cn({ offset: s, props: e }, t, n) {
  if (e[0].type !== "block-scalar-header")
    return n(e[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: i } = e[0], r = i[0];
  let o = 0, l = "", a = -1;
  for (let u = 1; u < i.length; ++u) {
    const y = i[u];
    if (!l && (y === "-" || y === "+"))
      l = y;
    else {
      const w = Number(y);
      !o && w ? o = w : a === -1 && (a = s + u);
    }
  }
  a !== -1 && n(a, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${i}`);
  let c = !1, g = "", d = i.length;
  for (let u = 1; u < e.length; ++u) {
    const y = e[u];
    switch (y.type) {
      case "space":
        c = !0;
      // fallthrough
      case "newline":
        d += y.source.length;
        break;
      case "comment":
        t && !c && n(y, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), d += y.source.length, g = y.source.substring(1);
        break;
      case "error":
        n(y, "UNEXPECTED_TOKEN", y.message), d += y.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const w = `Unexpected token in block scalar header: ${y.type}`;
        n(y, "UNEXPECTED_TOKEN", w);
        const f = y.source;
        f && typeof f == "string" && (d += f.length);
      }
    }
  }
  return { mode: r, indent: o, chomp: l, comment: g, length: d };
}
function Mn(s) {
  const e = s.split(/\n( *)/), t = e[0], n = t.match(/^( *)/), r = [n?.[1] ? [n[1], t.slice(n[1].length)] : ["", t]];
  for (let o = 1; o < e.length; o += 2)
    r.push([e[o], e[o + 1]]);
  return r;
}
function _n(s, e, t) {
  const { offset: n, type: i, source: r, end: o } = s;
  let l, a;
  const c = (u, y, w) => t(n + u, y, w);
  switch (i) {
    case "scalar":
      l = v.PLAIN, a = jn(r, c);
      break;
    case "single-quoted-scalar":
      l = v.QUOTE_SINGLE, a = Bn(r, c);
      break;
    case "double-quoted-scalar":
      l = v.QUOTE_DOUBLE, a = xn(r, c);
      break;
    /* istanbul ignore next should not happen */
    default:
      return t(s, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${i}`), {
        value: "",
        type: null,
        comment: "",
        range: [n, n + r.length, n + r.length]
      };
  }
  const g = n + r.length, d = Be(o, g, e, t);
  return {
    value: a,
    type: l,
    comment: d.comment,
    range: [n, g, d.offset]
  };
}
function jn(s, e) {
  let t = "";
  switch (s[0]) {
    /* istanbul ignore next should not happen */
    case "	":
      t = "a tab character";
      break;
    case ",":
      t = "flow indicator character ,";
      break;
    case "%":
      t = "directive indicator character %";
      break;
    case "|":
    case ">": {
      t = `block scalar indicator ${s[0]}`;
      break;
    }
    case "@":
    case "`": {
      t = `reserved character ${s[0]}`;
      break;
    }
  }
  return t && e(0, "BAD_SCALAR_START", `Plain value cannot start with ${t}`), Ls(s);
}
function Bn(s, e) {
  return (s[s.length - 1] !== "'" || s.length === 1) && e(s.length, "MISSING_CHAR", "Missing closing 'quote"), Ls(s.slice(1, -1)).replace(/''/g, "'");
}
function Ls(s) {
  const e = /(.*?)\r?\n/sy;
  let t = e.exec(s);
  if (!t)
    return s;
  let n, i;
  try {
    n = new RegExp("(?<![ 	])[ 	]+$"), i = new RegExp("^[ 	]+|(?<![ 	])[ 	]+$", "g");
  } catch {
    n = /[ \t]+$/, i = /^[ \t]+|[ \t]+$/g;
  }
  let r = t[1].replace(n, ""), o = " ", l = e.lastIndex;
  for (; t = e.exec(s); ) {
    const c = t[1].replace(i, "");
    c === "" ? o === `
` ? r += o : o = `
` : (r += o + c, o = " "), l = e.lastIndex;
  }
  const a = /[ \t]*(.*)/sy;
  return a.lastIndex = l, t = a.exec(s), r + o + (t?.[1] ?? "");
}
function xn(s, e) {
  let t = "";
  for (let n = 1; n < s.length - 1; ++n) {
    const i = s[n];
    if (!(i === "\r" && s[n + 1] === `
`))
      if (i === `
`) {
        const { fold: r, offset: o } = Pn(s, n);
        t += r, n = o;
      } else if (i === "\\") {
        let r = s[++n];
        const o = Kn[r];
        if (o)
          t += o;
        else if (r === `
`)
          for (r = s[n + 1]; r === " " || r === "	"; )
            r = s[++n + 1];
        else if (r === "\r" && s[n + 1] === `
`)
          for (r = s[++n + 1]; r === " " || r === "	"; )
            r = s[++n + 1];
        else if (r === "x" || r === "u" || r === "U") {
          const l = r === "x" ? 2 : r === "u" ? 4 : 8;
          t += Dn(s, n + 1, l, e), n += l;
        } else {
          const l = s.substr(n - 1, 2);
          e(n - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${l}`), t += l;
        }
      } else if (i === " " || i === "	") {
        const r = n;
        let o = s[n + 1];
        for (; o === " " || o === "	"; )
          o = s[++n + 1];
        o !== `
` && !(o === "\r" && s[n + 2] === `
`) && (t += n > r ? s.slice(r, n + 1) : i);
      } else
        t += i;
  }
  return (s[s.length - 1] !== '"' || s.length === 1) && e(s.length, "MISSING_CHAR", 'Missing closing "quote'), t;
}
function Pn(s, e) {
  let t = "", n = s[e + 1];
  for (; (n === " " || n === "	" || n === `
` || n === "\r") && !(n === "\r" && s[e + 2] !== `
`); )
    n === `
` && (t += `
`), e += 1, n = s[e + 1];
  return t || (t = " "), { fold: t, offset: e };
}
const Kn = {
  0: "\0",
  // null character
  a: "\x07",
  // bell character
  b: "\b",
  // backspace
  e: "\x1B",
  // escape character
  f: "\f",
  // form feed
  n: `
`,
  // line feed
  r: "\r",
  // carriage return
  t: "	",
  // horizontal tab
  v: "\v",
  // vertical tab
  N: "",
  // Unicode next line
  _: " ",
  // Unicode non-breaking space
  L: "\u2028",
  // Unicode line separator
  P: "\u2029",
  // Unicode paragraph separator
  " ": " ",
  '"': '"',
  "/": "/",
  "\\": "\\",
  "	": "	"
};
function Dn(s, e, t, n) {
  const i = s.substr(e, t), o = i.length === t && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
  try {
    return String.fromCodePoint(o);
  } catch {
    const l = s.substr(e - 2, t + 2);
    return n(e - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${l}`), l;
  }
}
function Ts(s, e, t, n) {
  const { value: i, type: r, comment: o, range: l } = e.type === "block-scalar" ? Tn(s, e, n) : _n(e, s.options.strict, n), a = t ? s.directives.tagName(t.source, (d) => n(t, "TAG_RESOLVE_FAILED", d)) : null;
  let c;
  s.options.stringKeys && s.atKey ? c = s.schema[H] : a ? c = qn(s.schema, i, a, t, n) : e.type === "scalar" ? c = Rn(s, i, e, n) : c = s.schema[H];
  let g;
  try {
    const d = c.resolve(i, (u) => n(t ?? e, "TAG_RESOLVE_FAILED", u), s.options);
    g = T(d) ? d : new v(d);
  } catch (d) {
    const u = d instanceof Error ? d.message : String(d);
    n(t ?? e, "TAG_RESOLVE_FAILED", u), g = new v(i);
  }
  return g.range = l, g.source = i, r && (g.type = r), a && (g.tag = a), c.format && (g.format = c.format), o && (g.comment = o), g;
}
function qn(s, e, t, n, i) {
  if (t === "!")
    return s[H];
  const r = [];
  for (const l of s.tags)
    if (!l.collection && l.tag === t)
      if (l.default && l.test)
        r.push(l);
      else
        return l;
  for (const l of r)
    if (l.test?.test(e))
      return l;
  const o = s.knownTags[t];
  return o && !o.collection ? (s.tags.push(Object.assign({}, o, { default: !1, test: void 0 })), o) : (i(n, "TAG_RESOLVE_FAILED", `Unresolved tag: ${t}`, t !== "tag:yaml.org,2002:str"), s[H]);
}
function Rn({ atKey: s, directives: e, schema: t }, n, i, r) {
  const o = t.tags.find((l) => (l.default === !0 || s && l.default === "key") && l.test?.test(n)) || t[H];
  if (t.compat) {
    const l = t.compat.find((a) => a.default && a.test?.test(n)) ?? t[H];
    if (o.tag !== l.tag) {
      const a = e.tagString(o.tag), c = e.tagString(l.tag), g = `Value may be parsed as either ${a} or ${c}`;
      r(i, "TAG_RESOLVE_FAILED", g, !0);
    }
  }
  return o;
}
function Fn(s, e, t) {
  if (e) {
    t ?? (t = e.length);
    for (let n = t - 1; n >= 0; --n) {
      let i = e[n];
      switch (i.type) {
        case "space":
        case "comment":
        case "newline":
          s -= i.source.length;
          continue;
      }
      for (i = e[++n]; i?.type === "space"; )
        s += i.source.length, i = e[++n];
      break;
    }
  }
  return s;
}
const Un = { composeNode: Cs, composeEmptyNode: Bt };
function Cs(s, e, t, n) {
  const i = s.atKey, { spaceBefore: r, comment: o, anchor: l, tag: a } = t;
  let c, g = !0;
  switch (e.type) {
    case "alias":
      c = Vn(s, e, n), (l || a) && n(e, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      c = Ts(s, e, a, n), l && (c.anchor = l.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        c = Ln(Un, s, e, t, n), l && (c.anchor = l.source.substring(1));
      } catch (d) {
        const u = d instanceof Error ? d.message : String(d);
        n(e, "RESOURCE_EXHAUSTION", u);
      }
      break;
    default: {
      const d = e.type === "error" ? e.message : `Unsupported token (type: ${e.type})`;
      n(e, "UNEXPECTED_TOKEN", d), g = !1;
    }
  }
  return c ?? (c = Bt(s, e.offset, void 0, null, t, n)), l && c.anchor === "" && n(l, "BAD_ALIAS", "Anchor cannot be an empty string"), i && s.options.stringKeys && (!T(c) || typeof c.value != "string" || c.tag && c.tag !== "tag:yaml.org,2002:str") && n(a ?? e, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), r && (c.spaceBefore = !0), o && (e.type === "scalar" && e.source === "" ? c.comment = o : c.commentBefore = o), s.options.keepSourceTokens && g && (c.srcToken = e), c;
}
function Bt(s, e, t, n, { spaceBefore: i, comment: r, anchor: o, tag: l, end: a }, c) {
  const g = {
    type: "scalar",
    offset: Fn(e, t, n),
    indent: -1,
    source: ""
  }, d = Ts(s, g, l, c);
  return o && (d.anchor = o.source.substring(1), d.anchor === "" && c(o, "BAD_ALIAS", "Anchor cannot be an empty string")), i && (d.spaceBefore = !0), r && (d.comment = r, d.range[2] = a), d;
}
function Vn({ options: s }, { offset: e, source: t, end: n }, i) {
  const r = new Nt(t.substring(1));
  r.source === "" && i(e, "BAD_ALIAS", "Alias cannot be an empty string"), r.source.endsWith(":") && i(e + t.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const o = e + t.length, l = Be(n, o, s.strict, i);
  return r.range = [e, o, l.offset], l.comment && (r.comment = l.comment), r;
}
function Yn(s, e, { offset: t, start: n, value: i, end: r }, o) {
  const l = Object.assign({ _directives: e }, s), a = new rt(void 0, l), c = {
    atKey: !1,
    atRoot: !0,
    directives: a.directives,
    options: a.options,
    schema: a.schema
  }, g = ye(n, {
    indicator: "doc-start",
    next: i ?? r?.[0],
    offset: t,
    onError: o,
    parentIndent: 0,
    startOnNewline: !0
  });
  g.found && (a.directives.docStart = !0, i && (i.type === "block-map" || i.type === "block-seq") && !g.hasNewline && o(g.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), a.contents = i ? Cs(c, i, g, o) : Bt(c, g.end, n, null, g, o);
  const d = a.contents.range[2], u = Be(r, d, !1, o);
  return u.comment && (a.comment = u.comment), a.range = [t, d, u.offset], a;
}
function Oe(s) {
  if (typeof s == "number")
    return [s, s + 1];
  if (Array.isArray(s))
    return s.length === 2 ? s : [s[0], s[1]];
  const { offset: e, source: t } = s;
  return [e, e + (typeof t == "string" ? t.length : 1)];
}
function Ut(s) {
  let e = "", t = !1, n = !1;
  for (let i = 0; i < s.length; ++i) {
    const r = s[i];
    switch (r[0]) {
      case "#":
        e += (e === "" ? "" : n ? `

` : `
`) + (r.substring(1) || " "), t = !0, n = !1;
        break;
      case "%":
        s[i + 1]?.[0] !== "#" && (i += 1), t = !1;
        break;
      default:
        t || (n = !0), t = !1;
    }
  }
  return { comment: e, afterEmptyLine: n };
}
class Jn {
  constructor(e = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (t, n, i, r) => {
      const o = Oe(t);
      r ? this.warnings.push(new On(o, n, i)) : this.errors.push(new ve(o, n, i));
    }, this.directives = new K({ version: e.version || "1.2" }), this.options = e;
  }
  decorate(e, t) {
    const { comment: n, afterEmptyLine: i } = Ut(this.prelude);
    if (n) {
      const r = e.contents;
      if (t)
        e.comment = e.comment ? `${e.comment}
${n}` : n;
      else if (i || e.directives.docStart || !r)
        e.commentBefore = n;
      else if (C(r) && !r.flow && r.items.length > 0) {
        let o = r.items[0];
        _(o) && (o = o.key);
        const l = o.commentBefore;
        o.commentBefore = l ? `${n}
${l}` : n;
      } else {
        const o = r.commentBefore;
        r.commentBefore = o ? `${n}
${o}` : n;
      }
    }
    if (t) {
      for (let r = 0; r < this.errors.length; ++r)
        e.errors.push(this.errors[r]);
      for (let r = 0; r < this.warnings.length; ++r)
        e.warnings.push(this.warnings[r]);
    } else
      e.errors = this.errors, e.warnings = this.warnings;
    this.prelude = [], this.errors = [], this.warnings = [];
  }
  /**
   * Current stream status information.
   *
   * Mostly useful at the end of input for an empty stream.
   */
  streamInfo() {
    return {
      comment: Ut(this.prelude).comment,
      directives: this.directives,
      errors: this.errors,
      warnings: this.warnings
    };
  }
  /**
   * Compose tokens into documents.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *compose(e, t = !1, n = -1) {
    for (const i of e)
      yield* this.next(i);
    yield* this.end(t, n);
  }
  /** Advance the composer by one CST token. */
  *next(e) {
    switch (e.type) {
      case "directive":
        this.directives.add(e.source, (t, n, i) => {
          const r = Oe(e);
          r[0] += t, this.onError(r, "BAD_DIRECTIVE", n, i);
        }), this.prelude.push(e.source), this.atDirectives = !0;
        break;
      case "document": {
        const t = Yn(this.options, this.directives, e, this.onError);
        this.atDirectives && !t.directives.docStart && this.onError(e, "MISSING_CHAR", "Missing directives-end/doc-start indicator line"), this.decorate(t, !1), this.doc && (yield this.doc), this.doc = t, this.atDirectives = !1;
        break;
      }
      case "byte-order-mark":
      case "space":
        break;
      case "comment":
      case "newline":
        this.prelude.push(e.source);
        break;
      case "error": {
        const t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, n = new ve(Oe(e), "UNEXPECTED_TOKEN", t);
        this.atDirectives || !this.doc ? this.errors.push(n) : this.doc.errors.push(n);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const n = "Unexpected doc-end without preceding document";
          this.errors.push(new ve(Oe(e), "UNEXPECTED_TOKEN", n));
          break;
        }
        this.doc.directives.docEnd = !0;
        const t = Be(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), t.comment) {
          const n = this.doc.comment;
          this.doc.comment = n ? `${n}
${t.comment}` : t.comment;
        }
        this.doc.range[2] = t.offset;
        break;
      }
      default:
        this.errors.push(new ve(Oe(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
    }
  }
  /**
   * Call at end of input to yield any remaining document.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *end(e = !1, t = -1) {
    if (this.doc)
      this.decorate(this.doc, !0), yield this.doc, this.doc = null;
    else if (e) {
      const n = Object.assign({ _directives: this.directives }, this.options), i = new rt(void 0, n);
      this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), i.range = [0, t, t], this.decorate(i, !1), yield i;
    }
  }
}
const Ms = "\uFEFF", _s = "", js = "", bt = "";
function Gn(s) {
  switch (s) {
    case Ms:
      return "byte-order-mark";
    case _s:
      return "doc-mode";
    case js:
      return "flow-error-end";
    case bt:
      return "scalar";
    case "---":
      return "doc-start";
    case "...":
      return "doc-end";
    case "":
    case `
`:
    case `\r
`:
      return "newline";
    case "-":
      return "seq-item-ind";
    case "?":
      return "explicit-key-ind";
    case ":":
      return "map-value-ind";
    case "{":
      return "flow-map-start";
    case "}":
      return "flow-map-end";
    case "[":
      return "flow-seq-start";
    case "]":
      return "flow-seq-end";
    case ",":
      return "comma";
  }
  switch (s[0]) {
    case " ":
    case "	":
      return "space";
    case "#":
      return "comment";
    case "%":
      return "directive-line";
    case "*":
      return "alias";
    case "&":
      return "anchor";
    case "!":
      return "tag";
    case "'":
      return "single-quoted-scalar";
    case '"':
      return "double-quoted-scalar";
    case "|":
    case ">":
      return "block-scalar-header";
  }
  return null;
}
function Y(s) {
  switch (s) {
    case void 0:
    case " ":
    case `
`:
    case "\r":
    case "	":
      return !0;
    default:
      return !1;
  }
}
const Vt = new Set("0123456789ABCDEFabcdef"), Hn = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), De = new Set(",[]{}"), Wn = new Set(` ,[]{}
\r	`), ht = (s) => !s || Wn.has(s);
class Qn {
  constructor() {
    this.atEnd = !1, this.blockScalarIndent = -1, this.blockScalarKeep = !1, this.buffer = "", this.flowKey = !1, this.flowLevel = 0, this.indentNext = 0, this.indentValue = 0, this.lineEndPos = null, this.next = null, this.pos = 0;
  }
  /**
   * Generate YAML tokens from the `source` string. If `incomplete`,
   * a part of the last line may be left as a buffer for the next call.
   *
   * @returns A generator of lexical tokens
   */
  *lex(e, t = !1) {
    if (e) {
      if (typeof e != "string")
        throw TypeError("source is not a string");
      this.buffer = this.buffer ? this.buffer + e : e, this.lineEndPos = null;
    }
    this.atEnd = !t;
    let n = this.next ?? "stream";
    for (; n && (t || this.hasChars(1)); )
      n = yield* this.parseNext(n);
  }
  atLineEnd() {
    let e = this.pos, t = this.buffer[e];
    for (; t === " " || t === "	"; )
      t = this.buffer[++e];
    return !t || t === "#" || t === `
` ? !0 : t === "\r" ? this.buffer[e + 1] === `
` : !1;
  }
  charAt(e) {
    return this.buffer[this.pos + e];
  }
  continueScalar(e) {
    let t = this.buffer[e];
    if (this.indentNext > 0) {
      let n = 0;
      for (; t === " "; )
        t = this.buffer[++n + e];
      if (t === "\r") {
        const i = this.buffer[n + e + 1];
        if (i === `
` || !i && !this.atEnd)
          return e + n + 1;
      }
      return t === `
` || n >= this.indentNext || !t && !this.atEnd ? e + n : -1;
    }
    if (t === "-" || t === ".") {
      const n = this.buffer.substr(e, 3);
      if ((n === "---" || n === "...") && Y(this.buffer[e + 3]))
        return -1;
    }
    return e;
  }
  getLine() {
    let e = this.lineEndPos;
    return (typeof e != "number" || e !== -1 && e < this.pos) && (e = this.buffer.indexOf(`
`, this.pos), this.lineEndPos = e), e === -1 ? this.atEnd ? this.buffer.substring(this.pos) : null : (this.buffer[e - 1] === "\r" && (e -= 1), this.buffer.substring(this.pos, e));
  }
  hasChars(e) {
    return this.pos + e <= this.buffer.length;
  }
  setNext(e) {
    return this.buffer = this.buffer.substring(this.pos), this.pos = 0, this.lineEndPos = null, this.next = e, null;
  }
  peek(e) {
    return this.buffer.substr(this.pos, e);
  }
  *parseNext(e) {
    switch (e) {
      case "stream":
        return yield* this.parseStream();
      case "line-start":
        return yield* this.parseLineStart();
      case "block-start":
        return yield* this.parseBlockStart();
      case "doc":
        return yield* this.parseDocument();
      case "flow":
        return yield* this.parseFlowCollection();
      case "quoted-scalar":
        return yield* this.parseQuotedScalar();
      case "block-scalar":
        return yield* this.parseBlockScalar();
      case "plain-scalar":
        return yield* this.parsePlainScalar();
    }
  }
  *parseStream() {
    let e = this.getLine();
    if (e === null)
      return this.setNext("stream");
    if (e[0] === Ms && (yield* this.pushCount(1), e = e.substring(1)), e[0] === "%") {
      let t = e.length, n = e.indexOf("#");
      for (; n !== -1; ) {
        const r = e[n - 1];
        if (r === " " || r === "	") {
          t = n - 1;
          break;
        } else
          n = e.indexOf("#", n + 1);
      }
      for (; ; ) {
        const r = e[t - 1];
        if (r === " " || r === "	")
          t -= 1;
        else
          break;
      }
      const i = (yield* this.pushCount(t)) + (yield* this.pushSpaces(!0));
      return yield* this.pushCount(e.length - i), this.pushNewline(), "stream";
    }
    if (this.atLineEnd()) {
      const t = yield* this.pushSpaces(!0);
      return yield* this.pushCount(e.length - t), yield* this.pushNewline(), "stream";
    }
    return yield _s, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const e = this.charAt(0);
    if (!e && !this.atEnd)
      return this.setNext("line-start");
    if (e === "-" || e === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const t = this.peek(3);
      if ((t === "---" || t === "...") && Y(this.charAt(3)))
        return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, t === "---" ? "doc" : "stream";
    }
    return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !Y(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [e, t] = this.peek(2);
    if (!t && !this.atEnd)
      return this.setNext("block-start");
    if ((e === "-" || e === "?" || e === ":") && Y(t)) {
      const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0));
      return this.indentNext = this.indentValue + 1, this.indentValue += n, "block-start";
    }
    return "doc";
  }
  *parseDocument() {
    yield* this.pushSpaces(!0);
    const e = this.getLine();
    if (e === null)
      return this.setNext("doc");
    let t = yield* this.pushIndicators();
    switch (e[t]) {
      case "#":
        yield* this.pushCount(e.length - t);
      // fallthrough
      case void 0:
        return yield* this.pushNewline(), yield* this.parseLineStart();
      case "{":
      case "[":
        return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel = 1, "flow";
      case "}":
      case "]":
        return yield* this.pushCount(1), "doc";
      case "*":
        return yield* this.pushUntil(ht), "doc";
      case '"':
      case "'":
        return yield* this.parseQuotedScalar();
      case "|":
      case ">":
        return t += yield* this.parseBlockScalarHeader(), t += yield* this.pushSpaces(!0), yield* this.pushCount(e.length - t), yield* this.pushNewline(), yield* this.parseBlockScalar();
      default:
        return yield* this.parsePlainScalar();
    }
  }
  *parseFlowCollection() {
    let e, t, n = -1;
    do
      e = yield* this.pushNewline(), e > 0 ? (t = yield* this.pushSpaces(!1), this.indentValue = n = t) : t = 0, t += yield* this.pushSpaces(!0);
    while (e + t > 0);
    const i = this.getLine();
    if (i === null)
      return this.setNext("flow");
    if ((n !== -1 && n < this.indentNext && i[0] !== "#" || n === 0 && (i.startsWith("---") || i.startsWith("...")) && Y(i[3])) && !(n === this.indentNext - 1 && this.flowLevel === 1 && (i[0] === "]" || i[0] === "}")))
      return this.flowLevel = 0, yield js, yield* this.parseLineStart();
    let r = 0;
    for (; i[r] === ","; )
      r += yield* this.pushCount(1), r += yield* this.pushSpaces(!0), this.flowKey = !1;
    switch (r += yield* this.pushIndicators(), i[r]) {
      case void 0:
        return "flow";
      case "#":
        return yield* this.pushCount(i.length - r), "flow";
      case "{":
      case "[":
        return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel += 1, "flow";
      case "}":
      case "]":
        return yield* this.pushCount(1), this.flowKey = !0, this.flowLevel -= 1, this.flowLevel ? "flow" : "doc";
      case "*":
        return yield* this.pushUntil(ht), "flow";
      case '"':
      case "'":
        return this.flowKey = !0, yield* this.parseQuotedScalar();
      case ":": {
        const o = this.charAt(1);
        if (this.flowKey || Y(o) || o === ",")
          return this.flowKey = !1, yield* this.pushCount(1), yield* this.pushSpaces(!0), "flow";
      }
      // fallthrough
      default:
        return this.flowKey = !1, yield* this.parsePlainScalar();
    }
  }
  *parseQuotedScalar() {
    const e = this.charAt(0);
    let t = this.buffer.indexOf(e, this.pos + 1);
    if (e === "'")
      for (; t !== -1 && this.buffer[t + 1] === "'"; )
        t = this.buffer.indexOf("'", t + 2);
    else
      for (; t !== -1; ) {
        let r = 0;
        for (; this.buffer[t - 1 - r] === "\\"; )
          r += 1;
        if (r % 2 === 0)
          break;
        t = this.buffer.indexOf('"', t + 1);
      }
    const n = this.buffer.substring(0, t);
    let i = n.indexOf(`
`, this.pos);
    if (i !== -1) {
      for (; i !== -1; ) {
        const r = this.continueScalar(i + 1);
        if (r === -1)
          break;
        i = n.indexOf(`
`, r);
      }
      i !== -1 && (t = i - (n[i - 1] === "\r" ? 2 : 1));
    }
    if (t === -1) {
      if (!this.atEnd)
        return this.setNext("quoted-scalar");
      t = this.buffer.length;
    }
    return yield* this.pushToIndex(t + 1, !1), this.flowLevel ? "flow" : "doc";
  }
  *parseBlockScalarHeader() {
    this.blockScalarIndent = -1, this.blockScalarKeep = !1;
    let e = this.pos;
    for (; ; ) {
      const t = this.buffer[++e];
      if (t === "+")
        this.blockScalarKeep = !0;
      else if (t > "0" && t <= "9")
        this.blockScalarIndent = Number(t) - 1;
      else if (t !== "-")
        break;
    }
    return yield* this.pushUntil((t) => Y(t) || t === "#");
  }
  *parseBlockScalar() {
    let e = this.pos - 1, t = 0, n;
    e: for (let r = this.pos; n = this.buffer[r]; ++r)
      switch (n) {
        case " ":
          t += 1;
          break;
        case `
`:
          e = r, t = 0;
          break;
        case "\r": {
          const o = this.buffer[r + 1];
          if (!o && !this.atEnd)
            return this.setNext("block-scalar");
          if (o === `
`)
            break;
        }
        // fallthrough
        default:
          break e;
      }
    if (!n && !this.atEnd)
      return this.setNext("block-scalar");
    if (t >= this.indentNext) {
      this.blockScalarIndent === -1 ? this.indentNext = t : this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
      do {
        const r = this.continueScalar(e + 1);
        if (r === -1)
          break;
        e = this.buffer.indexOf(`
`, r);
      } while (e !== -1);
      if (e === -1) {
        if (!this.atEnd)
          return this.setNext("block-scalar");
        e = this.buffer.length;
      }
    }
    let i = e + 1;
    for (n = this.buffer[i]; n === " "; )
      n = this.buffer[++i];
    if (n === "	") {
      for (; n === "	" || n === " " || n === "\r" || n === `
`; )
        n = this.buffer[++i];
      e = i - 1;
    } else if (!this.blockScalarKeep)
      do {
        let r = e - 1, o = this.buffer[r];
        o === "\r" && (o = this.buffer[--r]);
        const l = r;
        for (; o === " "; )
          o = this.buffer[--r];
        if (o === `
` && r >= this.pos && r + 1 + t > l)
          e = r;
        else
          break;
      } while (!0);
    return yield bt, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let t = this.pos - 1, n = this.pos - 1, i;
    for (; i = this.buffer[++n]; )
      if (i === ":") {
        const r = this.buffer[n + 1];
        if (Y(r) || e && De.has(r))
          break;
        t = n;
      } else if (Y(i)) {
        let r = this.buffer[n + 1];
        if (i === "\r" && (r === `
` ? (n += 1, i = `
`, r = this.buffer[n + 1]) : t = n), r === "#" || e && De.has(r))
          break;
        if (i === `
`) {
          const o = this.continueScalar(n + 1);
          if (o === -1)
            break;
          n = Math.max(n, o - 2);
        }
      } else {
        if (e && De.has(i))
          break;
        t = n;
      }
    return !i && !this.atEnd ? this.setNext("plain-scalar") : (yield bt, yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
  }
  *pushCount(e) {
    return e > 0 ? (yield this.buffer.substr(this.pos, e), this.pos += e, e) : 0;
  }
  *pushToIndex(e, t) {
    const n = this.buffer.slice(this.pos, e);
    return n ? (yield n, this.pos += n.length, n.length) : (t && (yield ""), 0);
  }
  *pushIndicators() {
    let e = 0;
    e: for (; ; ) {
      switch (this.charAt(0)) {
        case "!":
          e += yield* this.pushTag(), e += yield* this.pushSpaces(!0);
          continue e;
        case "&":
          e += yield* this.pushUntil(ht), e += yield* this.pushSpaces(!0);
          continue e;
        case "-":
        // this is an error
        case "?":
        // this is an error outside flow collections
        case ":": {
          const t = this.flowLevel > 0, n = this.charAt(1);
          if (Y(n) || t && De.has(n)) {
            t ? this.flowKey && (this.flowKey = !1) : this.indentNext = this.indentValue + 1, e += yield* this.pushCount(1), e += yield* this.pushSpaces(!0);
            continue e;
          }
        }
      }
      break e;
    }
    return e;
  }
  *pushTag() {
    if (this.charAt(1) === "<") {
      let e = this.pos + 2, t = this.buffer[e];
      for (; !Y(t) && t !== ">"; )
        t = this.buffer[++e];
      return yield* this.pushToIndex(t === ">" ? e + 1 : e, !1);
    } else {
      let e = this.pos + 1, t = this.buffer[e];
      for (; t; )
        if (Hn.has(t))
          t = this.buffer[++e];
        else if (t === "%" && Vt.has(this.buffer[e + 1]) && Vt.has(this.buffer[e + 2]))
          t = this.buffer[e += 3];
        else
          break;
      return yield* this.pushToIndex(e, !1);
    }
  }
  *pushNewline() {
    const e = this.buffer[this.pos];
    return e === `
` ? yield* this.pushCount(1) : e === "\r" && this.charAt(1) === `
` ? yield* this.pushCount(2) : 0;
  }
  *pushSpaces(e) {
    let t = this.pos - 1, n;
    do
      n = this.buffer[++t];
    while (n === " " || e && n === "	");
    const i = t - this.pos;
    return i > 0 && (yield this.buffer.substr(this.pos, i), this.pos = t), i;
  }
  *pushUntil(e) {
    let t = this.pos, n = this.buffer[t];
    for (; !e(n); )
      n = this.buffer[++t];
    return yield* this.pushToIndex(t, !1);
  }
}
class zn {
  constructor() {
    this.lineStarts = [], this.addNewLine = (e) => this.lineStarts.push(e), this.linePos = (e) => {
      let t = 0, n = this.lineStarts.length;
      for (; t < n; ) {
        const r = t + n >> 1;
        this.lineStarts[r] < e ? t = r + 1 : n = r;
      }
      if (this.lineStarts[t] === e)
        return { line: t + 1, col: 1 };
      if (t === 0)
        return { line: 0, col: e };
      const i = this.lineStarts[t - 1];
      return { line: t, col: e - i + 1 };
    };
  }
}
function ee(s, e) {
  for (let t = 0; t < s.length; ++t)
    if (s[t].type === e)
      return !0;
  return !1;
}
function Yt(s) {
  for (let e = 0; e < s.length; ++e)
    switch (s[e].type) {
      case "space":
      case "comment":
      case "newline":
        break;
      default:
        return e;
    }
  return -1;
}
function Bs(s) {
  switch (s?.type) {
    case "alias":
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "flow-collection":
      return !0;
    default:
      return !1;
  }
}
function qe(s) {
  switch (s.type) {
    case "document":
      return s.start;
    case "block-map": {
      const e = s.items[s.items.length - 1];
      return e.sep ?? e.start;
    }
    case "block-seq":
      return s.items[s.items.length - 1].start;
    /* istanbul ignore next should not happen */
    default:
      return [];
  }
}
function le(s) {
  if (s.length === 0)
    return [];
  let e = s.length;
  e: for (; --e >= 0; )
    switch (s[e].type) {
      case "doc-start":
      case "explicit-key-ind":
      case "map-value-ind":
      case "seq-item-ind":
      case "newline":
        break e;
    }
  for (; s[++e]?.type === "space"; )
    ;
  return s.splice(e, s.length);
}
function He(s, e) {
  if (e.length < 1e5)
    Array.prototype.push.apply(s, e);
  else
    for (let t = 0; t < e.length; ++t)
      s.push(e[t]);
}
function Jt(s) {
  if (s.start.type === "flow-seq-start")
    for (const e of s.items)
      e.sep && !e.value && !ee(e.start, "explicit-key-ind") && !ee(e.sep, "map-value-ind") && (e.key && (e.value = e.key), delete e.key, Bs(e.value) ? e.value.end ? He(e.value.end, e.sep) : e.value.end = e.sep : He(e.start, e.sep), delete e.sep);
}
class Xn {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(e) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new Qn(), this.onNewLine = e;
  }
  /**
   * Parse `source` as a YAML stream.
   * If `incomplete`, a part of the last line may be left as a buffer for the next call.
   *
   * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
   *
   * @returns A generator of tokens representing each directive, document, and other structure.
   */
  *parse(e, t = !1) {
    this.onNewLine && this.offset === 0 && this.onNewLine(0);
    for (const n of this.lexer.lex(e, t))
      yield* this.next(n);
    t || (yield* this.end());
  }
  /**
   * Advance the parser by the `source` of one lexical token.
   */
  *next(e) {
    if (this.source = e, this.atScalar) {
      this.atScalar = !1, yield* this.step(), this.offset += e.length;
      return;
    }
    const t = Gn(e);
    if (t)
      if (t === "scalar")
        this.atNewLine = !1, this.atScalar = !0, this.type = "scalar";
      else {
        switch (this.type = t, yield* this.step(), t) {
          case "newline":
            this.atNewLine = !0, this.indent = 0, this.onNewLine && this.onNewLine(this.offset + e.length);
            break;
          case "space":
            this.atNewLine && e[0] === " " && (this.indent += e.length);
            break;
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
            this.atNewLine && (this.indent += e.length);
            break;
          case "doc-mode":
          case "flow-error-end":
            return;
          default:
            this.atNewLine = !1;
        }
        this.offset += e.length;
      }
    else {
      const n = `Not a YAML token: ${e}`;
      yield* this.pop({ type: "error", offset: this.offset, message: n, source: e }), this.offset += e.length;
    }
  }
  /** Call at end of input to push out any remaining constructions */
  *end() {
    for (; this.stack.length > 0; )
      yield* this.pop();
  }
  get sourceToken() {
    return {
      type: this.type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  *step() {
    const e = this.peek(1);
    if (this.type === "doc-end" && e?.type !== "doc-end") {
      for (; this.stack.length > 0; )
        yield* this.pop();
      this.stack.push({
        type: "doc-end",
        offset: this.offset,
        source: this.source
      });
      return;
    }
    if (!e)
      return yield* this.stream();
    switch (e.type) {
      case "document":
        return yield* this.document(e);
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return yield* this.scalar(e);
      case "block-scalar":
        return yield* this.blockScalar(e);
      case "block-map":
        return yield* this.blockMap(e);
      case "block-seq":
        return yield* this.blockSequence(e);
      case "flow-collection":
        return yield* this.flowCollection(e);
      case "doc-end":
        return yield* this.documentEnd(e);
    }
    yield* this.pop();
  }
  peek(e) {
    return this.stack[this.stack.length - e];
  }
  *pop(e) {
    const t = e ?? this.stack.pop();
    if (!t)
      yield { type: "error", offset: this.offset, source: "", message: "Tried to pop an empty stack" };
    else if (this.stack.length === 0)
      yield t;
    else {
      const n = this.peek(1);
      switch (t.type === "block-scalar" ? t.indent = "indent" in n ? n.indent : 0 : t.type === "flow-collection" && n.type === "document" && (t.indent = 0), t.type === "flow-collection" && Jt(t), n.type) {
        case "document":
          n.value = t;
          break;
        case "block-scalar":
          n.props.push(t);
          break;
        case "block-map": {
          const i = n.items[n.items.length - 1];
          if (i.value) {
            n.items.push({ start: [], key: t, sep: [] }), this.onKeyLine = !0;
            return;
          } else if (i.sep)
            i.value = t;
          else {
            Object.assign(i, { key: t, sep: [] }), this.onKeyLine = !i.explicitKey;
            return;
          }
          break;
        }
        case "block-seq": {
          const i = n.items[n.items.length - 1];
          i.value ? n.items.push({ start: [], value: t }) : i.value = t;
          break;
        }
        case "flow-collection": {
          const i = n.items[n.items.length - 1];
          !i || i.value ? n.items.push({ start: [], key: t, sep: [] }) : i.sep ? i.value = t : Object.assign(i, { key: t, sep: [] });
          return;
        }
        /* istanbul ignore next should not happen */
        default:
          yield* this.pop(), yield* this.pop(t);
      }
      if ((n.type === "document" || n.type === "block-map" || n.type === "block-seq") && (t.type === "block-map" || t.type === "block-seq")) {
        const i = t.items[t.items.length - 1];
        i && !i.sep && !i.value && i.start.length > 0 && Yt(i.start) === -1 && (t.indent === 0 || i.start.every((r) => r.type !== "comment" || r.indent < t.indent)) && (n.type === "document" ? n.end = i.start : n.items.push({ start: i.start }), t.items.splice(-1, 1));
      }
    }
  }
  *stream() {
    switch (this.type) {
      case "directive-line":
        yield { type: "directive", offset: this.offset, source: this.source };
        return;
      case "byte-order-mark":
      case "space":
      case "comment":
      case "newline":
        yield this.sourceToken;
        return;
      case "doc-mode":
      case "doc-start": {
        const e = {
          type: "document",
          offset: this.offset,
          start: []
        };
        this.type === "doc-start" && e.start.push(this.sourceToken), this.stack.push(e);
        return;
      }
    }
    yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML stream`,
      source: this.source
    };
  }
  *document(e) {
    if (e.value)
      return yield* this.lineEnd(e);
    switch (this.type) {
      case "doc-start": {
        Yt(e.start) !== -1 ? (yield* this.pop(), yield* this.step()) : e.start.push(this.sourceToken);
        return;
      }
      case "anchor":
      case "tag":
      case "space":
      case "comment":
      case "newline":
        e.start.push(this.sourceToken);
        return;
    }
    const t = this.startBlockValue(e);
    t ? this.stack.push(t) : yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML document`,
      source: this.source
    };
  }
  *scalar(e) {
    if (this.type === "map-value-ind") {
      const t = qe(this.peek(2)), n = le(t);
      let i;
      e.end ? (i = e.end, i.push(this.sourceToken), delete e.end) : i = [this.sourceToken];
      const r = {
        type: "block-map",
        offset: e.offset,
        indent: e.indent,
        items: [{ start: n, key: e, sep: i }]
      };
      this.onKeyLine = !0, this.stack[this.stack.length - 1] = r;
    } else
      yield* this.lineEnd(e);
  }
  *blockScalar(e) {
    switch (this.type) {
      case "space":
      case "comment":
      case "newline":
        e.props.push(this.sourceToken);
        return;
      case "scalar":
        if (e.source = this.source, this.atNewLine = !0, this.indent = 0, this.onNewLine) {
          let t = this.source.indexOf(`
`) + 1;
          for (; t !== 0; )
            this.onNewLine(this.offset + t), t = this.source.indexOf(`
`, t) + 1;
        }
        yield* this.pop();
        break;
      /* istanbul ignore next should not happen */
      default:
        yield* this.pop(), yield* this.step();
    }
  }
  *blockMap(e) {
    const t = e.items[e.items.length - 1];
    switch (this.type) {
      case "newline":
        if (this.onKeyLine = !1, t.value) {
          const n = "end" in t.value ? t.value.end : void 0;
          (Array.isArray(n) ? n[n.length - 1] : void 0)?.type === "comment" ? n?.push(this.sourceToken) : e.items.push({ start: [this.sourceToken] });
        } else t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (t.value)
          e.items.push({ start: [this.sourceToken] });
        else if (t.sep)
          t.sep.push(this.sourceToken);
        else {
          if (this.atIndentedComment(t.start, e.indent)) {
            const i = e.items[e.items.length - 2]?.value?.end;
            if (Array.isArray(i)) {
              He(i, t.start), i.push(this.sourceToken), e.items.pop();
              return;
            }
          }
          t.start.push(this.sourceToken);
        }
        return;
    }
    if (this.indent >= e.indent) {
      const n = !this.onKeyLine && this.indent === e.indent, i = n && (t.sep || t.explicitKey) && this.type !== "seq-item-ind";
      let r = [];
      if (i && t.sep && !t.value) {
        const o = [];
        for (let l = 0; l < t.sep.length; ++l) {
          const a = t.sep[l];
          switch (a.type) {
            case "newline":
              o.push(l);
              break;
            case "space":
              break;
            case "comment":
              a.indent > e.indent && (o.length = 0);
              break;
            default:
              o.length = 0;
          }
        }
        o.length >= 2 && (r = t.sep.splice(o[1]));
      }
      switch (this.type) {
        case "anchor":
        case "tag":
          i || t.value ? (r.push(this.sourceToken), e.items.push({ start: r }), this.onKeyLine = !0) : t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
          return;
        case "explicit-key-ind":
          !t.sep && !t.explicitKey ? (t.start.push(this.sourceToken), t.explicitKey = !0) : i || t.value ? (r.push(this.sourceToken), e.items.push({ start: r, explicitKey: !0 })) : this.stack.push({
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start: [this.sourceToken], explicitKey: !0 }]
          }), this.onKeyLine = !0;
          return;
        case "map-value-ind":
          if (t.explicitKey)
            if (t.sep)
              if (t.value)
                e.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (ee(t.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: r, key: null, sep: [this.sourceToken] }]
                });
              else if (Bs(t.key) && !ee(t.sep, "newline")) {
                const o = le(t.start), l = t.key, a = t.sep;
                a.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: l, sep: a }]
                });
              } else r.length > 0 ? t.sep = t.sep.concat(r, this.sourceToken) : t.sep.push(this.sourceToken);
            else if (ee(t.start, "newline"))
              Object.assign(t, { key: null, sep: [this.sourceToken] });
            else {
              const o = le(t.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: o, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            t.sep ? t.value || i ? e.items.push({ start: r, key: null, sep: [this.sourceToken] }) : ee(t.sep, "map-value-ind") ? this.stack.push({
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [], key: null, sep: [this.sourceToken] }]
            }) : t.sep.push(this.sourceToken) : Object.assign(t, { key: null, sep: [this.sourceToken] });
          this.onKeyLine = !0;
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const o = this.flowScalar(this.type);
          i || t.value ? (e.items.push({ start: r, key: o, sep: [] }), this.onKeyLine = !0) : t.sep ? this.stack.push(o) : (Object.assign(t, { key: o, sep: [] }), this.onKeyLine = !0);
          return;
        }
        default: {
          const o = this.startBlockValue(e);
          if (o) {
            if (o.type === "block-seq") {
              if (!t.explicitKey && t.sep && !ee(t.sep, "newline")) {
                yield* this.pop({
                  type: "error",
                  offset: this.offset,
                  message: "Unexpected block-seq-ind on same line with key",
                  source: this.source
                });
                return;
              }
            } else n && e.items.push({ start: r });
            this.stack.push(o);
            return;
          }
        }
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *blockSequence(e) {
    const t = e.items[e.items.length - 1];
    switch (this.type) {
      case "newline":
        if (t.value) {
          const n = "end" in t.value ? t.value.end : void 0;
          (Array.isArray(n) ? n[n.length - 1] : void 0)?.type === "comment" ? n?.push(this.sourceToken) : e.items.push({ start: [this.sourceToken] });
        } else
          t.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (t.value)
          e.items.push({ start: [this.sourceToken] });
        else {
          if (this.atIndentedComment(t.start, e.indent)) {
            const i = e.items[e.items.length - 2]?.value?.end;
            if (Array.isArray(i)) {
              He(i, t.start), i.push(this.sourceToken), e.items.pop();
              return;
            }
          }
          t.start.push(this.sourceToken);
        }
        return;
      case "anchor":
      case "tag":
        if (t.value || this.indent <= e.indent)
          break;
        t.start.push(this.sourceToken);
        return;
      case "seq-item-ind":
        if (this.indent !== e.indent)
          break;
        t.value || ee(t.start, "seq-item-ind") ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
        return;
    }
    if (this.indent > e.indent) {
      const n = this.startBlockValue(e);
      if (n) {
        this.stack.push(n);
        return;
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *flowCollection(e) {
    const t = e.items[e.items.length - 1];
    if (this.type === "flow-error-end") {
      let n;
      do
        yield* this.pop(), n = this.peek(1);
      while (n?.type === "flow-collection");
    } else if (e.end.length === 0) {
      switch (this.type) {
        case "comma":
        case "explicit-key-ind":
          !t || t.sep ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
          return;
        case "map-value-ind":
          !t || t.value ? e.items.push({ start: [], key: null, sep: [this.sourceToken] }) : t.sep ? t.sep.push(this.sourceToken) : Object.assign(t, { key: null, sep: [this.sourceToken] });
          return;
        case "space":
        case "comment":
        case "newline":
        case "anchor":
        case "tag":
          !t || t.value ? e.items.push({ start: [this.sourceToken] }) : t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const i = this.flowScalar(this.type);
          !t || t.value ? e.items.push({ start: [], key: i, sep: [] }) : t.sep ? this.stack.push(i) : Object.assign(t, { key: i, sep: [] });
          return;
        }
        case "flow-map-end":
        case "flow-seq-end":
          e.end.push(this.sourceToken);
          return;
      }
      const n = this.startBlockValue(e);
      n ? this.stack.push(n) : (yield* this.pop(), yield* this.step());
    } else {
      const n = this.peek(2);
      if (n.type === "block-map" && (this.type === "map-value-ind" && n.indent === e.indent || this.type === "newline" && !n.items[n.items.length - 1].sep))
        yield* this.pop(), yield* this.step();
      else if (this.type === "map-value-ind" && n.type !== "flow-collection") {
        const i = qe(n), r = le(i);
        Jt(e);
        const o = e.end.splice(1, e.end.length);
        o.push(this.sourceToken);
        const l = {
          type: "block-map",
          offset: e.offset,
          indent: e.indent,
          items: [{ start: r, key: e, sep: o }]
        };
        this.onKeyLine = !0, this.stack[this.stack.length - 1] = l;
      } else
        yield* this.lineEnd(e);
    }
  }
  flowScalar(e) {
    if (this.onNewLine) {
      let t = this.source.indexOf(`
`) + 1;
      for (; t !== 0; )
        this.onNewLine(this.offset + t), t = this.source.indexOf(`
`, t) + 1;
    }
    return {
      type: e,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  startBlockValue(e) {
    switch (this.type) {
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return this.flowScalar(this.type);
      case "block-scalar-header":
        return {
          type: "block-scalar",
          offset: this.offset,
          indent: this.indent,
          props: [this.sourceToken],
          source: ""
        };
      case "flow-map-start":
      case "flow-seq-start":
        return {
          type: "flow-collection",
          offset: this.offset,
          indent: this.indent,
          start: this.sourceToken,
          items: [],
          end: []
        };
      case "seq-item-ind":
        return {
          type: "block-seq",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: [this.sourceToken] }]
        };
      case "explicit-key-ind": {
        this.onKeyLine = !0;
        const t = qe(e), n = le(t);
        return n.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: n, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const t = qe(e), n = le(t);
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: n, key: null, sep: [this.sourceToken] }]
        };
      }
    }
    return null;
  }
  atIndentedComment(e, t) {
    return this.type !== "comment" || this.indent <= t ? !1 : e.every((n) => n.type === "newline" || n.type === "space");
  }
  *documentEnd(e) {
    this.type !== "doc-mode" && (e.end ? e.end.push(this.sourceToken) : e.end = [this.sourceToken], this.type === "newline" && (yield* this.pop()));
  }
  *lineEnd(e) {
    switch (this.type) {
      case "comma":
      case "doc-start":
      case "doc-end":
      case "flow-seq-end":
      case "flow-map-end":
      case "map-value-ind":
        yield* this.pop(), yield* this.step();
        break;
      case "newline":
        this.onKeyLine = !1;
      default:
        e.end ? e.end.push(this.sourceToken) : e.end = [this.sourceToken], this.type === "newline" && (yield* this.pop());
    }
  }
}
function Zn(s) {
  const e = s.prettyErrors !== !1;
  return { lineCounter: s.lineCounter || e && new zn() || null, prettyErrors: e };
}
function ei(s, e = {}) {
  const { lineCounter: t, prettyErrors: n } = Zn(e), i = new Xn(t?.addNewLine), r = new Jn(e);
  let o = null;
  for (const l of r.compose(i.parse(s), !0, s.length))
    if (!o)
      o = l;
    else if (o.options.logLevel !== "silent") {
      o.errors.push(new ve(l.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return n && t && (o.errors.forEach(Rt(s, t)), o.warnings.forEach(Rt(s, t))), o;
}
const xs = {
  comic: { title: "제목", cast: "등장인물", panels: "컷" },
  cast: { asset: "그림", label: "이름표" },
  panel: {
    mode: "구성",
    actors: "인물",
    dialogue: "대사",
    transfer: "전달",
    removeActors: "제외인물",
    actions: "소품동작"
  },
  actor: {
    id: "식별자",
    expression: "표정",
    gesture: "손모양",
    holding: "든소품",
    x: "가로위치",
    y: "세로위치",
    scale: "배율"
  },
  dialogue: {
    from: "화자",
    to: "상대",
    text: "내용",
    x: "가로위치",
    y: "세로위치",
    fontSize: "글자크기"
  },
  transfer: { from: "주는인물", to: "받는인물", prop: "소품" },
  action: { actor: "인물", type: "종류", prop: "소품", side: "방향" },
  options: {
    width: "너비",
    font: "글꼴",
    fontVersion: "글꼴버전",
    panelFormat: "컷비율"
  }
}, ti = {
  asset: { client: "클라이언트", server: "서버", database: "데이터베이스" },
  expression: {
    neutral: "보통",
    happy: "기쁨",
    confused: "어리둥절",
    sad: "슬픔",
    angry: "화남"
  },
  gesture: { wave: "인사손", point: "가리키는손" },
  prop: { request: "요청", data: "데이터", key: "열쇠" },
  mode: { full: "전체", before: "이전" },
  panelFormat: { compact: "기본", phone: "모바일" },
  action: { receive: "받기", discard: "버리기", drop: "떨어뜨리기", throw: "던지기" },
  side: { left: "왼쪽", right: "오른쪽" }
}, si = {
  cast: { asset: "asset" },
  actor: { expression: "expression", gesture: "gesture", holding: "prop" },
  panel: { mode: "mode" },
  transfer: { prop: "prop" },
  action: { type: "action", prop: "prop", side: "side" },
  options: { panelFormat: "panelFormat" }
};
function wt(s) {
  return !!s && typeof s == "object" && !Array.isArray(s);
}
function We(s, e, t, n) {
  if (!wt(s)) return s;
  const i = xs[e], r = /* @__PURE__ */ Object.create(null);
  for (const [o, l] of Object.entries(s)) {
    const a = Object.keys(i).find(
      (y) => o === y || o === i[y]
    ) ?? o;
    Object.hasOwn(i, a) && i[a];
    const c = a;
    if (Object.hasOwn(r, c))
      throw new Error(
        `${n}: '${i[a]}'와 '${a}'은 같은 항목입니다. 하나만 작성하세요.`
      );
    let g = l;
    const d = si[e], u = d && Object.hasOwn(d, a) ? d[a] : void 0;
    if (u && typeof l == "string") {
      const y = ti[u], w = Object.keys(y).find(
        (f) => l === f || l === y[f]
      );
      w && (g = w);
    }
    if (e === "comic" && a === "cast" && wt(l)) {
      const y = /* @__PURE__ */ Object.create(null);
      for (const [w, f] of Object.entries(l))
        y[w] = We(f, "cast", t, `${n}.등장인물.${w}`);
      g = y;
    } else if (Array.isArray(l)) {
      const y = e === "comic" && a === "panels" ? "panel" : e === "panel" && a === "actors" ? "actor" : e === "panel" && a === "dialogue" ? "dialogue" : e === "panel" && a === "transfer" ? "transfer" : e === "panel" && a === "actions" ? "action" : void 0;
      y && (g = l.map(
        (w, f) => We(
          w,
          y,
          t,
          `${n}.${i[a]}[${f + 1}]`
        )
      ));
    }
    r[c] = g;
  }
  return r;
}
const ni = (s) => We(s, "comic", !1, "만화");
function ii(s) {
  const e = We(s, "options", !1, "표시 설정");
  if (!wt(e)) throw new Error("표시 설정: 객체가 필요합니다.");
  for (const t of Object.keys(e))
    if (!Object.hasOwn(xs.options, t))
      throw new Error(`표시 설정: 알 수 없는 항목 '${t}'.`);
  return e;
}
function W(s, e) {
  if (!s || typeof s != "object" || Array.isArray(s))
    throw new Error(`${e}: 객체가 필요합니다.`);
  return s;
}
function j(s, e) {
  if (typeof s != "string" || !s.trim())
    throw new Error(`${e}: 비어 있지 않은 문자열이 필요합니다.`);
  if (s.length > 1e4)
    throw new Error(`${e}: 텍스트가 너무 깁니다.`);
  return s;
}
function se(s, e) {
  if (!Array.isArray(s)) throw new Error(`${e}: 목록이 필요합니다.`);
  return s;
}
function Z(s, e, t) {
  for (const n of Object.keys(s))
    if (!e.includes(n))
      throw new Error(`${t}: 알 수 없는 항목 '${n}'.`);
}
function ce(s, e, t, n) {
  if (s !== void 0) {
    if (typeof s != "number" || !Number.isFinite(s) || s < e || s > t)
      throw new Error(`${n}: ${e}~${t} 사이 숫자가 필요합니다.`);
    return s;
  }
}
function ri(s) {
  if (s.length > 1e5)
    throw new Error("코드가 너무 깁니다. 100KB 이내로 작성하세요.");
  const e = ei(s, { uniqueKeys: !0 });
  if (e.errors.length) throw new Error(e.errors[0].message);
  const t = W(ni(e.toJS({ maxAliasCount: 20 })), "만화");
  Z(t, ["title", "cast", "panels"], "만화");
  const n = /* @__PURE__ */ Object.create(null);
  for (const [o, l] of Object.entries(W(t.cast, "cast"))) {
    const a = W(l, `cast.${o}`);
    Z(a, ["asset", "label"], `cast.${o}`);
    const c = j(a.asset, `cast.${o}.asset`);
    if (!Object.hasOwn(Qt, c))
      throw new Error(`cast.${o}: 없는 에셋 '${c}'.`);
    n[o] = {
      asset: c,
      label: a.label === void 0 ? o : j(a.label, `cast.${o}.label`)
    };
  }
  let i;
  const r = se(t.panels, "panels").map((o, l) => {
    const a = `컷 ${l + 1}`, c = { ...W(o, a) };
    if (Z(
      c,
      ["actors", "dialogue", "transfer", "actions", "mode", "removeActors"],
      a
    ), c.mode !== void 0 && c.mode !== "before" && c.mode !== "full")
      throw new Error(`${a}: mode는 full 또는 before여야 합니다.`);
    if (c.mode === "before") {
      if (!i)
        throw new Error(
          `${a}: 첫 컷에서는 before 모드를 사용할 수 없습니다.`
        );
      const w = i.actors.map(
        (m) => ({ ...m })
      ), f = se(c.removeActors ?? [], `${a}.removeActors`).map(
        (m) => j(m, `${a}.removeActors`)
      );
      for (const m of f)
        if (!w.some((k) => k.id === m))
          throw new Error(`${a}: 제거할 인물 '${m}'가 이전 컷에 없습니다.`);
      const p = w.filter(
        (m) => !f.some((k) => k === m.id)
      ), h = se(c.actors ?? [], `${a}.actors`), b = /* @__PURE__ */ new Set();
      for (const m of h) {
        const k = typeof m == "string" ? { id: m } : W(m, `${a}.actors`);
        Z(
          k,
          ["id", "expression", "gesture", "holding", "x", "y", "scale"],
          `${a}.actors`
        );
        const S = j(k.id, `${a}.actor.id`);
        if (b.has(S))
          throw new Error(`${a}: 캐릭터 식별자가 중복됩니다.`);
        b.add(S);
        const N = p.findIndex(($) => $.id === S), O = {
          ...N < 0 ? {} : p[N],
          ...k
        };
        for (const [$, E] of Object.entries(k))
          $ !== "id" && E === null && delete O[$];
        N < 0 ? p.push(O) : p[N] = O;
      }
      c.actors = c.actors !== void 0 && h.length === 0 ? [] : p;
    } else if (c.removeActors !== void 0)
      throw new Error(
        `${a}: removeActors는 before 모드에서만 사용할 수 있습니다.`
      );
    const g = se(c.actors, `${a}.actors`).map((w) => {
      const f = typeof w == "string" ? { id: w } : W(w, `${a}.actors`);
      Z(
        f,
        ["id", "expression", "gesture", "holding", "x", "y", "scale"],
        `${a}.actors`
      );
      const p = j(f.id, `${a}.actor.id`), h = f.expression === void 0 ? "neutral" : j(f.expression, `${a}.${p}.expression`);
      if (!Object.hasOwn(n, p))
        throw new Error(`${a}: 없는 캐릭터 '${p}'.`);
      if (!Object.hasOwn(zt, h))
        throw new Error(`${a}.${p}: 없는 표정 '${h}'.`);
      const b = f.gesture === void 0 ? void 0 : j(f.gesture, `${a}.${p}.gesture`), m = f.holding === void 0 ? void 0 : j(f.holding, `${a}.${p}.holding`);
      if (b && !Object.hasOwn(Xt, b))
        throw new Error(`${a}.${p}: 없는 손 제스처 '${b}'.`);
      if (m && !Object.hasOwn(de, m))
        throw new Error(`${a}.${p}: 없는 소품 '${m}'.`);
      return {
        id: p,
        expression: h,
        gesture: b,
        holding: m,
        x: ce(f.x, 0, 1, `${a}.${p}.x`),
        y: ce(f.y, 0, 1, `${a}.${p}.y`),
        scale: ce(f.scale, 0.5, 1.25, `${a}.${p}.scale`) ?? 1
      };
    });
    if (g.length < 1 || g.length > 3)
      throw new Error(`${a}: 캐릭터는 1~3명이어야 합니다.`);
    if (new Set(g.map((w) => w.id)).size !== g.length)
      throw new Error(`${a}: 캐릭터 식별자가 중복됩니다.`);
    const d = se(c.dialogue ?? [], `${a}.dialogue`).map(
      (w) => {
        const f = W(w, `${a}.dialogue`);
        Z(
          f,
          ["from", "to", "text", "x", "y", "fontSize"],
          `${a}.dialogue`
        );
        const p = j(f.from, `${a}.dialogue.from`), h = f.to === void 0 ? void 0 : j(f.to, `${a}.dialogue.to`);
        if (!g.some((b) => b.id === p))
          throw new Error(`${a}: 화자 '${p}'가 컷에 없습니다.`);
        if (h && !g.some((b) => b.id === h))
          throw new Error(`${a}: 대화 상대 '${h}'가 컷에 없습니다.`);
        return {
          from: p,
          to: h,
          text: j(f.text, `${a}.dialogue.text`),
          x: ce(f.x, 0, 1, `${a}.dialogue.x`),
          y: ce(f.y, 0, 1, `${a}.dialogue.y`),
          fontSize: ce(f.fontSize, 12, 32, `${a}.dialogue.fontSize`) ?? 18
        };
      }
    );
    if (d.length > 20)
      throw new Error(`${a}: 대사는 20개 이내로 작성하세요.`);
    const u = se(c.transfer ?? [], `${a}.transfer`).map(
      (w) => {
        const f = W(w, `${a}.transfer`);
        Z(f, ["from", "to", "prop"], `${a}.transfer`);
        const p = j(f.from, `${a}.transfer.from`), h = j(f.to, `${a}.transfer.to`), b = j(f.prop, `${a}.transfer.prop`);
        if (!g.some((m) => m.id === p))
          throw new Error(`${a}: 전달 주체 '${p}'가 컷에 없습니다.`);
        if (!g.some((m) => m.id === h))
          throw new Error(`${a}: 전달 대상 '${h}'가 컷에 없습니다.`);
        if (p === h)
          throw new Error(`${a}: 전달 주체와 대상은 달라야 합니다.`);
        if (!Object.hasOwn(de, b))
          throw new Error(`${a}: 없는 소품 '${b}'.`);
        return { from: p, to: h, prop: b };
      }
    );
    if (u.length > 6)
      throw new Error(`${a}: 소품 전달은 6개 이내로 작성하세요.`);
    const y = se(c.actions ?? [], `${a}.actions`).map((w) => {
      const f = W(w, `${a}.actions`);
      Z(f, ["actor", "type", "prop", "side"], `${a}.actions`);
      const p = j(f.actor, `${a}.actions.actor`), h = j(f.type, `${a}.actions.type`), b = j(f.prop, `${a}.actions.prop`), m = f.side ?? "right";
      if (!g.some((S) => S.id === p)) throw new Error(`${a}: 동작 인물 '${p}'가 컷에 없습니다.`);
      if (!["receive", "discard", "drop", "throw"].includes(h)) throw new Error(`${a}: 동작은 receive, discard, drop, throw 중 하나여야 합니다.`);
      if (!Object.hasOwn(de, b)) throw new Error(`${a}: 없는 소품 '${b}'.`);
      if (m !== "left" && m !== "right") throw new Error(`${a}: side는 left 또는 right여야 합니다.`);
      const k = g.find((S) => S.id === p);
      if (k.holding || k.gesture || u.some((S) => S.from === p || S.to === p)) throw new Error(`${a}: 동작 인물은 holding, gesture, transfer와 동시에 사용할 수 없습니다. before에서는 null로 지우세요.`);
      return { actor: p, type: h, prop: b, side: m };
    });
    if (y.length > 3 || new Set(y.map((w) => w.actor)).size !== y.length) throw new Error(`${a}: 동작은 인물마다 하나씩, 최대 3개입니다.`);
    return i = { actors: g, dialogue: d, transfer: u, actions: y }, i;
  });
  if (r.length < 1 || r.length > 30)
    throw new Error("컷은 1~30개여야 합니다.");
  return {
    title: t.title === void 0 ? "Comic Gen" : j(t.title, "title"),
    cast: n,
    panels: r
  };
}
const Re = (s, e, t) => Math.max(e, Math.min(t, s));
function Gt(s, e, t, n) {
  const i = document.createElement("canvas").getContext("2d");
  i.font = `${t}px ${n}`;
  const r = [];
  for (const o of s.split(`
`)) {
    let l = "";
    for (const a of Array.from(o))
      l && i.measureText(l + a).width > e && (r.push(l), l = ""), l += a;
    r.push(l);
  }
  return r;
}
function oi(s, e, t, n, i = "compact") {
  const r = Math.min(t - 80, 390), o = s.dialogue.map((h) => ({
    line: h,
    lines: Gt(h.text, r - 36, h.fontSize, n),
    lineHeight: Math.ceil(h.fontSize * 1.45)
  })), l = o.reduce(
    (h, b) => h + 60 + b.lines.length * b.lineHeight,
    20
  ), a = l + 254, c = Math.max(
    ...s.actors.map((h) => s.actions.some((b) => b.actor === h.id) ? 130 : h.holding || h.gesture ? 92 : 60)
  ), g = (t - 72) / s.actors.length, d = Math.min(
    1,
    (g - 12) / (2 * c * Math.max(...s.actors.map((h) => h.scale)))
  ), u = s.actors.map((h) => h.scale * d), y = s.actors.map(
    (h, b) => Re(
      36 + (t - 72) * (h.x ?? (b + 0.5) / s.actors.length),
      26 + c * u[b],
      t - 26 - c * u[b]
    )
  ), w = s.actors.map(
    (h, b) => Re(
      h.y === void 0 ? a - 126 : h.y * a,
      l + 70 * u[b],
      a - 126 * u[b]
    )
  );
  for (let h = 0; h < s.actors.length; h++)
    for (let b = h + 1; b < s.actors.length; b++)
      if (Math.abs(y[h] - y[b]) < c * (u[h] + u[b]) && Math.abs(w[h] - w[b]) < 120 * Math.max(u[h], u[b]))
        throw new Error(
          `캐릭터 '${s.actors[h].id}'와 '${s.actors[b].id}'가 겹칩니다. x/y 또는 scale을 조정하세요.`
        );
  const f = [
    `<rect x="20" y="0" width="${t - 40}" height="${a}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/>`
  ];
  let p = 20;
  if (o.forEach(({ line: h, lines: b, lineHeight: m }) => {
    const k = y[s.actors.findIndex((x) => x.id === h.from)], S = Re(
      (h.x === void 0 ? k : h.x * t) - r / 2,
      40,
      t - r - 40
    ), N = 28 + b.length * m, O = h.y === void 0 ? p : Re(h.y * a, 20, l - N), $ = Math.max(S + 24, Math.min(S + r - 24, k)), E = S + r, A = O + N, I = s.actors.findIndex(
      (x) => x.id === h.from
    ), L = w[I] - 65 * u[I], B = `M${S + 14} ${O}H${E - 14}Q${E} ${O} ${E} ${O + 14}V${A - 14}Q${E} ${A} ${E - 14} ${A}H${$ + 9}L${k} ${L}L${$ - 9} ${A}H${S + 14}Q${S} ${A} ${S} ${A - 14}V${O + 14}Q${S} ${O} ${S + 14} ${O}Z`;
    f.push(
      `<g data-dialogue="${R(h.from)}" data-to="${R(h.to ?? "")}"><path d="${B}" fill="#fffaf0" stroke="#303341" stroke-width="2" stroke-linejoin="round"/><text x="${S + 18}" y="${O + 18 + h.fontSize}" font-size="${h.fontSize}">${b.map((x, G) => `<tspan x="${S + 18}" dy="${G ? m : 0}">${R(x)}</tspan>`).join("")}</text></g>`
    ), p += N + 32;
  }), s.actors.forEach((h, b) => {
    const m = e[h.id], k = Qt[m.asset], S = s.dialogue.find(
      (I) => I.from === h.id && I.to
    )?.to, N = s.actors.findIndex((I) => I.id === S), O = N < 0 ? 0 : Math.sign(y[N] - y[b]) * 4, $ = Gt(
      m.label,
      (t - 72) / s.actors.length - 12,
      16,
      n
    );
    if ($.length > 2)
      throw new Error(`캐릭터 '${h.id}'의 이름표가 너무 깁니다.`);
    const E = h.gesture ? `<g data-gesture="${h.gesture}">${Xt[h.gesture]}</g>` : "", A = h.holding ? `<g data-holding="${h.holding}"><circle data-hand="holding" cx="58" cy="20" r="11" fill="white"/><g data-prop="${h.holding}" transform="translate(73 6)">${de[h.holding]}</g></g>` : "";
    f.push(
      `<g data-character="${R(h.id)}" transform="translate(${y[b]} ${w[b]}) scale(${u[b]})" stroke="#303341" stroke-width="2.8" stroke-linecap="round"><ellipse cy="69" rx="51" ry="7" fill="#e8edf3" stroke="none"/>${k.body}<g transform="translate(${O} ${k.faceY})" fill="#303341">${zt[h.expression]}</g>${E}${A}<text y="94" text-anchor="middle" stroke="none" fill="#303341" font-size="16">${$.map((I, L) => `<tspan x="0" dy="${L ? 18 : 0}">${R(I)}</tspan>`).join("")}</text></g>`
    );
  }), s.transfer.forEach((h, b) => {
    const m = s.actors.findIndex(
      (x) => x.id === h.from
    ), k = s.actors.findIndex((x) => x.id === h.to), S = y[m], N = y[k], O = Math.sign(N - S), $ = S + 62 * u[m] * O, E = N - 62 * u[k] * O, A = 20 + (b - (s.transfer.length - 1) / 2) * 12, I = w[m] + A * u[m], L = w[k] + A * u[k], B = Math.atan2(L - I, E - $) * 180 / Math.PI;
    f.push(
      `<g data-transfer="${R(h.from)}" data-to="${R(h.to)}" stroke="#586c8c" stroke-width="2.5"><path d="M${$} ${I}L${E} ${L}" fill="none"/><circle data-hand="transfer" cx="${$}" cy="${I}" r="${9 * u[m]}" fill="white"/><circle data-hand="receive" cx="${E}" cy="${L}" r="${9 * u[k]}" fill="white"/><path transform="translate(${E} ${L}) rotate(${B})" d="M-12 -5L-4 0L-12 5" fill="none"/><g data-prop="${h.prop}" transform="translate(${($ + E) / 2} ${(I + L) / 2 - 16})">${de[h.prop]}</g></g>`
    );
  }), s.actions.forEach((h) => {
    const b = s.actors.findIndex((Fs) => Fs.id === h.actor), m = u[b], k = h.side === "left" ? -1 : 1, S = y[b], N = w[b], O = S + k * 62 * m, $ = N + 20 * m, E = S + k * 112 * m, A = N + 108 * m, I = h.type === "receive", L = h.type === "drop", B = L || h.type === "throw", x = I ? E : O, G = I ? N - 48 * m : $, q = I ? O : L ? O + k * 22 * m : E, X = I ? $ : B ? A - 16 * m : N + 8 * m, Ne = h.type === "throw" ? E + k * 12 * m : (x + q) / 2, P = h.type === "throw" ? N - 36 * m : (G + X) / 2, Ee = Math.atan2(X - P, q - Ne) * 180 / Math.PI, ot = I ? x : q, Rs = I ? G : X;
    f.push(`<g data-action="${h.type}" data-actor="${R(h.actor)}" stroke="#586c8c" stroke-width="2.5" stroke-linecap="round"><circle data-hand="action" cx="${O}" cy="${$}" r="${10 * m}" fill="white"/><path data-trajectory="${h.type}" d="M${x} ${G}Q${Ne} ${P} ${q} ${X}" fill="none" stroke-dasharray="5 4"/><path transform="translate(${q} ${X}) rotate(${Ee}) scale(${m})" d="M-12 -6L-2 0L-12 6" fill="none"/><g data-prop="${h.prop}" transform="translate(${ot} ${Rs}) scale(${m})">${de[h.prop]}</g>${I ? `<path d="M${E - 18 * m} ${G - 20 * m}l${-6 * m} ${-6 * m}M${E + 18 * m} ${G - 20 * m}l${6 * m} ${-6 * m}"/>` : `<path d="M${O - k * 10 * m} ${$ - 17 * m}l${k * 8 * m} ${-5 * m}M${O - k * 14 * m} ${$ + 17 * m}l${k * 8 * m} ${5 * m}"/>`}${B ? `<path data-ground="true" d="M${q - 24 * m} ${A}h${48 * m}"/>` : ""}${h.type === "throw" ? `<path data-impact="true" d="M${q - 19 * m} ${A - 3 * m}l${-8 * m} ${-10 * m}M${q + 19 * m} ${A - 3 * m}l${8 * m} ${-10 * m}M${q - 9 * m} ${A + 5 * m}l${-8 * m} ${7 * m}M${q + 9 * m} ${A + 5 * m}l${8 * m} ${7 * m}"/>` : ""}</g>`);
  }), i === "phone") {
    const h = a * 2 + 92;
    return {
      markup: `<rect x="20" y="0" width="${t - 40}" height="${h}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/><g transform="translate(0 ${(h - a) / 2})">${f.slice(1).join("")}</g>`,
      height: h
    };
  }
  return { markup: f.join(""), height: a };
}
let Ps = 0;
document.fonts.addEventListener("loadingdone", (s) => {
  s.fontfaces.length && Ps++;
});
function Ht(s, e, t, n = "compact") {
  try {
    e = ii(e);
    const i = ri(s), r = e.width ?? 720, o = e.panelFormat ?? n;
    if (o !== "compact" && o !== "phone")
      throw new Error("panelFormat은 compact 또는 phone이어야 합니다.");
    if (!Number.isFinite(r) || r < 480 || r > 2400)
      throw new Error("너비는 480~2400 사이여야 합니다.");
    const l = e.font ?? "Malgun Gothic, Apple SD Gothic Neo, sans-serif";
    if (typeof l != "string" || l.length > 300 || /[<>]/.test(l))
      throw new Error("올바른 글꼴 이름이 필요합니다.");
    const a = [], c = [], g = (p, h, b) => `<svg xmlns="http://www.w3.org/2000/svg" width="${r}" height="${h}" viewBox="0 0 ${r} ${h}" role="img" aria-label="${R(b)}"><title>${R(b)}</title><rect width="100%" height="100%" fill="#f5f7fb"/><g font-family="${R(l)}" fill="#303341"><text x="24" y="42" font-size="24" font-weight="700">${R(b)}</text>${p}</g></svg>`;
    let d = 0, u = 0, y = 68;
    for (const [p, h] of i.panels.entries()) {
      const b = h.actors.map((O) => [
        O.id,
        i.cast[O.id]
      ]), m = JSON.stringify({
        panel: h,
        members: b,
        width: r,
        font: l,
        fontEpoch: Ps,
        fontVersion: e.fontVersion,
        assetVersion: "1",
        layoutVersion: 3,
        format: o
      }), k = t.get(m), { markup: S, height: N } = k ?? oi(h, i.cast, r, l, o);
      k ? d++ : (u++, t.set(m, { markup: S, height: N })), a.push(
        `<g data-panel="${p}" transform="translate(0 ${y})">${S}</g>`
      ), c.push({
        index: p,
        svg: g(
          `<g data-panel="${p}" transform="translate(0 68)">${S}</g>`,
          N + 92,
          `${i.title} · ${p + 1}/${i.panels.length}`
        ),
        width: r,
        height: N + 92,
        diagnostics: [],
        cache: {
          hits: k ? 1 : 0,
          misses: k ? 0 : 1,
          bytes: t.bytes
        }
      }), y += N + 24;
    }
    const w = y;
    return {
      svg: g(a.join(""), w, i.title),
      width: r,
      height: w,
      diagnostics: [],
      cache: { hits: d, misses: u, bytes: t.bytes },
      panels: c
    };
  } catch (i) {
    return {
      svg: "",
      width: 0,
      height: 0,
      diagnostics: [i instanceof Error ? i.message : "렌더링 실패"],
      panels: []
    };
  }
}
function Ks(s = 2e6) {
  const e = new Us(s);
  return {
    render: (t, n = {}) => Ht(t, n, e),
    renderPanels: (t, n = {}) => Ht(t, n, e, "phone"),
    clearCache: () => e.clear()
  };
}
const Ds = Ks(), ui = Ds.render, hi = Ds.renderPanels, $t = /* @__PURE__ */ new WeakMap();
let Fe;
function qs() {
  if (document.getElementById("comic-gen-viewer-style")) return;
  const s = document.createElement("style");
  s.id = "comic-gen-viewer-style", s.textContent = ".comic-figure{margin:1rem 0;max-width:100%;color:#303341}.comic-figure svg{display:block;width:100%;height:auto}.cg-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px;overscroll-behavior-x:contain}.cg-slide{flex:0 0 min(85%,480px);scroll-snap-align:center;padding:0;border:0;background:transparent;cursor:pointer}.cg-controls{display:flex;align-items:center;justify-content:center;gap:12px;padding:12px}.cg-controls button,.cg-overlay button{padding:10px 16px;min-height:44px;border-radius:8px;border:1px solid #aab1bf;background:white;color:#303341;cursor:pointer}.cg-overlay{position:fixed;inset:0;z-index:2147483647;background:#161b26;color:white;display:grid;grid-template-rows:auto minmax(0,1fr) auto;padding:env(safe-area-inset-top) 8px env(safe-area-inset-bottom);box-sizing:border-box}.cg-overlay header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:8px}.cg-overlay .cg-stage{display:flex;align-items:center;justify-content:center;min-height:0;overflow:hidden}.cg-overlay .cg-stage svg{width:100%;height:100%;max-height:100%;object-fit:contain}.cg-code{white-space:pre-wrap;overflow-wrap:anywhere}.cg-slide:focus-visible{outline:3px solid #7562d4;outline-offset:-3px}", document.head.append(s);
}
function ai(s) {
  $t.get(s)?.(), $t.delete(s);
}
function li(s, e, t) {
  qs(), s.replaceChildren();
  const n = document.createElement("div");
  n.className = "cg-track", n.setAttribute("aria-label", "만화 컷 목록");
  const i = e.panels.map(($, E) => {
    const A = document.createElement("button");
    return A.type = "button", A.className = "cg-slide", A.setAttribute("aria-label", `${E + 1}번 컷 크게 보기`), A.innerHTML = $.svg, n.append(A), A;
  });
  let r = 0, o, l = null, a = "", c = "", g = [];
  const d = document.createElement("span");
  d.setAttribute("aria-live", "polite");
  const u = document.createElement("div");
  u.className = "cg-controls";
  const y = ($, E) => {
    const A = document.createElement("button");
    return A.type = "button", A.textContent = $, A.addEventListener("click", E), A;
  }, w = ($, E = !0) => {
    r = Math.max(0, Math.min(i.length - 1, $)), d.textContent = `${r + 1} / ${i.length}`, b.disabled = r === 0, m.disabled = r === i.length - 1, o ? (o.querySelector(".cg-stage").innerHTML = e.panels[r].svg, o.querySelector(".cg-position").textContent = d.textContent, o.querySelector("[data-prev]").disabled = r === 0, o.querySelector("[data-next]").disabled = r === i.length - 1) : E && n.scrollTo({ left: i[r].offsetLeft - n.offsetLeft, behavior: "smooth" });
  }, f = () => {
    o && (o.remove(), o = void 0, document.removeEventListener("keydown", p), document.body.style.overflow = a, document.body.style.paddingRight = c, g.forEach(([$, E]) => $.inert = E), g = [], Fe === f && (Fe = void 0), l?.focus({ preventScroll: !0 }));
  }, p = ($) => {
    if ($.key === "Escape" && ($.preventDefault(), f()), ($.key === "ArrowLeft" || $.key === "ArrowRight") && ($.preventDefault(), w(r + ($.key === "ArrowLeft" ? -1 : 1))), $.key === "Tab" && o) {
      const E = Array.from(o.querySelectorAll("button:not(:disabled)")), A = E[0], I = E[E.length - 1];
      $.shiftKey && document.activeElement === A ? ($.preventDefault(), I.focus()) : !$.shiftKey && document.activeElement === I && ($.preventDefault(), A.focus());
    }
  }, h = ($) => {
    Fe?.(), l = document.activeElement, a = document.body.style.overflow, c = document.body.style.paddingRight;
    const E = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden", E > 0 && (document.body.style.paddingRight = `${E}px`), o = document.createElement("div"), o.className = "cg-overlay", o.setAttribute("role", "dialog"), o.setAttribute("aria-modal", "true"), o.setAttribute("aria-label", "만화 전체 화면 보기"), o.tabIndex = -1;
    const A = document.createElement("header"), I = document.createElement("span");
    I.className = "cg-position";
    const L = y("닫기", f);
    A.append(I, L);
    const B = document.createElement("div");
    B.className = "cg-stage";
    const x = document.createElement("div");
    x.className = "cg-controls";
    const G = y("이전 컷", () => w(r - 1));
    G.dataset.prev = "";
    const q = y("다음 컷", () => w(r + 1));
    q.dataset.next = "", x.append(G, q), o.append(A, B, x);
    let X = 0, Ne = 0;
    B.addEventListener("touchstart", (P) => {
      X = P.changedTouches[0].clientX, Ne = P.changedTouches[0].clientY;
    }, { passive: !0 }), B.addEventListener("touchend", (P) => {
      const Ee = P.changedTouches[0].clientX - X, ot = P.changedTouches[0].clientY - Ne;
      Math.abs(Ee) > 50 && Math.abs(Ee) > Math.abs(ot) && w(r + (Ee < 0 ? 1 : -1));
    }, { passive: !0 }), g = Array.from(document.body.children).filter((P) => P instanceof HTMLElement).map((P) => [P, P.inert]), g.forEach(([P]) => P.inert = !0), document.body.append(o), Fe = f, document.addEventListener("keydown", p), w($), L.focus();
  }, b = y("이전 컷", () => w(r - 1)), m = y("다음 컷", () => w(r + 1)), k = y("크게 보기", () => h(r));
  u.append(b, d, m, k), i.forEach(($, E) => $.addEventListener("click", () => {
    window.matchMedia("(max-width: 700px)").matches ? h(E) : w(E);
  })), n.addEventListener("scroll", () => {
    if (o) return;
    const $ = n.scrollLeft + n.clientWidth / 2;
    let E = 0, A = 1 / 0;
    i.forEach((I, L) => {
      const B = Math.abs(I.offsetLeft - n.offsetLeft + I.clientWidth / 2 - $);
      B < A && (E = L, A = B);
    }), w(E, !1);
  }, { passive: !0 }), n.addEventListener("keydown", ($) => {
    ($.key === "ArrowRight" || $.key === "ArrowLeft") && ($.preventDefault(), w(r + ($.key === "ArrowRight" ? 1 : -1)), i[r].focus({ preventScroll: !0 }));
  });
  const S = document.createElement("details"), N = document.createElement("summary");
  N.textContent = "원문 코드 보기";
  const O = document.createElement("pre");
  O.className = "cg-code", O.textContent = t, S.append(N, O), s.append(n, u, S), w(0, !1), $t.set(s, f);
}
const Wt = /* @__PURE__ */ new WeakMap(), ci = Ks();
function di(s = document, e = {}) {
  qs();
  const t = [];
  for (const n of s.querySelectorAll(
    'pre[language="comic-gen"], pre[data-comic], pre:has(code.language-comic), pre:has(code.language-comic-gen)'
  )) {
    const i = (n.querySelector("code") ?? n).textContent ?? "", r = ci.renderPanels(i, e);
    let o = Wt.get(n);
    if (o || (o = document.createElement("figure"), o.className = "comic-figure", n.after(o), Wt.set(n, o)), ai(o), r.svg && n.hasAttribute("viewer"))
      li(o, r, i), n.hidden = !0;
    else if (r.svg)
      o.innerHTML = r.panels.map((l) => l.svg).join(""), n.hidden = !0;
    else {
      o.replaceChildren();
      const l = document.createElement("p");
      l.setAttribute("role", "alert"), l.textContent = r.diagnostics.join(`
`), o.append(l), n.hidden = !1;
    }
    t.push(r);
  }
  return t;
}
function pi(s, e) {
  const t = URL.createObjectURL(s), n = document.createElement("a");
  n.href = t, n.download = e, n.click(), setTimeout(() => URL.revokeObjectURL(t), 1e3);
}
async function mi(s, e = 1) {
  if (!s.svg || !Number.isFinite(e) || e < 0.5 || e > 4)
    throw new Error("올바른 만화와 0.5~4 배율이 필요합니다.");
  const t = Math.round(s.width * e), n = Math.round(s.height * e);
  if (t > 16384 || n > 16384 || t * n > 32e6)
    throw new Error("PNG 크기가 너무 큽니다. 배율이나 컷 수를 줄이세요.");
  await document.fonts.ready;
  const i = URL.createObjectURL(
    new Blob([s.svg], { type: "image/svg+xml;charset=utf-8" })
  );
  try {
    const r = new Image();
    r.src = i, await r.decode();
    const o = document.createElement("canvas");
    o.width = t, o.height = n;
    const l = o.getContext("2d");
    if (!l) throw new Error("이 브라우저에서는 PNG를 만들 수 없습니다.");
    return l.drawImage(r, 0, 0, t, n), await new Promise(
      (a, c) => o.toBlob(
        (g) => g ? a(g) : c(new Error("PNG 생성에 실패했습니다.")),
        "image/png"
      )
    );
  } finally {
    URL.revokeObjectURL(i);
  }
}
export {
  fi as assetVersion,
  Ks as createRenderer,
  pi as downloadBlob,
  mi as exportPng,
  di as renderCodeBlocks,
  ui as renderComic,
  hi as renderPanels
};
