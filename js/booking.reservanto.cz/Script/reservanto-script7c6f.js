var Reservanto = Reservanto || {};
Reservanto.Config = {
    baseUrl: "http://booking.reservanto.cz",
    stylesheet: "http://booking.reservanto.cz/Content/reservanto-style.css",
    personification: "http://booking.reservanto.cz/Personification/Index",
    iframe: "http://booking.reservanto.cz/Modal/",
    payment: "http://payments.reservanto.cz/pay/{0}",
    xd: "http://booking.reservanto.cz/Scripts/xd.message.js",
    isMobile: !1,
    manageBookingUrl: "//managebooking.reservanto.cz"
};
var Reservanto = Reservanto || {};
Reservanto.Widget = Reservanto.Widget || function (n) {
    function ut() {
        if (!s) {
            y();
            return
        }
        b()
    }

    function y() {
        if (s) {
            nt("WARNING: Attempt to call init more than once.");
            return
        }
        if (s = !0, n.getElementById("reservanto-widget-script")) {
            var t = yt("reservanto-widget-script");
            o = t.id || 0;
            a = (t.noaction || "false") == "true" ? !0 : !1
        }
        ft() && h();
        et();
        ot();
        b();
        lt()
    }

    function ft() {
        var t = window.location.hash.replace("#", ""),
            n;
        return t == "" ? !1 : (n = e.decode(t), n == "") ? !1 : n.indexOf("open=") != 0 ? !1 : (f = n.substr(5), window.location.hash = "_", !0)
    }

    function et() {
        if (!n.getElementById("reservanto-style")) {
            var i = new Date,
                t = n.createElement("link");
            t.id = "reservanto-style";
            t.type = "text/css";
            t.rel = "stylesheet";
            t.href = Reservanto.Config.stylesheet + "?t=" + i.getTime();
            t.media = "screen";
            n.getElementsByTagName("head")[0].appendChild(t)
        }
    }

    function ot() {
        var r, t, u, i;
        n.getElementById("reservanto-xd") || (r = new Date, t = n.createElement("script"), t.id = "reservanto-xd", t.type = "text/javascript", t.src = Reservanto.Config.xd + "?t=" + r.getTime(), u = function () {
            XD.receiveMessage(function (n) {
                Reservanto.Widget.catchMessage(n.data)
            }, Reservanto.Config.baseUrl);
            Reservanto.Config.manageBookingUrl.indexOf("//") === 0 ? (XD.receiveMessage(function (n) {
                Reservanto.Widget.catchMessage(n.data)
            }, "http:" + Reservanto.Config.manageBookingUrl), XD.receiveMessage(function (n) {
                Reservanto.Widget.catchMessage(n.data)
            }, "https:" + Reservanto.Config.manageBookingUrl)) : XD.receiveMessage(function (n) {
                Reservanto.Widget.catchMessage(n.data)
            }, Reservanto.Config.manageBookingUrl)
        }, i = !1, t.onload = t.onreadystatechange = function () {
            i || this.readyState && this.readyState !== "loaded" && this.readyState !== "complete" || (i = !0, u(), t.onload = t.onreadystatechange = null)
        }, n.getElementsByTagName("head")[0].appendChild(t))
    }

    function p(n, t, i, r, u, f) {
        var e = "";
        return e += ".reservanto-button.button-" + n + " { ", r != null && (e += "background-color: " + r + "; "), t != null && (e += "color: " + t + "; "), i != null && (e += "text-shadow:0px -1px 0px " + i + "; "), f != null && (e += "-moz-box-shadow: 0px 1px 0px 0px " + f + "; ", e += "-webkit-box-shadow: 0px 1px 0px 0px " + f + "; ", e += "box-shadow: 0px 1px 0px 0px " + f + "; "), e += "} ", e += ".reservanto-button.button-" + n + ":hover { ", u != null && (e += "background-color: " + u + "; "), e + "}"
    }

    function w() {
        return tt("reservanto-widget")
    }

    function b() {
        for (var t, u, e, f, s, o = w(), i = 0; i < o.length; i++)
            if (t = o[i], t.className.indexOf("reservanto-widget") != -1) {
                for (u = tt("reservanto-button", t); u[0];) u[0].parentNode.removeChild(u[0]), u[0] = null;
                e = n.getElementById("reservanto-style-custom-" + i);
                e && e.parentNode.removeChild(e);
                f = n.createElement("a");
                s = t.getAttribute("data-text");
                f.className = "reservanto-button button-" + i;
                f.innerHTML = st(s);
                f.onclick = function () {
                    var n = g();
                    n.id = this.parentNode.getAttribute("data-id");
                    n.segId = this.parentNode.getAttribute("data-segment");
                    n.resId = this.parentNode.getAttribute("data-resourceId");
                    n.serId = this.parentNode.getAttribute("data-serviceId");
                    n.appId = this.parentNode.getAttribute("data-appointmentId");
                    h(n)
                };
                t.appendChild(f);
                var l = t.getAttribute("data-color-text"),
                    a = t.getAttribute("data-color-text-shadow"),
                    v = t.getAttribute("data-color-bg"),
                    y = t.getAttribute("data-color-bg-hover"),
                    b = t.getAttribute("data-color-boxshadow"),
                    c = p(i, l, a, v, y, b),
                    r = n.createElement("style");
                r.id = "reservanto-style-custom-" + i;
                r.type = "text/css";
                r.styleSheet && !r.sheet ? r.styleSheet.cssText = c : r.appendChild(n.createTextNode(c));
                n.getElementsByTagName("head")[0].appendChild(r)
            }
    }

    function st(n) {
        return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

    function ht(t) {
        r = n.createElement("div");
        r.id = "reservanto-overlay";
        n.body.appendChild(r);
        i = n.createElement("div");
        i.id = "reservanto-modal";
        var u = n.createElement("a");
        u.onclick = Reservanto.Widget.hideModal;
        u.className = "reservanto-close";
        u.href = "#";
        i.appendChild(u);
        i.appendChild(ct(t));
        n.body.appendChild(i)
    }

    function h(n) {
        return a == !0 ? !1 : Reservanto.Config.isMobile ? (window.location = d(n), !1) : (i || ht(n), window.addEventListener ? t.addEventListener("load", c, !1) : window.attachEvent ? t.attachEvent("onload", c) : t.onload = c, !1)
    }

    function c() {
        r.className += " visible";
        i.className += " visible"
    }

    function k() {
        return r != null && (r.className = "", l(r), r = null), i != null && (i.className = "", l(i), i = null), t != null && t != undefined && l(t), !1
    }

    function ct(i, r, u) {
        return r = r || "100%", u = u || "100%", t = n.createElement("iframe"), t.border = 0, t.frameBorder = 0, t.frameSpacing = 0, t.src = d(i), t.style.cssText = "width:" + r + ";height:" + u + ";border:0", t
    }

    function d(n) {
        n = n || {};
        n.id = n.id || o;
        n.segId = n.segId || 0;
        n.resId = n.resId || 0;
        n.serId = n.serId || 0;
        n.appId = n.appId || 0;
        var t = Reservanto.Config.iframe + "?id=" + n.id;
        return n.segId != 0 && (t += "&seg=" + n.segId), n.resId != 0 && (t += "&rId=" + n.resId), n.serId != 0 && (t += "&sId=" + n.serId), n.appId != 0 && (t += "&appId=" + n.appId), f && (t = f, f = null), t + ("#" + encodeURIComponent(window.location.href))
    }

    function lt() {
        var t = w(),
            i, r;
        t.length !== 0 && (i = t[0], r = n.getElementById("reservanto-personification-frame"), r == null && (u = n.createElement("iframe"), u.id = "reservanto-personification-frame", u.src = Reservanto.Config.personification + "?url=" + encodeURIComponent(window.location.href) + "&id=" + o, u.style.cssText = "width:0;height:0;border:0;display:none;", i.appendChild(u)))
    }

    function at(n) {
        var t, i, r, u;
        n == "Close" ? k() : n.substring(0, 4) == "Tab:" ? (t = n.substring(4), i = window.location.href, t.indexOf(";") != -1 && (r = t.split(/;(.+)?/, 2), t = r[0], i = window.location.href.replace(/#.*$/, "") + "#" + e.encode("open=" + r[1])), u = Reservanto.Config.payment.replace("{0}", t) + "?p1=" + encodeURIComponent(i), window.location = u) : nt("INFO: Catched unknown message: (" + n + ")")
    }

    function g() {
        return {
            id: 0,
            segId: 0,
            resId: 0,
            serId: 0,
            appId: 0
        }
    }

    function nt(n) {
        rt ? console.log(n) : v.push(n)
    }

    function vt() {
        return v.join("\r\n")
    }

    function yt(t) {
        for (var r, u = n.getElementById(t).src.split("?")[1].split("&"), f = {}, i = 0; i < u.length; i++) r = u[i].split("="), f[r[0]] = r[1];
        return f
    }

    function l(n) {
        n.parentNode.removeChild(n)
    }

    function tt(t, i) {
        try {
            return i ? it(i.getElementsByClassName(t)) : it(n.getElementsByClassName(t))
        } catch (r) {
            return pt(t, i)
        }
    }

    function it(n) {
        if (!n) return [];
        if ("toArray" in Object(n)) return n.toArray();
        for (var t = n.length || 0, i = new Array(t); t--;) i[t] = n[t];
        return i
    }

    function pt(t, i) {
        var r, e;
        i || (i = n.getElementsByTagName("body")[0]);
        i || (i = n);
        var f = [],
            o = new RegExp("(^| )" + t + "( |$)"),
            u = i.getElementsByTagName("*");
        for (r = 0, e = u.length; r < e; r++) o.test(u[r].className) && f.push(u[r]);
        return f
    }
    var o = 0,
        a = !1,
        rt = !1,
        i = null,
        r = null,
        t = null,
        u = null,
        v = [],
        s = !1,
        f = null,
        e = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function (n) {
                var f = "",
                    o, t, i, h, c, s, r, u = 0;
                for (n = e._utf8_encode(n); u < n.length;) o = n.charCodeAt(u++), t = n.charCodeAt(u++), i = n.charCodeAt(u++), h = o >> 2, c = (o & 3) << 4 | t >> 4, s = (t & 15) << 2 | i >> 6, r = i & 63, isNaN(t) ? s = r = 64 : isNaN(i) && (r = 64), f = f + this._keyStr.charAt(h) + this._keyStr.charAt(c) + this._keyStr.charAt(s) + this._keyStr.charAt(r);
                return f
            },
            decode: function (n) {
                var t = "",
                    o, s, h, c, u, r, f, i = 0;
                for (n = n.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < n.length;) c = this._keyStr.indexOf(n.charAt(i++)), u = this._keyStr.indexOf(n.charAt(i++)), r = this._keyStr.indexOf(n.charAt(i++)), f = this._keyStr.indexOf(n.charAt(i++)), o = c << 2 | u >> 4, s = (u & 15) << 4 | r >> 2, h = (r & 3) << 6 | f, t = t + String.fromCharCode(o), r != 64 && (t = t + String.fromCharCode(s)), f != 64 && (t = t + String.fromCharCode(h));
                return e._utf8_decode(t)
            },
            _utf8_encode: function (n) {
                var i, r, t;
                for (n = n.replace(/\r\n/g, "\n"), i = "", r = 0; r < n.length; r++) t = n.charCodeAt(r), t < 128 ? i += String.fromCharCode(t) : t > 127 && t < 2048 ? (i += String.fromCharCode(t >> 6 | 192), i += String.fromCharCode(t & 63 | 128)) : (i += String.fromCharCode(t >> 12 | 224), i += String.fromCharCode(t >> 6 & 63 | 128), i += String.fromCharCode(t & 63 | 128));
                return i
            },
            _utf8_decode: function (n) {
                for (var r = "", t = 0, i = c1 = c2 = 0; t < n.length;) i = n.charCodeAt(t), i < 128 ? (r += String.fromCharCode(i), t++) : i > 191 && i < 224 ? (c2 = n.charCodeAt(t + 1), r += String.fromCharCode((i & 31) << 6 | c2 & 63), t += 2) : (c2 = n.charCodeAt(t + 1), c3 = n.charCodeAt(t + 2), r += String.fromCharCode((i & 15) << 12 | (c2 & 63) << 6 | c3 & 63), t += 3);
                return r
            }
        };
    return {
        init: y,
        refresh: ut,
        showModal: h,
        hideModal: k,
        readLog: vt,
        createButtonCss: p,
        catchMessage: at,
        getShowModalParams: g
    }
}(document);
window.addEventListener ? window.addEventListener("load", Reservanto.Widget.init, !1) : window.attachEvent && window.attachEvent("onload", Reservanto.Widget.init);