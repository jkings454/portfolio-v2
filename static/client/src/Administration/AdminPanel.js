/**
 * Created by josh on 1/16/17.
 */
const React = require("react");
const AdminAction = require("./AdminAction");
const NewCourseModal = require("./NewCourseModal");
const NewProjectModal = require("./NewProjectModal");
const AdminPanel = React.createClass({
    componentDidMount: function() {
        $('[data-toggle="tooltip"]').tooltip();
    },
    showCourseModal: function() {
        $("#newCourseModal").modal('toggle');
    },
    showProjectModal: function() {
        $('#newProjectModal').modal('toggle');
    },
    render: function() {
        return (
            <div>
                <ul className = "adminbar">
                    <AdminAction title="New Project" action={this.showProjectModal}
                                 glyphicon="glyphicon-plus"/>

                    <AdminAction title="New Course" action={this.showCourseModal}
                                 glyphicon="glyphicon-education"/>

                    <AdminAction title="Logout" action={this.props.onLogout} glyphicon="glyphicon-log-out"/>
                </ul>
                <NewCourseModal token={this.props.token}/>
                <NewProjectModal token={this.props.token}/>
            </div>
        );
    }
});

module.exports = AdminPanel;