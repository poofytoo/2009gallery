var baseUrl = "http://designed.mit.edu/gallery/data/"

export const Navigation = React.createClass({
    render: function () {
        return <div>hello</div>;
    },
    renderProductList: function () {
        var projectList = [];
        var year = 2015; // dynamically loaded
        var projects = DATA[year].projects
        for (var i in projects) {
            var backgroundImage = `background-image: url('${baseUrl}${year}/final/photos/small/${i}1.jpg')`;
            projectList.push(
                <li class="selected-dropdown-item">
                    <a href="">
                        <div class="product-image" style={backgroundImage}></div>
                        <div class="product-text">
                            <em>{projects[i].projName}</em> {i} Team
                        </div>
                    </a>
                </li>
            )
        }
        return <div>{projectList}</div>
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
            */