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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseUrl = "http://designed.mit.edu/gallery/data/";

var GalleryContent = React.createClass({
    displayName: 'GalleryContent',

    render: function render() {
        console.log('react loaded');
        var years = Object.keys(DATA);
        console.log(years);
        var yearSections = [];
        for (var i in years) {
            var year = years[i];
            yearSections.push(React.createElement(
                'div',
                null,
                React.createElement(
                    'h2',
                    null,
                    year
                ),
                React.createElement(
                    'h3',
                    null,
                    DATA[year].themeName
                ),
                this.renderGalleryYear(2015)
            ));
        }
        return React.createElement(
            'div',
            null,
            yearSections
        );
    },

    renderGalleryYear: function renderGalleryYear(year) {
        // var ideas = this.props.project.deliverables.ideas;
        var teams = [];
        var projects = DATA[year].projects;

        for (var s in projects) {
            var backgroundUrl = 'url("' + baseUrl + year + '/final/photos/small/' + s + '1.jpg")';
            var teamUrl = 'view.html?year=' + year + '&team=' + s;
            teams.push(React.createElement(
                'a',
                { href: teamUrl },
                React.createElement(
                    'div',
                    { style: { backgroundImage: backgroundUrl }, className: 'thumbnail-bg' },
                    React.createElement(
                        'div',
                        { className: 'product-info' },
                        React.createElement(
                            'h4',
                            null,
                            projects[s].projName
                        ),
                        React.createElement(
                            'p',
                            null,
                            projects[s].projDesc
                        )
                    )
                )
            ));
        }

        return React.createElement(
            'div',
            { className: 'thumbnail-container' },
            teams
        );
    }
});

$(function () {

    ReactDOM.render(React.createElement(GalleryContent, null), document.getElementById('gallery-content'));

    /*
    
        var baseUrl = "http://designed.mit.edu/gallery/data/"
        var colors = ['blue', 'orange', 'red', 'pink', 'silver', 'purple', 'green', 'yellow'];
        var years = [2015, 2014, 2013, 2012];
        var themes = ['Magic', 'Adventure', 'Be Well', 'Outdoors'];
    
        for (var j in years) {
            var year = years[j];
            var theme = themes[j]
    
            var $h2 = $('<h2>' + year + '</h2>')
            var $h3 = $('<h3>' + theme + '</h3>')
    
            var $thumbnailContainer = $('<div class="thumbnail-container"></div>')
            for (var i in colors) {
                var url = baseUrl + year + '/final/photos/small/' + colors[i] + '1.jpg';
                console.log(url);
                var $thumbnail = $('<a href=""></a>')
                var $thumbnailBg = $('<div class="thumbnail-bg"></div>')
    
                $thumbnailBg.append(`
                <div class="product-info">
                    <h4>Name of Product</h4>
                    <p>Description of Product</p>
                </div>
                `);
    
                $thumbnailBg.css('background-image', 'url(' + url + ')');
                $thumbnail.append($thumbnailBg);
                $thumbnailContainer.append($thumbnail);
            }
            $('.gallery-container').append($h2).append($h3).append($thumbnailContainer);
        }
        */
});

/***/ })
/******/ ]);