import { P as p } from "./prism-CEbJifWp.js";
const m = 'code[class*="example-javascript"]', u = 'code[class*="example-html"]', d = /^\/\/(\s*)tag:(\s*)(?<name>(\w+[\w\-_]*))/m, r = (n) => n.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
function h(n) {
  const t = [], e = {
    inBlock: !1,
    openCurly: 0,
    closeCurly: 0,
    fnName: "",
    fnLines: []
  };
  for (const o of n.split(`
`)) {
    if (!e.inBlock) {
      const s = o.trimEnd(), l = d.exec(s);
      if (l) {
        e.inBlock = !0, e.fnName = l.groups.name;
        continue;
      }
    }
    if (e.inBlock) {
      e.fnLines.push(o);
      const { openCurly: s, closeCurly: l } = C(o);
      e.openCurly += s, e.closeCurly += l, e.openCurly === e.closeCurly && (t.push(y(e)), e.inBlock = !1, e.openCurly = 0, e.closeCurly = 0, e.fnName = "", e.fnLines = []);
    }
  }
  return t;
}
function C(n) {
  const t = n.length, e = t - n.replaceAll("{", "").length, o = t - n.replaceAll("}", "").length;
  return { openCurly: e, closeCurly: o };
}
function E(n, t = { js: r, html: r }) {
  const { js: e, html: o, elId: s } = { ...n }, l = document.getElementById(s);
  if (l) {
    if (e.length > 0) {
      const c = l.querySelector(m);
      if (c)
        c.innerHTML = t.js(e);
      else
        throw new Error(`Container id ${s} does not contain ${m} but javascript example is not empty`);
    }
    if (o.length > 0) {
      const c = l.querySelector(u);
      if (c)
        c.innerHTML = t.html(o);
      else
        throw new Error(`Container id ${s} does not contain ${u} but HTML example is not empty`);
    }
  } else
    throw new Error(`Container element with id="${s}" not found`);
}
function y(n) {
  const t = n.fnLines, e = 4, o = [], s = [], l = t.slice(1, -1);
  l.length === 0 && (o.push(""), s.push(""));
  for (const f of l) {
    const i = f.slice(e).trimEnd(), a = L(i);
    a.isComment ? s.push(a.value) : o.push(i);
  }
  const c = n.fnName;
  return { js: o.join(`
`), html: s.join(`
`), elId: c };
}
function L(n) {
  return /^(\/\/(\s+))</m.exec(n) ? {
    isComment: !0,
    value: n.slice(3)
  } : {
    isComment: !1
  };
}
window.Prism = p;
document.addEventListener("DOMContentLoaded", async () => {
  w(), g("index.js");
});
function x(n) {
  return `<span style="color:#fe2f33;font-weight:bold">${r(n)}</span>`;
}
function w() {
  const t = x("Funny texts don't need Comic Sans");
  document.getElementById("ff-result").innerHTML = t;
}
async function g(n) {
  const e = await (await fetch(n, { method: "GET" })).text(), o = h(e);
  for (const s of o)
    E(s);
}
//# sourceMappingURL=index.js.map
