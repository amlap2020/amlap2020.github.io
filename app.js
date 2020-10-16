
var zoom_url = "https://zoom.us/j/93957569698"
var zoomregistration_url = "https://zoom.us/webinar/register/WN_PVp8hJ63Sle9L0yGaqzrRQ"
var twitch_url = "https://twitch.tv/amlap2020"
var gather_url = "https://gather.town/65ZDsKs7IS9aj9V1/amlap2020"
var jitsi_url_prefix = "https://meet.jit.si/AMLaP2020_poster_"

var twitch_recordings = [
    "https://www.twitch.tv/videos/729893069",
    "https://www.twitch.tv/videos/730889999",
    "https://www.twitch.tv/videos/731930258",
]

// The last two are withdrawn because no final abstract was submitted.
var withdrawn = ["311", "325", "271", "324", "5", "296", "306", "144", "78", "3", "36", "287", "203", "294", "64", "44"]

function Icon(name) {
    return m("img", {src: "bootstrap-icons/" + name + ".svg", width: 24, height: 24}, "")
}

var Navigation = {
    view: function() {
        var x = function(route) {if (route == m.route.get()) {return "nav-link active"} else {return "nav-link"}}
        var nav_items = [
            m("li", {class: "nav-item"}, m(m.route.Link, {class: x("/guideline"), href: "guideline"}, "Conference Guide")),
            m("li", {class: "nav-item dropdown"},
              [m("a", {class: "nav-link dropdown-toggle", href: "#", id: "navbarDropdown", role:"button", 'data-toggle': "dropdown", 'aria-haspopup': "true", 'aria-expanded': "false"}, "Talk Schedule"),
               m("div", {class: "dropdown-menu", 'aria-labelledby':"navbarDropdown"}, [
                   m(m.route.Link, {class: x("/sessions1"), href: "sessions1"}, "Day 1 (3 Sept)"),
                   m(m.route.Link, {class: x("/sessions2"), href: "sessions2"}, "Day 2 (4 Sept)"),
                   m(m.route.Link, {class: x("/sessions3"), href: "/sessions3"}, "Day 3 (5 Sept)")])]),
            m("li", {class: "nav-item dropdown"},
              [m("a", {class: "nav-link dropdown-toggle", href: "#", id: "navbarDropdown", role:"button", 'data-toggle': "dropdown", 'aria-haspopup': "true", 'aria-expanded': "false"}, "Poster Sessions"),
               m("div", {class: "dropdown-menu", 'aria-labelledby':"navbarDropdown"}, [
                   m(m.route.Link, {class: x("/poster_session_1"), href: "poster_session_1"}, "Day 1 (3 Sept)"),
                   m(m.route.Link, {class: x("/poster_session_2"), href: "poster_session_2"}, "Day 2 (4 Sept)"),
                   m(m.route.Link, {class: x("/poster_session_3"), href: "poster_session_3"}, "Day 3 (5 Sept)")])]),
        ]
        return m("nav", {class: "navbar sticky-top navbar-expand-md navbar-dark bg-dark"},
                 [
                     m("div", {class: "navbar-brand"}, m(m.route.Link, {href: "", class: "navbar-brand"}, "AMLaP 2020 Programme")),
                     m.trust("<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"> <span class=\"navbar-toggler-icon\"></span> </button>"),
                     m("div", {class: "collapse navbar-collapse", id: "navbarNav"}, m("ul", {class: "navbar-nav"}, nav_items)),
                ])
    }
}

var Overview = {
    view: function() {
        return [m(Navigation),
                m(Announcement),
                m("main", {class: "container", id: "main"}, 
                  m("div", {class: "container-md mb-3"}, [
                      m("p", {class: "lead"}, "Programme:"),
                      m(m.route.Link, {class: "btn btn-primary btn-lg btn-block", href: "sessions1"}, [
                          Icon("chat-text"), " Schedule day 1"]), m("br"),
                      m("a", {class: "btn btn-primary btn-lg btn-block", href: twitch_recordings[0], target:"_blank"}, [
                          Icon("camera-video"), " Watch talks day 1"]), m("br"),
                      m(m.route.Link, {class: "btn btn-primary btn-lg btn-block", href: "poster_session_1"}, [
                          Icon("easel"), " Posters day 1"]), m("br"), m("br"),
                      m(m.route.Link, {class: "btn btn-primary btn-lg btn-block", href: "sessions2"}, [
                          Icon("chat-text"), " Schedule day 2"]), m("br"),
                      m("a", {class: "btn btn-primary btn-lg btn-block", href: twitch_recordings[1], target:"_blank"}, [
                          Icon("camera-video"), " Watch talks day 2"]), m("br"),
                      m(m.route.Link, {class: "btn btn-primary btn-lg btn-block", href: "poster_session_2"}, [
                          Icon("easel"), " Posters day 2"]), m("br"), m("br"),
                      m(m.route.Link, {class: "btn btn-primary btn-lg btn-block", href: "sessions3"}, [
                          Icon("chat-text"), " Schedule day 3"]), m("br"),
                      m("a", {class: "btn btn-primary btn-lg btn-block", href: twitch_recordings[2], target:"_blank"}, [
                          Icon("camera-video"), " Watch talks day 3"]), m("br"),
                      m(m.route.Link, {class: "btn btn-primary btn-lg btn-block", href: "poster_session_3"}, [
                          Icon("easel"), " Posters day 3"]), m("br"),
                      m("p", {class: "lead"}, "Conference bag:"),
                      m(m.route.Link, {class: "btn btn-info btn-lg btn-block", href: "guideline"}, [
                          Icon("map"), " Conference guide"]), m("br"),
                      m(m.route.Link, {class: "btn btn-primary btn-lg btn-block", href: "proceedings"}, [
                          Icon("book"), " Online proceedings"]), m("br"),
                      m("a", {class: "btn btn-primary btn-lg btn-block", href: "AMLaP2020.ics", target:"_blank"}, [
                          Icon("calendar-week"), " Download calendar (.ics)"]), m("br"),
                      m("a", {class: "btn btn-primary btn-lg btn-block", href: "AMLaP2020_abstracts.zip", target:"_blank"}, [
                          Icon("collection"), " Download abstracts (.zip)"]), m("br"),
                      m("a", {class: "btn btn-primary btn-lg btn-block", href: "AMLaP2020.bib", target:"_blank"}, [
                          Icon("bookshelf"), " Download Bibliography (.bib)"]), m("br"),
                      m("br"),
                  ]))]
    }
}

var GatherHarrassmentAnnouncement1 = {
    view: function() {
        return m("div", {class: "alert alert-danger"},
            "Gather service is temporarily suspended due to person who is harrassing other participants.  Gather will be back shortly.")
    }
}

var GatherHarrassmentAnnouncement2 = {
    view: function() {
        return m("div", {class: "alert alert-danger"},
            "Gather service is temporarily suspended due to person who is harrassing other participants.  Gather will be back shortly with a new password which we will announce in the Zoom webinar.")
    }
}

var ZoomDownAnnouncement = {
    view: function() {
        return m("div", {class: "alert alert-danger"}, [
            "We're currently experiencing problems with Zoom.  Please head over to our ",
            m("a", {href: twitch_url, target: "_blank"}, "Twitch channel"),
            " while we're setting up an alternative video stream.",
            m("br"), m("br"),
            "Speakers, your session hosts will contact you with details about how to proceed."])
    }
}

var Announcement = ZoomDownAnnouncement
var Announcement = GatherHarrassmentAnnouncement1
var Announcement = GatherHarrassmentAnnouncement2
var Announcement = ""


var TimeZoneWarning = {
    view: function() {
        return m("div", {class: "alert alert-warning"}, ["All times are given in UTC+2:00, i.e. Central European Summer Time.  For times in your local time zone, please import ", m("a", {href: "AMLaP2020.ics", target:"_blank"}, "our iCalendar file (.ics)"), " into your favorite calendar application."])
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

var Session = {
    view: function(vnode) {
        var s = vnode.attrs.sessionData
        var session = s.session
        var video = videos.filter(function(i) {return i.id == s.id})[0]
        if (s.id != null && !isNaN(+s.id)) {  // Regular Talk
            var p = presentations.filter(function(p) {return p.id == s.id})[0]
            var badge = []
            if (s.session.startsWith("Special session"))
                badge = [m("span", {class: "badge badge-pill badge-success"}, "Special Session"), " "]
            session = [
                badge,
                m("a", {class: "lead", href: "a/" + p.id + ".pdf", target:"_blank"}, p.title),
                m("br"), p.authors],
            session = [
                session,
                m("br"),
                m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "a/" + s.id + ".pdf", target:"_blank"}, "Abstract"),
                m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: video.link, target:"_blank"}, "Video")]
        } else if (session.match(/Opening remarks/)){
            session =
                m("center",
                  m("span", {class: "lead", style: "font-weight: bold"},
                    m("a", {href:"a/openingremarks.pdf", target:"_blank"}, session)))
        } else if (session.match(/Closing remarks/)){
            session =
                m("center",
                  m("span", {class: "lead", style: "font-weight: bold"},
                    m("a", {href:"a/closingremarks.pdf", target:"_blank"}, session)))
        } else if (session.match(/Keynote [1-5].+/)){
            var p = presentations.filter(function(p) {return p.id == s.id})[0]
            session = [
                m("span", {class: "lead", style: "font-weight: bold"}, session),
                m("br"),
                m("span", {class: "lead"}, m("a", {href: "a/" + p.id + ".pdf", target:"_blank"}, p.title)),
                m("br"),
                m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "a/" + p.id + ".pdf", target:"_blank"}, "Abstract"),
                m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: video.link, target:"_blank"}, "Video")]
        } else if (session.match(/Keynote 5.+/)){
            var p = presentations.filter(function(p) {return p.id == s.id})[0]
            session = [
                m("span", {class: "lead", style: "font-weight: bold"}, "Keynote 5: Postponed"),
                m("br"),
                m("span", {class: "lead"}, ["Watch video ",
                                            m("a", {href:"v/k5.mp4", target:"_blank"}, "here"),
                                           "."])
            ]
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
            session = m(m.route.Link, {href: "poster_session_1", class: "lead", style: "font-weight: bold"}, session)
        } else if (session == "Poster session 2") {
            session = m(m.route.Link, {href: "poster_session_2", class: "lead", style: "font-weight: bold"}, session)
        } else if (session == "Poster session 3") {
            session = m(m.route.Link, {href: "poster_session_3", class: "lead", style: "font-weight: bold"}, session)
        } else if (session.match(/Social chat/)) {
            session = m("center", [
                m("span", {class: "lead", style: "font-weight: bold"}, session),
                // m("br"),
                // m("a", {class: "btn btn-primary btn-sm mr-1", href: gather_url, target: "_blank"}, [
                //     Icon("emoji-laughing"), " Join us on Gather", " ", Icon("people-fill")])
            ])
        } else if (session.match(/.+ break/)) {
            session = m("center", [
                m("span", {class: "lead", style: "font-weight: bold"}, session),
                // m("br"),
                // m("a", {class: "btn btn-primary btn-sm mr-1", href: gather_url, target: "_blank"}, [
                //     Icon("emoji-laughing"), " Join us on Gather", " ", Icon("people-fill")])
            ])
        } else {
            session = m("center", {class: "lead", style: "font-weight: bold"}, session)
        }
        return m("tr", [
            m("td", {class: "lead"}, s.start + "﻿–﻿" + s.end),
            m("td", session),
        ])
    }
}

function SessionsFactory(day, date) {
    return {
        oncreate: function() { scrollTo(0,0) },
        view: function() {
            return [m(Navigation),
                    m(Announcement),
                    m("main", {class: "container", id: "main"}, [
                        m("div", {class: "container-md mb-3"}, [
                            m("h1", {class: "display-4"}, "Sessions Day " + day),
                            m("p", {class: "lead"}, date),
                            // m("a", {class: "btn btn-primary btn mr-1", style:"margin-bottom: 1em", href: zoom_url, target: "_blank"}, [Icon("tv"), " Register on Zoom"]),
                            // m("a", {class: "btn btn-primary btn mr-1", href: twitch_recordings[day-1], target: "_blank"}, [Icon("tv"), " Watch recording on Twitch.tv"]),
                            // m("br"), m("br"), m(TimeZoneWarning),
                        ]),
                        m("table", {class: "table table-sm table-striped"}, [
                            m(SessionsTableHeader),
                            m("tbody", amlap2020schedule.filter(s => s.day == day).map(s =>
                                m(Session, {sessionData: s})
                            )),
                        ]),
                    ])
                   ]
        },
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

var Authors = {
    view: function(vnode) {
        var authors = vnode.attrs.authors
        return authors.split("); ").map(a => [a, "), "]).flat().slice(0, -1)
    }
}

var Poster = {
    view: function(vnode) {
        var id = vnode.attrs.id
        var authors = vnode.attrs.authors
        var title = vnode.attrs.title
        var links = vnode.attrs.links
        var x = intros_qas.filter(function(i) {return i.id == id}).slice(-1)
        var intro_button = ""
        var qa_url = jitsi_url_prefix + id
        if (x.length==1) {
            if (x[0].intro) {
                intro_button = m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: x[0].intro, target: "_blank"}, "Intro")
            }
            if (x[0].qa) {
                qa_url = x[0].qa
            }
        }
        return m("tr", [
            // m("td", m("a", {class: "lead", href: id+".pdf"}, "#" + id)),
            m("td", {class: "lead"}, "#" + id),
            m("td", [
                m("a", {class: "lead", href: "a/" + id + ".pdf", target: "_blank"}, title),
                m("br"),
                m(Authors, {authors: authors}),
                m("br"),
                m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: "a/" + id + ".pdf", target: "_blank"}, "Abstract"),
                intro_button,
                // m("a", {class: "btn btn-primary btn-sm py-0 mr-1", href: qa_url, target: "_blank"}, "Video Q&A"),
            ])
        ])
    }
}

function PosterSessionFactory(number, date) {
    return {
        oncreate: function() { scrollTo(0,0) },
        view: function() {
            return [m(Navigation),
                    m(Announcement),
                    m("main", {class: "container", id: "main"}, [
                        m("div", {class: "container-md mb-3"}, [
                            m("h1", {class: "display-4"}, "Poster session " + number),
                            m("p", {class: "lead"}, date),
                            m(TimeZoneWarning),
                        ]),
                        m("table", {class: "table table-sm table-striped"}, [
                            m(PosterTableHeader),
                            m("tbody", presentations
                                .filter(p => !withdrawn.includes(p.id) && p.session == `Poster session ${number}`)
                                .map(p => m(Poster, {id: p.id, authors: p.authors, title: p.title})))
                        ])
                    ])]
        }
    }
}

var PosterSession1 = PosterSessionFactory(1, "Thursday, 3 September 2020, 16:00–17:30 (UTC+2)")
var PosterSession2 = PosterSessionFactory(2, "Friday, 4 September 2020, 14:00–15:30 (UTC+2)")
var PosterSession3 = PosterSessionFactory(3, "Saturday, 5 September 2020, 10:00–11:30 (UTC+2)")

var Abstract = {
    view: function(vnode) {
        var id = vnode.attrs.id
        var authors = vnode.attrs.authors
        var title = vnode.attrs.title
        var links = vnode.attrs.links
        return m("tr", [
            m("td", {class: "lead"}, "#" + id),
            m("td", [
                m("a", {class: "lead", href: "a/" + id + ".pdf", target: "_blank"}, title),
                m("br"), m(Authors, {authors: authors}),
            ])
        ])
    }
}

var ProceedingsTable = {
    view: function(vnode) {
        var only = vnode.attrs.only
        return m("table", {class: "table table-sm table-striped"}, [
            m(PosterTableHeader),
            m("tbody", presentations.filter(only)
                .map(p => m(Abstract, {id: p.id, authors: p.authors, title: p.title})))
        ])
    }
}

var Proceedings = {
    oncreate: function() { scrollTo(0,0) },
    view: function() {
        return [m(Navigation),
                m(Announcement),
                m("main", {class: "container", id: "main"}, [
                    m("div", {class: "container-md mb-3"}, [
                        m("h1", {class: "display-4"}, "Online proceedings"),
                        m("p", {class: "lead"}, "All abstracts, ordered by category (keynotes, main session talks, special session talks, posters) and by abstract ID within category.  Use your browser's search function if you're looking for something specific."),
                        m("h2", {class: "display-5"}, "Keynotes")]),
                    m(ProceedingsTable, {only: p => p.session.startsWith("Keynote ")}),
                    m("div", {class: "container-md mb-3"}, [
                        m("h2", {class: "display-5"}, "Main session")]),
                    m(ProceedingsTable, {only: p => p.session.startsWith("Main session ")}),
                    m("div", {class: "container-md mb-3"}, [
                        m("h2", {class: "display-5"}, "Special session")]),
                    m(ProceedingsTable, {only: p => p.session.startsWith("Special session ")}),
                    m("div", {class: "container-md mb-3"}, [
                        m("h2", {class: "display-5"}, "Poster session 1")]),
                    m(ProceedingsTable, {only: p => p.session.startsWith("Poster session 1") && !withdrawn.includes(p.id)}),
                    m("div", {class: "container-md mb-3"}, [
                        m("h2", {class: "display-5"}, "Poster session 2")]),
                    m(ProceedingsTable, {only: p => p.session.startsWith("Poster session 2") && !withdrawn.includes(p.id)}),
                    m("div", {class: "container-md mb-3"}, [
                        m("h2", {class: "display-5"}, "Poster session 3")]),
                    m(ProceedingsTable, {only: p => p.session.startsWith("Poster session 3") && !withdrawn.includes(p.id)}),
                ])]

    }
}

var Guideline = {
    oncreate: function() { scrollTo(0,0) },
    view: function() {
        return [m(Navigation),
                m(Announcement),
                m("main", {class: "container", id: "main"}, [
                    m("div", {class: "container-md mb-3"}, [
                        m("h1", {class: "display-4"}, "AMLaP 2020 Conference Guide"),
                        m("p", {class: "lead"}, "Here we briefly explain how you can (and should) participate in the conference.  To get the best possible AMLaP experience, please take a moment to review this information."),
                        m("h2", "I have 1min.  What do I need to know?"),
                        m("ol", [
                            m("li", "AMLaP 2020 has a synchronous format."),
                            m("li", ["We use Zoom for talks.  Please register ", m("a", {href: zoomregistration_url, target: "_blank"}, "here"), " for the webinar."]),
                            m("li", ["Talks will also be streamed on ", m("a", {href: twitch_url, target: "_blank"}, "Twitch"), " (no registration required)."]),
                            m("li", ["For more casual interaction during breaks and otherwise we use ", m("a", {href: gather_url, target: "_blank"}, "Gather"), "."]),
                            m("li", ["For poster presentations we offer Jitsi rooms.  Click the buttons ",
                                     m(m.route.Link, {class: "btn btn-primary btn-sm py-0 mr-1", href: "guideline"}, "Video Q&A"),
                                     "in the program to enter."]),
                            m("li", ["On all platforms, please use the following format for your screen name: ", m("i", "\"Full Name (Affilitation)\""), " or just ", m("i", "\"Full Name\""), " if you currently don't have an affilitation."]),
                            m("li", "Be nice and have fun! 🎉"),
                        ]),
                        m("h2", "Does the conference have a code of conduct?"),
                        m("ul", [
                            m("li", ["Our code of conduct can be found ", m("a", {href:"https://amlap2020.org/code-of-conduct", target:"_blank"}, "here"), "."]),
                            m("li", "It applies throughout the conference and on all platforms (Zoom, Twitch, Gather, Jitsi).")]),
                        m("h2", "Do I have to register for AMLaP 2020 and pay a registration fee?"),
                        m("ul", [
                            m("li", ["AMLaP 2020 is ", m("strong", "completely free for everyone"), " thanks to our sponsor, the ", m("a", {href: "https://www.uni-potsdam.de/en/ling/researchgroups/sfb-1287-limits-of-variability-in-language", target:"_blank"}, "Collaborative Research Cluster: Limits of Variability in Language (SFB 1287)"), "."]),
                            m("li", "Registration is required just for the Zoom webinar."),
                            m("li", "All presenters are required to register for the webinar.  Other participants need to register if they wish to ask questions during the live Q&As."),
                            m("li", "If you're not a presenter and do not intend to ask live questions, you can follow the conference on Twitch without registration."),
                            m("li", [
                                "To register for the Zoom webinar, please click ",
                                m("a", {href: zoomregistration_url, target: "_blank"}, "here"),
                                ".  After registration, you will receive an e-mail with the Zoom webinar details."]),
                        ]),
                        m("h2", "How can I watch talks on Zoom?"),
                        m("ul", [
                            m("li", "A single Zoom webinar will be used for the complete spoken programme of the conference.  This means you'll need just one meeting ID."),
                            m("li", "There's no password for the Zoom webinar (we use the registration for access control)."),
                        ]),
                        m("p", [
                            m("a", {class: "btn btn-primary btn mr-1", style:"margin-bottom: 1em", href: zoomregistration_url, target: "_blank"}, [Icon("pencil-square"), " Register for Zoom webinar"]),
                            m("a", {class: "btn btn-primary btn mr-1", style:"margin-bottom: 1em", href: zoom_url, target: "_blank"}, [Icon("tv"), " Join Zoom webinar"]),]),
                        m("h2", "How can I ask live questions during Q&As?"),
                        m("ul", [
                            m("li", "Submit your questions using the Q&A button in the bottom part of the Zoom window.  You can ask questions at any time; there’s no need to wait until the end of the talk."),
                            m("li", "We aim to balance questions from senior and junior participants.  Please indicate your tenure status when asking a question."),
                            m("li", "The session hosts will preselect questions and forward them to the session chair."),
                            m("li", "When your question is selected, we will give you permission to activate your microphone (but not the camera) so you can ask your question directly to the speaker.  Please be ready.  (See question about ensuring good audio quality below.)"),
                            m("li", ["If you didn't get a chance to ask your question, you can talk to the speaker on ", m("a", {href: gather_url, target: "_blank"}, "Gather"), " (see information below).  We encourage speakers to show up there and to be approachable especially to junior researchers."])]),
                        m("h2", "How can I watch talks on Twitch?"),
                        m("ul", [
                            m("li", "Talks will also be livestreamed on Twitch."),
                            m("li", "No account is needed to watch the livestream on Twitch."),
                            m("li", "However, if you have a Twitch account, you will  be able to continue watching later if you need to leave."),
                            m("li", "If you'd like to ask a question during live Q&As following talks, please use Zoom."),
                        ]),
                        m("p", m("a", {class: "btn btn-primary btn mr-1", href: twitch_url, target: "_blank"}, [Icon("tv"), " Watch on Twitch.tv"])),
                        m("h2", "How can I use Gather to socialize with other participants?"),
                        m("ul", [
                            m.trust("<center style=\"margin: 2em;\"><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/01wxN1mEWbY\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe></center>"),
                            m("li", "Gather is a virtual conference building in which you can walk around and meet people.  We use Gather as our atrium, a place were participants can casually chat, catch up with each other, discuss presentations, ask presenters further questions, and so on.  Gather looks a little silly at first, but it works quite well and can be great fun.  So give it a try!"),
                            m("li", "When you steer your avatar close to a person, you will automatically be connected with them via video chat.  Don't be shy!"),
                            m("li", "To locate someone use the search function in the 'Participants' box on the right, click on the person, and then click on 'locate'."),
                            m("li", "Also note the toolbar at the lower left which has some useful functions and settings."),
                            m("li", "In addition to video chat, Gather can also be used to send private text messages."),
                            m("li", "There is also a global chat for broadcasting messages to everyone.  Use it sparingly."),
                            m("li", "If you are a senior researcher, please be approachable to colleagues and particularly early career researchers and students."),
                            m("li", "If you are an early career researcher or student, please don't hesitate to politely approach more senior colleagues in the social chat on Gather."),
                            m("li", "Gather will be available 24h but moderators will be present only during the programme (9:00 to 18:00 CEST)."),
                            m("li", "AMLaP team members will have screen names starting with \"AMLaP\". Feel free to approach them with questions.  There is also a help desk to the left of the welcome sign at the top (North) of the map."),
                        ]),
                        m("p", m("a", {class: "btn btn-primary btn mr-1", href: gather_url, target: "_blank"}, [Icon("emoji-laughing"), " Join us on Gather", " ", Icon("people-fill")])),
                        m("h2", "How can I attend live poster presentations?"),
                        m("ul", [
                            m("li", "For live poster presentations we offer Jitsi video chats, one for each poster."),
                            m("li", ["To access a live poster presentation, use the button ",
                                     m(m.route.Link, {class: "btn btn-primary btn-sm py-0 mr-1", href: "guideline"}, "Video Q&A"),
                                     "in the overview of the poster sessions."]),
                            // m("li", "If presenters wish to use an alternative platform for their poster presentation, they can supply us with a link ahead of the conference when registering on Zoom and we'll include it in the program  instead of the Jitsi button.  In case you make use of this option, please make extra sure that the link works properly."),
                            m("li", ["Poster presenters were invited to prepare short intros to their posters (e.g., a video or slides).  Please use the ",
                                     m(m.route.Link, {class: "btn btn-primary btn-sm py-0 mr-1", href: "guideline"}, "Intro"),
                                     "buttons in the poster overviews to access them."]),
                        ]),
                        m("h2", "How can I ensure good audio quality when using Zoom, Gather, and Jitsi?"),
                        m("p", "Before joining live discussion or asking a question, please ensure the following:"),
                        m("ul", [
                            m("li", "Test you microphone in advance."),
                            m("li", "Make sure there is as little background noise as possible."),
                            m("li", "Preferrably use headphones to avoid feedback loops."),
                            m("li", "Unmute you microphone only when you talk and mute it otherwise."),
                        ]),
                        m("h2", "What if I have a question that's not covered here?"),
                        m("ul", [
                            m("li", [
                                "Speak to a AMLaP team members on ",
                                m("a", {href: gather_url, target: "_blank"}, "Gather"),
                                ".  Team members can be recognized by their screen names: ", m("i", "\"AMLaP Full Name\"")
                            ]),
                            m("li", ["Or send us an e-mail at: ", m("a", {href:"mailto:info@amlap2020.org"}, "info@amlap2020.org")]),
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
    "/all": Proceedings,
    "/proceedings": Proceedings,
    "/guideline": Guideline ,
})
