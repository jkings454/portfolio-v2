/**
 * Created by josh on 12/29/16.
 *
 * TODO: implement a search bar
 */
const React = require('react');
const ImageLoader = require('../ImageLoader');
const Project = require("./Project");

const Projects = React.createClass({
    getInitialState: function() {
        return {projects: [], loaded: false}
    },
    componentDidMount: function() {
        let url = this.props.params.course_id ?
            ('/api/v1/courses/' + this.props.params.course_id + "/projects") : "/api/v1/projects";

        url += this.props.location.search;
        $.ajax({
            cache: true,
            dataType: 'json',
            url: url,
            success: this.successCallback
        })
    },
    successCallback: function(data) {
        this.setState({projects: data, loaded: true});
    },
    render: function() {
        let loggedIn = this.props.authenticated;
        let deleteProject = this.props.deleteProjectCallback;
        if (!this.state.loaded) {
            return (
                <div className="container">
                    <div className="loader"/>
                </div>
            )
        }
        let project_id = this.props.params.project_id || "";

        let expanded_project = null;

        if (project_id) {
            this.state.projects.forEach(function(project) {
                if (project.id == project_id) {
                    expanded_project = project;
                }
            })
        }

        return (
            <div className = "container">
                {
                    expanded_project && (
                        <Project
                            project={expanded_project}
                            deleteCallback={deleteProject}
                            authenticated={loggedIn}
                            expanded={true}
                        />
                    )
                }
                {
                    this.state.projects.map(function(project)
                    {
                        if (!(project_id == project.id))
                        {
                            return (
                                <Project
                                    key={project.id}
                                    project={project}
                                    expanded={false}
                                    deleteCallback={deleteProject}
                                    authenticated={loggedIn}
                                />
                            );
                        }
                    })
                }

            </div>
        )
    },

});

module.exports = Projects;