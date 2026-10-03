/*! Comic Gen browser SDK v0.7.1
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
const oe = Object.freeze({
  skinColor: "#f0c8a6",
  hairStyle: "short",
  hairColor: "#47362f",
  outfit: "shirt",
  outfitColor: "#647bd6",
  glasses: !1
}), ht = (s) => {
  if (s.length !== 4 && s.length !== 7 || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(s))
    throw new Error("사람의 외형 색상은 #RGB 또는 #RRGGBB로 작성하세요.");
  return s;
};
function cs(s = oe) {
  const e = ht(s.skinColor), t = ht(s.hairColor), n = ht(s.outfitColor), i = {
    short: "",
    bob: `<path d="M-37 -24Q-42 -56 0 -58Q42 -56 37 -24L41 17Q29 26 20 15H-20Q-29 26 -41 17Z" fill="${t}"/>`,
    long: `<path d="M-37 -24Q-43 -56 0 -58Q43 -56 37 -24L43 46Q30 53 23 40H-23Q-30 53 -43 46Z" fill="${t}"/>`,
    bald: ""
  }, r = {
    short: `<path d="M-36 -24Q-40 -52 -11 -57Q21 -63 36 -37L37 -23L29 -32L26 -43Q13 -43 3 -48Q-9 -42 -25 -43L-30 -31Z" fill="${t}"/>`,
    bob: `<path d="M-37 -23Q-42 -55 0 -58Q42 -55 37 -23L32 8L28 -13L27 -41Q7 -47 -8 -43Q-18 -46 -27 -41L-28 -13L-32 8Z" fill="${t}"/>`,
    long: `<path d="M-37 -24Q-41 -55 0 -58Q41 -55 37 -24L32 16L28 -9L27 -41Q12 -46 2 -50Q-9 -43 -27 -39L-28 -9L-32 16Z" fill="${t}"/>`,
    bald: ""
  }, o = {
    shirt: `<path d="M-16 21L-34 25Q-43 29 -45 38L-49 44L-37 49L-34 56H34L37 49L49 44L45 38Q43 29 34 25L16 21Z" fill="${n}"/><path d="M-15 23Q0 38 15 23M-45 39L-36 43M36 43L45 39" fill="none"/>`,
    jacket: `<path d="M-16 21L-34 25Q-43 29 -45 39L-49 47L-36 51L-33 56H33L36 51L49 47L45 39Q43 29 34 25L16 21Z" fill="${n}"/><path d="M-12 23L0 31L12 23L16 56H-16Z" fill="#f4f5f9"/><path d="M-16 22L-23 32L-12 36L-17 55M16 22L23 32L12 36L17 55M-31 41H-21M21 41H31" fill="none"/>`,
    hoodie: `<path d="M-17 21L-33 25Q-43 29 -45 39L-49 47L-36 52L-33 56H33L36 52L49 47L45 39Q43 29 33 25L17 21Z" fill="${n}"/><path d="M-21 20Q-29 23 -25 32Q0 45 25 32Q29 23 21 20L12 22Q0 32 -12 22Z" fill="${n}"/><path d="M-17 43H17L21 54H-21ZM-10 32V40M10 32V40" fill="none"/>`
  };
  if (!Object.hasOwn(r, s.hairStyle) || !Object.hasOwn(o, s.outfit))
    throw new Error("지원하는 머리 모양과 옷을 선택하세요.");
  const a = (f, d) => d ? `<g data-human-part="${f}">${d}</g>` : "", c = s.glasses ? '<g data-human-part="glasses" fill="none" stroke-width="2.2"><circle cx="-17" cy="-20" r="11"/><circle cx="17" cy="-20" r="11"/><path d="M-6 -20Q0 -24 6 -20M-28 -22L-34 -25M28 -22L34 -25"/></g>' : "", l = `<g data-human="true" data-hair-style="${s.hairStyle}" data-outfit="${s.outfit}">${a("hair-back", i[s.hairStyle])}${a("outfit", o[s.outfit])}${a("neck", `<path d="M-10 11V24Q0 33 10 24V11Z" fill="${e}"/>`)}${a("ears", `<ellipse cx="-36" cy="-17" rx="7" ry="9" fill="${e}"/><ellipse cx="36" cy="-17" rx="7" ry="9" fill="${e}"/><path d="M-37 -21Q-41 -17 -37 -13M37 -21Q41 -17 37 -13" fill="none" stroke-width="1.8"/>`)}${a("face", `<path d="M-34 -25Q-36 -54 0 -55Q36 -54 34 -25L32 -5Q29 18 0 21Q-29 18 -32 -5Z" fill="${e}"/><g stroke="none" fill="#df8e8b" fill-opacity=".28"><ellipse cx="-24" cy="-8" rx="5" ry="3"/><ellipse cx="24" cy="-8" rx="5" ry="3"/></g>`)}${a("hair-front", r[s.hairStyle])}${a("nose", '<path d="M0 -13V-7H3" fill="none" stroke-width="1.8"/>')}${c}</g>`, u = `<path d="M-49 43Q-54 46 -51 51L-48 55Q-44 59 -40 55L-36 50Q-34 46 -38 43L-40 42Z" fill="${e}"/><path d="M-46 48L-43 51M-42 46L-39 49" fill="none" stroke-width="1.5"/>`;
  return {
    body: l,
    faceY: -16,
    color: e,
    restingHands: {
      left: `<g data-human-part="resting-hand-left">${u}</g>`,
      right: `<g data-human-part="resting-hand-right" transform="scale(-1 1)">${u}</g>`
    }
  };
}
const on = "2", fs = {
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
  },
  human: cs()
};
function Gt(s) {
  return s.asset === "human" ? cs(s.appearance) : fs[s.asset];
}
const us = {
  neutral: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-10 17q10 7 20 0" fill="none"/>',
  happy: '<path d="M-25 -2q8 -12 16 0m18 0q8 -12 16 0M-13 16q13 18 26 0" fill="none"/>',
  confused: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-24 -17l13 -5m21 1 14 4M-8 18q8 -6 16 0" fill="none"/>',
  sad: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-12 23q12 -14 24 0" fill="none"/>',
  angry: '<path d="M-25 -16l15 6m20 0 15 -6M-10 20h20" fill="none"/><circle cx="-17" cy="-1" r="3"/><circle cx="17" cy="-1" r="3"/>'
}, kt = {
  wave: '<g data-hand="wave"><circle cx="-65" cy="-22" r="12" fill="white"/><path d="M-77 -42l-4 -8m15 2v-10m13 17 5 -7" fill="none"/></g>',
  point: '<g data-hand="point"><circle cx="-65" cy="0" r="11" fill="white"/><path d="M-77 0h-13" fill="none"/></g>'
}, Je = {
  request: '<rect x="-18" y="-13" width="36" height="26" rx="4" fill="#f9f0cd"/><path d="M-18 -13L0 1l18 -14" fill="none"/>',
  data: '<path d="M-16 -12v23c0 10 32 10 32 0v-23" fill="#daccff"/><ellipse cy="-12" rx="16" ry="6" fill="#ece4ff"/>',
  key: '<circle cx="-10" r="9" fill="#ffe0a8"/><path d="M0 0h21m-5 0v8m-8 -8v6" fill="none"/>'
};
function K(s) {
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
class an {
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
const It = /* @__PURE__ */ Symbol.for("yaml.alias"), St = /* @__PURE__ */ Symbol.for("yaml.document"), te = /* @__PURE__ */ Symbol.for("yaml.map"), hs = /* @__PURE__ */ Symbol.for("yaml.pair"), Y = /* @__PURE__ */ Symbol.for("yaml.scalar"), ke = /* @__PURE__ */ Symbol.for("yaml.seq"), U = /* @__PURE__ */ Symbol.for("yaml.node.type"), Se = (s) => !!s && typeof s == "object" && s[U] === It, et = (s) => !!s && typeof s == "object" && s[U] === St, Pe = (s) => !!s && typeof s == "object" && s[U] === te, C = (s) => !!s && typeof s == "object" && s[U] === hs, T = (s) => !!s && typeof s == "object" && s[U] === Y, xe = (s) => !!s && typeof s == "object" && s[U] === ke;
function I(s) {
  if (s && typeof s == "object")
    switch (s[U]) {
      case te:
      case ke:
        return !0;
    }
  return !1;
}
function M(s) {
  if (s && typeof s == "object")
    switch (s[U]) {
      case It:
      case te:
      case Y:
      case ke:
        return !0;
    }
  return !1;
}
const ds = (s) => (T(s) || I(s)) && !!s.anchor, ae = /* @__PURE__ */ Symbol("break visit"), ln = /* @__PURE__ */ Symbol("skip children"), Me = /* @__PURE__ */ Symbol("remove node");
function Ee(s, e) {
  const t = cn(e);
  et(s) ? pe(null, s.contents, t, Object.freeze([s])) === Me && (s.contents = null) : pe(null, s, t, Object.freeze([]));
}
Ee.BREAK = ae;
Ee.SKIP = ln;
Ee.REMOVE = Me;
function pe(s, e, t, n) {
  const i = fn(s, e, t, n);
  if (M(i) || C(i))
    return un(s, n, i), pe(s, i, t, n);
  if (typeof i != "symbol") {
    if (I(e)) {
      n = Object.freeze(n.concat(e));
      for (let r = 0; r < e.items.length; ++r) {
        const o = pe(r, e.items[r], t, n);
        if (typeof o == "number")
          r = o - 1;
        else {
          if (o === ae)
            return ae;
          o === Me && (e.items.splice(r, 1), r -= 1);
        }
      }
    } else if (C(e)) {
      n = Object.freeze(n.concat(e));
      const r = pe("key", e.key, t, n);
      if (r === ae)
        return ae;
      r === Me && (e.key = null);
      const o = pe("value", e.value, t, n);
      if (o === ae)
        return ae;
      o === Me && (e.value = null);
    }
  }
  return i;
}
function cn(s) {
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
function fn(s, e, t, n) {
  if (typeof t == "function")
    return t(s, e, n);
  if (Pe(e))
    return t.Map?.(s, e, n);
  if (xe(e))
    return t.Seq?.(s, e, n);
  if (C(e))
    return t.Pair?.(s, e, n);
  if (T(e))
    return t.Scalar?.(s, e, n);
  if (Se(e))
    return t.Alias?.(s, e, n);
}
function un(s, e, t) {
  const n = e[e.length - 1];
  if (I(n))
    n.items[s] = t;
  else if (C(n))
    s === "key" ? n.key = t : n.value = t;
  else if (et(n))
    n.contents = t;
  else {
    const i = Se(n) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${i} parent`);
  }
}
const hn = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, dn = (s) => s.replace(/[!,[\]{}]/g, (e) => hn[e]);
class x {
  constructor(e, t) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, x.defaultYaml, e), this.tags = Object.assign({}, x.defaultTags, t);
  }
  clone() {
    const e = new x(this.yaml, this.tags);
    return e.docStart = this.docStart, e;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const e = new x(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: x.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, x.defaultTags);
        break;
    }
    return e;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(e, t) {
    this.atNextDocument && (this.yaml = { explicit: x.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, x.defaultTags), this.atNextDocument = !1);
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
        return t + dn(e.substring(n.length));
    return e[0] === "!" ? e : `!<${e}>`;
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], n = Object.entries(this.tags);
    let i;
    if (e && n.length > 0 && M(e.contents)) {
      const r = {};
      Ee(e.contents, (o, a) => {
        M(a) && a.tag && (r[a.tag] = !0);
      }), i = Object.keys(r);
    } else
      i = [];
    for (const [r, o] of n)
      r === "!!" && o === "tag:yaml.org,2002:" || (!e || i.some((a) => a.startsWith(o))) && t.push(`%TAG ${r} ${o}`);
    return t.join(`
`);
  }
}
x.defaultYaml = { explicit: !1, version: "1.2" };
x.defaultTags = { "!!": "tag:yaml.org,2002:" };
function ps(s) {
  if (/[\x00-\x19\s,[\]{}]/.test(s)) {
    const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(s)}`;
    throw new Error(t);
  }
  return !0;
}
function ms(s) {
  const e = /* @__PURE__ */ new Set();
  return Ee(s, {
    Value(t, n) {
      n.anchor && e.add(n.anchor);
    }
  }), e;
}
function gs(s, e) {
  for (let t = 1; ; ++t) {
    const n = `${s}${t}`;
    if (!e.has(n))
      return n;
  }
}
function pn(s, e) {
  const t = [], n = /* @__PURE__ */ new Map();
  let i = null;
  return {
    onAnchor: (r) => {
      t.push(r), i ?? (i = ms(s));
      const o = gs(e, i);
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
        if (typeof o == "object" && o.anchor && (T(o.node) || I(o.node)))
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
function me(s, e, t, n) {
  if (n && typeof n == "object")
    if (Array.isArray(n))
      for (let i = 0, r = n.length; i < r; ++i) {
        const o = n[i], a = me(s, n, String(i), o);
        a === void 0 ? delete n[i] : a !== o && (n[i] = a);
      }
    else if (n instanceof Map)
      for (const i of Array.from(n.keys())) {
        const r = n.get(i), o = me(s, n, i, r);
        o === void 0 ? n.delete(i) : o !== r && n.set(i, o);
      }
    else if (n instanceof Set)
      for (const i of Array.from(n)) {
        const r = me(s, n, i, i);
        r === void 0 ? n.delete(i) : r !== i && (n.delete(i), n.add(r));
      }
    else
      for (const [i, r] of Object.entries(n)) {
        const o = me(s, n, i, r);
        o === void 0 ? delete n[i] : o !== r && (n[i] = o);
      }
  return s.call(e, t, n);
}
function R(s, e, t) {
  if (Array.isArray(s))
    return s.map((n, i) => R(n, String(i), t));
  if (s && typeof s.toJSON == "function") {
    if (!t || !ds(s))
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
class Mt {
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
    if (!et(e))
      throw new TypeError("A document argument is required");
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: e,
      keep: !0,
      mapAsMap: t === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof n == "number" ? n : 100
    }, a = R(this, "", o);
    if (typeof i == "function")
      for (const { count: c, res: l } of o.anchors.values())
        i(l, c);
    return typeof r == "function" ? me(r, { "": a }, "", a) : a;
  }
}
class Ct extends Mt {
  constructor(e) {
    super(It), this.source = e, Object.defineProperty(this, "tag", {
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
    t?.aliasResolveCache ? n = t.aliasResolveCache : (n = [], Ee(e, {
      Node: (r, o) => {
        (Se(o) || ds(o)) && n.push(o);
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
      let c = r.get(i);
      if (c || (R(i, null, t), c = r.get(i)), c?.res === void 0) {
        const l = "This should not happen: Alias anchor was not resolved?";
        throw new ReferenceError(l);
      }
      if (a >= 0 && (c.count += 1, c.aliasCount === 0 && (c.aliasCount = Qe(o, i, r)), c.count * c.aliasCount > a)) {
        const l = "Excessive alias count indicates a resource exhaustion attack";
        throw new ReferenceError(l);
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
      if (ps(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
        const r = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(r);
      }
      if (e.implicitKey)
        return `${i} `;
    }
    return i;
  }
}
function Qe(s, e, t) {
  if (Se(e)) {
    const n = e.resolve(s), i = t && n && t.get(n);
    return i ? i.count * i.aliasCount : 0;
  } else if (I(e)) {
    let n = 0;
    for (const i of e.items) {
      const r = Qe(s, i, t);
      r > n && (n = r);
    }
    return n;
  } else if (C(e)) {
    const n = Qe(s, e.key, t), i = Qe(s, e.value, t);
    return Math.max(n, i);
  }
  return 1;
}
const ys = (s) => !s || typeof s != "function" && typeof s != "object";
class O extends Mt {
  constructor(e) {
    super(Y), this.value = e;
  }
  toJSON(e, t) {
    return t?.keep ? this.value : R(this.value, e, t);
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
const mn = "tag:yaml.org,2002:";
function gn(s, e, t) {
  if (e) {
    const n = t.filter((r) => r.tag === e), i = n.find((r) => !r.format) ?? n[0];
    if (!i)
      throw new Error(`Tag ${e} not found`);
    return i;
  }
  return t.find((n) => n.identify?.(s) && !n.format);
}
function je(s, e, t) {
  if (et(s) && (s = s.contents), M(s))
    return s;
  if (C(s)) {
    const f = t.schema[te].createNode?.(t.schema, null, t);
    return f.items.push(s), f;
  }
  (s instanceof String || s instanceof Number || s instanceof Boolean || typeof BigInt < "u" && s instanceof BigInt) && (s = s.valueOf());
  const { aliasDuplicateObjects: n, onAnchor: i, onTagObj: r, schema: o, sourceObjects: a } = t;
  let c;
  if (n && s && typeof s == "object") {
    if (c = a.get(s), c)
      return c.anchor ?? (c.anchor = i(s)), new Ct(c.anchor);
    c = { anchor: null, node: null }, a.set(s, c);
  }
  e?.startsWith("!!") && (e = mn + e.slice(2));
  let l = gn(s, e, o.tags);
  if (!l) {
    if (s && typeof s.toJSON == "function" && (s = s.toJSON()), !s || typeof s != "object") {
      const f = new O(s);
      return c && (c.node = f), f;
    }
    l = s instanceof Map ? o[te] : Symbol.iterator in Object(s) ? o[ke] : o[te];
  }
  r && (r(l), delete t.onTagObj);
  const u = l?.createNode ? l.createNode(t.schema, s, t) : typeof l?.nodeClass?.from == "function" ? l.nodeClass.from(t.schema, s, t) : new O(s);
  return e ? u.tag = e : l.default || (u.tag = l.tag), c && (c.node = u), u;
}
function We(s, e, t) {
  let n = t;
  for (let i = e.length - 1; i >= 0; --i) {
    const r = e[i];
    if (typeof r == "number" && Number.isInteger(r) && r >= 0) {
      const o = [];
      o[r] = n, n = o;
    } else
      n = /* @__PURE__ */ new Map([[r, n]]);
  }
  return je(n, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: s,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const Te = (s) => s == null || typeof s == "object" && !!s[Symbol.iterator]().next().done;
class ws extends Mt {
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
    return e && (t.schema = e), t.items = t.items.map((n) => M(n) || C(n) ? n.clone(e) : n), this.range && (t.range = this.range.slice()), t;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(e, t) {
    if (Te(e))
      this.add(t);
    else {
      const [n, ...i] = e, r = this.get(n, !0);
      if (I(r))
        r.addIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(n, We(this.schema, i, t));
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
    if (I(i))
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
    return i.length === 0 ? !t && T(r) ? r.value : r : I(r) ? r.getIn(i, t) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!C(t))
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
    return I(i) ? i.hasIn(n) : !1;
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
      if (I(r))
        r.setIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(n, We(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`);
    }
  }
}
const yn = (s) => s.replace(/^(?!$)(?: $)?/gm, "#");
function W(s, e) {
  return /^\n+$/.test(s) ? s.substring(1) : e ? s.replace(/^(?! *$)/gm, e) : s;
}
const le = (s, e, t) => s.endsWith(`
`) ? W(t, e) : t.includes(`
`) ? `
` + W(t, e) : (s.endsWith(" ") ? "" : " ") + t, bs = "flow", Et = "block", Ge = "quoted";
function tt(s, e, t = "flow", { indentAtStart: n, lineWidth: i = 80, minContentWidth: r = 20, onFold: o, onOverflow: a } = {}) {
  if (!i || i < 0)
    return s;
  i < r && (r = 0);
  const c = Math.max(1 + r, 1 + i - e.length);
  if (s.length <= c)
    return s;
  const l = [], u = {};
  let f = i - e.length;
  typeof n == "number" && (n > i - Math.max(2, r) ? l.push(0) : f = i - n);
  let d, g, y = !1, h = -1, p = -1, w = -1;
  t === Et && (h = Ht(s, h, e.length), h !== -1 && (f = h + c));
  for (let k; k = s[h += 1]; ) {
    if (t === Ge && k === "\\") {
      switch (p = h, s[h + 1]) {
        case "x":
          h += 3;
          break;
        case "u":
          h += 5;
          break;
        case "U":
          h += 9;
          break;
        default:
          h += 1;
      }
      w = h;
    }
    if (k === `
`)
      t === Et && (h = Ht(s, h, e.length)), f = h + e.length + c, d = void 0;
    else {
      if (k === " " && g && g !== " " && g !== `
` && g !== "	") {
        const m = s[h + 1];
        m && m !== " " && m !== `
` && m !== "	" && (d = h);
      }
      if (h >= f)
        if (d)
          l.push(d), f = d + c, d = void 0;
        else if (t === Ge) {
          for (; g === " " || g === "	"; )
            g = k, k = s[h += 1], y = !0;
          const m = h > w + 1 ? h - 2 : p - 1;
          if (u[m])
            return s;
          l.push(m), u[m] = !0, f = m + c, d = void 0;
        } else
          y = !0;
    }
    g = k;
  }
  if (y && a && a(), l.length === 0)
    return s;
  o && o();
  let S = s.slice(0, l[0]);
  for (let k = 0; k < l.length; ++k) {
    const m = l[k], b = l[k + 1] || s.length;
    m === 0 ? S = `
${e}${s.slice(0, b)}` : (t === Ge && u[m] && (S += `${s[m]}\\`), S += `
${e}${s.slice(m + 1, b)}`);
  }
  return S;
}
function Ht(s, e, t) {
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
const st = (s, e) => ({
  indentAtStart: e ? s.indent.length : s.indentAtStart,
  lineWidth: s.options.lineWidth,
  minContentWidth: s.options.minContentWidth
}), nt = (s) => /^(%|---|\.\.\.)/m.test(s);
function wn(s, e, t) {
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
function Ce(s, e) {
  const t = JSON.stringify(s);
  if (e.options.doubleQuotedAsJSON)
    return t;
  const { implicitKey: n } = e, i = e.options.doubleQuotedMinMultiLineLength, r = e.indent || (nt(s) ? "  " : "");
  let o = "", a = 0;
  for (let c = 0, l = t[c]; l; l = t[++c])
    if (l === " " && t[c + 1] === "\\" && t[c + 2] === "n" && (o += t.slice(a, c) + "\\ ", c += 1, a = c, l = "\\"), l === "\\")
      switch (t[c + 1]) {
        case "u":
          {
            o += t.slice(a, c);
            const u = t.substr(c + 2, 4);
            switch (u) {
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
                u.substr(0, 2) === "00" ? o += "\\x" + u.substr(2) : o += t.substr(c, 6);
            }
            c += 5, a = c + 1;
          }
          break;
        case "n":
          if (n || t[c + 2] === '"' || t.length < i)
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
  return o = a ? o + t.slice(a) : t, n ? o : tt(o, r, Ge, st(e, !1));
}
function Nt(s, e) {
  if (e.options.singleQuote === !1 || e.implicitKey && s.includes(`
`) || /[ \t]\n|\n[ \t]/.test(s))
    return Ce(s, e);
  const t = e.indent || (nt(s) ? "  " : ""), n = "'" + s.replace(/'/g, "''").replace(/\n+/g, `$&
${t}`) + "'";
  return e.implicitKey ? n : tt(n, t, bs, st(e, !1));
}
function ge(s, e) {
  const { singleQuote: t } = e.options;
  let n;
  if (t === !1)
    n = Ce;
  else {
    const i = s.includes('"'), r = s.includes("'");
    i && !r ? n = Nt : r && !i ? n = Ce : n = t ? Nt : Ce;
  }
  return n(s, e);
}
let Ot;
try {
  Ot = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  Ot = /\n+(?!\n|$)/g;
}
function He({ comment: s, type: e, value: t }, n, i, r) {
  const { blockQuote: o, commentString: a, lineWidth: c } = n.options;
  if (!o || /\n[\t ]+$/.test(t))
    return ge(t, n);
  const l = n.indent || (n.forceBlockIndent || nt(t) ? "  " : ""), u = o === "literal" ? !0 : o === "folded" || e === O.BLOCK_FOLDED ? !1 : e === O.BLOCK_LITERAL ? !0 : !wn(t, c, l.length);
  if (!t)
    return u ? `|
` : `>
`;
  let f, d;
  for (d = t.length; d > 0; --d) {
    const b = t[d - 1];
    if (b !== `
` && b !== "	" && b !== " ")
      break;
  }
  let g = t.substring(d);
  const y = g.indexOf(`
`);
  y === -1 ? f = "-" : t === g || y !== g.length - 1 ? (f = "+", r && r()) : f = "", g && (t = t.slice(0, -g.length), g[g.length - 1] === `
` && (g = g.slice(0, -1)), g = g.replace(Ot, `$&${l}`));
  let h = !1, p, w = -1;
  for (p = 0; p < t.length; ++p) {
    const b = t[p];
    if (b === " ")
      h = !0;
    else if (b === `
`)
      w = p;
    else
      break;
  }
  let S = t.substring(0, w < p ? w + 1 : p);
  S && (t = t.substring(S.length), S = S.replace(/\n+/g, `$&${l}`));
  let m = (h ? l ? "2" : "1" : "") + f;
  if (s && (m += " " + a(s.replace(/ ?[\r\n]+/g, " ")), i && i()), !u) {
    const b = t.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${l}`);
    let E = !1;
    const N = st(n, !0);
    o !== "folded" && e !== O.BLOCK_FOLDED && (N.onOverflow = () => {
      E = !0;
    });
    const $ = tt(`${S}${b}${g}`, l, Et, N);
    if (!E)
      return `>${m}
${l}${$}`;
  }
  return t = t.replace(/\n+/g, `$&${l}`), `|${m}
${l}${S}${t}${g}`;
}
function bn(s, e, t, n) {
  const { type: i, value: r } = s, { actualString: o, implicitKey: a, indent: c, indentStep: l, inFlow: u } = e;
  if (a && r.includes(`
`) || u && /[[\]{},]/.test(r))
    return ge(r, e);
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
    return a || u || !r.includes(`
`) ? ge(r, e) : He(s, e, t, n);
  if (!a && !u && i !== O.PLAIN && r.includes(`
`))
    return He(s, e, t, n);
  if (nt(r)) {
    if (c === "")
      return e.forceBlockIndent = !0, He(s, e, t, n);
    if (a && c === l)
      return ge(r, e);
  }
  const f = r.replace(/\n+/g, `$&
${c}`);
  if (o) {
    const d = (h) => h.default && h.tag !== "tag:yaml.org,2002:str" && h.test?.test(f), { compat: g, tags: y } = e.doc.schema;
    if (y.some(d) || g?.some(d))
      return ge(r, e);
  }
  return a ? f : tt(f, c, bs, st(e, !1));
}
function _t(s, e, t, n) {
  const { implicitKey: i, inFlow: r } = e, o = typeof s.value == "string" ? s : Object.assign({}, s, { value: String(s.value) });
  let { type: a } = s;
  a !== O.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (a = O.QUOTE_DOUBLE);
  const c = (u) => {
    switch (u) {
      case O.BLOCK_FOLDED:
      case O.BLOCK_LITERAL:
        return i || r ? ge(o.value, e) : He(o, e, t, n);
      case O.QUOTE_DOUBLE:
        return Ce(o.value, e);
      case O.QUOTE_SINGLE:
        return Nt(o.value, e);
      case O.PLAIN:
        return bn(o, e, t, n);
      default:
        return null;
    }
  };
  let l = c(a);
  if (l === null) {
    const { defaultKeyType: u, defaultStringType: f } = e.options, d = i && u || f;
    if (l = c(d), l === null)
      throw new Error(`Unsupported default string type ${d}`);
  }
  return l;
}
function $s(s, e) {
  const t = Object.assign({
    blockQuote: !0,
    commentString: yn,
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
function $n(s, e) {
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
function kn(s, e, { anchors: t, doc: n }) {
  if (!n.directives)
    return "";
  const i = [], r = (T(s) || I(s)) && s.anchor;
  r && ps(r) && (t.add(r), i.push(`&${r}`));
  const o = s.tag ?? (e.default ? null : e.tag);
  return o && i.push(n.directives.tagString(o)), i.join(" ");
}
function be(s, e, t, n) {
  if (C(s))
    return s.toString(e, t, n);
  if (Se(s)) {
    if (e.doc.directives)
      return s.toString(e);
    if (e.resolvedAliases?.has(s))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    e.resolvedAliases ? e.resolvedAliases.add(s) : e.resolvedAliases = /* @__PURE__ */ new Set([s]), s = s.resolve(e.doc);
  }
  let i;
  const r = M(s) ? s : e.doc.createNode(s, { onTagObj: (c) => i = c });
  i ?? (i = $n(e.doc.schema.tags, r));
  const o = kn(r, i, e);
  o.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + o.length + 1);
  const a = typeof i.stringify == "function" ? i.stringify(r, e, t, n) : T(r) ? _t(r, e, t, n) : r.toString(e, t, n);
  return o ? T(r) || a[0] === "{" || a[0] === "[" ? `${o} ${a}` : `${o}
${e.indent}${a}` : a;
}
function Sn({ key: s, value: e }, t, n, i) {
  const { allNullValues: r, doc: o, indent: a, indentStep: c, options: { commentString: l, indentSeq: u, simpleKeys: f } } = t;
  let d = M(s) && s.comment || null;
  if (f) {
    if (d)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (I(s) || !M(s) && typeof s == "object") {
      const N = "With simple keys, collection cannot be used as a key value";
      throw new Error(N);
    }
  }
  let g = !f && (!s || d && e == null && !t.inFlow || I(s) || (T(s) ? s.type === O.BLOCK_FOLDED || s.type === O.BLOCK_LITERAL : typeof s == "object"));
  t = Object.assign({}, t, {
    allNullValues: !1,
    implicitKey: !g && (f || !r),
    indent: a + c
  });
  let y = !1, h = !1, p = be(s, t, () => y = !0, () => h = !0);
  if (!g && !t.inFlow && p.length > 1024) {
    if (f)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    g = !0;
  }
  if (t.inFlow) {
    if (r || e == null)
      return y && n && n(), p === "" ? "?" : g ? `? ${p}` : p;
  } else if (r && !f || e == null && g)
    return p = `? ${p}`, d && !y ? p += le(p, t.indent, l(d)) : h && i && i(), p;
  y && (d = null), g ? (d && (p += le(p, t.indent, l(d))), p = `? ${p}
${a}:`) : (p = `${p}:`, d && (p += le(p, t.indent, l(d))));
  let w, S, k;
  M(e) ? (w = !!e.spaceBefore, S = e.commentBefore, k = e.comment) : (w = !1, S = null, k = null, e && typeof e == "object" && (e = o.createNode(e))), t.implicitKey = !1, !g && !d && T(e) && (t.indentAtStart = p.length + 1), h = !1, !u && c.length >= 2 && !t.inFlow && !g && xe(e) && !e.flow && !e.tag && !e.anchor && (t.indent = t.indent.substring(2));
  let m = !1;
  const b = be(e, t, () => m = !0, () => h = !0);
  let E = " ";
  if (d || w || S) {
    if (E = w ? `
` : "", S) {
      const N = l(S);
      E += `
${W(N, t.indent)}`;
    }
    b === "" && !t.inFlow ? E === `
` && k && (E = `

`) : E += `
${t.indent}`;
  } else if (!g && I(e)) {
    const N = b[0], $ = b.indexOf(`
`), L = $ !== -1, A = t.inFlow ?? e.flow ?? e.items.length === 0;
    if (L || !A) {
      let j = !1;
      if (L && (N === "&" || N === "!")) {
        let v = b.indexOf(" ");
        N === "&" && v !== -1 && v < $ && b[v + 1] === "!" && (v = b.indexOf(" ", v + 1)), (v === -1 || $ < v) && (j = !0);
      }
      j || (E = `
${t.indent}`);
    }
  } else (b === "" || b[0] === `
`) && (E = "");
  return p += E + b, t.inFlow ? m && n && n() : k && !m ? p += le(p, t.indent, l(k)) : h && i && i(), p;
}
function En(s, e) {
  (s === "debug" || s === "warn") && console.warn(e);
}
const Fe = "<<", X = {
  identify: (s) => s === Fe || typeof s == "symbol" && s.description === Fe,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new O(Symbol(Fe)), {
    addToJSMap: ks
  }),
  stringify: () => Fe
}, Nn = (s, e) => (X.identify(e) || T(e) && (!e.type || e.type === O.PLAIN) && X.identify(e.value)) && s?.doc.schema.tags.some((t) => t.tag === X.tag && t.default);
function ks(s, e, t) {
  const n = Ss(s, t);
  if (xe(n))
    for (const i of n.items)
      dt(s, e, i);
  else if (Array.isArray(n))
    for (const i of n)
      dt(s, e, i);
  else
    dt(s, e, n);
}
function dt(s, e, t) {
  const n = Ss(s, t);
  if (!Pe(n))
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
function Ss(s, e) {
  return s && Se(e) ? e.resolve(s.doc, s) : e;
}
function Es(s, e, { key: t, value: n }) {
  if (M(t) && t.addToJSMap)
    t.addToJSMap(s, e, n);
  else if (Nn(s, t))
    ks(s, e, n);
  else {
    const i = R(t, "", s);
    if (e instanceof Map)
      e.set(i, R(n, i, s));
    else if (e instanceof Set)
      e.add(i);
    else {
      const r = On(t, i, s), o = R(n, r, s);
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
function On(s, e, t) {
  if (e === null)
    return "";
  if (typeof e != "object")
    return String(e);
  if (M(s) && t?.doc) {
    const n = $s(t.doc, {});
    n.anchors = /* @__PURE__ */ new Set();
    for (const r of t.anchors.keys())
      n.anchors.add(r.anchor);
    n.inFlow = !0, n.inStringifyKey = !0;
    const i = s.toString(n);
    if (!t.mapKeyWarned) {
      let r = JSON.stringify(i);
      r.length > 40 && (r = r.substring(0, 36) + '..."'), En(t.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`), t.mapKeyWarned = !0;
    }
    return i;
  }
  return JSON.stringify(e);
}
function jt(s, e, t) {
  const n = je(s, void 0, t), i = je(e, void 0, t);
  return new D(n, i);
}
class D {
  constructor(e, t = null) {
    Object.defineProperty(this, U, { value: hs }), this.key = e, this.value = t;
  }
  clone(e) {
    let { key: t, value: n } = this;
    return M(t) && (t = t.clone(e)), M(n) && (n = n.clone(e)), new D(t, n);
  }
  toJSON(e, t) {
    const n = t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return Es(t, n, this);
  }
  toString(e, t, n) {
    return e?.doc ? Sn(this, e, t, n) : JSON.stringify(this);
  }
}
function Ns(s, e, t) {
  return (e.inFlow ?? s.flow ? vn : Ln)(s, e, t);
}
function Ln({ comment: s, items: e }, t, { blockItemPrefix: n, flowChars: i, itemIndent: r, onChompKeep: o, onComment: a }) {
  const { indent: c, options: { commentString: l } } = t, u = Object.assign({}, t, { indent: r, type: null });
  let f = !1;
  const d = [];
  for (let y = 0; y < e.length; ++y) {
    const h = e[y];
    let p = null;
    if (M(h))
      !f && h.spaceBefore && d.push(""), ze(t, d, h.commentBefore, f), h.comment && (p = h.comment);
    else if (C(h)) {
      const S = M(h.key) ? h.key : null;
      S && (!f && S.spaceBefore && d.push(""), ze(t, d, S.commentBefore, f));
    }
    f = !1;
    let w = be(h, u, () => p = null, () => f = !0);
    p && (w += le(w, r, l(p))), f && p && (f = !1), d.push(n + w);
  }
  let g;
  if (d.length === 0)
    g = i.start + i.end;
  else {
    g = d[0];
    for (let y = 1; y < d.length; ++y) {
      const h = d[y];
      g += h ? `
${c}${h}` : `
`;
    }
  }
  return s ? (g += `
` + W(l(s), c), a && a()) : f && o && o(), g;
}
function vn({ items: s }, e, { flowChars: t, itemIndent: n }) {
  const { indent: i, indentStep: r, flowCollectionPadding: o, options: { commentString: a } } = e;
  n += r;
  const c = Object.assign({}, e, {
    indent: n,
    inFlow: !0,
    type: null
  });
  let l = !1, u = 0;
  const f = [];
  for (let y = 0; y < s.length; ++y) {
    const h = s[y];
    let p = null;
    if (M(h))
      h.spaceBefore && f.push(""), ze(e, f, h.commentBefore, !1), h.comment && (p = h.comment);
    else if (C(h)) {
      const S = M(h.key) ? h.key : null;
      S && (S.spaceBefore && f.push(""), ze(e, f, S.commentBefore, !1), S.comment && (l = !0));
      const k = M(h.value) ? h.value : null;
      k ? (k.comment && (p = k.comment), k.commentBefore && (l = !0)) : h.value == null && S?.comment && (p = S.comment);
    }
    p && (l = !0);
    let w = be(h, c, () => p = null);
    l || (l = f.length > u || w.includes(`
`)), y < s.length - 1 ? w += "," : e.options.trailingComma && (e.options.lineWidth > 0 && (l || (l = f.reduce((S, k) => S + k.length + 2, 2) + (w.length + 2) > e.options.lineWidth)), l && (w += ",")), p && (w += le(w, n, a(p))), f.push(w), u = f.length;
  }
  const { start: d, end: g } = t;
  if (f.length === 0)
    return d + g;
  if (!l) {
    const y = f.reduce((h, p) => h + p.length + 2, 2);
    l = e.options.lineWidth > 0 && y > e.options.lineWidth;
  }
  if (l) {
    let y = d;
    for (const h of f)
      y += h ? `
${r}${i}${h}` : `
`;
    return `${y}
${i}${g}`;
  } else
    return `${d}${o}${f.join(" ")}${o}${g}`;
}
function ze({ indent: s, options: { commentString: e } }, t, n, i) {
  if (n && i && (n = n.replace(/^\n+/, "")), n) {
    const r = W(e(n), s);
    t.push(r.trimStart());
  }
}
function ce(s, e) {
  const t = T(e) ? e.value : e;
  for (const n of s)
    if (C(n) && (n.key === e || n.key === t || T(n.key) && n.key.value === t))
      return n;
}
class q extends ws {
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
    const { keepUndefined: i, replacer: r } = n, o = new this(e), a = (c, l) => {
      if (typeof r == "function")
        l = r.call(t, c, l);
      else if (Array.isArray(r) && !r.includes(c))
        return;
      (l !== void 0 || i) && o.items.push(jt(c, l, n));
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
    let n;
    C(e) ? n = e : !e || typeof e != "object" || !("key" in e) ? n = new D(e, e?.value) : n = new D(e.key, e.value);
    const i = ce(this.items, n.key), r = this.schema?.sortMapEntries;
    if (i) {
      if (!t)
        throw new Error(`Key ${n.key} already set`);
      T(i.value) && ys(n.value) ? i.value.value = n.value : i.value = n.value;
    } else if (r) {
      const o = this.items.findIndex((a) => r(n, a) < 0);
      o === -1 ? this.items.push(n) : this.items.splice(o, 0, n);
    } else
      this.items.push(n);
  }
  delete(e) {
    const t = ce(this.items, e);
    return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
  }
  get(e, t) {
    const i = ce(this.items, e)?.value;
    return (!t && T(i) ? i.value : i) ?? void 0;
  }
  has(e) {
    return !!ce(this.items, e);
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
      Es(t, i, r);
    return i;
  }
  toString(e, t, n) {
    if (!e)
      return JSON.stringify(this);
    for (const i of this.items)
      if (!C(i))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);
    return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), Ns(this, e, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: e.indent || "",
      onChompKeep: n,
      onComment: t
    });
  }
}
const Ne = {
  collection: "map",
  default: !0,
  nodeClass: q,
  tag: "tag:yaml.org,2002:map",
  resolve(s, e) {
    return Pe(s) || e("Expected a mapping for this tag"), s;
  },
  createNode: (s, e, t) => q.from(s, e, t)
};
class fe extends ws {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(e) {
    super(ke, e), this.items = [];
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
    const t = qe(e);
    return typeof t != "number" ? !1 : this.items.splice(t, 1).length > 0;
  }
  get(e, t) {
    const n = qe(e);
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
    const t = qe(e);
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
    const n = qe(e);
    if (typeof n != "number")
      throw new Error(`Expected a valid index, not ${e}.`);
    const i = this.items[n];
    T(i) && ys(t) ? i.value = t : this.items[n] = t;
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
    return e ? Ns(this, e, {
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
          const c = t instanceof Set ? a : String(o++);
          a = i.call(t, c, a);
        }
        r.items.push(je(a, void 0, n));
      }
    }
    return r;
  }
}
function qe(s) {
  let e = T(s) ? s.value : s;
  return e && typeof e == "string" && (e = Number(e)), typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
const Oe = {
  collection: "seq",
  default: !0,
  nodeClass: fe,
  tag: "tag:yaml.org,2002:seq",
  resolve(s, e) {
    return xe(s) || e("Expected a sequence for this tag"), s;
  },
  createNode: (s, e, t) => fe.from(s, e, t)
}, it = {
  identify: (s) => typeof s == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (s) => s,
  stringify(s, e, t, n) {
    return e = Object.assign({ actualString: !0 }, e), _t(s, e, t, n);
  }
}, rt = {
  identify: (s) => s == null,
  createNode: () => new O(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new O(null),
  stringify: ({ source: s }, e) => typeof s == "string" && rt.test.test(s) ? s : e.options.nullStr
}, Bt = {
  identify: (s) => typeof s == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (s) => new O(s[0] === "t" || s[0] === "T"),
  stringify({ source: s, value: e }, t) {
    if (s && Bt.test.test(s)) {
      const n = s[0] === "t" || s[0] === "T";
      if (e === n)
        return s;
    }
    return e ? t.options.trueStr : t.options.falseStr;
  }
};
function Q({ format: s, minFractionDigits: e, tag: t, value: n }) {
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
const Os = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: Q
}, Ls = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (s) => parseFloat(s),
  stringify(s) {
    const e = Number(s.value);
    return isFinite(e) ? e.toExponential() : Q(s);
  }
}, vs = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(s) {
    const e = new O(parseFloat(s)), t = s.indexOf(".");
    return t !== -1 && s[s.length - 1] === "0" && (e.minFractionDigits = s.length - t - 1), e;
  },
  stringify: Q
}, ot = (s) => typeof s == "bigint" || Number.isInteger(s), Pt = (s, e, t, { intAsBigInt: n }) => n ? BigInt(s) : parseInt(s.substring(e), t);
function As(s, e, t) {
  const { value: n } = s;
  return ot(n) && n >= 0 ? t + n.toString(e) : Q(s);
}
const Ts = {
  identify: (s) => ot(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (s, e, t) => Pt(s, 2, 8, t),
  stringify: (s) => As(s, 8, "0o")
}, Is = {
  identify: ot,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (s, e, t) => Pt(s, 0, 10, t),
  stringify: Q
}, Ms = {
  identify: (s) => ot(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (s, e, t) => Pt(s, 2, 16, t),
  stringify: (s) => As(s, 16, "0x")
}, An = [
  Ne,
  Oe,
  it,
  rt,
  Bt,
  Ts,
  Is,
  Ms,
  Os,
  Ls,
  vs
];
function Yt(s) {
  return typeof s == "bigint" || Number.isInteger(s);
}
const Re = ({ value: s }) => JSON.stringify(s), Tn = [
  {
    identify: (s) => typeof s == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (s) => s,
    stringify: Re
  },
  {
    identify: (s) => s == null,
    createNode: () => new O(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: Re
  },
  {
    identify: (s) => typeof s == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (s) => s === "true",
    stringify: Re
  },
  {
    identify: Yt,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (s, e, { intAsBigInt: t }) => t ? BigInt(s) : parseInt(s, 10),
    stringify: ({ value: s }) => Yt(s) ? s.toString() : JSON.stringify(s)
  },
  {
    identify: (s) => typeof s == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (s) => parseFloat(s),
    stringify: Re
  }
], In = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(s, e) {
    return e(`Unresolved plain scalar ${JSON.stringify(s)}`), s;
  }
}, Mn = [Ne, Oe].concat(Tn, In), xt = {
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
      let c = "";
      for (let l = 0; l < o.length; ++l)
        c += String.fromCharCode(o[l]);
      a = btoa(c);
    } else
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (e ?? (e = O.BLOCK_LITERAL), e !== O.QUOTE_DOUBLE) {
      const c = Math.max(n.options.lineWidth - n.indent.length, n.options.minContentWidth), l = Math.ceil(a.length / c), u = new Array(l);
      for (let f = 0, d = 0; f < l; ++f, d += c)
        u[f] = a.substr(d, c);
      a = u.join(e === O.BLOCK_LITERAL ? `
` : " ");
    }
    return _t({ comment: s, type: e, value: a }, n, i, r);
  }
};
function Cs(s, e) {
  if (xe(s))
    for (let t = 0; t < s.items.length; ++t) {
      let n = s.items[t];
      if (!C(n)) {
        if (Pe(n)) {
          n.items.length > 1 && e("Each pair must have its own sequence indicator");
          const i = n.items[0] || new D(new O(null));
          if (n.commentBefore && (i.key.commentBefore = i.key.commentBefore ? `${n.commentBefore}
${i.key.commentBefore}` : n.commentBefore), n.comment) {
            const r = i.value ?? i.key;
            r.comment = r.comment ? `${n.comment}
${r.comment}` : n.comment;
          }
          n = i;
        }
        s.items[t] = C(n) ? n : new D(n);
      }
    }
  else
    e("Expected a sequence for this tag");
  return s;
}
function _s(s, e, t) {
  const { replacer: n } = t, i = new fe(s);
  i.tag = "tag:yaml.org,2002:pairs";
  let r = 0;
  if (e && Symbol.iterator in Object(e))
    for (let o of e) {
      typeof n == "function" && (o = n.call(e, String(r++), o));
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
      i.items.push(jt(a, c, t));
    }
  return i;
}
const Dt = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: Cs,
  createNode: _s
};
class ye extends fe {
  constructor() {
    super(), this.add = q.prototype.add.bind(this), this.delete = q.prototype.delete.bind(this), this.get = q.prototype.get.bind(this), this.has = q.prototype.has.bind(this), this.set = q.prototype.set.bind(this), this.tag = ye.tag;
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
      if (C(i) ? (r = R(i.key, "", t), o = R(i.value, r, t)) : r = R(i, "", t), n.has(r))
        throw new Error("Ordered maps must not include duplicate keys");
      n.set(r, o);
    }
    return n;
  }
  static from(e, t, n) {
    const i = _s(e, t, n), r = new this();
    return r.items = i.items, r;
  }
}
ye.tag = "tag:yaml.org,2002:omap";
const Kt = {
  collection: "seq",
  identify: (s) => s instanceof Map,
  nodeClass: ye,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(s, e) {
    const t = Cs(s, e), n = [];
    for (const { key: i } of t.items)
      T(i) && (n.includes(i.value) ? e(`Ordered maps must not include duplicate keys: ${i.value}`) : n.push(i.value));
    return Object.assign(new ye(), t);
  },
  createNode: (s, e, t) => ye.from(s, e, t)
};
function js({ value: s, source: e }, t) {
  return e && (s ? Bs : Ps).test.test(e) ? e : s ? t.options.trueStr : t.options.falseStr;
}
const Bs = {
  identify: (s) => s === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new O(!0),
  stringify: js
}, Ps = {
  identify: (s) => s === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new O(!1),
  stringify: js
}, Cn = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: Q
}, _n = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (s) => parseFloat(s.replace(/_/g, "")),
  stringify(s) {
    const e = Number(s.value);
    return isFinite(e) ? e.toExponential() : Q(s);
  }
}, jn = {
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
  stringify: Q
}, De = (s) => typeof s == "bigint" || Number.isInteger(s);
function at(s, e, t, { intAsBigInt: n }) {
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
function Ft(s, e, t) {
  const { value: n } = s;
  if (De(n)) {
    const i = n.toString(e);
    return n < 0 ? "-" + t + i.substr(1) : t + i;
  }
  return Q(s);
}
const Bn = {
  identify: De,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (s, e, t) => at(s, 2, 2, t),
  stringify: (s) => Ft(s, 2, "0b")
}, Pn = {
  identify: De,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (s, e, t) => at(s, 1, 8, t),
  stringify: (s) => Ft(s, 8, "0")
}, xn = {
  identify: De,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (s, e, t) => at(s, 0, 10, t),
  stringify: Q
}, Dn = {
  identify: De,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (s, e, t) => at(s, 2, 16, t),
  stringify: (s) => Ft(s, 16, "0x")
};
class we extends q {
  constructor(e) {
    super(e), this.tag = we.tag;
  }
  add(e) {
    let t;
    C(e) ? t = e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? t = new D(e.key, null) : t = new D(e, null), ce(this.items, t.key) || this.items.push(t);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(e, t) {
    const n = ce(this.items, e);
    return !t && C(n) ? T(n.key) ? n.key.value : n.key : n;
  }
  set(e, t) {
    if (typeof t != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
    const n = ce(this.items, e);
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
        typeof i == "function" && (o = i.call(t, o, o)), r.items.push(jt(o, null, n));
    return r;
  }
}
we.tag = "tag:yaml.org,2002:set";
const qt = {
  collection: "map",
  identify: (s) => s instanceof Set,
  nodeClass: we,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (s, e, t) => we.from(s, e, t),
  resolve(s, e) {
    if (Pe(s)) {
      if (s.hasAllNullValues(!0))
        return Object.assign(new we(), s);
      e("Set items must all have null values");
    } else
      e("Expected a mapping for this tag");
    return s;
  }
};
function Rt(s, e) {
  const t = s[0], n = t === "-" || t === "+" ? s.substring(1) : s, i = (o) => e ? BigInt(o) : Number(o), r = n.replace(/_/g, "").split(":").reduce((o, a) => o * i(60) + i(a), i(0));
  return t === "-" ? i(-1) * r : r;
}
function xs(s) {
  let { value: e } = s, t = (o) => o;
  if (typeof e == "bigint")
    t = (o) => BigInt(o);
  else if (isNaN(e) || !isFinite(e))
    return Q(s);
  let n = "";
  e < 0 && (n = "-", e *= t(-1));
  const i = t(60), r = [e % i];
  return e < 60 ? r.unshift(0) : (e = (e - r[0]) / i, r.unshift(e % i), e >= 60 && (e = (e - r[0]) / i, r.unshift(e))), n + r.map((o) => String(o).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const Ds = {
  identify: (s) => typeof s == "bigint" || Number.isInteger(s),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (s, e, { intAsBigInt: t }) => Rt(s, t),
  stringify: xs
}, Ks = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (s) => Rt(s, !1),
  stringify: xs
}, lt = {
  identify: (s) => s instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(s) {
    const e = s.match(lt.test);
    if (!e)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, t, n, i, r, o, a] = e.map(Number), c = e[7] ? Number((e[7] + "00").substr(1, 3)) : 0;
    let l = Date.UTC(t, n - 1, i, r || 0, o || 0, a || 0, c);
    const u = e[8];
    if (u && u !== "Z") {
      let f = Rt(u, !1);
      Math.abs(f) < 30 && (f *= 60), l -= 6e4 * f;
    }
    return new Date(l);
  },
  stringify: ({ value: s }) => s?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, Jt = [
  Ne,
  Oe,
  it,
  rt,
  Bs,
  Ps,
  Bn,
  Pn,
  xn,
  Dn,
  Cn,
  _n,
  jn,
  xt,
  X,
  Kt,
  Dt,
  qt,
  Ds,
  Ks,
  lt
], Wt = /* @__PURE__ */ new Map([
  ["core", An],
  ["failsafe", [Ne, Oe, it]],
  ["json", Mn],
  ["yaml11", Jt],
  ["yaml-1.1", Jt]
]), zt = {
  binary: xt,
  bool: Bt,
  float: vs,
  floatExp: Ls,
  floatNaN: Os,
  floatTime: Ks,
  int: Is,
  intHex: Ms,
  intOct: Ts,
  intTime: Ds,
  map: Ne,
  merge: X,
  null: rt,
  omap: Kt,
  pairs: Dt,
  seq: Oe,
  set: qt,
  timestamp: lt
}, Kn = {
  "tag:yaml.org,2002:binary": xt,
  "tag:yaml.org,2002:merge": X,
  "tag:yaml.org,2002:omap": Kt,
  "tag:yaml.org,2002:pairs": Dt,
  "tag:yaml.org,2002:set": qt,
  "tag:yaml.org,2002:timestamp": lt
};
function pt(s, e, t) {
  const n = Wt.get(e);
  if (n && !s)
    return t && !n.includes(X) ? n.concat(X) : n.slice();
  let i = n;
  if (!i)
    if (Array.isArray(s))
      i = [];
    else {
      const r = Array.from(Wt.keys()).filter((o) => o !== "yaml11").map((o) => JSON.stringify(o)).join(", ");
      throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`);
    }
  if (Array.isArray(s))
    for (const r of s)
      i = i.concat(r);
  else typeof s == "function" && (i = s(i.slice()));
  return t && (i = i.concat(X)), i.reduce((r, o) => {
    const a = typeof o == "string" ? zt[o] : o;
    if (!a) {
      const c = JSON.stringify(o), l = Object.keys(zt).map((u) => JSON.stringify(u)).join(", ");
      throw new Error(`Unknown custom tag ${c}; use one of ${l}`);
    }
    return r.includes(a) || r.push(a), r;
  }, []);
}
const Fn = (s, e) => s.key < e.key ? -1 : s.key > e.key ? 1 : 0;
class Ut {
  constructor({ compat: e, customTags: t, merge: n, resolveKnownTags: i, schema: r, sortMapEntries: o, toStringDefaults: a }) {
    this.compat = Array.isArray(e) ? pt(e, "compat") : e ? pt(null, e) : null, this.name = typeof r == "string" && r || "core", this.knownTags = i ? Kn : {}, this.tags = pt(t, this.name, n), this.toStringOptions = a ?? null, Object.defineProperty(this, te, { value: Ne }), Object.defineProperty(this, Y, { value: it }), Object.defineProperty(this, ke, { value: Oe }), this.sortMapEntries = typeof o == "function" ? o : o === !0 ? Fn : null;
  }
  clone() {
    const e = Object.create(Ut.prototype, Object.getOwnPropertyDescriptors(this));
    return e.tags = this.tags.slice(), e;
  }
}
function qn(s, e) {
  const t = [];
  let n = e.directives === !0;
  if (e.directives !== !1 && s.directives) {
    const c = s.directives.toString(s);
    c ? (t.push(c), n = !0) : s.directives.docStart && (n = !0);
  }
  n && t.push("---");
  const i = $s(s, e), { commentString: r } = i.options;
  if (s.commentBefore) {
    t.length !== 1 && t.unshift("");
    const c = r(s.commentBefore);
    t.unshift(W(c, ""));
  }
  let o = !1, a = null;
  if (s.contents) {
    if (M(s.contents)) {
      if (s.contents.spaceBefore && n && t.push(""), s.contents.commentBefore) {
        const u = r(s.contents.commentBefore);
        t.push(W(u, ""));
      }
      i.forceBlockIndent = !!s.comment, a = s.contents.comment;
    }
    const c = a ? void 0 : () => o = !0;
    let l = be(s.contents, i, () => a = null, c);
    a && (l += le(l, "", r(a))), (l[0] === "|" || l[0] === ">") && t[t.length - 1] === "---" ? t[t.length - 1] = `--- ${l}` : t.push(l);
  } else
    t.push(be(s.contents, i));
  if (s.directives?.docEnd)
    if (s.comment) {
      const c = r(s.comment);
      c.includes(`
`) ? (t.push("..."), t.push(W(c, ""))) : t.push(`... ${c}`);
    } else
      t.push("...");
  else {
    let c = s.comment;
    c && o && (c = c.replace(/^\n+/, "")), c && ((!o || a) && t[t.length - 1] !== "" && t.push(""), t.push(W(r(c), "")));
  }
  return t.join(`
`) + `
`;
}
class ct {
  constructor(e, t, n) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, U, { value: St });
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
    n?._directives ? (this.directives = n._directives.atDocument(), this.directives.yaml.explicit && (o = this.directives.yaml.version)) : this.directives = new x({ version: o }), this.setSchema(o, n), this.contents = e === void 0 ? null : this.createNode(e, i, n);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const e = Object.create(ct.prototype, {
      [U]: { value: St }
    });
    return e.commentBefore = this.commentBefore, e.comment = this.comment, e.errors = this.errors.slice(), e.warnings = this.warnings.slice(), e.options = Object.assign({}, this.options), this.directives && (e.directives = this.directives.clone()), e.schema = this.schema.clone(), e.contents = M(this.contents) ? this.contents.clone(e.schema) : this.contents, this.range && (e.range = this.range.slice()), e;
  }
  /** Adds a value to the document. */
  add(e) {
    ue(this.contents) && this.contents.add(e);
  }
  /** Adds a value to the document. */
  addIn(e, t) {
    ue(this.contents) && this.contents.addIn(e, t);
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
      const n = ms(this);
      e.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !t || n.has(t) ? gs(t || "a", n) : t;
    }
    return new Ct(e.anchor);
  }
  createNode(e, t, n) {
    let i;
    if (typeof t == "function")
      e = t.call({ "": e }, "", e), i = t;
    else if (Array.isArray(t)) {
      const p = (S) => typeof S == "number" || S instanceof String || S instanceof Number, w = t.filter(p).map(String);
      w.length > 0 && (t = t.concat(w)), i = t;
    } else n === void 0 && t && (n = t, t = void 0);
    const { aliasDuplicateObjects: r, anchorPrefix: o, flow: a, keepUndefined: c, onTagObj: l, tag: u } = n ?? {}, { onAnchor: f, setAnchors: d, sourceObjects: g } = pn(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      o || "a"
    ), y = {
      aliasDuplicateObjects: r ?? !0,
      keepUndefined: c ?? !1,
      onAnchor: f,
      onTagObj: l,
      replacer: i,
      schema: this.schema,
      sourceObjects: g
    }, h = je(e, u, y);
    return a && I(h) && (h.flow = !0), d(), h;
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
    return ue(this.contents) ? this.contents.delete(e) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    return Te(e) ? this.contents == null ? !1 : (this.contents = null, !0) : ue(this.contents) ? this.contents.deleteIn(e) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(e, t) {
    return I(this.contents) ? this.contents.get(e, t) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    return Te(e) ? !t && T(this.contents) ? this.contents.value : this.contents : I(this.contents) ? this.contents.getIn(e, t) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(e) {
    return I(this.contents) ? this.contents.has(e) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(e) {
    return Te(e) ? this.contents !== void 0 : I(this.contents) ? this.contents.hasIn(e) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(e, t) {
    this.contents == null ? this.contents = We(this.schema, [e], t) : ue(this.contents) && this.contents.set(e, t);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    Te(e) ? this.contents = t : this.contents == null ? this.contents = We(this.schema, Array.from(e), t) : ue(this.contents) && this.contents.setIn(e, t);
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
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new x({ version: "1.1" }), n = { resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = e : this.directives = new x({ version: e }), n = { resolveKnownTags: !0, schema: "core" };
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
      this.schema = new Ut(Object.assign(n, t));
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
    }, c = R(this.contents, t ?? "", a);
    if (typeof r == "function")
      for (const { count: l, res: u } of a.anchors.values())
        r(u, l);
    return typeof o == "function" ? me(o, { "": c }, "", c) : c;
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
    return qn(this, e);
  }
}
function ue(s) {
  if (I(s))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class Fs extends Error {
  constructor(e, t, n, i) {
    super(), this.name = e, this.code = n, this.message = i, this.pos = t;
  }
}
class Ie extends Fs {
  constructor(e, t, n) {
    super("YAMLParseError", e, t, n);
  }
}
class Rn extends Fs {
  constructor(e, t, n) {
    super("YAMLWarning", e, t, n);
  }
}
const Xt = (s, e) => (t) => {
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
    const c = t.linePos[1];
    c?.line === n && c.col > i && (a = Math.max(1, Math.min(c.col - i, 80 - r)));
    const l = " ".repeat(r) + "^".repeat(a);
    t.message += `:

${o}
${l}
`;
  }
};
function $e(s, { flow: e, indicator: t, next: n, offset: i, onError: r, parentIndent: o, startOnNewline: a }) {
  let c = !1, l = a, u = a, f = "", d = "", g = !1, y = !1, h = null, p = null, w = null, S = null, k = null, m = null, b = null;
  for (const $ of s)
    switch (y && ($.type !== "space" && $.type !== "newline" && $.type !== "comma" && r($.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), y = !1), h && (l && $.type !== "comment" && $.type !== "newline" && r(h, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), h = null), $.type) {
      case "space":
        !e && (t !== "doc-start" || n?.type !== "flow-collection") && $.source.includes("	") && (h = $), u = !0;
        break;
      case "comment": {
        u || r($, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const L = $.source.substring(1) || " ";
        f ? f += d + L : f = L, d = "", l = !1;
        break;
      }
      case "newline":
        l ? f ? f += $.source : (!m || t !== "seq-item-ind") && (c = !0) : d += $.source, l = !0, g = !0, (p || w) && (S = $), u = !0;
        break;
      case "anchor":
        p && r($, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), $.source.endsWith(":") && r($.offset + $.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), p = $, b ?? (b = $.offset), l = !1, u = !1, y = !0;
        break;
      case "tag": {
        w && r($, "MULTIPLE_TAGS", "A node can have at most one tag"), w = $, b ?? (b = $.offset), l = !1, u = !1, y = !0;
        break;
      }
      case t:
        (p || w) && r($, "BAD_PROP_ORDER", `Anchors and tags must be after the ${$.source} indicator`), m && r($, "UNEXPECTED_TOKEN", `Unexpected ${$.source} in ${e ?? "collection"}`), m = $, l = t === "seq-item-ind" || t === "explicit-key-ind", u = !1;
        break;
      case "comma":
        if (e) {
          k && r($, "UNEXPECTED_TOKEN", `Unexpected , in ${e}`), k = $, l = !1, u = !1;
          break;
        }
      // else fallthrough
      default:
        r($, "UNEXPECTED_TOKEN", `Unexpected ${$.type} token`), l = !1, u = !1;
    }
  const E = s[s.length - 1], N = E ? E.offset + E.source.length : i;
  return y && n && n.type !== "space" && n.type !== "newline" && n.type !== "comma" && (n.type !== "scalar" || n.source !== "") && r(n.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), h && (l && h.indent <= o || n?.type === "block-map" || n?.type === "block-seq") && r(h, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: k,
    found: m,
    spaceBefore: c,
    comment: f,
    hasNewline: g,
    anchor: p,
    tag: w,
    newlineAfterProp: S,
    end: N,
    start: b ?? N
  };
}
function Be(s) {
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
        if (Be(e.key) || Be(e.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function Lt(s, e, t) {
  if (e?.type === "flow-collection") {
    const n = e.end[0];
    n.indent === s && (n.source === "]" || n.source === "}") && Be(e) && t(n, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function qs(s, e, t) {
  const { uniqueKeys: n } = s.options;
  if (n === !1)
    return !1;
  const i = typeof n == "function" ? n : (r, o) => r === o || T(r) && T(o) && r.value === o.value;
  return e.some((r) => i(r.key, t));
}
const Zt = "All mapping items must start at the same column";
function Un({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = r?.nodeClass ?? q, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1);
  let c = n.offset, l = null;
  for (const u of n.items) {
    const { start: f, key: d, sep: g, value: y } = u, h = $e(f, {
      indicator: "explicit-key-ind",
      next: d ?? g?.[0],
      offset: c,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !0
    }), p = !h.found;
    if (p) {
      if (d && (d.type === "block-seq" ? i(c, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in d && d.indent !== n.indent && i(c, "BAD_INDENT", Zt)), !h.anchor && !h.tag && !g) {
        l = h.end, h.comment && (a.comment ? a.comment += `
` + h.comment : a.comment = h.comment);
        continue;
      }
      (h.newlineAfterProp || Be(d)) && i(d ?? f[f.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else h.found?.indent !== n.indent && i(c, "BAD_INDENT", Zt);
    t.atKey = !0;
    const w = h.end, S = d ? s(t, d, h, i) : e(t, w, f, null, h, i);
    t.schema.compat && Lt(n.indent, d, i), t.atKey = !1, qs(t, a.items, S) && i(w, "DUPLICATE_KEY", "Map keys must be unique");
    const k = $e(g ?? [], {
      indicator: "map-value-ind",
      next: y,
      offset: S.range[2],
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !d || d.type === "block-scalar"
    });
    if (c = k.end, k.found) {
      p && (y?.type === "block-map" && !k.hasNewline && i(c, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), t.options.strict && h.start < k.found.offset - 1024 && i(S.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const m = y ? s(t, y, k, i) : e(t, c, g, null, k, i);
      t.schema.compat && Lt(n.indent, y, i), c = m.range[2];
      const b = new D(S, m);
      t.options.keepSourceTokens && (b.srcToken = u), a.items.push(b);
    } else {
      p && i(S.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), k.comment && (S.comment ? S.comment += `
` + k.comment : S.comment = k.comment);
      const m = new D(S);
      t.options.keepSourceTokens && (m.srcToken = u), a.items.push(m);
    }
  }
  return l && l < c && i(l, "IMPOSSIBLE", "Map comment with trailing content"), a.range = [n.offset, c, l ?? c], a;
}
function Vn({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = r?.nodeClass ?? fe, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let c = n.offset, l = null;
  for (const { start: u, value: f } of n.items) {
    const d = $e(u, {
      indicator: "seq-item-ind",
      next: f,
      offset: c,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !0
    });
    if (!d.found)
      if (d.anchor || d.tag || f)
        f?.type === "block-seq" ? i(d.end, "BAD_INDENT", "All sequence items must start at the same column") : i(c, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        l = d.end, d.comment && (a.comment = d.comment);
        continue;
      }
    const g = f ? s(t, f, d, i) : e(t, d.end, u, null, d, i);
    t.schema.compat && Lt(n.indent, f, i), c = g.range[2], a.items.push(g);
  }
  return a.range = [n.offset, c, l ?? c], a;
}
function Ke(s, e, t, n) {
  let i = "";
  if (s) {
    let r = !1, o = "";
    for (const a of s) {
      const { source: c, type: l } = a;
      switch (l) {
        case "space":
          r = !0;
          break;
        case "comment": {
          t && !r && n(a, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const u = c.substring(1) || " ";
          i ? i += o + u : i = u, o = "";
          break;
        }
        case "newline":
          i && (o += c), r = !0;
          break;
        default:
          n(a, "UNEXPECTED_TOKEN", `Unexpected ${l} at node end`);
      }
      e += c.length;
    }
  }
  return { comment: i, offset: e };
}
const mt = "Block collections are not allowed within flow collections", gt = (s) => s && (s.type === "block-map" || s.type === "block-seq");
function Qn({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = n.start.source === "{", a = o ? "flow map" : "flow sequence", c = r?.nodeClass ?? (o ? q : fe), l = new c(t.schema);
  l.flow = !0;
  const u = t.atRoot;
  u && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let f = n.offset + n.start.source.length;
  for (let p = 0; p < n.items.length; ++p) {
    const w = n.items[p], { start: S, key: k, sep: m, value: b } = w, E = $e(S, {
      flow: a,
      indicator: "explicit-key-ind",
      next: k ?? m?.[0],
      offset: f,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !1
    });
    if (!E.found) {
      if (!E.anchor && !E.tag && !m && !b) {
        p === 0 && E.comma ? i(E.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`) : p < n.items.length - 1 && i(E.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${a}`), E.comment && (l.comment ? l.comment += `
` + E.comment : l.comment = E.comment), f = E.end;
        continue;
      }
      !o && t.options.strict && Be(k) && i(
        k,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (p === 0)
      E.comma && i(E.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`);
    else if (E.comma || i(E.start, "MISSING_CHAR", `Missing , between ${a} items`), E.comment) {
      let N = "";
      e: for (const $ of S)
        switch ($.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            N = $.source.substring(1);
            break e;
          default:
            break e;
        }
      if (N) {
        let $ = l.items[l.items.length - 1];
        C($) && ($ = $.value ?? $.key), $.comment ? $.comment += `
` + N : $.comment = N, E.comment = E.comment.substring(N.length + 1);
      }
    }
    if (!o && !m && !E.found) {
      const N = b ? s(t, b, E, i) : e(t, E.end, m, null, E, i);
      l.items.push(N), f = N.range[2], gt(b) && i(N.range, "BLOCK_IN_FLOW", mt);
    } else {
      t.atKey = !0;
      const N = E.end, $ = k ? s(t, k, E, i) : e(t, N, S, null, E, i);
      gt(k) && i($.range, "BLOCK_IN_FLOW", mt), t.atKey = !1;
      const L = $e(m ?? [], {
        flow: a,
        indicator: "map-value-ind",
        next: b,
        offset: $.range[2],
        onError: i,
        parentIndent: n.indent,
        startOnNewline: !1
      });
      if (L.found) {
        if (!o && !E.found && t.options.strict) {
          if (m)
            for (const v of m) {
              if (v === L.found)
                break;
              if (v.type === "newline") {
                i(v, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          E.start < L.found.offset - 1024 && i(L.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else b && ("source" in b && b.source?.[0] === ":" ? i(b, "MISSING_CHAR", `Missing space after : in ${a}`) : i(L.start, "MISSING_CHAR", `Missing , or : between ${a} items`));
      const A = b ? s(t, b, L, i) : L.found ? e(t, L.end, m, null, L, i) : null;
      A ? gt(b) && i(A.range, "BLOCK_IN_FLOW", mt) : L.comment && ($.comment ? $.comment += `
` + L.comment : $.comment = L.comment);
      const j = new D($, A);
      if (t.options.keepSourceTokens && (j.srcToken = w), o) {
        const v = l;
        qs(t, v.items, $) && i(N, "DUPLICATE_KEY", "Map keys must be unique"), v.items.push(j);
      } else {
        const v = new q(t.schema);
        v.flow = !0, v.items.push(j);
        const B = (A ?? $).range;
        v.range = [$.range[0], B[1], B[2]], l.items.push(v);
      }
      f = A ? A.range[2] : L.end;
    }
  }
  const d = o ? "}" : "]", [g, ...y] = n.end;
  let h = f;
  if (g?.source === d)
    h = g.offset + g.source.length;
  else {
    const p = a[0].toUpperCase() + a.substring(1), w = u ? `${p} must end with a ${d}` : `${p} in block collection must be sufficiently indented and end with a ${d}`;
    i(f, u ? "MISSING_CHAR" : "BAD_INDENT", w), g && g.source.length !== 1 && y.unshift(g);
  }
  if (y.length > 0) {
    const p = Ke(y, h, t.options.strict, i);
    p.comment && (l.comment ? l.comment += `
` + p.comment : l.comment = p.comment), l.range = [n.offset, h, p.offset];
  } else
    l.range = [n.offset, h, h];
  return l;
}
function yt(s, e, t, n, i, r) {
  const o = t.type === "block-map" ? Un(s, e, t, n, r) : t.type === "block-seq" ? Vn(s, e, t, n, r) : Qn(s, e, t, n, r), a = o.constructor;
  return i === "!" || i === a.tagName ? (o.tag = a.tagName, o) : (i && (o.tag = i), o);
}
function Gn(s, e, t, n, i) {
  const r = n.tag, o = r ? e.directives.tagName(r.source, (d) => i(r, "TAG_RESOLVE_FAILED", d)) : null;
  if (t.type === "block-seq") {
    const { anchor: d, newlineAfterProp: g } = n, y = d && r ? d.offset > r.offset ? d : r : d ?? r;
    y && (!g || g.offset < y.offset) && i(y, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const a = t.type === "block-map" ? "map" : t.type === "block-seq" ? "seq" : t.start.source === "{" ? "map" : "seq";
  if (!r || !o || o === "!" || o === q.tagName && a === "map" || o === fe.tagName && a === "seq")
    return yt(s, e, t, i, o);
  let c = e.schema.tags.find((d) => d.tag === o && d.collection === a);
  if (!c) {
    const d = e.schema.knownTags[o];
    if (d?.collection === a)
      e.schema.tags.push(Object.assign({}, d, { default: !1 })), c = d;
    else
      return d ? i(r, "BAD_COLLECTION_TYPE", `${d.tag} used for ${a} collection, but expects ${d.collection ?? "scalar"}`, !0) : i(r, "TAG_RESOLVE_FAILED", `Unresolved tag: ${o}`, !0), yt(s, e, t, i, o);
  }
  const l = yt(s, e, t, i, o, c), u = c.resolve?.(l, (d) => i(r, "TAG_RESOLVE_FAILED", d), e.options) ?? l, f = M(u) ? u : new O(u);
  return f.range = l.range, f.tag = o, c?.format && (f.format = c.format), f;
}
function Hn(s, e, t) {
  const n = e.offset, i = Yn(e, s.options.strict, t);
  if (!i)
    return { value: "", type: null, comment: "", range: [n, n, n] };
  const r = i.mode === ">" ? O.BLOCK_FOLDED : O.BLOCK_LITERAL, o = e.source ? Jn(e.source) : [];
  let a = o.length;
  for (let h = o.length - 1; h >= 0; --h) {
    const p = o[h][1];
    if (p === "" || p === "\r")
      a = h;
    else
      break;
  }
  if (a === 0) {
    const h = i.chomp === "+" && o.length > 0 ? `
`.repeat(Math.max(1, o.length - 1)) : "";
    let p = n + i.length;
    return e.source && (p += e.source.length), { value: h, type: r, comment: i.comment, range: [n, p, p] };
  }
  let c = e.indent + i.indent, l = e.offset + i.length, u = 0;
  for (let h = 0; h < a; ++h) {
    const [p, w] = o[h];
    if (w === "" || w === "\r")
      i.indent === 0 && p.length > c && (c = p.length);
    else {
      p.length < c && t(l + p.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), i.indent === 0 && (c = p.length), u = h, c === 0 && !s.atRoot && t(l, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    l += p.length + w.length + 1;
  }
  for (let h = o.length - 1; h >= a; --h)
    o[h][0].length > c && (a = h + 1);
  let f = "", d = "", g = !1;
  for (let h = 0; h < u; ++h)
    f += o[h][0].slice(c) + `
`;
  for (let h = u; h < a; ++h) {
    let [p, w] = o[h];
    l += p.length + w.length + 1;
    const S = w[w.length - 1] === "\r";
    if (S && (w = w.slice(0, -1)), w && p.length < c) {
      const m = `Block scalar lines must not be less indented than their ${i.indent ? "explicit indentation indicator" : "first line"}`;
      t(l - w.length - (S ? 2 : 1), "BAD_INDENT", m), p = "";
    }
    r === O.BLOCK_LITERAL ? (f += d + p.slice(c) + w, d = `
`) : p.length > c || w[0] === "	" ? (d === " " ? d = `
` : !g && d === `
` && (d = `

`), f += d + p.slice(c) + w, d = `
`, g = !0) : w === "" ? d === `
` ? f += `
` : d = `
` : (f += d + w, d = " ", g = !1);
  }
  switch (i.chomp) {
    case "-":
      break;
    case "+":
      for (let h = a; h < o.length; ++h)
        f += `
` + o[h][0].slice(c);
      f[f.length - 1] !== `
` && (f += `
`);
      break;
    default:
      f += `
`;
  }
  const y = n + i.length + e.source.length;
  return { value: f, type: r, comment: i.comment, range: [n, y, y] };
}
function Yn({ offset: s, props: e }, t, n) {
  if (e[0].type !== "block-scalar-header")
    return n(e[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: i } = e[0], r = i[0];
  let o = 0, a = "", c = -1;
  for (let d = 1; d < i.length; ++d) {
    const g = i[d];
    if (!a && (g === "-" || g === "+"))
      a = g;
    else {
      const y = Number(g);
      !o && y ? o = y : c === -1 && (c = s + d);
    }
  }
  c !== -1 && n(c, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${i}`);
  let l = !1, u = "", f = i.length;
  for (let d = 1; d < e.length; ++d) {
    const g = e[d];
    switch (g.type) {
      case "space":
        l = !0;
      // fallthrough
      case "newline":
        f += g.source.length;
        break;
      case "comment":
        t && !l && n(g, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), f += g.source.length, u = g.source.substring(1);
        break;
      case "error":
        n(g, "UNEXPECTED_TOKEN", g.message), f += g.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const y = `Unexpected token in block scalar header: ${g.type}`;
        n(g, "UNEXPECTED_TOKEN", y);
        const h = g.source;
        h && typeof h == "string" && (f += h.length);
      }
    }
  }
  return { mode: r, indent: o, chomp: a, comment: u, length: f };
}
function Jn(s) {
  const e = s.split(/\n( *)/), t = e[0], n = t.match(/^( *)/), r = [n?.[1] ? [n[1], t.slice(n[1].length)] : ["", t]];
  for (let o = 1; o < e.length; o += 2)
    r.push([e[o], e[o + 1]]);
  return r;
}
function Wn(s, e, t) {
  const { offset: n, type: i, source: r, end: o } = s;
  let a, c;
  const l = (d, g, y) => t(n + d, g, y);
  switch (i) {
    case "scalar":
      a = O.PLAIN, c = zn(r, l);
      break;
    case "single-quoted-scalar":
      a = O.QUOTE_SINGLE, c = Xn(r, l);
      break;
    case "double-quoted-scalar":
      a = O.QUOTE_DOUBLE, c = Zn(r, l);
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
  const u = n + r.length, f = Ke(o, u, e, t);
  return {
    value: c,
    type: a,
    comment: f.comment,
    range: [n, u, f.offset]
  };
}
function zn(s, e) {
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
  return t && e(0, "BAD_SCALAR_START", `Plain value cannot start with ${t}`), Rs(s);
}
function Xn(s, e) {
  return (s[s.length - 1] !== "'" || s.length === 1) && e(s.length, "MISSING_CHAR", "Missing closing 'quote"), Rs(s.slice(1, -1)).replace(/''/g, "'");
}
function Rs(s) {
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
    const l = t[1].replace(i, "");
    l === "" ? o === `
` ? r += o : o = `
` : (r += o + l, o = " "), a = e.lastIndex;
  }
  const c = /[ \t]*(.*)/sy;
  return c.lastIndex = a, t = c.exec(s), r + o + (t?.[1] ?? "");
}
function Zn(s, e) {
  let t = "";
  for (let n = 1; n < s.length - 1; ++n) {
    const i = s[n];
    if (!(i === "\r" && s[n + 1] === `
`))
      if (i === `
`) {
        const { fold: r, offset: o } = ei(s, n);
        t += r, n = o;
      } else if (i === "\\") {
        let r = s[++n];
        const o = ti[r];
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
          t += si(s, n + 1, a, e), n += a;
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
function ei(s, e) {
  let t = "", n = s[e + 1];
  for (; (n === " " || n === "	" || n === `
` || n === "\r") && !(n === "\r" && s[e + 2] !== `
`); )
    n === `
` && (t += `
`), e += 1, n = s[e + 1];
  return t || (t = " "), { fold: t, offset: e };
}
const ti = {
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
function si(s, e, t, n) {
  const i = s.substr(e, t), o = i.length === t && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
  try {
    return String.fromCodePoint(o);
  } catch {
    const a = s.substr(e - 2, t + 2);
    return n(e - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${a}`), a;
  }
}
function Us(s, e, t, n) {
  const { value: i, type: r, comment: o, range: a } = e.type === "block-scalar" ? Hn(s, e, n) : Wn(e, s.options.strict, n), c = t ? s.directives.tagName(t.source, (f) => n(t, "TAG_RESOLVE_FAILED", f)) : null;
  let l;
  s.options.stringKeys && s.atKey ? l = s.schema[Y] : c ? l = ni(s.schema, i, c, t, n) : e.type === "scalar" ? l = ii(s, i, e, n) : l = s.schema[Y];
  let u;
  try {
    const f = l.resolve(i, (d) => n(t ?? e, "TAG_RESOLVE_FAILED", d), s.options);
    u = T(f) ? f : new O(f);
  } catch (f) {
    const d = f instanceof Error ? f.message : String(f);
    n(t ?? e, "TAG_RESOLVE_FAILED", d), u = new O(i);
  }
  return u.range = a, u.source = i, r && (u.type = r), c && (u.tag = c), l.format && (u.format = l.format), o && (u.comment = o), u;
}
function ni(s, e, t, n, i) {
  if (t === "!")
    return s[Y];
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
  return o && !o.collection ? (s.tags.push(Object.assign({}, o, { default: !1, test: void 0 })), o) : (i(n, "TAG_RESOLVE_FAILED", `Unresolved tag: ${t}`, t !== "tag:yaml.org,2002:str"), s[Y]);
}
function ii({ atKey: s, directives: e, schema: t }, n, i, r) {
  const o = t.tags.find((a) => (a.default === !0 || s && a.default === "key") && a.test?.test(n)) || t[Y];
  if (t.compat) {
    const a = t.compat.find((c) => c.default && c.test?.test(n)) ?? t[Y];
    if (o.tag !== a.tag) {
      const c = e.tagString(o.tag), l = e.tagString(a.tag), u = `Value may be parsed as either ${c} or ${l}`;
      r(i, "TAG_RESOLVE_FAILED", u, !0);
    }
  }
  return o;
}
function ri(s, e, t) {
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
const oi = { composeNode: Vs, composeEmptyNode: Vt };
function Vs(s, e, t, n) {
  const i = s.atKey, { spaceBefore: r, comment: o, anchor: a, tag: c } = t;
  let l, u = !0;
  switch (e.type) {
    case "alias":
      l = ai(s, e, n), (a || c) && n(e, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      l = Us(s, e, c, n), a && (l.anchor = a.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        l = Gn(oi, s, e, t, n), a && (l.anchor = a.source.substring(1));
      } catch (f) {
        const d = f instanceof Error ? f.message : String(f);
        n(e, "RESOURCE_EXHAUSTION", d);
      }
      break;
    default: {
      const f = e.type === "error" ? e.message : `Unsupported token (type: ${e.type})`;
      n(e, "UNEXPECTED_TOKEN", f), u = !1;
    }
  }
  return l ?? (l = Vt(s, e.offset, void 0, null, t, n)), a && l.anchor === "" && n(a, "BAD_ALIAS", "Anchor cannot be an empty string"), i && s.options.stringKeys && (!T(l) || typeof l.value != "string" || l.tag && l.tag !== "tag:yaml.org,2002:str") && n(c ?? e, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), r && (l.spaceBefore = !0), o && (e.type === "scalar" && e.source === "" ? l.comment = o : l.commentBefore = o), s.options.keepSourceTokens && u && (l.srcToken = e), l;
}
function Vt(s, e, t, n, { spaceBefore: i, comment: r, anchor: o, tag: a, end: c }, l) {
  const u = {
    type: "scalar",
    offset: ri(e, t, n),
    indent: -1,
    source: ""
  }, f = Us(s, u, a, l);
  return o && (f.anchor = o.source.substring(1), f.anchor === "" && l(o, "BAD_ALIAS", "Anchor cannot be an empty string")), i && (f.spaceBefore = !0), r && (f.comment = r, f.range[2] = c), f;
}
function ai({ options: s }, { offset: e, source: t, end: n }, i) {
  const r = new Ct(t.substring(1));
  r.source === "" && i(e, "BAD_ALIAS", "Alias cannot be an empty string"), r.source.endsWith(":") && i(e + t.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const o = e + t.length, a = Ke(n, o, s.strict, i);
  return r.range = [e, o, a.offset], a.comment && (r.comment = a.comment), r;
}
function li(s, e, { offset: t, start: n, value: i, end: r }, o) {
  const a = Object.assign({ _directives: e }, s), c = new ct(void 0, a), l = {
    atKey: !1,
    atRoot: !0,
    directives: c.directives,
    options: c.options,
    schema: c.schema
  }, u = $e(n, {
    indicator: "doc-start",
    next: i ?? r?.[0],
    offset: t,
    onError: o,
    parentIndent: 0,
    startOnNewline: !0
  });
  u.found && (c.directives.docStart = !0, i && (i.type === "block-map" || i.type === "block-seq") && !u.hasNewline && o(u.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), c.contents = i ? Vs(l, i, u, o) : Vt(l, u.end, n, null, u, o);
  const f = c.contents.range[2], d = Ke(r, f, !1, o);
  return d.comment && (c.comment = d.comment), c.range = [t, f, d.offset], c;
}
function ve(s) {
  if (typeof s == "number")
    return [s, s + 1];
  if (Array.isArray(s))
    return s.length === 2 ? s : [s[0], s[1]];
  const { offset: e, source: t } = s;
  return [e, e + (typeof t == "string" ? t.length : 1)];
}
function es(s) {
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
class ci {
  constructor(e = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (t, n, i, r) => {
      const o = ve(t);
      r ? this.warnings.push(new Rn(o, n, i)) : this.errors.push(new Ie(o, n, i));
    }, this.directives = new x({ version: e.version || "1.2" }), this.options = e;
  }
  decorate(e, t) {
    const { comment: n, afterEmptyLine: i } = es(this.prelude);
    if (n) {
      const r = e.contents;
      if (t)
        e.comment = e.comment ? `${e.comment}
${n}` : n;
      else if (i || e.directives.docStart || !r)
        e.commentBefore = n;
      else if (I(r) && !r.flow && r.items.length > 0) {
        let o = r.items[0];
        C(o) && (o = o.key);
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
      comment: es(this.prelude).comment,
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
          const r = ve(e);
          r[0] += t, this.onError(r, "BAD_DIRECTIVE", n, i);
        }), this.prelude.push(e.source), this.atDirectives = !0;
        break;
      case "document": {
        const t = li(this.options, this.directives, e, this.onError);
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
        const t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, n = new Ie(ve(e), "UNEXPECTED_TOKEN", t);
        this.atDirectives || !this.doc ? this.errors.push(n) : this.doc.errors.push(n);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const n = "Unexpected doc-end without preceding document";
          this.errors.push(new Ie(ve(e), "UNEXPECTED_TOKEN", n));
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
        this.errors.push(new Ie(ve(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
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
      const n = Object.assign({ _directives: this.directives }, this.options), i = new ct(void 0, n);
      this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), i.range = [0, t, t], this.decorate(i, !1), yield i;
    }
  }
}
const Qs = "\uFEFF", Gs = "", Hs = "", vt = "";
function fi(s) {
  switch (s) {
    case Qs:
      return "byte-order-mark";
    case Gs:
      return "doc-mode";
    case Hs:
      return "flow-error-end";
    case vt:
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
const ts = new Set("0123456789ABCDEFabcdef"), ui = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), Ue = new Set(",[]{}"), hi = new Set(` ,[]{}
\r	`), wt = (s) => !s || hi.has(s);
class di {
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
    if (e[0] === Qs && (yield* this.pushCount(1), e = e.substring(1)), e[0] === "%") {
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
    return yield Gs, yield* this.parseLineStart();
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
        return yield* this.pushUntil(wt), "doc";
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
      return this.flowLevel = 0, yield Hs, yield* this.parseLineStart();
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
        return yield* this.pushUntil(wt), "flow";
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
        const a = r;
        for (; o === " "; )
          o = this.buffer[--r];
        if (o === `
` && r >= this.pos && r + 1 + t > a)
          e = r;
        else
          break;
      } while (!0);
    return yield vt, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let t = this.pos - 1, n = this.pos - 1, i;
    for (; i = this.buffer[++n]; )
      if (i === ":") {
        const r = this.buffer[n + 1];
        if (V(r) || e && Ue.has(r))
          break;
        t = n;
      } else if (V(i)) {
        let r = this.buffer[n + 1];
        if (i === "\r" && (r === `
` ? (n += 1, i = `
`, r = this.buffer[n + 1]) : t = n), r === "#" || e && Ue.has(r))
          break;
        if (i === `
`) {
          const o = this.continueScalar(n + 1);
          if (o === -1)
            break;
          n = Math.max(n, o - 2);
        }
      } else {
        if (e && Ue.has(i))
          break;
        t = n;
      }
    return !i && !this.atEnd ? this.setNext("plain-scalar") : (yield vt, yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
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
          e += yield* this.pushUntil(wt), e += yield* this.pushSpaces(!0);
          continue e;
        case "-":
        // this is an error
        case "?":
        // this is an error outside flow collections
        case ":": {
          const t = this.flowLevel > 0, n = this.charAt(1);
          if (V(n) || t && Ue.has(n)) {
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
        if (ui.has(t))
          t = this.buffer[++e];
        else if (t === "%" && ts.has(this.buffer[e + 1]) && ts.has(this.buffer[e + 2]))
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
class pi {
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
function Z(s, e) {
  for (let t = 0; t < s.length; ++t)
    if (s[t].type === e)
      return !0;
  return !1;
}
function ss(s) {
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
function Ys(s) {
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
function Ve(s) {
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
function he(s) {
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
function Xe(s, e) {
  if (e.length < 1e5)
    Array.prototype.push.apply(s, e);
  else
    for (let t = 0; t < e.length; ++t)
      s.push(e[t]);
}
function ns(s) {
  if (s.start.type === "flow-seq-start")
    for (const e of s.items)
      e.sep && !e.value && !Z(e.start, "explicit-key-ind") && !Z(e.sep, "map-value-ind") && (e.key && (e.value = e.key), delete e.key, Ys(e.value) ? e.value.end ? Xe(e.value.end, e.sep) : e.value.end = e.sep : Xe(e.start, e.sep), delete e.sep);
}
class mi {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(e) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new di(), this.onNewLine = e;
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
    const t = fi(e);
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
      switch (t.type === "block-scalar" ? t.indent = "indent" in n ? n.indent : 0 : t.type === "flow-collection" && n.type === "document" && (t.indent = 0), t.type === "flow-collection" && ns(t), n.type) {
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
        i && !i.sep && !i.value && i.start.length > 0 && ss(i.start) === -1 && (t.indent === 0 || i.start.every((r) => r.type !== "comment" || r.indent < t.indent)) && (n.type === "document" ? n.end = i.start : n.items.push({ start: i.start }), t.items.splice(-1, 1));
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
        ss(e.start) !== -1 ? (yield* this.pop(), yield* this.step()) : e.start.push(this.sourceToken);
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
      const t = Ve(this.peek(2)), n = he(t);
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
              Xe(i, t.start), i.push(this.sourceToken), e.items.pop();
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
              else if (Z(t.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: r, key: null, sep: [this.sourceToken] }]
                });
              else if (Ys(t.key) && !Z(t.sep, "newline")) {
                const o = he(t.start), a = t.key, c = t.sep;
                c.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: a, sep: c }]
                });
              } else r.length > 0 ? t.sep = t.sep.concat(r, this.sourceToken) : t.sep.push(this.sourceToken);
            else if (Z(t.start, "newline"))
              Object.assign(t, { key: null, sep: [this.sourceToken] });
            else {
              const o = he(t.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: o, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            t.sep ? t.value || i ? e.items.push({ start: r, key: null, sep: [this.sourceToken] }) : Z(t.sep, "map-value-ind") ? this.stack.push({
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
              if (!t.explicitKey && t.sep && !Z(t.sep, "newline")) {
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
              Xe(i, t.start), i.push(this.sourceToken), e.items.pop();
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
        t.value || Z(t.start, "seq-item-ind") ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
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
        const i = Ve(n), r = he(i);
        ns(e);
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
        const t = Ve(e), n = he(t);
        return n.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: n, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const t = Ve(e), n = he(t);
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
function gi(s) {
  const e = s.prettyErrors !== !1;
  return { lineCounter: s.lineCounter || e && new pi() || null, prettyErrors: e };
}
function yi(s, e = {}) {
  const { lineCounter: t, prettyErrors: n } = gi(e), i = new mi(t?.addNewLine), r = new ci(e);
  let o = null;
  for (const a of r.compose(i.parse(s), !0, s.length))
    if (!o)
      o = a;
    else if (o.options.logLevel !== "silent") {
      o.errors.push(new Ie(a.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return n && t && (o.errors.forEach(Xt(s, t)), o.warnings.forEach(Xt(s, t))), o;
}
const F = {
  comic: {
    title: "제목",
    cast: "등장인물",
    panels: "컷",
    personas: "페르소나"
  },
  cast: {
    asset: "그림",
    label: "이름표",
    appearance: "외형",
    persona: "페르소나"
  },
  persona: { role: "직무", personality: "성격", speechStyle: "말투" },
  appearance: {
    skinColor: "피부색",
    hairStyle: "머리모양",
    hairColor: "머리색",
    outfit: "옷",
    outfitColor: "옷색",
    glasses: "안경"
  },
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
}, At = {
  asset: {
    client: "클라이언트",
    server: "서버",
    database: "데이터베이스",
    human: "사람"
  },
  hairStyle: { short: "짧은머리", bob: "단발", long: "긴머리", bald: "민머리" },
  outfit: { shirt: "셔츠", jacket: "재킷", hoodie: "후드" },
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
}, wi = {
  cast: { asset: "asset" },
  appearance: { hairStyle: "hairStyle", outfit: "outfit" },
  actor: { expression: "expression", gesture: "gesture", holding: "prop" },
  panel: { mode: "mode" },
  transfer: { prop: "prop" },
  diagram: { type: "diagramType" },
  options: { panelFormat: "panelFormat" }
};
function Ye(s) {
  return !!s && typeof s == "object" && !Array.isArray(s);
}
function ee(s, e, t, n) {
  if (!Ye(s)) return s;
  const i = F[e], r = /* @__PURE__ */ Object.create(null);
  for (const [o, a] of Object.entries(s)) {
    const c = Object.keys(i).find(
      (g) => o === g || o === i[g]
    ) ?? o;
    Object.hasOwn(i, c) && i[c];
    const l = c;
    if (Object.hasOwn(r, l))
      throw new Error(
        `${n}: '${i[c]}'와 '${c}'은 같은 항목입니다. 하나만 작성하세요.`
      );
    let u = a;
    const f = wi[e], d = f && Object.hasOwn(f, c) ? f[c] : void 0;
    if (d && typeof a == "string") {
      const g = At[d], y = Object.keys(g).find(
        (h) => a === h || a === g[h]
      );
      y && (u = y);
    }
    if (e === "comic" && c === "cast" && Ye(a)) {
      const g = /* @__PURE__ */ Object.create(null);
      for (const [y, h] of Object.entries(a))
        g[y] = ee(h, "cast", t, `${n}.등장인물.${y}`);
      u = g;
    } else if (e === "comic" && c === "personas" && Ye(a)) {
      const g = /* @__PURE__ */ Object.create(null);
      for (const [y, h] of Object.entries(a))
        g[y] = ee(
          h,
          "persona",
          t,
          `${n}.페르소나.${y}`
        );
      u = g;
    } else if (e === "cast" && c === "persona")
      u = ee(a, "persona", t, `${n}.페르소나`);
    else if (e === "cast" && c === "appearance")
      u = ee(a, "appearance", t, `${n}.외형`);
    else if (e === "panel" && c === "diagram")
      u = ee(a, "diagram", t, `${n}.다이어그램`);
    else if (Array.isArray(a)) {
      const g = e === "comic" && c === "panels" ? "panel" : e === "panel" && c === "actors" ? "actor" : e === "panel" && c === "dialogue" ? "dialogue" : e === "panel" && c === "transfer" ? "transfer" : void 0;
      g && (u = a.map(
        (y, h) => ee(
          y,
          g,
          t,
          `${n}.${i[c]}[${h + 1}]`
        )
      ));
    }
    r[l] = u;
  }
  return r;
}
const bi = (s) => ee(s, "comic", !1, "만화");
function $i(s) {
  const e = ee(s, "options", !1, "표시 설정");
  if (!Ye(e)) throw new Error("표시 설정: 객체가 필요합니다.");
  for (const t of Object.keys(e))
    if (!Object.hasOwn(F.options, t))
      throw new Error(`표시 설정: 알 수 없는 항목 '${t}'.`);
  return e;
}
function _e(s, e) {
  if (!s || typeof s != "object" || Array.isArray(s))
    throw new Error(`${e}: 객체가 필요합니다.`);
  return s;
}
function z(s, e, t = 1e4) {
  if (typeof s != "string" || !s.trim())
    throw new Error(`${e}: 비어 있지 않은 문자열이 필요합니다.`);
  if (s.length > t)
    throw new Error(
      `${e}: 텍스트가 너무 깁니다. ${t}자 이내로 작성하세요.`
    );
  return s;
}
function Qt(s, e, t) {
  for (const n of Object.keys(s))
    if (!Object.hasOwn(e, n))
      throw new Error(`${t}: 알 수 없는 항목 '${n}'.`);
}
function is(s, e) {
  const t = _e(s, e);
  Qt(t, F.persona, e);
  const n = {};
  if (t.role !== void 0 && (n.role = z(t.role, `${e}.직무`, 100)), t.personality !== void 0 && (n.personality = z(t.personality, `${e}.성격`, 300)), t.speechStyle !== void 0 && (n.speechStyle = z(t.speechStyle, `${e}.말투`, 300)), !Object.keys(n).length)
    throw new Error(`${e}: 직무·성격·말투 중 하나 이상 작성하세요.`);
  return n;
}
function bt(s, e, t) {
  if (s === void 0) return e;
  const n = z(s, t, 7);
  if (n.length !== 4 && n.length !== 7 || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(n))
    throw new Error(`${t}: #RGB 또는 #RRGGBB 색상을 작성하세요.`);
  return n;
}
function rs(s, e, t, n) {
  if (s === void 0) return t;
  const i = z(s, n);
  if (!Object.hasOwn(e, i))
    throw new Error(
      `${n}: ${Object.values(e).join(", ")} 중 하나를 선택하세요.`
    );
  return i;
}
function ki(s, e) {
  const t = s === void 0 ? {} : _e(s, e);
  if (Qt(t, F.appearance, e), t.glasses !== void 0 && typeof t.glasses != "boolean")
    throw new Error(`${e}.안경: true 또는 false가 필요합니다.`);
  return {
    skinColor: bt(
      t.skinColor,
      oe.skinColor,
      `${e}.피부색`
    ),
    hairStyle: rs(
      t.hairStyle,
      At.hairStyle,
      oe.hairStyle,
      `${e}.머리모양`
    ),
    hairColor: bt(
      t.hairColor,
      oe.hairColor,
      `${e}.머리색`
    ),
    outfit: rs(
      t.outfit,
      At.outfit,
      oe.outfit,
      `${e}.옷`
    ),
    outfitColor: bt(
      t.outfitColor,
      oe.outfitColor,
      `${e}.옷색`
    ),
    glasses: t.glasses === void 0 ? oe.glasses : t.glasses
  };
}
function Si(s, e) {
  const t = /* @__PURE__ */ Object.create(null);
  if (e !== void 0)
    for (const [i, r] of Object.entries(
      _e(e, "페르소나")
    ))
      z(i, "페르소나 식별자"), t[i] = is(r, `페르소나.${i}`);
  const n = /* @__PURE__ */ Object.create(null);
  for (const [i, r] of Object.entries(_e(s, "등장인물"))) {
    const o = `등장인물.${i}`, a = _e(r, o);
    Qt(a, F.cast, o);
    const c = z(a.asset, `${o}.그림`);
    if (!Object.hasOwn(fs, c))
      throw new Error(`${o}: 없는 에셋 '${c}'.`);
    let l;
    if (a.persona !== void 0)
      if (typeof a.persona == "string") {
        const u = z(a.persona, `${o}.페르소나`);
        if (!Object.hasOwn(t, u))
          throw new Error(`${o}.페르소나: 없는 페르소나 '${u}'.`);
        l = { ...t[u] };
      } else l = is(a.persona, `${o}.페르소나`);
    if (c !== "human" && a.appearance !== void 0)
      throw new Error(`${o}.외형: 사람 그림에서만 사용할 수 있습니다.`);
    n[i] = {
      asset: c,
      label: a.label === void 0 ? i : z(a.label, `${o}.이름표`),
      ...c === "human" ? { appearance: ki(a.appearance, `${o}.외형`) } : {},
      ...l ? { persona: l } : {}
    };
  }
  return { cast: n, ...e !== void 0 ? { personas: t } : {} };
}
function ne(s, e) {
  if (!s || typeof s != "object" || Array.isArray(s))
    throw new Error(`${e}: 객체가 필요합니다.`);
  return s;
}
function P(s, e, t = 1e4) {
  if (typeof s != "string" || !s.trim())
    throw new Error(`${e}: 비어 있지 않은 문자열이 필요합니다.`);
  if (s.length > t)
    throw new Error(
      `${e}: 텍스트가 너무 깁니다. ${t}자 이내로 작성하세요.`
    );
  return s;
}
function de(s, e) {
  if (!Array.isArray(s)) throw new Error(`${e}: 목록이 필요합니다.`);
  return s;
}
function ie(s, e, t) {
  for (const n of Object.keys(s))
    if (!e.includes(n))
      throw new Error(`${t}: 알 수 없는 항목 '${n}'.`);
}
function re(s, e, t, n) {
  if (s !== void 0) {
    if (typeof s != "number" || !Number.isFinite(s) || s < e || s > t)
      throw new Error(`${n}: ${e}~${t} 사이 숫자가 필요합니다.`);
    return s;
  }
}
function Ei(s) {
  if (s.length > 1e5)
    throw new Error("코드가 너무 깁니다. 100KB 이내로 작성하세요.");
  const e = yi(s, { uniqueKeys: !0 });
  if (e.errors.length) throw new Error(e.errors[0].message);
  const t = ne(bi(e.toJS({ maxAliasCount: 20 })), "만화");
  ie(t, Object.keys(F.comic), "만화");
  const { cast: n, personas: i } = Si(t.cast, t.personas);
  let r;
  const o = de(t.panels, "컷").map((a, c) => {
    const l = `컷 ${c + 1}`, u = { ...ne(a, l) };
    if (ie(u, Object.keys(F.panel), l), u.mode !== void 0 && u.mode !== "before" && u.mode !== "full")
      throw new Error(`${l}: 구성은 전체 또는 이전이어야 합니다.`);
    if (u.mode === "before") {
      if (!r)
        throw new Error(`${l}: 첫 컷에서는 이전 구성을 사용할 수 없습니다.`);
      const h = r.actors.map(
        (m) => ({ ...m })
      ), p = de(u.removeActors ?? [], `${l}.제외인물`).map(
        (m) => P(m, `${l}.제외인물`)
      );
      for (const m of p)
        if (!h.some((b) => b.id === m))
          throw new Error(`${l}: 제거할 인물 '${m}'가 이전 컷에 없습니다.`);
      const w = h.filter(
        (m) => !p.some((b) => b === m.id)
      ), S = de(u.actors ?? [], `${l}.인물`), k = /* @__PURE__ */ new Set();
      for (const m of S) {
        const b = typeof m == "string" ? { id: m } : ne(m, `${l}.인물`);
        ie(b, Object.keys(F.actor), `${l}.인물`);
        const E = P(b.id, `${l}.인물.식별자`);
        if (k.has(E))
          throw new Error(`${l}: 캐릭터 식별자가 중복됩니다.`);
        k.add(E);
        const N = w.findIndex((L) => L.id === E), $ = {
          ...N < 0 ? {} : w[N],
          ...b
        };
        for (const [L, A] of Object.entries(b))
          L !== "id" && A === null && delete $[L];
        N < 0 ? w.push($) : w[N] = $;
      }
      u.actors = u.actors !== void 0 && S.length === 0 ? [] : w;
    } else if (u.removeActors !== void 0)
      throw new Error(`${l}: 제외인물은 이전 구성에서만 사용할 수 있습니다.`);
    const f = de(u.actors, `${l}.인물`).map((h) => {
      const p = typeof h == "string" ? { id: h } : ne(h, `${l}.인물`);
      ie(p, Object.keys(F.actor), `${l}.인물`);
      const w = P(p.id, `${l}.인물.식별자`), S = p.expression === void 0 ? "neutral" : P(p.expression, `${l}.${w}.표정`);
      if (!Object.hasOwn(n, w))
        throw new Error(`${l}: 없는 캐릭터 '${w}'.`);
      if (!Object.hasOwn(us, S))
        throw new Error(`${l}.${w}: 없는 표정 '${S}'.`);
      const k = p.gesture === void 0 ? void 0 : P(p.gesture, `${l}.${w}.손모양`), m = p.holding === void 0 ? void 0 : P(p.holding, `${l}.${w}.든소품`);
      if (k && !Object.hasOwn(kt, k))
        throw new Error(`${l}.${w}: 없는 손 제스처 '${k}'.`);
      if (m && !Object.hasOwn(Je, m))
        throw new Error(`${l}.${w}: 없는 소품 '${m}'.`);
      return {
        id: w,
        expression: S,
        gesture: k,
        holding: m,
        x: re(p.x, 0, 1, `${l}.${w}.가로위치`),
        y: re(p.y, 0, 1, `${l}.${w}.세로위치`),
        scale: re(p.scale, 0.5, 1.25, `${l}.${w}.배율`) ?? 1
      };
    });
    if (f.length < 1 || f.length > 3)
      throw new Error(`${l}: 캐릭터는 1~3명이어야 합니다.`);
    if (new Set(f.map((h) => h.id)).size !== f.length)
      throw new Error(`${l}: 캐릭터 식별자가 중복됩니다.`);
    const d = de(u.dialogue ?? [], `${l}.대사`).map(
      (h) => {
        const p = ne(h, `${l}.대사`);
        ie(p, Object.keys(F.dialogue), `${l}.대사`);
        const w = P(p.from, `${l}.대사.화자`), S = p.to === void 0 ? void 0 : P(p.to, `${l}.대사.상대`);
        if (!f.some((k) => k.id === w))
          throw new Error(`${l}: 화자 '${w}'가 컷에 없습니다.`);
        if (S && !f.some((k) => k.id === S))
          throw new Error(`${l}: 대화 상대 '${S}'가 컷에 없습니다.`);
        return {
          from: w,
          to: S,
          text: P(p.text, `${l}.대사.내용`),
          x: re(p.x, 0, 1, `${l}.대사.가로위치`),
          y: re(p.y, 0, 1, `${l}.대사.세로위치`),
          fontSize: re(p.fontSize, 12, 32, `${l}.대사.글자크기`) ?? 18
        };
      }
    );
    if (d.length > 20)
      throw new Error(`${l}: 대사는 20개 이내로 작성하세요.`);
    const g = de(u.transfer ?? [], `${l}.전달`).map(
      (h) => {
        const p = ne(h, `${l}.전달`);
        ie(p, Object.keys(F.transfer), `${l}.전달`);
        const w = P(p.from, `${l}.전달.주는인물`), S = P(p.to, `${l}.전달.받는인물`), k = P(p.prop, `${l}.전달.소품`);
        if (!f.some((m) => m.id === w))
          throw new Error(`${l}: 전달 주체 '${w}'가 컷에 없습니다.`);
        if (!f.some((m) => m.id === S))
          throw new Error(`${l}: 전달 대상 '${S}'가 컷에 없습니다.`);
        if (w === S)
          throw new Error(`${l}: 전달 주체와 대상은 달라야 합니다.`);
        if (!Object.hasOwn(Je, k))
          throw new Error(`${l}: 없는 소품 '${k}'.`);
        return { from: w, to: S, prop: k };
      }
    );
    if (g.length > 6)
      throw new Error(`${l}: 소품 전달은 6개 이내로 작성하세요.`);
    let y;
    if (u.diagram !== void 0 && u.diagram !== null) {
      const h = `${l}.다이어그램`, p = ne(u.diagram, h);
      if (ie(p, Object.keys(F.diagram), h), p.type !== "mermaid")
        throw new Error(`${h}.종류: 머메이드여야 합니다.`);
      y = {
        type: "mermaid",
        source: P(p.source, `${h}.원문`, 2e4),
        title: p.title === void 0 ? "다이어그램" : P(p.title, `${h}.제목`, 100),
        height: re(p.height, 160, 1200, `${h}.높이`)
      };
    }
    return r = { actors: f, dialogue: d, transfer: g, ...y ? { diagram: y } : {} }, r;
  });
  if (o.length < 1 || o.length > 30)
    throw new Error("컷은 1~30개여야 합니다.");
  return {
    title: t.title === void 0 ? "Comic Gen" : P(t.title, "제목"),
    cast: n,
    panels: o,
    ...i ? { personas: i } : {}
  };
}
const Ae = (s, e, t) => Math.max(e, Math.min(t, s));
function $t(s, e, t, n) {
  const i = document.createElement("canvas").getContext("2d");
  i.font = `${t}px ${n}`;
  const r = [];
  for (const o of s.split(`
`)) {
    let a = "";
    for (const c of Array.from(o))
      a && i.measureText(a + c).width > e && (r.push(a), a = ""), a += c;
    r.push(a);
  }
  return r;
}
function Js(s, e, t, n, i = "compact", r) {
  const o = Math.min(t - 80, 390), a = s.dialogue.map((m) => ({
    line: m,
    lines: $t(m.text, o - 36, m.fontSize, n),
    lineHeight: Math.ceil(m.fontSize * 1.45)
  })), c = a.reduce(
    (m, b) => m + 60 + b.lines.length * b.lineHeight,
    20
  ), l = c + 254, u = Math.max(
    ...s.actors.map((m) => m.holding || m.gesture ? 92 : 60)
  ), f = (t - 72) / s.actors.length, d = Math.min(
    1,
    (f - 12) / (2 * u * Math.max(...s.actors.map((m) => m.scale)))
  ), g = s.actors.map((m) => m.scale * d), y = s.actors.map(
    (m, b) => Ae(
      36 + (t - 72) * (m.x ?? (b + 0.5) / s.actors.length),
      26 + u * g[b],
      t - 26 - u * g[b]
    )
  ), h = s.actors.map(
    (m, b) => Ae(
      m.y === void 0 ? l - 126 : m.y * l,
      c + 70 * g[b],
      l - 126 * g[b]
    )
  );
  for (let m = 0; m < s.actors.length; m++)
    for (let b = m + 1; b < s.actors.length; b++)
      if (Math.abs(y[m] - y[b]) < u * (g[m] + g[b]) && Math.abs(h[m] - h[b]) < 120 * Math.max(g[m], g[b]))
        throw new Error(
          `캐릭터 '${s.actors[m].id}'와 '${s.actors[b].id}'가 겹칩니다. 가로위치·세로위치 또는 배율을 조정하세요.`
        );
  const p = [
    `<rect x="20" y="0" width="${t - 40}" height="${l}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/>`
  ];
  let w = 20;
  a.forEach(({ line: m, lines: b, lineHeight: E }) => {
    const N = y[s.actors.findIndex((H) => H.id === m.from)], $ = Ae(
      (m.x === void 0 ? N : m.x * t) - o / 2,
      40,
      t - o - 40
    ), L = 28 + b.length * E, A = m.y === void 0 ? w : Ae(m.y * l, 20, c - L), j = Math.max($ + 24, Math.min($ + o - 24, N)), v = $ + o, B = A + L, J = s.actors.findIndex(
      (H) => H.id === m.from
    ), G = h[J] - 65 * g[J], Le = `M${$ + 14} ${A}H${v - 14}Q${v} ${A} ${v} ${A + 14}V${B - 14}Q${v} ${B} ${v - 14} ${B}H${j + 9}L${N} ${G}L${j - 9} ${B}H${$ + 14}Q${$} ${B} ${$} ${B - 14}V${A + 14}Q${$} ${A} ${$ + 14} ${A}Z`;
    p.push(
      `<g data-dialogue="${K(m.from)}" data-to="${K(m.to ?? "")}"><path d="${Le}" fill="#fffaf0" stroke="#303341" stroke-width="2" stroke-linejoin="round"/><text x="${$ + 18}" y="${A + 18 + m.fontSize}" font-size="${m.fontSize}">${b.map((H, _) => `<tspan x="${$ + 18}" dy="${_ ? E : 0}">${K(H)}</tspan>`).join("")}</text></g>`
    ), w += L + 32;
  }), s.actors.forEach((m, b) => {
    const E = e[m.id], N = Gt(E), $ = E.asset === "human", L = $ ? N.color : "white", A = new Set(
      s.transfer.flatMap((_) => {
        const se = _.from === m.id ? _.to : _.to === m.id ? _.from : void 0;
        if (!se) return [];
        const nn = s.actors.findIndex(
          (rn) => rn.id === se
        );
        return [y[nn] < y[b] ? "left" : "right"];
      })
    ), j = N.restingHands ? (m.gesture || A.has("left") ? "" : N.restingHands.left) + (m.holding || A.has("right") ? "" : N.restingHands.right) : "", v = s.dialogue.find(
      (_) => _.from === m.id && _.to
    )?.to, B = s.actors.findIndex((_) => _.id === v), J = B < 0 ? 0 : Math.sign(y[B] - y[b]) * 4, G = $t(
      E.label,
      (t - 72) / s.actors.length - 12,
      16,
      n
    );
    if (G.length > 2)
      throw new Error(`캐릭터 '${m.id}'의 이름표가 너무 깁니다.`);
    const Le = m.gesture ? `<g data-gesture="${m.gesture}">${$ ? kt[m.gesture].replace('fill="white"', `fill="${L}"`) : kt[m.gesture]}</g>` : "", H = m.holding ? `<g data-holding="${m.holding}"><circle data-hand="holding" cx="58" cy="20" r="11" fill="${L}"/><g data-prop="${m.holding}" transform="translate(73 6)">${Je[m.holding]}</g></g>` : "";
    p.push(
      `<g data-character="${K(m.id)}" transform="translate(${y[b]} ${h[b]}) scale(${g[b]})" stroke="#303341" stroke-width="2.8" stroke-linecap="round"><ellipse cy="69" rx="51" ry="7" fill="#e8edf3" stroke="none"/>${N.body}<g transform="translate(${J} ${N.faceY})" fill="#303341">${us[m.expression]}</g>${j}${Le}${H}<text y="94" text-anchor="middle" stroke="none" fill="#303341" font-size="16">${G.map((_, se) => `<tspan x="0" dy="${se ? 18 : 0}">${K(_)}</tspan>`).join("")}</text></g>`
    );
  }), s.transfer.forEach((m, b) => {
    const E = s.actors.findIndex(
      (_) => _.id === m.from
    ), N = s.actors.findIndex((_) => _.id === m.to), $ = y[E], L = y[N], A = Math.sign(L - $), j = $ + 62 * g[E] * A, v = L - 62 * g[N] * A, B = 20 + (b - (s.transfer.length - 1) / 2) * 12, J = h[E] + B * g[E], G = h[N] + B * g[N], Le = Math.atan2(G - J, v - j) * 180 / Math.PI, H = (_) => {
      const se = e[s.actors[_].id];
      return se.asset === "human" ? Gt(se).color : "white";
    };
    p.push(
      `<g data-transfer="${K(m.from)}" data-to="${K(m.to)}" stroke="#586c8c" stroke-width="2.5"><path d="M${j} ${J}L${v} ${G}" fill="none"/><circle data-hand="transfer" cx="${j}" cy="${J}" r="${9 * g[E]}" fill="${H(E)}"/><circle data-hand="receive" cx="${v}" cy="${G}" r="${9 * g[N]}" fill="${H(N)}"/><path transform="translate(${v} ${G}) rotate(${Le})" d="M-12 -5L-4 0L-12 5" fill="none"/><g data-prop="${m.prop}" transform="translate(${(j + v) / 2} ${(J + G) / 2 - 16})">${Je[m.prop]}</g></g>`
    );
  });
  let S = p.slice(1).join(""), k = l;
  if (r && s.diagram) {
    const m = t - 80, b = m - 32, E = s.diagram.height ?? Ae(b * r.height / r.width + 58, 180, 1200), N = E - 58, $ = Math.min(
      b / r.width,
      N / r.height
    ), L = 56 + (b - r.width * $) / 2, A = 66 + (N - r.height * $) / 2;
    if ($t(s.diagram.title, b, 16, n).length > 1)
      throw new Error(
        "다이어그램 제목이 너무 깁니다. 제목이나 너비를 조정하세요."
      );
    S = `<g data-diagram="mermaid"><rect x="40" y="20" width="${m}" height="${E}" rx="10" fill="#f3f7fc" stroke="#8093ab" stroke-width="2"/><text x="56" y="48" font-size="16" font-weight="700">${K(s.diagram.title)}</text><g data-diagram-content="mermaid" transform="translate(${L} ${A}) scale(${$})">${r.svg}</g></g><g data-scene="true" transform="translate(0 ${E + 40})">${S}</g>`, k += E + 40;
  }
  if (i === "phone") {
    const m = k * 2 + 92;
    return {
      markup: `<rect x="20" y="0" width="${t - 40}" height="${m}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/><g transform="translate(0 ${(m - k) / 2})">${S}</g>`,
      height: m
    };
  }
  return r ? {
    markup: `<rect x="20" y="0" width="${t - 40}" height="${k}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/>${S}`,
    height: k
  } : { markup: p.join(""), height: l };
}
const Ni = "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.6.0/cdn/comic-gen.mermaid.js", Tt = 2e4, Oi = "http://www.w3.org/2000/svg", Li = Math.random().toString(36).slice(2);
let vi = 0, os = Promise.resolve();
const ft = [
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
], Ai = new Set(ft), Ti = /* @__PURE__ */ new Set([
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
]), Ii = /* @__PURE__ */ new Set([
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
  ...ft
]);
function Mi(s) {
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
function Ci(s) {
  if (typeof s != "string" || !s.trim() || s.length > 300 || /[^\p{L}\p{N}\s,'"_\-]/u.test(s))
    throw new Error("다이어그램에 사용할 올바른 글꼴 이름이 필요합니다.");
  return s;
}
async function _i(s) {
  const e = document.createElement("iframe");
  e.title = "Mermaid 렌더링", e.tabIndex = -1, e.setAttribute("aria-hidden", "true"), e.style.cssText = "all:initial!important;display:block!important;width:20000px!important;height:20000px!important;border:0!important;", s.append(e);
  const t = e.contentDocument, n = e.contentWindow;
  if (!t?.body || !n)
    throw e.remove(), new Error("Mermaid 격리 문서를 만들지 못했습니다.");
  const i = t.createElement("script");
  i.type = "module", i.src = Ni;
  try {
    return { api: await new Promise((o, a) => {
      const c = window.setTimeout(() => {
        l(), a(new Error("Mermaid 모듈을 불러오는 시간이 초과되었습니다."));
      }, 3e4), l = () => {
        window.clearTimeout(c), i.onload = null, i.onerror = null, n.removeEventListener("comic-gen-mermaid-ready", u), n.removeEventListener("comic-gen-mermaid-error", f);
      }, u = () => {
        l();
        const d = n.__comicGenMermaid;
        typeof d?.initialize != "function" || typeof d?.render != "function" ? a(new Error("Mermaid 모듈을 불러오지 못했습니다.")) : o(d);
      }, f = () => {
        l(), a(new Error("Mermaid 모듈을 불러오지 못했습니다."));
      };
      n.addEventListener("comic-gen-mermaid-ready", u), n.addEventListener("comic-gen-mermaid-error", f), i.onload = () => {
        n.__comicGenMermaid && u();
      }, i.onerror = f, t.head.append(i);
    }), document: t, dispose: () => e.remove() };
  } catch (r) {
    throw e.remove(), r;
  }
}
function Ws(s) {
  const e = new DOMParser().parseFromString(s, "image/svg+xml");
  if (e.querySelector("parsererror") || e.documentElement.localName !== "svg")
    throw new Error("Mermaid가 올바른 SVG를 만들지 못했습니다.");
  return e.documentElement;
}
function Ze(s, e, t = !1) {
  let n = !0;
  const i = s.replace(
    /url\(\s*(["']?)(.*?)\1\s*\)/gi,
    (r, o, a) => {
      let c = a.trim();
      if (t && !c.startsWith("#")) {
        const l = c.lastIndexOf("#");
        c = l >= 0 ? c.slice(l) : "";
      }
      return !c.startsWith("#") || !e.has(c.slice(1)) ? (n = !1, "") : `url(${c})`;
    }
  );
  return /url\s*\(/i.test(i.replace(/url\(#[^)]*\)/g, "")) && (n = !1), n ? i : void 0;
}
function zs(s, e) {
  const t = document.createElement("span").style;
  for (const n of ft) {
    const i = Ze(s.getPropertyValue(n), e);
    i && t.setProperty(n, i, s.getPropertyPriority(n));
  }
  return s.getPropertyValue("display") === "none" && (t.display = "none"), t.cssText;
}
function ji(s) {
  const e = [];
  let t = 0, n = 0, i = "";
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    i ? o === i && s[r - 1] !== "\\" && (i = "") : o === "'" || o === '"' ? i = o : o === "(" || o === "[" ? n++ : o === ")" || o === "]" ? n-- : o === "," && n === 0 && (e.push(s.slice(t, r).trim()), t = r + 1);
  }
  return e.push(s.slice(t).trim()), e;
}
function Bi(s, e, t) {
  const n = new CSSStyleSheet();
  n.replaceSync(s);
  const i = [], r = `#${e}`;
  for (const o of n.cssRules) {
    if (!(o instanceof CSSStyleRule)) continue;
    if (!ji(o.selectorText).every(
      (l) => l === r || l.startsWith(r + " ") || l.startsWith(r + ">") || l.startsWith(r + ":")
    )) throw new Error("Mermaid SVG에 범위 밖 스타일이 있습니다.");
    const c = zs(o.style, t);
    c && i.push(`${o.selectorText}{${c}}`);
  }
  return i.join(`
`);
}
function Pi(s) {
  if (s.length > 2e6)
    throw new Error("Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요.");
  const e = Ws(s), t = [e, ...e.querySelectorAll("*")];
  if (t.length > 1e4)
    throw new Error(
      "Mermaid SVG 요소가 너무 많습니다. 다이어그램을 나누어 주세요."
    );
  const n = new Set(t.map((r) => r.id).filter(Boolean)), i = e.id;
  for (const r of t)
    for (const o of [...r.attributes])
      if (/url\s*\(/i.test(o.value)) {
        const a = Ze(o.value, n, !0);
        a === void 0 ? r.removeAttributeNode(o) : r.setAttribute(o.name, a);
      }
  for (const r of t) {
    const o = r.localName.toLowerCase();
    if (r.namespaceURI !== Oi || !Ti.has(o) && o !== "style") {
      o === "a" ? r.replaceWith(...r.childNodes) : r.remove();
      continue;
    }
    if (o === "style") {
      r.textContent = Bi(r.textContent ?? "", i, n);
      continue;
    }
    for (const a of [...r.attributes]) {
      const c = a.name.toLowerCase(), l = a.value;
      if (!Ii.has(c) && !c.startsWith("aria-") && !c.startsWith("data-"))
        r.removeAttributeNode(a);
      else if (c === "href" || c === "xlink:href")
        (!l.startsWith("#") || !n.has(l.slice(1))) && r.removeAttributeNode(a);
      else if (c === "style") {
        const u = document.createElement("span").style;
        u.cssText = l, r.setAttribute("style", zs(u, n));
      } else if (Ai.has(c)) {
        const u = Ze(l, n);
        u === void 0 ? r.removeAttributeNode(a) : r.setAttribute(a.name, u);
      }
    }
  }
  return e;
}
function xi(s) {
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
function Di(s) {
  const e = (s.getAttribute("viewBox") ?? "").trim().split(/[\s,]+/).map(Number), t = e.length === 4 ? e[2] : Number.parseFloat(s.getAttribute("width") ?? ""), n = e.length === 4 ? e[3] : Number.parseFloat(s.getAttribute("height") ?? "");
  if (!Number.isFinite(t) || !Number.isFinite(n) || t <= 0 || n <= 0 || t > 2e4 || n > 2e4 || t * n > 16e7)
    throw new Error(
      "Mermaid 다이어그램 크기가 너무 큽니다. 다이어그램을 나누어 주세요."
    );
  return (e.length !== 4 || e.some((i) => !Number.isFinite(i))) && s.setAttribute("viewBox", `0 0 ${t} ${n}`), s.setAttribute("width", String(t)), s.setAttribute("height", String(n)), s.setAttribute("preserveAspectRatio", "xMidYMid meet"), { width: t, height: n };
}
async function Ki(s, e) {
  if (typeof document > "u" || !document.body)
    throw new Error("Mermaid 렌더링에는 브라우저 문서가 필요합니다.");
  Mi(s), e = Ci(e);
  const t = os.then(async () => {
    await Promise.all([
      document.fonts.load(`18px ${e}`, s),
      document.fonts.load(`bold 18px ${e}`, s),
      document.fonts.load(`italic 18px ${e}`, s)
    ]), await document.fonts.ready;
    const n = `comic-gen-mermaid-${Li}-${++vi}`, i = document.createElement("div");
    i.dataset.comicDiagramTemporary = "", i.style.cssText = "all:initial!important;display:block!important;position:fixed!important;left:-100000px!important;top:0!important;width:20000px!important;pointer-events:none!important;opacity:0!important;";
    const r = [...document.fonts].filter(
      (l) => l.status === "loaded"
    );
    let o, a;
    const c = new MutationObserver(() => {
      const l = a?.querySelector("iframe"), u = l?.contentDocument;
      if (!(!l || !u)) {
        l.style.cssText = "all:initial!important;display:block!important;width:20000px!important;height:20000px!important;border:0!important;";
        for (const f of r) u.fonts.add(f);
      }
    });
    document.body.append(i);
    try {
      o = await _i(i);
      for (const k of r) o.document.fonts.add(k);
      a = o.document.createElement("div"), a.style.cssText = "width:20000px;", o.document.body.append(a), c.observe(a, { childList: !0, subtree: !0 });
      const l = o.api;
      l.initialize({
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
      const u = await l.render(n, s, a);
      c.disconnect();
      const f = Pi(xi(u.svg)), d = Di(f), g = i.attachShadow({ mode: "closed" });
      g.append(document.importNode(f, !0));
      const y = g.firstElementChild, h = [y, ...y.querySelectorAll("*")], p = new Set(
        h.map((k) => k.id).filter(Boolean)
      ), w = h.map((k) => {
        if (k.localName === "style") return "";
        const m = getComputedStyle(k), b = document.createElement("span").style;
        for (const E of ft) {
          const N = Ze(
            m.getPropertyValue(E),
            p,
            !0
          );
          N && b.setProperty(E, N, "important");
        }
        return m.display === "none" && b.setProperty("display", "none", "important"), b.cssText;
      });
      h.forEach((k, m) => {
        k.localName === "style" ? k.remove() : (k.setAttribute("style", w[m]), k.removeAttribute("class"));
      }), y.style.removeProperty("visibility"), y.style.setProperty("width", `${d.width}px`, "important"), y.style.setProperty("height", `${d.height}px`, "important"), y.style.setProperty("max-width", "none", "important"), y.style.setProperty("max-height", "none", "important");
      const S = new XMLSerializer().serializeToString(y);
      if (S.length > 2e6)
        throw new Error(
          "Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요."
        );
      return { svg: S, ...d };
    } finally {
      c.disconnect(), o?.document.getElementById(n)?.remove(), o?.document.getElementById(`d${n}`)?.remove(), o?.document.getElementById(`i${n}`)?.remove(), o?.dispose(), i.remove();
    }
  });
  return os = t.catch(() => {
  }), t;
}
function Fi(s, e) {
  if (!/^[A-Za-z][A-Za-z0-9_-]{0,120}$/.test(e))
    throw new Error("다이어그램 SVG 식별자 접두사가 올바르지 않습니다.");
  const t = Ws(s.svg), n = [t, ...t.querySelectorAll("*")], i = /* @__PURE__ */ new Map();
  let r = 0;
  const o = (a) => {
    const c = a.localName === "svg" ? a : a.closest("svg");
    let l = i.get(c);
    return l || (l = /* @__PURE__ */ new Map(), i.set(c, l)), l;
  };
  for (const a of n) {
    if (!a.id) continue;
    const c = o(a);
    if (c.has(a.id))
      throw new Error("다이어그램 SVG 식별자가 중복됩니다.");
    c.set(a.id, `${e}-${r++}`);
  }
  for (const a of n) {
    const c = o(a);
    for (const l of [...a.attributes])
      if (l.name === "id")
        a.setAttribute("id", c.get(l.value));
      else if (l.localName === "href" && l.value.startsWith("#")) {
        const u = c.get(l.value.slice(1));
        u && a.setAttribute(l.name, `#${u}`);
      } else l.name === "aria-labelledby" || l.name === "aria-describedby" ? a.setAttribute(
        l.name,
        l.value.split(/\s+/).map((u) => c.get(u) ?? u).join(" ")
      ) : /url\(/i.test(l.value) && a.setAttribute(
        l.name,
        l.value.replace(
          /url\(\s*(["']?)#([^"')\s]+)\1\s*\)/gi,
          (u, f, d) => c.has(d) ? `url(#${c.get(d)})` : u
        )
      );
  }
  return new XMLSerializer().serializeToString(t);
}
let Xs = 0, qi = 0;
document.fonts.addEventListener("loadingdone", (s) => {
  s.fontfaces.length && Xs++;
});
function Zs(s, e, t) {
  e = $i(e);
  const n = Ei(s), i = e.width ?? 720, r = e.panelFormat ?? t;
  if (r !== "compact" && r !== "phone")
    throw new Error("컷비율은 기본 또는 모바일이어야 합니다.");
  if (!Number.isFinite(i) || i < 480 || i > 2400)
    throw new Error("너비는 480~2400 사이여야 합니다.");
  const o = e.font ?? "Malgun Gothic, Apple SD Gothic Neo, sans-serif";
  if (typeof o != "string" || o.length > 300 || /[<>]/.test(o))
    throw new Error("올바른 글꼴 이름이 필요합니다.");
  return { comic: n, options: e, width: i, font: o, format: r };
}
function en(s, e) {
  const { comic: t, width: n, font: i, options: r, format: o } = e;
  return JSON.stringify({
    panel: s,
    members: s.actors.map((a) => {
      const { asset: c, label: l, appearance: u } = t.cast[a.id];
      return [
        a.id,
        { asset: c, label: l, ...u ? { appearance: u } : {} }
      ];
    }),
    width: n,
    font: i,
    fontEpoch: Xs,
    fontVersion: r.fontVersion,
    assetVersion: on,
    layoutVersion: s.diagram ? 3 : 2,
    format: o
  });
}
function tn(s) {
  return {
    svg: "",
    width: 0,
    height: 0,
    diagnostics: [s instanceof Error ? s.message : "렌더링 실패"],
    panels: []
  };
}
function sn(s, e, t) {
  const { comic: n, width: i, font: r } = s, o = [], a = [], c = `cg-${Date.now().toString(36)}-${++qi}-${Math.random().toString(36).slice(2, 9)}`, l = (f, d, g) => `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${d}" viewBox="0 0 ${i} ${d}" role="img" aria-label="${K(g)}"><title>${K(g)}</title><rect width="100%" height="100%" fill="#f5f7fb"/><g font-family="${K(r)}" fill="#303341"><text x="24" y="42" font-size="24" font-weight="700">${K(g)}</text>${f}</g></svg>`;
  let u = 68;
  for (const [f, d] of e.entries()) {
    const { markup: g, height: y, hit: h } = d, p = (w) => n.panels[f].diagram ? Fi(
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${y}" viewBox="0 0 ${i} ${y}" style="width:${i}px!important;height:${y}px!important;max-width:none!important;max-height:none!important">${g}</svg>`
      },
      `${c}-${w}-${f}`
    ) : g;
    o.push(
      `<g data-panel="${f}" transform="translate(0 ${u})">${p("whole")}</g>`
    ), a.push({
      index: f,
      svg: l(
        `<g data-panel="${f}" transform="translate(0 68)">${p("panel")}</g>`,
        y + 92,
        `${n.title} · ${f + 1}/${n.panels.length}`
      ),
      width: i,
      height: y + 92,
      diagnostics: [],
      cache: { hits: h ? 1 : 0, misses: h ? 0 : 1, bytes: t.bytes }
    }), u += y + 24;
  }
  return {
    svg: l(o.join(""), u, n.title),
    width: i,
    height: u,
    diagnostics: [],
    panels: a,
    cache: {
      hits: e.filter((f) => f.hit).length,
      misses: e.filter((f) => !f.hit).length,
      bytes: t.bytes
    }
  };
}
function as(s, e, t, n = "compact") {
  try {
    const i = Zs(s, e, n), r = i.comic.panels.findIndex(
      (a) => a.diagram
    );
    if (r >= 0)
      throw new Error(
        `컷 ${r + 1}.다이어그램: 만화그리기비동기(renderComicAsync) 또는 컷그리기비동기(renderPanelsAsync)를 await로 호출하세요.`
      );
    const o = i.comic.panels.map((a) => {
      const c = en(a, i), l = t.get(c), u = l ?? Js(
        a,
        i.comic.cast,
        i.width,
        i.font,
        i.format
      );
      return l || t.set(c, u), { ...u, hit: !!l };
    });
    return sn(i, o, t);
  } catch (i) {
    return tn(i);
  }
}
async function ls(s, e, t, n = "compact") {
  try {
    const i = Zs(s, e, n);
    i.comic.panels.some((o) => o.diagram) && await document.fonts.ready;
    const r = [];
    for (const [o, a] of i.comic.panels.entries()) {
      const c = en(a, i), l = t.get(c);
      if (l) {
        r.push({ ...l, hit: !0 });
        continue;
      }
      let u;
      if (a.diagram)
        try {
          u = await Ki(a.diagram.source, i.font);
        } catch (d) {
          throw new Error(
            `컷 ${o + 1}.다이어그램: ${d instanceof Error ? d.message : "Mermaid 렌더링 실패"}`
          );
        }
      const f = Js(
        a,
        i.comic.cast,
        i.width,
        i.font,
        i.format,
        u
      );
      t.set(c, f), r.push({ ...f, hit: !1 });
    }
    return sn(i, r, t);
  } catch (i) {
    return tn(i);
  }
}
function Ri(s = 2e6) {
  const e = new an(s);
  return {
    render: (t, n = {}) => as(t, n, e),
    renderPanels: (t, n = {}) => as(t, n, e, "phone"),
    renderAsync: (t, n = {}) => ls(t, n, e),
    renderPanelsAsync: (t, n = {}) => ls(t, n, e, "phone"),
    clearCache: () => e.clear()
  };
}
const ut = Ri(), Ui = ut.render, Vi = ut.renderPanels, Qi = ut.renderAsync, Gi = ut.renderPanelsAsync;
function Hi(s, e) {
  const t = URL.createObjectURL(s), n = document.createElement("a");
  n.href = t, n.download = e, n.click(), setTimeout(() => URL.revokeObjectURL(t), 1e3);
}
async function Yi(s, e = 1) {
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
      (c, l) => o.toBlob(
        (u) => u ? c(u) : l(new Error("PNG 생성에 실패했습니다.")),
        "image/png"
      )
    );
  } finally {
    URL.revokeObjectURL(i);
  }
}
export {
  on as assetVersion,
  Ri as createRenderer,
  Hi as downloadBlob,
  Yi as exportPng,
  Ui as renderComic,
  Qi as renderComicAsync,
  Vi as renderPanels,
  Gi as renderPanelsAsync,
  Ri as 렌더러만들기,
  Ui as 만화그리기,
  Qi as 만화그리기비동기,
  At as 문법값,
  F as 문법항목,
  Vi as 컷그리기,
  Gi as 컷그리기비동기
};
