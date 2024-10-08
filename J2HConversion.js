let data = [];
let template;
var currentIssueForSummary =0;
var currentIssueForViolation =0;
var totalIssues = 0;

readFile();
function RenderHTMLReport() {
	
   // let reportToRender = document.getElementById('report-container');
    let html = json2html.render(data, template);
    reportToRender.innerHTML = html;

   // document.getElementById('upload').hidden = true;
    //document.getElementById('footer').hidden = true;
}

function readFile() {
    //document.getElementById('file-upload').disabled = true;
    const jsonFile = "/data.json";
    //const jsonFile = event.target.files[0];
	
    loadAsText(jsonFile);
	RenderHTMLReport();
}

function loadAsText(theFile) {
    const reader = new FileReader();
    reader.onload = function (loadedEvent) {
        data = loadedEvent.target.result;
    }
    reader.readAsText(theFile);
    //document.getElementById('generate-report').disabled = false;
}

function gettemplate(){
template = [
    {
        "<>": "tr", 'obj': function () {
            return (this.violations)
        }, 'html': [
            {
                "<>": "span", "html": [
                    {
                        function() {
                            totalIssues += this.nodes.length;
                        }
                    },
                ]
            }
        ]
    },



    {
        "<>": "div", "class": "summary", "html": [
            {
                "<>": "div", "class": "tool-summary", "html": [
                    {"<>": "h2", "html": "Tools"},
                    {
                        "<>": "li",
                        "html": "<strong>Test engine: </strong>${testEngine.name} version ${testEngine.version}"
                    },
                    {"<>": "li", "html": "<strong>Test runner: </strong>${testRunner.name}"},
                ]
            },
            {
                "<>": "div", "class": "assessment-summary", "html": [
                    {"<>": "h1", "html": "Accessibility Audit"},
                    {
                        '<>': 'p', 'html': function () {
                            return ('<strong>Date of assessment:</strong> ' + new Date(this.timestamp).toLocaleString());
                            // + "<br><strong>Page URL:</strong> <a href='" + this.url + "' target='_blank' title='Visit page'>" + this.url + "</a>";
                        }
                    },
                ]}
        ]
    },


    {
        '<>': 'h2', 'html': function () {
            return ('<span class="count-of-violations">' + totalIssues + '</span> violations found');
        }
    },

    {
        "<>": "table", "html": [
            {"<>": "tr", "html": "<th>#</th><th>Axe rule ID</th><th>Description</th><th>Impact</th><th>Count</th>"},

            {
                "<>": "tr", 'obj': function () {
                    return (this.violations)
                }, 'html': [
                    {
                        "<>": "div", "html": [

                            {
                                '<>': 'td', 'html': function () {
                                    currentIssueForSummary+=1;
                                    return ("<a href='#view-" + this.id + "-issues' title='View violations'>" + currentIssueForSummary + "</a>");
                                }
                            },

                            // {"<>": "td", "html": "<a href='#view-${id}-issues'>Go to issue</a>"},
                            // {"<>": "td", "html": "<a href='${helpUrl}' target='_blank'>${id}</a>"},
                            {"<>": "td", "html": "${id}"},
                            {"<>": "td", "text": "${description}"},
                            // {"<>": "td", "html": "${tags}"},
                            {"<>": "td", "html": "<span class='tag tag-${impact}'>${impact}</span>"},
                            {
                                '<>': 'td', 'text': function () {
                                    return (this.nodes.length);
                                }
                            },
                        ]
                    }
                ]
            },




        ]


    },

    {"<>": "h2", "html": "Violations"},
    {
        "<>": "section", "id":"view-${id}-issues", "class": "violation-section", 'obj': function () {
            return (this.violations)
        }, 'html': [
            {
                "<>": "div", "class": "violation-title", "html": [

                    {
                        "<>": "div", "html": [
                            {"<>": "span", "class":"learn-more", "html": "<a href='${helpUrl}' target='_blank' title='Visit Deque University to learn more about this type of violation'>Learn more about ${id}</a>"},
                            {
                                '<>': 'h3', "class": "header", 'html': function () {
                                    currentIssueForViolation+=1;
                                    return (currentIssueForViolation + '. ' + this.help );
                                }
                            },
                            // {"<>": "p", "html": "<span class='axe-id'>${id}</span>" },
                            {"<>": "p", "html": "${description}"},
                            {"<>": "p", "html": "Impact: <span class='tag tag-${impact}'>${impact}</span>"},
                            {"<>": "p", "html": "Tags: <span class='a11y-tags'>${tags}</span>"},
                            // {"<>": "span", "html": "Impact: ${impact}"},
                        ]
                    }
                ]
            },

            {
                "<>": "table", "html": [
                    {
                        "<>": "tr", 'obj': function () {
                            return (this.nodes)
                        }, 'html': [
                            {
                                "<>": "td", "html": [
                                    {
                                        "<>": "td", "text": "Element Location:", "html": [
                                            {"<>": "code", "text": "${target}"},
                                            {
                                                "<>": "span", "text": "Element Source:","html": [
                                                    {"<>": "code", "text": "${html}"}
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            },
                            {
                                "<>": "td", "html": [
                                    {
                                        "<>": "span",  "text": "To solve this violation, you need to...", "html": [
                                            {"<>": "code", "text": "${failureSummary}"}
                                        ]
                                    },
                                ]
                            },
                        ]
                    }
                ]
            },


        ]
    },
]
}

!function () {
    "use strict";
    var c,
        e = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || this || {},
        u = {};

    function d(e) {
        this.type = "iHTML", this.html = e || "", this.events = []
    }

    function i(e, t) {
        if (!(this instanceof i)) return new i(e, onEnd, onFound);
        this.tokenizers = e.splice ? e : [e], t && (this.doBuild = t)
    }

    function o(e) {
        for (var t = 0; t < e.length; t++) e[t].trigger("j2h.ready")
    }

    function s(e, t) {
        for (var n = [], a = 0; a < t.length; a++) {
            var r = t[a], o = e.find("[-j2h-e='" + r.id + "']");
            if (0 === o.length) throw"jquery.json2html was unable to attach event " + r.id + " to DOM";
            c(o).removeAttr("-j2h-e"), "ready" === r.type && (r.type = "j2h.ready"), r.data.action = r.action, c(o).on(r.type, r.data, function (e) {
                "function" === b((e.data.event = e).data.action) && e.data.action.call(c(this), e.data)
            }), "j2h.ready" === r.type && n.push(c(o))
        }
        return n
    }

    function h(e, t, n, a, r) {
        var o = new d;
        switch (b(e, !0)) {
            case"array":
                for (var c = e.length, i = 0; i < c; ++i) o.append(p(e[i], t, n, i, r));
                break;
            case"undefined":
            case"null":
                break;
            default:
                o.append(p(e, t, n, a, r))
        }
        return o
    }

    function p(e, t, n, a, r) {
        var o = new d;
        switch (b(t, !0)) {
            case"array":
                for (var c = t.length, i = 0; i < c; ++i) o.append(p(e, t[i], n, a));
                break;
            case"object":
                "function" !== b(t.obj) || r ? t["[]"] ? o.append(function (e, t, n, a, r) {
                    var o, c = new d, i = {template: void 0, name: void 0};
                    for (o in n) switch (o) {
                        case"[]":
                            var s = f(e || t, n, o, a, r);
                            a.components && (i.template = a.components[s]), i.template || (i.template = u[s]);
                            break;
                        case"html":
                            "object" === b(n.html) && (a.$ihtml = h(t, n.html, a, r))
                    }
                    return "object" !== b(i.template) || c.append(h(t, i.template, a)), c
                }(r, e, t, n, a)) : o.append(function (e, t, n, a, r) {
                    var o, c = new d, i = new d, s = "<>";
                    for (o in n) switch (o) {
                        case"tag":
                            s = "tag";
                        case"<>":
                            c.name = f(e || t, n, s, a, r), c.appendHTML("<" + c.name);
                            break;
                        case"obj":
                            break;
                        case"text":
                            m(n[o]) || i.appendHTML(json2html.toText(f(t, n, o, a, r)));
                            break;
                        case"children":
                        case"html":
                            switch (b(n[o], !0)) {
                                case"array":
                                    i.append(h(t, n[o], a, r));
                                    break;
                                case"function":
                                    var u = n[o].call(t, t, r, a.data, a.$ihtml);
                                    switch (b(u, !0)) {
                                        case"object":
                                            "iHTML" === u.type && i.append(u);
                                            break;
                                        case"function":
                                        case"undefined":
                                        case"null":
                                            break;
                                        case"array":
                                            i.appendHTML(u.toString());
                                            break;
                                        default:
                                            i.appendHTML(u)
                                    }
                                    break;
                                default:
                                    i.appendHTML(f(t, n, o, a, r))
                            }
                            break;
                        default:
                            var p, l = !1;
                            2 < o.length && "on" === o.substring(0, 2).toLowerCase() && ("ihtml" === a.output && (p = {
                                obj: t,
                                data: a.data,
                                index: r
                            }, u = function () {
                                function e() {
                                    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
                                }

                                return e() + e()
                            }(), c.events.push({
                                id: u,
                                type: o.substring(2),
                                data: p,
                                action: n[o]
                            }), c.appendHTML(" -j2h-e='" + u + "'")), l = !0), l || void 0 !== (l = f(t, n, o, a, r)) && (l = "string" == typeof l ? '"' + l.replace(/"/g, "&quot;") + '"' : l, c.appendHTML(" " + o + "=" + l))
                    }
                    c.name ? !function (e) {
                        switch (e) {
                            case"area":
                            case"base":
                            case"br":
                            case"col":
                            case"command":
                            case"embed":
                            case"hr":
                            case"img":
                            case"input":
                            case"keygen":
                            case"link":
                            case"meta":
                            case"param":
                            case"source":
                            case"track":
                            case"wbr":
                                return !0;
                            default:
                                return !1
                        }
                    }(c.name) ? (c.appendHTML(">"), c.append(i), c.appendHTML("</" + c.name + ">")) : c.appendHTML("/>") : c.append(i);
                    return c
                }(r, e, t, n, a)) : (r = e, e = t.obj.call(e, e, a), o.append(h(e, t, n, a, r)))
        }
        return o
    }

    function f(n, e, t, a, r) {
        var o = "", e = e[t];
        switch (b(e, !0)) {
            case"function":
                switch (b(n)) {
                    case"object":
                        return e.call(n, n, r, a.data);
                    case"function":
                    case"undefined":
                    case"null":
                        return "";
                    default:
                        t = {value: n, index: r, data: a.data};
                        return e.call(t, t, r, a.data)
                }
                break;
            case"string":
                o = function (e, a) {
                    let t = new i([/\${([\w\.\,]+)}/], function (e, t, n) {
                        return t ? e.replace(n, a) : e
                    });
                    return t.parse(e).join("")
                }(e, function (e, t) {
                    switch (b(n)) {
                        case"object":
                            return function (e, t) {
                                for (var n = t.split("."), a = e, r = n.length, o = 0; o < r && !(0 < n[o].length && null == (a = a[n[o]])); ++o) ;
                                return null == a ? "" : a
                            }(n, t);
                        case"function":
                        case"undefined":
                        case"null":
                            return "";
                        default:
                            switch (t) {
                                case"value":
                                    return n;
                                case"index":
                                    return null == r ? "" : r
                            }
                    }
                });
                break;
            case"null":
            case"undefined":
            case"object":
                o = "";
                break;
            default:
                o = e.toString()
        }
        return o
    }

    function m(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }

    function b(e, t) {
        var n = typeof e;
        if ("object" == n) {
            if (null === e) return "null";
            if (t && m(e)) return "array"
        }
        return n
    }

    d.prototype.append = function (e) {
        return e && "iHTML" === e.type && (this.html += e.html, this.events = this.events.concat(e.events)), this
    }, d.prototype.appendHTML = function (e) {
        this.html += e
    }, d.prototype.toJSON = function () {
        return {html: this.html, events: this.events}
    }, i.prototype.parse = function (e) {
        for (this.src = e, this.ended = !1, this.tokens = []; this.next(), !this.ended;) ;
        return this.tokens
    }, i.prototype.build = function (e, t) {
        e && this.tokens.push(this.doBuild ? this.doBuild(e, t, this.tkn) : e)
    }, i.prototype.next = function () {
        var e, t = this;
        t.findMin(), e = t.src.slice(0, t.min), t.build(e, !1), t.src = t.src.slice(t.min).replace(t.tkn, function (e) {
            return t.build(e, !0), ""
        }), t.src || (t.ended = !0)
    }, i.prototype.findMin = function () {
        var e, t, n = this, a = 0;
        for (n.min = -1, n.tkn = ""; void 0 !== (e = n.tokenizers[a++]);) -1 != (t = n.src[e.test ? "search" : "indexOf"](e)) && (-1 == n.min || t < n.min) && (n.tkn = e, n.min = t);
        -1 == n.min && (n.min = n.src.length)
    }, e.json2html = {
        version: "2.1.0", render: function (t, e, n) {
            var a = new d, r = {output: "html"};
            n && (n.events && (r.output = "ihtml"), r.components = n.components, r.data = n.data, n.output && (r.output = n.output));
            var o = t;
            if ("string" == typeof t) try {
                o = JSON.parse(t)
            } catch (e) {
                o = t
            }
            return t = o, "object" === b(e) && "object" === b(t) && (a = h(t, e, r)), "ihtml" !== r.output ? a.html : a
        }, component: {
            add: function (e, t) {
                switch (typeof e) {
                    case"object":
                        u = function () {
                            for (var e = {}, t = arguments.length, n = 0; n < t; n++) for (var a in arguments[n]) e[a] = arguments[n][a];
                            return e
                        }(u, e);
                        break;
                    case"string":
                        u[e] = t
                }
            }, get: function (e) {
                return u[e]
            }
        }, iHTML: d, toText: function (e) {
            return null == e ? "" : e.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/\//g, "&#x2F;")
        }
    }, e.json2html.transform = e.json2html.render, "object" == typeof window && window.jQuery && ((c = window.jQuery).json2html = function (e, t, n) {
        if ("undefined" != typeof json2html) {
            var a = {output: "ihtml"};
            switch (n && (n.eventData && (a.data = a.eventData), a.components = n.components, a.data = n.data, n.output && (a.output = n.output)), a.output) {
                case"json2html":
                case"ihtml":
                    a.output = "ihtml"
            }
            return json2html.render(e, t, a)
        }
    }, c.fn.json2html = function (n, a, e) {
        if ("undefined" != typeof json2html) {
            var r = {output: "ihtml", method: "append"};
            return e && (e.eventData && (r.data = r.eventData), e.method && (r.method = e.method), e.prepend && (r.method = "prepend"), e.replace && (r.method = "replace"), e.append && (r.method = "append"), r.components = e.components, r.data = e.data), this.each(function () {
                var e, t,
                    e = (e = json2html.render(n, a, r), t = c(document.createElement("i")).html(e.html), e = s(c(t), e.events), {
                        parent: c(t).children(),
                        ready: e
                    });
                switch (r.method) {
                    case"replace":
                        c.fn.replaceWith.call(c(this), e.parent);
                        break;
                    case"prepend":
                        c.fn.prepend.call(c(this), e.parent);
                        break;
                    default:
                        c.fn.append.call(c(this), e.parent)
                }
                o(e.ready)
            })
        }
    }, c.fn.j2hHydrate = function (e) {
        return this.each(function () {
            o(s(c(this), e))
        })
    })
}();