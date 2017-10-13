var TeamContent = React.createClass({
    render: function() {
        var project = this.props.project;
        return (
            <div className="project-content">
                <h1 className="fixed-topbar">{project.projColor} Team, Fall 2015</h1>
                <h2 className="fixed-topbar">{project.projName}</h2>
                <h3 className="team">Team</h3>
                <p>{project.projTeam}</p>
                <h3 className="3-ideas">3 Ideas</h3>

                <input id="foo" value="https://github.com/zenorocha/clipboard.js.git" />
                <button className="btn" data-clipboard-target="#foo">copy to clipboard</button>

                <h4>
                    <span className="section-tag">Section
                    <em>A</em>
                    </span>
                </h4>
                <p className="posters">
                    <img className="poster" src={project.ideasPic1} />
                    <img className="poster" src={project.ideasPic2} />
                    <img className="poster" src={project.ideasPic3} />
                </p>
                <h4>
                    <span className="section-tag">Section
                    <em>B</em>
                    </span>
                </h4>
                <p className="posters">
                    <img className="poster" src={project.ideasPic4} />
                    <img className="poster" src={project.ideasPic5} />
                    <img className="poster" src={project.ideasPic6} />
                </p>
                <h3 className="sketch-models">Sketch Models</h3>
                <h4>
                    <span className="section-tag">Section
                    <em>A-1</em>
                    </span> {project.sketchName1}</h4>
                <div className="sketch-model">
                    <div className="sketch-model-media">
                    <iframe src={project.sketchMov1} width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen
                        allowfullscreen></iframe>
                    <div className="sketch-model-images">
                        <img src="http://designed.mit.edu/gallery/data/2015/sketch/photos/yellowA1_1.jpg" />
                        <img src="http://designed.mit.edu/gallery/data/2015/sketch/photos/yellowA1_2.jpg" />
                    </div>
                    </div>
                    <div className="additional-links">
                    <a href="">Download Original Video</a>
                    <a href="">View Presentation Slides</a>
                    </div>
                </div>

                <h4>
                    <span className="section-tag">Section
                    <em>A-2</em>
                    </span> Revive</h4>
                <div className="sketch-model">
                    <div className="sketch-model-media">
                    <iframe src="https://player.vimeo.com/video/185915828" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen
                        allowfullscreen></iframe>
                    <div className="sketch-model-images">
                        <img src="http://designed.mit.edu/gallery/data/2015/sketch/photos/yellowA1_1.jpg" />
                        <img src="http://designed.mit.edu/gallery/data/2015/sketch/photos/yellowA1_2.jpg" />
                    </div>
                    </div>
                    <div className="additional-links">
                    <a href="">Download Original Video</a>
                    <a href="">View Presentation Slides</a>
                    </div>
                </div>
                <h3 className="mock-ups">Mock-ups</h3>
                <h4>
                    <span className="section-tag">Section
                    <em>A-1</em>
                    </span> Catnip</h4>
            </div>
        );
    },

    renderSketchModels: function(teamLetter) {
        var project = this.props.project;
        var year = this.props.year;

        var sketchModels = [];
        var index = 0;
        do {
            index += 1;
            sketchModels.push(
                <h4 key={`sketch-${teamLetter}-${index}-header`}>
                    <span className="section-tag">Section
                    <em>${teamLetter.toUpperCase()}-${index}</em>
                    </span> {project[`sketchName${teamLetter}${index}`]}</h4>,
                <div className="sketch-model" key={`sketch-${teamLetter}-${index}-model`}>
                    <div className="sketch-model-media">
                    <iframe src={`data/${year}/sketch/movies/${project.projColor}${teamLetter}${index}`} width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen
                        allowfullscreen></iframe>
                    <div className="sketch-model-images">
                        <img src={`data/${year}/sketch/photos/${project.projColor}${teamLetter}${index}_1.jpg`} />
                        <img src={`data/${year}/sketch/photos/${project.projColor}${teamLetter}${index}_2.jpg`} />
                    </div>
                    </div>
                    <div className="additional-links">
                    <a href="">Download Original Video</a>
                    <a href="">View Presentation Slides</a>
                    </div>
                </div>,
            )
        } while (project[`sketchNameA${index}`] !== undefined);

        // determine the number of B teams there are
        var maxBIndex = 0;
        do {
            maxBIndex += 1;
        } while (project[`sketchNameB${maxBIndex}`] !== undefined);


    }
});

function parseQuery(qstr) {
    if (qStr === undefined || qStr.length === 0) {
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

$(function () {
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
        } else {
            // handle unknown case
        }
    } else {
        // handle bad query param case
    }
});
