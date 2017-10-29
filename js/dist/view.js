/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _nav = __webpack_require__(4);

var baseUrl = "http://designed.mit.edu/gallery/";

// TODO: Move into global variables

var classColors = {
    blue: "blue",
    red: "red",
    orange: "orange",
    yellow: "yellow",
    silver: "silver",
    pink: "pink",
    purple: "purple",
    green: "green"
};

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var TeamContent = React.createClass({
    displayName: "TeamContent",

    render: function render() {
        console.log('hey what is htis', this.props.project.deliverables);
        var project = this.props.project;
        console.log('project', project);
        return React.createElement(
            "div",
            { className: "project-content" },
            React.createElement(
                "h2",
                { className: "fixed-topbar" },
                project.projName
            ),
            React.createElement(
                "h3",
                { className: "team" },
                "Team"
            ),
            React.createElement(
                "p",
                null,
                project.projTeam
            ),
            React.createElement("p", null),
            React.createElement(
                "div",
                { className: "additional-links" },
                React.createElement(
                    "a",
                    { href: project.projCode },
                    "Team Code of Ethics"
                )
            ),
            React.createElement(
                "h3",
                { className: "3-ideas" },
                "3 Ideas"
            ),
            this.renderIdeaPosters(),
            React.createElement(
                "h3",
                { className: "sketch-models" },
                "Sketch Models"
            ),
            this.renderTeamSections("sketch models", "sketch"),
            React.createElement(
                "h3",
                { className: "mock-ups" },
                "Mock-ups"
            ),
            this.renderTeamSections("mock-up", "mockup"),
            React.createElement(
                "h3",
                { className: "assembly" },
                "Assembly Review"
            ),
            this.renderAssemblySection(),
            React.createElement(
                "h3",
                { className: "technical-review" },
                "Technical Review"
            ),
            this.renderTechReviewSection(),
            React.createElement(
                "h3",
                { className: "final" },
                "Final Presentation"
            ),
            this.renderFinalSection()
        );
    },

    renderIdeaPosters: function renderIdeaPosters(sectionLetter) {
        var ideas = this.props.project.deliverables.ideas;

        var project = this.props.project;
        var year = this.props.year;

        var ideasPics = [];
        var prevSection = "";
        var sections = [];
        for (var s in ideas) {
            if (prevSection.charAt(0) !== s.charAt(0)) {
                if (ideasPics.length > 0) {
                    sections.push(React.createElement(
                        "p",
                        { className: "posters" },
                        ideasPics
                    ));
                    ideasPics = [];
                }
                var highlightColor = classColors[project.projColor];
                sections.push(React.createElement(
                    "h4",
                    { key: "ideas-header-" + s.charAt(0) },
                    React.createElement(
                        "span",
                        { className: "section-tag", style: { borderColor: highlightColor } },
                        "Section\xA0",
                        React.createElement(
                            "em",
                            null,
                            s.charAt(0)
                        )
                    )
                ));
                prevSection = s;
            }
            ideasPics.push(React.createElement("img", { className: "poster", src: baseUrl + ("data/" + year + "/ideas/" + project.projColor + s + ".jpg"), key: "idea-" + s }));
        }
        sections.push(React.createElement(
            "p",
            { className: "posters" },
            ideasPics
        ));
        return sections;
    },

    renderTeamSections: function renderTeamSections(sectionDisplayName, sectionKey) {
        var project = this.props.project;
        var year = this.props.year;
        var sectionTeams = project.deliverables[sectionKey];

        var elements = [];
        for (var s in sectionTeams) {
            var highlightColor = classColors[project.projColor];
            elements.push(React.createElement(
                "h4",
                { key: sectionKey + "-" + s + "-header" },
                React.createElement(
                    "span",
                    { className: "section-tag", style: { borderColor: highlightColor } },
                    sectionDisplayName,
                    React.createElement(
                        "em",
                        null,
                        " ",
                        s
                    )
                ),
                " ",
                sectionTeams[s].name
            ), React.createElement(
                "div",
                { className: "milestone-container", key: sectionKey + "-" + s },
                React.createElement(
                    "div",
                    { className: "milestone-media" },
                    React.createElement("iframe", { src: "https://player.vimeo.com/video/" + sectionTeams[s].vimeoId, width: "400", height: "240", frameborder: "0", webkitallowfullscreen: true, mozallowfullscreen: true,
                        allowfullscreen: true }),
                    React.createElement(
                        "div",
                        { className: "milestone-images" },
                        React.createElement(
                            "a",
                            { href: baseUrl + ("data/" + year + "/" + sectionKey + "/photos/" + project.projColor + s + "_1.jpg") },
                            React.createElement("img", { src: baseUrl + ("data/" + year + "/" + sectionKey + "/photos/" + project.projColor + s + "_1_sm.jpg") })
                        ),
                        React.createElement(
                            "a",
                            { href: baseUrl + ("data/" + year + "/" + sectionKey + "/photos/" + project.projColor + s + "_2.jpg") },
                            React.createElement("img", { src: baseUrl + ("data/" + year + "/" + sectionKey + "/photos/" + project.projColor + s + "_2_sm.jpg") })
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "additional-links" },
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "a",
                            { href: baseUrl + ("data/" + year + "/" + sectionKey + "/slides/" + project.projColor + s + ".pdf") },
                            "View Presentation Slides"
                        )
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "a",
                            { href: baseUrl + ("data/" + year + "/" + sectionKey + "/movies/" + project.projColor + s), download: true },
                            "Download Original Video"
                        )
                    )
                )
            ));
        }

        return elements;
    },

    renderAssemblySection: function renderAssemblySection() {
        var project = this.props.project;
        var year = this.props.year;
        var assembly = project.deliverables.assembly;

        return [React.createElement(
            "div",
            { className: "milestone-container", key: "assembly-section" },
            React.createElement(
                "div",
                { className: "milestone-media" },
                React.createElement(
                    "div",
                    { className: "milestone-images" },
                    React.createElement(
                        "a",
                        { href: baseUrl + ("data/" + year + "/assembly/" + project.projColor + "Assembly.jpg") },
                        React.createElement("img", { className: "assembly-image", src: baseUrl + ("data/" + year + "/assembly/" + project.projColor + "Assembly.jpg") })
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "additional-links" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "a",
                        { href: baseUrl + ("data/" + year + "/assembly/movies/" + project.projColor), download: true },
                        "Download Original Video"
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "a",
                        { href: baseUrl + ("data/" + year + "/assembly/" + project.projColor + "Contract.pdf") },
                        "View Product Contract"
                    )
                )
            )
        )];
    },

    renderTechReviewSection: function renderTechReviewSection() {
        var project = this.props.project;
        var year = this.props.year;
        var section = project.deliverables.tech;

        return [React.createElement(
            "div",
            { className: "milestone-container", key: "assembly-section" },
            React.createElement(
                "div",
                { className: "milestone-media" },
                React.createElement("iframe", { src: "https://player.vimeo.com/video/" + section.vimeoId, width: "400", height: "240", frameborder: "0", webkitallowfullscreen: true, mozallowfullscreen: true,
                    allowfullscreen: true }),
                React.createElement(
                    "div",
                    { className: "milestone-images" },
                    React.createElement(
                        "a",
                        { href: baseUrl + ("data/" + year + "/tech/photos/" + project.projColor.capitalize() + "1.jpg") },
                        React.createElement("img", { src: baseUrl + ("data/" + year + "/tech/photos/" + project.projColor.capitalize() + "1_sm.jpg") })
                    ),
                    React.createElement(
                        "a",
                        { href: baseUrl + ("data/" + year + "/tech/photos/" + project.projColor.capitalize() + "2.jpg") },
                        React.createElement("img", { src: baseUrl + ("data/" + year + "/tech/photos/" + project.projColor.capitalize() + "2_sm.jpg") })
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "additional-links" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "a",
                        { href: baseUrl + ("data/" + year + "/tech/movies/" + project.projColor), download: true },
                        "Download Original Video"
                    )
                )
            )
        )];
    },

    renderFinalSection: function renderFinalSection() {
        var project = this.props.project;
        var year = this.props.year;
        var section = project.deliverables.final;

        return [React.createElement(
            "div",
            { className: "milestone-container", key: "assembly-section" },
            React.createElement(
                "div",
                { className: "milestone-media" },
                React.createElement("iframe", { src: "https://player.vimeo.com/video/" + section.vimeoId, width: "400", height: "240", frameborder: "0", webkitallowfullscreen: true, mozallowfullscreen: true,
                    allowfullscreen: true }),
                React.createElement(
                    "div",
                    { className: "milestone-images" },
                    React.createElement(
                        "a",
                        { href: baseUrl + ("data/" + year + "/final/photos/original/" + project.projColor + "1.jpg") },
                        React.createElement("img", { src: baseUrl + ("data/" + year + "/final/photos/small/" + project.projColor + "1.jpg") })
                    ),
                    React.createElement(
                        "a",
                        { href: baseUrl + ("data/" + year + "/final/photos/original/" + project.projColor + "2.jpg") },
                        React.createElement("img", { src: baseUrl + ("data/" + year + "/final/photos/small/" + project.projColor + "2.jpg") })
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "additional-links" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "a",
                        { href: baseUrl + ("data/" + year + "/final/slides/" + project.projColor + ".pdf") },
                        "View Presentation Slides"
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "a",
                        { href: baseUrl + ("data/" + year + "/final/extras/" + project.projColor + "_brochure.pdf") },
                        "View Product Brochure"
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "a",
                        { href: baseUrl + ("data/" + year + "/tech/movies/" + project.projColor), download: true },
                        "Download Original Video"
                    )
                )
            )
        )];
    }
});

var sections = {
    'team': 1,
    '3-ideas': 2,
    'sketch-models': 3,
    'mock-ups': 4
};

var scrollBreaks = [];

function updateNavigationBar() {
    if ($(window).scrollTop() < 10) {
        $('.navigation').removeClass('condensed');
        $('h1').removeClass('condensed');
        $('h2').removeClass('condensed');
    } else if (!$('.navigation').hasClass('condensed')) {
        console.log('here');
        $('.navigation').addClass('condensed');
        $('h1').addClass('condensed');
        $('h2').addClass('condensed');
    }
}

function updateSidemenuHighlight() {
    var closestSection = 0;
    var section = 'team';
    var scrollTop = $(window).scrollTop();
    var offset = 200;
    for (var i in sections) {
        if (sections[i] < scrollTop + offset && closestSection < sections[i]) {
            closestSection = sections[i];
            section = i;
        }
    }
    $('h3').each(function () {
        $('li').removeClass('sidemenu-highlight');
    });
    $('li.m-' + section).addClass('sidemenu-highlight');

    window.location.hash = section;
}

function scrollToSection(section) {
    $(window).scrollTo($('h3.' + section), {
        offset: -50,
        duration: 200
    });
    updateSidemenuHighlight();
}

function buildSidemenu() {
    $('h3').each(function () {
        sections[$(this).attr('class')] = $(this).offset().top;
    });
    $('.project-sidemenu').on('click', 'li', function () {
        scrollToSection($(this).data('section'));
    });
}

var locationHash;

$(function () {
    function parseQuery(qstr) {
        if (qstr === undefined || qstr.length === 0) {
            return {};
        }

        var query = {};
        var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
    }

    var urlLocation = parseQuery(window.location.search);
    if (urlLocation.year != null && DATA[urlLocation.year] !== undefined && urlLocation.team != null && DATA[urlLocation.year].projects !== undefined) {

        var teamProject = DATA[urlLocation.year].projects[urlLocation.team];

        if (teamProject !== undefined) {

            ReactDOM.render(React.createElement(TeamContent, { project: teamProject, year: urlLocation.year }), document.getElementById('project-content'));

            // TODO: Move

            ReactDOM.render(React.createElement(_nav.Navigation, null), document.getElementById('navigation'));

            // TODO: Figure out Clipboardy
            new Clipboard('.btn');

            // handle scrolling after the DOM has rendered our elements
            $(window).scroll(function () {
                updateSidemenuHighlight();
                updateNavigationBar();
            });

            updateNavigationBar();
            buildSidemenu();

            locationHash = window.location.hash;
            console.log(locationHash);
            if (locationHash !== undefined && locationHash !== "") {
                if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                }
                console.log(locationHash);
                scrollToSection(locationHash.replace(/[^\-A-Za-z0-9]/g, ''));
            }
        } else {
            // handle unknown case
        }
    } else {
            // handle bad query param case
        }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var baseUrl = "http://designed.mit.edu/gallery/data/";

var Navigation = exports.Navigation = React.createClass({
    displayName: "Navigation",

    getInitialState: function getInitialState() {
        return {
            isYearDropdownVisible: false,
            isTeamDropdownVisible: false
        };
    },
    componentDidMount: function componentDidMount() {

        var _this = this;

        $("body").on("click", function (event) {
            // react and jquery events aren't playing nice with each other
            if (!$(event.target).hasClass("nav-select")) {
                _this.setState({
                    isYearDropdownVisible: false,
                    isTeamDropdownVisible: false
                });
            }
        });
    },
    componentDidUpdate: function componentDidUpdate(oldProps, oldState) {
        if (!oldState.isTeamDropdownVisible && this.state.isTeamDropdownVisible) {
            $(document).on('mousewheel', '.team-selector', function (e) {

                var event = e.originalEvent,
                    d = event.wheelDelta || -event.detail;
                $('.team-selector').scrollTop($('.team-selector').scrollTop() + (d < 0 ? 1 : -1) * 30);
                e.preventDefault();
            });
        }

        if (!oldState.isYearDropdownVisible && this.state.isYearDropdownVisible) {
            $(document).on('mousewheel', '.year-selector', function (e) {

                var event = e.originalEvent,
                    d = event.wheelDelta || -event.detail;

                $('.year-selector').scrollTop($('.year-selector').scrollTop() + (d < 0 ? 1 : -1) * 30);
                e.preventDefault();
            });
        }
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "year-select nav-select" },
                "All Projects"
            ),
            React.createElement(
                "span",
                { className: "arrow" },
                ">"
            ),
            React.createElement(
                "div",
                { className: "year-select nav-select", onClick: this.toggleYearDropdown },
                "Fall 2015",
                React.createElement(
                    "span",
                    { className: "dropdown-arrow" },
                    "\u25BE"
                ),
                this.maybeRenderYearDropdown()
            ),
            React.createElement(
                "span",
                { className: "arrow" },
                ">"
            ),
            React.createElement(
                "div",
                { className: "team-select nav-select disabled-select", onClick: this.toggleTeamDropdown },
                "Blue Team",
                React.createElement(
                    "span",
                    { className: "dropdown-arrow" },
                    "\u25BE"
                ),
                this.maybeRenderTeamDropdown()
            )
        );
    },
    maybeRenderYearDropdown: function maybeRenderYearDropdown() {
        if (this.state.isYearDropdownVisible) {
            return React.createElement(
                "div",
                { className: "dropdown-selector year-selector" },
                React.createElement(
                    "ul",
                    null,
                    this.renderYearList()
                )
            );
        }
        return undefined;
    },
    maybeRenderTeamDropdown: function maybeRenderTeamDropdown() {
        if (this.state.isTeamDropdownVisible) {
            return React.createElement(
                "div",
                { className: "dropdown-selector team-selector" },
                React.createElement(
                    "ul",
                    { id: "dropdown-selector-list" },
                    this.renderProductList()
                )
            );
        }
        return undefined;
    },
    renderProductList: function renderProductList() {
        var projectList = [React.createElement(
            "li",
            null,
            React.createElement(
                "a",
                { className: "select-none", href: "" },
                React.createElement(
                    "span",
                    { className: "dim" },
                    "View All Products"
                )
            )
        )];
        var year = 2015; // dynamically loaded
        var projects = DATA[year].projects;
        for (var i in projects) {
            var backgroundUrl = "url('" + baseUrl + year + "/final/photos/small/" + i + "1.jpg')";
            var teamUrl = "view.html?year=" + year + "&team=" + i;
            projectList.push(React.createElement(
                "li",
                { className: "selected-dropdown-item" },
                React.createElement(
                    "a",
                    { href: teamUrl },
                    React.createElement("div", { className: "product-image", style: { backgroundImage: backgroundUrl } }),
                    React.createElement(
                        "div",
                        { className: "product-text" },
                        React.createElement(
                            "em",
                            null,
                            projects[i].projName
                        ),
                        " ",
                        i,
                        " Team"
                    )
                )
            ));
        }
        return React.createElement(
            "div",
            null,
            projectList
        );
    },
    renderYearList: function renderYearList() {
        var yearsList = [React.createElement(
            "li",
            null,
            React.createElement(
                "a",
                { href: "" },
                React.createElement(
                    "span",
                    { "class": "dim" },
                    "View All Years"
                )
            )
        )];
        var years = DATA;
        for (var i in years) {
            // var backgroundUrl = `url('${baseUrl}${year}/final/photos/small/${i}1.jpg')`;
            // var teamUrl = `view.html?year=${year}&team=${i}`
            yearsList.push(React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "asdf" },
                    React.createElement(
                        "em",
                        null,
                        "Adventure"
                    ),
                    " Fall 2014",
                    React.createElement(
                        "span",
                        { className: "dim" },
                        "8 projects"
                    )
                )
            ));
        }

        return React.createElement(
            "div",
            null,
            yearsList
        );
    },
    toggleYearDropdown: function toggleYearDropdown(event) {
        event.stopPropagation();
        this.setState({ isYearDropdownVisible: !this.state.isTeamDropdownVisible, isTeamDropdownVisible: false });
    },
    toggleTeamDropdown: function toggleTeamDropdown(event) {
        event.stopPropagation();
        this.setState({ isTeamDropdownVisible: !this.state.isTeamDropdownVisible, isYearDropdownVisible: false });
    }
});

// dropdown-selector-list


/*
<li>
              <a class="select-none" href="">
                <span class="dim">View All Products</span>
              </a>
            </li>
            <li class="selected-dropdown-item">
              <a href="">
                <div class="product-image" style="background-image: url('http://designed.mit.edu/gallery/data/2015/final/photos/small/blue1.jpg')"></div>
                <div class="product-text">
                  <em>Laser Kites</em> Blue Team
                </div>
              </a>
            </li>

                                    <li>
                            <a href="">
                                <span class="dim">View All Years</span>
                            </a>
                        </li>
                        <li>
                            <a href="" class="selected-dropdown-item">
                                <em>Magic</em> Fall 2015
                <span class="dim">8 projects</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <em>Adventure</em> Fall 2014
                                <span class="dim">8 projects</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <em>Outdoors</em> Fall 2013
                <span class="dim">8 projects</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <em>Be Well</em> Fall 2012
                <span class="dim">8 projects</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <em>Adventure</em> Fall 2011
                <span class="dim">8 projects</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <em>Outdoors</em> Fall 2010
                <span class="dim">8 projects</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <em>Be Well</em> Fall 2009
                <span class="dim">8 projects</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <em>Outdoors</em> Fall 2010
                <span class="dim">8 projects</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <em>Be Well</em> Fall 2009
                <span class="dim">8 projects</span>
                            </a>
                        </li>

            */

/***/ })
/******/ ]);