/*! Comic Gen browser SDK v0.6.0
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
const ae = Object.freeze({
  skinColor: "#f0c8a6",
  hairStyle: "short",
  hairColor: "#47362f",
  outfit: "shirt",
  outfitColor: "#647bd6",
  glasses: !1
}), mt = (s) => {
  if (s.length !== 4 && s.length !== 7 || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(s))
    throw new Error("사람의 외형 색상은 #RGB 또는 #RRGGBB로 작성하세요.");
  return s;
};
function $s(s = ae) {
  const e = mt(s.skinColor), t = mt(s.hairColor), n = mt(s.outfitColor), i = {
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
  const a = (u, d) => d ? `<g data-human-part="${u}">${d}</g>` : "", l = s.glasses ? '<g data-human-part="glasses" fill="none" stroke-width="2.2"><circle cx="-17" cy="-20" r="11"/><circle cx="17" cy="-20" r="11"/><path d="M-6 -20Q0 -24 6 -20M-28 -22L-34 -25M28 -22L34 -25"/></g>' : "", c = `<g data-human="true" data-hair-style="${s.hairStyle}" data-outfit="${s.outfit}">${a("hair-back", i[s.hairStyle])}${a("outfit", o[s.outfit])}${a("neck", `<path d="M-10 11V24Q0 33 10 24V11Z" fill="${e}"/>`)}${a("ears", `<ellipse cx="-36" cy="-17" rx="7" ry="9" fill="${e}"/><ellipse cx="36" cy="-17" rx="7" ry="9" fill="${e}"/><path d="M-37 -21Q-41 -17 -37 -13M37 -21Q41 -17 37 -13" fill="none" stroke-width="1.8"/>`)}${a("face", `<path d="M-34 -25Q-36 -54 0 -55Q36 -54 34 -25L32 -5Q29 18 0 21Q-29 18 -32 -5Z" fill="${e}"/><g stroke="none" fill="#df8e8b" fill-opacity=".28"><ellipse cx="-24" cy="-8" rx="5" ry="3"/><ellipse cx="24" cy="-8" rx="5" ry="3"/></g>`)}${a("hair-front", r[s.hairStyle])}${a("nose", '<path d="M0 -13V-7H3" fill="none" stroke-width="1.8"/>')}${l}</g>`, f = `<path d="M-49 43Q-54 46 -51 51L-48 55Q-44 59 -40 55L-36 50Q-34 46 -38 43L-40 42Z" fill="${e}"/><path d="M-46 48L-43 51M-42 46L-39 49" fill="none" stroke-width="1.5"/>`;
  return {
    body: c,
    faceY: -16,
    color: e,
    restingHands: {
      left: `<g data-human-part="resting-hand-left">${f}</g>`,
      right: `<g data-human-part="resting-hand-right" transform="scale(-1 1)">${f}</g>`
    }
  };
}
const On = "2", Ss = {
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
  human: $s()
};
function Zt(s) {
  return s.asset === "human" ? $s(s.appearance) : Ss[s.asset];
}
const vs = {
  neutral: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-10 17q10 7 20 0" fill="none"/>',
  happy: '<path d="M-25 -2q8 -12 16 0m18 0q8 -12 16 0M-13 16q13 18 26 0" fill="none"/>',
  confused: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-24 -17l13 -5m21 1 14 4M-8 18q8 -6 16 0" fill="none"/>',
  sad: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-12 23q12 -14 24 0" fill="none"/>',
  angry: '<path d="M-25 -16l15 6m20 0 15 -6M-10 20h20" fill="none"/><circle cx="-17" cy="-1" r="3"/><circle cx="17" cy="-1" r="3"/>'
}, Lt = {
  wave: '<g data-hand="wave"><circle cx="-65" cy="-22" r="12" fill="white"/><path d="M-77 -42l-4 -8m15 2v-10m13 17 5 -7" fill="none"/></g>',
  point: '<g data-hand="point"><circle cx="-65" cy="0" r="11" fill="white"/><path d="M-77 0h-13" fill="none"/></g>'
}, Xe = {
  request: '<rect x="-18" y="-13" width="36" height="26" rx="4" fill="#f9f0cd"/><path d="M-18 -13L0 1l18 -14" fill="none"/>',
  data: '<path d="M-16 -12v23c0 10 32 10 32 0v-23" fill="#daccff"/><ellipse cy="-12" rx="16" ry="6" fill="#ece4ff"/>',
  key: '<circle cx="-10" r="9" fill="#ffe0a8"/><path d="M0 0h21m-5 0v8m-8 -8v6" fill="none"/>'
};
function U(s) {
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
class An {
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
const Pt = /* @__PURE__ */ Symbol.for("yaml.alias"), Nt = /* @__PURE__ */ Symbol.for("yaml.document"), ne = /* @__PURE__ */ Symbol.for("yaml.map"), Es = /* @__PURE__ */ Symbol.for("yaml.pair"), J = /* @__PURE__ */ Symbol.for("yaml.scalar"), Se = /* @__PURE__ */ Symbol.for("yaml.seq"), H = /* @__PURE__ */ Symbol.for("yaml.node.type"), ve = (s) => !!s && typeof s == "object" && s[H] === Pt, nt = (s) => !!s && typeof s == "object" && s[H] === Nt, De = (s) => !!s && typeof s == "object" && s[H] === ne, D = (s) => !!s && typeof s == "object" && s[H] === Es, _ = (s) => !!s && typeof s == "object" && s[H] === J, Fe = (s) => !!s && typeof s == "object" && s[H] === Se;
function P(s) {
  if (s && typeof s == "object")
    switch (s[H]) {
      case ne:
      case Se:
        return !0;
    }
  return !1;
}
function B(s) {
  if (s && typeof s == "object")
    switch (s[H]) {
      case Pt:
      case ne:
      case J:
      case Se:
        return !0;
    }
  return !1;
}
const Ls = (s) => (_(s) || P(s)) && !!s.anchor, ce = /* @__PURE__ */ Symbol("break visit"), Tn = /* @__PURE__ */ Symbol("skip children"), Me = /* @__PURE__ */ Symbol("remove node");
function Ee(s, e) {
  const t = Mn(e);
  nt(s) ? me(null, s.contents, t, Object.freeze([s])) === Me && (s.contents = null) : me(null, s, t, Object.freeze([]));
}
Ee.BREAK = ce;
Ee.SKIP = Tn;
Ee.REMOVE = Me;
function me(s, e, t, n) {
  const i = Cn(s, e, t, n);
  if (B(i) || D(i))
    return In(s, n, i), me(s, i, t, n);
  if (typeof i != "symbol") {
    if (P(e)) {
      n = Object.freeze(n.concat(e));
      for (let r = 0; r < e.items.length; ++r) {
        const o = me(r, e.items[r], t, n);
        if (typeof o == "number")
          r = o - 1;
        else {
          if (o === ce)
            return ce;
          o === Me && (e.items.splice(r, 1), r -= 1);
        }
      }
    } else if (D(e)) {
      n = Object.freeze(n.concat(e));
      const r = me("key", e.key, t, n);
      if (r === ce)
        return ce;
      r === Me && (e.key = null);
      const o = me("value", e.value, t, n);
      if (o === ce)
        return ce;
      o === Me && (e.value = null);
    }
  }
  return i;
}
function Mn(s) {
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
function Cn(s, e, t, n) {
  if (typeof t == "function")
    return t(s, e, n);
  if (De(e))
    return t.Map?.(s, e, n);
  if (Fe(e))
    return t.Seq?.(s, e, n);
  if (D(e))
    return t.Pair?.(s, e, n);
  if (_(e))
    return t.Scalar?.(s, e, n);
  if (ve(e))
    return t.Alias?.(s, e, n);
}
function In(s, e, t) {
  const n = e[e.length - 1];
  if (P(n))
    n.items[s] = t;
  else if (D(n))
    s === "key" ? n.key = t : n.value = t;
  else if (nt(n))
    n.contents = t;
  else {
    const i = ve(n) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${i} parent`);
  }
}
const _n = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, jn = (s) => s.replace(/[!,[\]{}]/g, (e) => _n[e]);
class q {
  constructor(e, t) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, q.defaultYaml, e), this.tags = Object.assign({}, q.defaultTags, t);
  }
  clone() {
    const e = new q(this.yaml, this.tags);
    return e.docStart = this.docStart, e;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const e = new q(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: q.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, q.defaultTags);
        break;
    }
    return e;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(e, t) {
    this.atNextDocument && (this.yaml = { explicit: q.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, q.defaultTags), this.atNextDocument = !1);
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
        return t + jn(e.substring(n.length));
    return e[0] === "!" ? e : `!<${e}>`;
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], n = Object.entries(this.tags);
    let i;
    if (e && n.length > 0 && B(e.contents)) {
      const r = {};
      Ee(e.contents, (o, a) => {
        B(a) && a.tag && (r[a.tag] = !0);
      }), i = Object.keys(r);
    } else
      i = [];
    for (const [r, o] of n)
      r === "!!" && o === "tag:yaml.org,2002:" || (!e || i.some((a) => a.startsWith(o))) && t.push(`%TAG ${r} ${o}`);
    return t.join(`
`);
  }
}
q.defaultYaml = { explicit: !1, version: "1.2" };
q.defaultTags = { "!!": "tag:yaml.org,2002:" };
function Ns(s) {
  if (/[\x00-\x19\s,[\]{}]/.test(s)) {
    const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(s)}`;
    throw new Error(t);
  }
  return !0;
}
function xs(s) {
  const e = /* @__PURE__ */ new Set();
  return Ee(s, {
    Value(t, n) {
      n.anchor && e.add(n.anchor);
    }
  }), e;
}
function Os(s, e) {
  for (let t = 1; ; ++t) {
    const n = `${s}${t}`;
    if (!e.has(n))
      return n;
  }
}
function Pn(s, e) {
  const t = [], n = /* @__PURE__ */ new Map();
  let i = null;
  return {
    onAnchor: (r) => {
      t.push(r), i ?? (i = xs(s));
      const o = Os(e, i);
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
        if (typeof o == "object" && o.anchor && (_(o.node) || P(o.node)))
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
function ge(s, e, t, n) {
  if (n && typeof n == "object")
    if (Array.isArray(n))
      for (let i = 0, r = n.length; i < r; ++i) {
        const o = n[i], a = ge(s, n, String(i), o);
        a === void 0 ? delete n[i] : a !== o && (n[i] = a);
      }
    else if (n instanceof Map)
      for (const i of Array.from(n.keys())) {
        const r = n.get(i), o = ge(s, n, i, r);
        o === void 0 ? n.delete(i) : o !== r && n.set(i, o);
      }
    else if (n instanceof Set)
      for (const i of Array.from(n)) {
        const r = ge(s, n, i, i);
        r === void 0 ? n.delete(i) : r !== i && (n.delete(i), n.add(r));
      }
    else
      for (const [i, r] of Object.entries(n)) {
        const o = ge(s, n, i, r);
        o === void 0 ? delete n[i] : o !== r && (n[i] = o);
      }
  return s.call(e, t, n);
}
function G(s, e, t) {
  if (Array.isArray(s))
    return s.map((n, i) => G(n, String(i), t));
  if (s && typeof s.toJSON == "function") {
    if (!t || !Ls(s))
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
class Bt {
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
    if (!nt(e))
      throw new TypeError("A document argument is required");
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: e,
      keep: !0,
      mapAsMap: t === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof n == "number" ? n : 100
    }, a = G(this, "", o);
    if (typeof i == "function")
      for (const { count: l, res: c } of o.anchors.values())
        i(c, l);
    return typeof r == "function" ? ge(r, { "": a }, "", a) : a;
  }
}
class Dt extends Bt {
  constructor(e) {
    super(Pt), this.source = e, Object.defineProperty(this, "tag", {
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
        (ve(o) || Ls(o)) && n.push(o);
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
      if (l || (G(i, null, t), l = r.get(i)), l?.res === void 0) {
        const c = "This should not happen: Alias anchor was not resolved?";
        throw new ReferenceError(c);
      }
      if (a >= 0 && (l.count += 1, l.aliasCount === 0 && (l.aliasCount = ze(o, i, r)), l.count * l.aliasCount > a)) {
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
      if (Ns(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
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
  if (ve(e)) {
    const n = e.resolve(s), i = t && n && t.get(n);
    return i ? i.count * i.aliasCount : 0;
  } else if (P(e)) {
    let n = 0;
    for (const i of e.items) {
      const r = ze(s, i, t);
      r > n && (n = r);
    }
    return n;
  } else if (D(e)) {
    const n = ze(s, e.key, t), i = ze(s, e.value, t);
    return Math.max(n, i);
  }
  return 1;
}
const As = (s) => !s || typeof s != "function" && typeof s != "object";
class O extends Bt {
  constructor(e) {
    super(J), this.value = e;
  }
  toJSON(e, t) {
    return t?.keep ? this.value : G(this.value, e, t);
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
const Bn = "tag:yaml.org,2002:";
function Dn(s, e, t) {
  if (e) {
    const n = t.filter((r) => r.tag === e), i = n.find((r) => !r.format) ?? n[0];
    if (!i)
      throw new Error(`Tag ${e} not found`);
    return i;
  }
  return t.find((n) => n.identify?.(s) && !n.format);
}
function _e(s, e, t) {
  if (nt(s) && (s = s.contents), B(s))
    return s;
  if (D(s)) {
    const u = t.schema[ne].createNode?.(t.schema, null, t);
    return u.items.push(s), u;
  }
  (s instanceof String || s instanceof Number || s instanceof Boolean || typeof BigInt < "u" && s instanceof BigInt) && (s = s.valueOf());
  const { aliasDuplicateObjects: n, onAnchor: i, onTagObj: r, schema: o, sourceObjects: a } = t;
  let l;
  if (n && s && typeof s == "object") {
    if (l = a.get(s), l)
      return l.anchor ?? (l.anchor = i(s)), new Dt(l.anchor);
    l = { anchor: null, node: null }, a.set(s, l);
  }
  e?.startsWith("!!") && (e = Bn + e.slice(2));
  let c = Dn(s, e, o.tags);
  if (!c) {
    if (s && typeof s.toJSON == "function" && (s = s.toJSON()), !s || typeof s != "object") {
      const u = new O(s);
      return l && (l.node = u), u;
    }
    c = s instanceof Map ? o[ne] : Symbol.iterator in Object(s) ? o[Se] : o[ne];
  }
  r && (r(c), delete t.onTagObj);
  const f = c?.createNode ? c.createNode(t.schema, s, t) : typeof c?.nodeClass?.from == "function" ? c.nodeClass.from(t.schema, s, t) : new O(s);
  return e ? f.tag = e : c.default || (f.tag = c.tag), l && (l.node = f), f;
}
function Ze(s, e, t) {
  let n = t;
  for (let i = e.length - 1; i >= 0; --i) {
    const r = e[i];
    if (typeof r == "number" && Number.isInteger(r) && r >= 0) {
      const o = [];
      o[r] = n, n = o;
    } else
      n = /* @__PURE__ */ new Map([[r, n]]);
  }
  return _e(n, void 0, {
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
class Ts extends Bt {
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
    return e && (t.schema = e), t.items = t.items.map((n) => B(n) || D(n) ? n.clone(e) : n), this.range && (t.range = this.range.slice()), t;
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
      if (P(r))
        r.addIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(n, Ze(this.schema, i, t));
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
    if (P(i))
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
    return i.length === 0 ? !t && _(r) ? r.value : r : P(r) ? r.getIn(i, t) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!D(t))
        return !1;
      const n = t.value;
      return n == null || e && _(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
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
    return P(i) ? i.hasIn(n) : !1;
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
      if (P(r))
        r.setIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(n, Ze(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`);
    }
  }
}
const Fn = (s) => s.replace(/^(?!$)(?: $)?/gm, "#");
function X(s, e) {
  return /^\n+$/.test(s) ? s.substring(1) : e ? s.replace(/^(?! *$)/gm, e) : s;
}
const le = (s, e, t) => s.endsWith(`
`) ? X(t, e) : t.includes(`
`) ? `
` + X(t, e) : (s.endsWith(" ") ? "" : " ") + t, Ms = "flow", xt = "block", Ye = "quoted";
function it(s, e, t = "flow", { indentAtStart: n, lineWidth: i = 80, minContentWidth: r = 20, onFold: o, onOverflow: a } = {}) {
  if (!i || i < 0)
    return s;
  i < r && (r = 0);
  const l = Math.max(1 + r, 1 + i - e.length);
  if (s.length <= l)
    return s;
  const c = [], f = {};
  let u = i - e.length;
  typeof n == "number" && (n > i - Math.max(2, r) ? c.push(0) : u = i - n);
  let d, m, y = !1, h = -1, g = -1, k = -1;
  t === xt && (h = es(s, h, e.length), h !== -1 && (u = h + l));
  for (let S; S = s[h += 1]; ) {
    if (t === Ye && S === "\\") {
      switch (g = h, s[h + 1]) {
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
      k = h;
    }
    if (S === `
`)
      t === xt && (h = es(s, h, e.length)), u = h + e.length + l, d = void 0;
    else {
      if (S === " " && m && m !== " " && m !== `
` && m !== "	") {
        const p = s[h + 1];
        p && p !== " " && p !== `
` && p !== "	" && (d = h);
      }
      if (h >= u)
        if (d)
          c.push(d), u = d + l, d = void 0;
        else if (t === Ye) {
          for (; m === " " || m === "	"; )
            m = S, S = s[h += 1], y = !0;
          const p = h > k + 1 ? h - 2 : g - 1;
          if (f[p])
            return s;
          c.push(p), f[p] = !0, u = p + l, d = void 0;
        } else
          y = !0;
    }
    m = S;
  }
  if (y && a && a(), c.length === 0)
    return s;
  o && o();
  let v = s.slice(0, c[0]);
  for (let S = 0; S < c.length; ++S) {
    const p = c[S], $ = c[S + 1] || s.length;
    p === 0 ? v = `
${e}${s.slice(0, $)}` : (t === Ye && f[p] && (v += `${s[p]}\\`), v += `
${e}${s.slice(p + 1, $)}`);
  }
  return v;
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
const rt = (s, e) => ({
  indentAtStart: e ? s.indent.length : s.indentAtStart,
  lineWidth: s.options.lineWidth,
  minContentWidth: s.options.minContentWidth
}), ot = (s) => /^(%|---|\.\.\.)/m.test(s);
function Kn(s, e, t) {
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
  const { implicitKey: n } = e, i = e.options.doubleQuotedMinMultiLineLength, r = e.indent || (ot(s) ? "  " : "");
  let o = "", a = 0;
  for (let l = 0, c = t[l]; c; c = t[++l])
    if (c === " " && t[l + 1] === "\\" && t[l + 2] === "n" && (o += t.slice(a, l) + "\\ ", l += 1, a = l, c = "\\"), c === "\\")
      switch (t[l + 1]) {
        case "u":
          {
            o += t.slice(a, l);
            const f = t.substr(l + 2, 4);
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
                f.substr(0, 2) === "00" ? o += "\\x" + f.substr(2) : o += t.substr(l, 6);
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
  return o = a ? o + t.slice(a) : t, n ? o : it(o, r, Ye, rt(e, !1));
}
function Ot(s, e) {
  if (e.options.singleQuote === !1 || e.implicitKey && s.includes(`
`) || /[ \t]\n|\n[ \t]/.test(s))
    return Ce(s, e);
  const t = e.indent || (ot(s) ? "  " : ""), n = "'" + s.replace(/'/g, "''").replace(/\n+/g, `$&
${t}`) + "'";
  return e.implicitKey ? n : it(n, t, Ms, rt(e, !1));
}
function ye(s, e) {
  const { singleQuote: t } = e.options;
  let n;
  if (t === !1)
    n = Ce;
  else {
    const i = s.includes('"'), r = s.includes("'");
    i && !r ? n = Ot : r && !i ? n = Ce : n = t ? Ot : Ce;
  }
  return n(s, e);
}
let At;
try {
  At = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  At = /\n+(?!\n|$)/g;
}
function We({ comment: s, type: e, value: t }, n, i, r) {
  const { blockQuote: o, commentString: a, lineWidth: l } = n.options;
  if (!o || /\n[\t ]+$/.test(t))
    return ye(t, n);
  const c = n.indent || (n.forceBlockIndent || ot(t) ? "  " : ""), f = o === "literal" ? !0 : o === "folded" || e === O.BLOCK_FOLDED ? !1 : e === O.BLOCK_LITERAL ? !0 : !Kn(t, l, c.length);
  if (!t)
    return f ? `|
` : `>
`;
  let u, d;
  for (d = t.length; d > 0; --d) {
    const $ = t[d - 1];
    if ($ !== `
` && $ !== "	" && $ !== " ")
      break;
  }
  let m = t.substring(d);
  const y = m.indexOf(`
`);
  y === -1 ? u = "-" : t === m || y !== m.length - 1 ? (u = "+", r && r()) : u = "", m && (t = t.slice(0, -m.length), m[m.length - 1] === `
` && (m = m.slice(0, -1)), m = m.replace(At, `$&${c}`));
  let h = !1, g, k = -1;
  for (g = 0; g < t.length; ++g) {
    const $ = t[g];
    if ($ === " ")
      h = !0;
    else if ($ === `
`)
      k = g;
    else
      break;
  }
  let v = t.substring(0, k < g ? k + 1 : g);
  v && (t = t.substring(v.length), v = v.replace(/\n+/g, `$&${c}`));
  let p = (h ? c ? "2" : "1" : "") + u;
  if (s && (p += " " + a(s.replace(/ ?[\r\n]+/g, " ")), i && i()), !f) {
    const $ = t.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${c}`);
    let E = !1;
    const L = rt(n, !0);
    o !== "folded" && e !== O.BLOCK_FOLDED && (L.onOverflow = () => {
      E = !0;
    });
    const w = it(`${v}${$}${m}`, c, xt, L);
    if (!E)
      return `>${p}
${c}${w}`;
  }
  return t = t.replace(/\n+/g, `$&${c}`), `|${p}
${c}${v}${t}${m}`;
}
function qn(s, e, t, n) {
  const { type: i, value: r } = s, { actualString: o, implicitKey: a, indent: l, indentStep: c, inFlow: f } = e;
  if (a && r.includes(`
`) || f && /[[\]{},]/.test(r))
    return ye(r, e);
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
    return a || f || !r.includes(`
`) ? ye(r, e) : We(s, e, t, n);
  if (!a && !f && i !== O.PLAIN && r.includes(`
`))
    return We(s, e, t, n);
  if (ot(r)) {
    if (l === "")
      return e.forceBlockIndent = !0, We(s, e, t, n);
    if (a && l === c)
      return ye(r, e);
  }
  const u = r.replace(/\n+/g, `$&
${l}`);
  if (o) {
    const d = (h) => h.default && h.tag !== "tag:yaml.org,2002:str" && h.test?.test(u), { compat: m, tags: y } = e.doc.schema;
    if (y.some(d) || m?.some(d))
      return ye(r, e);
  }
  return a ? u : it(u, l, Ms, rt(e, !1));
}
function Ft(s, e, t, n) {
  const { implicitKey: i, inFlow: r } = e, o = typeof s.value == "string" ? s : Object.assign({}, s, { value: String(s.value) });
  let { type: a } = s;
  a !== O.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (a = O.QUOTE_DOUBLE);
  const l = (f) => {
    switch (f) {
      case O.BLOCK_FOLDED:
      case O.BLOCK_LITERAL:
        return i || r ? ye(o.value, e) : We(o, e, t, n);
      case O.QUOTE_DOUBLE:
        return Ce(o.value, e);
      case O.QUOTE_SINGLE:
        return Ot(o.value, e);
      case O.PLAIN:
        return qn(o, e, t, n);
      default:
        return null;
    }
  };
  let c = l(a);
  if (c === null) {
    const { defaultKeyType: f, defaultStringType: u } = e.options, d = i && f || u;
    if (c = l(d), c === null)
      throw new Error(`Unsupported default string type ${d}`);
  }
  return c;
}
function Cs(s, e) {
  const t = Object.assign({
    blockQuote: !0,
    commentString: Fn,
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
function Rn(s, e) {
  if (e.tag) {
    const i = s.filter((r) => r.tag === e.tag);
    if (i.length > 0)
      return i.find((r) => r.format === e.format) ?? i[0];
  }
  let t, n;
  if (_(e)) {
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
function Un(s, e, { anchors: t, doc: n }) {
  if (!n.directives)
    return "";
  const i = [], r = (_(s) || P(s)) && s.anchor;
  r && Ns(r) && (t.add(r), i.push(`&${r}`));
  const o = s.tag ?? (e.default ? null : e.tag);
  return o && i.push(n.directives.tagString(o)), i.join(" ");
}
function ke(s, e, t, n) {
  if (D(s))
    return s.toString(e, t, n);
  if (ve(s)) {
    if (e.doc.directives)
      return s.toString(e);
    if (e.resolvedAliases?.has(s))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    e.resolvedAliases ? e.resolvedAliases.add(s) : e.resolvedAliases = /* @__PURE__ */ new Set([s]), s = s.resolve(e.doc);
  }
  let i;
  const r = B(s) ? s : e.doc.createNode(s, { onTagObj: (l) => i = l });
  i ?? (i = Rn(e.doc.schema.tags, r));
  const o = Un(r, i, e);
  o.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + o.length + 1);
  const a = typeof i.stringify == "function" ? i.stringify(r, e, t, n) : _(r) ? Ft(r, e, t, n) : r.toString(e, t, n);
  return o ? _(r) || a[0] === "{" || a[0] === "[" ? `${o} ${a}` : `${o}
${e.indent}${a}` : a;
}
function Vn({ key: s, value: e }, t, n, i) {
  const { allNullValues: r, doc: o, indent: a, indentStep: l, options: { commentString: c, indentSeq: f, simpleKeys: u } } = t;
  let d = B(s) && s.comment || null;
  if (u) {
    if (d)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (P(s) || !B(s) && typeof s == "object") {
      const L = "With simple keys, collection cannot be used as a key value";
      throw new Error(L);
    }
  }
  let m = !u && (!s || d && e == null && !t.inFlow || P(s) || (_(s) ? s.type === O.BLOCK_FOLDED || s.type === O.BLOCK_LITERAL : typeof s == "object"));
  t = Object.assign({}, t, {
    allNullValues: !1,
    implicitKey: !m && (u || !r),
    indent: a + l
  });
  let y = !1, h = !1, g = ke(s, t, () => y = !0, () => h = !0);
  if (!m && !t.inFlow && g.length > 1024) {
    if (u)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    m = !0;
  }
  if (t.inFlow) {
    if (r || e == null)
      return y && n && n(), g === "" ? "?" : m ? `? ${g}` : g;
  } else if (r && !u || e == null && m)
    return g = `? ${g}`, d && !y ? g += le(g, t.indent, c(d)) : h && i && i(), g;
  y && (d = null), m ? (d && (g += le(g, t.indent, c(d))), g = `? ${g}
${a}:`) : (g = `${g}:`, d && (g += le(g, t.indent, c(d))));
  let k, v, S;
  B(e) ? (k = !!e.spaceBefore, v = e.commentBefore, S = e.comment) : (k = !1, v = null, S = null, e && typeof e == "object" && (e = o.createNode(e))), t.implicitKey = !1, !m && !d && _(e) && (t.indentAtStart = g.length + 1), h = !1, !f && l.length >= 2 && !t.inFlow && !m && Fe(e) && !e.flow && !e.tag && !e.anchor && (t.indent = t.indent.substring(2));
  let p = !1;
  const $ = ke(e, t, () => p = !0, () => h = !0);
  let E = " ";
  if (d || k || v) {
    if (E = k ? `
` : "", v) {
      const L = c(v);
      E += `
${X(L, t.indent)}`;
    }
    $ === "" && !t.inFlow ? E === `
` && S && (E = `

`) : E += `
${t.indent}`;
  } else if (!m && P(e)) {
    const L = $[0], w = $.indexOf(`
`), N = w !== -1, x = t.inFlow ?? e.flow ?? e.items.length === 0;
    if (N || !x) {
      let T = !1;
      if (N && (L === "&" || L === "!")) {
        let b = $.indexOf(" ");
        L === "&" && b !== -1 && b < w && $[b + 1] === "!" && (b = $.indexOf(" ", b + 1)), (b === -1 || w < b) && (T = !0);
      }
      T || (E = `
${t.indent}`);
    }
  } else ($ === "" || $[0] === `
`) && (E = "");
  return g += E + $, t.inFlow ? p && n && n() : S && !p ? g += le(g, t.indent, c(S)) : h && i && i(), g;
}
function Qn(s, e) {
  (s === "debug" || s === "warn") && console.warn(e);
}
const Ue = "<<", ee = {
  identify: (s) => s === Ue || typeof s == "symbol" && s.description === Ue,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new O(Symbol(Ue)), {
    addToJSMap: Is
  }),
  stringify: () => Ue
}, Gn = (s, e) => (ee.identify(e) || _(e) && (!e.type || e.type === O.PLAIN) && ee.identify(e.value)) && s?.doc.schema.tags.some((t) => t.tag === ee.tag && t.default);
function Is(s, e, t) {
  const n = _s(s, t);
  if (Fe(n))
    for (const i of n.items)
      gt(s, e, i);
  else if (Array.isArray(n))
    for (const i of n)
      gt(s, e, i);
  else
    gt(s, e, n);
}
function gt(s, e, t) {
  const n = _s(s, t);
  if (!De(n))
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
function _s(s, e) {
  return s && ve(e) ? e.resolve(s.doc, s) : e;
}
function js(s, e, { key: t, value: n }) {
  if (B(t) && t.addToJSMap)
    t.addToJSMap(s, e, n);
  else if (Gn(s, t))
    Is(s, e, n);
  else {
    const i = G(t, "", s);
    if (e instanceof Map)
      e.set(i, G(n, i, s));
    else if (e instanceof Set)
      e.add(i);
    else {
      const r = Hn(t, i, s), o = G(n, r, s);
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
function Hn(s, e, t) {
  if (e === null)
    return "";
  if (typeof e != "object")
    return String(e);
  if (B(s) && t?.doc) {
    const n = Cs(t.doc, {});
    n.anchors = /* @__PURE__ */ new Set();
    for (const r of t.anchors.keys())
      n.anchors.add(r.anchor);
    n.inFlow = !0, n.inStringifyKey = !0;
    const i = s.toString(n);
    if (!t.mapKeyWarned) {
      let r = JSON.stringify(i);
      r.length > 40 && (r = r.substring(0, 36) + '..."'), Qn(t.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`), t.mapKeyWarned = !0;
    }
    return i;
  }
  return JSON.stringify(e);
}
function Kt(s, e, t) {
  const n = _e(s, void 0, t), i = _e(e, void 0, t);
  return new R(n, i);
}
class R {
  constructor(e, t = null) {
    Object.defineProperty(this, H, { value: Es }), this.key = e, this.value = t;
  }
  clone(e) {
    let { key: t, value: n } = this;
    return B(t) && (t = t.clone(e)), B(n) && (n = n.clone(e)), new R(t, n);
  }
  toJSON(e, t) {
    const n = t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return js(t, n, this);
  }
  toString(e, t, n) {
    return e?.doc ? Vn(this, e, t, n) : JSON.stringify(this);
  }
}
function Ps(s, e, t) {
  return (e.inFlow ?? s.flow ? Yn : zn)(s, e, t);
}
function zn({ comment: s, items: e }, t, { blockItemPrefix: n, flowChars: i, itemIndent: r, onChompKeep: o, onComment: a }) {
  const { indent: l, options: { commentString: c } } = t, f = Object.assign({}, t, { indent: r, type: null });
  let u = !1;
  const d = [];
  for (let y = 0; y < e.length; ++y) {
    const h = e[y];
    let g = null;
    if (B(h))
      !u && h.spaceBefore && d.push(""), et(t, d, h.commentBefore, u), h.comment && (g = h.comment);
    else if (D(h)) {
      const v = B(h.key) ? h.key : null;
      v && (!u && v.spaceBefore && d.push(""), et(t, d, v.commentBefore, u));
    }
    u = !1;
    let k = ke(h, f, () => g = null, () => u = !0);
    g && (k += le(k, r, c(g))), u && g && (u = !1), d.push(n + k);
  }
  let m;
  if (d.length === 0)
    m = i.start + i.end;
  else {
    m = d[0];
    for (let y = 1; y < d.length; ++y) {
      const h = d[y];
      m += h ? `
${l}${h}` : `
`;
    }
  }
  return s ? (m += `
` + X(c(s), l), a && a()) : u && o && o(), m;
}
function Yn({ items: s }, e, { flowChars: t, itemIndent: n }) {
  const { indent: i, indentStep: r, flowCollectionPadding: o, options: { commentString: a } } = e;
  n += r;
  const l = Object.assign({}, e, {
    indent: n,
    inFlow: !0,
    type: null
  });
  let c = !1, f = 0;
  const u = [];
  for (let y = 0; y < s.length; ++y) {
    const h = s[y];
    let g = null;
    if (B(h))
      h.spaceBefore && u.push(""), et(e, u, h.commentBefore, !1), h.comment && (g = h.comment);
    else if (D(h)) {
      const v = B(h.key) ? h.key : null;
      v && (v.spaceBefore && u.push(""), et(e, u, v.commentBefore, !1), v.comment && (c = !0));
      const S = B(h.value) ? h.value : null;
      S ? (S.comment && (g = S.comment), S.commentBefore && (c = !0)) : h.value == null && v?.comment && (g = v.comment);
    }
    g && (c = !0);
    let k = ke(h, l, () => g = null);
    c || (c = u.length > f || k.includes(`
`)), y < s.length - 1 ? k += "," : e.options.trailingComma && (e.options.lineWidth > 0 && (c || (c = u.reduce((v, S) => v + S.length + 2, 2) + (k.length + 2) > e.options.lineWidth)), c && (k += ",")), g && (k += le(k, n, a(g))), u.push(k), f = u.length;
  }
  const { start: d, end: m } = t;
  if (u.length === 0)
    return d + m;
  if (!c) {
    const y = u.reduce((h, g) => h + g.length + 2, 2);
    c = e.options.lineWidth > 0 && y > e.options.lineWidth;
  }
  if (c) {
    let y = d;
    for (const h of u)
      y += h ? `
${r}${i}${h}` : `
`;
    return `${y}
${i}${m}`;
  } else
    return `${d}${o}${u.join(" ")}${o}${m}`;
}
function et({ indent: s, options: { commentString: e } }, t, n, i) {
  if (n && i && (n = n.replace(/^\n+/, "")), n) {
    const r = X(e(n), s);
    t.push(r.trimStart());
  }
}
function fe(s, e) {
  const t = _(e) ? e.value : e;
  for (const n of s)
    if (D(n) && (n.key === e || n.key === t || _(n.key) && n.key.value === t))
      return n;
}
class Q extends Ts {
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
    const { keepUndefined: i, replacer: r } = n, o = new this(e), a = (l, c) => {
      if (typeof r == "function")
        c = r.call(t, l, c);
      else if (Array.isArray(r) && !r.includes(l))
        return;
      (c !== void 0 || i) && o.items.push(Kt(l, c, n));
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
    D(e) ? n = e : !e || typeof e != "object" || !("key" in e) ? n = new R(e, e?.value) : n = new R(e.key, e.value);
    const i = fe(this.items, n.key), r = this.schema?.sortMapEntries;
    if (i) {
      if (!t)
        throw new Error(`Key ${n.key} already set`);
      _(i.value) && As(n.value) ? i.value.value = n.value : i.value = n.value;
    } else if (r) {
      const o = this.items.findIndex((a) => r(n, a) < 0);
      o === -1 ? this.items.push(n) : this.items.splice(o, 0, n);
    } else
      this.items.push(n);
  }
  delete(e) {
    const t = fe(this.items, e);
    return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
  }
  get(e, t) {
    const i = fe(this.items, e)?.value;
    return (!t && _(i) ? i.value : i) ?? void 0;
  }
  has(e) {
    return !!fe(this.items, e);
  }
  set(e, t) {
    this.add(new R(e, t), !0);
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
      js(t, i, r);
    return i;
  }
  toString(e, t, n) {
    if (!e)
      return JSON.stringify(this);
    for (const i of this.items)
      if (!D(i))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);
    return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), Ps(this, e, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: e.indent || "",
      onChompKeep: n,
      onComment: t
    });
  }
}
const Le = {
  collection: "map",
  default: !0,
  nodeClass: Q,
  tag: "tag:yaml.org,2002:map",
  resolve(s, e) {
    return De(s) || e("Expected a mapping for this tag"), s;
  },
  createNode: (s, e, t) => Q.from(s, e, t)
};
class ue extends Ts {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(e) {
    super(Se, e), this.items = [];
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
    const t = Ve(e);
    return typeof t != "number" ? !1 : this.items.splice(t, 1).length > 0;
  }
  get(e, t) {
    const n = Ve(e);
    if (typeof n != "number")
      return;
    const i = this.items[n];
    return !t && _(i) ? i.value : i;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(e) {
    const t = Ve(e);
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
    const n = Ve(e);
    if (typeof n != "number")
      throw new Error(`Expected a valid index, not ${e}.`);
    const i = this.items[n];
    _(i) && As(t) ? i.value = t : this.items[n] = t;
  }
  toJSON(e, t) {
    const n = [];
    t?.onCreate && t.onCreate(n);
    let i = 0;
    for (const r of this.items)
      n.push(G(r, String(i++), t));
    return n;
  }
  toString(e, t, n) {
    return e ? Ps(this, e, {
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
        r.items.push(_e(a, void 0, n));
      }
    }
    return r;
  }
}
function Ve(s) {
  let e = _(s) ? s.value : s;
  return e && typeof e == "string" && (e = Number(e)), typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
const Ne = {
  collection: "seq",
  default: !0,
  nodeClass: ue,
  tag: "tag:yaml.org,2002:seq",
  resolve(s, e) {
    return Fe(s) || e("Expected a sequence for this tag"), s;
  },
  createNode: (s, e, t) => ue.from(s, e, t)
}, at = {
  identify: (s) => typeof s == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (s) => s,
  stringify(s, e, t, n) {
    return e = Object.assign({ actualString: !0 }, e), Ft(s, e, t, n);
  }
}, ct = {
  identify: (s) => s == null,
  createNode: () => new O(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new O(null),
  stringify: ({ source: s }, e) => typeof s == "string" && ct.test.test(s) ? s : e.options.nullStr
}, qt = {
  identify: (s) => typeof s == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (s) => new O(s[0] === "t" || s[0] === "T"),
  stringify({ source: s, value: e }, t) {
    if (s && qt.test.test(s)) {
      const n = s[0] === "t" || s[0] === "T";
      if (e === n)
        return s;
    }
    return e ? t.options.trueStr : t.options.falseStr;
  }
};
function W({ format: s, minFractionDigits: e, tag: t, value: n }) {
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
const Bs = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: W
}, Ds = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (s) => parseFloat(s),
  stringify(s) {
    const e = Number(s.value);
    return isFinite(e) ? e.toExponential() : W(s);
  }
}, Fs = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(s) {
    const e = new O(parseFloat(s)), t = s.indexOf(".");
    return t !== -1 && s[s.length - 1] === "0" && (e.minFractionDigits = s.length - t - 1), e;
  },
  stringify: W
}, lt = (s) => typeof s == "bigint" || Number.isInteger(s), Rt = (s, e, t, { intAsBigInt: n }) => n ? BigInt(s) : parseInt(s.substring(e), t);
function Ks(s, e, t) {
  const { value: n } = s;
  return lt(n) && n >= 0 ? t + n.toString(e) : W(s);
}
const qs = {
  identify: (s) => lt(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (s, e, t) => Rt(s, 2, 8, t),
  stringify: (s) => Ks(s, 8, "0o")
}, Rs = {
  identify: lt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (s, e, t) => Rt(s, 0, 10, t),
  stringify: W
}, Us = {
  identify: (s) => lt(s) && s >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (s, e, t) => Rt(s, 2, 16, t),
  stringify: (s) => Ks(s, 16, "0x")
}, Wn = [
  Le,
  Ne,
  at,
  ct,
  qt,
  qs,
  Rs,
  Us,
  Bs,
  Ds,
  Fs
];
function ts(s) {
  return typeof s == "bigint" || Number.isInteger(s);
}
const Qe = ({ value: s }) => JSON.stringify(s), Jn = [
  {
    identify: (s) => typeof s == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (s) => s,
    stringify: Qe
  },
  {
    identify: (s) => s == null,
    createNode: () => new O(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: Qe
  },
  {
    identify: (s) => typeof s == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (s) => s === "true",
    stringify: Qe
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
    stringify: Qe
  }
], Xn = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(s, e) {
    return e(`Unresolved plain scalar ${JSON.stringify(s)}`), s;
  }
}, Zn = [Le, Ne].concat(Jn, Xn), Ut = {
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
      const l = Math.max(n.options.lineWidth - n.indent.length, n.options.minContentWidth), c = Math.ceil(a.length / l), f = new Array(c);
      for (let u = 0, d = 0; u < c; ++u, d += l)
        f[u] = a.substr(d, l);
      a = f.join(e === O.BLOCK_LITERAL ? `
` : " ");
    }
    return Ft({ comment: s, type: e, value: a }, n, i, r);
  }
};
function Vs(s, e) {
  if (Fe(s))
    for (let t = 0; t < s.items.length; ++t) {
      let n = s.items[t];
      if (!D(n)) {
        if (De(n)) {
          n.items.length > 1 && e("Each pair must have its own sequence indicator");
          const i = n.items[0] || new R(new O(null));
          if (n.commentBefore && (i.key.commentBefore = i.key.commentBefore ? `${n.commentBefore}
${i.key.commentBefore}` : n.commentBefore), n.comment) {
            const r = i.value ?? i.key;
            r.comment = r.comment ? `${n.comment}
${r.comment}` : n.comment;
          }
          n = i;
        }
        s.items[t] = D(n) ? n : new R(n);
      }
    }
  else
    e("Expected a sequence for this tag");
  return s;
}
function Qs(s, e, t) {
  const { replacer: n } = t, i = new ue(s);
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
      i.items.push(Kt(a, l, t));
    }
  return i;
}
const Vt = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: Vs,
  createNode: Qs
};
class we extends ue {
  constructor() {
    super(), this.add = Q.prototype.add.bind(this), this.delete = Q.prototype.delete.bind(this), this.get = Q.prototype.get.bind(this), this.has = Q.prototype.has.bind(this), this.set = Q.prototype.set.bind(this), this.tag = we.tag;
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
      if (D(i) ? (r = G(i.key, "", t), o = G(i.value, r, t)) : r = G(i, "", t), n.has(r))
        throw new Error("Ordered maps must not include duplicate keys");
      n.set(r, o);
    }
    return n;
  }
  static from(e, t, n) {
    const i = Qs(e, t, n), r = new this();
    return r.items = i.items, r;
  }
}
we.tag = "tag:yaml.org,2002:omap";
const Qt = {
  collection: "seq",
  identify: (s) => s instanceof Map,
  nodeClass: we,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(s, e) {
    const t = Vs(s, e), n = [];
    for (const { key: i } of t.items)
      _(i) && (n.includes(i.value) ? e(`Ordered maps must not include duplicate keys: ${i.value}`) : n.push(i.value));
    return Object.assign(new we(), t);
  },
  createNode: (s, e, t) => we.from(s, e, t)
};
function Gs({ value: s, source: e }, t) {
  return e && (s ? Hs : zs).test.test(e) ? e : s ? t.options.trueStr : t.options.falseStr;
}
const Hs = {
  identify: (s) => s === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new O(!0),
  stringify: Gs
}, zs = {
  identify: (s) => s === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new O(!1),
  stringify: Gs
}, ei = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (s) => s.slice(-3).toLowerCase() === "nan" ? NaN : s[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: W
}, ti = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (s) => parseFloat(s.replace(/_/g, "")),
  stringify(s) {
    const e = Number(s.value);
    return isFinite(e) ? e.toExponential() : W(s);
  }
}, si = {
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
  stringify: W
}, Ke = (s) => typeof s == "bigint" || Number.isInteger(s);
function ft(s, e, t, { intAsBigInt: n }) {
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
  if (Ke(n)) {
    const i = n.toString(e);
    return n < 0 ? "-" + t + i.substr(1) : t + i;
  }
  return W(s);
}
const ni = {
  identify: Ke,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (s, e, t) => ft(s, 2, 2, t),
  stringify: (s) => Gt(s, 2, "0b")
}, ii = {
  identify: Ke,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (s, e, t) => ft(s, 1, 8, t),
  stringify: (s) => Gt(s, 8, "0")
}, ri = {
  identify: Ke,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (s, e, t) => ft(s, 0, 10, t),
  stringify: W
}, oi = {
  identify: Ke,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (s, e, t) => ft(s, 2, 16, t),
  stringify: (s) => Gt(s, 16, "0x")
};
class be extends Q {
  constructor(e) {
    super(e), this.tag = be.tag;
  }
  add(e) {
    let t;
    D(e) ? t = e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? t = new R(e.key, null) : t = new R(e, null), fe(this.items, t.key) || this.items.push(t);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(e, t) {
    const n = fe(this.items, e);
    return !t && D(n) ? _(n.key) ? n.key.value : n.key : n;
  }
  set(e, t) {
    if (typeof t != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
    const n = fe(this.items, e);
    n && !t ? this.items.splice(this.items.indexOf(n), 1) : !n && t && this.items.push(new R(e));
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
        typeof i == "function" && (o = i.call(t, o, o)), r.items.push(Kt(o, null, n));
    return r;
  }
}
be.tag = "tag:yaml.org,2002:set";
const Ht = {
  collection: "map",
  identify: (s) => s instanceof Set,
  nodeClass: be,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (s, e, t) => be.from(s, e, t),
  resolve(s, e) {
    if (De(s)) {
      if (s.hasAllNullValues(!0))
        return Object.assign(new be(), s);
      e("Set items must all have null values");
    } else
      e("Expected a mapping for this tag");
    return s;
  }
};
function zt(s, e) {
  const t = s[0], n = t === "-" || t === "+" ? s.substring(1) : s, i = (o) => e ? BigInt(o) : Number(o), r = n.replace(/_/g, "").split(":").reduce((o, a) => o * i(60) + i(a), i(0));
  return t === "-" ? i(-1) * r : r;
}
function Ys(s) {
  let { value: e } = s, t = (o) => o;
  if (typeof e == "bigint")
    t = (o) => BigInt(o);
  else if (isNaN(e) || !isFinite(e))
    return W(s);
  let n = "";
  e < 0 && (n = "-", e *= t(-1));
  const i = t(60), r = [e % i];
  return e < 60 ? r.unshift(0) : (e = (e - r[0]) / i, r.unshift(e % i), e >= 60 && (e = (e - r[0]) / i, r.unshift(e))), n + r.map((o) => String(o).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const Ws = {
  identify: (s) => typeof s == "bigint" || Number.isInteger(s),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (s, e, { intAsBigInt: t }) => zt(s, t),
  stringify: Ys
}, Js = {
  identify: (s) => typeof s == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (s) => zt(s, !1),
  stringify: Ys
}, ut = {
  identify: (s) => s instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(s) {
    const e = s.match(ut.test);
    if (!e)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, t, n, i, r, o, a] = e.map(Number), l = e[7] ? Number((e[7] + "00").substr(1, 3)) : 0;
    let c = Date.UTC(t, n - 1, i, r || 0, o || 0, a || 0, l);
    const f = e[8];
    if (f && f !== "Z") {
      let u = zt(f, !1);
      Math.abs(u) < 30 && (u *= 60), c -= 6e4 * u;
    }
    return new Date(c);
  },
  stringify: ({ value: s }) => s?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, ss = [
  Le,
  Ne,
  at,
  ct,
  Hs,
  zs,
  ni,
  ii,
  ri,
  oi,
  ei,
  ti,
  si,
  Ut,
  ee,
  Qt,
  Vt,
  Ht,
  Ws,
  Js,
  ut
], ns = /* @__PURE__ */ new Map([
  ["core", Wn],
  ["failsafe", [Le, Ne, at]],
  ["json", Zn],
  ["yaml11", ss],
  ["yaml-1.1", ss]
]), is = {
  binary: Ut,
  bool: qt,
  float: Fs,
  floatExp: Ds,
  floatNaN: Bs,
  floatTime: Js,
  int: Rs,
  intHex: Us,
  intOct: qs,
  intTime: Ws,
  map: Le,
  merge: ee,
  null: ct,
  omap: Qt,
  pairs: Vt,
  seq: Ne,
  set: Ht,
  timestamp: ut
}, ai = {
  "tag:yaml.org,2002:binary": Ut,
  "tag:yaml.org,2002:merge": ee,
  "tag:yaml.org,2002:omap": Qt,
  "tag:yaml.org,2002:pairs": Vt,
  "tag:yaml.org,2002:set": Ht,
  "tag:yaml.org,2002:timestamp": ut
};
function yt(s, e, t) {
  const n = ns.get(e);
  if (n && !s)
    return t && !n.includes(ee) ? n.concat(ee) : n.slice();
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
  return t && (i = i.concat(ee)), i.reduce((r, o) => {
    const a = typeof o == "string" ? is[o] : o;
    if (!a) {
      const l = JSON.stringify(o), c = Object.keys(is).map((f) => JSON.stringify(f)).join(", ");
      throw new Error(`Unknown custom tag ${l}; use one of ${c}`);
    }
    return r.includes(a) || r.push(a), r;
  }, []);
}
const ci = (s, e) => s.key < e.key ? -1 : s.key > e.key ? 1 : 0;
class Yt {
  constructor({ compat: e, customTags: t, merge: n, resolveKnownTags: i, schema: r, sortMapEntries: o, toStringDefaults: a }) {
    this.compat = Array.isArray(e) ? yt(e, "compat") : e ? yt(null, e) : null, this.name = typeof r == "string" && r || "core", this.knownTags = i ? ai : {}, this.tags = yt(t, this.name, n), this.toStringOptions = a ?? null, Object.defineProperty(this, ne, { value: Le }), Object.defineProperty(this, J, { value: at }), Object.defineProperty(this, Se, { value: Ne }), this.sortMapEntries = typeof o == "function" ? o : o === !0 ? ci : null;
  }
  clone() {
    const e = Object.create(Yt.prototype, Object.getOwnPropertyDescriptors(this));
    return e.tags = this.tags.slice(), e;
  }
}
function li(s, e) {
  const t = [];
  let n = e.directives === !0;
  if (e.directives !== !1 && s.directives) {
    const l = s.directives.toString(s);
    l ? (t.push(l), n = !0) : s.directives.docStart && (n = !0);
  }
  n && t.push("---");
  const i = Cs(s, e), { commentString: r } = i.options;
  if (s.commentBefore) {
    t.length !== 1 && t.unshift("");
    const l = r(s.commentBefore);
    t.unshift(X(l, ""));
  }
  let o = !1, a = null;
  if (s.contents) {
    if (B(s.contents)) {
      if (s.contents.spaceBefore && n && t.push(""), s.contents.commentBefore) {
        const f = r(s.contents.commentBefore);
        t.push(X(f, ""));
      }
      i.forceBlockIndent = !!s.comment, a = s.contents.comment;
    }
    const l = a ? void 0 : () => o = !0;
    let c = ke(s.contents, i, () => a = null, l);
    a && (c += le(c, "", r(a))), (c[0] === "|" || c[0] === ">") && t[t.length - 1] === "---" ? t[t.length - 1] = `--- ${c}` : t.push(c);
  } else
    t.push(ke(s.contents, i));
  if (s.directives?.docEnd)
    if (s.comment) {
      const l = r(s.comment);
      l.includes(`
`) ? (t.push("..."), t.push(X(l, ""))) : t.push(`... ${l}`);
    } else
      t.push("...");
  else {
    let l = s.comment;
    l && o && (l = l.replace(/^\n+/, "")), l && ((!o || a) && t[t.length - 1] !== "" && t.push(""), t.push(X(r(l), "")));
  }
  return t.join(`
`) + `
`;
}
class ht {
  constructor(e, t, n) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, H, { value: Nt });
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
    n?._directives ? (this.directives = n._directives.atDocument(), this.directives.yaml.explicit && (o = this.directives.yaml.version)) : this.directives = new q({ version: o }), this.setSchema(o, n), this.contents = e === void 0 ? null : this.createNode(e, i, n);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const e = Object.create(ht.prototype, {
      [H]: { value: Nt }
    });
    return e.commentBefore = this.commentBefore, e.comment = this.comment, e.errors = this.errors.slice(), e.warnings = this.warnings.slice(), e.options = Object.assign({}, this.options), this.directives && (e.directives = this.directives.clone()), e.schema = this.schema.clone(), e.contents = B(this.contents) ? this.contents.clone(e.schema) : this.contents, this.range && (e.range = this.range.slice()), e;
  }
  /** Adds a value to the document. */
  add(e) {
    he(this.contents) && this.contents.add(e);
  }
  /** Adds a value to the document. */
  addIn(e, t) {
    he(this.contents) && this.contents.addIn(e, t);
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
      const n = xs(this);
      e.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !t || n.has(t) ? Os(t || "a", n) : t;
    }
    return new Dt(e.anchor);
  }
  createNode(e, t, n) {
    let i;
    if (typeof t == "function")
      e = t.call({ "": e }, "", e), i = t;
    else if (Array.isArray(t)) {
      const g = (v) => typeof v == "number" || v instanceof String || v instanceof Number, k = t.filter(g).map(String);
      k.length > 0 && (t = t.concat(k)), i = t;
    } else n === void 0 && t && (n = t, t = void 0);
    const { aliasDuplicateObjects: r, anchorPrefix: o, flow: a, keepUndefined: l, onTagObj: c, tag: f } = n ?? {}, { onAnchor: u, setAnchors: d, sourceObjects: m } = Pn(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      o || "a"
    ), y = {
      aliasDuplicateObjects: r ?? !0,
      keepUndefined: l ?? !1,
      onAnchor: u,
      onTagObj: c,
      replacer: i,
      schema: this.schema,
      sourceObjects: m
    }, h = _e(e, f, y);
    return a && P(h) && (h.flow = !0), d(), h;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(e, t, n = {}) {
    const i = this.createNode(e, null, n), r = this.createNode(t, null, n);
    return new R(i, r);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    return he(this.contents) ? this.contents.delete(e) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    return Ae(e) ? this.contents == null ? !1 : (this.contents = null, !0) : he(this.contents) ? this.contents.deleteIn(e) : !1;
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
    return Ae(e) ? !t && _(this.contents) ? this.contents.value : this.contents : P(this.contents) ? this.contents.getIn(e, t) : void 0;
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
    return Ae(e) ? this.contents !== void 0 : P(this.contents) ? this.contents.hasIn(e) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(e, t) {
    this.contents == null ? this.contents = Ze(this.schema, [e], t) : he(this.contents) && this.contents.set(e, t);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    Ae(e) ? this.contents = t : this.contents == null ? this.contents = Ze(this.schema, Array.from(e), t) : he(this.contents) && this.contents.setIn(e, t);
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
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new q({ version: "1.1" }), n = { resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = e : this.directives = new q({ version: e }), n = { resolveKnownTags: !0, schema: "core" };
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
      this.schema = new Yt(Object.assign(n, t));
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
    }, l = G(this.contents, t ?? "", a);
    if (typeof r == "function")
      for (const { count: c, res: f } of a.anchors.values())
        r(f, c);
    return typeof o == "function" ? ge(o, { "": l }, "", l) : l;
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
    return li(this, e);
  }
}
function he(s) {
  if (P(s))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class Xs extends Error {
  constructor(e, t, n, i) {
    super(), this.name = e, this.code = n, this.message = i, this.pos = t;
  }
}
class Te extends Xs {
  constructor(e, t, n) {
    super("YAMLParseError", e, t, n);
  }
}
class fi extends Xs {
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
    const l = t.linePos[1];
    l?.line === n && l.col > i && (a = Math.max(1, Math.min(l.col - i, 80 - r)));
    const c = " ".repeat(r) + "^".repeat(a);
    t.message += `:

${o}
${c}
`;
  }
};
function $e(s, { flow: e, indicator: t, next: n, offset: i, onError: r, parentIndent: o, startOnNewline: a }) {
  let l = !1, c = a, f = a, u = "", d = "", m = !1, y = !1, h = null, g = null, k = null, v = null, S = null, p = null, $ = null;
  for (const w of s)
    switch (y && (w.type !== "space" && w.type !== "newline" && w.type !== "comma" && r(w.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), y = !1), h && (c && w.type !== "comment" && w.type !== "newline" && r(h, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), h = null), w.type) {
      case "space":
        !e && (t !== "doc-start" || n?.type !== "flow-collection") && w.source.includes("	") && (h = w), f = !0;
        break;
      case "comment": {
        f || r(w, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const N = w.source.substring(1) || " ";
        u ? u += d + N : u = N, d = "", c = !1;
        break;
      }
      case "newline":
        c ? u ? u += w.source : (!p || t !== "seq-item-ind") && (l = !0) : d += w.source, c = !0, m = !0, (g || k) && (v = w), f = !0;
        break;
      case "anchor":
        g && r(w, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), w.source.endsWith(":") && r(w.offset + w.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), g = w, $ ?? ($ = w.offset), c = !1, f = !1, y = !0;
        break;
      case "tag": {
        k && r(w, "MULTIPLE_TAGS", "A node can have at most one tag"), k = w, $ ?? ($ = w.offset), c = !1, f = !1, y = !0;
        break;
      }
      case t:
        (g || k) && r(w, "BAD_PROP_ORDER", `Anchors and tags must be after the ${w.source} indicator`), p && r(w, "UNEXPECTED_TOKEN", `Unexpected ${w.source} in ${e ?? "collection"}`), p = w, c = t === "seq-item-ind" || t === "explicit-key-ind", f = !1;
        break;
      case "comma":
        if (e) {
          S && r(w, "UNEXPECTED_TOKEN", `Unexpected , in ${e}`), S = w, c = !1, f = !1;
          break;
        }
      // else fallthrough
      default:
        r(w, "UNEXPECTED_TOKEN", `Unexpected ${w.type} token`), c = !1, f = !1;
    }
  const E = s[s.length - 1], L = E ? E.offset + E.source.length : i;
  return y && n && n.type !== "space" && n.type !== "newline" && n.type !== "comma" && (n.type !== "scalar" || n.source !== "") && r(n.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), h && (c && h.indent <= o || n?.type === "block-map" || n?.type === "block-seq") && r(h, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: S,
    found: p,
    spaceBefore: l,
    comment: u,
    hasNewline: m,
    anchor: g,
    tag: k,
    newlineAfterProp: v,
    end: L,
    start: $ ?? L
  };
}
function je(s) {
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
        if (je(e.key) || je(e.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function Tt(s, e, t) {
  if (e?.type === "flow-collection") {
    const n = e.end[0];
    n.indent === s && (n.source === "]" || n.source === "}") && je(e) && t(n, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function Zs(s, e, t) {
  const { uniqueKeys: n } = s.options;
  if (n === !1)
    return !1;
  const i = typeof n == "function" ? n : (r, o) => r === o || _(r) && _(o) && r.value === o.value;
  return e.some((r) => i(r.key, t));
}
const os = "All mapping items must start at the same column";
function ui({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = r?.nodeClass ?? Q, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1);
  let l = n.offset, c = null;
  for (const f of n.items) {
    const { start: u, key: d, sep: m, value: y } = f, h = $e(u, {
      indicator: "explicit-key-ind",
      next: d ?? m?.[0],
      offset: l,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !0
    }), g = !h.found;
    if (g) {
      if (d && (d.type === "block-seq" ? i(l, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in d && d.indent !== n.indent && i(l, "BAD_INDENT", os)), !h.anchor && !h.tag && !m) {
        c = h.end, h.comment && (a.comment ? a.comment += `
` + h.comment : a.comment = h.comment);
        continue;
      }
      (h.newlineAfterProp || je(d)) && i(d ?? u[u.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else h.found?.indent !== n.indent && i(l, "BAD_INDENT", os);
    t.atKey = !0;
    const k = h.end, v = d ? s(t, d, h, i) : e(t, k, u, null, h, i);
    t.schema.compat && Tt(n.indent, d, i), t.atKey = !1, Zs(t, a.items, v) && i(k, "DUPLICATE_KEY", "Map keys must be unique");
    const S = $e(m ?? [], {
      indicator: "map-value-ind",
      next: y,
      offset: v.range[2],
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !d || d.type === "block-scalar"
    });
    if (l = S.end, S.found) {
      g && (y?.type === "block-map" && !S.hasNewline && i(l, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), t.options.strict && h.start < S.found.offset - 1024 && i(v.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const p = y ? s(t, y, S, i) : e(t, l, m, null, S, i);
      t.schema.compat && Tt(n.indent, y, i), l = p.range[2];
      const $ = new R(v, p);
      t.options.keepSourceTokens && ($.srcToken = f), a.items.push($);
    } else {
      g && i(v.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), S.comment && (v.comment ? v.comment += `
` + S.comment : v.comment = S.comment);
      const p = new R(v);
      t.options.keepSourceTokens && (p.srcToken = f), a.items.push(p);
    }
  }
  return c && c < l && i(c, "IMPOSSIBLE", "Map comment with trailing content"), a.range = [n.offset, l, c ?? l], a;
}
function hi({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = r?.nodeClass ?? ue, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let l = n.offset, c = null;
  for (const { start: f, value: u } of n.items) {
    const d = $e(f, {
      indicator: "seq-item-ind",
      next: u,
      offset: l,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !0
    });
    if (!d.found)
      if (d.anchor || d.tag || u)
        u?.type === "block-seq" ? i(d.end, "BAD_INDENT", "All sequence items must start at the same column") : i(l, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        c = d.end, d.comment && (a.comment = d.comment);
        continue;
      }
    const m = u ? s(t, u, d, i) : e(t, d.end, f, null, d, i);
    t.schema.compat && Tt(n.indent, u, i), l = m.range[2], a.items.push(m);
  }
  return a.range = [n.offset, l, c ?? l], a;
}
function qe(s, e, t, n) {
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
          const f = l.substring(1) || " ";
          i ? i += o + f : i = f, o = "";
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
const wt = "Block collections are not allowed within flow collections", bt = (s) => s && (s.type === "block-map" || s.type === "block-seq");
function di({ composeNode: s, composeEmptyNode: e }, t, n, i, r) {
  const o = n.start.source === "{", a = o ? "flow map" : "flow sequence", l = r?.nodeClass ?? (o ? Q : ue), c = new l(t.schema);
  c.flow = !0;
  const f = t.atRoot;
  f && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let u = n.offset + n.start.source.length;
  for (let g = 0; g < n.items.length; ++g) {
    const k = n.items[g], { start: v, key: S, sep: p, value: $ } = k, E = $e(v, {
      flow: a,
      indicator: "explicit-key-ind",
      next: S ?? p?.[0],
      offset: u,
      onError: i,
      parentIndent: n.indent,
      startOnNewline: !1
    });
    if (!E.found) {
      if (!E.anchor && !E.tag && !p && !$) {
        g === 0 && E.comma ? i(E.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`) : g < n.items.length - 1 && i(E.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${a}`), E.comment && (c.comment ? c.comment += `
` + E.comment : c.comment = E.comment), u = E.end;
        continue;
      }
      !o && t.options.strict && je(S) && i(
        S,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (g === 0)
      E.comma && i(E.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`);
    else if (E.comma || i(E.start, "MISSING_CHAR", `Missing , between ${a} items`), E.comment) {
      let L = "";
      e: for (const w of v)
        switch (w.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            L = w.source.substring(1);
            break e;
          default:
            break e;
        }
      if (L) {
        let w = c.items[c.items.length - 1];
        D(w) && (w = w.value ?? w.key), w.comment ? w.comment += `
` + L : w.comment = L, E.comment = E.comment.substring(L.length + 1);
      }
    }
    if (!o && !p && !E.found) {
      const L = $ ? s(t, $, E, i) : e(t, E.end, p, null, E, i);
      c.items.push(L), u = L.range[2], bt($) && i(L.range, "BLOCK_IN_FLOW", wt);
    } else {
      t.atKey = !0;
      const L = E.end, w = S ? s(t, S, E, i) : e(t, L, v, null, E, i);
      bt(S) && i(w.range, "BLOCK_IN_FLOW", wt), t.atKey = !1;
      const N = $e(p ?? [], {
        flow: a,
        indicator: "map-value-ind",
        next: $,
        offset: w.range[2],
        onError: i,
        parentIndent: n.indent,
        startOnNewline: !1
      });
      if (N.found) {
        if (!o && !E.found && t.options.strict) {
          if (p)
            for (const b of p) {
              if (b === N.found)
                break;
              if (b.type === "newline") {
                i(b, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          E.start < N.found.offset - 1024 && i(N.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else $ && ("source" in $ && $.source?.[0] === ":" ? i($, "MISSING_CHAR", `Missing space after : in ${a}`) : i(N.start, "MISSING_CHAR", `Missing , or : between ${a} items`));
      const x = $ ? s(t, $, N, i) : N.found ? e(t, N.end, p, null, N, i) : null;
      x ? bt($) && i(x.range, "BLOCK_IN_FLOW", wt) : N.comment && (w.comment ? w.comment += `
` + N.comment : w.comment = N.comment);
      const T = new R(w, x);
      if (t.options.keepSourceTokens && (T.srcToken = k), o) {
        const b = c;
        Zs(t, b.items, w) && i(L, "DUPLICATE_KEY", "Map keys must be unique"), b.items.push(T);
      } else {
        const b = new Q(t.schema);
        b.flow = !0, b.items.push(T);
        const A = (x ?? w).range;
        b.range = [w.range[0], A[1], A[2]], c.items.push(b);
      }
      u = x ? x.range[2] : N.end;
    }
  }
  const d = o ? "}" : "]", [m, ...y] = n.end;
  let h = u;
  if (m?.source === d)
    h = m.offset + m.source.length;
  else {
    const g = a[0].toUpperCase() + a.substring(1), k = f ? `${g} must end with a ${d}` : `${g} in block collection must be sufficiently indented and end with a ${d}`;
    i(u, f ? "MISSING_CHAR" : "BAD_INDENT", k), m && m.source.length !== 1 && y.unshift(m);
  }
  if (y.length > 0) {
    const g = qe(y, h, t.options.strict, i);
    g.comment && (c.comment ? c.comment += `
` + g.comment : c.comment = g.comment), c.range = [n.offset, h, g.offset];
  } else
    c.range = [n.offset, h, h];
  return c;
}
function kt(s, e, t, n, i, r) {
  const o = t.type === "block-map" ? ui(s, e, t, n, r) : t.type === "block-seq" ? hi(s, e, t, n, r) : di(s, e, t, n, r), a = o.constructor;
  return i === "!" || i === a.tagName ? (o.tag = a.tagName, o) : (i && (o.tag = i), o);
}
function pi(s, e, t, n, i) {
  const r = n.tag, o = r ? e.directives.tagName(r.source, (d) => i(r, "TAG_RESOLVE_FAILED", d)) : null;
  if (t.type === "block-seq") {
    const { anchor: d, newlineAfterProp: m } = n, y = d && r ? d.offset > r.offset ? d : r : d ?? r;
    y && (!m || m.offset < y.offset) && i(y, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const a = t.type === "block-map" ? "map" : t.type === "block-seq" ? "seq" : t.start.source === "{" ? "map" : "seq";
  if (!r || !o || o === "!" || o === Q.tagName && a === "map" || o === ue.tagName && a === "seq")
    return kt(s, e, t, i, o);
  let l = e.schema.tags.find((d) => d.tag === o && d.collection === a);
  if (!l) {
    const d = e.schema.knownTags[o];
    if (d?.collection === a)
      e.schema.tags.push(Object.assign({}, d, { default: !1 })), l = d;
    else
      return d ? i(r, "BAD_COLLECTION_TYPE", `${d.tag} used for ${a} collection, but expects ${d.collection ?? "scalar"}`, !0) : i(r, "TAG_RESOLVE_FAILED", `Unresolved tag: ${o}`, !0), kt(s, e, t, i, o);
  }
  const c = kt(s, e, t, i, o, l), f = l.resolve?.(c, (d) => i(r, "TAG_RESOLVE_FAILED", d), e.options) ?? c, u = B(f) ? f : new O(f);
  return u.range = c.range, u.tag = o, l?.format && (u.format = l.format), u;
}
function mi(s, e, t) {
  const n = e.offset, i = gi(e, s.options.strict, t);
  if (!i)
    return { value: "", type: null, comment: "", range: [n, n, n] };
  const r = i.mode === ">" ? O.BLOCK_FOLDED : O.BLOCK_LITERAL, o = e.source ? yi(e.source) : [];
  let a = o.length;
  for (let h = o.length - 1; h >= 0; --h) {
    const g = o[h][1];
    if (g === "" || g === "\r")
      a = h;
    else
      break;
  }
  if (a === 0) {
    const h = i.chomp === "+" && o.length > 0 ? `
`.repeat(Math.max(1, o.length - 1)) : "";
    let g = n + i.length;
    return e.source && (g += e.source.length), { value: h, type: r, comment: i.comment, range: [n, g, g] };
  }
  let l = e.indent + i.indent, c = e.offset + i.length, f = 0;
  for (let h = 0; h < a; ++h) {
    const [g, k] = o[h];
    if (k === "" || k === "\r")
      i.indent === 0 && g.length > l && (l = g.length);
    else {
      g.length < l && t(c + g.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), i.indent === 0 && (l = g.length), f = h, l === 0 && !s.atRoot && t(c, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    c += g.length + k.length + 1;
  }
  for (let h = o.length - 1; h >= a; --h)
    o[h][0].length > l && (a = h + 1);
  let u = "", d = "", m = !1;
  for (let h = 0; h < f; ++h)
    u += o[h][0].slice(l) + `
`;
  for (let h = f; h < a; ++h) {
    let [g, k] = o[h];
    c += g.length + k.length + 1;
    const v = k[k.length - 1] === "\r";
    if (v && (k = k.slice(0, -1)), k && g.length < l) {
      const p = `Block scalar lines must not be less indented than their ${i.indent ? "explicit indentation indicator" : "first line"}`;
      t(c - k.length - (v ? 2 : 1), "BAD_INDENT", p), g = "";
    }
    r === O.BLOCK_LITERAL ? (u += d + g.slice(l) + k, d = `
`) : g.length > l || k[0] === "	" ? (d === " " ? d = `
` : !m && d === `
` && (d = `

`), u += d + g.slice(l) + k, d = `
`, m = !0) : k === "" ? d === `
` ? u += `
` : d = `
` : (u += d + k, d = " ", m = !1);
  }
  switch (i.chomp) {
    case "-":
      break;
    case "+":
      for (let h = a; h < o.length; ++h)
        u += `
` + o[h][0].slice(l);
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
function gi({ offset: s, props: e }, t, n) {
  if (e[0].type !== "block-scalar-header")
    return n(e[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: i } = e[0], r = i[0];
  let o = 0, a = "", l = -1;
  for (let d = 1; d < i.length; ++d) {
    const m = i[d];
    if (!a && (m === "-" || m === "+"))
      a = m;
    else {
      const y = Number(m);
      !o && y ? o = y : l === -1 && (l = s + d);
    }
  }
  l !== -1 && n(l, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${i}`);
  let c = !1, f = "", u = i.length;
  for (let d = 1; d < e.length; ++d) {
    const m = e[d];
    switch (m.type) {
      case "space":
        c = !0;
      // fallthrough
      case "newline":
        u += m.source.length;
        break;
      case "comment":
        t && !c && n(m, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), u += m.source.length, f = m.source.substring(1);
        break;
      case "error":
        n(m, "UNEXPECTED_TOKEN", m.message), u += m.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const y = `Unexpected token in block scalar header: ${m.type}`;
        n(m, "UNEXPECTED_TOKEN", y);
        const h = m.source;
        h && typeof h == "string" && (u += h.length);
      }
    }
  }
  return { mode: r, indent: o, chomp: a, comment: f, length: u };
}
function yi(s) {
  const e = s.split(/\n( *)/), t = e[0], n = t.match(/^( *)/), r = [n?.[1] ? [n[1], t.slice(n[1].length)] : ["", t]];
  for (let o = 1; o < e.length; o += 2)
    r.push([e[o], e[o + 1]]);
  return r;
}
function wi(s, e, t) {
  const { offset: n, type: i, source: r, end: o } = s;
  let a, l;
  const c = (d, m, y) => t(n + d, m, y);
  switch (i) {
    case "scalar":
      a = O.PLAIN, l = bi(r, c);
      break;
    case "single-quoted-scalar":
      a = O.QUOTE_SINGLE, l = ki(r, c);
      break;
    case "double-quoted-scalar":
      a = O.QUOTE_DOUBLE, l = $i(r, c);
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
  const f = n + r.length, u = qe(o, f, e, t);
  return {
    value: l,
    type: a,
    comment: u.comment,
    range: [n, f, u.offset]
  };
}
function bi(s, e) {
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
  return t && e(0, "BAD_SCALAR_START", `Plain value cannot start with ${t}`), en(s);
}
function ki(s, e) {
  return (s[s.length - 1] !== "'" || s.length === 1) && e(s.length, "MISSING_CHAR", "Missing closing 'quote"), en(s.slice(1, -1)).replace(/''/g, "'");
}
function en(s) {
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
function $i(s, e) {
  let t = "";
  for (let n = 1; n < s.length - 1; ++n) {
    const i = s[n];
    if (!(i === "\r" && s[n + 1] === `
`))
      if (i === `
`) {
        const { fold: r, offset: o } = Si(s, n);
        t += r, n = o;
      } else if (i === "\\") {
        let r = s[++n];
        const o = vi[r];
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
          t += Ei(s, n + 1, a, e), n += a;
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
function Si(s, e) {
  let t = "", n = s[e + 1];
  for (; (n === " " || n === "	" || n === `
` || n === "\r") && !(n === "\r" && s[e + 2] !== `
`); )
    n === `
` && (t += `
`), e += 1, n = s[e + 1];
  return t || (t = " "), { fold: t, offset: e };
}
const vi = {
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
function Ei(s, e, t, n) {
  const i = s.substr(e, t), o = i.length === t && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
  try {
    return String.fromCodePoint(o);
  } catch {
    const a = s.substr(e - 2, t + 2);
    return n(e - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${a}`), a;
  }
}
function tn(s, e, t, n) {
  const { value: i, type: r, comment: o, range: a } = e.type === "block-scalar" ? mi(s, e, n) : wi(e, s.options.strict, n), l = t ? s.directives.tagName(t.source, (u) => n(t, "TAG_RESOLVE_FAILED", u)) : null;
  let c;
  s.options.stringKeys && s.atKey ? c = s.schema[J] : l ? c = Li(s.schema, i, l, t, n) : e.type === "scalar" ? c = Ni(s, i, e, n) : c = s.schema[J];
  let f;
  try {
    const u = c.resolve(i, (d) => n(t ?? e, "TAG_RESOLVE_FAILED", d), s.options);
    f = _(u) ? u : new O(u);
  } catch (u) {
    const d = u instanceof Error ? u.message : String(u);
    n(t ?? e, "TAG_RESOLVE_FAILED", d), f = new O(i);
  }
  return f.range = a, f.source = i, r && (f.type = r), l && (f.tag = l), c.format && (f.format = c.format), o && (f.comment = o), f;
}
function Li(s, e, t, n, i) {
  if (t === "!")
    return s[J];
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
  return o && !o.collection ? (s.tags.push(Object.assign({}, o, { default: !1, test: void 0 })), o) : (i(n, "TAG_RESOLVE_FAILED", `Unresolved tag: ${t}`, t !== "tag:yaml.org,2002:str"), s[J]);
}
function Ni({ atKey: s, directives: e, schema: t }, n, i, r) {
  const o = t.tags.find((a) => (a.default === !0 || s && a.default === "key") && a.test?.test(n)) || t[J];
  if (t.compat) {
    const a = t.compat.find((l) => l.default && l.test?.test(n)) ?? t[J];
    if (o.tag !== a.tag) {
      const l = e.tagString(o.tag), c = e.tagString(a.tag), f = `Value may be parsed as either ${l} or ${c}`;
      r(i, "TAG_RESOLVE_FAILED", f, !0);
    }
  }
  return o;
}
function xi(s, e, t) {
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
const Oi = { composeNode: sn, composeEmptyNode: Wt };
function sn(s, e, t, n) {
  const i = s.atKey, { spaceBefore: r, comment: o, anchor: a, tag: l } = t;
  let c, f = !0;
  switch (e.type) {
    case "alias":
      c = Ai(s, e, n), (a || l) && n(e, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      c = tn(s, e, l, n), a && (c.anchor = a.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        c = pi(Oi, s, e, t, n), a && (c.anchor = a.source.substring(1));
      } catch (u) {
        const d = u instanceof Error ? u.message : String(u);
        n(e, "RESOURCE_EXHAUSTION", d);
      }
      break;
    default: {
      const u = e.type === "error" ? e.message : `Unsupported token (type: ${e.type})`;
      n(e, "UNEXPECTED_TOKEN", u), f = !1;
    }
  }
  return c ?? (c = Wt(s, e.offset, void 0, null, t, n)), a && c.anchor === "" && n(a, "BAD_ALIAS", "Anchor cannot be an empty string"), i && s.options.stringKeys && (!_(c) || typeof c.value != "string" || c.tag && c.tag !== "tag:yaml.org,2002:str") && n(l ?? e, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), r && (c.spaceBefore = !0), o && (e.type === "scalar" && e.source === "" ? c.comment = o : c.commentBefore = o), s.options.keepSourceTokens && f && (c.srcToken = e), c;
}
function Wt(s, e, t, n, { spaceBefore: i, comment: r, anchor: o, tag: a, end: l }, c) {
  const f = {
    type: "scalar",
    offset: xi(e, t, n),
    indent: -1,
    source: ""
  }, u = tn(s, f, a, c);
  return o && (u.anchor = o.source.substring(1), u.anchor === "" && c(o, "BAD_ALIAS", "Anchor cannot be an empty string")), i && (u.spaceBefore = !0), r && (u.comment = r, u.range[2] = l), u;
}
function Ai({ options: s }, { offset: e, source: t, end: n }, i) {
  const r = new Dt(t.substring(1));
  r.source === "" && i(e, "BAD_ALIAS", "Alias cannot be an empty string"), r.source.endsWith(":") && i(e + t.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const o = e + t.length, a = qe(n, o, s.strict, i);
  return r.range = [e, o, a.offset], a.comment && (r.comment = a.comment), r;
}
function Ti(s, e, { offset: t, start: n, value: i, end: r }, o) {
  const a = Object.assign({ _directives: e }, s), l = new ht(void 0, a), c = {
    atKey: !1,
    atRoot: !0,
    directives: l.directives,
    options: l.options,
    schema: l.schema
  }, f = $e(n, {
    indicator: "doc-start",
    next: i ?? r?.[0],
    offset: t,
    onError: o,
    parentIndent: 0,
    startOnNewline: !0
  });
  f.found && (l.directives.docStart = !0, i && (i.type === "block-map" || i.type === "block-seq") && !f.hasNewline && o(f.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), l.contents = i ? sn(c, i, f, o) : Wt(c, f.end, n, null, f, o);
  const u = l.contents.range[2], d = qe(r, u, !1, o);
  return d.comment && (l.comment = d.comment), l.range = [t, u, d.offset], l;
}
function xe(s) {
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
class Mi {
  constructor(e = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (t, n, i, r) => {
      const o = xe(t);
      r ? this.warnings.push(new fi(o, n, i)) : this.errors.push(new Te(o, n, i));
    }, this.directives = new q({ version: e.version || "1.2" }), this.options = e;
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
      else if (P(r) && !r.flow && r.items.length > 0) {
        let o = r.items[0];
        D(o) && (o = o.key);
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
          const r = xe(e);
          r[0] += t, this.onError(r, "BAD_DIRECTIVE", n, i);
        }), this.prelude.push(e.source), this.atDirectives = !0;
        break;
      case "document": {
        const t = Ti(this.options, this.directives, e, this.onError);
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
        const t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, n = new Te(xe(e), "UNEXPECTED_TOKEN", t);
        this.atDirectives || !this.doc ? this.errors.push(n) : this.doc.errors.push(n);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const n = "Unexpected doc-end without preceding document";
          this.errors.push(new Te(xe(e), "UNEXPECTED_TOKEN", n));
          break;
        }
        this.doc.directives.docEnd = !0;
        const t = qe(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), t.comment) {
          const n = this.doc.comment;
          this.doc.comment = n ? `${n}
${t.comment}` : t.comment;
        }
        this.doc.range[2] = t.offset;
        break;
      }
      default:
        this.errors.push(new Te(xe(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
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
      const n = Object.assign({ _directives: this.directives }, this.options), i = new ht(void 0, n);
      this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), i.range = [0, t, t], this.decorate(i, !1), yield i;
    }
  }
}
const nn = "\uFEFF", rn = "", on = "", Mt = "";
function Ci(s) {
  switch (s) {
    case nn:
      return "byte-order-mark";
    case rn:
      return "doc-mode";
    case on:
      return "flow-error-end";
    case Mt:
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
const cs = new Set("0123456789ABCDEFabcdef"), Ii = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), Ge = new Set(",[]{}"), _i = new Set(` ,[]{}
\r	`), $t = (s) => !s || _i.has(s);
class ji {
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
    if (e[0] === nn && (yield* this.pushCount(1), e = e.substring(1)), e[0] === "%") {
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
    return yield rn, yield* this.parseLineStart();
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
        return yield* this.pushUntil($t), "doc";
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
      return this.flowLevel = 0, yield on, yield* this.parseLineStart();
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
        return yield* this.pushUntil($t), "flow";
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
    return yield Mt, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let t = this.pos - 1, n = this.pos - 1, i;
    for (; i = this.buffer[++n]; )
      if (i === ":") {
        const r = this.buffer[n + 1];
        if (Y(r) || e && Ge.has(r))
          break;
        t = n;
      } else if (Y(i)) {
        let r = this.buffer[n + 1];
        if (i === "\r" && (r === `
` ? (n += 1, i = `
`, r = this.buffer[n + 1]) : t = n), r === "#" || e && Ge.has(r))
          break;
        if (i === `
`) {
          const o = this.continueScalar(n + 1);
          if (o === -1)
            break;
          n = Math.max(n, o - 2);
        }
      } else {
        if (e && Ge.has(i))
          break;
        t = n;
      }
    return !i && !this.atEnd ? this.setNext("plain-scalar") : (yield Mt, yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
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
          e += yield* this.pushUntil($t), e += yield* this.pushSpaces(!0);
          continue e;
        case "-":
        // this is an error
        case "?":
        // this is an error outside flow collections
        case ":": {
          const t = this.flowLevel > 0, n = this.charAt(1);
          if (Y(n) || t && Ge.has(n)) {
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
        if (Ii.has(t))
          t = this.buffer[++e];
        else if (t === "%" && cs.has(this.buffer[e + 1]) && cs.has(this.buffer[e + 2]))
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
class Pi {
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
function ls(s) {
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
function an(s) {
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
function He(s) {
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
function de(s) {
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
function tt(s, e) {
  if (e.length < 1e5)
    Array.prototype.push.apply(s, e);
  else
    for (let t = 0; t < e.length; ++t)
      s.push(e[t]);
}
function fs(s) {
  if (s.start.type === "flow-seq-start")
    for (const e of s.items)
      e.sep && !e.value && !te(e.start, "explicit-key-ind") && !te(e.sep, "map-value-ind") && (e.key && (e.value = e.key), delete e.key, an(e.value) ? e.value.end ? tt(e.value.end, e.sep) : e.value.end = e.sep : tt(e.start, e.sep), delete e.sep);
}
class Bi {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(e) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new ji(), this.onNewLine = e;
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
    const t = Ci(e);
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
        i && !i.sep && !i.value && i.start.length > 0 && ls(i.start) === -1 && (t.indent === 0 || i.start.every((r) => r.type !== "comment" || r.indent < t.indent)) && (n.type === "document" ? n.end = i.start : n.items.push({ start: i.start }), t.items.splice(-1, 1));
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
        ls(e.start) !== -1 ? (yield* this.pop(), yield* this.step()) : e.start.push(this.sourceToken);
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
      const t = He(this.peek(2)), n = de(t);
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
              tt(i, t.start), i.push(this.sourceToken), e.items.pop();
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
              else if (te(t.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: r, key: null, sep: [this.sourceToken] }]
                });
              else if (an(t.key) && !te(t.sep, "newline")) {
                const o = de(t.start), a = t.key, l = t.sep;
                l.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: a, sep: l }]
                });
              } else r.length > 0 ? t.sep = t.sep.concat(r, this.sourceToken) : t.sep.push(this.sourceToken);
            else if (te(t.start, "newline"))
              Object.assign(t, { key: null, sep: [this.sourceToken] });
            else {
              const o = de(t.start);
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
              tt(i, t.start), i.push(this.sourceToken), e.items.pop();
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
        const i = He(n), r = de(i);
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
        const t = He(e), n = de(t);
        return n.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: n, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const t = He(e), n = de(t);
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
function Di(s) {
  const e = s.prettyErrors !== !1;
  return { lineCounter: s.lineCounter || e && new Pi() || null, prettyErrors: e };
}
function Fi(s, e = {}) {
  const { lineCounter: t, prettyErrors: n } = Di(e), i = new Bi(t?.addNewLine), r = new Mi(e);
  let o = null;
  for (const a of r.compose(i.parse(s), !0, s.length))
    if (!o)
      o = a;
    else if (o.options.logLevel !== "silent") {
      o.errors.push(new Te(a.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return n && t && (o.errors.forEach(rs(s, t)), o.warnings.forEach(rs(s, t))), o;
}
const V = {
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
}, Ct = {
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
}, Ki = {
  cast: { asset: "asset" },
  appearance: { hairStyle: "hairStyle", outfit: "outfit" },
  actor: { expression: "expression", gesture: "gesture", holding: "prop" },
  panel: { mode: "mode" },
  transfer: { prop: "prop" },
  diagram: { type: "diagramType" },
  options: { panelFormat: "panelFormat" }
};
function Je(s) {
  return !!s && typeof s == "object" && !Array.isArray(s);
}
function se(s, e, t, n) {
  if (!Je(s)) return s;
  const i = V[e], r = /* @__PURE__ */ Object.create(null);
  for (const [o, a] of Object.entries(s)) {
    const l = Object.keys(i).find(
      (m) => o === m || o === i[m]
    ) ?? o;
    Object.hasOwn(i, l) && i[l];
    const c = l;
    if (Object.hasOwn(r, c))
      throw new Error(
        `${n}: '${i[l]}'와 '${l}'은 같은 항목입니다. 하나만 작성하세요.`
      );
    let f = a;
    const u = Ki[e], d = u && Object.hasOwn(u, l) ? u[l] : void 0;
    if (d && typeof a == "string") {
      const m = Ct[d], y = Object.keys(m).find(
        (h) => a === h || a === m[h]
      );
      y && (f = y);
    }
    if (e === "comic" && l === "cast" && Je(a)) {
      const m = /* @__PURE__ */ Object.create(null);
      for (const [y, h] of Object.entries(a))
        m[y] = se(h, "cast", t, `${n}.등장인물.${y}`);
      f = m;
    } else if (e === "comic" && l === "personas" && Je(a)) {
      const m = /* @__PURE__ */ Object.create(null);
      for (const [y, h] of Object.entries(a))
        m[y] = se(
          h,
          "persona",
          t,
          `${n}.페르소나.${y}`
        );
      f = m;
    } else if (e === "cast" && l === "persona")
      f = se(a, "persona", t, `${n}.페르소나`);
    else if (e === "cast" && l === "appearance")
      f = se(a, "appearance", t, `${n}.외형`);
    else if (e === "panel" && l === "diagram")
      f = se(a, "diagram", t, `${n}.다이어그램`);
    else if (Array.isArray(a)) {
      const m = e === "comic" && l === "panels" ? "panel" : e === "panel" && l === "actors" ? "actor" : e === "panel" && l === "dialogue" ? "dialogue" : e === "panel" && l === "transfer" ? "transfer" : void 0;
      m && (f = a.map(
        (y, h) => se(
          y,
          m,
          t,
          `${n}.${i[l]}[${h + 1}]`
        )
      ));
    }
    r[c] = f;
  }
  return r;
}
const qi = (s) => se(s, "comic", !1, "만화");
function Ri(s) {
  const e = se(s, "options", !1, "표시 설정");
  if (!Je(e)) throw new Error("표시 설정: 객체가 필요합니다.");
  for (const t of Object.keys(e))
    if (!Object.hasOwn(V.options, t))
      throw new Error(`표시 설정: 알 수 없는 항목 '${t}'.`);
  return e;
}
function Ie(s, e) {
  if (!s || typeof s != "object" || Array.isArray(s))
    throw new Error(`${e}: 객체가 필요합니다.`);
  return s;
}
function Z(s, e, t = 1e4) {
  if (typeof s != "string" || !s.trim())
    throw new Error(`${e}: 비어 있지 않은 문자열이 필요합니다.`);
  if (s.length > t)
    throw new Error(
      `${e}: 텍스트가 너무 깁니다. ${t}자 이내로 작성하세요.`
    );
  return s;
}
function Jt(s, e, t) {
  for (const n of Object.keys(s))
    if (!Object.hasOwn(e, n))
      throw new Error(`${t}: 알 수 없는 항목 '${n}'.`);
}
function us(s, e) {
  const t = Ie(s, e);
  Jt(t, V.persona, e);
  const n = {};
  if (t.role !== void 0 && (n.role = Z(t.role, `${e}.직무`, 100)), t.personality !== void 0 && (n.personality = Z(t.personality, `${e}.성격`, 300)), t.speechStyle !== void 0 && (n.speechStyle = Z(t.speechStyle, `${e}.말투`, 300)), !Object.keys(n).length)
    throw new Error(`${e}: 직무·성격·말투 중 하나 이상 작성하세요.`);
  return n;
}
function St(s, e, t) {
  if (s === void 0) return e;
  const n = Z(s, t, 7);
  if (n.length !== 4 && n.length !== 7 || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(n))
    throw new Error(`${t}: #RGB 또는 #RRGGBB 색상을 작성하세요.`);
  return n;
}
function hs(s, e, t, n) {
  if (s === void 0) return t;
  const i = Z(s, n);
  if (!Object.hasOwn(e, i))
    throw new Error(
      `${n}: ${Object.values(e).join(", ")} 중 하나를 선택하세요.`
    );
  return i;
}
function Ui(s, e) {
  const t = s === void 0 ? {} : Ie(s, e);
  if (Jt(t, V.appearance, e), t.glasses !== void 0 && typeof t.glasses != "boolean")
    throw new Error(`${e}.안경: true 또는 false가 필요합니다.`);
  return {
    skinColor: St(
      t.skinColor,
      ae.skinColor,
      `${e}.피부색`
    ),
    hairStyle: hs(
      t.hairStyle,
      Ct.hairStyle,
      ae.hairStyle,
      `${e}.머리모양`
    ),
    hairColor: St(
      t.hairColor,
      ae.hairColor,
      `${e}.머리색`
    ),
    outfit: hs(
      t.outfit,
      Ct.outfit,
      ae.outfit,
      `${e}.옷`
    ),
    outfitColor: St(
      t.outfitColor,
      ae.outfitColor,
      `${e}.옷색`
    ),
    glasses: t.glasses === void 0 ? ae.glasses : t.glasses
  };
}
function Vi(s, e) {
  const t = /* @__PURE__ */ Object.create(null);
  if (e !== void 0)
    for (const [i, r] of Object.entries(
      Ie(e, "페르소나")
    ))
      Z(i, "페르소나 식별자"), t[i] = us(r, `페르소나.${i}`);
  const n = /* @__PURE__ */ Object.create(null);
  for (const [i, r] of Object.entries(Ie(s, "등장인물"))) {
    const o = `등장인물.${i}`, a = Ie(r, o);
    Jt(a, V.cast, o);
    const l = Z(a.asset, `${o}.그림`);
    if (!Object.hasOwn(Ss, l))
      throw new Error(`${o}: 없는 에셋 '${l}'.`);
    let c;
    if (a.persona !== void 0)
      if (typeof a.persona == "string") {
        const f = Z(a.persona, `${o}.페르소나`);
        if (!Object.hasOwn(t, f))
          throw new Error(`${o}.페르소나: 없는 페르소나 '${f}'.`);
        c = { ...t[f] };
      } else c = us(a.persona, `${o}.페르소나`);
    if (l !== "human" && a.appearance !== void 0)
      throw new Error(`${o}.외형: 사람 그림에서만 사용할 수 있습니다.`);
    n[i] = {
      asset: l,
      label: a.label === void 0 ? i : Z(a.label, `${o}.이름표`),
      ...l === "human" ? { appearance: Ui(a.appearance, `${o}.외형`) } : {},
      ...c ? { persona: c } : {}
    };
  }
  return { cast: n, ...e !== void 0 ? { personas: t } : {} };
}
function ie(s, e) {
  if (!s || typeof s != "object" || Array.isArray(s))
    throw new Error(`${e}: 객체가 필요합니다.`);
  return s;
}
function K(s, e, t = 1e4) {
  if (typeof s != "string" || !s.trim())
    throw new Error(`${e}: 비어 있지 않은 문자열이 필요합니다.`);
  if (s.length > t)
    throw new Error(
      `${e}: 텍스트가 너무 깁니다. ${t}자 이내로 작성하세요.`
    );
  return s;
}
function pe(s, e) {
  if (!Array.isArray(s)) throw new Error(`${e}: 목록이 필요합니다.`);
  return s;
}
function re(s, e, t) {
  for (const n of Object.keys(s))
    if (!e.includes(n))
      throw new Error(`${t}: 알 수 없는 항목 '${n}'.`);
}
function oe(s, e, t, n) {
  if (s !== void 0) {
    if (typeof s != "number" || !Number.isFinite(s) || s < e || s > t)
      throw new Error(`${n}: ${e}~${t} 사이 숫자가 필요합니다.`);
    return s;
  }
}
function Qi(s) {
  if (s.length > 1e5)
    throw new Error("코드가 너무 깁니다. 100KB 이내로 작성하세요.");
  const e = Fi(s, { uniqueKeys: !0 });
  if (e.errors.length) throw new Error(e.errors[0].message);
  const t = ie(qi(e.toJS({ maxAliasCount: 20 })), "만화");
  re(t, Object.keys(V.comic), "만화");
  const { cast: n, personas: i } = Vi(t.cast, t.personas);
  let r;
  const o = pe(t.panels, "컷").map((a, l) => {
    const c = `컷 ${l + 1}`, f = { ...ie(a, c) };
    if (re(f, Object.keys(V.panel), c), f.mode !== void 0 && f.mode !== "before" && f.mode !== "full")
      throw new Error(`${c}: 구성은 전체 또는 이전이어야 합니다.`);
    if (f.mode === "before") {
      if (!r)
        throw new Error(`${c}: 첫 컷에서는 이전 구성을 사용할 수 없습니다.`);
      const h = r.actors.map(
        (p) => ({ ...p })
      ), g = pe(f.removeActors ?? [], `${c}.제외인물`).map(
        (p) => K(p, `${c}.제외인물`)
      );
      for (const p of g)
        if (!h.some(($) => $.id === p))
          throw new Error(`${c}: 제거할 인물 '${p}'가 이전 컷에 없습니다.`);
      const k = h.filter(
        (p) => !g.some(($) => $ === p.id)
      ), v = pe(f.actors ?? [], `${c}.인물`), S = /* @__PURE__ */ new Set();
      for (const p of v) {
        const $ = typeof p == "string" ? { id: p } : ie(p, `${c}.인물`);
        re($, Object.keys(V.actor), `${c}.인물`);
        const E = K($.id, `${c}.인물.식별자`);
        if (S.has(E))
          throw new Error(`${c}: 캐릭터 식별자가 중복됩니다.`);
        S.add(E);
        const L = k.findIndex((N) => N.id === E), w = {
          ...L < 0 ? {} : k[L],
          ...$
        };
        for (const [N, x] of Object.entries($))
          N !== "id" && x === null && delete w[N];
        L < 0 ? k.push(w) : k[L] = w;
      }
      f.actors = f.actors !== void 0 && v.length === 0 ? [] : k;
    } else if (f.removeActors !== void 0)
      throw new Error(`${c}: 제외인물은 이전 구성에서만 사용할 수 있습니다.`);
    const u = pe(f.actors, `${c}.인물`).map((h) => {
      const g = typeof h == "string" ? { id: h } : ie(h, `${c}.인물`);
      re(g, Object.keys(V.actor), `${c}.인물`);
      const k = K(g.id, `${c}.인물.식별자`), v = g.expression === void 0 ? "neutral" : K(g.expression, `${c}.${k}.표정`);
      if (!Object.hasOwn(n, k))
        throw new Error(`${c}: 없는 캐릭터 '${k}'.`);
      if (!Object.hasOwn(vs, v))
        throw new Error(`${c}.${k}: 없는 표정 '${v}'.`);
      const S = g.gesture === void 0 ? void 0 : K(g.gesture, `${c}.${k}.손모양`), p = g.holding === void 0 ? void 0 : K(g.holding, `${c}.${k}.든소품`);
      if (S && !Object.hasOwn(Lt, S))
        throw new Error(`${c}.${k}: 없는 손 제스처 '${S}'.`);
      if (p && !Object.hasOwn(Xe, p))
        throw new Error(`${c}.${k}: 없는 소품 '${p}'.`);
      return {
        id: k,
        expression: v,
        gesture: S,
        holding: p,
        x: oe(g.x, 0, 1, `${c}.${k}.가로위치`),
        y: oe(g.y, 0, 1, `${c}.${k}.세로위치`),
        scale: oe(g.scale, 0.5, 1.25, `${c}.${k}.배율`) ?? 1
      };
    });
    if (u.length < 1 || u.length > 3)
      throw new Error(`${c}: 캐릭터는 1~3명이어야 합니다.`);
    if (new Set(u.map((h) => h.id)).size !== u.length)
      throw new Error(`${c}: 캐릭터 식별자가 중복됩니다.`);
    const d = pe(f.dialogue ?? [], `${c}.대사`).map(
      (h) => {
        const g = ie(h, `${c}.대사`);
        re(g, Object.keys(V.dialogue), `${c}.대사`);
        const k = K(g.from, `${c}.대사.화자`), v = g.to === void 0 ? void 0 : K(g.to, `${c}.대사.상대`);
        if (!u.some((S) => S.id === k))
          throw new Error(`${c}: 화자 '${k}'가 컷에 없습니다.`);
        if (v && !u.some((S) => S.id === v))
          throw new Error(`${c}: 대화 상대 '${v}'가 컷에 없습니다.`);
        return {
          from: k,
          to: v,
          text: K(g.text, `${c}.대사.내용`),
          x: oe(g.x, 0, 1, `${c}.대사.가로위치`),
          y: oe(g.y, 0, 1, `${c}.대사.세로위치`),
          fontSize: oe(g.fontSize, 12, 32, `${c}.대사.글자크기`) ?? 18
        };
      }
    );
    if (d.length > 20)
      throw new Error(`${c}: 대사는 20개 이내로 작성하세요.`);
    const m = pe(f.transfer ?? [], `${c}.전달`).map(
      (h) => {
        const g = ie(h, `${c}.전달`);
        re(g, Object.keys(V.transfer), `${c}.전달`);
        const k = K(g.from, `${c}.전달.주는인물`), v = K(g.to, `${c}.전달.받는인물`), S = K(g.prop, `${c}.전달.소품`);
        if (!u.some((p) => p.id === k))
          throw new Error(`${c}: 전달 주체 '${k}'가 컷에 없습니다.`);
        if (!u.some((p) => p.id === v))
          throw new Error(`${c}: 전달 대상 '${v}'가 컷에 없습니다.`);
        if (k === v)
          throw new Error(`${c}: 전달 주체와 대상은 달라야 합니다.`);
        if (!Object.hasOwn(Xe, S))
          throw new Error(`${c}: 없는 소품 '${S}'.`);
        return { from: k, to: v, prop: S };
      }
    );
    if (m.length > 6)
      throw new Error(`${c}: 소품 전달은 6개 이내로 작성하세요.`);
    let y;
    if (f.diagram !== void 0 && f.diagram !== null) {
      const h = `${c}.다이어그램`, g = ie(f.diagram, h);
      if (re(g, Object.keys(V.diagram), h), g.type !== "mermaid")
        throw new Error(`${h}.종류: 머메이드여야 합니다.`);
      y = {
        type: "mermaid",
        source: K(g.source, `${h}.원문`, 2e4),
        title: g.title === void 0 ? "다이어그램" : K(g.title, `${h}.제목`, 100),
        height: oe(g.height, 160, 1200, `${h}.높이`)
      };
    }
    return r = { actors: u, dialogue: d, transfer: m, ...y ? { diagram: y } : {} }, r;
  });
  if (o.length < 1 || o.length > 30)
    throw new Error("컷은 1~30개여야 합니다.");
  return {
    title: t.title === void 0 ? "Comic Gen" : K(t.title, "제목"),
    cast: n,
    panels: o,
    ...i ? { personas: i } : {}
  };
}
const Oe = (s, e, t) => Math.max(e, Math.min(t, s));
function vt(s, e, t, n) {
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
function cn(s, e, t, n, i = "compact", r) {
  const o = Math.min(t - 80, 390), a = s.dialogue.map((p) => ({
    line: p,
    lines: vt(p.text, o - 36, p.fontSize, n),
    lineHeight: Math.ceil(p.fontSize * 1.45)
  })), l = a.reduce(
    (p, $) => p + 60 + $.lines.length * $.lineHeight,
    20
  ), c = l + 254, f = Math.max(
    ...s.actors.map((p) => p.holding || p.gesture ? 92 : 60)
  ), u = (t - 72) / s.actors.length, d = Math.min(
    1,
    (u - 12) / (2 * f * Math.max(...s.actors.map((p) => p.scale)))
  ), m = s.actors.map((p) => p.scale * d), y = s.actors.map(
    (p, $) => Oe(
      36 + (t - 72) * (p.x ?? ($ + 0.5) / s.actors.length),
      26 + f * m[$],
      t - 26 - f * m[$]
    )
  ), h = s.actors.map(
    (p, $) => Oe(
      p.y === void 0 ? c - 126 : p.y * c,
      l + 70 * m[$],
      c - 126 * m[$]
    )
  );
  for (let p = 0; p < s.actors.length; p++)
    for (let $ = p + 1; $ < s.actors.length; $++)
      if (Math.abs(y[p] - y[$]) < f * (m[p] + m[$]) && Math.abs(h[p] - h[$]) < 120 * Math.max(m[p], m[$]))
        throw new Error(
          `캐릭터 '${s.actors[p].id}'와 '${s.actors[$].id}'가 겹칩니다. 가로위치·세로위치 또는 배율을 조정하세요.`
        );
  const g = [
    `<rect x="20" y="0" width="${t - 40}" height="${c}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/>`
  ];
  let k = 20;
  a.forEach(({ line: p, lines: $, lineHeight: E }) => {
    const L = y[s.actors.findIndex((I) => I.id === p.from)], w = Oe(
      (p.x === void 0 ? L : p.x * t) - o / 2,
      40,
      t - o - 40
    ), N = 28 + $.length * E, x = p.y === void 0 ? k : Oe(p.y * c, 20, l - N), T = Math.max(w + 24, Math.min(w + o - 24, L)), b = w + o, A = x + N, M = s.actors.findIndex(
      (I) => I.id === p.from
    ), C = h[M] - 65 * m[M], F = `M${w + 14} ${x}H${b - 14}Q${b} ${x} ${b} ${x + 14}V${A - 14}Q${b} ${A} ${b - 14} ${A}H${T + 9}L${L} ${C}L${T - 9} ${A}H${w + 14}Q${w} ${A} ${w} ${A - 14}V${x + 14}Q${w} ${x} ${w + 14} ${x}Z`;
    g.push(
      `<g data-dialogue="${U(p.from)}" data-to="${U(p.to ?? "")}"><path d="${F}" fill="#fffaf0" stroke="#303341" stroke-width="2" stroke-linejoin="round"/><text x="${w + 18}" y="${x + 18 + p.fontSize}" font-size="${p.fontSize}">${$.map((I, j) => `<tspan x="${w + 18}" dy="${j ? E : 0}">${U(I)}</tspan>`).join("")}</text></g>`
    ), k += N + 32;
  }), s.actors.forEach((p, $) => {
    const E = e[p.id], L = Zt(E), w = E.asset === "human", N = w ? L.color : "white", x = new Set(
      s.transfer.flatMap((j) => {
        const z = j.from === p.id ? j.to : j.to === p.id ? j.from : void 0;
        if (!z) return [];
        const Re = s.actors.findIndex(
          (xn) => xn.id === z
        );
        return [y[Re] < y[$] ? "left" : "right"];
      })
    ), T = L.restingHands ? (p.gesture || x.has("left") ? "" : L.restingHands.left) + (p.holding || x.has("right") ? "" : L.restingHands.right) : "", b = s.dialogue.find(
      (j) => j.from === p.id && j.to
    )?.to, A = s.actors.findIndex((j) => j.id === b), M = A < 0 ? 0 : Math.sign(y[A] - y[$]) * 4, C = vt(
      E.label,
      (t - 72) / s.actors.length - 12,
      16,
      n
    );
    if (C.length > 2)
      throw new Error(`캐릭터 '${p.id}'의 이름표가 너무 깁니다.`);
    const F = p.gesture ? `<g data-gesture="${p.gesture}">${w ? Lt[p.gesture].replace('fill="white"', `fill="${N}"`) : Lt[p.gesture]}</g>` : "", I = p.holding ? `<g data-holding="${p.holding}"><circle data-hand="holding" cx="58" cy="20" r="11" fill="${N}"/><g data-prop="${p.holding}" transform="translate(73 6)">${Xe[p.holding]}</g></g>` : "";
    g.push(
      `<g data-character="${U(p.id)}" transform="translate(${y[$]} ${h[$]}) scale(${m[$]})" stroke="#303341" stroke-width="2.8" stroke-linecap="round"><ellipse cy="69" rx="51" ry="7" fill="#e8edf3" stroke="none"/>${L.body}<g transform="translate(${M} ${L.faceY})" fill="#303341">${vs[p.expression]}</g>${T}${F}${I}<text y="94" text-anchor="middle" stroke="none" fill="#303341" font-size="16">${C.map((j, z) => `<tspan x="0" dy="${z ? 18 : 0}">${U(j)}</tspan>`).join("")}</text></g>`
    );
  }), s.transfer.forEach((p, $) => {
    const E = s.actors.findIndex(
      (j) => j.id === p.from
    ), L = s.actors.findIndex((j) => j.id === p.to), w = y[E], N = y[L], x = Math.sign(N - w), T = w + 62 * m[E] * x, b = N - 62 * m[L] * x, A = 20 + ($ - (s.transfer.length - 1) / 2) * 12, M = h[E] + A * m[E], C = h[L] + A * m[L], F = Math.atan2(C - M, b - T) * 180 / Math.PI, I = (j) => {
      const z = e[s.actors[j].id];
      return z.asset === "human" ? Zt(z).color : "white";
    };
    g.push(
      `<g data-transfer="${U(p.from)}" data-to="${U(p.to)}" stroke="#586c8c" stroke-width="2.5"><path d="M${T} ${M}L${b} ${C}" fill="none"/><circle data-hand="transfer" cx="${T}" cy="${M}" r="${9 * m[E]}" fill="${I(E)}"/><circle data-hand="receive" cx="${b}" cy="${C}" r="${9 * m[L]}" fill="${I(L)}"/><path transform="translate(${b} ${C}) rotate(${F})" d="M-12 -5L-4 0L-12 5" fill="none"/><g data-prop="${p.prop}" transform="translate(${(T + b) / 2} ${(M + C) / 2 - 16})">${Xe[p.prop]}</g></g>`
    );
  });
  let v = g.slice(1).join(""), S = c;
  if (r && s.diagram) {
    const p = t - 80, $ = p - 32, E = s.diagram.height ?? Oe($ * r.height / r.width + 58, 180, 1200), L = E - 58, w = Math.min(
      $ / r.width,
      L / r.height
    ), N = 56 + ($ - r.width * w) / 2, x = 66 + (L - r.height * w) / 2;
    if (vt(s.diagram.title, $, 16, n).length > 1)
      throw new Error(
        "다이어그램 제목이 너무 깁니다. 제목이나 너비를 조정하세요."
      );
    v = `<g data-diagram="mermaid"><rect x="40" y="20" width="${p}" height="${E}" rx="10" fill="#f3f7fc" stroke="#8093ab" stroke-width="2"/><text x="56" y="48" font-size="16" font-weight="700">${U(s.diagram.title)}</text><g data-diagram-content="mermaid" transform="translate(${N} ${x}) scale(${w})">${r.svg}</g></g><g data-scene="true" transform="translate(0 ${E + 40})">${v}</g>`, S += E + 40;
  }
  if (i === "phone") {
    const p = S * 2 + 92;
    return {
      markup: `<rect x="20" y="0" width="${t - 40}" height="${p}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/><g transform="translate(0 ${(p - S) / 2})">${v}</g>`,
      height: p
    };
  }
  return r ? {
    markup: `<rect x="20" y="0" width="${t - 40}" height="${S}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/>${v}`,
    height: S
  } : { markup: g.join(""), height: c };
}
const Gi = "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.6.0/cdn/comic-gen.mermaid.js", It = 2e4, Hi = "http://www.w3.org/2000/svg", zi = Math.random().toString(36).slice(2);
let Yi = 0, ds = Promise.resolve();
const dt = [
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
], Wi = new Set(dt), Ji = /* @__PURE__ */ new Set([
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
]), Xi = /* @__PURE__ */ new Set([
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
  ...dt
]);
function Zi(s) {
  if (!s.trim() || s.length > It)
    throw new Error(`Mermaid 원문은 1~${It}자여야 합니다.`);
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
function er(s) {
  if (typeof s != "string" || !s.trim() || s.length > 300 || /[^\p{L}\p{N}\s,'"_\-]/u.test(s))
    throw new Error("다이어그램에 사용할 올바른 글꼴 이름이 필요합니다.");
  return s;
}
async function tr(s) {
  const e = document.createElement("iframe");
  e.title = "Mermaid 렌더링", e.tabIndex = -1, e.setAttribute("aria-hidden", "true"), e.style.cssText = "all:initial!important;display:block!important;width:20000px!important;height:20000px!important;border:0!important;", s.append(e);
  const t = e.contentDocument, n = e.contentWindow;
  if (!t?.body || !n)
    throw e.remove(), new Error("Mermaid 격리 문서를 만들지 못했습니다.");
  const i = t.createElement("script");
  i.type = "module", i.src = Gi;
  try {
    return { api: await new Promise((o, a) => {
      const l = window.setTimeout(() => {
        c(), a(new Error("Mermaid 모듈을 불러오는 시간이 초과되었습니다."));
      }, 3e4), c = () => {
        window.clearTimeout(l), i.onload = null, i.onerror = null, n.removeEventListener("comic-gen-mermaid-ready", f), n.removeEventListener("comic-gen-mermaid-error", u);
      }, f = () => {
        c();
        const d = n.__comicGenMermaid;
        typeof d?.initialize != "function" || typeof d?.render != "function" ? a(new Error("Mermaid 모듈을 불러오지 못했습니다.")) : o(d);
      }, u = () => {
        c(), a(new Error("Mermaid 모듈을 불러오지 못했습니다."));
      };
      n.addEventListener("comic-gen-mermaid-ready", f), n.addEventListener("comic-gen-mermaid-error", u), i.onload = () => {
        n.__comicGenMermaid && f();
      }, i.onerror = u, t.head.append(i);
    }), document: t, dispose: () => e.remove() };
  } catch (r) {
    throw e.remove(), r;
  }
}
function ln(s) {
  const e = new DOMParser().parseFromString(s, "image/svg+xml");
  if (e.querySelector("parsererror") || e.documentElement.localName !== "svg")
    throw new Error("Mermaid가 올바른 SVG를 만들지 못했습니다.");
  return e.documentElement;
}
function st(s, e, t = !1) {
  let n = !0;
  const i = s.replace(
    /url\(\s*(["']?)(.*?)\1\s*\)/gi,
    (r, o, a) => {
      let l = a.trim();
      if (t && !l.startsWith("#")) {
        const c = l.lastIndexOf("#");
        l = c >= 0 ? l.slice(c) : "";
      }
      return !l.startsWith("#") || !e.has(l.slice(1)) ? (n = !1, "") : `url(${l})`;
    }
  );
  return /url\s*\(/i.test(i.replace(/url\(#[^)]*\)/g, "")) && (n = !1), n ? i : void 0;
}
function fn(s, e) {
  const t = document.createElement("span").style;
  for (const n of dt) {
    const i = st(s.getPropertyValue(n), e);
    i && t.setProperty(n, i, s.getPropertyPriority(n));
  }
  return s.getPropertyValue("display") === "none" && (t.display = "none"), t.cssText;
}
function sr(s) {
  const e = [];
  let t = 0, n = 0, i = "";
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    i ? o === i && s[r - 1] !== "\\" && (i = "") : o === "'" || o === '"' ? i = o : o === "(" || o === "[" ? n++ : o === ")" || o === "]" ? n-- : o === "," && n === 0 && (e.push(s.slice(t, r).trim()), t = r + 1);
  }
  return e.push(s.slice(t).trim()), e;
}
function nr(s, e, t) {
  const n = new CSSStyleSheet();
  n.replaceSync(s);
  const i = [], r = `#${e}`;
  for (const o of n.cssRules) {
    if (!(o instanceof CSSStyleRule)) continue;
    if (!sr(o.selectorText).every(
      (c) => c === r || c.startsWith(r + " ") || c.startsWith(r + ">") || c.startsWith(r + ":")
    )) throw new Error("Mermaid SVG에 범위 밖 스타일이 있습니다.");
    const l = fn(o.style, t);
    l && i.push(`${o.selectorText}{${l}}`);
  }
  return i.join(`
`);
}
function ir(s) {
  if (s.length > 2e6)
    throw new Error("Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요.");
  const e = ln(s), t = [e, ...e.querySelectorAll("*")];
  if (t.length > 1e4)
    throw new Error(
      "Mermaid SVG 요소가 너무 많습니다. 다이어그램을 나누어 주세요."
    );
  const n = new Set(t.map((r) => r.id).filter(Boolean)), i = e.id;
  for (const r of t)
    for (const o of [...r.attributes])
      if (/url\s*\(/i.test(o.value)) {
        const a = st(o.value, n, !0);
        a === void 0 ? r.removeAttributeNode(o) : r.setAttribute(o.name, a);
      }
  for (const r of t) {
    const o = r.localName.toLowerCase();
    if (r.namespaceURI !== Hi || !Ji.has(o) && o !== "style") {
      o === "a" ? r.replaceWith(...r.childNodes) : r.remove();
      continue;
    }
    if (o === "style") {
      r.textContent = nr(r.textContent ?? "", i, n);
      continue;
    }
    for (const a of [...r.attributes]) {
      const l = a.name.toLowerCase(), c = a.value;
      if (!Xi.has(l) && !l.startsWith("aria-") && !l.startsWith("data-"))
        r.removeAttributeNode(a);
      else if (l === "href" || l === "xlink:href")
        (!c.startsWith("#") || !n.has(c.slice(1))) && r.removeAttributeNode(a);
      else if (l === "style") {
        const f = document.createElement("span").style;
        f.cssText = c, r.setAttribute("style", fn(f, n));
      } else if (Wi.has(l)) {
        const f = st(c, n);
        f === void 0 ? r.removeAttributeNode(a) : r.setAttribute(a.name, f);
      }
    }
  }
  return e;
}
function rr(s) {
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
function or(s) {
  const e = (s.getAttribute("viewBox") ?? "").trim().split(/[\s,]+/).map(Number), t = e.length === 4 ? e[2] : Number.parseFloat(s.getAttribute("width") ?? ""), n = e.length === 4 ? e[3] : Number.parseFloat(s.getAttribute("height") ?? "");
  if (!Number.isFinite(t) || !Number.isFinite(n) || t <= 0 || n <= 0 || t > 2e4 || n > 2e4 || t * n > 16e7)
    throw new Error(
      "Mermaid 다이어그램 크기가 너무 큽니다. 다이어그램을 나누어 주세요."
    );
  return (e.length !== 4 || e.some((i) => !Number.isFinite(i))) && s.setAttribute("viewBox", `0 0 ${t} ${n}`), s.setAttribute("width", String(t)), s.setAttribute("height", String(n)), s.setAttribute("preserveAspectRatio", "xMidYMid meet"), { width: t, height: n };
}
async function ar(s, e) {
  if (typeof document > "u" || !document.body)
    throw new Error("Mermaid 렌더링에는 브라우저 문서가 필요합니다.");
  Zi(s), e = er(e);
  const t = ds.then(async () => {
    await Promise.all([
      document.fonts.load(`18px ${e}`, s),
      document.fonts.load(`bold 18px ${e}`, s),
      document.fonts.load(`italic 18px ${e}`, s)
    ]), await document.fonts.ready;
    const n = `comic-gen-mermaid-${zi}-${++Yi}`, i = document.createElement("div");
    i.dataset.comicDiagramTemporary = "", i.style.cssText = "all:initial!important;display:block!important;position:fixed!important;left:-100000px!important;top:0!important;width:20000px!important;pointer-events:none!important;opacity:0!important;";
    const r = [...document.fonts].filter(
      (c) => c.status === "loaded"
    );
    let o, a;
    const l = new MutationObserver(() => {
      const c = a?.querySelector("iframe"), f = c?.contentDocument;
      if (!(!c || !f)) {
        c.style.cssText = "all:initial!important;display:block!important;width:20000px!important;height:20000px!important;border:0!important;";
        for (const u of r) f.fonts.add(u);
      }
    });
    document.body.append(i);
    try {
      o = await tr(i);
      for (const S of r) o.document.fonts.add(S);
      a = o.document.createElement("div"), a.style.cssText = "width:20000px;", o.document.body.append(a), l.observe(a, { childList: !0, subtree: !0 });
      const c = o.api;
      c.initialize({
        startOnLoad: !1,
        securityLevel: "sandbox",
        suppressErrorRendering: !0,
        maxTextSize: It,
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
      const f = await c.render(n, s, a);
      l.disconnect();
      const u = ir(rr(f.svg)), d = or(u), m = i.attachShadow({ mode: "closed" });
      m.append(document.importNode(u, !0));
      const y = m.firstElementChild, h = [y, ...y.querySelectorAll("*")], g = new Set(
        h.map((S) => S.id).filter(Boolean)
      ), k = h.map((S) => {
        if (S.localName === "style") return "";
        const p = getComputedStyle(S), $ = document.createElement("span").style;
        for (const E of dt) {
          const L = st(
            p.getPropertyValue(E),
            g,
            !0
          );
          L && $.setProperty(E, L, "important");
        }
        return p.display === "none" && $.setProperty("display", "none", "important"), $.cssText;
      });
      h.forEach((S, p) => {
        S.localName === "style" ? S.remove() : (S.setAttribute("style", k[p]), S.removeAttribute("class"));
      }), y.style.removeProperty("visibility"), y.style.setProperty("width", `${d.width}px`, "important"), y.style.setProperty("height", `${d.height}px`, "important"), y.style.setProperty("max-width", "none", "important"), y.style.setProperty("max-height", "none", "important");
      const v = new XMLSerializer().serializeToString(y);
      if (v.length > 2e6)
        throw new Error(
          "Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요."
        );
      return { svg: v, ...d };
    } finally {
      l.disconnect(), o?.document.getElementById(n)?.remove(), o?.document.getElementById(`d${n}`)?.remove(), o?.document.getElementById(`i${n}`)?.remove(), o?.dispose(), i.remove();
    }
  });
  return ds = t.catch(() => {
  }), t;
}
function cr(s, e) {
  if (!/^[A-Za-z][A-Za-z0-9_-]{0,120}$/.test(e))
    throw new Error("다이어그램 SVG 식별자 접두사가 올바르지 않습니다.");
  const t = ln(s.svg), n = [t, ...t.querySelectorAll("*")], i = /* @__PURE__ */ new Map();
  let r = 0;
  const o = (a) => {
    const l = a.localName === "svg" ? a : a.closest("svg");
    let c = i.get(l);
    return c || (c = /* @__PURE__ */ new Map(), i.set(l, c)), c;
  };
  for (const a of n) {
    if (!a.id) continue;
    const l = o(a);
    if (l.has(a.id))
      throw new Error("다이어그램 SVG 식별자가 중복됩니다.");
    l.set(a.id, `${e}-${r++}`);
  }
  for (const a of n) {
    const l = o(a);
    for (const c of [...a.attributes])
      if (c.name === "id")
        a.setAttribute("id", l.get(c.value));
      else if (c.localName === "href" && c.value.startsWith("#")) {
        const f = l.get(c.value.slice(1));
        f && a.setAttribute(c.name, `#${f}`);
      } else c.name === "aria-labelledby" || c.name === "aria-describedby" ? a.setAttribute(
        c.name,
        c.value.split(/\s+/).map((f) => l.get(f) ?? f).join(" ")
      ) : /url\(/i.test(c.value) && a.setAttribute(
        c.name,
        c.value.replace(
          /url\(\s*(["']?)#([^"')\s]+)\1\s*\)/gi,
          (f, u, d) => l.has(d) ? `url(#${l.get(d)})` : f
        )
      );
  }
  return new XMLSerializer().serializeToString(t);
}
let un = 0, lr = 0;
document.fonts.addEventListener("loadingdone", (s) => {
  s.fontfaces.length && un++;
});
function hn(s, e, t) {
  e = Ri(e);
  const n = Qi(s), i = e.width ?? 720, r = e.panelFormat ?? t;
  if (r !== "compact" && r !== "phone")
    throw new Error("컷비율은 기본 또는 모바일이어야 합니다.");
  if (!Number.isFinite(i) || i < 480 || i > 2400)
    throw new Error("너비는 480~2400 사이여야 합니다.");
  const o = e.font ?? "Malgun Gothic, Apple SD Gothic Neo, sans-serif";
  if (typeof o != "string" || o.length > 300 || /[<>]/.test(o))
    throw new Error("올바른 글꼴 이름이 필요합니다.");
  return { comic: n, options: e, width: i, font: o, format: r };
}
function dn(s, e) {
  const { comic: t, width: n, font: i, options: r, format: o } = e;
  return JSON.stringify({
    panel: s,
    members: s.actors.map((a) => {
      const { asset: l, label: c, appearance: f } = t.cast[a.id];
      return [
        a.id,
        { asset: l, label: c, ...f ? { appearance: f } : {} }
      ];
    }),
    width: n,
    font: i,
    fontEpoch: un,
    fontVersion: r.fontVersion,
    assetVersion: On,
    layoutVersion: s.diagram ? 3 : 2,
    format: o
  });
}
function pn(s) {
  return {
    svg: "",
    width: 0,
    height: 0,
    diagnostics: [s instanceof Error ? s.message : "렌더링 실패"],
    panels: []
  };
}
function mn(s, e, t) {
  const { comic: n, width: i, font: r } = s, o = [], a = [], l = `cg-${Date.now().toString(36)}-${++lr}-${Math.random().toString(36).slice(2, 9)}`, c = (u, d, m) => `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${d}" viewBox="0 0 ${i} ${d}" role="img" aria-label="${U(m)}"><title>${U(m)}</title><rect width="100%" height="100%" fill="#f5f7fb"/><g font-family="${U(r)}" fill="#303341"><text x="24" y="42" font-size="24" font-weight="700">${U(m)}</text>${u}</g></svg>`;
  let f = 68;
  for (const [u, d] of e.entries()) {
    const { markup: m, height: y, hit: h } = d, g = (k) => n.panels[u].diagram ? cr(
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${y}" viewBox="0 0 ${i} ${y}" style="width:${i}px!important;height:${y}px!important;max-width:none!important;max-height:none!important">${m}</svg>`
      },
      `${l}-${k}-${u}`
    ) : m;
    o.push(
      `<g data-panel="${u}" transform="translate(0 ${f})">${g("whole")}</g>`
    ), a.push({
      index: u,
      svg: c(
        `<g data-panel="${u}" transform="translate(0 68)">${g("panel")}</g>`,
        y + 92,
        `${n.title} · ${u + 1}/${n.panels.length}`
      ),
      width: i,
      height: y + 92,
      diagnostics: [],
      cache: { hits: h ? 1 : 0, misses: h ? 0 : 1, bytes: t.bytes }
    }), f += y + 24;
  }
  return {
    svg: c(o.join(""), f, n.title),
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
function ps(s, e, t, n = "compact") {
  try {
    const i = hn(s, e, n), r = i.comic.panels.findIndex(
      (a) => a.diagram
    );
    if (r >= 0)
      throw new Error(
        `컷 ${r + 1}.다이어그램: 만화그리기비동기(renderComicAsync) 또는 컷그리기비동기(renderPanelsAsync)를 await로 호출하세요.`
      );
    const o = i.comic.panels.map((a) => {
      const l = dn(a, i), c = t.get(l), f = c ?? cn(
        a,
        i.comic.cast,
        i.width,
        i.font,
        i.format
      );
      return c || t.set(l, f), { ...f, hit: !!c };
    });
    return mn(i, o, t);
  } catch (i) {
    return pn(i);
  }
}
async function ms(s, e, t, n = "compact") {
  try {
    const i = hn(s, e, n);
    i.comic.panels.some((o) => o.diagram) && await document.fonts.ready;
    const r = [];
    for (const [o, a] of i.comic.panels.entries()) {
      const l = dn(a, i), c = t.get(l);
      if (c) {
        r.push({ ...c, hit: !0 });
        continue;
      }
      let f;
      if (a.diagram)
        try {
          f = await ar(a.diagram.source, i.font);
        } catch (d) {
          throw new Error(
            `컷 ${o + 1}.다이어그램: ${d instanceof Error ? d.message : "Mermaid 렌더링 실패"}`
          );
        }
      const u = cn(
        a,
        i.comic.cast,
        i.width,
        i.font,
        i.format,
        f
      );
      t.set(l, u), r.push({ ...u, hit: !1 });
    }
    return mn(i, r, t);
  } catch (i) {
    return pn(i);
  }
}
function gn(s = 2e6) {
  const e = new An(s);
  return {
    render: (t, n = {}) => ps(t, n, e),
    renderPanels: (t, n = {}) => ps(t, n, e, "phone"),
    renderAsync: (t, n = {}) => ms(t, n, e),
    renderPanelsAsync: (t, n = {}) => ms(t, n, e, "phone"),
    clearCache: () => e.clear()
  };
}
const pt = gn(), gr = pt.render, yr = pt.renderPanels, wr = pt.renderAsync, br = pt.renderPanelsAsync;
function kr(s, e) {
  const t = URL.createObjectURL(s), n = document.createElement("a");
  n.href = t, n.download = e, n.click(), setTimeout(() => URL.revokeObjectURL(t), 1e3);
}
async function $r(s, e = 1) {
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
        (f) => f ? l(f) : c(new Error("PNG 생성에 실패했습니다.")),
        "image/png"
      )
    );
  } finally {
    URL.revokeObjectURL(i);
  }
}
const fr = `
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
function gs(s, e = 0) {
  return [...s.querySelectorAll("g[data-panel]")].map((t, n) => {
    if (t.getAttribute("data-panel") !== String(n + e))
      throw new TypeError("만화의 컷 순서가 올바르지 않습니다.");
    const i = t.querySelector("rect");
    if (!i) throw new TypeError("만화에 컷 프레임이 없습니다.");
    let r = new DOMMatrix();
    for (let m = i; m && m !== s.documentElement; m = m.parentElement) {
      let y = new DOMMatrix();
      const h = m.getAttribute("transform") ?? "", g = /(matrix|translate|scale|rotate|skewX|skewY)\(([^)]*)\)/g;
      let k = h;
      for (const v of h.matchAll(g)) {
        const S = v[2].trim().split(/[\s,]+/).map(Number);
        if (!S.length || S.some((L) => !Number.isFinite(L)))
          throw new TypeError("만화의 컷 변환이 올바르지 않습니다.");
        const [p, $ = 0, E = 0] = S;
        switch (v[1]) {
          case "matrix":
            if (S.length !== 6)
              throw new TypeError("올바른 컷 행렬이 필요합니다.");
            y = y.multiply(new DOMMatrix(S));
            break;
          case "translate":
            y = y.translate(p, $);
            break;
          case "scale":
            y = y.scale(p, S[1] ?? p);
            break;
          case "rotate":
            y = y.translate($, E).rotate(p).translate(-$, -E);
            break;
          case "skewX":
            y = y.skewX(p);
            break;
          case "skewY":
            y = y.skewY(p);
            break;
        }
        k = k.replace(v[0], "");
      }
      if (k.trim()) throw new TypeError("지원하지 않는 컷 변환입니다.");
      r = y.multiply(r);
    }
    const o = Number(i.getAttribute("x") ?? 0), a = Number(i.getAttribute("y") ?? 0), l = Number(i.getAttribute("width")), c = Number(i.getAttribute("height"));
    if (![o, a, l, c].every(Number.isFinite) || l <= 0 || c <= 0)
      throw new TypeError("만화의 컷 크기가 올바르지 않습니다.");
    const f = [
      [o, a],
      [o + l, a],
      [o, a + c],
      [o + l, a + c]
    ].map(([m, y]) => r.transformPoint(new DOMPoint(m, y))), u = Math.min(...f.map((m) => m.x)), d = Math.min(...f.map((m) => m.y));
    return {
      x: u,
      y: d,
      width: Math.max(...f.map((m) => m.x)) - u,
      height: Math.max(...f.map((m) => m.y)) - d
    };
  });
}
function ur(s, e, t, n, i, r, o) {
  let a = 0, l = !1, c = 0;
  const f = () => {
    const b = s.getBoundingClientRect(), A = getComputedStyle(s);
    return {
      x: b.x + s.clientLeft + (parseFloat(A.paddingLeft) || 0),
      y: b.y + s.clientTop + (parseFloat(A.paddingTop) || 0)
    };
  }, u = () => {
    const b = e.getBoundingClientRect(), A = b.width / n;
    return t.map((M) => ({
      x: b.x + M.x * A,
      y: b.y + M.y * A,
      width: M.width * A,
      height: M.height * A
    }));
  }, d = () => {
    i.disabled = a === 0, r.disabled = a === t.length - 1, (document.activeElement === i && i.disabled || document.activeElement === r && r.disabled) && s.focus();
    const b = `${a + 1} / ${t.length}컷`;
    o.textContent !== b && (o.textContent = b);
  }, m = () => {
    if (l) return;
    if (s.scrollLeft === 0 && s.scrollTop === 0) {
      a = 0, d();
      return;
    }
    const b = f(), A = s.clientWidth - (parseFloat(getComputedStyle(s).paddingLeft) || 0) - (parseFloat(getComputedStyle(s).paddingRight) || 0), M = s.clientHeight - (parseFloat(getComputedStyle(s).paddingTop) || 0) - (parseFloat(getComputedStyle(s).paddingBottom) || 0);
    let C = -1, F = 1 / 0;
    u().forEach((I, j) => {
      const z = Math.max(
        0,
        Math.min(I.x + I.width, b.x + A) - Math.max(I.x, b.x)
      ) * Math.max(
        0,
        Math.min(I.y + I.height, b.y + M) - Math.max(I.y, b.y)
      ), Re = Math.hypot(
        Math.max(I.x - b.x, 0, b.x - I.x - I.width),
        Math.max(I.y - b.y, 0, b.y - I.y - I.height)
      );
      (z > C || z === C && Re < F) && (C = z, F = Re, a = j);
    }), d();
  }, y = () => {
    cancelAnimationFrame(c), l = !0;
    const b = s.scrollLeft, A = s.scrollTop;
    c = requestAnimationFrame(() => {
      c = requestAnimationFrame(() => {
        l = !1, (s.scrollLeft !== b || s.scrollTop !== A) && m();
      });
    });
  }, h = (b, A = a) => {
    if (a = Math.max(0, Math.min(t.length - 1, A + b)), a === A) {
      d();
      return;
    }
    const M = u()[a], C = f();
    s.scrollTo({
      left: s.scrollLeft + M.x - C.x,
      top: s.scrollTop + M.y - C.y,
      behavior: "instant"
    }), y(), d();
  }, g = () => h(-1), k = () => h(1), v = (b) => {
    b.target !== s || b.altKey || b.ctrlKey || b.metaKey || b.shiftKey || (b.key === "ArrowLeft" || b.key === "ArrowRight") && (b.preventDefault(), h(b.key === "ArrowLeft" ? -1 : 1));
  }, S = /* @__PURE__ */ new Set();
  let p, $ = !1;
  const E = (b) => {
    if (S.add(b.pointerId), $ = !1, S.size !== 1 || !b.isPrimary || b.button !== 0) {
      p = void 0;
      return;
    }
    p = {
      id: b.pointerId,
      x: b.clientX,
      y: b.clientY,
      moved: !1
    };
  }, L = (b) => {
    p?.id === b.pointerId && Math.hypot(b.clientX - p.x, b.clientY - p.y) > 8 && (p.moved = !0);
  }, w = (b) => {
    $ = S.size === 1 && p?.id === b.pointerId && !p.moved, S.delete(b.pointerId), p = void 0;
  }, N = (b) => {
    b ? S.delete(b.pointerId) : S.clear(), p = void 0, $ = !1;
  }, x = (b) => {
    const A = $;
    if ($ = !1, !A || b.detail > 1 || b.ctrlKey || b.metaKey || b.altKey || b.shiftKey || b.target !== e)
      return;
    const M = u(), C = M.findIndex(
      (F) => b.clientX >= F.x && b.clientX <= F.x + F.width && b.clientY >= F.y && b.clientY <= F.y + F.height
    );
    C >= 0 && (s.focus({ preventScroll: !0 }), h(
      b.clientX < M[C].x + M[C].width / 2 ? -1 : 1,
      C
    ));
  }, T = (b) => {
    s.contains(b.target) || N(b);
  };
  return e.draggable = !1, i.addEventListener("click", g), r.addEventListener("click", k), s.addEventListener("scroll", m), s.addEventListener("keydown", v), s.addEventListener("pointerdown", E), s.addEventListener("pointermove", L), s.addEventListener("pointerup", w), s.addEventListener("pointercancel", N), s.addEventListener("click", x), document.addEventListener("pointerup", T), document.addEventListener("pointercancel", T), d(), {
    capturePosition: () => {
      const b = f(), A = e.getBoundingClientRect(), M = A.width / n;
      return { x: (b.x - A.x) / M, y: (b.y - A.y) / M };
    },
    restorePosition: (b) => {
      const A = s.scrollLeft, M = s.scrollTop, C = e.getBoundingClientRect(), F = f(), I = C.width / n;
      s.scrollTo({
        left: s.scrollLeft + C.x + b.x * I - F.x,
        top: s.scrollTop + C.y + b.y * I - F.y,
        behavior: "instant"
      }), (s.scrollLeft !== A || s.scrollTop !== M) && y(), d();
    },
    reset: () => {
      cancelAnimationFrame(c), l = !1, a = 0, N(), d();
    },
    dispose: () => {
      cancelAnimationFrame(c), i.removeEventListener("click", g), r.removeEventListener("click", k), s.removeEventListener("scroll", m), s.removeEventListener("keydown", v), s.removeEventListener("pointerdown", E), s.removeEventListener("pointermove", L), s.removeEventListener("pointerup", w), s.removeEventListener("pointercancel", N), s.removeEventListener("click", x), document.removeEventListener("pointerup", T), document.removeEventListener("pointercancel", T), N();
    }
  };
}
const hr = `
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
`, ys = "http://www.w3.org/2000/svg", ws = /^#[\p{L}_][\p{L}\p{N}_:.-]*$/u, dr = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "filter",
  "mask",
  "clip-path",
  "marker-start",
  "marker-mid",
  "marker-end",
  "cursor"
]), pr = /* @__PURE__ */ new Set([
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
function bs(s) {
  if (!s || typeof s.svg != "string" || !s.svg || s.svg.length > 64e6 || !Number.isFinite(s.width) || s.width <= 0 || s.width > 1e6 || !Number.isFinite(s.height) || s.height <= 0 || s.height > 1e6 || s.diagnostics !== void 0 && (!Array.isArray(s.diagnostics) || s.diagnostics.length))
    throw new TypeError("완성된 코믹젠 렌더 결과가 필요합니다.");
  if (/<!DOCTYPE|<!ENTITY|<\?/i.test(s.svg))
    throw new TypeError("정적 코믹젠 SVG만 뷰어에 전달하세요.");
  const e = new DOMParser().parseFromString(s.svg, "image/svg+xml"), t = e.documentElement, n = (t.getAttribute("viewBox") ?? `0 0 ${s.width} ${s.height}`).trim().split(/[\s,]+/).map(Number);
  if (t.localName !== "svg" || t.namespaceURI !== ys || e.querySelector("parsererror") || n.length !== 4 || n[0] !== 0 || n[1] !== 0 || n[2] !== s.width || n[3] !== s.height || Number(t.getAttribute("width")) !== s.width || Number(t.getAttribute("height")) !== s.height)
    throw new TypeError("만화 SVG와 렌더 결과의 크기가 일치해야 합니다.");
  for (const i of [t, ...t.querySelectorAll("*")]) {
    if (i.namespaceURI !== ys || !pr.has(i.localName))
      throw new TypeError("외부 리소스나 실행 가능한 SVG는 지원하지 않습니다.");
    for (const r of i.attributes) {
      const o = r.localName.toLowerCase(), a = r.value;
      if (o.startsWith("on") || o === "base" && r.namespaceURI === "http://www.w3.org/XML/1998/namespace" || o === "href" && !ws.test(a))
        throw new TypeError(
          "외부 링크나 이벤트가 포함된 SVG는 지원하지 않습니다."
        );
      if (o === "style" && /@|javascript\s*:|vbscript\s*:|expression\s*\(|[\\<>]/i.test(a))
        throw new TypeError("정적 코믹젠 SVG 스타일만 지원합니다.");
      if (dr.has(o) && /[\\<>@]/.test(a))
        throw new TypeError("정적 코믹젠 SVG 색상과 참조만 지원합니다.");
      for (const l of a.matchAll(/url\s*\(([^)]*)\)/gi)) {
        const c = l[1].trim().replace(/^(['"])(.*)\1$/, "$2");
        if (!ws.test(c))
          throw new TypeError("SVG의 외부 리소스는 지원하지 않습니다.");
      }
    }
  }
  return e;
}
function yn(s) {
  const e = bs(s);
  if (!Array.isArray(s.panels) || s.panels.length < 1 || s.panels.length > 30)
    throw new TypeError("만화에는 실제 렌더된 1~30개의 컷이 필요합니다.");
  const t = [], n = s.panels.map((a, l) => {
    if (a.index !== l)
      throw new TypeError("만화의 개별 컷 순서가 일치해야 합니다.");
    const c = gs(bs(a), l);
    if (c.length !== 1 || ![c[0].x, c[0].y, c[0].width, c[0].height].every(
      Number.isFinite
    ) || c[0].width <= 0 || c[0].height <= 0 || c[0].x < 0 || c[0].y < 0 || c[0].x + c[0].width > a.width + 1 || c[0].y + c[0].height > a.height + 1)
      throw new TypeError("개별 컷 SVG에는 한 개의 컷 프레임이 필요합니다.");
    return t.push(c[0]), { ...a };
  }), i = gs(e);
  if (i.length !== n.length || i.some(
    (a) => ![a.x, a.y, a.width, a.height].every(Number.isFinite) || a.width <= 0 || a.height <= 0 || a.x < 0 || a.y < 0 || a.x + a.width > s.width + 1 || a.y + a.height > s.height + 1
  ))
    throw new TypeError("만화의 컷 프레임과 렌더 결과가 일치해야 합니다.");
  const r = e.documentElement.getAttribute("aria-label") ?? e.documentElement.querySelector("title")?.textContent ?? "만화", o = n.map((a, l) => {
    const c = i[l], f = t[l], u = Math.max(
      c.width / f.width,
      c.height / f.height
    );
    return { width: a.width * u, height: a.height * u };
  });
  return {
    result: { ...s, panels: n },
    title: r,
    bounds: i,
    panelWidth: Math.max(...o.map((a) => a.width)),
    panelHeight: Math.max(...o.map((a) => a.height))
  };
}
const Et = /* @__PURE__ */ Symbol.for("comic-gen.viewer.document-state.v1");
function Xt() {
  const s = document;
  return s[Et] || Object.defineProperty(s, Et, {
    value: { bodyLocks: /* @__PURE__ */ new WeakMap(), nextId: 0 }
  }), s[Et];
}
function wn() {
  const s = Xt();
  let e = s.styles;
  if (e)
    e.element.isConnected || document.head.append(e.element);
  else {
    const n = document.createElement("style");
    n.dataset.comicGenViewerStyles = "", n.textContent = hr, document.head.append(n), e = { element: n, count: 0 }, s.styles = e;
  }
  e.count++;
  let t = !1;
  return () => {
    t || (t = !0, --e.count === 0 && (e.element.remove(), s.styles = void 0));
  };
}
function mr() {
  const s = Xt().bodyLocks, e = document.body;
  let t = s.get(e);
  t || (t = {
    count: 0,
    value: e.style.getPropertyValue("overflow"),
    priority: e.style.getPropertyPriority("overflow")
  }, s.set(e, t), e.style.setProperty("overflow", "hidden", "important")), t.count++;
  let n = !1;
  return () => {
    n || (n = !0, --t.count === 0 && (t.value ? e.style.setProperty("overflow", t.value, t.priority) : e.style.removeProperty("overflow"), s.delete(e)));
  };
}
function bn(s, e, t, n) {
  const i = document.createElement("img"), r = URL.createObjectURL(new Blob([s], { type: "image/svg+xml" }));
  Object.assign(i, {
    src: r,
    width: e,
    height: t,
    alt: n,
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
function kn() {
  let s, e, t, n, i, r, o, a, l, c, f, u, d, m, y, h, g = !1;
  const k = () => {
    if (!s?.open || !c) return;
    const w = f?.capturePosition();
    e.dataset.preventOverflow = String(r.checked);
    const N = c.result;
    let x = N.width * Number(i.value);
    if (r.checked) {
      const T = getComputedStyle(e), b = Math.max(
        0,
        e.clientWidth - (parseFloat(T.paddingLeft) || 0) - (parseFloat(T.paddingRight) || 0)
      ), A = Math.max(
        0,
        e.clientHeight - (parseFloat(T.paddingTop) || 0) - (parseFloat(T.paddingBottom) || 0)
      );
      x = Math.min(
        x,
        b * N.width / c.panelWidth,
        A * N.width / c.panelHeight
      );
    }
    t.style.width = `${Math.max(0, x)}px`, w && Number.isFinite(w.x) && Number.isFinite(w.y) && f?.restorePosition(w);
  }, v = () => {
    f?.dispose(), f = void 0, d?.(), d = void 0, t?.replaceChildren(), c = void 0, m?.(), m = void 0;
    const w = h;
    h = void 0;
    const N = [
      ...document.querySelectorAll("dialog[open]")
    ].find((x) => x !== s);
    w?.isConnected && (!N || N.contains(w)) && w.focus({ preventScroll: !0 });
  }, S = () => {
    s?.open && s.close(), v();
  }, p = (w) => {
    w.preventDefault(), S();
  }, $ = () => {
    s?.open || v();
  }, E = (w) => {
    if (w.key !== "Tab" || !s?.open) return;
    const N = [
      ...s.querySelectorAll(
        "button:not(:disabled), input, select, [tabindex='0']"
      )
    ], x = N[0], T = N[N.length - 1];
    (!w.shiftKey && document.activeElement === T || w.shiftKey && document.activeElement === x) && (w.preventDefault(), (w.shiftKey ? T : x).focus());
  }, L = () => {
    if (s) return;
    y = wn();
    const w = `comic-gen-viewer-${++Xt().nextId}`;
    s = document.createElement("dialog"), s.className = "comic-viewer", s.dataset.comicGenViewer = "", s.setAttribute("aria-labelledby", `${w}-title`), s.setAttribute("aria-describedby", `${w}-help`), s.innerHTML = `<div class="comic-viewer-toolbar"><h2 class="comic-viewer-title" id="${w}-title"></h2><button type="button" autofocus>닫기</button><div class="comic-viewer-controls"><label class="comic-viewer-checkbox"><input type="checkbox" checked>화면 넘침 방지</label><label>보기 크기 <select><option value="1">100%</option><option value="1.5">150%</option><option value="2">200%</option></select></label><div class="comic-viewer-navigation"><button type="button" class="comic-previous" aria-label="이전 컷">←</button><span class="comic-position" role="status" aria-live="polite"></span><button type="button" class="comic-next" aria-label="다음 컷">→</button></div></div></div><p class="comic-viewer-help" id="${w}-help">화면 넘침 방지는 한 컷의 너비·높이를 화면에 맞춥니다. 다음 컷은 아래로 스크롤해 읽습니다. 컷 왼쪽은 이전, 오른쪽은 다음 컷입니다. 읽기 영역에서 ←/→ 키로도 이동합니다.</p><div class="comic-viewer-viewport" tabindex="0" role="region" aria-label="만화 읽기 영역"><div class="comic-viewer-artwork"></div></div>`, n = s.querySelector("h2"), e = s.querySelector(".comic-viewer-viewport"), t = s.querySelector(".comic-viewer-artwork"), i = s.querySelector("select"), r = s.querySelector('input[type="checkbox"]'), o = s.querySelector(".comic-previous"), a = s.querySelector(".comic-next"), l = s.querySelector(".comic-position"), i.addEventListener("change", k), r.addEventListener("change", k), s.querySelector("button").addEventListener("click", S), s.addEventListener("cancel", p), s.addEventListener("close", $), s.addEventListener("keydown", E), document.body.append(s), u = new ResizeObserver(k), u.observe(e);
  };
  return {
    get isOpen() {
      return !!s?.open;
    },
    open: (w, N = {}) => {
      if (g) throw new Error("폐기한 만화 뷰어는 다시 열 수 없습니다.");
      const x = yn(w), T = N.trigger ?? (s?.open ? h : document.activeElement instanceof HTMLElement ? document.activeElement : void 0);
      L(), f?.dispose(), d?.(), c = x, h = T, n.textContent = x.title, i.value = "1", r.checked = !0;
      const b = bn(
        x.result.svg,
        x.result.width,
        x.result.height,
        x.title
      );
      if (d = b.revoke, t.replaceChildren(b.image), f = ur(
        e,
        b.image,
        x.bounds,
        x.result.width,
        o,
        a,
        l
      ), !s.open) {
        m = mr();
        try {
          s.showModal();
        } catch (A) {
          throw v(), A;
        }
      }
      k(), e.scrollTo(0, 0), f.reset(), s.querySelector("button").focus({ preventScroll: !0 });
    },
    close: S,
    destroy: () => {
      g || (g = !0, S(), u?.disconnect(), s && (i.removeEventListener("change", k), r.removeEventListener("change", k), s.querySelector("button").removeEventListener("click", S), s.removeEventListener("cancel", p), s.removeEventListener("close", $), s.removeEventListener("keydown", E), s.remove()), y?.(), y = void 0);
    }
  };
}
function Sr(s, e) {
  const t = yn(e), n = wn(), i = kn(), r = document.createElement("button");
  r.type = "button", r.className = "comic-card", r.dataset.comicGenCard = "", r.setAttribute("aria-haspopup", "dialog"), r.setAttribute("aria-label", `${t.title} · 만화 읽기`);
  const o = document.createElement("span");
  o.className = "comic-card-thumbnail", o.setAttribute("aria-hidden", "true");
  const a = t.result.panels[0], l = bn(
    a.svg,
    a.width,
    a.height,
    `${t.title} · 1/${t.result.panels.length}`
  );
  o.append(l.image);
  const c = document.createElement("span");
  c.className = "comic-card-copy";
  const f = document.createElement("strong");
  f.textContent = t.title;
  const u = document.createElement("span");
  u.textContent = `${t.result.panels.length}컷 · 만화 읽기 ↗`, c.append(f, u), r.append(o, c);
  const d = () => i.open(t.result, { trigger: r });
  r.addEventListener("click", d), s.replaceChildren(r);
  let m = !1;
  return () => {
    m || (m = !0, r.removeEventListener("click", d), i.destroy(), l.revoke(), r.remove(), n());
  };
}
const ks = /* @__PURE__ */ new WeakMap(), $n = gn(), _t = /* @__PURE__ */ new WeakMap(), Pe = kn();
let Be;
function Sn(s) {
  s.result?.svg && (Be = s, Pe.open(s.result, { trigger: s.button }));
}
function vn(s) {
  if (!document.getElementById("comic-gen-embed-styles")) {
    const n = document.createElement("style");
    n.id = "comic-gen-embed-styles", n.textContent = fr, document.head.append(n);
  }
  const e = 'pre[language="comic-gen"], pre[data-comic], pre:has(code.language-comic), pre:has(code.language-comic-gen)', t = [...s.querySelectorAll(e)];
  return s instanceof HTMLElement && s.matches(e) && t.unshift(s), t;
}
function jt(s) {
  return (s.querySelector("code") ?? s).textContent ?? "";
}
function En(s) {
  let e = ks.get(s);
  if (!e) {
    const t = document.createElement("figure");
    t.className = "comic-figure";
    const n = document.createElement("button");
    n.type = "button", n.className = "comic-card", n.setAttribute("aria-haspopup", "dialog");
    const i = document.createElement("span");
    i.className = "comic-card-thumbnail", i.setAttribute("aria-hidden", "true");
    const r = document.createElement("span");
    r.className = "comic-card-copy";
    const o = document.createElement("strong"), a = document.createElement("span");
    r.append(o, a), n.append(i, r), e = { figure: t, button: n, thumbnail: i, title: o, caption: a };
    const l = e;
    n.addEventListener("click", () => Sn(l)), ks.set(s, e);
  }
  return s.after(e.figure), s.hidden = !0, e;
}
function Ln(s, e) {
  if (s.result = e, s.figure.removeAttribute("aria-busy"), s.button.disabled = !1, e.svg) {
    const t = new DOMParser().parseFromString(e.svg, "image/svg+xml");
    s.title.textContent = t.documentElement.getAttribute("aria-label"), s.caption.textContent = `${e.panels.length}컷 · 만화 읽기 ↗`, s.button.setAttribute(
      "aria-label",
      `${s.title.textContent} · 만화 읽기`
    ), s.thumbnail.innerHTML = e.panels[0].svg, s.figure.replaceChildren(s.button), Be === s && Pe.isOpen && Sn(s);
  } else {
    Be === s && Pe.close();
    const t = document.createElement("p");
    t.setAttribute("role", "alert"), t.textContent = e.diagnostics.join(`
`), s.figure.replaceChildren(t);
  }
}
function Nn(s) {
  const e = (_t.get(s) ?? 0) + 1;
  return _t.set(s, e), e;
}
function vr(s = document, e = {}) {
  return vn(s).map((t) => {
    Nn(t);
    const n = $n.render(jt(t), e);
    return Ln(En(t), n), n;
  });
}
async function Er(s = document, e = {}) {
  return Promise.all(
    vn(s).map(async (t) => {
      const n = jt(t), i = Nn(t), r = t.isConnected, o = En(t);
      if (o.figure.setAttribute("aria-busy", "true"), o.button.disabled = !0, !o.result) {
        const l = document.createElement("p");
        l.setAttribute("role", "status"), l.textContent = "만화를 그리는 중…", o.figure.replaceChildren(l);
      }
      const a = await $n.renderAsync(n, e);
      if (_t.get(t) !== i) return a;
      if (r && !t.isConnected)
        return o.figure.remove(), Be === o && Pe.close(), a;
      if (jt(t) !== n) {
        o.figure.removeAttribute("aria-busy"), o.result = void 0, Be === o && Pe.close();
        const l = document.createElement("p");
        return l.setAttribute("role", "status"), l.textContent = "코드가 바뀌었어요. 다시 그리기를 호출하세요.", o.figure.replaceChildren(l), a;
      }
      return Ln(o, a), a;
    })
  );
}
export {
  On as assetVersion,
  kn as createComicViewer,
  gn as createRenderer,
  kr as downloadBlob,
  $r as exportPng,
  Sr as mountComicCard,
  vr as renderCodeBlocks,
  Er as renderCodeBlocksAsync,
  gr as renderComic,
  wr as renderComicAsync,
  yr as renderPanels,
  br as renderPanelsAsync,
  gn as 렌더러만들기,
  gr as 만화그리기,
  wr as 만화그리기비동기,
  kn as 만화뷰어만들기,
  Sr as 만화카드붙이기,
  Ct as 문법값,
  V as 문법항목,
  yr as 컷그리기,
  br as 컷그리기비동기,
  vr as 코드블록그리기,
  Er as 코드블록그리기비동기
};
