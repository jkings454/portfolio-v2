/**
 * Created by josh on 12/29/16.
 */
const React = require('react');
const Navbar = require('./Navbar');

const Projects = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar currentPage = "Projects"/>
                <div className = "container">
                    <h1>Welcome to the projects page!</h1>
                </div>
            </div>
        )
    }
});

module.exports = Projects;