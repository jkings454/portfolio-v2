const React = require("react");
const ReactDOM = require("react-dom");

const Navbar = require("./Navbar");
const Projects = require("./Projects");
const Project = require("./Project");
const Home = require("./Home");
const Login = require("./Login");

import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

const App = React.createClass({
    getInitialState: function() {
        return ({authenticated: localStorage.authenticated == "true", token: localStorage.token})
    },
    componentDidMount: function() {
        this.setState({authenticated: localStorage.authenticated == "true", token: localStorage.token})
    },
    onLogin: function(token) {
        localStorage.authenticated = true;
        localStorage.token = token;
        this.setState({authenticated: true, token: token});
    },
    onLogout: function() {
        localStorage.authenticated = false;
        localStorage.token = "";
        this.setState({authenticated: false, token: ""})
    },
    render: function() {
        var clonedChildren = React.cloneElement(this.props.children, {
            authenticated: this.state.authenticated,
            token: this.state.token,
            loginCallback: this.onLogin
        });
        var logout = "";
        if (this.state.authenticated) {
            logout = <a onClick = {this.onLogout} href="#">log out</a>
        }
        return (
            <div>
                {clonedChildren}
                <div className = "container">
                    <p className = 'text-info'>
                        {this.state.authenticated ? "You are logged in !" : "You are not logged in !"} {logout}
                    </p>
                </div>
            </div>);
    }
});

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path = "/" component = {App}>
            <IndexRoute component = {Home} />
            <Route path = "login" component = {Login}/>
            <Route path = "blog" component = {null}/>
            <Route path = "projects" component = {Projects}>
                <Route path=":id" component = {Project}/>
            </Route>
        </Route>
    </Router>,
    document.getElementById('app'));