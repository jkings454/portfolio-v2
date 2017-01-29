/**
 * Created by josh on 12/30/16.
 */
const React = require("react");
const Router = require("react-router");
const TextInput = require("../Forms/TextInput");

const Login = React.createClass({
    getInitialState: function() {
        return {username: "", password: "", loginFailed: false, errorMessage: ""}
    },
    componentDidMount: function() {
        if (this.props.location.query.tokenExpired) {
            this.setState({loginFailed: true, errorMessage: (
            <div className="alert alert-danger alert-dismissable fade in" role="alert">
                <button type='button' className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">x</span>
                </button>
                <p><strong>Your login session has expired.</strong></p>
                <p>Please log in again.</p>
            </div>
        )});
        }
    },
        render: function() {
                return (
                <div className="container">
                {
                    !this.props.authenticated &&
                        <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                            {this.state.loginFailed ? this.state.errorMessage : ""}
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3>Login</h3>
                                </div>
                                <div className="panel-body">
                                    <form onSubmit = {this.handleLogin}>

                                        <TextInput placeholder="Username" type="text" className="input-lg"
                                                   inputChangeFunction={this.handleNameChange}/>

                                        <TextInput placeholder="Password" type="password" className="input-lg"
                                                   inputChangeFunction={this.handlePasswordChange}/>

                                        {/*<button type="button" onClick={this.handleLogin}*/}
                                                {/*className="btn btn-primary btn-block btn-lg">Login*/}
                                        {/*</button>*/}
                                        <input type="submit" className="btn btn-primary btn-block btn-lg"
                                               value="Login"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        this.props.authenticated &&
                            <h1>You are already logged in.</h1>
                    }
                </div>

            );
    },
    handleNameChange: function(e) {
        if (e.target.charCode == 13) {
            this.handleLogin();
            return;
        }
        if (e.target.value == "") {
            return { "error" : "This field cannot be blank." }
        }
        this.setState({username: e.target.value});
        return {"success" : "the field is valid"}
    },
    handlePasswordChange: function(e) {
        if (e.target.charCode == 13) {
            this.handleLogin();
            return;
        }
        if (e.target.value == "") {
            return { "error" : "This field cannot be blank." }
        }
        this.setState({password: e.target.value});
        return {"success" : "the field is valid"}
    },
    handleLogin: function(e) {
        let username = this.state.username;
        let password = this.state.password;
        if (username.length == 0 || password.length == 0) {
            this.loginFailure(null, "Username and password cannot be blank.");
            return
        }
        $.ajax({
            dataType: 'json',
            method: 'POST',
            url: '/token',
            cache: false,
            data: {
                username: username,
                password: password
            },
            success: this.loginSuccess,
            error: this.loginFailure
        });
        e.preventDefault();
    },
    loginSuccess: function(data) {
        this.props.loginCallback(data.token, data.expires_in);
        Router.browserHistory.push("/");
    },
    loginFailure: function(xhr, message) {
        let err = xhr ? xhr.responseText : message;
        this.setState({
            loginFailed: true,
            errorMessage: (
            <div className="alert alert-danger alert-dismissable fade in" role="alert">
                <button type='button' className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">x</span>
                </button>
                <p><strong>Unfortunately we couldn't log you in.</strong></p>
                <p>Here's what we know: </p>
                <p>{err}</p>
            </div>
        )
        });
    }

});

module.exports = Login;