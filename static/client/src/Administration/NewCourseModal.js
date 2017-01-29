/**
 * Created by josh on 1/16/17.
 */
const React = require("react");
const NewCourseForm = require("../Forms/NewCourseForm");

const NewCourseModal = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired,
    },
    render: function() {
        return (
            <div className = "modal fade" id="newCourseModal" tabIndex="-1" role="dialog">
                <div className = "modal-dialog modal-lg" role="document">
                    <div className = "modal-content">
                        <div className = "modal-header">
                            <button type="button" className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                            <h4 className="modal-title">New Course</h4>
                        </div>
                        <div className = "modal-body">
                            <h3>Add a course.</h3>
                            <NewCourseForm
                                onSubmit = {this.handleSubmit}
                                handleChange = {this.handleChange}
                            />
                        </div>
                        <div className = "modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button
                                type="submit" className="btn btn-primary" onClick={this.handleSubmit}
                            >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    handleSubmit: function(e){
        let data = {
            name: this.state.name,
            description: this.state.description
        };

        $.ajax({
            url: '/api/v1/courses',
            method: 'POST',
            data: data,
            headers: {
                authorization: "Bearer " + this.props.token
            },
            success: this.ajaxSuccess
        })
    },
    ajaxSuccess: function(data) {
        $('.modal').modal('hide');
        this.context.router.push("/courses");
        location.reload();
    },
    handleChange: function(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value});
        return {};
    }

});

module.exports = NewCourseModal;