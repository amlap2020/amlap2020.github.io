
var chatlink = "https://www.duckduckgo.com"

var Navigation = {
    view: function() {
        var x = function(route) {if (route == m.route.get()) {return "nav-link active"} else {return "nav-link"}}
        var nav_items = [
            m("li", {class: "nav-item dropdown"},
              [m("a", {class: "nav-link dropdown-toggle", href: "#", id: "navbarDropdown", role:"button", 'data-toggle': "dropdown", 'aria-haspopup': "true", 'aria-expanded': "false"}, "Talks"),
               m("div", {class: "dropdown-menu", 'aria-labelledby':"navbarDropdown"}, [
                   m("a", {class: x("/sessions1"), href: "#!/sessions1"}, "Talks Day 1 (3 Sept)"),
                   m("a", {class: x("/sessions2"), href: "#!/sessions2"}, "Talks Day 2 (4 Sept)"),
                   m("a", {class: x("/sessions3"), href: "#!/sessions3"}, "Talks Day 3 (5 Sept)")])]),
            m("li", {class: "nav-item dropdown"},
              [m("a", {class: "nav-link dropdown-toggle", href: "#", id: "navbarDropdown", role:"button", 'data-toggle': "dropdown", 'aria-haspopup': "true", 'aria-expanded': "false"}, "Posters"),
               m("div", {class: "dropdown-menu", 'aria-labelledby':"navbarDropdown"}, [
                   m("a", {class: x("/poster_session_1"), href: "#!/poster_session_1"}, "Posters Day 1 (3 Sept)"),
                   m("a", {class: x("/poster_session_2"), href: "#!/poster_session_2"}, "Posters Day 2 (4 Sept)"),
                   m("a", {class: x("/poster_session_3"), href: "#!/poster_session_3"}, "Posters Day 3 (5 Sept)")])]),
            // m("li", {class: "nav-item"}, m("a", {class: x("/authors"), href: "#!/authors"}, "Authors")),
        ]
        return m("nav", {class: "navbar sticky-top navbar-expand-lg navbar-dark bg-dark"},
                 [
                     m("div", {class: "navbar-brand"}, m("a", {href: "#", class: "navbar-brand"}, "AMLaP 2020 Programme")),
                     m.trust("<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"> <span class=\"navbar-toggler-icon\"></span> </button>"),
                     m("div", {class: "collapse navbar-collapse", id: "navbarNav"}, m("ul", {class: "navbar-nav"}, nav_items)),
                ])
    }
}

var Overview = {
    view: function() {
        return [m(Navigation),
                m("main", {class: "container"}, [
                    m("h1", {class: "display-4"}, "Main Menu"),
                    m("p", {class: "lead"}, "3–5 September 2020"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/sessions1"}, "Sessions day 1"), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/poster_session_1"}, "Poster session day 1"), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/sessions2"}, "Sessions day 2"), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/poster_session_2"}, "Poster session day 2"), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/sessions3"}, "Sessions day 3"), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/poster_session_3"}, "Poster session day 3"),
                ])]
    }
}
var TimeZoneWarning = {
    view: function () {
        return m("div", {class: "alert alert-warning"}, "All times are in UTC+2:00, i.e. Central European Summer Time.")
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
                session = [m("a", {class: "lead", href: p.id + ".pdf"}, p.title), m("br"), p.authors]
                session = [
                    session,
                    m("br"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: s.id + ".pdf"}, "Abstract"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "https://meet.jit.si/AMLaP2020_talk_" + s.id}, "Video chat")]
            } else if (session.match(/Keynote [1-5].+/)){
                var n = session.substring(8, 9);
                session = [
                    m("span", {class: "lead", style: "font-weight: bold"}, session),
                    m("br"),
                    m("span", {class: "lead"}, m("a", {href: "keynote" + n + ".pdf"}, "Title of keynote " + n)),
                    m("br"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "keynote" + n + ".pdf"}, "Abstract"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "https://meet.jit.si/AMLaP2020_keynote_" + n}, "Video chat")]
            } else if (session == "Poster session 1") {
                session = m("a", {href: "#!/poster_session_1"}, session)
            } else if (session == "Poster session 2") {
                session = m("a", {href: "#!/poster_session_2"}, session)
            } else if (session == "Poster session 3") {
                session = m("a", {href: "#!/poster_session_3"}, session)
            } else if (session.match(/Social chat/)) {
                session = m("a", {href: chatlink}, session)
            } else if (session.match(/– .+ break –/) || session.match(/Social chat/)) {
                session = m("center", {class: "lead", style: "font-weight: bold"}, m("a", {href: chatlink}, session))
            } else {
                session = m("span", {class: "lead", style: "font-weight: bold"}, session)
            }
            return m("tr", [
                m("td", {class: "lead"}, s.start + "﻿–﻿" + s.end),
                m("td", session),
            ])
        }
    }
}

function SessionsFactory(day, date) {
    return {
        view: function() {
            var l = []
            for (s of amlap2020schedule) {
                if (s.day == day)
                    l.push(m(SessionFactory(s)))
            }
            return [m(Navigation),
                    m("main", {class: "container", id: "main"}, [
                        m("div", {class: "container mb-3"}, [
                            m("h1", {class: "display-4"}, "Sessions Day " + day),
                            m("p", {class: "lead"}, date),
                            m("a", {class: "btn btn-primary btn-sm mr-1", href: "https://zoom.us", target: "_blank"}, "Join on Zoom"),
                            m("a", {class: "btn btn-primary btn-sm mr-1", href: "https://twitch.tv", target: "_blank"}, "Watch on Twitch"),
                            m("br"), m("br"), m(TimeZoneWarning),
                        ]),
                        m("table", {class: "table table-sm table-striped"}, [
                            m(SessionsTableHeader),
                            m("tbody", l),
                        ]),
                    ])
                   ]
        }
    }
}

var Sessions1 = SessionsFactory(1, "Thursday, 3 September 2020")
var Sessions2 = SessionsFactory(2, "Friday, 4 September 2020")
var Sessions3 = SessionsFactory(3, "Saturday, 5 September 2020")

var PosterTableHeader = {
    view: function() {
        return m("thead", {class: "thead-dark"}, m("tr", [
            m("th", "ID"),
            m("th", "Title / Author(s)"),
        ]))
    }
}

function PosterFactory(id, authors, title, links) {
    return {
        view: function() {
            var a = authors.split("; ")
            // var a = authors.replace(/ \([^()]+\)/g, "").replace(/ \([^()]+\)/g, "").split("; ")
            // a = a.map(a => [m("a", {href: "#!/authors"}, a), ", "])
            a = a.map(a => [a, ", "])
            a = a.flat()
            a.pop()
            return m("tr", [
                // m("td", m("a", {class: "lead", href: id+".pdf"}, "#" + id)),
                m("td", {class: "lead"}, "#" + id),
                m("td", [
                    m("a", {class: "lead", href: id+".pdf"}, title),
                    m("br"),
                    a,
                    m("br"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: id + ".pdf"}, "Abstract"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: id + "_poster.pdf"}, "Poster"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "https://meet.jit.si/AMLaP2020_poster_" + id}, "Video chat"),
                ])
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
                    m("main", {class: "container", id: "main"}, [
                        m("div", {class: "container"}, [
                            m("h1", {class: "display-4"}, "Poster session " + number),
                            m("p", {class: "lead"}, date),
                             m(TimeZoneWarning),
                        ]),
                    m("table", {class: "table table-sm table-striped"}, [m(PosterTableHeader), m("tbody", l)])
                    ])]
        }
    }
}

var PosterSession1 = PosterSessionFactory(1, "Thursday, 3 September 2020, 16:00–17:30 (UTC+2)")
var PosterSession2 = PosterSessionFactory(2, "Friday, 4 September 2020, 14:00–15:30 (UTC+2)")
var PosterSession3 = PosterSessionFactory(3, "Saturday, 5 September 2020, 10:00–11:30 (UTC+2)")

var Authors = {
    view: function() {
        return [m(Navigation),
                m("h1", {class: "display-4"}, "Authors"),
               ]
    }
}

m.route(document.body, "/overview", {
    "/overview": Overview,
    "/sessions1": Sessions1,
    "/sessions2": Sessions2,
    "/sessions3": Sessions3,
    "/poster_session_1": PosterSession1,
    "/poster_session_2": PosterSession2,
    "/poster_session_3": PosterSession3,
    "/authors": Authors,
})

