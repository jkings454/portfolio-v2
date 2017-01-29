/**
 * Created by josh on 1/13/17.
 */
const React = require("react");
import {Link} from "react-router";

const NavItem = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired,
    },
    render: function() {
        var to = this.props.to;
        const isActive = this.context.router.isActive(to, false);

        return (
            <li className = {isActive ? "active":""}>
                <Link to={to}>{this.props.children}</Link>
            </li>
        )
    }
});

module.exports = NavItem;