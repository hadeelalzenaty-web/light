! function(n, e, r) {
    "use strict";
    r.app = r.app || {};
    var l = r("body"),
        d = r(n),
        m = r('div[data-menu="menu-wrapper"]').html(),
        u = r('div[data-menu="menu-wrapper"]').attr("class");
    r.app.menu = {
        expanded: null,
        collapsed: null,
        hidden: null,
        container: null,
        horizontalMenu: !1,
        manualScroller: {
            obj: null,
            init: function() {
                r(".main-menu").hasClass("menu-dark");
                this.obj = new PerfectScrollbar(".main-menu-content", {
                    suppressScrollX: !0
                })
            },
            update: function() {
                if (this.obj) {
                    var e;
                    if (!0 === r(".main-menu").data("scroll-to-active")) e = 0 < r(".main-menu-content").find("li.active").parents("li").length ? r(".main-menu-content").find("li.active").parents("li").last().position() : r(".main-menu-content").find("li.active").position(), setTimeout(function() {
                        void 0 !== e && r.app.menu.container.stop().animate({
                            scrollTop: e.top
                        }, 300), r(".main-menu").data("scroll-to-active", "false")
                    }, 300);
                    this.obj.update()
                }
            },
            enable: function() {
                r(".main-menu-content").hasClass("ps") || this.init()
            },
            disable: function() {
                this.obj && this.obj.destroy()
            },
            updateHeight: function() {
                "vertical-menu" != l.data("menu") && "vertical-menu-modern" != l.data("menu") && "vertical-overlay-menu" != l.data("menu") || !r(".main-menu").hasClass("menu-fixed") || (r(".main-menu-content").css("height", r(n).height() - r(".header-navbar").height() - r(".main-menu-header").outerHeight() - r(".main-menu-footer").outerHeight()), this.update())
            }
        },
        init: function(e) {
            if (0 < r(".main-menu-content").length) {
                this.container = r(".main-menu-content");
                var n = "";
                if (!0 === e && (n = "collapsed"), "vertical-menu-modern" == l.data("menu")) {
                    var a = "";
                    "undefined" != typeof Storage && (a = localStorage.getItem("menuLocked")), "false" === a ? this.change("collapsed") : this.change()
                } else this.change("collapsed") // .change(n)
            } else this.drillDownMenu()
        },
        drillDownMenu: function(e) {
            r(".drilldown-menu").length && ("sm" == e || "xs" == e ? "true" == r("#navbar-mobile").attr("aria-expanded") && r(".drilldown-menu").slidingMenu({
                backLabel: !0
            }) : r(".drilldown-menu").slidingMenu({
                backLabel: !0
            }))
        },
        change: function(e) {
            var n = Unison.fetch.now();
            this.reset();
            var a, s, i = l.data("menu");
            if (n) switch (n.name) {
                case "xl":
                case "lg":
                    "vertical-overlay-menu" === i ? this.hide() : "collapsed" === e ? this.collapse(e) : this.expand();
                    break;
                case "md":
                    "vertical-overlay-menu" === i || "vertical-menu-modern" === i ? this.hide() : this.collapse();
                    break;
                case "sm":
                case "xs":
                    this.hide()
            }
            "vertical-menu" !== i && "vertical-menu-modern" !== i || this.toOverlayMenu(n.name, i), l.is(".horizontal-layout") && !l.hasClass(".horizontal-menu-demo") && (this.changeMenu(n.name), r(".menu-toggle").removeClass("is-active")), "horizontal-menu" != i && this.drillDownMenu(n.name), "xl" == n.name && (r('body[data-open="hover"] .dropdown').on("mouseenter", function() {
                r(this).hasClass("show") ? r(this).removeClass("show") : r(this).addClass("show")
            }).on("mouseleave", function(e) {
                r(this).removeClass("show")
            }), r('body[data-open="hover"] .dropdown a').on("click", function(e) {
                if ("horizontal-menu" == i && r(this).hasClass("dropdown-toggle")) return !1
            })), r(".header-navbar").hasClass("navbar-brand-center") && r(".header-navbar").attr("data-nav", "brand-center"), "sm" == n.name || "xs" == n.name ? r(".header-navbar[data-nav=brand-center]").removeClass("navbar-brand-center") : r(".header-navbar[data-nav=brand-center]").addClass("navbar-brand-center"), r("ul.dropdown-menu [data-toggle=dropdown]").on("click", function(e) {
                0 < r(this).siblings("ul.dropdown-menu").length && e.preventDefault(), e.stopPropagation(), r(this).parent().siblings().removeClass("show"), r(this).parent().toggleClass("show")
            }), "horizontal-menu" == i && ("sm" == n.name || "xs" == n.name ? r(".menu-fixed").length && r(".menu-fixed").unstick() : r(".navbar-fixed").length && r(".navbar-fixed").sticky()), "vertical-menu" !== i && "vertical-overlay-menu" !== i || (jQuery.expr[":"].Contains = function(e, n, a) {
                return 0 <= (e.textContent || e.innerText || "").toUpperCase().indexOf(a[3].toUpperCase())
            }, a = r("#main-menu-navigation"), s = r(".menu-search"), r(s).change(function() {
                var e = r(this).val();
                if (e) {
                    r(".navigation-header").hide(), r(a).find("li a:not(:Contains(" + e + "))").hide().parent().hide();
                    var n = r(a).find("li a:Contains(" + e + ")");
                    n.parent().hasClass("has-sub") ? (n.show().parents("li").show().addClass("open").closest("li").children("a").show().children("li").show(), 0 < n.siblings("ul").length && n.siblings("ul").children("li").show().children("a").show()) : n.show().parents("li").show().addClass("open").closest("li").children("a").show()
                } else r(".navigation-header").show(), r(a).find("li a").show().parent().show().removeClass("open");
                return r.app.menu.manualScroller.update(), !1
            }).keyup(function() {
                r(this).change()
            }))
        },
        transit: function(e, n) {
            var a = this;
            l.addClass("changing-menu"), e.call(a), l.hasClass("vertical-layout") && (l.hasClass("menu-open") || l.hasClass("menu-expanded") ? (r(".menu-toggle").addClass("is-active"), "vertical-menu" === l.data("menu") && r(".main-menu-header") && r(".main-menu-header").show()) : (r(".menu-toggle").removeClass("is-active"), "vertical-menu" === l.data("menu") && r(".main-menu-header") && r(".main-menu-header").hide())), setTimeout(function() {
                n.call(a), l.removeClass("changing-menu"), a.update()
            }, 500)
        },
        open: function() {
            this.transit(function() {
                l.removeClass("menu-hide menu-collapsed").addClass("menu-open"), this.hidden = !1, this.expanded = !0, l.hasClass("vertical-overlay-menu") && (r(".sidenav-overlay").removeClass("d-none").addClass("d-block"), r("body").css("overflow", "hidden"))
            }, function() {
                !r(".main-menu").hasClass("menu-native-scroll") && r(".main-menu").hasClass("menu-fixed") && (this.manualScroller.enable(), r(".main-menu-content").css("height", r(n).height() - r(".header-navbar").height() - r(".main-menu-header").outerHeight() - r(".main-menu-footer").outerHeight())), l.hasClass("vertical-overlay-menu") || (r(".sidenav-overlay").removeClass("d-block d-none"), r("body").css("overflow", "auto"))
            })
        },
        hide: function() {
            this.transit(function() {
                l.removeClass("menu-open menu-expanded").addClass("menu-hide"), this.hidden = !0, this.expanded = !1, l.hasClass("vertical-overlay-menu") && (r(".sidenav-overlay").removeClass("d-block").addClass("d-none"), r("body").css("overflow", "auto"))
            }, function() {
                !r(".main-menu").hasClass("menu-native-scroll") && r(".main-menu").hasClass("menu-fixed") && this.manualScroller.enable(), l.hasClass("vertical-overlay-menu") || (r(".sidenav-overlay").removeClass("d-block d-none"), r("body").css("overflow", "auto"))
            })
        },
        expand: function() {
            !1 === this.expanded && ("vertical-menu-modern" == l.data("menu") && (r(".modern-nav-toggle").find(".toggle-icon").removeClass("ft-toggle-left").addClass("ft-toggle-right"), "undefined" != typeof Storage && localStorage.setItem("menuLocked", "true")), this.transit(function() {
                l.removeClass("menu-collapsed").addClass("menu-expanded"), this.collapsed = !1, this.expanded = !0, r(".sidenav-overlay").removeClass("d-block d-none")
            }, function() {
                r(".main-menu").hasClass("menu-native-scroll") || "horizontal-menu" == l.data("menu") ? this.manualScroller.disable() : r(".main-menu").hasClass("menu-fixed") && this.manualScroller.enable(), "vertical-menu" != l.data("menu") && "vertical-menu-modern" != l.data("menu") || !r(".main-menu").hasClass("menu-fixed") || r(".main-menu-content").css("height", r(n).height() - r(".header-navbar").height() - r(".main-menu-header").outerHeight() - r(".main-menu-footer").outerHeight())
            }))
        },
        collapse: function(e) {
            !1 === this.collapsed && ("vertical-menu-modern" == l.data("menu") && (r(".modern-nav-toggle").find(".toggle-icon").removeClass("ft-toggle-right").addClass("ft-toggle-left"), "undefined" != typeof Storage && localStorage.setItem("menuLocked", "false")), this.transit(function() {
                l.removeClass("menu-expanded").addClass("menu-collapsed"), this.collapsed = !0, this.expanded = !1, r(".content-overlay").removeClass("d-block d-none")
            }, function() {
                "horizontal-menu" == l.data("menu") && l.hasClass("vertical-overlay-menu") && r(".main-menu").hasClass("menu-fixed") && this.manualScroller.enable(), "vertical-menu" != l.data("menu") && "vertical-menu-modern" != l.data("menu") || !r(".main-menu").hasClass("menu-fixed") || r(".main-menu-content").css("height", r(n).height() - r(".header-navbar").height()), "vertical-menu-modern" == l.data("menu") && r(".main-menu").hasClass("menu-fixed") && this.manualScroller.enable()
            }))
        },
        toOverlayMenu: function(e, n) {
            var a = l.data("menu");
            "vertical-menu-modern" == n ? "md" == e || "sm" == e || "xs" == e ? l.hasClass(a) && l.removeClass(a).addClass("vertical-overlay-menu") : l.hasClass("vertical-overlay-menu") && l.removeClass("vertical-overlay-menu").addClass(a) : "sm" == e || "xs" == e ? l.hasClass(a) && l.removeClass(a).addClass("vertical-overlay-menu") : l.hasClass("vertical-overlay-menu") && l.removeClass("vertical-overlay-menu").addClass(a)
        },
        changeMenu: function(e) {
            r('div[data-menu="menu-wrapper"]').html(""), r('div[data-menu="menu-wrapper"]').html(m);
            var n = r('div[data-menu="menu-wrapper"]'),
                a = (r('div[data-menu="menu-container"]'), r('ul[data-menu="menu-navigation"]')),
                s = r('li[data-menu="megamenu"]'),
                i = r("li[data-mega-col]"),
                t = r('li[data-menu="dropdown"]'),
                o = r('li[data-menu="dropdown-submenu"]');
            "sm" == e || "xs" == e ? (l.removeClass(l.data("menu")).addClass("vertical-layout vertical-overlay-menu fixed-navbar"), r("nav.header-navbar").addClass("fixed-top"), n.removeClass().addClass("main-menu menu-light menu-fixed menu-shadow"), a.removeClass().addClass("navigation navigation-main"), s.removeClass("dropdown mega-dropdown").addClass("has-sub"), s.children("ul").removeClass(), i.each(function(e, n) {
                r(n).find(".mega-menu-sub").find("li").has("ul").addClass("has-sub");
                var a = r(n).children().first(),
                    s = "";
                a.is("h6") && (s = a.html(), a.remove(), r(n).prepend('<a href="#">' + s + "</a>").addClass("has-sub mega-menu-title"))
            }), s.find("a").removeClass("dropdown-toggle"), s.find("a").removeClass("dropdown-item"), t.removeClass("dropdown").addClass("has-sub"), t.find("a").removeClass("dropdown-toggle nav-link"), t.children("ul").find("a").removeClass("dropdown-item"), t.find("ul").removeClass("dropdown-menu"), o.removeClass().addClass("has-sub"), r.app.nav.init(), r("ul.dropdown-menu [data-toggle=dropdown]").on("click", function(e) {
                e.preventDefault(), e.stopPropagation(), r(this).parent().siblings().removeClass("open"), r(this).parent().toggleClass("open")
            })) : (l.removeClass("vertical-layout vertical-overlay-menu fixed-navbar").addClass(l.data("menu")), r("nav.header-navbar").removeClass("fixed-top"), n.removeClass().addClass(u), this.drillDownMenu(e), r("a.dropdown-item.nav-has-children").on("click", function() {
                event.preventDefault(), event.stopPropagation()
            }), r("a.dropdown-item.nav-has-parent").on("click", function() {
                event.preventDefault(), event.stopPropagation()
            }))
        },
        toggle: function() {
            var e = Unison.fetch.now(),
                n = (this.collapsed, this.expanded),
                a = this.hidden,
                s = l.data("menu");
            switch (e.name) {
                case "xl":
                case "lg":
                    !0 === n ? "vertical-overlay-menu" == s ? this.hide() : this.collapse() : "vertical-overlay-menu" == s ? this.open() : this.expand();
                    break;
                case "md":
                    !0 === n ? "vertical-overlay-menu" == s || "vertical-menu-modern" == s ? this.hide() : this.collapse() : "vertical-overlay-menu" == s || "vertical-menu-modern" == s ? this.open() : this.expand();
                    break;
                case "sm":
                case "xs":
                    !0 === a ? this.open() : this.hide()
            }
            this.drillDownMenu(e.name)
        },
        update: function() {
            this.manualScroller.update()
        },
        reset: function() {
            this.expanded = !1, this.collapsed = !1, this.hidden = !1, l.removeClass("menu-hide menu-open menu-collapsed menu-expanded")
        }
    }, r.app.nav = {
        container: r(".navigation-main"),
        initialized: !1,
        navItem: r(".navigation-main").find("li").not(".navigation-category"),
        config: {
            speed: 300
        },
        init: function(e) {
            this.initialized = !0, r.extend(this.config, e), this.bind_events()
        },
        bind_events: function() {
            var t = this;
            r(".navigation-main").on("mouseenter.app.menu", "li", function() {
                var e = r(this);
                if (r(".hover", ".navigation-main").removeClass("hover"), l.hasClass("menu-collapsed") && "vertical-menu-modern" != l.data("menu")) {
                    r(".main-menu-content").children("span.menu-title").remove(), r(".main-menu-content").children("a.menu-title").remove(), r(".main-menu-content").children("ul.menu-content").remove();
                    var n, a, s, i = e.find("span.menu-title").clone();
                    if (e.hasClass("has-sub") || (n = e.find("span.menu-title").text(), a = e.children("a").attr("href"), "" !== n && ((i = r("<a>")).attr("href", a), i.attr("title", n), i.text(n), i.addClass("menu-title"))), s = e.css("border-top") ? e.position().top + parseInt(e.css("border-top"), 10) : e.position().top, "vertical-compact-menu" !== l.data("menu") && i.appendTo(".main-menu-content").css({
                            position: "fixed",
                            top: s
                        }), e.hasClass("has-sub") && e.hasClass("nav-item")) {
                        e.children("ul:first");
                        t.adjustSubmenu(e)
                    }
                }
                e.addClass("hover")
            }).on("mouseleave.app.menu", "li", function() {}).on("active.app.menu", "li", function(e) {
                r(this).addClass("active"), e.stopPropagation()
            }).on("deactive.app.menu", "li.active", function(e) {
                r(this).removeClass("active"), e.stopPropagation()
            }).on("open.app.menu", "li", function(e) {
                var n = r(this);
                if (n.addClass("open"), t.expand(n), r(".main-menu").hasClass("menu-collapsible")) return !1;
                n.siblings(".open").find("li.open").trigger("close.app.menu"), n.siblings(".open").trigger("close.app.menu"), e.stopPropagation()
            }).on("close.app.menu", "li.open", function(e) {
                var n = r(this);
                n.removeClass("open"), t.collapse(n), e.stopPropagation()
            }).on("click.app.menu", "li", function(e) {
                var n = r(this);
                n.is(".disabled") ? e.preventDefault() : l.hasClass("menu-collapsed") && "vertical-menu-modern" != l.data("menu") ? e.preventDefault() : n.has("ul") ? n.is(".open") ? n.trigger("close.app.menu") : n.trigger("open.app.menu") : n.is(".active") || (n.siblings(".active").trigger("deactive.app.menu"), n.trigger("active.app.menu")), e.stopPropagation()
            }), r(".navbar-header, .main-menu").on("mouseenter", function() {
                if ("vertical-menu-modern" == l.data("menu") && (r(".main-menu, .navbar-header").addClass("expanded"), l.hasClass("menu-collapsed"))) {
                    var e = r(".main-menu li.menu-collapsed-open"),
                        n = e.children("ul");
                    n.hide().slideDown(200, function() {
                        r(this).css("display", "")
                    }), e.addClass("open").removeClass("menu-collapsed-open")
                }
            }).on("mouseleave", function() {
                l.hasClass("menu-collapsed") && "vertical-menu-modern" == l.data("menu") && setTimeout(function() {
                    if (0 === r(".main-menu:hover").length && 0 === r(".navbar-header:hover").length && (r(".main-menu, .navbar-header").removeClass("expanded"), l.hasClass("menu-collapsed"))) {
                        var e = r(".main-menu li.open"),
                            n = e.children("ul");
                        e.addClass("menu-collapsed-open"), n.show().slideUp(200, function() {
                            r(this).css("display", "")
                        }), e.removeClass("open")
                    }
                }, 1)
            }), r(".main-menu-content").on("mouseleave", function() {
                l.hasClass("menu-collapsed") && (r(".main-menu-content").children("span.menu-title").remove(), r(".main-menu-content").children("a.menu-title").remove(), r(".main-menu-content").children("ul.menu-content").remove()), r(".hover", ".navigation-main").removeClass("hover")
            }), r(".navigation-main li.has-sub > a").on("click", function(e) {
                e.preventDefault()
            }), r("ul.menu-content").on("click", "li", function(e) {
                var n = r(this);
                if (n.is(".disabled")) e.preventDefault();
                else if (n.has("ul"))
                    if (n.is(".open")) n.removeClass("open"), t.collapse(n);
                    else {
                        if (n.addClass("open"), t.expand(n), r(".main-menu").hasClass("menu-collapsible")) return !1;
                        n.siblings(".open").find("li.open").trigger("close.app.menu"), n.siblings(".open").trigger("close.app.menu"), e.stopPropagation()
                    } else n.is(".active") || (n.siblings(".active").trigger("deactive.app.menu"), n.trigger("active.app.menu"));
                e.stopPropagation()
            })
        },
        adjustSubmenu: function(e) {
            var n, a, s, i, t, o = e.children("ul:first"),
                l = o.clone(!0);
            r(".main-menu-header").height(), n = e.position().top, s = d.height() - r(".header-navbar").height(), t = 0, o.height(), 0 < parseInt(e.css("border-top"), 10) && (t = parseInt(e.css("border-top"), 10)), i = s - n - e.height() - 30, r(".main-menu").hasClass("menu-dark"), a = n + e.height() + t, l.addClass("menu-popout").appendTo(".main-menu-content").css({
                top: a,
                position: "fixed",
                "max-height": i
            });
            new PerfectScrollbar(".main-menu-content > ul.menu-content")
        },
        collapse: function(e, n) {
            e.children("ul").show().slideUp(r.app.nav.config.speed, function() {
                r(this).css("display", ""), r(this).find("> li").removeClass("is-shown"), n && n(), r.app.nav.container.trigger("collapsed.app.menu")
            })
        },
        expand: function(e, n) {
            var a = e.children("ul"),
                s = a.children("li").addClass("is-hidden");
            a.hide().slideDown(r.app.nav.config.speed, function() {
                r(this).css("display", ""), n && n(), r.app.nav.container.trigger("expanded.app.menu")
            }), setTimeout(function() {
                s.addClass("is-shown"), s.removeClass("is-hidden")
            }, 0)
        },
        refresh: function() {
            r.app.nav.container.find(".open").removeClass("open")
        }
    }
}(window, document, jQuery);