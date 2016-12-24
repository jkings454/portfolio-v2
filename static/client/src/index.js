const React = require("react");
const ReactDOM = require("react-dom");
const Navbar = require("./Navbar");

const pages = {
    "index":(<div className = 'container'>
                <h1>This is the index page!</h1>
            </div>),
    "About":(<div className = 'container'>
                <h1>This is the about page!</h1>
            </div>),
    "Projects":(<div className = 'container'>
                <h1>This is the projects page!</h1>
            </div>),
};
const App = React.createClass({
    getInitialState: function() {
        return { currentPage: "index" }
    },
    onNavLinkClicked: function(page){
        this.setState(
           { currentPage: page }
       );
    },
    render: function() {
        return (<div>
                    <Navbar pages = {['About', 'Projects']} onClick = {this.onNavLinkClicked} />
                    {pages[this.state.currentPage]}
                </div>);
    }
});

ReactDOM.render(
    <App/>, 
    document.getElementById('app'));