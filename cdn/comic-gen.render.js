/*! Comic Gen browser SDK v0.7.6
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
const he = Object.freeze({
  skinColor: "#f0c8a6",
  hairStyle: "short",
  hairColor: "#47362f",
  outfit: "shirt",
  outfitColor: "#647bd6",
  glasses: !1
}), bt = (s) => {
  if (s.length !== 4 && s.length !== 7 || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(s))
    throw new Error("사람의 외형 색상은 #RGB 또는 #RRGGBB로 작성하세요.");
  return s;
};
function ys(s = he) {
  const e = bt(s.skinColor), t = bt(s.hairColor), n = bt(s.outfitColor), i = {
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
  const a = (f, d) => d ? `<g data-human-part="${f}">${d}</g>` : "", c = s.glasses ? '<g data-human-part="glasses" fill="none" stroke-width="1.9"><rect x="-28" y="-30" width="22" height="18" rx="7"/><rect x="6" y="-30" width="22" height="18" rx="7"/><path d="M-6 -22Q0 -25 6 -22M-28 -23L-34 -25M28 -23L34 -25"/></g>' : "", l = `<g data-human="true" data-hair-style="${s.hairStyle}" data-outfit="${s.outfit}">${a("hair-back", i[s.hairStyle])}${a("outfit", o[s.outfit])}${a("neck", `<path d="M-10 11V24Q0 33 10 24V11Z" fill="${e}"/>`)}${a("ears", `<ellipse cx="-35" cy="-17" rx="6" ry="8" fill="${e}"/><ellipse cx="35" cy="-17" rx="6" ry="8" fill="${e}"/>`)}${a("face", `<path d="M-34 -25Q-36 -54 0 -55Q36 -54 34 -25L32 -5Q29 18 0 21Q-29 18 -32 -5Z" fill="${e}"/><g stroke="none" fill="#df8e8b" fill-opacity=".22"><ellipse cx="-24" cy="-8" rx="5" ry="3"/><ellipse cx="24" cy="-8" rx="5" ry="3"/></g>`)}${a("hair-front", r[s.hairStyle])}${a("nose", '<path d="M-2 -8Q0 -6 2 -8" fill="none" stroke-width="1.5" stroke-opacity=".6"/>')}${c}</g>`, u = `<path d="M-49 43Q-54 46 -51 51L-48 55Q-44 59 -40 55L-36 50Q-34 46 -38 43L-40 42Z" fill="${e}"/><path d="M-46 48L-43 51M-42 46L-39 49" fill="none" stroke-width="1.5"/>`;
  return {
    body: l,
    faceY: -16,
    color: e,
    sleeveColor: n,
    longSleeve: s.outfit !== "shirt",
    restingHands: {
      left: `<g data-human-part="resting-hand-left">${u}</g>`,
      right: `<g data-human-part="resting-hand-right" transform="scale(-1 1)">${u}</g>`
    }
  };
}
const dn = "7", pn = ["wave", "point"], ws = {
  client: {
    color: "#9fcdfa",
    faceY: 0,
    body: '<circle r="56" fill="#badcff"/><path d="M-52 20Q-39 54 0 56Q39 54 52 20Q35 44 0 46Q-35 44 -52 20Z" fill="#79addb" fill-opacity=".24" stroke="none"/><path d="M-29 -43Q-17 -51 -3 -52" fill="none" stroke="white" stroke-width="3.2" stroke-opacity=".7"/>'
  },
  server: {
    color: "#efb970",
    faceY: 0,
    body: '<rect x="-52" y="-54" width="104" height="108" rx="22" fill="#ffe0a8"/><path d="M-52 27V32Q-52 54 -30 54H30Q52 54 52 32V27Q34 40 0 40Q-34 40 -52 27Z" fill="#c9903f" fill-opacity=".16" stroke="none"/><rect x="-32" y="-38" width="42" height="9" rx="4.5" fill="#f6c978" stroke="#b8873d" stroke-width="1.6"/><circle cx="29" cy="-33.5" r="4" fill="#75b69b" stroke="#467c68" stroke-width="1.6"/>'
  },
  database: {
    color: "#b4a0ed",
    faceY: 5,
    body: '<path d="M-52 -39v79c0 23 104 23 104 0v-79" fill="#daccff"/><path d="M28 -23V53Q45 51 52 40V-39Z" fill="#aa91d5" fill-opacity=".22" stroke="none"/><path d="M-52 27c0 19 104 19 104 0" fill="none" stroke="#9e86c7" stroke-width="1.8"/><ellipse cy="-39" rx="52" ry="18" fill="#eee6ff"/><path d="M-31 -46Q-10 -54 14 -48" fill="none" stroke="white" stroke-width="2.8" stroke-opacity=".8"/>'
  },
  human: ys()
};
function mn(s) {
  return s.asset === "human" ? ys(s.appearance) : ws[s.asset];
}
const bs = {
  neutral: '<g stroke="none"><circle cx="-17" cy="-4" r="3.8"/><circle cx="17" cy="-4" r="3.8"/></g><path d="M-10 16Q0 23 10 16" fill="none" stroke-width="2.4"/>',
  happy: '<path d="M-24 -3Q-17 -12 -10 -3M10 -3Q17 -12 24 -3" fill="none" stroke-width="2.5"/><path d="M-14 13Q0 20 14 13Q12 31 0 31Q-12 31 -14 13Z" stroke-width="2.2"/><path d="M-10 17Q0 21 10 17L8 21Q0 24 -8 21Z" fill="white" stroke="none"/>',
  confused: '<g stroke="none"><circle cx="-17" cy="-3" r="3.8"/><circle cx="17" cy="-3" r="3.8"/></g><path d="M-25 -15Q-19 -22 -10 -17M10 -14L24 -11M-7 18Q0 13 9 19" fill="none" stroke-width="2.3"/>',
  sad: '<g stroke="none"><circle cx="-17" cy="-2" r="3.6"/><circle cx="17" cy="-2" r="3.6"/></g><path d="M-25 -13Q-17 -13 -11 -19M11 -19Q17 -13 25 -13M-11 23Q0 11 11 23" fill="none" stroke-width="2.3"/>',
  angry: '<g stroke="none"><circle cx="-17" cy="-1" r="3.6"/><circle cx="17" cy="-1" r="3.6"/></g><path d="M-25 -16L-10 -9M10 -9L25 -16M-10 21Q0 15 10 21" fill="none" stroke-width="2.6"/>'
}, tt = {
  request: '<g stroke-width="2.2" stroke-linejoin="round"><rect x="-18" y="-13" width="36" height="26" rx="4" fill="#fff1cf"/><path d="M-16 10L-5 1M5 1L16 10" fill="none" stroke="#cfb67d" stroke-width="1.4"/><path d="M-17 -10L-3 1Q0 3 3 1L17 -10" fill="none"/></g>',
  data: '<g stroke-width="2.2"><path d="M-16 -12v23c0 10 32 10 32 0v-23" fill="#daccff"/><path d="M7 -7V17Q13 15 16 11V-12Z" fill="#b59cdd" stroke="none"/><ellipse cy="-12" rx="16" ry="6" fill="#eee6ff"/><path d="M-15 7Q0 15 15 7" fill="none" stroke="#9e86c7" stroke-width="1.4"/></g>',
  key: '<g stroke-width="2.2" stroke-linejoin="round"><path d="M-3 -3H20V3H17V9H12V3H6V7H2V3H-3Z" fill="#ffdd96"/><path d="M-2 0a8 8 0 1 0-16 0a8 8 0 1 0 16 0ZM-7 0a3 3 0 1 1-6 0a3 3 0 1 1 6 0Z" fill="#ffdd96" fill-rule="evenodd"/></g>'
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
class gn {
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
const Bt = /* @__PURE__ */ Symbol.for("yaml.alias"), At = /* @__PURE__ */ Symbol.for("yaml.document"), ae = /* @__PURE__ */ Symbol.for("yaml.map"), ks = /* @__PURE__ */ Symbol.for("yaml.pair"), W = /* @__PURE__ */ Symbol.for("yaml.scalar"), Me = /* @__PURE__ */ Symbol.for("yaml.seq"), H = /* @__PURE__ */ Symbol.for("yaml.node.type"), Ie = (s) => !!s && typeof s == "object" && s[H] === Bt, ot = (s) => !!s && typeof s == "object" && s[H] === At, Re = (s) => !!s && typeof s == "object" && s[H] === ae, j = (s) => !!s && typeof s == "object" && s[H] === ks, I = (s) => !!s && typeof s == "object" && s[H] === W, qe = (s) => !!s && typeof s == "object" && s[H] === Me;
function T(s) {
  if (s && typeof s == "object")
    switch (s[H]) {
      case ae:
      case Me:
        return !0;
    }
  return !1;
}
function C(s) {
  if (s && typeof s == "object")
    switch (s[H]) {
      case Bt:
      case ae:
      case W:
      case Me:
        return !0;
    }
  return !1;
}
const $s = (s) => (I(s) || T(s)) && !!s.anchor, de = /* @__PURE__ */ Symbol("break visit"), yn = /* @__PURE__ */ Symbol("skip children"), Be = /* @__PURE__ */ Symbol("remove node");
function Te(s, e) {
  const t = wn(e);
  ot(s) ? Se(null, s.contents, t, Object.freeze([s])) === Be && (s.contents = null) : Se(null, s, t, Object.freeze([]));
}
Te.BREAK = de;
Te.SKIP = yn;
Te.REMOVE = Be;
function Se(s, e, t, n) {
  const i = bn(s, e, t, n);
  if (C(i) || j(i))
    return kn(s, n, i), Se(s, i, t, n);
  if (typeof i != "symbol") {
    if (T(e)) {
      n = Object.freeze(n.concat(e));
      for (let r = 0; r < e.items.length; ++r) {
        const o = Se(r, e.items[r], t, n);
        if (typeof o == "number")
          r = o - 1;
        else {
          if (o === de)
            return de;
          o === Be && (e.items.splice(r, 1), r -= 1);
        }
      }
    } else if (j(e)) {
      n = Object.freeze(n.concat(e));
      const r = Se("key", e.key, t, n);
      if (r === de)
        return de;
      r === Be && (e.key = null);
      const o = Se("value", e.value, t, n);
      if (o === de)
        return de;
      o === Be && (e.value = null);
    }
  }
  return i;
}
function wn(s) {
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
function bn(s, e, t, n) {
  if (typeof t == "function")
    return t(s, e, n);
  if (Re(e))
    return t.Map?.(s, e, n);
  if (qe(e))
    return t.Seq?.(s, e, n);
  if (j(e))
    return t.Pair?.(s, e, n);
  if (I(e))
    return t.Scalar?.(s, e, n);
  if (Ie(e))
    return t.Alias?.(s, e, n);
}
function kn(s, e, t) {
  const n = e[e.length - 1];
  if (T(n))
    n.items[s] = t;
  else if (j(n))
    s === "key" ? n.key = t : n.value = t;
  else if (ot(n))
    n.contents = t;
  else {
    const i = Ie(n) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${i} parent`);
  }
}
const $n = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, Sn = (s) => s.replace(/[!,[\]{}]/g, (e) => $n[e]);
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
        return t + Sn(e.substring(n.length));
    return e[0] === "!" ? e : `!<${e}>`;
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], n = Object.entries(this.tags);
    let i;
    if (e && n.length > 0 && C(e.contents)) {
      const r = {};
      Te(e.contents, (o, a) => {
        C(a) && a.tag && (r[a.tag] = !0);
      }), i = Object.keys(r);
    } else
      i = [];
    for (const [r, o] of n)
      r === "!!" && o === "tag:yaml.org,2002:" || (!e || i.some((a) => a.startsWith(o))) && t.push(`%TAG ${r} ${o}`);
    return t.join(`
`);
  }
}
B.defaultYaml = { explicit: !1, version: "1.2" };
B.defaultTags = { "!!": "tag:yaml.org,2002:" };
function Ss(s) {
  if (/[\x00-\x19\s,[\]{}]/.test(s)) {
    const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(s)}`;
    throw new Error(t);
  }
  return !0;
}
function Ls(s) {
  const e = /* @__PURE__ */ new Set();
  return Te(s, {
    Value(t, n) {
      n.anchor && e.add(n.anchor);
    }
  }), e;
}
function Es(s, e) {
  for (let t = 1; ; ++t) {
    const n = `${s}${t}`;
    if (!e.has(n))
      return n;
  }
}
function Ln(s, e) {
  const t = [], n = /* @__PURE__ */ new Map();
  let i = null;
  return {
    onAnchor: (r) => {
      t.push(r), i ?? (i = Ls(s));
      const o = Es(e, i);
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
        if (typeof o == "object" && o.anchor && (I(o.node) || T(o.node)))
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
function Le(s, e, t, n) {
  if (n && typeof n == "object")
    if (Array.isArray(n))
      for (let i = 0, r = n.length; i < r; ++i) {
        const o = n[i], a = Le(s, n, String(i), o);
        a === void 0 ? delete n[i] : a !== o && (n[i] = a);
      }
    else if (n instanceof Map)
      for (const i of Array.from(n.keys())) {
        const r = n.get(i), o = Le(s, n, i, r);
        o === void 0 ? n.delete(i) : o !== r && n.set(i, o);
      }
    else if (n instanceof Set)
      for (const i of Array.from(n)) {
        const r = Le(s, n, i, i);
        r === void 0 ? n.delete(i) : r !== i && (n.delete(i), n.add(r));
      }
    else
      for (const [i, r] of Object.entries(n)) {
        const o = Le(s, n, i, r);
        o === void 0 ? delete n[i] : o !== r && (n[i] = o);
      }
  return s.call(e, t, n);
}
function V(s, e, t) {
  if (Array.isArray(s))
    return s.map((n, i) => V(n, String(i), t));
  if (s && typeof s.toJSON == "function") {
    if (!t || !$s(s))
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
class Qt {
  constructor(e) {
    Object.defineProperty(this, H, { value: e });
  }
  /** Create a copy of this node.  */
  clone() {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (e.range = this.range.slice()), e;
  }
  /** A plain JavaScript representation of this node. */
  toJS(e, { mapAsMap: t, maxAliasCount: n, onAnchor: i, reviver: r } = {}) {
    if (!ot(e))
      throw new TypeError("A document argument is required");
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: e,
      keep: !0,
      mapAsMap: t === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof n == "number" ? n : 100
    }, a = V(this, "", o);
    if (typeof i == "function")
      for (const { count: c, res: l } of o.anchors.values())
        i(l, c);
    return typeof r == "function" ? Le(r, { "": a }, "", a) : a;
  }
}
class Dt extends Qt {
  constructor(e) {
    super(Bt), this.source = e, Object.defineProperty(this, "tag", {
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
    t?.aliasResolveCache ? n = t.aliasResolveCache : (n = [], Te(e, {
      Node: (r, o) => {
        (Ie(o) || $s(o)) && n.push(o);
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
      if (c || (V(i, null, t), c = r.get(i)), c?.res === void 0) {
        const l = "This should not happen: Alias anchor was not resolved?";
        throw new ReferenceError(l);
      }
      if (a >= 0 && (c.count += 1, c.aliasCount === 0 && (c.aliasCount = We(o, i, r)), c.count * c.aliasCount > a)) {
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
      if (Ss(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
        const r = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(r);
      }
      if (e.implicitKey)
        return `${i} `;
    }
    return i;
  }
}
function We(s, e, t) {
  if (Ie(e)) {
    const n = e.resolve(s), i = t && n && t.get(n);
    return i ? i.count * i.aliasCount : 0;
  } else if (T(e)) {
    let n = 0;
    for (const i of e.items) {
      const r = We(s, i, t);
      r > n && (n = r);
    }
    return n;
  } else if (j(e)) {
    const n = We(s, e.key, t), i = We(s, e.value, t);
    return Math.max(n, i);
  }
  return 1;
}
const Ns = (s) => !s || typeof s != "function" && typeof s != "object";
class O extends Qt {
  constructor(e) {
    super(W), this.value = e;
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
const En = "tag:yaml.org,2002:";
function Nn(s, e, t) {
  if (e) {
    const n = t.filter((r) => r.tag === e), i = n.find((r) => !r.format) ?? n[0];
    if (!i)
      throw new Error(`Tag ${e} not found`);
    return i;
  }
  return t.find((n) => n.identify?.(s) && !n.format);
}
function Ke(s, e, t) {
  if (ot(s) && (s = s.contents), C(s))
    return s;
  if (j(s)) {
    const f = t.schema[ae].createNode?.(t.schema, null, t);
    return f.items.push(s), f;
  }
  (s instanceof String || s instanceof Number || s instanceof Boolean || typeof BigInt < "u" && s instanceof BigInt) && (s = s.valueOf());
  const { aliasDuplicateObjects: n, onAnchor: i, onTagObj: r, schema: o, sourceObjects: a } = t;
  let c;
  if (n && s && typeof s == "object") {
    if (c = a.get(s), c)
      return c.anchor ?? (c.anchor = i(s)), new Dt(c.anchor);
    c = { anchor: null, node: null }, a.set(s, c);
  }
  e?.startsWith("!!") && (e = En + e.slice(2));
  let l = Nn(s, e, o.tags);
  if (!l) {
    if (s && typeof s.toJSON == "function" && (s = s.toJSON()), !s || typeof s != "object") {
      const f = new O(s);
      return c && (c.node = f), f;
    }
    l = s instanceof Map ? o[ae] : Symbol.iterator in Object(s) ? o[Me] : o[ae];
  }
  r && (r(l), delete t.onTagObj);
  const u = l?.createNode ? l.createNode(t.schema, s, t) : typeof l?.nodeClass?.from == "function" ? l.nodeClass.from(t.schema, s, t) : new O(s);
  return e ? u.tag = e : l.default || (u.tag = l.tag), c && (c.node = u), u;
}
function st(s, e, t) {
  let n = t;
  for (let i = e.length - 1; i >= 0; --i) {
    const r = e[i];
    if (typeof r == "number" && Number.isInteger(r) && r >= 0) {
      const o = [];
      o[r] = n, n = o;
    } else
      n = /* @__PURE__ */ new Map([[r, n]]);
  }
  return Ke(n, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: s,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const Pe = (s) => s == null || typeof s == "object" && !!s[Symbol.iterator]().next().done;
class Os extends Qt {
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
    return e && (t.schema = e), t.items = t.items.map((n) => C(n) || j(n) ? n.clone(e) : n), this.range && (t.range = this.range.slice()), t;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(e, t) {
    if (Pe(e))
      this.add(t);
    else {
      const [n, ...i] = e, r = this.get(n, !0);
      if (T(r))
        r.addIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(n, st(this.schema, i, t));
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
    return i.length === 0 ? !t && I(r) ? r.value : r : T(r) ? r.getIn(i, t) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!j(t))
        return !1;
      const n = t.value;
      return n == null || e && I(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
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
        this.set(n, st(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`);
    }
  }
}
const On = (s) => s.replace(/^(?!$)(?: $)?/gm, "#");
function te(s, e) {
  return /^\n+$/.test(s) ? s.substring(1) : e ? s.replace(/^(?! *$)/gm, e) : s;
}
const pe = (s, e, t) => s.endsWith(`
`) ? te(t, e) : t.includes(`
`) ? `
` + te(t, e) : (s.endsWith(" ") ? "" : " ") + t, vs = "flow", Mt = "block", Ze = "quoted";
function at(s, e, t = "flow", { indentAtStart: n, lineWidth: i = 80, minContentWidth: r = 20, onFold: o, onOverflow: a } = {}) {
  if (!i || i < 0)
    return s;
  i < r && (r = 0);
  const c = Math.max(1 + r, 1 + i - e.length);
  if (s.length <= c)
    return s;
  const l = [], u = {};
  let f = i - e.length;
  typeof n == "number" && (n > i - Math.max(2, r) ? l.push(0) : f = i - n);
  let d, m, w = !1, h = -1, p = -1, b = -1;
  t === Mt && (h = es(s, h, e.length), h !== -1 && (f = h + c));
  for (let k; k = s[h += 1]; ) {
    if (t === Ze && k === "\\") {
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
      b = h;
    }
    if (k === `
`)
      t === Mt && (h = es(s, h, e.length)), f = h + e.length + c, d = void 0;
    else {
      if (k === " " && m && m !== " " && m !== `
` && m !== "	") {
        const S = s[h + 1];
        S && S !== " " && S !== `
` && S !== "	" && (d = h);
      }
      if (h >= f)
        if (d)
          l.push(d), f = d + c, d = void 0;
        else if (t === Ze) {
          for (; m === " " || m === "	"; )
            m = k, k = s[h += 1], w = !0;
          const S = h > b + 1 ? h - 2 : p - 1;
          if (u[S])
            return s;
          l.push(S), u[S] = !0, f = S + c, d = void 0;
        } else
          w = !0;
    }
    m = k;
  }
  if (w && a && a(), l.length === 0)
    return s;
  o && o();
  let $ = s.slice(0, l[0]);
  for (let k = 0; k < l.length; ++k) {
    const S = l[k], L = l[k + 1] || s.length;
    S === 0 ? $ = `
${e}${s.slice(0, L)}` : (t === Ze && u[S] && ($ += `${s[S]}\\`), $ += `
${e}${s.slice(S + 1, L)}`);
  }
  return $;
}
function es(s, e, t) {
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
const lt = (s, e) => ({
  indentAtStart: e ? s.indent.length : s.indentAtStart,
  lineWidth: s.options.lineWidth,
  minContentWidth: s.options.minContentWidth
}), ct = (s) => /^(%|---|\.\.\.)/m.test(s);
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
function Qe(s, e) {
  const t = JSON.stringify(s);
  if (e.options.doubleQuotedAsJSON)
    return t;
  const { implicitKey: n } = e, i = e.options.doubleQuotedMinMultiLineLength, r = e.indent || (ct(s) ? "  " : "");
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
  return o = a ? o + t.slice(a) : t, n ? o : at(o, r, Ze, lt(e, !1));
}
function It(s, e) {
  if (e.options.singleQuote === !1 || e.implicitKey && s.includes(`
`) || /[ \t]\n|\n[ \t]/.test(s))
    return Qe(s, e);
  const t = e.indent || (ct(s) ? "  " : ""), n = "'" + s.replace(/'/g, "''").replace(/\n+/g, `$&
${t}`) + "'";
  return e.implicitKey ? n : at(n, t, vs, lt(e, !1));
}
function Ee(s, e) {
  const { singleQuote: t } = e.options;
  let n;
  if (t === !1)
    n = Qe;
  else {
    const i = s.includes('"'), r = s.includes("'");
    i && !r ? n = It : r && !i ? n = Qe : n = t ? It : Qe;
  }
  return n(s, e);
}
let Tt;
try {
  Tt = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  Tt = /\n+(?!\n|$)/g;
}
function Xe({ comment: s, type: e, value: t }, n, i, r) {
  const { blockQuote: o, commentString: a, lineWidth: c } = n.options;
  if (!o || /\n[\t ]+$/.test(t))
    return Ee(t, n);
  const l = n.indent || (n.forceBlockIndent || ct(t) ? "  " : ""), u = o === "literal" ? !0 : o === "folded" || e === O.BLOCK_FOLDED ? !1 : e === O.BLOCK_LITERAL ? !0 : !vn(t, c, l.length);
  if (!t)
    return u ? `|
` : `>
`;
  let f, d;
  for (d = t.length; d > 0; --d) {
    const L = t[d - 1];
    if (L !== `
` && L !== "	" && L !== " ")
      break;
  }
  let m = t.substring(d);
  const w = m.indexOf(`
`);
  w === -1 ? f = "-" : t === m || w !== m.length - 1 ? (f = "+", r && r()) : f = "", m && (t = t.slice(0, -m.length), m[m.length - 1] === `
` && (m = m.slice(0, -1)), m = m.replace(Tt, `$&${l}`));
  let h = !1, p, b = -1;
  for (p = 0; p < t.length; ++p) {
    const L = t[p];
    if (L === " ")
      h = !0;
    else if (L === `
`)
      b = p;
    else
      break;
  }
  let $ = t.substring(0, b < p ? b + 1 : p);
  $ && (t = t.substring($.length), $ = $.replace(/\n+/g, `$&${l}`));
  let S = (h ? l ? "2" : "1" : "") + f;
  if (s && (S += " " + a(s.replace(/ ?[\r\n]+/g, " ")), i && i()), !u) {
    const L = t.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${l}`);
    let E = !1;
    const g = lt(n, !0);
    o !== "folded" && e !== O.BLOCK_FOLDED && (g.onOverflow = () => {
      E = !0;
    });
    const y = at(`${$}${L}${m}`, l, Mt, g);
    if (!E)
      return `>${S}
${l}${y}`;
  }
  return t = t.replace(/\n+/g, `$&${l}`), `|${S}
${l}${$}${t}${m}`;
}
function An(s, e, t, n) {
  const { type: i, value: r } = s, { actualString: o, implicitKey: a, indent: c, indentStep: l, inFlow: u } = e;
  if (a && r.includes(`
`) || u && /[[\]{},]/.test(r))
    return Ee(r, e);
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
    return a || u || !r.includes(`
`) ? Ee(r, e) : Xe(s, e, t, n);
  if (!a && !u && i !== O.PLAIN && r.includes(`
`))
    return Xe(s, e, t, n);
  if (ct(r)) {
    if (c === "")
      return e.forceBlockIndent = !0, Xe(s, e, t, n);
    if (a && c === l)
      return Ee(r, e);
  }
  const f = r.replace(/\n+/g, `$&
${c}`);
  if (o) {
    const d = (h) => h.default && h.tag !== "tag:yaml.org,2002:str" && h.test?.test(f), { compat: m, tags: w } = e.doc.schema;
    if (w.some(d) || m?.some(d))
      return Ee(r, e);
  }
  return a ? f : at(f, c, vs, lt(e, !1));
}
function Kt(s, e, t, n) {
  const { implicitKey: i, inFlow: r } = e, o = typeof s.value == "string" ? s : Object.assign({}, s, { value: String(s.value) });
  let { type: a } = s;
  a !== O.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (a = O.QUOTE_DOUBLE);
  const c = (u) => {
    switch (u) {
      case O.BLOCK_FOLDED:
      case O.BLOCK_LITERAL:
        return i || r ? Ee(o.value, e) : Xe(o, e, t, n);
      case O.QUOTE_DOUBLE:
        return Qe(o.value, e);
      case O.QUOTE_SINGLE:
        return It(o.value, e);
      case O.PLAIN:
        return An(o, e, t, n);
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
function As(s, e) {
  const t = Object.assign({
    blockQuote: !0,
    commentString: On,
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
function Mn(s, e) {
  if (e.tag) {
    const i = s.filter((r) => r.tag === e.tag);
    if (i.length > 0)
      return i.find((r) => r.format === e.format) ?? i[0];
  }
  let t, n;
  if (I(e)) {
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
function In(s, e, { anchors: t, doc: n }) {
  if (!n.directives)
    return "";
  const i = [], r = (I(s) || T(s)) && s.anchor;
  r && Ss(r) && (t.add(r), i.push(`&${r}`));
  const o = s.tag ?? (e.default ? null : e.tag);
  return o && i.push(n.directives.tagString(o)), i.join(" ");
}
function ve(s, e, t, n) {
  if (j(s))
    return s.toString(e, t, n);
  if (Ie(s)) {
    if (e.doc.directives)
      return s.toString(e);
    if (e.resolvedAliases?.has(s))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    e.resolvedAliases ? e.resolvedAliases.add(s) : e.resolvedAliases = /* @__PURE__ */ new Set([s]), s = s.resolve(e.doc);
  }
  let i;
  const r = C(s) ? s : e.doc.createNode(s, { onTagObj: (c) => i = c });
  i ?? (i = Mn(e.doc.schema.tags, r));
  const o = In(r, i, e);
  o.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + o.length + 1);
  const a = typeof i.stringify == "function" ? i.stringify(r, e, t, n) : I(r) ? Kt(r, e, t, n) : r.toString(e, t, n);
  return o ? I(r) || a[0] === "{" || a[0] === "[" ? `${o} ${a}` : `${o}
${e.indent}${a}` : a;
}
function Tn({ key: s, value: e }, t, n, i) {
  const { allNullValues: r, doc: o, indent: a, indentStep: c, options: { commentString: l, indentSeq: u, simpleKeys: f } } = t;
  let d = C(s) && s.comment || null;
  if (f) {
    if (d)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (T(s) || !C(s) && typeof s == "object") {
      const g = "With simple keys, collection cannot be used as a key value";
      throw new Error(g);
    }
  }
  let m = !f && (!s || d && e == null && !t.inFlow || T(s) || (I(s) ? s.type === O.BLOCK_FOLDED || s.type === O.BLOCK_LITERAL : typeof s == "object"));
  t = Object.assign({}, t, {
    allNullValues: !1,
    implicitKey: !m && (f || !r),
    indent: a + c
  });
  let w = !1, h = !1, p = ve(s, t, () => w = !0, () => h = !0);
  if (!m && !t.inFlow && p.length > 1024) {
    if (f)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    m = !0;
  }
  if (t.inFlow) {
    if (r || e == null)
      return w && n && n(), p === "" ? "?" : m ? `? ${p}` : p;
  } else if (r && !f || e == null && m)
    return p = `? ${p}`, d && !w ? p += pe(p, t.indent, l(d)) : h && i && i(), p;
  w && (d = null), m ? (d && (p += pe(p, t.indent, l(d))), p = `? ${p}
${a}:`) : (p = `${p}:`, d && (p += pe(p, t.indent, l(d))));
  let b, $, k;
  C(e) ? (b = !!e.spaceBefore, $ = e.commentBefore, k = e.comment) : (b = !1, $ = null, k = null, e && typeof e == "object" && (e = o.createNode(e))), t.implicitKey = !1, !m && !d && I(e) && (t.indentAtStart = p.length + 1), h = !1, !u && c.length >= 2 && !t.inFlow && !m && qe(e) && !e.flow && !e.tag && !e.anchor && (t.indent = t.indent.substring(2));
  let S = !1;
  const L = ve(e, t, () => S = !0, () => h = !0);
  let E = " ";
  if (d || b || $) {
    if (E = b ? `
` : "", $) {
      const g = l($);
      E += `
${te(g, t.indent)}`;
    }
    L === "" && !t.inFlow ? E === `
` && k && (E = `

`) : E += `
${t.indent}`;
  } else if (!m && T(e)) {
    const g = L[0], y = L.indexOf(`
`), N = y !== -1, A = t.inFlow ?? e.flow ?? e.items.length === 0;
    if (N || !A) {
      let _ = !1;
      if (N && (g === "&" || g === "!")) {
        let v = L.indexOf(" ");
        g === "&" && v !== -1 && v < y && L[v + 1] === "!" && (v = L.indexOf(" ", v + 1)), (v === -1 || y < v) && (_ = !0);
      }
      _ || (E = `
${t.indent}`);
    }
  } else (L === "" || L[0] === `
`) && (E = "");
  return p += E + L, t.inFlow ? S && n && n() : k && !S ? p += pe(p, t.indent, l(k)) : h && i && i(), p;
}
function Cn(s, e) {
  (s === "debug" || s === "warn") && console.warn(e);
}
const He = "<<", ne = {
  identify: (s) => s === He || typeof s == "symbol" && s.description === He,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new O(Symbol(He)), {
    addToJSMap: Ms
  }),
  stringify: () => He
}, jn = (s, e) => (ne.identify(e) || I(e) && (!e.type || e.type === O.PLAIN) && ne.identify(e.value)) && s?.doc.schema.tags.some((t) => t.tag === ne.tag && t.default);
function Ms(s, e, t) {
  const n = Is(s, t);
  if (qe(n))
    for (const i of n.items)
      kt(s, e, i);
  else if (Array.isArray(n))
    for (const i of n)
      kt(s, e, i);
  else
    kt(s, e, n);
}
function kt(s, e, t) {
  const n = Is(s, t);
  if (!Re(n))
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
function Is(s, e) {
  return s && Ie(e) ? e.resolve(s.doc, s) : e;
}
function Ts(s, e, { key: t, value: n }) {
  if (C(t) && t.addToJSMap)
    t.addToJSMap(s, e, n);
  else if (jn(s, t))
    Ms(s, e, n);
  else {
    const i = V(t, "", s);
    if (e instanceof Map)
      e.set(i, V(n, i, s));
    else if (e instanceof Set)
      e.add(i);
    else {
      const r = _n(t, i, s), o = V(n, r, s);
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
function _n(s, e, t) {
  if (e === null)
    return "";
  if (typeof e != "object")
    return String(e);
  if (C(s) && t?.doc) {
    const n = As(t.doc, {});
    n.anchors = /* @__PURE__ */ new Set();
    for (const r of t.anchors.keys())
      n.anchors.add(r.anchor);
    n.inFlow = !0, n.inStringifyKey = !0;
    const i = s.toString(n);
    if (!t.mapKeyWarned) {
      let r = JSON.stringify(i);
      r.length > 40 && (r = r.substring(0, 36) + '..."'), Cn(t.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`), t.mapKeyWarned = !0;
    }
    return i;
  }
  return JSON.stringify(e);
}
function Ft(s, e, t) {
  const n = Ke(s, void 0, t), i = Ke(e, void 0, t);
  return new Q(n, i);
}
class Q {
  constructor(e, t = null) {
    Object.defineProperty(this, H, { value: ks }), this.key = e, this.value = t;
  }
  clone(e) {
    let { key: t, value: n } = this;
    return C(t) && (t = t.clone(e)), C(n) && (n = n.clone(e)), new Q(t, n);
  }
  toJSON(e, t) {
    const n = t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return Ts(t, n, this);
  }
  toString(e, t, n) {
    return e?.doc ? Tn(this, e, t, n) : JSON.stringify(this);
  }
}
function Cs(s, e, t) {
  return (e.inFlow ?? s.flow ? xn : Pn)(s, e, t);
}
function Pn({ comment: s, items: e }, t, { blockItemPrefix: n, flowChars: i, itemIndent: r, onChompKeep: o, onComment: a }) {
  const { indent: c, options: { commentString: l } } = t, u = Object.assign({}, t, { indent: r, type: null });
  let f = !1;
  const d = [];
  for (let w = 0; w < e.length; ++w) {
    const h = e[w];
    let p = null;
    if (C(h))
      !f && h.spaceBefore && d.push(""), nt(t, d, h.commentBefore, f), h.comment && (p = h.comment);
    else if (j(h)) {
      const $ = C(h.key) ? h.key : null;
      $ && (!f && $.spaceBefore && d.push(""), nt(t, d, $.commentBefore, f));
    }
    f = !1;
    let b = ve(h, u, () => p = null, () => f = !0);
    p && (b += pe(b, r, l(p))), f && p && (f = !1), d.push(n + b);
  }
  let m;
  if (d.length === 0)
    m = i.start + i.end;
  else {
    m = d[0];
    for (let w = 1; w < d.length; ++w) {
      const h = d[w];
      m += h ? `
${c}${h}` : `
`;
    }
  }
  return s ? (m += `
` + te(l(s), c), a && a()) : f && o && o(), m;
}
function xn({ items: s }, e, { flowChars: t, itemIndent: n }) {
  const { indent: i, indentStep: r, flowCollectionPadding: o, options: { commentString: a } } = e;
  n += r;
  const c = Object.assign({}, e, {
    indent: n,
    inFlow: !0,
    type: null
  });
  let l = !1, u = 0;
  const f = [];
  for (let w = 0; w < s.length; ++w) {
    const h = s[w];
    let p = null;
    if (C(h))
      h.spaceBefore && f.push(""), nt(e, f, h.commentBefore, !1), h.comment && (p = h.comment);
    else if (j(h)) {
      const $ = C(h.key) ? h.key : null;
      $ && ($.spaceBefore && f.push(""), nt(e, f, $.commentBefore, !1), $.comment && (l = !0));
      const k = C(h.value) ? h.value : null;
      k ? (k.comment && (p = k.comment), k.commentBefore && (l = !0)) : h.value == null && $?.comment && (p = $.comment);
    }
    p && (l = !0);
    let b = ve(h, c, () => p = null);
    l || (l = f.length > u || b.includes(`
`)), w < s.length - 1 ? b += "," : e.options.trailingComma && (e.options.lineWidth > 0 && (l || (l = f.reduce(($, k) => $ + k.length + 2, 2) + (b.length + 2) > e.options.lineWidth)), l && (b += ",")), p && (b += pe(b, n, a(p))), f.push(b), u = f.length;
  }
  const { start: d, end: m } = t;
  if (f.length === 0)
    return d + m;
  if (!l) {
    const w = f.reduce((h, p) => h + p.length + 2, 2);
    l = e.options.lineWidth > 0 && w > e.options.lineWidth;
  }
  if (l) {
    let w = d;
    for (const h of f)
      w += h ? `
${r}${i}${h}` : `
`;
    return `${w}
${i}${m}`;
  } else
    return `${d}${o}${f.join(" ")}${o}${m}`;
}
function nt({ indent: s, options: { commentString: e } }, t, n, i) {
  if (n && i && (n = n.replace(/^\n+/, "")), n) {
    const r = te(e(n), s);
    t.push(r.trimStart());
  }
}
function me(s, e) {
  const t = I(e) ? e.value : e;
  for (const n of s)
    if (j(n) && (n.key === e || n.key === t || I(n.key) && n.key.value === t))
      return n;
}
class U extends Os {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(e) {
    super(ae, e), this.items = [];
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
      (l !== void 0 || i) && o.items.push(Ft(c, l, n));
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
    j(e) ? n = e : !e || typeof e != "object" || !("key" in e) ? n = new Q(e, e?.value) : n = new Q(e.key, e.value);
    const i = me(this.items, n.key), r = this.schema?.sortMapEntries;
    if (i) {
      if (!t)
        throw new Error(`Key ${n.key} already set`);
      I(i.value) && Ns(n.value) ? i.value.value = n.value : i.value = n.value;
    } else if (r) {
      const o = this.items.findIndex((a) => r(n, a) < 0);
      o === -1 ? this.items.push(n) : this.items.splice(o, 0, n);
    } else
      this.items.push(n);
  }
  delete(e) {
    const t = me(this.items, e);
    return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
  }
  get(e, t) {
    const i = me(this.items, e)?.value;
    return (!t && I(i) ? i.value : i) ?? void 0;
  }
  has(e) {
    return !!me(this.items, e);
  }
  set(e, t) {
    this.add(new Q(e, t), !0);
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
      Ts(t, i, r);
    return i;
  }
  toString(e, t, n) {
    if (!e)
      return JSON.stringify(this);
    for (const i of this.items)
      if (!j(i))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);
    return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), Cs(this, e, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: e.indent || "",
      onChompKeep: n,
      onComment: t
    });
  }
}
const Ce = {
  collection: "map",
  default: !0,
  nodeClass: U,
  tag: "tag:yaml.org,2002:map",
  resolve(s, e) {
    return Re(s) || e("Expected a mapping for this tag"), s;
  },
  createNode: (s, e, t) => U.from(s, e, t)
};
class ge extends Os {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(e) {
    super(Me, e), this.items = [];
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
    const t = Ge(e);
    return typeof t != "number" ? !1 : this.items.splice(t, 1).length > 0;
  }
  get(e, t) {
    const n = Ge(e);
    if (typeof n != "number")
      return;
    const i = this.items[n];
    return !t && I(i) ? i.value : i;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(e) {
    const t = Ge(e);
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
    const n = Ge(e);
    if (typeof n != "number")
      throw new Error(`Expected a valid index, not ${e}.`);
    const i = this.items[n];
    I(i) && Ns(t) ? i.value = t : this.items[n] = t;
  }
  toJSON(e, t) {
    const n = [];
    t?.onCreate && t.onCreate(n);
    let i = 0;
    for (const r of this.items)
      n.push(V(r, String(i++), t));
    return n;
  }
  toString(e, t, n) {
    return e ? Cs(this, e, {
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
        r.items.push(Ke(a, void 0, n));
      }
    }
    return r;
  }
}
function Ge(s) {
  let e = I(s) ? s.value : s;
  return e && typeof e == "string" && (e = Number(e)), typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
const je = {
  collection: "seq",
  default: !0,
  nodeClass: ge,
  tag: "tag:yaml.org,2002:seq",
  resolve(s, e) {
    return qe(s) || e("Expected a sequence for this tag"), s;
  },
  createNode: (s, e, t) => ge.from(s, e, t)
}, ft = {
  identify: (s) => typeof s == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (s) => s,
  stringify(s, e, t, n) {
    return e = Object.assign({ actualString: !0 }, e), Kt(s, e, t, n);
  }
}, ut = {
  identify: (s) => s == null,
  createNode: () => new O(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new O(null),
  stringify: ({ source: s }, e) => typeof s == "string" && ut.test.test(s) ? s : e.options.nullStr
}, Rt = {
  identify: (s) => typeof s == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (s) => new O(s[0] === "t" || s[0] === "T"),
  stringify({ source: s, value: e }, t) {
    if (s && Rt.test.test(s)) {
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
    let a = e - (r.length - o - 1);
    for (; a-- > 0; )
      r += "0";
  }
  return r;
}
const js = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: J
}, _s = {
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
}, Ps = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(s) {
    const e = new O(parseFloat(s)), t = s.indexOf(".");
    return t !== -1 && s[s.length - 1] === "0" && (e.minFractionDigits = s.length - t - 1), e;
  },
  stringify: J
}, ht = (s) => typeof s == "bigint" || Number.isInteger(s), qt = (s, e, t, { intAsBigInt: n }) => n ? BigInt(s) : parseInt(s.substring(e), t);
function xs(s, e, t) {
  const { value: n } = s;
  return ht(n) && n >= 0 ? t + n.toString(e) : J(s);
}
const Bs = {
  identify: (s) => ht(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (s, e, t) => qt(s, 2, 8, t),
  stringify: (s) => xs(s, 8, "0o")
}, Qs = {
  identify: ht,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (s, e, t) => qt(s, 0, 10, t),
  stringify: J
}, Ds = {
  identify: (s) => ht(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (s, e, t) => qt(s, 2, 16, t),
  stringify: (s) => xs(s, 16, "0x")
}, Bn = [
  Ce,
  je,
  ft,
  ut,
  Rt,
  Bs,
  Qs,
  Ds,
  js,
  _s,
  Ps
];
function ts(s) {
  return typeof s == "bigint" || Number.isInteger(s);
}
const Ye = ({ value: s }) => JSON.stringify(s), Qn = [
  {
    identify: (s) => typeof s == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (s) => s,
    stringify: Ye
  },
  {
    identify: (s) => s == null,
    createNode: () => new O(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: Ye
  },
  {
    identify: (s) => typeof s == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (s) => s === "true",
    stringify: Ye
  },
  {
    identify: ts,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (s, e, { intAsBigInt: t }) => t ? BigInt(s) : parseInt(s, 10),
    stringify: ({ value: s }) => ts(s) ? s.toString() : JSON.stringify(s)
  },
  {
    identify: (s) => typeof s == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (s) => parseFloat(s),
    stringify: Ye
  }
], Dn = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(s, e) {
    return e(`Unresolved plain scalar ${JSON.stringify(s)}`), s;
  }
}, Kn = [Ce, je].concat(Qn, Dn), Ut = {
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
    return Kt({ comment: s, type: e, value: a }, n, i, r);
  }
};
function Ks(s, e) {
  if (qe(s))
    for (let t = 0; t < s.items.length; ++t) {
      let n = s.items[t];
      if (!j(n)) {
        if (Re(n)) {
          n.items.length > 1 && e("Each pair must have its own sequence indicator");
          const i = n.items[0] || new Q(new O(null));
          if (n.commentBefore && (i.key.commentBefore = i.key.commentBefore ? `${n.commentBefore}
${i.key.commentBefore}` : n.commentBefore), n.comment) {
            const r = i.value ?? i.key;
            r.comment = r.comment ? `${n.comment}
${r.comment}` : n.comment;
          }
          n = i;
        }
        s.items[t] = j(n) ? n : new Q(n);
      }
    }
  else
    e("Expected a sequence for this tag");
  return s;
}
function Fs(s, e, t) {
  const { replacer: n } = t, i = new ge(s);
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
      i.items.push(Ft(a, c, t));
    }
  return i;
}
const Vt = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: Ks,
  createNode: Fs
};
class Ne extends ge {
  constructor() {
    super(), this.add = U.prototype.add.bind(this), this.delete = U.prototype.delete.bind(this), this.get = U.prototype.get.bind(this), this.has = U.prototype.has.bind(this), this.set = U.prototype.set.bind(this), this.tag = Ne.tag;
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
      if (j(i) ? (r = V(i.key, "", t), o = V(i.value, r, t)) : r = V(i, "", t), n.has(r))
        throw new Error("Ordered maps must not include duplicate keys");
      n.set(r, o);
    }
    return n;
  }
  static from(e, t, n) {
    const i = Fs(e, t, n), r = new this();
    return r.items = i.items, r;
  }
}
Ne.tag = "tag:yaml.org,2002:omap";
const Ht = {
  collection: "seq",
  identify: (s) => s instanceof Map,
  nodeClass: Ne,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(s, e) {
    const t = Ks(s, e), n = [];
    for (const { key: i } of t.items)
      I(i) && (n.includes(i.value) ? e(`Ordered maps must not include duplicate keys: ${i.value}`) : n.push(i.value));
    return Object.assign(new Ne(), t);
  },
  createNode: (s, e, t) => Ne.from(s, e, t)
};
function Rs({ value: s, source: e }, t) {
  return e && (s ? qs : Us).test.test(e) ? e : s ? t.options.trueStr : t.options.falseStr;
}
const qs = {
  identify: (s) => s === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new O(!0),
  stringify: Rs
}, Us = {
  identify: (s) => s === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new O(!1),
  stringify: Rs
}, Fn = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: J
}, Rn = {
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
}, qn = {
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
  stringify: J
}, Ue = (s) => typeof s == "bigint" || Number.isInteger(s);
function dt(s, e, t, { intAsBigInt: n }) {
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
function Gt(s, e, t) {
  const { value: n } = s;
  if (Ue(n)) {
    const i = n.toString(e);
    return n < 0 ? "-" + t + i.substr(1) : t + i;
  }
  return J(s);
}
const Un = {
  identify: Ue,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (s, e, t) => dt(s, 2, 2, t),
  stringify: (s) => Gt(s, 2, "0b")
}, Vn = {
  identify: Ue,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (s, e, t) => dt(s, 1, 8, t),
  stringify: (s) => Gt(s, 8, "0")
}, Hn = {
  identify: Ue,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (s, e, t) => dt(s, 0, 10, t),
  stringify: J
}, Gn = {
  identify: Ue,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (s, e, t) => dt(s, 2, 16, t),
  stringify: (s) => Gt(s, 16, "0x")
};
class Oe extends U {
  constructor(e) {
    super(e), this.tag = Oe.tag;
  }
  add(e) {
    let t;
    j(e) ? t = e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? t = new Q(e.key, null) : t = new Q(e, null), me(this.items, t.key) || this.items.push(t);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(e, t) {
    const n = me(this.items, e);
    return !t && j(n) ? I(n.key) ? n.key.value : n.key : n;
  }
  set(e, t) {
    if (typeof t != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
    const n = me(this.items, e);
    n && !t ? this.items.splice(this.items.indexOf(n), 1) : !n && t && this.items.push(new Q(e));
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
        typeof i == "function" && (o = i.call(t, o, o)), r.items.push(Ft(o, null, n));
    return r;
  }
}
Oe.tag = "tag:yaml.org,2002:set";
const Yt = {
  collection: "map",
  identify: (s) => s instanceof Set,
  nodeClass: Oe,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (s, e, t) => Oe.from(s, e, t),
  resolve(s, e) {
    if (Re(s)) {
      if (s.hasAllNullValues(!0))
        return Object.assign(new Oe(), s);
      e("Set items must all have null values");
    } else
      e("Expected a mapping for this tag");
    return s;
  }
};
function Jt(s, e) {
  const t = s[0], n = t === "-" || t === "+" ? s.substring(1) : s, i = (o) => e ? BigInt(o) : Number(o), r = n.replace(/_/g, "").split(":").reduce((o, a) => o * i(60) + i(a), i(0));
  return t === "-" ? i(-1) * r : r;
}
function Vs(s) {
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
const Hs = {
  identify: (s) => typeof s == "bigint" || Number.isInteger(s),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (s, e, { intAsBigInt: t }) => Jt(s, t),
  stringify: Vs
}, Gs = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (s) => Jt(s, !1),
  stringify: Vs
}, pt = {
  identify: (s) => s instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(s) {
    const e = s.match(pt.test);
    if (!e)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, t, n, i, r, o, a] = e.map(Number), c = e[7] ? Number((e[7] + "00").substr(1, 3)) : 0;
    let l = Date.UTC(t, n - 1, i, r || 0, o || 0, a || 0, c);
    const u = e[8];
    if (u && u !== "Z") {
      let f = Jt(u, !1);
      Math.abs(f) < 30 && (f *= 60), l -= 6e4 * f;
    }
    return new Date(l);
  },
  stringify: ({ value: s }) => s?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, ss = [
  Ce,
  je,
  ft,
  ut,
  qs,
  Us,
  Un,
  Vn,
  Hn,
  Gn,
  Fn,
  Rn,
  qn,
  Ut,
  ne,
  Ht,
  Vt,
  Yt,
  Hs,
  Gs,
  pt
], ns = /* @__PURE__ */ new Map([
  ["core", Bn],
  ["failsafe", [Ce, je, ft]],
  ["json", Kn],
  ["yaml11", ss],
  ["yaml-1.1", ss]
]), is = {
  binary: Ut,
  bool: Rt,
  float: Ps,
  floatExp: _s,
  floatNaN: js,
  floatTime: Gs,
  int: Qs,
  intHex: Ds,
  intOct: Bs,
  intTime: Hs,
  map: Ce,
  merge: ne,
  null: ut,
  omap: Ht,
  pairs: Vt,
  seq: je,
  set: Yt,
  timestamp: pt
}, Yn = {
  "tag:yaml.org,2002:binary": Ut,
  "tag:yaml.org,2002:merge": ne,
  "tag:yaml.org,2002:omap": Ht,
  "tag:yaml.org,2002:pairs": Vt,
  "tag:yaml.org,2002:set": Yt,
  "tag:yaml.org,2002:timestamp": pt
};
function $t(s, e, t) {
  const n = ns.get(e);
  if (n && !s)
    return t && !n.includes(ne) ? n.concat(ne) : n.slice();
  let i = n;
  if (!i)
    if (Array.isArray(s))
      i = [];
    else {
      const r = Array.from(ns.keys()).filter((o) => o !== "yaml11").map((o) => JSON.stringify(o)).join(", ");
      throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`);
    }
  if (Array.isArray(s))
    for (const r of s)
      i = i.concat(r);
  else typeof s == "function" && (i = s(i.slice()));
  return t && (i = i.concat(ne)), i.reduce((r, o) => {
    const a = typeof o == "string" ? is[o] : o;
    if (!a) {
      const c = JSON.stringify(o), l = Object.keys(is).map((u) => JSON.stringify(u)).join(", ");
      throw new Error(`Unknown custom tag ${c}; use one of ${l}`);
    }
    return r.includes(a) || r.push(a), r;
  }, []);
}
const Jn = (s, e) => s.key < e.key ? -1 : s.key > e.key ? 1 : 0;
class zt {
  constructor({ compat: e, customTags: t, merge: n, resolveKnownTags: i, schema: r, sortMapEntries: o, toStringDefaults: a }) {
    this.compat = Array.isArray(e) ? $t(e, "compat") : e ? $t(null, e) : null, this.name = typeof r == "string" && r || "core", this.knownTags = i ? Yn : {}, this.tags = $t(t, this.name, n), this.toStringOptions = a ?? null, Object.defineProperty(this, ae, { value: Ce }), Object.defineProperty(this, W, { value: ft }), Object.defineProperty(this, Me, { value: je }), this.sortMapEntries = typeof o == "function" ? o : o === !0 ? Jn : null;
  }
  clone() {
    const e = Object.create(zt.prototype, Object.getOwnPropertyDescriptors(this));
    return e.tags = this.tags.slice(), e;
  }
}
function zn(s, e) {
  const t = [];
  let n = e.directives === !0;
  if (e.directives !== !1 && s.directives) {
    const c = s.directives.toString(s);
    c ? (t.push(c), n = !0) : s.directives.docStart && (n = !0);
  }
  n && t.push("---");
  const i = As(s, e), { commentString: r } = i.options;
  if (s.commentBefore) {
    t.length !== 1 && t.unshift("");
    const c = r(s.commentBefore);
    t.unshift(te(c, ""));
  }
  let o = !1, a = null;
  if (s.contents) {
    if (C(s.contents)) {
      if (s.contents.spaceBefore && n && t.push(""), s.contents.commentBefore) {
        const u = r(s.contents.commentBefore);
        t.push(te(u, ""));
      }
      i.forceBlockIndent = !!s.comment, a = s.contents.comment;
    }
    const c = a ? void 0 : () => o = !0;
    let l = ve(s.contents, i, () => a = null, c);
    a && (l += pe(l, "", r(a))), (l[0] === "|" || l[0] === ">") && t[t.length - 1] === "---" ? t[t.length - 1] = `--- ${l}` : t.push(l);
  } else
    t.push(ve(s.contents, i));
  if (s.directives?.docEnd)
    if (s.comment) {
      const c = r(s.comment);
      c.includes(`
`) ? (t.push("..."), t.push(te(c, ""))) : t.push(`... ${c}`);
    } else
      t.push("...");
  else {
    let c = s.comment;
    c && o && (c = c.replace(/^\n+/, "")), c && ((!o || a) && t[t.length - 1] !== "" && t.push(""), t.push(te(r(c), "")));
  }
  return t.join(`
`) + `
`;
}
class mt {
  constructor(e, t, n) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, H, { value: At });
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
    const e = Object.create(mt.prototype, {
      [H]: { value: At }
    });
    return e.commentBefore = this.commentBefore, e.comment = this.comment, e.errors = this.errors.slice(), e.warnings = this.warnings.slice(), e.options = Object.assign({}, this.options), this.directives && (e.directives = this.directives.clone()), e.schema = this.schema.clone(), e.contents = C(this.contents) ? this.contents.clone(e.schema) : this.contents, this.range && (e.range = this.range.slice()), e;
  }
  /** Adds a value to the document. */
  add(e) {
    be(this.contents) && this.contents.add(e);
  }
  /** Adds a value to the document. */
  addIn(e, t) {
    be(this.contents) && this.contents.addIn(e, t);
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
      const n = Ls(this);
      e.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !t || n.has(t) ? Es(t || "a", n) : t;
    }
    return new Dt(e.anchor);
  }
  createNode(e, t, n) {
    let i;
    if (typeof t == "function")
      e = t.call({ "": e }, "", e), i = t;
    else if (Array.isArray(t)) {
      const p = ($) => typeof $ == "number" || $ instanceof String || $ instanceof Number, b = t.filter(p).map(String);
      b.length > 0 && (t = t.concat(b)), i = t;
    } else n === void 0 && t && (n = t, t = void 0);
    const { aliasDuplicateObjects: r, anchorPrefix: o, flow: a, keepUndefined: c, onTagObj: l, tag: u } = n ?? {}, { onAnchor: f, setAnchors: d, sourceObjects: m } = Ln(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      o || "a"
    ), w = {
      aliasDuplicateObjects: r ?? !0,
      keepUndefined: c ?? !1,
      onAnchor: f,
      onTagObj: l,
      replacer: i,
      schema: this.schema,
      sourceObjects: m
    }, h = Ke(e, u, w);
    return a && T(h) && (h.flow = !0), d(), h;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(e, t, n = {}) {
    const i = this.createNode(e, null, n), r = this.createNode(t, null, n);
    return new Q(i, r);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    return be(this.contents) ? this.contents.delete(e) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    return Pe(e) ? this.contents == null ? !1 : (this.contents = null, !0) : be(this.contents) ? this.contents.deleteIn(e) : !1;
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
    return Pe(e) ? !t && I(this.contents) ? this.contents.value : this.contents : T(this.contents) ? this.contents.getIn(e, t) : void 0;
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
    return Pe(e) ? this.contents !== void 0 : T(this.contents) ? this.contents.hasIn(e) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(e, t) {
    this.contents == null ? this.contents = st(this.schema, [e], t) : be(this.contents) && this.contents.set(e, t);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    Pe(e) ? this.contents = t : this.contents == null ? this.contents = st(this.schema, Array.from(e), t) : be(this.contents) && this.contents.setIn(e, t);
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
      this.schema = new zt(Object.assign(n, t));
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
    }, c = V(this.contents, t ?? "", a);
    if (typeof r == "function")
      for (const { count: l, res: u } of a.anchors.values())
        r(u, l);
    return typeof o == "function" ? Le(o, { "": c }, "", c) : c;
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
    return zn(this, e);
  }
}
function be(s) {
  if (T(s))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class Ys extends Error {
  constructor(e, t, n, i) {
    super(), this.name = e, this.code = n, this.message = i, this.pos = t;
  }
}
class xe extends Ys {
  constructor(e, t, n) {
    super("YAMLParseError", e, t, n);
  }
}
class Wn extends Ys {
  constructor(e, t, n) {
    super("YAMLWarning", e, t, n);
  }
}
const rs = (s, e) => (t) => {
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
function Ae(s, { flow: e, indicator: t, next: n, offset: i, onError: r, parentIndent: o, startOnNewline: a }) {
  let c = !1, l = a, u = a, f = "", d = "", m = !1, w = !1, h = null, p = null, b = null, $ = null, k = null, S = null, L = null;
  for (const y of s)
    switch (w && (y.type !== "space" && y.type !== "newline" && y.type !== "comma" && r(y.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), w = !1), h && (l && y.type !== "comment" && y.type !== "newline" && r(h, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), h = null), y.type) {
      case "space":
        !e && (t !== "doc-start" || n?.type !== "flow-collection") && y.source.includes("	") && (h = y), u = !0;
        break;
      case "comment": {
        u || r(y, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const N = y.source.substring(1) || " ";
        f ? f += d + N : f = N, d = "", l = !1;
        break;
      }
      case "newline":
        l ? f ? f += y.source : (!S || t !== "seq-item-ind") && (c = !0) : d += y.source, l = !0, m = !0, (p || b) && ($ = y), u = !0;
        break;
      case "anchor":
        p && r(y, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), y.source.endsWith(":") && r(y.offset + y.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), p = y, L ?? (L = y.offset), l = !1, u = !1, w = !0;
        break;
      case "tag": {
        b && r(y, "MULTIPLE_TAGS", "A node can have at most one tag"), b = y, L ?? (L = y.offset), l = !1, u = !1, w = !0;
        break;
      }
      case t:
        (p || b) && r(y, "BAD_PROP_ORDER", `Anchors and tags must be after the ${y.source} indicator`), S && r(y, "UNEXPECTED_TOKEN", `Unexpected ${y.source} in ${e ?? "collection"}`), S = y, l = t === "seq-item-ind" || t === "explicit-key-ind", u = !1;
        break;
      case "comma":
        if (e) {
          k && r(y, "UNEXPECTED_TOKEN", `Unexpected , in ${e}`), k = y, l = !1, u = !1;
          break;
        }
      // else fallthrough
      default:
        r(y, "UNEXPECTED_TOKEN", `Unexpected ${y.type} token`), l = !1, u = !1;
    }
  const E = s[s.length - 1], g = E ? E.offset + E.source.length : i;
  return w && n && n.type !== "space" && n.type !== "newline" && n.type !== "comma" && (n.type !== "scalar" || n.source !== "") && r(n.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), h && (l && h.indent <= o || n?.type === "block-map" || n?.type === "block-seq") && r(h, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: k,
    found: S,
    spaceBefore: c,
    comment: f,
    hasNewline: m,
    anchor: p,
    tag: b,
    newlineAfterProp: $,
    end: g,
    start: L ?? g
  };
}
function Fe(s) {
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
        if (Fe(e.key) || Fe(e.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function Ct(s, e, t) {
  if (e?.type === "flow-collection") {
    const n = e.end[0];
    n.indent === s && (n.source === "]" || n.source === "}") && Fe(e) && t(n, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function Js(s, e, t) {
  const { uniqueKeys: n } = s.options;
  if (n === !1)
    return !1;
  const i = typeof n == "function" ? n : (r, o) => r === o || I(r) && I(o) && r.value === o.value;
  return e.some((r) => i(r.key, t));
}
const os = "All mapping items must start at the same column";
function Zn({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = r?.nodeClass ?? U, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1);
  let c = n.offset, l = null;
  for (const u of n.items) {
    const { start: f, key: d, sep: m, value: w } = u, h = Ae(f, {
      indicator: "explicit-key-ind",
      next: d ?? m?.[0],
      offset: c,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !0
    }), p = !h.found;
    if (p) {
      if (d && (d.type === "block-seq" ? i(c, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in d && d.indent !== n.indent && i(c, "BAD_INDENT", os)), !h.anchor && !h.tag && !m) {
        l = h.end, h.comment && (a.comment ? a.comment += `
` + h.comment : a.comment = h.comment);
        continue;
      }
      (h.newlineAfterProp || Fe(d)) && i(d ?? f[f.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else h.found?.indent !== n.indent && i(c, "BAD_INDENT", os);
    t.atKey = !0;
    const b = h.end, $ = d ? s(t, d, h, i) : e(t, b, f, null, h, i);
    t.schema.compat && Ct(n.indent, d, i), t.atKey = !1, Js(t, a.items, $) && i(b, "DUPLICATE_KEY", "Map keys must be unique");
    const k = Ae(m ?? [], {
      indicator: "map-value-ind",
      next: w,
      offset: $.range[2],
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !d || d.type === "block-scalar"
    });
    if (c = k.end, k.found) {
      p && (w?.type === "block-map" && !k.hasNewline && i(c, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), t.options.strict && h.start < k.found.offset - 1024 && i($.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const S = w ? s(t, w, k, i) : e(t, c, m, null, k, i);
      t.schema.compat && Ct(n.indent, w, i), c = S.range[2];
      const L = new Q($, S);
      t.options.keepSourceTokens && (L.srcToken = u), a.items.push(L);
    } else {
      p && i($.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), k.comment && ($.comment ? $.comment += `
` + k.comment : $.comment = k.comment);
      const S = new Q($);
      t.options.keepSourceTokens && (S.srcToken = u), a.items.push(S);
    }
  }
  return l && l < c && i(l, "IMPOSSIBLE", "Map comment with trailing content"), a.range = [n.offset, c, l ?? c], a;
}
function Xn({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = r?.nodeClass ?? ge, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let c = n.offset, l = null;
  for (const { start: u, value: f } of n.items) {
    const d = Ae(u, {
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
    const m = f ? s(t, f, d, i) : e(t, d.end, u, null, d, i);
    t.schema.compat && Ct(n.indent, f, i), c = m.range[2], a.items.push(m);
  }
  return a.range = [n.offset, c, l ?? c], a;
}
function Ve(s, e, t, n) {
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
const St = "Block collections are not allowed within flow collections", Lt = (s) => s && (s.type === "block-map" || s.type === "block-seq");
function ei({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = n.start.source === "{", a = o ? "flow map" : "flow sequence", c = r?.nodeClass ?? (o ? U : ge), l = new c(t.schema);
  l.flow = !0;
  const u = t.atRoot;
  u && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let f = n.offset + n.start.source.length;
  for (let p = 0; p < n.items.length; ++p) {
    const b = n.items[p], { start: $, key: k, sep: S, value: L } = b, E = Ae($, {
      flow: a,
      indicator: "explicit-key-ind",
      next: k ?? S?.[0],
      offset: f,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !1
    });
    if (!E.found) {
      if (!E.anchor && !E.tag && !S && !L) {
        p === 0 && E.comma ? i(E.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`) : p < n.items.length - 1 && i(E.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${a}`), E.comment && (l.comment ? l.comment += `
` + E.comment : l.comment = E.comment), f = E.end;
        continue;
      }
      !o && t.options.strict && Fe(k) && i(
        k,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (p === 0)
      E.comma && i(E.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`);
    else if (E.comma || i(E.start, "MISSING_CHAR", `Missing , between ${a} items`), E.comment) {
      let g = "";
      e: for (const y of $)
        switch (y.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            g = y.source.substring(1);
            break e;
          default:
            break e;
        }
      if (g) {
        let y = l.items[l.items.length - 1];
        j(y) && (y = y.value ?? y.key), y.comment ? y.comment += `
` + g : y.comment = g, E.comment = E.comment.substring(g.length + 1);
      }
    }
    if (!o && !S && !E.found) {
      const g = L ? s(t, L, E, i) : e(t, E.end, S, null, E, i);
      l.items.push(g), f = g.range[2], Lt(L) && i(g.range, "BLOCK_IN_FLOW", St);
    } else {
      t.atKey = !0;
      const g = E.end, y = k ? s(t, k, E, i) : e(t, g, $, null, E, i);
      Lt(k) && i(y.range, "BLOCK_IN_FLOW", St), t.atKey = !1;
      const N = Ae(S ?? [], {
        flow: a,
        indicator: "map-value-ind",
        next: L,
        offset: y.range[2],
        onError: i,
        parentIndent: n.indent,
        startOnNewline: !1
      });
      if (N.found) {
        if (!o && !E.found && t.options.strict) {
          if (S)
            for (const v of S) {
              if (v === N.found)
                break;
              if (v.type === "newline") {
                i(v, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          E.start < N.found.offset - 1024 && i(N.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else L && ("source" in L && L.source?.[0] === ":" ? i(L, "MISSING_CHAR", `Missing space after : in ${a}`) : i(N.start, "MISSING_CHAR", `Missing , or : between ${a} items`));
      const A = L ? s(t, L, N, i) : N.found ? e(t, N.end, S, null, N, i) : null;
      A ? Lt(L) && i(A.range, "BLOCK_IN_FLOW", St) : N.comment && (y.comment ? y.comment += `
` + N.comment : y.comment = N.comment);
      const _ = new Q(y, A);
      if (t.options.keepSourceTokens && (_.srcToken = b), o) {
        const v = l;
        Js(t, v.items, y) && i(g, "DUPLICATE_KEY", "Map keys must be unique"), v.items.push(_);
      } else {
        const v = new U(t.schema);
        v.flow = !0, v.items.push(_);
        const P = (A ?? y).range;
        v.range = [y.range[0], P[1], P[2]], l.items.push(v);
      }
      f = A ? A.range[2] : N.end;
    }
  }
  const d = o ? "}" : "]", [m, ...w] = n.end;
  let h = f;
  if (m?.source === d)
    h = m.offset + m.source.length;
  else {
    const p = a[0].toUpperCase() + a.substring(1), b = u ? `${p} must end with a ${d}` : `${p} in block collection must be sufficiently indented and end with a ${d}`;
    i(f, u ? "MISSING_CHAR" : "BAD_INDENT", b), m && m.source.length !== 1 && w.unshift(m);
  }
  if (w.length > 0) {
    const p = Ve(w, h, t.options.strict, i);
    p.comment && (l.comment ? l.comment += `
` + p.comment : l.comment = p.comment), l.range = [n.offset, h, p.offset];
  } else
    l.range = [n.offset, h, h];
  return l;
}
function Et(s, e, t, n, i, r) {
  const o = t.type === "block-map" ? Zn(s, e, t, n, r) : t.type === "block-seq" ? Xn(s, e, t, n, r) : ei(s, e, t, n, r), a = o.constructor;
  return i === "!" || i === a.tagName ? (o.tag = a.tagName, o) : (i && (o.tag = i), o);
}
function ti(s, e, t, n, i) {
  const r = n.tag, o = r ? e.directives.tagName(r.source, (d) => i(r, "TAG_RESOLVE_FAILED", d)) : null;
  if (t.type === "block-seq") {
    const { anchor: d, newlineAfterProp: m } = n, w = d && r ? d.offset > r.offset ? d : r : d ?? r;
    w && (!m || m.offset < w.offset) && i(w, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const a = t.type === "block-map" ? "map" : t.type === "block-seq" ? "seq" : t.start.source === "{" ? "map" : "seq";
  if (!r || !o || o === "!" || o === U.tagName && a === "map" || o === ge.tagName && a === "seq")
    return Et(s, e, t, i, o);
  let c = e.schema.tags.find((d) => d.tag === o && d.collection === a);
  if (!c) {
    const d = e.schema.knownTags[o];
    if (d?.collection === a)
      e.schema.tags.push(Object.assign({}, d, { default: !1 })), c = d;
    else
      return d ? i(r, "BAD_COLLECTION_TYPE", `${d.tag} used for ${a} collection, but expects ${d.collection ?? "scalar"}`, !0) : i(r, "TAG_RESOLVE_FAILED", `Unresolved tag: ${o}`, !0), Et(s, e, t, i, o);
  }
  const l = Et(s, e, t, i, o, c), u = c.resolve?.(l, (d) => i(r, "TAG_RESOLVE_FAILED", d), e.options) ?? l, f = C(u) ? u : new O(u);
  return f.range = l.range, f.tag = o, c?.format && (f.format = c.format), f;
}
function si(s, e, t) {
  const n = e.offset, i = ni(e, s.options.strict, t);
  if (!i)
    return { value: "", type: null, comment: "", range: [n, n, n] };
  const r = i.mode === ">" ? O.BLOCK_FOLDED : O.BLOCK_LITERAL, o = e.source ? ii(e.source) : [];
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
    const [p, b] = o[h];
    if (b === "" || b === "\r")
      i.indent === 0 && p.length > c && (c = p.length);
    else {
      p.length < c && t(l + p.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), i.indent === 0 && (c = p.length), u = h, c === 0 && !s.atRoot && t(l, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    l += p.length + b.length + 1;
  }
  for (let h = o.length - 1; h >= a; --h)
    o[h][0].length > c && (a = h + 1);
  let f = "", d = "", m = !1;
  for (let h = 0; h < u; ++h)
    f += o[h][0].slice(c) + `
`;
  for (let h = u; h < a; ++h) {
    let [p, b] = o[h];
    l += p.length + b.length + 1;
    const $ = b[b.length - 1] === "\r";
    if ($ && (b = b.slice(0, -1)), b && p.length < c) {
      const S = `Block scalar lines must not be less indented than their ${i.indent ? "explicit indentation indicator" : "first line"}`;
      t(l - b.length - ($ ? 2 : 1), "BAD_INDENT", S), p = "";
    }
    r === O.BLOCK_LITERAL ? (f += d + p.slice(c) + b, d = `
`) : p.length > c || b[0] === "	" ? (d === " " ? d = `
` : !m && d === `
` && (d = `

`), f += d + p.slice(c) + b, d = `
`, m = !0) : b === "" ? d === `
` ? f += `
` : d = `
` : (f += d + b, d = " ", m = !1);
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
  const w = n + i.length + e.source.length;
  return { value: f, type: r, comment: i.comment, range: [n, w, w] };
}
function ni({ offset: s, props: e }, t, n) {
  if (e[0].type !== "block-scalar-header")
    return n(e[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: i } = e[0], r = i[0];
  let o = 0, a = "", c = -1;
  for (let d = 1; d < i.length; ++d) {
    const m = i[d];
    if (!a && (m === "-" || m === "+"))
      a = m;
    else {
      const w = Number(m);
      !o && w ? o = w : c === -1 && (c = s + d);
    }
  }
  c !== -1 && n(c, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${i}`);
  let l = !1, u = "", f = i.length;
  for (let d = 1; d < e.length; ++d) {
    const m = e[d];
    switch (m.type) {
      case "space":
        l = !0;
      // fallthrough
      case "newline":
        f += m.source.length;
        break;
      case "comment":
        t && !l && n(m, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), f += m.source.length, u = m.source.substring(1);
        break;
      case "error":
        n(m, "UNEXPECTED_TOKEN", m.message), f += m.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const w = `Unexpected token in block scalar header: ${m.type}`;
        n(m, "UNEXPECTED_TOKEN", w);
        const h = m.source;
        h && typeof h == "string" && (f += h.length);
      }
    }
  }
  return { mode: r, indent: o, chomp: a, comment: u, length: f };
}
function ii(s) {
  const e = s.split(/\n( *)/), t = e[0], n = t.match(/^( *)/), r = [n?.[1] ? [n[1], t.slice(n[1].length)] : ["", t]];
  for (let o = 1; o < e.length; o += 2)
    r.push([e[o], e[o + 1]]);
  return r;
}
function ri(s, e, t) {
  const { offset: n, type: i, source: r, end: o } = s;
  let a, c;
  const l = (d, m, w) => t(n + d, m, w);
  switch (i) {
    case "scalar":
      a = O.PLAIN, c = oi(r, l);
      break;
    case "single-quoted-scalar":
      a = O.QUOTE_SINGLE, c = ai(r, l);
      break;
    case "double-quoted-scalar":
      a = O.QUOTE_DOUBLE, c = li(r, l);
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
  const u = n + r.length, f = Ve(o, u, e, t);
  return {
    value: c,
    type: a,
    comment: f.comment,
    range: [n, u, f.offset]
  };
}
function oi(s, e) {
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
  return t && e(0, "BAD_SCALAR_START", `Plain value cannot start with ${t}`), zs(s);
}
function ai(s, e) {
  return (s[s.length - 1] !== "'" || s.length === 1) && e(s.length, "MISSING_CHAR", "Missing closing 'quote"), zs(s.slice(1, -1)).replace(/''/g, "'");
}
function zs(s) {
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
function li(s, e) {
  let t = "";
  for (let n = 1; n < s.length - 1; ++n) {
    const i = s[n];
    if (!(i === "\r" && s[n + 1] === `
`))
      if (i === `
`) {
        const { fold: r, offset: o } = ci(s, n);
        t += r, n = o;
      } else if (i === "\\") {
        let r = s[++n];
        const o = fi[r];
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
          t += ui(s, n + 1, a, e), n += a;
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
function ci(s, e) {
  let t = "", n = s[e + 1];
  for (; (n === " " || n === "	" || n === `
` || n === "\r") && !(n === "\r" && s[e + 2] !== `
`); )
    n === `
` && (t += `
`), e += 1, n = s[e + 1];
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
function ui(s, e, t, n) {
  const i = s.substr(e, t), o = i.length === t && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
  try {
    return String.fromCodePoint(o);
  } catch {
    const a = s.substr(e - 2, t + 2);
    return n(e - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${a}`), a;
  }
}
function Ws(s, e, t, n) {
  const { value: i, type: r, comment: o, range: a } = e.type === "block-scalar" ? si(s, e, n) : ri(e, s.options.strict, n), c = t ? s.directives.tagName(t.source, (f) => n(t, "TAG_RESOLVE_FAILED", f)) : null;
  let l;
  s.options.stringKeys && s.atKey ? l = s.schema[W] : c ? l = hi(s.schema, i, c, t, n) : e.type === "scalar" ? l = di(s, i, e, n) : l = s.schema[W];
  let u;
  try {
    const f = l.resolve(i, (d) => n(t ?? e, "TAG_RESOLVE_FAILED", d), s.options);
    u = I(f) ? f : new O(f);
  } catch (f) {
    const d = f instanceof Error ? f.message : String(f);
    n(t ?? e, "TAG_RESOLVE_FAILED", d), u = new O(i);
  }
  return u.range = a, u.source = i, r && (u.type = r), c && (u.tag = c), l.format && (u.format = l.format), o && (u.comment = o), u;
}
function hi(s, e, t, n, i) {
  if (t === "!")
    return s[W];
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
  return o && !o.collection ? (s.tags.push(Object.assign({}, o, { default: !1, test: void 0 })), o) : (i(n, "TAG_RESOLVE_FAILED", `Unresolved tag: ${t}`, t !== "tag:yaml.org,2002:str"), s[W]);
}
function di({ atKey: s, directives: e, schema: t }, n, i, r) {
  const o = t.tags.find((a) => (a.default === !0 || s && a.default === "key") && a.test?.test(n)) || t[W];
  if (t.compat) {
    const a = t.compat.find((c) => c.default && c.test?.test(n)) ?? t[W];
    if (o.tag !== a.tag) {
      const c = e.tagString(o.tag), l = e.tagString(a.tag), u = `Value may be parsed as either ${c} or ${l}`;
      r(i, "TAG_RESOLVE_FAILED", u, !0);
    }
  }
  return o;
}
function pi(s, e, t) {
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
const mi = { composeNode: Zs, composeEmptyNode: Wt };
function Zs(s, e, t, n) {
  const i = s.atKey, { spaceBefore: r, comment: o, anchor: a, tag: c } = t;
  let l, u = !0;
  switch (e.type) {
    case "alias":
      l = gi(s, e, n), (a || c) && n(e, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      l = Ws(s, e, c, n), a && (l.anchor = a.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        l = ti(mi, s, e, t, n), a && (l.anchor = a.source.substring(1));
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
  return l ?? (l = Wt(s, e.offset, void 0, null, t, n)), a && l.anchor === "" && n(a, "BAD_ALIAS", "Anchor cannot be an empty string"), i && s.options.stringKeys && (!I(l) || typeof l.value != "string" || l.tag && l.tag !== "tag:yaml.org,2002:str") && n(c ?? e, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), r && (l.spaceBefore = !0), o && (e.type === "scalar" && e.source === "" ? l.comment = o : l.commentBefore = o), s.options.keepSourceTokens && u && (l.srcToken = e), l;
}
function Wt(s, e, t, n, { spaceBefore: i, comment: r, anchor: o, tag: a, end: c }, l) {
  const u = {
    type: "scalar",
    offset: pi(e, t, n),
    indent: -1,
    source: ""
  }, f = Ws(s, u, a, l);
  return o && (f.anchor = o.source.substring(1), f.anchor === "" && l(o, "BAD_ALIAS", "Anchor cannot be an empty string")), i && (f.spaceBefore = !0), r && (f.comment = r, f.range[2] = c), f;
}
function gi({ options: s }, { offset: e, source: t, end: n }, i) {
  const r = new Dt(t.substring(1));
  r.source === "" && i(e, "BAD_ALIAS", "Alias cannot be an empty string"), r.source.endsWith(":") && i(e + t.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const o = e + t.length, a = Ve(n, o, s.strict, i);
  return r.range = [e, o, a.offset], a.comment && (r.comment = a.comment), r;
}
function yi(s, e, { offset: t, start: n, value: i, end: r }, o) {
  const a = Object.assign({ _directives: e }, s), c = new mt(void 0, a), l = {
    atKey: !1,
    atRoot: !0,
    directives: c.directives,
    options: c.options,
    schema: c.schema
  }, u = Ae(n, {
    indicator: "doc-start",
    next: i ?? r?.[0],
    offset: t,
    onError: o,
    parentIndent: 0,
    startOnNewline: !0
  });
  u.found && (c.directives.docStart = !0, i && (i.type === "block-map" || i.type === "block-seq") && !u.hasNewline && o(u.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), c.contents = i ? Zs(l, i, u, o) : Wt(l, u.end, n, null, u, o);
  const f = c.contents.range[2], d = Ve(r, f, !1, o);
  return d.comment && (c.comment = d.comment), c.range = [t, f, d.offset], c;
}
function _e(s) {
  if (typeof s == "number")
    return [s, s + 1];
  if (Array.isArray(s))
    return s.length === 2 ? s : [s[0], s[1]];
  const { offset: e, source: t } = s;
  return [e, e + (typeof t == "string" ? t.length : 1)];
}
function as(s) {
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
class wi {
  constructor(e = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (t, n, i, r) => {
      const o = _e(t);
      r ? this.warnings.push(new Wn(o, n, i)) : this.errors.push(new xe(o, n, i));
    }, this.directives = new B({ version: e.version || "1.2" }), this.options = e;
  }
  decorate(e, t) {
    const { comment: n, afterEmptyLine: i } = as(this.prelude);
    if (n) {
      const r = e.contents;
      if (t)
        e.comment = e.comment ? `${e.comment}
${n}` : n;
      else if (i || e.directives.docStart || !r)
        e.commentBefore = n;
      else if (T(r) && !r.flow && r.items.length > 0) {
        let o = r.items[0];
        j(o) && (o = o.key);
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
      comment: as(this.prelude).comment,
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
          const r = _e(e);
          r[0] += t, this.onError(r, "BAD_DIRECTIVE", n, i);
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
        const t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, n = new xe(_e(e), "UNEXPECTED_TOKEN", t);
        this.atDirectives || !this.doc ? this.errors.push(n) : this.doc.errors.push(n);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const n = "Unexpected doc-end without preceding document";
          this.errors.push(new xe(_e(e), "UNEXPECTED_TOKEN", n));
          break;
        }
        this.doc.directives.docEnd = !0;
        const t = Ve(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), t.comment) {
          const n = this.doc.comment;
          this.doc.comment = n ? `${n}
${t.comment}` : t.comment;
        }
        this.doc.range[2] = t.offset;
        break;
      }
      default:
        this.errors.push(new xe(_e(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
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
      const n = Object.assign({ _directives: this.directives }, this.options), i = new mt(void 0, n);
      this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), i.range = [0, t, t], this.decorate(i, !1), yield i;
    }
  }
}
const Xs = "\uFEFF", en = "", tn = "", jt = "";
function bi(s) {
  switch (s) {
    case Xs:
      return "byte-order-mark";
    case en:
      return "doc-mode";
    case tn:
      return "flow-error-end";
    case jt:
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
const ls = new Set("0123456789ABCDEFabcdef"), ki = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), Je = new Set(",[]{}"), $i = new Set(` ,[]{}
\r	`), Nt = (s) => !s || $i.has(s);
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
    if (e[0] === Xs && (yield* this.pushCount(1), e = e.substring(1)), e[0] === "%") {
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
    return yield en, yield* this.parseLineStart();
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
        return yield* this.pushUntil(Nt), "doc";
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
      return this.flowLevel = 0, yield tn, yield* this.parseLineStart();
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
        return yield* this.pushUntil(Nt), "flow";
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
        const a = r;
        for (; o === " "; )
          o = this.buffer[--r];
        if (o === `
` && r >= this.pos && r + 1 + t > a)
          e = r;
        else
          break;
      } while (!0);
    return yield jt, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let t = this.pos - 1, n = this.pos - 1, i;
    for (; i = this.buffer[++n]; )
      if (i === ":") {
        const r = this.buffer[n + 1];
        if (Y(r) || e && Je.has(r))
          break;
        t = n;
      } else if (Y(i)) {
        let r = this.buffer[n + 1];
        if (i === "\r" && (r === `
` ? (n += 1, i = `
`, r = this.buffer[n + 1]) : t = n), r === "#" || e && Je.has(r))
          break;
        if (i === `
`) {
          const o = this.continueScalar(n + 1);
          if (o === -1)
            break;
          n = Math.max(n, o - 2);
        }
      } else {
        if (e && Je.has(i))
          break;
        t = n;
      }
    return !i && !this.atEnd ? this.setNext("plain-scalar") : (yield jt, yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
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
          e += yield* this.pushUntil(Nt), e += yield* this.pushSpaces(!0);
          continue e;
        case "-":
        // this is an error
        case "?":
        // this is an error outside flow collections
        case ":": {
          const t = this.flowLevel > 0, n = this.charAt(1);
          if (Y(n) || t && Je.has(n)) {
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
        if (ki.has(t))
          t = this.buffer[++e];
        else if (t === "%" && ls.has(this.buffer[e + 1]) && ls.has(this.buffer[e + 2]))
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
class Li {
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
function re(s, e) {
  for (let t = 0; t < s.length; ++t)
    if (s[t].type === e)
      return !0;
  return !1;
}
function cs(s) {
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
function sn(s) {
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
function ze(s) {
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
function ke(s) {
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
function it(s, e) {
  if (e.length < 1e5)
    Array.prototype.push.apply(s, e);
  else
    for (let t = 0; t < e.length; ++t)
      s.push(e[t]);
}
function fs(s) {
  if (s.start.type === "flow-seq-start")
    for (const e of s.items)
      e.sep && !e.value && !re(e.start, "explicit-key-ind") && !re(e.sep, "map-value-ind") && (e.key && (e.value = e.key), delete e.key, sn(e.value) ? e.value.end ? it(e.value.end, e.sep) : e.value.end = e.sep : it(e.start, e.sep), delete e.sep);
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
      switch (t.type === "block-scalar" ? t.indent = "indent" in n ? n.indent : 0 : t.type === "flow-collection" && n.type === "document" && (t.indent = 0), t.type === "flow-collection" && fs(t), n.type) {
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
        i && !i.sep && !i.value && i.start.length > 0 && cs(i.start) === -1 && (t.indent === 0 || i.start.every((r) => r.type !== "comment" || r.indent < t.indent)) && (n.type === "document" ? n.end = i.start : n.items.push({ start: i.start }), t.items.splice(-1, 1));
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
        cs(e.start) !== -1 ? (yield* this.pop(), yield* this.step()) : e.start.push(this.sourceToken);
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
      const t = ze(this.peek(2)), n = ke(t);
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
              it(i, t.start), i.push(this.sourceToken), e.items.pop();
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
              else if (re(t.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: r, key: null, sep: [this.sourceToken] }]
                });
              else if (sn(t.key) && !re(t.sep, "newline")) {
                const o = ke(t.start), a = t.key, c = t.sep;
                c.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: a, sep: c }]
                });
              } else r.length > 0 ? t.sep = t.sep.concat(r, this.sourceToken) : t.sep.push(this.sourceToken);
            else if (re(t.start, "newline"))
              Object.assign(t, { key: null, sep: [this.sourceToken] });
            else {
              const o = ke(t.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: o, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            t.sep ? t.value || i ? e.items.push({ start: r, key: null, sep: [this.sourceToken] }) : re(t.sep, "map-value-ind") ? this.stack.push({
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
              if (!t.explicitKey && t.sep && !re(t.sep, "newline")) {
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
              it(i, t.start), i.push(this.sourceToken), e.items.pop();
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
        t.value || re(t.start, "seq-item-ind") ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
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
        const i = ze(n), r = ke(i);
        fs(e);
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
        const t = ze(e), n = ke(t);
        return n.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: n, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const t = ze(e), n = ke(t);
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
function Ni(s) {
  const e = s.prettyErrors !== !1;
  return { lineCounter: s.lineCounter || e && new Li() || null, prettyErrors: e };
}
function Oi(s, e = {}) {
  const { lineCounter: t, prettyErrors: n } = Ni(e), i = new Ei(t?.addNewLine), r = new wi(e);
  let o = null;
  for (const a of r.compose(i.parse(s), !0, s.length))
    if (!o)
      o = a;
    else if (o.options.logLevel !== "silent") {
      o.errors.push(new xe(a.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return n && t && (o.errors.forEach(rs(s, t)), o.warnings.forEach(rs(s, t))), o;
}
const q = {
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
}, _t = {
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
}, vi = {
  cast: { asset: "asset" },
  appearance: { hairStyle: "hairStyle", outfit: "outfit" },
  actor: { expression: "expression", gesture: "gesture", holding: "prop" },
  panel: { mode: "mode" },
  transfer: { prop: "prop" },
  diagram: { type: "diagramType" },
  options: { panelFormat: "panelFormat" }
};
function et(s) {
  return !!s && typeof s == "object" && !Array.isArray(s);
}
function oe(s, e, t, n) {
  if (!et(s)) return s;
  const i = q[e], r = /* @__PURE__ */ Object.create(null);
  for (const [o, a] of Object.entries(s)) {
    const c = Object.keys(i).find(
      (m) => o === m || o === i[m]
    ) ?? o;
    Object.hasOwn(i, c) && i[c];
    const l = c;
    if (Object.hasOwn(r, l))
      throw new Error(
        `${n}: '${i[c]}'와 '${c}'은 같은 항목입니다. 하나만 작성하세요.`
      );
    let u = a;
    const f = vi[e], d = f && Object.hasOwn(f, c) ? f[c] : void 0;
    if (d && typeof a == "string") {
      const m = _t[d], w = Object.keys(m).find(
        (h) => a === h || a === m[h]
      );
      w && (u = w);
    }
    if (e === "comic" && c === "cast" && et(a)) {
      const m = /* @__PURE__ */ Object.create(null);
      for (const [w, h] of Object.entries(a))
        m[w] = oe(h, "cast", t, `${n}.등장인물.${w}`);
      u = m;
    } else if (e === "comic" && c === "personas" && et(a)) {
      const m = /* @__PURE__ */ Object.create(null);
      for (const [w, h] of Object.entries(a))
        m[w] = oe(
          h,
          "persona",
          t,
          `${n}.페르소나.${w}`
        );
      u = m;
    } else if (e === "cast" && c === "persona")
      u = oe(a, "persona", t, `${n}.페르소나`);
    else if (e === "cast" && c === "appearance")
      u = oe(a, "appearance", t, `${n}.외형`);
    else if (e === "panel" && c === "diagram")
      u = oe(a, "diagram", t, `${n}.다이어그램`);
    else if (Array.isArray(a)) {
      const m = e === "comic" && c === "panels" ? "panel" : e === "panel" && c === "actors" ? "actor" : e === "panel" && c === "dialogue" ? "dialogue" : e === "panel" && c === "transfer" ? "transfer" : void 0;
      m && (u = a.map(
        (w, h) => oe(
          w,
          m,
          t,
          `${n}.${i[c]}[${h + 1}]`
        )
      ));
    }
    r[l] = u;
  }
  return r;
}
const Ai = (s) => oe(s, "comic", !1, "만화");
function Mi(s) {
  const e = oe(s, "options", !1, "표시 설정");
  if (!et(e)) throw new Error("표시 설정: 객체가 필요합니다.");
  for (const t of Object.keys(e))
    if (!Object.hasOwn(q.options, t))
      throw new Error(`표시 설정: 알 수 없는 항목 '${t}'.`);
  return e;
}
function De(s, e) {
  if (!s || typeof s != "object" || Array.isArray(s))
    throw new Error(`${e}: 객체가 필요합니다.`);
  return s;
}
function se(s, e, t = 1e4) {
  if (typeof s != "string" || !s.trim())
    throw new Error(`${e}: 비어 있지 않은 문자열이 필요합니다.`);
  if (s.length > t)
    throw new Error(
      `${e}: 텍스트가 너무 깁니다. ${t}자 이내로 작성하세요.`
    );
  return s;
}
function Zt(s, e, t) {
  for (const n of Object.keys(s))
    if (!Object.hasOwn(e, n))
      throw new Error(`${t}: 알 수 없는 항목 '${n}'.`);
}
function us(s, e) {
  const t = De(s, e);
  Zt(t, q.persona, e);
  const n = {};
  if (t.role !== void 0 && (n.role = se(t.role, `${e}.직무`, 100)), t.personality !== void 0 && (n.personality = se(t.personality, `${e}.성격`, 300)), t.speechStyle !== void 0 && (n.speechStyle = se(t.speechStyle, `${e}.말투`, 300)), !Object.keys(n).length)
    throw new Error(`${e}: 직무·성격·말투 중 하나 이상 작성하세요.`);
  return n;
}
function Ot(s, e, t) {
  if (s === void 0) return e;
  const n = se(s, t, 7);
  if (n.length !== 4 && n.length !== 7 || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(n))
    throw new Error(`${t}: #RGB 또는 #RRGGBB 색상을 작성하세요.`);
  return n;
}
function hs(s, e, t, n) {
  if (s === void 0) return t;
  const i = se(s, n);
  if (!Object.hasOwn(e, i))
    throw new Error(
      `${n}: ${Object.values(e).join(", ")} 중 하나를 선택하세요.`
    );
  return i;
}
function Ii(s, e) {
  const t = s === void 0 ? {} : De(s, e);
  if (Zt(t, q.appearance, e), t.glasses !== void 0 && typeof t.glasses != "boolean")
    throw new Error(`${e}.안경: true 또는 false가 필요합니다.`);
  return {
    skinColor: Ot(
      t.skinColor,
      he.skinColor,
      `${e}.피부색`
    ),
    hairStyle: hs(
      t.hairStyle,
      _t.hairStyle,
      he.hairStyle,
      `${e}.머리모양`
    ),
    hairColor: Ot(
      t.hairColor,
      he.hairColor,
      `${e}.머리색`
    ),
    outfit: hs(
      t.outfit,
      _t.outfit,
      he.outfit,
      `${e}.옷`
    ),
    outfitColor: Ot(
      t.outfitColor,
      he.outfitColor,
      `${e}.옷색`
    ),
    glasses: t.glasses === void 0 ? he.glasses : t.glasses
  };
}
function Ti(s, e) {
  const t = /* @__PURE__ */ Object.create(null);
  if (e !== void 0)
    for (const [i, r] of Object.entries(
      De(e, "페르소나")
    ))
      se(i, "페르소나 식별자"), t[i] = us(r, `페르소나.${i}`);
  const n = /* @__PURE__ */ Object.create(null);
  for (const [i, r] of Object.entries(De(s, "등장인물"))) {
    const o = `등장인물.${i}`, a = De(r, o);
    Zt(a, q.cast, o);
    const c = se(a.asset, `${o}.그림`);
    if (!Object.hasOwn(ws, c))
      throw new Error(`${o}: 없는 에셋 '${c}'.`);
    let l;
    if (a.persona !== void 0)
      if (typeof a.persona == "string") {
        const u = se(a.persona, `${o}.페르소나`);
        if (!Object.hasOwn(t, u))
          throw new Error(`${o}.페르소나: 없는 페르소나 '${u}'.`);
        l = { ...t[u] };
      } else l = us(a.persona, `${o}.페르소나`);
    if (c !== "human" && a.appearance !== void 0)
      throw new Error(`${o}.외형: 사람 그림에서만 사용할 수 있습니다.`);
    n[i] = {
      asset: c,
      label: a.label === void 0 ? i : se(a.label, `${o}.이름표`),
      ...c === "human" ? { appearance: Ii(a.appearance, `${o}.외형`) } : {},
      ...l ? { persona: l } : {}
    };
  }
  return { cast: n, ...e !== void 0 ? { personas: t } : {} };
}
function le(s, e) {
  if (!s || typeof s != "object" || Array.isArray(s))
    throw new Error(`${e}: 객체가 필요합니다.`);
  return s;
}
function x(s, e, t = 1e4) {
  if (typeof s != "string" || !s.trim())
    throw new Error(`${e}: 비어 있지 않은 문자열이 필요합니다.`);
  if (s.length > t)
    throw new Error(
      `${e}: 텍스트가 너무 깁니다. ${t}자 이내로 작성하세요.`
    );
  return s;
}
function $e(s, e) {
  if (!Array.isArray(s)) throw new Error(`${e}: 목록이 필요합니다.`);
  return s;
}
function ce(s, e, t) {
  for (const n of Object.keys(s))
    if (!e.includes(n))
      throw new Error(`${t}: 알 수 없는 항목 '${n}'.`);
}
function fe(s, e, t, n) {
  if (s !== void 0) {
    if (typeof s != "number" || !Number.isFinite(s) || s < e || s > t)
      throw new Error(`${n}: ${e}~${t} 사이 숫자가 필요합니다.`);
    return s;
  }
}
function Ci(s) {
  if (s.length > 1e5)
    throw new Error("코드가 너무 깁니다. 100KB 이내로 작성하세요.");
  const e = Oi(s, { uniqueKeys: !0 });
  if (e.errors.length) throw new Error(e.errors[0].message);
  const t = le(Ai(e.toJS({ maxAliasCount: 20 })), "만화");
  ce(t, Object.keys(q.comic), "만화");
  const { cast: n, personas: i } = Ti(t.cast, t.personas);
  let r;
  const o = $e(t.panels, "컷").map((a, c) => {
    const l = `컷 ${c + 1}`, u = { ...le(a, l) };
    if (ce(u, Object.keys(q.panel), l), u.mode !== void 0 && u.mode !== "before" && u.mode !== "full")
      throw new Error(`${l}: 구성은 전체 또는 이전이어야 합니다.`);
    if (u.mode === "before") {
      if (!r)
        throw new Error(`${l}: 첫 컷에서는 이전 구성을 사용할 수 없습니다.`);
      const h = r.actors.map(
        (S) => ({ ...S })
      ), p = $e(u.removeActors ?? [], `${l}.제외인물`).map(
        (S) => x(S, `${l}.제외인물`)
      );
      for (const S of p)
        if (!h.some((L) => L.id === S))
          throw new Error(`${l}: 제거할 인물 '${S}'가 이전 컷에 없습니다.`);
      const b = h.filter(
        (S) => !p.some((L) => L === S.id)
      ), $ = $e(u.actors ?? [], `${l}.인물`), k = /* @__PURE__ */ new Set();
      for (const S of $) {
        const L = typeof S == "string" ? { id: S } : le(S, `${l}.인물`);
        ce(L, Object.keys(q.actor), `${l}.인물`);
        const E = x(L.id, `${l}.인물.식별자`);
        if (k.has(E))
          throw new Error(`${l}: 캐릭터 식별자가 중복됩니다.`);
        k.add(E);
        const g = b.findIndex((N) => N.id === E), y = {
          ...g < 0 ? {} : b[g],
          ...L
        };
        for (const [N, A] of Object.entries(L))
          N !== "id" && A === null && delete y[N];
        g < 0 ? b.push(y) : b[g] = y;
      }
      u.actors = u.actors !== void 0 && $.length === 0 ? [] : b;
    } else if (u.removeActors !== void 0)
      throw new Error(`${l}: 제외인물은 이전 구성에서만 사용할 수 있습니다.`);
    const f = $e(u.actors, `${l}.인물`).map((h) => {
      const p = typeof h == "string" ? { id: h } : le(h, `${l}.인물`);
      ce(p, Object.keys(q.actor), `${l}.인물`);
      const b = x(p.id, `${l}.인물.식별자`), $ = p.expression === void 0 ? "neutral" : x(p.expression, `${l}.${b}.표정`);
      if (!Object.hasOwn(n, b))
        throw new Error(`${l}: 없는 캐릭터 '${b}'.`);
      if (!Object.hasOwn(bs, $))
        throw new Error(`${l}.${b}: 없는 표정 '${$}'.`);
      const k = p.gesture === void 0 ? void 0 : x(p.gesture, `${l}.${b}.손모양`), S = p.holding === void 0 ? void 0 : x(p.holding, `${l}.${b}.든소품`);
      if (k && !pn.includes(k))
        throw new Error(`${l}.${b}: 없는 손 제스처 '${k}'.`);
      if (S && !Object.hasOwn(tt, S))
        throw new Error(`${l}.${b}: 없는 소품 '${S}'.`);
      return {
        id: b,
        expression: $,
        gesture: k,
        holding: S,
        x: fe(p.x, 0, 1, `${l}.${b}.가로위치`),
        y: fe(p.y, 0, 1, `${l}.${b}.세로위치`),
        scale: fe(p.scale, 0.5, 1.25, `${l}.${b}.배율`) ?? 1
      };
    });
    if (f.length < 1 || f.length > 3)
      throw new Error(`${l}: 캐릭터는 1~3명이어야 합니다.`);
    if (new Set(f.map((h) => h.id)).size !== f.length)
      throw new Error(`${l}: 캐릭터 식별자가 중복됩니다.`);
    const d = $e(u.dialogue ?? [], `${l}.대사`).map(
      (h) => {
        const p = le(h, `${l}.대사`);
        ce(p, Object.keys(q.dialogue), `${l}.대사`);
        const b = x(p.from, `${l}.대사.화자`), $ = p.to === void 0 ? void 0 : x(p.to, `${l}.대사.상대`);
        if (!f.some((k) => k.id === b))
          throw new Error(`${l}: 화자 '${b}'가 컷에 없습니다.`);
        if ($ && !f.some((k) => k.id === $))
          throw new Error(`${l}: 대화 상대 '${$}'가 컷에 없습니다.`);
        return {
          from: b,
          to: $,
          text: x(p.text, `${l}.대사.내용`),
          x: fe(p.x, 0, 1, `${l}.대사.가로위치`),
          y: fe(p.y, 0, 1, `${l}.대사.세로위치`),
          fontSize: fe(p.fontSize, 12, 32, `${l}.대사.글자크기`) ?? 18
        };
      }
    );
    if (d.length > 20)
      throw new Error(`${l}: 대사는 20개 이내로 작성하세요.`);
    const m = $e(u.transfer ?? [], `${l}.전달`).map(
      (h) => {
        const p = le(h, `${l}.전달`);
        ce(p, Object.keys(q.transfer), `${l}.전달`);
        const b = x(p.from, `${l}.전달.주는인물`), $ = x(p.to, `${l}.전달.받는인물`), k = x(p.prop, `${l}.전달.소품`);
        if (!f.some((S) => S.id === b))
          throw new Error(`${l}: 전달 주체 '${b}'가 컷에 없습니다.`);
        if (!f.some((S) => S.id === $))
          throw new Error(`${l}: 전달 대상 '${$}'가 컷에 없습니다.`);
        if (b === $)
          throw new Error(`${l}: 전달 주체와 대상은 달라야 합니다.`);
        if (!Object.hasOwn(tt, k))
          throw new Error(`${l}: 없는 소품 '${k}'.`);
        return { from: b, to: $, prop: k };
      }
    );
    if (m.length > 6)
      throw new Error(`${l}: 소품 전달은 6개 이내로 작성하세요.`);
    let w;
    if (u.diagram !== void 0 && u.diagram !== null) {
      const h = `${l}.다이어그램`, p = le(u.diagram, h);
      if (ce(p, Object.keys(q.diagram), h), p.type !== "mermaid")
        throw new Error(`${h}.종류: 머메이드여야 합니다.`);
      w = {
        type: "mermaid",
        source: x(p.source, `${h}.원문`, 2e4),
        title: p.title === void 0 ? "다이어그램" : x(p.title, `${h}.제목`, 100),
        height: fe(p.height, 160, 1200, `${h}.높이`)
      };
    }
    return r = { actors: f, dialogue: d, transfer: m, ...w ? { diagram: w } : {} }, r;
  });
  if (o.length < 1 || o.length > 30)
    throw new Error("컷은 1~30개여야 합니다.");
  return {
    title: t.title === void 0 ? "Comic Gen" : x(t.title, "제목"),
    cast: n,
    panels: o,
    ...i ? { personas: i } : {}
  };
}
const ji = "M-10 4Q-12 -3 -17 -9L-23 -22Q-26 -27 -22 -30Q-18 -33 -15 -28L-10 -21L-15 -35Q-16 -40 -12 -42Q-8 -44 -6 -38L-2 -28L-4 -43Q-4 -48 0 -48Q4 -48 4 -43L6 -28L8 -38Q9 -43 13 -42Q17 -41 16 -37L14 -22Q14 -16 18 -19L22 -24Q25 -27 28 -24Q31 -21 27 -17L19 -5Q15 2 8 4L7 7Z", _i = "M-5 -7H-20Q-24 -7 -24 -3Q-24 1 -20 1H-8Q-11 4 -8 7L-5 10Q-2 13 3 11L9 8Q12 6 11 1L10 -6Q9 -11 5 -12L0 -14Q-4 -15 -6 -12Q-8 -9 -5 -7Z", Pi = "M-8 -5Q-8 -10 -2 -10H5Q10 -9 10 -4V4Q10 9 4 10H-3Q-9 9 -10 3Z";
function Pt(s, e, t) {
  const n = !!s.sleeve, i = n ? {
    wave: "M-47 42Q-61 45 -65 34Q-72 19 -70 -8L-63 -9Q-64 17 -58 28Q-55 35 -42 36Z",
    point: "M-47 43Q-60 39 -68 25L-62 20Q-55 31 -40 35Z",
    grip: "M42 36Q56 36 61 17L67 20Q63 44 47 44Z"
  } : {
    wave: "M-48 20Q-62 24 -66 13Q-71 2 -70 -8L-63 -9Q-63 4 -60 11Q-57 18 -47 15Z",
    point: "M-47 17Q-57 16 -68 17L-68 24Q-55 24 -47 23Z",
    grip: "M46 17Q54 13 62 16L63 23Q54 20 47 23Z"
  }, r = (t === "grip" ? e === "left" : e === "right") ? ' transform="scale(-1 1)"' : "", o = s.longSleeve ? s.sleeve : s.skin;
  return `<g data-arm="${e}"${n ? ` data-human-part="arm-${e}"` : ""}${r} stroke-linejoin="round"><path d="${i[t]}" fill="${o}" stroke-width="2.6"/></g>`;
}
function xi(s, e) {
  return s === "wave" ? {
    back: Pt(e, "left", "wave"),
    front: `<g data-gesture="wave"><g data-hand="wave" data-side="left" stroke-linejoin="round"><path data-wave-motion="true" d="M-90 -46Q-90 -59 -81 -64M-40 -41Q-36 -32 -41 -25" fill="none" stroke="#586c8c" stroke-width="2.5"/><g data-palm="wave" transform="translate(-66 -8) rotate(-8) scale(.82)"><path d="${ji}" fill="${e.skin}" stroke-width="2.6"/><path d="M10 -12Q5 -15 1 -9" fill="none" stroke-width="1.6"/></g></g></g>`,
    port: { x: -66, y: -22 }
  } : {
    back: Pt(e, "left", "point"),
    front: `<g data-gesture="point"><g data-hand="point" data-side="left" transform="translate(-64 20)" stroke-linejoin="round"><path data-palm="point" d="${_i}" fill="${e.skin}" stroke-width="2.6"/><path d="M-3 -6Q1 -3 6 -4M1 5L7 3" fill="none" stroke-width="1.6"/></g></g>`,
    port: { x: -66, y: 20 }
  };
}
function ds(s, e, t, n = "") {
  const i = s === "left" ? -62 : 62, r = s === "left" ? ' transform="scale(-1 1)"' : "";
  return {
    back: Pt(e, s, "grip"),
    front: `<g data-hand="${t}" data-side="${s}" transform="translate(${i} 20)" stroke-linejoin="round"><g${r}><path data-palm="grip" d="${Pi}" fill="${e.skin}" stroke-width="2.6"/>${n ? `<g transform="translate(7.5 -14)">${n}</g>` : ""}<path d="M-7 -4Q-4 -8 0 -5L5 -1Q6 2 2 3L-4 1Q-8 0 -7 -4Z" fill="${e.skin}" stroke-width="2"/><path d="M1 6H6" fill="none" stroke-width="1.5"/></g></g>`,
    port: { x: i, y: 20 }
  };
}
const ue = (s, e, t) => Math.max(e, Math.min(t, s));
function vt(s, e, t, n) {
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
function nn(s, e, t, n, i = "compact", r) {
  const o = Math.min(t - 80, 390), a = document.createElement("canvas").getContext("2d"), c = s.dialogue.map((g) => {
    const y = vt(g.text, o - 36, g.fontSize, n);
    return a.font = `${g.fontSize}px ${n}`, {
      line: g,
      lines: y,
      width: ue(
        Math.max(...y.map((N) => a.measureText(N).width)) + 36,
        110,
        o
      ),
      lineHeight: Math.ceil(g.fontSize * 1.45)
    };
  }), l = c.reduce(
    (g, y) => g + 60 + y.lines.length * y.lineHeight,
    20
  ), u = 92, f = (t - 72) / s.actors.length, d = Math.min(
    1,
    (f - 12) / (2 * u * Math.max(...s.actors.map((g) => g.scale)))
  ), m = s.actors.map((g) => g.scale * d), w = l + Math.max(204, Math.ceil(196 * Math.max(...m))), h = s.actors.map(
    (g, y) => ue(
      36 + (t - 72) * (g.x ?? (y + 0.5) / s.actors.length),
      26 + u * m[y],
      t - 26 - u * m[y]
    )
  ), p = s.actors.map(
    (g, y) => ue(
      g.y === void 0 ? w - 126 : g.y * w,
      l + 70 * m[y],
      w - 126 * m[y]
    )
  );
  for (let g = 0; g < s.actors.length; g++)
    for (let y = g + 1; y < s.actors.length; y++)
      if (Math.abs(h[g] - h[y]) < u * (m[g] + m[y]) && Math.abs(p[g] - p[y]) < 120 * Math.max(m[g], m[y]))
        throw new Error(
          `캐릭터 '${s.actors[g].id}'와 '${s.actors[y].id}'가 겹칩니다. 가로위치·세로위치 또는 배율을 조정하세요.`
        );
  const b = [
    `<rect x="20" y="0" width="${t - 40}" height="${w}" rx="18" fill="white" stroke="#c8d2df" stroke-width="1.6"/>`
  ];
  let $ = 20;
  c.forEach(({ line: g, lines: y, lineHeight: N, width: A }) => {
    const _ = h[s.actors.findIndex((M) => M.id === g.from)], v = ue(
      (g.x === void 0 ? _ : g.x * t) - A / 2,
      40,
      t - A - 40
    ), P = 28 + y.length * N, D = g.y === void 0 ? $ : ue(g.y * w, 20, l - P), Z = Math.max(v + 24, Math.min(v + A - 24, _)), F = v + A, K = D + P, X = s.actors.findIndex(
      (M) => M.id === g.from
    ), z = Math.min(
      K + 24,
      p[X] - 65 * m[X]
    ), ee = ue(_, Z - 18, Z + 18), G = `M${v + 14} ${D}H${F - 14}Q${F} ${D} ${F} ${D + 14}V${K - 14}Q${F} ${K} ${F - 14} ${K}H${Z + 9}L${ee} ${z}L${Z - 9} ${K}H${v + 14}Q${v} ${K} ${v} ${K - 14}V${D + 14}Q${v} ${D} ${v + 14} ${D}Z`;
    b.push(
      `<g data-dialogue="${R(g.from)}" data-to="${R(g.to ?? "")}"><path d="${G}" fill="#fffaf0" stroke="#303341" stroke-width="2" stroke-linejoin="round"/><text x="${v + 18}" y="${D + 18 + g.fontSize}" font-size="${g.fontSize}">${y.map((M, ie) => `<tspan x="${v + 18}" dy="${ie ? N : 0}">${R(M)}</tspan>`).join("")}</text></g>`
    ), $ += P + 32;
  });
  const k = [];
  s.actors.forEach((g, y) => {
    const N = e[g.id], A = mn(N), v = N.asset === "human" ? A.color : "white", P = new Set(
      s.transfer.flatMap((M) => {
        const ie = M.from === g.id ? M.to : M.to === g.id ? M.from : void 0;
        if (!ie) return [];
        const ye = s.actors.findIndex(
          (we) => we.id === ie
        );
        return [
          h[ye] < h[y] || h[ye] === h[y] && ye < y ? "left" : "right"
        ];
      })
    ), D = A.restingHands ? (g.gesture || P.has("left") ? "" : A.restingHands.left) + (g.holding || P.has("right") ? "" : A.restingHands.right) : "", Z = s.dialogue.find(
      (M) => M.from === g.id && M.to
    )?.to, F = s.actors.findIndex((M) => M.id === Z), K = F < 0 ? 0 : Math.sign(h[F] - h[y]) * 4, X = vt(
      N.label,
      (t - 72) / s.actors.length - 12,
      16,
      n
    );
    if (X.length > 2)
      throw new Error(`캐릭터 '${g.id}'의 이름표가 너무 깁니다.`);
    const z = {
      skin: v,
      sleeve: A.sleeveColor,
      longSleeve: A.longSleeve
    }, ee = [], G = {};
    if (g.gesture) {
      const M = xi(g.gesture, z);
      ee.push(M), G.left = M.port;
    }
    if (g.holding) {
      const M = ds(
        "right",
        z,
        "holding",
        `<g data-prop="${g.holding}">${tt[g.holding]}</g>`
      );
      ee.push({
        ...M,
        front: `<g data-holding="${g.holding}">${M.front}</g>`
      }), G.right = M.port;
    }
    for (const M of P) {
      if (G[M]) continue;
      const ie = s.transfer.find((we) => {
        const Xt = we.from === g.id ? we.to : we.to === g.id ? we.from : void 0;
        if (!Xt) return !1;
        const wt = s.actors.findIndex(
          (hn) => hn.id === Xt
        );
        return M === (h[wt] < h[y] || h[wt] === h[y] && wt < y ? "left" : "right");
      }), ye = ds(
        M,
        z,
        ie.from === g.id ? "transfer" : "receive"
      );
      ee.push(ye), G[M] = ye.port;
    }
    k.push(G), b.push(
      `<g data-character="${R(g.id)}" transform="translate(${h[y]} ${p[y]}) scale(${m[y]})" stroke="#303341" stroke-width="2.8" stroke-linecap="round"><ellipse cy="69" rx="51" ry="7" fill="#e8edf3" stroke="none"/>${ee.map((M) => M.back).join("")}${A.body}<g data-face="${g.expression}" transform="translate(${K} ${A.faceY})" fill="#303341">${bs[g.expression]}</g>${D}${ee.map((M) => M.front).join("")}<text y="94" text-anchor="middle" stroke="none" fill="#303341" font-size="16">${X.map((M, ie) => `<tspan x="0" dy="${ie ? 18 : 0}">${R(M)}</tspan>`).join("")}</text></g>`
    );
  });
  const S = [];
  s.transfer.forEach((g, y) => {
    const N = s.actors.findIndex(
      (G) => G.id === g.from
    ), A = s.actors.findIndex((G) => G.id === g.to), _ = h[N], v = h[A], P = Math.sign(v - _) || Math.sign(A - N), D = k[N][P > 0 ? "right" : "left"], Z = k[A][P > 0 ? "left" : "right"], F = _ + D.x * m[N], K = v + Z.x * m[A], X = p[N] + D.y * m[N], z = p[A] + Z.y * m[A], ee = Math.atan2(z - X, K - F) * 180 / Math.PI;
    S.push(
      `<g data-transfer="${R(g.from)}" data-to="${R(g.to)}" stroke="#586c8c" stroke-width="2.5"><path data-transfer-link="true" d="M${F} ${X}L${K} ${z}" fill="none"/><path transform="translate(${K} ${z}) rotate(${ee})" d="M-16 -5L-8 0L-16 5" fill="none"/><g data-prop="${g.prop}" transform="translate(${(F + K) / 2} ${(X + z) / 2 - 16 - y * 12})">${tt[g.prop]}</g></g>`
    );
  }), b.splice(1, 0, ...S);
  let L = b.slice(1).join(""), E = w;
  if (r && s.diagram) {
    const g = t - 80, y = g - 32, N = s.diagram.height ?? ue(y * r.height / r.width + 58, 180, 1200), A = N - 58, _ = Math.min(
      y / r.width,
      A / r.height
    ), v = 56 + (y - r.width * _) / 2, P = 66 + (A - r.height * _) / 2;
    if (vt(s.diagram.title, y, 16, n).length > 1)
      throw new Error(
        "다이어그램 제목이 너무 깁니다. 제목이나 너비를 조정하세요."
      );
    L = `<g data-diagram="mermaid"><rect x="40" y="20" width="${g}" height="${N}" rx="10" fill="#f3f7fc" stroke="#8093ab" stroke-width="2"/><text x="56" y="48" font-size="16" font-weight="700">${R(s.diagram.title)}</text><g data-diagram-content="mermaid" transform="translate(${v} ${P}) scale(${_})">${r.svg}</g></g><g data-scene="true" transform="translate(0 ${N + 40})">${L}</g>`, E += N + 40;
  }
  if (i === "phone") {
    const g = E * 2 + 92;
    return {
      markup: `<rect x="20" y="0" width="${t - 40}" height="${g}" rx="18" fill="white" stroke="#c8d2df" stroke-width="1.6"/><g transform="translate(0 ${(g - E) / 2})">${L}</g>`,
      height: g
    };
  }
  return r ? {
    markup: `<rect x="20" y="0" width="${t - 40}" height="${E}" rx="18" fill="white" stroke="#c8d2df" stroke-width="1.6"/>${L}`,
    height: E
  } : { markup: b.join(""), height: w };
}
const Bi = "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.6.0/cdn/comic-gen.mermaid.js", xt = 2e4, Qi = "http://www.w3.org/2000/svg", Di = Math.random().toString(36).slice(2);
let Ki = 0, ps = Promise.resolve();
const gt = [
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
], Fi = new Set(gt), Ri = /* @__PURE__ */ new Set([
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
]), qi = /* @__PURE__ */ new Set([
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
  ...gt
]);
function Ui(s) {
  if (!s.trim() || s.length > xt)
    throw new Error(`Mermaid 원문은 1~${xt}자여야 합니다.`);
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
function Vi(s) {
  if (typeof s != "string" || !s.trim() || s.length > 300 || /[^\p{L}\p{N}\s,'"_\-]/u.test(s))
    throw new Error("다이어그램에 사용할 올바른 글꼴 이름이 필요합니다.");
  return s;
}
async function Hi(s) {
  const e = document.createElement("iframe");
  e.title = "Mermaid 렌더링", e.tabIndex = -1, e.setAttribute("aria-hidden", "true"), e.style.cssText = "all:initial!important;display:block!important;width:20000px!important;height:20000px!important;border:0!important;", s.append(e);
  const t = e.contentDocument, n = e.contentWindow;
  if (!t?.body || !n)
    throw e.remove(), new Error("Mermaid 격리 문서를 만들지 못했습니다.");
  const i = t.createElement("script");
  i.type = "module", i.src = Bi;
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
function rn(s) {
  const e = new DOMParser().parseFromString(s, "image/svg+xml");
  if (e.querySelector("parsererror") || e.documentElement.localName !== "svg")
    throw new Error("Mermaid가 올바른 SVG를 만들지 못했습니다.");
  return e.documentElement;
}
function rt(s, e, t = !1) {
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
function on(s, e) {
  const t = document.createElement("span").style;
  for (const n of gt) {
    const i = rt(s.getPropertyValue(n), e);
    i && t.setProperty(n, i, s.getPropertyPriority(n));
  }
  return s.getPropertyValue("display") === "none" && (t.display = "none"), t.cssText;
}
function Gi(s) {
  const e = [];
  let t = 0, n = 0, i = "";
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    i ? o === i && s[r - 1] !== "\\" && (i = "") : o === "'" || o === '"' ? i = o : o === "(" || o === "[" ? n++ : o === ")" || o === "]" ? n-- : o === "," && n === 0 && (e.push(s.slice(t, r).trim()), t = r + 1);
  }
  return e.push(s.slice(t).trim()), e;
}
function Yi(s, e, t) {
  const n = new CSSStyleSheet();
  n.replaceSync(s);
  const i = [], r = `#${e}`;
  for (const o of n.cssRules) {
    if (!(o instanceof CSSStyleRule)) continue;
    if (!Gi(o.selectorText).every(
      (l) => l === r || l.startsWith(r + " ") || l.startsWith(r + ">") || l.startsWith(r + ":")
    )) throw new Error("Mermaid SVG에 범위 밖 스타일이 있습니다.");
    const c = on(o.style, t);
    c && i.push(`${o.selectorText}{${c}}`);
  }
  return i.join(`
`);
}
function Ji(s) {
  if (s.length > 2e6)
    throw new Error("Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요.");
  const e = rn(s), t = [e, ...e.querySelectorAll("*")];
  if (t.length > 1e4)
    throw new Error(
      "Mermaid SVG 요소가 너무 많습니다. 다이어그램을 나누어 주세요."
    );
  const n = new Set(t.map((r) => r.id).filter(Boolean)), i = e.id;
  for (const r of t)
    for (const o of [...r.attributes])
      if (/url\s*\(/i.test(o.value)) {
        const a = rt(o.value, n, !0);
        a === void 0 ? r.removeAttributeNode(o) : r.setAttribute(o.name, a);
      }
  for (const r of t) {
    const o = r.localName.toLowerCase();
    if (r.namespaceURI !== Qi || !Ri.has(o) && o !== "style") {
      o === "a" ? r.replaceWith(...r.childNodes) : r.remove();
      continue;
    }
    if (o === "style") {
      r.textContent = Yi(r.textContent ?? "", i, n);
      continue;
    }
    for (const a of [...r.attributes]) {
      const c = a.name.toLowerCase(), l = a.value;
      if (!qi.has(c) && !c.startsWith("aria-") && !c.startsWith("data-"))
        r.removeAttributeNode(a);
      else if (c === "href" || c === "xlink:href")
        (!l.startsWith("#") || !n.has(l.slice(1))) && r.removeAttributeNode(a);
      else if (c === "style") {
        const u = document.createElement("span").style;
        u.cssText = l, r.setAttribute("style", on(u, n));
      } else if (Fi.has(c)) {
        const u = rt(l, n);
        u === void 0 ? r.removeAttributeNode(a) : r.setAttribute(a.name, u);
      }
    }
  }
  return e;
}
function zi(s) {
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
function Wi(s) {
  const e = (s.getAttribute("viewBox") ?? "").trim().split(/[\s,]+/).map(Number), t = e.length === 4 ? e[2] : Number.parseFloat(s.getAttribute("width") ?? ""), n = e.length === 4 ? e[3] : Number.parseFloat(s.getAttribute("height") ?? "");
  if (!Number.isFinite(t) || !Number.isFinite(n) || t <= 0 || n <= 0 || t > 2e4 || n > 2e4 || t * n > 16e7)
    throw new Error(
      "Mermaid 다이어그램 크기가 너무 큽니다. 다이어그램을 나누어 주세요."
    );
  return (e.length !== 4 || e.some((i) => !Number.isFinite(i))) && s.setAttribute("viewBox", `0 0 ${t} ${n}`), s.setAttribute("width", String(t)), s.setAttribute("height", String(n)), s.setAttribute("preserveAspectRatio", "xMidYMid meet"), { width: t, height: n };
}
async function Zi(s, e) {
  if (typeof document > "u" || !document.body)
    throw new Error("Mermaid 렌더링에는 브라우저 문서가 필요합니다.");
  Ui(s), e = Vi(e);
  const t = ps.then(async () => {
    await Promise.all([
      document.fonts.load(`18px ${e}`, s),
      document.fonts.load(`bold 18px ${e}`, s),
      document.fonts.load(`italic 18px ${e}`, s)
    ]), await document.fonts.ready;
    const n = `comic-gen-mermaid-${Di}-${++Ki}`, i = document.createElement("div");
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
      o = await Hi(i);
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
      const u = await l.render(n, s, a);
      c.disconnect();
      const f = Ji(zi(u.svg)), d = Wi(f), m = i.attachShadow({ mode: "closed" });
      m.append(document.importNode(f, !0));
      const w = m.firstElementChild, h = [w, ...w.querySelectorAll("*")], p = new Set(
        h.map((k) => k.id).filter(Boolean)
      ), b = h.map((k) => {
        if (k.localName === "style") return "";
        const S = getComputedStyle(k), L = document.createElement("span").style;
        for (const E of gt) {
          const g = rt(
            S.getPropertyValue(E),
            p,
            !0
          );
          g && L.setProperty(E, g, "important");
        }
        return S.display === "none" && L.setProperty("display", "none", "important"), L.cssText;
      });
      h.forEach((k, S) => {
        k.localName === "style" ? k.remove() : (k.setAttribute("style", b[S]), k.removeAttribute("class"));
      }), w.style.removeProperty("visibility"), w.style.setProperty("width", `${d.width}px`, "important"), w.style.setProperty("height", `${d.height}px`, "important"), w.style.setProperty("max-width", "none", "important"), w.style.setProperty("max-height", "none", "important");
      const $ = new XMLSerializer().serializeToString(w);
      if ($.length > 2e6)
        throw new Error(
          "Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요."
        );
      return { svg: $, ...d };
    } finally {
      c.disconnect(), o?.document.getElementById(n)?.remove(), o?.document.getElementById(`d${n}`)?.remove(), o?.document.getElementById(`i${n}`)?.remove(), o?.dispose(), i.remove();
    }
  });
  return ps = t.catch(() => {
  }), t;
}
function Xi(s, e) {
  if (!/^[A-Za-z][A-Za-z0-9_-]{0,120}$/.test(e))
    throw new Error("다이어그램 SVG 식별자 접두사가 올바르지 않습니다.");
  const t = rn(s.svg), n = [t, ...t.querySelectorAll("*")], i = /* @__PURE__ */ new Map();
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
let an = 0, er = 0;
document.fonts.addEventListener("loadingdone", (s) => {
  s.fontfaces.length && an++;
});
function ln(s, e, t) {
  e = Mi(e);
  const n = Ci(s), i = e.width ?? 720, r = e.panelFormat ?? t;
  if (r !== "compact" && r !== "phone")
    throw new Error("컷비율은 기본 또는 모바일이어야 합니다.");
  if (!Number.isFinite(i) || i < 480 || i > 2400)
    throw new Error("너비는 480~2400 사이여야 합니다.");
  const o = e.font ?? "Malgun Gothic, Apple SD Gothic Neo, sans-serif";
  if (typeof o != "string" || o.length > 300 || /[<>]/.test(o))
    throw new Error("올바른 글꼴 이름이 필요합니다.");
  return { comic: n, options: e, width: i, font: o, format: r };
}
function cn(s, e) {
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
    fontEpoch: an,
    fontVersion: r.fontVersion,
    assetVersion: dn,
    layoutVersion: s.diagram ? 3 : 2,
    format: o
  });
}
function fn(s) {
  return {
    svg: "",
    width: 0,
    height: 0,
    diagnostics: [s instanceof Error ? s.message : "렌더링 실패"],
    panels: []
  };
}
function un(s, e, t) {
  const { comic: n, width: i, font: r } = s, o = [], a = [], c = `cg-${Date.now().toString(36)}-${++er}-${Math.random().toString(36).slice(2, 9)}`, l = (f, d, m) => `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${d}" viewBox="0 0 ${i} ${d}" role="img" aria-label="${R(m)}"><title>${R(m)}</title><rect width="100%" height="100%" fill="#f5f7fb"/><g font-family="${R(r)}" fill="#303341"><text x="24" y="42" font-size="24" font-weight="700">${R(m)}</text>${f}</g></svg>`;
  let u = 68;
  for (const [f, d] of e.entries()) {
    const { markup: m, height: w, hit: h } = d, p = (b) => n.panels[f].diagram ? Xi(
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${w}" viewBox="0 0 ${i} ${w}" style="width:${i}px!important;height:${w}px!important;max-width:none!important;max-height:none!important">${m}</svg>`
      },
      `${c}-${b}-${f}`
    ) : m;
    o.push(
      `<g data-panel="${f}" transform="translate(0 ${u})">${p("whole")}</g>`
    ), a.push({
      index: f,
      svg: l(
        `<g data-panel="${f}" transform="translate(0 68)">${p("panel")}</g>`,
        w + 92,
        `${n.title} · ${f + 1}/${n.panels.length}`
      ),
      width: i,
      height: w + 92,
      diagnostics: [],
      cache: { hits: h ? 1 : 0, misses: h ? 0 : 1, bytes: t.bytes }
    }), u += w + 24;
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
function ms(s, e, t, n = "compact") {
  try {
    const i = ln(s, e, n), r = i.comic.panels.findIndex(
      (a) => a.diagram
    );
    if (r >= 0)
      throw new Error(
        `컷 ${r + 1}.다이어그램: 만화그리기비동기(renderComicAsync) 또는 컷그리기비동기(renderPanelsAsync)를 await로 호출하세요.`
      );
    const o = i.comic.panels.map((a) => {
      const c = cn(a, i), l = t.get(c), u = l ?? nn(
        a,
        i.comic.cast,
        i.width,
        i.font,
        i.format
      );
      return l || t.set(c, u), { ...u, hit: !!l };
    });
    return un(i, o, t);
  } catch (i) {
    return fn(i);
  }
}
async function gs(s, e, t, n = "compact") {
  try {
    const i = ln(s, e, n);
    i.comic.panels.some((o) => o.diagram) && await document.fonts.ready;
    const r = [];
    for (const [o, a] of i.comic.panels.entries()) {
      const c = cn(a, i), l = t.get(c);
      if (l) {
        r.push({ ...l, hit: !0 });
        continue;
      }
      let u;
      if (a.diagram)
        try {
          u = await Zi(a.diagram.source, i.font);
        } catch (d) {
          throw new Error(
            `컷 ${o + 1}.다이어그램: ${d instanceof Error ? d.message : "Mermaid 렌더링 실패"}`
          );
        }
      const f = nn(
        a,
        i.comic.cast,
        i.width,
        i.font,
        i.format,
        u
      );
      t.set(c, f), r.push({ ...f, hit: !1 });
    }
    return un(i, r, t);
  } catch (i) {
    return fn(i);
  }
}
function tr(s = 2e6) {
  const e = new gn(s);
  return {
    render: (t, n = {}) => ms(t, n, e),
    renderPanels: (t, n = {}) => ms(t, n, e, "phone"),
    renderAsync: (t, n = {}) => gs(t, n, e),
    renderPanelsAsync: (t, n = {}) => gs(t, n, e, "phone"),
    clearCache: () => e.clear()
  };
}
const yt = tr(), sr = yt.render, nr = yt.renderPanels, ir = yt.renderAsync, rr = yt.renderPanelsAsync;
function or(s, e) {
  const t = URL.createObjectURL(s), n = document.createElement("a");
  n.href = t, n.download = e, n.click(), setTimeout(() => URL.revokeObjectURL(t), 1e3);
}
async function ar(s, e = 1) {
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
  dn as assetVersion,
  tr as createRenderer,
  or as downloadBlob,
  ar as exportPng,
  sr as renderComic,
  ir as renderComicAsync,
  nr as renderPanels,
  rr as renderPanelsAsync,
  tr as 렌더러만들기,
  sr as 만화그리기,
  ir as 만화그리기비동기,
  _t as 문법값,
  q as 문법항목,
  nr as 컷그리기,
  rr as 컷그리기비동기
};
