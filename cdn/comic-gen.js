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
const we = Object.freeze({
  skinColor: "#f0c8a6",
  hairStyle: "short",
  hairColor: "#47362f",
  outfit: "shirt",
  outfitColor: "#647bd6",
  glasses: !1
}), xt = (n) => {
  if (n.length !== 4 && n.length !== 7 || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(n))
    throw new Error("사람의 외형 색상은 #RGB 또는 #RRGGBB로 작성하세요.");
  return n;
};
function In(n = we) {
  const e = xt(n.skinColor), t = xt(n.hairColor), s = xt(n.outfitColor), i = {
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
    shirt: `<path d="M-16 21L-34 25Q-43 29 -45 38L-49 44L-37 49L-34 56H34L37 49L49 44L45 38Q43 29 34 25L16 21Z" fill="${s}"/><path d="M-15 23Q0 38 15 23M-45 39L-36 43M36 43L45 39" fill="none"/>`,
    jacket: `<path d="M-16 21L-34 25Q-43 29 -45 39L-49 47L-36 51L-33 56H33L36 51L49 47L45 39Q43 29 34 25L16 21Z" fill="${s}"/><path d="M-12 23L0 31L12 23L16 56H-16Z" fill="#f4f5f9"/><path d="M-16 22L-23 32L-12 36L-17 55M16 22L23 32L12 36L17 55M-31 41H-21M21 41H31" fill="none"/>`,
    hoodie: `<path d="M-17 21L-33 25Q-43 29 -45 39L-49 47L-36 52L-33 56H33L36 52L49 47L45 39Q43 29 33 25L17 21Z" fill="${s}"/><path d="M-21 20Q-29 23 -25 32Q0 45 25 32Q29 23 21 20L12 22Q0 32 -12 22Z" fill="${s}"/><path d="M-17 43H17L21 54H-21ZM-10 32V40M10 32V40" fill="none"/>`
  };
  if (!Object.hasOwn(r, n.hairStyle) || !Object.hasOwn(o, n.outfit))
    throw new Error("지원하는 머리 모양과 옷을 선택하세요.");
  const a = (u, d) => d ? `<g data-human-part="${u}">${d}</g>` : "", c = n.glasses ? '<g data-human-part="glasses" fill="none" stroke-width="1.9"><rect x="-28" y="-30" width="22" height="18" rx="7"/><rect x="6" y="-30" width="22" height="18" rx="7"/><path d="M-6 -22Q0 -25 6 -22M-28 -23L-34 -25M28 -23L34 -25"/></g>' : "", l = `<g data-human="true" data-hair-style="${n.hairStyle}" data-outfit="${n.outfit}">${a("hair-back", i[n.hairStyle])}${a("outfit", o[n.outfit])}${a("neck", `<path d="M-10 11V24Q0 33 10 24V11Z" fill="${e}"/>`)}${a("ears", `<ellipse cx="-35" cy="-17" rx="6" ry="8" fill="${e}"/><ellipse cx="35" cy="-17" rx="6" ry="8" fill="${e}"/>`)}${a("face", `<path d="M-34 -25Q-36 -54 0 -55Q36 -54 34 -25L32 -5Q29 18 0 21Q-29 18 -32 -5Z" fill="${e}"/><g stroke="none" fill="#df8e8b" fill-opacity=".22"><ellipse cx="-24" cy="-8" rx="5" ry="3"/><ellipse cx="24" cy="-8" rx="5" ry="3"/></g>`)}${a("hair-front", r[n.hairStyle])}${a("nose", '<path d="M-2 -8Q0 -6 2 -8" fill="none" stroke-width="1.5" stroke-opacity=".6"/>')}${c}</g>`, f = `<path d="M-49 43Q-54 46 -51 51L-48 55Q-44 59 -40 55L-36 50Q-34 46 -38 43L-40 42Z" fill="${e}"/><path d="M-46 48L-43 51M-42 46L-39 49" fill="none" stroke-width="1.5"/>`;
  return {
    body: l,
    faceY: -16,
    color: e,
    sleeveColor: s,
    longSleeve: n.outfit !== "shirt",
    restingHands: {
      left: `<g data-human-part="resting-hand-left">${f}</g>`,
      right: `<g data-human-part="resting-hand-right" transform="scale(-1 1)">${f}</g>`
    }
  };
}
const Ds = "7", Qs = ["wave", "point"], jn = {
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
  human: In()
};
function Fs(n) {
  return n.asset === "human" ? In(n.appearance) : jn[n.asset];
}
const Bn = {
  neutral: '<g stroke="none"><circle cx="-17" cy="-4" r="3.8"/><circle cx="17" cy="-4" r="3.8"/></g><path d="M-10 16Q0 23 10 16" fill="none" stroke-width="2.4"/>',
  happy: '<path d="M-24 -3Q-17 -12 -10 -3M10 -3Q17 -12 24 -3" fill="none" stroke-width="2.5"/><path d="M-14 13Q0 20 14 13Q12 31 0 31Q-12 31 -14 13Z" stroke-width="2.2"/><path d="M-10 17Q0 21 10 17L8 21Q0 24 -8 21Z" fill="white" stroke="none"/>',
  confused: '<g stroke="none"><circle cx="-17" cy="-3" r="3.8"/><circle cx="17" cy="-3" r="3.8"/></g><path d="M-25 -15Q-19 -22 -10 -17M10 -14L24 -11M-7 18Q0 13 9 19" fill="none" stroke-width="2.3"/>',
  sad: '<g stroke="none"><circle cx="-17" cy="-2" r="3.6"/><circle cx="17" cy="-2" r="3.6"/></g><path d="M-25 -13Q-17 -13 -11 -19M11 -19Q17 -13 25 -13M-11 23Q0 11 11 23" fill="none" stroke-width="2.3"/>',
  angry: '<g stroke="none"><circle cx="-17" cy="-1" r="3.6"/><circle cx="17" cy="-1" r="3.6"/></g><path d="M-25 -16L-10 -9M10 -9L25 -16M-10 21Q0 15 10 21" fill="none" stroke-width="2.6"/>'
}, lt = {
  request: '<g stroke-width="2.2" stroke-linejoin="round"><rect x="-18" y="-13" width="36" height="26" rx="4" fill="#fff1cf"/><path d="M-16 10L-5 1M5 1L16 10" fill="none" stroke="#cfb67d" stroke-width="1.4"/><path d="M-17 -10L-3 1Q0 3 3 1L17 -10" fill="none"/></g>',
  data: '<g stroke-width="2.2"><path d="M-16 -12v23c0 10 32 10 32 0v-23" fill="#daccff"/><path d="M7 -7V17Q13 15 16 11V-12Z" fill="#b59cdd" stroke="none"/><ellipse cy="-12" rx="16" ry="6" fill="#eee6ff"/><path d="M-15 7Q0 15 15 7" fill="none" stroke="#9e86c7" stroke-width="1.4"/></g>',
  key: '<g stroke-width="2.2" stroke-linejoin="round"><path d="M-3 -3H20V3H17V9H12V3H6V7H2V3H-3Z" fill="#ffdd96"/><path d="M-2 0a8 8 0 1 0-16 0a8 8 0 1 0 16 0ZM-7 0a3 3 0 1 1-6 0a3 3 0 1 1 6 0Z" fill="#ffdd96" fill-rule="evenodd"/></g>'
};
function X(n) {
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
class Ks {
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
const Gt = /* @__PURE__ */ Symbol.for("yaml.alias"), _t = /* @__PURE__ */ Symbol.for("yaml.document"), he = /* @__PURE__ */ Symbol.for("yaml.map"), _n = /* @__PURE__ */ Symbol.for("yaml.pair"), oe = /* @__PURE__ */ Symbol.for("yaml.scalar"), je = /* @__PURE__ */ Symbol.for("yaml.seq"), ne = /* @__PURE__ */ Symbol.for("yaml.node.type"), Be = (n) => !!n && typeof n == "object" && n[ne] === Gt, dt = (n) => !!n && typeof n == "object" && n[ne] === _t, Ye = (n) => !!n && typeof n == "object" && n[ne] === he, V = (n) => !!n && typeof n == "object" && n[ne] === _n, K = (n) => !!n && typeof n == "object" && n[ne] === oe, We = (n) => !!n && typeof n == "object" && n[ne] === je;
function R(n) {
  if (n && typeof n == "object")
    switch (n[ne]) {
      case he:
      case je:
        return !0;
    }
  return !1;
}
function q(n) {
  if (n && typeof n == "object")
    switch (n[ne]) {
      case Gt:
      case he:
      case oe:
      case je:
        return !0;
    }
  return !1;
}
const Pn = (n) => (K(n) || R(n)) && !!n.anchor, be = /* @__PURE__ */ Symbol("break visit"), Rs = /* @__PURE__ */ Symbol("skip children"), Re = /* @__PURE__ */ Symbol("remove node");
function _e(n, e) {
  const t = qs(e);
  dt(n) ? Ne(null, n.contents, t, Object.freeze([n])) === Re && (n.contents = null) : Ne(null, n, t, Object.freeze([]));
}
_e.BREAK = be;
_e.SKIP = Rs;
_e.REMOVE = Re;
function Ne(n, e, t, s) {
  const i = Vs(n, e, t, s);
  if (q(i) || V(i))
    return Us(n, s, i), Ne(n, i, t, s);
  if (typeof i != "symbol") {
    if (R(e)) {
      s = Object.freeze(s.concat(e));
      for (let r = 0; r < e.items.length; ++r) {
        const o = Ne(r, e.items[r], t, s);
        if (typeof o == "number")
          r = o - 1;
        else {
          if (o === be)
            return be;
          o === Re && (e.items.splice(r, 1), r -= 1);
        }
      }
    } else if (V(e)) {
      s = Object.freeze(s.concat(e));
      const r = Ne("key", e.key, t, s);
      if (r === be)
        return be;
      r === Re && (e.key = null);
      const o = Ne("value", e.value, t, s);
      if (o === be)
        return be;
      o === Re && (e.value = null);
    }
  }
  return i;
}
function qs(n) {
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
function Vs(n, e, t, s) {
  if (typeof t == "function")
    return t(n, e, s);
  if (Ye(e))
    return t.Map?.(n, e, s);
  if (We(e))
    return t.Seq?.(n, e, s);
  if (V(e))
    return t.Pair?.(n, e, s);
  if (K(e))
    return t.Scalar?.(n, e, s);
  if (Be(e))
    return t.Alias?.(n, e, s);
}
function Us(n, e, t) {
  const s = e[e.length - 1];
  if (R(s))
    s.items[n] = t;
  else if (V(s))
    n === "key" ? s.key = t : s.value = t;
  else if (dt(s))
    s.contents = t;
  else {
    const i = Be(s) ? "alias" : "scalar";
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
}, Gs = (n) => n.replace(/[!,[\]{}]/g, (e) => Hs[e]);
class W {
  constructor(e, t) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, W.defaultYaml, e), this.tags = Object.assign({}, W.defaultTags, t);
  }
  clone() {
    const e = new W(this.yaml, this.tags);
    return e.docStart = this.docStart, e;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const e = new W(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: W.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, W.defaultTags);
        break;
    }
    return e;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(e, t) {
    this.atNextDocument && (this.yaml = { explicit: W.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, W.defaultTags), this.atNextDocument = !1);
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
        return t + Gs(e.substring(s.length));
    return e[0] === "!" ? e : `!<${e}>`;
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], s = Object.entries(this.tags);
    let i;
    if (e && s.length > 0 && q(e.contents)) {
      const r = {};
      _e(e.contents, (o, a) => {
        q(a) && a.tag && (r[a.tag] = !0);
      }), i = Object.keys(r);
    } else
      i = [];
    for (const [r, o] of s)
      r === "!!" && o === "tag:yaml.org,2002:" || (!e || i.some((a) => a.startsWith(o))) && t.push(`%TAG ${r} ${o}`);
    return t.join(`
`);
  }
}
W.defaultYaml = { explicit: !1, version: "1.2" };
W.defaultTags = { "!!": "tag:yaml.org,2002:" };
function Dn(n) {
  if (/[\x00-\x19\s,[\]{}]/.test(n)) {
    const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;
    throw new Error(t);
  }
  return !0;
}
function Qn(n) {
  const e = /* @__PURE__ */ new Set();
  return _e(n, {
    Value(t, s) {
      s.anchor && e.add(s.anchor);
    }
  }), e;
}
function Fn(n, e) {
  for (let t = 1; ; ++t) {
    const s = `${n}${t}`;
    if (!e.has(s))
      return s;
  }
}
function zs(n, e) {
  const t = [], s = /* @__PURE__ */ new Map();
  let i = null;
  return {
    onAnchor: (r) => {
      t.push(r), i ?? (i = Qn(n));
      const o = Fn(e, i);
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
        if (typeof o == "object" && o.anchor && (K(o.node) || R(o.node)))
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
function Oe(n, e, t, s) {
  if (s && typeof s == "object")
    if (Array.isArray(s))
      for (let i = 0, r = s.length; i < r; ++i) {
        const o = s[i], a = Oe(n, s, String(i), o);
        a === void 0 ? delete s[i] : a !== o && (s[i] = a);
      }
    else if (s instanceof Map)
      for (const i of Array.from(s.keys())) {
        const r = s.get(i), o = Oe(n, s, i, r);
        o === void 0 ? s.delete(i) : o !== r && s.set(i, o);
      }
    else if (s instanceof Set)
      for (const i of Array.from(s)) {
        const r = Oe(n, s, i, i);
        r === void 0 ? s.delete(i) : r !== i && (s.delete(i), s.add(r));
      }
    else
      for (const [i, r] of Object.entries(s)) {
        const o = Oe(n, s, i, r);
        o === void 0 ? delete s[i] : o !== r && (s[i] = o);
      }
  return n.call(e, t, s);
}
function te(n, e, t) {
  if (Array.isArray(n))
    return n.map((s, i) => te(s, String(i), t));
  if (n && typeof n.toJSON == "function") {
    if (!t || !Pn(n))
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
class zt {
  constructor(e) {
    Object.defineProperty(this, ne, { value: e });
  }
  /** Create a copy of this node.  */
  clone() {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (e.range = this.range.slice()), e;
  }
  /** A plain JavaScript representation of this node. */
  toJS(e, { mapAsMap: t, maxAliasCount: s, onAnchor: i, reviver: r } = {}) {
    if (!dt(e))
      throw new TypeError("A document argument is required");
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: e,
      keep: !0,
      mapAsMap: t === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof s == "number" ? s : 100
    }, a = te(this, "", o);
    if (typeof i == "function")
      for (const { count: c, res: l } of o.anchors.values())
        i(l, c);
    return typeof r == "function" ? Oe(r, { "": a }, "", a) : a;
  }
}
class Yt extends zt {
  constructor(e) {
    super(Gt), this.source = e, Object.defineProperty(this, "tag", {
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
    t?.aliasResolveCache ? s = t.aliasResolveCache : (s = [], _e(e, {
      Node: (r, o) => {
        (Be(o) || Pn(o)) && s.push(o);
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
      if (c || (te(i, null, t), c = r.get(i)), c?.res === void 0) {
        const l = "This should not happen: Alias anchor was not resolved?";
        throw new ReferenceError(l);
      }
      if (a >= 0 && (c.count += 1, c.aliasCount === 0 && (c.aliasCount = it(o, i, r)), c.count * c.aliasCount > a)) {
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
      if (Dn(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
        const r = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(r);
      }
      if (e.implicitKey)
        return `${i} `;
    }
    return i;
  }
}
function it(n, e, t) {
  if (Be(e)) {
    const s = e.resolve(n), i = t && s && t.get(s);
    return i ? i.count * i.aliasCount : 0;
  } else if (R(e)) {
    let s = 0;
    for (const i of e.items) {
      const r = it(n, i, t);
      r > s && (s = r);
    }
    return s;
  } else if (V(e)) {
    const s = it(n, e.key, t), i = it(n, e.value, t);
    return Math.max(s, i);
  }
  return 1;
}
const Kn = (n) => !n || typeof n != "function" && typeof n != "object";
class A extends zt {
  constructor(e) {
    super(oe), this.value = e;
  }
  toJSON(e, t) {
    return t?.keep ? this.value : te(this.value, e, t);
  }
  toString() {
    return String(this.value);
  }
}
A.BLOCK_FOLDED = "BLOCK_FOLDED";
A.BLOCK_LITERAL = "BLOCK_LITERAL";
A.PLAIN = "PLAIN";
A.QUOTE_DOUBLE = "QUOTE_DOUBLE";
A.QUOTE_SINGLE = "QUOTE_SINGLE";
const Ys = "tag:yaml.org,2002:";
function Ws(n, e, t) {
  if (e) {
    const s = t.filter((r) => r.tag === e), i = s.find((r) => !r.format) ?? s[0];
    if (!i)
      throw new Error(`Tag ${e} not found`);
    return i;
  }
  return t.find((s) => s.identify?.(n) && !s.format);
}
function Ue(n, e, t) {
  if (dt(n) && (n = n.contents), q(n))
    return n;
  if (V(n)) {
    const u = t.schema[he].createNode?.(t.schema, null, t);
    return u.items.push(n), u;
  }
  (n instanceof String || n instanceof Number || n instanceof Boolean || typeof BigInt < "u" && n instanceof BigInt) && (n = n.valueOf());
  const { aliasDuplicateObjects: s, onAnchor: i, onTagObj: r, schema: o, sourceObjects: a } = t;
  let c;
  if (s && n && typeof n == "object") {
    if (c = a.get(n), c)
      return c.anchor ?? (c.anchor = i(n)), new Yt(c.anchor);
    c = { anchor: null, node: null }, a.set(n, c);
  }
  e?.startsWith("!!") && (e = Ys + e.slice(2));
  let l = Ws(n, e, o.tags);
  if (!l) {
    if (n && typeof n.toJSON == "function" && (n = n.toJSON()), !n || typeof n != "object") {
      const u = new A(n);
      return c && (c.node = u), u;
    }
    l = n instanceof Map ? o[he] : Symbol.iterator in Object(n) ? o[je] : o[he];
  }
  r && (r(l), delete t.onTagObj);
  const f = l?.createNode ? l.createNode(t.schema, n, t) : typeof l?.nodeClass?.from == "function" ? l.nodeClass.from(t.schema, n, t) : new A(n);
  return e ? f.tag = e : l.default || (f.tag = l.tag), c && (c.node = f), f;
}
function ct(n, e, t) {
  let s = t;
  for (let i = e.length - 1; i >= 0; --i) {
    const r = e[i];
    if (typeof r == "number" && Number.isInteger(r) && r >= 0) {
      const o = [];
      o[r] = s, s = o;
    } else
      s = /* @__PURE__ */ new Map([[r, s]]);
  }
  return Ue(s, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: n,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const Fe = (n) => n == null || typeof n == "object" && !!n[Symbol.iterator]().next().done;
class Rn extends zt {
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
    return e && (t.schema = e), t.items = t.items.map((s) => q(s) || V(s) ? s.clone(e) : s), this.range && (t.range = this.range.slice()), t;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(e, t) {
    if (Fe(e))
      this.add(t);
    else {
      const [s, ...i] = e, r = this.get(s, !0);
      if (R(r))
        r.addIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(s, ct(this.schema, i, t));
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
    if (R(i))
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
    return i.length === 0 ? !t && K(r) ? r.value : r : R(r) ? r.getIn(i, t) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!V(t))
        return !1;
      const s = t.value;
      return s == null || e && K(s) && s.value == null && !s.commentBefore && !s.comment && !s.tag;
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
    return R(i) ? i.hasIn(s) : !1;
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
      if (R(r))
        r.setIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(s, ct(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`);
    }
  }
}
const Js = (n) => n.replace(/^(?!$)(?: $)?/gm, "#");
function ae(n, e) {
  return /^\n+$/.test(n) ? n.substring(1) : e ? n.replace(/^(?! *$)/gm, e) : n;
}
const ke = (n, e, t) => n.endsWith(`
`) ? ae(t, e) : t.includes(`
`) ? `
` + ae(t, e) : (n.endsWith(" ") ? "" : " ") + t, qn = "flow", Pt = "block", rt = "quoted";
function pt(n, e, t = "flow", { indentAtStart: s, lineWidth: i = 80, minContentWidth: r = 20, onFold: o, onOverflow: a } = {}) {
  if (!i || i < 0)
    return n;
  i < r && (r = 0);
  const c = Math.max(1 + r, 1 + i - e.length);
  if (n.length <= c)
    return n;
  const l = [], f = {};
  let u = i - e.length;
  typeof s == "number" && (s > i - Math.max(2, r) ? l.push(0) : u = i - s);
  let d, p, g = !1, h = -1, m = -1, b = -1;
  t === Pt && (h = un(n, h, e.length), h !== -1 && (u = h + c));
  for (let k; k = n[h += 1]; ) {
    if (t === rt && k === "\\") {
      switch (m = h, n[h + 1]) {
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
      t === Pt && (h = un(n, h, e.length)), u = h + e.length + c, d = void 0;
    else {
      if (k === " " && p && p !== " " && p !== `
` && p !== "	") {
        const $ = n[h + 1];
        $ && $ !== " " && $ !== `
` && $ !== "	" && (d = h);
      }
      if (h >= u)
        if (d)
          l.push(d), u = d + c, d = void 0;
        else if (t === rt) {
          for (; p === " " || p === "	"; )
            p = k, k = n[h += 1], g = !0;
          const $ = h > b + 1 ? h - 2 : m - 1;
          if (f[$])
            return n;
          l.push($), f[$] = !0, u = $ + c, d = void 0;
        } else
          g = !0;
    }
    p = k;
  }
  if (g && a && a(), l.length === 0)
    return n;
  o && o();
  let v = n.slice(0, l[0]);
  for (let k = 0; k < l.length; ++k) {
    const $ = l[k], L = l[k + 1] || n.length;
    $ === 0 ? v = `
${e}${n.slice(0, L)}` : (t === rt && f[$] && (v += `${n[$]}\\`), v += `
${e}${n.slice($ + 1, L)}`);
  }
  return v;
}
function un(n, e, t) {
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
const mt = (n, e) => ({
  indentAtStart: e ? n.indent.length : n.indentAtStart,
  lineWidth: n.options.lineWidth,
  minContentWidth: n.options.minContentWidth
}), gt = (n) => /^(%|---|\.\.\.)/m.test(n);
function Xs(n, e, t) {
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
function qe(n, e) {
  const t = JSON.stringify(n);
  if (e.options.doubleQuotedAsJSON)
    return t;
  const { implicitKey: s } = e, i = e.options.doubleQuotedMinMultiLineLength, r = e.indent || (gt(n) ? "  " : "");
  let o = "", a = 0;
  for (let c = 0, l = t[c]; l; l = t[++c])
    if (l === " " && t[c + 1] === "\\" && t[c + 2] === "n" && (o += t.slice(a, c) + "\\ ", c += 1, a = c, l = "\\"), l === "\\")
      switch (t[c + 1]) {
        case "u":
          {
            o += t.slice(a, c);
            const f = t.substr(c + 2, 4);
            switch (f) {
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
                f.substr(0, 2) === "00" ? o += "\\x" + f.substr(2) : o += t.substr(c, 6);
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
  return o = a ? o + t.slice(a) : t, s ? o : pt(o, r, rt, mt(e, !1));
}
function Dt(n, e) {
  if (e.options.singleQuote === !1 || e.implicitKey && n.includes(`
`) || /[ \t]\n|\n[ \t]/.test(n))
    return qe(n, e);
  const t = e.indent || (gt(n) ? "  " : ""), s = "'" + n.replace(/'/g, "''").replace(/\n+/g, `$&
${t}`) + "'";
  return e.implicitKey ? s : pt(s, t, qn, mt(e, !1));
}
function Ae(n, e) {
  const { singleQuote: t } = e.options;
  let s;
  if (t === !1)
    s = qe;
  else {
    const i = n.includes('"'), r = n.includes("'");
    i && !r ? s = Dt : r && !i ? s = qe : s = t ? Dt : qe;
  }
  return s(n, e);
}
let Qt;
try {
  Qt = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  Qt = /\n+(?!\n|$)/g;
}
function ot({ comment: n, type: e, value: t }, s, i, r) {
  const { blockQuote: o, commentString: a, lineWidth: c } = s.options;
  if (!o || /\n[\t ]+$/.test(t))
    return Ae(t, s);
  const l = s.indent || (s.forceBlockIndent || gt(t) ? "  " : ""), f = o === "literal" ? !0 : o === "folded" || e === A.BLOCK_FOLDED ? !1 : e === A.BLOCK_LITERAL ? !0 : !Xs(t, c, l.length);
  if (!t)
    return f ? `|
` : `>
`;
  let u, d;
  for (d = t.length; d > 0; --d) {
    const L = t[d - 1];
    if (L !== `
` && L !== "	" && L !== " ")
      break;
  }
  let p = t.substring(d);
  const g = p.indexOf(`
`);
  g === -1 ? u = "-" : t === p || g !== p.length - 1 ? (u = "+", r && r()) : u = "", p && (t = t.slice(0, -p.length), p[p.length - 1] === `
` && (p = p.slice(0, -1)), p = p.replace(Qt, `$&${l}`));
  let h = !1, m, b = -1;
  for (m = 0; m < t.length; ++m) {
    const L = t[m];
    if (L === " ")
      h = !0;
    else if (L === `
`)
      b = m;
    else
      break;
  }
  let v = t.substring(0, b < m ? b + 1 : m);
  v && (t = t.substring(v.length), v = v.replace(/\n+/g, `$&${l}`));
  let $ = (h ? l ? "2" : "1" : "") + u;
  if (n && ($ += " " + a(n.replace(/ ?[\r\n]+/g, " ")), i && i()), !f) {
    const L = t.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${l}`);
    let x = !1;
    const y = mt(s, !0);
    o !== "folded" && e !== A.BLOCK_FOLDED && (y.onOverflow = () => {
      x = !0;
    });
    const w = pt(`${v}${L}${p}`, l, Pt, y);
    if (!x)
      return `>${$}
${l}${w}`;
  }
  return t = t.replace(/\n+/g, `$&${l}`), `|${$}
${l}${v}${t}${p}`;
}
function Zs(n, e, t, s) {
  const { type: i, value: r } = n, { actualString: o, implicitKey: a, indent: c, indentStep: l, inFlow: f } = e;
  if (a && r.includes(`
`) || f && /[[\]{},]/.test(r))
    return Ae(r, e);
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
    return a || f || !r.includes(`
`) ? Ae(r, e) : ot(n, e, t, s);
  if (!a && !f && i !== A.PLAIN && r.includes(`
`))
    return ot(n, e, t, s);
  if (gt(r)) {
    if (c === "")
      return e.forceBlockIndent = !0, ot(n, e, t, s);
    if (a && c === l)
      return Ae(r, e);
  }
  const u = r.replace(/\n+/g, `$&
${c}`);
  if (o) {
    const d = (h) => h.default && h.tag !== "tag:yaml.org,2002:str" && h.test?.test(u), { compat: p, tags: g } = e.doc.schema;
    if (g.some(d) || p?.some(d))
      return Ae(r, e);
  }
  return a ? u : pt(u, c, qn, mt(e, !1));
}
function Wt(n, e, t, s) {
  const { implicitKey: i, inFlow: r } = e, o = typeof n.value == "string" ? n : Object.assign({}, n, { value: String(n.value) });
  let { type: a } = n;
  a !== A.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (a = A.QUOTE_DOUBLE);
  const c = (f) => {
    switch (f) {
      case A.BLOCK_FOLDED:
      case A.BLOCK_LITERAL:
        return i || r ? Ae(o.value, e) : ot(o, e, t, s);
      case A.QUOTE_DOUBLE:
        return qe(o.value, e);
      case A.QUOTE_SINGLE:
        return Dt(o.value, e);
      case A.PLAIN:
        return Zs(o, e, t, s);
      default:
        return null;
    }
  };
  let l = c(a);
  if (l === null) {
    const { defaultKeyType: f, defaultStringType: u } = e.options, d = i && f || u;
    if (l = c(d), l === null)
      throw new Error(`Unsupported default string type ${d}`);
  }
  return l;
}
function Vn(n, e) {
  const t = Object.assign({
    blockQuote: !0,
    commentString: Js,
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
function ei(n, e) {
  if (e.tag) {
    const i = n.filter((r) => r.tag === e.tag);
    if (i.length > 0)
      return i.find((r) => r.format === e.format) ?? i[0];
  }
  let t, s;
  if (K(e)) {
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
function ti(n, e, { anchors: t, doc: s }) {
  if (!s.directives)
    return "";
  const i = [], r = (K(n) || R(n)) && n.anchor;
  r && Dn(r) && (t.add(r), i.push(`&${r}`));
  const o = n.tag ?? (e.default ? null : e.tag);
  return o && i.push(s.directives.tagString(o)), i.join(" ");
}
function Ce(n, e, t, s) {
  if (V(n))
    return n.toString(e, t, s);
  if (Be(n)) {
    if (e.doc.directives)
      return n.toString(e);
    if (e.resolvedAliases?.has(n))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    e.resolvedAliases ? e.resolvedAliases.add(n) : e.resolvedAliases = /* @__PURE__ */ new Set([n]), n = n.resolve(e.doc);
  }
  let i;
  const r = q(n) ? n : e.doc.createNode(n, { onTagObj: (c) => i = c });
  i ?? (i = ei(e.doc.schema.tags, r));
  const o = ti(r, i, e);
  o.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + o.length + 1);
  const a = typeof i.stringify == "function" ? i.stringify(r, e, t, s) : K(r) ? Wt(r, e, t, s) : r.toString(e, t, s);
  return o ? K(r) || a[0] === "{" || a[0] === "[" ? `${o} ${a}` : `${o}
${e.indent}${a}` : a;
}
function ni({ key: n, value: e }, t, s, i) {
  const { allNullValues: r, doc: o, indent: a, indentStep: c, options: { commentString: l, indentSeq: f, simpleKeys: u } } = t;
  let d = q(n) && n.comment || null;
  if (u) {
    if (d)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (R(n) || !q(n) && typeof n == "object") {
      const y = "With simple keys, collection cannot be used as a key value";
      throw new Error(y);
    }
  }
  let p = !u && (!n || d && e == null && !t.inFlow || R(n) || (K(n) ? n.type === A.BLOCK_FOLDED || n.type === A.BLOCK_LITERAL : typeof n == "object"));
  t = Object.assign({}, t, {
    allNullValues: !1,
    implicitKey: !p && (u || !r),
    indent: a + c
  });
  let g = !1, h = !1, m = Ce(n, t, () => g = !0, () => h = !0);
  if (!p && !t.inFlow && m.length > 1024) {
    if (u)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    p = !0;
  }
  if (t.inFlow) {
    if (r || e == null)
      return g && s && s(), m === "" ? "?" : p ? `? ${m}` : m;
  } else if (r && !u || e == null && p)
    return m = `? ${m}`, d && !g ? m += ke(m, t.indent, l(d)) : h && i && i(), m;
  g && (d = null), p ? (d && (m += ke(m, t.indent, l(d))), m = `? ${m}
${a}:`) : (m = `${m}:`, d && (m += ke(m, t.indent, l(d))));
  let b, v, k;
  q(e) ? (b = !!e.spaceBefore, v = e.commentBefore, k = e.comment) : (b = !1, v = null, k = null, e && typeof e == "object" && (e = o.createNode(e))), t.implicitKey = !1, !p && !d && K(e) && (t.indentAtStart = m.length + 1), h = !1, !f && c.length >= 2 && !t.inFlow && !p && We(e) && !e.flow && !e.tag && !e.anchor && (t.indent = t.indent.substring(2));
  let $ = !1;
  const L = Ce(e, t, () => $ = !0, () => h = !0);
  let x = " ";
  if (d || b || v) {
    if (x = b ? `
` : "", v) {
      const y = l(v);
      x += `
${ae(y, t.indent)}`;
    }
    L === "" && !t.inFlow ? x === `
` && k && (x = `

`) : x += `
${t.indent}`;
  } else if (!p && R(e)) {
    const y = L[0], w = L.indexOf(`
`), N = w !== -1, M = t.inFlow ?? e.flow ?? e.items.length === 0;
    if (N || !M) {
      let P = !1;
      if (N && (y === "&" || y === "!")) {
        let O = L.indexOf(" ");
        y === "&" && O !== -1 && O < w && L[O + 1] === "!" && (O = L.indexOf(" ", O + 1)), (O === -1 || w < O) && (P = !0);
      }
      P || (x = `
${t.indent}`);
    }
  } else (L === "" || L[0] === `
`) && (x = "");
  return m += x + L, t.inFlow ? $ && s && s() : k && !$ ? m += ke(m, t.indent, l(k)) : h && i && i(), m;
}
function si(n, e) {
  (n === "debug" || n === "warn") && console.warn(e);
}
const Ze = "<<", ce = {
  identify: (n) => n === Ze || typeof n == "symbol" && n.description === Ze,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new A(Symbol(Ze)), {
    addToJSMap: Un
  }),
  stringify: () => Ze
}, ii = (n, e) => (ce.identify(e) || K(e) && (!e.type || e.type === A.PLAIN) && ce.identify(e.value)) && n?.doc.schema.tags.some((t) => t.tag === ce.tag && t.default);
function Un(n, e, t) {
  const s = Hn(n, t);
  if (We(s))
    for (const i of s.items)
      Nt(n, e, i);
  else if (Array.isArray(s))
    for (const i of s)
      Nt(n, e, i);
  else
    Nt(n, e, s);
}
function Nt(n, e, t) {
  const s = Hn(n, t);
  if (!Ye(s))
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
function Hn(n, e) {
  return n && Be(e) ? e.resolve(n.doc, n) : e;
}
function Gn(n, e, { key: t, value: s }) {
  if (q(t) && t.addToJSMap)
    t.addToJSMap(n, e, s);
  else if (ii(n, t))
    Un(n, e, s);
  else {
    const i = te(t, "", n);
    if (e instanceof Map)
      e.set(i, te(s, i, n));
    else if (e instanceof Set)
      e.add(i);
    else {
      const r = ri(t, i, n), o = te(s, r, n);
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
function ri(n, e, t) {
  if (e === null)
    return "";
  if (typeof e != "object")
    return String(e);
  if (q(n) && t?.doc) {
    const s = Vn(t.doc, {});
    s.anchors = /* @__PURE__ */ new Set();
    for (const r of t.anchors.keys())
      s.anchors.add(r.anchor);
    s.inFlow = !0, s.inStringifyKey = !0;
    const i = n.toString(s);
    if (!t.mapKeyWarned) {
      let r = JSON.stringify(i);
      r.length > 40 && (r = r.substring(0, 36) + '..."'), si(t.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`), t.mapKeyWarned = !0;
    }
    return i;
  }
  return JSON.stringify(e);
}
function Jt(n, e, t) {
  const s = Ue(n, void 0, t), i = Ue(e, void 0, t);
  return new J(s, i);
}
class J {
  constructor(e, t = null) {
    Object.defineProperty(this, ne, { value: _n }), this.key = e, this.value = t;
  }
  clone(e) {
    let { key: t, value: s } = this;
    return q(t) && (t = t.clone(e)), q(s) && (s = s.clone(e)), new J(t, s);
  }
  toJSON(e, t) {
    const s = t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return Gn(t, s, this);
  }
  toString(e, t, s) {
    return e?.doc ? ni(this, e, t, s) : JSON.stringify(this);
  }
}
function zn(n, e, t) {
  return (e.inFlow ?? n.flow ? ai : oi)(n, e, t);
}
function oi({ comment: n, items: e }, t, { blockItemPrefix: s, flowChars: i, itemIndent: r, onChompKeep: o, onComment: a }) {
  const { indent: c, options: { commentString: l } } = t, f = Object.assign({}, t, { indent: r, type: null });
  let u = !1;
  const d = [];
  for (let g = 0; g < e.length; ++g) {
    const h = e[g];
    let m = null;
    if (q(h))
      !u && h.spaceBefore && d.push(""), ft(t, d, h.commentBefore, u), h.comment && (m = h.comment);
    else if (V(h)) {
      const v = q(h.key) ? h.key : null;
      v && (!u && v.spaceBefore && d.push(""), ft(t, d, v.commentBefore, u));
    }
    u = !1;
    let b = Ce(h, f, () => m = null, () => u = !0);
    m && (b += ke(b, r, l(m))), u && m && (u = !1), d.push(s + b);
  }
  let p;
  if (d.length === 0)
    p = i.start + i.end;
  else {
    p = d[0];
    for (let g = 1; g < d.length; ++g) {
      const h = d[g];
      p += h ? `
${c}${h}` : `
`;
    }
  }
  return n ? (p += `
` + ae(l(n), c), a && a()) : u && o && o(), p;
}
function ai({ items: n }, e, { flowChars: t, itemIndent: s }) {
  const { indent: i, indentStep: r, flowCollectionPadding: o, options: { commentString: a } } = e;
  s += r;
  const c = Object.assign({}, e, {
    indent: s,
    inFlow: !0,
    type: null
  });
  let l = !1, f = 0;
  const u = [];
  for (let g = 0; g < n.length; ++g) {
    const h = n[g];
    let m = null;
    if (q(h))
      h.spaceBefore && u.push(""), ft(e, u, h.commentBefore, !1), h.comment && (m = h.comment);
    else if (V(h)) {
      const v = q(h.key) ? h.key : null;
      v && (v.spaceBefore && u.push(""), ft(e, u, v.commentBefore, !1), v.comment && (l = !0));
      const k = q(h.value) ? h.value : null;
      k ? (k.comment && (m = k.comment), k.commentBefore && (l = !0)) : h.value == null && v?.comment && (m = v.comment);
    }
    m && (l = !0);
    let b = Ce(h, c, () => m = null);
    l || (l = u.length > f || b.includes(`
`)), g < n.length - 1 ? b += "," : e.options.trailingComma && (e.options.lineWidth > 0 && (l || (l = u.reduce((v, k) => v + k.length + 2, 2) + (b.length + 2) > e.options.lineWidth)), l && (b += ",")), m && (b += ke(b, s, a(m))), u.push(b), f = u.length;
  }
  const { start: d, end: p } = t;
  if (u.length === 0)
    return d + p;
  if (!l) {
    const g = u.reduce((h, m) => h + m.length + 2, 2);
    l = e.options.lineWidth > 0 && g > e.options.lineWidth;
  }
  if (l) {
    let g = d;
    for (const h of u)
      g += h ? `
${r}${i}${h}` : `
`;
    return `${g}
${i}${p}`;
  } else
    return `${d}${o}${u.join(" ")}${o}${p}`;
}
function ft({ indent: n, options: { commentString: e } }, t, s, i) {
  if (s && i && (s = s.replace(/^\n+/, "")), s) {
    const r = ae(e(s), n);
    t.push(r.trimStart());
  }
}
function $e(n, e) {
  const t = K(e) ? e.value : e;
  for (const s of n)
    if (V(s) && (s.key === e || s.key === t || K(s.key) && s.key.value === t))
      return s;
}
class ee extends Rn {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(e) {
    super(he, e), this.items = [];
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
      (l !== void 0 || i) && o.items.push(Jt(c, l, s));
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
    V(e) ? s = e : !e || typeof e != "object" || !("key" in e) ? s = new J(e, e?.value) : s = new J(e.key, e.value);
    const i = $e(this.items, s.key), r = this.schema?.sortMapEntries;
    if (i) {
      if (!t)
        throw new Error(`Key ${s.key} already set`);
      K(i.value) && Kn(s.value) ? i.value.value = s.value : i.value = s.value;
    } else if (r) {
      const o = this.items.findIndex((a) => r(s, a) < 0);
      o === -1 ? this.items.push(s) : this.items.splice(o, 0, s);
    } else
      this.items.push(s);
  }
  delete(e) {
    const t = $e(this.items, e);
    return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
  }
  get(e, t) {
    const i = $e(this.items, e)?.value;
    return (!t && K(i) ? i.value : i) ?? void 0;
  }
  has(e) {
    return !!$e(this.items, e);
  }
  set(e, t) {
    this.add(new J(e, t), !0);
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
      Gn(t, i, r);
    return i;
  }
  toString(e, t, s) {
    if (!e)
      return JSON.stringify(this);
    for (const i of this.items)
      if (!V(i))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);
    return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), zn(this, e, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: e.indent || "",
      onChompKeep: s,
      onComment: t
    });
  }
}
const Pe = {
  collection: "map",
  default: !0,
  nodeClass: ee,
  tag: "tag:yaml.org,2002:map",
  resolve(n, e) {
    return Ye(n) || e("Expected a mapping for this tag"), n;
  },
  createNode: (n, e, t) => ee.from(n, e, t)
};
class Se extends Rn {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(e) {
    super(je, e), this.items = [];
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
    const t = et(e);
    return typeof t != "number" ? !1 : this.items.splice(t, 1).length > 0;
  }
  get(e, t) {
    const s = et(e);
    if (typeof s != "number")
      return;
    const i = this.items[s];
    return !t && K(i) ? i.value : i;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(e) {
    const t = et(e);
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
    const s = et(e);
    if (typeof s != "number")
      throw new Error(`Expected a valid index, not ${e}.`);
    const i = this.items[s];
    K(i) && Kn(t) ? i.value = t : this.items[s] = t;
  }
  toJSON(e, t) {
    const s = [];
    t?.onCreate && t.onCreate(s);
    let i = 0;
    for (const r of this.items)
      s.push(te(r, String(i++), t));
    return s;
  }
  toString(e, t, s) {
    return e ? zn(this, e, {
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
        r.items.push(Ue(a, void 0, s));
      }
    }
    return r;
  }
}
function et(n) {
  let e = K(n) ? n.value : n;
  return e && typeof e == "string" && (e = Number(e)), typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
const De = {
  collection: "seq",
  default: !0,
  nodeClass: Se,
  tag: "tag:yaml.org,2002:seq",
  resolve(n, e) {
    return We(n) || e("Expected a sequence for this tag"), n;
  },
  createNode: (n, e, t) => Se.from(n, e, t)
}, yt = {
  identify: (n) => typeof n == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (n) => n,
  stringify(n, e, t, s) {
    return e = Object.assign({ actualString: !0 }, e), Wt(n, e, t, s);
  }
}, wt = {
  identify: (n) => n == null,
  createNode: () => new A(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new A(null),
  stringify: ({ source: n }, e) => typeof n == "string" && wt.test.test(n) ? n : e.options.nullStr
}, Xt = {
  identify: (n) => typeof n == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (n) => new A(n[0] === "t" || n[0] === "T"),
  stringify({ source: n, value: e }, t) {
    if (n && Xt.test.test(n)) {
      const s = n[0] === "t" || n[0] === "T";
      if (e === s)
        return n;
    }
    return e ? t.options.trueStr : t.options.falseStr;
  }
};
function re({ format: n, minFractionDigits: e, tag: t, value: s }) {
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
const Yn = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (n) => n.slice(-3).toLowerCase() === "nan" ? NaN : n[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: re
}, Wn = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (n) => parseFloat(n),
  stringify(n) {
    const e = Number(n.value);
    return isFinite(e) ? e.toExponential() : re(n);
  }
}, Jn = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(n) {
    const e = new A(parseFloat(n)), t = n.indexOf(".");
    return t !== -1 && n[n.length - 1] === "0" && (e.minFractionDigits = n.length - t - 1), e;
  },
  stringify: re
}, bt = (n) => typeof n == "bigint" || Number.isInteger(n), Zt = (n, e, t, { intAsBigInt: s }) => s ? BigInt(n) : parseInt(n.substring(e), t);
function Xn(n, e, t) {
  const { value: s } = n;
  return bt(s) && s >= 0 ? t + s.toString(e) : re(n);
}
const Zn = {
  identify: (n) => bt(n) && n >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (n, e, t) => Zt(n, 2, 8, t),
  stringify: (n) => Xn(n, 8, "0o")
}, es = {
  identify: bt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (n, e, t) => Zt(n, 0, 10, t),
  stringify: re
}, ts = {
  identify: (n) => bt(n) && n >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (n, e, t) => Zt(n, 2, 16, t),
  stringify: (n) => Xn(n, 16, "0x")
}, li = [
  Pe,
  De,
  yt,
  wt,
  Xt,
  Zn,
  es,
  ts,
  Yn,
  Wn,
  Jn
];
function hn(n) {
  return typeof n == "bigint" || Number.isInteger(n);
}
const tt = ({ value: n }) => JSON.stringify(n), ci = [
  {
    identify: (n) => typeof n == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (n) => n,
    stringify: tt
  },
  {
    identify: (n) => n == null,
    createNode: () => new A(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: tt
  },
  {
    identify: (n) => typeof n == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (n) => n === "true",
    stringify: tt
  },
  {
    identify: hn,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (n, e, { intAsBigInt: t }) => t ? BigInt(n) : parseInt(n, 10),
    stringify: ({ value: n }) => hn(n) ? n.toString() : JSON.stringify(n)
  },
  {
    identify: (n) => typeof n == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (n) => parseFloat(n),
    stringify: tt
  }
], fi = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(n, e) {
    return e(`Unresolved plain scalar ${JSON.stringify(n)}`), n;
  }
}, ui = [Pe, De].concat(ci, fi), en = {
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
    if (e ?? (e = A.BLOCK_LITERAL), e !== A.QUOTE_DOUBLE) {
      const c = Math.max(s.options.lineWidth - s.indent.length, s.options.minContentWidth), l = Math.ceil(a.length / c), f = new Array(l);
      for (let u = 0, d = 0; u < l; ++u, d += c)
        f[u] = a.substr(d, c);
      a = f.join(e === A.BLOCK_LITERAL ? `
` : " ");
    }
    return Wt({ comment: n, type: e, value: a }, s, i, r);
  }
};
function ns(n, e) {
  if (We(n))
    for (let t = 0; t < n.items.length; ++t) {
      let s = n.items[t];
      if (!V(s)) {
        if (Ye(s)) {
          s.items.length > 1 && e("Each pair must have its own sequence indicator");
          const i = s.items[0] || new J(new A(null));
          if (s.commentBefore && (i.key.commentBefore = i.key.commentBefore ? `${s.commentBefore}
${i.key.commentBefore}` : s.commentBefore), s.comment) {
            const r = i.value ?? i.key;
            r.comment = r.comment ? `${s.comment}
${r.comment}` : s.comment;
          }
          s = i;
        }
        n.items[t] = V(s) ? s : new J(s);
      }
    }
  else
    e("Expected a sequence for this tag");
  return n;
}
function ss(n, e, t) {
  const { replacer: s } = t, i = new Se(n);
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
      i.items.push(Jt(a, c, t));
    }
  return i;
}
const tn = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: ns,
  createNode: ss
};
class Me extends Se {
  constructor() {
    super(), this.add = ee.prototype.add.bind(this), this.delete = ee.prototype.delete.bind(this), this.get = ee.prototype.get.bind(this), this.has = ee.prototype.has.bind(this), this.set = ee.prototype.set.bind(this), this.tag = Me.tag;
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
      if (V(i) ? (r = te(i.key, "", t), o = te(i.value, r, t)) : r = te(i, "", t), s.has(r))
        throw new Error("Ordered maps must not include duplicate keys");
      s.set(r, o);
    }
    return s;
  }
  static from(e, t, s) {
    const i = ss(e, t, s), r = new this();
    return r.items = i.items, r;
  }
}
Me.tag = "tag:yaml.org,2002:omap";
const nn = {
  collection: "seq",
  identify: (n) => n instanceof Map,
  nodeClass: Me,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(n, e) {
    const t = ns(n, e), s = [];
    for (const { key: i } of t.items)
      K(i) && (s.includes(i.value) ? e(`Ordered maps must not include duplicate keys: ${i.value}`) : s.push(i.value));
    return Object.assign(new Me(), t);
  },
  createNode: (n, e, t) => Me.from(n, e, t)
};
function is({ value: n, source: e }, t) {
  return e && (n ? rs : os).test.test(e) ? e : n ? t.options.trueStr : t.options.falseStr;
}
const rs = {
  identify: (n) => n === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new A(!0),
  stringify: is
}, os = {
  identify: (n) => n === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new A(!1),
  stringify: is
}, hi = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (n) => n.slice(-3).toLowerCase() === "nan" ? NaN : n[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: re
}, di = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (n) => parseFloat(n.replace(/_/g, "")),
  stringify(n) {
    const e = Number(n.value);
    return isFinite(e) ? e.toExponential() : re(n);
  }
}, pi = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(n) {
    const e = new A(parseFloat(n.replace(/_/g, ""))), t = n.indexOf(".");
    if (t !== -1) {
      const s = n.substring(t + 1).replace(/_/g, "");
      s[s.length - 1] === "0" && (e.minFractionDigits = s.length);
    }
    return e;
  },
  stringify: re
}, Je = (n) => typeof n == "bigint" || Number.isInteger(n);
function kt(n, e, t, { intAsBigInt: s }) {
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
function sn(n, e, t) {
  const { value: s } = n;
  if (Je(s)) {
    const i = s.toString(e);
    return s < 0 ? "-" + t + i.substr(1) : t + i;
  }
  return re(n);
}
const mi = {
  identify: Je,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (n, e, t) => kt(n, 2, 2, t),
  stringify: (n) => sn(n, 2, "0b")
}, gi = {
  identify: Je,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (n, e, t) => kt(n, 1, 8, t),
  stringify: (n) => sn(n, 8, "0")
}, yi = {
  identify: Je,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (n, e, t) => kt(n, 0, 10, t),
  stringify: re
}, wi = {
  identify: Je,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (n, e, t) => kt(n, 2, 16, t),
  stringify: (n) => sn(n, 16, "0x")
};
class Te extends ee {
  constructor(e) {
    super(e), this.tag = Te.tag;
  }
  add(e) {
    let t;
    V(e) ? t = e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? t = new J(e.key, null) : t = new J(e, null), $e(this.items, t.key) || this.items.push(t);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(e, t) {
    const s = $e(this.items, e);
    return !t && V(s) ? K(s.key) ? s.key.value : s.key : s;
  }
  set(e, t) {
    if (typeof t != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
    const s = $e(this.items, e);
    s && !t ? this.items.splice(this.items.indexOf(s), 1) : !s && t && this.items.push(new J(e));
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
        typeof i == "function" && (o = i.call(t, o, o)), r.items.push(Jt(o, null, s));
    return r;
  }
}
Te.tag = "tag:yaml.org,2002:set";
const rn = {
  collection: "map",
  identify: (n) => n instanceof Set,
  nodeClass: Te,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (n, e, t) => Te.from(n, e, t),
  resolve(n, e) {
    if (Ye(n)) {
      if (n.hasAllNullValues(!0))
        return Object.assign(new Te(), n);
      e("Set items must all have null values");
    } else
      e("Expected a mapping for this tag");
    return n;
  }
};
function on(n, e) {
  const t = n[0], s = t === "-" || t === "+" ? n.substring(1) : n, i = (o) => e ? BigInt(o) : Number(o), r = s.replace(/_/g, "").split(":").reduce((o, a) => o * i(60) + i(a), i(0));
  return t === "-" ? i(-1) * r : r;
}
function as(n) {
  let { value: e } = n, t = (o) => o;
  if (typeof e == "bigint")
    t = (o) => BigInt(o);
  else if (isNaN(e) || !isFinite(e))
    return re(n);
  let s = "";
  e < 0 && (s = "-", e *= t(-1));
  const i = t(60), r = [e % i];
  return e < 60 ? r.unshift(0) : (e = (e - r[0]) / i, r.unshift(e % i), e >= 60 && (e = (e - r[0]) / i, r.unshift(e))), s + r.map((o) => String(o).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const ls = {
  identify: (n) => typeof n == "bigint" || Number.isInteger(n),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (n, e, { intAsBigInt: t }) => on(n, t),
  stringify: as
}, cs = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (n) => on(n, !1),
  stringify: as
}, $t = {
  identify: (n) => n instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(n) {
    const e = n.match($t.test);
    if (!e)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, t, s, i, r, o, a] = e.map(Number), c = e[7] ? Number((e[7] + "00").substr(1, 3)) : 0;
    let l = Date.UTC(t, s - 1, i, r || 0, o || 0, a || 0, c);
    const f = e[8];
    if (f && f !== "Z") {
      let u = on(f, !1);
      Math.abs(u) < 30 && (u *= 60), l -= 6e4 * u;
    }
    return new Date(l);
  },
  stringify: ({ value: n }) => n?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, dn = [
  Pe,
  De,
  yt,
  wt,
  rs,
  os,
  mi,
  gi,
  yi,
  wi,
  hi,
  di,
  pi,
  en,
  ce,
  nn,
  tn,
  rn,
  ls,
  cs,
  $t
], pn = /* @__PURE__ */ new Map([
  ["core", li],
  ["failsafe", [Pe, De, yt]],
  ["json", ui],
  ["yaml11", dn],
  ["yaml-1.1", dn]
]), mn = {
  binary: en,
  bool: Xt,
  float: Jn,
  floatExp: Wn,
  floatNaN: Yn,
  floatTime: cs,
  int: es,
  intHex: ts,
  intOct: Zn,
  intTime: ls,
  map: Pe,
  merge: ce,
  null: wt,
  omap: nn,
  pairs: tn,
  seq: De,
  set: rn,
  timestamp: $t
}, bi = {
  "tag:yaml.org,2002:binary": en,
  "tag:yaml.org,2002:merge": ce,
  "tag:yaml.org,2002:omap": nn,
  "tag:yaml.org,2002:pairs": tn,
  "tag:yaml.org,2002:set": rn,
  "tag:yaml.org,2002:timestamp": $t
};
function Ot(n, e, t) {
  const s = pn.get(e);
  if (s && !n)
    return t && !s.includes(ce) ? s.concat(ce) : s.slice();
  let i = s;
  if (!i)
    if (Array.isArray(n))
      i = [];
    else {
      const r = Array.from(pn.keys()).filter((o) => o !== "yaml11").map((o) => JSON.stringify(o)).join(", ");
      throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`);
    }
  if (Array.isArray(n))
    for (const r of n)
      i = i.concat(r);
  else typeof n == "function" && (i = n(i.slice()));
  return t && (i = i.concat(ce)), i.reduce((r, o) => {
    const a = typeof o == "string" ? mn[o] : o;
    if (!a) {
      const c = JSON.stringify(o), l = Object.keys(mn).map((f) => JSON.stringify(f)).join(", ");
      throw new Error(`Unknown custom tag ${c}; use one of ${l}`);
    }
    return r.includes(a) || r.push(a), r;
  }, []);
}
const ki = (n, e) => n.key < e.key ? -1 : n.key > e.key ? 1 : 0;
class an {
  constructor({ compat: e, customTags: t, merge: s, resolveKnownTags: i, schema: r, sortMapEntries: o, toStringDefaults: a }) {
    this.compat = Array.isArray(e) ? Ot(e, "compat") : e ? Ot(null, e) : null, this.name = typeof r == "string" && r || "core", this.knownTags = i ? bi : {}, this.tags = Ot(t, this.name, s), this.toStringOptions = a ?? null, Object.defineProperty(this, he, { value: Pe }), Object.defineProperty(this, oe, { value: yt }), Object.defineProperty(this, je, { value: De }), this.sortMapEntries = typeof o == "function" ? o : o === !0 ? ki : null;
  }
  clone() {
    const e = Object.create(an.prototype, Object.getOwnPropertyDescriptors(this));
    return e.tags = this.tags.slice(), e;
  }
}
function $i(n, e) {
  const t = [];
  let s = e.directives === !0;
  if (e.directives !== !1 && n.directives) {
    const c = n.directives.toString(n);
    c ? (t.push(c), s = !0) : n.directives.docStart && (s = !0);
  }
  s && t.push("---");
  const i = Vn(n, e), { commentString: r } = i.options;
  if (n.commentBefore) {
    t.length !== 1 && t.unshift("");
    const c = r(n.commentBefore);
    t.unshift(ae(c, ""));
  }
  let o = !1, a = null;
  if (n.contents) {
    if (q(n.contents)) {
      if (n.contents.spaceBefore && s && t.push(""), n.contents.commentBefore) {
        const f = r(n.contents.commentBefore);
        t.push(ae(f, ""));
      }
      i.forceBlockIndent = !!n.comment, a = n.contents.comment;
    }
    const c = a ? void 0 : () => o = !0;
    let l = Ce(n.contents, i, () => a = null, c);
    a && (l += ke(l, "", r(a))), (l[0] === "|" || l[0] === ">") && t[t.length - 1] === "---" ? t[t.length - 1] = `--- ${l}` : t.push(l);
  } else
    t.push(Ce(n.contents, i));
  if (n.directives?.docEnd)
    if (n.comment) {
      const c = r(n.comment);
      c.includes(`
`) ? (t.push("..."), t.push(ae(c, ""))) : t.push(`... ${c}`);
    } else
      t.push("...");
  else {
    let c = n.comment;
    c && o && (c = c.replace(/^\n+/, "")), c && ((!o || a) && t[t.length - 1] !== "" && t.push(""), t.push(ae(r(c), "")));
  }
  return t.join(`
`) + `
`;
}
class St {
  constructor(e, t, s) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, ne, { value: _t });
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
    s?._directives ? (this.directives = s._directives.atDocument(), this.directives.yaml.explicit && (o = this.directives.yaml.version)) : this.directives = new W({ version: o }), this.setSchema(o, s), this.contents = e === void 0 ? null : this.createNode(e, i, s);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const e = Object.create(St.prototype, {
      [ne]: { value: _t }
    });
    return e.commentBefore = this.commentBefore, e.comment = this.comment, e.errors = this.errors.slice(), e.warnings = this.warnings.slice(), e.options = Object.assign({}, this.options), this.directives && (e.directives = this.directives.clone()), e.schema = this.schema.clone(), e.contents = q(this.contents) ? this.contents.clone(e.schema) : this.contents, this.range && (e.range = this.range.slice()), e;
  }
  /** Adds a value to the document. */
  add(e) {
    Ee(this.contents) && this.contents.add(e);
  }
  /** Adds a value to the document. */
  addIn(e, t) {
    Ee(this.contents) && this.contents.addIn(e, t);
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
      const s = Qn(this);
      e.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !t || s.has(t) ? Fn(t || "a", s) : t;
    }
    return new Yt(e.anchor);
  }
  createNode(e, t, s) {
    let i;
    if (typeof t == "function")
      e = t.call({ "": e }, "", e), i = t;
    else if (Array.isArray(t)) {
      const m = (v) => typeof v == "number" || v instanceof String || v instanceof Number, b = t.filter(m).map(String);
      b.length > 0 && (t = t.concat(b)), i = t;
    } else s === void 0 && t && (s = t, t = void 0);
    const { aliasDuplicateObjects: r, anchorPrefix: o, flow: a, keepUndefined: c, onTagObj: l, tag: f } = s ?? {}, { onAnchor: u, setAnchors: d, sourceObjects: p } = zs(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      o || "a"
    ), g = {
      aliasDuplicateObjects: r ?? !0,
      keepUndefined: c ?? !1,
      onAnchor: u,
      onTagObj: l,
      replacer: i,
      schema: this.schema,
      sourceObjects: p
    }, h = Ue(e, f, g);
    return a && R(h) && (h.flow = !0), d(), h;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(e, t, s = {}) {
    const i = this.createNode(e, null, s), r = this.createNode(t, null, s);
    return new J(i, r);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    return Ee(this.contents) ? this.contents.delete(e) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    return Fe(e) ? this.contents == null ? !1 : (this.contents = null, !0) : Ee(this.contents) ? this.contents.deleteIn(e) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(e, t) {
    return R(this.contents) ? this.contents.get(e, t) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    return Fe(e) ? !t && K(this.contents) ? this.contents.value : this.contents : R(this.contents) ? this.contents.getIn(e, t) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(e) {
    return R(this.contents) ? this.contents.has(e) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(e) {
    return Fe(e) ? this.contents !== void 0 : R(this.contents) ? this.contents.hasIn(e) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(e, t) {
    this.contents == null ? this.contents = ct(this.schema, [e], t) : Ee(this.contents) && this.contents.set(e, t);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    Fe(e) ? this.contents = t : this.contents == null ? this.contents = ct(this.schema, Array.from(e), t) : Ee(this.contents) && this.contents.setIn(e, t);
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
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new W({ version: "1.1" }), s = { resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = e : this.directives = new W({ version: e }), s = { resolveKnownTags: !0, schema: "core" };
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
      this.schema = new an(Object.assign(s, t));
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
    }, c = te(this.contents, t ?? "", a);
    if (typeof r == "function")
      for (const { count: l, res: f } of a.anchors.values())
        r(f, l);
    return typeof o == "function" ? Oe(o, { "": c }, "", c) : c;
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
    return $i(this, e);
  }
}
function Ee(n) {
  if (R(n))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class fs extends Error {
  constructor(e, t, s, i) {
    super(), this.name = e, this.code = s, this.message = i, this.pos = t;
  }
}
class Ke extends fs {
  constructor(e, t, s) {
    super("YAMLParseError", e, t, s);
  }
}
class Si extends fs {
  constructor(e, t, s) {
    super("YAMLWarning", e, t, s);
  }
}
const gn = (n, e) => (t) => {
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
function Ie(n, { flow: e, indicator: t, next: s, offset: i, onError: r, parentIndent: o, startOnNewline: a }) {
  let c = !1, l = a, f = a, u = "", d = "", p = !1, g = !1, h = null, m = null, b = null, v = null, k = null, $ = null, L = null;
  for (const w of n)
    switch (g && (w.type !== "space" && w.type !== "newline" && w.type !== "comma" && r(w.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), g = !1), h && (l && w.type !== "comment" && w.type !== "newline" && r(h, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), h = null), w.type) {
      case "space":
        !e && (t !== "doc-start" || s?.type !== "flow-collection") && w.source.includes("	") && (h = w), f = !0;
        break;
      case "comment": {
        f || r(w, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const N = w.source.substring(1) || " ";
        u ? u += d + N : u = N, d = "", l = !1;
        break;
      }
      case "newline":
        l ? u ? u += w.source : (!$ || t !== "seq-item-ind") && (c = !0) : d += w.source, l = !0, p = !0, (m || b) && (v = w), f = !0;
        break;
      case "anchor":
        m && r(w, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), w.source.endsWith(":") && r(w.offset + w.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), m = w, L ?? (L = w.offset), l = !1, f = !1, g = !0;
        break;
      case "tag": {
        b && r(w, "MULTIPLE_TAGS", "A node can have at most one tag"), b = w, L ?? (L = w.offset), l = !1, f = !1, g = !0;
        break;
      }
      case t:
        (m || b) && r(w, "BAD_PROP_ORDER", `Anchors and tags must be after the ${w.source} indicator`), $ && r(w, "UNEXPECTED_TOKEN", `Unexpected ${w.source} in ${e ?? "collection"}`), $ = w, l = t === "seq-item-ind" || t === "explicit-key-ind", f = !1;
        break;
      case "comma":
        if (e) {
          k && r(w, "UNEXPECTED_TOKEN", `Unexpected , in ${e}`), k = w, l = !1, f = !1;
          break;
        }
      // else fallthrough
      default:
        r(w, "UNEXPECTED_TOKEN", `Unexpected ${w.type} token`), l = !1, f = !1;
    }
  const x = n[n.length - 1], y = x ? x.offset + x.source.length : i;
  return g && s && s.type !== "space" && s.type !== "newline" && s.type !== "comma" && (s.type !== "scalar" || s.source !== "") && r(s.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), h && (l && h.indent <= o || s?.type === "block-map" || s?.type === "block-seq") && r(h, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: k,
    found: $,
    spaceBefore: c,
    comment: u,
    hasNewline: p,
    anchor: m,
    tag: b,
    newlineAfterProp: v,
    end: y,
    start: L ?? y
  };
}
function He(n) {
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
        if (He(e.key) || He(e.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function Ft(n, e, t) {
  if (e?.type === "flow-collection") {
    const s = e.end[0];
    s.indent === n && (s.source === "]" || s.source === "}") && He(e) && t(s, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function us(n, e, t) {
  const { uniqueKeys: s } = n.options;
  if (s === !1)
    return !1;
  const i = typeof s == "function" ? s : (r, o) => r === o || K(r) && K(o) && r.value === o.value;
  return e.some((r) => i(r.key, t));
}
const yn = "All mapping items must start at the same column";
function vi({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  const o = r?.nodeClass ?? ee, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1);
  let c = s.offset, l = null;
  for (const f of s.items) {
    const { start: u, key: d, sep: p, value: g } = f, h = Ie(u, {
      indicator: "explicit-key-ind",
      next: d ?? p?.[0],
      offset: c,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !0
    }), m = !h.found;
    if (m) {
      if (d && (d.type === "block-seq" ? i(c, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in d && d.indent !== s.indent && i(c, "BAD_INDENT", yn)), !h.anchor && !h.tag && !p) {
        l = h.end, h.comment && (a.comment ? a.comment += `
` + h.comment : a.comment = h.comment);
        continue;
      }
      (h.newlineAfterProp || He(d)) && i(d ?? u[u.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else h.found?.indent !== s.indent && i(c, "BAD_INDENT", yn);
    t.atKey = !0;
    const b = h.end, v = d ? n(t, d, h, i) : e(t, b, u, null, h, i);
    t.schema.compat && Ft(s.indent, d, i), t.atKey = !1, us(t, a.items, v) && i(b, "DUPLICATE_KEY", "Map keys must be unique");
    const k = Ie(p ?? [], {
      indicator: "map-value-ind",
      next: g,
      offset: v.range[2],
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !d || d.type === "block-scalar"
    });
    if (c = k.end, k.found) {
      m && (g?.type === "block-map" && !k.hasNewline && i(c, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), t.options.strict && h.start < k.found.offset - 1024 && i(v.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const $ = g ? n(t, g, k, i) : e(t, c, p, null, k, i);
      t.schema.compat && Ft(s.indent, g, i), c = $.range[2];
      const L = new J(v, $);
      t.options.keepSourceTokens && (L.srcToken = f), a.items.push(L);
    } else {
      m && i(v.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), k.comment && (v.comment ? v.comment += `
` + k.comment : v.comment = k.comment);
      const $ = new J(v);
      t.options.keepSourceTokens && ($.srcToken = f), a.items.push($);
    }
  }
  return l && l < c && i(l, "IMPOSSIBLE", "Map comment with trailing content"), a.range = [s.offset, c, l ?? c], a;
}
function Ei({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  const o = r?.nodeClass ?? Se, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let c = s.offset, l = null;
  for (const { start: f, value: u } of s.items) {
    const d = Ie(f, {
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
    const p = u ? n(t, u, d, i) : e(t, d.end, f, null, d, i);
    t.schema.compat && Ft(s.indent, u, i), c = p.range[2], a.items.push(p);
  }
  return a.range = [s.offset, c, l ?? c], a;
}
function Xe(n, e, t, s) {
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
          const f = c.substring(1) || " ";
          i ? i += o + f : i = f, o = "";
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
const At = "Block collections are not allowed within flow collections", Mt = (n) => n && (n.type === "block-map" || n.type === "block-seq");
function Li({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  const o = s.start.source === "{", a = o ? "flow map" : "flow sequence", c = r?.nodeClass ?? (o ? ee : Se), l = new c(t.schema);
  l.flow = !0;
  const f = t.atRoot;
  f && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let u = s.offset + s.start.source.length;
  for (let m = 0; m < s.items.length; ++m) {
    const b = s.items[m], { start: v, key: k, sep: $, value: L } = b, x = Ie(v, {
      flow: a,
      indicator: "explicit-key-ind",
      next: k ?? $?.[0],
      offset: u,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !1
    });
    if (!x.found) {
      if (!x.anchor && !x.tag && !$ && !L) {
        m === 0 && x.comma ? i(x.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`) : m < s.items.length - 1 && i(x.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${a}`), x.comment && (l.comment ? l.comment += `
` + x.comment : l.comment = x.comment), u = x.end;
        continue;
      }
      !o && t.options.strict && He(k) && i(
        k,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (m === 0)
      x.comma && i(x.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`);
    else if (x.comma || i(x.start, "MISSING_CHAR", `Missing , between ${a} items`), x.comment) {
      let y = "";
      e: for (const w of v)
        switch (w.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            y = w.source.substring(1);
            break e;
          default:
            break e;
        }
      if (y) {
        let w = l.items[l.items.length - 1];
        V(w) && (w = w.value ?? w.key), w.comment ? w.comment += `
` + y : w.comment = y, x.comment = x.comment.substring(y.length + 1);
      }
    }
    if (!o && !$ && !x.found) {
      const y = L ? n(t, L, x, i) : e(t, x.end, $, null, x, i);
      l.items.push(y), u = y.range[2], Mt(L) && i(y.range, "BLOCK_IN_FLOW", At);
    } else {
      t.atKey = !0;
      const y = x.end, w = k ? n(t, k, x, i) : e(t, y, v, null, x, i);
      Mt(k) && i(w.range, "BLOCK_IN_FLOW", At), t.atKey = !1;
      const N = Ie($ ?? [], {
        flow: a,
        indicator: "map-value-ind",
        next: L,
        offset: w.range[2],
        onError: i,
        parentIndent: s.indent,
        startOnNewline: !1
      });
      if (N.found) {
        if (!o && !x.found && t.options.strict) {
          if ($)
            for (const O of $) {
              if (O === N.found)
                break;
              if (O.type === "newline") {
                i(O, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          x.start < N.found.offset - 1024 && i(N.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else L && ("source" in L && L.source?.[0] === ":" ? i(L, "MISSING_CHAR", `Missing space after : in ${a}`) : i(N.start, "MISSING_CHAR", `Missing , or : between ${a} items`));
      const M = L ? n(t, L, N, i) : N.found ? e(t, N.end, $, null, N, i) : null;
      M ? Mt(L) && i(M.range, "BLOCK_IN_FLOW", At) : N.comment && (w.comment ? w.comment += `
` + N.comment : w.comment = N.comment);
      const P = new J(w, M);
      if (t.options.keepSourceTokens && (P.srcToken = b), o) {
        const O = l;
        us(t, O.items, w) && i(y, "DUPLICATE_KEY", "Map keys must be unique"), O.items.push(P);
      } else {
        const O = new ee(t.schema);
        O.flow = !0, O.items.push(P);
        const Q = (M ?? w).range;
        O.range = [w.range[0], Q[1], Q[2]], l.items.push(O);
      }
      u = M ? M.range[2] : N.end;
    }
  }
  const d = o ? "}" : "]", [p, ...g] = s.end;
  let h = u;
  if (p?.source === d)
    h = p.offset + p.source.length;
  else {
    const m = a[0].toUpperCase() + a.substring(1), b = f ? `${m} must end with a ${d}` : `${m} in block collection must be sufficiently indented and end with a ${d}`;
    i(u, f ? "MISSING_CHAR" : "BAD_INDENT", b), p && p.source.length !== 1 && g.unshift(p);
  }
  if (g.length > 0) {
    const m = Xe(g, h, t.options.strict, i);
    m.comment && (l.comment ? l.comment += `
` + m.comment : l.comment = m.comment), l.range = [s.offset, h, m.offset];
  } else
    l.range = [s.offset, h, h];
  return l;
}
function Tt(n, e, t, s, i, r) {
  const o = t.type === "block-map" ? vi(n, e, t, s, r) : t.type === "block-seq" ? Ei(n, e, t, s, r) : Li(n, e, t, s, r), a = o.constructor;
  return i === "!" || i === a.tagName ? (o.tag = a.tagName, o) : (i && (o.tag = i), o);
}
function xi(n, e, t, s, i) {
  const r = s.tag, o = r ? e.directives.tagName(r.source, (d) => i(r, "TAG_RESOLVE_FAILED", d)) : null;
  if (t.type === "block-seq") {
    const { anchor: d, newlineAfterProp: p } = s, g = d && r ? d.offset > r.offset ? d : r : d ?? r;
    g && (!p || p.offset < g.offset) && i(g, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const a = t.type === "block-map" ? "map" : t.type === "block-seq" ? "seq" : t.start.source === "{" ? "map" : "seq";
  if (!r || !o || o === "!" || o === ee.tagName && a === "map" || o === Se.tagName && a === "seq")
    return Tt(n, e, t, i, o);
  let c = e.schema.tags.find((d) => d.tag === o && d.collection === a);
  if (!c) {
    const d = e.schema.knownTags[o];
    if (d?.collection === a)
      e.schema.tags.push(Object.assign({}, d, { default: !1 })), c = d;
    else
      return d ? i(r, "BAD_COLLECTION_TYPE", `${d.tag} used for ${a} collection, but expects ${d.collection ?? "scalar"}`, !0) : i(r, "TAG_RESOLVE_FAILED", `Unresolved tag: ${o}`, !0), Tt(n, e, t, i, o);
  }
  const l = Tt(n, e, t, i, o, c), f = c.resolve?.(l, (d) => i(r, "TAG_RESOLVE_FAILED", d), e.options) ?? l, u = q(f) ? f : new A(f);
  return u.range = l.range, u.tag = o, c?.format && (u.format = c.format), u;
}
function Ni(n, e, t) {
  const s = e.offset, i = Oi(e, n.options.strict, t);
  if (!i)
    return { value: "", type: null, comment: "", range: [s, s, s] };
  const r = i.mode === ">" ? A.BLOCK_FOLDED : A.BLOCK_LITERAL, o = e.source ? Ai(e.source) : [];
  let a = o.length;
  for (let h = o.length - 1; h >= 0; --h) {
    const m = o[h][1];
    if (m === "" || m === "\r")
      a = h;
    else
      break;
  }
  if (a === 0) {
    const h = i.chomp === "+" && o.length > 0 ? `
`.repeat(Math.max(1, o.length - 1)) : "";
    let m = s + i.length;
    return e.source && (m += e.source.length), { value: h, type: r, comment: i.comment, range: [s, m, m] };
  }
  let c = e.indent + i.indent, l = e.offset + i.length, f = 0;
  for (let h = 0; h < a; ++h) {
    const [m, b] = o[h];
    if (b === "" || b === "\r")
      i.indent === 0 && m.length > c && (c = m.length);
    else {
      m.length < c && t(l + m.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), i.indent === 0 && (c = m.length), f = h, c === 0 && !n.atRoot && t(l, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    l += m.length + b.length + 1;
  }
  for (let h = o.length - 1; h >= a; --h)
    o[h][0].length > c && (a = h + 1);
  let u = "", d = "", p = !1;
  for (let h = 0; h < f; ++h)
    u += o[h][0].slice(c) + `
`;
  for (let h = f; h < a; ++h) {
    let [m, b] = o[h];
    l += m.length + b.length + 1;
    const v = b[b.length - 1] === "\r";
    if (v && (b = b.slice(0, -1)), b && m.length < c) {
      const $ = `Block scalar lines must not be less indented than their ${i.indent ? "explicit indentation indicator" : "first line"}`;
      t(l - b.length - (v ? 2 : 1), "BAD_INDENT", $), m = "";
    }
    r === A.BLOCK_LITERAL ? (u += d + m.slice(c) + b, d = `
`) : m.length > c || b[0] === "	" ? (d === " " ? d = `
` : !p && d === `
` && (d = `

`), u += d + m.slice(c) + b, d = `
`, p = !0) : b === "" ? d === `
` ? u += `
` : d = `
` : (u += d + b, d = " ", p = !1);
  }
  switch (i.chomp) {
    case "-":
      break;
    case "+":
      for (let h = a; h < o.length; ++h)
        u += `
` + o[h][0].slice(c);
      u[u.length - 1] !== `
` && (u += `
`);
      break;
    default:
      u += `
`;
  }
  const g = s + i.length + e.source.length;
  return { value: u, type: r, comment: i.comment, range: [s, g, g] };
}
function Oi({ offset: n, props: e }, t, s) {
  if (e[0].type !== "block-scalar-header")
    return s(e[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: i } = e[0], r = i[0];
  let o = 0, a = "", c = -1;
  for (let d = 1; d < i.length; ++d) {
    const p = i[d];
    if (!a && (p === "-" || p === "+"))
      a = p;
    else {
      const g = Number(p);
      !o && g ? o = g : c === -1 && (c = n + d);
    }
  }
  c !== -1 && s(c, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${i}`);
  let l = !1, f = "", u = i.length;
  for (let d = 1; d < e.length; ++d) {
    const p = e[d];
    switch (p.type) {
      case "space":
        l = !0;
      // fallthrough
      case "newline":
        u += p.source.length;
        break;
      case "comment":
        t && !l && s(p, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), u += p.source.length, f = p.source.substring(1);
        break;
      case "error":
        s(p, "UNEXPECTED_TOKEN", p.message), u += p.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const g = `Unexpected token in block scalar header: ${p.type}`;
        s(p, "UNEXPECTED_TOKEN", g);
        const h = p.source;
        h && typeof h == "string" && (u += h.length);
      }
    }
  }
  return { mode: r, indent: o, chomp: a, comment: f, length: u };
}
function Ai(n) {
  const e = n.split(/\n( *)/), t = e[0], s = t.match(/^( *)/), r = [s?.[1] ? [s[1], t.slice(s[1].length)] : ["", t]];
  for (let o = 1; o < e.length; o += 2)
    r.push([e[o], e[o + 1]]);
  return r;
}
function Mi(n, e, t) {
  const { offset: s, type: i, source: r, end: o } = n;
  let a, c;
  const l = (d, p, g) => t(s + d, p, g);
  switch (i) {
    case "scalar":
      a = A.PLAIN, c = Ti(r, l);
      break;
    case "single-quoted-scalar":
      a = A.QUOTE_SINGLE, c = Ci(r, l);
      break;
    case "double-quoted-scalar":
      a = A.QUOTE_DOUBLE, c = Ii(r, l);
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
  const f = s + r.length, u = Xe(o, f, e, t);
  return {
    value: c,
    type: a,
    comment: u.comment,
    range: [s, f, u.offset]
  };
}
function Ti(n, e) {
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
  return t && e(0, "BAD_SCALAR_START", `Plain value cannot start with ${t}`), hs(n);
}
function Ci(n, e) {
  return (n[n.length - 1] !== "'" || n.length === 1) && e(n.length, "MISSING_CHAR", "Missing closing 'quote"), hs(n.slice(1, -1)).replace(/''/g, "'");
}
function hs(n) {
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
function Ii(n, e) {
  let t = "";
  for (let s = 1; s < n.length - 1; ++s) {
    const i = n[s];
    if (!(i === "\r" && n[s + 1] === `
`))
      if (i === `
`) {
        const { fold: r, offset: o } = ji(n, s);
        t += r, s = o;
      } else if (i === "\\") {
        let r = n[++s];
        const o = Bi[r];
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
          t += _i(n, s + 1, a, e), s += a;
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
function ji(n, e) {
  let t = "", s = n[e + 1];
  for (; (s === " " || s === "	" || s === `
` || s === "\r") && !(s === "\r" && n[e + 2] !== `
`); )
    s === `
` && (t += `
`), e += 1, s = n[e + 1];
  return t || (t = " "), { fold: t, offset: e };
}
const Bi = {
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
function _i(n, e, t, s) {
  const i = n.substr(e, t), o = i.length === t && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
  try {
    return String.fromCodePoint(o);
  } catch {
    const a = n.substr(e - 2, t + 2);
    return s(e - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${a}`), a;
  }
}
function ds(n, e, t, s) {
  const { value: i, type: r, comment: o, range: a } = e.type === "block-scalar" ? Ni(n, e, s) : Mi(e, n.options.strict, s), c = t ? n.directives.tagName(t.source, (u) => s(t, "TAG_RESOLVE_FAILED", u)) : null;
  let l;
  n.options.stringKeys && n.atKey ? l = n.schema[oe] : c ? l = Pi(n.schema, i, c, t, s) : e.type === "scalar" ? l = Di(n, i, e, s) : l = n.schema[oe];
  let f;
  try {
    const u = l.resolve(i, (d) => s(t ?? e, "TAG_RESOLVE_FAILED", d), n.options);
    f = K(u) ? u : new A(u);
  } catch (u) {
    const d = u instanceof Error ? u.message : String(u);
    s(t ?? e, "TAG_RESOLVE_FAILED", d), f = new A(i);
  }
  return f.range = a, f.source = i, r && (f.type = r), c && (f.tag = c), l.format && (f.format = l.format), o && (f.comment = o), f;
}
function Pi(n, e, t, s, i) {
  if (t === "!")
    return n[oe];
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
  return o && !o.collection ? (n.tags.push(Object.assign({}, o, { default: !1, test: void 0 })), o) : (i(s, "TAG_RESOLVE_FAILED", `Unresolved tag: ${t}`, t !== "tag:yaml.org,2002:str"), n[oe]);
}
function Di({ atKey: n, directives: e, schema: t }, s, i, r) {
  const o = t.tags.find((a) => (a.default === !0 || n && a.default === "key") && a.test?.test(s)) || t[oe];
  if (t.compat) {
    const a = t.compat.find((c) => c.default && c.test?.test(s)) ?? t[oe];
    if (o.tag !== a.tag) {
      const c = e.tagString(o.tag), l = e.tagString(a.tag), f = `Value may be parsed as either ${c} or ${l}`;
      r(i, "TAG_RESOLVE_FAILED", f, !0);
    }
  }
  return o;
}
function Qi(n, e, t) {
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
const Fi = { composeNode: ps, composeEmptyNode: ln };
function ps(n, e, t, s) {
  const i = n.atKey, { spaceBefore: r, comment: o, anchor: a, tag: c } = t;
  let l, f = !0;
  switch (e.type) {
    case "alias":
      l = Ki(n, e, s), (a || c) && s(e, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      l = ds(n, e, c, s), a && (l.anchor = a.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        l = xi(Fi, n, e, t, s), a && (l.anchor = a.source.substring(1));
      } catch (u) {
        const d = u instanceof Error ? u.message : String(u);
        s(e, "RESOURCE_EXHAUSTION", d);
      }
      break;
    default: {
      const u = e.type === "error" ? e.message : `Unsupported token (type: ${e.type})`;
      s(e, "UNEXPECTED_TOKEN", u), f = !1;
    }
  }
  return l ?? (l = ln(n, e.offset, void 0, null, t, s)), a && l.anchor === "" && s(a, "BAD_ALIAS", "Anchor cannot be an empty string"), i && n.options.stringKeys && (!K(l) || typeof l.value != "string" || l.tag && l.tag !== "tag:yaml.org,2002:str") && s(c ?? e, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), r && (l.spaceBefore = !0), o && (e.type === "scalar" && e.source === "" ? l.comment = o : l.commentBefore = o), n.options.keepSourceTokens && f && (l.srcToken = e), l;
}
function ln(n, e, t, s, { spaceBefore: i, comment: r, anchor: o, tag: a, end: c }, l) {
  const f = {
    type: "scalar",
    offset: Qi(e, t, s),
    indent: -1,
    source: ""
  }, u = ds(n, f, a, l);
  return o && (u.anchor = o.source.substring(1), u.anchor === "" && l(o, "BAD_ALIAS", "Anchor cannot be an empty string")), i && (u.spaceBefore = !0), r && (u.comment = r, u.range[2] = c), u;
}
function Ki({ options: n }, { offset: e, source: t, end: s }, i) {
  const r = new Yt(t.substring(1));
  r.source === "" && i(e, "BAD_ALIAS", "Alias cannot be an empty string"), r.source.endsWith(":") && i(e + t.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const o = e + t.length, a = Xe(s, o, n.strict, i);
  return r.range = [e, o, a.offset], a.comment && (r.comment = a.comment), r;
}
function Ri(n, e, { offset: t, start: s, value: i, end: r }, o) {
  const a = Object.assign({ _directives: e }, n), c = new St(void 0, a), l = {
    atKey: !1,
    atRoot: !0,
    directives: c.directives,
    options: c.options,
    schema: c.schema
  }, f = Ie(s, {
    indicator: "doc-start",
    next: i ?? r?.[0],
    offset: t,
    onError: o,
    parentIndent: 0,
    startOnNewline: !0
  });
  f.found && (c.directives.docStart = !0, i && (i.type === "block-map" || i.type === "block-seq") && !f.hasNewline && o(f.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), c.contents = i ? ps(l, i, f, o) : ln(l, f.end, s, null, f, o);
  const u = c.contents.range[2], d = Xe(r, u, !1, o);
  return d.comment && (c.comment = d.comment), c.range = [t, u, d.offset], c;
}
function Qe(n) {
  if (typeof n == "number")
    return [n, n + 1];
  if (Array.isArray(n))
    return n.length === 2 ? n : [n[0], n[1]];
  const { offset: e, source: t } = n;
  return [e, e + (typeof t == "string" ? t.length : 1)];
}
function wn(n) {
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
class qi {
  constructor(e = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (t, s, i, r) => {
      const o = Qe(t);
      r ? this.warnings.push(new Si(o, s, i)) : this.errors.push(new Ke(o, s, i));
    }, this.directives = new W({ version: e.version || "1.2" }), this.options = e;
  }
  decorate(e, t) {
    const { comment: s, afterEmptyLine: i } = wn(this.prelude);
    if (s) {
      const r = e.contents;
      if (t)
        e.comment = e.comment ? `${e.comment}
${s}` : s;
      else if (i || e.directives.docStart || !r)
        e.commentBefore = s;
      else if (R(r) && !r.flow && r.items.length > 0) {
        let o = r.items[0];
        V(o) && (o = o.key);
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
      comment: wn(this.prelude).comment,
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
          const r = Qe(e);
          r[0] += t, this.onError(r, "BAD_DIRECTIVE", s, i);
        }), this.prelude.push(e.source), this.atDirectives = !0;
        break;
      case "document": {
        const t = Ri(this.options, this.directives, e, this.onError);
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
        const t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, s = new Ke(Qe(e), "UNEXPECTED_TOKEN", t);
        this.atDirectives || !this.doc ? this.errors.push(s) : this.doc.errors.push(s);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const s = "Unexpected doc-end without preceding document";
          this.errors.push(new Ke(Qe(e), "UNEXPECTED_TOKEN", s));
          break;
        }
        this.doc.directives.docEnd = !0;
        const t = Xe(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), t.comment) {
          const s = this.doc.comment;
          this.doc.comment = s ? `${s}
${t.comment}` : t.comment;
        }
        this.doc.range[2] = t.offset;
        break;
      }
      default:
        this.errors.push(new Ke(Qe(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
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
      const s = Object.assign({ _directives: this.directives }, this.options), i = new St(void 0, s);
      this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), i.range = [0, t, t], this.decorate(i, !1), yield i;
    }
  }
}
const ms = "\uFEFF", gs = "", ys = "", Kt = "";
function Vi(n) {
  switch (n) {
    case ms:
      return "byte-order-mark";
    case gs:
      return "doc-mode";
    case ys:
      return "flow-error-end";
    case Kt:
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
function ie(n) {
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
const bn = new Set("0123456789ABCDEFabcdef"), Ui = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), nt = new Set(",[]{}"), Hi = new Set(` ,[]{}
\r	`), Ct = (n) => !n || Hi.has(n);
class Gi {
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
      if ((s === "---" || s === "...") && ie(this.buffer[e + 3]))
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
    if (e[0] === ms && (yield* this.pushCount(1), e = e.substring(1)), e[0] === "%") {
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
    return yield gs, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const e = this.charAt(0);
    if (!e && !this.atEnd)
      return this.setNext("line-start");
    if (e === "-" || e === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const t = this.peek(3);
      if ((t === "---" || t === "...") && ie(this.charAt(3)))
        return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, t === "---" ? "doc" : "stream";
    }
    return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !ie(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [e, t] = this.peek(2);
    if (!t && !this.atEnd)
      return this.setNext("block-start");
    if ((e === "-" || e === "?" || e === ":") && ie(t)) {
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
        return yield* this.pushUntil(Ct), "doc";
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
    if ((s !== -1 && s < this.indentNext && i[0] !== "#" || s === 0 && (i.startsWith("---") || i.startsWith("...")) && ie(i[3])) && !(s === this.indentNext - 1 && this.flowLevel === 1 && (i[0] === "]" || i[0] === "}")))
      return this.flowLevel = 0, yield ys, yield* this.parseLineStart();
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
        return yield* this.pushUntil(Ct), "flow";
      case '"':
      case "'":
        return this.flowKey = !0, yield* this.parseQuotedScalar();
      case ":": {
        const o = this.charAt(1);
        if (this.flowKey || ie(o) || o === ",")
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
    return yield* this.pushUntil((t) => ie(t) || t === "#");
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
    return yield Kt, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let t = this.pos - 1, s = this.pos - 1, i;
    for (; i = this.buffer[++s]; )
      if (i === ":") {
        const r = this.buffer[s + 1];
        if (ie(r) || e && nt.has(r))
          break;
        t = s;
      } else if (ie(i)) {
        let r = this.buffer[s + 1];
        if (i === "\r" && (r === `
` ? (s += 1, i = `
`, r = this.buffer[s + 1]) : t = s), r === "#" || e && nt.has(r))
          break;
        if (i === `
`) {
          const o = this.continueScalar(s + 1);
          if (o === -1)
            break;
          s = Math.max(s, o - 2);
        }
      } else {
        if (e && nt.has(i))
          break;
        t = s;
      }
    return !i && !this.atEnd ? this.setNext("plain-scalar") : (yield Kt, yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
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
          e += yield* this.pushUntil(Ct), e += yield* this.pushSpaces(!0);
          continue e;
        case "-":
        // this is an error
        case "?":
        // this is an error outside flow collections
        case ":": {
          const t = this.flowLevel > 0, s = this.charAt(1);
          if (ie(s) || t && nt.has(s)) {
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
      for (; !ie(t) && t !== ">"; )
        t = this.buffer[++e];
      return yield* this.pushToIndex(t === ">" ? e + 1 : e, !1);
    } else {
      let e = this.pos + 1, t = this.buffer[e];
      for (; t; )
        if (Ui.has(t))
          t = this.buffer[++e];
        else if (t === "%" && bn.has(this.buffer[e + 1]) && bn.has(this.buffer[e + 2]))
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
class zi {
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
function fe(n, e) {
  for (let t = 0; t < n.length; ++t)
    if (n[t].type === e)
      return !0;
  return !1;
}
function kn(n) {
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
function ws(n) {
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
function st(n) {
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
function Le(n) {
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
function ut(n, e) {
  if (e.length < 1e5)
    Array.prototype.push.apply(n, e);
  else
    for (let t = 0; t < e.length; ++t)
      n.push(e[t]);
}
function $n(n) {
  if (n.start.type === "flow-seq-start")
    for (const e of n.items)
      e.sep && !e.value && !fe(e.start, "explicit-key-ind") && !fe(e.sep, "map-value-ind") && (e.key && (e.value = e.key), delete e.key, ws(e.value) ? e.value.end ? ut(e.value.end, e.sep) : e.value.end = e.sep : ut(e.start, e.sep), delete e.sep);
}
class Yi {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(e) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new Gi(), this.onNewLine = e;
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
    const t = Vi(e);
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
      switch (t.type === "block-scalar" ? t.indent = "indent" in s ? s.indent : 0 : t.type === "flow-collection" && s.type === "document" && (t.indent = 0), t.type === "flow-collection" && $n(t), s.type) {
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
        i && !i.sep && !i.value && i.start.length > 0 && kn(i.start) === -1 && (t.indent === 0 || i.start.every((r) => r.type !== "comment" || r.indent < t.indent)) && (s.type === "document" ? s.end = i.start : s.items.push({ start: i.start }), t.items.splice(-1, 1));
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
        kn(e.start) !== -1 ? (yield* this.pop(), yield* this.step()) : e.start.push(this.sourceToken);
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
      const t = st(this.peek(2)), s = Le(t);
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
              ut(i, t.start), i.push(this.sourceToken), e.items.pop();
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
              else if (fe(t.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: r, key: null, sep: [this.sourceToken] }]
                });
              else if (ws(t.key) && !fe(t.sep, "newline")) {
                const o = Le(t.start), a = t.key, c = t.sep;
                c.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: a, sep: c }]
                });
              } else r.length > 0 ? t.sep = t.sep.concat(r, this.sourceToken) : t.sep.push(this.sourceToken);
            else if (fe(t.start, "newline"))
              Object.assign(t, { key: null, sep: [this.sourceToken] });
            else {
              const o = Le(t.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: o, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            t.sep ? t.value || i ? e.items.push({ start: r, key: null, sep: [this.sourceToken] }) : fe(t.sep, "map-value-ind") ? this.stack.push({
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
              if (!t.explicitKey && t.sep && !fe(t.sep, "newline")) {
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
              ut(i, t.start), i.push(this.sourceToken), e.items.pop();
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
        t.value || fe(t.start, "seq-item-ind") ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
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
        const i = st(s), r = Le(i);
        $n(e);
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
        const t = st(e), s = Le(t);
        return s.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const t = st(e), s = Le(t);
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
function Wi(n) {
  const e = n.prettyErrors !== !1;
  return { lineCounter: n.lineCounter || e && new zi() || null, prettyErrors: e };
}
function Ji(n, e = {}) {
  const { lineCounter: t, prettyErrors: s } = Wi(e), i = new Yi(t?.addNewLine), r = new qi(e);
  let o = null;
  for (const a of r.compose(i.parse(n), !0, n.length))
    if (!o)
      o = a;
    else if (o.options.logLevel !== "silent") {
      o.errors.push(new Ke(a.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return s && t && (o.errors.forEach(gn(n, t)), o.warnings.forEach(gn(n, t))), o;
}
const Z = {
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
}, Rt = {
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
}, Xi = {
  cast: { asset: "asset" },
  appearance: { hairStyle: "hairStyle", outfit: "outfit" },
  actor: { expression: "expression", gesture: "gesture", holding: "prop" },
  panel: { mode: "mode" },
  transfer: { prop: "prop" },
  diagram: { type: "diagramType" },
  options: { panelFormat: "panelFormat" }
};
function at(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function ue(n, e, t, s) {
  if (!at(n)) return n;
  const i = Z[e], r = /* @__PURE__ */ Object.create(null);
  for (const [o, a] of Object.entries(n)) {
    const c = Object.keys(i).find(
      (p) => o === p || o === i[p]
    ) ?? o;
    Object.hasOwn(i, c) && i[c];
    const l = c;
    if (Object.hasOwn(r, l))
      throw new Error(
        `${s}: '${i[c]}'와 '${c}'은 같은 항목입니다. 하나만 작성하세요.`
      );
    let f = a;
    const u = Xi[e], d = u && Object.hasOwn(u, c) ? u[c] : void 0;
    if (d && typeof a == "string") {
      const p = Rt[d], g = Object.keys(p).find(
        (h) => a === h || a === p[h]
      );
      g && (f = g);
    }
    if (e === "comic" && c === "cast" && at(a)) {
      const p = /* @__PURE__ */ Object.create(null);
      for (const [g, h] of Object.entries(a))
        p[g] = ue(h, "cast", t, `${s}.등장인물.${g}`);
      f = p;
    } else if (e === "comic" && c === "personas" && at(a)) {
      const p = /* @__PURE__ */ Object.create(null);
      for (const [g, h] of Object.entries(a))
        p[g] = ue(
          h,
          "persona",
          t,
          `${s}.페르소나.${g}`
        );
      f = p;
    } else if (e === "cast" && c === "persona")
      f = ue(a, "persona", t, `${s}.페르소나`);
    else if (e === "cast" && c === "appearance")
      f = ue(a, "appearance", t, `${s}.외형`);
    else if (e === "panel" && c === "diagram")
      f = ue(a, "diagram", t, `${s}.다이어그램`);
    else if (Array.isArray(a)) {
      const p = e === "comic" && c === "panels" ? "panel" : e === "panel" && c === "actors" ? "actor" : e === "panel" && c === "dialogue" ? "dialogue" : e === "panel" && c === "transfer" ? "transfer" : void 0;
      p && (f = a.map(
        (g, h) => ue(
          g,
          p,
          t,
          `${s}.${i[c]}[${h + 1}]`
        )
      ));
    }
    r[l] = f;
  }
  return r;
}
const Zi = (n) => ue(n, "comic", !1, "만화");
function er(n) {
  const e = ue(n, "options", !1, "표시 설정");
  if (!at(e)) throw new Error("표시 설정: 객체가 필요합니다.");
  for (const t of Object.keys(e))
    if (!Object.hasOwn(Z.options, t))
      throw new Error(`표시 설정: 알 수 없는 항목 '${t}'.`);
  return e;
}
function Ve(n, e) {
  if (!n || typeof n != "object" || Array.isArray(n))
    throw new Error(`${e}: 객체가 필요합니다.`);
  return n;
}
function le(n, e, t = 1e4) {
  if (typeof n != "string" || !n.trim())
    throw new Error(`${e}: 비어 있지 않은 문자열이 필요합니다.`);
  if (n.length > t)
    throw new Error(
      `${e}: 텍스트가 너무 깁니다. ${t}자 이내로 작성하세요.`
    );
  return n;
}
function cn(n, e, t) {
  for (const s of Object.keys(n))
    if (!Object.hasOwn(e, s))
      throw new Error(`${t}: 알 수 없는 항목 '${s}'.`);
}
function Sn(n, e) {
  const t = Ve(n, e);
  cn(t, Z.persona, e);
  const s = {};
  if (t.role !== void 0 && (s.role = le(t.role, `${e}.직무`, 100)), t.personality !== void 0 && (s.personality = le(t.personality, `${e}.성격`, 300)), t.speechStyle !== void 0 && (s.speechStyle = le(t.speechStyle, `${e}.말투`, 300)), !Object.keys(s).length)
    throw new Error(`${e}: 직무·성격·말투 중 하나 이상 작성하세요.`);
  return s;
}
function It(n, e, t) {
  if (n === void 0) return e;
  const s = le(n, t, 7);
  if (s.length !== 4 && s.length !== 7 || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(s))
    throw new Error(`${t}: #RGB 또는 #RRGGBB 색상을 작성하세요.`);
  return s;
}
function vn(n, e, t, s) {
  if (n === void 0) return t;
  const i = le(n, s);
  if (!Object.hasOwn(e, i))
    throw new Error(
      `${s}: ${Object.values(e).join(", ")} 중 하나를 선택하세요.`
    );
  return i;
}
function tr(n, e) {
  const t = n === void 0 ? {} : Ve(n, e);
  if (cn(t, Z.appearance, e), t.glasses !== void 0 && typeof t.glasses != "boolean")
    throw new Error(`${e}.안경: true 또는 false가 필요합니다.`);
  return {
    skinColor: It(
      t.skinColor,
      we.skinColor,
      `${e}.피부색`
    ),
    hairStyle: vn(
      t.hairStyle,
      Rt.hairStyle,
      we.hairStyle,
      `${e}.머리모양`
    ),
    hairColor: It(
      t.hairColor,
      we.hairColor,
      `${e}.머리색`
    ),
    outfit: vn(
      t.outfit,
      Rt.outfit,
      we.outfit,
      `${e}.옷`
    ),
    outfitColor: It(
      t.outfitColor,
      we.outfitColor,
      `${e}.옷색`
    ),
    glasses: t.glasses === void 0 ? we.glasses : t.glasses
  };
}
function nr(n, e) {
  const t = /* @__PURE__ */ Object.create(null);
  if (e !== void 0)
    for (const [i, r] of Object.entries(
      Ve(e, "페르소나")
    ))
      le(i, "페르소나 식별자"), t[i] = Sn(r, `페르소나.${i}`);
  const s = /* @__PURE__ */ Object.create(null);
  for (const [i, r] of Object.entries(Ve(n, "등장인물"))) {
    const o = `등장인물.${i}`, a = Ve(r, o);
    cn(a, Z.cast, o);
    const c = le(a.asset, `${o}.그림`);
    if (!Object.hasOwn(jn, c))
      throw new Error(`${o}: 없는 에셋 '${c}'.`);
    let l;
    if (a.persona !== void 0)
      if (typeof a.persona == "string") {
        const f = le(a.persona, `${o}.페르소나`);
        if (!Object.hasOwn(t, f))
          throw new Error(`${o}.페르소나: 없는 페르소나 '${f}'.`);
        l = { ...t[f] };
      } else l = Sn(a.persona, `${o}.페르소나`);
    if (c !== "human" && a.appearance !== void 0)
      throw new Error(`${o}.외형: 사람 그림에서만 사용할 수 있습니다.`);
    s[i] = {
      asset: c,
      label: a.label === void 0 ? i : le(a.label, `${o}.이름표`),
      ...c === "human" ? { appearance: tr(a.appearance, `${o}.외형`) } : {},
      ...l ? { persona: l } : {}
    };
  }
  return { cast: s, ...e !== void 0 ? { personas: t } : {} };
}
function pe(n, e) {
  if (!n || typeof n != "object" || Array.isArray(n))
    throw new Error(`${e}: 객체가 필요합니다.`);
  return n;
}
function Y(n, e, t = 1e4) {
  if (typeof n != "string" || !n.trim())
    throw new Error(`${e}: 비어 있지 않은 문자열이 필요합니다.`);
  if (n.length > t)
    throw new Error(
      `${e}: 텍스트가 너무 깁니다. ${t}자 이내로 작성하세요.`
    );
  return n;
}
function xe(n, e) {
  if (!Array.isArray(n)) throw new Error(`${e}: 목록이 필요합니다.`);
  return n;
}
function me(n, e, t) {
  for (const s of Object.keys(n))
    if (!e.includes(s))
      throw new Error(`${t}: 알 수 없는 항목 '${s}'.`);
}
function ge(n, e, t, s) {
  if (n !== void 0) {
    if (typeof n != "number" || !Number.isFinite(n) || n < e || n > t)
      throw new Error(`${s}: ${e}~${t} 사이 숫자가 필요합니다.`);
    return n;
  }
}
function sr(n) {
  if (n.length > 1e5)
    throw new Error("코드가 너무 깁니다. 100KB 이내로 작성하세요.");
  const e = Ji(n, { uniqueKeys: !0 });
  if (e.errors.length) throw new Error(e.errors[0].message);
  const t = pe(Zi(e.toJS({ maxAliasCount: 20 })), "만화");
  me(t, Object.keys(Z.comic), "만화");
  const { cast: s, personas: i } = nr(t.cast, t.personas);
  let r;
  const o = xe(t.panels, "컷").map((a, c) => {
    const l = `컷 ${c + 1}`, f = { ...pe(a, l) };
    if (me(f, Object.keys(Z.panel), l), f.mode !== void 0 && f.mode !== "before" && f.mode !== "full")
      throw new Error(`${l}: 구성은 전체 또는 이전이어야 합니다.`);
    if (f.mode === "before") {
      if (!r)
        throw new Error(`${l}: 첫 컷에서는 이전 구성을 사용할 수 없습니다.`);
      const h = r.actors.map(
        ($) => ({ ...$ })
      ), m = xe(f.removeActors ?? [], `${l}.제외인물`).map(
        ($) => Y($, `${l}.제외인물`)
      );
      for (const $ of m)
        if (!h.some((L) => L.id === $))
          throw new Error(`${l}: 제거할 인물 '${$}'가 이전 컷에 없습니다.`);
      const b = h.filter(
        ($) => !m.some((L) => L === $.id)
      ), v = xe(f.actors ?? [], `${l}.인물`), k = /* @__PURE__ */ new Set();
      for (const $ of v) {
        const L = typeof $ == "string" ? { id: $ } : pe($, `${l}.인물`);
        me(L, Object.keys(Z.actor), `${l}.인물`);
        const x = Y(L.id, `${l}.인물.식별자`);
        if (k.has(x))
          throw new Error(`${l}: 캐릭터 식별자가 중복됩니다.`);
        k.add(x);
        const y = b.findIndex((N) => N.id === x), w = {
          ...y < 0 ? {} : b[y],
          ...L
        };
        for (const [N, M] of Object.entries(L))
          N !== "id" && M === null && delete w[N];
        y < 0 ? b.push(w) : b[y] = w;
      }
      f.actors = f.actors !== void 0 && v.length === 0 ? [] : b;
    } else if (f.removeActors !== void 0)
      throw new Error(`${l}: 제외인물은 이전 구성에서만 사용할 수 있습니다.`);
    const u = xe(f.actors, `${l}.인물`).map((h) => {
      const m = typeof h == "string" ? { id: h } : pe(h, `${l}.인물`);
      me(m, Object.keys(Z.actor), `${l}.인물`);
      const b = Y(m.id, `${l}.인물.식별자`), v = m.expression === void 0 ? "neutral" : Y(m.expression, `${l}.${b}.표정`);
      if (!Object.hasOwn(s, b))
        throw new Error(`${l}: 없는 캐릭터 '${b}'.`);
      if (!Object.hasOwn(Bn, v))
        throw new Error(`${l}.${b}: 없는 표정 '${v}'.`);
      const k = m.gesture === void 0 ? void 0 : Y(m.gesture, `${l}.${b}.손모양`), $ = m.holding === void 0 ? void 0 : Y(m.holding, `${l}.${b}.든소품`);
      if (k && !Qs.includes(k))
        throw new Error(`${l}.${b}: 없는 손 제스처 '${k}'.`);
      if ($ && !Object.hasOwn(lt, $))
        throw new Error(`${l}.${b}: 없는 소품 '${$}'.`);
      return {
        id: b,
        expression: v,
        gesture: k,
        holding: $,
        x: ge(m.x, 0, 1, `${l}.${b}.가로위치`),
        y: ge(m.y, 0, 1, `${l}.${b}.세로위치`),
        scale: ge(m.scale, 0.5, 1.25, `${l}.${b}.배율`) ?? 1
      };
    });
    if (u.length < 1 || u.length > 3)
      throw new Error(`${l}: 캐릭터는 1~3명이어야 합니다.`);
    if (new Set(u.map((h) => h.id)).size !== u.length)
      throw new Error(`${l}: 캐릭터 식별자가 중복됩니다.`);
    const d = xe(f.dialogue ?? [], `${l}.대사`).map(
      (h) => {
        const m = pe(h, `${l}.대사`);
        me(m, Object.keys(Z.dialogue), `${l}.대사`);
        const b = Y(m.from, `${l}.대사.화자`), v = m.to === void 0 ? void 0 : Y(m.to, `${l}.대사.상대`);
        if (!u.some((k) => k.id === b))
          throw new Error(`${l}: 화자 '${b}'가 컷에 없습니다.`);
        if (v && !u.some((k) => k.id === v))
          throw new Error(`${l}: 대화 상대 '${v}'가 컷에 없습니다.`);
        return {
          from: b,
          to: v,
          text: Y(m.text, `${l}.대사.내용`),
          x: ge(m.x, 0, 1, `${l}.대사.가로위치`),
          y: ge(m.y, 0, 1, `${l}.대사.세로위치`),
          fontSize: ge(m.fontSize, 12, 32, `${l}.대사.글자크기`) ?? 18
        };
      }
    );
    if (d.length > 20)
      throw new Error(`${l}: 대사는 20개 이내로 작성하세요.`);
    const p = xe(f.transfer ?? [], `${l}.전달`).map(
      (h) => {
        const m = pe(h, `${l}.전달`);
        me(m, Object.keys(Z.transfer), `${l}.전달`);
        const b = Y(m.from, `${l}.전달.주는인물`), v = Y(m.to, `${l}.전달.받는인물`), k = Y(m.prop, `${l}.전달.소품`);
        if (!u.some(($) => $.id === b))
          throw new Error(`${l}: 전달 주체 '${b}'가 컷에 없습니다.`);
        if (!u.some(($) => $.id === v))
          throw new Error(`${l}: 전달 대상 '${v}'가 컷에 없습니다.`);
        if (b === v)
          throw new Error(`${l}: 전달 주체와 대상은 달라야 합니다.`);
        if (!Object.hasOwn(lt, k))
          throw new Error(`${l}: 없는 소품 '${k}'.`);
        return { from: b, to: v, prop: k };
      }
    );
    if (p.length > 6)
      throw new Error(`${l}: 소품 전달은 6개 이내로 작성하세요.`);
    let g;
    if (f.diagram !== void 0 && f.diagram !== null) {
      const h = `${l}.다이어그램`, m = pe(f.diagram, h);
      if (me(m, Object.keys(Z.diagram), h), m.type !== "mermaid")
        throw new Error(`${h}.종류: 머메이드여야 합니다.`);
      g = {
        type: "mermaid",
        source: Y(m.source, `${h}.원문`, 2e4),
        title: m.title === void 0 ? "다이어그램" : Y(m.title, `${h}.제목`, 100),
        height: ge(m.height, 160, 1200, `${h}.높이`)
      };
    }
    return r = { actors: u, dialogue: d, transfer: p, ...g ? { diagram: g } : {} }, r;
  });
  if (o.length < 1 || o.length > 30)
    throw new Error("컷은 1~30개여야 합니다.");
  return {
    title: t.title === void 0 ? "Comic Gen" : Y(t.title, "제목"),
    cast: s,
    panels: o,
    ...i ? { personas: i } : {}
  };
}
const ir = "M-10 4Q-12 -3 -17 -9L-23 -22Q-26 -27 -22 -30Q-18 -33 -15 -28L-10 -21L-15 -35Q-16 -40 -12 -42Q-8 -44 -6 -38L-2 -28L-4 -43Q-4 -48 0 -48Q4 -48 4 -43L6 -28L8 -38Q9 -43 13 -42Q17 -41 16 -37L14 -22Q14 -16 18 -19L22 -24Q25 -27 28 -24Q31 -21 27 -17L19 -5Q15 2 8 4L7 7Z", rr = "M-5 -7H-20Q-24 -7 -24 -3Q-24 1 -20 1H-8Q-11 4 -8 7L-5 10Q-2 13 3 11L9 8Q12 6 11 1L10 -6Q9 -11 5 -12L0 -14Q-4 -15 -6 -12Q-8 -9 -5 -7Z", or = "M-8 -5Q-8 -10 -2 -10H5Q10 -9 10 -4V4Q10 9 4 10H-3Q-9 9 -10 3Z";
function qt(n, e, t) {
  const s = !!n.sleeve, i = s ? {
    wave: "M-47 42Q-61 45 -65 34Q-72 19 -70 -8L-63 -9Q-64 17 -58 28Q-55 35 -42 36Z",
    point: "M-47 43Q-60 39 -68 25L-62 20Q-55 31 -40 35Z",
    grip: "M42 36Q56 36 61 17L67 20Q63 44 47 44Z"
  } : {
    wave: "M-48 20Q-62 24 -66 13Q-71 2 -70 -8L-63 -9Q-63 4 -60 11Q-57 18 -47 15Z",
    point: "M-47 17Q-57 16 -68 17L-68 24Q-55 24 -47 23Z",
    grip: "M46 17Q54 13 62 16L63 23Q54 20 47 23Z"
  }, r = (t === "grip" ? e === "left" : e === "right") ? ' transform="scale(-1 1)"' : "", o = n.longSleeve ? n.sleeve : n.skin;
  return `<g data-arm="${e}"${s ? ` data-human-part="arm-${e}"` : ""}${r} stroke-linejoin="round"><path d="${i[t]}" fill="${o}" stroke-width="2.6"/></g>`;
}
function ar(n, e) {
  return n === "wave" ? {
    back: qt(e, "left", "wave"),
    front: `<g data-gesture="wave"><g data-hand="wave" data-side="left" stroke-linejoin="round"><path data-wave-motion="true" d="M-90 -46Q-90 -59 -81 -64M-40 -41Q-36 -32 -41 -25" fill="none" stroke="#586c8c" stroke-width="2.5"/><g data-palm="wave" transform="translate(-66 -8) rotate(-8) scale(.82)"><path d="${ir}" fill="${e.skin}" stroke-width="2.6"/><path d="M10 -12Q5 -15 1 -9" fill="none" stroke-width="1.6"/></g></g></g>`,
    port: { x: -66, y: -22 }
  } : {
    back: qt(e, "left", "point"),
    front: `<g data-gesture="point"><g data-hand="point" data-side="left" transform="translate(-64 20)" stroke-linejoin="round"><path data-palm="point" d="${rr}" fill="${e.skin}" stroke-width="2.6"/><path d="M-3 -6Q1 -3 6 -4M1 5L7 3" fill="none" stroke-width="1.6"/></g></g>`,
    port: { x: -66, y: 20 }
  };
}
function En(n, e, t, s = "") {
  const i = n === "left" ? -62 : 62, r = n === "left" ? ' transform="scale(-1 1)"' : "";
  return {
    back: qt(e, n, "grip"),
    front: `<g data-hand="${t}" data-side="${n}" transform="translate(${i} 20)" stroke-linejoin="round"><g${r}><path data-palm="grip" d="${or}" fill="${e.skin}" stroke-width="2.6"/>${s ? `<g transform="translate(7.5 -14)">${s}</g>` : ""}<path d="M-7 -4Q-4 -8 0 -5L5 -1Q6 2 2 3L-4 1Q-8 0 -7 -4Z" fill="${e.skin}" stroke-width="2"/><path d="M1 6H6" fill="none" stroke-width="1.5"/></g></g>`,
    port: { x: i, y: 20 }
  };
}
const ye = (n, e, t) => Math.max(e, Math.min(t, n));
function jt(n, e, t, s) {
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
function bs(n, e, t, s, i = "compact", r) {
  const o = Math.min(t - 80, 390), a = document.createElement("canvas").getContext("2d"), c = n.dialogue.map((y) => {
    const w = jt(y.text, o - 36, y.fontSize, s);
    return a.font = `${y.fontSize}px ${s}`, {
      line: y,
      lines: w,
      width: ye(
        Math.max(...w.map((N) => a.measureText(N).width)) + 36,
        110,
        o
      ),
      lineHeight: Math.ceil(y.fontSize * 1.45)
    };
  }), l = c.reduce(
    (y, w) => y + 60 + w.lines.length * w.lineHeight,
    20
  ), f = 92, u = (t - 72) / n.actors.length, d = Math.min(
    1,
    (u - 12) / (2 * f * Math.max(...n.actors.map((y) => y.scale)))
  ), p = n.actors.map((y) => y.scale * d), g = l + Math.max(204, Math.ceil(196 * Math.max(...p))), h = n.actors.map(
    (y, w) => ye(
      36 + (t - 72) * (y.x ?? (w + 0.5) / n.actors.length),
      26 + f * p[w],
      t - 26 - f * p[w]
    )
  ), m = n.actors.map(
    (y, w) => ye(
      y.y === void 0 ? g - 126 : y.y * g,
      l + 70 * p[w],
      g - 126 * p[w]
    )
  );
  for (let y = 0; y < n.actors.length; y++)
    for (let w = y + 1; w < n.actors.length; w++)
      if (Math.abs(h[y] - h[w]) < f * (p[y] + p[w]) && Math.abs(m[y] - m[w]) < 120 * Math.max(p[y], p[w]))
        throw new Error(
          `캐릭터 '${n.actors[y].id}'와 '${n.actors[w].id}'가 겹칩니다. 가로위치·세로위치 또는 배율을 조정하세요.`
        );
  const b = [
    `<rect x="20" y="0" width="${t - 40}" height="${g}" rx="18" fill="white" stroke="#c8d2df" stroke-width="1.6"/>`
  ];
  let v = 20;
  c.forEach(({ line: y, lines: w, lineHeight: N, width: M }) => {
    const P = h[n.actors.findIndex((T) => T.id === y.from)], O = ye(
      (y.x === void 0 ? P : y.x * t) - M / 2,
      40,
      t - M - 40
    ), Q = 28 + w.length * N, S = y.y === void 0 ? v : ye(y.y * g, 20, l - Q), B = Math.max(O + 24, Math.min(O + M - 24, P)), C = O + M, I = S + Q, D = n.actors.findIndex(
      (T) => T.id === y.from
    ), U = Math.min(
      I + 24,
      m[D] - 65 * p[D]
    ), G = ye(P, B - 18, B + 18), F = `M${O + 14} ${S}H${C - 14}Q${C} ${S} ${C} ${S + 14}V${I - 14}Q${C} ${I} ${C - 14} ${I}H${B + 9}L${G} ${U}L${B - 9} ${I}H${O + 14}Q${O} ${I} ${O} ${I - 14}V${S + 14}Q${O} ${S} ${O + 14} ${S}Z`;
    b.push(
      `<g data-dialogue="${X(y.from)}" data-to="${X(y.to ?? "")}"><path d="${F}" fill="#fffaf0" stroke="#303341" stroke-width="2" stroke-linejoin="round"/><text x="${O + 18}" y="${S + 18 + y.fontSize}" font-size="${y.fontSize}">${w.map((T, z) => `<tspan x="${O + 18}" dy="${z ? N : 0}">${X(T)}</tspan>`).join("")}</text></g>`
    ), v += Q + 32;
  });
  const k = [];
  n.actors.forEach((y, w) => {
    const N = e[y.id], M = Fs(N), O = N.asset === "human" ? M.color : "white", Q = new Set(
      n.transfer.flatMap((T) => {
        const z = T.from === y.id ? T.to : T.to === y.id ? T.from : void 0;
        if (!z) return [];
        const se = n.actors.findIndex(
          (E) => E.id === z
        );
        return [
          h[se] < h[w] || h[se] === h[w] && se < w ? "left" : "right"
        ];
      })
    ), S = M.restingHands ? (y.gesture || Q.has("left") ? "" : M.restingHands.left) + (y.holding || Q.has("right") ? "" : M.restingHands.right) : "", B = n.dialogue.find(
      (T) => T.from === y.id && T.to
    )?.to, C = n.actors.findIndex((T) => T.id === B), I = C < 0 ? 0 : Math.sign(h[C] - h[w]) * 4, D = jt(
      N.label,
      (t - 72) / n.actors.length - 12,
      16,
      s
    );
    if (D.length > 2)
      throw new Error(`캐릭터 '${y.id}'의 이름표가 너무 깁니다.`);
    const U = {
      skin: O,
      sleeve: M.sleeveColor,
      longSleeve: M.longSleeve
    }, G = [], F = {};
    if (y.gesture) {
      const T = ar(y.gesture, U);
      G.push(T), F.left = T.port;
    }
    if (y.holding) {
      const T = En(
        "right",
        U,
        "holding",
        `<g data-prop="${y.holding}">${lt[y.holding]}</g>`
      );
      G.push({
        ...T,
        front: `<g data-holding="${y.holding}">${T.front}</g>`
      }), F.right = T.port;
    }
    for (const T of Q) {
      if (F[T]) continue;
      const z = n.transfer.find((E) => {
        const j = E.from === y.id ? E.to : E.to === y.id ? E.from : void 0;
        if (!j) return !1;
        const _ = n.actors.findIndex(
          (H) => H.id === j
        );
        return T === (h[_] < h[w] || h[_] === h[w] && _ < w ? "left" : "right");
      }), se = En(
        T,
        U,
        z.from === y.id ? "transfer" : "receive"
      );
      G.push(se), F[T] = se.port;
    }
    k.push(F), b.push(
      `<g data-character="${X(y.id)}" transform="translate(${h[w]} ${m[w]}) scale(${p[w]})" stroke="#303341" stroke-width="2.8" stroke-linecap="round"><ellipse cy="69" rx="51" ry="7" fill="#e8edf3" stroke="none"/>${G.map((T) => T.back).join("")}${M.body}<g data-face="${y.expression}" transform="translate(${I} ${M.faceY})" fill="#303341">${Bn[y.expression]}</g>${S}${G.map((T) => T.front).join("")}<text y="94" text-anchor="middle" stroke="none" fill="#303341" font-size="16">${D.map((T, z) => `<tspan x="0" dy="${z ? 18 : 0}">${X(T)}</tspan>`).join("")}</text></g>`
    );
  });
  const $ = [];
  n.transfer.forEach((y, w) => {
    const N = n.actors.findIndex(
      (F) => F.id === y.from
    ), M = n.actors.findIndex((F) => F.id === y.to), P = h[N], O = h[M], Q = Math.sign(O - P) || Math.sign(M - N), S = k[N][Q > 0 ? "right" : "left"], B = k[M][Q > 0 ? "left" : "right"], C = P + S.x * p[N], I = O + B.x * p[M], D = m[N] + S.y * p[N], U = m[M] + B.y * p[M], G = Math.atan2(U - D, I - C) * 180 / Math.PI;
    $.push(
      `<g data-transfer="${X(y.from)}" data-to="${X(y.to)}" stroke="#586c8c" stroke-width="2.5"><path data-transfer-link="true" d="M${C} ${D}L${I} ${U}" fill="none"/><path transform="translate(${I} ${U}) rotate(${G})" d="M-16 -5L-8 0L-16 5" fill="none"/><g data-prop="${y.prop}" transform="translate(${(C + I) / 2} ${(D + U) / 2 - 16 - w * 12})">${lt[y.prop]}</g></g>`
    );
  }), b.splice(1, 0, ...$);
  let L = b.slice(1).join(""), x = g;
  if (r && n.diagram) {
    const y = t - 80, w = y - 32, N = n.diagram.height ?? ye(w * r.height / r.width + 58, 180, 1200), M = N - 58, P = Math.min(
      w / r.width,
      M / r.height
    ), O = 56 + (w - r.width * P) / 2, Q = 66 + (M - r.height * P) / 2;
    if (jt(n.diagram.title, w, 16, s).length > 1)
      throw new Error(
        "다이어그램 제목이 너무 깁니다. 제목이나 너비를 조정하세요."
      );
    L = `<g data-diagram="mermaid"><rect x="40" y="20" width="${y}" height="${N}" rx="10" fill="#f3f7fc" stroke="#8093ab" stroke-width="2"/><text x="56" y="48" font-size="16" font-weight="700">${X(n.diagram.title)}</text><g data-diagram-content="mermaid" transform="translate(${O} ${Q}) scale(${P})">${r.svg}</g></g><g data-scene="true" transform="translate(0 ${N + 40})">${L}</g>`, x += N + 40;
  }
  if (i === "phone") {
    const y = x * 2 + 92;
    return {
      markup: `<rect x="20" y="0" width="${t - 40}" height="${y}" rx="18" fill="white" stroke="#c8d2df" stroke-width="1.6"/><g transform="translate(0 ${(y - x) / 2})">${L}</g>`,
      height: y
    };
  }
  return r ? {
    markup: `<rect x="20" y="0" width="${t - 40}" height="${x}" rx="18" fill="white" stroke="#c8d2df" stroke-width="1.6"/>${L}`,
    height: x
  } : { markup: b.join(""), height: g };
}
const lr = "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.6.0/cdn/comic-gen.mermaid.js", Vt = 2e4, cr = "http://www.w3.org/2000/svg", fr = Math.random().toString(36).slice(2);
let ur = 0, Ln = Promise.resolve();
const vt = [
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
], hr = new Set(vt), dr = /* @__PURE__ */ new Set([
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
]), pr = /* @__PURE__ */ new Set([
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
  ...vt
]);
function mr(n) {
  if (!n.trim() || n.length > Vt)
    throw new Error(`Mermaid 원문은 1~${Vt}자여야 합니다.`);
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
function gr(n) {
  if (typeof n != "string" || !n.trim() || n.length > 300 || /[^\p{L}\p{N}\s,'"_\-]/u.test(n))
    throw new Error("다이어그램에 사용할 올바른 글꼴 이름이 필요합니다.");
  return n;
}
async function yr(n) {
  const e = document.createElement("iframe");
  e.title = "Mermaid 렌더링", e.tabIndex = -1, e.setAttribute("aria-hidden", "true"), e.style.cssText = "all:initial!important;display:block!important;width:20000px!important;height:20000px!important;border:0!important;", n.append(e);
  const t = e.contentDocument, s = e.contentWindow;
  if (!t?.body || !s)
    throw e.remove(), new Error("Mermaid 격리 문서를 만들지 못했습니다.");
  const i = t.createElement("script");
  i.type = "module", i.src = lr;
  try {
    return { api: await new Promise((o, a) => {
      const c = window.setTimeout(() => {
        l(), a(new Error("Mermaid 모듈을 불러오는 시간이 초과되었습니다."));
      }, 3e4), l = () => {
        window.clearTimeout(c), i.onload = null, i.onerror = null, s.removeEventListener("comic-gen-mermaid-ready", f), s.removeEventListener("comic-gen-mermaid-error", u);
      }, f = () => {
        l();
        const d = s.__comicGenMermaid;
        typeof d?.initialize != "function" || typeof d?.render != "function" ? a(new Error("Mermaid 모듈을 불러오지 못했습니다.")) : o(d);
      }, u = () => {
        l(), a(new Error("Mermaid 모듈을 불러오지 못했습니다."));
      };
      s.addEventListener("comic-gen-mermaid-ready", f), s.addEventListener("comic-gen-mermaid-error", u), i.onload = () => {
        s.__comicGenMermaid && f();
      }, i.onerror = u, t.head.append(i);
    }), document: t, dispose: () => e.remove() };
  } catch (r) {
    throw e.remove(), r;
  }
}
function ks(n) {
  const e = new DOMParser().parseFromString(n, "image/svg+xml");
  if (e.querySelector("parsererror") || e.documentElement.localName !== "svg")
    throw new Error("Mermaid가 올바른 SVG를 만들지 못했습니다.");
  return e.documentElement;
}
function ht(n, e, t = !1) {
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
function $s(n, e) {
  const t = document.createElement("span").style;
  for (const s of vt) {
    const i = ht(n.getPropertyValue(s), e);
    i && t.setProperty(s, i, n.getPropertyPriority(s));
  }
  return n.getPropertyValue("display") === "none" && (t.display = "none"), t.cssText;
}
function wr(n) {
  const e = [];
  let t = 0, s = 0, i = "";
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    i ? o === i && n[r - 1] !== "\\" && (i = "") : o === "'" || o === '"' ? i = o : o === "(" || o === "[" ? s++ : o === ")" || o === "]" ? s-- : o === "," && s === 0 && (e.push(n.slice(t, r).trim()), t = r + 1);
  }
  return e.push(n.slice(t).trim()), e;
}
function br(n, e, t) {
  const s = new CSSStyleSheet();
  s.replaceSync(n);
  const i = [], r = `#${e}`;
  for (const o of s.cssRules) {
    if (!(o instanceof CSSStyleRule)) continue;
    if (!wr(o.selectorText).every(
      (l) => l === r || l.startsWith(r + " ") || l.startsWith(r + ">") || l.startsWith(r + ":")
    )) throw new Error("Mermaid SVG에 범위 밖 스타일이 있습니다.");
    const c = $s(o.style, t);
    c && i.push(`${o.selectorText}{${c}}`);
  }
  return i.join(`
`);
}
function kr(n) {
  if (n.length > 2e6)
    throw new Error("Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요.");
  const e = ks(n), t = [e, ...e.querySelectorAll("*")];
  if (t.length > 1e4)
    throw new Error(
      "Mermaid SVG 요소가 너무 많습니다. 다이어그램을 나누어 주세요."
    );
  const s = new Set(t.map((r) => r.id).filter(Boolean)), i = e.id;
  for (const r of t)
    for (const o of [...r.attributes])
      if (/url\s*\(/i.test(o.value)) {
        const a = ht(o.value, s, !0);
        a === void 0 ? r.removeAttributeNode(o) : r.setAttribute(o.name, a);
      }
  for (const r of t) {
    const o = r.localName.toLowerCase();
    if (r.namespaceURI !== cr || !dr.has(o) && o !== "style") {
      o === "a" ? r.replaceWith(...r.childNodes) : r.remove();
      continue;
    }
    if (o === "style") {
      r.textContent = br(r.textContent ?? "", i, s);
      continue;
    }
    for (const a of [...r.attributes]) {
      const c = a.name.toLowerCase(), l = a.value;
      if (!pr.has(c) && !c.startsWith("aria-") && !c.startsWith("data-"))
        r.removeAttributeNode(a);
      else if (c === "href" || c === "xlink:href")
        (!l.startsWith("#") || !s.has(l.slice(1))) && r.removeAttributeNode(a);
      else if (c === "style") {
        const f = document.createElement("span").style;
        f.cssText = l, r.setAttribute("style", $s(f, s));
      } else if (hr.has(c)) {
        const f = ht(l, s);
        f === void 0 ? r.removeAttributeNode(a) : r.setAttribute(a.name, f);
      }
    }
  }
  return e;
}
function $r(n) {
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
function Sr(n) {
  const e = (n.getAttribute("viewBox") ?? "").trim().split(/[\s,]+/).map(Number), t = e.length === 4 ? e[2] : Number.parseFloat(n.getAttribute("width") ?? ""), s = e.length === 4 ? e[3] : Number.parseFloat(n.getAttribute("height") ?? "");
  if (!Number.isFinite(t) || !Number.isFinite(s) || t <= 0 || s <= 0 || t > 2e4 || s > 2e4 || t * s > 16e7)
    throw new Error(
      "Mermaid 다이어그램 크기가 너무 큽니다. 다이어그램을 나누어 주세요."
    );
  return (e.length !== 4 || e.some((i) => !Number.isFinite(i))) && n.setAttribute("viewBox", `0 0 ${t} ${s}`), n.setAttribute("width", String(t)), n.setAttribute("height", String(s)), n.setAttribute("preserveAspectRatio", "xMidYMid meet"), { width: t, height: s };
}
async function vr(n, e) {
  if (typeof document > "u" || !document.body)
    throw new Error("Mermaid 렌더링에는 브라우저 문서가 필요합니다.");
  mr(n), e = gr(e);
  const t = Ln.then(async () => {
    await Promise.all([
      document.fonts.load(`18px ${e}`, n),
      document.fonts.load(`bold 18px ${e}`, n),
      document.fonts.load(`italic 18px ${e}`, n)
    ]), await document.fonts.ready;
    const s = `comic-gen-mermaid-${fr}-${++ur}`, i = document.createElement("div");
    i.dataset.comicDiagramTemporary = "", i.style.cssText = "all:initial!important;display:block!important;position:fixed!important;left:-100000px!important;top:0!important;width:20000px!important;pointer-events:none!important;opacity:0!important;";
    const r = [...document.fonts].filter(
      (l) => l.status === "loaded"
    );
    let o, a;
    const c = new MutationObserver(() => {
      const l = a?.querySelector("iframe"), f = l?.contentDocument;
      if (!(!l || !f)) {
        l.style.cssText = "all:initial!important;display:block!important;width:20000px!important;height:20000px!important;border:0!important;";
        for (const u of r) f.fonts.add(u);
      }
    });
    document.body.append(i);
    try {
      o = await yr(i);
      for (const k of r) o.document.fonts.add(k);
      a = o.document.createElement("div"), a.style.cssText = "width:20000px;", o.document.body.append(a), c.observe(a, { childList: !0, subtree: !0 });
      const l = o.api;
      l.initialize({
        startOnLoad: !1,
        securityLevel: "sandbox",
        suppressErrorRendering: !0,
        maxTextSize: Vt,
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
      const f = await l.render(s, n, a);
      c.disconnect();
      const u = kr($r(f.svg)), d = Sr(u), p = i.attachShadow({ mode: "closed" });
      p.append(document.importNode(u, !0));
      const g = p.firstElementChild, h = [g, ...g.querySelectorAll("*")], m = new Set(
        h.map((k) => k.id).filter(Boolean)
      ), b = h.map((k) => {
        if (k.localName === "style") return "";
        const $ = getComputedStyle(k), L = document.createElement("span").style;
        for (const x of vt) {
          const y = ht(
            $.getPropertyValue(x),
            m,
            !0
          );
          y && L.setProperty(x, y, "important");
        }
        return $.display === "none" && L.setProperty("display", "none", "important"), L.cssText;
      });
      h.forEach((k, $) => {
        k.localName === "style" ? k.remove() : (k.setAttribute("style", b[$]), k.removeAttribute("class"));
      }), g.style.removeProperty("visibility"), g.style.setProperty("width", `${d.width}px`, "important"), g.style.setProperty("height", `${d.height}px`, "important"), g.style.setProperty("max-width", "none", "important"), g.style.setProperty("max-height", "none", "important");
      const v = new XMLSerializer().serializeToString(g);
      if (v.length > 2e6)
        throw new Error(
          "Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요."
        );
      return { svg: v, ...d };
    } finally {
      c.disconnect(), o?.document.getElementById(s)?.remove(), o?.document.getElementById(`d${s}`)?.remove(), o?.document.getElementById(`i${s}`)?.remove(), o?.dispose(), i.remove();
    }
  });
  return Ln = t.catch(() => {
  }), t;
}
function Er(n, e) {
  if (!/^[A-Za-z][A-Za-z0-9_-]{0,120}$/.test(e))
    throw new Error("다이어그램 SVG 식별자 접두사가 올바르지 않습니다.");
  const t = ks(n.svg), s = [t, ...t.querySelectorAll("*")], i = /* @__PURE__ */ new Map();
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
        const f = c.get(l.value.slice(1));
        f && a.setAttribute(l.name, `#${f}`);
      } else l.name === "aria-labelledby" || l.name === "aria-describedby" ? a.setAttribute(
        l.name,
        l.value.split(/\s+/).map((f) => c.get(f) ?? f).join(" ")
      ) : /url\(/i.test(l.value) && a.setAttribute(
        l.name,
        l.value.replace(
          /url\(\s*(["']?)#([^"')\s]+)\1\s*\)/gi,
          (f, u, d) => c.has(d) ? `url(#${c.get(d)})` : f
        )
      );
  }
  return new XMLSerializer().serializeToString(t);
}
let Ss = 0, Lr = 0;
document.fonts.addEventListener("loadingdone", (n) => {
  n.fontfaces.length && Ss++;
});
function vs(n, e, t) {
  e = er(e);
  const s = sr(n), i = e.width ?? 720, r = e.panelFormat ?? t;
  if (r !== "compact" && r !== "phone")
    throw new Error("컷비율은 기본 또는 모바일이어야 합니다.");
  if (!Number.isFinite(i) || i < 480 || i > 2400)
    throw new Error("너비는 480~2400 사이여야 합니다.");
  const o = e.font ?? "Malgun Gothic, Apple SD Gothic Neo, sans-serif";
  if (typeof o != "string" || o.length > 300 || /[<>]/.test(o))
    throw new Error("올바른 글꼴 이름이 필요합니다.");
  return { comic: s, options: e, width: i, font: o, format: r };
}
function Es(n, e) {
  const { comic: t, width: s, font: i, options: r, format: o } = e;
  return JSON.stringify({
    panel: n,
    members: n.actors.map((a) => {
      const { asset: c, label: l, appearance: f } = t.cast[a.id];
      return [
        a.id,
        { asset: c, label: l, ...f ? { appearance: f } : {} }
      ];
    }),
    width: s,
    font: i,
    fontEpoch: Ss,
    fontVersion: r.fontVersion,
    assetVersion: Ds,
    layoutVersion: n.diagram ? 3 : 2,
    format: o
  });
}
function Ls(n) {
  return {
    svg: "",
    width: 0,
    height: 0,
    diagnostics: [n instanceof Error ? n.message : "렌더링 실패"],
    panels: []
  };
}
function xs(n, e, t) {
  const { comic: s, width: i, font: r } = n, o = [], a = [], c = `cg-${Date.now().toString(36)}-${++Lr}-${Math.random().toString(36).slice(2, 9)}`, l = (u, d, p) => `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${d}" viewBox="0 0 ${i} ${d}" role="img" aria-label="${X(p)}"><title>${X(p)}</title><rect width="100%" height="100%" fill="#f5f7fb"/><g font-family="${X(r)}" fill="#303341"><text x="24" y="42" font-size="24" font-weight="700">${X(p)}</text>${u}</g></svg>`;
  let f = 68;
  for (const [u, d] of e.entries()) {
    const { markup: p, height: g, hit: h } = d, m = (b) => s.panels[u].diagram ? Er(
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${g}" viewBox="0 0 ${i} ${g}" style="width:${i}px!important;height:${g}px!important;max-width:none!important;max-height:none!important">${p}</svg>`
      },
      `${c}-${b}-${u}`
    ) : p;
    o.push(
      `<g data-panel="${u}" transform="translate(0 ${f})">${m("whole")}</g>`
    ), a.push({
      index: u,
      svg: l(
        `<g data-panel="${u}" transform="translate(0 68)">${m("panel")}</g>`,
        g + 92,
        `${s.title} · ${u + 1}/${s.panels.length}`
      ),
      width: i,
      height: g + 92,
      diagnostics: [],
      cache: { hits: h ? 1 : 0, misses: h ? 0 : 1, bytes: t.bytes }
    }), f += g + 24;
  }
  return {
    svg: l(o.join(""), f, s.title),
    width: i,
    height: f,
    diagnostics: [],
    panels: a,
    cache: {
      hits: e.filter((u) => u.hit).length,
      misses: e.filter((u) => !u.hit).length,
      bytes: t.bytes
    }
  };
}
function xn(n, e, t, s = "compact") {
  try {
    const i = vs(n, e, s), r = i.comic.panels.findIndex(
      (a) => a.diagram
    );
    if (r >= 0)
      throw new Error(
        `컷 ${r + 1}.다이어그램: 만화그리기비동기(renderComicAsync) 또는 컷그리기비동기(renderPanelsAsync)를 await로 호출하세요.`
      );
    const o = i.comic.panels.map((a) => {
      const c = Es(a, i), l = t.get(c), f = l ?? bs(
        a,
        i.comic.cast,
        i.width,
        i.font,
        i.format
      );
      return l || t.set(c, f), { ...f, hit: !!l };
    });
    return xs(i, o, t);
  } catch (i) {
    return Ls(i);
  }
}
async function Nn(n, e, t, s = "compact") {
  try {
    const i = vs(n, e, s);
    i.comic.panels.some((o) => o.diagram) && await document.fonts.ready;
    const r = [];
    for (const [o, a] of i.comic.panels.entries()) {
      const c = Es(a, i), l = t.get(c);
      if (l) {
        r.push({ ...l, hit: !0 });
        continue;
      }
      let f;
      if (a.diagram)
        try {
          f = await vr(a.diagram.source, i.font);
        } catch (d) {
          throw new Error(
            `컷 ${o + 1}.다이어그램: ${d instanceof Error ? d.message : "Mermaid 렌더링 실패"}`
          );
        }
      const u = bs(
        a,
        i.comic.cast,
        i.width,
        i.font,
        i.format,
        f
      );
      t.set(c, u), r.push({ ...u, hit: !1 });
    }
    return xs(i, r, t);
  } catch (i) {
    return Ls(i);
  }
}
function Ns(n = 2e6) {
  const e = new Ks(n);
  return {
    render: (t, s = {}) => xn(t, s, e),
    renderPanels: (t, s = {}) => xn(t, s, e, "phone"),
    renderAsync: (t, s = {}) => Nn(t, s, e),
    renderPanelsAsync: (t, s = {}) => Nn(t, s, e, "phone"),
    clearCache: () => e.clear()
  };
}
const Et = Ns(), Cr = Et.render, Ir = Et.renderPanels, jr = Et.renderAsync, Br = Et.renderPanelsAsync;
function _r(n, e) {
  const t = URL.createObjectURL(n), s = document.createElement("a");
  s.href = t, s.download = e, s.click(), setTimeout(() => URL.revokeObjectURL(t), 1e3);
}
async function Pr(n, e = 1) {
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
        (f) => f ? c(f) : l(new Error("PNG 생성에 실패했습니다.")),
        "image/png"
      )
    );
  } finally {
    URL.revokeObjectURL(i);
  }
}
const xr = `
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
function On(n, e = 0) {
  return [...n.querySelectorAll("g[data-panel]")].map((t, s) => {
    if (t.getAttribute("data-panel") !== String(s + e))
      throw new TypeError("만화의 컷 순서가 올바르지 않습니다.");
    const i = t.querySelector("rect");
    if (!i) throw new TypeError("만화에 컷 프레임이 없습니다.");
    let r = new DOMMatrix();
    for (let p = i; p && p !== n.documentElement; p = p.parentElement) {
      let g = new DOMMatrix();
      const h = p.getAttribute("transform") ?? "", m = /(matrix|translate|scale|rotate|skewX|skewY)\(([^)]*)\)/g;
      let b = h;
      for (const v of h.matchAll(m)) {
        const k = v[2].trim().split(/[\s,]+/).map(Number);
        if (!k.length || k.some((y) => !Number.isFinite(y)))
          throw new TypeError("만화의 컷 변환이 올바르지 않습니다.");
        const [$, L = 0, x = 0] = k;
        switch (v[1]) {
          case "matrix":
            if (k.length !== 6)
              throw new TypeError("올바른 컷 행렬이 필요합니다.");
            g = g.multiply(new DOMMatrix(k));
            break;
          case "translate":
            g = g.translate($, L);
            break;
          case "scale":
            g = g.scale($, k[1] ?? $);
            break;
          case "rotate":
            g = g.translate(L, x).rotate($).translate(-L, -x);
            break;
          case "skewX":
            g = g.skewX($);
            break;
          case "skewY":
            g = g.skewY($);
            break;
        }
        b = b.replace(v[0], "");
      }
      if (b.trim()) throw new TypeError("지원하지 않는 컷 변환입니다.");
      r = g.multiply(r);
    }
    const o = Number(i.getAttribute("x") ?? 0), a = Number(i.getAttribute("y") ?? 0), c = Number(i.getAttribute("width")), l = Number(i.getAttribute("height"));
    if (![o, a, c, l].every(Number.isFinite) || c <= 0 || l <= 0)
      throw new TypeError("만화의 컷 크기가 올바르지 않습니다.");
    const f = [
      [o, a],
      [o + c, a],
      [o, a + l],
      [o + c, a + l]
    ].map(([p, g]) => r.transformPoint(new DOMPoint(p, g))), u = Math.min(...f.map((p) => p.x)), d = Math.min(...f.map((p) => p.y));
    return {
      x: u,
      y: d,
      width: Math.max(...f.map((p) => p.x)) - u,
      height: Math.max(...f.map((p) => p.y)) - d
    };
  });
}
function Nr(n, e, t, s, i, r, o, a) {
  let c = 0, l = !1, f = 0;
  const u = () => {
    const S = n.getBoundingClientRect(), B = getComputedStyle(n);
    return {
      x: S.x + n.clientLeft + (parseFloat(B.paddingLeft) || 0),
      y: S.y + n.clientTop + (parseFloat(B.paddingTop) || 0)
    };
  }, d = () => {
    const S = e.getBoundingClientRect(), B = S.width / s;
    return t.map((C) => ({
      x: S.x + C.x * B,
      y: S.y + C.y * B,
      width: C.width * B,
      height: C.height * B
    }));
  };
  let p = 0;
  const g = () => {
    i.disabled = c === 0, r.disabled = c === t.length - 1, (document.activeElement === i && i.disabled || document.activeElement === r && r.disabled) && n.focus();
    const S = `${c + 1} / ${t.length}컷`;
    o.textContent !== S && (o.textContent = S), p !== c && (p = c, a?.());
  }, h = () => {
    if (l) return;
    if (n.scrollLeft === 0 && n.scrollTop === 0) {
      c = 0, g();
      return;
    }
    const S = u(), B = n.clientWidth - (parseFloat(getComputedStyle(n).paddingLeft) || 0) - (parseFloat(getComputedStyle(n).paddingRight) || 0), C = n.clientHeight - (parseFloat(getComputedStyle(n).paddingTop) || 0) - (parseFloat(getComputedStyle(n).paddingBottom) || 0), I = d(), D = I[I.length - 1];
    if (n.scrollLeft + n.clientWidth >= n.scrollWidth - 1 && n.scrollTop + n.clientHeight >= n.scrollHeight - 1 && D.x < S.x + B && D.x + D.width > S.x && D.y < S.y + C && D.y + D.height > S.y) {
      c = t.length - 1, g();
      return;
    }
    let U = -1, G = 1 / 0;
    I.forEach((F, T) => {
      const z = Math.max(
        0,
        Math.min(F.x + F.width, S.x + B) - Math.max(F.x, S.x)
      ) * Math.max(
        0,
        Math.min(F.y + F.height, S.y + C) - Math.max(F.y, S.y)
      ), se = Math.hypot(
        Math.max(F.x - S.x, 0, S.x - F.x - F.width),
        Math.max(F.y - S.y, 0, S.y - F.y - F.height)
      );
      (z > U || z === U && se < G) && (U = z, G = se, c = T);
    }), g();
  }, m = () => {
    cancelAnimationFrame(f), l = !0;
    const S = n.scrollLeft, B = n.scrollTop;
    f = requestAnimationFrame(() => {
      f = requestAnimationFrame(() => {
        l = !1, (n.scrollLeft !== S || n.scrollTop !== B) && h();
      });
    });
  }, b = (S, B = c) => {
    if (c = Math.max(0, Math.min(t.length - 1, B + S)), c === B) {
      g();
      return;
    }
    const C = d()[c], I = u();
    n.scrollTo({
      left: n.scrollLeft + C.x - I.x,
      top: n.scrollTop + C.y - I.y,
      behavior: "instant"
    }), m(), g();
  }, v = () => b(-1), k = () => b(1), $ = (S) => {
    S.target !== n || S.altKey || S.ctrlKey || S.metaKey || S.shiftKey || (S.key === "ArrowLeft" || S.key === "ArrowRight") && (S.preventDefault(), b(S.key === "ArrowLeft" ? -1 : 1));
  }, L = /* @__PURE__ */ new Set();
  let x, y = !1;
  const w = (S) => {
    if (L.add(S.pointerId), y = !1, L.size !== 1 || !S.isPrimary || S.button !== 0) {
      x = void 0;
      return;
    }
    x = {
      id: S.pointerId,
      x: S.clientX,
      y: S.clientY,
      moved: !1
    };
  }, N = (S) => {
    x?.id === S.pointerId && Math.hypot(S.clientX - x.x, S.clientY - x.y) > 8 && (x.moved = !0);
  }, M = (S) => {
    y = L.size === 1 && x?.id === S.pointerId && !x.moved, L.delete(S.pointerId), x = void 0;
  }, P = (S) => {
    S ? L.delete(S.pointerId) : L.clear(), x = void 0, y = !1;
  }, O = (S) => {
    const B = y;
    if (y = !1, !B || S.detail > 1 || S.ctrlKey || S.metaKey || S.altKey || S.shiftKey || S.target !== e)
      return;
    const C = d(), I = C.findIndex(
      (D) => S.clientX >= D.x && S.clientX <= D.x + D.width && S.clientY >= D.y && S.clientY <= D.y + D.height
    );
    I >= 0 && (n.focus({ preventScroll: !0 }), b(
      S.clientX < C[I].x + C[I].width / 2 ? -1 : 1,
      I
    ));
  }, Q = (S) => {
    n.contains(S.target) || P(S);
  };
  return e.draggable = !1, i.addEventListener("click", v), r.addEventListener("click", k), n.addEventListener("scroll", h), n.addEventListener("keydown", $), n.addEventListener("pointerdown", w), n.addEventListener("pointermove", N), n.addEventListener("pointerup", M), n.addEventListener("pointercancel", P), n.addEventListener("click", O), document.addEventListener("pointerup", Q), document.addEventListener("pointercancel", Q), g(), {
    get currentIndex() {
      return c;
    },
    goTo: (S) => b(S - c),
    capturePosition: () => {
      const S = u(), B = e.getBoundingClientRect(), C = B.width / s;
      return { x: (S.x - B.x) / C, y: (S.y - B.y) / C };
    },
    restorePosition: (S) => {
      const B = n.scrollLeft, C = n.scrollTop, I = e.getBoundingClientRect(), D = u(), U = I.width / s;
      n.scrollTo({
        left: n.scrollLeft + I.x + S.x * U - D.x,
        top: n.scrollTop + I.y + S.y * U - D.y,
        behavior: "instant"
      }), (n.scrollLeft !== B || n.scrollTop !== C) && m(), g();
    },
    reset: () => {
      cancelAnimationFrame(f), l = !1, c = 0, P(), g();
    },
    dispose: () => {
      cancelAnimationFrame(f), i.removeEventListener("click", v), r.removeEventListener("click", k), n.removeEventListener("scroll", h), n.removeEventListener("keydown", $), n.removeEventListener("pointerdown", w), n.removeEventListener("pointermove", N), n.removeEventListener("pointerup", M), n.removeEventListener("pointercancel", P), n.removeEventListener("click", O), document.removeEventListener("pointerup", Q), document.removeEventListener("pointercancel", Q), P();
    }
  };
}
const Or = `
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
`, An = "http://www.w3.org/2000/svg", Mn = /^#[\p{L}_][\p{L}\p{N}_:.-]*$/u, Ar = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "filter",
  "mask",
  "clip-path",
  "marker-start",
  "marker-mid",
  "marker-end",
  "cursor"
]), Mr = /* @__PURE__ */ new Set([
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
function Tn(n) {
  if (!n || typeof n.svg != "string" || !n.svg || n.svg.length > 64e6 || !Number.isFinite(n.width) || n.width <= 0 || n.width > 1e6 || !Number.isFinite(n.height) || n.height <= 0 || n.height > 1e6 || n.diagnostics !== void 0 && (!Array.isArray(n.diagnostics) || n.diagnostics.length))
    throw new TypeError("완성된 코믹젠 렌더 결과가 필요합니다.");
  if (/<!DOCTYPE|<!ENTITY|<\?/i.test(n.svg))
    throw new TypeError("정적 코믹젠 SVG만 뷰어에 전달하세요.");
  const e = new DOMParser().parseFromString(n.svg, "image/svg+xml"), t = e.documentElement, s = (t.getAttribute("viewBox") ?? `0 0 ${n.width} ${n.height}`).trim().split(/[\s,]+/).map(Number);
  if (t.localName !== "svg" || t.namespaceURI !== An || e.querySelector("parsererror") || s.length !== 4 || s[0] !== 0 || s[1] !== 0 || s[2] !== n.width || s[3] !== n.height || Number(t.getAttribute("width")) !== n.width || Number(t.getAttribute("height")) !== n.height)
    throw new TypeError("만화 SVG와 렌더 결과의 크기가 일치해야 합니다.");
  for (const i of [t, ...t.querySelectorAll("*")]) {
    if (i.namespaceURI !== An || !Mr.has(i.localName))
      throw new TypeError("외부 리소스나 실행 가능한 SVG는 지원하지 않습니다.");
    for (const r of i.attributes) {
      const o = r.localName.toLowerCase(), a = r.value;
      if (o.startsWith("on") || o === "base" && r.namespaceURI === "http://www.w3.org/XML/1998/namespace" || o === "href" && !Mn.test(a))
        throw new TypeError(
          "외부 링크나 이벤트가 포함된 SVG는 지원하지 않습니다."
        );
      if (o === "style" && /@|javascript\s*:|vbscript\s*:|expression\s*\(|[\\<>]/i.test(a))
        throw new TypeError("정적 코믹젠 SVG 스타일만 지원합니다.");
      if (Ar.has(o) && /[\\<>@]/.test(a))
        throw new TypeError("정적 코믹젠 SVG 색상과 참조만 지원합니다.");
      for (const c of a.matchAll(/url\s*\(([^)]*)\)/gi)) {
        const l = c[1].trim().replace(/^(['"])(.*)\1$/, "$2");
        if (!Mn.test(l))
          throw new TypeError("SVG의 외부 리소스는 지원하지 않습니다.");
      }
    }
  }
  return e;
}
function Os(n) {
  const e = Tn(n);
  if (!Array.isArray(n.panels) || n.panels.length < 1 || n.panels.length > 30)
    throw new TypeError("만화에는 실제 렌더된 1~30개의 컷이 필요합니다.");
  const t = [], s = n.panels.map((a, c) => {
    if (a.index !== c)
      throw new TypeError("만화의 개별 컷 순서가 일치해야 합니다.");
    const l = On(Tn(a), c);
    if (l.length !== 1 || ![l[0].x, l[0].y, l[0].width, l[0].height].every(
      Number.isFinite
    ) || l[0].width <= 0 || l[0].height <= 0 || l[0].x < 0 || l[0].y < 0 || l[0].x + l[0].width > a.width + 1 || l[0].y + l[0].height > a.height + 1)
      throw new TypeError("개별 컷 SVG에는 한 개의 컷 프레임이 필요합니다.");
    return t.push(l[0]), { ...a };
  }), i = On(e);
  if (i.length !== s.length || i.some(
    (a) => ![a.x, a.y, a.width, a.height].every(Number.isFinite) || a.width <= 0 || a.height <= 0 || a.x < 0 || a.y < 0 || a.x + a.width > n.width + 1 || a.y + a.height > n.height + 1
  ))
    throw new TypeError("만화의 컷 프레임과 렌더 결과가 일치해야 합니다.");
  const r = e.documentElement.getAttribute("aria-label") ?? e.documentElement.querySelector("title")?.textContent ?? "만화", o = s.map((a, c) => {
    const l = i[c], f = t[c], u = Math.max(
      l.width / f.width,
      l.height / f.height
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
const Bt = /* @__PURE__ */ Symbol.for("comic-gen.viewer.document-state.v1");
function fn() {
  const n = document;
  return n[Bt] || Object.defineProperty(n, Bt, {
    value: { bodyLocks: /* @__PURE__ */ new WeakMap(), nextId: 0 }
  }), n[Bt];
}
function As() {
  const n = fn();
  let e = n.styles;
  if (e)
    e.element.isConnected || document.head.append(e.element);
  else {
    const s = document.createElement("style");
    s.dataset.comicGenViewerStyles = "", s.textContent = Or, document.head.append(s), e = { element: s, count: 0 }, n.styles = e;
  }
  e.count++;
  let t = !1;
  return () => {
    t || (t = !0, --e.count === 0 && (e.element.remove(), n.styles = void 0));
  };
}
function Tr() {
  const n = fn().bodyLocks, e = document.body;
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
function Ms(n, e, t, s) {
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
function Ts(n = {}) {
  n = { ...n };
  let e = {}, t;
  const s = (E, j) => {
    if (E.zoom !== void 0 && (!Number.isFinite(E.zoom) || E.zoom <= 0 || E.zoom > 10))
      throw new RangeError("zoom must be greater than 0 and at most 10.");
    if (E.panelIndex !== void 0 && (!Number.isInteger(E.panelIndex) || E.panelIndex < 0 || j !== void 0 && E.panelIndex >= j))
      throw new RangeError("panelIndex must identify an existing panel.");
    if (E.preventOverflow !== void 0 && typeof E.preventOverflow != "boolean")
      throw new TypeError("preventOverflow must be a boolean.");
  }, i = (E, j) => {
    s(E, j);
    for (const _ of [
      "closeOnBackdrop",
      "closeOnEmptyArea",
      "closeOnEscape",
      "showCloseButton"
    ])
      if (E[_] !== void 0 && typeof E[_] != "boolean")
        throw new TypeError(`${_} must be a boolean.`);
    if (E.onChange !== void 0 && typeof E.onChange != "function")
      throw new TypeError("onChange must be a function.");
  };
  i(n);
  const r = () => f?.open && k ? Object.freeze({
    zoom: Number(g.value),
    preventOverflow: h.checked,
    panelIndex: $?.currentIndex ?? 0
  }) : null;
  let o, a = !1;
  const c = () => {
    if (a) return;
    const E = r(), j = JSON.stringify(E);
    j !== o && (o = j, e.onChange?.(E));
  }, l = (E) => {
    const j = String(E);
    if (![...g.options].some((_) => _.value === j)) {
      const _ = document.createElement("option");
      _.value = j, _.textContent = `${Math.round(E * 100)}%`, _.dataset.customZoom = "", g.append(_);
    }
    g.value = j;
  };
  let f, u, d, p, g, h, m, b, v, k, $, L, x, y, w, N, M = !1;
  const P = () => {
    if (!f?.open || !k) return;
    const E = $?.capturePosition();
    u.dataset.preventOverflow = String(h.checked);
    const j = k.result;
    let _ = j.width * Number(g.value);
    if (h.checked) {
      const H = getComputedStyle(u), ve = Math.max(
        0,
        u.clientWidth - (parseFloat(H.paddingLeft) || 0) - (parseFloat(H.paddingRight) || 0)
      ), de = Math.max(
        0,
        u.clientHeight - (parseFloat(H.paddingTop) || 0) - (parseFloat(H.paddingBottom) || 0)
      );
      _ = Math.min(
        _,
        ve * j.width / k.panelWidth,
        de * j.width / k.panelHeight
      );
    }
    d.style.width = `${Math.max(0, _)}px`, E && Number.isFinite(E.x) && Number.isFinite(E.y) && $?.restorePosition(E);
  }, O = () => {
    $?.dispose(), $ = void 0, x?.(), x = void 0, d?.replaceChildren(), k = void 0, y?.(), y = void 0;
    const E = o !== void 0 && o !== "null", j = N;
    N = void 0;
    const _ = [
      ...document.querySelectorAll("dialog[open]")
    ].find((H) => H !== f);
    j?.isConnected && (!_ || _.contains(j)) && j.focus({ preventScroll: !0 }), E && c();
  }, Q = () => {
    f?.open && f.close(), O();
  }, S = (E) => {
    E.preventDefault(), e.closeOnEscape !== !1 && Q();
  }, B = () => {
    f?.open || O();
  };
  let C = !1, I;
  const D = (E) => {
    if (E.target !== f) return !1;
    const j = f.getBoundingClientRect();
    return E.clientX < j.left || E.clientX > j.right || E.clientY < j.top || E.clientY > j.bottom;
  }, U = (E) => {
    if (E.target !== u) return !1;
    const j = u.getBoundingClientRect();
    return E.clientX >= j.left + u.clientLeft && E.clientX < j.left + u.clientLeft + u.clientWidth && E.clientY >= j.top + u.clientTop && E.clientY < j.top + u.clientTop + u.clientHeight;
  }, G = (E) => {
    I = E.button === 0 && E.isPrimary && U(E) ? { x: E.clientX, y: E.clientY } : void 0, C = E.button === 0 && D(E);
  }, F = (E) => {
    const j = C && D(E) && e.closeOnBackdrop === !0 || !!(I && U(E) && e.closeOnEmptyArea === !0 && Math.hypot(E.clientX - I.x, E.clientY - I.y) <= 8);
    I = void 0, C = !1, j && Q();
  }, T = () => {
    P(), c();
  }, z = (E) => {
    if (E.key !== "Tab" || !f?.open) return;
    const _ = [
      ...f.querySelectorAll(
        "button:not(:disabled), input, select, [tabindex='0']"
      )
    ].filter((de) => !de.hidden), H = _[0], ve = _[_.length - 1];
    (!E.shiftKey && document.activeElement === ve || E.shiftKey && document.activeElement === H) && (E.preventDefault(), (E.shiftKey ? ve : H).focus());
  }, se = () => {
    if (f) return;
    w = As();
    const E = `comic-gen-viewer-${++fn().nextId}`;
    f = document.createElement("dialog"), f.className = "comic-viewer", f.dataset.comicGenViewer = "", f.setAttribute("aria-labelledby", `${E}-title`), f.setAttribute("aria-describedby", `${E}-help`), f.innerHTML = `<div class="comic-viewer-toolbar"><h2 class="comic-viewer-title" id="${E}-title"></h2><button type="button" autofocus>닫기</button><div class="comic-viewer-controls"><label class="comic-viewer-checkbox"><input type="checkbox" checked>화면 넘침 방지</label><label>보기 크기 <select><option value="1">100%</option><option value="1.5">150%</option><option value="2">200%</option></select></label><div class="comic-viewer-navigation"><button type="button" class="comic-previous" aria-label="이전 컷">←</button><span class="comic-position" role="status" aria-live="polite"></span><button type="button" class="comic-next" aria-label="다음 컷">→</button></div></div></div><p class="comic-viewer-help" id="${E}-help">화면 넘침 방지는 한 컷의 너비·높이를 화면에 맞춥니다. 다음 컷은 아래로 스크롤해 읽습니다. 컷 왼쪽은 이전, 오른쪽은 다음 컷입니다. 읽기 영역에서 ←/→ 키로도 이동합니다.</p><div class="comic-viewer-viewport" tabindex="0" role="region" aria-label="만화 읽기 영역"><div class="comic-viewer-artwork"></div></div>`, p = f.querySelector("h2"), u = f.querySelector(".comic-viewer-viewport"), d = f.querySelector(".comic-viewer-artwork"), g = f.querySelector("select"), h = f.querySelector('input[type="checkbox"]'), m = f.querySelector(".comic-previous"), b = f.querySelector(".comic-next"), v = f.querySelector(".comic-position"), t = f.querySelector("button"), g.addEventListener("change", T), h.addEventListener("change", T), f.querySelector("button").addEventListener("click", Q), f.addEventListener("pointerdown", G), f.addEventListener("click", F), f.addEventListener("cancel", S), f.addEventListener("close", B), f.addEventListener("keydown", z), document.body.append(f), L = new ResizeObserver(P), L.observe(u);
  };
  return {
    get isOpen() {
      return !!f?.open;
    },
    get state() {
      return r();
    },
    setView: (E) => {
      if (!f?.open || !k)
        throw new Error("Open the viewer before setting its view.");
      s(E, k.result.panels.length), a = !0, E.zoom !== void 0 && l(E.zoom), E.preventOverflow !== void 0 && (h.checked = E.preventOverflow), P(), E.panelIndex !== void 0 && $?.goTo(E.panelIndex), a = !1, c();
    },
    open: (E, j = {}) => {
      if (M) throw new Error("폐기한 만화 뷰어는 다시 열 수 없습니다.");
      const _ = Os(E), H = { ...n, ...j };
      i(H, _.result.panels.length);
      const ve = H.trigger ?? (f?.open ? N : document.activeElement instanceof HTMLElement ? document.activeElement : void 0);
      se(), $?.dispose(), x?.(), a = !0, e = H, o = void 0, C = !1, I = void 0, k = _, N = ve, p.textContent = _.title, g.querySelectorAll("[data-custom-zoom]").forEach((Lt) => Lt.remove()), l(H.zoom ?? 1), h.checked = H.preventOverflow ?? !0, t.hidden = H.showCloseButton === !1;
      const de = Ms(
        _.result.svg,
        _.result.width,
        _.result.height,
        _.title
      );
      if (x = de.revoke, d.replaceChildren(de.image), $ = Nr(
        u,
        de.image,
        _.bounds,
        _.result.width,
        m,
        b,
        v,
        c
      ), !f.open) {
        y = Tr();
        try {
          f.showModal();
        } catch (Lt) {
          throw a = !1, O(), Lt;
        }
      }
      P(), u.scrollTo(0, 0), $.reset(), $.goTo(H.panelIndex ?? 0), (t.hidden ? u : t).focus({
        preventScroll: !0
      }), a = !1, c();
    },
    close: Q,
    destroy: () => {
      M || (M = !0, Q(), L?.disconnect(), f && (g.removeEventListener("change", T), h.removeEventListener("change", T), f.querySelector("button").removeEventListener("click", Q), f.removeEventListener("pointerdown", G), f.removeEventListener("click", F), f.removeEventListener("cancel", S), f.removeEventListener("close", B), f.removeEventListener("keydown", z), f.remove()), w?.(), w = void 0);
    }
  };
}
function Dr(n, e, t = {}) {
  const s = Os(e), i = As(), r = Ts(t), o = document.createElement("button");
  o.type = "button", o.className = "comic-card", o.dataset.comicGenCard = "", o.setAttribute("aria-haspopup", "dialog"), o.setAttribute("aria-label", `${s.title} · 만화 읽기`);
  const a = document.createElement("span");
  a.className = "comic-card-thumbnail", a.setAttribute("aria-hidden", "true");
  const c = s.result.panels[0], l = Ms(
    c.svg,
    c.width,
    c.height,
    `${s.title} · 1/${s.result.panels.length}`
  );
  a.append(l.image);
  const f = document.createElement("span");
  f.className = "comic-card-copy";
  const u = document.createElement("strong");
  u.textContent = s.title;
  const d = document.createElement("span");
  d.textContent = `${s.result.panels.length}컷 · 만화 읽기 ↗`, f.append(u, d), o.append(a, f);
  const p = () => r.open(s.result, { trigger: o });
  o.addEventListener("click", p), n.replaceChildren(o);
  let g = !1;
  return () => {
    g || (g = !0, o.removeEventListener("click", p), r.destroy(), l.revoke(), o.remove(), i());
  };
}
const Cn = /* @__PURE__ */ new WeakMap(), Cs = Ns(), Ut = /* @__PURE__ */ new WeakMap(), Ge = Ts();
let ze;
function Is(n) {
  n.result?.svg && (ze = n, Ge.open(n.result, { trigger: n.button }));
}
function js(n) {
  if (!document.getElementById("comic-gen-embed-styles")) {
    const s = document.createElement("style");
    s.id = "comic-gen-embed-styles", s.textContent = xr, document.head.append(s);
  }
  const e = 'pre[language="comic-gen"], pre[data-comic], pre:has(code.language-comic), pre:has(code.language-comic-gen)', t = [...n.querySelectorAll(e)];
  return n instanceof HTMLElement && n.matches(e) && t.unshift(n), t;
}
function Ht(n) {
  return (n.querySelector("code") ?? n).textContent ?? "";
}
function Bs(n) {
  let e = Cn.get(n);
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
    s.addEventListener("click", () => Is(c)), Cn.set(n, e);
  }
  return n.after(e.figure), n.hidden = !0, e;
}
function _s(n, e) {
  if (n.result = e, n.figure.removeAttribute("aria-busy"), n.button.disabled = !1, e.svg) {
    const t = new DOMParser().parseFromString(e.svg, "image/svg+xml");
    n.title.textContent = t.documentElement.getAttribute("aria-label"), n.caption.textContent = `${e.panels.length}컷 · 만화 읽기 ↗`, n.button.setAttribute(
      "aria-label",
      `${n.title.textContent} · 만화 읽기`
    ), n.thumbnail.innerHTML = e.panels[0].svg, n.figure.replaceChildren(n.button), ze === n && Ge.isOpen && Is(n);
  } else {
    ze === n && Ge.close();
    const t = document.createElement("p");
    t.setAttribute("role", "alert"), t.textContent = e.diagnostics.join(`
`), n.figure.replaceChildren(t);
  }
}
function Ps(n) {
  const e = (Ut.get(n) ?? 0) + 1;
  return Ut.set(n, e), e;
}
function Qr(n = document, e = {}) {
  return js(n).map((t) => {
    Ps(t);
    const s = Cs.render(Ht(t), e);
    return _s(Bs(t), s), s;
  });
}
async function Fr(n = document, e = {}) {
  return Promise.all(
    js(n).map(async (t) => {
      const s = Ht(t), i = Ps(t), r = t.isConnected, o = Bs(t);
      if (o.figure.setAttribute("aria-busy", "true"), o.button.disabled = !0, !o.result) {
        const c = document.createElement("p");
        c.setAttribute("role", "status"), c.textContent = "만화를 그리는 중…", o.figure.replaceChildren(c);
      }
      const a = await Cs.renderAsync(s, e);
      if (Ut.get(t) !== i) return a;
      if (r && !t.isConnected)
        return o.figure.remove(), ze === o && Ge.close(), a;
      if (Ht(t) !== s) {
        o.figure.removeAttribute("aria-busy"), o.result = void 0, ze === o && Ge.close();
        const c = document.createElement("p");
        return c.setAttribute("role", "status"), c.textContent = "코드가 바뀌었어요. 다시 그리기를 호출하세요.", o.figure.replaceChildren(c), a;
      }
      return _s(o, a), a;
    })
  );
}
export {
  Ds as assetVersion,
  Ts as createComicViewer,
  Ns as createRenderer,
  _r as downloadBlob,
  Pr as exportPng,
  Dr as mountComicCard,
  Qr as renderCodeBlocks,
  Fr as renderCodeBlocksAsync,
  Cr as renderComic,
  jr as renderComicAsync,
  Ir as renderPanels,
  Br as renderPanelsAsync,
  Ns as 렌더러만들기,
  Cr as 만화그리기,
  jr as 만화그리기비동기,
  Ts as 만화뷰어만들기,
  Dr as 만화카드붙이기,
  Rt as 문법값,
  Z as 문법항목,
  Ir as 컷그리기,
  Br as 컷그리기비동기,
  Qr as 코드블록그리기,
  Fr as 코드블록그리기비동기
};
