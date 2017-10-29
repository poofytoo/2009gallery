var baseUrl = "http://designed.mit.edu/gallery/data/"

export const Navigation = React.createClass({
    render: function () {

        // Disable Parent Scrolling with Child
        $('.dropdown-selector').on('mousewheel', function (e) {
            var event = e.originalEvent,
                d = event.wheelDelta || -event.detail;

            this.scrollTop += (d < 0 ? 1 : -1) * 30;
            e.preventDefault();
        });

        return (<div>
            <div className="year-select nav-select">
                All Projects
            </div>
            <span className="arrow">></span>
            <div className="year-select nav-select">
                Fall 2015
                <span className="dropdown-arrow">&#x25BE;</span>
                <div className="dropdown-selector">
                    <ul>
                        {this.renderYearList()}
                    </ul>
                </div>
            </div>
            <span className="arrow">></span>
            <div className="team-select nav-select disabled-select">
                Blue Team
                <span className="dropdown-arrow">&#x25BE;</span>
                <div className="dropdown-selector">
                    <ul id="dropdown-selector-list">
                        {this.renderProductList()}
                    </ul>
                </div>
            </div>


        </div>);
    },
    renderProductList: function () {
        var projectList = [(
            <li>
                <a className="select-none" href="">
                    <span className="dim">View All Products</span>
                </a>
            </li>
        )];
        var year = 2015; // dynamically loaded
        var projects = DATA[year].projects
        for (var i in projects) {
            var backgroundUrl = `url('${baseUrl}${year}/final/photos/small/${i}1.jpg')`;
            var teamUrl = `view.html?year=${year}&team=${i}`
            projectList.push(
                <li className="selected-dropdown-item">
                    <a href={teamUrl}>
                        <div className="product-image" style={{ backgroundImage: backgroundUrl }}></div>
                        <div className="product-text">
                            <em>{projects[i].projName}</em> {i} Team
                        </div>
                    </a>
                </li>
            )
        }
        return <div>{projectList}</div>
    },
    renderYearList: function() {
        return <div>hi</div>
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


