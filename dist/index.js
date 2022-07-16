var b = Object.defineProperty;
var R = (e, t, n) => t in e ? b(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var s = (e, t, n) => (R(e, typeof t != "symbol" ? t + "" : t, n), n);
const K = [
  [
    "topLeft",
    "bottomLeft",
    "topRight",
    "bottomRight",
    "frontLeft",
    "frontRight",
    "left",
    "right",
    "top",
    "center",
    "bottom",
    "front"
  ],
  ["top", "bottom", null, null, "frontLeft", "frontRight", "center", null, null, null, null, "front"],
  ["left", null, "right", null, "frontLeft", "frontRight", null, null, "center", null, null, "front"],
  ["center", null, null, null, "frontLeft", "frontRight", null, null, null, null, null, "front"],
  ["topLeft", "bottomLeft", "topRight", "bottomRight", "front", null, "left", "right", "top", "center", "bottom", null],
  ["top", "bottom", null, null, "front", null, "center", null, null, null, null, null],
  ["left", null, "right", null, "front", null, null, null, "center", null, null, null],
  ["center", null, null, null, "front", null, null, null, null, null, null, null]
];
function* k(e) {
  var u, i, f;
  const t = { x: 0, y: 0, rx: 0, ry: 0, h: 1, w: 1, a: 4, c: "#cccccc", t: "#000000" }, n = { x: 0, y: 0 };
  for (const o of e) {
    if (!Array.isArray(o)) {
      yield { ...o };
      continue;
    }
    for (const l of o)
      if (typeof l == "object")
        "rx" in l && (t.rx = n.x = l.rx, t.x = n.x, t.y = n.y), "ry" in l && (t.ry = n.y = l.ry, t.x = n.x, t.y = n.y), l.x && (t.x += l.x), l.y && (t.y += l.y), "r" in l && (t.r = l.r), "w" in l && (t.w = l.w), "h" in l && (t.h = l.h), "h2" in l && !("h" in l) ? t.h = l.h2 : "h2" in l && (t.h2 = l.h2), "w2" in l && !("w" in l) ? t.w = l.w2 : "w2" in l && (t.w2 = l.w2), "a" in l && (t.a = l.a), "c" in l && (t.c = l.c), "t" in l && (t.t = l.t);
      else {
        const d = {
          x: t.x,
          y: t.y
        }, a = {
          width: t.w || t.w2 || 1,
          height: t.h || t.h2 || 1
        }, x = {
          x: (u = t.rx) != null ? u : 0,
          y: (i = t.ry) != null ? i : 0
        }, w = (f = t.r) != null ? f : 0, h = {};
        if (l.length) {
          const p = l.split(`
`), m = t.t.split(`
`), L = K[t.a];
          for (let r = 0; r < p.length; r++) {
            const y = p[r], g = L[r];
            y.length && g && (h[g] = {
              text: y,
              color: m[r] || "#000000"
            });
          }
        }
        yield { position: d, size: a, pivot: x, angle: w, legends: h, color: t.c }, t.x += a.width, t.w = t.h = 1, t.x2 = t.y2 = t.w2 = t.h2 = 0;
      }
    ++t.y, t.x = t.rx;
  }
}
class c {
  constructor(t) {
    s(this, "_handleImportKleLayout", () => {
      this.api.utils.pickFile("application/JSON").then((t) => {
        const n = new FileReader();
        n.onload = (u) => {
          const i = u.target;
          if (i.result) {
            const f = JSON.parse(i.result);
            for (const o of k(f))
              "position" in o ? this.api.layoutEditor.getKeyboard().addKeyCap({
                position: o.position,
                size: o.size,
                pivot: o.pivot,
                angle: o.angle,
                legends: o.legends,
                color: o.color
              }) : this.api.layoutEditor.getKeyboard().setMetadata(o);
          }
        }, n.readAsText(t);
      });
    });
    this.api = t, t.toolbar.registerButtons(this, [
      {
        name: "Import KLE layout",
        icon: "Download",
        onClick: this._handleImportKleLayout
      }
    ]);
  }
}
s(c, "title", "KLE Import"), s(c, "description", "Proto KB plugin that allow to import KLE layouts"), s(c, "id", "com.protokb.kle_import");
export {
  c as default
};
