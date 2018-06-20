parcelRequire = (function(e, r, n, t) {
  var i = "function" == typeof parcelRequire && parcelRequire,
    o = "function" == typeof require && require;
  function u(n, t) {
    if (!r[n]) {
      if (!e[n]) {
        var f = "function" == typeof parcelRequire && parcelRequire;
        if (!t && f) return f(n, !0);
        if (i) return i(n, !0);
        if (o && "string" == typeof n) return o(n);
        var c = new Error("Cannot find module '" + n + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      p.resolve = function(r) {
        return e[n][1][r] || r;
      };
      var l = (r[n] = new u.Module(n));
      e[n][0].call(l.exports, p, l, l.exports, this);
    }
    return r[n].exports;
    function p(e) {
      return u(p.resolve(e));
    }
  }
  (u.isParcelRequire = !0),
    (u.Module = function(e) {
      (this.id = e), (this.bundle = u), (this.exports = {});
    }),
    (u.modules = e),
    (u.cache = r),
    (u.parent = i),
    (u.register = function(r, n) {
      e[r] = [
        function(e, r) {
          r.exports = n;
        },
        {}
      ];
    });
  for (var f = 0; f < n.length; f++) u(n[f]);
  if (n.length) {
    var c = u(n[n.length - 1]);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = c)
      : "function" == typeof define && define.amd
        ? define(function() {
            return c;
          })
        : t && (this[t] = c);
  }
  return u;
})(
  {
    25: [
      function(require, module, exports) {
        var e = "state-cache-v0.1.0";
        self.addEventListener("install", function(n) {
          console.log("installed SW."),
            n.waitUntil(
              caches.open(e).then(function(e) {
                return e
                  .addAll([
                    "/",
                    "./index.html",
                    "./src.4807892d.js",
                    "./src.d2b43e43.css",
                    "./clear.3aad0514.svg",
                    "./toggle.3a7b4133.svg"
                  ])
                  .catch(function(e) {
                    return console.error(e);
                  });
              })
            );
        }),
          self.addEventListener("fetch", function(e) {
            e.respondWith(
              caches.match(e.request).then(function(n) {
                return n || fetch(e.request);
              })
            );
          });
      },
      {}
    ]
  },
  {},
  [25],
  null
);
//# sourceMappingURL=service-worker.map
