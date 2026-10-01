/*! Comic Gen browser SDK v0.4.0
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
const Ji = "1", ls = {
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
}, cs = {
  neutral: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-10 17q10 7 20 0" fill="none"/>',
  happy: '<path d="M-25 -2q8 -12 16 0m18 0q8 -12 16 0M-13 16q13 18 26 0" fill="none"/>',
  confused: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-24 -17l13 -5m21 1 14 4M-8 18q8 -6 16 0" fill="none"/>',
  sad: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-12 23q12 -14 24 0" fill="none"/>',
  angry: '<path d="M-25 -16l15 6m20 0 15 -6M-10 20h20" fill="none"/><circle cx="-17" cy="-1" r="3"/><circle cx="17" cy="-1" r="3"/>'
}, fs = {
  wave: '<g data-hand="wave"><circle cx="-65" cy="-22" r="12" fill="white"/><path d="M-77 -42l-4 -8m15 2v-10m13 17 5 -7" fill="none"/></g>',
  point: '<g data-hand="point"><circle cx="-65" cy="0" r="11" fill="white"/><path d="M-77 0h-13" fill="none"/></g>'
}, We = {
  request: '<rect x="-18" y="-13" width="36" height="26" rx="4" fill="#f9f0cd"/><path d="M-18 -13L0 1l18 -14" fill="none"/>',
  data: '<path d="M-16 -12v23c0 10 32 10 32 0v-23" fill="#daccff"/><ellipse cy="-12" rx="16" ry="6" fill="#ece4ff"/>',
  key: '<circle cx="-10" r="9" fill="#ffe0a8"/><path d="M0 0h21m-5 0v8m-8 -8v6" fill="none"/>'
};
function F(s) {
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
class hn {
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
const xt = /* @__PURE__ */ Symbol.for("yaml.alias"), $t = /* @__PURE__ */ Symbol.for("yaml.document"), ne = /* @__PURE__ */ Symbol.for("yaml.map"), us = /* @__PURE__ */ Symbol.for("yaml.pair"), W = /* @__PURE__ */ Symbol.for("yaml.scalar"), be = /* @__PURE__ */ Symbol.for("yaml.seq"), U = /* @__PURE__ */ Symbol.for("yaml.node.type"), ke = (s) => !!s && typeof s == "object" && s[U] === xt, tt = (s) => !!s && typeof s == "object" && s[U] === $t, je = (s) => !!s && typeof s == "object" && s[U] === ne, M = (s) => !!s && typeof s == "object" && s[U] === us, T = (s) => !!s && typeof s == "object" && s[U] === W, Be = (s) => !!s && typeof s == "object" && s[U] === be;
function x(s) {
  if (s && typeof s == "object")
    switch (s[U]) {
      case ne:
      case be:
        return !0;
    }
  return !1;
}
function C(s) {
  if (s && typeof s == "object")
    switch (s[U]) {
      case xt:
      case ne:
      case W:
      case be:
        return !0;
    }
  return !1;
}
const hs = (s) => (T(s) || x(s)) && !!s.anchor, re = /* @__PURE__ */ Symbol("break visit"), dn = /* @__PURE__ */ Symbol("skip children"), Le = /* @__PURE__ */ Symbol("remove node");
function $e(s, e) {
  const t = pn(e);
  tt(s) ? he(null, s.contents, t, Object.freeze([s])) === Le && (s.contents = null) : he(null, s, t, Object.freeze([]));
}
$e.BREAK = re;
$e.SKIP = dn;
$e.REMOVE = Le;
function he(s, e, t, n) {
  const i = mn(s, e, t, n);
  if (C(i) || M(i))
    return gn(s, n, i), he(s, i, t, n);
  if (typeof i != "symbol") {
    if (x(e)) {
      n = Object.freeze(n.concat(e));
      for (let r = 0; r < e.items.length; ++r) {
        const o = he(r, e.items[r], t, n);
        if (typeof o == "number")
          r = o - 1;
        else {
          if (o === re)
            return re;
          o === Le && (e.items.splice(r, 1), r -= 1);
        }
      }
    } else if (M(e)) {
      n = Object.freeze(n.concat(e));
      const r = he("key", e.key, t, n);
      if (r === re)
        return re;
      r === Le && (e.key = null);
      const o = he("value", e.value, t, n);
      if (o === re)
        return re;
      o === Le && (e.value = null);
    }
  }
  return i;
}
function pn(s) {
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
function mn(s, e, t, n) {
  if (typeof t == "function")
    return t(s, e, n);
  if (je(e))
    return t.Map?.(s, e, n);
  if (Be(e))
    return t.Seq?.(s, e, n);
  if (M(e))
    return t.Pair?.(s, e, n);
  if (T(e))
    return t.Scalar?.(s, e, n);
  if (ke(e))
    return t.Alias?.(s, e, n);
}
function gn(s, e, t) {
  const n = e[e.length - 1];
  if (x(n))
    n.items[s] = t;
  else if (M(n))
    s === "key" ? n.key = t : n.value = t;
  else if (tt(n))
    n.contents = t;
  else {
    const i = ke(n) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${i} parent`);
  }
}
const yn = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, wn = (s) => s.replace(/[!,[\]{}]/g, (e) => yn[e]);
class B {
  constructor(e, t) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, B.defaultYaml, e), this.tags = Object.assign({}, B.defaultTags, t);
  }
  clone() {
    const e = new B(this.yaml, this.tags);
    return e.docStart = this.docStart, e;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const e = new B(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: B.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, B.defaultTags);
        break;
    }
    return e;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(e, t) {
    this.atNextDocument && (this.yaml = { explicit: B.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, B.defaultTags), this.atNextDocument = !1);
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
        return t + wn(e.substring(n.length));
    return e[0] === "!" ? e : `!<${e}>`;
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], n = Object.entries(this.tags);
    let i;
    if (e && n.length > 0 && C(e.contents)) {
      const r = {};
      $e(e.contents, (o, l) => {
        C(l) && l.tag && (r[l.tag] = !0);
      }), i = Object.keys(r);
    } else
      i = [];
    for (const [r, o] of n)
      r === "!!" && o === "tag:yaml.org,2002:" || (!e || i.some((l) => l.startsWith(o))) && t.push(`%TAG ${r} ${o}`);
    return t.join(`
`);
  }
}
B.defaultYaml = { explicit: !1, version: "1.2" };
B.defaultTags = { "!!": "tag:yaml.org,2002:" };
function ds(s) {
  if (/[\x00-\x19\s,[\]{}]/.test(s)) {
    const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(s)}`;
    throw new Error(t);
  }
  return !0;
}
function ps(s) {
  const e = /* @__PURE__ */ new Set();
  return $e(s, {
    Value(t, n) {
      n.anchor && e.add(n.anchor);
    }
  }), e;
}
function ms(s, e) {
  for (let t = 1; ; ++t) {
    const n = `${s}${t}`;
    if (!e.has(n))
      return n;
  }
}
function bn(s, e) {
  const t = [], n = /* @__PURE__ */ new Map();
  let i = null;
  return {
    onAnchor: (r) => {
      t.push(r), i ?? (i = ps(s));
      const o = ms(e, i);
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
        if (typeof o == "object" && o.anchor && (T(o.node) || x(o.node)))
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
function de(s, e, t, n) {
  if (n && typeof n == "object")
    if (Array.isArray(n))
      for (let i = 0, r = n.length; i < r; ++i) {
        const o = n[i], l = de(s, n, String(i), o);
        l === void 0 ? delete n[i] : l !== o && (n[i] = l);
      }
    else if (n instanceof Map)
      for (const i of Array.from(n.keys())) {
        const r = n.get(i), o = de(s, n, i, r);
        o === void 0 ? n.delete(i) : o !== r && n.set(i, o);
      }
    else if (n instanceof Set)
      for (const i of Array.from(n)) {
        const r = de(s, n, i, i);
        r === void 0 ? n.delete(i) : r !== i && (n.delete(i), n.add(r));
      }
    else
      for (const [i, r] of Object.entries(n)) {
        const o = de(s, n, i, r);
        o === void 0 ? delete n[i] : o !== r && (n[i] = o);
      }
  return s.call(e, t, n);
}
function R(s, e, t) {
  if (Array.isArray(s))
    return s.map((n, i) => R(n, String(i), t));
  if (s && typeof s.toJSON == "function") {
    if (!t || !hs(s))
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
class Ct {
  constructor(e) {
    Object.defineProperty(this, U, { value: e });
  }
  /** Create a copy of this node.  */
  clone() {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (e.range = this.range.slice()), e;
  }
  /** A plain JavaScript representation of this node. */
  toJS(e, { mapAsMap: t, maxAliasCount: n, onAnchor: i, reviver: r } = {}) {
    if (!tt(e))
      throw new TypeError("A document argument is required");
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: e,
      keep: !0,
      mapAsMap: t === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof n == "number" ? n : 100
    }, l = R(this, "", o);
    if (typeof i == "function")
      for (const { count: a, res: c } of o.anchors.values())
        i(c, a);
    return typeof r == "function" ? de(r, { "": l }, "", l) : l;
  }
}
class Mt extends Ct {
  constructor(e) {
    super(xt), this.source = e, Object.defineProperty(this, "tag", {
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
        (ke(o) || hs(o)) && n.push(o);
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
      if (a || (R(i, null, t), a = r.get(i)), a?.res === void 0) {
        const c = "This should not happen: Alias anchor was not resolved?";
        throw new ReferenceError(c);
      }
      if (l >= 0 && (a.count += 1, a.aliasCount === 0 && (a.aliasCount = ze(o, i, r)), a.count * a.aliasCount > l)) {
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
      if (ds(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
        const r = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(r);
      }
      if (e.implicitKey)
        return `${i} `;
    }
    return i;
  }
}
function ze(s, e, t) {
  if (ke(e)) {
    const n = e.resolve(s), i = t && n && t.get(n);
    return i ? i.count * i.aliasCount : 0;
  } else if (x(e)) {
    let n = 0;
    for (const i of e.items) {
      const r = ze(s, i, t);
      r > n && (n = r);
    }
    return n;
  } else if (M(e)) {
    const n = ze(s, e.key, t), i = ze(s, e.value, t);
    return Math.max(n, i);
  }
  return 1;
}
const gs = (s) => !s || typeof s != "function" && typeof s != "object";
class E extends Ct {
  constructor(e) {
    super(W), this.value = e;
  }
  toJSON(e, t) {
    return t?.keep ? this.value : R(this.value, e, t);
  }
  toString() {
    return String(this.value);
  }
}
E.BLOCK_FOLDED = "BLOCK_FOLDED";
E.BLOCK_LITERAL = "BLOCK_LITERAL";
E.PLAIN = "PLAIN";
E.QUOTE_DOUBLE = "QUOTE_DOUBLE";
E.QUOTE_SINGLE = "QUOTE_SINGLE";
const kn = "tag:yaml.org,2002:";
function $n(s, e, t) {
  if (e) {
    const n = t.filter((r) => r.tag === e), i = n.find((r) => !r.format) ?? n[0];
    if (!i)
      throw new Error(`Tag ${e} not found`);
    return i;
  }
  return t.find((n) => n.identify?.(s) && !n.format);
}
function Ce(s, e, t) {
  if (tt(s) && (s = s.contents), C(s))
    return s;
  if (M(s)) {
    const u = t.schema[ne].createNode?.(t.schema, null, t);
    return u.items.push(s), u;
  }
  (s instanceof String || s instanceof Number || s instanceof Boolean || typeof BigInt < "u" && s instanceof BigInt) && (s = s.valueOf());
  const { aliasDuplicateObjects: n, onAnchor: i, onTagObj: r, schema: o, sourceObjects: l } = t;
  let a;
  if (n && s && typeof s == "object") {
    if (a = l.get(s), a)
      return a.anchor ?? (a.anchor = i(s)), new Mt(a.anchor);
    a = { anchor: null, node: null }, l.set(s, a);
  }
  e?.startsWith("!!") && (e = kn + e.slice(2));
  let c = $n(s, e, o.tags);
  if (!c) {
    if (s && typeof s.toJSON == "function" && (s = s.toJSON()), !s || typeof s != "object") {
      const u = new E(s);
      return a && (a.node = u), u;
    }
    c = s instanceof Map ? o[ne] : Symbol.iterator in Object(s) ? o[be] : o[ne];
  }
  r && (r(c), delete t.onTagObj);
  const d = c?.createNode ? c.createNode(t.schema, s, t) : typeof c?.nodeClass?.from == "function" ? c.nodeClass.from(t.schema, s, t) : new E(s);
  return e ? d.tag = e : c.default || (d.tag = c.tag), a && (a.node = d), d;
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
  return Ce(n, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: s,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const Oe = (s) => s == null || typeof s == "object" && !!s[Symbol.iterator]().next().done;
class ys extends Ct {
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
    return e && (t.schema = e), t.items = t.items.map((n) => C(n) || M(n) ? n.clone(e) : n), this.range && (t.range = this.range.slice()), t;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(e, t) {
    if (Oe(e))
      this.add(t);
    else {
      const [n, ...i] = e, r = this.get(n, !0);
      if (x(r))
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
    if (x(i))
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
    return i.length === 0 ? !t && T(r) ? r.value : r : x(r) ? r.getIn(i, t) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!M(t))
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
    return x(i) ? i.hasIn(n) : !1;
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
      if (x(r))
        r.setIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(n, Je(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`);
    }
  }
}
const Sn = (s) => s.replace(/^(?!$)(?: $)?/gm, "#");
function X(s, e) {
  return /^\n+$/.test(s) ? s.substring(1) : e ? s.replace(/^(?! *$)/gm, e) : s;
}
const oe = (s, e, t) => s.endsWith(`
`) ? X(t, e) : t.includes(`
`) ? `
` + X(t, e) : (s.endsWith(" ") ? "" : " ") + t, ws = "flow", St = "block", Ye = "quoted";
function st(s, e, t = "flow", { indentAtStart: n, lineWidth: i = 80, minContentWidth: r = 20, onFold: o, onOverflow: l } = {}) {
  if (!i || i < 0)
    return s;
  i < r && (r = 0);
  const a = Math.max(1 + r, 1 + i - e.length);
  if (s.length <= a)
    return s;
  const c = [], d = {};
  let u = i - e.length;
  typeof n == "number" && (n > i - Math.max(2, r) ? c.push(0) : u = i - n);
  let h, m, y = !1, f = -1, p = -1, w = -1;
  t === St && (f = Yt(s, f, e.length), f !== -1 && (u = f + a));
  for (let S; S = s[f += 1]; ) {
    if (t === Ye && S === "\\") {
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
      w = f;
    }
    if (S === `
`)
      t === St && (f = Yt(s, f, e.length)), u = f + e.length + a, h = void 0;
    else {
      if (S === " " && m && m !== " " && m !== `
` && m !== "	") {
        const g = s[f + 1];
        g && g !== " " && g !== `
` && g !== "	" && (h = f);
      }
      if (f >= u)
        if (h)
          c.push(h), u = h + a, h = void 0;
        else if (t === Ye) {
          for (; m === " " || m === "	"; )
            m = S, S = s[f += 1], y = !0;
          const g = f > w + 1 ? f - 2 : p - 1;
          if (d[g])
            return s;
          c.push(g), d[g] = !0, u = g + a, h = void 0;
        } else
          y = !0;
    }
    m = S;
  }
  if (y && l && l(), c.length === 0)
    return s;
  o && o();
  let $ = s.slice(0, c[0]);
  for (let S = 0; S < c.length; ++S) {
    const g = c[S], k = c[S + 1] || s.length;
    g === 0 ? $ = `
${e}${s.slice(0, k)}` : (t === Ye && d[g] && ($ += `${s[g]}\\`), $ += `
${e}${s.slice(g + 1, k)}`);
  }
  return $;
}
function Yt(s, e, t) {
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
const nt = (s, e) => ({
  indentAtStart: e ? s.indent.length : s.indentAtStart,
  lineWidth: s.options.lineWidth,
  minContentWidth: s.options.minContentWidth
}), it = (s) => /^(%|---|\.\.\.)/m.test(s);
function vn(s, e, t) {
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
function Ie(s, e) {
  const t = JSON.stringify(s);
  if (e.options.doubleQuotedAsJSON)
    return t;
  const { implicitKey: n } = e, i = e.options.doubleQuotedMinMultiLineLength, r = e.indent || (it(s) ? "  " : "");
  let o = "", l = 0;
  for (let a = 0, c = t[a]; c; c = t[++a])
    if (c === " " && t[a + 1] === "\\" && t[a + 2] === "n" && (o += t.slice(l, a) + "\\ ", a += 1, l = a, c = "\\"), c === "\\")
      switch (t[a + 1]) {
        case "u":
          {
            o += t.slice(l, a);
            const d = t.substr(a + 2, 4);
            switch (d) {
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
                d.substr(0, 2) === "00" ? o += "\\x" + d.substr(2) : o += t.substr(a, 6);
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
  return o = l ? o + t.slice(l) : t, n ? o : st(o, r, Ye, nt(e, !1));
}
function vt(s, e) {
  if (e.options.singleQuote === !1 || e.implicitKey && s.includes(`
`) || /[ \t]\n|\n[ \t]/.test(s))
    return Ie(s, e);
  const t = e.indent || (it(s) ? "  " : ""), n = "'" + s.replace(/'/g, "''").replace(/\n+/g, `$&
${t}`) + "'";
  return e.implicitKey ? n : st(n, t, ws, nt(e, !1));
}
function pe(s, e) {
  const { singleQuote: t } = e.options;
  let n;
  if (t === !1)
    n = Ie;
  else {
    const i = s.includes('"'), r = s.includes("'");
    i && !r ? n = vt : r && !i ? n = Ie : n = t ? vt : Ie;
  }
  return n(s, e);
}
let Nt;
try {
  Nt = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  Nt = /\n+(?!\n|$)/g;
}
function Ge({ comment: s, type: e, value: t }, n, i, r) {
  const { blockQuote: o, commentString: l, lineWidth: a } = n.options;
  if (!o || /\n[\t ]+$/.test(t))
    return pe(t, n);
  const c = n.indent || (n.forceBlockIndent || it(t) ? "  " : ""), d = o === "literal" ? !0 : o === "folded" || e === E.BLOCK_FOLDED ? !1 : e === E.BLOCK_LITERAL ? !0 : !vn(t, a, c.length);
  if (!t)
    return d ? `|
` : `>
`;
  let u, h;
  for (h = t.length; h > 0; --h) {
    const k = t[h - 1];
    if (k !== `
` && k !== "	" && k !== " ")
      break;
  }
  let m = t.substring(h);
  const y = m.indexOf(`
`);
  y === -1 ? u = "-" : t === m || y !== m.length - 1 ? (u = "+", r && r()) : u = "", m && (t = t.slice(0, -m.length), m[m.length - 1] === `
` && (m = m.slice(0, -1)), m = m.replace(Nt, `$&${c}`));
  let f = !1, p, w = -1;
  for (p = 0; p < t.length; ++p) {
    const k = t[p];
    if (k === " ")
      f = !0;
    else if (k === `
`)
      w = p;
    else
      break;
  }
  let $ = t.substring(0, w < p ? w + 1 : p);
  $ && (t = t.substring($.length), $ = $.replace(/\n+/g, `$&${c}`));
  let g = (f ? c ? "2" : "1" : "") + u;
  if (s && (g += " " + l(s.replace(/ ?[\r\n]+/g, " ")), i && i()), !d) {
    const k = t.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${c}`);
    let v = !1;
    const N = nt(n, !0);
    o !== "folded" && e !== E.BLOCK_FOLDED && (N.onOverflow = () => {
      v = !0;
    });
    const b = st(`${$}${k}${m}`, c, St, N);
    if (!v)
      return `>${g}
${c}${b}`;
  }
  return t = t.replace(/\n+/g, `$&${c}`), `|${g}
${c}${$}${t}${m}`;
}
function Nn(s, e, t, n) {
  const { type: i, value: r } = s, { actualString: o, implicitKey: l, indent: a, indentStep: c, inFlow: d } = e;
  if (l && r.includes(`
`) || d && /[[\]{},]/.test(r))
    return pe(r, e);
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
    return l || d || !r.includes(`
`) ? pe(r, e) : Ge(s, e, t, n);
  if (!l && !d && i !== E.PLAIN && r.includes(`
`))
    return Ge(s, e, t, n);
  if (it(r)) {
    if (a === "")
      return e.forceBlockIndent = !0, Ge(s, e, t, n);
    if (l && a === c)
      return pe(r, e);
  }
  const u = r.replace(/\n+/g, `$&
${a}`);
  if (o) {
    const h = (f) => f.default && f.tag !== "tag:yaml.org,2002:str" && f.test?.test(u), { compat: m, tags: y } = e.doc.schema;
    if (y.some(h) || m?.some(h))
      return pe(r, e);
  }
  return l ? u : st(u, a, ws, nt(e, !1));
}
function _t(s, e, t, n) {
  const { implicitKey: i, inFlow: r } = e, o = typeof s.value == "string" ? s : Object.assign({}, s, { value: String(s.value) });
  let { type: l } = s;
  l !== E.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (l = E.QUOTE_DOUBLE);
  const a = (d) => {
    switch (d) {
      case E.BLOCK_FOLDED:
      case E.BLOCK_LITERAL:
        return i || r ? pe(o.value, e) : Ge(o, e, t, n);
      case E.QUOTE_DOUBLE:
        return Ie(o.value, e);
      case E.QUOTE_SINGLE:
        return vt(o.value, e);
      case E.PLAIN:
        return Nn(o, e, t, n);
      default:
        return null;
    }
  };
  let c = a(l);
  if (c === null) {
    const { defaultKeyType: d, defaultStringType: u } = e.options, h = i && d || u;
    if (c = a(h), c === null)
      throw new Error(`Unsupported default string type ${h}`);
  }
  return c;
}
function bs(s, e) {
  const t = Object.assign({
    blockQuote: !0,
    commentString: Sn,
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
function En(s, e) {
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
function On(s, e, { anchors: t, doc: n }) {
  if (!n.directives)
    return "";
  const i = [], r = (T(s) || x(s)) && s.anchor;
  r && ds(r) && (t.add(r), i.push(`&${r}`));
  const o = s.tag ?? (e.default ? null : e.tag);
  return o && i.push(n.directives.tagString(o)), i.join(" ");
}
function ye(s, e, t, n) {
  if (M(s))
    return s.toString(e, t, n);
  if (ke(s)) {
    if (e.doc.directives)
      return s.toString(e);
    if (e.resolvedAliases?.has(s))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    e.resolvedAliases ? e.resolvedAliases.add(s) : e.resolvedAliases = /* @__PURE__ */ new Set([s]), s = s.resolve(e.doc);
  }
  let i;
  const r = C(s) ? s : e.doc.createNode(s, { onTagObj: (a) => i = a });
  i ?? (i = En(e.doc.schema.tags, r));
  const o = On(r, i, e);
  o.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + o.length + 1);
  const l = typeof i.stringify == "function" ? i.stringify(r, e, t, n) : T(r) ? _t(r, e, t, n) : r.toString(e, t, n);
  return o ? T(r) || l[0] === "{" || l[0] === "[" ? `${o} ${l}` : `${o}
${e.indent}${l}` : l;
}
function An({ key: s, value: e }, t, n, i) {
  const { allNullValues: r, doc: o, indent: l, indentStep: a, options: { commentString: c, indentSeq: d, simpleKeys: u } } = t;
  let h = C(s) && s.comment || null;
  if (u) {
    if (h)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (x(s) || !C(s) && typeof s == "object") {
      const N = "With simple keys, collection cannot be used as a key value";
      throw new Error(N);
    }
  }
  let m = !u && (!s || h && e == null && !t.inFlow || x(s) || (T(s) ? s.type === E.BLOCK_FOLDED || s.type === E.BLOCK_LITERAL : typeof s == "object"));
  t = Object.assign({}, t, {
    allNullValues: !1,
    implicitKey: !m && (u || !r),
    indent: l + a
  });
  let y = !1, f = !1, p = ye(s, t, () => y = !0, () => f = !0);
  if (!m && !t.inFlow && p.length > 1024) {
    if (u)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    m = !0;
  }
  if (t.inFlow) {
    if (r || e == null)
      return y && n && n(), p === "" ? "?" : m ? `? ${p}` : p;
  } else if (r && !u || e == null && m)
    return p = `? ${p}`, h && !y ? p += oe(p, t.indent, c(h)) : f && i && i(), p;
  y && (h = null), m ? (h && (p += oe(p, t.indent, c(h))), p = `? ${p}
${l}:`) : (p = `${p}:`, h && (p += oe(p, t.indent, c(h))));
  let w, $, S;
  C(e) ? (w = !!e.spaceBefore, $ = e.commentBefore, S = e.comment) : (w = !1, $ = null, S = null, e && typeof e == "object" && (e = o.createNode(e))), t.implicitKey = !1, !m && !h && T(e) && (t.indentAtStart = p.length + 1), f = !1, !d && a.length >= 2 && !t.inFlow && !m && Be(e) && !e.flow && !e.tag && !e.anchor && (t.indent = t.indent.substring(2));
  let g = !1;
  const k = ye(e, t, () => g = !0, () => f = !0);
  let v = " ";
  if (h || w || $) {
    if (v = w ? `
` : "", $) {
      const N = c($);
      v += `
${X(N, t.indent)}`;
    }
    k === "" && !t.inFlow ? v === `
` && S && (v = `

`) : v += `
${t.indent}`;
  } else if (!m && x(e)) {
    const N = k[0], b = k.indexOf(`
`), O = b !== -1, L = t.inFlow ?? e.flow ?? e.items.length === 0;
    if (O || !L) {
      let _ = !1;
      if (O && (N === "&" || N === "!")) {
        let A = k.indexOf(" ");
        N === "&" && A !== -1 && A < b && k[A + 1] === "!" && (A = k.indexOf(" ", A + 1)), (A === -1 || b < A) && (_ = !0);
      }
      _ || (v = `
${t.indent}`);
    }
  } else (k === "" || k[0] === `
`) && (v = "");
  return p += v + k, t.inFlow ? g && n && n() : S && !g ? p += oe(p, t.indent, c(S)) : f && i && i(), p;
}
function Tn(s, e) {
  (s === "debug" || s === "warn") && console.warn(e);
}
const De = "<<", Z = {
  identify: (s) => s === De || typeof s == "symbol" && s.description === De,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new E(Symbol(De)), {
    addToJSMap: ks
  }),
  stringify: () => De
}, Ln = (s, e) => (Z.identify(e) || T(e) && (!e.type || e.type === E.PLAIN) && Z.identify(e.value)) && s?.doc.schema.tags.some((t) => t.tag === Z.tag && t.default);
function ks(s, e, t) {
  const n = $s(s, t);
  if (Be(n))
    for (const i of n.items)
      pt(s, e, i);
  else if (Array.isArray(n))
    for (const i of n)
      pt(s, e, i);
  else
    pt(s, e, n);
}
function pt(s, e, t) {
  const n = $s(s, t);
  if (!je(n))
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
function $s(s, e) {
  return s && ke(e) ? e.resolve(s.doc, s) : e;
}
function Ss(s, e, { key: t, value: n }) {
  if (C(t) && t.addToJSMap)
    t.addToJSMap(s, e, n);
  else if (Ln(s, t))
    ks(s, e, n);
  else {
    const i = R(t, "", s);
    if (e instanceof Map)
      e.set(i, R(n, i, s));
    else if (e instanceof Set)
      e.add(i);
    else {
      const r = In(t, i, s), o = R(n, r, s);
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
function In(s, e, t) {
  if (e === null)
    return "";
  if (typeof e != "object")
    return String(e);
  if (C(s) && t?.doc) {
    const n = bs(t.doc, {});
    n.anchors = /* @__PURE__ */ new Set();
    for (const r of t.anchors.keys())
      n.anchors.add(r.anchor);
    n.inFlow = !0, n.inStringifyKey = !0;
    const i = s.toString(n);
    if (!t.mapKeyWarned) {
      let r = JSON.stringify(i);
      r.length > 40 && (r = r.substring(0, 36) + '..."'), Tn(t.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`), t.mapKeyWarned = !0;
    }
    return i;
  }
  return JSON.stringify(e);
}
function jt(s, e, t) {
  const n = Ce(s, void 0, t), i = Ce(e, void 0, t);
  return new P(n, i);
}
class P {
  constructor(e, t = null) {
    Object.defineProperty(this, U, { value: us }), this.key = e, this.value = t;
  }
  clone(e) {
    let { key: t, value: n } = this;
    return C(t) && (t = t.clone(e)), C(n) && (n = n.clone(e)), new P(t, n);
  }
  toJSON(e, t) {
    const n = t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return Ss(t, n, this);
  }
  toString(e, t, n) {
    return e?.doc ? An(this, e, t, n) : JSON.stringify(this);
  }
}
function vs(s, e, t) {
  return (e.inFlow ?? s.flow ? Cn : xn)(s, e, t);
}
function xn({ comment: s, items: e }, t, { blockItemPrefix: n, flowChars: i, itemIndent: r, onChompKeep: o, onComment: l }) {
  const { indent: a, options: { commentString: c } } = t, d = Object.assign({}, t, { indent: r, type: null });
  let u = !1;
  const h = [];
  for (let y = 0; y < e.length; ++y) {
    const f = e[y];
    let p = null;
    if (C(f))
      !u && f.spaceBefore && h.push(""), He(t, h, f.commentBefore, u), f.comment && (p = f.comment);
    else if (M(f)) {
      const $ = C(f.key) ? f.key : null;
      $ && (!u && $.spaceBefore && h.push(""), He(t, h, $.commentBefore, u));
    }
    u = !1;
    let w = ye(f, d, () => p = null, () => u = !0);
    p && (w += oe(w, r, c(p))), u && p && (u = !1), h.push(n + w);
  }
  let m;
  if (h.length === 0)
    m = i.start + i.end;
  else {
    m = h[0];
    for (let y = 1; y < h.length; ++y) {
      const f = h[y];
      m += f ? `
${a}${f}` : `
`;
    }
  }
  return s ? (m += `
` + X(c(s), a), l && l()) : u && o && o(), m;
}
function Cn({ items: s }, e, { flowChars: t, itemIndent: n }) {
  const { indent: i, indentStep: r, flowCollectionPadding: o, options: { commentString: l } } = e;
  n += r;
  const a = Object.assign({}, e, {
    indent: n,
    inFlow: !0,
    type: null
  });
  let c = !1, d = 0;
  const u = [];
  for (let y = 0; y < s.length; ++y) {
    const f = s[y];
    let p = null;
    if (C(f))
      f.spaceBefore && u.push(""), He(e, u, f.commentBefore, !1), f.comment && (p = f.comment);
    else if (M(f)) {
      const $ = C(f.key) ? f.key : null;
      $ && ($.spaceBefore && u.push(""), He(e, u, $.commentBefore, !1), $.comment && (c = !0));
      const S = C(f.value) ? f.value : null;
      S ? (S.comment && (p = S.comment), S.commentBefore && (c = !0)) : f.value == null && $?.comment && (p = $.comment);
    }
    p && (c = !0);
    let w = ye(f, a, () => p = null);
    c || (c = u.length > d || w.includes(`
`)), y < s.length - 1 ? w += "," : e.options.trailingComma && (e.options.lineWidth > 0 && (c || (c = u.reduce(($, S) => $ + S.length + 2, 2) + (w.length + 2) > e.options.lineWidth)), c && (w += ",")), p && (w += oe(w, n, l(p))), u.push(w), d = u.length;
  }
  const { start: h, end: m } = t;
  if (u.length === 0)
    return h + m;
  if (!c) {
    const y = u.reduce((f, p) => f + p.length + 2, 2);
    c = e.options.lineWidth > 0 && y > e.options.lineWidth;
  }
  if (c) {
    let y = h;
    for (const f of u)
      y += f ? `
${r}${i}${f}` : `
`;
    return `${y}
${i}${m}`;
  } else
    return `${h}${o}${u.join(" ")}${o}${m}`;
}
function He({ indent: s, options: { commentString: e } }, t, n, i) {
  if (n && i && (n = n.replace(/^\n+/, "")), n) {
    const r = X(e(n), s);
    t.push(r.trimStart());
  }
}
function ae(s, e) {
  const t = T(e) ? e.value : e;
  for (const n of s)
    if (M(n) && (n.key === e || n.key === t || T(n.key) && n.key.value === t))
      return n;
}
class q extends ys {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(e) {
    super(ne, e), this.items = [];
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
      (c !== void 0 || i) && o.items.push(jt(a, c, n));
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
    M(e) ? n = e : !e || typeof e != "object" || !("key" in e) ? n = new P(e, e?.value) : n = new P(e.key, e.value);
    const i = ae(this.items, n.key), r = this.schema?.sortMapEntries;
    if (i) {
      if (!t)
        throw new Error(`Key ${n.key} already set`);
      T(i.value) && gs(n.value) ? i.value.value = n.value : i.value = n.value;
    } else if (r) {
      const o = this.items.findIndex((l) => r(n, l) < 0);
      o === -1 ? this.items.push(n) : this.items.splice(o, 0, n);
    } else
      this.items.push(n);
  }
  delete(e) {
    const t = ae(this.items, e);
    return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
  }
  get(e, t) {
    const i = ae(this.items, e)?.value;
    return (!t && T(i) ? i.value : i) ?? void 0;
  }
  has(e) {
    return !!ae(this.items, e);
  }
  set(e, t) {
    this.add(new P(e, t), !0);
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
      Ss(t, i, r);
    return i;
  }
  toString(e, t, n) {
    if (!e)
      return JSON.stringify(this);
    for (const i of this.items)
      if (!M(i))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);
    return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), vs(this, e, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: e.indent || "",
      onChompKeep: n,
      onComment: t
    });
  }
}
const Se = {
  collection: "map",
  default: !0,
  nodeClass: q,
  tag: "tag:yaml.org,2002:map",
  resolve(s, e) {
    return je(s) || e("Expected a mapping for this tag"), s;
  },
  createNode: (s, e, t) => q.from(s, e, t)
};
class le extends ys {
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
    const t = Fe(e);
    return typeof t != "number" ? !1 : this.items.splice(t, 1).length > 0;
  }
  get(e, t) {
    const n = Fe(e);
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
    const t = Fe(e);
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
    const n = Fe(e);
    if (typeof n != "number")
      throw new Error(`Expected a valid index, not ${e}.`);
    const i = this.items[n];
    T(i) && gs(t) ? i.value = t : this.items[n] = t;
  }
  toJSON(e, t) {
    const n = [];
    t?.onCreate && t.onCreate(n);
    let i = 0;
    for (const r of this.items)
      n.push(R(r, String(i++), t));
    return n;
  }
  toString(e, t, n) {
    return e ? vs(this, e, {
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
        r.items.push(Ce(l, void 0, n));
      }
    }
    return r;
  }
}
function Fe(s) {
  let e = T(s) ? s.value : s;
  return e && typeof e == "string" && (e = Number(e)), typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
const ve = {
  collection: "seq",
  default: !0,
  nodeClass: le,
  tag: "tag:yaml.org,2002:seq",
  resolve(s, e) {
    return Be(s) || e("Expected a sequence for this tag"), s;
  },
  createNode: (s, e, t) => le.from(s, e, t)
}, rt = {
  identify: (s) => typeof s == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (s) => s,
  stringify(s, e, t, n) {
    return e = Object.assign({ actualString: !0 }, e), _t(s, e, t, n);
  }
}, ot = {
  identify: (s) => s == null,
  createNode: () => new E(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new E(null),
  stringify: ({ source: s }, e) => typeof s == "string" && ot.test.test(s) ? s : e.options.nullStr
}, Bt = {
  identify: (s) => typeof s == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (s) => new E(s[0] === "t" || s[0] === "T"),
  stringify({ source: s, value: e }, t) {
    if (s && Bt.test.test(s)) {
      const n = s[0] === "t" || s[0] === "T";
      if (e === n)
        return s;
    }
    return e ? t.options.trueStr : t.options.falseStr;
  }
};
function Y({ format: s, minFractionDigits: e, tag: t, value: n }) {
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
const Ns = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: Y
}, Es = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (s) => parseFloat(s),
  stringify(s) {
    const e = Number(s.value);
    return isFinite(e) ? e.toExponential() : Y(s);
  }
}, Os = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(s) {
    const e = new E(parseFloat(s)), t = s.indexOf(".");
    return t !== -1 && s[s.length - 1] === "0" && (e.minFractionDigits = s.length - t - 1), e;
  },
  stringify: Y
}, at = (s) => typeof s == "bigint" || Number.isInteger(s), Pt = (s, e, t, { intAsBigInt: n }) => n ? BigInt(s) : parseInt(s.substring(e), t);
function As(s, e, t) {
  const { value: n } = s;
  return at(n) && n >= 0 ? t + n.toString(e) : Y(s);
}
const Ts = {
  identify: (s) => at(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (s, e, t) => Pt(s, 2, 8, t),
  stringify: (s) => As(s, 8, "0o")
}, Ls = {
  identify: at,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (s, e, t) => Pt(s, 0, 10, t),
  stringify: Y
}, Is = {
  identify: (s) => at(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (s, e, t) => Pt(s, 2, 16, t),
  stringify: (s) => As(s, 16, "0x")
}, Mn = [
  Se,
  ve,
  rt,
  ot,
  Bt,
  Ts,
  Ls,
  Is,
  Ns,
  Es,
  Os
];
function Gt(s) {
  return typeof s == "bigint" || Number.isInteger(s);
}
const qe = ({ value: s }) => JSON.stringify(s), _n = [
  {
    identify: (s) => typeof s == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (s) => s,
    stringify: qe
  },
  {
    identify: (s) => s == null,
    createNode: () => new E(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: qe
  },
  {
    identify: (s) => typeof s == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (s) => s === "true",
    stringify: qe
  },
  {
    identify: Gt,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (s, e, { intAsBigInt: t }) => t ? BigInt(s) : parseInt(s, 10),
    stringify: ({ value: s }) => Gt(s) ? s.toString() : JSON.stringify(s)
  },
  {
    identify: (s) => typeof s == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (s) => parseFloat(s),
    stringify: qe
  }
], jn = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(s, e) {
    return e(`Unresolved plain scalar ${JSON.stringify(s)}`), s;
  }
}, Bn = [Se, ve].concat(_n, jn), Kt = {
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
    if (e ?? (e = E.BLOCK_LITERAL), e !== E.QUOTE_DOUBLE) {
      const a = Math.max(n.options.lineWidth - n.indent.length, n.options.minContentWidth), c = Math.ceil(l.length / a), d = new Array(c);
      for (let u = 0, h = 0; u < c; ++u, h += a)
        d[u] = l.substr(h, a);
      l = d.join(e === E.BLOCK_LITERAL ? `
` : " ");
    }
    return _t({ comment: s, type: e, value: l }, n, i, r);
  }
};
function xs(s, e) {
  if (Be(s))
    for (let t = 0; t < s.items.length; ++t) {
      let n = s.items[t];
      if (!M(n)) {
        if (je(n)) {
          n.items.length > 1 && e("Each pair must have its own sequence indicator");
          const i = n.items[0] || new P(new E(null));
          if (n.commentBefore && (i.key.commentBefore = i.key.commentBefore ? `${n.commentBefore}
${i.key.commentBefore}` : n.commentBefore), n.comment) {
            const r = i.value ?? i.key;
            r.comment = r.comment ? `${n.comment}
${r.comment}` : n.comment;
          }
          n = i;
        }
        s.items[t] = M(n) ? n : new P(n);
      }
    }
  else
    e("Expected a sequence for this tag");
  return s;
}
function Cs(s, e, t) {
  const { replacer: n } = t, i = new le(s);
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
      i.items.push(jt(l, a, t));
    }
  return i;
}
const Dt = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: xs,
  createNode: Cs
};
class me extends le {
  constructor() {
    super(), this.add = q.prototype.add.bind(this), this.delete = q.prototype.delete.bind(this), this.get = q.prototype.get.bind(this), this.has = q.prototype.has.bind(this), this.set = q.prototype.set.bind(this), this.tag = me.tag;
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
      if (M(i) ? (r = R(i.key, "", t), o = R(i.value, r, t)) : r = R(i, "", t), n.has(r))
        throw new Error("Ordered maps must not include duplicate keys");
      n.set(r, o);
    }
    return n;
  }
  static from(e, t, n) {
    const i = Cs(e, t, n), r = new this();
    return r.items = i.items, r;
  }
}
me.tag = "tag:yaml.org,2002:omap";
const Ft = {
  collection: "seq",
  identify: (s) => s instanceof Map,
  nodeClass: me,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(s, e) {
    const t = xs(s, e), n = [];
    for (const { key: i } of t.items)
      T(i) && (n.includes(i.value) ? e(`Ordered maps must not include duplicate keys: ${i.value}`) : n.push(i.value));
    return Object.assign(new me(), t);
  },
  createNode: (s, e, t) => me.from(s, e, t)
};
function Ms({ value: s, source: e }, t) {
  return e && (s ? _s : js).test.test(e) ? e : s ? t.options.trueStr : t.options.falseStr;
}
const _s = {
  identify: (s) => s === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new E(!0),
  stringify: Ms
}, js = {
  identify: (s) => s === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new E(!1),
  stringify: Ms
}, Pn = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: Y
}, Kn = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (s) => parseFloat(s.replace(/_/g, "")),
  stringify(s) {
    const e = Number(s.value);
    return isFinite(e) ? e.toExponential() : Y(s);
  }
}, Dn = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(s) {
    const e = new E(parseFloat(s.replace(/_/g, ""))), t = s.indexOf(".");
    if (t !== -1) {
      const n = s.substring(t + 1).replace(/_/g, "");
      n[n.length - 1] === "0" && (e.minFractionDigits = n.length);
    }
    return e;
  },
  stringify: Y
}, Pe = (s) => typeof s == "bigint" || Number.isInteger(s);
function lt(s, e, t, { intAsBigInt: n }) {
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
function qt(s, e, t) {
  const { value: n } = s;
  if (Pe(n)) {
    const i = n.toString(e);
    return n < 0 ? "-" + t + i.substr(1) : t + i;
  }
  return Y(s);
}
const Fn = {
  identify: Pe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (s, e, t) => lt(s, 2, 2, t),
  stringify: (s) => qt(s, 2, "0b")
}, qn = {
  identify: Pe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (s, e, t) => lt(s, 1, 8, t),
  stringify: (s) => qt(s, 8, "0")
}, Rn = {
  identify: Pe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (s, e, t) => lt(s, 0, 10, t),
  stringify: Y
}, Un = {
  identify: Pe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (s, e, t) => lt(s, 2, 16, t),
  stringify: (s) => qt(s, 16, "0x")
};
class ge extends q {
  constructor(e) {
    super(e), this.tag = ge.tag;
  }
  add(e) {
    let t;
    M(e) ? t = e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? t = new P(e.key, null) : t = new P(e, null), ae(this.items, t.key) || this.items.push(t);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(e, t) {
    const n = ae(this.items, e);
    return !t && M(n) ? T(n.key) ? n.key.value : n.key : n;
  }
  set(e, t) {
    if (typeof t != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
    const n = ae(this.items, e);
    n && !t ? this.items.splice(this.items.indexOf(n), 1) : !n && t && this.items.push(new P(e));
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
        typeof i == "function" && (o = i.call(t, o, o)), r.items.push(jt(o, null, n));
    return r;
  }
}
ge.tag = "tag:yaml.org,2002:set";
const Rt = {
  collection: "map",
  identify: (s) => s instanceof Set,
  nodeClass: ge,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (s, e, t) => ge.from(s, e, t),
  resolve(s, e) {
    if (je(s)) {
      if (s.hasAllNullValues(!0))
        return Object.assign(new ge(), s);
      e("Set items must all have null values");
    } else
      e("Expected a mapping for this tag");
    return s;
  }
};
function Ut(s, e) {
  const t = s[0], n = t === "-" || t === "+" ? s.substring(1) : s, i = (o) => e ? BigInt(o) : Number(o), r = n.replace(/_/g, "").split(":").reduce((o, l) => o * i(60) + i(l), i(0));
  return t === "-" ? i(-1) * r : r;
}
function Bs(s) {
  let { value: e } = s, t = (o) => o;
  if (typeof e == "bigint")
    t = (o) => BigInt(o);
  else if (isNaN(e) || !isFinite(e))
    return Y(s);
  let n = "";
  e < 0 && (n = "-", e *= t(-1));
  const i = t(60), r = [e % i];
  return e < 60 ? r.unshift(0) : (e = (e - r[0]) / i, r.unshift(e % i), e >= 60 && (e = (e - r[0]) / i, r.unshift(e))), n + r.map((o) => String(o).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const Ps = {
  identify: (s) => typeof s == "bigint" || Number.isInteger(s),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (s, e, { intAsBigInt: t }) => Ut(s, t),
  stringify: Bs
}, Ks = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (s) => Ut(s, !1),
  stringify: Bs
}, ct = {
  identify: (s) => s instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(s) {
    const e = s.match(ct.test);
    if (!e)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, t, n, i, r, o, l] = e.map(Number), a = e[7] ? Number((e[7] + "00").substr(1, 3)) : 0;
    let c = Date.UTC(t, n - 1, i, r || 0, o || 0, l || 0, a);
    const d = e[8];
    if (d && d !== "Z") {
      let u = Ut(d, !1);
      Math.abs(u) < 30 && (u *= 60), c -= 6e4 * u;
    }
    return new Date(c);
  },
  stringify: ({ value: s }) => s?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, Wt = [
  Se,
  ve,
  rt,
  ot,
  _s,
  js,
  Fn,
  qn,
  Rn,
  Un,
  Pn,
  Kn,
  Dn,
  Kt,
  Z,
  Ft,
  Dt,
  Rt,
  Ps,
  Ks,
  ct
], Jt = /* @__PURE__ */ new Map([
  ["core", Mn],
  ["failsafe", [Se, ve, rt]],
  ["json", Bn],
  ["yaml11", Wt],
  ["yaml-1.1", Wt]
]), Ht = {
  binary: Kt,
  bool: Bt,
  float: Os,
  floatExp: Es,
  floatNaN: Ns,
  floatTime: Ks,
  int: Ls,
  intHex: Is,
  intOct: Ts,
  intTime: Ps,
  map: Se,
  merge: Z,
  null: ot,
  omap: Ft,
  pairs: Dt,
  seq: ve,
  set: Rt,
  timestamp: ct
}, Vn = {
  "tag:yaml.org,2002:binary": Kt,
  "tag:yaml.org,2002:merge": Z,
  "tag:yaml.org,2002:omap": Ft,
  "tag:yaml.org,2002:pairs": Dt,
  "tag:yaml.org,2002:set": Rt,
  "tag:yaml.org,2002:timestamp": ct
};
function mt(s, e, t) {
  const n = Jt.get(e);
  if (n && !s)
    return t && !n.includes(Z) ? n.concat(Z) : n.slice();
  let i = n;
  if (!i)
    if (Array.isArray(s))
      i = [];
    else {
      const r = Array.from(Jt.keys()).filter((o) => o !== "yaml11").map((o) => JSON.stringify(o)).join(", ");
      throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`);
    }
  if (Array.isArray(s))
    for (const r of s)
      i = i.concat(r);
  else typeof s == "function" && (i = s(i.slice()));
  return t && (i = i.concat(Z)), i.reduce((r, o) => {
    const l = typeof o == "string" ? Ht[o] : o;
    if (!l) {
      const a = JSON.stringify(o), c = Object.keys(Ht).map((d) => JSON.stringify(d)).join(", ");
      throw new Error(`Unknown custom tag ${a}; use one of ${c}`);
    }
    return r.includes(l) || r.push(l), r;
  }, []);
}
const zn = (s, e) => s.key < e.key ? -1 : s.key > e.key ? 1 : 0;
class Vt {
  constructor({ compat: e, customTags: t, merge: n, resolveKnownTags: i, schema: r, sortMapEntries: o, toStringDefaults: l }) {
    this.compat = Array.isArray(e) ? mt(e, "compat") : e ? mt(null, e) : null, this.name = typeof r == "string" && r || "core", this.knownTags = i ? Vn : {}, this.tags = mt(t, this.name, n), this.toStringOptions = l ?? null, Object.defineProperty(this, ne, { value: Se }), Object.defineProperty(this, W, { value: rt }), Object.defineProperty(this, be, { value: ve }), this.sortMapEntries = typeof o == "function" ? o : o === !0 ? zn : null;
  }
  clone() {
    const e = Object.create(Vt.prototype, Object.getOwnPropertyDescriptors(this));
    return e.tags = this.tags.slice(), e;
  }
}
function Yn(s, e) {
  const t = [];
  let n = e.directives === !0;
  if (e.directives !== !1 && s.directives) {
    const a = s.directives.toString(s);
    a ? (t.push(a), n = !0) : s.directives.docStart && (n = !0);
  }
  n && t.push("---");
  const i = bs(s, e), { commentString: r } = i.options;
  if (s.commentBefore) {
    t.length !== 1 && t.unshift("");
    const a = r(s.commentBefore);
    t.unshift(X(a, ""));
  }
  let o = !1, l = null;
  if (s.contents) {
    if (C(s.contents)) {
      if (s.contents.spaceBefore && n && t.push(""), s.contents.commentBefore) {
        const d = r(s.contents.commentBefore);
        t.push(X(d, ""));
      }
      i.forceBlockIndent = !!s.comment, l = s.contents.comment;
    }
    const a = l ? void 0 : () => o = !0;
    let c = ye(s.contents, i, () => l = null, a);
    l && (c += oe(c, "", r(l))), (c[0] === "|" || c[0] === ">") && t[t.length - 1] === "---" ? t[t.length - 1] = `--- ${c}` : t.push(c);
  } else
    t.push(ye(s.contents, i));
  if (s.directives?.docEnd)
    if (s.comment) {
      const a = r(s.comment);
      a.includes(`
`) ? (t.push("..."), t.push(X(a, ""))) : t.push(`... ${a}`);
    } else
      t.push("...");
  else {
    let a = s.comment;
    a && o && (a = a.replace(/^\n+/, "")), a && ((!o || l) && t[t.length - 1] !== "" && t.push(""), t.push(X(r(a), "")));
  }
  return t.join(`
`) + `
`;
}
class ft {
  constructor(e, t, n) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, U, { value: $t });
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
    n?._directives ? (this.directives = n._directives.atDocument(), this.directives.yaml.explicit && (o = this.directives.yaml.version)) : this.directives = new B({ version: o }), this.setSchema(o, n), this.contents = e === void 0 ? null : this.createNode(e, i, n);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const e = Object.create(ft.prototype, {
      [U]: { value: $t }
    });
    return e.commentBefore = this.commentBefore, e.comment = this.comment, e.errors = this.errors.slice(), e.warnings = this.warnings.slice(), e.options = Object.assign({}, this.options), this.directives && (e.directives = this.directives.clone()), e.schema = this.schema.clone(), e.contents = C(this.contents) ? this.contents.clone(e.schema) : this.contents, this.range && (e.range = this.range.slice()), e;
  }
  /** Adds a value to the document. */
  add(e) {
    ce(this.contents) && this.contents.add(e);
  }
  /** Adds a value to the document. */
  addIn(e, t) {
    ce(this.contents) && this.contents.addIn(e, t);
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
      const n = ps(this);
      e.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !t || n.has(t) ? ms(t || "a", n) : t;
    }
    return new Mt(e.anchor);
  }
  createNode(e, t, n) {
    let i;
    if (typeof t == "function")
      e = t.call({ "": e }, "", e), i = t;
    else if (Array.isArray(t)) {
      const p = ($) => typeof $ == "number" || $ instanceof String || $ instanceof Number, w = t.filter(p).map(String);
      w.length > 0 && (t = t.concat(w)), i = t;
    } else n === void 0 && t && (n = t, t = void 0);
    const { aliasDuplicateObjects: r, anchorPrefix: o, flow: l, keepUndefined: a, onTagObj: c, tag: d } = n ?? {}, { onAnchor: u, setAnchors: h, sourceObjects: m } = bn(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      o || "a"
    ), y = {
      aliasDuplicateObjects: r ?? !0,
      keepUndefined: a ?? !1,
      onAnchor: u,
      onTagObj: c,
      replacer: i,
      schema: this.schema,
      sourceObjects: m
    }, f = Ce(e, d, y);
    return l && x(f) && (f.flow = !0), h(), f;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(e, t, n = {}) {
    const i = this.createNode(e, null, n), r = this.createNode(t, null, n);
    return new P(i, r);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    return ce(this.contents) ? this.contents.delete(e) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    return Oe(e) ? this.contents == null ? !1 : (this.contents = null, !0) : ce(this.contents) ? this.contents.deleteIn(e) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(e, t) {
    return x(this.contents) ? this.contents.get(e, t) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    return Oe(e) ? !t && T(this.contents) ? this.contents.value : this.contents : x(this.contents) ? this.contents.getIn(e, t) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(e) {
    return x(this.contents) ? this.contents.has(e) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(e) {
    return Oe(e) ? this.contents !== void 0 : x(this.contents) ? this.contents.hasIn(e) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(e, t) {
    this.contents == null ? this.contents = Je(this.schema, [e], t) : ce(this.contents) && this.contents.set(e, t);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    Oe(e) ? this.contents = t : this.contents == null ? this.contents = Je(this.schema, Array.from(e), t) : ce(this.contents) && this.contents.setIn(e, t);
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
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new B({ version: "1.1" }), n = { resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = e : this.directives = new B({ version: e }), n = { resolveKnownTags: !0, schema: "core" };
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
      this.schema = new Vt(Object.assign(n, t));
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
    }, a = R(this.contents, t ?? "", l);
    if (typeof r == "function")
      for (const { count: c, res: d } of l.anchors.values())
        r(d, c);
    return typeof o == "function" ? de(o, { "": a }, "", a) : a;
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
    return Yn(this, e);
  }
}
function ce(s) {
  if (x(s))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class Ds extends Error {
  constructor(e, t, n, i) {
    super(), this.name = e, this.code = n, this.message = i, this.pos = t;
  }
}
class Ae extends Ds {
  constructor(e, t, n) {
    super("YAMLParseError", e, t, n);
  }
}
class Gn extends Ds {
  constructor(e, t, n) {
    super("YAMLWarning", e, t, n);
  }
}
const Qt = (s, e) => (t) => {
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
function we(s, { flow: e, indicator: t, next: n, offset: i, onError: r, parentIndent: o, startOnNewline: l }) {
  let a = !1, c = l, d = l, u = "", h = "", m = !1, y = !1, f = null, p = null, w = null, $ = null, S = null, g = null, k = null;
  for (const b of s)
    switch (y && (b.type !== "space" && b.type !== "newline" && b.type !== "comma" && r(b.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), y = !1), f && (c && b.type !== "comment" && b.type !== "newline" && r(f, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), f = null), b.type) {
      case "space":
        !e && (t !== "doc-start" || n?.type !== "flow-collection") && b.source.includes("	") && (f = b), d = !0;
        break;
      case "comment": {
        d || r(b, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const O = b.source.substring(1) || " ";
        u ? u += h + O : u = O, h = "", c = !1;
        break;
      }
      case "newline":
        c ? u ? u += b.source : (!g || t !== "seq-item-ind") && (a = !0) : h += b.source, c = !0, m = !0, (p || w) && ($ = b), d = !0;
        break;
      case "anchor":
        p && r(b, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), b.source.endsWith(":") && r(b.offset + b.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), p = b, k ?? (k = b.offset), c = !1, d = !1, y = !0;
        break;
      case "tag": {
        w && r(b, "MULTIPLE_TAGS", "A node can have at most one tag"), w = b, k ?? (k = b.offset), c = !1, d = !1, y = !0;
        break;
      }
      case t:
        (p || w) && r(b, "BAD_PROP_ORDER", `Anchors and tags must be after the ${b.source} indicator`), g && r(b, "UNEXPECTED_TOKEN", `Unexpected ${b.source} in ${e ?? "collection"}`), g = b, c = t === "seq-item-ind" || t === "explicit-key-ind", d = !1;
        break;
      case "comma":
        if (e) {
          S && r(b, "UNEXPECTED_TOKEN", `Unexpected , in ${e}`), S = b, c = !1, d = !1;
          break;
        }
      // else fallthrough
      default:
        r(b, "UNEXPECTED_TOKEN", `Unexpected ${b.type} token`), c = !1, d = !1;
    }
  const v = s[s.length - 1], N = v ? v.offset + v.source.length : i;
  return y && n && n.type !== "space" && n.type !== "newline" && n.type !== "comma" && (n.type !== "scalar" || n.source !== "") && r(n.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), f && (c && f.indent <= o || n?.type === "block-map" || n?.type === "block-seq") && r(f, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: S,
    found: g,
    spaceBefore: a,
    comment: u,
    hasNewline: m,
    anchor: p,
    tag: w,
    newlineAfterProp: $,
    end: N,
    start: k ?? N
  };
}
function Me(s) {
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
        if (Me(e.key) || Me(e.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function Et(s, e, t) {
  if (e?.type === "flow-collection") {
    const n = e.end[0];
    n.indent === s && (n.source === "]" || n.source === "}") && Me(e) && t(n, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function Fs(s, e, t) {
  const { uniqueKeys: n } = s.options;
  if (n === !1)
    return !1;
  const i = typeof n == "function" ? n : (r, o) => r === o || T(r) && T(o) && r.value === o.value;
  return e.some((r) => i(r.key, t));
}
const Xt = "All mapping items must start at the same column";
function Wn({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = r?.nodeClass ?? q, l = new o(t.schema);
  t.atRoot && (t.atRoot = !1);
  let a = n.offset, c = null;
  for (const d of n.items) {
    const { start: u, key: h, sep: m, value: y } = d, f = we(u, {
      indicator: "explicit-key-ind",
      next: h ?? m?.[0],
      offset: a,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !0
    }), p = !f.found;
    if (p) {
      if (h && (h.type === "block-seq" ? i(a, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in h && h.indent !== n.indent && i(a, "BAD_INDENT", Xt)), !f.anchor && !f.tag && !m) {
        c = f.end, f.comment && (l.comment ? l.comment += `
` + f.comment : l.comment = f.comment);
        continue;
      }
      (f.newlineAfterProp || Me(h)) && i(h ?? u[u.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else f.found?.indent !== n.indent && i(a, "BAD_INDENT", Xt);
    t.atKey = !0;
    const w = f.end, $ = h ? s(t, h, f, i) : e(t, w, u, null, f, i);
    t.schema.compat && Et(n.indent, h, i), t.atKey = !1, Fs(t, l.items, $) && i(w, "DUPLICATE_KEY", "Map keys must be unique");
    const S = we(m ?? [], {
      indicator: "map-value-ind",
      next: y,
      offset: $.range[2],
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !h || h.type === "block-scalar"
    });
    if (a = S.end, S.found) {
      p && (y?.type === "block-map" && !S.hasNewline && i(a, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), t.options.strict && f.start < S.found.offset - 1024 && i($.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const g = y ? s(t, y, S, i) : e(t, a, m, null, S, i);
      t.schema.compat && Et(n.indent, y, i), a = g.range[2];
      const k = new P($, g);
      t.options.keepSourceTokens && (k.srcToken = d), l.items.push(k);
    } else {
      p && i($.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), S.comment && ($.comment ? $.comment += `
` + S.comment : $.comment = S.comment);
      const g = new P($);
      t.options.keepSourceTokens && (g.srcToken = d), l.items.push(g);
    }
  }
  return c && c < a && i(c, "IMPOSSIBLE", "Map comment with trailing content"), l.range = [n.offset, a, c ?? a], l;
}
function Jn({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = r?.nodeClass ?? le, l = new o(t.schema);
  t.atRoot && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let a = n.offset, c = null;
  for (const { start: d, value: u } of n.items) {
    const h = we(d, {
      indicator: "seq-item-ind",
      next: u,
      offset: a,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !0
    });
    if (!h.found)
      if (h.anchor || h.tag || u)
        u?.type === "block-seq" ? i(h.end, "BAD_INDENT", "All sequence items must start at the same column") : i(a, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        c = h.end, h.comment && (l.comment = h.comment);
        continue;
      }
    const m = u ? s(t, u, h, i) : e(t, h.end, d, null, h, i);
    t.schema.compat && Et(n.indent, u, i), a = m.range[2], l.items.push(m);
  }
  return l.range = [n.offset, a, c ?? a], l;
}
function Ke(s, e, t, n) {
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
          const d = a.substring(1) || " ";
          i ? i += o + d : i = d, o = "";
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
const gt = "Block collections are not allowed within flow collections", yt = (s) => s && (s.type === "block-map" || s.type === "block-seq");
function Hn({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = n.start.source === "{", l = o ? "flow map" : "flow sequence", a = r?.nodeClass ?? (o ? q : le), c = new a(t.schema);
  c.flow = !0;
  const d = t.atRoot;
  d && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let u = n.offset + n.start.source.length;
  for (let p = 0; p < n.items.length; ++p) {
    const w = n.items[p], { start: $, key: S, sep: g, value: k } = w, v = we($, {
      flow: l,
      indicator: "explicit-key-ind",
      next: S ?? g?.[0],
      offset: u,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !1
    });
    if (!v.found) {
      if (!v.anchor && !v.tag && !g && !k) {
        p === 0 && v.comma ? i(v.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${l}`) : p < n.items.length - 1 && i(v.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${l}`), v.comment && (c.comment ? c.comment += `
` + v.comment : c.comment = v.comment), u = v.end;
        continue;
      }
      !o && t.options.strict && Me(S) && i(
        S,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (p === 0)
      v.comma && i(v.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${l}`);
    else if (v.comma || i(v.start, "MISSING_CHAR", `Missing , between ${l} items`), v.comment) {
      let N = "";
      e: for (const b of $)
        switch (b.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            N = b.source.substring(1);
            break e;
          default:
            break e;
        }
      if (N) {
        let b = c.items[c.items.length - 1];
        M(b) && (b = b.value ?? b.key), b.comment ? b.comment += `
` + N : b.comment = N, v.comment = v.comment.substring(N.length + 1);
      }
    }
    if (!o && !g && !v.found) {
      const N = k ? s(t, k, v, i) : e(t, v.end, g, null, v, i);
      c.items.push(N), u = N.range[2], yt(k) && i(N.range, "BLOCK_IN_FLOW", gt);
    } else {
      t.atKey = !0;
      const N = v.end, b = S ? s(t, S, v, i) : e(t, N, $, null, v, i);
      yt(S) && i(b.range, "BLOCK_IN_FLOW", gt), t.atKey = !1;
      const O = we(g ?? [], {
        flow: l,
        indicator: "map-value-ind",
        next: k,
        offset: b.range[2],
        onError: i,
        parentIndent: n.indent,
        startOnNewline: !1
      });
      if (O.found) {
        if (!o && !v.found && t.options.strict) {
          if (g)
            for (const A of g) {
              if (A === O.found)
                break;
              if (A.type === "newline") {
                i(A, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          v.start < O.found.offset - 1024 && i(O.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else k && ("source" in k && k.source?.[0] === ":" ? i(k, "MISSING_CHAR", `Missing space after : in ${l}`) : i(O.start, "MISSING_CHAR", `Missing , or : between ${l} items`));
      const L = k ? s(t, k, O, i) : O.found ? e(t, O.end, g, null, O, i) : null;
      L ? yt(k) && i(L.range, "BLOCK_IN_FLOW", gt) : O.comment && (b.comment ? b.comment += `
` + O.comment : b.comment = O.comment);
      const _ = new P(b, L);
      if (t.options.keepSourceTokens && (_.srcToken = w), o) {
        const A = c;
        Fs(t, A.items, b) && i(N, "DUPLICATE_KEY", "Map keys must be unique"), A.items.push(_);
      } else {
        const A = new q(t.schema);
        A.flow = !0, A.items.push(_);
        const K = (L ?? b).range;
        A.range = [b.range[0], K[1], K[2]], c.items.push(A);
      }
      u = L ? L.range[2] : O.end;
    }
  }
  const h = o ? "}" : "]", [m, ...y] = n.end;
  let f = u;
  if (m?.source === h)
    f = m.offset + m.source.length;
  else {
    const p = l[0].toUpperCase() + l.substring(1), w = d ? `${p} must end with a ${h}` : `${p} in block collection must be sufficiently indented and end with a ${h}`;
    i(u, d ? "MISSING_CHAR" : "BAD_INDENT", w), m && m.source.length !== 1 && y.unshift(m);
  }
  if (y.length > 0) {
    const p = Ke(y, f, t.options.strict, i);
    p.comment && (c.comment ? c.comment += `
` + p.comment : c.comment = p.comment), c.range = [n.offset, f, p.offset];
  } else
    c.range = [n.offset, f, f];
  return c;
}
function wt(s, e, t, n, i, r) {
  const o = t.type === "block-map" ? Wn(s, e, t, n, r) : t.type === "block-seq" ? Jn(s, e, t, n, r) : Hn(s, e, t, n, r), l = o.constructor;
  return i === "!" || i === l.tagName ? (o.tag = l.tagName, o) : (i && (o.tag = i), o);
}
function Qn(s, e, t, n, i) {
  const r = n.tag, o = r ? e.directives.tagName(r.source, (h) => i(r, "TAG_RESOLVE_FAILED", h)) : null;
  if (t.type === "block-seq") {
    const { anchor: h, newlineAfterProp: m } = n, y = h && r ? h.offset > r.offset ? h : r : h ?? r;
    y && (!m || m.offset < y.offset) && i(y, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const l = t.type === "block-map" ? "map" : t.type === "block-seq" ? "seq" : t.start.source === "{" ? "map" : "seq";
  if (!r || !o || o === "!" || o === q.tagName && l === "map" || o === le.tagName && l === "seq")
    return wt(s, e, t, i, o);
  let a = e.schema.tags.find((h) => h.tag === o && h.collection === l);
  if (!a) {
    const h = e.schema.knownTags[o];
    if (h?.collection === l)
      e.schema.tags.push(Object.assign({}, h, { default: !1 })), a = h;
    else
      return h ? i(r, "BAD_COLLECTION_TYPE", `${h.tag} used for ${l} collection, but expects ${h.collection ?? "scalar"}`, !0) : i(r, "TAG_RESOLVE_FAILED", `Unresolved tag: ${o}`, !0), wt(s, e, t, i, o);
  }
  const c = wt(s, e, t, i, o, a), d = a.resolve?.(c, (h) => i(r, "TAG_RESOLVE_FAILED", h), e.options) ?? c, u = C(d) ? d : new E(d);
  return u.range = c.range, u.tag = o, a?.format && (u.format = a.format), u;
}
function Xn(s, e, t) {
  const n = e.offset, i = Zn(e, s.options.strict, t);
  if (!i)
    return { value: "", type: null, comment: "", range: [n, n, n] };
  const r = i.mode === ">" ? E.BLOCK_FOLDED : E.BLOCK_LITERAL, o = e.source ? ei(e.source) : [];
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
  let a = e.indent + i.indent, c = e.offset + i.length, d = 0;
  for (let f = 0; f < l; ++f) {
    const [p, w] = o[f];
    if (w === "" || w === "\r")
      i.indent === 0 && p.length > a && (a = p.length);
    else {
      p.length < a && t(c + p.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), i.indent === 0 && (a = p.length), d = f, a === 0 && !s.atRoot && t(c, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    c += p.length + w.length + 1;
  }
  for (let f = o.length - 1; f >= l; --f)
    o[f][0].length > a && (l = f + 1);
  let u = "", h = "", m = !1;
  for (let f = 0; f < d; ++f)
    u += o[f][0].slice(a) + `
`;
  for (let f = d; f < l; ++f) {
    let [p, w] = o[f];
    c += p.length + w.length + 1;
    const $ = w[w.length - 1] === "\r";
    if ($ && (w = w.slice(0, -1)), w && p.length < a) {
      const g = `Block scalar lines must not be less indented than their ${i.indent ? "explicit indentation indicator" : "first line"}`;
      t(c - w.length - ($ ? 2 : 1), "BAD_INDENT", g), p = "";
    }
    r === E.BLOCK_LITERAL ? (u += h + p.slice(a) + w, h = `
`) : p.length > a || w[0] === "	" ? (h === " " ? h = `
` : !m && h === `
` && (h = `

`), u += h + p.slice(a) + w, h = `
`, m = !0) : w === "" ? h === `
` ? u += `
` : h = `
` : (u += h + w, h = " ", m = !1);
  }
  switch (i.chomp) {
    case "-":
      break;
    case "+":
      for (let f = l; f < o.length; ++f)
        u += `
` + o[f][0].slice(a);
      u[u.length - 1] !== `
` && (u += `
`);
      break;
    default:
      u += `
`;
  }
  const y = n + i.length + e.source.length;
  return { value: u, type: r, comment: i.comment, range: [n, y, y] };
}
function Zn({ offset: s, props: e }, t, n) {
  if (e[0].type !== "block-scalar-header")
    return n(e[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: i } = e[0], r = i[0];
  let o = 0, l = "", a = -1;
  for (let h = 1; h < i.length; ++h) {
    const m = i[h];
    if (!l && (m === "-" || m === "+"))
      l = m;
    else {
      const y = Number(m);
      !o && y ? o = y : a === -1 && (a = s + h);
    }
  }
  a !== -1 && n(a, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${i}`);
  let c = !1, d = "", u = i.length;
  for (let h = 1; h < e.length; ++h) {
    const m = e[h];
    switch (m.type) {
      case "space":
        c = !0;
      // fallthrough
      case "newline":
        u += m.source.length;
        break;
      case "comment":
        t && !c && n(m, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), u += m.source.length, d = m.source.substring(1);
        break;
      case "error":
        n(m, "UNEXPECTED_TOKEN", m.message), u += m.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const y = `Unexpected token in block scalar header: ${m.type}`;
        n(m, "UNEXPECTED_TOKEN", y);
        const f = m.source;
        f && typeof f == "string" && (u += f.length);
      }
    }
  }
  return { mode: r, indent: o, chomp: l, comment: d, length: u };
}
function ei(s) {
  const e = s.split(/\n( *)/), t = e[0], n = t.match(/^( *)/), r = [n?.[1] ? [n[1], t.slice(n[1].length)] : ["", t]];
  for (let o = 1; o < e.length; o += 2)
    r.push([e[o], e[o + 1]]);
  return r;
}
function ti(s, e, t) {
  const { offset: n, type: i, source: r, end: o } = s;
  let l, a;
  const c = (h, m, y) => t(n + h, m, y);
  switch (i) {
    case "scalar":
      l = E.PLAIN, a = si(r, c);
      break;
    case "single-quoted-scalar":
      l = E.QUOTE_SINGLE, a = ni(r, c);
      break;
    case "double-quoted-scalar":
      l = E.QUOTE_DOUBLE, a = ii(r, c);
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
  const d = n + r.length, u = Ke(o, d, e, t);
  return {
    value: a,
    type: l,
    comment: u.comment,
    range: [n, d, u.offset]
  };
}
function si(s, e) {
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
  return t && e(0, "BAD_SCALAR_START", `Plain value cannot start with ${t}`), qs(s);
}
function ni(s, e) {
  return (s[s.length - 1] !== "'" || s.length === 1) && e(s.length, "MISSING_CHAR", "Missing closing 'quote"), qs(s.slice(1, -1)).replace(/''/g, "'");
}
function qs(s) {
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
function ii(s, e) {
  let t = "";
  for (let n = 1; n < s.length - 1; ++n) {
    const i = s[n];
    if (!(i === "\r" && s[n + 1] === `
`))
      if (i === `
`) {
        const { fold: r, offset: o } = ri(s, n);
        t += r, n = o;
      } else if (i === "\\") {
        let r = s[++n];
        const o = oi[r];
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
          t += ai(s, n + 1, l, e), n += l;
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
function ri(s, e) {
  let t = "", n = s[e + 1];
  for (; (n === " " || n === "	" || n === `
` || n === "\r") && !(n === "\r" && s[e + 2] !== `
`); )
    n === `
` && (t += `
`), e += 1, n = s[e + 1];
  return t || (t = " "), { fold: t, offset: e };
}
const oi = {
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
function ai(s, e, t, n) {
  const i = s.substr(e, t), o = i.length === t && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
  try {
    return String.fromCodePoint(o);
  } catch {
    const l = s.substr(e - 2, t + 2);
    return n(e - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${l}`), l;
  }
}
function Rs(s, e, t, n) {
  const { value: i, type: r, comment: o, range: l } = e.type === "block-scalar" ? Xn(s, e, n) : ti(e, s.options.strict, n), a = t ? s.directives.tagName(t.source, (u) => n(t, "TAG_RESOLVE_FAILED", u)) : null;
  let c;
  s.options.stringKeys && s.atKey ? c = s.schema[W] : a ? c = li(s.schema, i, a, t, n) : e.type === "scalar" ? c = ci(s, i, e, n) : c = s.schema[W];
  let d;
  try {
    const u = c.resolve(i, (h) => n(t ?? e, "TAG_RESOLVE_FAILED", h), s.options);
    d = T(u) ? u : new E(u);
  } catch (u) {
    const h = u instanceof Error ? u.message : String(u);
    n(t ?? e, "TAG_RESOLVE_FAILED", h), d = new E(i);
  }
  return d.range = l, d.source = i, r && (d.type = r), a && (d.tag = a), c.format && (d.format = c.format), o && (d.comment = o), d;
}
function li(s, e, t, n, i) {
  if (t === "!")
    return s[W];
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
  return o && !o.collection ? (s.tags.push(Object.assign({}, o, { default: !1, test: void 0 })), o) : (i(n, "TAG_RESOLVE_FAILED", `Unresolved tag: ${t}`, t !== "tag:yaml.org,2002:str"), s[W]);
}
function ci({ atKey: s, directives: e, schema: t }, n, i, r) {
  const o = t.tags.find((l) => (l.default === !0 || s && l.default === "key") && l.test?.test(n)) || t[W];
  if (t.compat) {
    const l = t.compat.find((a) => a.default && a.test?.test(n)) ?? t[W];
    if (o.tag !== l.tag) {
      const a = e.tagString(o.tag), c = e.tagString(l.tag), d = `Value may be parsed as either ${a} or ${c}`;
      r(i, "TAG_RESOLVE_FAILED", d, !0);
    }
  }
  return o;
}
function fi(s, e, t) {
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
const ui = { composeNode: Us, composeEmptyNode: zt };
function Us(s, e, t, n) {
  const i = s.atKey, { spaceBefore: r, comment: o, anchor: l, tag: a } = t;
  let c, d = !0;
  switch (e.type) {
    case "alias":
      c = hi(s, e, n), (l || a) && n(e, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      c = Rs(s, e, a, n), l && (c.anchor = l.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        c = Qn(ui, s, e, t, n), l && (c.anchor = l.source.substring(1));
      } catch (u) {
        const h = u instanceof Error ? u.message : String(u);
        n(e, "RESOURCE_EXHAUSTION", h);
      }
      break;
    default: {
      const u = e.type === "error" ? e.message : `Unsupported token (type: ${e.type})`;
      n(e, "UNEXPECTED_TOKEN", u), d = !1;
    }
  }
  return c ?? (c = zt(s, e.offset, void 0, null, t, n)), l && c.anchor === "" && n(l, "BAD_ALIAS", "Anchor cannot be an empty string"), i && s.options.stringKeys && (!T(c) || typeof c.value != "string" || c.tag && c.tag !== "tag:yaml.org,2002:str") && n(a ?? e, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), r && (c.spaceBefore = !0), o && (e.type === "scalar" && e.source === "" ? c.comment = o : c.commentBefore = o), s.options.keepSourceTokens && d && (c.srcToken = e), c;
}
function zt(s, e, t, n, { spaceBefore: i, comment: r, anchor: o, tag: l, end: a }, c) {
  const d = {
    type: "scalar",
    offset: fi(e, t, n),
    indent: -1,
    source: ""
  }, u = Rs(s, d, l, c);
  return o && (u.anchor = o.source.substring(1), u.anchor === "" && c(o, "BAD_ALIAS", "Anchor cannot be an empty string")), i && (u.spaceBefore = !0), r && (u.comment = r, u.range[2] = a), u;
}
function hi({ options: s }, { offset: e, source: t, end: n }, i) {
  const r = new Mt(t.substring(1));
  r.source === "" && i(e, "BAD_ALIAS", "Alias cannot be an empty string"), r.source.endsWith(":") && i(e + t.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const o = e + t.length, l = Ke(n, o, s.strict, i);
  return r.range = [e, o, l.offset], l.comment && (r.comment = l.comment), r;
}
function di(s, e, { offset: t, start: n, value: i, end: r }, o) {
  const l = Object.assign({ _directives: e }, s), a = new ft(void 0, l), c = {
    atKey: !1,
    atRoot: !0,
    directives: a.directives,
    options: a.options,
    schema: a.schema
  }, d = we(n, {
    indicator: "doc-start",
    next: i ?? r?.[0],
    offset: t,
    onError: o,
    parentIndent: 0,
    startOnNewline: !0
  });
  d.found && (a.directives.docStart = !0, i && (i.type === "block-map" || i.type === "block-seq") && !d.hasNewline && o(d.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), a.contents = i ? Us(c, i, d, o) : zt(c, d.end, n, null, d, o);
  const u = a.contents.range[2], h = Ke(r, u, !1, o);
  return h.comment && (a.comment = h.comment), a.range = [t, u, h.offset], a;
}
function Ne(s) {
  if (typeof s == "number")
    return [s, s + 1];
  if (Array.isArray(s))
    return s.length === 2 ? s : [s[0], s[1]];
  const { offset: e, source: t } = s;
  return [e, e + (typeof t == "string" ? t.length : 1)];
}
function Zt(s) {
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
class pi {
  constructor(e = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (t, n, i, r) => {
      const o = Ne(t);
      r ? this.warnings.push(new Gn(o, n, i)) : this.errors.push(new Ae(o, n, i));
    }, this.directives = new B({ version: e.version || "1.2" }), this.options = e;
  }
  decorate(e, t) {
    const { comment: n, afterEmptyLine: i } = Zt(this.prelude);
    if (n) {
      const r = e.contents;
      if (t)
        e.comment = e.comment ? `${e.comment}
${n}` : n;
      else if (i || e.directives.docStart || !r)
        e.commentBefore = n;
      else if (x(r) && !r.flow && r.items.length > 0) {
        let o = r.items[0];
        M(o) && (o = o.key);
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
      comment: Zt(this.prelude).comment,
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
          const r = Ne(e);
          r[0] += t, this.onError(r, "BAD_DIRECTIVE", n, i);
        }), this.prelude.push(e.source), this.atDirectives = !0;
        break;
      case "document": {
        const t = di(this.options, this.directives, e, this.onError);
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
        const t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, n = new Ae(Ne(e), "UNEXPECTED_TOKEN", t);
        this.atDirectives || !this.doc ? this.errors.push(n) : this.doc.errors.push(n);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const n = "Unexpected doc-end without preceding document";
          this.errors.push(new Ae(Ne(e), "UNEXPECTED_TOKEN", n));
          break;
        }
        this.doc.directives.docEnd = !0;
        const t = Ke(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), t.comment) {
          const n = this.doc.comment;
          this.doc.comment = n ? `${n}
${t.comment}` : t.comment;
        }
        this.doc.range[2] = t.offset;
        break;
      }
      default:
        this.errors.push(new Ae(Ne(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
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
      const n = Object.assign({ _directives: this.directives }, this.options), i = new ft(void 0, n);
      this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), i.range = [0, t, t], this.decorate(i, !1), yield i;
    }
  }
}
const Vs = "\uFEFF", zs = "", Ys = "", Ot = "";
function mi(s) {
  switch (s) {
    case Vs:
      return "byte-order-mark";
    case zs:
      return "doc-mode";
    case Ys:
      return "flow-error-end";
    case Ot:
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
function V(s) {
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
const es = new Set("0123456789ABCDEFabcdef"), gi = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), Re = new Set(",[]{}"), yi = new Set(` ,[]{}
\r	`), bt = (s) => !s || yi.has(s);
class wi {
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
      if ((n === "---" || n === "...") && V(this.buffer[e + 3]))
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
    if (e[0] === Vs && (yield* this.pushCount(1), e = e.substring(1)), e[0] === "%") {
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
    return yield zs, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const e = this.charAt(0);
    if (!e && !this.atEnd)
      return this.setNext("line-start");
    if (e === "-" || e === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const t = this.peek(3);
      if ((t === "---" || t === "...") && V(this.charAt(3)))
        return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, t === "---" ? "doc" : "stream";
    }
    return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !V(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [e, t] = this.peek(2);
    if (!t && !this.atEnd)
      return this.setNext("block-start");
    if ((e === "-" || e === "?" || e === ":") && V(t)) {
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
        return yield* this.pushUntil(bt), "doc";
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
    if ((n !== -1 && n < this.indentNext && i[0] !== "#" || n === 0 && (i.startsWith("---") || i.startsWith("...")) && V(i[3])) && !(n === this.indentNext - 1 && this.flowLevel === 1 && (i[0] === "]" || i[0] === "}")))
      return this.flowLevel = 0, yield Ys, yield* this.parseLineStart();
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
        return yield* this.pushUntil(bt), "flow";
      case '"':
      case "'":
        return this.flowKey = !0, yield* this.parseQuotedScalar();
      case ":": {
        const o = this.charAt(1);
        if (this.flowKey || V(o) || o === ",")
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
    return yield* this.pushUntil((t) => V(t) || t === "#");
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
    return yield Ot, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let t = this.pos - 1, n = this.pos - 1, i;
    for (; i = this.buffer[++n]; )
      if (i === ":") {
        const r = this.buffer[n + 1];
        if (V(r) || e && Re.has(r))
          break;
        t = n;
      } else if (V(i)) {
        let r = this.buffer[n + 1];
        if (i === "\r" && (r === `
` ? (n += 1, i = `
`, r = this.buffer[n + 1]) : t = n), r === "#" || e && Re.has(r))
          break;
        if (i === `
`) {
          const o = this.continueScalar(n + 1);
          if (o === -1)
            break;
          n = Math.max(n, o - 2);
        }
      } else {
        if (e && Re.has(i))
          break;
        t = n;
      }
    return !i && !this.atEnd ? this.setNext("plain-scalar") : (yield Ot, yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
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
          e += yield* this.pushUntil(bt), e += yield* this.pushSpaces(!0);
          continue e;
        case "-":
        // this is an error
        case "?":
        // this is an error outside flow collections
        case ":": {
          const t = this.flowLevel > 0, n = this.charAt(1);
          if (V(n) || t && Re.has(n)) {
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
      for (; !V(t) && t !== ">"; )
        t = this.buffer[++e];
      return yield* this.pushToIndex(t === ">" ? e + 1 : e, !1);
    } else {
      let e = this.pos + 1, t = this.buffer[e];
      for (; t; )
        if (gi.has(t))
          t = this.buffer[++e];
        else if (t === "%" && es.has(this.buffer[e + 1]) && es.has(this.buffer[e + 2]))
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
class bi {
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
function te(s, e) {
  for (let t = 0; t < s.length; ++t)
    if (s[t].type === e)
      return !0;
  return !1;
}
function ts(s) {
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
function Gs(s) {
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
function Ue(s) {
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
function fe(s) {
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
function Qe(s, e) {
  if (e.length < 1e5)
    Array.prototype.push.apply(s, e);
  else
    for (let t = 0; t < e.length; ++t)
      s.push(e[t]);
}
function ss(s) {
  if (s.start.type === "flow-seq-start")
    for (const e of s.items)
      e.sep && !e.value && !te(e.start, "explicit-key-ind") && !te(e.sep, "map-value-ind") && (e.key && (e.value = e.key), delete e.key, Gs(e.value) ? e.value.end ? Qe(e.value.end, e.sep) : e.value.end = e.sep : Qe(e.start, e.sep), delete e.sep);
}
class ki {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(e) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new wi(), this.onNewLine = e;
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
    const t = mi(e);
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
      switch (t.type === "block-scalar" ? t.indent = "indent" in n ? n.indent : 0 : t.type === "flow-collection" && n.type === "document" && (t.indent = 0), t.type === "flow-collection" && ss(t), n.type) {
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
        i && !i.sep && !i.value && i.start.length > 0 && ts(i.start) === -1 && (t.indent === 0 || i.start.every((r) => r.type !== "comment" || r.indent < t.indent)) && (n.type === "document" ? n.end = i.start : n.items.push({ start: i.start }), t.items.splice(-1, 1));
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
        ts(e.start) !== -1 ? (yield* this.pop(), yield* this.step()) : e.start.push(this.sourceToken);
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
      const t = Ue(this.peek(2)), n = fe(t);
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
              Qe(i, t.start), i.push(this.sourceToken), e.items.pop();
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
              else if (te(t.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: r, key: null, sep: [this.sourceToken] }]
                });
              else if (Gs(t.key) && !te(t.sep, "newline")) {
                const o = fe(t.start), l = t.key, a = t.sep;
                a.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: l, sep: a }]
                });
              } else r.length > 0 ? t.sep = t.sep.concat(r, this.sourceToken) : t.sep.push(this.sourceToken);
            else if (te(t.start, "newline"))
              Object.assign(t, { key: null, sep: [this.sourceToken] });
            else {
              const o = fe(t.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: o, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            t.sep ? t.value || i ? e.items.push({ start: r, key: null, sep: [this.sourceToken] }) : te(t.sep, "map-value-ind") ? this.stack.push({
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
              if (!t.explicitKey && t.sep && !te(t.sep, "newline")) {
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
              Qe(i, t.start), i.push(this.sourceToken), e.items.pop();
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
        t.value || te(t.start, "seq-item-ind") ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
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
        const i = Ue(n), r = fe(i);
        ss(e);
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
        const t = Ue(e), n = fe(t);
        return n.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: n, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const t = Ue(e), n = fe(t);
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
function $i(s) {
  const e = s.prettyErrors !== !1;
  return { lineCounter: s.lineCounter || e && new bi() || null, prettyErrors: e };
}
function Si(s, e = {}) {
  const { lineCounter: t, prettyErrors: n } = $i(e), i = new ki(t?.addNewLine), r = new pi(e);
  let o = null;
  for (const l of r.compose(i.parse(s), !0, s.length))
    if (!o)
      o = l;
    else if (o.options.logLevel !== "silent") {
      o.errors.push(new Ae(l.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return n && t && (o.errors.forEach(Qt(s, t)), o.warnings.forEach(Qt(s, t))), o;
}
const G = {
  comic: { title: "제목", cast: "등장인물", panels: "컷" },
  cast: { asset: "그림", label: "이름표" },
  panel: {
    mode: "구성",
    actors: "인물",
    dialogue: "대사",
    transfer: "전달",
    removeActors: "제외인물",
    diagram: "다이어그램"
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
  diagram: {
    type: "종류",
    source: "원문",
    title: "제목",
    height: "높이"
  },
  options: {
    width: "너비",
    font: "글꼴",
    fontVersion: "글꼴버전",
    panelFormat: "컷비율"
  }
}, vi = {
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
  diagramType: { mermaid: "머메이드" }
}, Ni = {
  cast: { asset: "asset" },
  actor: { expression: "expression", gesture: "gesture", holding: "prop" },
  panel: { mode: "mode" },
  transfer: { prop: "prop" },
  diagram: { type: "diagramType" },
  options: { panelFormat: "panelFormat" }
};
function At(s) {
  return !!s && typeof s == "object" && !Array.isArray(s);
}
function xe(s, e, t, n) {
  if (!At(s)) return s;
  const i = G[e], r = /* @__PURE__ */ Object.create(null);
  for (const [o, l] of Object.entries(s)) {
    const a = Object.keys(i).find(
      (m) => o === m || o === i[m]
    ) ?? o;
    Object.hasOwn(i, a) && i[a];
    const c = a;
    if (Object.hasOwn(r, c))
      throw new Error(
        `${n}: '${i[a]}'와 '${a}'은 같은 항목입니다. 하나만 작성하세요.`
      );
    let d = l;
    const u = Ni[e], h = u && Object.hasOwn(u, a) ? u[a] : void 0;
    if (h && typeof l == "string") {
      const m = vi[h], y = Object.keys(m).find(
        (f) => l === f || l === m[f]
      );
      y && (d = y);
    }
    if (e === "comic" && a === "cast" && At(l)) {
      const m = /* @__PURE__ */ Object.create(null);
      for (const [y, f] of Object.entries(l))
        m[y] = xe(f, "cast", t, `${n}.등장인물.${y}`);
      d = m;
    } else if (e === "panel" && a === "diagram")
      d = xe(l, "diagram", t, `${n}.다이어그램`);
    else if (Array.isArray(l)) {
      const m = e === "comic" && a === "panels" ? "panel" : e === "panel" && a === "actors" ? "actor" : e === "panel" && a === "dialogue" ? "dialogue" : e === "panel" && a === "transfer" ? "transfer" : void 0;
      m && (d = l.map(
        (y, f) => xe(
          y,
          m,
          t,
          `${n}.${i[a]}[${f + 1}]`
        )
      ));
    }
    r[c] = d;
  }
  return r;
}
const Ei = (s) => xe(s, "comic", !1, "만화");
function Oi(s) {
  const e = xe(s, "options", !1, "표시 설정");
  if (!At(e)) throw new Error("표시 설정: 객체가 필요합니다.");
  for (const t of Object.keys(e))
    if (!Object.hasOwn(G.options, t))
      throw new Error(`표시 설정: 알 수 없는 항목 '${t}'.`);
  return e;
}
function Q(s, e) {
  if (!s || typeof s != "object" || Array.isArray(s))
    throw new Error(`${e}: 객체가 필요합니다.`);
  return s;
}
function j(s, e, t = 1e4) {
  if (typeof s != "string" || !s.trim())
    throw new Error(`${e}: 비어 있지 않은 문자열이 필요합니다.`);
  if (s.length > t)
    throw new Error(
      `${e}: 텍스트가 너무 깁니다. ${t}자 이내로 작성하세요.`
    );
  return s;
}
function ue(s, e) {
  if (!Array.isArray(s)) throw new Error(`${e}: 목록이 필요합니다.`);
  return s;
}
function ee(s, e, t) {
  for (const n of Object.keys(s))
    if (!e.includes(n))
      throw new Error(`${t}: 알 수 없는 항목 '${n}'.`);
}
function ie(s, e, t, n) {
  if (s !== void 0) {
    if (typeof s != "number" || !Number.isFinite(s) || s < e || s > t)
      throw new Error(`${n}: ${e}~${t} 사이 숫자가 필요합니다.`);
    return s;
  }
}
function Ai(s) {
  if (s.length > 1e5)
    throw new Error("코드가 너무 깁니다. 100KB 이내로 작성하세요.");
  const e = Si(s, { uniqueKeys: !0 });
  if (e.errors.length) throw new Error(e.errors[0].message);
  const t = Q(Ei(e.toJS({ maxAliasCount: 20 })), "만화");
  ee(t, Object.keys(G.comic), "만화");
  const n = /* @__PURE__ */ Object.create(null);
  for (const [o, l] of Object.entries(Q(t.cast, "등장인물"))) {
    const a = Q(l, `등장인물.${o}`);
    ee(a, Object.keys(G.cast), `등장인물.${o}`);
    const c = j(a.asset, `등장인물.${o}.그림`);
    if (!Object.hasOwn(ls, c))
      throw new Error(`등장인물.${o}: 없는 에셋 '${c}'.`);
    n[o] = {
      asset: c,
      label: a.label === void 0 ? o : j(a.label, `등장인물.${o}.이름표`)
    };
  }
  let i;
  const r = ue(t.panels, "컷").map((o, l) => {
    const a = `컷 ${l + 1}`, c = { ...Q(o, a) };
    if (ee(c, Object.keys(G.panel), a), c.mode !== void 0 && c.mode !== "before" && c.mode !== "full")
      throw new Error(`${a}: 구성은 전체 또는 이전이어야 합니다.`);
    if (c.mode === "before") {
      if (!i)
        throw new Error(`${a}: 첫 컷에서는 이전 구성을 사용할 수 없습니다.`);
      const y = i.actors.map(
        (S) => ({ ...S })
      ), f = ue(c.removeActors ?? [], `${a}.제외인물`).map(
        (S) => j(S, `${a}.제외인물`)
      );
      for (const S of f)
        if (!y.some((g) => g.id === S))
          throw new Error(`${a}: 제거할 인물 '${S}'가 이전 컷에 없습니다.`);
      const p = y.filter(
        (S) => !f.some((g) => g === S.id)
      ), w = ue(c.actors ?? [], `${a}.인물`), $ = /* @__PURE__ */ new Set();
      for (const S of w) {
        const g = typeof S == "string" ? { id: S } : Q(S, `${a}.인물`);
        ee(g, Object.keys(G.actor), `${a}.인물`);
        const k = j(g.id, `${a}.인물.식별자`);
        if ($.has(k))
          throw new Error(`${a}: 캐릭터 식별자가 중복됩니다.`);
        $.add(k);
        const v = p.findIndex((b) => b.id === k), N = {
          ...v < 0 ? {} : p[v],
          ...g
        };
        for (const [b, O] of Object.entries(g))
          b !== "id" && O === null && delete N[b];
        v < 0 ? p.push(N) : p[v] = N;
      }
      c.actors = c.actors !== void 0 && w.length === 0 ? [] : p;
    } else if (c.removeActors !== void 0)
      throw new Error(`${a}: 제외인물은 이전 구성에서만 사용할 수 있습니다.`);
    const d = ue(c.actors, `${a}.인물`).map((y) => {
      const f = typeof y == "string" ? { id: y } : Q(y, `${a}.인물`);
      ee(f, Object.keys(G.actor), `${a}.인물`);
      const p = j(f.id, `${a}.인물.식별자`), w = f.expression === void 0 ? "neutral" : j(f.expression, `${a}.${p}.표정`);
      if (!Object.hasOwn(n, p))
        throw new Error(`${a}: 없는 캐릭터 '${p}'.`);
      if (!Object.hasOwn(cs, w))
        throw new Error(`${a}.${p}: 없는 표정 '${w}'.`);
      const $ = f.gesture === void 0 ? void 0 : j(f.gesture, `${a}.${p}.손모양`), S = f.holding === void 0 ? void 0 : j(f.holding, `${a}.${p}.든소품`);
      if ($ && !Object.hasOwn(fs, $))
        throw new Error(`${a}.${p}: 없는 손 제스처 '${$}'.`);
      if (S && !Object.hasOwn(We, S))
        throw new Error(`${a}.${p}: 없는 소품 '${S}'.`);
      return {
        id: p,
        expression: w,
        gesture: $,
        holding: S,
        x: ie(f.x, 0, 1, `${a}.${p}.가로위치`),
        y: ie(f.y, 0, 1, `${a}.${p}.세로위치`),
        scale: ie(f.scale, 0.5, 1.25, `${a}.${p}.배율`) ?? 1
      };
    });
    if (d.length < 1 || d.length > 3)
      throw new Error(`${a}: 캐릭터는 1~3명이어야 합니다.`);
    if (new Set(d.map((y) => y.id)).size !== d.length)
      throw new Error(`${a}: 캐릭터 식별자가 중복됩니다.`);
    const u = ue(c.dialogue ?? [], `${a}.대사`).map(
      (y) => {
        const f = Q(y, `${a}.대사`);
        ee(f, Object.keys(G.dialogue), `${a}.대사`);
        const p = j(f.from, `${a}.대사.화자`), w = f.to === void 0 ? void 0 : j(f.to, `${a}.대사.상대`);
        if (!d.some(($) => $.id === p))
          throw new Error(`${a}: 화자 '${p}'가 컷에 없습니다.`);
        if (w && !d.some(($) => $.id === w))
          throw new Error(`${a}: 대화 상대 '${w}'가 컷에 없습니다.`);
        return {
          from: p,
          to: w,
          text: j(f.text, `${a}.대사.내용`),
          x: ie(f.x, 0, 1, `${a}.대사.가로위치`),
          y: ie(f.y, 0, 1, `${a}.대사.세로위치`),
          fontSize: ie(f.fontSize, 12, 32, `${a}.대사.글자크기`) ?? 18
        };
      }
    );
    if (u.length > 20)
      throw new Error(`${a}: 대사는 20개 이내로 작성하세요.`);
    const h = ue(c.transfer ?? [], `${a}.전달`).map(
      (y) => {
        const f = Q(y, `${a}.전달`);
        ee(f, Object.keys(G.transfer), `${a}.전달`);
        const p = j(f.from, `${a}.전달.주는인물`), w = j(f.to, `${a}.전달.받는인물`), $ = j(f.prop, `${a}.전달.소품`);
        if (!d.some((S) => S.id === p))
          throw new Error(`${a}: 전달 주체 '${p}'가 컷에 없습니다.`);
        if (!d.some((S) => S.id === w))
          throw new Error(`${a}: 전달 대상 '${w}'가 컷에 없습니다.`);
        if (p === w)
          throw new Error(`${a}: 전달 주체와 대상은 달라야 합니다.`);
        if (!Object.hasOwn(We, $))
          throw new Error(`${a}: 없는 소품 '${$}'.`);
        return { from: p, to: w, prop: $ };
      }
    );
    if (h.length > 6)
      throw new Error(`${a}: 소품 전달은 6개 이내로 작성하세요.`);
    let m;
    if (c.diagram !== void 0 && c.diagram !== null) {
      const y = `${a}.다이어그램`, f = Q(c.diagram, y);
      if (ee(f, Object.keys(G.diagram), y), f.type !== "mermaid")
        throw new Error(`${y}.종류: 머메이드여야 합니다.`);
      m = {
        type: "mermaid",
        source: j(f.source, `${y}.원문`, 2e4),
        title: f.title === void 0 ? "다이어그램" : j(f.title, `${y}.제목`, 100),
        height: ie(f.height, 160, 1200, `${y}.높이`)
      };
    }
    return i = { actors: d, dialogue: u, transfer: h, ...m ? { diagram: m } : {} }, i;
  });
  if (r.length < 1 || r.length > 30)
    throw new Error("컷은 1~30개여야 합니다.");
  return {
    title: t.title === void 0 ? "Comic Gen" : j(t.title, "제목"),
    cast: n,
    panels: r
  };
}
const Ee = (s, e, t) => Math.max(e, Math.min(t, s));
function kt(s, e, t, n) {
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
function Ws(s, e, t, n, i = "compact", r) {
  const o = Math.min(t - 80, 390), l = s.dialogue.map((g) => ({
    line: g,
    lines: kt(g.text, o - 36, g.fontSize, n),
    lineHeight: Math.ceil(g.fontSize * 1.45)
  })), a = l.reduce(
    (g, k) => g + 60 + k.lines.length * k.lineHeight,
    20
  ), c = a + 254, d = Math.max(
    ...s.actors.map((g) => g.holding || g.gesture ? 92 : 60)
  ), u = (t - 72) / s.actors.length, h = Math.min(
    1,
    (u - 12) / (2 * d * Math.max(...s.actors.map((g) => g.scale)))
  ), m = s.actors.map((g) => g.scale * h), y = s.actors.map(
    (g, k) => Ee(
      36 + (t - 72) * (g.x ?? (k + 0.5) / s.actors.length),
      26 + d * m[k],
      t - 26 - d * m[k]
    )
  ), f = s.actors.map(
    (g, k) => Ee(
      g.y === void 0 ? c - 126 : g.y * c,
      a + 70 * m[k],
      c - 126 * m[k]
    )
  );
  for (let g = 0; g < s.actors.length; g++)
    for (let k = g + 1; k < s.actors.length; k++)
      if (Math.abs(y[g] - y[k]) < d * (m[g] + m[k]) && Math.abs(f[g] - f[k]) < 120 * Math.max(m[g], m[k]))
        throw new Error(
          `캐릭터 '${s.actors[g].id}'와 '${s.actors[k].id}'가 겹칩니다. 가로위치·세로위치 또는 배율을 조정하세요.`
        );
  const p = [
    `<rect x="20" y="0" width="${t - 40}" height="${c}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/>`
  ];
  let w = 20;
  l.forEach(({ line: g, lines: k, lineHeight: v }) => {
    const N = y[s.actors.findIndex((H) => H.id === g.from)], b = Ee(
      (g.x === void 0 ? N : g.x * t) - o / 2,
      40,
      t - o - 40
    ), O = 28 + k.length * v, L = g.y === void 0 ? w : Ee(g.y * c, 20, a - O), _ = Math.max(b + 24, Math.min(b + o - 24, N)), A = b + o, K = L + O, D = s.actors.findIndex(
      (H) => H.id === g.from
    ), J = f[D] - 65 * m[D], dt = `M${b + 14} ${L}H${A - 14}Q${A} ${L} ${A} ${L + 14}V${K - 14}Q${A} ${K} ${A - 14} ${K}H${_ + 9}L${N} ${J}L${_ - 9} ${K}H${b + 14}Q${b} ${K} ${b} ${K - 14}V${L + 14}Q${b} ${L} ${b + 14} ${L}Z`;
    p.push(
      `<g data-dialogue="${F(g.from)}" data-to="${F(g.to ?? "")}"><path d="${dt}" fill="#fffaf0" stroke="#303341" stroke-width="2" stroke-linejoin="round"/><text x="${b + 18}" y="${L + 18 + g.fontSize}" font-size="${g.fontSize}">${k.map((H, un) => `<tspan x="${b + 18}" dy="${un ? v : 0}">${F(H)}</tspan>`).join("")}</text></g>`
    ), w += O + 32;
  }), s.actors.forEach((g, k) => {
    const v = e[g.id], N = ls[v.asset], b = s.dialogue.find(
      (D) => D.from === g.id && D.to
    )?.to, O = s.actors.findIndex((D) => D.id === b), L = O < 0 ? 0 : Math.sign(y[O] - y[k]) * 4, _ = kt(
      v.label,
      (t - 72) / s.actors.length - 12,
      16,
      n
    );
    if (_.length > 2)
      throw new Error(`캐릭터 '${g.id}'의 이름표가 너무 깁니다.`);
    const A = g.gesture ? `<g data-gesture="${g.gesture}">${fs[g.gesture]}</g>` : "", K = g.holding ? `<g data-holding="${g.holding}"><circle data-hand="holding" cx="58" cy="20" r="11" fill="white"/><g data-prop="${g.holding}" transform="translate(73 6)">${We[g.holding]}</g></g>` : "";
    p.push(
      `<g data-character="${F(g.id)}" transform="translate(${y[k]} ${f[k]}) scale(${m[k]})" stroke="#303341" stroke-width="2.8" stroke-linecap="round"><ellipse cy="69" rx="51" ry="7" fill="#e8edf3" stroke="none"/>${N.body}<g transform="translate(${L} ${N.faceY})" fill="#303341">${cs[g.expression]}</g>${A}${K}<text y="94" text-anchor="middle" stroke="none" fill="#303341" font-size="16">${_.map((D, J) => `<tspan x="0" dy="${J ? 18 : 0}">${F(D)}</tspan>`).join("")}</text></g>`
    );
  }), s.transfer.forEach((g, k) => {
    const v = s.actors.findIndex(
      (H) => H.id === g.from
    ), N = s.actors.findIndex((H) => H.id === g.to), b = y[v], O = y[N], L = Math.sign(O - b), _ = b + 62 * m[v] * L, A = O - 62 * m[N] * L, K = 20 + (k - (s.transfer.length - 1) / 2) * 12, D = f[v] + K * m[v], J = f[N] + K * m[N], dt = Math.atan2(J - D, A - _) * 180 / Math.PI;
    p.push(
      `<g data-transfer="${F(g.from)}" data-to="${F(g.to)}" stroke="#586c8c" stroke-width="2.5"><path d="M${_} ${D}L${A} ${J}" fill="none"/><circle data-hand="transfer" cx="${_}" cy="${D}" r="${9 * m[v]}" fill="white"/><circle data-hand="receive" cx="${A}" cy="${J}" r="${9 * m[N]}" fill="white"/><path transform="translate(${A} ${J}) rotate(${dt})" d="M-12 -5L-4 0L-12 5" fill="none"/><g data-prop="${g.prop}" transform="translate(${(_ + A) / 2} ${(D + J) / 2 - 16})">${We[g.prop]}</g></g>`
    );
  });
  let $ = p.slice(1).join(""), S = c;
  if (r && s.diagram) {
    const g = t - 80, k = g - 32, v = s.diagram.height ?? Ee(k * r.height / r.width + 58, 180, 1200), N = v - 58, b = Math.min(
      k / r.width,
      N / r.height
    ), O = 56 + (k - r.width * b) / 2, L = 66 + (N - r.height * b) / 2;
    if (kt(s.diagram.title, k, 16, n).length > 1)
      throw new Error(
        "다이어그램 제목이 너무 깁니다. 제목이나 너비를 조정하세요."
      );
    $ = `<g data-diagram="mermaid"><rect x="40" y="20" width="${g}" height="${v}" rx="10" fill="#f3f7fc" stroke="#8093ab" stroke-width="2"/><text x="56" y="48" font-size="16" font-weight="700">${F(s.diagram.title)}</text><g data-diagram-content="mermaid" transform="translate(${O} ${L}) scale(${b})">${r.svg}</g></g><g data-scene="true" transform="translate(0 ${v + 40})">${$}</g>`, S += v + 40;
  }
  if (i === "phone") {
    const g = S * 2 + 92;
    return {
      markup: `<rect x="20" y="0" width="${t - 40}" height="${g}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/><g transform="translate(0 ${(g - S) / 2})">${$}</g>`,
      height: g
    };
  }
  return r ? {
    markup: `<rect x="20" y="0" width="${t - 40}" height="${S}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/>${$}`,
    height: S
  } : { markup: p.join(""), height: c };
}
const Ti = "https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.esm.min.mjs", Tt = 2e4, Li = "http://www.w3.org/2000/svg", Ii = Math.random().toString(36).slice(2);
let xi = 0, Ci = 0, Ve, ns = Promise.resolve();
const ut = [
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
  "paint-order"
], Mi = new Set(ut), _i = /* @__PURE__ */ new Set([
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
  "fecomposite"
]), ji = /* @__PURE__ */ new Set([
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
  ...ut
]);
function Bi(s) {
  if (!s.trim() || s.length > Tt)
    throw new Error(`Mermaid 원문은 1~${Tt}자여야 합니다.`);
  const e = document.createElement("textarea");
  e.innerHTML = s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const t = e.value;
  if (/%%\s*\{|^\s*---\s*(?:\r?\n|$)/m.test(t))
    throw new Error(
      "Mermaid 원문 안의 설정 지시문과 frontmatter는 지원하지 않습니다."
    );
  if (/<(?:\s*\/?\s*(?:script|style|img|image|svg|foreignobject|iframe|object|embed|link|a|html|body|div|span|p|br|b|i|em|strong|input|video|audio|canvas|math)\b|[!?])/i.test(
    t
  ) || /<[a-z][^>]*\s+[a-z_:][\w:.-]*\s*=/i.test(t))
    throw new Error(
      "Mermaid 원문에는 HTML 대신 일반 텍스트 라벨을 사용해 주세요."
    );
  if (/@\s*\{/.test(t) || /(?:^|[;\r\n])\s*(?:click|links?|style|classDef|linkStyle|cssClass)\s/i.test(
    t
  ) || /(?:\b(?:img|image|icon)\s*:|url\s*\(|@import|javascript\s*:|vbscript\s*:|data\s*:\s*[a-z]+\/)/i.test(
    t
  ))
    throw new Error(
      "Mermaid 노드 메타데이터(@{}), 이미지·링크·CSS 선언과 외부 리소스는 지원하지 않습니다."
    );
}
function Pi(s) {
  if (typeof s != "string" || !s.trim() || s.length > 300 || /[^\p{L}\p{N}\s,'"_\-]/u.test(s))
    throw new Error("다이어그램에 사용할 올바른 글꼴 이름이 필요합니다.");
  return s;
}
async function Ki() {
  if (!Ve) {
    const s = Ci++;
    Ve = import(/* webpackIgnore: true */ Ti + (s ? `?comic-gen-retry=${s}` : "")).then((t) => {
      const n = t.default;
      if (typeof n?.initialize != "function" || typeof n?.render != "function")
        throw new Error("Mermaid 모듈을 불러오지 못했습니다.");
      return n;
    }).catch((t) => {
      throw Ve = void 0, t;
    });
  }
  return Ve;
}
function Js(s) {
  const e = new DOMParser().parseFromString(s, "image/svg+xml");
  if (e.querySelector("parsererror") || e.documentElement.localName !== "svg")
    throw new Error("Mermaid가 올바른 SVG를 만들지 못했습니다.");
  return e.documentElement;
}
function Xe(s, e, t = !1) {
  let n = !0;
  const i = s.replace(
    /url\(\s*(["']?)(.*?)\1\s*\)/gi,
    (r, o, l) => {
      let a = l.trim();
      if (t && !a.startsWith("#")) {
        const c = a.lastIndexOf("#");
        a = c >= 0 ? a.slice(c) : "";
      }
      return !a.startsWith("#") || !e.has(a.slice(1)) ? (n = !1, "") : `url(${a})`;
    }
  );
  return /url\s*\(/i.test(i.replace(/url\(#[^)]*\)/g, "")) && (n = !1), n ? i : void 0;
}
function Hs(s, e) {
  const t = document.createElement("span").style;
  for (const n of ut) {
    const i = Xe(s.getPropertyValue(n), e);
    i && t.setProperty(n, i, s.getPropertyPriority(n));
  }
  return s.getPropertyValue("display") === "none" && (t.display = "none"), t.cssText;
}
function Di(s) {
  const e = [];
  let t = 0, n = 0, i = "";
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    i ? o === i && s[r - 1] !== "\\" && (i = "") : o === "'" || o === '"' ? i = o : o === "(" || o === "[" ? n++ : o === ")" || o === "]" ? n-- : o === "," && n === 0 && (e.push(s.slice(t, r).trim()), t = r + 1);
  }
  return e.push(s.slice(t).trim()), e;
}
function Fi(s, e, t) {
  const n = new CSSStyleSheet();
  n.replaceSync(s);
  const i = [], r = `#${e}`;
  for (const o of n.cssRules) {
    if (!(o instanceof CSSStyleRule)) continue;
    if (!Di(o.selectorText).every(
      (c) => c === r || c.startsWith(r + " ") || c.startsWith(r + ">") || c.startsWith(r + ":")
    )) throw new Error("Mermaid SVG에 범위 밖 스타일이 있습니다.");
    const a = Hs(o.style, t);
    a && i.push(`${o.selectorText}{${a}}`);
  }
  return i.join(`
`);
}
function qi(s) {
  if (s.length > 2e6)
    throw new Error("Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요.");
  const e = Js(s), t = [e, ...e.querySelectorAll("*")];
  if (t.length > 1e4)
    throw new Error(
      "Mermaid SVG 요소가 너무 많습니다. 다이어그램을 나누어 주세요."
    );
  const n = new Set(t.map((r) => r.id).filter(Boolean)), i = e.id;
  for (const r of t)
    for (const o of [...r.attributes])
      if (/url\s*\(/i.test(o.value)) {
        const l = Xe(o.value, n, !0);
        l === void 0 ? r.removeAttributeNode(o) : r.setAttribute(o.name, l);
      }
  for (const r of t) {
    const o = r.localName.toLowerCase();
    if (r.namespaceURI !== Li || !_i.has(o) && o !== "style") {
      o === "a" ? r.replaceWith(...r.childNodes) : r.remove();
      continue;
    }
    if (o === "style") {
      r.textContent = Fi(r.textContent ?? "", i, n);
      continue;
    }
    for (const l of [...r.attributes]) {
      const a = l.name.toLowerCase(), c = l.value;
      if (!ji.has(a) && !a.startsWith("aria-") && !a.startsWith("data-"))
        r.removeAttributeNode(l);
      else if (a === "href" || a === "xlink:href")
        (!c.startsWith("#") || !n.has(c.slice(1))) && r.removeAttributeNode(l);
      else if (a === "style") {
        const d = document.createElement("span").style;
        d.cssText = c, r.setAttribute("style", Hs(d, n));
      } else if (Mi.has(a)) {
        const d = Xe(c, n);
        d === void 0 ? r.removeAttributeNode(l) : r.setAttribute(l.name, d);
      }
    }
  }
  return e;
}
function Ri(s) {
  if (s.length > 3e6)
    throw new Error("Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요.");
  const e = s.match(
    /\bsrc="data:text\/html;charset=UTF-8;base64,([^"]+)"/i
  )?.[1];
  if (!e) throw new Error("Mermaid 격리 문서에서 SVG를 읽지 못했습니다.");
  const t = Uint8Array.from(
    atob(e),
    (o) => o.charCodeAt(0)
  ), n = new TextDecoder().decode(t), r = new DOMParser().parseFromString(n, "text/html").querySelector("svg");
  if (!r) throw new Error("Mermaid 격리 문서에서 SVG를 읽지 못했습니다.");
  return r.outerHTML;
}
function Ui(s) {
  const e = (s.getAttribute("viewBox") ?? "").trim().split(/[\s,]+/).map(Number), t = e.length === 4 ? e[2] : Number.parseFloat(s.getAttribute("width") ?? ""), n = e.length === 4 ? e[3] : Number.parseFloat(s.getAttribute("height") ?? "");
  if (!Number.isFinite(t) || !Number.isFinite(n) || t <= 0 || n <= 0 || t > 2e4 || n > 2e4 || t * n > 16e7)
    throw new Error(
      "Mermaid 다이어그램 크기가 너무 큽니다. 다이어그램을 나누어 주세요."
    );
  return (e.length !== 4 || e.some((i) => !Number.isFinite(i))) && s.setAttribute("viewBox", `0 0 ${t} ${n}`), s.setAttribute("width", String(t)), s.setAttribute("height", String(n)), s.setAttribute("preserveAspectRatio", "xMidYMid meet"), { width: t, height: n };
}
async function Vi(s, e) {
  if (typeof document > "u" || !document.body)
    throw new Error("Mermaid 렌더링에는 브라우저 문서가 필요합니다.");
  Bi(s), e = Pi(e);
  const t = ns.then(async () => {
    const n = await Ki();
    await Promise.all([
      document.fonts.load(`18px ${e}`, s),
      document.fonts.load(`bold 18px ${e}`, s),
      document.fonts.load(`italic 18px ${e}`, s)
    ]), await document.fonts.ready;
    const i = `comic-gen-mermaid-${Ii}-${++xi}`, r = document.createElement("div");
    r.dataset.comicDiagramTemporary = "", r.style.cssText = "all:initial!important;display:block!important;position:fixed!important;left:-100000px!important;top:0!important;width:20000px!important;pointer-events:none!important;opacity:0!important;";
    const o = [...document.fonts].filter(
      (a) => a.status === "loaded"
    ), l = new MutationObserver(() => {
      const a = r.querySelector("iframe"), c = a?.contentDocument;
      if (!(!a || !c)) {
        a.style.cssText = "all:initial!important;display:block!important;width:20000px!important;height:20000px!important;border:0!important;";
        for (const d of o) c.fonts.add(d);
      }
    });
    l.observe(r, { childList: !0, subtree: !0 }), document.body.append(r);
    try {
      n.initialize({
        startOnLoad: !1,
        securityLevel: "sandbox",
        suppressErrorRendering: !0,
        maxTextSize: Tt,
        maxEdges: 500,
        htmlLabels: !1,
        fontFamily: e,
        theme: "neutral",
        themeVariables: { fontFamily: e, fontSize: "18px" },
        flowchart: { htmlLabels: !1, useMaxWidth: !1 },
        class: { htmlLabels: !1, useMaxWidth: !1 },
        sequence: {
          useMaxWidth: !1,
          actorFontFamily: e,
          noteFontFamily: e,
          messageFontFamily: e
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
          "altFontFamily"
        ]
      });
      const a = await n.render(i, s, r);
      l.disconnect();
      const c = qi(Ri(a.svg)), d = Ui(c), u = r.attachShadow({ mode: "closed" });
      u.append(document.importNode(c, !0));
      const h = u.firstElementChild, m = [h, ...h.querySelectorAll("*")], y = new Set(
        m.map((w) => w.id).filter(Boolean)
      ), f = m.map((w) => {
        if (w.localName === "style") return "";
        const $ = getComputedStyle(w), S = document.createElement("span").style;
        for (const g of ut) {
          const k = Xe(
            $.getPropertyValue(g),
            y,
            !0
          );
          k && S.setProperty(g, k, "important");
        }
        return $.display === "none" && S.setProperty("display", "none", "important"), S.cssText;
      });
      m.forEach((w, $) => {
        w.localName === "style" ? w.remove() : (w.setAttribute("style", f[$]), w.removeAttribute("class"));
      }), h.style.removeProperty("visibility"), h.style.setProperty("width", `${d.width}px`, "important"), h.style.setProperty("height", `${d.height}px`, "important"), h.style.setProperty("max-width", "none", "important"), h.style.setProperty("max-height", "none", "important");
      const p = new XMLSerializer().serializeToString(h);
      if (p.length > 2e6)
        throw new Error(
          "Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요."
        );
      return { svg: p, ...d };
    } finally {
      l.disconnect(), r.remove(), document.getElementById(i)?.remove(), document.getElementById(`d${i}`)?.remove(), document.getElementById(`i${i}`)?.remove();
    }
  });
  return ns = t.catch(() => {
  }), t;
}
function zi(s, e) {
  if (!/^[A-Za-z][A-Za-z0-9_-]{0,120}$/.test(e))
    throw new Error("다이어그램 SVG 식별자 접두사가 올바르지 않습니다.");
  const t = Js(s.svg), n = [t, ...t.querySelectorAll("*")], i = /* @__PURE__ */ new Map();
  let r = 0;
  const o = (l) => {
    const a = l.localName === "svg" ? l : l.closest("svg");
    let c = i.get(a);
    return c || (c = /* @__PURE__ */ new Map(), i.set(a, c)), c;
  };
  for (const l of n) {
    if (!l.id) continue;
    const a = o(l);
    if (a.has(l.id))
      throw new Error("다이어그램 SVG 식별자가 중복됩니다.");
    a.set(l.id, `${e}-${r++}`);
  }
  for (const l of n) {
    const a = o(l);
    for (const c of [...l.attributes])
      if (c.name === "id")
        l.setAttribute("id", a.get(c.value));
      else if (c.localName === "href" && c.value.startsWith("#")) {
        const d = a.get(c.value.slice(1));
        d && l.setAttribute(c.name, `#${d}`);
      } else c.name === "aria-labelledby" || c.name === "aria-describedby" ? l.setAttribute(
        c.name,
        c.value.split(/\s+/).map((d) => a.get(d) ?? d).join(" ")
      ) : /url\(/i.test(c.value) && l.setAttribute(
        c.name,
        c.value.replace(
          /url\(\s*(["']?)#([^"')\s]+)\1\s*\)/gi,
          (d, u, h) => a.has(h) ? `url(#${a.get(h)})` : d
        )
      );
  }
  return new XMLSerializer().serializeToString(t);
}
let Qs = 0, Yi = 0;
document.fonts.addEventListener("loadingdone", (s) => {
  s.fontfaces.length && Qs++;
});
function Xs(s, e, t) {
  e = Oi(e);
  const n = Ai(s), i = e.width ?? 720, r = e.panelFormat ?? t;
  if (r !== "compact" && r !== "phone")
    throw new Error("컷비율은 기본 또는 모바일이어야 합니다.");
  if (!Number.isFinite(i) || i < 480 || i > 2400)
    throw new Error("너비는 480~2400 사이여야 합니다.");
  const o = e.font ?? "Malgun Gothic, Apple SD Gothic Neo, sans-serif";
  if (typeof o != "string" || o.length > 300 || /[<>]/.test(o))
    throw new Error("올바른 글꼴 이름이 필요합니다.");
  return { comic: n, options: e, width: i, font: o, format: r };
}
function Zs(s, e) {
  const { comic: t, width: n, font: i, options: r, format: o } = e;
  return JSON.stringify({
    panel: s,
    members: s.actors.map((l) => [l.id, t.cast[l.id]]),
    width: n,
    font: i,
    fontEpoch: Qs,
    fontVersion: r.fontVersion,
    assetVersion: "1",
    layoutVersion: s.diagram ? 3 : 2,
    format: o
  });
}
function en(s) {
  return {
    svg: "",
    width: 0,
    height: 0,
    diagnostics: [s instanceof Error ? s.message : "렌더링 실패"],
    panels: []
  };
}
function tn(s, e, t) {
  const { comic: n, width: i, font: r } = s, o = [], l = [], a = `cg-${Date.now().toString(36)}-${++Yi}-${Math.random().toString(36).slice(2, 9)}`, c = (u, h, m) => `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${h}" viewBox="0 0 ${i} ${h}" role="img" aria-label="${F(m)}"><title>${F(m)}</title><rect width="100%" height="100%" fill="#f5f7fb"/><g font-family="${F(r)}" fill="#303341"><text x="24" y="42" font-size="24" font-weight="700">${F(m)}</text>${u}</g></svg>`;
  let d = 68;
  for (const [u, h] of e.entries()) {
    const { markup: m, height: y, hit: f } = h, p = (w) => n.panels[u].diagram ? zi(
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${y}" viewBox="0 0 ${i} ${y}" style="width:${i}px!important;height:${y}px!important;max-width:none!important;max-height:none!important">${m}</svg>`
      },
      `${a}-${w}-${u}`
    ) : m;
    o.push(
      `<g data-panel="${u}" transform="translate(0 ${d})">${p("whole")}</g>`
    ), l.push({
      index: u,
      svg: c(
        `<g data-panel="${u}" transform="translate(0 68)">${p("panel")}</g>`,
        y + 92,
        `${n.title} · ${u + 1}/${n.panels.length}`
      ),
      width: i,
      height: y + 92,
      diagnostics: [],
      cache: { hits: f ? 1 : 0, misses: f ? 0 : 1, bytes: t.bytes }
    }), d += y + 24;
  }
  return {
    svg: c(o.join(""), d, n.title),
    width: i,
    height: d,
    diagnostics: [],
    panels: l,
    cache: {
      hits: e.filter((u) => u.hit).length,
      misses: e.filter((u) => !u.hit).length,
      bytes: t.bytes
    }
  };
}
function is(s, e, t, n = "compact") {
  try {
    const i = Xs(s, e, n), r = i.comic.panels.findIndex(
      (l) => l.diagram
    );
    if (r >= 0)
      throw new Error(
        `컷 ${r + 1}.다이어그램: 만화그리기비동기(renderComicAsync) 또는 컷그리기비동기(renderPanelsAsync)를 await로 호출하세요.`
      );
    const o = i.comic.panels.map((l) => {
      const a = Zs(l, i), c = t.get(a), d = c ?? Ws(
        l,
        i.comic.cast,
        i.width,
        i.font,
        i.format
      );
      return c || t.set(a, d), { ...d, hit: !!c };
    });
    return tn(i, o, t);
  } catch (i) {
    return en(i);
  }
}
async function rs(s, e, t, n = "compact") {
  try {
    const i = Xs(s, e, n);
    i.comic.panels.some((o) => o.diagram) && await document.fonts.ready;
    const r = [];
    for (const [o, l] of i.comic.panels.entries()) {
      const a = Zs(l, i), c = t.get(a);
      if (c) {
        r.push({ ...c, hit: !0 });
        continue;
      }
      let d;
      if (l.diagram)
        try {
          d = await Vi(l.diagram.source, i.font);
        } catch (h) {
          throw new Error(
            `컷 ${o + 1}.다이어그램: ${h instanceof Error ? h.message : "Mermaid 렌더링 실패"}`
          );
        }
      const u = Ws(
        l,
        i.comic.cast,
        i.width,
        i.font,
        i.format,
        d
      );
      t.set(a, u), r.push({ ...u, hit: !1 });
    }
    return tn(i, r, t);
  } catch (i) {
    return en(i);
  }
}
function sn(s = 2e6) {
  const e = new hn(s);
  return {
    render: (t, n = {}) => is(t, n, e),
    renderPanels: (t, n = {}) => is(t, n, e, "phone"),
    renderAsync: (t, n = {}) => rs(t, n, e),
    renderPanelsAsync: (t, n = {}) => rs(t, n, e, "phone"),
    clearCache: () => e.clear()
  };
}
const ht = sn(), Hi = ht.render, Qi = ht.renderPanels, Xi = ht.renderAsync, Zi = ht.renderPanelsAsync, Gi = `
.comic-figure { margin: 20px 0; }
.comic-figure [role="alert"] { color: #b53b45; white-space: pre-wrap; }
.comic-card { box-sizing: border-box; display: flex; align-items: center; gap: 18px; width: 100%; max-width: 540px; padding: 16px; border: 1px solid #dbe3ee; border-radius: 16px; background: white; color: #233044; text-align: left; font: 14px/1.6 system-ui, sans-serif; cursor: pointer; }
.comic-card:hover { background: #f8faff; border-color: #4c64e8; }
.comic-card:focus-visible, .comic-viewer button:focus-visible, .comic-viewer select:focus-visible, .comic-viewer input:focus-visible { outline: 3px solid #8096ff; outline-offset: 3px; }
.comic-card-thumbnail { display: block; flex: 0 0 112px; width: 112px; height: 96px; overflow: hidden; border-radius: 10px; background: #f5f7fb; }
.comic-card-thumbnail svg { display: block; width: 100%; height: auto; }
.comic-card-copy { display: grid; gap: 6px; min-width: 0; overflow-wrap: anywhere; }
.comic-card-copy strong { font-size: 17px; }
.comic-card-copy span { color: #526fea; font-size: 13px; }
.comic-viewer { box-sizing: border-box; width: calc(100vw - 48px); max-width: 1800px; height: calc(100dvh - 48px); max-height: none; padding: 0; border: 1px solid #dbe3ee; border-radius: 16px; background: #f5f7fb; color: #233044; font: 14px/1.6 system-ui, sans-serif; overflow: hidden; }
.comic-viewer[open] { display: flex; flex-direction: column; }
.comic-viewer::backdrop { background: #162339b3; }
.comic-viewer-toolbar { flex: none; display: flex; align-items: center; flex-wrap: wrap; gap: 12px; padding: 16px 20px; background: white; border-bottom: 1px solid #dbe3ee; }
.comic-viewer-title { margin: 0 auto 0 0; min-width: 0; font-size: 18px; color: inherit; letter-spacing: 0; overflow-wrap: anywhere; }
.comic-viewer-toolbar label { display: flex; align-items: center; gap: 8px; margin: 0; color: inherit; font-size: 13px; }
.comic-viewer-controls { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; max-width: 100%; }
.comic-viewer-checkbox input { flex: none; width: 16px; height: 16px; margin: 0; padding: 0; accent-color: #526fea; }
.comic-viewer button, .comic-viewer select { border: 1px solid #dbe3ee; border-radius: 8px; background: white; color: #344055; padding: 8px 12px; font: inherit; cursor: pointer; }
.comic-viewer-help { flex: none; margin: 0; padding: 8px 20px; font-size: 12px; color: #69778b; }
.comic-viewer-viewport { box-sizing: border-box; flex: 1; min-width: 0; min-height: 0; overflow: auto; overscroll-behavior: contain; padding: 16px; }
.comic-viewer-viewport[data-prevent-overflow="true"] { overflow: hidden; }
.comic-viewer-artwork { margin: 0 auto; }
.comic-viewer-artwork svg { display: block; width: 100%; max-width: none; height: auto; }
@media (max-width: 600px) {
  .comic-viewer { width: 100vw; max-width: none; height: 100dvh; margin: 0; border: 0; border-radius: 0; }
  .comic-viewer-toolbar { padding: 12px; gap: 10px; }
  .comic-viewer-title { flex-basis: calc(100% - 80px); font-size: 16px; }
  .comic-viewer-help { padding: 8px 12px; }
  .comic-viewer-viewport { padding: 8px; }
  .comic-card { gap: 12px; padding: 12px; }
  .comic-card-thumbnail { flex-basis: 88px; width: 88px; height: 80px; }
}
`, os = /* @__PURE__ */ new WeakMap(), nn = sn(), Lt = /* @__PURE__ */ new WeakMap();
let I, Ze, rn, et, _e, se, z, as = "";
function Te() {
  if (!z?.result || !I?.open) return;
  let s = z.result.width * Number(et.value);
  if (se.dataset.preventOverflow = String(_e.checked), _e.checked) {
    const e = getComputedStyle(se), t = Math.max(
      0,
      se.clientWidth - parseFloat(e.paddingLeft) - parseFloat(e.paddingRight)
    ), n = Math.max(
      0,
      se.clientHeight - parseFloat(e.paddingTop) - parseFloat(e.paddingBottom)
    );
    s = Math.min(
      s,
      t,
      n * z.result.width / z.result.height
    ), se.scrollTo(0, 0);
  }
  Ze.style.width = `${s}px`;
}
function on(s) {
  s.result && (rn.textContent = s.title.textContent, Ze.innerHTML = s.result.svg, et.value = "1", _e.checked = !0, se.scrollTo(0, 0), Te());
}
function Wi(s) {
  s.result?.svg && (I || (I = document.createElement("dialog"), I.className = "comic-viewer", I.setAttribute("aria-labelledby", "comic-viewer-title"), I.setAttribute("aria-describedby", "comic-viewer-help"), I.innerHTML = '<div class="comic-viewer-toolbar"><h2 class="comic-viewer-title" id="comic-viewer-title"></h2><button type="button" autofocus>닫기</button><div class="comic-viewer-controls"><label class="comic-viewer-checkbox"><input type="checkbox" checked>화면 넘침 방지</label><label>보기 크기 <select><option value="1">100%</option><option value="1.5">150%</option><option value="2">200%</option></select></label></div></div><p class="comic-viewer-help" id="comic-viewer-help">화면 넘침 방지를 켜면 만화를 가로·세로 화면 안에 맞춥니다. 끄면 선택한 보기 크기로 스크롤해 읽을 수 있습니다.</p><div class="comic-viewer-viewport" tabindex="0" role="region" aria-label="만화 읽기 영역"><div class="comic-viewer-artwork"></div></div>', rn = I.querySelector("h2"), Ze = I.querySelector(".comic-viewer-artwork"), se = I.querySelector(".comic-viewer-viewport"), et = I.querySelector("select"), _e = I.querySelector('input[type="checkbox"]'), et.addEventListener("change", Te), _e.addEventListener("change", Te), I.querySelector("button").addEventListener("click", () => I.close()), I.addEventListener("close", () => {
    document.body.style.overflow = as, Ze.replaceChildren(), z?.button.focus(), z = void 0;
  }), document.body.append(I), new ResizeObserver(Te).observe(se)), z = s, on(s), I.open || (as = document.body.style.overflow, document.body.style.overflow = "hidden", I.showModal()), Te());
}
function an(s) {
  if (!document.getElementById("comic-gen-embed-styles")) {
    const n = document.createElement("style");
    n.id = "comic-gen-embed-styles", n.textContent = Gi, document.head.append(n);
  }
  const e = 'pre[language="comic-gen"], pre[data-comic], pre:has(code.language-comic), pre:has(code.language-comic-gen)', t = [...s.querySelectorAll(e)];
  return s instanceof HTMLElement && s.matches(e) && t.unshift(s), t;
}
function It(s) {
  return (s.querySelector("code") ?? s).textContent ?? "";
}
function ln(s) {
  let e = os.get(s);
  if (!e) {
    const t = document.createElement("figure");
    t.className = "comic-figure";
    const n = document.createElement("button");
    n.type = "button", n.className = "comic-card", n.setAttribute("aria-haspopup", "dialog");
    const i = document.createElement("span");
    i.className = "comic-card-thumbnail", i.setAttribute("aria-hidden", "true");
    const r = document.createElement("span");
    r.className = "comic-card-copy";
    const o = document.createElement("strong"), l = document.createElement("span");
    r.append(o, l), n.append(i, r), e = { figure: t, button: n, thumbnail: i, title: o, caption: l };
    const a = e;
    n.addEventListener("click", () => Wi(a)), os.set(s, e);
  }
  return s.after(e.figure), s.hidden = !0, e;
}
function cn(s, e) {
  if (s.result = e, s.figure.removeAttribute("aria-busy"), s.button.disabled = !1, e.svg) {
    const t = new DOMParser().parseFromString(e.svg, "image/svg+xml");
    s.title.textContent = t.documentElement.getAttribute("aria-label"), s.caption.textContent = `${e.panels.length}컷 · 만화 읽기 ↗`, s.button.setAttribute(
      "aria-label",
      `${s.title.textContent} · 만화 읽기`
    ), s.thumbnail.innerHTML = e.panels[0].svg, s.figure.replaceChildren(s.button), z === s && on(s);
  } else {
    z === s && I?.close();
    const t = document.createElement("p");
    t.setAttribute("role", "alert"), t.textContent = e.diagnostics.join(`
`), s.figure.replaceChildren(t);
  }
}
function fn(s) {
  const e = (Lt.get(s) ?? 0) + 1;
  return Lt.set(s, e), e;
}
function er(s = document, e = {}) {
  return an(s).map((t) => {
    fn(t);
    const n = nn.render(It(t), e);
    return cn(ln(t), n), n;
  });
}
async function tr(s = document, e = {}) {
  return Promise.all(
    an(s).map(async (t) => {
      const n = It(t), i = fn(t), r = t.isConnected, o = ln(t);
      if (o.figure.setAttribute("aria-busy", "true"), o.button.disabled = !0, !o.result) {
        const a = document.createElement("p");
        a.setAttribute("role", "status"), a.textContent = "만화를 그리는 중…", o.figure.replaceChildren(a);
      }
      const l = await nn.renderAsync(n, e);
      if (Lt.get(t) !== i) return l;
      if (r && !t.isConnected)
        return o.figure.remove(), z === o && I?.close(), l;
      if (It(t) !== n) {
        o.figure.removeAttribute("aria-busy"), o.result = void 0, z === o && I?.close();
        const a = document.createElement("p");
        return a.setAttribute("role", "status"), a.textContent = "코드가 바뀌었어요. 다시 그리기를 호출하세요.", o.figure.replaceChildren(a), l;
      }
      return cn(o, l), l;
    })
  );
}
function sr(s, e) {
  const t = URL.createObjectURL(s), n = document.createElement("a");
  n.href = t, n.download = e, n.click(), setTimeout(() => URL.revokeObjectURL(t), 1e3);
}
async function nr(s, e = 1) {
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
        (d) => d ? a(d) : c(new Error("PNG 생성에 실패했습니다.")),
        "image/png"
      )
    );
  } finally {
    URL.revokeObjectURL(i);
  }
}
export {
  Ji as assetVersion,
  sn as createRenderer,
  sr as downloadBlob,
  nr as exportPng,
  er as renderCodeBlocks,
  tr as renderCodeBlocksAsync,
  Hi as renderComic,
  Xi as renderComicAsync,
  Qi as renderPanels,
  Zi as renderPanelsAsync,
  sn as 렌더러만들기,
  Hi as 만화그리기,
  Xi as 만화그리기비동기,
  vi as 문법값,
  G as 문법항목,
  Qi as 컷그리기,
  Zi as 컷그리기비동기,
  er as 코드블록그리기,
  tr as 코드블록그리기비동기
};
