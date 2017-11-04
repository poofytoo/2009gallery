var baseUrl = "http://designed.mit.edu/gallery/data/"

import { Navigation, updateNavigationBar } from "./nav.jsx";

var GalleryContent = React.createClass({
    render: function () {
        console.log('react loaded');
        var years = Object.keys(DATA).reverse();
        console.log(years);
        var yearSections = [];
        for (var i in years) {
            var year = years[i]
            yearSections.push(
                <div>
                    <h2>{year}</h2>
                    <h3>{DATA[year].themeName}</h3>
                    {this.renderGalleryYear(year)}
                </div>
            )
        }
        return <div>{yearSections}</div>;
    },

    renderGalleryYear: function (year) {
        // var ideas = this.props.project.deliverables.ideas;
        var teams = [];
        var projects = DATA[year].projects

        for (var s in projects) {
            var backgroundUrl = 'url("' + baseUrl + year + '/final/photos/small/' + s + '1.jpg")';
            var teamUrl = `view.html?year=${year}&team=${s}`
            teams.push(
                <a href={teamUrl}>
                    <div style={{ backgroundImage: backgroundUrl }} className="thumbnail-bg">
                        <div className="product-info">
                            <h4>{projects[s].projName}</h4>
                            <p>{projects[s].projDesc}</p>
                        </div>
                    </div>
                </a>,
            );
        }

        return (
            <div className="thumbnail-container">
                {teams}
            </div>
        )
    },
});

$(function () {

    ReactDOM.render(
        <GalleryContent />,
        document.getElementById('gallery-content')
    );

    // TODO: Move

    ReactDOM.render(
        <Navigation />,
        document.getElementById('navigation')
    );

    $(window).scroll(function() { 
        updateNavigationBar();
    })

    updateNavigationBar();
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
})



