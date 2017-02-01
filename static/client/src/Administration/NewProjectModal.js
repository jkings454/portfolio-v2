/**
 * Created by josh on 1/16/17.
 */
const React = require('react');
const NewProjectForm = require("../Forms/NewProjectForm");

const NewProjectModal = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired,
    },
    getInitialState: function() {
        return {projectType: "project"}
    },
    handleSubmit: function (e) {
        let url = "/api/v1/courses/" + this.state.courseId + "/projects";
        let data = {
            name: this.state.name,
            description: this.state.description,
            type: this.state.projectType,
        };
        switch (this.state.projectType) {
            case "project":
                break;
            case "image_project":
                data.image_url = this.state.imageUrl;
                break;
            case "text_project":
                // TODO: offer multiple types of text project.
                data.content_type = "plaintext";
                data.content = this.state.textContent;
                break;
            default:
                console.error("Bad content type reported.");
                return;
        }
        $.ajax({
            data: data,
            url: url,
            dataType: 'json',
            headers: {
                authorization: "Bearer " + this.props.token
            },
            method: 'POST',
            success: this.ajaxSuccess
        });
        e.preventDefault();
    },
    render: function () {
        return (
            <div className="modal fade" id="newProjectModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                            <h4 className="modal-title">New Project</h4>
                        </div>
                        <div className="modal-body">
                            <h3>Create a new project.</h3>
                            <NewProjectForm
                                onSubmit = {this.handleSubmit}
                                handleChange = {this.handleChange}
                                hindsight = {this.setInitialCourse}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-default"
                                    onClick={this.handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    handleChange: function(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value});
        return {};
    },
    setInitialCourse: function(courseId){
        this.setState({courseId: courseId});
    },
    ajaxSuccess: function(data) {
        $('.modal').modal('hide');
        this.context.router.push("/projects");
    }
});

module.exports = NewProjectModal;