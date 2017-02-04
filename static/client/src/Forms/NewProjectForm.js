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
        if (!courses || courses.length == 0) {
            return <h4 className="text-danger">There are no courses to add a project to.</h4>;
        }
        else {
            return (<form onSubmit={this.props.onSubmit}>
                    <div className="form-group">
                        <label>Course</label>
                        <select
                            name="courseId" className="form-control"
                            onChange={this.props.handleChange}
                        >
                            {
                                courses.map(function (course) {
                                    // Keep in mind, these are truncated courses.
                                    return <option key={course.id} value={course.id}>{course.name}</option>
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
                                  rows="5"
                        />
                    </div>
                    <div className="form-group">
                        <select
                            name="projectType" className="form-control"
                            onChange = {this.handleProjectTypeChange}
                        >
                            <option value="project">Basic Project</option>
                            <option value="image_project">Image Project</option>
                            <option value="text_project">Text Project</option>
                        </select>
                    </div>
                    {
                        (this.state.projectType == "image_project") && (
                            <div className="form-group">
                                <label>Upload Image</label>
                                <input type="file" onChange={this.fileChange} accept="image/*"/>
                            </div>
                        )
                    }
                    {
                        (this.state.projectType == "text_project") && (
                            <div className="form-group">
                                <textarea
                                    name="content"
                                    onChange={this.props.handleChange}
                                    className="form-control"
                                    rows="6"
                                />
                            </div>
                        )
                    }

                </form>
            );
        }

    },
    handleProjectTypeChange: function(e) {

        this.setState({projectType: e.target.value});
        this.props.handleChange(e);
    },

    fileChange: function(e) {
        let files = e.target.files;
        let file = files[0];
        if (!file) {
            return;
        }
        this.getSignedRequest(file);
    },
    uploadFile(file, data, url) {
            console.log(data);
            let form_data = new FormData();
            for (var key in data.fields) {
                form_data.append(key, data.fields[key])
            }
            form_data.append('file', file);

            $.ajax({
                method: "POST",
                url: data.url,
                data: form_data,
                processData: false,
                contentType: false,
                success: (data) => (this.imageSuccess((url)))
            });
            this.setState({imageUrl: url})
    },
    getSignedRequest: function(file) {
        let uploadFile = this.uploadFile;
        $.ajax({
            url: "/sign_s3",
            data: {
                file_name: file.name,
                file_type: file.type
            },
            headers: {
                authorization: "Bearer " + this.props.token
            },
            contentType: "json",
            // success: (data) => (this.uploadFile(file, data.s3_data, data.url))
            success: function(data) {
                uploadFile(file, data.s3_data, data.url)
            }
        })
    },
    imageSuccess: function(url) {
        this.props.getImageFile(url)
    }


});

module.exports = NewProjectForm;