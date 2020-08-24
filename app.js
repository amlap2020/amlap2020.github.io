
var zoom_url = "https://zoom.us/j/93957569698"
var zoomregistration_url = "https://zoom.us/webinar/register/WN_PVp8hJ63Sle9L0yGaqzrRQ"
var twitch_url = "https://twitch.tv/amlap2020"
var gathertown_url = "https://gather.town/65ZDsKs7IS9aj9V1/amlap2020"
var jitsi_url_prefix = "https://meet.jit.si/AMLaP2020_poster_"

var withdrawn = ["311", "325", "271", "324", "5", "296", "306", "144", "78", "3"]

function Icon(name) {
    return m("img", {src: "bootstrap-icons/" + name + ".svg", width: 24, height: 24}, "")
}

var Navigation = {
    view: function() {
        var x = function(route) {if (route == m.route.get()) {return "nav-link active"} else {return "nav-link"}}
        var nav_items = [
            m("li", {class: "nav-item dropdown"},
              [m("a", {class: "nav-link dropdown-toggle", href: "#", id: "navbarDropdown", role:"button", 'data-toggle': "dropdown", 'aria-haspopup': "true", 'aria-expanded': "false"}, "Talk Schedule"),
               m("div", {class: "dropdown-menu", 'aria-labelledby':"navbarDropdown"}, [
                   m("a", {class: x("/sessions1"), href: "#!/sessions1"}, "Day 1 (3 Sept)"),
                   m("a", {class: x("/sessions2"), href: "#!/sessions2"}, "Day 2 (4 Sept)"),
                   m("a", {class: x("/sessions3"), href: "#!/sessions3"}, "Day 3 (5 Sept)")])]),
            m("li", {class: "nav-item dropdown"},
              [m("a", {class: "nav-link dropdown-toggle", href: "#", id: "navbarDropdown", role:"button", 'data-toggle': "dropdown", 'aria-haspopup': "true", 'aria-expanded': "false"}, "Poster Sessions"),
               m("div", {class: "dropdown-menu", 'aria-labelledby':"navbarDropdown"}, [
                   m("a", {class: x("/poster_session_1"), href: "#!/poster_session_1"}, "Day 1 (3 Sept)"),
                   m("a", {class: x("/poster_session_2"), href: "#!/poster_session_2"}, "Day 2 (4 Sept)"),
                   m("a", {class: x("/poster_session_3"), href: "#!/poster_session_3"}, "Day 3 (5 Sept)")])]),
            m("li", {class: "nav-item"}, m("a", {class: x("/guideline"), href: "#!/guideline"}, "Conference Guide")),
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
                    m("p", {class: "lead"}, "First things first:"),
                    m("a", {class: "btn btn-info btn-lg btn-block", href: "#!/guideline"}, [
                        Icon("map"), " Conference guide"]), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: zoomregistration_url}, [
                        Icon("pencil-square"), " Register for Zoom webinar"]), m("br"),
                    m("p", {class: "lead"}, "Programme:"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/sessions1"}, [
                        Icon("chat-text"), " Talks day 1"]), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/poster_session_1"}, [
                        Icon("easel"), " Posters day 1"]), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/sessions2"}, [
                        Icon("chat-text"), " Talks day 2"]), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/poster_session_2"}, [
                        Icon("easel"), " Posters day 2"]), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/sessions3"}, [
                        Icon("chat-text"), " Talks day 3"]), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "#!/poster_session_3"}, [
                        Icon("easel"), " Posters day 3"]), m("br"),
                    m("p", {class: "lead"}, "Resources:"),
                    // m("a", {class: "btn btn-primary btn-lg btn-block", href: "AMLaP2020.pdf"}, [
                    //     Icon("book"), " Proceedings"]), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "AMLaP2020.ics"}, [
                        Icon("calendar-week"), " Calendar (.ics)"]), m("br"),
                    m("a", {class: "btn btn-primary btn-lg btn-block", href: "AMLaP2020.bib"}, [
                        Icon("book"), " Bibliography (BibTeX)"]), m("br"),
                    m("br"),
                ])]
    }
}

var TimeZoneWarning = {
    view: function () {
        return m("div", {class: "alert alert-warning"}, "All times are given in UTC+2, i.e. Central European Summer Time.")
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
            if (s.id != null && !isNaN(+s.id)) {  // Regular Talk
                var p = presentations.filter(function(p) {return p.id == s.id})[0]
                var badge = []
                if (s.session.startsWith("Special session"))
                    badge = [m("span", {class: "badge badge-pill badge-success"}, "Special Session"), " "]
                session = [
                    badge,
                    m("a", {class: "lead", href: "a/" + p.id + ".pdf"}, p.title),
                    m("br"), p.authors],
                session = [
                    session,
                    m("br"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "a/" + s.id + ".pdf"}, "Abstract")]
            } else if (session.match(/Keynote [1-5].+/)){
                var n = session.substring(8, 9);
                session = [
                    m("span", {class: "lead", style: "font-weight: bold"}, session),
                    m("br"),
                    m("span", {class: "lead"}, m("a", {href: "a/keynote" + n + ".pdf"}, "Title of keynote " + n + " (t.b.a.)")),
                    m("br"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "a/keynote" + n + ".pdf"}, "Abstract")]
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
                session = m("center", [
                    m("span", {class: "lead", style: "font-weight: bold"}, session), m("br"),
                    m("a", {class: "btn btn-primary btn-sm mr-1", href: gathertown_url, target: "_blank"}, [
                        Icon("emoji-laughing"), " Join us on Gather", " ", Icon("people-fill")])])
            } else if (session.match(/.+ break/)) {
                session = m("center", [
                    m("span", {class: "lead", style: "font-weight: bold"}, session), m("br"),
                    m("a", {class: "btn btn-primary btn-sm mr-1", href: gathertown_url, target: "_blank"}, [
                        Icon("emoji-laughing"), " Join us on Gather", " ", Icon("people-fill")])])
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
                            m("a", {class: "btn btn-primary btn mr-1", href: zoom_url, target: "_blank"}, [Icon("tv"), " Join us on Zoom"]),
                            m("a", {class: "btn btn-primary btn mr-1", href: twitch_url, target: "_blank"}, [Icon("tv"), " Watch on Twitch.tv"]),
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
            var a = authors.split("); ")
            // var a = authors.replace(/ \([^()]+\)/g, "").replace(/ \([^()]+\)/g, "").split("; ")
            // a = a.map(a => [m("a", {href: "#!/authors"}, a), ", "])
            a = a.map(a => [a, "), "])
            a = a.flat()
            a.pop()
            return m("tr", [
                // m("td", m("a", {class: "lead", href: id+".pdf"}, "#" + id)),
                m("td", {class: "lead"}, "#" + id),
                m("td", [
                    m("a", {class: "lead", href: "a/" + id + ".pdf"}, title),
                    m("br"),
                    a,
                    m("br"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "a/" + id + ".pdf"}, "Abstract"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: id + "_poster.pdf"}, "Intro"),
                    m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: jitsi_url_prefix + id}, "Video Q&A"),
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
                if (withdrawn.includes(p.id))
                    continue
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
                        m("h1", {class: "display-4"}, "AMLaP 2020 Conference Guide"),
                        m("p", {class: "lead"}, "Here we briefly explain how you can (and should) participate in the conference.  To get the best possible AMLaP experience, please take a moment to review this information."),
                        m("h2", "I have 1min.  What do I need to know?"),
                        m("ol", [
                            m("li", "AMLaP 2020 has a synchronous format."),
                            m("li", "Participation is free."),
                            m("li", ["We use Zoom for talks.  Please register ", m("a", {href: zoomregistration_url}, "here"), " for the webinar."]),
                            m("li", ["Talks will also be streamed on ", m("a", {href: twitch_url}, "Twitch"), " (no registration required)."]),
                            m("li", ["For more casual interaction during breaks and otherwise we use ", m("a", {href: gathertown_url}, "Gather"), "."]),
                            m("li", ["For poster presentations we offer Jitsi rooms.  Click the buttons ",
                                     m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "#!/guideline"}, "Video Q&A"),
                                     "in program."]),
                            m("li", ["On all platforms, please use the following format for your screen name: ", m("b", "Full Name (Affilitation)"), " or just your full name if you currently don't have an affilitation"]),
                            m("li", "Be nice and have fun!"),
                        ]),
                        m("h2", "Does the conference have a code of conduct?"),
                        m("p", m.trust("Yes, we do.  Our <a href=\"https://amlap2020.org/code-of-conduct\">code of conduct</a> applies throughout the conference and on all platforms (Zoom, Twitch, Gather, Jitsi).")),
                        m("h2", "Do I have to register for AMLaP 2020 and pay a registration fee?"),
                        m("ul", [
                            m("li", ["AMLaP 2020 will be ", m("strong", "completely free for everyone"), ".  Thanks to our sponsor, the ", m("a", {href: "https://www.uni-potsdam.de/en/ling/researchgroups/sfb-1287-limits-of-variability-in-language"}, "Collaborative Research Cluster: Limits of Variability in Language (SFB 1287)"), "."]),
                            m("li", "Registration is required just for the Zoom webinar (not for the other platforms, see below).  All presenters are required to register for the webinar.  Other participants need to register if they intend to ask live questions during the Q&As.  If you're not a presenter and do not intend to ask live questions, you can follow the conference on Twitch without registration."),
                            m("li", [
                                "To register for the Zoom webinar, please click ",
                                m("a", {href: zoomregistration_url}, "here"),
                                ".  After registration, you will receive an e-mail with the meeting details."]),
                            m("li", "You will need a Zoom account to register."),
                            m("li", "Please register ahead of the conference."),
                            m("ul",
                              m("li", "Speakers and session chairs please register at least two weeks ahead of the conference (20 August) so you can participate in our Zoom training session."),
                              m("li", "Poster presenters please register one week ahead (27 Aug).")),
                        ]),
                        m("h2", "What platforms are used for AMLaP?"),
                        m("ul", [
                            m("li", [
                                "The conference uses four platforms:",
                                m("ul", [
                                    m("li", m.trust("<a href=\"https://zoom.us/\">Zoom</a> for talks and live questions during Q&A,")),
                                    m("li", m.trust("<a href=\"https://www.twitch.tv/\">Twitch</a> for live streaming of the talks and text-based chat,")),
                                    m("li", m.trust("<a href=\"https://gather.town\">Gather</a> for social interaction via video and text-based chat during breaks and otherswise,")),
                                    m("li", m.trust("<a href=\"https://meet.jit.si/\">Jitsi</a> for live poster sessions.")),
                                ])]),
                            m("li", [
                                "We tried to keep the barriers for participation as low as possible:",
                                m("ul", [
                                    m("li", "No special software needs to be installed to participate in any aspect of the conference.  All platforms are available via recent web browsers (though the native Zoom client might give a slightly better experience than the Zoom web interface)."),
                                    m("li", "All platforms but Zoom can be used without creating accounts."),
                                    m("li", "Zoom is only needed if you'd like to ask live questions during the Q&As."),
                                ])])]),
                        m("h2", "How can I contribute to the conference apart from watching talks and presenting my research?"),
                        m("ul", [
                            m("li", ["We encourage everyone, particularly more senior colleagues, to participate in the social chat on ", m("a", {href: gathertown_url}, "Gather"), ".  Gather will be available 24h but moderators will be present only during the programme."]),
                            m("li", "If you are a senior researcher, please be approachable to colleagues and particularly early career researchers and students."),
                            m("li", ["If you are an early career researcher or student, please don't hesitate to politely approach more senior colleagues in the social chat on ", m("a", {href: gathertown_url}, "Gather"), "."]),
                        ]),
                        m("h2", "How can I watch talks on Zoom?"),
                        m("ul", [
                            m("li", "A single Zoom webinar will be used for the complete spoken programme of the conference.  This means you'll need just one meeting ID."),
                            m("li", "There's no password for the Zoom webinar since we use registration for access control."),
                        ]),
                        m("p", [
                            m("a", {class: "btn btn-primary btn mr-1", href: zoomregistration_url, target: "_blank"}, [Icon("pencil-square"), " Register for Zoom webinar"]),
                            m("a", {class: "btn btn-primary btn mr-1", href: zoom_url, target: "_blank"}, [Icon("tv"), " Join Zoom webinar"]),]),
                        m("h2", "How can I ask live questions during Q&As?"),
                        m("ul", [
                            m("li", "Submit your question in the Zoom chat as early as possible.  No need to wait until the end of the talk."),
                            m("li", "The session hosts will preselect questions and forward them to the session chair."),
                            m("li", "When your question is selected, we will give you permission to activate your microphone (but not the camera) so you can ask your question directly to the speaker.  Please be ready.  (See question about ensuring good audio quality below.)"),
                            m("li", ["If you didn't get a chance to ask your question, you can talk to the speaker on ", m("a", {href: gathertown_url}, "Gather"), " (see information below).  We encourage speakers to show up there and to be approachable especially to junior researchers."])]),
                        m("h2", "How can I watch talks on Twitch?"),
                        m("ul", [
                            m("li", "Talks will also be livestreamed on Twitch."),
                            m("li", "No account is needed to watch the livestream on Twitch."),
                            m("li", "If you have a Twitch account, you can interact with other audience members in the Twitch chat."),
                            m("li", "With a Twitch account, you will also be able to continue watching videos later if you need to leave for some reason."),
                            m("li", "If you'd like to ask a question during a Q&A following a talk, please use Zoom for that."),
                        ]),
                        m("p", m("a", {class: "btn btn-primary btn mr-1", href: twitch_url, target: "_blank"}, [Icon("tv"), " Watch on Twitch.tv"])),
                        m("h2", "Is there a place for more casual social interaction?"),
                        m("p", "Yes, there is and we're really excited about this!"),
                        m("ul", [
                            m("li", ["We use ", m("a", {href: gathertown_url}, "Gather"), " as our atrium, a place were participants can chat casually, catch up with each other, discuss presentations, ask presenters further questions, and so on.  Gather looks may look a little silly at first, but it works and can be great fun.  So give it a try!"]),
                            m("li", "When you steer your avatar close to a person, you will automatically be connected with them via video chat.  Don't be shy!"),
                            m("li", "To locate someone use the search function in the 'Participants' box on the right."),
                            m("li", "Also note the toolbar at the lower left which has some useful functions and settings."),
                            m("li", "In addition to video chat, Gather can also be used to send private text messages to someone."),
                            m("li", "There is also a global chat for broadcasting messages to everyone.  Use it sparingly."),
                        ]),
                        m("p", m("a", {class: "btn btn-primary btn mr-1", href: gathertown_url, target: "_blank"}, [Icon("emoji-laughing"), " Join us on Gather", " ", Icon("people-fill")])),
                        m("h2", "How can I attend live poster presentations?"),
                        m("ul", [
                            m("li", "For live poster presentations we offer Jitsi video chats, one for each poster."),
                            m("li", ["To access a live poster presentation, use the button ",
                                     m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "#!/guideline"}, "Video Q&A"),
                                     "in the overview of the poster sessions."]),
                            // m("li", "If presenters wish to use an alternative platform for their poster presentation, they can supply us with a link ahead of the conference when registering on Zoom and we'll include it in the program  instead of the Jitsi button.  In case you make use of this option, please make extra sure that the link works properly."),
                            m("li", ["Poster presenters are invited to prepare a short intro to their poster (e.g., a video or slides).  Please use the ",
                                     m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "#!/guideline"}, "Intro"),
                                     "buttons in the poster overview to access it."]), 
                        ]),
                        m("h2", "How can I ensure good audio when using Zoom and Jitsi?"),
                        m("p", "Before joining live discussion or asking a question, please ensure the following:"),
                        m("ul", [
                            m("li", "Test you microphone in advance."),
                            m("li", "Make sure there is no background noise."),
                            m("li", "Preferrably use headphones to avoid feedback loops."),
                            m("li", "Unmute you microphone only when you talk and mute it otherwise."),
                        ]),
                        m("h2", "Where can I ask more questions?"),
                        m("ul", [
                            m("li", [
                                "Speak to a moderator on ",
                                m("a", {href: gathertown_url}, "Gather"),
                                " or in the ",
                                m("a", {href: twitch_url}, "Twitch chat"),
                                "."
                            ]),
                            m("li", m.trust("Or send us an e-mail at <a href=\"mailto:info@amlap2020.org\">info@amlap2020.org</a>.")),

                        ]),
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

