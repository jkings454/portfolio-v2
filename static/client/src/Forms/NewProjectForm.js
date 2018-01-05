/**
 * Created by josh on 1/28/17.
 */
const React = require('react');
const TextInput = require('./TextInput');
const showdown = require('showdown');

const NewProjectForm = React.createClass({
    getInitialState: function() {
        return {courses: [], uploadStatus: "", uploadPercent: 0}
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
        if (!courses || courses.length === 0) {
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
                            onChange = {this.handleChange}
                        >
                            <option value="project">Basic Project</option>
                            <option value="image_project">Image Project</option>
                            <option value="text_project">Text Project</option>
                        </select>
                    </div>
                    {
                        (this.state.projectType === "image_project") && (
                            <div className="form-group">
                                <label>Upload Image</label>
                                <input type="file" onChange={this.fileChange} accept="image/*"/>
                                &nbsp;<span className = "text-muted">{
                                    this.state.uploadStatus + " " + (
                                        this.state.uploadPercent ? this.state.uploadPercent + "% complete" : ""
                                    )
                                }</span>
                            </div>
                        )
                    }
                    {
                        (this.state.projectType === "text_project") && (
                            <div>
                                <div className="form-group">
                                    <label>Content Type</label>
                                    <select name="contentType" className="form-control" onChange={this.handleChange}>
                                        <option value="default">--Select One--</option>
                                        <option value="plaintext">Text</option>
                                        <option value="markdown">Markdown</option>
                                        <option value="document">Document</option>
                                    </select>
                                </div>
                                {this.renderTextProjectForm()}
                            </div>

                        )
                    }

                </form>
            );
        }

    },
    handleChange: function(e) {
        this.setState({[e.target.name]: e.target.value});
        this.props.handleChange(e);
    },

    fileChange: function(e) {
        let files = e.target.files;
        let file = files[0];
        if (!file) {
            return;
        }
        this.setState({uploadStatus: "Getting Signed Request..."});
        this.getSignedRequest(file);
    },
    uploadFile(file, data, url) {
            this.setState({uploadStatus: "Uploading...", uploadPercent:0});

            let fileType = file.type;

            let form_data = new FormData();

            let trackUploaderProgress = this.trackUploaderProgress;
            let imageSuccess = this.imageSuccess;
            let fileSuccess = this.fileSuccess;

            for (var key in data.fields) {
                form_data.append(key, data.fields[key])
            }
            form_data.append('file', file);

            $.ajax({
                method: "POST",
                url: data.url,
                chunking: true,
                data: form_data,
                processData: false,
                contentType: false,
                success: function(data) {
                    if (fileType.search("image") > -1) {
                        imageSuccess(url);
                    }
                    else {
                        fileSuccess(url);
                    }
                }
            }).progress(function(e, chunk){
                trackUploaderProgress();
                console.log(chunk);
            });
    },
    getSignedRequest: function(file) {
        let uploadFile = this.uploadFile;
        let trackUploaderProgress = this.trackUploaderProgress;
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
        }).progress(function(){
            trackUploaderProgress();
        });
    },
    fileSuccess: function(url) {
        this.props.getTextFile(url);
        this.setState({uploadStatus: "Done"});
    },
    imageSuccess: function(url) {
        this.props.getImageFile(url);
        this.setState({uploadStatus: "Done."});
    },
    renderTextProjectForm: function() {
        switch (this.state.contentType) {
            case "markdown":
            case "plaintext":
                return (
                    <div className = "form-group">
                        <label>Content</label>
                        <textarea placeholder = "Write your content here!"
                                  name="content"
                                  onChange = {this.handleChange}
                                  className="form-control"
                                  rows="6"
                        />
                    </div>
                );
            case "document":
                //TODO: Pray that this works.
                return (
                    <div className = "form-group">
                        <label>Upload File</label>
                        <input type="file" onChange={this.fileChange} accept="*"/>
                        &nbsp;<span className = "text-muted">{
                            this.state.uploadStatus + " " + (
                                this.state.uploadPercent ? this.state.uploadPercent + "% complete" : ""
                            )
                        }</span>
                    </div>
                );
            default:
                return;

        }
    },
    trackUploaderProgress: function() {
        let currentProgress = this.state.uploadPercent;
        currentProgress++;

        this.setState({uploadPercent: currentProgress});
    }


});

module.exports = NewProjectForm;