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
        return (
            <div>
                <Navbar currentPage = "Projects"/>
                <div className = "container">
                    {this.state.projects.map(function(project){
                        return (
                            <div key = {project.id}>
                                <h1>{project.name}</h1>
                                <p>{project.description}</p>
                            </div>);
                    })}

                </div>
            </div>
        )
    }
});

module.exports = Projects;