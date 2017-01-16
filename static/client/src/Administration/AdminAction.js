/**
 * Created by josh on 1/16/17.
 */
const React = require('react');

const AdminAction = React.createClass({
    render: function () {
        return (
            <li className = {this.props.className}>
                <a href="#" onClick={this.props.action} title={this.props.title}
                   data-toggle="tooltip" data-placement={this.props.placement ? this.props.placement : 'right'}>
                    <span className = {"glyphicon " + this.props.glyphicon}/>
                </a>
            </li>
        );
    }
});

module.exports = AdminAction;