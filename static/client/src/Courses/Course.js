/**
 * Created by josh on 1/12/17.
 */
const React = require('react');
import {Link} from 'react-router'
const Project = require("./Project");

const Course = React.createClass({
    getInitialState: function() {
        return {
            name: "",
            description: "",
            contentType: "",
            projects: [],
        }
    },
    componentDidMount: function() {
        this.getCourses();
    },
    getCourses: function() {
        $.ajax({
            url: "/api/v1/courses/" + this.props.params.course_id,
            contentType: "json",
            success: this.ajaxSuccess
        })
    },
    render: function() {
        let deleteProjectCallback = this.props.deleteProjectCallback;
        return (
            <div>
                <h1>{this.state.name}</h1>
                <h3>{this.state.description}</h3>
                <h4>Projects: </h4>
                    {
                        this.state.projects.map(function(project){
                            return (
                                <Project
                                    key={project.id}
                                    project={project}
                                    expanded={false}
                                    deleteCallback={deleteProjectCallback}
                                />
                            )
                        })
                    }
            </div>
        )
    },
    ajaxSuccess: function(data) {
        console.log("success!");
        this.setState({
            name: data.name,
            description: data.description,
            projects: data.projects
        })
    }
});

module.exports = Course;