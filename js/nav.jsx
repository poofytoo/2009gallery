import classnames from "classnames";

var baseUrl = "http://designed.mit.edu/gallery/data/"

export const updateNavigationBar = function () {
    if ($(window).scrollTop() < 10) {
        $('.navigation').removeClass('condensed');
        $('h1').removeClass('condensed');
        $('h2').removeClass('condensed');
    } else if (!$('.navigation').hasClass('condensed')) {
        $('.navigation').addClass('condensed');
        $('h1').addClass('condensed');
        $('h2').addClass('condensed');
    }
}

export const Navigation = React.createClass({
    getInitialState: function () {
        console.log('whatttt yearrr is itttt', this.props.teamYear)
        return {
            teamColor: this.props.teamColor,
            teamYear: this.props.teamYear,
            isYearDropdownVisible: false,
            isTeamDropdownVisible: false,
        };
    },
    componentDidMount: function () {
        var _this = this;

        $("body").on("click", function (event) {
            // react and jquery events aren't playing nice with each other
            if (!$(event.target).hasClass("nav-select")
                && !$(event.target).hasClass("year-item")
                && !$(event.target).parents(".year-item").length === 0) {
                _this.setState({
                    isYearDropdownVisible: false,
                    isTeamDropdownVisible: false,
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
    componentDidUpdate: function (oldProps, oldState) {
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
    render: function () {
        return (<div>
            <a href="/">
                <div className="year-select nav-select">
                    All Projects
                </div>
            </a>
            <span className="arrow">></span>
            <div className="year-select nav-select" onClick={this.toggleYearDropdown}>
                {this.state.teamYear !== undefined ? `Fall ${this.state.teamYear}` : "Select year"}
                <span className="dropdown-arrow">&#x25BE;</span>
                {this.maybeRenderYearDropdown()}
            </div>
            <span className="arrow">></span>
            <div
                className={classnames("team-select nav-select", { "disabled-select": this.state.teamYear === undefined })}
                onClick={this.toggleTeamDropdown}
            >
                {this.state.teamColor !== undefined ? `${this.state.teamColor} Team` : "Select team"}
                <span className="dropdown-arrow">&#x25BE;</span>
                {this.maybeRenderTeamDropdown()}
            </div>


        </div>);
    },
    maybeRenderYearDropdown: function () {
        if (this.state.isYearDropdownVisible) {
            return (
                <div className="dropdown-selector year-selector">
                    <ul>{this.renderYearList()}</ul>
                </div>
            );
        }
        return undefined;
    },
    maybeRenderTeamDropdown: function () {
        if (this.state.isTeamDropdownVisible) {
            return (
                <div className="dropdown-selector team-selector">
                    <ul id="dropdown-selector-list">
                        {this.renderProductList()}
                    </ul>
                </div>
            );
        }
        return undefined;
    },
    renderProductList: function () {
        var projectList = [(
            <li>
                <a className="select-none" href="">
                    <span className="dim">View All Products</span>
                </a>
            </li>
        )];
        var year = this.state.teamYear; // dynamically loaded
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
    renderYearList: function () {
        var yearsList = [(
            <li key="all">
                <a href="">
                    <span class="dim">View All Years</span>
                </a>
            </li>
        )];
        var years = Object.keys(DATA).reverse()
        var _this = this;
        for (var i in years) {
            // var backgroundUrl = `url('${baseUrl}${year}/final/photos/small/${i}1.jpg')`;
            // var teamUrl = `view.html?year=${year}&team=${i}`
            var year = years[i]
            yearsList.push(
                <li key={year}>
                    <a onClick={this.getYearHandler(year)} className="year-item">
                        <em>{DATA[year].themeName}</em> Fall {year}
                        <span className="dim">{Object.keys(DATA[year].projects).length} projects</span>
                    </a>
                </li>
            )
        }

        return <div>{yearsList}</div>
    },
    getYearHandler: function (year) {
        var _this = this;

        const handler = function (event) {
            event.stopPropagation();
            _this.setState({
                teamYear: year,
                isYearDropdownVisible: false,
                isTeamDropdownVisible: true,
            });
        };
        return handler;
    },
    toggleYearDropdown: function (event) {
        event.stopPropagation();
        this.setState({ isYearDropdownVisible: !this.state.isYearDropdownVisible, isTeamDropdownVisible: false });
    },
    toggleTeamDropdown: function (event) {
        event.stopPropagation();
        if (this.state.teamYear !== undefined) {
            this.setState({
                isTeamDropdownVisible: !this.state.isTeamDropdownVisible,
                isYearDropdownVisible: false,
            });
        }
    }
});

