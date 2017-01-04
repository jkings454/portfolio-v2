/**
 * Created by josh on 12/29/16.
 */
const React = require('react');
const Navbar = require('./Navbar');

const Projects = React.createClass({
    getInitialState: function() {
        return {projects: []}
    },
    componentDidMount: function() {
        $.ajax({
            dataType: 'json',
            url: '/api/v1/projects',
            success: this.successCallback
        })
    },
    successCallback: function(data) {
        this.setState({projects: data});
    },
    render: function() {
        let loggedIn = this.props.authenticated;
        let deleteProject = this.deleteProject;

        return (
            <div>
                <Navbar currentPage = "Projects"/>
                <div className = "container">
                    {this.state.projects.map(function(project){
                        return (
                            <div key = {project.id}>
                                <h1>{project.name}</h1>
                                <p>{project.description}</p>
                                {
                                    loggedIn &&
                                    <a href = "#" onClick = {() => deleteProject(project.id)}>Delete project</a>
                                }
                            </div>);
                    })}

                </div>
            </div>
        )
    },
    deleteProject: function(projectID) {
        $.ajax({
            method: "DELETE",
            dataType: "json",
            url: "/api/v1/projects/" + projectID,
            success: this.deleteSuccess
        })
    },
    deleteSuccess: function(data) {
        alert("\"" + data.name + "\" was successfully deleted!");
        location.reload();
    }
});

module.exports = Projects;