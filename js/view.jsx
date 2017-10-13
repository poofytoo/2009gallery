String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var TeamContent = React.createClass({
    render: function() {
        var project = this.props.project;
        return (
            <div className="project-content">
                <h1 className="fixed-topbar">{project.projColor.capitalize()} Team, Fall 2015</h1>
                <h2 className="fixed-topbar">{project.projName}</h2>
                <h3 className="team">Team</h3>
                <p>{project.projTeam}</p>
                <h3 className="3-ideas">3 Ideas</h3>

                {this.renderIdeaPosters("A")}
                {this.renderIdeaPosters("B")}

                <h3 className="sketch-models">Sketch Models</h3>
                {this.renderSketchModels("A")}
                {this.renderSketchModels("B")}

                <h3 className="mock-ups">Mock-ups</h3>
                {this.renderMockups("A")}
                {this.renderMockups("B")}
            </div>
        );
    },

    renderIdeaPosters: function(sectionLetter) {
        var project = this.props.project;
        var teamSection = project.teamSections[sectionLetter];
        var year = this.props.year;

        var ideasPics = [];
        for (var s = 1; s <= teamSection.numIdeas; s += 1) {
            var sectionId = sectionLetter + s;
            ideasPics.push(
                <img className="poster" src={`data/${year}/ideas/${project.projColor}${sectionId}.jpg`} key={`idea-${sectionId}`} />
            );
        }

        return [
            <h4 key={`ideas-header-${sectionLetter}`}>
                <span className="section-tag">Section
                <em> A</em>
                </span>
            </h4>,
            <p key={`ideas-posters-${sectionLetter}`} className="posters">{ideasPics}</p>,
        ]
    },

    renderSketchModels: function(sectionLetter) {
        var project = this.props.project;
        var teamSection = project.teamSections[sectionLetter];
        var year = this.props.year;

        var sketchModels = [];
        for (var s = 1; s <= teamSection.numSketches; s += 1) {
            var sectionId = sectionLetter + s;
            sketchModels.push(
                <h4 key={`sketch-${sectionLetter}-${s}-header`}>
                    <span className="section-tag">sketch model
                    <em> {sectionLetter.toUpperCase()}-{s}</em>
                    </span> {project[`sketchName${sectionId}`]}</h4>,
                <div className="milestone-container" key={`sketch-${sectionLetter}-${s}-model`}>
                    <div className="milestone-media">
                    <iframe src={`https://player.vimeo.com/video/${teamSection.sketchVimeoIds[s - 1]}`} width="400" height="240" frameborder="0" webkitallowfullscreen mozallowfullscreen
                        allowfullscreen></iframe>
                    <div className="milestone-images">
                        <img src={`data/${year}/sketch/photos/${project.projColor}${sectionId}_1.jpg`} />
                        <img src={`data/${year}/sketch/photos/${project.projColor}${sectionId}_2.jpg`} />
                    </div>
                    </div>
                    <div className="additional-links">
                    <a href={`data/${year}/sketch/movies/${project.projColor}${sectionId}`} download>Download Original Video</a>
                    <a href={`data/${year}sketch/slides/${project.projColor}${sectionId}.pdf`}>View Presentation Slides</a>
                    </div>
                </div>,
            );
        }

        return sketchModels;
    },

    renderMockups: function(sectionLetter) {
        var project = this.props.project;
        var teamSection = project.teamSections[sectionLetter];
        var year = this.props.year;

        var mockups = [];
        for (var s = 1; s <= teamSection.numMocks; s += 1) {
            var sectionId = sectionLetter + s;
            mockups.push(
                <h4 key={`mockup-${sectionLetter}-${s}-header`}>
                    <span className="section-tag">mock-up
                    <em> {sectionLetter.toUpperCase()}-{s}</em>
                    </span> {project[`sketchName${sectionId}`]}</h4>,
                <div className="milestone-container" key={`mockup-${sectionLetter}-${s}-model`}>
                    <div className="milestone-media">
                    <iframe src={`https://player.vimeo.com/video/${teamSection.mockVimeoIds[s - 1]}`} width="400" height="240" frameborder="0" webkitallowfullscreen mozallowfullscreen
                        allowfullscreen></iframe>
                    <div className="milestone-images">
                        <img src={`data/${year}/mockup/photos/${project.projColor}${sectionId}_1.jpg`} />
                        <img src={`data/${year}/mockup/photos/${project.projColor}${sectionId}_2.jpg`} />
                    </div>
                    </div>
                    <div className="additional-links">
                    <a href={`data/${year}/mockup/movies/${project.projColor}${sectionId}`} download>Download Original Video</a>
                    <a href={`data/${year}/mockup/slides/${project.projColor}${sectionId}.pdf`}>View Presentation Slides</a>
                    </div>
                </div>,
            );
        }

        return mockups;
    }
});

var sections = {
    'team' : 1,
    '3-ideas' : 2,
    'sketch-models' : 3,
    'mock-ups' : 4
}

var scrollBreaks = [];

function updateNavigationBar() {
    if ($(window).scrollTop() < 10) {
        $('.navigation').removeClass('condensed');
        $('h1').removeClass('condensed');
        $('h2').removeClass('condensed');
    } else {
        $('.navigation').addClass('condensed');
        $('h1').addClass('condensed');
        $('h2').addClass('condensed');
    }
}

function updateSidemenuHighlight() {
    var closestSection = 0;
    var section = 'team';
    var scrollTop = $(window).scrollTop();
    var offset = 200
    for (var i in sections) {
        if (sections[i] < scrollTop + offset && closestSection < sections[i]) {
            closestSection = sections[i] ;
            section = i;
        }
    }
    $('h3').each(function() {
        $('li').removeClass('sidemenu-highlight');
    })
    $('li.m-' + section).addClass('sidemenu-highlight');

    window.location.hash = section;

}

function scrollToSection(section) {
    $(window).scrollTo($('h3.' + section), {
        offset: -50,
        duration: 200
    })
    updateSidemenuHighlight();
}

function buildSidemenu() {
    $('h3').each(function() {
        sections[$(this).attr('class')] = $(this).offset().top;
    })
    $('.project-sidemenu').on('click', 'li', function () {
        scrollToSection($(this).data('section'));
    })
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
    if (urlLocation.year != null
        && DATA[urlLocation.year] !== undefined
        && urlLocation.team != null
        && DATA[urlLocation.year].projects !== undefined) {
        var teamProject = DATA[urlLocation.year].projects.find(function(project) {
            return project.projColor.toLowerCase() === urlLocation.team.toLowerCase();
        });

        if (teamProject !== undefined) {
            ReactDOM.render(
                <TeamContent project={teamProject} year={urlLocation.year} />,
                document.getElementById('project-content')
            );

            new Clipboard('.btn');

            // handle scrolling after the DOM has rendered our elements
            $(window).scroll(function () {
                updateSidemenuHighlight();
                updateNavigationBar();
            });

            updateNavigationBar();
            buildSidemenu();

            locationHash = window.location.hash;
            if (locationHash !== undefined) {
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
