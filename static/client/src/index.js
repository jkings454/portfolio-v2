const React = require("react");
const ReactDOM = require("react-dom");
const Navbar = require("./Navbar");

const pages = {
    "About" : "/about",
    "Projects":"/projects",
    "Blog" : "/blog"
};
const App = React.createClass({

    render: function() {
        return (<div>
                    <Navbar pages = {pages} />
                </div>);
    }
});

ReactDOM.render(
    <App/>, 
    document.getElementById('app'));