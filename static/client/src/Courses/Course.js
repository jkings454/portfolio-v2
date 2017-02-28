/**
 * Created by josh on 1/12/17.
 */
const React = require('react');
import {Link} from 'react-router'

const Course = React.createClass({

    render: function() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <h3>{this.props.description}</h3>
                <h4>Projects: </h4>
                <ul>
                    {
                        this.props.projects.map(function(project){
                            return (
                                <li key={project.id}>
                                    <Link to={"/projects/" + project.id}>{project.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
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