/**
 * Created by josh on 1/28/17.
 */
const React = require('react');
const TextInput = require('./TextInput');

const NewProjectForm = React.createClass({
    getInitialState: function() {
        return {courses: []}
    },
    // What courses can we add to? Let's find out.
    componentDidMount: function(){
        $.ajax({
            url: '/api/v1/courses?truncated=true',
            dataType: "json",
            success: this.onCourseSuccess
        })
    },
    onCourseSuccess: function(data){
        this.setState({courses: data});
        if (data) {
            this.props.hindsight(data[0].id);
        }
    },
    render: function() {
        let courses = this.state.courses;
        if (!courses) {
            return <h4 className="text-danger">There are no courses to add a project to.</h4>;
        }
        else {
            return (<form onSubmit={this.props.onSubmit}>
                    <div className="form-group">
                        <label>Course</label>
                        <select name="courseId" className="form-control">
                            {
                                courses.map(function (course) {
                                    // Keep in mind, these are truncated courses.
                                    return <option value={course.id}>{course.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <TextInput
                        name="name"
                        inputChangeFunction={this.props.handleChange}
                        className="form-control"
                    >
                        <label>Project Name</label>
                    </TextInput>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description"
                                  onChange={this.props.handleChange}
                                  className="form-control"
                                  rows="10"
                        />
                    </div>
                </form>
            );
        }

    }
});

module.exports = NewProjectForm;