(function(e, t) {
function i(e) {
return function(t) {
return Object.prototype.toString.call(t) === "[object " + e + "]";
};
}
function l() {
return f++;
}
function m(e) {
return e.match(p)[0];
}
function g(e) {
e = e.replace(d, "/");
while (e.match(v)) e = e.replace(v, "/");
return e;
}
function y(e) {
var t = e.length - 1, n = e.charAt(t);
return n === "#" ? e.substring(0, t) : e.substring(t - 2) === ".js" || e.indexOf("?") > 0 || e.substring(t - 3) === ".css" || n === "/" ? e : e + ".js";
}
function E(e) {
var t = r.alias;
return t && o(t[e]) ? t[e] : e;
}
function S(e) {
var t = r.paths, n;
return t && (n = e.match(b)) && o(t[n[1]]) && (e = t[n[1]] + n[2]), e;
}
function x(e) {
var t = r.vars;
return t && e.indexOf("{") > -1 && (e = e.replace(w, function(e, n) {
return o(t[n]) ? t[n] : e;
})), e;
}
function T(e) {
var t = r.map, n = e;
if (t) for (var i = 0, s = t.length; i < s; i++) {
var o = t[i];
n = a(o) ? o(e) || e : e.replace(o[0], o[1]);
if (n !== e) break;
}
return n;
}
function k(e, t) {
var n, i = e.charAt(0);
if (N.test(e)) n = e; else if (i === ".") n = g((t ? m(t) : r.cwd) + e); else if (i === "/") {
var s = r.cwd.match(C);
n = s ? s[0] + e.substring(1) : e;
} else n = r.base + e;
return n;
}
function L(e, t) {
if (!e) return "";
e = E(e), e = S(e), e = x(e), e = y(e);
var n = k(e, t);
return n = T(n), n;
}
function H(e) {
return e.hasAttribute ? e.src : e.getAttribute("src", 4);
}
function z(e, t, n) {
var r = F.test(e), i = A.createElement(r ? "link" : "script");
if (n) {
var s = a(n) ? n(e) : n;
s && (i.charset = s);
}
W(i, t, r), r ? (i.rel = "stylesheet", i.href = e) : (i.async = !0, i.src = e), q = i, j ? B.insertBefore(i, j) : B.appendChild(i), q = null;
}
function W(e, t, n) {
var i = n && (U || !("onload" in e));
if (i) {
setTimeout(function() {
X(e, t);
}, 1);
return;
}
e.onload = e.onerror = e.onreadystatechange = function() {
I.test(e.readyState) && (e.onload = e.onerror = e.onreadystatechange = null, !n && !r.debug && B.removeChild(e), e = null, t());
};
}
function X(e, t) {
var n = e.sheet, r;
if (U) n && (r = !0); else if (n) try {
n.cssRules && (r = !0);
} catch (i) {
i.name === "NS_ERROR_DOM_SECURITY_ERR" && (r = !0);
}
setTimeout(function() {
r ? t() : X(e, t);
}, 20);
}
function V() {
if (q) return q;
if (R && R.readyState === "interactive") return R;
var e = B.getElementsByTagName("script");
for (var t = e.length - 1; t >= 0; t--) {
var n = e[t];
if (n.readyState === "interactive") return R = n, R;
}
}
function K(e) {
var t = [];
return e.replace(J, "").replace($, function(e, n, r) {
r && t.push(r);
}), t;
}
function nt(e, t) {
this.uri = e, this.dependencies = t || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0;
}
if (e.seajs) return;
var n = e.seajs = {
version: "2.1.1"
}, r = n.data = {}, s = i("Object"), o = i("String"), u = Array.isArray || i("Array"), a = i("Function"), f = 0, c = r.events = {};
n.on = function(e, t) {
var r = c[e] || (c[e] = []);
return r.push(t), n;
}, n.off = function(e, t) {
if (!e && !t) return c = r.events = {}, n;
var i = c[e];
if (i) if (t) for (var s = i.length - 1; s >= 0; s--) i[s] === t && i.splice(s, 1); else delete c[e];
return n;
};
var h = n.emit = function(e, t) {
var r = c[e], i;
if (r) {
r = r.slice();
while (i = r.shift()) i(t);
}
return n;
}, p = /[^?#]*\//, d = /\/\.\//g, v = /\/[^/]+\/\.\.\//, b = /^([^/:]+)(\/.+)$/, w = /{([^{]+)}/g, N = /^\/\/.|:\//, C = /^.*?\/\/.*?\//, A = document, O = location, M = m(O.href), _ = A.getElementsByTagName("script"), D = A.getElementById("seajsnode") || _[_.length - 1], P = m(H(D) || M), B = A.getElementsByTagName("head")[0] || A.documentElement, j = B.getElementsByTagName("base")[0], F = /\.css(?:\?|$)/i, I = /^(?:loaded|complete|undefined)$/, q, R, U = navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") * 1 < 536, $ = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, J = /\\\\/g, Q = n.cache = {}, G, Y = {}, Z = {}, et = {}, tt = nt.STATUS = {
FETCHING: 1,
SAVED: 2,
LOADING: 3,
LOADED: 4,
EXECUTING: 5,
EXECUTED: 6
};
nt.prototype.resolve = function() {
var e = this, t = e.dependencies, n = [];
for (var r = 0, i = t.length; r < i; r++) n[r] = nt.resolve(t[r], e.uri);
return n;
}, nt.prototype.load = function() {
var e = this;
if (e.status >= tt.LOADING) return;
e.status = tt.LOADING;
var t = e.resolve();
h("load", t);
var n = e._remain = t.length, r;
for (var i = 0; i < n; i++) r = nt.get(t[i]), r.status < tt.LOADED ? r._waitings[e.uri] = (r._waitings[e.uri] || 0) + 1 : e._remain--;
if (e._remain === 0) {
e.onload();
return;
}
var s = {};
for (i = 0; i < n; i++) r = Q[t[i]], r.status < tt.FETCHING ? r.fetch(s) : r.status === tt.SAVED && r.load();
for (var o in s) s.hasOwnProperty(o) && s[o]();
}, nt.prototype.onload = function() {
var e = this;
e.status = tt.LOADED, e.callback && e.callback();
var t = e._waitings, n, r;
for (n in t) t.hasOwnProperty(n) && (r = Q[n], r._remain -= t[n], r._remain === 0 && r.onload());
delete e._waitings, delete e._remain;
}, nt.prototype.fetch = function(e) {
function o() {
z(i.requestUri, i.onRequest, i.charset);
}
function u() {
delete Y[s], Z[s] = !0, G && (nt.save(n, G), G = null);
var e, t = et[s];
delete et[s];
while (!!t && (e = t.shift())) e.load();
}
var t = this, n = t.uri;
t.status = tt.FETCHING;
var i = {
uri: n
};
h("fetch", i);
var s = i.requestUri || n;
if (!s || Z[s]) {
t.load();
return;
}
if (Y[s]) {
et[s].push(t);
return;
}
Y[s] = !0, et[s] = [ t ], h("request", i = {
uri: n,
requestUri: s,
onRequest: u,
charset: r.charset
}), i.requested || (e ? e[i.requestUri] = o : o());
}, nt.prototype.exec = function() {
function r(e) {
return nt.get(r.resolve(e)).exec();
}
var e = this;
if (e.status >= tt.EXECUTING) return e.exports;
e.status = tt.EXECUTING;
var n = e.uri;
r.resolve = function(e) {
return nt.resolve(e, n);
}, r.async = function(e, t) {
return nt.use(e, t, n + "_async_" + l()), r;
};
var i = e.factory, s = a(i) ? i(r, e.exports = {}, e) : i;
return s === t && (s = e.exports), s === null && !F.test(n) && h("error", e), delete e.factory, e.exports = s, e.status = tt.EXECUTED, h("exec", e), s;
}, nt.resolve = function(e, t) {
var n = {
id: e,
refUri: t
};
return h("resolve", n), n.uri || L(n.id, t);
}, nt.define = function(e, n, r) {
var i = arguments.length;
i === 1 ? (r = e, e = t) : i === 2 && (r = n, u(e) ? (n = e, e = t) : n = t), !u(n) && a(r) && (n = K(r.toString()));
var s = {
id: e,
uri: nt.resolve(e),
deps: n,
factory: r
};
if (!s.uri && A.attachEvent) {
var o = V();
o && (s.uri = o.src);
}
h("define", s), s.uri ? nt.save(s.uri, s) : G = s;
}, nt.save = function(e, t) {
var n = nt.get(e);
n.status < tt.SAVED && (n.id = t.id || e, n.dependencies = t.deps || [], n.factory = t.factory, n.status = tt.SAVED);
}, nt.get = function(e, t) {
return Q[e] || (Q[e] = new nt(e, t));
}, nt.use = function(t, n, r) {
var i = nt.get(r, u(t) ? t : [ t ]);
i.callback = function() {
var t = [], r = i.resolve();
for (var s = 0, o = r.length; s < o; s++) t[s] = Q[r[s]].exec();
n && n.apply(e, t), delete i.callback;
}, i.load();
}, nt.preload = function(e) {
var t = r.preload, n = t.length;
n ? nt.use(t, function() {
t.splice(0, n), nt.preload(e);
}, r.cwd + "_preload_" + l()) : e();
}, n.use = function(e, t) {
return nt.preload(function() {
nt.use(e, t, r.cwd + "_use_" + l());
}), n;
}, nt.define.cmd = {}, e.define = nt.define, n.Module = nt, r.fetchedList = Z, r.cid = l, n.resolve = L, n.require = function(e) {
return (Q[nt.resolve(e)] || {}).exports;
};
var rt = /^(.+?\/)(\?\?)?(seajs\/)+/;
r.base = (P.match(rt) || [ "", P ])[1], r.dir = P, r.cwd = M, r.charset = "utf-8", r.preload = function() {
var e = [], t = O.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2");
return t += " " + A.cookie, t.replace(/(seajs-\w+)=1/g, function(t, n) {
e.push(n);
}), e;
}(), n.config = function(e) {
for (var t in e) {
var i = e[t], o = r[t];
if (o && s(o)) for (var a in i) o[a] = i[a]; else u(o) ? i = o.concat(i) : t === "base" && (i.slice(-1) === "/" || (i += "/"), i = k(i)), r[t] = i;
}
return h("config", e), n;
};
})(this);;(function(e) {
function a(e) {
var a = e.length;
if (a < 2) return;
r.comboSyntax && (s = r.comboSyntax), r.comboMaxLength && (o = r.comboMaxLength), u = r.comboExcludes;
var f = [];
for (var d = 0; d < a; d++) {
var v = e[d];
if (i[v]) continue;
var m = t.get(v), g = c(v);
m.status < n && !h(v) && !p(v) && (g == ".js" || g == ".css") && f.push(v);
}
if (f.length > 1) {
var y = l(f);
for (var d = 0; d < f.length; ++d) {
var v = f[d], b = c(v);
i[v] = y[b];
}
}
}
function f(e) {
var t = c(e.uri);
t == ".js" || t == ".css" ? e.requestUri = i[e.uri] || e.uri.replace("/c/=", "") : e.requestUri = e.uri;
}
function l(t) {
var n = e.data.base, r = [], i = {}, o = n.replace(s[0], "");
for (var u = 0; u < t.length; ++u) {
var a = t[u], f = a.substr(o.length), l = c(a);
i[l] ? i[l] += s[1] + f : i[l] = n + f;
}
return i;
}
function c(e) {
var t = e.lastIndexOf(".");
return t >= 0 ? e.substring(t) : "";
}
function h(e) {
if (u) return u.test ? u.test(e) : u(e);
}
function p(e) {
var t = r.comboSyntax || [ "??", "," ], n = t[0], i = t[1];
return n && e.indexOf(n) > 0 || i && e.indexOf(i) > 0;
}
var t = e.Module, n = t.STATUS.FETCHING, r = e.data, i = r.comboHash = {}, s = [ "/c/=", "," ], o = 2e3, u;
e.on("load", a), e.on("fetch", f);
if (r.test) {
var d = e.test || (e.test = {});
d.uris2paths = l, d.paths2hash = paths2hash;
}
define("seajs-combo-debug", [], {});
})(seajs);;(function(e) {
var t = location.hostname == "mp.weixin.qq.com" ? "https://res.wx.qq.com/" : "/", n = function(e) {
var t = e.lastIndexOf(".");
return t >= 0 ? e.substring(t) : "";
};
typeof MODULES != "undefined" && (t += "c/=");
var r = e.data.pathinfo = {
".js": "mpres/zh_CN/htmledition/js/",
".tpl": "mpres/zh_CN/htmledition/js/",
".html": "mpres/zh_CN/htmledition/js/",
".css": "mpres/htmledition/style/"
};
e.config({
base: t,
map: [ function(t) {
var i = n(t), s = e.data.base, o = t.substr(s.length);
if (typeof MODULES == "undefined" || !MODULES[o]) return s.replace("/c/=", "") + r[i] + o + "?20130807";
var u = MODULES[o], a = u;
return a.indexOf(s.replace("/c/=", "")) == -1 && (a = s + u), i != ".js" && i != ".css" && (a = a.replace("/c/=", "")), a;
} ]
});
})(seajs);;