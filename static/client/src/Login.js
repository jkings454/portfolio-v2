/**
 * Created by josh on 12/30/16.
 */
const React = require("react");
const Router = require("react-router");

const Login = React.createClass({
    getInitialState: function() {
        return {username: "", password: ""}
    },
    render: function() {
        return (
            <form>
                <input type = "text" name = 'username' placeholder="Username" onChange={this.handleNameChange} />
                <input type = "password" name = "password" placeholder="Super secret password"
                       onChange={this.handlePasswordChange} />
                <button type = "button" onClick={this.handleLogin}>Login</button>
            </form>
        );
    },
    handleNameChange: function(e) {
        this.setState({username: e.target.value});
    },
    handlePasswordChange: function(e) {
        this.setState({password: e.target.value});
    },
    handleLogin: function() {
        let username = this.state.username;
        let password = this.state.password;
        $.ajax({
            dataType: 'json',
            method: 'GET',
            url: '/token',
            username: username,
            password: password,
            success: this.loginSuccess
        })
    },
    loginSuccess: function(data) {
        this.props.loginCallback(data.token);
        Router.browserHistory.push("/");
    }
});

module.exports = Login;