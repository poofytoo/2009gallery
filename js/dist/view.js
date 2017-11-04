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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Navigation = exports.updateNavigationBar = undefined;

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseUrl = "http://designed.mit.edu/gallery/data/";

var updateNavigationBar = exports.updateNavigationBar = function updateNavigationBar() {
    if ($(window).scrollTop() < 10) {
        $('.navigation').removeClass('condensed');
        $('h1').removeClass('condensed');
        $('h2').removeClass('condensed');
    } else if (!$('.navigation').hasClass('condensed')) {
        $('.navigation').addClass('condensed');
        $('h1').addClass('condensed');
        $('h2').addClass('condensed');
    }
};

var Navigation = exports.Navigation = React.createClass({
    displayName: "Navigation",

    getInitialState: function getInitialState() {
        console.log('whatttt yearrr is itttt', this.props.teamYear);
        return {
            teamColor: this.props.teamColor,
            teamYear: this.props.teamYear,
            isYearDropdownVisible: false,
            isTeamDropdownVisible: false
        };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        $("body").on("click", function (event) {
            // react and jquery events aren't playing nice with each other
            if (!$(event.target).hasClass("nav-select") && !$(event.target).hasClass("year-item") && !$(event.target).parents(".year-item").length === 0) {
                _this.setState({
                    isYearDropdownVisible: false,
                    isTeamDropdownVisible: false
                });
            }
        });

        $(document).scroll(function () {
            if (_this.state.isYearDropdownVisible || _this.state.isTeamDropdownVisible) {
                _this.setState({
                    isTeamDropdownVisible: false,
                    isYearDropdownVisible: false
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
                "a",
                { href: "/" },
                React.createElement(
                    "div",
                    { className: "year-select nav-select" },
                    "All Projects"
                )
            ),
            React.createElement(
                "span",
                { className: "arrow" },
                ">"
            ),
            React.createElement(
                "div",
                { className: "year-select nav-select", onClick: this.toggleYearDropdown },
                this.state.teamYear !== undefined ? "Fall " + this.state.teamYear : "Select year",
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
                {
                    className: (0, _classnames2.default)("team-select nav-select", { "disabled-select": this.state.teamYear === undefined }),
                    onClick: this.toggleTeamDropdown
                },
                this.state.teamColor !== undefined ? this.state.teamColor + " Team" : "Select team",
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
        var year = this.state.teamYear; // dynamically loaded
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
            { key: "all" },
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
        var years = Object.keys(DATA).reverse();
        var _this = this;
        for (var i in years) {
            // var backgroundUrl = `url('${baseUrl}${year}/final/photos/small/${i}1.jpg')`;
            // var teamUrl = `view.html?year=${year}&team=${i}`
            var year = years[i];
            yearsList.push(React.createElement(
                "li",
                { key: year },
                React.createElement(
                    "a",
                    { onClick: this.getYearHandler(year), className: "year-item" },
                    React.createElement(
                        "em",
                        null,
                        DATA[year].themeName
                    ),
                    " Fall ",
                    year,
                    React.createElement(
                        "span",
                        { className: "dim" },
                        Object.keys(DATA[year].projects).length,
                        " projects"
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
    getYearHandler: function getYearHandler(year) {
        var _this = this;

        var handler = function handler(event) {
            event.stopPropagation();
            _this.setState({
                teamYear: year,
                isYearDropdownVisible: false,
                isTeamDropdownVisible: true
            });
        };
        return handler;
    },
    toggleYearDropdown: function toggleYearDropdown(event) {
        event.stopPropagation();
        this.setState({ isYearDropdownVisible: !this.state.isYearDropdownVisible, isTeamDropdownVisible: false });
    },
    toggleTeamDropdown: function toggleTeamDropdown(event) {
        event.stopPropagation();
        if (this.state.teamYear !== undefined) {
            this.setState({
                isTeamDropdownVisible: !this.state.isTeamDropdownVisible,
                isYearDropdownVisible: false
            });
        }
    }
});

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _nav = __webpack_require__(0);

var _colors = __webpack_require__(5);

var baseUrl = "http://designed.mit.edu/gallery/";

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var TeamContent = React.createClass({
    displayName: "TeamContent",

    render: function render() {
        var project = this.props.project;

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
                "div",
                { className: "team-photo" },
                React.createElement(
                    "a",
                    { href: baseUrl + ("data/" + this.props.year + "/final/photos/original/" + project.projColor + "1.jpg") },
                    React.createElement("img", { src: baseUrl + ("data/" + this.props.year + "/final/photos/small/" + project.projColor + "1.jpg") })
                ),
                React.createElement(
                    "a",
                    { href: baseUrl + ("data/" + this.props.year + "/final/photos/original/" + project.projColor + "2.jpg") },
                    React.createElement("img", { src: baseUrl + ("data/" + this.props.year + "/final/photos/small/" + project.projColor + "2.jpg") })
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
                var highlightColor = _colors.classColors[project.projColor];
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
            var highlightColor = _colors.classColors[project.projColor];
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

            ReactDOM.render(React.createElement(_nav.Navigation, { teamColor: urlLocation.team, teamYear: urlLocation.year }), document.getElementById('navigation'));

            // TODO: Figure out Clipboardy
            new Clipboard('.btn');

            // handle scrolling after the DOM has rendered our elements
            $(window).scroll(function () {
                updateSidemenuHighlight();
                (0, _nav.updateNavigationBar)();
            });

            (0, _nav.updateNavigationBar)();
            buildSidemenu();

            locationHash = window.location.hash;
            if (locationHash !== undefined && locationHash !== "") {
                if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                }
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var classColors = exports.classColors = {
    blue: "#0000ee",
    red: "red",
    orange: "orange",
    yellow: "yellow",
    silver: "silver",
    pink: "pink",
    purple: "purple",
    green: "green"
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ })
/******/ ]);