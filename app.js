
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
            m("li", {class: "nav-item"}, m("a", {class: x("/guideline"), href: "#!/guideline"}, "Guideline")),
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
                    m("a", {class: "btn btn-info btn-lg btn-block", href: "#!/guideline"}, "Conference guideline"), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/sessions1"}, "Sessions day 1"), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/poster_session_1"}, "Poster session day 1"), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/sessions2"}, "Sessions day 2"), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/poster_session_2"}, "Poster session day 2"), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/sessions3"}, "Sessions day 3"), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/poster_session_3"}, "Poster session day 3"),
                    m("br"), m("br"),
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
            if (s.id != null) {  // Regular Talk
                var p = presentations.filter(function(p) {return p.id == s.id})[0]
                var badge = []
                if (s.session.startsWith("Special session"))
                    badge = [m("span", {class: "badge badge-pill badge-success"}, "Special Session"), " "]
                session = [
                    badge,
                    m("a", {class: "lead", href: p.id + ".pdf"}, p.title),
                    m("br"), p.authors],
                session = [
                    session,
                    m("br"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: s.id + ".pdf"}, "Abstract"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "https://meet.jit.si/AMLaP2020_talk_" + s.id}, "Video Q&A")]
            } else if (session.match(/Keynote [1-5].+/)){
                var n = session.substring(8, 9);
                session = [
                    m("span", {class: "lead", style: "font-weight: bold"}, session),
                    m("br"),
                    m("span", {class: "lead"}, m("a", {href: "keynote" + n + ".pdf"}, "Title of keynote " + n)),
                    m("br"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "keynote" + n + ".pdf"}, "Abstract"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "https://meet.jit.si/AMLaP2020_keynote_" + n}, "Video Q&A")]
            } else if (session.startsWith("MS Chair:")) {
                session = 
                    m("center",
                      [m("span", {class: "lead", style: "font-weight: bold"}, "Main session:"),
                       m("br"),
                       "Chair: ", session.split(": ")[1]])
            } else if (session.startsWith("SS Chair:")) {
                session = 
                    m("center",
                      [m("span", {class: "lead", style: "font-weight: bold"}, "Special session: Computational models of language processing"),
                       m("br"),
                       "Chair: ", session.split(": ")[1]])
            } else if (session == "Poster session 1") {
                session = m("a", {href: "#!/poster_session_1", class: "lead", style: "font-weight: bold"}, session)
            } else if (session == "Poster session 2") {
                session = m("a", {href: "#!/poster_session_2", class: "lead", style: "font-weight: bold"}, session)
            } else if (session == "Poster session 3") {
                session = m("a", {href: "#!/poster_session_3", class: "lead", style: "font-weight: bold"}, session)
            } else if (session.match(/Social chat/)) {
                session = m("center", m("a", {href: chatlink, class: "lead", style: "font-weight: bold"}, session))
            } else if (session.match(/– .+ break –/) || session.match(/Social chat/)) {
                session = m("center", {class: "lead", style: "font-weight: bold"}, m("a", {href: chatlink}, session))
            } else {
                session = m("center", {class: "lead", style: "font-weight: bold"}, session)
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
                            m("a", {class: "btn btn-primary btn mr-1", href: "https://zoom.us", target: "_blank"}, "Join us on Zoom"),
                            m("a", {class: "btn btn-primary btn mr-1", href: "https://twitch.tv", target: "_blank"}, "Watch on Twitch"),
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

var Guideline = {
    view: function() {
        return [m(Navigation),
                m("main", {class: "container", id: "main"}, [
                    m("div", {class: "container mb-3"}, [
                        m("h1", {class: "display-4"}, "Conference Guideline"),
                        m("p", {class: "lead"}, "Below we briefly explain how you can, and should, participate in the conference.  Please take a moment to read this."),
                        m("h2", "Please review our code of conduct."),
                        m("ul", [
                            m("li", "AMLaP 2020 has a code of conduct that applies throughout the conference and on all platforms (Zoom, Twitch, Jitsi, …)."),
                            m("li", ["The code of conduct can be found ",
                                     m("a", {href: "https://amlap2020.org/code-of-conduct"}, "here"),
                                     "."])
                        ]),
                        m("h2", "How to watch talks on Zoom?"),
                        m("ul", [
                            m("li", "The whole conference will take place in a single Zoom webinar.  This means you'll need just one meeting ID, one password, and one registration."),
                            m("li", [
                                "To register for the Zoom webinar, please click ",
                                m("a", {href: "XYZ"}, "here"),
                                ".  After registration, you will receive an e-mail with the meeting details (meeting ID, password, …)."]),
                            m("li", "You'll need a Zoom account to register."),
                            m("li", "When you register, please specify your full name and primary accademic affiliation (if applicable)."),
                            m("li", "Please register ahead of the conference."),
                        ]),
                        m("p", [
                            m("a", {class: "btn btn-primary btn mr-1", href: "https://zoom.us", target: "_blank"}, "Register for Zoom webinar"),
                            m("a", {class: "btn btn-primary btn mr-1", href: "https://zoom.us", target: "_blank"}, "Join Zoom webinar"),]),
                        m("h2", "How to ask live questions on Zoom?"),
                        m("p", "If you'd like to ask a live question in the official Q&A period after a talk,"),
                        m("ul", [
                            m("li", "TODO."),
                            m("li", [m("strong", "Note: "),
                                     "The button ",
                                     m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "#!/help"}, "Video Q&A"),
                                     "is for the optional post-presentation Q&A on Jitsi (see below) not for questions during the official Q&A on Zoom."]),
                        ]),
                        m("h2", "How to watch talks on Twitch?"),
                        m("ul", [
                            m("li", "Talks will also be livestreamed on Twitch.tv."),
                            m("li", "No account is needed to watch the livestream on Twitch."),
                            m("li", "If you have a Twitch account, you can interact with other audience members in the Twitch chat (not moderated)."),
                            m("li", "With a Twitch account, you will also be able to watch the archived videos of the talks."),
                            m("li", "If you'd like to ask a live question during the official Q&A after a talk, please join the Zoom webinar."),
                        ]),
                        m("p", m("a", {class: "btn btn-primary btn mr-1", href: "https://twitch.tv", target: "_blank"}, "Watch on Twitch")),
                        m("h2", "How to ask further questions after the official Q&A period on Jitsi?"),
                        m("ul", [
                            m("li", "We invite speakers to answer further questions in a separate video chat following their presentations."),
                            m("li", ["To access this video chat, please click the button ",
                                     m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "#!/help"}, "Video Q&A"),
                                     "below the talk in the time table."]),
                            m("li", "Note that presenters are not required to attend this post-talk video Q&A."),
                        ]),
                        m("h2", "How to attend live poster presentations?"),
                        m("ul", [
                            m("li", "For live poster presentations we offer Jitsi video chats."),
                            m("li", ["To access a live poster presentation, use the button ",
                                     m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "#!/help"}, "Video chat"),
                                     "in the overview of the poster sessions."]),
                            m("li", "If presenters wish to use an alternative platform for their poster presentation, they can send us a link ahead of the conference and we'll include it in the program  instead of the Jitsi button."),
                            m("li", ["Poster presenters are invited to provide their ’poster’ in some suitable format (e.g., .pdf).  Please use the button ",
                                     m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "#!/help"}, "Poster"),
                                     "to download it."]), 
                        ]),
                        m("h2", "How to get optimal results when using with Zoom and Jitsi?"),
                        m("p", "When you ask live questions after talks or during a poster presentation"),
                        m("ul", [
                            m("li", "test you microphone in advance,"),
                            m("li", "make sure there are no background noises,"),
                            m("li", "use headphones to avoid feedback loops,"),
                            m("li", "unmute you microphone only when you talk and mute it otherwise."),
                        ]),
                        m("h2", "If you have further questions, …"),
                        m("p", ["… don’t hesitate to contact us at ",
                                m("a", {href: "mailto:info@amlap2020.org"}, "info@amlap2020.org")]),
                        m("br"),
                        m("br"),
                        m("br"),
                    ])
                ])
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
    "/guideline": Guideline ,
})

