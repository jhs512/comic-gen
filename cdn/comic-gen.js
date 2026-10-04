/*! Comic Gen browser SDK v0.8.3
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
const Oe = Object.freeze({
  skinColor: "#f0c8a6",
  hairStyle: "short",
  hairColor: "#47362f",
  outfit: "shirt",
  outfitColor: "#647bd6",
  glasses: !1
}), Ft = (n) => {
  if (n.length !== 4 && n.length !== 7 || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(n))
    throw new Error("사람의 외형 색상은 #RGB 또는 #RRGGBB로 작성하세요.");
  return n;
};
function zn(n = Oe) {
  const e = Ft(n.skinColor), t = Ft(n.hairColor), s = Ft(n.outfitColor), i = {
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
  const a = (u, d) => d ? `<g data-human-part="${u}">${d}</g>` : "", l = n.glasses ? '<g data-human-part="glasses" fill="none" stroke-width="1.9"><rect x="-28" y="-30" width="22" height="18" rx="7"/><rect x="6" y="-30" width="22" height="18" rx="7"/><path d="M-6 -22Q0 -25 6 -22M-28 -23L-34 -25M28 -23L34 -25"/></g>' : "", c = `<g data-human="true" data-hair-style="${n.hairStyle}" data-outfit="${n.outfit}">${a("hair-back", i[n.hairStyle])}${a("outfit", o[n.outfit])}${a("neck", `<path d="M-10 11V24Q0 33 10 24V11Z" fill="${e}"/>`)}${a("ears", `<ellipse cx="-35" cy="-17" rx="6" ry="8" fill="${e}"/><ellipse cx="35" cy="-17" rx="6" ry="8" fill="${e}"/>`)}${a("face", `<path d="M-34 -25Q-36 -54 0 -55Q36 -54 34 -25L32 -5Q29 18 0 21Q-29 18 -32 -5Z" fill="${e}"/><g stroke="none" fill="#df8e8b" fill-opacity=".22"><ellipse cx="-24" cy="-8" rx="5" ry="3"/><ellipse cx="24" cy="-8" rx="5" ry="3"/></g>`)}${a("hair-front", r[n.hairStyle])}${a("nose", '<path d="M-2 -8Q0 -6 2 -8" fill="none" stroke-width="1.5" stroke-opacity=".6"/>')}${l}</g>`, f = `<path d="M-49 43Q-54 46 -51 51L-48 55Q-44 59 -40 55L-36 50Q-34 46 -38 43L-40 42Z" fill="${e}"/><path d="M-46 48L-43 51M-42 46L-39 49" fill="none" stroke-width="1.5"/>`;
  return {
    body: c,
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
const oi = "9", ai = ["wave", "point", "point-up"], ci = ["left", "right"], Yn = {
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
  human: zn()
};
function li(n) {
  return n.asset === "human" ? zn(n.appearance) : Yn[n.asset];
}
const Wn = {
  neutral: '<g stroke="none"><circle cx="-17" cy="-4" r="3.8"/><circle cx="17" cy="-4" r="3.8"/></g><path d="M-10 16Q0 23 10 16" fill="none" stroke-width="2.4"/>',
  happy: '<path d="M-24 -3Q-17 -12 -10 -3M10 -3Q17 -12 24 -3" fill="none" stroke-width="2.5"/><path d="M-14 13Q0 20 14 13Q12 31 0 31Q-12 31 -14 13Z" stroke-width="2.2"/><path d="M-10 17Q0 21 10 17L8 21Q0 24 -8 21Z" fill="white" stroke="none"/>',
  confused: '<g stroke="none"><circle cx="-17" cy="-3" r="3.8"/><circle cx="17" cy="-3" r="3.8"/></g><path d="M-25 -15Q-19 -22 -10 -17M10 -14L24 -11M-7 18Q0 13 9 19" fill="none" stroke-width="2.3"/>',
  sad: '<g stroke="none"><circle cx="-17" cy="-2" r="3.6"/><circle cx="17" cy="-2" r="3.6"/></g><path d="M-25 -13Q-17 -13 -11 -19M11 -19Q17 -13 25 -13M-11 23Q0 11 11 23" fill="none" stroke-width="2.3"/>',
  angry: '<g stroke="none"><circle cx="-17" cy="-1" r="3.6"/><circle cx="17" cy="-1" r="3.6"/></g><path d="M-25 -16L-10 -9M10 -9L25 -16M-10 21Q0 15 10 21" fill="none" stroke-width="2.6"/>'
}, vt = {
  request: '<g stroke-width="2.2" stroke-linejoin="round"><rect x="-18" y="-13" width="36" height="26" rx="4" fill="#fff1cf"/><path d="M-16 10L-5 1M5 1L16 10" fill="none" stroke="#cfb67d" stroke-width="1.4"/><path d="M-17 -10L-3 1Q0 3 3 1L17 -10" fill="none"/></g>',
  data: '<g stroke-width="2.2"><path d="M-16 -12v23c0 10 32 10 32 0v-23" fill="#daccff"/><path d="M7 -7V17Q13 15 16 11V-12Z" fill="#b59cdd" stroke="none"/><ellipse cy="-12" rx="16" ry="6" fill="#eee6ff"/><path d="M-15 7Q0 15 15 7" fill="none" stroke="#9e86c7" stroke-width="1.4"/></g>',
  key: '<g stroke-width="2.2" stroke-linejoin="round"><path d="M-3 -3H20V3H17V9H12V3H6V7H2V3H-3Z" fill="#ffdd96"/><path d="M-2 0a8 8 0 1 0-16 0a8 8 0 1 0 16 0ZM-7 0a3 3 0 1 1-6 0a3 3 0 1 1 6 0Z" fill="#ffdd96" fill-rule="evenodd"/></g>'
};
function se(n) {
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
class fi {
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
const an = /* @__PURE__ */ Symbol.for("yaml.alias"), Wt = /* @__PURE__ */ Symbol.for("yaml.document"), $e = /* @__PURE__ */ Symbol.for("yaml.map"), Jn = /* @__PURE__ */ Symbol.for("yaml.pair"), he = /* @__PURE__ */ Symbol.for("yaml.scalar"), Ve = /* @__PURE__ */ Symbol.for("yaml.seq"), ae = /* @__PURE__ */ Symbol.for("yaml.node.type"), Ue = (n) => !!n && typeof n == "object" && n[ae] === an, Nt = (n) => !!n && typeof n == "object" && n[ae] === Wt, ct = (n) => !!n && typeof n == "object" && n[ae] === $e, H = (n) => !!n && typeof n == "object" && n[ae] === Jn, F = (n) => !!n && typeof n == "object" && n[ae] === he, lt = (n) => !!n && typeof n == "object" && n[ae] === Ve;
function V(n) {
  if (n && typeof n == "object")
    switch (n[ae]) {
      case $e:
      case Ve:
        return !0;
    }
  return !1;
}
function U(n) {
  if (n && typeof n == "object")
    switch (n[ae]) {
      case an:
      case $e:
      case he:
      case Ve:
        return !0;
    }
  return !1;
}
const Zn = (n) => (F(n) || V(n)) && !!n.anchor, Ae = /* @__PURE__ */ Symbol("break visit"), ui = /* @__PURE__ */ Symbol("skip children"), tt = /* @__PURE__ */ Symbol("remove node");
function He(n, e) {
  const t = hi(e);
  Nt(n) ? _e(null, n.contents, t, Object.freeze([n])) === tt && (n.contents = null) : _e(null, n, t, Object.freeze([]));
}
He.BREAK = Ae;
He.SKIP = ui;
He.REMOVE = tt;
function _e(n, e, t, s) {
  const i = di(n, e, t, s);
  if (U(i) || H(i))
    return pi(n, s, i), _e(n, i, t, s);
  if (typeof i != "symbol") {
    if (V(e)) {
      s = Object.freeze(s.concat(e));
      for (let r = 0; r < e.items.length; ++r) {
        const o = _e(r, e.items[r], t, s);
        if (typeof o == "number")
          r = o - 1;
        else {
          if (o === Ae)
            return Ae;
          o === tt && (e.items.splice(r, 1), r -= 1);
        }
      }
    } else if (H(e)) {
      s = Object.freeze(s.concat(e));
      const r = _e("key", e.key, t, s);
      if (r === Ae)
        return Ae;
      r === tt && (e.key = null);
      const o = _e("value", e.value, t, s);
      if (o === Ae)
        return Ae;
      o === tt && (e.value = null);
    }
  }
  return i;
}
function hi(n) {
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
function di(n, e, t, s) {
  if (typeof t == "function")
    return t(n, e, s);
  if (ct(e))
    return t.Map?.(n, e, s);
  if (lt(e))
    return t.Seq?.(n, e, s);
  if (H(e))
    return t.Pair?.(n, e, s);
  if (F(e))
    return t.Scalar?.(n, e, s);
  if (Ue(e))
    return t.Alias?.(n, e, s);
}
function pi(n, e, t) {
  const s = e[e.length - 1];
  if (V(s))
    s.items[n] = t;
  else if (H(s))
    n === "key" ? s.key = t : s.value = t;
  else if (Nt(s))
    s.contents = t;
  else {
    const i = Ue(s) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${i} parent`);
  }
}
const mi = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, gi = (n) => n.replace(/[!,[\]{}]/g, (e) => mi[e]);
class X {
  constructor(e, t) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, X.defaultYaml, e), this.tags = Object.assign({}, X.defaultTags, t);
  }
  clone() {
    const e = new X(this.yaml, this.tags);
    return e.docStart = this.docStart, e;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const e = new X(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: X.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, X.defaultTags);
        break;
    }
    return e;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(e, t) {
    this.atNextDocument && (this.yaml = { explicit: X.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, X.defaultTags), this.atNextDocument = !1);
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
        return t + gi(e.substring(s.length));
    return e[0] === "!" ? e : `!<${e}>`;
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], s = Object.entries(this.tags);
    let i;
    if (e && s.length > 0 && U(e.contents)) {
      const r = {};
      He(e.contents, (o, a) => {
        U(a) && a.tag && (r[a.tag] = !0);
      }), i = Object.keys(r);
    } else
      i = [];
    for (const [r, o] of s)
      r === "!!" && o === "tag:yaml.org,2002:" || (!e || i.some((a) => a.startsWith(o))) && t.push(`%TAG ${r} ${o}`);
    return t.join(`
`);
  }
}
X.defaultYaml = { explicit: !1, version: "1.2" };
X.defaultTags = { "!!": "tag:yaml.org,2002:" };
function Xn(n) {
  if (/[\x00-\x19\s,[\]{}]/.test(n)) {
    const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;
    throw new Error(t);
  }
  return !0;
}
function es(n) {
  const e = /* @__PURE__ */ new Set();
  return He(n, {
    Value(t, s) {
      s.anchor && e.add(s.anchor);
    }
  }), e;
}
function ts(n, e) {
  for (let t = 1; ; ++t) {
    const s = `${n}${t}`;
    if (!e.has(s))
      return s;
  }
}
function yi(n, e) {
  const t = [], s = /* @__PURE__ */ new Map();
  let i = null;
  return {
    onAnchor: (r) => {
      t.push(r), i ?? (i = es(n));
      const o = ts(e, i);
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
        if (typeof o == "object" && o.anchor && (F(o.node) || V(o.node)))
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
function Qe(n, e, t, s) {
  if (s && typeof s == "object")
    if (Array.isArray(s))
      for (let i = 0, r = s.length; i < r; ++i) {
        const o = s[i], a = Qe(n, s, String(i), o);
        a === void 0 ? delete s[i] : a !== o && (s[i] = a);
      }
    else if (s instanceof Map)
      for (const i of Array.from(s.keys())) {
        const r = s.get(i), o = Qe(n, s, i, r);
        o === void 0 ? s.delete(i) : o !== r && s.set(i, o);
      }
    else if (s instanceof Set)
      for (const i of Array.from(s)) {
        const r = Qe(n, s, i, i);
        r === void 0 ? s.delete(i) : r !== i && (s.delete(i), s.add(r));
      }
    else
      for (const [i, r] of Object.entries(s)) {
        const o = Qe(n, s, i, r);
        o === void 0 ? delete s[i] : o !== r && (s[i] = o);
      }
  return n.call(e, t, s);
}
function oe(n, e, t) {
  if (Array.isArray(n))
    return n.map((s, i) => oe(s, String(i), t));
  if (n && typeof n.toJSON == "function") {
    if (!t || !Zn(n))
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
class cn {
  constructor(e) {
    Object.defineProperty(this, ae, { value: e });
  }
  /** Create a copy of this node.  */
  clone() {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (e.range = this.range.slice()), e;
  }
  /** A plain JavaScript representation of this node. */
  toJS(e, { mapAsMap: t, maxAliasCount: s, onAnchor: i, reviver: r } = {}) {
    if (!Nt(e))
      throw new TypeError("A document argument is required");
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: e,
      keep: !0,
      mapAsMap: t === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof s == "number" ? s : 100
    }, a = oe(this, "", o);
    if (typeof i == "function")
      for (const { count: l, res: c } of o.anchors.values())
        i(c, l);
    return typeof r == "function" ? Qe(r, { "": a }, "", a) : a;
  }
}
class ln extends cn {
  constructor(e) {
    super(an), this.source = e, Object.defineProperty(this, "tag", {
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
    t?.aliasResolveCache ? s = t.aliasResolveCache : (s = [], He(e, {
      Node: (r, o) => {
        (Ue(o) || Zn(o)) && s.push(o);
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
      let l = r.get(i);
      if (l || (oe(i, null, t), l = r.get(i)), l?.res === void 0) {
        const c = "This should not happen: Alias anchor was not resolved?";
        throw new ReferenceError(c);
      }
      if (a >= 0 && (l.count += 1, l.aliasCount === 0 && (l.aliasCount = wt(o, i, r)), l.count * l.aliasCount > a)) {
        const c = "Excessive alias count indicates a resource exhaustion attack";
        throw new ReferenceError(c);
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
      if (Xn(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
        const r = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(r);
      }
      if (e.implicitKey)
        return `${i} `;
    }
    return i;
  }
}
function wt(n, e, t) {
  if (Ue(e)) {
    const s = e.resolve(n), i = t && s && t.get(s);
    return i ? i.count * i.aliasCount : 0;
  } else if (V(e)) {
    let s = 0;
    for (const i of e.items) {
      const r = wt(n, i, t);
      r > s && (s = r);
    }
    return s;
  } else if (H(e)) {
    const s = wt(n, e.key, t), i = wt(n, e.value, t);
    return Math.max(s, i);
  }
  return 1;
}
const ns = (n) => !n || typeof n != "function" && typeof n != "object";
class C extends cn {
  constructor(e) {
    super(he), this.value = e;
  }
  toJSON(e, t) {
    return t?.keep ? this.value : oe(this.value, e, t);
  }
  toString() {
    return String(this.value);
  }
}
C.BLOCK_FOLDED = "BLOCK_FOLDED";
C.BLOCK_LITERAL = "BLOCK_LITERAL";
C.PLAIN = "PLAIN";
C.QUOTE_DOUBLE = "QUOTE_DOUBLE";
C.QUOTE_SINGLE = "QUOTE_SINGLE";
const wi = "tag:yaml.org,2002:";
function bi(n, e, t) {
  if (e) {
    const s = t.filter((r) => r.tag === e), i = s.find((r) => !r.format) ?? s[0];
    if (!i)
      throw new Error(`Tag ${e} not found`);
    return i;
  }
  return t.find((s) => s.identify?.(n) && !s.format);
}
function it(n, e, t) {
  if (Nt(n) && (n = n.contents), U(n))
    return n;
  if (H(n)) {
    const u = t.schema[$e].createNode?.(t.schema, null, t);
    return u.items.push(n), u;
  }
  (n instanceof String || n instanceof Number || n instanceof Boolean || typeof BigInt < "u" && n instanceof BigInt) && (n = n.valueOf());
  const { aliasDuplicateObjects: s, onAnchor: i, onTagObj: r, schema: o, sourceObjects: a } = t;
  let l;
  if (s && n && typeof n == "object") {
    if (l = a.get(n), l)
      return l.anchor ?? (l.anchor = i(n)), new ln(l.anchor);
    l = { anchor: null, node: null }, a.set(n, l);
  }
  e?.startsWith("!!") && (e = wi + e.slice(2));
  let c = bi(n, e, o.tags);
  if (!c) {
    if (n && typeof n.toJSON == "function" && (n = n.toJSON()), !n || typeof n != "object") {
      const u = new C(n);
      return l && (l.node = u), u;
    }
    c = n instanceof Map ? o[$e] : Symbol.iterator in Object(n) ? o[Ve] : o[$e];
  }
  r && (r(c), delete t.onTagObj);
  const f = c?.createNode ? c.createNode(t.schema, n, t) : typeof c?.nodeClass?.from == "function" ? c.nodeClass.from(t.schema, n, t) : new C(n);
  return e ? f.tag = e : c.default || (f.tag = c.tag), l && (l.node = f), f;
}
function St(n, e, t) {
  let s = t;
  for (let i = e.length - 1; i >= 0; --i) {
    const r = e[i];
    if (typeof r == "number" && Number.isInteger(r) && r >= 0) {
      const o = [];
      o[r] = s, s = o;
    } else
      s = /* @__PURE__ */ new Map([[r, s]]);
  }
  return it(s, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: n,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const Xe = (n) => n == null || typeof n == "object" && !!n[Symbol.iterator]().next().done;
class ss extends cn {
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
    return e && (t.schema = e), t.items = t.items.map((s) => U(s) || H(s) ? s.clone(e) : s), this.range && (t.range = this.range.slice()), t;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(e, t) {
    if (Xe(e))
      this.add(t);
    else {
      const [s, ...i] = e, r = this.get(s, !0);
      if (V(r))
        r.addIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(s, St(this.schema, i, t));
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
    if (V(i))
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
    return i.length === 0 ? !t && F(r) ? r.value : r : V(r) ? r.getIn(i, t) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!H(t))
        return !1;
      const s = t.value;
      return s == null || e && F(s) && s.value == null && !s.commentBefore && !s.comment && !s.tag;
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
    return V(i) ? i.hasIn(s) : !1;
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
      if (V(r))
        r.setIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(s, St(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`);
    }
  }
}
const ki = (n) => n.replace(/^(?!$)(?: $)?/gm, "#");
function me(n, e) {
  return /^\n+$/.test(n) ? n.substring(1) : e ? n.replace(/^(?! *$)/gm, e) : n;
}
const Me = (n, e, t) => n.endsWith(`
`) ? me(t, e) : t.includes(`
`) ? `
` + me(t, e) : (n.endsWith(" ") ? "" : " ") + t, is = "flow", Jt = "block", bt = "quoted";
function Ot(n, e, t = "flow", { indentAtStart: s, lineWidth: i = 80, minContentWidth: r = 20, onFold: o, onOverflow: a } = {}) {
  if (!i || i < 0)
    return n;
  i < r && (r = 0);
  const l = Math.max(1 + r, 1 + i - e.length);
  if (n.length <= l)
    return n;
  const c = [], f = {};
  let u = i - e.length;
  typeof s == "number" && (s > i - Math.max(2, r) ? c.push(0) : u = i - s);
  let d, p, m = !1, h = -1, g = -1, w = -1;
  t === Jt && (h = Nn(n, h, e.length), h !== -1 && (u = h + l));
  for (let b; b = n[h += 1]; ) {
    if (t === bt && b === "\\") {
      switch (g = h, n[h + 1]) {
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
    if (b === `
`)
      t === Jt && (h = Nn(n, h, e.length)), u = h + e.length + l, d = void 0;
    else {
      if (b === " " && p && p !== " " && p !== `
` && p !== "	") {
        const $ = n[h + 1];
        $ && $ !== " " && $ !== `
` && $ !== "	" && (d = h);
      }
      if (h >= u)
        if (d)
          c.push(d), u = d + l, d = void 0;
        else if (t === bt) {
          for (; p === " " || p === "	"; )
            p = b, b = n[h += 1], m = !0;
          const $ = h > w + 1 ? h - 2 : g - 1;
          if (f[$])
            return n;
          c.push($), f[$] = !0, u = $ + l, d = void 0;
        } else
          m = !0;
    }
    p = b;
  }
  if (m && a && a(), c.length === 0)
    return n;
  o && o();
  let v = n.slice(0, c[0]);
  for (let b = 0; b < c.length; ++b) {
    const $ = c[b], E = c[b + 1] || n.length;
    $ === 0 ? v = `
${e}${n.slice(0, E)}` : (t === bt && f[$] && (v += `${n[$]}\\`), v += `
${e}${n.slice($ + 1, E)}`);
  }
  return v;
}
function Nn(n, e, t) {
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
const At = (n, e) => ({
  indentAtStart: e ? n.indent.length : n.indentAtStart,
  lineWidth: n.options.lineWidth,
  minContentWidth: n.options.minContentWidth
}), Mt = (n) => /^(%|---|\.\.\.)/m.test(n);
function $i(n, e, t) {
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
function nt(n, e) {
  const t = JSON.stringify(n);
  if (e.options.doubleQuotedAsJSON)
    return t;
  const { implicitKey: s } = e, i = e.options.doubleQuotedMinMultiLineLength, r = e.indent || (Mt(n) ? "  " : "");
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
          if (s || t[l + 2] === '"' || t.length < i)
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
  return o = a ? o + t.slice(a) : t, s ? o : Ot(o, r, bt, At(e, !1));
}
function Zt(n, e) {
  if (e.options.singleQuote === !1 || e.implicitKey && n.includes(`
`) || /[ \t]\n|\n[ \t]/.test(n))
    return nt(n, e);
  const t = e.indent || (Mt(n) ? "  " : ""), s = "'" + n.replace(/'/g, "''").replace(/\n+/g, `$&
${t}`) + "'";
  return e.implicitKey ? s : Ot(s, t, is, At(e, !1));
}
function De(n, e) {
  const { singleQuote: t } = e.options;
  let s;
  if (t === !1)
    s = nt;
  else {
    const i = n.includes('"'), r = n.includes("'");
    i && !r ? s = Zt : r && !i ? s = nt : s = t ? Zt : nt;
  }
  return s(n, e);
}
let Xt;
try {
  Xt = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  Xt = /\n+(?!\n|$)/g;
}
function kt({ comment: n, type: e, value: t }, s, i, r) {
  const { blockQuote: o, commentString: a, lineWidth: l } = s.options;
  if (!o || /\n[\t ]+$/.test(t))
    return De(t, s);
  const c = s.indent || (s.forceBlockIndent || Mt(t) ? "  " : ""), f = o === "literal" ? !0 : o === "folded" || e === C.BLOCK_FOLDED ? !1 : e === C.BLOCK_LITERAL ? !0 : !$i(t, l, c.length);
  if (!t)
    return f ? `|
` : `>
`;
  let u, d;
  for (d = t.length; d > 0; --d) {
    const E = t[d - 1];
    if (E !== `
` && E !== "	" && E !== " ")
      break;
  }
  let p = t.substring(d);
  const m = p.indexOf(`
`);
  m === -1 ? u = "-" : t === p || m !== p.length - 1 ? (u = "+", r && r()) : u = "", p && (t = t.slice(0, -p.length), p[p.length - 1] === `
` && (p = p.slice(0, -1)), p = p.replace(Xt, `$&${c}`));
  let h = !1, g, w = -1;
  for (g = 0; g < t.length; ++g) {
    const E = t[g];
    if (E === " ")
      h = !0;
    else if (E === `
`)
      w = g;
    else
      break;
  }
  let v = t.substring(0, w < g ? w + 1 : g);
  v && (t = t.substring(v.length), v = v.replace(/\n+/g, `$&${c}`));
  let $ = (h ? c ? "2" : "1" : "") + u;
  if (n && ($ += " " + a(n.replace(/ ?[\r\n]+/g, " ")), i && i()), !f) {
    const E = t.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${c}`);
    let x = !1;
    const T = At(s, !0);
    o !== "folded" && e !== C.BLOCK_FOLDED && (T.onOverflow = () => {
      x = !0;
    });
    const L = Ot(`${v}${E}${p}`, c, Jt, T);
    if (!x)
      return `>${$}
${c}${L}`;
  }
  return t = t.replace(/\n+/g, `$&${c}`), `|${$}
${c}${v}${t}${p}`;
}
function vi(n, e, t, s) {
  const { type: i, value: r } = n, { actualString: o, implicitKey: a, indent: l, indentStep: c, inFlow: f } = e;
  if (a && r.includes(`
`) || f && /[[\]{},]/.test(r))
    return De(r, e);
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
    return a || f || !r.includes(`
`) ? De(r, e) : kt(n, e, t, s);
  if (!a && !f && i !== C.PLAIN && r.includes(`
`))
    return kt(n, e, t, s);
  if (Mt(r)) {
    if (l === "")
      return e.forceBlockIndent = !0, kt(n, e, t, s);
    if (a && l === c)
      return De(r, e);
  }
  const u = r.replace(/\n+/g, `$&
${l}`);
  if (o) {
    const d = (h) => h.default && h.tag !== "tag:yaml.org,2002:str" && h.test?.test(u), { compat: p, tags: m } = e.doc.schema;
    if (m.some(d) || p?.some(d))
      return De(r, e);
  }
  return a ? u : Ot(u, l, is, At(e, !1));
}
function fn(n, e, t, s) {
  const { implicitKey: i, inFlow: r } = e, o = typeof n.value == "string" ? n : Object.assign({}, n, { value: String(n.value) });
  let { type: a } = n;
  a !== C.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (a = C.QUOTE_DOUBLE);
  const l = (f) => {
    switch (f) {
      case C.BLOCK_FOLDED:
      case C.BLOCK_LITERAL:
        return i || r ? De(o.value, e) : kt(o, e, t, s);
      case C.QUOTE_DOUBLE:
        return nt(o.value, e);
      case C.QUOTE_SINGLE:
        return Zt(o.value, e);
      case C.PLAIN:
        return vi(o, e, t, s);
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
function rs(n, e) {
  const t = Object.assign({
    blockQuote: !0,
    commentString: ki,
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
function Si(n, e) {
  if (e.tag) {
    const i = n.filter((r) => r.tag === e.tag);
    if (i.length > 0)
      return i.find((r) => r.format === e.format) ?? i[0];
  }
  let t, s;
  if (F(e)) {
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
function Ei(n, e, { anchors: t, doc: s }) {
  if (!s.directives)
    return "";
  const i = [], r = (F(n) || V(n)) && n.anchor;
  r && Xn(r) && (t.add(r), i.push(`&${r}`));
  const o = n.tag ?? (e.default ? null : e.tag);
  return o && i.push(s.directives.tagString(o)), i.join(" ");
}
function Re(n, e, t, s) {
  if (H(n))
    return n.toString(e, t, s);
  if (Ue(n)) {
    if (e.doc.directives)
      return n.toString(e);
    if (e.resolvedAliases?.has(n))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    e.resolvedAliases ? e.resolvedAliases.add(n) : e.resolvedAliases = /* @__PURE__ */ new Set([n]), n = n.resolve(e.doc);
  }
  let i;
  const r = U(n) ? n : e.doc.createNode(n, { onTagObj: (l) => i = l });
  i ?? (i = Si(e.doc.schema.tags, r));
  const o = Ei(r, i, e);
  o.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + o.length + 1);
  const a = typeof i.stringify == "function" ? i.stringify(r, e, t, s) : F(r) ? fn(r, e, t, s) : r.toString(e, t, s);
  return o ? F(r) || a[0] === "{" || a[0] === "[" ? `${o} ${a}` : `${o}
${e.indent}${a}` : a;
}
function Li({ key: n, value: e }, t, s, i) {
  const { allNullValues: r, doc: o, indent: a, indentStep: l, options: { commentString: c, indentSeq: f, simpleKeys: u } } = t;
  let d = U(n) && n.comment || null;
  if (u) {
    if (d)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (V(n) || !U(n) && typeof n == "object") {
      const T = "With simple keys, collection cannot be used as a key value";
      throw new Error(T);
    }
  }
  let p = !u && (!n || d && e == null && !t.inFlow || V(n) || (F(n) ? n.type === C.BLOCK_FOLDED || n.type === C.BLOCK_LITERAL : typeof n == "object"));
  t = Object.assign({}, t, {
    allNullValues: !1,
    implicitKey: !p && (u || !r),
    indent: a + l
  });
  let m = !1, h = !1, g = Re(n, t, () => m = !0, () => h = !0);
  if (!p && !t.inFlow && g.length > 1024) {
    if (u)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    p = !0;
  }
  if (t.inFlow) {
    if (r || e == null)
      return m && s && s(), g === "" ? "?" : p ? `? ${g}` : g;
  } else if (r && !u || e == null && p)
    return g = `? ${g}`, d && !m ? g += Me(g, t.indent, c(d)) : h && i && i(), g;
  m && (d = null), p ? (d && (g += Me(g, t.indent, c(d))), g = `? ${g}
${a}:`) : (g = `${g}:`, d && (g += Me(g, t.indent, c(d))));
  let w, v, b;
  U(e) ? (w = !!e.spaceBefore, v = e.commentBefore, b = e.comment) : (w = !1, v = null, b = null, e && typeof e == "object" && (e = o.createNode(e))), t.implicitKey = !1, !p && !d && F(e) && (t.indentAtStart = g.length + 1), h = !1, !f && l.length >= 2 && !t.inFlow && !p && lt(e) && !e.flow && !e.tag && !e.anchor && (t.indent = t.indent.substring(2));
  let $ = !1;
  const E = Re(e, t, () => $ = !0, () => h = !0);
  let x = " ";
  if (d || w || v) {
    if (x = w ? `
` : "", v) {
      const T = c(v);
      x += `
${me(T, t.indent)}`;
    }
    E === "" && !t.inFlow ? x === `
` && b && (x = `

`) : x += `
${t.indent}`;
  } else if (!p && V(e)) {
    const T = E[0], L = E.indexOf(`
`), B = L !== -1, G = t.inFlow ?? e.flow ?? e.items.length === 0;
    if (B || !G) {
      let K = !1;
      if (B && (T === "&" || T === "!")) {
        let Q = E.indexOf(" ");
        T === "&" && Q !== -1 && Q < L && E[Q + 1] === "!" && (Q = E.indexOf(" ", Q + 1)), (Q === -1 || L < Q) && (K = !0);
      }
      K || (x = `
${t.indent}`);
    }
  } else (E === "" || E[0] === `
`) && (x = "");
  return g += x + E, t.inFlow ? $ && s && s() : b && !$ ? g += Me(g, t.indent, c(b)) : h && i && i(), g;
}
function xi(n, e) {
  (n === "debug" || n === "warn") && console.warn(e);
}
const dt = "<<", ye = {
  identify: (n) => n === dt || typeof n == "symbol" && n.description === dt,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new C(Symbol(dt)), {
    addToJSMap: os
  }),
  stringify: () => dt
}, Ni = (n, e) => (ye.identify(e) || F(e) && (!e.type || e.type === C.PLAIN) && ye.identify(e.value)) && n?.doc.schema.tags.some((t) => t.tag === ye.tag && t.default);
function os(n, e, t) {
  const s = as(n, t);
  if (lt(s))
    for (const i of s.items)
      Kt(n, e, i);
  else if (Array.isArray(s))
    for (const i of s)
      Kt(n, e, i);
  else
    Kt(n, e, s);
}
function Kt(n, e, t) {
  const s = as(n, t);
  if (!ct(s))
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
function as(n, e) {
  return n && Ue(e) ? e.resolve(n.doc, n) : e;
}
function cs(n, e, { key: t, value: s }) {
  if (U(t) && t.addToJSMap)
    t.addToJSMap(n, e, s);
  else if (Ni(n, t))
    os(n, e, s);
  else {
    const i = oe(t, "", n);
    if (e instanceof Map)
      e.set(i, oe(s, i, n));
    else if (e instanceof Set)
      e.add(i);
    else {
      const r = Oi(t, i, n), o = oe(s, r, n);
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
function Oi(n, e, t) {
  if (e === null)
    return "";
  if (typeof e != "object")
    return String(e);
  if (U(n) && t?.doc) {
    const s = rs(t.doc, {});
    s.anchors = /* @__PURE__ */ new Set();
    for (const r of t.anchors.keys())
      s.anchors.add(r.anchor);
    s.inFlow = !0, s.inStringifyKey = !0;
    const i = n.toString(s);
    if (!t.mapKeyWarned) {
      let r = JSON.stringify(i);
      r.length > 40 && (r = r.substring(0, 36) + '..."'), xi(t.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`), t.mapKeyWarned = !0;
    }
    return i;
  }
  return JSON.stringify(e);
}
function un(n, e, t) {
  const s = it(n, void 0, t), i = it(e, void 0, t);
  return new ee(s, i);
}
class ee {
  constructor(e, t = null) {
    Object.defineProperty(this, ae, { value: Jn }), this.key = e, this.value = t;
  }
  clone(e) {
    let { key: t, value: s } = this;
    return U(t) && (t = t.clone(e)), U(s) && (s = s.clone(e)), new ee(t, s);
  }
  toJSON(e, t) {
    const s = t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return cs(t, s, this);
  }
  toString(e, t, s) {
    return e?.doc ? Li(this, e, t, s) : JSON.stringify(this);
  }
}
function ls(n, e, t) {
  return (e.inFlow ?? n.flow ? Mi : Ai)(n, e, t);
}
function Ai({ comment: n, items: e }, t, { blockItemPrefix: s, flowChars: i, itemIndent: r, onChompKeep: o, onComment: a }) {
  const { indent: l, options: { commentString: c } } = t, f = Object.assign({}, t, { indent: r, type: null });
  let u = !1;
  const d = [];
  for (let m = 0; m < e.length; ++m) {
    const h = e[m];
    let g = null;
    if (U(h))
      !u && h.spaceBefore && d.push(""), Et(t, d, h.commentBefore, u), h.comment && (g = h.comment);
    else if (H(h)) {
      const v = U(h.key) ? h.key : null;
      v && (!u && v.spaceBefore && d.push(""), Et(t, d, v.commentBefore, u));
    }
    u = !1;
    let w = Re(h, f, () => g = null, () => u = !0);
    g && (w += Me(w, r, c(g))), u && g && (u = !1), d.push(s + w);
  }
  let p;
  if (d.length === 0)
    p = i.start + i.end;
  else {
    p = d[0];
    for (let m = 1; m < d.length; ++m) {
      const h = d[m];
      p += h ? `
${l}${h}` : `
`;
    }
  }
  return n ? (p += `
` + me(c(n), l), a && a()) : u && o && o(), p;
}
function Mi({ items: n }, e, { flowChars: t, itemIndent: s }) {
  const { indent: i, indentStep: r, flowCollectionPadding: o, options: { commentString: a } } = e;
  s += r;
  const l = Object.assign({}, e, {
    indent: s,
    inFlow: !0,
    type: null
  });
  let c = !1, f = 0;
  const u = [];
  for (let m = 0; m < n.length; ++m) {
    const h = n[m];
    let g = null;
    if (U(h))
      h.spaceBefore && u.push(""), Et(e, u, h.commentBefore, !1), h.comment && (g = h.comment);
    else if (H(h)) {
      const v = U(h.key) ? h.key : null;
      v && (v.spaceBefore && u.push(""), Et(e, u, v.commentBefore, !1), v.comment && (c = !0));
      const b = U(h.value) ? h.value : null;
      b ? (b.comment && (g = b.comment), b.commentBefore && (c = !0)) : h.value == null && v?.comment && (g = v.comment);
    }
    g && (c = !0);
    let w = Re(h, l, () => g = null);
    c || (c = u.length > f || w.includes(`
`)), m < n.length - 1 ? w += "," : e.options.trailingComma && (e.options.lineWidth > 0 && (c || (c = u.reduce((v, b) => v + b.length + 2, 2) + (w.length + 2) > e.options.lineWidth)), c && (w += ",")), g && (w += Me(w, s, a(g))), u.push(w), f = u.length;
  }
  const { start: d, end: p } = t;
  if (u.length === 0)
    return d + p;
  if (!c) {
    const m = u.reduce((h, g) => h + g.length + 2, 2);
    c = e.options.lineWidth > 0 && m > e.options.lineWidth;
  }
  if (c) {
    let m = d;
    for (const h of u)
      m += h ? `
${r}${i}${h}` : `
`;
    return `${m}
${i}${p}`;
  } else
    return `${d}${o}${u.join(" ")}${o}${p}`;
}
function Et({ indent: n, options: { commentString: e } }, t, s, i) {
  if (s && i && (s = s.replace(/^\n+/, "")), s) {
    const r = me(e(s), n);
    t.push(r.trimStart());
  }
}
function Te(n, e) {
  const t = F(e) ? e.value : e;
  for (const s of n)
    if (H(s) && (s.key === e || s.key === t || F(s.key) && s.key.value === t))
      return s;
}
class re extends ss {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(e) {
    super($e, e), this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(e, t, s) {
    const { keepUndefined: i, replacer: r } = s, o = new this(e), a = (l, c) => {
      if (typeof r == "function")
        c = r.call(t, l, c);
      else if (Array.isArray(r) && !r.includes(l))
        return;
      (c !== void 0 || i) && o.items.push(un(l, c, s));
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
    let s;
    H(e) ? s = e : !e || typeof e != "object" || !("key" in e) ? s = new ee(e, e?.value) : s = new ee(e.key, e.value);
    const i = Te(this.items, s.key), r = this.schema?.sortMapEntries;
    if (i) {
      if (!t)
        throw new Error(`Key ${s.key} already set`);
      F(i.value) && ns(s.value) ? i.value.value = s.value : i.value = s.value;
    } else if (r) {
      const o = this.items.findIndex((a) => r(s, a) < 0);
      o === -1 ? this.items.push(s) : this.items.splice(o, 0, s);
    } else
      this.items.push(s);
  }
  delete(e) {
    const t = Te(this.items, e);
    return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
  }
  get(e, t) {
    const i = Te(this.items, e)?.value;
    return (!t && F(i) ? i.value : i) ?? void 0;
  }
  has(e) {
    return !!Te(this.items, e);
  }
  set(e, t) {
    this.add(new ee(e, t), !0);
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
      cs(t, i, r);
    return i;
  }
  toString(e, t, s) {
    if (!e)
      return JSON.stringify(this);
    for (const i of this.items)
      if (!H(i))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);
    return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), ls(this, e, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: e.indent || "",
      onChompKeep: s,
      onComment: t
    });
  }
}
const Ge = {
  collection: "map",
  default: !0,
  nodeClass: re,
  tag: "tag:yaml.org,2002:map",
  resolve(n, e) {
    return ct(n) || e("Expected a mapping for this tag"), n;
  },
  createNode: (n, e, t) => re.from(n, e, t)
};
class Ie extends ss {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(e) {
    super(Ve, e), this.items = [];
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
    const t = pt(e);
    return typeof t != "number" ? !1 : this.items.splice(t, 1).length > 0;
  }
  get(e, t) {
    const s = pt(e);
    if (typeof s != "number")
      return;
    const i = this.items[s];
    return !t && F(i) ? i.value : i;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(e) {
    const t = pt(e);
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
    const s = pt(e);
    if (typeof s != "number")
      throw new Error(`Expected a valid index, not ${e}.`);
    const i = this.items[s];
    F(i) && ns(t) ? i.value = t : this.items[s] = t;
  }
  toJSON(e, t) {
    const s = [];
    t?.onCreate && t.onCreate(s);
    let i = 0;
    for (const r of this.items)
      s.push(oe(r, String(i++), t));
    return s;
  }
  toString(e, t, s) {
    return e ? ls(this, e, {
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
          const l = t instanceof Set ? a : String(o++);
          a = i.call(t, l, a);
        }
        r.items.push(it(a, void 0, s));
      }
    }
    return r;
  }
}
function pt(n) {
  let e = F(n) ? n.value : n;
  return e && typeof e == "string" && (e = Number(e)), typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
const ze = {
  collection: "seq",
  default: !0,
  nodeClass: Ie,
  tag: "tag:yaml.org,2002:seq",
  resolve(n, e) {
    return lt(n) || e("Expected a sequence for this tag"), n;
  },
  createNode: (n, e, t) => Ie.from(n, e, t)
}, Tt = {
  identify: (n) => typeof n == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (n) => n,
  stringify(n, e, t, s) {
    return e = Object.assign({ actualString: !0 }, e), fn(n, e, t, s);
  }
}, Ct = {
  identify: (n) => n == null,
  createNode: () => new C(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new C(null),
  stringify: ({ source: n }, e) => typeof n == "string" && Ct.test.test(n) ? n : e.options.nullStr
}, hn = {
  identify: (n) => typeof n == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (n) => new C(n[0] === "t" || n[0] === "T"),
  stringify({ source: n, value: e }, t) {
    if (n && hn.test.test(n)) {
      const s = n[0] === "t" || n[0] === "T";
      if (e === s)
        return n;
    }
    return e ? t.options.trueStr : t.options.falseStr;
  }
};
function fe({ format: n, minFractionDigits: e, tag: t, value: s }) {
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
const fs = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (n) => n.slice(-3).toLowerCase() === "nan" ? NaN : n[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: fe
}, us = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (n) => parseFloat(n),
  stringify(n) {
    const e = Number(n.value);
    return isFinite(e) ? e.toExponential() : fe(n);
  }
}, hs = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(n) {
    const e = new C(parseFloat(n)), t = n.indexOf(".");
    return t !== -1 && n[n.length - 1] === "0" && (e.minFractionDigits = n.length - t - 1), e;
  },
  stringify: fe
}, It = (n) => typeof n == "bigint" || Number.isInteger(n), dn = (n, e, t, { intAsBigInt: s }) => s ? BigInt(n) : parseInt(n.substring(e), t);
function ds(n, e, t) {
  const { value: s } = n;
  return It(s) && s >= 0 ? t + s.toString(e) : fe(n);
}
const ps = {
  identify: (n) => It(n) && n >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (n, e, t) => dn(n, 2, 8, t),
  stringify: (n) => ds(n, 8, "0o")
}, ms = {
  identify: It,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (n, e, t) => dn(n, 0, 10, t),
  stringify: fe
}, gs = {
  identify: (n) => It(n) && n >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (n, e, t) => dn(n, 2, 16, t),
  stringify: (n) => ds(n, 16, "0x")
}, Ti = [
  Ge,
  ze,
  Tt,
  Ct,
  hn,
  ps,
  ms,
  gs,
  fs,
  us,
  hs
];
function On(n) {
  return typeof n == "bigint" || Number.isInteger(n);
}
const mt = ({ value: n }) => JSON.stringify(n), Ci = [
  {
    identify: (n) => typeof n == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (n) => n,
    stringify: mt
  },
  {
    identify: (n) => n == null,
    createNode: () => new C(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: mt
  },
  {
    identify: (n) => typeof n == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (n) => n === "true",
    stringify: mt
  },
  {
    identify: On,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (n, e, { intAsBigInt: t }) => t ? BigInt(n) : parseInt(n, 10),
    stringify: ({ value: n }) => On(n) ? n.toString() : JSON.stringify(n)
  },
  {
    identify: (n) => typeof n == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (n) => parseFloat(n),
    stringify: mt
  }
], Ii = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(n, e) {
    return e(`Unresolved plain scalar ${JSON.stringify(n)}`), n;
  }
}, ji = [Ge, ze].concat(Ci, Ii), pn = {
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
      let l = "";
      for (let c = 0; c < o.length; ++c)
        l += String.fromCharCode(o[c]);
      a = btoa(l);
    } else
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (e ?? (e = C.BLOCK_LITERAL), e !== C.QUOTE_DOUBLE) {
      const l = Math.max(s.options.lineWidth - s.indent.length, s.options.minContentWidth), c = Math.ceil(a.length / l), f = new Array(c);
      for (let u = 0, d = 0; u < c; ++u, d += l)
        f[u] = a.substr(d, l);
      a = f.join(e === C.BLOCK_LITERAL ? `
` : " ");
    }
    return fn({ comment: n, type: e, value: a }, s, i, r);
  }
};
function ys(n, e) {
  if (lt(n))
    for (let t = 0; t < n.items.length; ++t) {
      let s = n.items[t];
      if (!H(s)) {
        if (ct(s)) {
          s.items.length > 1 && e("Each pair must have its own sequence indicator");
          const i = s.items[0] || new ee(new C(null));
          if (s.commentBefore && (i.key.commentBefore = i.key.commentBefore ? `${s.commentBefore}
${i.key.commentBefore}` : s.commentBefore), s.comment) {
            const r = i.value ?? i.key;
            r.comment = r.comment ? `${s.comment}
${r.comment}` : s.comment;
          }
          s = i;
        }
        n.items[t] = H(s) ? s : new ee(s);
      }
    }
  else
    e("Expected a sequence for this tag");
  return n;
}
function ws(n, e, t) {
  const { replacer: s } = t, i = new Ie(n);
  i.tag = "tag:yaml.org,2002:pairs";
  let r = 0;
  if (e && Symbol.iterator in Object(e))
    for (let o of e) {
      typeof s == "function" && (o = s.call(e, String(r++), o));
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
      i.items.push(un(a, l, t));
    }
  return i;
}
const mn = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: ys,
  createNode: ws
};
class Fe extends Ie {
  constructor() {
    super(), this.add = re.prototype.add.bind(this), this.delete = re.prototype.delete.bind(this), this.get = re.prototype.get.bind(this), this.has = re.prototype.has.bind(this), this.set = re.prototype.set.bind(this), this.tag = Fe.tag;
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
      if (H(i) ? (r = oe(i.key, "", t), o = oe(i.value, r, t)) : r = oe(i, "", t), s.has(r))
        throw new Error("Ordered maps must not include duplicate keys");
      s.set(r, o);
    }
    return s;
  }
  static from(e, t, s) {
    const i = ws(e, t, s), r = new this();
    return r.items = i.items, r;
  }
}
Fe.tag = "tag:yaml.org,2002:omap";
const gn = {
  collection: "seq",
  identify: (n) => n instanceof Map,
  nodeClass: Fe,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(n, e) {
    const t = ys(n, e), s = [];
    for (const { key: i } of t.items)
      F(i) && (s.includes(i.value) ? e(`Ordered maps must not include duplicate keys: ${i.value}`) : s.push(i.value));
    return Object.assign(new Fe(), t);
  },
  createNode: (n, e, t) => Fe.from(n, e, t)
};
function bs({ value: n, source: e }, t) {
  return e && (n ? ks : $s).test.test(e) ? e : n ? t.options.trueStr : t.options.falseStr;
}
const ks = {
  identify: (n) => n === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new C(!0),
  stringify: bs
}, $s = {
  identify: (n) => n === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new C(!1),
  stringify: bs
}, Pi = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (n) => n.slice(-3).toLowerCase() === "nan" ? NaN : n[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: fe
}, Bi = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (n) => parseFloat(n.replace(/_/g, "")),
  stringify(n) {
    const e = Number(n.value);
    return isFinite(e) ? e.toExponential() : fe(n);
  }
}, _i = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(n) {
    const e = new C(parseFloat(n.replace(/_/g, ""))), t = n.indexOf(".");
    if (t !== -1) {
      const s = n.substring(t + 1).replace(/_/g, "");
      s[s.length - 1] === "0" && (e.minFractionDigits = s.length);
    }
    return e;
  },
  stringify: fe
}, ft = (n) => typeof n == "bigint" || Number.isInteger(n);
function jt(n, e, t, { intAsBigInt: s }) {
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
function yn(n, e, t) {
  const { value: s } = n;
  if (ft(s)) {
    const i = s.toString(e);
    return s < 0 ? "-" + t + i.substr(1) : t + i;
  }
  return fe(n);
}
const Qi = {
  identify: ft,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (n, e, t) => jt(n, 2, 2, t),
  stringify: (n) => yn(n, 2, "0b")
}, Di = {
  identify: ft,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (n, e, t) => jt(n, 1, 8, t),
  stringify: (n) => yn(n, 8, "0")
}, Fi = {
  identify: ft,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (n, e, t) => jt(n, 0, 10, t),
  stringify: fe
}, Ki = {
  identify: ft,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (n, e, t) => jt(n, 2, 16, t),
  stringify: (n) => yn(n, 16, "0x")
};
class Ke extends re {
  constructor(e) {
    super(e), this.tag = Ke.tag;
  }
  add(e) {
    let t;
    H(e) ? t = e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? t = new ee(e.key, null) : t = new ee(e, null), Te(this.items, t.key) || this.items.push(t);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(e, t) {
    const s = Te(this.items, e);
    return !t && H(s) ? F(s.key) ? s.key.value : s.key : s;
  }
  set(e, t) {
    if (typeof t != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
    const s = Te(this.items, e);
    s && !t ? this.items.splice(this.items.indexOf(s), 1) : !s && t && this.items.push(new ee(e));
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
        typeof i == "function" && (o = i.call(t, o, o)), r.items.push(un(o, null, s));
    return r;
  }
}
Ke.tag = "tag:yaml.org,2002:set";
const wn = {
  collection: "map",
  identify: (n) => n instanceof Set,
  nodeClass: Ke,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (n, e, t) => Ke.from(n, e, t),
  resolve(n, e) {
    if (ct(n)) {
      if (n.hasAllNullValues(!0))
        return Object.assign(new Ke(), n);
      e("Set items must all have null values");
    } else
      e("Expected a mapping for this tag");
    return n;
  }
};
function bn(n, e) {
  const t = n[0], s = t === "-" || t === "+" ? n.substring(1) : n, i = (o) => e ? BigInt(o) : Number(o), r = s.replace(/_/g, "").split(":").reduce((o, a) => o * i(60) + i(a), i(0));
  return t === "-" ? i(-1) * r : r;
}
function vs(n) {
  let { value: e } = n, t = (o) => o;
  if (typeof e == "bigint")
    t = (o) => BigInt(o);
  else if (isNaN(e) || !isFinite(e))
    return fe(n);
  let s = "";
  e < 0 && (s = "-", e *= t(-1));
  const i = t(60), r = [e % i];
  return e < 60 ? r.unshift(0) : (e = (e - r[0]) / i, r.unshift(e % i), e >= 60 && (e = (e - r[0]) / i, r.unshift(e))), s + r.map((o) => String(o).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const Ss = {
  identify: (n) => typeof n == "bigint" || Number.isInteger(n),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (n, e, { intAsBigInt: t }) => bn(n, t),
  stringify: vs
}, Es = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (n) => bn(n, !1),
  stringify: vs
}, Pt = {
  identify: (n) => n instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(n) {
    const e = n.match(Pt.test);
    if (!e)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, t, s, i, r, o, a] = e.map(Number), l = e[7] ? Number((e[7] + "00").substr(1, 3)) : 0;
    let c = Date.UTC(t, s - 1, i, r || 0, o || 0, a || 0, l);
    const f = e[8];
    if (f && f !== "Z") {
      let u = bn(f, !1);
      Math.abs(u) < 30 && (u *= 60), c -= 6e4 * u;
    }
    return new Date(c);
  },
  stringify: ({ value: n }) => n?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, An = [
  Ge,
  ze,
  Tt,
  Ct,
  ks,
  $s,
  Qi,
  Di,
  Fi,
  Ki,
  Pi,
  Bi,
  _i,
  pn,
  ye,
  gn,
  mn,
  wn,
  Ss,
  Es,
  Pt
], Mn = /* @__PURE__ */ new Map([
  ["core", Ti],
  ["failsafe", [Ge, ze, Tt]],
  ["json", ji],
  ["yaml11", An],
  ["yaml-1.1", An]
]), Tn = {
  binary: pn,
  bool: hn,
  float: hs,
  floatExp: us,
  floatNaN: fs,
  floatTime: Es,
  int: ms,
  intHex: gs,
  intOct: ps,
  intTime: Ss,
  map: Ge,
  merge: ye,
  null: Ct,
  omap: gn,
  pairs: mn,
  seq: ze,
  set: wn,
  timestamp: Pt
}, Ri = {
  "tag:yaml.org,2002:binary": pn,
  "tag:yaml.org,2002:merge": ye,
  "tag:yaml.org,2002:omap": gn,
  "tag:yaml.org,2002:pairs": mn,
  "tag:yaml.org,2002:set": wn,
  "tag:yaml.org,2002:timestamp": Pt
};
function Rt(n, e, t) {
  const s = Mn.get(e);
  if (s && !n)
    return t && !s.includes(ye) ? s.concat(ye) : s.slice();
  let i = s;
  if (!i)
    if (Array.isArray(n))
      i = [];
    else {
      const r = Array.from(Mn.keys()).filter((o) => o !== "yaml11").map((o) => JSON.stringify(o)).join(", ");
      throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`);
    }
  if (Array.isArray(n))
    for (const r of n)
      i = i.concat(r);
  else typeof n == "function" && (i = n(i.slice()));
  return t && (i = i.concat(ye)), i.reduce((r, o) => {
    const a = typeof o == "string" ? Tn[o] : o;
    if (!a) {
      const l = JSON.stringify(o), c = Object.keys(Tn).map((f) => JSON.stringify(f)).join(", ");
      throw new Error(`Unknown custom tag ${l}; use one of ${c}`);
    }
    return r.includes(a) || r.push(a), r;
  }, []);
}
const qi = (n, e) => n.key < e.key ? -1 : n.key > e.key ? 1 : 0;
class kn {
  constructor({ compat: e, customTags: t, merge: s, resolveKnownTags: i, schema: r, sortMapEntries: o, toStringDefaults: a }) {
    this.compat = Array.isArray(e) ? Rt(e, "compat") : e ? Rt(null, e) : null, this.name = typeof r == "string" && r || "core", this.knownTags = i ? Ri : {}, this.tags = Rt(t, this.name, s), this.toStringOptions = a ?? null, Object.defineProperty(this, $e, { value: Ge }), Object.defineProperty(this, he, { value: Tt }), Object.defineProperty(this, Ve, { value: ze }), this.sortMapEntries = typeof o == "function" ? o : o === !0 ? qi : null;
  }
  clone() {
    const e = Object.create(kn.prototype, Object.getOwnPropertyDescriptors(this));
    return e.tags = this.tags.slice(), e;
  }
}
function Vi(n, e) {
  const t = [];
  let s = e.directives === !0;
  if (e.directives !== !1 && n.directives) {
    const l = n.directives.toString(n);
    l ? (t.push(l), s = !0) : n.directives.docStart && (s = !0);
  }
  s && t.push("---");
  const i = rs(n, e), { commentString: r } = i.options;
  if (n.commentBefore) {
    t.length !== 1 && t.unshift("");
    const l = r(n.commentBefore);
    t.unshift(me(l, ""));
  }
  let o = !1, a = null;
  if (n.contents) {
    if (U(n.contents)) {
      if (n.contents.spaceBefore && s && t.push(""), n.contents.commentBefore) {
        const f = r(n.contents.commentBefore);
        t.push(me(f, ""));
      }
      i.forceBlockIndent = !!n.comment, a = n.contents.comment;
    }
    const l = a ? void 0 : () => o = !0;
    let c = Re(n.contents, i, () => a = null, l);
    a && (c += Me(c, "", r(a))), (c[0] === "|" || c[0] === ">") && t[t.length - 1] === "---" ? t[t.length - 1] = `--- ${c}` : t.push(c);
  } else
    t.push(Re(n.contents, i));
  if (n.directives?.docEnd)
    if (n.comment) {
      const l = r(n.comment);
      l.includes(`
`) ? (t.push("..."), t.push(me(l, ""))) : t.push(`... ${l}`);
    } else
      t.push("...");
  else {
    let l = n.comment;
    l && o && (l = l.replace(/^\n+/, "")), l && ((!o || a) && t[t.length - 1] !== "" && t.push(""), t.push(me(r(l), "")));
  }
  return t.join(`
`) + `
`;
}
class Bt {
  constructor(e, t, s) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, ae, { value: Wt });
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
    s?._directives ? (this.directives = s._directives.atDocument(), this.directives.yaml.explicit && (o = this.directives.yaml.version)) : this.directives = new X({ version: o }), this.setSchema(o, s), this.contents = e === void 0 ? null : this.createNode(e, i, s);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const e = Object.create(Bt.prototype, {
      [ae]: { value: Wt }
    });
    return e.commentBefore = this.commentBefore, e.comment = this.comment, e.errors = this.errors.slice(), e.warnings = this.warnings.slice(), e.options = Object.assign({}, this.options), this.directives && (e.directives = this.directives.clone()), e.schema = this.schema.clone(), e.contents = U(this.contents) ? this.contents.clone(e.schema) : this.contents, this.range && (e.range = this.range.slice()), e;
  }
  /** Adds a value to the document. */
  add(e) {
    je(this.contents) && this.contents.add(e);
  }
  /** Adds a value to the document. */
  addIn(e, t) {
    je(this.contents) && this.contents.addIn(e, t);
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
      const s = es(this);
      e.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !t || s.has(t) ? ts(t || "a", s) : t;
    }
    return new ln(e.anchor);
  }
  createNode(e, t, s) {
    let i;
    if (typeof t == "function")
      e = t.call({ "": e }, "", e), i = t;
    else if (Array.isArray(t)) {
      const g = (v) => typeof v == "number" || v instanceof String || v instanceof Number, w = t.filter(g).map(String);
      w.length > 0 && (t = t.concat(w)), i = t;
    } else s === void 0 && t && (s = t, t = void 0);
    const { aliasDuplicateObjects: r, anchorPrefix: o, flow: a, keepUndefined: l, onTagObj: c, tag: f } = s ?? {}, { onAnchor: u, setAnchors: d, sourceObjects: p } = yi(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      o || "a"
    ), m = {
      aliasDuplicateObjects: r ?? !0,
      keepUndefined: l ?? !1,
      onAnchor: u,
      onTagObj: c,
      replacer: i,
      schema: this.schema,
      sourceObjects: p
    }, h = it(e, f, m);
    return a && V(h) && (h.flow = !0), d(), h;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(e, t, s = {}) {
    const i = this.createNode(e, null, s), r = this.createNode(t, null, s);
    return new ee(i, r);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    return je(this.contents) ? this.contents.delete(e) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    return Xe(e) ? this.contents == null ? !1 : (this.contents = null, !0) : je(this.contents) ? this.contents.deleteIn(e) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(e, t) {
    return V(this.contents) ? this.contents.get(e, t) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    return Xe(e) ? !t && F(this.contents) ? this.contents.value : this.contents : V(this.contents) ? this.contents.getIn(e, t) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(e) {
    return V(this.contents) ? this.contents.has(e) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(e) {
    return Xe(e) ? this.contents !== void 0 : V(this.contents) ? this.contents.hasIn(e) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(e, t) {
    this.contents == null ? this.contents = St(this.schema, [e], t) : je(this.contents) && this.contents.set(e, t);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    Xe(e) ? this.contents = t : this.contents == null ? this.contents = St(this.schema, Array.from(e), t) : je(this.contents) && this.contents.setIn(e, t);
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
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new X({ version: "1.1" }), s = { resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = e : this.directives = new X({ version: e }), s = { resolveKnownTags: !0, schema: "core" };
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
      this.schema = new kn(Object.assign(s, t));
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
    }, l = oe(this.contents, t ?? "", a);
    if (typeof r == "function")
      for (const { count: c, res: f } of a.anchors.values())
        r(f, c);
    return typeof o == "function" ? Qe(o, { "": l }, "", l) : l;
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
    return Vi(this, e);
  }
}
function je(n) {
  if (V(n))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class Ls extends Error {
  constructor(e, t, s, i) {
    super(), this.name = e, this.code = s, this.message = i, this.pos = t;
  }
}
class et extends Ls {
  constructor(e, t, s) {
    super("YAMLParseError", e, t, s);
  }
}
class Ui extends Ls {
  constructor(e, t, s) {
    super("YAMLWarning", e, t, s);
  }
}
const Cn = (n, e) => (t) => {
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
    const l = t.linePos[1];
    l?.line === s && l.col > i && (a = Math.max(1, Math.min(l.col - i, 80 - r)));
    const c = " ".repeat(r) + "^".repeat(a);
    t.message += `:

${o}
${c}
`;
  }
};
function qe(n, { flow: e, indicator: t, next: s, offset: i, onError: r, parentIndent: o, startOnNewline: a }) {
  let l = !1, c = a, f = a, u = "", d = "", p = !1, m = !1, h = null, g = null, w = null, v = null, b = null, $ = null, E = null;
  for (const L of n)
    switch (m && (L.type !== "space" && L.type !== "newline" && L.type !== "comma" && r(L.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), m = !1), h && (c && L.type !== "comment" && L.type !== "newline" && r(h, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), h = null), L.type) {
      case "space":
        !e && (t !== "doc-start" || s?.type !== "flow-collection") && L.source.includes("	") && (h = L), f = !0;
        break;
      case "comment": {
        f || r(L, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const B = L.source.substring(1) || " ";
        u ? u += d + B : u = B, d = "", c = !1;
        break;
      }
      case "newline":
        c ? u ? u += L.source : (!$ || t !== "seq-item-ind") && (l = !0) : d += L.source, c = !0, p = !0, (g || w) && (v = L), f = !0;
        break;
      case "anchor":
        g && r(L, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), L.source.endsWith(":") && r(L.offset + L.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), g = L, E ?? (E = L.offset), c = !1, f = !1, m = !0;
        break;
      case "tag": {
        w && r(L, "MULTIPLE_TAGS", "A node can have at most one tag"), w = L, E ?? (E = L.offset), c = !1, f = !1, m = !0;
        break;
      }
      case t:
        (g || w) && r(L, "BAD_PROP_ORDER", `Anchors and tags must be after the ${L.source} indicator`), $ && r(L, "UNEXPECTED_TOKEN", `Unexpected ${L.source} in ${e ?? "collection"}`), $ = L, c = t === "seq-item-ind" || t === "explicit-key-ind", f = !1;
        break;
      case "comma":
        if (e) {
          b && r(L, "UNEXPECTED_TOKEN", `Unexpected , in ${e}`), b = L, c = !1, f = !1;
          break;
        }
      // else fallthrough
      default:
        r(L, "UNEXPECTED_TOKEN", `Unexpected ${L.type} token`), c = !1, f = !1;
    }
  const x = n[n.length - 1], T = x ? x.offset + x.source.length : i;
  return m && s && s.type !== "space" && s.type !== "newline" && s.type !== "comma" && (s.type !== "scalar" || s.source !== "") && r(s.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), h && (c && h.indent <= o || s?.type === "block-map" || s?.type === "block-seq") && r(h, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: b,
    found: $,
    spaceBefore: l,
    comment: u,
    hasNewline: p,
    anchor: g,
    tag: w,
    newlineAfterProp: v,
    end: T,
    start: E ?? T
  };
}
function rt(n) {
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
        if (rt(e.key) || rt(e.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function en(n, e, t) {
  if (e?.type === "flow-collection") {
    const s = e.end[0];
    s.indent === n && (s.source === "]" || s.source === "}") && rt(e) && t(s, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function xs(n, e, t) {
  const { uniqueKeys: s } = n.options;
  if (s === !1)
    return !1;
  const i = typeof s == "function" ? s : (r, o) => r === o || F(r) && F(o) && r.value === o.value;
  return e.some((r) => i(r.key, t));
}
const In = "All mapping items must start at the same column";
function Hi({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  const o = r?.nodeClass ?? re, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1);
  let l = s.offset, c = null;
  for (const f of s.items) {
    const { start: u, key: d, sep: p, value: m } = f, h = qe(u, {
      indicator: "explicit-key-ind",
      next: d ?? p?.[0],
      offset: l,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !0
    }), g = !h.found;
    if (g) {
      if (d && (d.type === "block-seq" ? i(l, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in d && d.indent !== s.indent && i(l, "BAD_INDENT", In)), !h.anchor && !h.tag && !p) {
        c = h.end, h.comment && (a.comment ? a.comment += `
` + h.comment : a.comment = h.comment);
        continue;
      }
      (h.newlineAfterProp || rt(d)) && i(d ?? u[u.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else h.found?.indent !== s.indent && i(l, "BAD_INDENT", In);
    t.atKey = !0;
    const w = h.end, v = d ? n(t, d, h, i) : e(t, w, u, null, h, i);
    t.schema.compat && en(s.indent, d, i), t.atKey = !1, xs(t, a.items, v) && i(w, "DUPLICATE_KEY", "Map keys must be unique");
    const b = qe(p ?? [], {
      indicator: "map-value-ind",
      next: m,
      offset: v.range[2],
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !d || d.type === "block-scalar"
    });
    if (l = b.end, b.found) {
      g && (m?.type === "block-map" && !b.hasNewline && i(l, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), t.options.strict && h.start < b.found.offset - 1024 && i(v.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const $ = m ? n(t, m, b, i) : e(t, l, p, null, b, i);
      t.schema.compat && en(s.indent, m, i), l = $.range[2];
      const E = new ee(v, $);
      t.options.keepSourceTokens && (E.srcToken = f), a.items.push(E);
    } else {
      g && i(v.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), b.comment && (v.comment ? v.comment += `
` + b.comment : v.comment = b.comment);
      const $ = new ee(v);
      t.options.keepSourceTokens && ($.srcToken = f), a.items.push($);
    }
  }
  return c && c < l && i(c, "IMPOSSIBLE", "Map comment with trailing content"), a.range = [s.offset, l, c ?? l], a;
}
function Gi({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  const o = r?.nodeClass ?? Ie, a = new o(t.schema);
  t.atRoot && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let l = s.offset, c = null;
  for (const { start: f, value: u } of s.items) {
    const d = qe(f, {
      indicator: "seq-item-ind",
      next: u,
      offset: l,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !0
    });
    if (!d.found)
      if (d.anchor || d.tag || u)
        u?.type === "block-seq" ? i(d.end, "BAD_INDENT", "All sequence items must start at the same column") : i(l, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        c = d.end, d.comment && (a.comment = d.comment);
        continue;
      }
    const p = u ? n(t, u, d, i) : e(t, d.end, f, null, d, i);
    t.schema.compat && en(s.indent, u, i), l = p.range[2], a.items.push(p);
  }
  return a.range = [s.offset, l, c ?? l], a;
}
function ut(n, e, t, s) {
  let i = "";
  if (n) {
    let r = !1, o = "";
    for (const a of n) {
      const { source: l, type: c } = a;
      switch (c) {
        case "space":
          r = !0;
          break;
        case "comment": {
          t && !r && s(a, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const f = l.substring(1) || " ";
          i ? i += o + f : i = f, o = "";
          break;
        }
        case "newline":
          i && (o += l), r = !0;
          break;
        default:
          s(a, "UNEXPECTED_TOKEN", `Unexpected ${c} at node end`);
      }
      e += l.length;
    }
  }
  return { comment: i, offset: e };
}
const qt = "Block collections are not allowed within flow collections", Vt = (n) => n && (n.type === "block-map" || n.type === "block-seq");
function zi({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  const o = s.start.source === "{", a = o ? "flow map" : "flow sequence", l = r?.nodeClass ?? (o ? re : Ie), c = new l(t.schema);
  c.flow = !0;
  const f = t.atRoot;
  f && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let u = s.offset + s.start.source.length;
  for (let g = 0; g < s.items.length; ++g) {
    const w = s.items[g], { start: v, key: b, sep: $, value: E } = w, x = qe(v, {
      flow: a,
      indicator: "explicit-key-ind",
      next: b ?? $?.[0],
      offset: u,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !1
    });
    if (!x.found) {
      if (!x.anchor && !x.tag && !$ && !E) {
        g === 0 && x.comma ? i(x.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`) : g < s.items.length - 1 && i(x.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${a}`), x.comment && (c.comment ? c.comment += `
` + x.comment : c.comment = x.comment), u = x.end;
        continue;
      }
      !o && t.options.strict && rt(b) && i(
        b,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (g === 0)
      x.comma && i(x.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`);
    else if (x.comma || i(x.start, "MISSING_CHAR", `Missing , between ${a} items`), x.comment) {
      let T = "";
      e: for (const L of v)
        switch (L.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            T = L.source.substring(1);
            break e;
          default:
            break e;
        }
      if (T) {
        let L = c.items[c.items.length - 1];
        H(L) && (L = L.value ?? L.key), L.comment ? L.comment += `
` + T : L.comment = T, x.comment = x.comment.substring(T.length + 1);
      }
    }
    if (!o && !$ && !x.found) {
      const T = E ? n(t, E, x, i) : e(t, x.end, $, null, x, i);
      c.items.push(T), u = T.range[2], Vt(E) && i(T.range, "BLOCK_IN_FLOW", qt);
    } else {
      t.atKey = !0;
      const T = x.end, L = b ? n(t, b, x, i) : e(t, T, v, null, x, i);
      Vt(b) && i(L.range, "BLOCK_IN_FLOW", qt), t.atKey = !1;
      const B = qe($ ?? [], {
        flow: a,
        indicator: "map-value-ind",
        next: E,
        offset: L.range[2],
        onError: i,
        parentIndent: s.indent,
        startOnNewline: !1
      });
      if (B.found) {
        if (!o && !x.found && t.options.strict) {
          if ($)
            for (const Q of $) {
              if (Q === B.found)
                break;
              if (Q.type === "newline") {
                i(Q, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          x.start < B.found.offset - 1024 && i(B.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else E && ("source" in E && E.source?.[0] === ":" ? i(E, "MISSING_CHAR", `Missing space after : in ${a}`) : i(B.start, "MISSING_CHAR", `Missing , or : between ${a} items`));
      const G = E ? n(t, E, B, i) : B.found ? e(t, B.end, $, null, B, i) : null;
      G ? Vt(E) && i(G.range, "BLOCK_IN_FLOW", qt) : B.comment && (L.comment ? L.comment += `
` + B.comment : L.comment = B.comment);
      const K = new ee(L, G);
      if (t.options.keepSourceTokens && (K.srcToken = w), o) {
        const Q = c;
        xs(t, Q.items, L) && i(T, "DUPLICATE_KEY", "Map keys must be unique"), Q.items.push(K);
      } else {
        const Q = new re(t.schema);
        Q.flow = !0, Q.items.push(K);
        const k = (G ?? L).range;
        Q.range = [L.range[0], k[1], k[2]], c.items.push(Q);
      }
      u = G ? G.range[2] : B.end;
    }
  }
  const d = o ? "}" : "]", [p, ...m] = s.end;
  let h = u;
  if (p?.source === d)
    h = p.offset + p.source.length;
  else {
    const g = a[0].toUpperCase() + a.substring(1), w = f ? `${g} must end with a ${d}` : `${g} in block collection must be sufficiently indented and end with a ${d}`;
    i(u, f ? "MISSING_CHAR" : "BAD_INDENT", w), p && p.source.length !== 1 && m.unshift(p);
  }
  if (m.length > 0) {
    const g = ut(m, h, t.options.strict, i);
    g.comment && (c.comment ? c.comment += `
` + g.comment : c.comment = g.comment), c.range = [s.offset, h, g.offset];
  } else
    c.range = [s.offset, h, h];
  return c;
}
function Ut(n, e, t, s, i, r) {
  const o = t.type === "block-map" ? Hi(n, e, t, s, r) : t.type === "block-seq" ? Gi(n, e, t, s, r) : zi(n, e, t, s, r), a = o.constructor;
  return i === "!" || i === a.tagName ? (o.tag = a.tagName, o) : (i && (o.tag = i), o);
}
function Yi(n, e, t, s, i) {
  const r = s.tag, o = r ? e.directives.tagName(r.source, (d) => i(r, "TAG_RESOLVE_FAILED", d)) : null;
  if (t.type === "block-seq") {
    const { anchor: d, newlineAfterProp: p } = s, m = d && r ? d.offset > r.offset ? d : r : d ?? r;
    m && (!p || p.offset < m.offset) && i(m, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const a = t.type === "block-map" ? "map" : t.type === "block-seq" ? "seq" : t.start.source === "{" ? "map" : "seq";
  if (!r || !o || o === "!" || o === re.tagName && a === "map" || o === Ie.tagName && a === "seq")
    return Ut(n, e, t, i, o);
  let l = e.schema.tags.find((d) => d.tag === o && d.collection === a);
  if (!l) {
    const d = e.schema.knownTags[o];
    if (d?.collection === a)
      e.schema.tags.push(Object.assign({}, d, { default: !1 })), l = d;
    else
      return d ? i(r, "BAD_COLLECTION_TYPE", `${d.tag} used for ${a} collection, but expects ${d.collection ?? "scalar"}`, !0) : i(r, "TAG_RESOLVE_FAILED", `Unresolved tag: ${o}`, !0), Ut(n, e, t, i, o);
  }
  const c = Ut(n, e, t, i, o, l), f = l.resolve?.(c, (d) => i(r, "TAG_RESOLVE_FAILED", d), e.options) ?? c, u = U(f) ? f : new C(f);
  return u.range = c.range, u.tag = o, l?.format && (u.format = l.format), u;
}
function Wi(n, e, t) {
  const s = e.offset, i = Ji(e, n.options.strict, t);
  if (!i)
    return { value: "", type: null, comment: "", range: [s, s, s] };
  const r = i.mode === ">" ? C.BLOCK_FOLDED : C.BLOCK_LITERAL, o = e.source ? Zi(e.source) : [];
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
    let g = s + i.length;
    return e.source && (g += e.source.length), { value: h, type: r, comment: i.comment, range: [s, g, g] };
  }
  let l = e.indent + i.indent, c = e.offset + i.length, f = 0;
  for (let h = 0; h < a; ++h) {
    const [g, w] = o[h];
    if (w === "" || w === "\r")
      i.indent === 0 && g.length > l && (l = g.length);
    else {
      g.length < l && t(c + g.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), i.indent === 0 && (l = g.length), f = h, l === 0 && !n.atRoot && t(c, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    c += g.length + w.length + 1;
  }
  for (let h = o.length - 1; h >= a; --h)
    o[h][0].length > l && (a = h + 1);
  let u = "", d = "", p = !1;
  for (let h = 0; h < f; ++h)
    u += o[h][0].slice(l) + `
`;
  for (let h = f; h < a; ++h) {
    let [g, w] = o[h];
    c += g.length + w.length + 1;
    const v = w[w.length - 1] === "\r";
    if (v && (w = w.slice(0, -1)), w && g.length < l) {
      const $ = `Block scalar lines must not be less indented than their ${i.indent ? "explicit indentation indicator" : "first line"}`;
      t(c - w.length - (v ? 2 : 1), "BAD_INDENT", $), g = "";
    }
    r === C.BLOCK_LITERAL ? (u += d + g.slice(l) + w, d = `
`) : g.length > l || w[0] === "	" ? (d === " " ? d = `
` : !p && d === `
` && (d = `

`), u += d + g.slice(l) + w, d = `
`, p = !0) : w === "" ? d === `
` ? u += `
` : d = `
` : (u += d + w, d = " ", p = !1);
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
  const m = s + i.length + e.source.length;
  return { value: u, type: r, comment: i.comment, range: [s, m, m] };
}
function Ji({ offset: n, props: e }, t, s) {
  if (e[0].type !== "block-scalar-header")
    return s(e[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: i } = e[0], r = i[0];
  let o = 0, a = "", l = -1;
  for (let d = 1; d < i.length; ++d) {
    const p = i[d];
    if (!a && (p === "-" || p === "+"))
      a = p;
    else {
      const m = Number(p);
      !o && m ? o = m : l === -1 && (l = n + d);
    }
  }
  l !== -1 && s(l, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${i}`);
  let c = !1, f = "", u = i.length;
  for (let d = 1; d < e.length; ++d) {
    const p = e[d];
    switch (p.type) {
      case "space":
        c = !0;
      // fallthrough
      case "newline":
        u += p.source.length;
        break;
      case "comment":
        t && !c && s(p, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), u += p.source.length, f = p.source.substring(1);
        break;
      case "error":
        s(p, "UNEXPECTED_TOKEN", p.message), u += p.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const m = `Unexpected token in block scalar header: ${p.type}`;
        s(p, "UNEXPECTED_TOKEN", m);
        const h = p.source;
        h && typeof h == "string" && (u += h.length);
      }
    }
  }
  return { mode: r, indent: o, chomp: a, comment: f, length: u };
}
function Zi(n) {
  const e = n.split(/\n( *)/), t = e[0], s = t.match(/^( *)/), r = [s?.[1] ? [s[1], t.slice(s[1].length)] : ["", t]];
  for (let o = 1; o < e.length; o += 2)
    r.push([e[o], e[o + 1]]);
  return r;
}
function Xi(n, e, t) {
  const { offset: s, type: i, source: r, end: o } = n;
  let a, l;
  const c = (d, p, m) => t(s + d, p, m);
  switch (i) {
    case "scalar":
      a = C.PLAIN, l = er(r, c);
      break;
    case "single-quoted-scalar":
      a = C.QUOTE_SINGLE, l = tr(r, c);
      break;
    case "double-quoted-scalar":
      a = C.QUOTE_DOUBLE, l = nr(r, c);
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
  const f = s + r.length, u = ut(o, f, e, t);
  return {
    value: l,
    type: a,
    comment: u.comment,
    range: [s, f, u.offset]
  };
}
function er(n, e) {
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
  return t && e(0, "BAD_SCALAR_START", `Plain value cannot start with ${t}`), Ns(n);
}
function tr(n, e) {
  return (n[n.length - 1] !== "'" || n.length === 1) && e(n.length, "MISSING_CHAR", "Missing closing 'quote"), Ns(n.slice(1, -1)).replace(/''/g, "'");
}
function Ns(n) {
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
    const c = t[1].replace(i, "");
    c === "" ? o === `
` ? r += o : o = `
` : (r += o + c, o = " "), a = e.lastIndex;
  }
  const l = /[ \t]*(.*)/sy;
  return l.lastIndex = a, t = l.exec(n), r + o + (t?.[1] ?? "");
}
function nr(n, e) {
  let t = "";
  for (let s = 1; s < n.length - 1; ++s) {
    const i = n[s];
    if (!(i === "\r" && n[s + 1] === `
`))
      if (i === `
`) {
        const { fold: r, offset: o } = sr(n, s);
        t += r, s = o;
      } else if (i === "\\") {
        let r = n[++s];
        const o = ir[r];
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
          t += rr(n, s + 1, a, e), s += a;
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
function sr(n, e) {
  let t = "", s = n[e + 1];
  for (; (s === " " || s === "	" || s === `
` || s === "\r") && !(s === "\r" && n[e + 2] !== `
`); )
    s === `
` && (t += `
`), e += 1, s = n[e + 1];
  return t || (t = " "), { fold: t, offset: e };
}
const ir = {
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
function rr(n, e, t, s) {
  const i = n.substr(e, t), o = i.length === t && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
  try {
    return String.fromCodePoint(o);
  } catch {
    const a = n.substr(e - 2, t + 2);
    return s(e - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${a}`), a;
  }
}
function Os(n, e, t, s) {
  const { value: i, type: r, comment: o, range: a } = e.type === "block-scalar" ? Wi(n, e, s) : Xi(e, n.options.strict, s), l = t ? n.directives.tagName(t.source, (u) => s(t, "TAG_RESOLVE_FAILED", u)) : null;
  let c;
  n.options.stringKeys && n.atKey ? c = n.schema[he] : l ? c = or(n.schema, i, l, t, s) : e.type === "scalar" ? c = ar(n, i, e, s) : c = n.schema[he];
  let f;
  try {
    const u = c.resolve(i, (d) => s(t ?? e, "TAG_RESOLVE_FAILED", d), n.options);
    f = F(u) ? u : new C(u);
  } catch (u) {
    const d = u instanceof Error ? u.message : String(u);
    s(t ?? e, "TAG_RESOLVE_FAILED", d), f = new C(i);
  }
  return f.range = a, f.source = i, r && (f.type = r), l && (f.tag = l), c.format && (f.format = c.format), o && (f.comment = o), f;
}
function or(n, e, t, s, i) {
  if (t === "!")
    return n[he];
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
  return o && !o.collection ? (n.tags.push(Object.assign({}, o, { default: !1, test: void 0 })), o) : (i(s, "TAG_RESOLVE_FAILED", `Unresolved tag: ${t}`, t !== "tag:yaml.org,2002:str"), n[he]);
}
function ar({ atKey: n, directives: e, schema: t }, s, i, r) {
  const o = t.tags.find((a) => (a.default === !0 || n && a.default === "key") && a.test?.test(s)) || t[he];
  if (t.compat) {
    const a = t.compat.find((l) => l.default && l.test?.test(s)) ?? t[he];
    if (o.tag !== a.tag) {
      const l = e.tagString(o.tag), c = e.tagString(a.tag), f = `Value may be parsed as either ${l} or ${c}`;
      r(i, "TAG_RESOLVE_FAILED", f, !0);
    }
  }
  return o;
}
function cr(n, e, t) {
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
const lr = { composeNode: As, composeEmptyNode: $n };
function As(n, e, t, s) {
  const i = n.atKey, { spaceBefore: r, comment: o, anchor: a, tag: l } = t;
  let c, f = !0;
  switch (e.type) {
    case "alias":
      c = fr(n, e, s), (a || l) && s(e, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      c = Os(n, e, l, s), a && (c.anchor = a.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        c = Yi(lr, n, e, t, s), a && (c.anchor = a.source.substring(1));
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
  return c ?? (c = $n(n, e.offset, void 0, null, t, s)), a && c.anchor === "" && s(a, "BAD_ALIAS", "Anchor cannot be an empty string"), i && n.options.stringKeys && (!F(c) || typeof c.value != "string" || c.tag && c.tag !== "tag:yaml.org,2002:str") && s(l ?? e, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), r && (c.spaceBefore = !0), o && (e.type === "scalar" && e.source === "" ? c.comment = o : c.commentBefore = o), n.options.keepSourceTokens && f && (c.srcToken = e), c;
}
function $n(n, e, t, s, { spaceBefore: i, comment: r, anchor: o, tag: a, end: l }, c) {
  const f = {
    type: "scalar",
    offset: cr(e, t, s),
    indent: -1,
    source: ""
  }, u = Os(n, f, a, c);
  return o && (u.anchor = o.source.substring(1), u.anchor === "" && c(o, "BAD_ALIAS", "Anchor cannot be an empty string")), i && (u.spaceBefore = !0), r && (u.comment = r, u.range[2] = l), u;
}
function fr({ options: n }, { offset: e, source: t, end: s }, i) {
  const r = new ln(t.substring(1));
  r.source === "" && i(e, "BAD_ALIAS", "Alias cannot be an empty string"), r.source.endsWith(":") && i(e + t.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const o = e + t.length, a = ut(s, o, n.strict, i);
  return r.range = [e, o, a.offset], a.comment && (r.comment = a.comment), r;
}
function ur(n, e, { offset: t, start: s, value: i, end: r }, o) {
  const a = Object.assign({ _directives: e }, n), l = new Bt(void 0, a), c = {
    atKey: !1,
    atRoot: !0,
    directives: l.directives,
    options: l.options,
    schema: l.schema
  }, f = qe(s, {
    indicator: "doc-start",
    next: i ?? r?.[0],
    offset: t,
    onError: o,
    parentIndent: 0,
    startOnNewline: !0
  });
  f.found && (l.directives.docStart = !0, i && (i.type === "block-map" || i.type === "block-seq") && !f.hasNewline && o(f.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), l.contents = i ? As(c, i, f, o) : $n(c, f.end, s, null, f, o);
  const u = l.contents.range[2], d = ut(r, u, !1, o);
  return d.comment && (l.comment = d.comment), l.range = [t, u, d.offset], l;
}
function Ze(n) {
  if (typeof n == "number")
    return [n, n + 1];
  if (Array.isArray(n))
    return n.length === 2 ? n : [n[0], n[1]];
  const { offset: e, source: t } = n;
  return [e, e + (typeof t == "string" ? t.length : 1)];
}
function jn(n) {
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
class hr {
  constructor(e = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (t, s, i, r) => {
      const o = Ze(t);
      r ? this.warnings.push(new Ui(o, s, i)) : this.errors.push(new et(o, s, i));
    }, this.directives = new X({ version: e.version || "1.2" }), this.options = e;
  }
  decorate(e, t) {
    const { comment: s, afterEmptyLine: i } = jn(this.prelude);
    if (s) {
      const r = e.contents;
      if (t)
        e.comment = e.comment ? `${e.comment}
${s}` : s;
      else if (i || e.directives.docStart || !r)
        e.commentBefore = s;
      else if (V(r) && !r.flow && r.items.length > 0) {
        let o = r.items[0];
        H(o) && (o = o.key);
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
      comment: jn(this.prelude).comment,
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
          const r = Ze(e);
          r[0] += t, this.onError(r, "BAD_DIRECTIVE", s, i);
        }), this.prelude.push(e.source), this.atDirectives = !0;
        break;
      case "document": {
        const t = ur(this.options, this.directives, e, this.onError);
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
        const t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, s = new et(Ze(e), "UNEXPECTED_TOKEN", t);
        this.atDirectives || !this.doc ? this.errors.push(s) : this.doc.errors.push(s);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const s = "Unexpected doc-end without preceding document";
          this.errors.push(new et(Ze(e), "UNEXPECTED_TOKEN", s));
          break;
        }
        this.doc.directives.docEnd = !0;
        const t = ut(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), t.comment) {
          const s = this.doc.comment;
          this.doc.comment = s ? `${s}
${t.comment}` : t.comment;
        }
        this.doc.range[2] = t.offset;
        break;
      }
      default:
        this.errors.push(new et(Ze(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
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
      const s = Object.assign({ _directives: this.directives }, this.options), i = new Bt(void 0, s);
      this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), i.range = [0, t, t], this.decorate(i, !1), yield i;
    }
  }
}
const Ms = "\uFEFF", Ts = "", Cs = "", tn = "";
function dr(n) {
  switch (n) {
    case Ms:
      return "byte-order-mark";
    case Ts:
      return "doc-mode";
    case Cs:
      return "flow-error-end";
    case tn:
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
function le(n) {
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
const Pn = new Set("0123456789ABCDEFabcdef"), pr = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), gt = new Set(",[]{}"), mr = new Set(` ,[]{}
\r	`), Ht = (n) => !n || mr.has(n);
class gr {
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
      if ((s === "---" || s === "...") && le(this.buffer[e + 3]))
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
    return yield Ts, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const e = this.charAt(0);
    if (!e && !this.atEnd)
      return this.setNext("line-start");
    if (e === "-" || e === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const t = this.peek(3);
      if ((t === "---" || t === "...") && le(this.charAt(3)))
        return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, t === "---" ? "doc" : "stream";
    }
    return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !le(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [e, t] = this.peek(2);
    if (!t && !this.atEnd)
      return this.setNext("block-start");
    if ((e === "-" || e === "?" || e === ":") && le(t)) {
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
        return yield* this.pushUntil(Ht), "doc";
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
    if ((s !== -1 && s < this.indentNext && i[0] !== "#" || s === 0 && (i.startsWith("---") || i.startsWith("...")) && le(i[3])) && !(s === this.indentNext - 1 && this.flowLevel === 1 && (i[0] === "]" || i[0] === "}")))
      return this.flowLevel = 0, yield Cs, yield* this.parseLineStart();
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
        return yield* this.pushUntil(Ht), "flow";
      case '"':
      case "'":
        return this.flowKey = !0, yield* this.parseQuotedScalar();
      case ":": {
        const o = this.charAt(1);
        if (this.flowKey || le(o) || o === ",")
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
    return yield* this.pushUntil((t) => le(t) || t === "#");
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
    return yield tn, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let t = this.pos - 1, s = this.pos - 1, i;
    for (; i = this.buffer[++s]; )
      if (i === ":") {
        const r = this.buffer[s + 1];
        if (le(r) || e && gt.has(r))
          break;
        t = s;
      } else if (le(i)) {
        let r = this.buffer[s + 1];
        if (i === "\r" && (r === `
` ? (s += 1, i = `
`, r = this.buffer[s + 1]) : t = s), r === "#" || e && gt.has(r))
          break;
        if (i === `
`) {
          const o = this.continueScalar(s + 1);
          if (o === -1)
            break;
          s = Math.max(s, o - 2);
        }
      } else {
        if (e && gt.has(i))
          break;
        t = s;
      }
    return !i && !this.atEnd ? this.setNext("plain-scalar") : (yield tn, yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
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
          e += yield* this.pushUntil(Ht), e += yield* this.pushSpaces(!0);
          continue e;
        case "-":
        // this is an error
        case "?":
        // this is an error outside flow collections
        case ":": {
          const t = this.flowLevel > 0, s = this.charAt(1);
          if (le(s) || t && gt.has(s)) {
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
      for (; !le(t) && t !== ">"; )
        t = this.buffer[++e];
      return yield* this.pushToIndex(t === ">" ? e + 1 : e, !1);
    } else {
      let e = this.pos + 1, t = this.buffer[e];
      for (; t; )
        if (pr.has(t))
          t = this.buffer[++e];
        else if (t === "%" && Pn.has(this.buffer[e + 1]) && Pn.has(this.buffer[e + 2]))
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
class yr {
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
function be(n, e) {
  for (let t = 0; t < n.length; ++t)
    if (n[t].type === e)
      return !0;
  return !1;
}
function Bn(n) {
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
function Is(n) {
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
function yt(n) {
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
function Pe(n) {
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
function Lt(n, e) {
  if (e.length < 1e5)
    Array.prototype.push.apply(n, e);
  else
    for (let t = 0; t < e.length; ++t)
      n.push(e[t]);
}
function _n(n) {
  if (n.start.type === "flow-seq-start")
    for (const e of n.items)
      e.sep && !e.value && !be(e.start, "explicit-key-ind") && !be(e.sep, "map-value-ind") && (e.key && (e.value = e.key), delete e.key, Is(e.value) ? e.value.end ? Lt(e.value.end, e.sep) : e.value.end = e.sep : Lt(e.start, e.sep), delete e.sep);
}
class wr {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(e) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new gr(), this.onNewLine = e;
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
    const t = dr(e);
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
      switch (t.type === "block-scalar" ? t.indent = "indent" in s ? s.indent : 0 : t.type === "flow-collection" && s.type === "document" && (t.indent = 0), t.type === "flow-collection" && _n(t), s.type) {
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
        i && !i.sep && !i.value && i.start.length > 0 && Bn(i.start) === -1 && (t.indent === 0 || i.start.every((r) => r.type !== "comment" || r.indent < t.indent)) && (s.type === "document" ? s.end = i.start : s.items.push({ start: i.start }), t.items.splice(-1, 1));
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
        Bn(e.start) !== -1 ? (yield* this.pop(), yield* this.step()) : e.start.push(this.sourceToken);
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
      const t = yt(this.peek(2)), s = Pe(t);
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
              Lt(i, t.start), i.push(this.sourceToken), e.items.pop();
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
              else if (be(t.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: r, key: null, sep: [this.sourceToken] }]
                });
              else if (Is(t.key) && !be(t.sep, "newline")) {
                const o = Pe(t.start), a = t.key, l = t.sep;
                l.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: a, sep: l }]
                });
              } else r.length > 0 ? t.sep = t.sep.concat(r, this.sourceToken) : t.sep.push(this.sourceToken);
            else if (be(t.start, "newline"))
              Object.assign(t, { key: null, sep: [this.sourceToken] });
            else {
              const o = Pe(t.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: o, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            t.sep ? t.value || i ? e.items.push({ start: r, key: null, sep: [this.sourceToken] }) : be(t.sep, "map-value-ind") ? this.stack.push({
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
              if (!t.explicitKey && t.sep && !be(t.sep, "newline")) {
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
              Lt(i, t.start), i.push(this.sourceToken), e.items.pop();
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
        t.value || be(t.start, "seq-item-ind") ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
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
        const i = yt(s), r = Pe(i);
        _n(e);
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
        const t = yt(e), s = Pe(t);
        return s.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const t = yt(e), s = Pe(t);
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
function br(n) {
  const e = n.prettyErrors !== !1;
  return { lineCounter: n.lineCounter || e && new yr() || null, prettyErrors: e };
}
function kr(n, e = {}) {
  const { lineCounter: t, prettyErrors: s } = br(e), i = new wr(t?.addNewLine), r = new hr(e);
  let o = null;
  for (const a of r.compose(i.parse(n), !0, n.length))
    if (!o)
      o = a;
    else if (o.options.logLevel !== "silent") {
      o.errors.push(new et(a.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return s && t && (o.errors.forEach(Cn(n, t)), o.warnings.forEach(Cn(n, t))), o;
}
const ie = {
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
    gestureDirection: "손방향",
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
}, nn = {
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
  gesture: { wave: "인사손", point: "가리키는손", "point-up": "위가리키는손" },
  gestureDirection: { left: "왼쪽", right: "오른쪽" },
  prop: { request: "요청", data: "데이터", key: "열쇠" },
  mode: { full: "전체", before: "이전" },
  panelFormat: { compact: "기본", phone: "모바일" },
  diagramType: { mermaid: "머메이드" }
}, $r = {
  cast: { asset: "asset" },
  appearance: { hairStyle: "hairStyle", outfit: "outfit" },
  actor: {
    expression: "expression",
    gesture: "gesture",
    gestureDirection: "gestureDirection",
    holding: "prop"
  },
  panel: { mode: "mode" },
  transfer: { prop: "prop" },
  diagram: { type: "diagramType" },
  options: { panelFormat: "panelFormat" }
};
function $t(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function ke(n, e, t, s) {
  if (!$t(n)) return n;
  const i = ie[e], r = /* @__PURE__ */ Object.create(null);
  for (const [o, a] of Object.entries(n)) {
    const l = Object.keys(i).find(
      (p) => o === p || o === i[p]
    ) ?? o;
    Object.hasOwn(i, l) && i[l];
    const c = l;
    if (Object.hasOwn(r, c))
      throw new Error(
        `${s}: '${i[l]}'와 '${l}'은 같은 항목입니다. 하나만 작성하세요.`
      );
    let f = a;
    const u = $r[e], d = u && Object.hasOwn(u, l) ? u[l] : void 0;
    if (d && typeof a == "string") {
      const p = nn[d], m = Object.keys(p).find(
        (h) => a === h || a === p[h]
      );
      m && (f = m);
    }
    if (e === "comic" && l === "cast" && $t(a)) {
      const p = /* @__PURE__ */ Object.create(null);
      for (const [m, h] of Object.entries(a))
        p[m] = ke(h, "cast", t, `${s}.등장인물.${m}`);
      f = p;
    } else if (e === "comic" && l === "personas" && $t(a)) {
      const p = /* @__PURE__ */ Object.create(null);
      for (const [m, h] of Object.entries(a))
        p[m] = ke(
          h,
          "persona",
          t,
          `${s}.페르소나.${m}`
        );
      f = p;
    } else if (e === "cast" && l === "persona")
      f = ke(a, "persona", t, `${s}.페르소나`);
    else if (e === "cast" && l === "appearance")
      f = ke(a, "appearance", t, `${s}.외형`);
    else if (e === "panel" && l === "diagram")
      f = ke(a, "diagram", t, `${s}.다이어그램`);
    else if (Array.isArray(a)) {
      const p = e === "comic" && l === "panels" ? "panel" : e === "panel" && l === "actors" ? "actor" : e === "panel" && l === "dialogue" ? "dialogue" : e === "panel" && l === "transfer" ? "transfer" : void 0;
      p && (f = a.map(
        (m, h) => ke(
          m,
          p,
          t,
          `${s}.${i[l]}[${h + 1}]`
        )
      ));
    }
    r[c] = f;
  }
  return r;
}
const vr = (n) => ke(n, "comic", !1, "만화");
function Sr(n) {
  const e = ke(n, "options", !1, "표시 설정");
  if (!$t(e)) throw new Error("표시 설정: 객체가 필요합니다.");
  for (const t of Object.keys(e))
    if (!Object.hasOwn(ie.options, t))
      throw new Error(`표시 설정: 알 수 없는 항목 '${t}'.`);
  return e;
}
function st(n, e) {
  if (!n || typeof n != "object" || Array.isArray(n))
    throw new Error(`${e}: 객체가 필요합니다.`);
  return n;
}
function ge(n, e, t = 1e4) {
  if (typeof n != "string" || !n.trim())
    throw new Error(`${e}: 비어 있지 않은 문자열이 필요합니다.`);
  if (n.length > t)
    throw new Error(
      `${e}: 텍스트가 너무 깁니다. ${t}자 이내로 작성하세요.`
    );
  return n;
}
function vn(n, e, t) {
  for (const s of Object.keys(n))
    if (!Object.hasOwn(e, s))
      throw new Error(`${t}: 알 수 없는 항목 '${s}'.`);
}
function Qn(n, e) {
  const t = st(n, e);
  vn(t, ie.persona, e);
  const s = {};
  if (t.role !== void 0 && (s.role = ge(t.role, `${e}.직무`, 100)), t.personality !== void 0 && (s.personality = ge(t.personality, `${e}.성격`, 300)), t.speechStyle !== void 0 && (s.speechStyle = ge(t.speechStyle, `${e}.말투`, 300)), !Object.keys(s).length)
    throw new Error(`${e}: 직무·성격·말투 중 하나 이상 작성하세요.`);
  return s;
}
function Gt(n, e, t) {
  if (n === void 0) return e;
  const s = ge(n, t, 7);
  if (s.length !== 4 && s.length !== 7 || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(s))
    throw new Error(`${t}: #RGB 또는 #RRGGBB 색상을 작성하세요.`);
  return s;
}
function Dn(n, e, t, s) {
  if (n === void 0) return t;
  const i = ge(n, s);
  if (!Object.hasOwn(e, i))
    throw new Error(
      `${s}: ${Object.values(e).join(", ")} 중 하나를 선택하세요.`
    );
  return i;
}
function Er(n, e) {
  const t = n === void 0 ? {} : st(n, e);
  if (vn(t, ie.appearance, e), t.glasses !== void 0 && typeof t.glasses != "boolean")
    throw new Error(`${e}.안경: true 또는 false가 필요합니다.`);
  return {
    skinColor: Gt(
      t.skinColor,
      Oe.skinColor,
      `${e}.피부색`
    ),
    hairStyle: Dn(
      t.hairStyle,
      nn.hairStyle,
      Oe.hairStyle,
      `${e}.머리모양`
    ),
    hairColor: Gt(
      t.hairColor,
      Oe.hairColor,
      `${e}.머리색`
    ),
    outfit: Dn(
      t.outfit,
      nn.outfit,
      Oe.outfit,
      `${e}.옷`
    ),
    outfitColor: Gt(
      t.outfitColor,
      Oe.outfitColor,
      `${e}.옷색`
    ),
    glasses: t.glasses === void 0 ? Oe.glasses : t.glasses
  };
}
function Lr(n, e) {
  const t = /* @__PURE__ */ Object.create(null);
  if (e !== void 0)
    for (const [i, r] of Object.entries(
      st(e, "페르소나")
    ))
      ge(i, "페르소나 식별자"), t[i] = Qn(r, `페르소나.${i}`);
  const s = /* @__PURE__ */ Object.create(null);
  for (const [i, r] of Object.entries(st(n, "등장인물"))) {
    const o = `등장인물.${i}`, a = st(r, o);
    vn(a, ie.cast, o);
    const l = ge(a.asset, `${o}.그림`);
    if (!Object.hasOwn(Yn, l))
      throw new Error(`${o}: 없는 에셋 '${l}'.`);
    let c;
    if (a.persona !== void 0)
      if (typeof a.persona == "string") {
        const f = ge(a.persona, `${o}.페르소나`);
        if (!Object.hasOwn(t, f))
          throw new Error(`${o}.페르소나: 없는 페르소나 '${f}'.`);
        c = { ...t[f] };
      } else c = Qn(a.persona, `${o}.페르소나`);
    if (l !== "human" && a.appearance !== void 0)
      throw new Error(`${o}.외형: 사람 그림에서만 사용할 수 있습니다.`);
    s[i] = {
      asset: l,
      label: a.label === void 0 ? i : ge(a.label, `${o}.이름표`),
      ...l === "human" ? { appearance: Er(a.appearance, `${o}.외형`) } : {},
      ...c ? { persona: c } : {}
    };
  }
  return { cast: s, ...e !== void 0 ? { personas: t } : {} };
}
function Ee(n, e) {
  if (!n || typeof n != "object" || Array.isArray(n))
    throw new Error(`${e}: 객체가 필요합니다.`);
  return n;
}
function Z(n, e, t = 1e4) {
  if (typeof n != "string" || !n.trim())
    throw new Error(`${e}: 비어 있지 않은 문자열이 필요합니다.`);
  if (n.length > t)
    throw new Error(
      `${e}: 텍스트가 너무 깁니다. ${t}자 이내로 작성하세요.`
    );
  return n;
}
function Be(n, e) {
  if (!Array.isArray(n)) throw new Error(`${e}: 목록이 필요합니다.`);
  return n;
}
function Le(n, e, t) {
  for (const s of Object.keys(n))
    if (!e.includes(s))
      throw new Error(`${t}: 알 수 없는 항목 '${s}'.`);
}
function xe(n, e, t, s) {
  if (n !== void 0) {
    if (typeof n != "number" || !Number.isFinite(n) || n < e || n > t)
      throw new Error(`${s}: ${e}~${t} 사이 숫자가 필요합니다.`);
    return n;
  }
}
function xr(n) {
  if (n.length > 1e5)
    throw new Error("코드가 너무 깁니다. 100KB 이내로 작성하세요.");
  const e = kr(n, { uniqueKeys: !0 });
  if (e.errors.length) throw new Error(e.errors[0].message);
  const t = Ee(vr(e.toJS({ maxAliasCount: 20 })), "만화");
  Le(t, Object.keys(ie.comic), "만화");
  const { cast: s, personas: i } = Lr(t.cast, t.personas);
  let r;
  const o = Be(t.panels, "컷").map((a, l) => {
    const c = `컷 ${l + 1}`, f = { ...Ee(a, c) };
    if (Le(f, Object.keys(ie.panel), c), f.mode !== void 0 && f.mode !== "before" && f.mode !== "full")
      throw new Error(`${c}: 구성은 전체 또는 이전이어야 합니다.`);
    if (f.mode === "before") {
      if (!r)
        throw new Error(`${c}: 첫 컷에서는 이전 구성을 사용할 수 없습니다.`);
      const h = r.actors.map(
        ($) => ({ ...$ })
      ), g = Be(f.removeActors ?? [], `${c}.제외인물`).map(
        ($) => Z($, `${c}.제외인물`)
      );
      for (const $ of g)
        if (!h.some((E) => E.id === $))
          throw new Error(`${c}: 제거할 인물 '${$}'가 이전 컷에 없습니다.`);
      const w = h.filter(
        ($) => !g.some((E) => E === $.id)
      ), v = Be(f.actors ?? [], `${c}.인물`), b = /* @__PURE__ */ new Set();
      for (const $ of v) {
        const E = typeof $ == "string" ? { id: $ } : Ee($, `${c}.인물`);
        Le(E, Object.keys(ie.actor), `${c}.인물`);
        const x = Z(E.id, `${c}.인물.식별자`);
        if (b.has(x))
          throw new Error(`${c}: 캐릭터 식별자가 중복됩니다.`);
        b.add(x);
        const T = w.findIndex((B) => B.id === x), L = {
          ...T < 0 ? {} : w[T],
          ...E
        };
        for (const [B, G] of Object.entries(E))
          B !== "id" && G === null && delete L[B];
        E.gesture !== void 0 && E.gestureDirection === void 0 && delete L.gestureDirection, T < 0 ? w.push(L) : w[T] = L;
      }
      f.actors = f.actors !== void 0 && v.length === 0 ? [] : w;
    } else if (f.removeActors !== void 0)
      throw new Error(`${c}: 제외인물은 이전 구성에서만 사용할 수 있습니다.`);
    const u = Be(f.actors, `${c}.인물`).map((h) => {
      const g = typeof h == "string" ? { id: h } : Ee(h, `${c}.인물`);
      Le(g, Object.keys(ie.actor), `${c}.인물`);
      const w = Z(g.id, `${c}.인물.식별자`), v = g.expression === void 0 ? "neutral" : Z(g.expression, `${c}.${w}.표정`);
      if (!Object.hasOwn(s, w))
        throw new Error(`${c}: 없는 캐릭터 '${w}'.`);
      if (!Object.hasOwn(Wn, v))
        throw new Error(`${c}.${w}: 없는 표정 '${v}'.`);
      const b = g.gesture === void 0 ? void 0 : Z(g.gesture, `${c}.${w}.손모양`), $ = g.holding === void 0 ? void 0 : Z(g.holding, `${c}.${w}.든소품`);
      if (b && !ai.includes(b))
        throw new Error(`${c}.${w}: 없는 손 제스처 '${b}'.`);
      if ($ && !Object.hasOwn(vt, $))
        throw new Error(`${c}.${w}: 없는 소품 '${$}'.`);
      const E = g.gestureDirection === void 0 ? void 0 : Z(g.gestureDirection, `${c}.${w}.손방향`);
      if (E !== void 0) {
        if (E === "up" || E === "위")
          throw new Error(
            `${c}.${w}.손방향: 위쪽은 손모양: 위가리키는손으로 작성하세요.`
          );
        if (!ci.includes(E))
          throw new Error(
            `${c}.${w}.손방향: 왼쪽 또는 오른쪽이어야 합니다.`
          );
        if (!b)
          throw new Error(`${c}.${w}.손방향: 손모양과 함께 작성하세요.`);
        if (b === "point-up")
          throw new Error(
            `${c}.${w}.손방향: 위가리키는손은 방향을 정할 수 없습니다.`
          );
      }
      return {
        id: w,
        expression: v,
        gesture: b,
        ...E ? { gestureDirection: E } : {},
        holding: $,
        x: xe(g.x, 0, 1, `${c}.${w}.가로위치`),
        y: xe(g.y, 0, 1, `${c}.${w}.세로위치`),
        scale: xe(g.scale, 0.5, 1.25, `${c}.${w}.배율`) ?? 1
      };
    });
    if (u.length < 1 || u.length > 3)
      throw new Error(`${c}: 캐릭터는 1~3명이어야 합니다.`);
    if (new Set(u.map((h) => h.id)).size !== u.length)
      throw new Error(`${c}: 캐릭터 식별자가 중복됩니다.`);
    const d = Be(f.dialogue ?? [], `${c}.대사`).map(
      (h) => {
        const g = Ee(h, `${c}.대사`);
        Le(g, Object.keys(ie.dialogue), `${c}.대사`);
        const w = Z(g.from, `${c}.대사.화자`), v = g.to === void 0 ? void 0 : Z(g.to, `${c}.대사.상대`);
        if (!u.some((b) => b.id === w))
          throw new Error(`${c}: 화자 '${w}'가 컷에 없습니다.`);
        if (v && !u.some((b) => b.id === v))
          throw new Error(`${c}: 대화 상대 '${v}'가 컷에 없습니다.`);
        return {
          from: w,
          to: v,
          text: Z(g.text, `${c}.대사.내용`),
          x: xe(g.x, 0, 1, `${c}.대사.가로위치`),
          y: xe(g.y, 0, 1, `${c}.대사.세로위치`),
          fontSize: xe(g.fontSize, 12, 32, `${c}.대사.글자크기`) ?? 18
        };
      }
    );
    if (d.length > 20)
      throw new Error(`${c}: 대사는 20개 이내로 작성하세요.`);
    const p = Be(f.transfer ?? [], `${c}.전달`).map(
      (h) => {
        const g = Ee(h, `${c}.전달`);
        Le(g, Object.keys(ie.transfer), `${c}.전달`);
        const w = Z(g.from, `${c}.전달.주는인물`), v = Z(g.to, `${c}.전달.받는인물`), b = Z(g.prop, `${c}.전달.소품`);
        if (!u.some(($) => $.id === w))
          throw new Error(`${c}: 전달 주체 '${w}'가 컷에 없습니다.`);
        if (!u.some(($) => $.id === v))
          throw new Error(`${c}: 전달 대상 '${v}'가 컷에 없습니다.`);
        if (w === v)
          throw new Error(`${c}: 전달 주체와 대상은 달라야 합니다.`);
        if (!Object.hasOwn(vt, b))
          throw new Error(`${c}: 없는 소품 '${b}'.`);
        return { from: w, to: v, prop: b };
      }
    );
    if (p.length > 6)
      throw new Error(`${c}: 소품 전달은 6개 이내로 작성하세요.`);
    let m;
    if (f.diagram !== void 0 && f.diagram !== null) {
      const h = `${c}.다이어그램`, g = Ee(f.diagram, h);
      if (Le(g, Object.keys(ie.diagram), h), g.type !== "mermaid")
        throw new Error(`${h}.종류: 머메이드여야 합니다.`);
      m = {
        type: "mermaid",
        source: Z(g.source, `${h}.원문`, 2e4),
        title: g.title === void 0 ? "다이어그램" : Z(g.title, `${h}.제목`, 100),
        height: xe(g.height, 160, 1200, `${h}.높이`)
      };
    }
    return r = { actors: u, dialogue: d, transfer: p, ...m ? { diagram: m } : {} }, r;
  });
  if (o.length < 1 || o.length > 30)
    throw new Error("컷은 1~30개여야 합니다.");
  return {
    title: t.title === void 0 ? "Comic Gen" : Z(t.title, "제목"),
    cast: s,
    panels: o,
    ...i ? { personas: i } : {}
  };
}
const js = "M-10 4Q-12 -3 -17 -9L-23 -22Q-26 -27 -22 -30Q-18 -33 -15 -28L-10 -21L-15 -35Q-16 -40 -12 -42Q-8 -44 -6 -38L-2 -28L-4 -43Q-4 -48 0 -48Q4 -48 4 -43L6 -28L8 -38Q9 -43 13 -42Q17 -41 16 -37L14 -22Q14 -16 18 -19L22 -24Q25 -27 28 -24Q31 -21 27 -17L19 -5Q15 2 8 4L7 7Z", Ps = "M-5 -7H-20Q-24 -7 -24 -3Q-24 1 -20 1H-8Q-11 4 -8 7L-5 10Q-2 13 3 11L9 8Q12 6 11 1L10 -6Q9 -11 5 -12L0 -14Q-4 -15 -6 -12Q-8 -9 -5 -7Z", Nr = Ps.replace(
  "H-20Q-24 -7 -24 -3Q-24 1 -20 1H",
  "H-15Q-19 -7 -19 -3Q-19 1 -15 1H"
), Or = "M-9 -3Q-9 -7 -5 -7H2V-21Q2 -24 5 -24Q8 -24 8 -21V-6Q10 -4 10 0V5Q10 11 3 11H-3Q-9 11 -9 5Z", Bs = "M-8 -5Q-8 -10 -2 -10H5Q10 -9 10 -4V4Q10 9 4 10H-3Q-9 9 -10 3Z";
function Ce(n, e, t) {
  const s = !!n.sleeve, i = s ? {
    wave: "M-47 42Q-61 45 -65 34Q-72 19 -70 -8L-63 -9Q-64 17 -58 28Q-55 35 -42 36Z",
    point: "M-47 43Q-60 39 -68 25L-62 20Q-55 31 -40 35Z",
    // Elbow out, forearm upright: the raised hand stays near head height.
    "point-up": "M-47 42Q-66 43 -70 26L-68 -8L-60 -8L-62 24Q-60 34 -42 36Z",
    grip: "M42 36Q56 36 61 17L67 20Q63 44 47 44Z"
  } : {
    wave: "M-48 20Q-62 24 -66 13Q-71 2 -70 -8L-63 -9Q-63 4 -60 11Q-57 18 -47 15Z",
    point: "M-47 17Q-57 16 -68 17L-68 24Q-55 24 -47 23Z",
    "point-up": "M-48 20Q-65 24 -68 7Q-73 -13 -68 -38L-61 -38Q-65 -13 -61 5Q-58 18 -47 15Z",
    grip: "M46 17Q54 13 62 16L63 23Q54 20 47 23Z"
  }, r = (t === "grip" ? e === "left" : e === "right") ? ' transform="scale(-1 1)"' : "", o = n.longSleeve ? n.sleeve : n.skin;
  return `<g data-arm="${e}"${s ? ` data-human-part="arm-${e}"` : ""}${r} stroke-linejoin="round"><path d="${i[t]}" fill="${o}" stroke-width="2.6"/></g>`;
}
function Ar(n, e, t = "left") {
  if (n === "wave") {
    const a = !!e.sleeve, l = a ? "M-86 -30Q-88 -42 -80 -48M-72 -48Q-64 -53 -56 -50" : "M-90 -46Q-90 -59 -81 -64M-40 -41Q-36 -32 -41 -25";
    return {
      back: Ce(e, t, "wave"),
      front: `<g data-gesture="wave"${t === "right" ? ' transform="scale(-1 1)"' : ""}><g data-hand="wave" data-side="${t}" stroke-linejoin="round"><path data-wave-motion="true" d="${l}" fill="none" stroke="#586c8c" stroke-width="2.5"/><g data-palm="wave" transform="translate(-66 -8) rotate(-8) scale(${a ? 0.6 : 0.82})"><path d="${js}" fill="${e.skin}" stroke-width="2.6"/><path d="M10 -12Q5 -15 1 -9" fill="none" stroke-width="1.6"/></g></g></g>`,
      port: { x: t === "left" ? -66 : 66, y: -22 }
    };
  }
  const s = !!e.sleeve, i = s ? Nr : Ps, r = s ? " scale(.72)" : "";
  if (n === "point-up" && s)
    return {
      back: Ce(e, "left", "point-up"),
      front: `<g data-gesture="point-up"><g data-hand="point-up" data-side="left" transform="translate(-64 -16) scale(.8)" stroke-linejoin="round"><path data-palm="point-up" d="${Or}" fill="${e.skin}" stroke-width="2.8"/><path d="M-9 1Q-3 -1 3 2Q5 4 2 6H-6" fill="${e.skin}" stroke-width="2.2"/><path d="M-5 -7Q-6 -3 -2 -3" fill="none" stroke-width="1.6"/></g></g>`,
      port: { x: -64, y: -35 }
    };
  if (n === "point-up")
    return {
      back: Ce(e, "left", "point-up"),
      front: `<g data-gesture="point-up"><g data-hand="point-up" data-side="left" transform="translate(-64 -39) rotate(90)${r}" stroke-linejoin="round"><path data-palm="point-up" d="${i}" fill="${e.skin}" stroke-width="2.6"/><path d="M-3 -6Q1 -3 6 -4M1 5L7 3" fill="none" stroke-width="1.6"/></g></g>`,
      port: { x: -64, y: -39 }
    };
  const o = t === "left" ? -64 : 64;
  return {
    back: Ce(e, t, "point"),
    front: `<g data-gesture="point"><g data-hand="point" data-side="${t}" transform="translate(${o} 20)${t === "right" ? " scale(-1 1)" : ""}${r}" stroke-linejoin="round"><path data-palm="point" d="${i}" fill="${e.skin}" stroke-width="2.6"/><path d="M-3 -6Q1 -3 6 -4M1 5L7 3" fill="none" stroke-width="1.6"/></g></g>`,
    port: { x: t === "left" ? -66 : 66, y: 20 }
  };
}
function Mr(n, e, t, s = "") {
  const i = n === "left" ? -62 : 62, r = n === "left" ? ' transform="scale(-1 1)"' : "";
  return {
    back: Ce(e, n, "grip"),
    front: `<g data-hand="${t}" data-side="${n}" transform="translate(${i} 20)" stroke-linejoin="round"><g${r}><path data-palm="grip" d="${Bs}" fill="${e.skin}" stroke-width="2.6"/>${s ? `<g transform="translate(7.5 -14)">${s}</g>` : ""}<path d="M-7 -4Q-4 -8 0 -5L5 -1Q6 2 2 3L-4 1Q-8 0 -7 -4Z" fill="${e.skin}" stroke-width="2"/><path d="M1 6H6" fill="none" stroke-width="1.5"/></g></g>`,
    port: { x: i, y: 20 }
  };
}
const Tr = '<path d="M-7 -4Q-4 -8 0 -5L5 -1Q6 2 2 3L-4 1Q-8 0 -7 -4Z" stroke-width="2"/><path d="M1 6H6" fill="none" stroke-width="1.5"/>';
function Cr(n, e, t) {
  const s = n === "left" ? -1 : 1, i = n === "left" ? ' transform="scale(-1 1)"' : "";
  if (t === "transfer") {
    const o = 62 * s;
    return {
      back: Ce(e, n, "grip"),
      front: `<g data-hand="transfer" data-side="${n}" transform="translate(${o} 20)" stroke-linejoin="round"><g${i}><path data-palm="grip" d="${Bs}" fill="${e.skin}" stroke-width="2.6"/></g></g>`,
      // The link starts past the far edge of the item, so it never shows
      // through a thin or hollow prop such as the key.
      port: { x: o + 28 * s, y: 12 },
      rest: { x: o + 7.5 * s, y: 6 },
      overlay: `<g transform="translate(${o} 20)" stroke="#303341" stroke-linejoin="round" stroke-linecap="round" fill="${e.skin}"><g${i}>${Tr}</g></g>`
    };
  }
  const r = 58 * s;
  return {
    back: Ce(e, n, "grip"),
    front: `<g data-hand="receive" data-side="${n}" transform="translate(${r} 18)" stroke-linejoin="round"><g${i}><g data-palm="open" transform="rotate(62) scale(.5)"><path d="${js}" fill="${e.skin}" stroke-width="5"/><path d="M10 -12Q5 -15 1 -9" fill="none" stroke-width="3.2"/></g></g></g>`,
    // The arrow arrives just in front of the open palm.
    port: { x: r + 26 * s, y: 12 }
  };
}
const Ne = (n, e, t) => Math.max(e, Math.min(t, n));
function zt(n, e, t, s) {
  const i = document.createElement("canvas").getContext("2d");
  i.font = `${t}px ${s}`;
  const r = [];
  for (const o of n.split(`
`)) {
    let a = "";
    for (const l of Array.from(o))
      a && i.measureText(a + l).width > e && (r.push(a), a = ""), a += l;
    r.push(a);
  }
  return r;
}
function _s(n, e, t, s, i = "compact", r) {
  const o = Math.min(t - 80, 390), a = document.createElement("canvas").getContext("2d"), l = n.dialogue.map((k) => {
    const y = zt(k.text, o - 36, k.fontSize, s);
    return a.font = `${k.fontSize}px ${s}`, {
      line: k,
      lines: y,
      width: Ne(
        Math.max(...y.map((M) => a.measureText(M).width)) + 36,
        110,
        o
      ),
      lineHeight: Math.ceil(k.fontSize * 1.45)
    };
  }), c = l.reduce(
    (k, y) => k + 60 + y.lines.length * y.lineHeight,
    20
  ), f = 92, u = (t - 72) / n.actors.length, d = Math.min(
    1,
    (u - 12) / (2 * f * Math.max(...n.actors.map((k) => k.scale)))
  ), p = n.actors.map((k) => k.scale * d), m = n.actors.map(
    (k, y) => Ne(
      36 + (t - 72) * (k.x ?? (y + 0.5) / n.actors.length),
      26 + f * p[y],
      t - 26 - f * p[y]
    )
  ), h = n.transfer.some((k) => {
    const y = m[n.actors.findIndex((N) => N.id === k.from)], M = m[n.actors.findIndex((N) => N.id === k.to)];
    return n.actors.some(
      (N, I) => N.id !== k.from && N.id !== k.to && m[I] >= Math.min(y, M) && m[I] <= Math.max(y, M)
    );
  }), g = c + Math.max(204, Math.ceil(196 * Math.max(...p))) + (h ? 40 : 0) + Math.max(0, n.transfer.length - 1) * 24, w = n.actors.map(
    (k, y) => Ne(
      k.y === void 0 ? g - 126 : k.y * g,
      c + 70 * p[y],
      g - 126 * p[y]
    )
  );
  for (let k = 0; k < n.actors.length; k++)
    for (let y = k + 1; y < n.actors.length; y++)
      if (Math.abs(m[k] - m[y]) < f * (p[k] + p[y]) && Math.abs(w[k] - w[y]) < 120 * Math.max(p[k], p[y]))
        throw new Error(
          `캐릭터 '${n.actors[k].id}'와 '${n.actors[y].id}'가 겹칩니다. 가로위치·세로위치 또는 배율을 조정하세요.`
        );
  const v = [
    `<rect x="20" y="0" width="${t - 40}" height="${g}" rx="18" fill="white" stroke="#c8d2df" stroke-width="1.6"/>`
  ];
  let b = 20;
  l.forEach(({ line: k, lines: y, lineHeight: M, width: N }) => {
    const I = m[n.actors.findIndex((_) => _.id === k.from)], j = Ne(
      (k.x === void 0 ? I : k.x * t) - N / 2,
      40,
      t - N - 40
    ), R = 28 + y.length * M, z = k.y === void 0 ? b : Ne(k.y * g, 20, c - R), D = Math.max(j + 24, Math.min(j + N - 24, I)), J = j + N, Y = z + R, te = n.actors.findIndex(
      (_) => _.id === k.from
    ), S = Math.min(
      Y + 24,
      w[te] - 65 * p[te]
    ), O = Ne(I, D - 18, D + 18), A = `M${j + 14} ${z}H${J - 14}Q${J} ${z} ${J} ${z + 14}V${Y - 14}Q${J} ${Y} ${J - 14} ${Y}H${D + 9}L${O} ${S}L${D - 9} ${Y}H${j + 14}Q${j} ${Y} ${j} ${Y - 14}V${z + 14}Q${j} ${z} ${j + 14} ${z}Z`;
    v.push(
      `<g data-dialogue="${se(k.from)}" data-to="${se(k.to ?? "")}"><path d="${A}" fill="#fffaf0" stroke="#303341" stroke-width="2" stroke-linejoin="round"/><text x="${j + 18}" y="${z + 18 + k.fontSize}" font-size="${k.fontSize}">${y.map((_, q) => `<tspan x="${j + 18}" dy="${q ? M : 0}">${se(_)}</tspan>`).join("")}</text></g>`
    ), b += R + 32;
  });
  const $ = [], E = [];
  n.actors.forEach((k, y) => {
    const M = e[k.id], N = li(M), I = M.asset === "human", j = I ? N.color : "white", R = new Set(
      n.transfer.flatMap((P) => {
        const de = P.from === k.id ? P.to : P.to === k.id ? P.from : void 0;
        if (!de) return [];
        const ne = n.actors.findIndex(
          (pe) => pe.id === de
        );
        return [
          m[ne] < m[y] || m[ne] === m[y] && ne < y ? "left" : "right"
        ];
      })
    ), z = n.dialogue.find(
      (P) => P.from === k.id && P.to
    )?.to, D = n.actors.findIndex((P) => P.id === z), J = k.gestureDirection ?? (k.gesture === "point" && D >= 0 && m[D] > m[y] ? "right" : "left"), Y = k.gesture && J === "right" ? "left" : "right", te = D < 0 ? 0 : Math.sign(m[D] - m[y]) * 4, S = zt(
      M.label,
      (t - 72) / n.actors.length - 12,
      16,
      s
    );
    if (S.length > 2)
      throw new Error(`캐릭터 '${k.id}'의 이름표가 너무 깁니다.`);
    const O = {
      skin: j,
      sleeve: N.sleeveColor,
      longSleeve: N.longSleeve
    }, A = [], _ = {}, q = {};
    if (k.gesture) {
      const P = Ar(k.gesture, O, J);
      A.push(P), _[J] = P.port;
    }
    if (k.holding) {
      const P = Mr(
        Y,
        O,
        "holding",
        `<g data-prop="${k.holding}">${vt[k.holding]}</g>`
      );
      A.push({
        ...P,
        front: `<g data-holding="${k.holding}">${P.front}</g>`
      }), _[Y] = P.port;
    }
    for (const P of R) {
      if (_[P]) continue;
      if (!I) {
        _[P] = { x: P === "left" ? -60 : 60, y: 20 };
        continue;
      }
      const de = n.transfer.find((pe) => {
        const Ye = pe.from === k.id ? pe.to : pe.to === k.id ? pe.from : void 0;
        if (!Ye) return !1;
        const ve = n.actors.findIndex(
          (ht) => ht.id === Ye
        );
        return P === (m[ve] < m[y] || m[ve] === m[y] && ve < y ? "left" : "right");
      }), ne = Cr(
        P,
        O,
        de.from === k.id ? "transfer" : "receive"
      );
      A.push(ne), _[P] = ne.port, ne.rest && (q[P] = { ...ne.rest, overlay: ne.overlay });
    }
    $.push(_), E.push(q);
    const W = N.restingHands ? (_.left ? "" : N.restingHands.left) + (_.right ? "" : N.restingHands.right) : "";
    v.push(
      `<g data-character="${se(k.id)}" transform="translate(${m[y]} ${w[y]}) scale(${p[y]})" stroke="#303341" stroke-width="2.8" stroke-linecap="round"><ellipse cy="69" rx="51" ry="7" fill="#e8edf3" stroke="none"/>${A.map((P) => P.back).join("")}${N.body}<g data-face="${k.expression}" transform="translate(${te} ${N.faceY})" fill="#303341">${Wn[k.expression]}</g>${W}${A.map((P) => P.front).join("")}<text y="94" text-anchor="middle" stroke="none" fill="#303341" font-size="16">${S.map((P, de) => `<tspan x="0" dy="${de ? 18 : 0}">${se(P)}</tspan>`).join("")}</text></g>`
    );
  });
  const x = [], T = (k) => JSON.stringify([k.from, k.to].sort()), L = /* @__PURE__ */ new Map();
  for (const k of n.transfer)
    L.set(
      T(k),
      (L.get(T(k)) ?? 0) + 1
    );
  const B = /* @__PURE__ */ new Map(), G = /* @__PURE__ */ new Set();
  n.transfer.forEach((k) => {
    const y = n.actors.findIndex(
      (ue) => ue.id === k.from
    ), M = n.actors.findIndex((ue) => ue.id === k.to), N = m[y], I = m[M], j = Math.sign(I - N) || Math.sign(M - y), R = j > 0 ? "right" : "left", z = $[y][R], D = E[y][R], J = $[M][j > 0 ? "left" : "right"], Y = D ? 0 : 10 * p[y], te = 6, S = Math.abs(I - N) >= 1, O = N + z.x * p[y] + (S ? j * Y : 0), A = I + J.x * p[M] - (S ? j * te : 0), _ = Math.sign(w[M] - w[y]) || 1, q = w[y] + z.y * p[y] + (S ? 0 : _ * Y), W = w[M] + J.y * p[M] - (S ? 0 : _ * te);
    let P = `M${O} ${q}L${A} ${W}`, de = (ue) => ({
      x: O + (A - O) * ue,
      y: q + (W - q) * ue
    }), ne = A - O, pe = W - q;
    const Ye = n.actors.flatMap(
      (ue, we) => ue.id !== k.from && ue.id !== k.to && m[we] >= Math.min(O, A) && m[we] <= Math.max(O, A) ? [we] : []
    );
    if (Ye.length) {
      const we = (4 * Math.min(
        q,
        W,
        ...Ye.map(
          (ce) => w[ce] - 70 * p[ce] - 30
        )
      ) - (q + W) / 2) / 3, Je = (A - O) / 3;
      P = `M${O} ${q}C${O + Je} ${we} ${A - Je} ${we} ${A} ${W}`, de = (ce) => {
        const Se = 1 - ce;
        return {
          x: Se ** 3 * O + 3 * Se * Se * ce * (O + Je) + 3 * Se * ce * ce * (A - Je) + ce ** 3 * A,
          y: Se ** 3 * q + 3 * Se * ce * (Se + ce) * we + ce ** 3 * W
        };
      }, ne = Je, pe = W - we;
    }
    const ve = T(k), ht = L.get(ve), Dt = B.get(ve) ?? 0;
    B.set(ve, Dt + 1);
    const En = `${y}:${R}`, We = !!D && !G.has(En);
    We && G.add(En);
    const Ln = Math.hypot(A - O, W - q) / (ht + 1) >= 34, xn = de(Ln ? (Dt + 1) / (ht + 1) : 0.5), ni = Ln ? 0 : 26 + 30 * Dt, si = We ? N + D.x * p[y] : xn.x, ii = We ? w[y] + D.y * p[y] : Math.max(24, xn.y - ni), ri = Math.atan2(pe, ne) * 180 / Math.PI;
    x.push(
      `<g data-transfer="${se(k.from)}" data-to="${se(k.to)}" stroke="#586c8c" stroke-width="2.5" stroke-linejoin="round"><path data-transfer-link="true" d="${P}" fill="none"/><path transform="translate(${A} ${W}) rotate(${ri})" d="M-9 -5L0 0L-9 5" fill="none"/><g data-prop="${k.prop}" transform="translate(${si} ${ii})${We ? ` scale(${p[y]})` : ""}">${vt[k.prop]}</g>${We && D.overlay ? `<g data-transfer-grip="true" transform="translate(${N} ${w[y]}) scale(${p[y]})">${D.overlay}</g>` : ""}</g>`
    );
  }), v.push(...x);
  let K = v.slice(1).join(""), Q = g;
  if (r && n.diagram) {
    const k = t - 80, y = k - 32, M = n.diagram.height ?? Ne(y * r.height / r.width + 58, 180, 1200), N = M - 58, I = Math.min(
      y / r.width,
      N / r.height
    ), j = 56 + (y - r.width * I) / 2, R = 66 + (N - r.height * I) / 2;
    if (zt(n.diagram.title, y, 16, s).length > 1)
      throw new Error(
        "다이어그램 제목이 너무 깁니다. 제목이나 너비를 조정하세요."
      );
    K = `<g data-diagram="mermaid"><rect x="40" y="20" width="${k}" height="${M}" rx="10" fill="#f3f7fc" stroke="#8093ab" stroke-width="2"/><text x="56" y="48" font-size="16" font-weight="700">${se(n.diagram.title)}</text><g data-diagram-content="mermaid" transform="translate(${j} ${R}) scale(${I})">${r.svg}</g></g><g data-scene="true" transform="translate(0 ${M + 40})">${K}</g>`, Q += M + 40;
  }
  if (i === "phone") {
    const k = Q * 2 + 92;
    return {
      markup: `<rect x="20" y="0" width="${t - 40}" height="${k}" rx="18" fill="white" stroke="#c8d2df" stroke-width="1.6"/><g transform="translate(0 ${(k - Q) / 2})">${K}</g>`,
      height: k
    };
  }
  return r ? {
    markup: `<rect x="20" y="0" width="${t - 40}" height="${Q}" rx="18" fill="white" stroke="#c8d2df" stroke-width="1.6"/>${K}`,
    height: Q
  } : { markup: v.join(""), height: g };
}
const Ir = "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.6.0/cdn/comic-gen.mermaid.js", sn = 2e4, jr = "http://www.w3.org/2000/svg", Pr = Math.random().toString(36).slice(2);
let Br = 0, Fn = Promise.resolve();
const _t = [
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
], _r = new Set(_t), Qr = /* @__PURE__ */ new Set([
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
]), Dr = /* @__PURE__ */ new Set([
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
  ..._t
]);
function Fr(n) {
  if (!n.trim() || n.length > sn)
    throw new Error(`Mermaid 원문은 1~${sn}자여야 합니다.`);
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
function Kr(n) {
  if (typeof n != "string" || !n.trim() || n.length > 300 || /[^\p{L}\p{N}\s,'"_\-]/u.test(n))
    throw new Error("다이어그램에 사용할 올바른 글꼴 이름이 필요합니다.");
  return n;
}
async function Rr(n) {
  const e = document.createElement("iframe");
  e.title = "Mermaid 렌더링", e.tabIndex = -1, e.setAttribute("aria-hidden", "true"), e.style.cssText = "all:initial!important;display:block!important;width:20000px!important;height:20000px!important;border:0!important;", n.append(e);
  const t = e.contentDocument, s = e.contentWindow;
  if (!t?.body || !s)
    throw e.remove(), new Error("Mermaid 격리 문서를 만들지 못했습니다.");
  const i = t.createElement("script");
  i.type = "module", i.src = Ir;
  try {
    return { api: await new Promise((o, a) => {
      const l = window.setTimeout(() => {
        c(), a(new Error("Mermaid 모듈을 불러오는 시간이 초과되었습니다."));
      }, 3e4), c = () => {
        window.clearTimeout(l), i.onload = null, i.onerror = null, s.removeEventListener("comic-gen-mermaid-ready", f), s.removeEventListener("comic-gen-mermaid-error", u);
      }, f = () => {
        c();
        const d = s.__comicGenMermaid;
        typeof d?.initialize != "function" || typeof d?.render != "function" ? a(new Error("Mermaid 모듈을 불러오지 못했습니다.")) : o(d);
      }, u = () => {
        c(), a(new Error("Mermaid 모듈을 불러오지 못했습니다."));
      };
      s.addEventListener("comic-gen-mermaid-ready", f), s.addEventListener("comic-gen-mermaid-error", u), i.onload = () => {
        s.__comicGenMermaid && f();
      }, i.onerror = u, t.head.append(i);
    }), document: t, dispose: () => e.remove() };
  } catch (r) {
    throw e.remove(), r;
  }
}
function Qs(n) {
  const e = new DOMParser().parseFromString(n, "image/svg+xml");
  if (e.querySelector("parsererror") || e.documentElement.localName !== "svg")
    throw new Error("Mermaid가 올바른 SVG를 만들지 못했습니다.");
  return e.documentElement;
}
function xt(n, e, t = !1) {
  let s = !0;
  const i = n.replace(
    /url\(\s*(["']?)(.*?)\1\s*\)/gi,
    (r, o, a) => {
      let l = a.trim();
      if (t && !l.startsWith("#")) {
        const c = l.lastIndexOf("#");
        l = c >= 0 ? l.slice(c) : "";
      }
      return !l.startsWith("#") || !e.has(l.slice(1)) ? (s = !1, "") : `url(${l})`;
    }
  );
  return /url\s*\(/i.test(i.replace(/url\(#[^)]*\)/g, "")) && (s = !1), s ? i : void 0;
}
function Ds(n, e) {
  const t = document.createElement("span").style;
  for (const s of _t) {
    const i = xt(n.getPropertyValue(s), e);
    i && t.setProperty(s, i, n.getPropertyPriority(s));
  }
  return n.getPropertyValue("display") === "none" && (t.display = "none"), t.cssText;
}
function qr(n) {
  const e = [];
  let t = 0, s = 0, i = "";
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    i ? o === i && n[r - 1] !== "\\" && (i = "") : o === "'" || o === '"' ? i = o : o === "(" || o === "[" ? s++ : o === ")" || o === "]" ? s-- : o === "," && s === 0 && (e.push(n.slice(t, r).trim()), t = r + 1);
  }
  return e.push(n.slice(t).trim()), e;
}
function Vr(n, e, t) {
  const s = new CSSStyleSheet();
  s.replaceSync(n);
  const i = [], r = `#${e}`;
  for (const o of s.cssRules) {
    if (!(o instanceof CSSStyleRule)) continue;
    if (!qr(o.selectorText).every(
      (c) => c === r || c.startsWith(r + " ") || c.startsWith(r + ">") || c.startsWith(r + ":")
    )) throw new Error("Mermaid SVG에 범위 밖 스타일이 있습니다.");
    const l = Ds(o.style, t);
    l && i.push(`${o.selectorText}{${l}}`);
  }
  return i.join(`
`);
}
function Ur(n) {
  if (n.length > 2e6)
    throw new Error("Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요.");
  const e = Qs(n), t = [e, ...e.querySelectorAll("*")];
  if (t.length > 1e4)
    throw new Error(
      "Mermaid SVG 요소가 너무 많습니다. 다이어그램을 나누어 주세요."
    );
  const s = new Set(t.map((r) => r.id).filter(Boolean)), i = e.id;
  for (const r of t)
    for (const o of [...r.attributes])
      if (/url\s*\(/i.test(o.value)) {
        const a = xt(o.value, s, !0);
        a === void 0 ? r.removeAttributeNode(o) : r.setAttribute(o.name, a);
      }
  for (const r of t) {
    const o = r.localName.toLowerCase();
    if (r.namespaceURI !== jr || !Qr.has(o) && o !== "style") {
      o === "a" ? r.replaceWith(...r.childNodes) : r.remove();
      continue;
    }
    if (o === "style") {
      r.textContent = Vr(r.textContent ?? "", i, s);
      continue;
    }
    for (const a of [...r.attributes]) {
      const l = a.name.toLowerCase(), c = a.value;
      if (!Dr.has(l) && !l.startsWith("aria-") && !l.startsWith("data-"))
        r.removeAttributeNode(a);
      else if (l === "href" || l === "xlink:href")
        (!c.startsWith("#") || !s.has(c.slice(1))) && r.removeAttributeNode(a);
      else if (l === "style") {
        const f = document.createElement("span").style;
        f.cssText = c, r.setAttribute("style", Ds(f, s));
      } else if (_r.has(l)) {
        const f = xt(c, s);
        f === void 0 ? r.removeAttributeNode(a) : r.setAttribute(a.name, f);
      }
    }
  }
  return e;
}
function Hr(n) {
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
function Gr(n) {
  const e = (n.getAttribute("viewBox") ?? "").trim().split(/[\s,]+/).map(Number), t = e.length === 4 ? e[2] : Number.parseFloat(n.getAttribute("width") ?? ""), s = e.length === 4 ? e[3] : Number.parseFloat(n.getAttribute("height") ?? "");
  if (!Number.isFinite(t) || !Number.isFinite(s) || t <= 0 || s <= 0 || t > 2e4 || s > 2e4 || t * s > 16e7)
    throw new Error(
      "Mermaid 다이어그램 크기가 너무 큽니다. 다이어그램을 나누어 주세요."
    );
  return (e.length !== 4 || e.some((i) => !Number.isFinite(i))) && n.setAttribute("viewBox", `0 0 ${t} ${s}`), n.setAttribute("width", String(t)), n.setAttribute("height", String(s)), n.setAttribute("preserveAspectRatio", "xMidYMid meet"), { width: t, height: s };
}
async function zr(n, e) {
  if (typeof document > "u" || !document.body)
    throw new Error("Mermaid 렌더링에는 브라우저 문서가 필요합니다.");
  Fr(n), e = Kr(e);
  const t = Fn.then(async () => {
    await Promise.all([
      document.fonts.load(`18px ${e}`, n),
      document.fonts.load(`bold 18px ${e}`, n),
      document.fonts.load(`italic 18px ${e}`, n)
    ]), await document.fonts.ready;
    const s = `comic-gen-mermaid-${Pr}-${++Br}`, i = document.createElement("div");
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
      o = await Rr(i);
      for (const b of r) o.document.fonts.add(b);
      a = o.document.createElement("div"), a.style.cssText = "width:20000px;", o.document.body.append(a), l.observe(a, { childList: !0, subtree: !0 });
      const c = o.api;
      c.initialize({
        startOnLoad: !1,
        securityLevel: "sandbox",
        suppressErrorRendering: !0,
        maxTextSize: sn,
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
      const f = await c.render(s, n, a);
      l.disconnect();
      const u = Ur(Hr(f.svg)), d = Gr(u), p = i.attachShadow({ mode: "closed" });
      p.append(document.importNode(u, !0));
      const m = p.firstElementChild, h = [m, ...m.querySelectorAll("*")], g = new Set(
        h.map((b) => b.id).filter(Boolean)
      ), w = h.map((b) => {
        if (b.localName === "style") return "";
        const $ = getComputedStyle(b), E = document.createElement("span").style;
        for (const x of _t) {
          const T = xt(
            $.getPropertyValue(x),
            g,
            !0
          );
          T && E.setProperty(x, T, "important");
        }
        return $.display === "none" && E.setProperty("display", "none", "important"), E.cssText;
      });
      h.forEach((b, $) => {
        b.localName === "style" ? b.remove() : (b.setAttribute("style", w[$]), b.removeAttribute("class"));
      }), m.style.removeProperty("visibility"), m.style.setProperty("width", `${d.width}px`, "important"), m.style.setProperty("height", `${d.height}px`, "important"), m.style.setProperty("max-width", "none", "important"), m.style.setProperty("max-height", "none", "important");
      const v = new XMLSerializer().serializeToString(m);
      if (v.length > 2e6)
        throw new Error(
          "Mermaid SVG가 너무 큽니다. 다이어그램을 나누어 주세요."
        );
      return { svg: v, ...d };
    } finally {
      l.disconnect(), o?.document.getElementById(s)?.remove(), o?.document.getElementById(`d${s}`)?.remove(), o?.document.getElementById(`i${s}`)?.remove(), o?.dispose(), i.remove();
    }
  });
  return Fn = t.catch(() => {
  }), t;
}
function Yr(n, e) {
  if (!/^[A-Za-z][A-Za-z0-9_-]{0,120}$/.test(e))
    throw new Error("다이어그램 SVG 식별자 접두사가 올바르지 않습니다.");
  const t = Qs(n.svg), s = [t, ...t.querySelectorAll("*")], i = /* @__PURE__ */ new Map();
  let r = 0;
  const o = (a) => {
    const l = a.localName === "svg" ? a : a.closest("svg");
    let c = i.get(l);
    return c || (c = /* @__PURE__ */ new Map(), i.set(l, c)), c;
  };
  for (const a of s) {
    if (!a.id) continue;
    const l = o(a);
    if (l.has(a.id))
      throw new Error("다이어그램 SVG 식별자가 중복됩니다.");
    l.set(a.id, `${e}-${r++}`);
  }
  for (const a of s) {
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
let Fs = 0, Wr = 0;
document.fonts.addEventListener("loadingdone", (n) => {
  n.fontfaces.length && Fs++;
});
function Ks(n, e, t) {
  e = Sr(e);
  const s = xr(n), i = e.width ?? 720, r = e.panelFormat ?? t;
  if (r !== "compact" && r !== "phone")
    throw new Error("컷비율은 기본 또는 모바일이어야 합니다.");
  if (!Number.isFinite(i) || i < 480 || i > 2400)
    throw new Error("너비는 480~2400 사이여야 합니다.");
  const o = e.font ?? "Malgun Gothic, Apple SD Gothic Neo, sans-serif";
  if (typeof o != "string" || o.length > 300 || /[<>]/.test(o))
    throw new Error("올바른 글꼴 이름이 필요합니다.");
  return { comic: s, options: e, width: i, font: o, format: r };
}
function Rs(n, e) {
  const { comic: t, width: s, font: i, options: r, format: o } = e;
  return JSON.stringify({
    panel: n,
    members: n.actors.map((a) => {
      const { asset: l, label: c, appearance: f } = t.cast[a.id];
      return [
        a.id,
        { asset: l, label: c, ...f ? { appearance: f } : {} }
      ];
    }),
    width: s,
    font: i,
    fontEpoch: Fs,
    fontVersion: r.fontVersion,
    assetVersion: oi,
    layoutVersion: n.diagram ? 3 : 2,
    format: o
  });
}
function qs(n) {
  return {
    svg: "",
    width: 0,
    height: 0,
    diagnostics: [n instanceof Error ? n.message : "렌더링 실패"],
    panels: []
  };
}
function Vs(n, e, t) {
  const { comic: s, width: i, font: r } = n, o = [], a = [], l = `cg-${Date.now().toString(36)}-${++Wr}-${Math.random().toString(36).slice(2, 9)}`, c = (u, d, p) => `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${d}" viewBox="0 0 ${i} ${d}" role="img" aria-label="${se(p)}"><title>${se(p)}</title><rect width="100%" height="100%" fill="#f5f7fb"/><g font-family="${se(r)}" fill="#303341"><text x="24" y="42" font-size="24" font-weight="700">${se(p)}</text>${u}</g></svg>`;
  let f = 68;
  for (const [u, d] of e.entries()) {
    const { markup: p, height: m, hit: h } = d, g = (w) => s.panels[u].diagram ? Yr(
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${m}" viewBox="0 0 ${i} ${m}" style="width:${i}px!important;height:${m}px!important;max-width:none!important;max-height:none!important">${p}</svg>`
      },
      `${l}-${w}-${u}`
    ) : p;
    o.push(
      `<g data-panel="${u}" transform="translate(0 ${f})">${g("whole")}</g>`
    ), a.push({
      index: u,
      svg: c(
        `<g data-panel="${u}" transform="translate(0 68)">${g("panel")}</g>`,
        m + 92,
        `${s.title} · ${u + 1}/${s.panels.length}`
      ),
      width: i,
      height: m + 92,
      diagnostics: [],
      cache: { hits: h ? 1 : 0, misses: h ? 0 : 1, bytes: t.bytes }
    }), f += m + 24;
  }
  return {
    svg: c(o.join(""), f, s.title),
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
function Kn(n, e, t, s = "compact") {
  try {
    const i = Ks(n, e, s), r = i.comic.panels.findIndex(
      (a) => a.diagram
    );
    if (r >= 0)
      throw new Error(
        `컷 ${r + 1}.다이어그램: 만화그리기비동기(renderComicAsync) 또는 컷그리기비동기(renderPanelsAsync)를 await로 호출하세요.`
      );
    const o = i.comic.panels.map((a) => {
      const l = Rs(a, i), c = t.get(l), f = c ?? _s(
        a,
        i.comic.cast,
        i.width,
        i.font,
        i.format
      );
      return c || t.set(l, f), { ...f, hit: !!c };
    });
    return Vs(i, o, t);
  } catch (i) {
    return qs(i);
  }
}
async function Rn(n, e, t, s = "compact") {
  try {
    const i = Ks(n, e, s);
    i.comic.panels.some((o) => o.diagram) && await document.fonts.ready;
    const r = [];
    for (const [o, a] of i.comic.panels.entries()) {
      const l = Rs(a, i), c = t.get(l);
      if (c) {
        r.push({ ...c, hit: !0 });
        continue;
      }
      let f;
      if (a.diagram)
        try {
          f = await zr(a.diagram.source, i.font);
        } catch (d) {
          throw new Error(
            `컷 ${o + 1}.다이어그램: ${d instanceof Error ? d.message : "Mermaid 렌더링 실패"}`
          );
        }
      const u = _s(
        a,
        i.comic.cast,
        i.width,
        i.font,
        i.format,
        f
      );
      t.set(l, u), r.push({ ...u, hit: !1 });
    }
    return Vs(i, r, t);
  } catch (i) {
    return qs(i);
  }
}
function Us(n = 2e6) {
  const e = new fi(n);
  return {
    render: (t, s = {}) => Kn(t, s, e),
    renderPanels: (t, s = {}) => Kn(t, s, e, "phone"),
    renderAsync: (t, s = {}) => Rn(t, s, e),
    renderPanelsAsync: (t, s = {}) => Rn(t, s, e, "phone"),
    clearCache: () => e.clear()
  };
}
const Qt = Us(), io = Qt.render, ro = Qt.renderPanels, oo = Qt.renderAsync, ao = Qt.renderPanelsAsync;
function co(n, e) {
  const t = URL.createObjectURL(n), s = document.createElement("a");
  s.href = t, s.download = e, s.click(), setTimeout(() => URL.revokeObjectURL(t), 1e3);
}
async function lo(n, e = 1) {
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
      (l, c) => o.toBlob(
        (f) => f ? l(f) : c(new Error("PNG 생성에 실패했습니다.")),
        "image/png"
      )
    );
  } finally {
    URL.revokeObjectURL(i);
  }
}
const Jr = `
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
function qn(n, e = 0) {
  return [...n.querySelectorAll("g[data-panel]")].map((t, s) => {
    if (t.getAttribute("data-panel") !== String(s + e))
      throw new TypeError("만화의 컷 순서가 올바르지 않습니다.");
    const i = t.querySelector("rect");
    if (!i) throw new TypeError("만화에 컷 프레임이 없습니다.");
    let r = new DOMMatrix();
    for (let p = i; p && p !== n.documentElement; p = p.parentElement) {
      let m = new DOMMatrix();
      const h = p.getAttribute("transform") ?? "", g = /(matrix|translate|scale|rotate|skewX|skewY)\(([^)]*)\)/g;
      let w = h;
      for (const v of h.matchAll(g)) {
        const b = v[2].trim().split(/[\s,]+/).map(Number);
        if (!b.length || b.some((T) => !Number.isFinite(T)))
          throw new TypeError("만화의 컷 변환이 올바르지 않습니다.");
        const [$, E = 0, x = 0] = b;
        switch (v[1]) {
          case "matrix":
            if (b.length !== 6)
              throw new TypeError("올바른 컷 행렬이 필요합니다.");
            m = m.multiply(new DOMMatrix(b));
            break;
          case "translate":
            m = m.translate($, E);
            break;
          case "scale":
            m = m.scale($, b[1] ?? $);
            break;
          case "rotate":
            m = m.translate(E, x).rotate($).translate(-E, -x);
            break;
          case "skewX":
            m = m.skewX($);
            break;
          case "skewY":
            m = m.skewY($);
            break;
        }
        w = w.replace(v[0], "");
      }
      if (w.trim()) throw new TypeError("지원하지 않는 컷 변환입니다.");
      r = m.multiply(r);
    }
    const o = Number(i.getAttribute("x") ?? 0), a = Number(i.getAttribute("y") ?? 0), l = Number(i.getAttribute("width")), c = Number(i.getAttribute("height"));
    if (![o, a, l, c].every(Number.isFinite) || l <= 0 || c <= 0)
      throw new TypeError("만화의 컷 크기가 올바르지 않습니다.");
    const f = [
      [o, a],
      [o + l, a],
      [o, a + c],
      [o + l, a + c]
    ].map(([p, m]) => r.transformPoint(new DOMPoint(p, m))), u = Math.min(...f.map((p) => p.x)), d = Math.min(...f.map((p) => p.y));
    return {
      x: u,
      y: d,
      width: Math.max(...f.map((p) => p.x)) - u,
      height: Math.max(...f.map((p) => p.y)) - d
    };
  });
}
function Zr(n, e, t, s, i, r, o, a) {
  let l = 0, c = !1, f = 0;
  const u = () => {
    const y = n.getBoundingClientRect(), M = getComputedStyle(n);
    return {
      x: y.x + n.clientLeft + (parseFloat(M.paddingLeft) || 0),
      y: y.y + n.clientTop + (parseFloat(M.paddingTop) || 0)
    };
  }, d = () => {
    const y = e.getBoundingClientRect(), M = y.width / s;
    return t.map((N) => ({
      x: y.x + N.x * M,
      y: y.y + N.y * M,
      width: N.width * M,
      height: N.height * M
    }));
  };
  let p = 0;
  const m = () => {
    i.disabled = l === 0, r.disabled = l === t.length - 1, (document.activeElement === i && i.disabled || document.activeElement === r && r.disabled) && n.focus();
    const y = `${l + 1} / ${t.length}컷`;
    o.textContent !== y && (o.textContent = y), p !== l && (p = l, a?.());
  }, h = () => {
    if (c) return;
    if (n.scrollLeft === 0 && n.scrollTop === 0) {
      l = 0, m();
      return;
    }
    const y = u(), M = n.clientWidth - (parseFloat(getComputedStyle(n).paddingLeft) || 0) - (parseFloat(getComputedStyle(n).paddingRight) || 0), N = n.clientHeight - (parseFloat(getComputedStyle(n).paddingTop) || 0) - (parseFloat(getComputedStyle(n).paddingBottom) || 0), I = d(), j = I[I.length - 1];
    if (n.scrollLeft + n.clientWidth >= n.scrollWidth - 1 && n.scrollTop + n.clientHeight >= n.scrollHeight - 1 && j.x < y.x + M && j.x + j.width > y.x && j.y < y.y + N && j.y + j.height > y.y) {
      l = t.length - 1, m();
      return;
    }
    let R = -1, z = 1 / 0;
    I.forEach((D, J) => {
      const Y = Math.max(
        0,
        Math.min(D.x + D.width, y.x + M) - Math.max(D.x, y.x)
      ) * Math.max(
        0,
        Math.min(D.y + D.height, y.y + N) - Math.max(D.y, y.y)
      ), te = Math.hypot(
        Math.max(D.x - y.x, 0, y.x - D.x - D.width),
        Math.max(D.y - y.y, 0, y.y - D.y - D.height)
      );
      (Y > R || Y === R && te < z) && (R = Y, z = te, l = J);
    }), m();
  }, g = () => {
    cancelAnimationFrame(f), c = !0;
    const y = n.scrollLeft, M = n.scrollTop;
    f = requestAnimationFrame(() => {
      f = requestAnimationFrame(() => {
        c = !1, (n.scrollLeft !== y || n.scrollTop !== M) && h();
      });
    });
  }, w = (y, M = l) => {
    if (l = Math.max(0, Math.min(t.length - 1, M + y)), l === M) {
      m();
      return;
    }
    const N = d()[l], I = u();
    n.scrollTo({
      left: n.scrollLeft + N.x - I.x,
      top: n.scrollTop + N.y - I.y,
      behavior: "instant"
    }), g(), m();
  }, v = () => w(-1), b = () => w(1), $ = (y) => {
    y.target !== n || y.altKey || y.ctrlKey || y.metaKey || y.shiftKey || (y.key === "ArrowLeft" || y.key === "ArrowRight") && (y.preventDefault(), w(y.key === "ArrowLeft" ? -1 : 1));
  }, E = /* @__PURE__ */ new Set();
  let x, T = !1;
  const L = (y) => {
    if (E.add(y.pointerId), T = !1, E.size !== 1 || !y.isPrimary || y.button !== 0) {
      x = void 0;
      return;
    }
    x = {
      id: y.pointerId,
      x: y.clientX,
      y: y.clientY,
      moved: !1
    };
  }, B = (y) => {
    x?.id === y.pointerId && Math.hypot(y.clientX - x.x, y.clientY - x.y) > 8 && (x.moved = !0);
  }, G = (y) => {
    T = E.size === 1 && x?.id === y.pointerId && !x.moved, E.delete(y.pointerId), x = void 0;
  }, K = (y) => {
    y ? E.delete(y.pointerId) : E.clear(), x = void 0, T = !1;
  }, Q = (y) => {
    const M = T;
    if (T = !1, !M || y.detail > 1 || y.ctrlKey || y.metaKey || y.altKey || y.shiftKey || y.target !== e)
      return;
    const N = d(), I = N.findIndex(
      (j) => y.clientX >= j.x && y.clientX <= j.x + j.width && y.clientY >= j.y && y.clientY <= j.y + j.height
    );
    I >= 0 && (n.focus({ preventScroll: !0 }), w(
      y.clientX < N[I].x + N[I].width / 2 ? -1 : 1,
      I
    ));
  }, k = (y) => {
    n.contains(y.target) || K(y);
  };
  return e.draggable = !1, i.addEventListener("click", v), r.addEventListener("click", b), n.addEventListener("scroll", h), n.addEventListener("keydown", $), n.addEventListener("pointerdown", L), n.addEventListener("pointermove", B), n.addEventListener("pointerup", G), n.addEventListener("pointercancel", K), n.addEventListener("click", Q), document.addEventListener("pointerup", k), document.addEventListener("pointercancel", k), m(), {
    get currentIndex() {
      return l;
    },
    goTo: (y) => w(y - l),
    capturePosition: () => {
      const y = u(), M = e.getBoundingClientRect(), N = M.width / s;
      return { x: (y.x - M.x) / N, y: (y.y - M.y) / N };
    },
    restorePosition: (y) => {
      const M = n.scrollLeft, N = n.scrollTop, I = e.getBoundingClientRect(), j = u(), R = I.width / s;
      n.scrollTo({
        left: n.scrollLeft + I.x + y.x * R - j.x,
        top: n.scrollTop + I.y + y.y * R - j.y,
        behavior: "instant"
      }), (n.scrollLeft !== M || n.scrollTop !== N) && g(), m();
    },
    reset: () => {
      cancelAnimationFrame(f), c = !1, l = 0, K(), m();
    },
    dispose: () => {
      cancelAnimationFrame(f), i.removeEventListener("click", v), r.removeEventListener("click", b), n.removeEventListener("scroll", h), n.removeEventListener("keydown", $), n.removeEventListener("pointerdown", L), n.removeEventListener("pointermove", B), n.removeEventListener("pointerup", G), n.removeEventListener("pointercancel", K), n.removeEventListener("click", Q), document.removeEventListener("pointerup", k), document.removeEventListener("pointercancel", k), K();
    }
  };
}
const Xr = `
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
`, Vn = "http://www.w3.org/2000/svg", Un = /^#[\p{L}_][\p{L}\p{N}_:.-]*$/u, eo = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "filter",
  "mask",
  "clip-path",
  "marker-start",
  "marker-mid",
  "marker-end",
  "cursor"
]), to = /* @__PURE__ */ new Set([
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
function Hn(n) {
  if (!n || typeof n.svg != "string" || !n.svg || n.svg.length > 64e6 || !Number.isFinite(n.width) || n.width <= 0 || n.width > 1e6 || !Number.isFinite(n.height) || n.height <= 0 || n.height > 1e6 || n.diagnostics !== void 0 && (!Array.isArray(n.diagnostics) || n.diagnostics.length))
    throw new TypeError("완성된 코믹젠 렌더 결과가 필요합니다.");
  if (/<!DOCTYPE|<!ENTITY|<\?/i.test(n.svg))
    throw new TypeError("정적 코믹젠 SVG만 뷰어에 전달하세요.");
  const e = new DOMParser().parseFromString(n.svg, "image/svg+xml"), t = e.documentElement, s = (t.getAttribute("viewBox") ?? `0 0 ${n.width} ${n.height}`).trim().split(/[\s,]+/).map(Number);
  if (t.localName !== "svg" || t.namespaceURI !== Vn || e.querySelector("parsererror") || s.length !== 4 || s[0] !== 0 || s[1] !== 0 || s[2] !== n.width || s[3] !== n.height || Number(t.getAttribute("width")) !== n.width || Number(t.getAttribute("height")) !== n.height)
    throw new TypeError("만화 SVG와 렌더 결과의 크기가 일치해야 합니다.");
  for (const i of [t, ...t.querySelectorAll("*")]) {
    if (i.namespaceURI !== Vn || !to.has(i.localName))
      throw new TypeError("외부 리소스나 실행 가능한 SVG는 지원하지 않습니다.");
    for (const r of i.attributes) {
      const o = r.localName.toLowerCase(), a = r.value;
      if (o.startsWith("on") || o === "base" && r.namespaceURI === "http://www.w3.org/XML/1998/namespace" || o === "href" && !Un.test(a))
        throw new TypeError(
          "외부 링크나 이벤트가 포함된 SVG는 지원하지 않습니다."
        );
      if (o === "style" && /@|javascript\s*:|vbscript\s*:|expression\s*\(|[\\<>]/i.test(a))
        throw new TypeError("정적 코믹젠 SVG 스타일만 지원합니다.");
      if (eo.has(o) && /[\\<>@]/.test(a))
        throw new TypeError("정적 코믹젠 SVG 색상과 참조만 지원합니다.");
      for (const l of a.matchAll(/url\s*\(([^)]*)\)/gi)) {
        const c = l[1].trim().replace(/^(['"])(.*)\1$/, "$2");
        if (!Un.test(c))
          throw new TypeError("SVG의 외부 리소스는 지원하지 않습니다.");
      }
    }
  }
  return e;
}
function Hs(n) {
  const e = Hn(n);
  if (!Array.isArray(n.panels) || n.panels.length < 1 || n.panels.length > 30)
    throw new TypeError("만화에는 실제 렌더된 1~30개의 컷이 필요합니다.");
  const t = [], s = n.panels.map((a, l) => {
    if (a.index !== l)
      throw new TypeError("만화의 개별 컷 순서가 일치해야 합니다.");
    const c = qn(Hn(a), l);
    if (c.length !== 1 || ![c[0].x, c[0].y, c[0].width, c[0].height].every(
      Number.isFinite
    ) || c[0].width <= 0 || c[0].height <= 0 || c[0].x < 0 || c[0].y < 0 || c[0].x + c[0].width > a.width + 1 || c[0].y + c[0].height > a.height + 1)
      throw new TypeError("개별 컷 SVG에는 한 개의 컷 프레임이 필요합니다.");
    return t.push(c[0]), { ...a };
  }), i = qn(e);
  if (i.length !== s.length || i.some(
    (a) => ![a.x, a.y, a.width, a.height].every(Number.isFinite) || a.width <= 0 || a.height <= 0 || a.x < 0 || a.y < 0 || a.x + a.width > n.width + 1 || a.y + a.height > n.height + 1
  ))
    throw new TypeError("만화의 컷 프레임과 렌더 결과가 일치해야 합니다.");
  const r = e.documentElement.getAttribute("aria-label") ?? e.documentElement.querySelector("title")?.textContent ?? "만화", o = s.map((a, l) => {
    const c = i[l], f = t[l], u = Math.max(
      c.width / f.width,
      c.height / f.height
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
const Yt = /* @__PURE__ */ Symbol.for("comic-gen.viewer.document-state.v1");
function Sn() {
  const n = document;
  return n[Yt] || Object.defineProperty(n, Yt, {
    value: { bodyLocks: /* @__PURE__ */ new WeakMap(), nextId: 0 }
  }), n[Yt];
}
function Gs() {
  const n = Sn();
  let e = n.styles;
  if (e)
    e.element.isConnected || document.head.append(e.element);
  else {
    const s = document.createElement("style");
    s.dataset.comicGenViewerStyles = "", s.textContent = Xr, document.head.append(s), e = { element: s, count: 0 }, n.styles = e;
  }
  e.count++;
  let t = !1;
  return () => {
    t || (t = !0, --e.count === 0 && (e.element.remove(), n.styles = void 0));
  };
}
function no() {
  const n = Sn().bodyLocks, e = document.body;
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
function zs(n, e, t, s) {
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
function Ys(n = {}) {
  n = { ...n };
  let e = {}, t;
  const s = (S, O) => {
    if (S.zoom !== void 0 && (!Number.isFinite(S.zoom) || S.zoom <= 0 || S.zoom > 10))
      throw new RangeError("zoom must be greater than 0 and at most 10.");
    if (S.panelIndex !== void 0 && (!Number.isInteger(S.panelIndex) || S.panelIndex < 0 || O !== void 0 && S.panelIndex >= O))
      throw new RangeError("panelIndex must identify an existing panel.");
    if (S.preventOverflow !== void 0 && typeof S.preventOverflow != "boolean")
      throw new TypeError("preventOverflow must be a boolean.");
  }, i = (S, O) => {
    s(S, O);
    for (const A of [
      "closeOnBackdrop",
      "closeOnEmptyArea",
      "closeOnEscape",
      "showCloseButton"
    ])
      if (S[A] !== void 0 && typeof S[A] != "boolean")
        throw new TypeError(`${A} must be a boolean.`);
    if (S.onChange !== void 0 && typeof S.onChange != "function")
      throw new TypeError("onChange must be a function.");
  };
  i(n);
  const r = () => f?.open && b ? Object.freeze({
    zoom: Number(m.value),
    preventOverflow: h.checked,
    panelIndex: $?.currentIndex ?? 0
  }) : null;
  let o, a = !1;
  const l = () => {
    if (a) return;
    const S = r(), O = JSON.stringify(S);
    O !== o && (o = O, e.onChange?.(S));
  }, c = (S) => {
    const O = String(S);
    if (![...m.options].some((A) => A.value === O)) {
      const A = document.createElement("option");
      A.value = O, A.textContent = `${Math.round(S * 100)}%`, A.dataset.customZoom = "", m.append(A);
    }
    m.value = O;
  };
  let f, u, d, p, m, h, g, w, v, b, $, E, x, T, L, B, G = !1;
  const K = () => {
    if (!f?.open || !b) return;
    const S = $?.capturePosition();
    u.dataset.preventOverflow = String(h.checked);
    const O = b.result;
    let A = O.width * Number(m.value);
    if (h.checked) {
      const _ = getComputedStyle(u), q = Math.max(
        0,
        u.clientWidth - (parseFloat(_.paddingLeft) || 0) - (parseFloat(_.paddingRight) || 0)
      ), W = Math.max(
        0,
        u.clientHeight - (parseFloat(_.paddingTop) || 0) - (parseFloat(_.paddingBottom) || 0)
      );
      A = Math.min(
        A,
        q * O.width / b.panelWidth,
        W * O.width / b.panelHeight
      );
    }
    d.style.width = `${Math.max(0, A)}px`, S && Number.isFinite(S.x) && Number.isFinite(S.y) && $?.restorePosition(S);
  }, Q = () => {
    $?.dispose(), $ = void 0, x?.(), x = void 0, d?.replaceChildren(), b = void 0, T?.(), T = void 0;
    const S = o !== void 0 && o !== "null", O = B;
    B = void 0;
    const A = [
      ...document.querySelectorAll("dialog[open]")
    ].find((_) => _ !== f);
    O?.isConnected && (!A || A.contains(O)) && O.focus({ preventScroll: !0 }), S && l();
  }, k = () => {
    f?.open && f.close(), Q();
  }, y = (S) => {
    S.preventDefault(), e.closeOnEscape !== !1 && k();
  }, M = () => {
    f?.open || Q();
  };
  let N = !1, I;
  const j = (S) => {
    if (S.target !== f) return !1;
    const O = f.getBoundingClientRect();
    return S.clientX < O.left || S.clientX > O.right || S.clientY < O.top || S.clientY > O.bottom;
  }, R = (S) => {
    if (S.target !== u) return !1;
    const O = u.getBoundingClientRect();
    return S.clientX >= O.left + u.clientLeft && S.clientX < O.left + u.clientLeft + u.clientWidth && S.clientY >= O.top + u.clientTop && S.clientY < O.top + u.clientTop + u.clientHeight;
  }, z = (S) => {
    I = S.button === 0 && S.isPrimary && R(S) ? { x: S.clientX, y: S.clientY } : void 0, N = S.button === 0 && j(S);
  }, D = (S) => {
    const O = N && j(S) && e.closeOnBackdrop === !0 || !!(I && R(S) && e.closeOnEmptyArea === !0 && Math.hypot(S.clientX - I.x, S.clientY - I.y) <= 8);
    I = void 0, N = !1, O && k();
  }, J = () => {
    K(), l();
  }, Y = (S) => {
    if (S.key !== "Tab" || !f?.open) return;
    const A = [
      ...f.querySelectorAll(
        "button:not(:disabled), input, select, [tabindex='0']"
      )
    ].filter((W) => !W.hidden), _ = A[0], q = A[A.length - 1];
    (!S.shiftKey && document.activeElement === q || S.shiftKey && document.activeElement === _) && (S.preventDefault(), (S.shiftKey ? q : _).focus());
  }, te = () => {
    if (f) return;
    L = Gs();
    const S = `comic-gen-viewer-${++Sn().nextId}`;
    f = document.createElement("dialog"), f.className = "comic-viewer", f.dataset.comicGenViewer = "", f.setAttribute("aria-labelledby", `${S}-title`), f.setAttribute("aria-describedby", `${S}-help`), f.innerHTML = `<div class="comic-viewer-toolbar"><h2 class="comic-viewer-title" id="${S}-title"></h2><button type="button" autofocus>닫기</button><div class="comic-viewer-controls"><label class="comic-viewer-checkbox"><input type="checkbox" checked>화면 넘침 방지</label><label>보기 크기 <select><option value="1">100%</option><option value="1.5">150%</option><option value="2">200%</option></select></label><div class="comic-viewer-navigation"><button type="button" class="comic-previous" aria-label="이전 컷">←</button><span class="comic-position" role="status" aria-live="polite"></span><button type="button" class="comic-next" aria-label="다음 컷">→</button></div></div></div><p class="comic-viewer-help" id="${S}-help">화면 넘침 방지는 한 컷의 너비·높이를 화면에 맞춥니다. 다음 컷은 아래로 스크롤해 읽습니다. 컷 왼쪽은 이전, 오른쪽은 다음 컷입니다. 읽기 영역에서 ←/→ 키로도 이동합니다.</p><div class="comic-viewer-viewport" tabindex="0" role="region" aria-label="만화 읽기 영역"><div class="comic-viewer-artwork"></div></div>`, p = f.querySelector("h2"), u = f.querySelector(".comic-viewer-viewport"), d = f.querySelector(".comic-viewer-artwork"), m = f.querySelector("select"), h = f.querySelector('input[type="checkbox"]'), g = f.querySelector(".comic-previous"), w = f.querySelector(".comic-next"), v = f.querySelector(".comic-position"), t = f.querySelector("button"), m.addEventListener("change", J), h.addEventListener("change", J), f.querySelector("button").addEventListener("click", k), f.addEventListener("pointerdown", z), f.addEventListener("click", D), f.addEventListener("cancel", y), f.addEventListener("close", M), f.addEventListener("keydown", Y), document.body.append(f), E = new ResizeObserver(K), E.observe(u);
  };
  return {
    get isOpen() {
      return !!f?.open;
    },
    get state() {
      return r();
    },
    setView: (S) => {
      if (!f?.open || !b)
        throw new Error("Open the viewer before setting its view.");
      s(S, b.result.panels.length), a = !0, S.zoom !== void 0 && c(S.zoom), S.preventOverflow !== void 0 && (h.checked = S.preventOverflow), K(), S.panelIndex !== void 0 && $?.goTo(S.panelIndex), a = !1, l();
    },
    open: (S, O = {}) => {
      if (G) throw new Error("폐기한 만화 뷰어는 다시 열 수 없습니다.");
      const A = Hs(S), _ = { ...n, ...O };
      i(_, A.result.panels.length);
      const q = _.trigger ?? (f?.open ? B : document.activeElement instanceof HTMLElement ? document.activeElement : void 0);
      te(), $?.dispose(), x?.(), a = !0, e = _, o = void 0, N = !1, I = void 0, b = A, B = q, p.textContent = A.title, m.querySelectorAll("[data-custom-zoom]").forEach((P) => P.remove()), c(_.zoom ?? 1), h.checked = _.preventOverflow ?? !0, t.hidden = _.showCloseButton === !1;
      const W = zs(
        A.result.svg,
        A.result.width,
        A.result.height,
        A.title
      );
      if (x = W.revoke, d.replaceChildren(W.image), $ = Zr(
        u,
        W.image,
        A.bounds,
        A.result.width,
        g,
        w,
        v,
        l
      ), !f.open) {
        T = no();
        try {
          f.showModal();
        } catch (P) {
          throw a = !1, Q(), P;
        }
      }
      K(), u.scrollTo(0, 0), $.reset(), $.goTo(_.panelIndex ?? 0), (t.hidden ? u : t).focus({
        preventScroll: !0
      }), a = !1, l();
    },
    close: k,
    destroy: () => {
      G || (G = !0, k(), E?.disconnect(), f && (m.removeEventListener("change", J), h.removeEventListener("change", J), f.querySelector("button").removeEventListener("click", k), f.removeEventListener("pointerdown", z), f.removeEventListener("click", D), f.removeEventListener("cancel", y), f.removeEventListener("close", M), f.removeEventListener("keydown", Y), f.remove()), L?.(), L = void 0);
    }
  };
}
function fo(n, e, t = {}) {
  const s = Hs(e), i = Gs(), r = Ys(t), o = document.createElement("button");
  o.type = "button", o.className = "comic-card", o.dataset.comicGenCard = "", o.setAttribute("aria-haspopup", "dialog"), o.setAttribute("aria-label", `${s.title} · 만화 읽기`);
  const a = document.createElement("span");
  a.className = "comic-card-thumbnail", a.setAttribute("aria-hidden", "true");
  const l = s.result.panels[0], c = zs(
    l.svg,
    l.width,
    l.height,
    `${s.title} · 1/${s.result.panels.length}`
  );
  a.append(c.image);
  const f = document.createElement("span");
  f.className = "comic-card-copy";
  const u = document.createElement("strong");
  u.textContent = s.title;
  const d = document.createElement("span");
  d.textContent = `${s.result.panels.length}컷 · 만화 읽기 ↗`, f.append(u, d), o.append(a, f);
  const p = () => r.open(s.result, { trigger: o });
  o.addEventListener("click", p), n.replaceChildren(o);
  let m = !1;
  return () => {
    m || (m = !0, o.removeEventListener("click", p), r.destroy(), c.revoke(), o.remove(), i());
  };
}
const Gn = /* @__PURE__ */ new WeakMap(), Ws = Us(), rn = /* @__PURE__ */ new WeakMap(), ot = Ys();
let at;
function Js(n) {
  n.result?.svg && (at = n, ot.open(n.result, { trigger: n.button }));
}
function Zs(n) {
  if (!document.getElementById("comic-gen-embed-styles")) {
    const s = document.createElement("style");
    s.id = "comic-gen-embed-styles", s.textContent = Jr, document.head.append(s);
  }
  const e = 'pre[language="comic-gen"], pre[data-comic], pre:has(code.language-comic), pre:has(code.language-comic-gen)', t = [...n.querySelectorAll(e)];
  return n instanceof HTMLElement && n.matches(e) && t.unshift(n), t;
}
function on(n) {
  return (n.querySelector("code") ?? n).textContent ?? "";
}
function Xs(n) {
  let e = Gn.get(n);
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
    const l = e;
    s.addEventListener("click", () => Js(l)), Gn.set(n, e);
  }
  return n.after(e.figure), n.hidden = !0, e;
}
function ei(n, e) {
  if (n.result = e, n.figure.removeAttribute("aria-busy"), n.button.disabled = !1, e.svg) {
    const t = new DOMParser().parseFromString(e.svg, "image/svg+xml");
    n.title.textContent = t.documentElement.getAttribute("aria-label"), n.caption.textContent = `${e.panels.length}컷 · 만화 읽기 ↗`, n.button.setAttribute(
      "aria-label",
      `${n.title.textContent} · 만화 읽기`
    ), n.thumbnail.innerHTML = e.panels[0].svg, n.figure.replaceChildren(n.button), at === n && ot.isOpen && Js(n);
  } else {
    at === n && ot.close();
    const t = document.createElement("p");
    t.setAttribute("role", "alert"), t.textContent = e.diagnostics.join(`
`), n.figure.replaceChildren(t);
  }
}
function ti(n) {
  const e = (rn.get(n) ?? 0) + 1;
  return rn.set(n, e), e;
}
function uo(n = document, e = {}) {
  return Zs(n).map((t) => {
    ti(t);
    const s = Ws.render(on(t), e);
    return ei(Xs(t), s), s;
  });
}
async function ho(n = document, e = {}) {
  return Promise.all(
    Zs(n).map(async (t) => {
      const s = on(t), i = ti(t), r = t.isConnected, o = Xs(t);
      if (o.figure.setAttribute("aria-busy", "true"), o.button.disabled = !0, !o.result) {
        const l = document.createElement("p");
        l.setAttribute("role", "status"), l.textContent = "만화를 그리는 중…", o.figure.replaceChildren(l);
      }
      const a = await Ws.renderAsync(s, e);
      if (rn.get(t) !== i) return a;
      if (r && !t.isConnected)
        return o.figure.remove(), at === o && ot.close(), a;
      if (on(t) !== s) {
        o.figure.removeAttribute("aria-busy"), o.result = void 0, at === o && ot.close();
        const l = document.createElement("p");
        return l.setAttribute("role", "status"), l.textContent = "코드가 바뀌었어요. 다시 그리기를 호출하세요.", o.figure.replaceChildren(l), a;
      }
      return ei(o, a), a;
    })
  );
}
export {
  oi as assetVersion,
  Ys as createComicViewer,
  Us as createRenderer,
  co as downloadBlob,
  lo as exportPng,
  fo as mountComicCard,
  uo as renderCodeBlocks,
  ho as renderCodeBlocksAsync,
  io as renderComic,
  oo as renderComicAsync,
  ro as renderPanels,
  ao as renderPanelsAsync,
  Us as 렌더러만들기,
  io as 만화그리기,
  oo as 만화그리기비동기,
  Ys as 만화뷰어만들기,
  fo as 만화카드붙이기,
  nn as 문법값,
  ie as 문법항목,
  ro as 컷그리기,
  ao as 컷그리기비동기,
  uo as 코드블록그리기,
  ho as 코드블록그리기비동기
};
