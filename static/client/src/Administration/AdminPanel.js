/**
 * Created by josh on 1/16/17.
 */
const React = require("react");
const AdminAction = require("./AdminAction");
const NewCourseModal = require("./NewCourseModal");

const AdminPanel = React.createClass({
    componentDidMount: function() {
        $('[data-toggle="tooltip"]').tooltip();
    },
    showCourseModal: function() {
        $("#newCourseModal").modal('toggle');
    },
    render: function() {
        return (
            <div>
                <ul className = "adminbar">
                    <AdminAction title="New Project" action={() => (alert("Not ready"))}
                                 glyphicon="glyphicon-plus"/>

                    <AdminAction title="New Course" action={this.showCourseModal}
                                 glyphicon="glyphicon-education"/>
                    <AdminAction title="Logout" action={this.props.onLogout} glyphicon="glyphicon-log-out"/>
                </ul>
                <NewCourseModal/>
            </div>
        );
    }
});

module.exports = AdminPanel;