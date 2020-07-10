
var chatlink = "https://www.duckduckgo.com"

var root = document.body

var Navigation = {
    view: function() {
        var x = function(route) {if (route == m.route.get()) {return "nav-link active"} else {return "nav-link"}}
        var nav_items = [
            m("li", {class: "nav-item dropdown"},
              [m("a", {class: "nav-link dropdown-toggle", href: "#", id: "navbarDropdown", role:"button", 'data-toggle': "dropdown", 'aria-haspopup': "true", 'aria-expanded': "false"}, "Talks"),
               m("div", {class: "dropdown-menu", 'aria-labelledby':"navbarDropdown"}, [
                   m("a", {class: x("/talks1"), href: "#!/talks1"}, "Talks day 1 (Sept 3)"),
                   m("a", {class: x("/talks2"), href: "#!/talks2"}, "Talks day 2 (Sept 4)"),
                   m("a", {class: x("/talks3"), href: "#!/talks3"}, "Talks day 3 (Sept 5)")])]),
            m("li", {class: "nav-item dropdown"},
              [m("a", {class: "nav-link dropdown-toggle", href: "#", id: "navbarDropdown", role:"button", 'data-toggle': "dropdown", 'aria-haspopup': "true", 'aria-expanded': "false"}, "Posters"),
               m("div", {class: "dropdown-menu", 'aria-labelledby':"navbarDropdown"}, [
                   m("a", {class: x("/poster_session_1"), href: "#!/poster_session_1"}, "Posters day 1 (Sept 3)"),
                   m("a", {class: x("/poster_session_2"), href: "#!/poster_session_2"}, "Posters day 2 (Sept 4)"),
                   m("a", {class: x("/poster_session_3"), href: "#!/poster_session_3"}, "Posters day 3 (Sept 5)")])]),
            // m("li", {class: "nav-item"}, m("a", {class: x("/authors"), href: "#!/authors"}, "Authors")),
        ]
        return m("nav", {class: "navbar navbar-expand-lg navbar-light bg-light"},
                 [
                     m("div", {class: "navbar-brand"}, m("a", {href: "#", class: "navbar-brand"}, "AMLaP 2020 Programme")),
                     m.trust("<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"> <span class=\"navbar-toggler-icon\"></span> </button>"),
                     m("div", {class: "collapse navbar-collapse", id: "navbarNav"}, m("ul", {class: "navbar-nav"}, nav_items)),
                ])
    }
}

var SessionsTableHeader = {
    view: function() {
        return m("thead", {class: "thead-dark"}, m("tr", [
            m("th", "Time (UTC+2)"),
            m("th", "What"),
        ]))
    }
}

function SessionFactory(s) {
    return {
        view: function() {
            var session = s.session
            if (s.id != null) {
                p = presentations.filter(function(p) {return p.id == s.id})[0]
                session = [m("a", {href: p.id + ".pdf"}, p.title), m("br"), p.authors]
            } else if (session == "Poster session 1") {
                session = m("a", {href: "#!/poster_session_1"}, session)
            } else if (session == "Poster session 2") {
                session = m("a", {href: "#!/poster_session_2"}, session)
            } else if (session == "Poster session 3") {
                session = m("a", {href: "#!/poster_session_3"}, session)
            } else if (session.match(/– .+ break –/) || session.match(/Social chat/)) {
                session = m("a", {href: chatlink}, session)
            }
            return m("tr", [
                m("td", s.start + "–" + s.end),
                m("td", session),
            ])
        }
    }
}

function TalksFactory(day, date) {
    return {
        view: function() {
            var l = []
            for (s of amlap2020schedule) {
                if (s.day == day)
                    l.push(m(SessionFactory(s)))
            }
            return [m(Navigation),
                    m("main", {class: "container"}, [
                        m("h1", {class: "display-4"}, "Talks Day " + day),
                        m("p", {class: "lead"}, date),
                        m("table", {class: "table table-sm table-striped"}, [
                            m(SessionsTableHeader),
                            m("tbody", l),
                        ]),
                    ])
                   ]
        }
    }
}

var Talks1 = TalksFactory(1, "Thursday, 3 September 2020")
var Talks2 = TalksFactory(2, "Friday, 4 September 2020")
var Talks3 = TalksFactory(3, "Saturday, 5 September 2020")

var PosterTableHeader = {
    view: function() {
        return m("thead", {class: "thead-dark"}, m("tr", [
            m("th", "ID"),
            m("th", "Author(s)"),
            m("th", "Title"),
        ]))
    }
}

function PosterFactory(id, authors, title, links) {
    return {
        view: function() {
            var a = authors.replace(/ \([^()]+\)/g, "").replace(/ \([^()]+\)/g, "").split("; ")
            a = a.map(a => [m("a", {href: "#!/authors"}, a), ", "])
            a = a.flat()
            a.pop()
            return m("tr", [
                m("td", m("a", {href: id+".pdf"}, "#" + id)),
                m("td", a),
                m("td", m("a", {href: id+".pdf"}, title)),
            ])
        }
    }
}

function PosterSessionFactory(number, date) {
    return {
        view: function() {
            var l = []
            for (p of presentations) {
                if (p.session == "Poster session " + number)
                    l.push(m(PosterFactory(p.id, p.authors, p.title)))
            }
            return [m(Navigation),
                    m("main", {class: "container"}, [
                        m("h1", {class: "display-4"}, "Poster session " + number),
                        m("p", {class: "lead"}, date),
                        m("table", {class: "table table-sm table-striped"}, [m(PosterTableHeader), m("tbody", l)])
                    ])
                   ]
        }
    }
}

var PosterSession1 = PosterSessionFactory(1, "Thursday, 3 September 2020, 16:00–17:30 (UTC+2)")
var PosterSession2 = PosterSessionFactory(2, "Friday, 4 September 2020, 14:00–15:30 (UTC+2)")
var PosterSession3 = PosterSessionFactory(3, "Saturday, 5 September 2020, 10:00–11:30 (UTC+2)")

var Authors = {
    view: function() {
        return [m(Navigation),
                m("h1", {class: "display-4"}, "Authors"),
               ]
    }
}

m.route(root, "/talks1", {
    "/talks1": Talks1,
    "/talks2": Talks2,
    "/talks3": Talks3,
    "/poster_session_1": PosterSession1,
    "/poster_session_2": PosterSession2,
    "/poster_session_3": PosterSession3,
    "/authors": Authors,
})
