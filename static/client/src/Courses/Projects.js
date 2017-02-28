/**
 * Created by josh on 12/29/16.
 *
 * TODO: implement a search bar
 */
const React = require('react');
const ImageLoader = require('../ImageLoader');
const Projects = React.createClass({
    getInitialState: function() {
        return {projects: [], loaded: false}
    },
    componentDidMount: function() {
        $.ajax({
            cache: true,
            dataType: 'json',
            url: '/api/v1/projects',
            success: this.successCallback
        })
    },
    successCallback: function(data) {
        this.setState({projects: data, loaded: true});
    },
    render: function() {
        let loggedIn = this.props.authenticated;
        let deleteProject = this.deleteProject;
        if (!this.state.loaded) {
            return (
                <div className="container">
                    <div className="loader"/>
                </div>
            )
        }
        let renderText = this.renderText;
        return (
            <div className = "container">
                {this.state.projects.map(function(project){
                    return (
                        <div key = {project.id}>
                            <h1>{project.name}</h1>
                            {
                                project.type=="image_project" &&
                                    <ImageLoader src={project.image_url}/>
                            }
                            {
                                project.type == "text_project" &&
                                    renderText(project.content_type, project.content)
                            }
                            <p>{project.description}</p>
                            {
                                loggedIn &&
                                <a href = "#" onClick = {() => deleteProject(project.id)}>
                                    Delete project
                                </a>
                            }
                        </div>);
                })}

            </div>
        )
    },
    deleteProject: function(projectID) {
        if (confirm("Delete this project?")) {
            $.ajax({
                method: "DELETE",
                dataType: "json",
                url: "/api/v1/projects/" + projectID,
                success: this.deleteSuccess,
                headers: {
                    authorization: "Bearer " + this.props.token,
                }
            })
        }
    },
    deleteSuccess: function(data) {
        alert("\"" + data.name + "\" was successfully deleted!");
        location.reload();
    },
    renderText: function(contentType, content) {
        if (contentType == "markdown") {
            content = {__html: content};
            return (<div dangerouslySetInnerHTML={content}></div>);
        }
        else if (contentType == "plaintext") {
            return <pre>{content}</pre>
        }
        else {
            return <p className="text-danger">This type of content cannot be displayed (yet)</p>
        }
    },
});

module.exports = Projects;