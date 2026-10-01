/*! Comic Gen browser SDK v0.5.0
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
const nr = "1", un = {
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
}, hn = {
  neutral: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-10 17q10 7 20 0" fill="none"/>',
  happy: '<path d="M-25 -2q8 -12 16 0m18 0q8 -12 16 0M-13 16q13 18 26 0" fill="none"/>',
  confused: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-24 -17l13 -5m21 1 14 4M-8 18q8 -6 16 0" fill="none"/>',
  sad: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-12 23q12 -14 24 0" fill="none"/>',
  angry: '<path d="M-25 -16l15 6m20 0 15 -6M-10 20h20" fill="none"/><circle cx="-17" cy="-1" r="3"/><circle cx="17" cy="-1" r="3"/>'
}, dn = {
  wave: '<g data-hand="wave"><circle cx="-65" cy="-22" r="12" fill="white"/><path d="M-77 -42l-4 -8m15 2v-10m13 17 5 -7" fill="none"/></g>',
  point: '<g data-hand="point"><circle cx="-65" cy="0" r="11" fill="white"/><path d="M-77 0h-13" fill="none"/></g>'
}, Ge = {
  request: '<rect x="-18" y="-13" width="36" height="26" rx="4" fill="#f9f0cd"/><path d="M-18 -13L0 1l18 -14" fill="none"/>',
  data: '<path d="M-16 -12v23c0 10 32 10 32 0v-23" fill="#daccff"/><ellipse cy="-12" rx="16" ry="6" fill="#ece4ff"/>',
  key: '<circle cx="-10" r="9" fill="#ffe0a8"/><path d="M0 0h21m-5 0v8m-8 -8v6" fill="none"/>'
};
function R(n) {
  return n.replace(
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
class gs {
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
    const s = this.entries.get(e);
    s && (this.size -= s.bytes, this.entries.delete(e));
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
const Ot = /* @__PURE__ */ Symbol.for("yaml.alias"), wt = /* @__PURE__ */ Symbol.for("yaml.document"), te = /* @__PURE__ */ Symbol.for("yaml.map"), mn = /* @__PURE__ */ Symbol.for("yaml.pair"), H = /* @__PURE__ */ Symbol.for("yaml.scalar"), ye = /* @__PURE__ */ Symbol.for("yaml.seq"), G = /* @__PURE__ */ Symbol.for("yaml.node.type"), we = (n) => !!n && typeof n == "object" && n[G] === Ot, Je = (n) => !!n && typeof n == "object" && n[G] === wt, Me = (n) => !!n && typeof n == "object" && n[G] === te, j = (n) => !!n && typeof n == "object" && n[G] === mn, C = (n) => !!n && typeof n == "object" && n[G] === H, _e = (n) => !!n && typeof n == "object" && n[G] === ye;
function P(n) {
  if (n && typeof n == "object")
    switch (n[G]) {
      case te:
      case ye:
        return !0;
    }
  return !1;
}
function B(n) {
  if (n && typeof n == "object")
    switch (n[G]) {
      case Ot:
      case te:
      case H:
      case ye:
        return !0;
    }
  return !1;
}
const pn = (n) => (C(n) || P(n)) && !!n.anchor, se = /* @__PURE__ */ Symbol("break visit"), ys = /* @__PURE__ */ Symbol("skip children"), Ne = /* @__PURE__ */ Symbol("remove node");
function be(n, e) {
  const t = ws(e);
  Je(n) ? fe(null, n.contents, t, Object.freeze([n])) === Ne && (n.contents = null) : fe(null, n, t, Object.freeze([]));
}
be.BREAK = se;
be.SKIP = ys;
be.REMOVE = Ne;
function fe(n, e, t, s) {
  const i = bs(n, e, t, s);
  if (B(i) || j(i))
    return ks(n, s, i), fe(n, i, t, s);
  if (typeof i != "symbol") {
    if (P(e)) {
      s = Object.freeze(s.concat(e));
      for (let r = 0; r < e.items.length; ++r) {
        const o = fe(r, e.items[r], t, s);
        if (typeof o == "number")
          r = o - 1;
        else {
          if (o === se)
            return se;
          o === Ne && (e.items.splice(r, 1), r -= 1);
        }
      }
    } else if (j(e)) {
      s = Object.freeze(s.concat(e));
      const r = fe("key", e.key, t, s);
      if (r === se)
        return se;
      r === Ne && (e.key = null);
      const o = fe("value", e.value, t, s);
      if (o === se)
        return se;
      o === Ne && (e.value = null);
    }
  }
  return i;
}
function ws(n) {
  return typeof n == "object" && (n.Collection || n.Node || n.Value) ? Object.assign({
    Alias: n.Node,
    Map: n.Node,
    Scalar: n.Node,
    Seq: n.Node
  }, n.Value && {
    Map: n.Value,
    Scalar: n.Value,
    Seq: n.Value
  }, n.Collection && {
    Map: n.Collection,
    Seq: n.Collection
  }, n) : n;
}
function bs(n, e, t, s) {
  if (typeof t == "function")
    return t(n, e, s);
  if (Me(e))
    return t.Map?.(n, e, s);
  if (_e(e))
    return t.Seq?.(n, e, s);
  if (j(e))
    return t.Pair?.(n, e, s);
  if (C(e))
    return t.Scalar?.(n, e, s);
  if (we(e))
    return t.Alias?.(n, e, s);
}
function ks(n, e, t) {
  const s = e[e.length - 1];
  if (P(s))
    s.items[n] = t;
  else if (j(s))
    n === "key" ? s.key = t : s.value = t;
  else if (Je(s))
    s.contents = t;
  else {
    const i = we(s) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${i} parent`);
  }
}
const vs = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, Ss = (n) => n.replace(/[!,[\]{}]/g, (e) => vs[e]);
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
    const s = e.trim().split(/[ \t]+/), i = s.shift();
    switch (i) {
      case "%TAG": {
        if (s.length !== 2 && (t(0, "%TAG directive should contain exactly two parts"), s.length < 2))
          return !1;
        const [r, o] = s;
        return this.tags[r] = o, !0;
      }
      case "%YAML": {
        if (this.yaml.explicit = !0, s.length !== 1)
          return t(0, "%YAML directive should contain exactly one part"), !1;
        const [r] = s;
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
    const [, s, i] = e.match(/^(.*!)([^!]*)$/s);
    i || t(`The ${e} tag has no suffix`);
    const r = this.tags[s];
    if (r)
      try {
        return r + decodeURIComponent(i);
      } catch (o) {
        return t(String(o)), null;
      }
    return s === "!" ? e : (t(`Could not resolve tag: ${e}`), null);
  }
  /**
   * Given a fully resolved tag, returns its printable string form,
   * taking into account current tag prefixes and defaults.
   */
  tagString(e) {
    for (const [t, s] of Object.entries(this.tags))
      if (e.startsWith(s))
        return t + Ss(e.substring(s.length));
    return e[0] === "!" ? e : `!<${e}>`;
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], s = Object.entries(this.tags);
    let i;
    if (e && s.length > 0 && B(e.contents)) {
      const r = {};
      be(e.contents, (o, a) => {
        B(a) && a.tag && (r[a.tag] = !0);
      }), i = Object.keys(r);
    } else
      i = [];
    for (const [r, o] of s)
      r === "!!" && o === "tag:yaml.org,2002:" || (!e || i.some((a) => a.startsWith(o))) && t.push(`%TAG ${r} ${o}`);
    return t.join(`
`);
  }
}
K.defaultYaml = { explicit: !1, version: "1.2" };
K.defaultTags = { "!!": "tag:yaml.org,2002:" };
function gn(n) {
  if (/[\x00-\x19\s,[\]{}]/.test(n)) {
    const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;
    throw new Error(t);
  }
  return !0;
}
function yn(n) {
  const e = /* @__PURE__ */ new Set();
  return be(n, {
    Value(t, s) {
      s.anchor && e.add(s.anchor);
    }
  }), e;
}
function wn(n, e) {
  for (let t = 1; ; ++t) {
    const s = `${n}${t}`;
    if (!e.has(s))
      return s;
  }
}
function $s(n, e) {
  const t = [], s = /* @__PURE__ */ new Map();
  let i = null;
  return {
    onAnchor: (r) => {
      t.push(r), i ?? (i = yn(n));
      const o = wn(e, i);
      return i.add(o), o;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const r of t) {
        const o = s.get(r);
        if (typeof o == "object" && o.anchor && (C(o.node) || P(o.node)))
          o.node.anchor = o.anchor;
        else {
          const a = new Error("Failed to resolve repeated object (this should not happen)");
          throw a.source = r, a;
        }
      }
    },
    sourceObjects: s
  };
}
function ue(n, e, t, s) {
  if (s && typeof s == "object")
    if (Array.isArray(s))
      for (let i = 0, r = s.length; i < r; ++i) {
        const o = s[i], a = ue(n, s, String(i), o);
        a === void 0 ? delete s[i] : a !== o && (s[i] = a);
      }
    else if (s instanceof Map)
      for (const i of Array.from(s.keys())) {
        const r = s.get(i), o = ue(n, s, i, r);
        o === void 0 ? s.delete(i) : o !== r && s.set(i, o);
      }
    else if (s instanceof Set)
      for (const i of Array.from(s)) {
        const r = ue(n, s, i, i);
        r === void 0 ? s.delete(i) : r !== i && (s.delete(i), s.add(r));
      }
    else
      for (const [i, r] of Object.entries(s)) {
        const o = ue(n, s, i, r);
        o === void 0 ? delete s[i] : o !== r && (s[i] = o);
      }
  return n.call(e, t, s);
}
function V(n, e, t) {
  if (Array.isArray(n))
    return n.map((s, i) => V(s, String(i), t));
  if (n && typeof n.toJSON == "function") {
    if (!t || !pn(n))
      return n.toJSON(e, t);
    const s = { aliasCount: 0, count: 1, res: void 0 };
    t.anchors.set(n, s), t.onCreate = (r) => {
      s.res = r, delete t.onCreate;
    };
    const i = n.toJSON(e, t);
    return t.onCreate && t.onCreate(i), i;
  }
  return typeof n == "bigint" && !t?.keep ? Number(n) : n;
}
class Lt {
  constructor(e) {
    Object.defineProperty(this, G, { value: e });
  }
  /** Create a copy of this node.  */
  clone() {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (e.range = this.range.slice()), e;
  }
  /** A plain JavaScript representation of this node. */
  toJS(e, { mapAsMap: t, maxAliasCount: s, onAnchor: i, reviver: r } = {}) {
    if (!Je(e))
      throw new TypeError("A document argument is required");
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: e,
      keep: !0,
      mapAsMap: t === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof s == "number" ? s : 100
    }, a = V(this, "", o);
    if (typeof i == "function")
      for (const { count: c, res: l } of o.anchors.values())
        i(l, c);
    return typeof r == "function" ? ue(r, { "": a }, "", a) : a;
  }
}
class Tt extends Lt {
  constructor(e) {
    super(Ot), this.source = e, Object.defineProperty(this, "tag", {
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
    let s;
    t?.aliasResolveCache ? s = t.aliasResolveCache : (s = [], be(e, {
      Node: (r, o) => {
        (we(o) || pn(o)) && s.push(o);
      }
    }), t && (t.aliasResolveCache = s));
    let i;
    for (const r of s) {
      if (r === this)
        break;
      r.anchor === this.source && (i = r);
    }
    if (i && t) {
      const { anchors: r, doc: o, maxAliasCount: a } = t;
      let c = r.get(i);
      if (c || (V(i, null, t), c = r.get(i)), c?.res === void 0) {
        const l = "This should not happen: Alias anchor was not resolved?";
        throw new ReferenceError(l);
      }
      if (a >= 0 && (c.count += 1, c.aliasCount === 0 && (c.aliasCount = Re(o, i, r)), c.count * c.aliasCount > a)) {
        const l = "Excessive alias count indicates a resource exhaustion attack";
        throw new ReferenceError(l);
      }
    }
    return i;
  }
  toJSON(e, t) {
    if (!t)
      return { source: this.source };
    const s = this.resolve(t.doc, t);
    if (!s) {
      const i = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(i);
    }
    return t.anchors.get(s).res;
  }
  toString(e, t, s) {
    const i = `*${this.source}`;
    if (e) {
      if (gn(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
        const r = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(r);
      }
      if (e.implicitKey)
        return `${i} `;
    }
    return i;
  }
}
function Re(n, e, t) {
  if (we(e)) {
    const s = e.resolve(n), i = t && s && t.get(s);
    return i ? i.count * i.aliasCount : 0;
  } else if (P(e)) {
    let s = 0;
    for (const i of e.items) {
      const r = Re(n, i, t);
      r > s && (s = r);
    }
    return s;
  } else if (j(e)) {
    const s = Re(n, e.key, t), i = Re(n, e.value, t);
    return Math.max(s, i);
  }
  return 1;
}
const bn = (n) => !n || typeof n != "function" && typeof n != "object";
class O extends Lt {
  constructor(e) {
    super(H), this.value = e;
  }
  toJSON(e, t) {
    return t?.keep ? this.value : V(this.value, e, t);
  }
  toString() {
    return String(this.value);
  }
}
O.BLOCK_FOLDED = "BLOCK_FOLDED";
O.BLOCK_LITERAL = "BLOCK_LITERAL";
O.PLAIN = "PLAIN";
O.QUOTE_DOUBLE = "QUOTE_DOUBLE";
O.QUOTE_SINGLE = "QUOTE_SINGLE";
const Es = "tag:yaml.org,2002:";
function xs(n, e, t) {
  if (e) {
    const s = t.filter((r) => r.tag === e), i = s.find((r) => !r.format) ?? s[0];
    if (!i)
      throw new Error(`Tag ${e} not found`);
    return i;
  }
  return t.find((s) => s.identify?.(n) && !s.format);
}
function Le(n, e, t) {
  if (Je(n) && (n = n.contents), B(n))
    return n;
  if (j(n)) {
    const u = t.schema[te].createNode?.(t.schema, null, t);
    return u.items.push(n), u;
  }
  (n instanceof String || n instanceof Number || n instanceof Boolean || typeof BigInt < "u" && n instanceof BigInt) && (n = n.valueOf());
  const { aliasDuplicateObjects: s, onAnchor: i, onTagObj: r, schema: o, sourceObjects: a } = t;
  let c;
  if (s && n && typeof n == "object") {
    if (c = a.get(n), c)
      return c.anchor ?? (c.anchor = i(n)), new Tt(c.anchor);
    c = { anchor: null, node: null }, a.set(n, c);
  }
  e?.startsWith("!!") && (e = Es + e.slice(2));
  let l = xs(n, e, o.tags);
  if (!l) {
    if (n && typeof n.toJSON == "function" && (n = n.toJSON()), !n || typeof n != "object") {
      const u = new O(n);
      return c && (c.node = u), u;
    }
    l = n instanceof Map ? o[te] : Symbol.iterator in Object(n) ? o[ye] : o[te];
  }
  r && (r(l), delete t.onTagObj);
  const h = l?.createNode ? l.createNode(t.schema, n, t) : typeof l?.nodeClass?.from == "function" ? l.nodeClass.from(t.schema, n, t) : new O(n);
  return e ? h.tag = e : l.default || (h.tag = l.tag), c && (c.node = h), h;
}
function ze(n, e, t) {
  let s = t;
  for (let i = e.length - 1; i >= 0; --i) {
    const r = e[i];
    if (typeof r == "number" && Number.isInteger(r) && r >= 0) {
      const o = [];
      o[r] = s, s = o;
    } else
      s = /* @__PURE__ */ new Map([[r, s]]);
  }
  return Le(s, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: n,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const Ee = (n) => n == null || typeof n == "object" && !!n[Symbol.iterator]().next().done;
class kn extends Lt {
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
    return e && (t.schema = e), t.items = t.items.map((s) => B(s) || j(s) ? s.clone(e) : s), this.range && (t.range = this.range.slice()), t;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(e, t) {
    if (Ee(e))
      this.add(t);
    else {
      const [s, ...i] = e, r = this.get(s, !0);
      if (P(r))
        r.addIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(s, ze(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`);
    }
  }
  /**
   * Removes a value from the collection.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    const [t, ...s] = e;
    if (s.length === 0)
      return this.delete(t);
    const i = this.get(t, !0);
    if (P(i))
      return i.deleteIn(s);
    throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`);
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    const [s, ...i] = e, r = this.get(s, !0);
    return i.length === 0 ? !t && C(r) ? r.value : r : P(r) ? r.getIn(i, t) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!j(t))
        return !1;
      const s = t.value;
      return s == null || e && C(s) && s.value == null && !s.commentBefore && !s.comment && !s.tag;
    });
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   */
  hasIn(e) {
    const [t, ...s] = e;
    if (s.length === 0)
      return this.has(t);
    const i = this.get(t, !0);
    return P(i) ? i.hasIn(s) : !1;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    const [s, ...i] = e;
    if (i.length === 0)
      this.set(s, t);
    else {
      const r = this.get(s, !0);
      if (P(r))
        r.setIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(s, ze(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`);
    }
  }
}
const Ns = (n) => n.replace(/^(?!$)(?: $)?/gm, "#");
function Q(n, e) {
  return /^\n+$/.test(n) ? n.substring(1) : e ? n.replace(/^(?! *$)/gm, e) : n;
}
const ie = (n, e, t) => n.endsWith(`
`) ? Q(t, e) : t.includes(`
`) ? `
` + Q(t, e) : (n.endsWith(" ") ? "" : " ") + t, vn = "flow", bt = "block", Ue = "quoted";
function Qe(n, e, t = "flow", { indentAtStart: s, lineWidth: i = 80, minContentWidth: r = 20, onFold: o, onOverflow: a } = {}) {
  if (!i || i < 0)
    return n;
  i < r && (r = 0);
  const c = Math.max(1 + r, 1 + i - e.length);
  if (n.length <= c)
    return n;
  const l = [], h = {};
  let u = i - e.length;
  typeof s == "number" && (s > i - Math.max(2, r) ? l.push(0) : u = i - s);
  let d, m, y = !1, f = -1, p = -1, S = -1;
  t === bt && (f = Gt(n, f, e.length), f !== -1 && (u = f + c));
  for (let k; k = n[f += 1]; ) {
    if (t === Ue && k === "\\") {
      switch (p = f, n[f + 1]) {
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
      S = f;
    }
    if (k === `
`)
      t === bt && (f = Gt(n, f, e.length)), u = f + e.length + c, d = void 0;
    else {
      if (k === " " && m && m !== " " && m !== `
` && m !== "	") {
        const g = n[f + 1];
        g && g !== " " && g !== `
` && g !== "	" && (d = f);
      }
      if (f >= u)
        if (d)
          l.push(d), u = d + c, d = void 0;
        else if (t === Ue) {
          for (; m === " " || m === "	"; )
            m = k, k = n[f += 1], y = !0;
          const g = f > S + 1 ? f - 2 : p - 1;
          if (h[g])
            return n;
          l.push(g), h[g] = !0, u = g + c, d = void 0;
        } else
          y = !0;
    }
    m = k;
  }
  if (y && a && a(), l.length === 0)
    return n;
  o && o();
  let $ = n.slice(0, l[0]);
  for (let k = 0; k < l.length; ++k) {
    const g = l[k], v = l[k + 1] || n.length;
    g === 0 ? $ = `
${e}${n.slice(0, v)}` : (t === Ue && h[g] && ($ += `${n[g]}\\`), $ += `
${e}${n.slice(g + 1, v)}`);
  }
  return $;
}
function Gt(n, e, t) {
  let s = e, i = e + 1, r = n[i];
  for (; r === " " || r === "	"; )
    if (e < i + t)
      r = n[++e];
    else {
      do
        r = n[++e];
      while (r && r !== `
`);
      s = e, i = e + 1, r = n[i];
    }
  return s;
}
const Xe = (n, e) => ({
  indentAtStart: e ? n.indent.length : n.indentAtStart,
  lineWidth: n.options.lineWidth,
  minContentWidth: n.options.minContentWidth
}), Ze = (n) => /^(%|---|\.\.\.)/m.test(n);
function As(n, e, t) {
  if (!e || e < 0)
    return !1;
  const s = e - t, i = n.length;
  if (i <= s)
    return !1;
  for (let r = 0, o = 0; r < i; ++r)
    if (n[r] === `
`) {
      if (r - o > s)
        return !0;
      if (o = r + 1, i - o <= s)
        return !1;
    }
  return !0;
}
function Ae(n, e) {
  const t = JSON.stringify(n);
  if (e.options.doubleQuotedAsJSON)
    return t;
  const { implicitKey: s } = e, i = e.options.doubleQuotedMinMultiLineLength, r = e.indent || (Ze(n) ? "  " : "");
  let o = "", a = 0;
  for (let c = 0, l = t[c]; l; l = t[++c])
    if (l === " " && t[c + 1] === "\\" && t[c + 2] === "n" && (o += t.slice(a, c) + "\\ ", c += 1, a = c, l = "\\"), l === "\\")
      switch (t[c + 1]) {
        case "u":
          {
            o += t.slice(a, c);
            const h = t.substr(c + 2, 4);
            switch (h) {
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
                h.substr(0, 2) === "00" ? o += "\\x" + h.substr(2) : o += t.substr(c, 6);
            }
            c += 5, a = c + 1;
          }
          break;
        case "n":
          if (s || t[c + 2] === '"' || t.length < i)
            c += 1;
          else {
            for (o += t.slice(a, c) + `

`; t[c + 2] === "\\" && t[c + 3] === "n" && t[c + 4] !== '"'; )
              o += `
`, c += 2;
            o += r, t[c + 2] === " " && (o += "\\"), c += 1, a = c + 1;
          }
          break;
        default:
          c += 1;
      }
  return o = a ? o + t.slice(a) : t, s ? o : Qe(o, r, Ue, Xe(e, !1));
}
function kt(n, e) {
  if (e.options.singleQuote === !1 || e.implicitKey && n.includes(`
`) || /[ \t]\n|\n[ \t]/.test(n))
    return Ae(n, e);
  const t = e.indent || (Ze(n) ? "  " : ""), s = "'" + n.replace(/'/g, "''").replace(/\n+/g, `$&
${t}`) + "'";
  return e.implicitKey ? s : Qe(s, t, vn, Xe(e, !1));
}
function he(n, e) {
  const { singleQuote: t } = e.options;
  let s;
  if (t === !1)
    s = Ae;
  else {
    const i = n.includes('"'), r = n.includes("'");
    i && !r ? s = kt : r && !i ? s = Ae : s = t ? kt : Ae;
  }
  return s(n, e);
}
let vt;
try {
  vt = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  vt = /\n+(?!\n|$)/g;
}
function Ve({ comment: n, type: e, value: t }, s, i, r) {
  const { blockQuote: o, commentString: a, lineWidth: c } = s.options;
  if (!o || /\n[\t ]+$/.test(t))
    return he(t, s);
  const l = s.indent || (s.forceBlockIndent || Ze(t) ? "  " : ""), h = o === "literal" ? !0 : o === "folded" || e === O.BLOCK_FOLDED ? !1 : e === O.BLOCK_LITERAL ? !0 : !As(t, c, l.length);
  if (!t)
    return h ? `|
` : `>
`;
  let u, d;
  for (d = t.length; d > 0; --d) {
    const v = t[d - 1];
    if (v !== `
` && v !== "	" && v !== " ")
      break;
  }
  let m = t.substring(d);
  const y = m.indexOf(`
`);
  y === -1 ? u = "-" : t === m || y !== m.length - 1 ? (u = "+", r && r()) : u = "", m && (t = t.slice(0, -m.length), m[m.length - 1] === `
` && (m = m.slice(0, -1)), m = m.replace(vt, `$&${l}`));
  let f = !1, p, S = -1;
  for (p = 0; p < t.length; ++p) {
    const v = t[p];
    if (v === " ")
      f = !0;
    else if (v === `
`)
      S = p;
    else
      break;
  }
  let $ = t.substring(0, S < p ? S + 1 : p);
  $ && (t = t.substring($.length), $ = $.replace(/\n+/g, `$&${l}`));
  let g = (f ? l ? "2" : "1" : "") + u;
  if (n && (g += " " + a(n.replace(/ ?[\r\n]+/g, " ")), i && i()), !h) {
    const v = t.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${l}`);
    let E = !1;
    const x = Xe(s, !0);
    o !== "folded" && e !== O.BLOCK_FOLDED && (x.onOverflow = () => {
      E = !0;
    });
    const w = Qe(`${$}${v}${m}`, l, bt, x);
    if (!E)
      return `>${g}
${l}${w}`;
  }
  return t = t.replace(/\n+/g, `$&${l}`), `|${g}
${l}${$}${t}${m}`;
}
function Os(n, e, t, s) {
  const { type: i, value: r } = n, { actualString: o, implicitKey: a, indent: c, indentStep: l, inFlow: h } = e;
  if (a && r.includes(`
`) || h && /[[\]{},]/.test(r))
    return he(r, e);
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
    return a || h || !r.includes(`
`) ? he(r, e) : Ve(n, e, t, s);
  if (!a && !h && i !== O.PLAIN && r.includes(`
`))
    return Ve(n, e, t, s);
  if (Ze(r)) {
    if (c === "")
      return e.forceBlockIndent = !0, Ve(n, e, t, s);
    if (a && c === l)
      return he(r, e);
  }
  const u = r.replace(/\n+/g, `$&
${c}`);
  if (o) {
    const d = (f) => f.default && f.tag !== "tag:yaml.org,2002:str" && f.test?.test(u), { compat: m, tags: y } = e.doc.schema;
    if (y.some(d) || m?.some(d))
      return he(r, e);
  }
  return a ? u : Qe(u, c, vn, Xe(e, !1));
}
function It(n, e, t, s) {
  const { implicitKey: i, inFlow: r } = e, o = typeof n.value == "string" ? n : Object.assign({}, n, { value: String(n.value) });
  let { type: a } = n;
  a !== O.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (a = O.QUOTE_DOUBLE);
  const c = (h) => {
    switch (h) {
      case O.BLOCK_FOLDED:
      case O.BLOCK_LITERAL:
        return i || r ? he(o.value, e) : Ve(o, e, t, s);
      case O.QUOTE_DOUBLE:
        return Ae(o.value, e);
      case O.QUOTE_SINGLE:
        return kt(o.value, e);
      case O.PLAIN:
        return Os(o, e, t, s);
      default:
        return null;
    }
  };
  let l = c(a);
  if (l === null) {
    const { defaultKeyType: h, defaultStringType: u } = e.options, d = i && h || u;
    if (l = c(d), l === null)
      throw new Error(`Unsupported default string type ${d}`);
  }
  return l;
}
function Sn(n, e) {
  const t = Object.assign({
    blockQuote: !0,
    commentString: Ns,
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
  }, n.schema.toStringOptions, e);
  let s;
  switch (t.collectionStyle) {
    case "block":
      s = !1;
      break;
    case "flow":
      s = !0;
      break;
    default:
      s = null;
  }
  return {
    anchors: /* @__PURE__ */ new Set(),
    doc: n,
    flowCollectionPadding: t.flowCollectionPadding ? " " : "",
    indent: "",
    indentStep: typeof t.indent == "number" ? " ".repeat(t.indent) : "  ",
    inFlow: s,
    options: t
  };
}
function Ls(n, e) {
  if (e.tag) {
    const i = n.filter((r) => r.tag === e.tag);
    if (i.length > 0)
      return i.find((r) => r.format === e.format) ?? i[0];
  }
  let t, s;
  if (C(e)) {
    s = e.value;
    let i = n.filter((r) => r.identify?.(s));
    if (i.length > 1) {
      const r = i.filter((o) => o.test);
      r.length > 0 && (i = r);
    }
    t = i.find((r) => r.format === e.format) ?? i.find((r) => !r.format);
  } else
    s = e, t = n.find((i) => i.nodeClass && s instanceof i.nodeClass);
  if (!t) {
    const i = s?.constructor?.name ?? (s === null ? "null" : typeof s);
    throw new Error(`Tag not resolved for ${i} value`);
  }
  return t;
}
function Ts(n, e, { anchors: t, doc: s }) {
  if (!s.directives)
    return "";
  const i = [], r = (C(n) || P(n)) && n.anchor;
  r && gn(r) && (t.add(r), i.push(`&${r}`));
  const o = n.tag ?? (e.default ? null : e.tag);
  return o && i.push(s.directives.tagString(o)), i.join(" ");
}
function pe(n, e, t, s) {
  if (j(n))
    return n.toString(e, t, s);
  if (we(n)) {
    if (e.doc.directives)
      return n.toString(e);
    if (e.resolvedAliases?.has(n))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    e.resolvedAliases ? e.resolvedAliases.add(n) : e.resolvedAliases = /* @__PURE__ */ new Set([n]), n = n.resolve(e.doc);
  }
  let i;
  const r = B(n) ? n : e.doc.createNode(n, { onTagObj: (c) => i = c });
  i ?? (i = Ls(e.doc.schema.tags, r));
  const o = Ts(r, i, e);
  o.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + o.length + 1);
  const a = typeof i.stringify == "function" ? i.stringify(r, e, t, s) : C(r) ? It(r, e, t, s) : r.toString(e, t, s);
  return o ? C(r) || a[0] === "{" || a[0] === "[" ? `${o} ${a}` : `${o}
${e.indent}${a}` : a;
}
function Is({ key: n, value: e }, t, s, i) {
  const { allNullValues: r, doc: o, indent: a, indentStep: c, options: { commentString: l, indentSeq: h, simpleKeys: u } } = t;
  let d = B(n) && n.comment || null;
  if (u) {
    if (d)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (P(n) || !B(n) && typeof n == "object") {
      const x = "With simple keys, collection cannot be used as a key value";
      throw new Error(x);
    }
  }
  let m = !u && (!n || d && e == null && !t.inFlow || P(n) || (C(n) ? n.type === O.BLOCK_FOLDED || n.type === O.BLOCK_LITERAL : typeof n == "object"));
  t = Object.assign({}, t, {
    allNullValues: !1,
    implicitKey: !m && (u || !r),
    indent: a + c
  });
  let y = !1, f = !1, p = pe(n, t, () => y = !0, () => f = !0);
  if (!m && !t.inFlow && p.length > 1024) {
    if (u)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    m = !0;
  }
  if (t.inFlow) {
    if (r || e == null)
      return y && s && s(), p === "" ? "?" : m ? `? ${p}` : p;
  } else if (r && !u || e == null && m)
    return p = `? ${p}`, d && !y ? p += ie(p, t.indent, l(d)) : f && i && i(), p;
  y && (d = null), m ? (d && (p += ie(p, t.indent, l(d))), p = `? ${p}
${a}:`) : (p = `${p}:`, d && (p += ie(p, t.indent, l(d))));
  let S, $, k;
  B(e) ? (S = !!e.spaceBefore, $ = e.commentBefore, k = e.comment) : (S = !1, $ = null, k = null, e && typeof e == "object" && (e = o.createNode(e))), t.implicitKey = !1, !m && !d && C(e) && (t.indentAtStart = p.length + 1), f = !1, !h && c.length >= 2 && !t.inFlow && !m && _e(e) && !e.flow && !e.tag && !e.anchor && (t.indent = t.indent.substring(2));
  let g = !1;
  const v = pe(e, t, () => g = !0, () => f = !0);
  let E = " ";
  if (d || S || $) {
    if (E = S ? `
` : "", $) {
      const x = l($);
      E += `
${Q(x, t.indent)}`;
    }
    v === "" && !t.inFlow ? E === `
` && k && (E = `

`) : E += `
${t.indent}`;
  } else if (!m && P(e)) {
    const x = v[0], w = v.indexOf(`
`), N = w !== -1, A = t.inFlow ?? e.flow ?? e.items.length === 0;
    if (N || !A) {
      let T = !1;
      if (N && (x === "&" || x === "!")) {
        let b = v.indexOf(" ");
        x === "&" && b !== -1 && b < w && v[b + 1] === "!" && (b = v.indexOf(" ", b + 1)), (b === -1 || w < b) && (T = !0);
      }
      T || (E = `
${t.indent}`);
    }
  } else (v === "" || v[0] === `
`) && (E = "");
  return p += E + v, t.inFlow ? g && s && s() : k && !g ? p += ie(p, t.indent, l(k)) : f && i && i(), p;
}
function Cs(n, e) {
  (n === "debug" || n === "warn") && console.warn(e);
}
const je = "<<", X = {
  identify: (n) => n === je || typeof n == "symbol" && n.description === je,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new O(Symbol(je)), {
    addToJSMap: $n
  }),
  stringify: () => je
}, Ms = (n, e) => (X.identify(e) || C(e) && (!e.type || e.type === O.PLAIN) && X.identify(e.value)) && n?.doc.schema.tags.some((t) => t.tag === X.tag && t.default);
function $n(n, e, t) {
  const s = En(n, t);
  if (_e(s))
    for (const i of s.items)
      ft(n, e, i);
  else if (Array.isArray(s))
    for (const i of s)
      ft(n, e, i);
  else
    ft(n, e, s);
}
function ft(n, e, t) {
  const s = En(n, t);
  if (!Me(s))
    throw new Error("Merge sources must be maps or map aliases");
  const i = s.toJSON(null, n, Map);
  for (const [r, o] of i)
    e instanceof Map ? e.has(r) || e.set(r, o) : e instanceof Set ? e.add(r) : Object.prototype.hasOwnProperty.call(e, r) || Object.defineProperty(e, r, {
      value: o,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  return e;
}
function En(n, e) {
  return n && we(e) ? e.resolve(n.doc, n) : e;
}
function xn(n, e, { key: t, value: s }) {
  if (B(t) && t.addToJSMap)
    t.addToJSMap(n, e, s);
  else if (Ms(n, t))
    $n(n, e, s);
  else {
    const i = V(t, "", n);
    if (e instanceof Map)
      e.set(i, V(s, i, n));
    else if (e instanceof Set)
      e.add(i);
    else {
      const r = _s(t, i, n), o = V(s, r, n);
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
function _s(n, e, t) {
  if (e === null)
    return "";
  if (typeof e != "object")
    return String(e);
  if (B(n) && t?.doc) {
    const s = Sn(t.doc, {});
    s.anchors = /* @__PURE__ */ new Set();
    for (const r of t.anchors.keys())
      s.anchors.add(r.anchor);
    s.inFlow = !0, s.inStringifyKey = !0;
    const i = n.toString(s);
    if (!t.mapKeyWarned) {
      let r = JSON.stringify(i);
      r.length > 40 && (r = r.substring(0, 36) + '..."'), Cs(t.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`), t.mapKeyWarned = !0;
    }
    return i;
  }
  return JSON.stringify(e);
}
function Ct(n, e, t) {
  const s = Le(n, void 0, t), i = Le(e, void 0, t);
  return new q(s, i);
}
class q {
  constructor(e, t = null) {
    Object.defineProperty(this, G, { value: mn }), this.key = e, this.value = t;
  }
  clone(e) {
    let { key: t, value: s } = this;
    return B(t) && (t = t.clone(e)), B(s) && (s = s.clone(e)), new q(t, s);
  }
  toJSON(e, t) {
    const s = t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return xn(t, s, this);
  }
  toString(e, t, s) {
    return e?.doc ? Is(this, e, t, s) : JSON.stringify(this);
  }
}
function Nn(n, e, t) {
  return (e.inFlow ?? n.flow ? Bs : Ps)(n, e, t);
}
function Ps({ comment: n, items: e }, t, { blockItemPrefix: s, flowChars: i, itemIndent: r, onChompKeep: o, onComment: a }) {
  const { indent: c, options: { commentString: l } } = t, h = Object.assign({}, t, { indent: r, type: null });
  let u = !1;
  const d = [];
  for (let y = 0; y < e.length; ++y) {
    const f = e[y];
    let p = null;
    if (B(f))
      !u && f.spaceBefore && d.push(""), Ye(t, d, f.commentBefore, u), f.comment && (p = f.comment);
    else if (j(f)) {
      const $ = B(f.key) ? f.key : null;
      $ && (!u && $.spaceBefore && d.push(""), Ye(t, d, $.commentBefore, u));
    }
    u = !1;
    let S = pe(f, h, () => p = null, () => u = !0);
    p && (S += ie(S, r, l(p))), u && p && (u = !1), d.push(s + S);
  }
  let m;
  if (d.length === 0)
    m = i.start + i.end;
  else {
    m = d[0];
    for (let y = 1; y < d.length; ++y) {
      const f = d[y];
      m += f ? `
${c}${f}` : `
`;
    }
  }
  return n ? (m += `
` + Q(l(n), c), a && a()) : u && o && o(), m;
}
function Bs({ items: n }, e, { flowChars: t, itemIndent: s }) {
  const { indent: i, indentStep: r, flowCollectionPadding: o, options: { commentString: a } } = e;
  s += r;
  const c = Object.assign({}, e, {
    indent: s,
    inFlow: !0,
    type: null
  });
  let l = !1, h = 0;
  const u = [];
  for (let y = 0; y < n.length; ++y) {
    const f = n[y];
    let p = null;
    if (B(f))
      f.spaceBefore && u.push(""), Ye(e, u, f.commentBefore, !1), f.comment && (p = f.comment);
    else if (j(f)) {
      const $ = B(f.key) ? f.key : null;
      $ && ($.spaceBefore && u.push(""), Ye(e, u, $.commentBefore, !1), $.comment && (l = !0));
      const k = B(f.value) ? f.value : null;
      k ? (k.comment && (p = k.comment), k.commentBefore && (l = !0)) : f.value == null && $?.comment && (p = $.comment);
    }
    p && (l = !0);
    let S = pe(f, c, () => p = null);
    l || (l = u.length > h || S.includes(`
`)), y < n.length - 1 ? S += "," : e.options.trailingComma && (e.options.lineWidth > 0 && (l || (l = u.reduce(($, k) => $ + k.length + 2, 2) + (S.length + 2) > e.options.lineWidth)), l && (S += ",")), p && (S += ie(S, s, a(p))), u.push(S), h = u.length;
  }
  const { start: d, end: m } = t;
  if (u.length === 0)
    return d + m;
  if (!l) {
    const y = u.reduce((f, p) => f + p.length + 2, 2);
    l = e.options.lineWidth > 0 && y > e.options.lineWidth;
  }
  if (l) {
    let y = d;
    for (const f of u)
      y += f ? `
${r}${i}${f}` : `
`;
    return `${y}
${i}${m}`;
  } else
    return `${d}${o}${u.join(" ")}${o}${m}`;
}
function Ye({ indent: n, options: { commentString: e } }, t, s, i) {
  if (s && i && (s = s.replace(/^\n+/, "")), s) {
    const r = Q(e(s), n);
    t.push(r.trimStart());
  }
}
function re(n, e) {
  const t = C(e) ? e.value : e;
  for (const s of n)
    if (j(s) && (s.key === e || s.key === t || C(s.key) && s.key.value === t))
      return s;
}
class U extends kn {
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
  static from(e, t, s) {
    const { keepUndefined: i, replacer: r } = s, o = new this(e), a = (c, l) => {
      if (typeof r == "function")
        l = r.call(t, c, l);
      else if (Array.isArray(r) && !r.includes(c))
        return;
      (l !== void 0 || i) && o.items.push(Ct(c, l, s));
    };
    if (t instanceof Map)
      for (const [c, l] of t)
        a(c, l);
    else if (t && typeof t == "object")
      for (const c of Object.keys(t))
        a(c, t[c]);
    return typeof e.sortMapEntries == "function" && o.items.sort(e.sortMapEntries), o;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(e, t) {
    let s;
    j(e) ? s = e : !e || typeof e != "object" || !("key" in e) ? s = new q(e, e?.value) : s = new q(e.key, e.value);
    const i = re(this.items, s.key), r = this.schema?.sortMapEntries;
    if (i) {
      if (!t)
        throw new Error(`Key ${s.key} already set`);
      C(i.value) && bn(s.value) ? i.value.value = s.value : i.value = s.value;
    } else if (r) {
      const o = this.items.findIndex((a) => r(s, a) < 0);
      o === -1 ? this.items.push(s) : this.items.splice(o, 0, s);
    } else
      this.items.push(s);
  }
  delete(e) {
    const t = re(this.items, e);
    return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
  }
  get(e, t) {
    const i = re(this.items, e)?.value;
    return (!t && C(i) ? i.value : i) ?? void 0;
  }
  has(e) {
    return !!re(this.items, e);
  }
  set(e, t) {
    this.add(new q(e, t), !0);
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(e, t, s) {
    const i = s ? new s() : t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    t?.onCreate && t.onCreate(i);
    for (const r of this.items)
      xn(t, i, r);
    return i;
  }
  toString(e, t, s) {
    if (!e)
      return JSON.stringify(this);
    for (const i of this.items)
      if (!j(i))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);
    return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), Nn(this, e, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: e.indent || "",
      onChompKeep: s,
      onComment: t
    });
  }
}
const ke = {
  collection: "map",
  default: !0,
  nodeClass: U,
  tag: "tag:yaml.org,2002:map",
  resolve(n, e) {
    return Me(n) || e("Expected a mapping for this tag"), n;
  },
  createNode: (n, e, t) => U.from(n, e, t)
};
class oe extends kn {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(e) {
    super(ye, e), this.items = [];
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
    const t = De(e);
    return typeof t != "number" ? !1 : this.items.splice(t, 1).length > 0;
  }
  get(e, t) {
    const s = De(e);
    if (typeof s != "number")
      return;
    const i = this.items[s];
    return !t && C(i) ? i.value : i;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(e) {
    const t = De(e);
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
    const s = De(e);
    if (typeof s != "number")
      throw new Error(`Expected a valid index, not ${e}.`);
    const i = this.items[s];
    C(i) && bn(t) ? i.value = t : this.items[s] = t;
  }
  toJSON(e, t) {
    const s = [];
    t?.onCreate && t.onCreate(s);
    let i = 0;
    for (const r of this.items)
      s.push(V(r, String(i++), t));
    return s;
  }
  toString(e, t, s) {
    return e ? Nn(this, e, {
      blockItemPrefix: "- ",
      flowChars: { start: "[", end: "]" },
      itemIndent: (e.indent || "") + "  ",
      onChompKeep: s,
      onComment: t
    }) : JSON.stringify(this);
  }
  static from(e, t, s) {
    const { replacer: i } = s, r = new this(e);
    if (t && Symbol.iterator in Object(t)) {
      let o = 0;
      for (let a of t) {
        if (typeof i == "function") {
          const c = t instanceof Set ? a : String(o++);
          a = i.call(t, c, a);
        }
        r.items.push(Le(a, void 0, s));
      }
    }
    return r;
  }
}
function De(n) {
  let e = C(n) ? n.value : n;
  return e && typeof e == "string" && (e = Number(e)), typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
const ve = {
  collection: "seq",
  default: !0,
  nodeClass: oe,
  tag: "tag:yaml.org,2002:seq",
  resolve(n, e) {
    return _e(n) || e("Expected a sequence for this tag"), n;
  },
  createNode: (n, e, t) => oe.from(n, e, t)
}, et = {
  identify: (n) => typeof n == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (n) => n,
  stringify(n, e, t, s) {
    return e = Object.assign({ actualString: !0 }, e), It(n, e, t, s);
  }
}, tt = {
  identify: (n) => n == null,
  createNode: () => new O(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new O(null),
  stringify: ({ source: n }, e) => typeof n == "string" && tt.test.test(n) ? n : e.options.nullStr
}, Mt = {
  identify: (n) => typeof n == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (n) => new O(n[0] === "t" || n[0] === "T"),
  stringify({ source: n, value: e }, t) {
    if (n && Mt.test.test(n)) {
      const s = n[0] === "t" || n[0] === "T";
      if (e === s)
        return n;
    }
    return e ? t.options.trueStr : t.options.falseStr;
  }
};
function Y({ format: n, minFractionDigits: e, tag: t, value: s }) {
  if (typeof s == "bigint")
    return String(s);
  const i = typeof s == "number" ? s : Number(s);
  if (!isFinite(i))
    return isNaN(i) ? ".nan" : i < 0 ? "-.inf" : ".inf";
  let r = Object.is(s, -0) ? "-0" : JSON.stringify(s);
  if (!n && e && (!t || t === "tag:yaml.org,2002:float") && /^-?\d/.test(r) && !r.includes("e")) {
    let o = r.indexOf(".");
    o < 0 && (o = r.length, r += ".");
    let a = e - (r.length - o - 1);
    for (; a-- > 0; )
      r += "0";
  }
  return r;
}
const An = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (n) => n.slice(-3).toLowerCase() === "nan" ? NaN : n[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: Y
}, On = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (n) => parseFloat(n),
  stringify(n) {
    const e = Number(n.value);
    return isFinite(e) ? e.toExponential() : Y(n);
  }
}, Ln = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(n) {
    const e = new O(parseFloat(n)), t = n.indexOf(".");
    return t !== -1 && n[n.length - 1] === "0" && (e.minFractionDigits = n.length - t - 1), e;
  },
  stringify: Y
}, nt = (n) => typeof n == "bigint" || Number.isInteger(n), _t = (n, e, t, { intAsBigInt: s }) => s ? BigInt(n) : parseInt(n.substring(e), t);
function Tn(n, e, t) {
  const { value: s } = n;
  return nt(s) && s >= 0 ? t + s.toString(e) : Y(n);
}
const In = {
  identify: (n) => nt(n) && n >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (n, e, t) => _t(n, 2, 8, t),
  stringify: (n) => Tn(n, 8, "0o")
}, Cn = {
  identify: nt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (n, e, t) => _t(n, 0, 10, t),
  stringify: Y
}, Mn = {
  identify: (n) => nt(n) && n >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (n, e, t) => _t(n, 2, 16, t),
  stringify: (n) => Tn(n, 16, "0x")
}, js = [
  ke,
  ve,
  et,
  tt,
  Mt,
  In,
  Cn,
  Mn,
  An,
  On,
  Ln
];
function zt(n) {
  return typeof n == "bigint" || Number.isInteger(n);
}
const Fe = ({ value: n }) => JSON.stringify(n), Ds = [
  {
    identify: (n) => typeof n == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (n) => n,
    stringify: Fe
  },
  {
    identify: (n) => n == null,
    createNode: () => new O(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: Fe
  },
  {
    identify: (n) => typeof n == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (n) => n === "true",
    stringify: Fe
  },
  {
    identify: zt,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (n, e, { intAsBigInt: t }) => t ? BigInt(n) : parseInt(n, 10),
    stringify: ({ value: n }) => zt(n) ? n.toString() : JSON.stringify(n)
  },
  {
    identify: (n) => typeof n == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (n) => parseFloat(n),
    stringify: Fe
  }
], Fs = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(n, e) {
    return e(`Unresolved plain scalar ${JSON.stringify(n)}`), n;
  }
}, Ks = [ke, ve].concat(Ds, Fs), Pt = {
  identify: (n) => n instanceof Uint8Array,
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
  resolve(n, e) {
    if (typeof atob == "function") {
      const t = atob(n.replace(/[\n\r]/g, "")), s = new Uint8Array(t.length);
      for (let i = 0; i < t.length; ++i)
        s[i] = t.charCodeAt(i);
      return s;
    } else
      return e("This environment does not support reading binary tags; either Buffer or atob is required"), n;
  },
  stringify({ comment: n, type: e, value: t }, s, i, r) {
    if (!t)
      return "";
    const o = t;
    let a;
    if (typeof btoa == "function") {
      let c = "";
      for (let l = 0; l < o.length; ++l)
        c += String.fromCharCode(o[l]);
      a = btoa(c);
    } else
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (e ?? (e = O.BLOCK_LITERAL), e !== O.QUOTE_DOUBLE) {
      const c = Math.max(s.options.lineWidth - s.indent.length, s.options.minContentWidth), l = Math.ceil(a.length / c), h = new Array(l);
      for (let u = 0, d = 0; u < l; ++u, d += c)
        h[u] = a.substr(d, c);
      a = h.join(e === O.BLOCK_LITERAL ? `
` : " ");
    }
    return It({ comment: n, type: e, value: a }, s, i, r);
  }
};
function _n(n, e) {
  if (_e(n))
    for (let t = 0; t < n.items.length; ++t) {
      let s = n.items[t];
      if (!j(s)) {
        if (Me(s)) {
          s.items.length > 1 && e("Each pair must have its own sequence indicator");
          const i = s.items[0] || new q(new O(null));
          if (s.commentBefore && (i.key.commentBefore = i.key.commentBefore ? `${s.commentBefore}
${i.key.commentBefore}` : s.commentBefore), s.comment) {
            const r = i.value ?? i.key;
            r.comment = r.comment ? `${s.comment}
${r.comment}` : s.comment;
          }
          s = i;
        }
        n.items[t] = j(s) ? s : new q(s);
      }
    }
  else
    e("Expected a sequence for this tag");
  return n;
}
function Pn(n, e, t) {
  const { replacer: s } = t, i = new oe(n);
  i.tag = "tag:yaml.org,2002:pairs";
  let r = 0;
  if (e && Symbol.iterator in Object(e))
    for (let o of e) {
      typeof s == "function" && (o = s.call(e, String(r++), o));
      let a, c;
      if (Array.isArray(o))
        if (o.length === 2)
          a = o[0], c = o[1];
        else
          throw new TypeError(`Expected [key, value] tuple: ${o}`);
      else if (o && o instanceof Object) {
        const l = Object.keys(o);
        if (l.length === 1)
          a = l[0], c = o[a];
        else
          throw new TypeError(`Expected tuple with one key, not ${l.length} keys`);
      } else
        a = o;
      i.items.push(Ct(a, c, t));
    }
  return i;
}
const Bt = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: _n,
  createNode: Pn
};
class de extends oe {
  constructor() {
    super(), this.add = U.prototype.add.bind(this), this.delete = U.prototype.delete.bind(this), this.get = U.prototype.get.bind(this), this.has = U.prototype.has.bind(this), this.set = U.prototype.set.bind(this), this.tag = de.tag;
  }
  /**
   * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
   * but TypeScript won't allow widening the signature of a child method.
   */
  toJSON(e, t) {
    if (!t)
      return super.toJSON(e);
    const s = /* @__PURE__ */ new Map();
    t?.onCreate && t.onCreate(s);
    for (const i of this.items) {
      let r, o;
      if (j(i) ? (r = V(i.key, "", t), o = V(i.value, r, t)) : r = V(i, "", t), s.has(r))
        throw new Error("Ordered maps must not include duplicate keys");
      s.set(r, o);
    }
    return s;
  }
  static from(e, t, s) {
    const i = Pn(e, t, s), r = new this();
    return r.items = i.items, r;
  }
}
de.tag = "tag:yaml.org,2002:omap";
const jt = {
  collection: "seq",
  identify: (n) => n instanceof Map,
  nodeClass: de,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(n, e) {
    const t = _n(n, e), s = [];
    for (const { key: i } of t.items)
      C(i) && (s.includes(i.value) ? e(`Ordered maps must not include duplicate keys: ${i.value}`) : s.push(i.value));
    return Object.assign(new de(), t);
  },
  createNode: (n, e, t) => de.from(n, e, t)
};
function Bn({ value: n, source: e }, t) {
  return e && (n ? jn : Dn).test.test(e) ? e : n ? t.options.trueStr : t.options.falseStr;
}
const jn = {
  identify: (n) => n === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new O(!0),
  stringify: Bn
}, Dn = {
  identify: (n) => n === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new O(!1),
  stringify: Bn
}, qs = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (n) => n.slice(-3).toLowerCase() === "nan" ? NaN : n[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: Y
}, Rs = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (n) => parseFloat(n.replace(/_/g, "")),
  stringify(n) {
    const e = Number(n.value);
    return isFinite(e) ? e.toExponential() : Y(n);
  }
}, Us = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(n) {
    const e = new O(parseFloat(n.replace(/_/g, ""))), t = n.indexOf(".");
    if (t !== -1) {
      const s = n.substring(t + 1).replace(/_/g, "");
      s[s.length - 1] === "0" && (e.minFractionDigits = s.length);
    }
    return e;
  },
  stringify: Y
}, Pe = (n) => typeof n == "bigint" || Number.isInteger(n);
function st(n, e, t, { intAsBigInt: s }) {
  const i = n[0];
  if ((i === "-" || i === "+") && (e += 1), n = n.substring(e).replace(/_/g, ""), s) {
    switch (t) {
      case 2:
        n = `0b${n}`;
        break;
      case 8:
        n = `0o${n}`;
        break;
      case 16:
        n = `0x${n}`;
        break;
    }
    const o = BigInt(n);
    return i === "-" ? BigInt(-1) * o : o;
  }
  const r = parseInt(n, t);
  return i === "-" ? -1 * r : r;
}
function Dt(n, e, t) {
  const { value: s } = n;
  if (Pe(s)) {
    const i = s.toString(e);
    return s < 0 ? "-" + t + i.substr(1) : t + i;
  }
  return Y(n);
}
const Vs = {
  identify: Pe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (n, e, t) => st(n, 2, 2, t),
  stringify: (n) => Dt(n, 2, "0b")
}, Gs = {
  identify: Pe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (n, e, t) => st(n, 1, 8, t),
  stringify: (n) => Dt(n, 8, "0")
}, zs = {
  identify: Pe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (n, e, t) => st(n, 0, 10, t),
  stringify: Y
}, Ys = {
  identify: Pe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (n, e, t) => st(n, 2, 16, t),
  stringify: (n) => Dt(n, 16, "0x")
};
class me extends U {
  constructor(e) {
    super(e), this.tag = me.tag;
  }
  add(e) {
    let t;
    j(e) ? t = e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? t = new q(e.key, null) : t = new q(e, null), re(this.items, t.key) || this.items.push(t);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(e, t) {
    const s = re(this.items, e);
    return !t && j(s) ? C(s.key) ? s.key.value : s.key : s;
  }
  set(e, t) {
    if (typeof t != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
    const s = re(this.items, e);
    s && !t ? this.items.splice(this.items.indexOf(s), 1) : !s && t && this.items.push(new q(e));
  }
  toJSON(e, t) {
    return super.toJSON(e, t, Set);
  }
  toString(e, t, s) {
    if (!e)
      return JSON.stringify(this);
    if (this.hasAllNullValues(!0))
      return super.toString(Object.assign({}, e, { allNullValues: !0 }), t, s);
    throw new Error("Set items must all have null values");
  }
  static from(e, t, s) {
    const { replacer: i } = s, r = new this(e);
    if (t && Symbol.iterator in Object(t))
      for (let o of t)
        typeof i == "function" && (o = i.call(t, o, o)), r.items.push(Ct(o, null, s));
    return r;
  }
}
me.tag = "tag:yaml.org,2002:set";
const Ft = {
  collection: "map",
  identify: (n) => n instanceof Set,
  nodeClass: me,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (n, e, t) => me.from(n, e, t),
  resolve(n, e) {
    if (Me(n)) {
      if (n.hasAllNullValues(!0))
        return Object.assign(new me(), n);
      e("Set items must all have null values");
    } else
      e("Expected a mapping for this tag");
    return n;
  }
};
function Kt(n, e) {
  const t = n[0], s = t === "-" || t === "+" ? n.substring(1) : n, i = (o) => e ? BigInt(o) : Number(o), r = s.replace(/_/g, "").split(":").reduce((o, a) => o * i(60) + i(a), i(0));
  return t === "-" ? i(-1) * r : r;
}
function Fn(n) {
  let { value: e } = n, t = (o) => o;
  if (typeof e == "bigint")
    t = (o) => BigInt(o);
  else if (isNaN(e) || !isFinite(e))
    return Y(n);
  let s = "";
  e < 0 && (s = "-", e *= t(-1));
  const i = t(60), r = [e % i];
  return e < 60 ? r.unshift(0) : (e = (e - r[0]) / i, r.unshift(e % i), e >= 60 && (e = (e - r[0]) / i, r.unshift(e))), s + r.map((o) => String(o).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const Kn = {
  identify: (n) => typeof n == "bigint" || Number.isInteger(n),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (n, e, { intAsBigInt: t }) => Kt(n, t),
  stringify: Fn
}, qn = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (n) => Kt(n, !1),
  stringify: Fn
}, it = {
  identify: (n) => n instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(n) {
    const e = n.match(it.test);
    if (!e)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, t, s, i, r, o, a] = e.map(Number), c = e[7] ? Number((e[7] + "00").substr(1, 3)) : 0;
    let l = Date.UTC(t, s - 1, i, r || 0, o || 0, a || 0, c);
    const h = e[8];
    if (h && h !== "Z") {
      let u = Kt(h, !1);
      Math.abs(u) < 30 && (u *= 60), l -= 6e4 * u;
    }
    return new Date(l);
  },
  stringify: ({ value: n }) => n?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, Yt = [
  ke,
  ve,
  et,
  tt,
  jn,
  Dn,
  Vs,
  Gs,
  zs,
  Ys,
  qs,
  Rs,
  Us,
  Pt,
  X,
  jt,
  Bt,
  Ft,
  Kn,
  qn,
  it
], Wt = /* @__PURE__ */ new Map([
  ["core", js],
  ["failsafe", [ke, ve, et]],
  ["json", Ks],
  ["yaml11", Yt],
  ["yaml-1.1", Yt]
]), Ht = {
  binary: Pt,
  bool: Mt,
  float: Ln,
  floatExp: On,
  floatNaN: An,
  floatTime: qn,
  int: Cn,
  intHex: Mn,
  intOct: In,
  intTime: Kn,
  map: ke,
  merge: X,
  null: tt,
  omap: jt,
  pairs: Bt,
  seq: ve,
  set: Ft,
  timestamp: it
}, Ws = {
  "tag:yaml.org,2002:binary": Pt,
  "tag:yaml.org,2002:merge": X,
  "tag:yaml.org,2002:omap": jt,
  "tag:yaml.org,2002:pairs": Bt,
  "tag:yaml.org,2002:set": Ft,
  "tag:yaml.org,2002:timestamp": it
};
function ut(n, e, t) {
  const s = Wt.get(e);
  if (s && !n)
    return t && !s.includes(X) ? s.concat(X) : s.slice();
  let i = s;
  if (!i)
    if (Array.isArray(n))
      i = [];
    else {
      const r = Array.from(Wt.keys()).filter((o) => o !== "yaml11").map((o) => JSON.stringify(o)).join(", ");
      throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`);
    }
  if (Array.isArray(n))
    for (const r of n)
      i = i.concat(r);
  else typeof n == "function" && (i = n(i.slice()));
  return t && (i = i.concat(X)), i.reduce((r, o) => {
    const a = typeof o == "string" ? Ht[o] : o;
    if (!a) {
      const c = JSON.stringify(o), l = Object.keys(Ht).map((h) => JSON.stringify(h)).join(", ");
      throw new Error(`Unknown custom tag ${c}; use one of ${l}`);
    }
    return r.includes(a) || r.push(a), r;
  }, []);
}
const Hs = (n, e) => n.key < e.key ? -1 : n.key > e.key ? 1 : 0;
class qt {
  constructor({ compat: e, customTags: t, merge: s, resolveKnownTags: i, schema: r, sortMapEntries: o, toStringDefaults: a }) {
    this.compat = Array.isArray(e) ? ut(e, "compat") : e ? ut(null, e) : null, this.name = typeof r == "string" && r || "core", this.knownTags = i ? Ws : {}, this.tags = ut(t, this.name, s), this.toStringOptions = a ?? null, Object.defineProperty(this, te, { value: ke }), Object.defineProperty(this, H, { value: et }), Object.defineProperty(this, ye, { value: ve }), this.sortMapEntries = typeof o == "function" ? o : o === !0 ? Hs : null;
  }
  clone() {
    const e = Object.create(qt.prototype, Object.getOwnPropertyDescriptors(this));
    return e.tags = this.tags.slice(), e;
  }
}
function Js(n, e) {
  const t = [];
  let s = e.directives === !0;
  if (e.directives !== !1 && n.directives) {
    const c = n.directives.toString(n);
    c ? (t.push(c), s = !0) : n.directives.docStart && (s = !0);
  }
  s && t.push("---");
  const i = Sn(n, e), { commentString: r } = i.options;
  if (n.commentBefore) {
    t.length !== 1 && t.unshift("");
    const c = r(n.commentBefore);
    t.unshift(Q(c, ""));
  }
  let o = !1, a = null;
  if (n.contents) {
    if (B(n.contents)) {
      if (n.contents.spaceBefore && s && t.push(""), n.contents.commentBefore) {
        const h = r(n.contents.commentBefore);
        t.push(Q(h, ""));
      }
      i.forceBlockIndent = !!n.comment, a = n.contents.comment;
    }
    const c = a ? void 0 : () => o = !0;
    let l = pe(n.contents, i, () => a = null, c);
    a && (l += ie(l, "", r(a))), (l[0] === "|" || l[0] === ">") && t[t.length - 1] === "---" ? t[t.length - 1] = `--- ${l}` : t.push(l);
  } else
    t.push(pe(n.contents, i));
  if (n.directives?.docEnd)
    if (n.comment) {
      const c = r(n.comment);
      c.includes(`
`) ? (t.push("..."), t.push(Q(c, ""))) : t.push(`... ${c}`);
    } else
      t.push("...");
  else {
    let c = n.comment;
    c && o && (c = c.replace(/^\n+/, "")), c && ((!o || a) && t[t.length - 1] !== "" && t.push(""), t.push(Q(r(c), "")));
  }
  return t.join(`
`) + `
`;
}
class rt {
  constructor(e, t, s) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, G, { value: wt });
    let i = null;
    typeof t == "function" || Array.isArray(t) ? i = t : s === void 0 && t && (s = t, t = void 0);
    const r = Object.assign({
      intAsBigInt: !1,
      keepSourceTokens: !1,
      logLevel: "warn",
      prettyErrors: !0,
      strict: !0,
      stringKeys: !1,
      uniqueKeys: !0,
      version: "1.2"
    }, s);
    this.options = r;
    let { version: o } = r;
    s?._directives ? (this.directives = s._directives.atDocument(), this.directives.yaml.explicit && (o = this.directives.yaml.version)) : this.directives = new K({ version: o }), this.setSchema(o, s), this.contents = e === void 0 ? null : this.createNode(e, i, s);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const e = Object.create(rt.prototype, {
      [G]: { value: wt }
    });
    return e.commentBefore = this.commentBefore, e.comment = this.comment, e.errors = this.errors.slice(), e.warnings = this.warnings.slice(), e.options = Object.assign({}, this.options), this.directives && (e.directives = this.directives.clone()), e.schema = this.schema.clone(), e.contents = B(this.contents) ? this.contents.clone(e.schema) : this.contents, this.range && (e.range = this.range.slice()), e;
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
      const s = yn(this);
      e.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !t || s.has(t) ? wn(t || "a", s) : t;
    }
    return new Tt(e.anchor);
  }
  createNode(e, t, s) {
    let i;
    if (typeof t == "function")
      e = t.call({ "": e }, "", e), i = t;
    else if (Array.isArray(t)) {
      const p = ($) => typeof $ == "number" || $ instanceof String || $ instanceof Number, S = t.filter(p).map(String);
      S.length > 0 && (t = t.concat(S)), i = t;
    } else s === void 0 && t && (s = t, t = void 0);
    const { aliasDuplicateObjects: r, anchorPrefix: o, flow: a, keepUndefined: c, onTagObj: l, tag: h } = s ?? {}, { onAnchor: u, setAnchors: d, sourceObjects: m } = $s(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      o || "a"
    ), y = {
      aliasDuplicateObjects: r ?? !0,
      keepUndefined: c ?? !1,
      onAnchor: u,
      onTagObj: l,
      replacer: i,
      schema: this.schema,
      sourceObjects: m
    }, f = Le(e, h, y);
    return a && P(f) && (f.flow = !0), d(), f;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(e, t, s = {}) {
    const i = this.createNode(e, null, s), r = this.createNode(t, null, s);
    return new q(i, r);
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
    return Ee(e) ? this.contents == null ? !1 : (this.contents = null, !0) : ae(this.contents) ? this.contents.deleteIn(e) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(e, t) {
    return P(this.contents) ? this.contents.get(e, t) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    return Ee(e) ? !t && C(this.contents) ? this.contents.value : this.contents : P(this.contents) ? this.contents.getIn(e, t) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(e) {
    return P(this.contents) ? this.contents.has(e) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(e) {
    return Ee(e) ? this.contents !== void 0 : P(this.contents) ? this.contents.hasIn(e) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(e, t) {
    this.contents == null ? this.contents = ze(this.schema, [e], t) : ae(this.contents) && this.contents.set(e, t);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    Ee(e) ? this.contents = t : this.contents == null ? this.contents = ze(this.schema, Array.from(e), t) : ae(this.contents) && this.contents.setIn(e, t);
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
    let s;
    switch (e) {
      case "1.1":
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new K({ version: "1.1" }), s = { resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = e : this.directives = new K({ version: e }), s = { resolveKnownTags: !0, schema: "core" };
        break;
      case null:
        this.directives && delete this.directives, s = null;
        break;
      default: {
        const i = JSON.stringify(e);
        throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`);
      }
    }
    if (t.schema instanceof Object)
      this.schema = t.schema;
    else if (s)
      this.schema = new qt(Object.assign(s, t));
    else
      throw new Error("With a null YAML version, the { schema: Schema } option is required");
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json: e, jsonArg: t, mapAsMap: s, maxAliasCount: i, onAnchor: r, reviver: o } = {}) {
    const a = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !e,
      mapAsMap: s === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof i == "number" ? i : 100
    }, c = V(this.contents, t ?? "", a);
    if (typeof r == "function")
      for (const { count: l, res: h } of a.anchors.values())
        r(h, l);
    return typeof o == "function" ? ue(o, { "": c }, "", c) : c;
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
    return Js(this, e);
  }
}
function ae(n) {
  if (P(n))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class Rn extends Error {
  constructor(e, t, s, i) {
    super(), this.name = e, this.code = s, this.message = i, this.pos = t;
  }
}
class xe extends Rn {
  constructor(e, t, s) {
    super("YAMLParseError", e, t, s);
  }
}
class Qs extends Rn {
  constructor(e, t, s) {
    super("YAMLWarning", e, t, s);
  }
}
const Jt = (n, e) => (t) => {
  if (t.pos[0] === -1)
    return;
  t.linePos = t.pos.map((a) => e.linePos(a));
  const { line: s, col: i } = t.linePos[0];
  t.message += ` at line ${s}, column ${i}`;
  let r = i - 1, o = n.substring(e.lineStarts[s - 1], e.lineStarts[s]).replace(/[\n\r]+$/, "");
  if (r >= 60 && o.length > 80) {
    const a = Math.min(r - 39, o.length - 79);
    o = "…" + o.substring(a), r -= a - 1;
  }
  if (o.length > 80 && (o = o.substring(0, 79) + "…"), s > 1 && /^ *$/.test(o.substring(0, r))) {
    let a = n.substring(e.lineStarts[s - 2], e.lineStarts[s - 1]);
    a.length > 80 && (a = a.substring(0, 79) + `…
`), o = a + o;
  }
  if (/[^ ]/.test(o)) {
    let a = 1;
    const c = t.linePos[1];
    c?.line === s && c.col > i && (a = Math.max(1, Math.min(c.col - i, 80 - r)));
    const l = " ".repeat(r) + "^".repeat(a);
    t.message += `:

${o}
${l}
`;
  }
};
function ge(n, { flow: e, indicator: t, next: s, offset: i, onError: r, parentIndent: o, startOnNewline: a }) {
  let c = !1, l = a, h = a, u = "", d = "", m = !1, y = !1, f = null, p = null, S = null, $ = null, k = null, g = null, v = null;
  for (const w of n)
    switch (y && (w.type !== "space" && w.type !== "newline" && w.type !== "comma" && r(w.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), y = !1), f && (l && w.type !== "comment" && w.type !== "newline" && r(f, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), f = null), w.type) {
      case "space":
        !e && (t !== "doc-start" || s?.type !== "flow-collection") && w.source.includes("	") && (f = w), h = !0;
        break;
      case "comment": {
        h || r(w, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const N = w.source.substring(1) || " ";
        u ? u += d + N : u = N, d = "", l = !1;
        break;
      }
      case "newline":
        l ? u ? u += w.source : (!g || t !== "seq-item-ind") && (c = !0) : d += w.source, l = !0, m = !0, (p || S) && ($ = w), h = !0;
        break;
      case "anchor":
        p && r(w, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), w.source.endsWith(":") && r(w.offset + w.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), p = w, v ?? (v = w.offset), l = !1, h = !1, y = !0;
        break;
      case "tag": {
        S && r(w, "MULTIPLE_TAGS", "A node can have at most one tag"), S = w, v ?? (v = w.offset), l = !1, h = !1, y = !0;
        break;
      }
      case t:
        (p || S) && r(w, "BAD_PROP_ORDER", `Anchors and tags must be after the ${w.source} indicator`), g && r(w, "UNEXPECTED_TOKEN", `Unexpected ${w.source} in ${e ?? "collection"}`), g = w, l = t === "seq-item-ind" || t === "explicit-key-ind", h = !1;
        break;
      case "comma":
        if (e) {
          k && r(w, "UNEXPECTED_TOKEN", `Unexpected , in ${e}`), k = w, l = !1, h = !1;
          break;
        }
      // else fallthrough
      default:
        r(w, "UNEXPECTED_TOKEN", `Unexpected ${w.type} token`), l = !1, h = !1;
    }
  const E = n[n.length - 1], x = E ? E.offset + E.source.length : i;
  return y && s && s.type !== "space" && s.type !== "newline" && s.type !== "comma" && (s.type !== "scalar" || s.source !== "") && r(s.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), f && (l && f.indent <= o || s?.type === "block-map" || s?.type === "block-seq") && r(f, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: k,
    found: g,
    spaceBefore: c,
    comment: u,
    hasNewline: m,
    anchor: p,
    tag: S,
    newlineAfterProp: $,
    end: x,
    start: v ?? x
  };
}
function Te(n) {
  if (!n)
    return null;
  switch (n.type) {
    case "alias":
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      if (n.source.includes(`
`))
        return !0;
      if (n.end) {
        for (const e of n.end)
          if (e.type === "newline")
            return !0;
      }
      return !1;
    case "flow-collection":
      for (const e of n.items) {
        for (const t of e.start)
          if (t.type === "newline")
            return !0;
        if (e.sep) {
          for (const t of e.sep)
            if (t.type === "newline")
              return !0;
        }
        if (Te(e.key) || Te(e.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function St(n, e, t) {
  if (e?.type === "flow-collection") {
    const s = e.end[0];
    s.indent === n && (s.source === "]" || s.source === "}") && Te(e) && t(s, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function Un(n, e, t) {
  const { uniqueKeys: s } = n.options;
  if (s === !1)
    return !1;
  const i = typeof s == "function" ? s : (r, o) => r === o || C(r) && C(o) && r.value === o.value;
  return e.some((r) => i(r.key, t));
}
const Qt = "All mapping items must start at the same column";
function Xs({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  const o = r?.nodeClass ?? U, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1);
  let c = s.offset, l = null;
  for (const h of s.items) {
    const { start: u, key: d, sep: m, value: y } = h, f = ge(u, {
      indicator: "explicit-key-ind",
      next: d ?? m?.[0],
      offset: c,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !0
    }), p = !f.found;
    if (p) {
      if (d && (d.type === "block-seq" ? i(c, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in d && d.indent !== s.indent && i(c, "BAD_INDENT", Qt)), !f.anchor && !f.tag && !m) {
        l = f.end, f.comment && (a.comment ? a.comment += `
` + f.comment : a.comment = f.comment);
        continue;
      }
      (f.newlineAfterProp || Te(d)) && i(d ?? u[u.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else f.found?.indent !== s.indent && i(c, "BAD_INDENT", Qt);
    t.atKey = !0;
    const S = f.end, $ = d ? n(t, d, f, i) : e(t, S, u, null, f, i);
    t.schema.compat && St(s.indent, d, i), t.atKey = !1, Un(t, a.items, $) && i(S, "DUPLICATE_KEY", "Map keys must be unique");
    const k = ge(m ?? [], {
      indicator: "map-value-ind",
      next: y,
      offset: $.range[2],
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !d || d.type === "block-scalar"
    });
    if (c = k.end, k.found) {
      p && (y?.type === "block-map" && !k.hasNewline && i(c, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), t.options.strict && f.start < k.found.offset - 1024 && i($.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const g = y ? n(t, y, k, i) : e(t, c, m, null, k, i);
      t.schema.compat && St(s.indent, y, i), c = g.range[2];
      const v = new q($, g);
      t.options.keepSourceTokens && (v.srcToken = h), a.items.push(v);
    } else {
      p && i($.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), k.comment && ($.comment ? $.comment += `
` + k.comment : $.comment = k.comment);
      const g = new q($);
      t.options.keepSourceTokens && (g.srcToken = h), a.items.push(g);
    }
  }
  return l && l < c && i(l, "IMPOSSIBLE", "Map comment with trailing content"), a.range = [s.offset, c, l ?? c], a;
}
function Zs({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  const o = r?.nodeClass ?? oe, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let c = s.offset, l = null;
  for (const { start: h, value: u } of s.items) {
    const d = ge(h, {
      indicator: "seq-item-ind",
      next: u,
      offset: c,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !0
    });
    if (!d.found)
      if (d.anchor || d.tag || u)
        u?.type === "block-seq" ? i(d.end, "BAD_INDENT", "All sequence items must start at the same column") : i(c, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        l = d.end, d.comment && (a.comment = d.comment);
        continue;
      }
    const m = u ? n(t, u, d, i) : e(t, d.end, h, null, d, i);
    t.schema.compat && St(s.indent, u, i), c = m.range[2], a.items.push(m);
  }
  return a.range = [s.offset, c, l ?? c], a;
}
function Be(n, e, t, s) {
  let i = "";
  if (n) {
    let r = !1, o = "";
    for (const a of n) {
      const { source: c, type: l } = a;
      switch (l) {
        case "space":
          r = !0;
          break;
        case "comment": {
          t && !r && s(a, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const h = c.substring(1) || " ";
          i ? i += o + h : i = h, o = "";
          break;
        }
        case "newline":
          i && (o += c), r = !0;
          break;
        default:
          s(a, "UNEXPECTED_TOKEN", `Unexpected ${l} at node end`);
      }
      e += c.length;
    }
  }
  return { comment: i, offset: e };
}
const ht = "Block collections are not allowed within flow collections", dt = (n) => n && (n.type === "block-map" || n.type === "block-seq");
function ei({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  const o = s.start.source === "{", a = o ? "flow map" : "flow sequence", c = r?.nodeClass ?? (o ? U : oe), l = new c(t.schema);
  l.flow = !0;
  const h = t.atRoot;
  h && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let u = s.offset + s.start.source.length;
  for (let p = 0; p < s.items.length; ++p) {
    const S = s.items[p], { start: $, key: k, sep: g, value: v } = S, E = ge($, {
      flow: a,
      indicator: "explicit-key-ind",
      next: k ?? g?.[0],
      offset: u,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !1
    });
    if (!E.found) {
      if (!E.anchor && !E.tag && !g && !v) {
        p === 0 && E.comma ? i(E.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`) : p < s.items.length - 1 && i(E.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${a}`), E.comment && (l.comment ? l.comment += `
` + E.comment : l.comment = E.comment), u = E.end;
        continue;
      }
      !o && t.options.strict && Te(k) && i(
        k,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (p === 0)
      E.comma && i(E.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`);
    else if (E.comma || i(E.start, "MISSING_CHAR", `Missing , between ${a} items`), E.comment) {
      let x = "";
      e: for (const w of $)
        switch (w.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            x = w.source.substring(1);
            break e;
          default:
            break e;
        }
      if (x) {
        let w = l.items[l.items.length - 1];
        j(w) && (w = w.value ?? w.key), w.comment ? w.comment += `
` + x : w.comment = x, E.comment = E.comment.substring(x.length + 1);
      }
    }
    if (!o && !g && !E.found) {
      const x = v ? n(t, v, E, i) : e(t, E.end, g, null, E, i);
      l.items.push(x), u = x.range[2], dt(v) && i(x.range, "BLOCK_IN_FLOW", ht);
    } else {
      t.atKey = !0;
      const x = E.end, w = k ? n(t, k, E, i) : e(t, x, $, null, E, i);
      dt(k) && i(w.range, "BLOCK_IN_FLOW", ht), t.atKey = !1;
      const N = ge(g ?? [], {
        flow: a,
        indicator: "map-value-ind",
        next: v,
        offset: w.range[2],
        onError: i,
        parentIndent: s.indent,
        startOnNewline: !1
      });
      if (N.found) {
        if (!o && !E.found && t.options.strict) {
          if (g)
            for (const b of g) {
              if (b === N.found)
                break;
              if (b.type === "newline") {
                i(b, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          E.start < N.found.offset - 1024 && i(N.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else v && ("source" in v && v.source?.[0] === ":" ? i(v, "MISSING_CHAR", `Missing space after : in ${a}`) : i(N.start, "MISSING_CHAR", `Missing , or : between ${a} items`));
      const A = v ? n(t, v, N, i) : N.found ? e(t, N.end, g, null, N, i) : null;
      A ? dt(v) && i(A.range, "BLOCK_IN_FLOW", ht) : N.comment && (w.comment ? w.comment += `
` + N.comment : w.comment = N.comment);
      const T = new q(w, A);
      if (t.options.keepSourceTokens && (T.srcToken = S), o) {
        const b = l;
        Un(t, b.items, w) && i(x, "DUPLICATE_KEY", "Map keys must be unique"), b.items.push(T);
      } else {
        const b = new U(t.schema);
        b.flow = !0, b.items.push(T);
        const L = (A ?? w).range;
        b.range = [w.range[0], L[1], L[2]], l.items.push(b);
      }
      u = A ? A.range[2] : N.end;
    }
  }
  const d = o ? "}" : "]", [m, ...y] = s.end;
  let f = u;
  if (m?.source === d)
    f = m.offset + m.source.length;
  else {
    const p = a[0].toUpperCase() + a.substring(1), S = h ? `${p} must end with a ${d}` : `${p} in block collection must be sufficiently indented and end with a ${d}`;
    i(u, h ? "MISSING_CHAR" : "BAD_INDENT", S), m && m.source.length !== 1 && y.unshift(m);
  }
  if (y.length > 0) {
    const p = Be(y, f, t.options.strict, i);
    p.comment && (l.comment ? l.comment += `
` + p.comment : l.comment = p.comment), l.range = [s.offset, f, p.offset];
  } else
    l.range = [s.offset, f, f];
  return l;
}
function mt(n, e, t, s, i, r) {
  const o = t.type === "block-map" ? Xs(n, e, t, s, r) : t.type === "block-seq" ? Zs(n, e, t, s, r) : ei(n, e, t, s, r), a = o.constructor;
  return i === "!" || i === a.tagName ? (o.tag = a.tagName, o) : (i && (o.tag = i), o);
}
function ti(n, e, t, s, i) {
  const r = s.tag, o = r ? e.directives.tagName(r.source, (d) => i(r, "TAG_RESOLVE_FAILED", d)) : null;
  if (t.type === "block-seq") {
    const { anchor: d, newlineAfterProp: m } = s, y = d && r ? d.offset > r.offset ? d : r : d ?? r;
    y && (!m || m.offset < y.offset) && i(y, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const a = t.type === "block-map" ? "map" : t.type === "block-seq" ? "seq" : t.start.source === "{" ? "map" : "seq";
  if (!r || !o || o === "!" || o === U.tagName && a === "map" || o === oe.tagName && a === "seq")
    return mt(n, e, t, i, o);
  let c = e.schema.tags.find((d) => d.tag === o && d.collection === a);
  if (!c) {
    const d = e.schema.knownTags[o];
    if (d?.collection === a)
      e.schema.tags.push(Object.assign({}, d, { default: !1 })), c = d;
    else
      return d ? i(r, "BAD_COLLECTION_TYPE", `${d.tag} used for ${a} collection, but expects ${d.collection ?? "scalar"}`, !0) : i(r, "TAG_RESOLVE_FAILED", `Unresolved tag: ${o}`, !0), mt(n, e, t, i, o);
  }
  const l = mt(n, e, t, i, o, c), h = c.resolve?.(l, (d) => i(r, "TAG_RESOLVE_FAILED", d), e.options) ?? l, u = B(h) ? h : new O(h);
  return u.range = l.range, u.tag = o, c?.format && (u.format = c.format), u;
}
function ni(n, e, t) {
  const s = e.offset, i = si(e, n.options.strict, t);
  if (!i)
    return { value: "", type: null, comment: "", range: [s, s, s] };
  const r = i.mode === ">" ? O.BLOCK_FOLDED : O.BLOCK_LITERAL, o = e.source ? ii(e.source) : [];
  let a = o.length;
  for (let f = o.length - 1; f >= 0; --f) {
    const p = o[f][1];
    if (p === "" || p === "\r")
      a = f;
    else
      break;
  }
  if (a === 0) {
    const f = i.chomp === "+" && o.length > 0 ? `
`.repeat(Math.max(1, o.length - 1)) : "";
    let p = s + i.length;
    return e.source && (p += e.source.length), { value: f, type: r, comment: i.comment, range: [s, p, p] };
  }
  let c = e.indent + i.indent, l = e.offset + i.length, h = 0;
  for (let f = 0; f < a; ++f) {
    const [p, S] = o[f];
    if (S === "" || S === "\r")
      i.indent === 0 && p.length > c && (c = p.length);
    else {
      p.length < c && t(l + p.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), i.indent === 0 && (c = p.length), h = f, c === 0 && !n.atRoot && t(l, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    l += p.length + S.length + 1;
  }
  for (let f = o.length - 1; f >= a; --f)
    o[f][0].length > c && (a = f + 1);
  let u = "", d = "", m = !1;
  for (let f = 0; f < h; ++f)
    u += o[f][0].slice(c) + `
`;
  for (let f = h; f < a; ++f) {
    let [p, S] = o[f];
    l += p.length + S.length + 1;
    const $ = S[S.length - 1] === "\r";
    if ($ && (S = S.slice(0, -1)), S && p.length < c) {
      const g = `Block scalar lines must not be less indented than their ${i.indent ? "explicit indentation indicator" : "first line"}`;
      t(l - S.length - ($ ? 2 : 1), "BAD_INDENT", g), p = "";
    }
    r === O.BLOCK_LITERAL ? (u += d + p.slice(c) + S, d = `
`) : p.length > c || S[0] === "	" ? (d === " " ? d = `
` : !m && d === `
` && (d = `

`), u += d + p.slice(c) + S, d = `
`, m = !0) : S === "" ? d === `
` ? u += `
` : d = `
` : (u += d + S, d = " ", m = !1);
  }
  switch (i.chomp) {
    case "-":
      break;
    case "+":
      for (let f = a; f < o.length; ++f)
        u += `
` + o[f][0].slice(c);
      u[u.length - 1] !== `
` && (u += `
`);
      break;
    default:
      u += `
`;
  }
  const y = s + i.length + e.source.length;
  return { value: u, type: r, comment: i.comment, range: [s, y, y] };
}
function si({ offset: n, props: e }, t, s) {
  if (e[0].type !== "block-scalar-header")
    return s(e[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: i } = e[0], r = i[0];
  let o = 0, a = "", c = -1;
  for (let d = 1; d < i.length; ++d) {
    const m = i[d];
    if (!a && (m === "-" || m === "+"))
      a = m;
    else {
      const y = Number(m);
      !o && y ? o = y : c === -1 && (c = n + d);
    }
  }
  c !== -1 && s(c, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${i}`);
  let l = !1, h = "", u = i.length;
  for (let d = 1; d < e.length; ++d) {
    const m = e[d];
    switch (m.type) {
      case "space":
        l = !0;
      // fallthrough
      case "newline":
        u += m.source.length;
        break;
      case "comment":
        t && !l && s(m, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), u += m.source.length, h = m.source.substring(1);
        break;
      case "error":
        s(m, "UNEXPECTED_TOKEN", m.message), u += m.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const y = `Unexpected token in block scalar header: ${m.type}`;
        s(m, "UNEXPECTED_TOKEN", y);
        const f = m.source;
        f && typeof f == "string" && (u += f.length);
      }
    }
  }
  return { mode: r, indent: o, chomp: a, comment: h, length: u };
}
function ii(n) {
  const e = n.split(/\n( *)/), t = e[0], s = t.match(/^( *)/), r = [s?.[1] ? [s[1], t.slice(s[1].length)] : ["", t]];
  for (let o = 1; o < e.length; o += 2)
    r.push([e[o], e[o + 1]]);
  return r;
}
function ri(n, e, t) {
  const { offset: s, type: i, source: r, end: o } = n;
  let a, c;
  const l = (d, m, y) => t(s + d, m, y);
  switch (i) {
    case "scalar":
      a = O.PLAIN, c = oi(r, l);
      break;
    case "single-quoted-scalar":
      a = O.QUOTE_SINGLE, c = ai(r, l);
      break;
    case "double-quoted-scalar":
      a = O.QUOTE_DOUBLE, c = ci(r, l);
      break;
    /* istanbul ignore next should not happen */
    default:
      return t(n, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${i}`), {
        value: "",
        type: null,
        comment: "",
        range: [s, s + r.length, s + r.length]
      };
  }
  const h = s + r.length, u = Be(o, h, e, t);
  return {
    value: c,
    type: a,
    comment: u.comment,
    range: [s, h, u.offset]
  };
}
function oi(n, e) {
  let t = "";
  switch (n[0]) {
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
      t = `block scalar indicator ${n[0]}`;
      break;
    }
    case "@":
    case "`": {
      t = `reserved character ${n[0]}`;
      break;
    }
  }
  return t && e(0, "BAD_SCALAR_START", `Plain value cannot start with ${t}`), Vn(n);
}
function ai(n, e) {
  return (n[n.length - 1] !== "'" || n.length === 1) && e(n.length, "MISSING_CHAR", "Missing closing 'quote"), Vn(n.slice(1, -1)).replace(/''/g, "'");
}
function Vn(n) {
  const e = /(.*?)\r?\n/sy;
  let t = e.exec(n);
  if (!t)
    return n;
  let s, i;
  try {
    s = new RegExp("(?<![ 	])[ 	]+$"), i = new RegExp("^[ 	]+|(?<![ 	])[ 	]+$", "g");
  } catch {
    s = /[ \t]+$/, i = /^[ \t]+|[ \t]+$/g;
  }
  let r = t[1].replace(s, ""), o = " ", a = e.lastIndex;
  for (; t = e.exec(n); ) {
    const l = t[1].replace(i, "");
    l === "" ? o === `
` ? r += o : o = `
` : (r += o + l, o = " "), a = e.lastIndex;
  }
  const c = /[ \t]*(.*)/sy;
  return c.lastIndex = a, t = c.exec(n), r + o + (t?.[1] ?? "");
}
function ci(n, e) {
  let t = "";
  for (let s = 1; s < n.length - 1; ++s) {
    const i = n[s];
    if (!(i === "\r" && n[s + 1] === `
`))
      if (i === `
`) {
        const { fold: r, offset: o } = li(n, s);
        t += r, s = o;
      } else if (i === "\\") {
        let r = n[++s];
        const o = fi[r];
        if (o)
          t += o;
        else if (r === `
`)
          for (r = n[s + 1]; r === " " || r === "	"; )
            r = n[++s + 1];
        else if (r === "\r" && n[s + 1] === `
`)
          for (r = n[++s + 1]; r === " " || r === "	"; )
            r = n[++s + 1];
        else if (r === "x" || r === "u" || r === "U") {
          const a = r === "x" ? 2 : r === "u" ? 4 : 8;
          t += ui(n, s + 1, a, e), s += a;
        } else {
          const a = n.substr(s - 1, 2);
          e(s - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${a}`), t += a;
        }
      } else if (i === " " || i === "	") {
        const r = s;
        let o = n[s + 1];
        for (; o === " " || o === "	"; )
          o = n[++s + 1];
        o !== `
` && !(o === "\r" && n[s + 2] === `
`) && (t += s > r ? n.slice(r, s + 1) : i);
      } else
        t += i;
  }
  return (n[n.length - 1] !== '"' || n.length === 1) && e(n.length, "MISSING_CHAR", 'Missing closing "quote'), t;
}
function li(n, e) {
  let t = "", s = n[e + 1];
  for (; (s === " " || s === "	" || s === `
` || s === "\r") && !(s === "\r" && n[e + 2] !== `
`); )
    s === `
` && (t += `
`), e += 1, s = n[e + 1];
  return t || (t = " "), { fold: t, offset: e };
}
const fi = {
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
function ui(n, e, t, s) {
  const i = n.substr(e, t), o = i.length === t && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
  try {
    return String.fromCodePoint(o);
  } catch {
    const a = n.substr(e - 2, t + 2);
    return s(e - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${a}`), a;
  }
}
function Gn(n, e, t, s) {
  const { value: i, type: r, comment: o, range: a } = e.type === "block-scalar" ? ni(n, e, s) : ri(e, n.options.strict, s), c = t ? n.directives.tagName(t.source, (u) => s(t, "TAG_RESOLVE_FAILED", u)) : null;
  let l;
  n.options.stringKeys && n.atKey ? l = n.schema[H] : c ? l = hi(n.schema, i, c, t, s) : e.type === "scalar" ? l = di(n, i, e, s) : l = n.schema[H];
  let h;
  try {
    const u = l.resolve(i, (d) => s(t ?? e, "TAG_RESOLVE_FAILED", d), n.options);
    h = C(u) ? u : new O(u);
  } catch (u) {
    const d = u instanceof Error ? u.message : String(u);
    s(t ?? e, "TAG_RESOLVE_FAILED", d), h = new O(i);
  }
  return h.range = a, h.source = i, r && (h.type = r), c && (h.tag = c), l.format && (h.format = l.format), o && (h.comment = o), h;
}
function hi(n, e, t, s, i) {
  if (t === "!")
    return n[H];
  const r = [];
  for (const a of n.tags)
    if (!a.collection && a.tag === t)
      if (a.default && a.test)
        r.push(a);
      else
        return a;
  for (const a of r)
    if (a.test?.test(e))
      return a;
  const o = n.knownTags[t];
  return o && !o.collection ? (n.tags.push(Object.assign({}, o, { default: !1, test: void 0 })), o) : (i(s, "TAG_RESOLVE_FAILED", `Unresolved tag: ${t}`, t !== "tag:yaml.org,2002:str"), n[H]);
}
function di({ atKey: n, directives: e, schema: t }, s, i, r) {
  const o = t.tags.find((a) => (a.default === !0 || n && a.default === "key") && a.test?.test(s)) || t[H];
  if (t.compat) {
    const a = t.compat.find((c) => c.default && c.test?.test(s)) ?? t[H];
    if (o.tag !== a.tag) {
      const c = e.tagString(o.tag), l = e.tagString(a.tag), h = `Value may be parsed as either ${c} or ${l}`;
      r(i, "TAG_RESOLVE_FAILED", h, !0);
    }
  }
  return o;
}
function mi(n, e, t) {
  if (e) {
    t ?? (t = e.length);
    for (let s = t - 1; s >= 0; --s) {
      let i = e[s];
      switch (i.type) {
        case "space":
        case "comment":
        case "newline":
          n -= i.source.length;
          continue;
      }
      for (i = e[++s]; i?.type === "space"; )
        n += i.source.length, i = e[++s];
      break;
    }
  }
  return n;
}
const pi = { composeNode: zn, composeEmptyNode: Rt };
function zn(n, e, t, s) {
  const i = n.atKey, { spaceBefore: r, comment: o, anchor: a, tag: c } = t;
  let l, h = !0;
  switch (e.type) {
    case "alias":
      l = gi(n, e, s), (a || c) && s(e, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      l = Gn(n, e, c, s), a && (l.anchor = a.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        l = ti(pi, n, e, t, s), a && (l.anchor = a.source.substring(1));
      } catch (u) {
        const d = u instanceof Error ? u.message : String(u);
        s(e, "RESOURCE_EXHAUSTION", d);
      }
      break;
    default: {
      const u = e.type === "error" ? e.message : `Unsupported token (type: ${e.type})`;
      s(e, "UNEXPECTED_TOKEN", u), h = !1;
    }
  }
  return l ?? (l = Rt(n, e.offset, void 0, null, t, s)), a && l.anchor === "" && s(a, "BAD_ALIAS", "Anchor cannot be an empty string"), i && n.options.stringKeys && (!C(l) || typeof l.value != "string" || l.tag && l.tag !== "tag:yaml.org,2002:str") && s(c ?? e, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), r && (l.spaceBefore = !0), o && (e.type === "scalar" && e.source === "" ? l.comment = o : l.commentBefore = o), n.options.keepSourceTokens && h && (l.srcToken = e), l;
}
function Rt(n, e, t, s, { spaceBefore: i, comment: r, anchor: o, tag: a, end: c }, l) {
  const h = {
    type: "scalar",
    offset: mi(e, t, s),
    indent: -1,
    source: ""
  }, u = Gn(n, h, a, l);
  return o && (u.anchor = o.source.substring(1), u.anchor === "" && l(o, "BAD_ALIAS", "Anchor cannot be an empty string")), i && (u.spaceBefore = !0), r && (u.comment = r, u.range[2] = c), u;
}
function gi({ options: n }, { offset: e, source: t, end: s }, i) {
  const r = new Tt(t.substring(1));
  r.source === "" && i(e, "BAD_ALIAS", "Alias cannot be an empty string"), r.source.endsWith(":") && i(e + t.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const o = e + t.length, a = Be(s, o, n.strict, i);
  return r.range = [e, o, a.offset], a.comment && (r.comment = a.comment), r;
}
function yi(n, e, { offset: t, start: s, value: i, end: r }, o) {
  const a = Object.assign({ _directives: e }, n), c = new rt(void 0, a), l = {
    atKey: !1,
    atRoot: !0,
    directives: c.directives,
    options: c.options,
    schema: c.schema
  }, h = ge(s, {
    indicator: "doc-start",
    next: i ?? r?.[0],
    offset: t,
    onError: o,
    parentIndent: 0,
    startOnNewline: !0
  });
  h.found && (c.directives.docStart = !0, i && (i.type === "block-map" || i.type === "block-seq") && !h.hasNewline && o(h.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), c.contents = i ? zn(l, i, h, o) : Rt(l, h.end, s, null, h, o);
  const u = c.contents.range[2], d = Be(r, u, !1, o);
  return d.comment && (c.comment = d.comment), c.range = [t, u, d.offset], c;
}
function Se(n) {
  if (typeof n == "number")
    return [n, n + 1];
  if (Array.isArray(n))
    return n.length === 2 ? n : [n[0], n[1]];
  const { offset: e, source: t } = n;
  return [e, e + (typeof t == "string" ? t.length : 1)];
}
function Xt(n) {
  let e = "", t = !1, s = !1;
  for (let i = 0; i < n.length; ++i) {
    const r = n[i];
    switch (r[0]) {
      case "#":
        e += (e === "" ? "" : s ? `

` : `
`) + (r.substring(1) || " "), t = !0, s = !1;
        break;
      case "%":
        n[i + 1]?.[0] !== "#" && (i += 1), t = !1;
        break;
      default:
        t || (s = !0), t = !1;
    }
  }
  return { comment: e, afterEmptyLine: s };
}
class wi {
  constructor(e = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (t, s, i, r) => {
      const o = Se(t);
      r ? this.warnings.push(new Qs(o, s, i)) : this.errors.push(new xe(o, s, i));
    }, this.directives = new K({ version: e.version || "1.2" }), this.options = e;
  }
  decorate(e, t) {
    const { comment: s, afterEmptyLine: i } = Xt(this.prelude);
    if (s) {
      const r = e.contents;
      if (t)
        e.comment = e.comment ? `${e.comment}
${s}` : s;
      else if (i || e.directives.docStart || !r)
        e.commentBefore = s;
      else if (P(r) && !r.flow && r.items.length > 0) {
        let o = r.items[0];
        j(o) && (o = o.key);
        const a = o.commentBefore;
        o.commentBefore = a ? `${s}
${a}` : s;
      } else {
        const o = r.commentBefore;
        r.commentBefore = o ? `${s}
${o}` : s;
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
      comment: Xt(this.prelude).comment,
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
  *compose(e, t = !1, s = -1) {
    for (const i of e)
      yield* this.next(i);
    yield* this.end(t, s);
  }
  /** Advance the composer by one CST token. */
  *next(e) {
    switch (e.type) {
      case "directive":
        this.directives.add(e.source, (t, s, i) => {
          const r = Se(e);
          r[0] += t, this.onError(r, "BAD_DIRECTIVE", s, i);
        }), this.prelude.push(e.source), this.atDirectives = !0;
        break;
      case "document": {
        const t = yi(this.options, this.directives, e, this.onError);
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
        const t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, s = new xe(Se(e), "UNEXPECTED_TOKEN", t);
        this.atDirectives || !this.doc ? this.errors.push(s) : this.doc.errors.push(s);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const s = "Unexpected doc-end without preceding document";
          this.errors.push(new xe(Se(e), "UNEXPECTED_TOKEN", s));
          break;
        }
        this.doc.directives.docEnd = !0;
        const t = Be(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), t.comment) {
          const s = this.doc.comment;
          this.doc.comment = s ? `${s}
${t.comment}` : t.comment;
        }
        this.doc.range[2] = t.offset;
        break;
      }
      default:
        this.errors.push(new xe(Se(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
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
      const s = Object.assign({ _directives: this.directives }, this.options), i = new rt(void 0, s);
      this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), i.range = [0, t, t], this.decorate(i, !1), yield i;
    }
  }
}
const Yn = "\uFEFF", Wn = "", Hn = "", $t = "";
function bi(n) {
  switch (n) {
    case Yn:
      return "byte-order-mark";
    case Wn:
      return "doc-mode";
    case Hn:
      return "flow-error-end";
    case $t:
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
  switch (n[0]) {
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
function z(n) {
  switch (n) {
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
const Zt = new Set("0123456789ABCDEFabcdef"), ki = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), Ke = new Set(",[]{}"), vi = new Set(` ,[]{}
\r	`), pt = (n) => !n || vi.has(n);
class Si {
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
    let s = this.next ?? "stream";
    for (; s && (t || this.hasChars(1)); )
      s = yield* this.parseNext(s);
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
      let s = 0;
      for (; t === " "; )
        t = this.buffer[++s + e];
      if (t === "\r") {
        const i = this.buffer[s + e + 1];
        if (i === `
` || !i && !this.atEnd)
          return e + s + 1;
      }
      return t === `
` || s >= this.indentNext || !t && !this.atEnd ? e + s : -1;
    }
    if (t === "-" || t === ".") {
      const s = this.buffer.substr(e, 3);
      if ((s === "---" || s === "...") && z(this.buffer[e + 3]))
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
    if (e[0] === Yn && (yield* this.pushCount(1), e = e.substring(1)), e[0] === "%") {
      let t = e.length, s = e.indexOf("#");
      for (; s !== -1; ) {
        const r = e[s - 1];
        if (r === " " || r === "	") {
          t = s - 1;
          break;
        } else
          s = e.indexOf("#", s + 1);
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
    return yield Wn, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const e = this.charAt(0);
    if (!e && !this.atEnd)
      return this.setNext("line-start");
    if (e === "-" || e === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const t = this.peek(3);
      if ((t === "---" || t === "...") && z(this.charAt(3)))
        return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, t === "---" ? "doc" : "stream";
    }
    return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !z(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [e, t] = this.peek(2);
    if (!t && !this.atEnd)
      return this.setNext("block-start");
    if ((e === "-" || e === "?" || e === ":") && z(t)) {
      const s = (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0));
      return this.indentNext = this.indentValue + 1, this.indentValue += s, "block-start";
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
        return yield* this.pushUntil(pt), "doc";
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
    let e, t, s = -1;
    do
      e = yield* this.pushNewline(), e > 0 ? (t = yield* this.pushSpaces(!1), this.indentValue = s = t) : t = 0, t += yield* this.pushSpaces(!0);
    while (e + t > 0);
    const i = this.getLine();
    if (i === null)
      return this.setNext("flow");
    if ((s !== -1 && s < this.indentNext && i[0] !== "#" || s === 0 && (i.startsWith("---") || i.startsWith("...")) && z(i[3])) && !(s === this.indentNext - 1 && this.flowLevel === 1 && (i[0] === "]" || i[0] === "}")))
      return this.flowLevel = 0, yield Hn, yield* this.parseLineStart();
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
        return yield* this.pushUntil(pt), "flow";
      case '"':
      case "'":
        return this.flowKey = !0, yield* this.parseQuotedScalar();
      case ":": {
        const o = this.charAt(1);
        if (this.flowKey || z(o) || o === ",")
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
    const s = this.buffer.substring(0, t);
    let i = s.indexOf(`
`, this.pos);
    if (i !== -1) {
      for (; i !== -1; ) {
        const r = this.continueScalar(i + 1);
        if (r === -1)
          break;
        i = s.indexOf(`
`, r);
      }
      i !== -1 && (t = i - (s[i - 1] === "\r" ? 2 : 1));
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
    return yield* this.pushUntil((t) => z(t) || t === "#");
  }
  *parseBlockScalar() {
    let e = this.pos - 1, t = 0, s;
    e: for (let r = this.pos; s = this.buffer[r]; ++r)
      switch (s) {
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
    if (!s && !this.atEnd)
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
    for (s = this.buffer[i]; s === " "; )
      s = this.buffer[++i];
    if (s === "	") {
      for (; s === "	" || s === " " || s === "\r" || s === `
`; )
        s = this.buffer[++i];
      e = i - 1;
    } else if (!this.blockScalarKeep)
      do {
        let r = e - 1, o = this.buffer[r];
        o === "\r" && (o = this.buffer[--r]);
        const a = r;
        for (; o === " "; )
          o = this.buffer[--r];
        if (o === `
` && r >= this.pos && r + 1 + t > a)
          e = r;
        else
          break;
      } while (!0);
    return yield $t, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let t = this.pos - 1, s = this.pos - 1, i;
    for (; i = this.buffer[++s]; )
      if (i === ":") {
        const r = this.buffer[s + 1];
        if (z(r) || e && Ke.has(r))
          break;
        t = s;
      } else if (z(i)) {
        let r = this.buffer[s + 1];
        if (i === "\r" && (r === `
` ? (s += 1, i = `
`, r = this.buffer[s + 1]) : t = s), r === "#" || e && Ke.has(r))
          break;
        if (i === `
`) {
          const o = this.continueScalar(s + 1);
          if (o === -1)
            break;
          s = Math.max(s, o - 2);
        }
      } else {
        if (e && Ke.has(i))
          break;
        t = s;
      }
    return !i && !this.atEnd ? this.setNext("plain-scalar") : (yield $t, yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
  }
  *pushCount(e) {
    return e > 0 ? (yield this.buffer.substr(this.pos, e), this.pos += e, e) : 0;
  }
  *pushToIndex(e, t) {
    const s = this.buffer.slice(this.pos, e);
    return s ? (yield s, this.pos += s.length, s.length) : (t && (yield ""), 0);
  }
  *pushIndicators() {
    let e = 0;
    e: for (; ; ) {
      switch (this.charAt(0)) {
        case "!":
          e += yield* this.pushTag(), e += yield* this.pushSpaces(!0);
          continue e;
        case "&":
          e += yield* this.pushUntil(pt), e += yield* this.pushSpaces(!0);
          continue e;
        case "-":
        // this is an error
        case "?":
        // this is an error outside flow collections
        case ":": {
          const t = this.flowLevel > 0, s = this.charAt(1);
          if (z(s) || t && Ke.has(s)) {
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
      for (; !z(t) && t !== ">"; )
        t = this.buffer[++e];
      return yield* this.pushToIndex(t === ">" ? e + 1 : e, !1);
    } else {
      let e = this.pos + 1, t = this.buffer[e];
      for (; t; )
        if (ki.has(t))
          t = this.buffer[++e];
        else if (t === "%" && Zt.has(this.buffer[e + 1]) && Zt.has(this.buffer[e + 2]))
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
    let t = this.pos - 1, s;
    do
      s = this.buffer[++t];
    while (s === " " || e && s === "	");
    const i = t - this.pos;
    return i > 0 && (yield this.buffer.substr(this.pos, i), this.pos = t), i;
  }
  *pushUntil(e) {
    let t = this.pos, s = this.buffer[t];
    for (; !e(s); )
      s = this.buffer[++t];
    return yield* this.pushToIndex(t, !1);
  }
}
class $i {
  constructor() {
    this.lineStarts = [], this.addNewLine = (e) => this.lineStarts.push(e), this.linePos = (e) => {
      let t = 0, s = this.lineStarts.length;
      for (; t < s; ) {
        const r = t + s >> 1;
        this.lineStarts[r] < e ? t = r + 1 : s = r;
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
function ee(n, e) {
  for (let t = 0; t < n.length; ++t)
    if (n[t].type === e)
      return !0;
  return !1;
}
function en(n) {
  for (let e = 0; e < n.length; ++e)
    switch (n[e].type) {
      case "space":
      case "comment":
      case "newline":
        break;
      default:
        return e;
    }
  return -1;
}
function Jn(n) {
  switch (n?.type) {
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
function qe(n) {
  switch (n.type) {
    case "document":
      return n.start;
    case "block-map": {
      const e = n.items[n.items.length - 1];
      return e.sep ?? e.start;
    }
    case "block-seq":
      return n.items[n.items.length - 1].start;
    /* istanbul ignore next should not happen */
    default:
      return [];
  }
}
function ce(n) {
  if (n.length === 0)
    return [];
  let e = n.length;
  e: for (; --e >= 0; )
    switch (n[e].type) {
      case "doc-start":
      case "explicit-key-ind":
      case "map-value-ind":
      case "seq-item-ind":
      case "newline":
        break e;
    }
  for (; n[++e]?.type === "space"; )
    ;
  return n.splice(e, n.length);
}
function We(n, e) {
  if (e.length < 1e5)
    Array.prototype.push.apply(n, e);
  else
    for (let t = 0; t < e.length; ++t)
      n.push(e[t]);
}
function tn(n) {
  if (n.start.type === "flow-seq-start")
    for (const e of n.items)
      e.sep && !e.value && !ee(e.start, "explicit-key-ind") && !ee(e.sep, "map-value-ind") && (e.key && (e.value = e.key), delete e.key, Jn(e.value) ? e.value.end ? We(e.value.end, e.sep) : e.value.end = e.sep : We(e.start, e.sep), delete e.sep);
}
class Ei {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(e) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new Si(), this.onNewLine = e;
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
    for (const s of this.lexer.lex(e, t))
      yield* this.next(s);
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
    const t = bi(e);
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
      const s = `Not a YAML token: ${e}`;
      yield* this.pop({ type: "error", offset: this.offset, message: s, source: e }), this.offset += e.length;
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
      const s = this.peek(1);
      switch (t.type === "block-scalar" ? t.indent = "indent" in s ? s.indent : 0 : t.type === "flow-collection" && s.type === "document" && (t.indent = 0), t.type === "flow-collection" && tn(t), s.type) {
        case "document":
          s.value = t;
          break;
        case "block-scalar":
          s.props.push(t);
          break;
        case "block-map": {
          const i = s.items[s.items.length - 1];
          if (i.value) {
            s.items.push({ start: [], key: t, sep: [] }), this.onKeyLine = !0;
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
          const i = s.items[s.items.length - 1];
          i.value ? s.items.push({ start: [], value: t }) : i.value = t;
          break;
        }
        case "flow-collection": {
          const i = s.items[s.items.length - 1];
          !i || i.value ? s.items.push({ start: [], key: t, sep: [] }) : i.sep ? i.value = t : Object.assign(i, { key: t, sep: [] });
          return;
        }
        /* istanbul ignore next should not happen */
        default:
          yield* this.pop(), yield* this.pop(t);
      }
      if ((s.type === "document" || s.type === "block-map" || s.type === "block-seq") && (t.type === "block-map" || t.type === "block-seq")) {
        const i = t.items[t.items.length - 1];
        i && !i.sep && !i.value && i.start.length > 0 && en(i.start) === -1 && (t.indent === 0 || i.start.every((r) => r.type !== "comment" || r.indent < t.indent)) && (s.type === "document" ? s.end = i.start : s.items.push({ start: i.start }), t.items.splice(-1, 1));
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
        en(e.start) !== -1 ? (yield* this.pop(), yield* this.step()) : e.start.push(this.sourceToken);
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
      const t = qe(this.peek(2)), s = ce(t);
      let i;
      e.end ? (i = e.end, i.push(this.sourceToken), delete e.end) : i = [this.sourceToken];
      const r = {
        type: "block-map",
        offset: e.offset,
        indent: e.indent,
        items: [{ start: s, key: e, sep: i }]
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
          const s = "end" in t.value ? t.value.end : void 0;
          (Array.isArray(s) ? s[s.length - 1] : void 0)?.type === "comment" ? s?.push(this.sourceToken) : e.items.push({ start: [this.sourceToken] });
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
              We(i, t.start), i.push(this.sourceToken), e.items.pop();
              return;
            }
          }
          t.start.push(this.sourceToken);
        }
        return;
    }
    if (this.indent >= e.indent) {
      const s = !this.onKeyLine && this.indent === e.indent, i = s && (t.sep || t.explicitKey) && this.type !== "seq-item-ind";
      let r = [];
      if (i && t.sep && !t.value) {
        const o = [];
        for (let a = 0; a < t.sep.length; ++a) {
          const c = t.sep[a];
          switch (c.type) {
            case "newline":
              o.push(a);
              break;
            case "space":
              break;
            case "comment":
              c.indent > e.indent && (o.length = 0);
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
              else if (Jn(t.key) && !ee(t.sep, "newline")) {
                const o = ce(t.start), a = t.key, c = t.sep;
                c.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: a, sep: c }]
                });
              } else r.length > 0 ? t.sep = t.sep.concat(r, this.sourceToken) : t.sep.push(this.sourceToken);
            else if (ee(t.start, "newline"))
              Object.assign(t, { key: null, sep: [this.sourceToken] });
            else {
              const o = ce(t.start);
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
            } else s && e.items.push({ start: r });
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
          const s = "end" in t.value ? t.value.end : void 0;
          (Array.isArray(s) ? s[s.length - 1] : void 0)?.type === "comment" ? s?.push(this.sourceToken) : e.items.push({ start: [this.sourceToken] });
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
              We(i, t.start), i.push(this.sourceToken), e.items.pop();
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
      const s = this.startBlockValue(e);
      if (s) {
        this.stack.push(s);
        return;
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *flowCollection(e) {
    const t = e.items[e.items.length - 1];
    if (this.type === "flow-error-end") {
      let s;
      do
        yield* this.pop(), s = this.peek(1);
      while (s?.type === "flow-collection");
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
      const s = this.startBlockValue(e);
      s ? this.stack.push(s) : (yield* this.pop(), yield* this.step());
    } else {
      const s = this.peek(2);
      if (s.type === "block-map" && (this.type === "map-value-ind" && s.indent === e.indent || this.type === "newline" && !s.items[s.items.length - 1].sep))
        yield* this.pop(), yield* this.step();
      else if (this.type === "map-value-ind" && s.type !== "flow-collection") {
        const i = qe(s), r = ce(i);
        tn(e);
        const o = e.end.splice(1, e.end.length);
        o.push(this.sourceToken);
        const a = {
          type: "block-map",
          offset: e.offset,
          indent: e.indent,
          items: [{ start: r, key: e, sep: o }]
        };
        this.onKeyLine = !0, this.stack[this.stack.length - 1] = a;
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
        const t = qe(e), s = ce(t);
        return s.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const t = qe(e), s = ce(t);
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s, key: null, sep: [this.sourceToken] }]
        };
      }
    }
    return null;
  }
  atIndentedComment(e, t) {
    return this.type !== "comment" || this.indent <= t ? !1 : e.every((s) => s.type === "newline" || s.type === "space");
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
function xi(n) {
  const e = n.prettyErrors !== !1;
  return { lineCounter: n.lineCounter || e && new $i() || null, prettyErrors: e };
}
function Ni(n, e = {}) {
  const { lineCounter: t, prettyErrors: s } = xi(e), i = new Ei(t?.addNewLine), r = new wi(e);
  let o = null;
  for (const a of r.compose(i.parse(n), !0, n.length))
    if (!o)
      o = a;
    else if (o.options.logLevel !== "silent") {
      o.errors.push(new xe(a.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return s && t && (o.errors.forEach(Jt(n, t)), o.warnings.forEach(Jt(n, t))), o;
}
const W = {
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
}, Ai = {
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
}, Oi = {
  cast: { asset: "asset" },
  actor: { expression: "expression", gesture: "gesture", holding: "prop" },
  panel: { mode: "mode" },
  transfer: { prop: "prop" },
  diagram: { type: "diagramType" },
  options: { panelFormat: "panelFormat" }
};
function Et(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function Oe(n, e, t, s) {
  if (!Et(n)) return n;
  const i = W[e], r = /* @__PURE__ */ Object.create(null);
  for (const [o, a] of Object.entries(n)) {
    const c = Object.keys(i).find(
      (m) => o === m || o === i[m]
    ) ?? o;
    Object.hasOwn(i, c) && i[c];
    const l = c;
    if (Object.hasOwn(r, l))
      throw new Error(
        `${s}: '${i[c]}'와 '${c}'은 같은 항목입니다. 하나만 작성하세요.`
      );
    let h = a;
    const u = Oi[e], d = u && Object.hasOwn(u, c) ? u[c] : void 0;
    if (d && typeof a == "string") {
      const m = Ai[d], y = Object.keys(m).find(
        (f) => a === f || a === m[f]
      );
      y && (h = y);
    }
    if (e === "comic" && c === "cast" && Et(a)) {
      const m = /* @__PURE__ */ Object.create(null);
      for (const [y, f] of Object.entries(a))
        m[y] = Oe(f, "cast", t, `${s}.등장인물.${y}`);
      h = m;
    } else if (e === "panel" && c === "diagram")
      h = Oe(a, "diagram", t, `${s}.다이어그램`);
    else if (Array.isArray(a)) {
      const m = e === "comic" && c === "panels" ? "panel" : e === "panel" && c === "actors" ? "actor" : e === "panel" && c === "dialogue" ? "dialogue" : e === "panel" && c === "transfer" ? "transfer" : void 0;
      m && (h = a.map(
        (y, f) => Oe(
          y,
          m,
          t,
          `${s}.${i[c]}[${f + 1}]`
        )
      ));
    }
    r[l] = h;
  }
  return r;
}
const Li = (n) => Oe(n, "comic", !1, "만화");
function Ti(n) {
  const e = Oe(n, "options", !1, "표시 설정");
  if (!Et(e)) throw new Error("표시 설정: 객체가 필요합니다.");
  for (const t of Object.keys(e))
    if (!Object.hasOwn(W.options, t))
      throw new Error(`표시 설정: 알 수 없는 항목 '${t}'.`);
  return e;
}
function J(n, e) {
  if (!n || typeof n != "object" || Array.isArray(n))
    throw new Error(`${e}: 객체가 필요합니다.`);
  return n;
}
function D(n, e, t = 1e4) {
  if (typeof n != "string" || !n.trim())
    throw new Error(`${e}: 비어 있지 않은 문자열이 필요합니다.`);
  if (n.length > t)
    throw new Error(
      `${e}: 텍스트가 너무 깁니다. ${t}자 이내로 작성하세요.`
    );
  return n;
}
function le(n, e) {
  if (!Array.isArray(n)) throw new Error(`${e}: 목록이 필요합니다.`);
  return n;
}
function Z(n, e, t) {
  for (const s of Object.keys(n))
    if (!e.includes(s))
      throw new Error(`${t}: 알 수 없는 항목 '${s}'.`);
}
function ne(n, e, t, s) {
  if (n !== void 0) {
    if (typeof n != "number" || !Number.isFinite(n) || n < e || n > t)
      throw new Error(`${s}: ${e}~${t} 사이 숫자가 필요합니다.`);
    return n;
  }
}
function Ii(n) {
  if (n.length > 1e5)
    throw new Error("코드가 너무 깁니다. 100KB 이내로 작성하세요.");
  const e = Ni(n, { uniqueKeys: !0 });
  if (e.errors.length) throw new Error(e.errors[0].message);
  const t = J(Li(e.toJS({ maxAliasCount: 20 })), "만화");
  Z(t, Object.keys(W.comic), "만화");
  const s = /* @__PURE__ */ Object.create(null);
  for (const [o, a] of Object.entries(J(t.cast, "등장인물"))) {
    const c = J(a, `등장인물.${o}`);
    Z(c, Object.keys(W.cast), `등장인물.${o}`);
    const l = D(c.asset, `등장인물.${o}.그림`);
    if (!Object.hasOwn(un, l))
      throw new Error(`등장인물.${o}: 없는 에셋 '${l}'.`);
    s[o] = {
      asset: l,
      label: c.label === void 0 ? o : D(c.label, `등장인물.${o}.이름표`)
    };
  }
  let i;
  const r = le(t.panels, "컷").map((o, a) => {
    const c = `컷 ${a + 1}`, l = { ...J(o, c) };
    if (Z(l, Object.keys(W.panel), c), l.mode !== void 0 && l.mode !== "before" && l.mode !== "full")
      throw new Error(`${c}: 구성은 전체 또는 이전이어야 합니다.`);
    if (l.mode === "before") {
      if (!i)
        throw new Error(`${c}: 첫 컷에서는 이전 구성을 사용할 수 없습니다.`);
      const y = i.actors.map(
        (k) => ({ ...k })
      ), f = le(l.removeActors ?? [], `${c}.제외인물`).map(
        (k) => D(k, `${c}.제외인물`)
      );
      for (const k of f)
        if (!y.some((g) => g.id === k))
          throw new Error(`${c}: 제거할 인물 '${k}'가 이전 컷에 없습니다.`);
      const p = y.filter(
        (k) => !f.some((g) => g === k.id)
      ), S = le(l.actors ?? [], `${c}.인물`), $ = /* @__PURE__ */ new Set();
      for (const k of S) {
        const g = typeof k == "string" ? { id: k } : J(k, `${c}.인물`);
        Z(g, Object.keys(W.actor), `${c}.인물`);
        const v = D(g.id, `${c}.인물.식별자`);
        if ($.has(v))
          throw new Error(`${c}: 캐릭터 식별자가 중복됩니다.`);
        $.add(v);
        const E = p.findIndex((w) => w.id === v), x = {
          ...E < 0 ? {} : p[E],
          ...g
        };
        for (const [w, N] of Object.entries(g))
          w !== "id" && N === null && delete x[w];
        E < 0 ? p.push(x) : p[E] = x;
      }
      l.actors = l.actors !== void 0 && S.length === 0 ? [] : p;
    } else if (l.removeActors !== void 0)
      throw new Error(`${c}: 제외인물은 이전 구성에서만 사용할 수 있습니다.`);
    const h = le(l.actors, `${c}.인물`).map((y) => {
      const f = typeof y == "string" ? { id: y } : J(y, `${c}.인물`);
      Z(f, Object.keys(W.actor), `${c}.인물`);
      const p = D(f.id, `${c}.인물.식별자`), S = f.expression === void 0 ? "neutral" : D(f.expression, `${c}.${p}.표정`);
      if (!Object.hasOwn(s, p))
        throw new Error(`${c}: 없는 캐릭터 '${p}'.`);
      if (!Object.hasOwn(hn, S))
        throw new Error(`${c}.${p}: 없는 표정 '${S}'.`);
      const $ = f.gesture === void 0 ? void 0 : D(f.gesture, `${c}.${p}.손모양`), k = f.holding === void 0 ? void 0 : D(f.holding, `${c}.${p}.든소품`);
      if ($ && !Object.hasOwn(dn, $))
        throw new Error(`${c}.${p}: 없는 손 제스처 '${$}'.`);
      if (k && !Object.hasOwn(Ge, k))
        throw new Error(`${c}.${p}: 없는 소품 '${k}'.`);
      return {
        id: p,
        expression: S,
        gesture: $,
        holding: k,
        x: ne(f.x, 0, 1, `${c}.${p}.가로위치`),
        y: ne(f.y, 0, 1, `${c}.${p}.세로위치`),
        scale: ne(f.scale, 0.5, 1.25, `${c}.${p}.배율`) ?? 1
      };
    });
    if (h.length < 1 || h.length > 3)
      throw new Error(`${c}: 캐릭터는 1~3명이어야 합니다.`);
    if (new Set(h.map((y) => y.id)).size !== h.length)
      throw new Error(`${c}: 캐릭터 식별자가 중복됩니다.`);
    const u = le(l.dialogue ?? [], `${c}.대사`).map(
      (y) => {
        const f = J(y, `${c}.대사`);
        Z(f, Object.keys(W.dialogue), `${c}.대사`);
        const p = D(f.from, `${c}.대사.화자`), S = f.to === void 0 ? void 0 : D(f.to, `${c}.대사.상대`);
        if (!h.some(($) => $.id === p))
          throw new Error(`${c}: 화자 '${p}'가 컷에 없습니다.`);
        if (S && !h.some(($) => $.id === S))
          throw new Error(`${c}: 대화 상대 '${S}'가 컷에 없습니다.`);
        return {
          from: p,
          to: S,
          text: D(f.text, `${c}.대사.내용`),
          x: ne(f.x, 0, 1, `${c}.대사.가로위치`),
          y: ne(f.y, 0, 1, `${c}.대사.세로위치`),
          fontSize: ne(f.fontSize, 12, 32, `${c}.대사.글자크기`) ?? 18
        };
      }
    );
    if (u.length > 20)
      throw new Error(`${c}: 대사는 20개 이내로 작성하세요.`);
    const d = le(l.transfer ?? [], `${c}.전달`).map(
      (y) => {
        const f = J(y, `${c}.전달`);
        Z(f, Object.keys(W.transfer), `${c}.전달`);
        const p = D(f.from, `${c}.전달.주는인물`), S = D(f.to, `${c}.전달.받는인물`), $ = D(f.prop, `${c}.전달.소품`);
        if (!h.some((k) => k.id === p))
          throw new Error(`${c}: 전달 주체 '${p}'가 컷에 없습니다.`);
        if (!h.some((k) => k.id === S))
          throw new Error(`${c}: 전달 대상 '${S}'가 컷에 없습니다.`);
        if (p === S)
          throw new Error(`${c}: 전달 주체와 대상은 달라야 합니다.`);
        if (!Object.hasOwn(Ge, $))
          throw new Error(`${c}: 없는 소품 '${$}'.`);
        return { from: p, to: S, prop: $ };
      }
    );
    if (d.length > 6)
      throw new Error(`${c}: 소품 전달은 6개 이내로 작성하세요.`);
    let m;
    if (l.diagram !== void 0 && l.diagram !== null) {
      const y = `${c}.다이어그램`, f = J(l.diagram, y);
      if (Z(f, Object.keys(W.diagram), y), f.type !== "mermaid")
        throw new Error(`${y}.종류: 머메이드여야 합니다.`);
      m = {
        type: "mermaid",
        source: D(f.source, `${y}.원문`, 2e4),
        title: f.title === void 0 ? "다이어그램" : D(f.title, `${y}.제목`, 100),
        height: ne(f.height, 160, 1200, `${y}.높이`)
      };
    }
    return i = { actors: h, dialogue: u, transfer: d, ...m ? { diagram: m } : {} }, i;
  });
  if (r.length < 1 || r.length > 30)
    throw new Error("컷은 1~30개여야 합니다.");
  return {
    title: t.title === void 0 ? "Comic Gen" : D(t.title, "제목"),
    cast: s,
    panels: r
  };
}
const $e = (n, e, t) => Math.max(e, Math.min(t, n));
function gt(n, e, t, s) {
  const i = document.createElement("canvas").getContext("2d");
  i.font = `${t}px ${s}`;
  const r = [];
  for (const o of n.split(`
`)) {
    let a = "";
    for (const c of Array.from(o))
      a && i.measureText(a + c).width > e && (r.push(a), a = ""), a += c;
    r.push(a);
  }
  return r;
}
function Qn(n, e, t, s, i = "compact", r) {
  const o = Math.min(t - 80, 390), a = n.dialogue.map((g) => ({
    line: g,
    lines: gt(g.text, o - 36, g.fontSize, s),
    lineHeight: Math.ceil(g.fontSize * 1.45)
  })), c = a.reduce(
    (g, v) => g + 60 + v.lines.length * v.lineHeight,
    20
  ), l = c + 254, h = Math.max(
    ...n.actors.map((g) => g.holding || g.gesture ? 92 : 60)
  ), u = (t - 72) / n.actors.length, d = Math.min(
    1,
    (u - 12) / (2 * h * Math.max(...n.actors.map((g) => g.scale)))
  ), m = n.actors.map((g) => g.scale * d), y = n.actors.map(
    (g, v) => $e(
      36 + (t - 72) * (g.x ?? (v + 0.5) / n.actors.length),
      26 + h * m[v],
      t - 26 - h * m[v]
    )
  ), f = n.actors.map(
    (g, v) => $e(
      g.y === void 0 ? l - 126 : g.y * l,
      c + 70 * m[v],
      l - 126 * m[v]
    )
  );
  for (let g = 0; g < n.actors.length; g++)
    for (let v = g + 1; v < n.actors.length; v++)
      if (Math.abs(y[g] - y[v]) < h * (m[g] + m[v]) && Math.abs(f[g] - f[v]) < 120 * Math.max(m[g], m[v]))
        throw new Error(
          `캐릭터 '${n.actors[g].id}'와 '${n.actors[v].id}'가 겹칩니다. 가로위치·세로위치 또는 배율을 조정하세요.`
        );
  const p = [
    `<rect x="20" y="0" width="${t - 40}" height="${l}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/>`
  ];
  let S = 20;
  a.forEach(({ line: g, lines: v, lineHeight: E }) => {
    const x = y[n.actors.findIndex((_) => _.id === g.from)], w = $e(
      (g.x === void 0 ? x : g.x * t) - o / 2,
      40,
      t - o - 40
    ), N = 28 + v.length * E, A = g.y === void 0 ? S : $e(g.y * l, 20, c - N), T = Math.max(w + 24, Math.min(w + o - 24, x)), b = w + o, L = A + N, I = n.actors.findIndex(
      (_) => _.id === g.from
    ), M = f[I] - 65 * m[I], F = `M${w + 14} ${A}H${b - 14}Q${b} ${A} ${b} ${A + 14}V${L - 14}Q${b} ${L} ${b - 14} ${L}H${T + 9}L${x} ${M}L${T - 9} ${L}H${w + 14}Q${w} ${L} ${w} ${L - 14}V${A + 14}Q${w} ${A} ${w + 14} ${A}Z`;
    p.push(
      `<g data-dialogue="${R(g.from)}" data-to="${R(g.to ?? "")}"><path d="${F}" fill="#fffaf0" stroke="#303341" stroke-width="2" stroke-linejoin="round"/><text x="${w + 18}" y="${A + 18 + g.fontSize}" font-size="${g.fontSize}">${v.map((_, ct) => `<tspan x="${w + 18}" dy="${ct ? E : 0}">${R(_)}</tspan>`).join("")}</text></g>`
    ), S += N + 32;
  }), n.actors.forEach((g, v) => {
    const E = e[g.id], x = un[E.asset], w = n.dialogue.find(
      (I) => I.from === g.id && I.to
    )?.to, N = n.actors.findIndex((I) => I.id === w), A = N < 0 ? 0 : Math.sign(y[N] - y[v]) * 4, T = gt(
      E.label,
      (t - 72) / n.actors.length - 12,
      16,
      s
    );
    if (T.length > 2)
      throw new Error(`캐릭터 '${g.id}'의 이름표가 너무 깁니다.`);
    const b = g.gesture ? `<g data-gesture="${g.gesture}">${dn[g.gesture]}</g>` : "", L = g.holding ? `<g data-holding="${g.holding}"><circle data-hand="holding" cx="58" cy="20" r="11" fill="white"/><g data-prop="${g.holding}" transform="translate(73 6)">${Ge[g.holding]}</g></g>` : "";
    p.push(
      `<g data-character="${R(g.id)}" transform="translate(${y[v]} ${f[v]}) scale(${m[v]})" stroke="#303341" stroke-width="2.8" stroke-linecap="round"><ellipse cy="69" rx="51" ry="7" fill="#e8edf3" stroke="none"/>${x.body}<g transform="translate(${A} ${x.faceY})" fill="#303341">${hn[g.expression]}</g>${b}${L}<text y="94" text-anchor="middle" stroke="none" fill="#303341" font-size="16">${T.map((I, M) => `<tspan x="0" dy="${M ? 18 : 0}">${R(I)}</tspan>`).join("")}</text></g>`
    );
  }), n.transfer.forEach((g, v) => {
    const E = n.actors.findIndex(
      (_) => _.id === g.from
    ), x = n.actors.findIndex((_) => _.id === g.to), w = y[E], N = y[x], A = Math.sign(N - w), T = w + 62 * m[E] * A, b = N - 62 * m[x] * A, L = 20 + (v - (n.transfer.length - 1) / 2) * 12, I = f[E] + L * m[E], M = f[x] + L * m[x], F = Math.atan2(M - I, b - T) * 180 / Math.PI;
    p.push(
      `<g data-transfer="${R(g.from)}" data-to="${R(g.to)}" stroke="#586c8c" stroke-width="2.5"><path d="M${T} ${I}L${b} ${M}" fill="none"/><circle data-hand="transfer" cx="${T}" cy="${I}" r="${9 * m[E]}" fill="white"/><circle data-hand="receive" cx="${b}" cy="${M}" r="${9 * m[x]}" fill="white"/><path transform="translate(${b} ${M}) rotate(${F})" d="M-12 -5L-4 0L-12 5" fill="none"/><g data-prop="${g.prop}" transform="translate(${(T + b) / 2} ${(I + M) / 2 - 16})">${Ge[g.prop]}</g></g>`
    );
  });
  let $ = p.slice(1).join(""), k = l;
  if (r && n.diagram) {
    const g = t - 80, v = g - 32, E = n.diagram.height ?? $e(v * r.height / r.width + 58, 180, 1200), x = E - 58, w = Math.min(
      v / r.width,
      x / r.height
    ), N = 56 + (v - r.width * w) / 2, A = 66 + (x - r.height * w) / 2;
    if (gt(n.diagram.title, v, 16, s).length > 1)
      throw new Error(
        "다이어그램 제목이 너무 깁니다. 제목이나 너비를 조정하세요."
      );
    $ = `<g data-diagram="mermaid"><rect x="40" y="20" width="${g}" height="${E}" rx="10" fill="#f3f7fc" stroke="#8093ab" stroke-width="2"/><text x="56" y="48" font-size="16" font-weight="700">${R(n.diagram.title)}</text><g data-diagram-content="mermaid" transform="translate(${N} ${A}) scale(${w})">${r.svg}</g></g><g data-scene="true" transform="translate(0 ${E + 40})">${$}</g>`, k += E + 40;
  }
  if (i === "phone") {
    const g = k * 2 + 92;
    return {
      markup: `<rect x="20" y="0" width="${t - 40}" height="${g}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/><g transform="translate(0 ${(g - k) / 2})">${$}</g>`,
      height: g
    };
  }
  return r ? {
    markup: `<rect x="20" y="0" width="${t - 40}" height="${k}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/>${$}`,
    height: k
  } : { markup: p.join(""), height: l };
}
const Ci = "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.5.0/cdn/comic-gen.mermaid.js", xt = 2e4, Mi = "http://www.w3.org/2000/svg", _i = Math.random().toString(36).slice(2);
let Pi = 0, nn = Promise.resolve();
const ot = [
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
], Bi = new Set(ot), ji = /* @__PURE__ */ new Set([
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
]), Di = /* @__PURE__ */ new Set([
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
  ...ot
]);
function Fi(n) {
  if (!n.trim() || n.length > xt)
    throw new Error(`Mermaid 원문은 1~${xt}자여야 합니다.`);
  const e = document.createElement("textarea");
  e.innerHTML = n.replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
function Ki(n) {
  if (typeof n != "string" || !n.trim() || n.length > 300 || /[^\p{L}\p{N}\s,'"_\-]/u.test(n))
    throw new Error("다이어그램에 사용할 올바른 글꼴 이름이 필요합니다.");
  return n;
}
async function qi(n) {
  const e = document.createElement("iframe");
  e.title = "Mermaid 렌더링", e.tabIndex = -1, e.setAttribute("aria-hidden", "true"), e.style.cssText = "all:initial!important;display:block!important;width:20000px!important;height:20000px!important;border:0!important;", n.append(e);
  const t = e.contentDocument, s = e.contentWindow;
  if (!t?.body || !s)
    throw e.remove(), new Error("Mermaid 격리 문서를 만들지 못했습니다.");
  const i = t.createElement("script");
  i.type = "module", i.src = Ci;
  try {
    return { api: await new Promise((o, a) => {
      const c = window.setTimeout(() => {
        l(), a(new Error("Mermaid 모듈을 불러오는 시간이 초과되었습니다."));
      }, 3e4), l = () => {
        window.clearTimeout(c), i.onload = null, i.onerror = null, s.removeEventListener("comic-gen-mermaid-ready", h), s.removeEventListener("comic-gen-mermaid-error", u);
      }, h = () => {
        l();
        const d = s.__comicGenMermaid;
        typeof d?.initialize != "function" || typeof d?.render != "function" ? a(new Error("Mermaid 모듈을 불러오지 못했습니다.")) : o(d);
      }, u = () => {
        l(), a(new Error("Mermaid 모듈을 불러오지 못했습니다."));
      };
      s.addEventListener("comic-gen-mermaid-ready", h), s.addEventListener("comic-gen-mermaid-error", u), i.onload = () => {
        s.__comicGenMermaid && h();
      }, i.onerror = u, t.head.append(i);
    }), document: t, dispose: () => e.remove() };
  } catch (r) {
    throw e.remove(), r;
  }
}
function Xn(n) {
  const e = new DOMParser().parseFromString(n, "image/svg+xml");
  if (e.querySelector("parsererror") || e.documentElement.localName !== "svg")
    throw new Error("Mermaid가 올바른 SVG를 만들지 못했습니다.");
  return e.documentElement;
}
function He(n, e, t = !1) {
  let s = !0;
  const i = n.replace(
    /url\(\s*(["']?)(.*?)\1\s*\)/gi,
    (r, o, a) => {
      let c = a.trim();
      if (t && !c.startsWith("#")) {
        const l = c.lastIndexOf("#");
        c = l >= 0 ? c.slice(l) : "";
      }
      return !c.startsWith("#") || !e.has(c.slice(1)) ? (s = !1, "") : `url(${c})`;
    }
  );
  return /url\s*\(/i.test(i.replace(/url\(#[^)]*\)/g, "")) && (s = !1), s ? i : void 0;
}
function Zn(n, e) {
  const t = document.createElement("span").style;
  for (const s of ot) {
    const i = He(n.getPropertyValue(s), e);
    i && t.setProperty(s, i, n.getPropertyPriority(s));
  }
  return n.getPropertyValue("display") === "none" && (t.display = "none"), t.cssText;
}
function Ri(n) {
  const e = [];
  let t = 0, s = 0, i = "";
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    i ? o === i && n[r - 1] !== "\\" && (i = "") : o === "'" || o === '"' ? i = o : o === "(" || o === "[" ? s++ : o === ")" || o === "]" ? s-- : o === "," && s === 0 && (e.push(n.slice(t, r).trim()), t = r + 1);
  }
  return e.push(n.slice(t).trim()), e;
}
function Ui(n, e, t) {
  const s = new CSSStyleSheet();
  s.replaceSync(n);
  const i = [], r = `#${e}`;
  for (const o of s.cssRules) {
    if (!(o instanceof CSSStyleRule)) continue;
    if (!Ri(o.selectorText).every(
      (l) => l === r || l.startsWith(r + " ") || l.startsWith(r + ">") || l.startsWith(r + ":")
    )) throw new Error("Mermaid SVG에 범위 밖 스타일이 있습니다.");
    const c = Zn(o.style, t);
    c && i.push(`${o.selectorText}{${c}}`);
  }
  return i.join(`
`);
}
function Vi(n) {
  if (n.length > 2e6)
    throw new Error("Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요.");
  const e = Xn(n), t = [e, ...e.querySelectorAll("*")];
  if (t.length > 1e4)
    throw new Error(
      "Mermaid SVG 요소가 너무 많습니다. 다이어그램을 나누어 주세요."
    );
  const s = new Set(t.map((r) => r.id).filter(Boolean)), i = e.id;
  for (const r of t)
    for (const o of [...r.attributes])
      if (/url\s*\(/i.test(o.value)) {
        const a = He(o.value, s, !0);
        a === void 0 ? r.removeAttributeNode(o) : r.setAttribute(o.name, a);
      }
  for (const r of t) {
    const o = r.localName.toLowerCase();
    if (r.namespaceURI !== Mi || !ji.has(o) && o !== "style") {
      o === "a" ? r.replaceWith(...r.childNodes) : r.remove();
      continue;
    }
    if (o === "style") {
      r.textContent = Ui(r.textContent ?? "", i, s);
      continue;
    }
    for (const a of [...r.attributes]) {
      const c = a.name.toLowerCase(), l = a.value;
      if (!Di.has(c) && !c.startsWith("aria-") && !c.startsWith("data-"))
        r.removeAttributeNode(a);
      else if (c === "href" || c === "xlink:href")
        (!l.startsWith("#") || !s.has(l.slice(1))) && r.removeAttributeNode(a);
      else if (c === "style") {
        const h = document.createElement("span").style;
        h.cssText = l, r.setAttribute("style", Zn(h, s));
      } else if (Bi.has(c)) {
        const h = He(l, s);
        h === void 0 ? r.removeAttributeNode(a) : r.setAttribute(a.name, h);
      }
    }
  }
  return e;
}
function Gi(n) {
  if (n.length > 3e6)
    throw new Error("Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요.");
  const e = n.match(
    /\bsrc="data:text\/html;charset=UTF-8;base64,([^"]+)"/i
  )?.[1];
  if (!e) throw new Error("Mermaid 격리 문서에서 SVG를 읽지 못했습니다.");
  const t = Uint8Array.from(
    atob(e),
    (o) => o.charCodeAt(0)
  ), s = new TextDecoder().decode(t), r = new DOMParser().parseFromString(s, "text/html").querySelector("svg");
  if (!r) throw new Error("Mermaid 격리 문서에서 SVG를 읽지 못했습니다.");
  return r.outerHTML;
}
function zi(n) {
  const e = (n.getAttribute("viewBox") ?? "").trim().split(/[\s,]+/).map(Number), t = e.length === 4 ? e[2] : Number.parseFloat(n.getAttribute("width") ?? ""), s = e.length === 4 ? e[3] : Number.parseFloat(n.getAttribute("height") ?? "");
  if (!Number.isFinite(t) || !Number.isFinite(s) || t <= 0 || s <= 0 || t > 2e4 || s > 2e4 || t * s > 16e7)
    throw new Error(
      "Mermaid 다이어그램 크기가 너무 큽니다. 다이어그램을 나누어 주세요."
    );
  return (e.length !== 4 || e.some((i) => !Number.isFinite(i))) && n.setAttribute("viewBox", `0 0 ${t} ${s}`), n.setAttribute("width", String(t)), n.setAttribute("height", String(s)), n.setAttribute("preserveAspectRatio", "xMidYMid meet"), { width: t, height: s };
}
async function Yi(n, e) {
  if (typeof document > "u" || !document.body)
    throw new Error("Mermaid 렌더링에는 브라우저 문서가 필요합니다.");
  Fi(n), e = Ki(e);
  const t = nn.then(async () => {
    await Promise.all([
      document.fonts.load(`18px ${e}`, n),
      document.fonts.load(`bold 18px ${e}`, n),
      document.fonts.load(`italic 18px ${e}`, n)
    ]), await document.fonts.ready;
    const s = `comic-gen-mermaid-${_i}-${++Pi}`, i = document.createElement("div");
    i.dataset.comicDiagramTemporary = "", i.style.cssText = "all:initial!important;display:block!important;position:fixed!important;left:-100000px!important;top:0!important;width:20000px!important;pointer-events:none!important;opacity:0!important;";
    const r = [...document.fonts].filter(
      (l) => l.status === "loaded"
    );
    let o, a;
    const c = new MutationObserver(() => {
      const l = a?.querySelector("iframe"), h = l?.contentDocument;
      if (!(!l || !h)) {
        l.style.cssText = "all:initial!important;display:block!important;width:20000px!important;height:20000px!important;border:0!important;";
        for (const u of r) h.fonts.add(u);
      }
    });
    document.body.append(i);
    try {
      o = await qi(i);
      for (const k of r) o.document.fonts.add(k);
      a = o.document.createElement("div"), a.style.cssText = "width:20000px;", o.document.body.append(a), c.observe(a, { childList: !0, subtree: !0 });
      const l = o.api;
      l.initialize({
        startOnLoad: !1,
        securityLevel: "sandbox",
        suppressErrorRendering: !0,
        maxTextSize: xt,
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
      const h = await l.render(s, n, a);
      c.disconnect();
      const u = Vi(Gi(h.svg)), d = zi(u), m = i.attachShadow({ mode: "closed" });
      m.append(document.importNode(u, !0));
      const y = m.firstElementChild, f = [y, ...y.querySelectorAll("*")], p = new Set(
        f.map((k) => k.id).filter(Boolean)
      ), S = f.map((k) => {
        if (k.localName === "style") return "";
        const g = getComputedStyle(k), v = document.createElement("span").style;
        for (const E of ot) {
          const x = He(
            g.getPropertyValue(E),
            p,
            !0
          );
          x && v.setProperty(E, x, "important");
        }
        return g.display === "none" && v.setProperty("display", "none", "important"), v.cssText;
      });
      f.forEach((k, g) => {
        k.localName === "style" ? k.remove() : (k.setAttribute("style", S[g]), k.removeAttribute("class"));
      }), y.style.removeProperty("visibility"), y.style.setProperty("width", `${d.width}px`, "important"), y.style.setProperty("height", `${d.height}px`, "important"), y.style.setProperty("max-width", "none", "important"), y.style.setProperty("max-height", "none", "important");
      const $ = new XMLSerializer().serializeToString(y);
      if ($.length > 2e6)
        throw new Error(
          "Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요."
        );
      return { svg: $, ...d };
    } finally {
      c.disconnect(), o?.document.getElementById(s)?.remove(), o?.document.getElementById(`d${s}`)?.remove(), o?.document.getElementById(`i${s}`)?.remove(), o?.dispose(), i.remove();
    }
  });
  return nn = t.catch(() => {
  }), t;
}
function Wi(n, e) {
  if (!/^[A-Za-z][A-Za-z0-9_-]{0,120}$/.test(e))
    throw new Error("다이어그램 SVG 식별자 접두사가 올바르지 않습니다.");
  const t = Xn(n.svg), s = [t, ...t.querySelectorAll("*")], i = /* @__PURE__ */ new Map();
  let r = 0;
  const o = (a) => {
    const c = a.localName === "svg" ? a : a.closest("svg");
    let l = i.get(c);
    return l || (l = /* @__PURE__ */ new Map(), i.set(c, l)), l;
  };
  for (const a of s) {
    if (!a.id) continue;
    const c = o(a);
    if (c.has(a.id))
      throw new Error("다이어그램 SVG 식별자가 중복됩니다.");
    c.set(a.id, `${e}-${r++}`);
  }
  for (const a of s) {
    const c = o(a);
    for (const l of [...a.attributes])
      if (l.name === "id")
        a.setAttribute("id", c.get(l.value));
      else if (l.localName === "href" && l.value.startsWith("#")) {
        const h = c.get(l.value.slice(1));
        h && a.setAttribute(l.name, `#${h}`);
      } else l.name === "aria-labelledby" || l.name === "aria-describedby" ? a.setAttribute(
        l.name,
        l.value.split(/\s+/).map((h) => c.get(h) ?? h).join(" ")
      ) : /url\(/i.test(l.value) && a.setAttribute(
        l.name,
        l.value.replace(
          /url\(\s*(["']?)#([^"')\s]+)\1\s*\)/gi,
          (h, u, d) => c.has(d) ? `url(#${c.get(d)})` : h
        )
      );
  }
  return new XMLSerializer().serializeToString(t);
}
let es = 0, Hi = 0;
document.fonts.addEventListener("loadingdone", (n) => {
  n.fontfaces.length && es++;
});
function ts(n, e, t) {
  e = Ti(e);
  const s = Ii(n), i = e.width ?? 720, r = e.panelFormat ?? t;
  if (r !== "compact" && r !== "phone")
    throw new Error("컷비율은 기본 또는 모바일이어야 합니다.");
  if (!Number.isFinite(i) || i < 480 || i > 2400)
    throw new Error("너비는 480~2400 사이여야 합니다.");
  const o = e.font ?? "Malgun Gothic, Apple SD Gothic Neo, sans-serif";
  if (typeof o != "string" || o.length > 300 || /[<>]/.test(o))
    throw new Error("올바른 글꼴 이름이 필요합니다.");
  return { comic: s, options: e, width: i, font: o, format: r };
}
function ns(n, e) {
  const { comic: t, width: s, font: i, options: r, format: o } = e;
  return JSON.stringify({
    panel: n,
    members: n.actors.map((a) => [a.id, t.cast[a.id]]),
    width: s,
    font: i,
    fontEpoch: es,
    fontVersion: r.fontVersion,
    assetVersion: "1",
    layoutVersion: n.diagram ? 3 : 2,
    format: o
  });
}
function ss(n) {
  return {
    svg: "",
    width: 0,
    height: 0,
    diagnostics: [n instanceof Error ? n.message : "렌더링 실패"],
    panels: []
  };
}
function is(n, e, t) {
  const { comic: s, width: i, font: r } = n, o = [], a = [], c = `cg-${Date.now().toString(36)}-${++Hi}-${Math.random().toString(36).slice(2, 9)}`, l = (u, d, m) => `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${d}" viewBox="0 0 ${i} ${d}" role="img" aria-label="${R(m)}"><title>${R(m)}</title><rect width="100%" height="100%" fill="#f5f7fb"/><g font-family="${R(r)}" fill="#303341"><text x="24" y="42" font-size="24" font-weight="700">${R(m)}</text>${u}</g></svg>`;
  let h = 68;
  for (const [u, d] of e.entries()) {
    const { markup: m, height: y, hit: f } = d, p = (S) => s.panels[u].diagram ? Wi(
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${y}" viewBox="0 0 ${i} ${y}" style="width:${i}px!important;height:${y}px!important;max-width:none!important;max-height:none!important">${m}</svg>`
      },
      `${c}-${S}-${u}`
    ) : m;
    o.push(
      `<g data-panel="${u}" transform="translate(0 ${h})">${p("whole")}</g>`
    ), a.push({
      index: u,
      svg: l(
        `<g data-panel="${u}" transform="translate(0 68)">${p("panel")}</g>`,
        y + 92,
        `${s.title} · ${u + 1}/${s.panels.length}`
      ),
      width: i,
      height: y + 92,
      diagnostics: [],
      cache: { hits: f ? 1 : 0, misses: f ? 0 : 1, bytes: t.bytes }
    }), h += y + 24;
  }
  return {
    svg: l(o.join(""), h, s.title),
    width: i,
    height: h,
    diagnostics: [],
    panels: a,
    cache: {
      hits: e.filter((u) => u.hit).length,
      misses: e.filter((u) => !u.hit).length,
      bytes: t.bytes
    }
  };
}
function sn(n, e, t, s = "compact") {
  try {
    const i = ts(n, e, s), r = i.comic.panels.findIndex(
      (a) => a.diagram
    );
    if (r >= 0)
      throw new Error(
        `컷 ${r + 1}.다이어그램: 만화그리기비동기(renderComicAsync) 또는 컷그리기비동기(renderPanelsAsync)를 await로 호출하세요.`
      );
    const o = i.comic.panels.map((a) => {
      const c = ns(a, i), l = t.get(c), h = l ?? Qn(
        a,
        i.comic.cast,
        i.width,
        i.font,
        i.format
      );
      return l || t.set(c, h), { ...h, hit: !!l };
    });
    return is(i, o, t);
  } catch (i) {
    return ss(i);
  }
}
async function rn(n, e, t, s = "compact") {
  try {
    const i = ts(n, e, s);
    i.comic.panels.some((o) => o.diagram) && await document.fonts.ready;
    const r = [];
    for (const [o, a] of i.comic.panels.entries()) {
      const c = ns(a, i), l = t.get(c);
      if (l) {
        r.push({ ...l, hit: !0 });
        continue;
      }
      let h;
      if (a.diagram)
        try {
          h = await Yi(a.diagram.source, i.font);
        } catch (d) {
          throw new Error(
            `컷 ${o + 1}.다이어그램: ${d instanceof Error ? d.message : "Mermaid 렌더링 실패"}`
          );
        }
      const u = Qn(
        a,
        i.comic.cast,
        i.width,
        i.font,
        i.format,
        h
      );
      t.set(c, u), r.push({ ...u, hit: !1 });
    }
    return is(i, r, t);
  } catch (i) {
    return ss(i);
  }
}
function rs(n = 2e6) {
  const e = new gs(n);
  return {
    render: (t, s = {}) => sn(t, s, e),
    renderPanels: (t, s = {}) => sn(t, s, e, "phone"),
    renderAsync: (t, s = {}) => rn(t, s, e),
    renderPanelsAsync: (t, s = {}) => rn(t, s, e, "phone"),
    clearCache: () => e.clear()
  };
}
const at = rs(), sr = at.render, ir = at.renderPanels, rr = at.renderAsync, or = at.renderPanelsAsync;
function ar(n, e) {
  const t = URL.createObjectURL(n), s = document.createElement("a");
  s.href = t, s.download = e, s.click(), setTimeout(() => URL.revokeObjectURL(t), 1e3);
}
async function cr(n, e = 1) {
  if (!n.svg || !Number.isFinite(e) || e < 0.5 || e > 4)
    throw new Error("올바른 만화와 0.5~4 배율이 필요합니다.");
  const t = Math.round(n.width * e), s = Math.round(n.height * e);
  if (t > 16384 || s > 16384 || t * s > 32e6)
    throw new Error("PNG 크기가 너무 큽니다. 배율이나 컷 수를 줄이세요.");
  await document.fonts.ready;
  const i = URL.createObjectURL(
    new Blob([n.svg], { type: "image/svg+xml;charset=utf-8" })
  );
  try {
    const r = new Image();
    r.src = i, await r.decode();
    const o = document.createElement("canvas");
    o.width = t, o.height = s;
    const a = o.getContext("2d");
    if (!a) throw new Error("이 브라우저에서는 PNG를 만들 수 없습니다.");
    return a.drawImage(r, 0, 0, t, s), await new Promise(
      (c, l) => o.toBlob(
        (h) => h ? c(h) : l(new Error("PNG 생성에 실패했습니다.")),
        "image/png"
      )
    );
  } finally {
    URL.revokeObjectURL(i);
  }
}
const Ji = `
.comic-figure { margin:20px 0; }
.comic-figure [role="alert"] { color:#b53b45; white-space:pre-wrap; }
.comic-card { box-sizing:border-box; display:flex; align-items:center; gap:18px; width:100%; max-width:540px; padding:16px; border:1px solid #dbe3ee; border-radius:16px; background:white; color:#233044; text-align:left; font:14px/1.6 system-ui,sans-serif; cursor:pointer; }
.comic-card:hover { background:#f8faff; border-color:#4c64e8; }
.comic-card:focus-visible { outline:3px solid #8096ff; outline-offset:3px; }
.comic-card-thumbnail { display:block; flex:0 0 112px; width:112px; height:96px; overflow:hidden; border-radius:10px; background:#f5f7fb; }
.comic-card-thumbnail svg { display:block; width:100%; height:auto; }
.comic-card-copy { display:grid; gap:6px; min-width:0; overflow-wrap:anywhere; }
.comic-card-copy strong { font-size:17px; }
.comic-card-copy span { color:#526fea; font-size:13px; }
@media(max-width:600px) {
  .comic-card { gap:12px; padding:12px; }
  .comic-card-thumbnail { flex-basis:88px; width:88px; height:80px; }
}
`;
function on(n, e = 0) {
  return [...n.querySelectorAll("g[data-panel]")].map((t, s) => {
    if (t.getAttribute("data-panel") !== String(s + e))
      throw new TypeError("만화의 컷 순서가 올바르지 않습니다.");
    const i = t.querySelector("rect");
    if (!i) throw new TypeError("만화에 컷 프레임이 없습니다.");
    let r = new DOMMatrix();
    for (let m = i; m && m !== n.documentElement; m = m.parentElement) {
      let y = new DOMMatrix();
      const f = m.getAttribute("transform") ?? "", p = /(matrix|translate|scale|rotate|skewX|skewY)\(([^)]*)\)/g;
      let S = f;
      for (const $ of f.matchAll(p)) {
        const k = $[2].trim().split(/[\s,]+/).map(Number);
        if (!k.length || k.some((x) => !Number.isFinite(x)))
          throw new TypeError("만화의 컷 변환이 올바르지 않습니다.");
        const [g, v = 0, E = 0] = k;
        switch ($[1]) {
          case "matrix":
            if (k.length !== 6)
              throw new TypeError("올바른 컷 행렬이 필요합니다.");
            y = y.multiply(new DOMMatrix(k));
            break;
          case "translate":
            y = y.translate(g, v);
            break;
          case "scale":
            y = y.scale(g, k[1] ?? g);
            break;
          case "rotate":
            y = y.translate(v, E).rotate(g).translate(-v, -E);
            break;
          case "skewX":
            y = y.skewX(g);
            break;
          case "skewY":
            y = y.skewY(g);
            break;
        }
        S = S.replace($[0], "");
      }
      if (S.trim()) throw new TypeError("지원하지 않는 컷 변환입니다.");
      r = y.multiply(r);
    }
    const o = Number(i.getAttribute("x") ?? 0), a = Number(i.getAttribute("y") ?? 0), c = Number(i.getAttribute("width")), l = Number(i.getAttribute("height"));
    if (![o, a, c, l].every(Number.isFinite) || c <= 0 || l <= 0)
      throw new TypeError("만화의 컷 크기가 올바르지 않습니다.");
    const h = [
      [o, a],
      [o + c, a],
      [o, a + l],
      [o + c, a + l]
    ].map(([m, y]) => r.transformPoint(new DOMPoint(m, y))), u = Math.min(...h.map((m) => m.x)), d = Math.min(...h.map((m) => m.y));
    return {
      x: u,
      y: d,
      width: Math.max(...h.map((m) => m.x)) - u,
      height: Math.max(...h.map((m) => m.y)) - d
    };
  });
}
function Qi(n, e, t, s, i, r, o) {
  let a = 0, c = !1, l = 0;
  const h = () => {
    const b = n.getBoundingClientRect(), L = getComputedStyle(n);
    return {
      x: b.x + n.clientLeft + (parseFloat(L.paddingLeft) || 0),
      y: b.y + n.clientTop + (parseFloat(L.paddingTop) || 0)
    };
  }, u = () => {
    const b = e.getBoundingClientRect(), L = b.width / s;
    return t.map((I) => ({
      x: b.x + I.x * L,
      y: b.y + I.y * L,
      width: I.width * L,
      height: I.height * L
    }));
  }, d = () => {
    i.disabled = a === 0, r.disabled = a === t.length - 1, (document.activeElement === i && i.disabled || document.activeElement === r && r.disabled) && n.focus();
    const b = `${a + 1} / ${t.length}컷`;
    o.textContent !== b && (o.textContent = b);
  }, m = () => {
    if (c) return;
    const b = h(), L = n.clientWidth - (parseFloat(getComputedStyle(n).paddingLeft) || 0) - (parseFloat(getComputedStyle(n).paddingRight) || 0), I = n.clientHeight - (parseFloat(getComputedStyle(n).paddingTop) || 0) - (parseFloat(getComputedStyle(n).paddingBottom) || 0);
    let M = -1, F = 1 / 0;
    u().forEach((_, ct) => {
      const lt = Math.max(
        0,
        Math.min(_.x + _.width, b.x + L) - Math.max(_.x, b.x)
      ) * Math.max(
        0,
        Math.min(_.y + _.height, b.y + I) - Math.max(_.y, b.y)
      ), Vt = Math.hypot(
        Math.max(_.x - b.x, 0, b.x - _.x - _.width),
        Math.max(_.y - b.y, 0, b.y - _.y - _.height)
      );
      (lt > M || lt === M && Vt < F) && (M = lt, F = Vt, a = ct);
    }), d();
  }, y = () => {
    cancelAnimationFrame(l), c = !0;
    const b = n.scrollLeft, L = n.scrollTop;
    l = requestAnimationFrame(() => {
      l = requestAnimationFrame(() => {
        c = !1, (n.scrollLeft !== b || n.scrollTop !== L) && m();
      });
    });
  }, f = (b, L = a) => {
    if (a = Math.max(0, Math.min(t.length - 1, L + b)), a === L) {
      d();
      return;
    }
    const I = u()[a], M = h();
    n.scrollTo({
      left: n.scrollLeft + I.x - M.x,
      top: n.scrollTop + I.y - M.y,
      behavior: "instant"
    }), y(), d();
  }, p = () => f(-1), S = () => f(1), $ = (b) => {
    b.target !== n || b.altKey || b.ctrlKey || b.metaKey || b.shiftKey || (b.key === "ArrowLeft" || b.key === "ArrowRight") && (b.preventDefault(), f(b.key === "ArrowLeft" ? -1 : 1));
  }, k = /* @__PURE__ */ new Set();
  let g, v = !1;
  const E = (b) => {
    if (k.add(b.pointerId), v = !1, k.size !== 1 || !b.isPrimary || b.button !== 0) {
      g = void 0;
      return;
    }
    g = {
      id: b.pointerId,
      x: b.clientX,
      y: b.clientY,
      moved: !1
    };
  }, x = (b) => {
    g?.id === b.pointerId && Math.hypot(b.clientX - g.x, b.clientY - g.y) > 8 && (g.moved = !0);
  }, w = (b) => {
    v = k.size === 1 && g?.id === b.pointerId && !g.moved, k.delete(b.pointerId), g = void 0;
  }, N = (b) => {
    b ? k.delete(b.pointerId) : k.clear(), g = void 0, v = !1;
  }, A = (b) => {
    const L = v;
    if (v = !1, !L || b.detail > 1 || b.ctrlKey || b.metaKey || b.altKey || b.shiftKey || b.target !== e)
      return;
    const I = u(), M = I.findIndex(
      (F) => b.clientX >= F.x && b.clientX <= F.x + F.width && b.clientY >= F.y && b.clientY <= F.y + F.height
    );
    M >= 0 && (n.focus({ preventScroll: !0 }), f(
      b.clientX < I[M].x + I[M].width / 2 ? -1 : 1,
      M
    ));
  }, T = (b) => {
    n.contains(b.target) || N(b);
  };
  return e.draggable = !1, i.addEventListener("click", p), r.addEventListener("click", S), n.addEventListener("scroll", m), n.addEventListener("keydown", $), n.addEventListener("pointerdown", E), n.addEventListener("pointermove", x), n.addEventListener("pointerup", w), n.addEventListener("pointercancel", N), n.addEventListener("click", A), document.addEventListener("pointerup", T), document.addEventListener("pointercancel", T), d(), {
    capturePosition: () => {
      const b = h(), L = e.getBoundingClientRect(), I = L.width / s;
      return { x: (b.x - L.x) / I, y: (b.y - L.y) / I };
    },
    restorePosition: (b) => {
      const L = n.scrollLeft, I = n.scrollTop, M = e.getBoundingClientRect(), F = h(), _ = M.width / s;
      n.scrollTo({
        left: n.scrollLeft + M.x + b.x * _ - F.x,
        top: n.scrollTop + M.y + b.y * _ - F.y,
        behavior: "instant"
      }), (n.scrollLeft !== L || n.scrollTop !== I) && y(), d();
    },
    reset: () => {
      cancelAnimationFrame(l), c = !1, a = 0, N(), d();
    },
    dispose: () => {
      cancelAnimationFrame(l), i.removeEventListener("click", p), r.removeEventListener("click", S), n.removeEventListener("scroll", m), n.removeEventListener("keydown", $), n.removeEventListener("pointerdown", E), n.removeEventListener("pointermove", x), n.removeEventListener("pointerup", w), n.removeEventListener("pointercancel", N), n.removeEventListener("click", A), document.removeEventListener("pointerup", T), document.removeEventListener("pointercancel", T), N();
    }
  };
}
const Xi = `
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
`, an = "http://www.w3.org/2000/svg", cn = /^#[\p{L}_][\p{L}\p{N}_:.-]*$/u, Zi = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "filter",
  "mask",
  "clip-path",
  "marker-start",
  "marker-mid",
  "marker-end",
  "cursor"
]), er = /* @__PURE__ */ new Set([
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
function ln(n) {
  if (!n || typeof n.svg != "string" || !n.svg || n.svg.length > 64e6 || !Number.isFinite(n.width) || n.width <= 0 || n.width > 1e6 || !Number.isFinite(n.height) || n.height <= 0 || n.height > 1e6 || n.diagnostics !== void 0 && (!Array.isArray(n.diagnostics) || n.diagnostics.length))
    throw new TypeError("완성된 코믹젠 렌더 결과가 필요합니다.");
  if (/<!DOCTYPE|<!ENTITY|<\?/i.test(n.svg))
    throw new TypeError("정적 코믹젠 SVG만 뷰어에 전달하세요.");
  const e = new DOMParser().parseFromString(n.svg, "image/svg+xml"), t = e.documentElement, s = (t.getAttribute("viewBox") ?? `0 0 ${n.width} ${n.height}`).trim().split(/[\s,]+/).map(Number);
  if (t.localName !== "svg" || t.namespaceURI !== an || e.querySelector("parsererror") || s.length !== 4 || s[0] !== 0 || s[1] !== 0 || s[2] !== n.width || s[3] !== n.height || Number(t.getAttribute("width")) !== n.width || Number(t.getAttribute("height")) !== n.height)
    throw new TypeError("만화 SVG와 렌더 결과의 크기가 일치해야 합니다.");
  for (const i of [t, ...t.querySelectorAll("*")]) {
    if (i.namespaceURI !== an || !er.has(i.localName))
      throw new TypeError("외부 리소스나 실행 가능한 SVG는 지원하지 않습니다.");
    for (const r of i.attributes) {
      const o = r.localName.toLowerCase(), a = r.value;
      if (o.startsWith("on") || o === "base" && r.namespaceURI === "http://www.w3.org/XML/1998/namespace" || o === "href" && !cn.test(a))
        throw new TypeError(
          "외부 링크나 이벤트가 포함된 SVG는 지원하지 않습니다."
        );
      if (o === "style" && /@|javascript\s*:|vbscript\s*:|expression\s*\(|[\\<>]/i.test(a))
        throw new TypeError("정적 코믹젠 SVG 스타일만 지원합니다.");
      if (Zi.has(o) && /[\\<>@]/.test(a))
        throw new TypeError("정적 코믹젠 SVG 색상과 참조만 지원합니다.");
      for (const c of a.matchAll(/url\s*\(([^)]*)\)/gi)) {
        const l = c[1].trim().replace(/^(['"])(.*)\1$/, "$2");
        if (!cn.test(l))
          throw new TypeError("SVG의 외부 리소스는 지원하지 않습니다.");
      }
    }
  }
  return e;
}
function os(n) {
  const e = ln(n);
  if (!Array.isArray(n.panels) || n.panels.length < 1 || n.panels.length > 30)
    throw new TypeError("만화에는 실제 렌더된 1~30개의 컷이 필요합니다.");
  const t = [], s = n.panels.map((a, c) => {
    if (a.index !== c)
      throw new TypeError("만화의 개별 컷 순서가 일치해야 합니다.");
    const l = on(ln(a), c);
    if (l.length !== 1 || ![l[0].x, l[0].y, l[0].width, l[0].height].every(
      Number.isFinite
    ) || l[0].width <= 0 || l[0].height <= 0 || l[0].x < 0 || l[0].y < 0 || l[0].x + l[0].width > a.width + 1 || l[0].y + l[0].height > a.height + 1)
      throw new TypeError("개별 컷 SVG에는 한 개의 컷 프레임이 필요합니다.");
    return t.push(l[0]), { ...a };
  }), i = on(e);
  if (i.length !== s.length || i.some(
    (a) => ![a.x, a.y, a.width, a.height].every(Number.isFinite) || a.width <= 0 || a.height <= 0 || a.x < 0 || a.y < 0 || a.x + a.width > n.width + 1 || a.y + a.height > n.height + 1
  ))
    throw new TypeError("만화의 컷 프레임과 렌더 결과가 일치해야 합니다.");
  const r = e.documentElement.getAttribute("aria-label") ?? e.documentElement.querySelector("title")?.textContent ?? "만화", o = s.map((a, c) => {
    const l = i[c], h = t[c], u = Math.max(
      l.width / h.width,
      l.height / h.height
    );
    return { width: a.width * u, height: a.height * u };
  });
  return {
    result: { ...n, panels: s },
    title: r,
    bounds: i,
    panelWidth: Math.max(...o.map((a) => a.width)),
    panelHeight: Math.max(...o.map((a) => a.height))
  };
}
const yt = /* @__PURE__ */ Symbol.for("comic-gen.viewer.document-state.v1");
function Ut() {
  const n = document;
  return n[yt] || Object.defineProperty(n, yt, {
    value: { bodyLocks: /* @__PURE__ */ new WeakMap(), nextId: 0 }
  }), n[yt];
}
function as() {
  const n = Ut();
  let e = n.styles;
  if (e)
    e.element.isConnected || document.head.append(e.element);
  else {
    const s = document.createElement("style");
    s.dataset.comicGenViewerStyles = "", s.textContent = Xi, document.head.append(s), e = { element: s, count: 0 }, n.styles = e;
  }
  e.count++;
  let t = !1;
  return () => {
    t || (t = !0, --e.count === 0 && (e.element.remove(), n.styles = void 0));
  };
}
function tr() {
  const n = Ut().bodyLocks, e = document.body;
  let t = n.get(e);
  t || (t = {
    count: 0,
    value: e.style.getPropertyValue("overflow"),
    priority: e.style.getPropertyPriority("overflow")
  }, n.set(e, t), e.style.setProperty("overflow", "hidden", "important")), t.count++;
  let s = !1;
  return () => {
    s || (s = !0, --t.count === 0 && (t.value ? e.style.setProperty("overflow", t.value, t.priority) : e.style.removeProperty("overflow"), n.delete(e)));
  };
}
function cs(n, e, t, s) {
  const i = document.createElement("img"), r = URL.createObjectURL(new Blob([n], { type: "image/svg+xml" }));
  Object.assign(i, {
    src: r,
    width: e,
    height: t,
    alt: s,
    decoding: "async",
    draggable: !1
  });
  let o = !1;
  return {
    image: i,
    revoke: () => {
      o || (o = !0, URL.revokeObjectURL(r));
    }
  };
}
function ls() {
  let n, e, t, s, i, r, o, a, c, l, h, u, d, m, y, f, p = !1;
  const S = () => {
    if (!n?.open || !l) return;
    const w = h?.capturePosition();
    e.dataset.preventOverflow = String(r.checked);
    const N = l.result;
    let A = N.width * Number(i.value);
    if (r.checked) {
      const T = getComputedStyle(e), b = Math.max(
        0,
        e.clientWidth - (parseFloat(T.paddingLeft) || 0) - (parseFloat(T.paddingRight) || 0)
      ), L = Math.max(
        0,
        e.clientHeight - (parseFloat(T.paddingTop) || 0) - (parseFloat(T.paddingBottom) || 0)
      );
      A = Math.min(
        A,
        b * N.width / l.panelWidth,
        L * N.width / l.panelHeight
      );
    }
    t.style.width = `${Math.max(0, A)}px`, w && Number.isFinite(w.x) && Number.isFinite(w.y) && h?.restorePosition(w);
  }, $ = () => {
    h?.dispose(), h = void 0, d?.(), d = void 0, t?.replaceChildren(), l = void 0, m?.(), m = void 0;
    const w = f;
    f = void 0;
    const N = [
      ...document.querySelectorAll("dialog[open]")
    ].find((A) => A !== n);
    w?.isConnected && (!N || N.contains(w)) && w.focus({ preventScroll: !0 });
  }, k = () => {
    n?.open && n.close(), $();
  }, g = (w) => {
    w.preventDefault(), k();
  }, v = () => {
    n?.open || $();
  }, E = (w) => {
    if (w.key !== "Tab" || !n?.open) return;
    const N = [
      ...n.querySelectorAll(
        "button:not(:disabled), input, select, [tabindex='0']"
      )
    ], A = N[0], T = N[N.length - 1];
    (!w.shiftKey && document.activeElement === T || w.shiftKey && document.activeElement === A) && (w.preventDefault(), (w.shiftKey ? T : A).focus());
  }, x = () => {
    if (n) return;
    y = as();
    const w = `comic-gen-viewer-${++Ut().nextId}`;
    n = document.createElement("dialog"), n.className = "comic-viewer", n.dataset.comicGenViewer = "", n.setAttribute("aria-labelledby", `${w}-title`), n.setAttribute("aria-describedby", `${w}-help`), n.innerHTML = `<div class="comic-viewer-toolbar"><h2 class="comic-viewer-title" id="${w}-title"></h2><button type="button" autofocus>닫기</button><div class="comic-viewer-controls"><label class="comic-viewer-checkbox"><input type="checkbox" checked>화면 넘침 방지</label><label>보기 크기 <select><option value="1">100%</option><option value="1.5">150%</option><option value="2">200%</option></select></label><div class="comic-viewer-navigation"><button type="button" class="comic-previous" aria-label="이전 컷">←</button><span class="comic-position" role="status" aria-live="polite"></span><button type="button" class="comic-next" aria-label="다음 컷">→</button></div></div></div><p class="comic-viewer-help" id="${w}-help">화면 넘침 방지는 한 컷의 너비·높이를 화면에 맞춥니다. 다음 컷은 아래로 스크롤해 읽습니다. 컷 왼쪽은 이전, 오른쪽은 다음 컷입니다. 읽기 영역에서 ←/→ 키로도 이동합니다.</p><div class="comic-viewer-viewport" tabindex="0" role="region" aria-label="만화 읽기 영역"><div class="comic-viewer-artwork"></div></div>`, s = n.querySelector("h2"), e = n.querySelector(".comic-viewer-viewport"), t = n.querySelector(".comic-viewer-artwork"), i = n.querySelector("select"), r = n.querySelector('input[type="checkbox"]'), o = n.querySelector(".comic-previous"), a = n.querySelector(".comic-next"), c = n.querySelector(".comic-position"), i.addEventListener("change", S), r.addEventListener("change", S), n.querySelector("button").addEventListener("click", k), n.addEventListener("cancel", g), n.addEventListener("close", v), n.addEventListener("keydown", E), document.body.append(n), u = new ResizeObserver(S), u.observe(e);
  };
  return {
    get isOpen() {
      return !!n?.open;
    },
    open: (w, N = {}) => {
      if (p) throw new Error("폐기한 만화 뷰어는 다시 열 수 없습니다.");
      const A = os(w), T = N.trigger ?? (n?.open ? f : document.activeElement instanceof HTMLElement ? document.activeElement : void 0);
      x(), h?.dispose(), d?.(), l = A, f = T, s.textContent = A.title, i.value = "1", r.checked = !0;
      const b = cs(
        A.result.svg,
        A.result.width,
        A.result.height,
        A.title
      );
      if (d = b.revoke, t.replaceChildren(b.image), h = Qi(
        e,
        b.image,
        A.bounds,
        A.result.width,
        o,
        a,
        c
      ), !n.open) {
        m = tr();
        try {
          n.showModal();
        } catch (L) {
          throw $(), L;
        }
      }
      S(), e.scrollTo(0, 0), h.reset(), n.querySelector("button").focus({ preventScroll: !0 });
    },
    close: k,
    destroy: () => {
      p || (p = !0, k(), u?.disconnect(), n && (i.removeEventListener("change", S), r.removeEventListener("change", S), n.querySelector("button").removeEventListener("click", k), n.removeEventListener("cancel", g), n.removeEventListener("close", v), n.removeEventListener("keydown", E), n.remove()), y?.(), y = void 0);
    }
  };
}
function lr(n, e) {
  const t = os(e), s = as(), i = ls(), r = document.createElement("button");
  r.type = "button", r.className = "comic-card", r.dataset.comicGenCard = "", r.setAttribute("aria-haspopup", "dialog"), r.setAttribute("aria-label", `${t.title} · 만화 읽기`);
  const o = document.createElement("span");
  o.className = "comic-card-thumbnail", o.setAttribute("aria-hidden", "true");
  const a = t.result.panels[0], c = cs(
    a.svg,
    a.width,
    a.height,
    `${t.title} · 1/${t.result.panels.length}`
  );
  o.append(c.image);
  const l = document.createElement("span");
  l.className = "comic-card-copy";
  const h = document.createElement("strong");
  h.textContent = t.title;
  const u = document.createElement("span");
  u.textContent = `${t.result.panels.length}컷 · 만화 읽기 ↗`, l.append(h, u), r.append(o, l);
  const d = () => i.open(t.result, { trigger: r });
  r.addEventListener("click", d), n.replaceChildren(r);
  let m = !1;
  return () => {
    m || (m = !0, r.removeEventListener("click", d), i.destroy(), c.revoke(), r.remove(), s());
  };
}
const fn = /* @__PURE__ */ new WeakMap(), fs = rs(), Nt = /* @__PURE__ */ new WeakMap(), Ie = ls();
let Ce;
function us(n) {
  n.result?.svg && (Ce = n, Ie.open(n.result, { trigger: n.button }));
}
function hs(n) {
  if (!document.getElementById("comic-gen-embed-styles")) {
    const s = document.createElement("style");
    s.id = "comic-gen-embed-styles", s.textContent = Ji, document.head.append(s);
  }
  const e = 'pre[language="comic-gen"], pre[data-comic], pre:has(code.language-comic), pre:has(code.language-comic-gen)', t = [...n.querySelectorAll(e)];
  return n instanceof HTMLElement && n.matches(e) && t.unshift(n), t;
}
function At(n) {
  return (n.querySelector("code") ?? n).textContent ?? "";
}
function ds(n) {
  let e = fn.get(n);
  if (!e) {
    const t = document.createElement("figure");
    t.className = "comic-figure";
    const s = document.createElement("button");
    s.type = "button", s.className = "comic-card", s.setAttribute("aria-haspopup", "dialog");
    const i = document.createElement("span");
    i.className = "comic-card-thumbnail", i.setAttribute("aria-hidden", "true");
    const r = document.createElement("span");
    r.className = "comic-card-copy";
    const o = document.createElement("strong"), a = document.createElement("span");
    r.append(o, a), s.append(i, r), e = { figure: t, button: s, thumbnail: i, title: o, caption: a };
    const c = e;
    s.addEventListener("click", () => us(c)), fn.set(n, e);
  }
  return n.after(e.figure), n.hidden = !0, e;
}
function ms(n, e) {
  if (n.result = e, n.figure.removeAttribute("aria-busy"), n.button.disabled = !1, e.svg) {
    const t = new DOMParser().parseFromString(e.svg, "image/svg+xml");
    n.title.textContent = t.documentElement.getAttribute("aria-label"), n.caption.textContent = `${e.panels.length}컷 · 만화 읽기 ↗`, n.button.setAttribute(
      "aria-label",
      `${n.title.textContent} · 만화 읽기`
    ), n.thumbnail.innerHTML = e.panels[0].svg, n.figure.replaceChildren(n.button), Ce === n && Ie.isOpen && us(n);
  } else {
    Ce === n && Ie.close();
    const t = document.createElement("p");
    t.setAttribute("role", "alert"), t.textContent = e.diagnostics.join(`
`), n.figure.replaceChildren(t);
  }
}
function ps(n) {
  const e = (Nt.get(n) ?? 0) + 1;
  return Nt.set(n, e), e;
}
function fr(n = document, e = {}) {
  return hs(n).map((t) => {
    ps(t);
    const s = fs.render(At(t), e);
    return ms(ds(t), s), s;
  });
}
async function ur(n = document, e = {}) {
  return Promise.all(
    hs(n).map(async (t) => {
      const s = At(t), i = ps(t), r = t.isConnected, o = ds(t);
      if (o.figure.setAttribute("aria-busy", "true"), o.button.disabled = !0, !o.result) {
        const c = document.createElement("p");
        c.setAttribute("role", "status"), c.textContent = "만화를 그리는 중…", o.figure.replaceChildren(c);
      }
      const a = await fs.renderAsync(s, e);
      if (Nt.get(t) !== i) return a;
      if (r && !t.isConnected)
        return o.figure.remove(), Ce === o && Ie.close(), a;
      if (At(t) !== s) {
        o.figure.removeAttribute("aria-busy"), o.result = void 0, Ce === o && Ie.close();
        const c = document.createElement("p");
        return c.setAttribute("role", "status"), c.textContent = "코드가 바뀌었어요. 다시 그리기를 호출하세요.", o.figure.replaceChildren(c), a;
      }
      return ms(o, a), a;
    })
  );
}
export {
  nr as assetVersion,
  ls as createComicViewer,
  rs as createRenderer,
  ar as downloadBlob,
  cr as exportPng,
  lr as mountComicCard,
  fr as renderCodeBlocks,
  ur as renderCodeBlocksAsync,
  sr as renderComic,
  rr as renderComicAsync,
  ir as renderPanels,
  or as renderPanelsAsync,
  rs as 렌더러만들기,
  sr as 만화그리기,
  rr as 만화그리기비동기,
  ls as 만화뷰어만들기,
  lr as 만화카드붙이기,
  Ai as 문법값,
  W as 문법항목,
  ir as 컷그리기,
  or as 컷그리기비동기,
  fr as 코드블록그리기,
  ur as 코드블록그리기비동기
};
