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
        return ({authenticated: sessionStorage.authenticated == "true", token: sessionStorage.token})
    },
    componentDidMount: function() {
        if (Date.now() > parseInt(sessionStorage.tokenExpiresAt)) {
            this.setState({authenticated: false, token: ""})
        }
        else if (sessionStorage.token) {
            this.setState({authenticated: true, token: sessionStorage.token})
        }
        else {
            this.setState({authenticated: false, token: ""})
        }
        setInterval(this.checkToken, 1000)
    },
    checkToken: function () {
        if (sessionStorage.authenticated == "true") {

            if (Date.now() > (parseInt(sessionStorage.tokenExpiresAt))) {
                this.onLogout();
                $('.modal').modal('hide');
                browserHistory.push("/login?tokenExpired=true")
            }
            else if (Date.now() > (parseInt(sessionStorage.tokenExpiresAt) - 10000)) {
                this.getNewToken();
            }
        }
    },
    getNewToken: function() {
        let onLogin = this.onLogin;
        $.ajax({
            url: "/token",
            cache: false,
            headers: {
                authorization: "Bearer " + this.state.token,
            },
            success: function(data) {
                onLogin(data.token, data.expires_in);
            }
        })
    },
    onLogin: function(token, expiration) {
        sessionStorage.authenticated = true;
        sessionStorage.token = token;
        this.setState({authenticated: true, token: token});
        let d = new Date();
        sessionStorage.tokenExpiresAt = d.getTime() + (1000*expiration)
    },
    onLogout: function() {
        sessionStorage.authenticated = false;
        sessionStorage.token = "";
        sessionStorage.tokenExpiresAt = 0;
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
                {this.state.authenticated &&
                <Admin
                    onLogout = {this.onLogout}
                    token={this.state.token}
                />}
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
            <Route path="courses" component = {Courses}>
                <Route path=":id" component = {Course}/>
            </Route>
        </Route>
    </Router>,
    document.getElementById('app'));