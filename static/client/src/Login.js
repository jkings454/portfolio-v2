/**
 * Created by josh on 12/30/16.
 */
const React = require("react");
const Router = require("react-router");
const Navbar = require("./Navbar");

const Login = React.createClass({
    getInitialState: function() {
        return {username: "", password: "", loginFailed: false}
    },
    render: function() {
        // TODO: Create a custom text-field class for validation of inputs
        let errorMessage = (
            <div className = "alert alert-danger alert-dismissable fade in" role="alert">
                <button type = 'button' className = "close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">x</span>
                </button>
                <p><strong>Unfortunately, we couldn't log you in.</strong></p>
                <p>Please try again.</p>
            </div>
        );
        return (
            <div>
            <Navbar />
            <div className = "container">
                <div className = "col-sm-6 col-sm-offset-3">
                    {this.state.loginFailed ? errorMessage : ""}
                    <div className = "panel panel-default">
                        <div className = "panel-heading">
                            <h3>Login</h3>
                        </div>
                        <div className = "panel-body">
                        <form>
                            <div className = "form-group">
                            <input type = "text" name = 'username' placeholder="Username" onChange={this.handleNameChange}
                                   className = "form-control input-lg"/>
                            </div>
                            <div className = "form-group">
                            <input type = "password" name = "password" placeholder="Super secret password"
                                   onChange={this.handlePasswordChange}  className = "form-control input-lg"/>
                            </div>
                            <button type = "button" onClick={this.handleLogin}
                                   className = "btn btn-primary btn-block btn-lg">Login</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
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
            success: this.loginSuccess,
            error: this.loginFailure
        })
    },
    loginSuccess: function(data) {
        this.props.loginCallback(data.token);
        Router.browserHistory.push("/");
    },
    loginFailure: function(xhr, message) {
        this.setState({loginFailed: true})
    }

});

module.exports = Login;