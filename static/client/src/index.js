const React = require("react");
const ReactDOM = require("react-dom");

const Navbar = require("./Navigation/Navbar");
const Projects = require("./Courses/Projects");
const Project = require("./Courses/Project");
const Home = require("./Home");
const Admin = require("./Administration/Admin");
const Login = require("./Authentication/Login");
const Courses = require("./Courses/Courses");
const Course = require("./Courses/Course");

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
        const clonedChildren = React.cloneElement(this.props.children, {
            authenticated: this.state.authenticated,
            token: this.state.token,
            loginCallback: this.onLogin
        });
        return (
            <div className = "wrapper">
                <Navbar/>
                {this.state.authenticated && <Admin onLogout = {this.onLogout} />}
                {clonedChildren}
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
            <Route path="courses" component = {Courses} />
            <Route path="courses/:id" component = {Course}/>
        </Route>
    </Router>,
    document.getElementById('app'));