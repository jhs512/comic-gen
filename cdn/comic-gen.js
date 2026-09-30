const Un = "1", Pt = {
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
}, Dt = {
  neutral: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-10 17q10 7 20 0" fill="none"/>',
  happy: '<path d="M-25 -2q8 -12 16 0m18 0q8 -12 16 0M-13 16q13 18 26 0" fill="none"/>',
  confused: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-24 -17l13 -5m21 1 14 4M-8 18q8 -6 16 0" fill="none"/>',
  sad: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-12 23q12 -14 24 0" fill="none"/>',
  angry: '<path d="M-25 -16l15 6m20 0 15 -6M-10 20h20" fill="none"/><circle cx="-17" cy="-1" r="3"/><circle cx="17" cy="-1" r="3"/>'
}, qt = {
  wave: '<g data-hand="wave"><circle cx="-65" cy="-22" r="12" fill="white"/><path d="M-77 -42l-4 -8m15 2v-10m13 17 5 -7" fill="none"/></g>',
  point: '<g data-hand="point"><circle cx="-65" cy="0" r="11" fill="white"/><path d="M-77 0h-13" fill="none"/></g>'
}, Ke = {
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
class Es {
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
const lt = /* @__PURE__ */ Symbol.for("yaml.alias"), st = /* @__PURE__ */ Symbol.for("yaml.document"), G = /* @__PURE__ */ Symbol.for("yaml.map"), Rt = /* @__PURE__ */ Symbol.for("yaml.pair"), F = /* @__PURE__ */ Symbol.for("yaml.scalar"), fe = /* @__PURE__ */ Symbol.for("yaml.seq"), D = /* @__PURE__ */ Symbol.for("yaml.node.type"), ue = (s) => !!s && typeof s == "object" && s[D] === lt, Re = (s) => !!s && typeof s == "object" && s[D] === st, $e = (s) => !!s && typeof s == "object" && s[D] === G, v = (s) => !!s && typeof s == "object" && s[D] === Rt, A = (s) => !!s && typeof s == "object" && s[D] === F, Ne = (s) => !!s && typeof s == "object" && s[D] === fe;
function T(s) {
  if (s && typeof s == "object")
    switch (s[D]) {
      case G:
      case fe:
        return !0;
    }
  return !1;
}
function L(s) {
  if (s && typeof s == "object")
    switch (s[D]) {
      case lt:
      case G:
      case F:
      case fe:
        return !0;
    }
  return !1;
}
const Ut = (s) => (A(s) || T(s)) && !!s.anchor, W = /* @__PURE__ */ Symbol("break visit"), As = /* @__PURE__ */ Symbol("skip children"), be = /* @__PURE__ */ Symbol("remove node");
function he(s, e) {
  const t = Is(e);
  Re(s) ? ne(null, s.contents, t, Object.freeze([s])) === be && (s.contents = null) : ne(null, s, t, Object.freeze([]));
}
he.BREAK = W;
he.SKIP = As;
he.REMOVE = be;
function ne(s, e, t, n) {
  const i = Ts(s, e, t, n);
  if (L(i) || v(i))
    return Ls(s, n, i), ne(s, i, t, n);
  if (typeof i != "symbol") {
    if (T(e)) {
      n = Object.freeze(n.concat(e));
      for (let r = 0; r < e.items.length; ++r) {
        const o = ne(r, e.items[r], t, n);
        if (typeof o == "number")
          r = o - 1;
        else {
          if (o === W)
            return W;
          o === be && (e.items.splice(r, 1), r -= 1);
        }
      }
    } else if (v(e)) {
      n = Object.freeze(n.concat(e));
      const r = ne("key", e.key, t, n);
      if (r === W)
        return W;
      r === be && (e.key = null);
      const o = ne("value", e.value, t, n);
      if (o === W)
        return W;
      o === be && (e.value = null);
    }
  }
  return i;
}
function Is(s) {
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
function Ts(s, e, t, n) {
  if (typeof t == "function")
    return t(s, e, n);
  if ($e(e))
    return t.Map?.(s, e, n);
  if (Ne(e))
    return t.Seq?.(s, e, n);
  if (v(e))
    return t.Pair?.(s, e, n);
  if (A(e))
    return t.Scalar?.(s, e, n);
  if (ue(e))
    return t.Alias?.(s, e, n);
}
function Ls(s, e, t) {
  const n = e[e.length - 1];
  if (T(n))
    n.items[s] = t;
  else if (v(n))
    s === "key" ? n.key = t : n.value = t;
  else if (Re(n))
    n.contents = t;
  else {
    const i = ue(n) ? "alias" : "scalar";
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
}, Cs = (s) => s.replace(/[!,[\]{}]/g, (e) => vs[e]);
class M {
  constructor(e, t) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, M.defaultYaml, e), this.tags = Object.assign({}, M.defaultTags, t);
  }
  clone() {
    const e = new M(this.yaml, this.tags);
    return e.docStart = this.docStart, e;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const e = new M(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: M.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, M.defaultTags);
        break;
    }
    return e;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(e, t) {
    this.atNextDocument && (this.yaml = { explicit: M.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, M.defaultTags), this.atNextDocument = !1);
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
        return t + Cs(e.substring(n.length));
    return e[0] === "!" ? e : `!<${e}>`;
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], n = Object.entries(this.tags);
    let i;
    if (e && n.length > 0 && L(e.contents)) {
      const r = {};
      he(e.contents, (o, a) => {
        L(a) && a.tag && (r[a.tag] = !0);
      }), i = Object.keys(r);
    } else
      i = [];
    for (const [r, o] of n)
      r === "!!" && o === "tag:yaml.org,2002:" || (!e || i.some((a) => a.startsWith(o))) && t.push(`%TAG ${r} ${o}`);
    return t.join(`
`);
  }
}
M.defaultYaml = { explicit: !1, version: "1.2" };
M.defaultTags = { "!!": "tag:yaml.org,2002:" };
function Ft(s) {
  if (/[\x00-\x19\s,[\]{}]/.test(s)) {
    const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(s)}`;
    throw new Error(t);
  }
  return !0;
}
function xt(s) {
  const e = /* @__PURE__ */ new Set();
  return he(s, {
    Value(t, n) {
      n.anchor && e.add(n.anchor);
    }
  }), e;
}
function Vt(s, e) {
  for (let t = 1; ; ++t) {
    const n = `${s}${t}`;
    if (!e.has(n))
      return n;
  }
}
function _s(s, e) {
  const t = [], n = /* @__PURE__ */ new Map();
  let i = null;
  return {
    onAnchor: (r) => {
      t.push(r), i ?? (i = xt(s));
      const o = Vt(e, i);
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
        if (typeof o == "object" && o.anchor && (A(o.node) || T(o.node)))
          o.node.anchor = o.anchor;
        else {
          const a = new Error("Failed to resolve repeated object (this should not happen)");
          throw a.source = r, a;
        }
      }
    },
    sourceObjects: n
  };
}
function ie(s, e, t, n) {
  if (n && typeof n == "object")
    if (Array.isArray(n))
      for (let i = 0, r = n.length; i < r; ++i) {
        const o = n[i], a = ie(s, n, String(i), o);
        a === void 0 ? delete n[i] : a !== o && (n[i] = a);
      }
    else if (n instanceof Map)
      for (const i of Array.from(n.keys())) {
        const r = n.get(i), o = ie(s, n, i, r);
        o === void 0 ? n.delete(i) : o !== r && n.set(i, o);
      }
    else if (n instanceof Set)
      for (const i of Array.from(n)) {
        const r = ie(s, n, i, i);
        r === void 0 ? n.delete(i) : r !== i && (n.delete(i), n.add(r));
      }
    else
      for (const [i, r] of Object.entries(n)) {
        const o = ie(s, n, i, r);
        o === void 0 ? delete n[i] : o !== r && (n[i] = o);
      }
  return s.call(e, t, n);
}
function P(s, e, t) {
  if (Array.isArray(s))
    return s.map((n, i) => P(n, String(i), t));
  if (s && typeof s.toJSON == "function") {
    if (!t || !Ut(s))
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
class ct {
  constructor(e) {
    Object.defineProperty(this, D, { value: e });
  }
  /** Create a copy of this node.  */
  clone() {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (e.range = this.range.slice()), e;
  }
  /** A plain JavaScript representation of this node. */
  toJS(e, { mapAsMap: t, maxAliasCount: n, onAnchor: i, reviver: r } = {}) {
    if (!Re(e))
      throw new TypeError("A document argument is required");
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: e,
      keep: !0,
      mapAsMap: t === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof n == "number" ? n : 100
    }, a = P(this, "", o);
    if (typeof i == "function")
      for (const { count: l, res: c } of o.anchors.values())
        i(c, l);
    return typeof r == "function" ? ie(r, { "": a }, "", a) : a;
  }
}
class ft extends ct {
  constructor(e) {
    super(lt), this.source = e, Object.defineProperty(this, "tag", {
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
    t?.aliasResolveCache ? n = t.aliasResolveCache : (n = [], he(e, {
      Node: (r, o) => {
        (ue(o) || Ut(o)) && n.push(o);
      }
    }), t && (t.aliasResolveCache = n));
    let i;
    for (const r of n) {
      if (r === this)
        break;
      r.anchor === this.source && (i = r);
    }
    if (i && t) {
      const { anchors: r, doc: o, maxAliasCount: a } = t;
      let l = r.get(i);
      if (l || (P(i, null, t), l = r.get(i)), l?.res === void 0) {
        const c = "This should not happen: Alias anchor was not resolved?";
        throw new ReferenceError(c);
      }
      if (a >= 0 && (l.count += 1, l.aliasCount === 0 && (l.aliasCount = Me(o, i, r)), l.count * l.aliasCount > a)) {
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
      if (Ft(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
        const r = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(r);
      }
      if (e.implicitKey)
        return `${i} `;
    }
    return i;
  }
}
function Me(s, e, t) {
  if (ue(e)) {
    const n = e.resolve(s), i = t && n && t.get(n);
    return i ? i.count * i.aliasCount : 0;
  } else if (T(e)) {
    let n = 0;
    for (const i of e.items) {
      const r = Me(s, i, t);
      r > n && (n = r);
    }
    return n;
  } else if (v(e)) {
    const n = Me(s, e.key, t), i = Me(s, e.value, t);
    return Math.max(n, i);
  }
  return 1;
}
const Yt = (s) => !s || typeof s != "function" && typeof s != "object";
class O extends ct {
  constructor(e) {
    super(F), this.value = e;
  }
  toJSON(e, t) {
    return t?.keep ? this.value : P(this.value, e, t);
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
const Ms = "tag:yaml.org,2002:";
function Bs(s, e, t) {
  if (e) {
    const n = t.filter((r) => r.tag === e), i = n.find((r) => !r.format) ?? n[0];
    if (!i)
      throw new Error(`Tag ${e} not found`);
    return i;
  }
  return t.find((n) => n.identify?.(s) && !n.format);
}
function ke(s, e, t) {
  if (Re(s) && (s = s.contents), L(s))
    return s;
  if (v(s)) {
    const h = t.schema[G].createNode?.(t.schema, null, t);
    return h.items.push(s), h;
  }
  (s instanceof String || s instanceof Number || s instanceof Boolean || typeof BigInt < "u" && s instanceof BigInt) && (s = s.valueOf());
  const { aliasDuplicateObjects: n, onAnchor: i, onTagObj: r, schema: o, sourceObjects: a } = t;
  let l;
  if (n && s && typeof s == "object") {
    if (l = a.get(s), l)
      return l.anchor ?? (l.anchor = i(s)), new ft(l.anchor);
    l = { anchor: null, node: null }, a.set(s, l);
  }
  e?.startsWith("!!") && (e = Ms + e.slice(2));
  let c = Bs(s, e, o.tags);
  if (!c) {
    if (s && typeof s.toJSON == "function" && (s = s.toJSON()), !s || typeof s != "object") {
      const h = new O(s);
      return l && (l.node = h), h;
    }
    c = s instanceof Map ? o[G] : Symbol.iterator in Object(s) ? o[fe] : o[G];
  }
  r && (r(c), delete t.onTagObj);
  const m = c?.createNode ? c.createNode(t.schema, s, t) : typeof c?.nodeClass?.from == "function" ? c.nodeClass.from(t.schema, s, t) : new O(s);
  return e ? m.tag = e : c.default || (m.tag = c.tag), l && (l.node = m), m;
}
function Pe(s, e, t) {
  let n = t;
  for (let i = e.length - 1; i >= 0; --i) {
    const r = e[i];
    if (typeof r == "number" && Number.isInteger(r) && r >= 0) {
      const o = [];
      o[r] = n, n = o;
    } else
      n = /* @__PURE__ */ new Map([[r, n]]);
  }
  return ke(n, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: s,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const ge = (s) => s == null || typeof s == "object" && !!s[Symbol.iterator]().next().done;
class Jt extends ct {
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
    return e && (t.schema = e), t.items = t.items.map((n) => L(n) || v(n) ? n.clone(e) : n), this.range && (t.range = this.range.slice()), t;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(e, t) {
    if (ge(e))
      this.add(t);
    else {
      const [n, ...i] = e, r = this.get(n, !0);
      if (T(r))
        r.addIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(n, Pe(this.schema, i, t));
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
    if (T(i))
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
    return i.length === 0 ? !t && A(r) ? r.value : r : T(r) ? r.getIn(i, t) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!v(t))
        return !1;
      const n = t.value;
      return n == null || e && A(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
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
    return T(i) ? i.hasIn(n) : !1;
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
      if (T(r))
        r.setIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(n, Pe(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`);
    }
  }
}
const js = (s) => s.replace(/^(?!$)(?: $)?/gm, "#");
function x(s, e) {
  return /^\n+$/.test(s) ? s.substring(1) : e ? s.replace(/^(?! *$)/gm, e) : s;
}
const Q = (s, e, t) => s.endsWith(`
`) ? x(t, e) : t.includes(`
`) ? `
` + x(t, e) : (s.endsWith(" ") ? "" : " ") + t, Gt = "flow", nt = "block", Be = "quoted";
function Ue(s, e, t = "flow", { indentAtStart: n, lineWidth: i = 80, minContentWidth: r = 20, onFold: o, onOverflow: a } = {}) {
  if (!i || i < 0)
    return s;
  i < r && (r = 0);
  const l = Math.max(1 + r, 1 + i - e.length);
  if (s.length <= l)
    return s;
  const c = [], m = {};
  let h = i - e.length;
  typeof n == "number" && (n > i - Math.max(2, r) ? c.push(0) : h = i - n);
  let u, p, y = !1, d = -1, f = -1, g = -1;
  t === nt && (d = Ot(s, d, e.length), d !== -1 && (h = d + l));
  for (let k; k = s[d += 1]; ) {
    if (t === Be && k === "\\") {
      switch (f = d, s[d + 1]) {
        case "x":
          d += 3;
          break;
        case "u":
          d += 5;
          break;
        case "U":
          d += 9;
          break;
        default:
          d += 1;
      }
      g = d;
    }
    if (k === `
`)
      t === nt && (d = Ot(s, d, e.length)), h = d + e.length + l, u = void 0;
    else {
      if (k === " " && p && p !== " " && p !== `
` && p !== "	") {
        const S = s[d + 1];
        S && S !== " " && S !== `
` && S !== "	" && (u = d);
      }
      if (d >= h)
        if (u)
          c.push(u), h = u + l, u = void 0;
        else if (t === Be) {
          for (; p === " " || p === "	"; )
            p = k, k = s[d += 1], y = !0;
          const S = d > g + 1 ? d - 2 : f - 1;
          if (m[S])
            return s;
          c.push(S), m[S] = !0, h = S + l, u = void 0;
        } else
          y = !0;
    }
    p = k;
  }
  if (y && a && a(), c.length === 0)
    return s;
  o && o();
  let w = s.slice(0, c[0]);
  for (let k = 0; k < c.length; ++k) {
    const S = c[k], $ = c[k + 1] || s.length;
    S === 0 ? w = `
${e}${s.slice(0, $)}` : (t === Be && m[S] && (w += `${s[S]}\\`), w += `
${e}${s.slice(S + 1, $)}`);
  }
  return w;
}
function Ot(s, e, t) {
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
const Fe = (s, e) => ({
  indentAtStart: e ? s.indent.length : s.indentAtStart,
  lineWidth: s.options.lineWidth,
  minContentWidth: s.options.minContentWidth
}), xe = (s) => /^(%|---|\.\.\.)/m.test(s);
function Ks(s, e, t) {
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
function we(s, e) {
  const t = JSON.stringify(s);
  if (e.options.doubleQuotedAsJSON)
    return t;
  const { implicitKey: n } = e, i = e.options.doubleQuotedMinMultiLineLength, r = e.indent || (xe(s) ? "  " : "");
  let o = "", a = 0;
  for (let l = 0, c = t[l]; c; c = t[++l])
    if (c === " " && t[l + 1] === "\\" && t[l + 2] === "n" && (o += t.slice(a, l) + "\\ ", l += 1, a = l, c = "\\"), c === "\\")
      switch (t[l + 1]) {
        case "u":
          {
            o += t.slice(a, l);
            const m = t.substr(l + 2, 4);
            switch (m) {
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
                m.substr(0, 2) === "00" ? o += "\\x" + m.substr(2) : o += t.substr(l, 6);
            }
            l += 5, a = l + 1;
          }
          break;
        case "n":
          if (n || t[l + 2] === '"' || t.length < i)
            l += 1;
          else {
            for (o += t.slice(a, l) + `

`; t[l + 2] === "\\" && t[l + 3] === "n" && t[l + 4] !== '"'; )
              o += `
`, l += 2;
            o += r, t[l + 2] === " " && (o += "\\"), l += 1, a = l + 1;
          }
          break;
        default:
          l += 1;
      }
  return o = a ? o + t.slice(a) : t, n ? o : Ue(o, r, Be, Fe(e, !1));
}
function it(s, e) {
  if (e.options.singleQuote === !1 || e.implicitKey && s.includes(`
`) || /[ \t]\n|\n[ \t]/.test(s))
    return we(s, e);
  const t = e.indent || (xe(s) ? "  " : ""), n = "'" + s.replace(/'/g, "''").replace(/\n+/g, `$&
${t}`) + "'";
  return e.implicitKey ? n : Ue(n, t, Gt, Fe(e, !1));
}
function re(s, e) {
  const { singleQuote: t } = e.options;
  let n;
  if (t === !1)
    n = we;
  else {
    const i = s.includes('"'), r = s.includes("'");
    i && !r ? n = it : r && !i ? n = we : n = t ? it : we;
  }
  return n(s, e);
}
let rt;
try {
  rt = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  rt = /\n+(?!\n|$)/g;
}
function je({ comment: s, type: e, value: t }, n, i, r) {
  const { blockQuote: o, commentString: a, lineWidth: l } = n.options;
  if (!o || /\n[\t ]+$/.test(t))
    return re(t, n);
  const c = n.indent || (n.forceBlockIndent || xe(t) ? "  " : ""), m = o === "literal" ? !0 : o === "folded" || e === O.BLOCK_FOLDED ? !1 : e === O.BLOCK_LITERAL ? !0 : !Ks(t, l, c.length);
  if (!t)
    return m ? `|
` : `>
`;
  let h, u;
  for (u = t.length; u > 0; --u) {
    const $ = t[u - 1];
    if ($ !== `
` && $ !== "	" && $ !== " ")
      break;
  }
  let p = t.substring(u);
  const y = p.indexOf(`
`);
  y === -1 ? h = "-" : t === p || y !== p.length - 1 ? (h = "+", r && r()) : h = "", p && (t = t.slice(0, -p.length), p[p.length - 1] === `
` && (p = p.slice(0, -1)), p = p.replace(rt, `$&${c}`));
  let d = !1, f, g = -1;
  for (f = 0; f < t.length; ++f) {
    const $ = t[f];
    if ($ === " ")
      d = !0;
    else if ($ === `
`)
      g = f;
    else
      break;
  }
  let w = t.substring(0, g < f ? g + 1 : f);
  w && (t = t.substring(w.length), w = w.replace(/\n+/g, `$&${c}`));
  let S = (d ? c ? "2" : "1" : "") + h;
  if (s && (S += " " + a(s.replace(/ ?[\r\n]+/g, " ")), i && i()), !m) {
    const $ = t.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${c}`);
    let N = !1;
    const E = Fe(n, !0);
    o !== "folded" && e !== O.BLOCK_FOLDED && (E.onOverflow = () => {
      N = !0;
    });
    const b = Ue(`${w}${$}${p}`, c, nt, E);
    if (!N)
      return `>${S}
${c}${b}`;
  }
  return t = t.replace(/\n+/g, `$&${c}`), `|${S}
${c}${w}${t}${p}`;
}
function Ps(s, e, t, n) {
  const { type: i, value: r } = s, { actualString: o, implicitKey: a, indent: l, indentStep: c, inFlow: m } = e;
  if (a && r.includes(`
`) || m && /[[\]{},]/.test(r))
    return re(r, e);
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
    return a || m || !r.includes(`
`) ? re(r, e) : je(s, e, t, n);
  if (!a && !m && i !== O.PLAIN && r.includes(`
`))
    return je(s, e, t, n);
  if (xe(r)) {
    if (l === "")
      return e.forceBlockIndent = !0, je(s, e, t, n);
    if (a && l === c)
      return re(r, e);
  }
  const h = r.replace(/\n+/g, `$&
${l}`);
  if (o) {
    const u = (d) => d.default && d.tag !== "tag:yaml.org,2002:str" && d.test?.test(h), { compat: p, tags: y } = e.doc.schema;
    if (y.some(u) || p?.some(u))
      return re(r, e);
  }
  return a ? h : Ue(h, l, Gt, Fe(e, !1));
}
function ut(s, e, t, n) {
  const { implicitKey: i, inFlow: r } = e, o = typeof s.value == "string" ? s : Object.assign({}, s, { value: String(s.value) });
  let { type: a } = s;
  a !== O.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (a = O.QUOTE_DOUBLE);
  const l = (m) => {
    switch (m) {
      case O.BLOCK_FOLDED:
      case O.BLOCK_LITERAL:
        return i || r ? re(o.value, e) : je(o, e, t, n);
      case O.QUOTE_DOUBLE:
        return we(o.value, e);
      case O.QUOTE_SINGLE:
        return it(o.value, e);
      case O.PLAIN:
        return Ps(o, e, t, n);
      default:
        return null;
    }
  };
  let c = l(a);
  if (c === null) {
    const { defaultKeyType: m, defaultStringType: h } = e.options, u = i && m || h;
    if (c = l(u), c === null)
      throw new Error(`Unsupported default string type ${u}`);
  }
  return c;
}
function Ht(s, e) {
  const t = Object.assign({
    blockQuote: !0,
    commentString: js,
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
function Ds(s, e) {
  if (e.tag) {
    const i = s.filter((r) => r.tag === e.tag);
    if (i.length > 0)
      return i.find((r) => r.format === e.format) ?? i[0];
  }
  let t, n;
  if (A(e)) {
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
function qs(s, e, { anchors: t, doc: n }) {
  if (!n.directives)
    return "";
  const i = [], r = (A(s) || T(s)) && s.anchor;
  r && Ft(r) && (t.add(r), i.push(`&${r}`));
  const o = s.tag ?? (e.default ? null : e.tag);
  return o && i.push(n.directives.tagString(o)), i.join(" ");
}
function le(s, e, t, n) {
  if (v(s))
    return s.toString(e, t, n);
  if (ue(s)) {
    if (e.doc.directives)
      return s.toString(e);
    if (e.resolvedAliases?.has(s))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    e.resolvedAliases ? e.resolvedAliases.add(s) : e.resolvedAliases = /* @__PURE__ */ new Set([s]), s = s.resolve(e.doc);
  }
  let i;
  const r = L(s) ? s : e.doc.createNode(s, { onTagObj: (l) => i = l });
  i ?? (i = Ds(e.doc.schema.tags, r));
  const o = qs(r, i, e);
  o.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + o.length + 1);
  const a = typeof i.stringify == "function" ? i.stringify(r, e, t, n) : A(r) ? ut(r, e, t, n) : r.toString(e, t, n);
  return o ? A(r) || a[0] === "{" || a[0] === "[" ? `${o} ${a}` : `${o}
${e.indent}${a}` : a;
}
function Rs({ key: s, value: e }, t, n, i) {
  const { allNullValues: r, doc: o, indent: a, indentStep: l, options: { commentString: c, indentSeq: m, simpleKeys: h } } = t;
  let u = L(s) && s.comment || null;
  if (h) {
    if (u)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (T(s) || !L(s) && typeof s == "object") {
      const E = "With simple keys, collection cannot be used as a key value";
      throw new Error(E);
    }
  }
  let p = !h && (!s || u && e == null && !t.inFlow || T(s) || (A(s) ? s.type === O.BLOCK_FOLDED || s.type === O.BLOCK_LITERAL : typeof s == "object"));
  t = Object.assign({}, t, {
    allNullValues: !1,
    implicitKey: !p && (h || !r),
    indent: a + l
  });
  let y = !1, d = !1, f = le(s, t, () => y = !0, () => d = !0);
  if (!p && !t.inFlow && f.length > 1024) {
    if (h)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    p = !0;
  }
  if (t.inFlow) {
    if (r || e == null)
      return y && n && n(), f === "" ? "?" : p ? `? ${f}` : f;
  } else if (r && !h || e == null && p)
    return f = `? ${f}`, u && !y ? f += Q(f, t.indent, c(u)) : d && i && i(), f;
  y && (u = null), p ? (u && (f += Q(f, t.indent, c(u))), f = `? ${f}
${a}:`) : (f = `${f}:`, u && (f += Q(f, t.indent, c(u))));
  let g, w, k;
  L(e) ? (g = !!e.spaceBefore, w = e.commentBefore, k = e.comment) : (g = !1, w = null, k = null, e && typeof e == "object" && (e = o.createNode(e))), t.implicitKey = !1, !p && !u && A(e) && (t.indentAtStart = f.length + 1), d = !1, !m && l.length >= 2 && !t.inFlow && !p && Ne(e) && !e.flow && !e.tag && !e.anchor && (t.indent = t.indent.substring(2));
  let S = !1;
  const $ = le(e, t, () => S = !0, () => d = !0);
  let N = " ";
  if (u || g || w) {
    if (N = g ? `
` : "", w) {
      const E = c(w);
      N += `
${x(E, t.indent)}`;
    }
    $ === "" && !t.inFlow ? N === `
` && k && (N = `

`) : N += `
${t.indent}`;
  } else if (!p && T(e)) {
    const E = $[0], b = $.indexOf(`
`), I = b !== -1, _ = t.inFlow ?? e.flow ?? e.items.length === 0;
    if (I || !_) {
      let Y = !1;
      if (I && (E === "&" || E === "!")) {
        let C = $.indexOf(" ");
        E === "&" && C !== -1 && C < b && $[C + 1] === "!" && (C = $.indexOf(" ", C + 1)), (C === -1 || b < C) && (Y = !0);
      }
      Y || (N = `
${t.indent}`);
    }
  } else ($ === "" || $[0] === `
`) && (N = "");
  return f += N + $, t.inFlow ? S && n && n() : k && !S ? f += Q(f, t.indent, c(k)) : d && i && i(), f;
}
function Us(s, e) {
  (s === "debug" || s === "warn") && console.warn(e);
}
const Ae = "<<", V = {
  identify: (s) => s === Ae || typeof s == "symbol" && s.description === Ae,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new O(Symbol(Ae)), {
    addToJSMap: Wt
  }),
  stringify: () => Ae
}, Fs = (s, e) => (V.identify(e) || A(e) && (!e.type || e.type === O.PLAIN) && V.identify(e.value)) && s?.doc.schema.tags.some((t) => t.tag === V.tag && t.default);
function Wt(s, e, t) {
  const n = Qt(s, t);
  if (Ne(n))
    for (const i of n.items)
      Qe(s, e, i);
  else if (Array.isArray(n))
    for (const i of n)
      Qe(s, e, i);
  else
    Qe(s, e, n);
}
function Qe(s, e, t) {
  const n = Qt(s, t);
  if (!$e(n))
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
function Qt(s, e) {
  return s && ue(e) ? e.resolve(s.doc, s) : e;
}
function zt(s, e, { key: t, value: n }) {
  if (L(t) && t.addToJSMap)
    t.addToJSMap(s, e, n);
  else if (Fs(s, t))
    Wt(s, e, n);
  else {
    const i = P(t, "", s);
    if (e instanceof Map)
      e.set(i, P(n, i, s));
    else if (e instanceof Set)
      e.add(i);
    else {
      const r = xs(t, i, s), o = P(n, r, s);
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
function xs(s, e, t) {
  if (e === null)
    return "";
  if (typeof e != "object")
    return String(e);
  if (L(s) && t?.doc) {
    const n = Ht(t.doc, {});
    n.anchors = /* @__PURE__ */ new Set();
    for (const r of t.anchors.keys())
      n.anchors.add(r.anchor);
    n.inFlow = !0, n.inStringifyKey = !0;
    const i = s.toString(n);
    if (!t.mapKeyWarned) {
      let r = JSON.stringify(i);
      r.length > 40 && (r = r.substring(0, 36) + '..."'), Us(t.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`), t.mapKeyWarned = !0;
    }
    return i;
  }
  return JSON.stringify(e);
}
function ht(s, e, t) {
  const n = ke(s, void 0, t), i = ke(e, void 0, t);
  return new B(n, i);
}
class B {
  constructor(e, t = null) {
    Object.defineProperty(this, D, { value: Rt }), this.key = e, this.value = t;
  }
  clone(e) {
    let { key: t, value: n } = this;
    return L(t) && (t = t.clone(e)), L(n) && (n = n.clone(e)), new B(t, n);
  }
  toJSON(e, t) {
    const n = t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return zt(t, n, this);
  }
  toString(e, t, n) {
    return e?.doc ? Rs(this, e, t, n) : JSON.stringify(this);
  }
}
function Xt(s, e, t) {
  return (e.inFlow ?? s.flow ? Ys : Vs)(s, e, t);
}
function Vs({ comment: s, items: e }, t, { blockItemPrefix: n, flowChars: i, itemIndent: r, onChompKeep: o, onComment: a }) {
  const { indent: l, options: { commentString: c } } = t, m = Object.assign({}, t, { indent: r, type: null });
  let h = !1;
  const u = [];
  for (let y = 0; y < e.length; ++y) {
    const d = e[y];
    let f = null;
    if (L(d))
      !h && d.spaceBefore && u.push(""), De(t, u, d.commentBefore, h), d.comment && (f = d.comment);
    else if (v(d)) {
      const w = L(d.key) ? d.key : null;
      w && (!h && w.spaceBefore && u.push(""), De(t, u, w.commentBefore, h));
    }
    h = !1;
    let g = le(d, m, () => f = null, () => h = !0);
    f && (g += Q(g, r, c(f))), h && f && (h = !1), u.push(n + g);
  }
  let p;
  if (u.length === 0)
    p = i.start + i.end;
  else {
    p = u[0];
    for (let y = 1; y < u.length; ++y) {
      const d = u[y];
      p += d ? `
${l}${d}` : `
`;
    }
  }
  return s ? (p += `
` + x(c(s), l), a && a()) : h && o && o(), p;
}
function Ys({ items: s }, e, { flowChars: t, itemIndent: n }) {
  const { indent: i, indentStep: r, flowCollectionPadding: o, options: { commentString: a } } = e;
  n += r;
  const l = Object.assign({}, e, {
    indent: n,
    inFlow: !0,
    type: null
  });
  let c = !1, m = 0;
  const h = [];
  for (let y = 0; y < s.length; ++y) {
    const d = s[y];
    let f = null;
    if (L(d))
      d.spaceBefore && h.push(""), De(e, h, d.commentBefore, !1), d.comment && (f = d.comment);
    else if (v(d)) {
      const w = L(d.key) ? d.key : null;
      w && (w.spaceBefore && h.push(""), De(e, h, w.commentBefore, !1), w.comment && (c = !0));
      const k = L(d.value) ? d.value : null;
      k ? (k.comment && (f = k.comment), k.commentBefore && (c = !0)) : d.value == null && w?.comment && (f = w.comment);
    }
    f && (c = !0);
    let g = le(d, l, () => f = null);
    c || (c = h.length > m || g.includes(`
`)), y < s.length - 1 ? g += "," : e.options.trailingComma && (e.options.lineWidth > 0 && (c || (c = h.reduce((w, k) => w + k.length + 2, 2) + (g.length + 2) > e.options.lineWidth)), c && (g += ",")), f && (g += Q(g, n, a(f))), h.push(g), m = h.length;
  }
  const { start: u, end: p } = t;
  if (h.length === 0)
    return u + p;
  if (!c) {
    const y = h.reduce((d, f) => d + f.length + 2, 2);
    c = e.options.lineWidth > 0 && y > e.options.lineWidth;
  }
  if (c) {
    let y = u;
    for (const d of h)
      y += d ? `
${r}${i}${d}` : `
`;
    return `${y}
${i}${p}`;
  } else
    return `${u}${o}${h.join(" ")}${o}${p}`;
}
function De({ indent: s, options: { commentString: e } }, t, n, i) {
  if (n && i && (n = n.replace(/^\n+/, "")), n) {
    const r = x(e(n), s);
    t.push(r.trimStart());
  }
}
function z(s, e) {
  const t = A(e) ? e.value : e;
  for (const n of s)
    if (v(n) && (n.key === e || n.key === t || A(n.key) && n.key.value === t))
      return n;
}
class K extends Jt {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(e) {
    super(G, e), this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(e, t, n) {
    const { keepUndefined: i, replacer: r } = n, o = new this(e), a = (l, c) => {
      if (typeof r == "function")
        c = r.call(t, l, c);
      else if (Array.isArray(r) && !r.includes(l))
        return;
      (c !== void 0 || i) && o.items.push(ht(l, c, n));
    };
    if (t instanceof Map)
      for (const [l, c] of t)
        a(l, c);
    else if (t && typeof t == "object")
      for (const l of Object.keys(t))
        a(l, t[l]);
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
    v(e) ? n = e : !e || typeof e != "object" || !("key" in e) ? n = new B(e, e?.value) : n = new B(e.key, e.value);
    const i = z(this.items, n.key), r = this.schema?.sortMapEntries;
    if (i) {
      if (!t)
        throw new Error(`Key ${n.key} already set`);
      A(i.value) && Yt(n.value) ? i.value.value = n.value : i.value = n.value;
    } else if (r) {
      const o = this.items.findIndex((a) => r(n, a) < 0);
      o === -1 ? this.items.push(n) : this.items.splice(o, 0, n);
    } else
      this.items.push(n);
  }
  delete(e) {
    const t = z(this.items, e);
    return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
  }
  get(e, t) {
    const i = z(this.items, e)?.value;
    return (!t && A(i) ? i.value : i) ?? void 0;
  }
  has(e) {
    return !!z(this.items, e);
  }
  set(e, t) {
    this.add(new B(e, t), !0);
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
      zt(t, i, r);
    return i;
  }
  toString(e, t, n) {
    if (!e)
      return JSON.stringify(this);
    for (const i of this.items)
      if (!v(i))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);
    return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), Xt(this, e, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: e.indent || "",
      onChompKeep: n,
      onComment: t
    });
  }
}
const de = {
  collection: "map",
  default: !0,
  nodeClass: K,
  tag: "tag:yaml.org,2002:map",
  resolve(s, e) {
    return $e(s) || e("Expected a mapping for this tag"), s;
  },
  createNode: (s, e, t) => K.from(s, e, t)
};
class X extends Jt {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(e) {
    super(fe, e), this.items = [];
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
    const t = Ie(e);
    return typeof t != "number" ? !1 : this.items.splice(t, 1).length > 0;
  }
  get(e, t) {
    const n = Ie(e);
    if (typeof n != "number")
      return;
    const i = this.items[n];
    return !t && A(i) ? i.value : i;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(e) {
    const t = Ie(e);
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
    const n = Ie(e);
    if (typeof n != "number")
      throw new Error(`Expected a valid index, not ${e}.`);
    const i = this.items[n];
    A(i) && Yt(t) ? i.value = t : this.items[n] = t;
  }
  toJSON(e, t) {
    const n = [];
    t?.onCreate && t.onCreate(n);
    let i = 0;
    for (const r of this.items)
      n.push(P(r, String(i++), t));
    return n;
  }
  toString(e, t, n) {
    return e ? Xt(this, e, {
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
      for (let a of t) {
        if (typeof i == "function") {
          const l = t instanceof Set ? a : String(o++);
          a = i.call(t, l, a);
        }
        r.items.push(ke(a, void 0, n));
      }
    }
    return r;
  }
}
function Ie(s) {
  let e = A(s) ? s.value : s;
  return e && typeof e == "string" && (e = Number(e)), typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
const pe = {
  collection: "seq",
  default: !0,
  nodeClass: X,
  tag: "tag:yaml.org,2002:seq",
  resolve(s, e) {
    return Ne(s) || e("Expected a sequence for this tag"), s;
  },
  createNode: (s, e, t) => X.from(s, e, t)
}, Ve = {
  identify: (s) => typeof s == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (s) => s,
  stringify(s, e, t, n) {
    return e = Object.assign({ actualString: !0 }, e), ut(s, e, t, n);
  }
}, Ye = {
  identify: (s) => s == null,
  createNode: () => new O(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new O(null),
  stringify: ({ source: s }, e) => typeof s == "string" && Ye.test.test(s) ? s : e.options.nullStr
}, dt = {
  identify: (s) => typeof s == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (s) => new O(s[0] === "t" || s[0] === "T"),
  stringify({ source: s, value: e }, t) {
    if (s && dt.test.test(s)) {
      const n = s[0] === "t" || s[0] === "T";
      if (e === n)
        return s;
    }
    return e ? t.options.trueStr : t.options.falseStr;
  }
};
function U({ format: s, minFractionDigits: e, tag: t, value: n }) {
  if (typeof n == "bigint")
    return String(n);
  const i = typeof n == "number" ? n : Number(n);
  if (!isFinite(i))
    return isNaN(i) ? ".nan" : i < 0 ? "-.inf" : ".inf";
  let r = Object.is(n, -0) ? "-0" : JSON.stringify(n);
  if (!s && e && (!t || t === "tag:yaml.org,2002:float") && /^-?\d/.test(r) && !r.includes("e")) {
    let o = r.indexOf(".");
    o < 0 && (o = r.length, r += ".");
    let a = e - (r.length - o - 1);
    for (; a-- > 0; )
      r += "0";
  }
  return r;
}
const Zt = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: U
}, es = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (s) => parseFloat(s),
  stringify(s) {
    const e = Number(s.value);
    return isFinite(e) ? e.toExponential() : U(s);
  }
}, ts = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(s) {
    const e = new O(parseFloat(s)), t = s.indexOf(".");
    return t !== -1 && s[s.length - 1] === "0" && (e.minFractionDigits = s.length - t - 1), e;
  },
  stringify: U
}, Je = (s) => typeof s == "bigint" || Number.isInteger(s), pt = (s, e, t, { intAsBigInt: n }) => n ? BigInt(s) : parseInt(s.substring(e), t);
function ss(s, e, t) {
  const { value: n } = s;
  return Je(n) && n >= 0 ? t + n.toString(e) : U(s);
}
const ns = {
  identify: (s) => Je(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (s, e, t) => pt(s, 2, 8, t),
  stringify: (s) => ss(s, 8, "0o")
}, is = {
  identify: Je,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (s, e, t) => pt(s, 0, 10, t),
  stringify: U
}, rs = {
  identify: (s) => Je(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (s, e, t) => pt(s, 2, 16, t),
  stringify: (s) => ss(s, 16, "0x")
}, Js = [
  de,
  pe,
  Ve,
  Ye,
  dt,
  ns,
  is,
  rs,
  Zt,
  es,
  ts
];
function Et(s) {
  return typeof s == "bigint" || Number.isInteger(s);
}
const Te = ({ value: s }) => JSON.stringify(s), Gs = [
  {
    identify: (s) => typeof s == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (s) => s,
    stringify: Te
  },
  {
    identify: (s) => s == null,
    createNode: () => new O(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: Te
  },
  {
    identify: (s) => typeof s == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (s) => s === "true",
    stringify: Te
  },
  {
    identify: Et,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (s, e, { intAsBigInt: t }) => t ? BigInt(s) : parseInt(s, 10),
    stringify: ({ value: s }) => Et(s) ? s.toString() : JSON.stringify(s)
  },
  {
    identify: (s) => typeof s == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (s) => parseFloat(s),
    stringify: Te
  }
], Hs = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(s, e) {
    return e(`Unresolved plain scalar ${JSON.stringify(s)}`), s;
  }
}, Ws = [de, pe].concat(Gs, Hs), mt = {
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
    let a;
    if (typeof btoa == "function") {
      let l = "";
      for (let c = 0; c < o.length; ++c)
        l += String.fromCharCode(o[c]);
      a = btoa(l);
    } else
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (e ?? (e = O.BLOCK_LITERAL), e !== O.QUOTE_DOUBLE) {
      const l = Math.max(n.options.lineWidth - n.indent.length, n.options.minContentWidth), c = Math.ceil(a.length / l), m = new Array(c);
      for (let h = 0, u = 0; h < c; ++h, u += l)
        m[h] = a.substr(u, l);
      a = m.join(e === O.BLOCK_LITERAL ? `
` : " ");
    }
    return ut({ comment: s, type: e, value: a }, n, i, r);
  }
};
function os(s, e) {
  if (Ne(s))
    for (let t = 0; t < s.items.length; ++t) {
      let n = s.items[t];
      if (!v(n)) {
        if ($e(n)) {
          n.items.length > 1 && e("Each pair must have its own sequence indicator");
          const i = n.items[0] || new B(new O(null));
          if (n.commentBefore && (i.key.commentBefore = i.key.commentBefore ? `${n.commentBefore}
${i.key.commentBefore}` : n.commentBefore), n.comment) {
            const r = i.value ?? i.key;
            r.comment = r.comment ? `${n.comment}
${r.comment}` : n.comment;
          }
          n = i;
        }
        s.items[t] = v(n) ? n : new B(n);
      }
    }
  else
    e("Expected a sequence for this tag");
  return s;
}
function as(s, e, t) {
  const { replacer: n } = t, i = new X(s);
  i.tag = "tag:yaml.org,2002:pairs";
  let r = 0;
  if (e && Symbol.iterator in Object(e))
    for (let o of e) {
      typeof n == "function" && (o = n.call(e, String(r++), o));
      let a, l;
      if (Array.isArray(o))
        if (o.length === 2)
          a = o[0], l = o[1];
        else
          throw new TypeError(`Expected [key, value] tuple: ${o}`);
      else if (o && o instanceof Object) {
        const c = Object.keys(o);
        if (c.length === 1)
          a = c[0], l = o[a];
        else
          throw new TypeError(`Expected tuple with one key, not ${c.length} keys`);
      } else
        a = o;
      i.items.push(ht(a, l, t));
    }
  return i;
}
const gt = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: os,
  createNode: as
};
class oe extends X {
  constructor() {
    super(), this.add = K.prototype.add.bind(this), this.delete = K.prototype.delete.bind(this), this.get = K.prototype.get.bind(this), this.has = K.prototype.has.bind(this), this.set = K.prototype.set.bind(this), this.tag = oe.tag;
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
      if (v(i) ? (r = P(i.key, "", t), o = P(i.value, r, t)) : r = P(i, "", t), n.has(r))
        throw new Error("Ordered maps must not include duplicate keys");
      n.set(r, o);
    }
    return n;
  }
  static from(e, t, n) {
    const i = as(e, t, n), r = new this();
    return r.items = i.items, r;
  }
}
oe.tag = "tag:yaml.org,2002:omap";
const yt = {
  collection: "seq",
  identify: (s) => s instanceof Map,
  nodeClass: oe,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(s, e) {
    const t = os(s, e), n = [];
    for (const { key: i } of t.items)
      A(i) && (n.includes(i.value) ? e(`Ordered maps must not include duplicate keys: ${i.value}`) : n.push(i.value));
    return Object.assign(new oe(), t);
  },
  createNode: (s, e, t) => oe.from(s, e, t)
};
function ls({ value: s, source: e }, t) {
  return e && (s ? cs : fs).test.test(e) ? e : s ? t.options.trueStr : t.options.falseStr;
}
const cs = {
  identify: (s) => s === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new O(!0),
  stringify: ls
}, fs = {
  identify: (s) => s === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new O(!1),
  stringify: ls
}, Qs = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: U
}, zs = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (s) => parseFloat(s.replace(/_/g, "")),
  stringify(s) {
    const e = Number(s.value);
    return isFinite(e) ? e.toExponential() : U(s);
  }
}, Xs = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(s) {
    const e = new O(parseFloat(s.replace(/_/g, ""))), t = s.indexOf(".");
    if (t !== -1) {
      const n = s.substring(t + 1).replace(/_/g, "");
      n[n.length - 1] === "0" && (e.minFractionDigits = n.length);
    }
    return e;
  },
  stringify: U
}, Oe = (s) => typeof s == "bigint" || Number.isInteger(s);
function Ge(s, e, t, { intAsBigInt: n }) {
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
function bt(s, e, t) {
  const { value: n } = s;
  if (Oe(n)) {
    const i = n.toString(e);
    return n < 0 ? "-" + t + i.substr(1) : t + i;
  }
  return U(s);
}
const Zs = {
  identify: Oe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (s, e, t) => Ge(s, 2, 2, t),
  stringify: (s) => bt(s, 2, "0b")
}, en = {
  identify: Oe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (s, e, t) => Ge(s, 1, 8, t),
  stringify: (s) => bt(s, 8, "0")
}, tn = {
  identify: Oe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (s, e, t) => Ge(s, 0, 10, t),
  stringify: U
}, sn = {
  identify: Oe,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (s, e, t) => Ge(s, 2, 16, t),
  stringify: (s) => bt(s, 16, "0x")
};
class ae extends K {
  constructor(e) {
    super(e), this.tag = ae.tag;
  }
  add(e) {
    let t;
    v(e) ? t = e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? t = new B(e.key, null) : t = new B(e, null), z(this.items, t.key) || this.items.push(t);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(e, t) {
    const n = z(this.items, e);
    return !t && v(n) ? A(n.key) ? n.key.value : n.key : n;
  }
  set(e, t) {
    if (typeof t != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
    const n = z(this.items, e);
    n && !t ? this.items.splice(this.items.indexOf(n), 1) : !n && t && this.items.push(new B(e));
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
        typeof i == "function" && (o = i.call(t, o, o)), r.items.push(ht(o, null, n));
    return r;
  }
}
ae.tag = "tag:yaml.org,2002:set";
const wt = {
  collection: "map",
  identify: (s) => s instanceof Set,
  nodeClass: ae,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (s, e, t) => ae.from(s, e, t),
  resolve(s, e) {
    if ($e(s)) {
      if (s.hasAllNullValues(!0))
        return Object.assign(new ae(), s);
      e("Set items must all have null values");
    } else
      e("Expected a mapping for this tag");
    return s;
  }
};
function kt(s, e) {
  const t = s[0], n = t === "-" || t === "+" ? s.substring(1) : s, i = (o) => e ? BigInt(o) : Number(o), r = n.replace(/_/g, "").split(":").reduce((o, a) => o * i(60) + i(a), i(0));
  return t === "-" ? i(-1) * r : r;
}
function us(s) {
  let { value: e } = s, t = (o) => o;
  if (typeof e == "bigint")
    t = (o) => BigInt(o);
  else if (isNaN(e) || !isFinite(e))
    return U(s);
  let n = "";
  e < 0 && (n = "-", e *= t(-1));
  const i = t(60), r = [e % i];
  return e < 60 ? r.unshift(0) : (e = (e - r[0]) / i, r.unshift(e % i), e >= 60 && (e = (e - r[0]) / i, r.unshift(e))), n + r.map((o) => String(o).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const hs = {
  identify: (s) => typeof s == "bigint" || Number.isInteger(s),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (s, e, { intAsBigInt: t }) => kt(s, t),
  stringify: us
}, ds = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (s) => kt(s, !1),
  stringify: us
}, He = {
  identify: (s) => s instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(s) {
    const e = s.match(He.test);
    if (!e)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, t, n, i, r, o, a] = e.map(Number), l = e[7] ? Number((e[7] + "00").substr(1, 3)) : 0;
    let c = Date.UTC(t, n - 1, i, r || 0, o || 0, a || 0, l);
    const m = e[8];
    if (m && m !== "Z") {
      let h = kt(m, !1);
      Math.abs(h) < 30 && (h *= 60), c -= 6e4 * h;
    }
    return new Date(c);
  },
  stringify: ({ value: s }) => s?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, At = [
  de,
  pe,
  Ve,
  Ye,
  cs,
  fs,
  Zs,
  en,
  tn,
  sn,
  Qs,
  zs,
  Xs,
  mt,
  V,
  yt,
  gt,
  wt,
  hs,
  ds,
  He
], It = /* @__PURE__ */ new Map([
  ["core", Js],
  ["failsafe", [de, pe, Ve]],
  ["json", Ws],
  ["yaml11", At],
  ["yaml-1.1", At]
]), Tt = {
  binary: mt,
  bool: dt,
  float: ts,
  floatExp: es,
  floatNaN: Zt,
  floatTime: ds,
  int: is,
  intHex: rs,
  intOct: ns,
  intTime: hs,
  map: de,
  merge: V,
  null: Ye,
  omap: yt,
  pairs: gt,
  seq: pe,
  set: wt,
  timestamp: He
}, nn = {
  "tag:yaml.org,2002:binary": mt,
  "tag:yaml.org,2002:merge": V,
  "tag:yaml.org,2002:omap": yt,
  "tag:yaml.org,2002:pairs": gt,
  "tag:yaml.org,2002:set": wt,
  "tag:yaml.org,2002:timestamp": He
};
function ze(s, e, t) {
  const n = It.get(e);
  if (n && !s)
    return t && !n.includes(V) ? n.concat(V) : n.slice();
  let i = n;
  if (!i)
    if (Array.isArray(s))
      i = [];
    else {
      const r = Array.from(It.keys()).filter((o) => o !== "yaml11").map((o) => JSON.stringify(o)).join(", ");
      throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`);
    }
  if (Array.isArray(s))
    for (const r of s)
      i = i.concat(r);
  else typeof s == "function" && (i = s(i.slice()));
  return t && (i = i.concat(V)), i.reduce((r, o) => {
    const a = typeof o == "string" ? Tt[o] : o;
    if (!a) {
      const l = JSON.stringify(o), c = Object.keys(Tt).map((m) => JSON.stringify(m)).join(", ");
      throw new Error(`Unknown custom tag ${l}; use one of ${c}`);
    }
    return r.includes(a) || r.push(a), r;
  }, []);
}
const rn = (s, e) => s.key < e.key ? -1 : s.key > e.key ? 1 : 0;
class St {
  constructor({ compat: e, customTags: t, merge: n, resolveKnownTags: i, schema: r, sortMapEntries: o, toStringDefaults: a }) {
    this.compat = Array.isArray(e) ? ze(e, "compat") : e ? ze(null, e) : null, this.name = typeof r == "string" && r || "core", this.knownTags = i ? nn : {}, this.tags = ze(t, this.name, n), this.toStringOptions = a ?? null, Object.defineProperty(this, G, { value: de }), Object.defineProperty(this, F, { value: Ve }), Object.defineProperty(this, fe, { value: pe }), this.sortMapEntries = typeof o == "function" ? o : o === !0 ? rn : null;
  }
  clone() {
    const e = Object.create(St.prototype, Object.getOwnPropertyDescriptors(this));
    return e.tags = this.tags.slice(), e;
  }
}
function on(s, e) {
  const t = [];
  let n = e.directives === !0;
  if (e.directives !== !1 && s.directives) {
    const l = s.directives.toString(s);
    l ? (t.push(l), n = !0) : s.directives.docStart && (n = !0);
  }
  n && t.push("---");
  const i = Ht(s, e), { commentString: r } = i.options;
  if (s.commentBefore) {
    t.length !== 1 && t.unshift("");
    const l = r(s.commentBefore);
    t.unshift(x(l, ""));
  }
  let o = !1, a = null;
  if (s.contents) {
    if (L(s.contents)) {
      if (s.contents.spaceBefore && n && t.push(""), s.contents.commentBefore) {
        const m = r(s.contents.commentBefore);
        t.push(x(m, ""));
      }
      i.forceBlockIndent = !!s.comment, a = s.contents.comment;
    }
    const l = a ? void 0 : () => o = !0;
    let c = le(s.contents, i, () => a = null, l);
    a && (c += Q(c, "", r(a))), (c[0] === "|" || c[0] === ">") && t[t.length - 1] === "---" ? t[t.length - 1] = `--- ${c}` : t.push(c);
  } else
    t.push(le(s.contents, i));
  if (s.directives?.docEnd)
    if (s.comment) {
      const l = r(s.comment);
      l.includes(`
`) ? (t.push("..."), t.push(x(l, ""))) : t.push(`... ${l}`);
    } else
      t.push("...");
  else {
    let l = s.comment;
    l && o && (l = l.replace(/^\n+/, "")), l && ((!o || a) && t[t.length - 1] !== "" && t.push(""), t.push(x(r(l), "")));
  }
  return t.join(`
`) + `
`;
}
class We {
  constructor(e, t, n) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, D, { value: st });
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
    n?._directives ? (this.directives = n._directives.atDocument(), this.directives.yaml.explicit && (o = this.directives.yaml.version)) : this.directives = new M({ version: o }), this.setSchema(o, n), this.contents = e === void 0 ? null : this.createNode(e, i, n);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const e = Object.create(We.prototype, {
      [D]: { value: st }
    });
    return e.commentBefore = this.commentBefore, e.comment = this.comment, e.errors = this.errors.slice(), e.warnings = this.warnings.slice(), e.options = Object.assign({}, this.options), this.directives && (e.directives = this.directives.clone()), e.schema = this.schema.clone(), e.contents = L(this.contents) ? this.contents.clone(e.schema) : this.contents, this.range && (e.range = this.range.slice()), e;
  }
  /** Adds a value to the document. */
  add(e) {
    Z(this.contents) && this.contents.add(e);
  }
  /** Adds a value to the document. */
  addIn(e, t) {
    Z(this.contents) && this.contents.addIn(e, t);
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
      const n = xt(this);
      e.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !t || n.has(t) ? Vt(t || "a", n) : t;
    }
    return new ft(e.anchor);
  }
  createNode(e, t, n) {
    let i;
    if (typeof t == "function")
      e = t.call({ "": e }, "", e), i = t;
    else if (Array.isArray(t)) {
      const f = (w) => typeof w == "number" || w instanceof String || w instanceof Number, g = t.filter(f).map(String);
      g.length > 0 && (t = t.concat(g)), i = t;
    } else n === void 0 && t && (n = t, t = void 0);
    const { aliasDuplicateObjects: r, anchorPrefix: o, flow: a, keepUndefined: l, onTagObj: c, tag: m } = n ?? {}, { onAnchor: h, setAnchors: u, sourceObjects: p } = _s(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      o || "a"
    ), y = {
      aliasDuplicateObjects: r ?? !0,
      keepUndefined: l ?? !1,
      onAnchor: h,
      onTagObj: c,
      replacer: i,
      schema: this.schema,
      sourceObjects: p
    }, d = ke(e, m, y);
    return a && T(d) && (d.flow = !0), u(), d;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(e, t, n = {}) {
    const i = this.createNode(e, null, n), r = this.createNode(t, null, n);
    return new B(i, r);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    return Z(this.contents) ? this.contents.delete(e) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    return ge(e) ? this.contents == null ? !1 : (this.contents = null, !0) : Z(this.contents) ? this.contents.deleteIn(e) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(e, t) {
    return T(this.contents) ? this.contents.get(e, t) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    return ge(e) ? !t && A(this.contents) ? this.contents.value : this.contents : T(this.contents) ? this.contents.getIn(e, t) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(e) {
    return T(this.contents) ? this.contents.has(e) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(e) {
    return ge(e) ? this.contents !== void 0 : T(this.contents) ? this.contents.hasIn(e) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(e, t) {
    this.contents == null ? this.contents = Pe(this.schema, [e], t) : Z(this.contents) && this.contents.set(e, t);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    ge(e) ? this.contents = t : this.contents == null ? this.contents = Pe(this.schema, Array.from(e), t) : Z(this.contents) && this.contents.setIn(e, t);
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
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new M({ version: "1.1" }), n = { resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = e : this.directives = new M({ version: e }), n = { resolveKnownTags: !0, schema: "core" };
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
      this.schema = new St(Object.assign(n, t));
    else
      throw new Error("With a null YAML version, the { schema: Schema } option is required");
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json: e, jsonArg: t, mapAsMap: n, maxAliasCount: i, onAnchor: r, reviver: o } = {}) {
    const a = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !e,
      mapAsMap: n === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof i == "number" ? i : 100
    }, l = P(this.contents, t ?? "", a);
    if (typeof r == "function")
      for (const { count: c, res: m } of a.anchors.values())
        r(m, c);
    return typeof o == "function" ? ie(o, { "": l }, "", l) : l;
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
    return on(this, e);
  }
}
function Z(s) {
  if (T(s))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class ps extends Error {
  constructor(e, t, n, i) {
    super(), this.name = e, this.code = n, this.message = i, this.pos = t;
  }
}
class ye extends ps {
  constructor(e, t, n) {
    super("YAMLParseError", e, t, n);
  }
}
class an extends ps {
  constructor(e, t, n) {
    super("YAMLWarning", e, t, n);
  }
}
const Lt = (s, e) => (t) => {
  if (t.pos[0] === -1)
    return;
  t.linePos = t.pos.map((a) => e.linePos(a));
  const { line: n, col: i } = t.linePos[0];
  t.message += ` at line ${n}, column ${i}`;
  let r = i - 1, o = s.substring(e.lineStarts[n - 1], e.lineStarts[n]).replace(/[\n\r]+$/, "");
  if (r >= 60 && o.length > 80) {
    const a = Math.min(r - 39, o.length - 79);
    o = "…" + o.substring(a), r -= a - 1;
  }
  if (o.length > 80 && (o = o.substring(0, 79) + "…"), n > 1 && /^ *$/.test(o.substring(0, r))) {
    let a = s.substring(e.lineStarts[n - 2], e.lineStarts[n - 1]);
    a.length > 80 && (a = a.substring(0, 79) + `…
`), o = a + o;
  }
  if (/[^ ]/.test(o)) {
    let a = 1;
    const l = t.linePos[1];
    l?.line === n && l.col > i && (a = Math.max(1, Math.min(l.col - i, 80 - r)));
    const c = " ".repeat(r) + "^".repeat(a);
    t.message += `:

${o}
${c}
`;
  }
};
function ce(s, { flow: e, indicator: t, next: n, offset: i, onError: r, parentIndent: o, startOnNewline: a }) {
  let l = !1, c = a, m = a, h = "", u = "", p = !1, y = !1, d = null, f = null, g = null, w = null, k = null, S = null, $ = null;
  for (const b of s)
    switch (y && (b.type !== "space" && b.type !== "newline" && b.type !== "comma" && r(b.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), y = !1), d && (c && b.type !== "comment" && b.type !== "newline" && r(d, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), d = null), b.type) {
      case "space":
        !e && (t !== "doc-start" || n?.type !== "flow-collection") && b.source.includes("	") && (d = b), m = !0;
        break;
      case "comment": {
        m || r(b, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const I = b.source.substring(1) || " ";
        h ? h += u + I : h = I, u = "", c = !1;
        break;
      }
      case "newline":
        c ? h ? h += b.source : (!S || t !== "seq-item-ind") && (l = !0) : u += b.source, c = !0, p = !0, (f || g) && (w = b), m = !0;
        break;
      case "anchor":
        f && r(b, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), b.source.endsWith(":") && r(b.offset + b.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), f = b, $ ?? ($ = b.offset), c = !1, m = !1, y = !0;
        break;
      case "tag": {
        g && r(b, "MULTIPLE_TAGS", "A node can have at most one tag"), g = b, $ ?? ($ = b.offset), c = !1, m = !1, y = !0;
        break;
      }
      case t:
        (f || g) && r(b, "BAD_PROP_ORDER", `Anchors and tags must be after the ${b.source} indicator`), S && r(b, "UNEXPECTED_TOKEN", `Unexpected ${b.source} in ${e ?? "collection"}`), S = b, c = t === "seq-item-ind" || t === "explicit-key-ind", m = !1;
        break;
      case "comma":
        if (e) {
          k && r(b, "UNEXPECTED_TOKEN", `Unexpected , in ${e}`), k = b, c = !1, m = !1;
          break;
        }
      // else fallthrough
      default:
        r(b, "UNEXPECTED_TOKEN", `Unexpected ${b.type} token`), c = !1, m = !1;
    }
  const N = s[s.length - 1], E = N ? N.offset + N.source.length : i;
  return y && n && n.type !== "space" && n.type !== "newline" && n.type !== "comma" && (n.type !== "scalar" || n.source !== "") && r(n.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), d && (c && d.indent <= o || n?.type === "block-map" || n?.type === "block-seq") && r(d, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: k,
    found: S,
    spaceBefore: l,
    comment: h,
    hasNewline: p,
    anchor: f,
    tag: g,
    newlineAfterProp: w,
    end: E,
    start: $ ?? E
  };
}
function Se(s) {
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
        if (Se(e.key) || Se(e.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function ot(s, e, t) {
  if (e?.type === "flow-collection") {
    const n = e.end[0];
    n.indent === s && (n.source === "]" || n.source === "}") && Se(e) && t(n, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function ms(s, e, t) {
  const { uniqueKeys: n } = s.options;
  if (n === !1)
    return !1;
  const i = typeof n == "function" ? n : (r, o) => r === o || A(r) && A(o) && r.value === o.value;
  return e.some((r) => i(r.key, t));
}
const vt = "All mapping items must start at the same column";
function ln({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = r?.nodeClass ?? K, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1);
  let l = n.offset, c = null;
  for (const m of n.items) {
    const { start: h, key: u, sep: p, value: y } = m, d = ce(h, {
      indicator: "explicit-key-ind",
      next: u ?? p?.[0],
      offset: l,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !0
    }), f = !d.found;
    if (f) {
      if (u && (u.type === "block-seq" ? i(l, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in u && u.indent !== n.indent && i(l, "BAD_INDENT", vt)), !d.anchor && !d.tag && !p) {
        c = d.end, d.comment && (a.comment ? a.comment += `
` + d.comment : a.comment = d.comment);
        continue;
      }
      (d.newlineAfterProp || Se(u)) && i(u ?? h[h.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else d.found?.indent !== n.indent && i(l, "BAD_INDENT", vt);
    t.atKey = !0;
    const g = d.end, w = u ? s(t, u, d, i) : e(t, g, h, null, d, i);
    t.schema.compat && ot(n.indent, u, i), t.atKey = !1, ms(t, a.items, w) && i(g, "DUPLICATE_KEY", "Map keys must be unique");
    const k = ce(p ?? [], {
      indicator: "map-value-ind",
      next: y,
      offset: w.range[2],
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !u || u.type === "block-scalar"
    });
    if (l = k.end, k.found) {
      f && (y?.type === "block-map" && !k.hasNewline && i(l, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), t.options.strict && d.start < k.found.offset - 1024 && i(w.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const S = y ? s(t, y, k, i) : e(t, l, p, null, k, i);
      t.schema.compat && ot(n.indent, y, i), l = S.range[2];
      const $ = new B(w, S);
      t.options.keepSourceTokens && ($.srcToken = m), a.items.push($);
    } else {
      f && i(w.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), k.comment && (w.comment ? w.comment += `
` + k.comment : w.comment = k.comment);
      const S = new B(w);
      t.options.keepSourceTokens && (S.srcToken = m), a.items.push(S);
    }
  }
  return c && c < l && i(c, "IMPOSSIBLE", "Map comment with trailing content"), a.range = [n.offset, l, c ?? l], a;
}
function cn({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = r?.nodeClass ?? X, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let l = n.offset, c = null;
  for (const { start: m, value: h } of n.items) {
    const u = ce(m, {
      indicator: "seq-item-ind",
      next: h,
      offset: l,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !0
    });
    if (!u.found)
      if (u.anchor || u.tag || h)
        h?.type === "block-seq" ? i(u.end, "BAD_INDENT", "All sequence items must start at the same column") : i(l, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        c = u.end, u.comment && (a.comment = u.comment);
        continue;
      }
    const p = h ? s(t, h, u, i) : e(t, u.end, m, null, u, i);
    t.schema.compat && ot(n.indent, h, i), l = p.range[2], a.items.push(p);
  }
  return a.range = [n.offset, l, c ?? l], a;
}
function Ee(s, e, t, n) {
  let i = "";
  if (s) {
    let r = !1, o = "";
    for (const a of s) {
      const { source: l, type: c } = a;
      switch (c) {
        case "space":
          r = !0;
          break;
        case "comment": {
          t && !r && n(a, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const m = l.substring(1) || " ";
          i ? i += o + m : i = m, o = "";
          break;
        }
        case "newline":
          i && (o += l), r = !0;
          break;
        default:
          n(a, "UNEXPECTED_TOKEN", `Unexpected ${c} at node end`);
      }
      e += l.length;
    }
  }
  return { comment: i, offset: e };
}
const Xe = "Block collections are not allowed within flow collections", Ze = (s) => s && (s.type === "block-map" || s.type === "block-seq");
function fn({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = n.start.source === "{", a = o ? "flow map" : "flow sequence", l = r?.nodeClass ?? (o ? K : X), c = new l(t.schema);
  c.flow = !0;
  const m = t.atRoot;
  m && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let h = n.offset + n.start.source.length;
  for (let f = 0; f < n.items.length; ++f) {
    const g = n.items[f], { start: w, key: k, sep: S, value: $ } = g, N = ce(w, {
      flow: a,
      indicator: "explicit-key-ind",
      next: k ?? S?.[0],
      offset: h,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !1
    });
    if (!N.found) {
      if (!N.anchor && !N.tag && !S && !$) {
        f === 0 && N.comma ? i(N.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`) : f < n.items.length - 1 && i(N.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${a}`), N.comment && (c.comment ? c.comment += `
` + N.comment : c.comment = N.comment), h = N.end;
        continue;
      }
      !o && t.options.strict && Se(k) && i(
        k,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (f === 0)
      N.comma && i(N.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`);
    else if (N.comma || i(N.start, "MISSING_CHAR", `Missing , between ${a} items`), N.comment) {
      let E = "";
      e: for (const b of w)
        switch (b.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            E = b.source.substring(1);
            break e;
          default:
            break e;
        }
      if (E) {
        let b = c.items[c.items.length - 1];
        v(b) && (b = b.value ?? b.key), b.comment ? b.comment += `
` + E : b.comment = E, N.comment = N.comment.substring(E.length + 1);
      }
    }
    if (!o && !S && !N.found) {
      const E = $ ? s(t, $, N, i) : e(t, N.end, S, null, N, i);
      c.items.push(E), h = E.range[2], Ze($) && i(E.range, "BLOCK_IN_FLOW", Xe);
    } else {
      t.atKey = !0;
      const E = N.end, b = k ? s(t, k, N, i) : e(t, E, w, null, N, i);
      Ze(k) && i(b.range, "BLOCK_IN_FLOW", Xe), t.atKey = !1;
      const I = ce(S ?? [], {
        flow: a,
        indicator: "map-value-ind",
        next: $,
        offset: b.range[2],
        onError: i,
        parentIndent: n.indent,
        startOnNewline: !1
      });
      if (I.found) {
        if (!o && !N.found && t.options.strict) {
          if (S)
            for (const C of S) {
              if (C === I.found)
                break;
              if (C.type === "newline") {
                i(C, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          N.start < I.found.offset - 1024 && i(I.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else $ && ("source" in $ && $.source?.[0] === ":" ? i($, "MISSING_CHAR", `Missing space after : in ${a}`) : i(I.start, "MISSING_CHAR", `Missing , or : between ${a} items`));
      const _ = $ ? s(t, $, I, i) : I.found ? e(t, I.end, S, null, I, i) : null;
      _ ? Ze($) && i(_.range, "BLOCK_IN_FLOW", Xe) : I.comment && (b.comment ? b.comment += `
` + I.comment : b.comment = I.comment);
      const Y = new B(b, _);
      if (t.options.keepSourceTokens && (Y.srcToken = g), o) {
        const C = c;
        ms(t, C.items, b) && i(E, "DUPLICATE_KEY", "Map keys must be unique"), C.items.push(Y);
      } else {
        const C = new K(t.schema);
        C.flow = !0, C.items.push(Y);
        const Nt = (_ ?? b).range;
        C.range = [b.range[0], Nt[1], Nt[2]], c.items.push(C);
      }
      h = _ ? _.range[2] : I.end;
    }
  }
  const u = o ? "}" : "]", [p, ...y] = n.end;
  let d = h;
  if (p?.source === u)
    d = p.offset + p.source.length;
  else {
    const f = a[0].toUpperCase() + a.substring(1), g = m ? `${f} must end with a ${u}` : `${f} in block collection must be sufficiently indented and end with a ${u}`;
    i(h, m ? "MISSING_CHAR" : "BAD_INDENT", g), p && p.source.length !== 1 && y.unshift(p);
  }
  if (y.length > 0) {
    const f = Ee(y, d, t.options.strict, i);
    f.comment && (c.comment ? c.comment += `
` + f.comment : c.comment = f.comment), c.range = [n.offset, d, f.offset];
  } else
    c.range = [n.offset, d, d];
  return c;
}
function et(s, e, t, n, i, r) {
  const o = t.type === "block-map" ? ln(s, e, t, n, r) : t.type === "block-seq" ? cn(s, e, t, n, r) : fn(s, e, t, n, r), a = o.constructor;
  return i === "!" || i === a.tagName ? (o.tag = a.tagName, o) : (i && (o.tag = i), o);
}
function un(s, e, t, n, i) {
  const r = n.tag, o = r ? e.directives.tagName(r.source, (u) => i(r, "TAG_RESOLVE_FAILED", u)) : null;
  if (t.type === "block-seq") {
    const { anchor: u, newlineAfterProp: p } = n, y = u && r ? u.offset > r.offset ? u : r : u ?? r;
    y && (!p || p.offset < y.offset) && i(y, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const a = t.type === "block-map" ? "map" : t.type === "block-seq" ? "seq" : t.start.source === "{" ? "map" : "seq";
  if (!r || !o || o === "!" || o === K.tagName && a === "map" || o === X.tagName && a === "seq")
    return et(s, e, t, i, o);
  let l = e.schema.tags.find((u) => u.tag === o && u.collection === a);
  if (!l) {
    const u = e.schema.knownTags[o];
    if (u?.collection === a)
      e.schema.tags.push(Object.assign({}, u, { default: !1 })), l = u;
    else
      return u ? i(r, "BAD_COLLECTION_TYPE", `${u.tag} used for ${a} collection, but expects ${u.collection ?? "scalar"}`, !0) : i(r, "TAG_RESOLVE_FAILED", `Unresolved tag: ${o}`, !0), et(s, e, t, i, o);
  }
  const c = et(s, e, t, i, o, l), m = l.resolve?.(c, (u) => i(r, "TAG_RESOLVE_FAILED", u), e.options) ?? c, h = L(m) ? m : new O(m);
  return h.range = c.range, h.tag = o, l?.format && (h.format = l.format), h;
}
function hn(s, e, t) {
  const n = e.offset, i = dn(e, s.options.strict, t);
  if (!i)
    return { value: "", type: null, comment: "", range: [n, n, n] };
  const r = i.mode === ">" ? O.BLOCK_FOLDED : O.BLOCK_LITERAL, o = e.source ? pn(e.source) : [];
  let a = o.length;
  for (let d = o.length - 1; d >= 0; --d) {
    const f = o[d][1];
    if (f === "" || f === "\r")
      a = d;
    else
      break;
  }
  if (a === 0) {
    const d = i.chomp === "+" && o.length > 0 ? `
`.repeat(Math.max(1, o.length - 1)) : "";
    let f = n + i.length;
    return e.source && (f += e.source.length), { value: d, type: r, comment: i.comment, range: [n, f, f] };
  }
  let l = e.indent + i.indent, c = e.offset + i.length, m = 0;
  for (let d = 0; d < a; ++d) {
    const [f, g] = o[d];
    if (g === "" || g === "\r")
      i.indent === 0 && f.length > l && (l = f.length);
    else {
      f.length < l && t(c + f.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), i.indent === 0 && (l = f.length), m = d, l === 0 && !s.atRoot && t(c, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    c += f.length + g.length + 1;
  }
  for (let d = o.length - 1; d >= a; --d)
    o[d][0].length > l && (a = d + 1);
  let h = "", u = "", p = !1;
  for (let d = 0; d < m; ++d)
    h += o[d][0].slice(l) + `
`;
  for (let d = m; d < a; ++d) {
    let [f, g] = o[d];
    c += f.length + g.length + 1;
    const w = g[g.length - 1] === "\r";
    if (w && (g = g.slice(0, -1)), g && f.length < l) {
      const S = `Block scalar lines must not be less indented than their ${i.indent ? "explicit indentation indicator" : "first line"}`;
      t(c - g.length - (w ? 2 : 1), "BAD_INDENT", S), f = "";
    }
    r === O.BLOCK_LITERAL ? (h += u + f.slice(l) + g, u = `
`) : f.length > l || g[0] === "	" ? (u === " " ? u = `
` : !p && u === `
` && (u = `

`), h += u + f.slice(l) + g, u = `
`, p = !0) : g === "" ? u === `
` ? h += `
` : u = `
` : (h += u + g, u = " ", p = !1);
  }
  switch (i.chomp) {
    case "-":
      break;
    case "+":
      for (let d = a; d < o.length; ++d)
        h += `
` + o[d][0].slice(l);
      h[h.length - 1] !== `
` && (h += `
`);
      break;
    default:
      h += `
`;
  }
  const y = n + i.length + e.source.length;
  return { value: h, type: r, comment: i.comment, range: [n, y, y] };
}
function dn({ offset: s, props: e }, t, n) {
  if (e[0].type !== "block-scalar-header")
    return n(e[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: i } = e[0], r = i[0];
  let o = 0, a = "", l = -1;
  for (let u = 1; u < i.length; ++u) {
    const p = i[u];
    if (!a && (p === "-" || p === "+"))
      a = p;
    else {
      const y = Number(p);
      !o && y ? o = y : l === -1 && (l = s + u);
    }
  }
  l !== -1 && n(l, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${i}`);
  let c = !1, m = "", h = i.length;
  for (let u = 1; u < e.length; ++u) {
    const p = e[u];
    switch (p.type) {
      case "space":
        c = !0;
      // fallthrough
      case "newline":
        h += p.source.length;
        break;
      case "comment":
        t && !c && n(p, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), h += p.source.length, m = p.source.substring(1);
        break;
      case "error":
        n(p, "UNEXPECTED_TOKEN", p.message), h += p.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const y = `Unexpected token in block scalar header: ${p.type}`;
        n(p, "UNEXPECTED_TOKEN", y);
        const d = p.source;
        d && typeof d == "string" && (h += d.length);
      }
    }
  }
  return { mode: r, indent: o, chomp: a, comment: m, length: h };
}
function pn(s) {
  const e = s.split(/\n( *)/), t = e[0], n = t.match(/^( *)/), r = [n?.[1] ? [n[1], t.slice(n[1].length)] : ["", t]];
  for (let o = 1; o < e.length; o += 2)
    r.push([e[o], e[o + 1]]);
  return r;
}
function mn(s, e, t) {
  const { offset: n, type: i, source: r, end: o } = s;
  let a, l;
  const c = (u, p, y) => t(n + u, p, y);
  switch (i) {
    case "scalar":
      a = O.PLAIN, l = gn(r, c);
      break;
    case "single-quoted-scalar":
      a = O.QUOTE_SINGLE, l = yn(r, c);
      break;
    case "double-quoted-scalar":
      a = O.QUOTE_DOUBLE, l = bn(r, c);
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
  const m = n + r.length, h = Ee(o, m, e, t);
  return {
    value: l,
    type: a,
    comment: h.comment,
    range: [n, m, h.offset]
  };
}
function gn(s, e) {
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
  return t && e(0, "BAD_SCALAR_START", `Plain value cannot start with ${t}`), gs(s);
}
function yn(s, e) {
  return (s[s.length - 1] !== "'" || s.length === 1) && e(s.length, "MISSING_CHAR", "Missing closing 'quote"), gs(s.slice(1, -1)).replace(/''/g, "'");
}
function gs(s) {
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
  let r = t[1].replace(n, ""), o = " ", a = e.lastIndex;
  for (; t = e.exec(s); ) {
    const c = t[1].replace(i, "");
    c === "" ? o === `
` ? r += o : o = `
` : (r += o + c, o = " "), a = e.lastIndex;
  }
  const l = /[ \t]*(.*)/sy;
  return l.lastIndex = a, t = l.exec(s), r + o + (t?.[1] ?? "");
}
function bn(s, e) {
  let t = "";
  for (let n = 1; n < s.length - 1; ++n) {
    const i = s[n];
    if (!(i === "\r" && s[n + 1] === `
`))
      if (i === `
`) {
        const { fold: r, offset: o } = wn(s, n);
        t += r, n = o;
      } else if (i === "\\") {
        let r = s[++n];
        const o = kn[r];
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
          const a = r === "x" ? 2 : r === "u" ? 4 : 8;
          t += Sn(s, n + 1, a, e), n += a;
        } else {
          const a = s.substr(n - 1, 2);
          e(n - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${a}`), t += a;
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
function wn(s, e) {
  let t = "", n = s[e + 1];
  for (; (n === " " || n === "	" || n === `
` || n === "\r") && !(n === "\r" && s[e + 2] !== `
`); )
    n === `
` && (t += `
`), e += 1, n = s[e + 1];
  return t || (t = " "), { fold: t, offset: e };
}
const kn = {
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
function Sn(s, e, t, n) {
  const i = s.substr(e, t), o = i.length === t && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
  try {
    return String.fromCodePoint(o);
  } catch {
    const a = s.substr(e - 2, t + 2);
    return n(e - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${a}`), a;
  }
}
function ys(s, e, t, n) {
  const { value: i, type: r, comment: o, range: a } = e.type === "block-scalar" ? hn(s, e, n) : mn(e, s.options.strict, n), l = t ? s.directives.tagName(t.source, (h) => n(t, "TAG_RESOLVE_FAILED", h)) : null;
  let c;
  s.options.stringKeys && s.atKey ? c = s.schema[F] : l ? c = $n(s.schema, i, l, t, n) : e.type === "scalar" ? c = Nn(s, i, e, n) : c = s.schema[F];
  let m;
  try {
    const h = c.resolve(i, (u) => n(t ?? e, "TAG_RESOLVE_FAILED", u), s.options);
    m = A(h) ? h : new O(h);
  } catch (h) {
    const u = h instanceof Error ? h.message : String(h);
    n(t ?? e, "TAG_RESOLVE_FAILED", u), m = new O(i);
  }
  return m.range = a, m.source = i, r && (m.type = r), l && (m.tag = l), c.format && (m.format = c.format), o && (m.comment = o), m;
}
function $n(s, e, t, n, i) {
  if (t === "!")
    return s[F];
  const r = [];
  for (const a of s.tags)
    if (!a.collection && a.tag === t)
      if (a.default && a.test)
        r.push(a);
      else
        return a;
  for (const a of r)
    if (a.test?.test(e))
      return a;
  const o = s.knownTags[t];
  return o && !o.collection ? (s.tags.push(Object.assign({}, o, { default: !1, test: void 0 })), o) : (i(n, "TAG_RESOLVE_FAILED", `Unresolved tag: ${t}`, t !== "tag:yaml.org,2002:str"), s[F]);
}
function Nn({ atKey: s, directives: e, schema: t }, n, i, r) {
  const o = t.tags.find((a) => (a.default === !0 || s && a.default === "key") && a.test?.test(n)) || t[F];
  if (t.compat) {
    const a = t.compat.find((l) => l.default && l.test?.test(n)) ?? t[F];
    if (o.tag !== a.tag) {
      const l = e.tagString(o.tag), c = e.tagString(a.tag), m = `Value may be parsed as either ${l} or ${c}`;
      r(i, "TAG_RESOLVE_FAILED", m, !0);
    }
  }
  return o;
}
function On(s, e, t) {
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
const En = { composeNode: bs, composeEmptyNode: $t };
function bs(s, e, t, n) {
  const i = s.atKey, { spaceBefore: r, comment: o, anchor: a, tag: l } = t;
  let c, m = !0;
  switch (e.type) {
    case "alias":
      c = An(s, e, n), (a || l) && n(e, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      c = ys(s, e, l, n), a && (c.anchor = a.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        c = un(En, s, e, t, n), a && (c.anchor = a.source.substring(1));
      } catch (h) {
        const u = h instanceof Error ? h.message : String(h);
        n(e, "RESOURCE_EXHAUSTION", u);
      }
      break;
    default: {
      const h = e.type === "error" ? e.message : `Unsupported token (type: ${e.type})`;
      n(e, "UNEXPECTED_TOKEN", h), m = !1;
    }
  }
  return c ?? (c = $t(s, e.offset, void 0, null, t, n)), a && c.anchor === "" && n(a, "BAD_ALIAS", "Anchor cannot be an empty string"), i && s.options.stringKeys && (!A(c) || typeof c.value != "string" || c.tag && c.tag !== "tag:yaml.org,2002:str") && n(l ?? e, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), r && (c.spaceBefore = !0), o && (e.type === "scalar" && e.source === "" ? c.comment = o : c.commentBefore = o), s.options.keepSourceTokens && m && (c.srcToken = e), c;
}
function $t(s, e, t, n, { spaceBefore: i, comment: r, anchor: o, tag: a, end: l }, c) {
  const m = {
    type: "scalar",
    offset: On(e, t, n),
    indent: -1,
    source: ""
  }, h = ys(s, m, a, c);
  return o && (h.anchor = o.source.substring(1), h.anchor === "" && c(o, "BAD_ALIAS", "Anchor cannot be an empty string")), i && (h.spaceBefore = !0), r && (h.comment = r, h.range[2] = l), h;
}
function An({ options: s }, { offset: e, source: t, end: n }, i) {
  const r = new ft(t.substring(1));
  r.source === "" && i(e, "BAD_ALIAS", "Alias cannot be an empty string"), r.source.endsWith(":") && i(e + t.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const o = e + t.length, a = Ee(n, o, s.strict, i);
  return r.range = [e, o, a.offset], a.comment && (r.comment = a.comment), r;
}
function In(s, e, { offset: t, start: n, value: i, end: r }, o) {
  const a = Object.assign({ _directives: e }, s), l = new We(void 0, a), c = {
    atKey: !1,
    atRoot: !0,
    directives: l.directives,
    options: l.options,
    schema: l.schema
  }, m = ce(n, {
    indicator: "doc-start",
    next: i ?? r?.[0],
    offset: t,
    onError: o,
    parentIndent: 0,
    startOnNewline: !0
  });
  m.found && (l.directives.docStart = !0, i && (i.type === "block-map" || i.type === "block-seq") && !m.hasNewline && o(m.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), l.contents = i ? bs(c, i, m, o) : $t(c, m.end, n, null, m, o);
  const h = l.contents.range[2], u = Ee(r, h, !1, o);
  return u.comment && (l.comment = u.comment), l.range = [t, h, u.offset], l;
}
function me(s) {
  if (typeof s == "number")
    return [s, s + 1];
  if (Array.isArray(s))
    return s.length === 2 ? s : [s[0], s[1]];
  const { offset: e, source: t } = s;
  return [e, e + (typeof t == "string" ? t.length : 1)];
}
function Ct(s) {
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
class Tn {
  constructor(e = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (t, n, i, r) => {
      const o = me(t);
      r ? this.warnings.push(new an(o, n, i)) : this.errors.push(new ye(o, n, i));
    }, this.directives = new M({ version: e.version || "1.2" }), this.options = e;
  }
  decorate(e, t) {
    const { comment: n, afterEmptyLine: i } = Ct(this.prelude);
    if (n) {
      const r = e.contents;
      if (t)
        e.comment = e.comment ? `${e.comment}
${n}` : n;
      else if (i || e.directives.docStart || !r)
        e.commentBefore = n;
      else if (T(r) && !r.flow && r.items.length > 0) {
        let o = r.items[0];
        v(o) && (o = o.key);
        const a = o.commentBefore;
        o.commentBefore = a ? `${n}
${a}` : n;
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
      comment: Ct(this.prelude).comment,
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
          const r = me(e);
          r[0] += t, this.onError(r, "BAD_DIRECTIVE", n, i);
        }), this.prelude.push(e.source), this.atDirectives = !0;
        break;
      case "document": {
        const t = In(this.options, this.directives, e, this.onError);
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
        const t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, n = new ye(me(e), "UNEXPECTED_TOKEN", t);
        this.atDirectives || !this.doc ? this.errors.push(n) : this.doc.errors.push(n);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const n = "Unexpected doc-end without preceding document";
          this.errors.push(new ye(me(e), "UNEXPECTED_TOKEN", n));
          break;
        }
        this.doc.directives.docEnd = !0;
        const t = Ee(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), t.comment) {
          const n = this.doc.comment;
          this.doc.comment = n ? `${n}
${t.comment}` : t.comment;
        }
        this.doc.range[2] = t.offset;
        break;
      }
      default:
        this.errors.push(new ye(me(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
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
      const n = Object.assign({ _directives: this.directives }, this.options), i = new We(void 0, n);
      this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), i.range = [0, t, t], this.decorate(i, !1), yield i;
    }
  }
}
const ws = "\uFEFF", ks = "", Ss = "", at = "";
function Ln(s) {
  switch (s) {
    case ws:
      return "byte-order-mark";
    case ks:
      return "doc-mode";
    case Ss:
      return "flow-error-end";
    case at:
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
function q(s) {
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
const _t = new Set("0123456789ABCDEFabcdef"), vn = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), Le = new Set(",[]{}"), Cn = new Set(` ,[]{}
\r	`), tt = (s) => !s || Cn.has(s);
class _n {
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
      if ((n === "---" || n === "...") && q(this.buffer[e + 3]))
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
    if (e[0] === ws && (yield* this.pushCount(1), e = e.substring(1)), e[0] === "%") {
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
    return yield ks, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const e = this.charAt(0);
    if (!e && !this.atEnd)
      return this.setNext("line-start");
    if (e === "-" || e === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const t = this.peek(3);
      if ((t === "---" || t === "...") && q(this.charAt(3)))
        return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, t === "---" ? "doc" : "stream";
    }
    return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !q(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [e, t] = this.peek(2);
    if (!t && !this.atEnd)
      return this.setNext("block-start");
    if ((e === "-" || e === "?" || e === ":") && q(t)) {
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
        return yield* this.pushUntil(tt), "doc";
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
    if ((n !== -1 && n < this.indentNext && i[0] !== "#" || n === 0 && (i.startsWith("---") || i.startsWith("...")) && q(i[3])) && !(n === this.indentNext - 1 && this.flowLevel === 1 && (i[0] === "]" || i[0] === "}")))
      return this.flowLevel = 0, yield Ss, yield* this.parseLineStart();
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
        return yield* this.pushUntil(tt), "flow";
      case '"':
      case "'":
        return this.flowKey = !0, yield* this.parseQuotedScalar();
      case ":": {
        const o = this.charAt(1);
        if (this.flowKey || q(o) || o === ",")
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
    return yield* this.pushUntil((t) => q(t) || t === "#");
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
        const a = r;
        for (; o === " "; )
          o = this.buffer[--r];
        if (o === `
` && r >= this.pos && r + 1 + t > a)
          e = r;
        else
          break;
      } while (!0);
    return yield at, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let t = this.pos - 1, n = this.pos - 1, i;
    for (; i = this.buffer[++n]; )
      if (i === ":") {
        const r = this.buffer[n + 1];
        if (q(r) || e && Le.has(r))
          break;
        t = n;
      } else if (q(i)) {
        let r = this.buffer[n + 1];
        if (i === "\r" && (r === `
` ? (n += 1, i = `
`, r = this.buffer[n + 1]) : t = n), r === "#" || e && Le.has(r))
          break;
        if (i === `
`) {
          const o = this.continueScalar(n + 1);
          if (o === -1)
            break;
          n = Math.max(n, o - 2);
        }
      } else {
        if (e && Le.has(i))
          break;
        t = n;
      }
    return !i && !this.atEnd ? this.setNext("plain-scalar") : (yield at, yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
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
          e += yield* this.pushUntil(tt), e += yield* this.pushSpaces(!0);
          continue e;
        case "-":
        // this is an error
        case "?":
        // this is an error outside flow collections
        case ":": {
          const t = this.flowLevel > 0, n = this.charAt(1);
          if (q(n) || t && Le.has(n)) {
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
      for (; !q(t) && t !== ">"; )
        t = this.buffer[++e];
      return yield* this.pushToIndex(t === ">" ? e + 1 : e, !1);
    } else {
      let e = this.pos + 1, t = this.buffer[e];
      for (; t; )
        if (vn.has(t))
          t = this.buffer[++e];
        else if (t === "%" && _t.has(this.buffer[e + 1]) && _t.has(this.buffer[e + 2]))
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
class Mn {
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
function J(s, e) {
  for (let t = 0; t < s.length; ++t)
    if (s[t].type === e)
      return !0;
  return !1;
}
function Mt(s) {
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
function $s(s) {
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
function ve(s) {
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
function ee(s) {
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
function qe(s, e) {
  if (e.length < 1e5)
    Array.prototype.push.apply(s, e);
  else
    for (let t = 0; t < e.length; ++t)
      s.push(e[t]);
}
function Bt(s) {
  if (s.start.type === "flow-seq-start")
    for (const e of s.items)
      e.sep && !e.value && !J(e.start, "explicit-key-ind") && !J(e.sep, "map-value-ind") && (e.key && (e.value = e.key), delete e.key, $s(e.value) ? e.value.end ? qe(e.value.end, e.sep) : e.value.end = e.sep : qe(e.start, e.sep), delete e.sep);
}
class Bn {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(e) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new _n(), this.onNewLine = e;
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
    const t = Ln(e);
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
      switch (t.type === "block-scalar" ? t.indent = "indent" in n ? n.indent : 0 : t.type === "flow-collection" && n.type === "document" && (t.indent = 0), t.type === "flow-collection" && Bt(t), n.type) {
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
        i && !i.sep && !i.value && i.start.length > 0 && Mt(i.start) === -1 && (t.indent === 0 || i.start.every((r) => r.type !== "comment" || r.indent < t.indent)) && (n.type === "document" ? n.end = i.start : n.items.push({ start: i.start }), t.items.splice(-1, 1));
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
        Mt(e.start) !== -1 ? (yield* this.pop(), yield* this.step()) : e.start.push(this.sourceToken);
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
      const t = ve(this.peek(2)), n = ee(t);
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
              qe(i, t.start), i.push(this.sourceToken), e.items.pop();
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
        for (let a = 0; a < t.sep.length; ++a) {
          const l = t.sep[a];
          switch (l.type) {
            case "newline":
              o.push(a);
              break;
            case "space":
              break;
            case "comment":
              l.indent > e.indent && (o.length = 0);
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
              else if (J(t.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: r, key: null, sep: [this.sourceToken] }]
                });
              else if ($s(t.key) && !J(t.sep, "newline")) {
                const o = ee(t.start), a = t.key, l = t.sep;
                l.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: a, sep: l }]
                });
              } else r.length > 0 ? t.sep = t.sep.concat(r, this.sourceToken) : t.sep.push(this.sourceToken);
            else if (J(t.start, "newline"))
              Object.assign(t, { key: null, sep: [this.sourceToken] });
            else {
              const o = ee(t.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: o, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            t.sep ? t.value || i ? e.items.push({ start: r, key: null, sep: [this.sourceToken] }) : J(t.sep, "map-value-ind") ? this.stack.push({
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
              if (!t.explicitKey && t.sep && !J(t.sep, "newline")) {
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
              qe(i, t.start), i.push(this.sourceToken), e.items.pop();
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
        t.value || J(t.start, "seq-item-ind") ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
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
        const i = ve(n), r = ee(i);
        Bt(e);
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
        const t = ve(e), n = ee(t);
        return n.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: n, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const t = ve(e), n = ee(t);
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
function jn(s) {
  const e = s.prettyErrors !== !1;
  return { lineCounter: s.lineCounter || e && new Mn() || null, prettyErrors: e };
}
function Kn(s, e = {}) {
  const { lineCounter: t, prettyErrors: n } = jn(e), i = new Bn(t?.addNewLine), r = new Tn(e);
  let o = null;
  for (const a of r.compose(i.parse(s), !0, s.length))
    if (!o)
      o = a;
    else if (o.options.logLevel !== "silent") {
      o.errors.push(new ye(a.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return n && t && (o.errors.forEach(Lt(s, t)), o.warnings.forEach(Lt(s, t))), o;
}
function H(s, e) {
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
function Ce(s, e) {
  if (!Array.isArray(s)) throw new Error(`${e}: 목록이 필요합니다.`);
  return s;
}
function te(s, e, t) {
  for (const n of Object.keys(s))
    if (!e.includes(n))
      throw new Error(`${t}: 알 수 없는 항목 '${n}'.`);
}
function se(s, e, t, n) {
  if (s !== void 0) {
    if (typeof s != "number" || !Number.isFinite(s) || s < e || s > t)
      throw new Error(`${n}: ${e}~${t} 사이 숫자가 필요합니다.`);
    return s;
  }
}
function Pn(s) {
  if (s.length > 1e5)
    throw new Error("코드가 너무 깁니다. 100KB 이내로 작성하세요.");
  const e = Kn(s, { uniqueKeys: !0 });
  if (e.errors.length) throw new Error(e.errors[0].message);
  const t = H(e.toJS({ maxAliasCount: 20 }), "만화");
  te(t, ["title", "cast", "panels"], "만화");
  const n = /* @__PURE__ */ Object.create(null);
  for (const [r, o] of Object.entries(H(t.cast, "cast"))) {
    const a = H(o, `cast.${r}`);
    te(a, ["asset", "label"], `cast.${r}`);
    const l = j(a.asset, `cast.${r}.asset`);
    if (!Object.hasOwn(Pt, l))
      throw new Error(`cast.${r}: 없는 에셋 '${l}'.`);
    n[r] = {
      asset: l,
      label: a.label === void 0 ? r : j(a.label, `cast.${r}.label`)
    };
  }
  const i = Ce(t.panels, "panels").map((r, o) => {
    const a = `컷 ${o + 1}`, l = H(r, a);
    te(l, ["actors", "dialogue", "transfer"], a);
    const c = Ce(l.actors, `${a}.actors`).map((u) => {
      const p = typeof u == "string" ? { id: u } : H(u, `${a}.actors`);
      te(
        p,
        ["id", "expression", "gesture", "holding", "x", "y", "scale"],
        `${a}.actors`
      );
      const y = j(p.id, `${a}.actor.id`), d = p.expression === void 0 ? "neutral" : j(p.expression, `${a}.${y}.expression`);
      if (!Object.hasOwn(n, y))
        throw new Error(`${a}: 없는 캐릭터 '${y}'.`);
      if (!Object.hasOwn(Dt, d))
        throw new Error(`${a}.${y}: 없는 표정 '${d}'.`);
      const f = p.gesture === void 0 ? void 0 : j(p.gesture, `${a}.${y}.gesture`), g = p.holding === void 0 ? void 0 : j(p.holding, `${a}.${y}.holding`);
      if (f && !Object.hasOwn(qt, f))
        throw new Error(`${a}.${y}: 없는 손 제스처 '${f}'.`);
      if (g && !Object.hasOwn(Ke, g))
        throw new Error(`${a}.${y}: 없는 소품 '${g}'.`);
      return {
        id: y,
        expression: d,
        gesture: f,
        holding: g,
        x: se(p.x, 0, 1, `${a}.${y}.x`),
        y: se(p.y, 0, 1, `${a}.${y}.y`),
        scale: se(p.scale, 0.5, 1.25, `${a}.${y}.scale`) ?? 1
      };
    });
    if (c.length < 1 || c.length > 3)
      throw new Error(`${a}: 캐릭터는 1~3명이어야 합니다.`);
    if (new Set(c.map((u) => u.id)).size !== c.length)
      throw new Error(`${a}: 캐릭터 식별자가 중복됩니다.`);
    const m = Ce(l.dialogue ?? [], `${a}.dialogue`).map(
      (u) => {
        const p = H(u, `${a}.dialogue`);
        te(
          p,
          ["from", "to", "text", "x", "y", "fontSize"],
          `${a}.dialogue`
        );
        const y = j(p.from, `${a}.dialogue.from`), d = p.to === void 0 ? void 0 : j(p.to, `${a}.dialogue.to`);
        if (!c.some((f) => f.id === y))
          throw new Error(`${a}: 화자 '${y}'가 컷에 없습니다.`);
        if (d && !c.some((f) => f.id === d))
          throw new Error(`${a}: 대화 상대 '${d}'가 컷에 없습니다.`);
        return {
          from: y,
          to: d,
          text: j(p.text, `${a}.dialogue.text`),
          x: se(p.x, 0, 1, `${a}.dialogue.x`),
          y: se(p.y, 0, 1, `${a}.dialogue.y`),
          fontSize: se(p.fontSize, 12, 32, `${a}.dialogue.fontSize`) ?? 18
        };
      }
    );
    if (m.length > 20)
      throw new Error(`${a}: 대사는 20개 이내로 작성하세요.`);
    const h = Ce(l.transfer ?? [], `${a}.transfer`).map(
      (u) => {
        const p = H(u, `${a}.transfer`);
        te(p, ["from", "to", "prop"], `${a}.transfer`);
        const y = j(p.from, `${a}.transfer.from`), d = j(p.to, `${a}.transfer.to`), f = j(p.prop, `${a}.transfer.prop`);
        if (!c.some((g) => g.id === y))
          throw new Error(`${a}: 전달 주체 '${y}'가 컷에 없습니다.`);
        if (!c.some((g) => g.id === d))
          throw new Error(`${a}: 전달 대상 '${d}'가 컷에 없습니다.`);
        if (y === d)
          throw new Error(`${a}: 전달 주체와 대상은 달라야 합니다.`);
        if (!Object.hasOwn(Ke, f))
          throw new Error(`${a}: 없는 소품 '${f}'.`);
        return { from: y, to: d, prop: f };
      }
    );
    if (h.length > 6)
      throw new Error(`${a}: 소품 전달은 6개 이내로 작성하세요.`);
    return { actors: c, dialogue: m, transfer: h };
  });
  if (i.length < 1 || i.length > 30)
    throw new Error("컷은 1~30개여야 합니다.");
  return {
    title: t.title === void 0 ? "Comic Gen" : j(t.title, "title"),
    cast: n,
    panels: i
  };
}
const _e = (s, e, t) => Math.max(e, Math.min(t, s));
function jt(s, e, t, n) {
  const i = document.createElement("canvas").getContext("2d");
  i.font = `${t}px ${n}`;
  const r = [];
  for (const o of s.split(`
`)) {
    let a = "";
    for (const l of Array.from(o))
      a && i.measureText(a + l).width > e && (r.push(a), a = ""), a += l;
    r.push(a);
  }
  return r;
}
function Dn(s, e, t, n) {
  const i = Math.min(t - 80, 390), r = s.dialogue.map((f) => ({
    line: f,
    lines: jt(f.text, i - 36, f.fontSize, n),
    lineHeight: Math.ceil(f.fontSize * 1.45)
  })), o = r.reduce(
    (f, g) => f + 60 + g.lines.length * g.lineHeight,
    20
  ), a = o + 254 + s.transfer.length * 38, l = Math.max(
    ...s.actors.map((f) => f.holding || f.gesture ? 92 : 60)
  ), c = (t - 72) / s.actors.length, m = Math.min(
    1,
    (c - 12) / (2 * l * Math.max(...s.actors.map((f) => f.scale)))
  ), h = s.actors.map((f) => f.scale * m), u = s.actors.map(
    (f, g) => _e(
      36 + (t - 72) * (f.x ?? (g + 0.5) / s.actors.length),
      26 + l * h[g],
      t - 26 - l * h[g]
    )
  ), p = s.actors.map(
    (f, g) => _e(
      f.y === void 0 ? a - 126 : f.y * a,
      o + 70 * h[g],
      a - 126 * h[g]
    )
  );
  for (let f = 0; f < s.actors.length; f++)
    for (let g = f + 1; g < s.actors.length; g++)
      if (Math.abs(u[f] - u[g]) < l * (h[f] + h[g]) && Math.abs(p[f] - p[g]) < 120 * Math.max(h[f], h[g]))
        throw new Error(
          `캐릭터 '${s.actors[f].id}'와 '${s.actors[g].id}'가 겹칩니다. x/y 또는 scale을 조정하세요.`
        );
  const y = [
    `<rect x="20" y="0" width="${t - 40}" height="${a}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/>`
  ];
  let d = 20;
  return r.forEach(({ line: f, lines: g, lineHeight: w }) => {
    const k = u[s.actors.findIndex((b) => b.id === f.from)], S = _e(
      (f.x === void 0 ? k : f.x * t) - i / 2,
      40,
      t - i - 40
    ), $ = 28 + g.length * w, N = f.y === void 0 ? d : _e(f.y * a, 20, o - $), E = Math.max(S + 20, Math.min(S + i - 20, k));
    y.push(
      `<g data-dialogue="${R(f.from)}" data-to="${R(f.to ?? "")}"><path d="M${E - 9} ${N + $ - 1}L${k} ${p[s.actors.findIndex((b) => b.id === f.from)] - 65} ${E + 9} ${N + $ - 1}" fill="#fffaf0" stroke="#303341" stroke-width="1.5"/><rect x="${S}" y="${N}" width="${i}" height="${$}" rx="14" fill="#fffaf0" stroke="#303341" stroke-width="2"/><text x="${S + 18}" y="${N + 18 + f.fontSize}" font-size="${f.fontSize}">${g.map((b, I) => `<tspan x="${S + 18}" dy="${I ? w : 0}">${R(b)}</tspan>`).join("")}</text></g>`
    ), d += $ + 32;
  }), s.actors.forEach((f, g) => {
    const w = e[f.id], k = Pt[w.asset], S = s.dialogue.find(
      (_) => _.from === f.id && _.to
    )?.to, $ = s.actors.findIndex((_) => _.id === S), N = $ < 0 ? 0 : Math.sign(u[$] - u[g]) * 4, E = jt(
      w.label,
      (t - 72) / s.actors.length - 12,
      16,
      n
    );
    if (E.length > 2)
      throw new Error(`캐릭터 '${f.id}'의 이름표가 너무 깁니다.`);
    const b = f.gesture ? `<g data-gesture="${f.gesture}">${qt[f.gesture]}</g>` : "", I = f.holding ? `<g data-holding="${f.holding}"><circle data-hand="holding" cx="58" cy="20" r="11" fill="white"/><g data-prop="${f.holding}" transform="translate(73 6)">${Ke[f.holding]}</g></g>` : "";
    y.push(
      `<g data-character="${R(f.id)}" transform="translate(${u[g]} ${p[g]}) scale(${h[g]})" stroke="#303341" stroke-width="2.8" stroke-linecap="round"><ellipse cy="69" rx="51" ry="7" fill="#e8edf3" stroke="none"/>${k.body}<g transform="translate(${N} ${k.faceY})" fill="#303341">${Dt[f.expression]}</g>${b}${I}<text y="94" text-anchor="middle" stroke="none" fill="#303341" font-size="16">${E.map((_, Y) => `<tspan x="0" dy="${Y ? 18 : 0}">${R(_)}</tspan>`).join("")}</text></g>`
    );
  }), s.transfer.forEach((f, g) => {
    const w = u[s.actors.findIndex((b) => b.id === f.from)], k = u[s.actors.findIndex((b) => b.id === f.to)], S = Math.sign(k - w), $ = w + 66 * S, N = k - 66 * S, E = o + 28 + g * 38;
    y.push(
      `<g data-transfer="${R(f.from)}" data-to="${R(f.to)}" stroke="#586c8c" stroke-width="2.5"><path d="M${$} ${E}H${N}m${-S * 8} -5 ${S * 8} 5 ${-S * 8} 5" fill="none"/><circle data-hand="transfer" cx="${$}" cy="${E}" r="9" fill="white"/><g data-prop="${f.prop}" transform="translate(${(w + k) / 2} ${E - 16})">${Ke[f.prop]}</g></g>`
    );
  }), { markup: y.join(""), height: a };
}
let Ns = 0;
document.fonts.addEventListener("loadingdone", (s) => {
  s.fontfaces.length && Ns++;
});
function qn(s, e, t) {
  try {
    const n = Pn(s), i = e.width ?? 720;
    if (!Number.isFinite(i) || i < 480 || i > 2400)
      throw new Error("너비는 480~2400 사이여야 합니다.");
    const r = e.font ?? "Malgun Gothic, Apple SD Gothic Neo, sans-serif";
    if (typeof r != "string" || r.length > 300 || /[<>]/.test(r))
      throw new Error("올바른 글꼴 이름이 필요합니다.");
    const o = [];
    let a = 0, l = 0, c = 68;
    for (const [u, p] of n.panels.entries()) {
      const y = p.actors.map((k) => [
        k.id,
        n.cast[k.id]
      ]), d = JSON.stringify({
        panel: p,
        members: y,
        width: i,
        font: r,
        fontEpoch: Ns,
        fontVersion: e.fontVersion,
        assetVersion: "1",
        layoutVersion: 1
      }), f = t.get(d), { markup: g, height: w } = f ?? Dn(p, n.cast, i, r);
      f ? a++ : (l++, t.set(d, { markup: g, height: w })), o.push(
        `<g data-panel="${u}" transform="translate(0 ${c})">${g}</g>`
      ), c += w + 24;
    }
    const m = c;
    return {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${m}" viewBox="0 0 ${i} ${m}" role="img" aria-label="${R(n.title)}"><title>${R(n.title)}</title><rect width="100%" height="100%" fill="#f5f7fb"/><g font-family="${R(r)}" fill="#303341"><text x="24" y="42" font-size="24" font-weight="700">${R(n.title)}</text>${o.join("")}</g></svg>`,
      width: i,
      height: m,
      diagnostics: [],
      cache: { hits: a, misses: l, bytes: t.bytes }
    };
  } catch (n) {
    return {
      svg: "",
      width: 0,
      height: 0,
      diagnostics: [n instanceof Error ? n.message : "렌더링 실패"]
    };
  }
}
function Os(s = 2e6) {
  const e = new Es(s);
  return {
    render: (t, n = {}) => qn(t, n, e),
    clearCache: () => e.clear()
  };
}
const Fn = Os().render, Kt = /* @__PURE__ */ new WeakMap(), Rn = Os();
function xn(s = document, e = {}) {
  const t = [];
  for (const n of s.querySelectorAll(
    "pre[data-comic], pre:has(code.language-comic)"
  )) {
    const i = (n.querySelector("code") ?? n).textContent ?? "", r = Rn.render(i, e);
    let o = Kt.get(n);
    if (o || (o = document.createElement("figure"), o.className = "comic-figure", n.after(o), Kt.set(n, o)), r.svg)
      o.innerHTML = r.svg, n.hidden = !0;
    else {
      o.replaceChildren();
      const a = document.createElement("p");
      a.setAttribute("role", "alert"), a.textContent = r.diagnostics.join(`
`), o.append(a), n.hidden = !1;
    }
    t.push(r);
  }
  return t;
}
function Vn(s, e) {
  const t = URL.createObjectURL(s), n = document.createElement("a");
  n.href = t, n.download = e, n.click(), setTimeout(() => URL.revokeObjectURL(t), 1e3);
}
async function Yn(s, e = 1) {
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
    const a = o.getContext("2d");
    if (!a) throw new Error("이 브라우저에서는 PNG를 만들 수 없습니다.");
    return a.drawImage(r, 0, 0, t, n), await new Promise(
      (l, c) => o.toBlob(
        (m) => m ? l(m) : c(new Error("PNG 생성에 실패했습니다.")),
        "image/png"
      )
    );
  } finally {
    URL.revokeObjectURL(i);
  }
}
export {
  Un as assetVersion,
  Os as createRenderer,
  Vn as downloadBlob,
  Yn as exportPng,
  xn as renderCodeBlocks,
  Fn as renderComic
};
