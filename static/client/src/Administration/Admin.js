/**
 * Created by josh on 1/16/17.
 */
const React = require('react');
const AdminPanel = require("./AdminPanel");

const Admin = React.createClass({
    contextTypes: {
        router: React.PropTypes.func.isRequired,
    },
    onFail: function() {
        // The user's token has expired. They need to log in again in order to get a new token.
        this.props.onLogout();
        this.context.router.push("/login")
    },
    render: function() {
        return <AdminPanel onFail={this.onFail}
                           onLogout = {this.props.onLogout}/>
    }
});

module.exports = Admin;