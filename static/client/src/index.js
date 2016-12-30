const React = require("react");
const ReactDOM = require("react-dom");
const Navbar = require("./Navbar");
const Projects = require("./Projects");
import {Router, Route, Link, browserHistory} from 'react-router'

const App = React.createClass({

    render: function() {
        return (<div>
                    <Navbar currentPage = "/"/>
                    <h1>Hello from index!</h1>
                </div>);
    }
});

const Blog = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar currentPage = "Blog"/>
                <div className = "container">
                    <h1>Hello from the blog page!</h1>
                </div>
            </div>)
    }
})
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path = "/" component = {App} />
        <Route path = "/blog" component = {Blog}/>
        <Route path = "/projects" component = {Projects}/>
    </Router>,
    document.getElementById('app'));